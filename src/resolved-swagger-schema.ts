import type { resolve } from "@apidevtools/swagger-parser";
import SwaggerParser from "@apidevtools/swagger-parser";
import consola from "consola";
import * as fs from "node:fs";
import path from "node:path";
import type { OpenAPI } from "openapi-types";
import * as YAML from "yaml";
import type { AnyObject, Maybe, Primitive } from "yummies/utils/types";
import type { CodeGenConfig } from "./configuration.js";

export interface RefDetails {
  ref: string;
  isLocal: boolean;
  externalUrlOrPath: Maybe<string>;
  externalOpenapiFileName?: string;
}

export class ResolvedSwaggerSchema {
  private parsedRefsCache = new Map<string, RefDetails>();
  private externalSchemaCache = new Map<string, AnyObject>();

  private normalizeRef(ref: string): string {
    let normalizedRef = ref;

    // Some specs contain refs like "./file.yaml/#/components/..."
    // while resolvers usually expect "./file.yaml#/components/...".
    normalizedRef = normalizedRef.replace(/\/#(?=\/)/, "#");

    // Keep backward compatibility with refs like "#components/..."
    normalizedRef = normalizedRef.replace(/#(?!\/)/, "#/");

    return normalizedRef;
  }

  private constructor(
    private config: CodeGenConfig,
    public usageSchema: OpenAPI.Document,
    public originalSchema: OpenAPI.Document,
    private resolvers: Awaited<ReturnType<typeof resolve>>[],
  ) {
    this.usageSchema = usageSchema;
    this.originalSchema = originalSchema;
  }

  getRefDetails(ref: string): RefDetails {
    const normalizedRef = this.normalizeRef(ref);

    if (!this.parsedRefsCache.has(ref)) {
      const isLocal = normalizedRef.startsWith("#");

      if (isLocal) {
        this.parsedRefsCache.set(ref, {
          ref: normalizedRef,
          isLocal,
          externalUrlOrPath: null,
        });
      } else {
        const externalUrlOrPath = normalizedRef.split("#")[0]!;
        const externalPathWithoutTrailingSlash = externalUrlOrPath.replace(
          /\/$/,
          "",
        );
        let externalOpenapiFileName =
          externalPathWithoutTrailingSlash.split("/").at(-1) || "";

        if (
          externalOpenapiFileName.endsWith(".json") ||
          externalOpenapiFileName.endsWith(".yaml")
        ) {
          externalOpenapiFileName = externalOpenapiFileName.slice(0, -5);
        } else if (externalOpenapiFileName.endsWith(".yml")) {
          externalOpenapiFileName = externalOpenapiFileName.slice(0, -4);
        }

        this.parsedRefsCache.set(ref, {
          ref: normalizedRef,
          isLocal,
          externalUrlOrPath,
          externalOpenapiFileName,
        });
      }
    }

    return this.parsedRefsCache.get(ref)!;
  }

  isLocalRef(ref: string): boolean {
    return this.getRefDetails(ref).isLocal;
  }

  getRef(ref: Maybe<string>): Maybe<AnyObject | Primitive> {
    if (!ref) {
      return null;
    }

    const normalizedRef = this.normalizeRef(ref);

    if (normalizedRef !== ref) {
      const resolvedByNormalizedRef = this.tryToResolveRef(normalizedRef);

      if (resolvedByNormalizedRef) {
        return resolvedByNormalizedRef;
      }
    }

    const resolvedByOrigRef = this.tryToResolveRef(ref);

    if (resolvedByOrigRef) {
      return resolvedByOrigRef;
    }

    // const ref.match(/\#[a-z]/)
    if (/#[a-z]/.test(ref)) {
      const fixedRef = ref.replace(/#[a-z]/, (match) => {
        const [hashtag, char] = match.split("");
        return `${hashtag}/${char}`;
      });

      return this.tryToResolveRef(fixedRef);
    }

    return this.tryToResolveRefFromFile(normalizedRef);

    // this.tryToResolveRef(`@usage${ref}`) ??
    // this.tryToResolveRef(`@original${ref}`)
  }

  private tryToResolveRef(ref: Maybe<string>) {
    if (!this.resolvers || !ref) {
      return null;
    }

    for (const resolver of this.resolvers) {
      try {
        const resolvedAsIs = resolver.get(ref);
        return resolvedAsIs;
      } catch (e) {
        consola.debug(e);
      }
    }

    return null;
  }

  private readExternalSchema(filePath: string): Maybe<AnyObject> {
    if (this.externalSchemaCache.has(filePath)) {
      return this.externalSchemaCache.get(filePath) || null;
    }

    if (!fs.existsSync(filePath)) {
      return null;
    }

    try {
      const content = fs.readFileSync(filePath, "utf8");
      const parsed = JSON.parse(content);
      this.externalSchemaCache.set(filePath, parsed);
      return parsed;
    } catch {
      try {
        const content = fs.readFileSync(filePath, "utf8");
        const parsed = YAML.parse(content);
        if (parsed && typeof parsed === "object") {
          this.externalSchemaCache.set(filePath, parsed as AnyObject);
          return parsed as AnyObject;
        }
      } catch (e) {
        consola.debug(e);
      }
    }

    return null;
  }

  private resolveJsonPointer(
    source: Maybe<AnyObject>,
    pointer: string,
  ): Maybe<AnyObject | Primitive> {
    if (!source || typeof source !== "object") {
      return null;
    }

    if (!pointer || pointer === "/") {
      return source;
    }

    const tokens = pointer
      .replace(/^\/+/, "")
      .split("/")
      .filter(Boolean)
      .map((part) =>
        decodeURIComponent(part.replace(/~1/g, "/").replace(/~0/g, "~")),
      );

    let current: any = source;

    for (const token of tokens) {
      if (current == null || typeof current !== "object") {
        return null;
      }
      current = current[token];
    }

    return current ?? null;
  }

  private collectExternalRefCandidates(externalPath: string): string[] {
    const candidates = new Set<string>();
    const isRemote = /^https?:\/\//i.test(externalPath);

    if (isRemote) {
      return [];
    }

    if (path.isAbsolute(externalPath)) {
      candidates.add(externalPath);
    }

    const inputPath = this.config.input;
    if (typeof inputPath === "string" && inputPath) {
      candidates.add(path.resolve(path.dirname(inputPath), externalPath));
    }

    for (const resolver of this.resolvers) {
      try {
        const resolverPaths =
          typeof resolver.paths === "function" ? resolver.paths() : [];
        for (const resolverPath of resolverPaths) {
          if (typeof resolverPath !== "string") {
            continue;
          }
          if (/^https?:\/\//i.test(resolverPath)) {
            continue;
          }
          candidates.add(path.resolve(path.dirname(resolverPath), externalPath));
        }
      } catch (e) {
        consola.debug(e);
      }
    }

    return [...candidates];
  }

  private tryToResolveRefFromFile(ref: string): Maybe<AnyObject | Primitive> {
    if (!ref || ref.startsWith("#")) {
      return null;
    }

    const [externalPath = "", rawPointer = ""] = ref.split("#");
    if (!externalPath) {
      return null;
    }

    const pointer = rawPointer
      ? rawPointer.startsWith("/")
        ? rawPointer
        : `/${rawPointer}`
      : "/";

    const candidates = this.collectExternalRefCandidates(externalPath);

    for (const candidate of candidates) {
      const schema = this.readExternalSchema(candidate);
      const resolved = this.resolveJsonPointer(schema, pointer);
      if (resolved != null) {
        return resolved;
      }
    }

    return null;
  }

  static async create(
    config: CodeGenConfig,
    usageSchema: OpenAPI.Document,
    originalSchema: OpenAPI.Document,
  ) {
    const resolvers: Awaited<ReturnType<typeof resolve>>[] = [];

    const options: SwaggerParser.Options = {
      continueOnError: true,
      mutateInputSchema: true,
      dereference: {},
      validate: {
        schema: false,
        spec: false,
      },
      resolve: {
        external: true,
        http: {
          ...config.requestOptions,
          headers: Object.assign(
            {},
            config.authorizationToken
              ? {
                  Authorization: config.authorizationToken,
                }
              : {},
            config.requestOptions?.headers ?? {},
          ),
        },
      },
    };

    try {
      resolvers.push(
        await SwaggerParser.resolve(
          originalSchema,
          // this.config.url || this.config.input || (this.config.spec as any),
          options,
        ),
      );
    } catch (e) {
      consola.debug(e);
    }
    try {
      resolvers.push(await SwaggerParser.resolve(usageSchema, options));
    } catch (e) {
      consola.debug(e);
    }
    try {
      resolvers.push(
        await SwaggerParser.resolve(
          config.url || config.input || (config.spec as any),
          options,
        ),
      );
    } catch (e) {
      consola.debug(e);
    }

    return new ResolvedSwaggerSchema(
      config,
      usageSchema,
      originalSchema,
      resolvers,
    );
  }
}
