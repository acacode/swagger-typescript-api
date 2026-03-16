import * as fs from "node:fs";
import path from "node:path";
import type { resolve } from "@apidevtools/swagger-parser";
import SwaggerParser from "@apidevtools/swagger-parser";
import consola from "consola";
import type { OpenAPI } from "openapi-types";
import type { AnyObject, Maybe, Primitive } from "yummies/types";
import type { CodeGenConfig } from "./configuration.js";
import { parseSchemaContent } from "./util/parse-schema-content.js";

export interface RefDetails {
  ref: string;
  isLocal: boolean;
  externalUrlOrPath: Maybe<string>;
  externalOpenapiFileName?: string;
}

export class ResolvedSwaggerSchema {
  private parsedRefsCache = new Map<string, RefDetails>();
  private externalSchemaCache = new Map<string, AnyObject>();
  private httpMethodSegments = new Set([
    "get",
    "put",
    "post",
    "delete",
    "patch",
    "options",
    "head",
    "trace",
    "parameters",
  ]);

  private normalizeRef(ref: string): string {
    let normalizedRef = ref;

    // Some specs contain refs like "./file.yaml/#/components/..."
    // while resolvers usually expect "./file.yaml#/components/...".
    normalizedRef = normalizedRef.replace(/\/#(?=\/)/, "#");

    // Keep backward compatibility with refs like "#components/..."
    normalizedRef = normalizedRef.replace(/#(?!\/)/, "#/");

    return normalizedRef;
  }

  private createEscapedPathsRefVariant(ref: string): string | null {
    const normalizedRef = this.normalizeRef(ref);
    const [prefix = "", rawPointer = ""] = normalizedRef.split("#");
    const pointer = rawPointer.startsWith("/") ? rawPointer : `/${rawPointer}`;

    if (!pointer.startsWith("/paths/") || pointer.startsWith("/paths/~1")) {
      return null;
    }

    const rest = pointer.slice("/paths/".length);
    if (!rest) {
      return null;
    }

    const parts = rest.split("/");
    const last = parts.at(-1)?.toLowerCase() || "";

    const hasTailSegment = this.httpMethodSegments.has(last);
    const pathParts = hasTailSegment ? parts.slice(0, -1) : parts;
    const tail = hasTailSegment ? `/${parts.at(-1)}` : "";

    if (!pathParts.length) {
      return null;
    }

    const rawPathKey = pathParts.join("/");
    const escapedPathKey = `~1${rawPathKey.replace(/\//g, "~1")}`;

    return `${prefix}#/paths/${escapedPathKey}${tail}`;
  }

  private isHttpUrl(value: string): boolean {
    return /^https?:\/\//i.test(value);
  }

  private getRemoteRequestHeaders(): Record<string, string> {
    return Object.assign(
      {},
      this.config.authorizationToken
        ? {
            Authorization: this.config.authorizationToken,
          }
        : {},
      (this.config.requestOptions?.headers as
        | Record<string, string>
        | undefined) || {},
    );
  }

  private stripHash(urlOrPath: string): string {
    return urlOrPath.split("#")[0] || urlOrPath;
  }

  private extractRefsFromSchema(schema: unknown): string[] {
    const refs = new Set<string>();

    const walk = (node: unknown) => {
      if (!node || typeof node !== "object") {
        return;
      }

      if (Array.isArray(node)) {
        for (const item of node) {
          walk(item);
        }
        return;
      }

      const recordNode = node as Record<string, unknown>;
      if (typeof recordNode.$ref === "string") {
        refs.add(recordNode.$ref);
      }

      for (const value of Object.values(recordNode)) {
        walk(value);
      }
    };

    walk(schema);
    return [...refs];
  }

  private async fetchRemoteSchemaDocument(
    url: string,
  ): Promise<Maybe<AnyObject>> {
    try {
      const response = await fetch(url, {
        headers: this.getRemoteRequestHeaders(),
      });

      if (!response.ok) {
        return null;
      }

      const content = await response.text();

      try {
        const parsed = parseSchemaContent(content);
        if (parsed && typeof parsed === "object") {
          return parsed as AnyObject;
        }
      } catch {
        return null;
      }
    } catch (e) {
      consola.debug(e);
    }

    return null;
  }

  private async warmUpRemoteSchemasCache() {
    if (
      typeof this.config.url !== "string" ||
      !this.isHttpUrl(this.config.url)
    ) {
      return;
    }

    const visited = new Set<string>();
    const queue = [this.stripHash(this.config.url)];

    while (queue.length > 0) {
      const currentUrl = queue.shift();
      if (!currentUrl || visited.has(currentUrl)) {
        continue;
      }
      visited.add(currentUrl);

      if (this.externalSchemaCache.has(currentUrl)) {
        continue;
      }

      const schema = await this.fetchRemoteSchemaDocument(currentUrl);
      if (!schema) {
        continue;
      }

      this.externalSchemaCache.set(currentUrl, schema);

      for (const ref of this.extractRefsFromSchema(schema)) {
        const normalizedRef = this.normalizeRef(ref);
        if (normalizedRef.startsWith("#")) {
          continue;
        }

        const [externalPath = ""] = normalizedRef.split("#");
        if (!externalPath) {
          continue;
        }

        let absoluteUrl = "";
        try {
          absoluteUrl = this.isHttpUrl(externalPath)
            ? this.stripHash(externalPath)
            : this.stripHash(new URL(externalPath, currentUrl).toString());
        } catch (e) {
          consola.debug(e);
        }

        if (absoluteUrl && !visited.has(absoluteUrl)) {
          queue.push(absoluteUrl);
        }
      }
    }
  }

  private collectRemoteAbsoluteRefCandidates(ref: string): string[] {
    if (!ref || this.isHttpUrl(ref) || ref.startsWith("#")) {
      return [];
    }

    const [relativePath = "", rawPointer = ""] =
      this.normalizeRef(ref).split("#");
    if (!relativePath) {
      return [];
    }

    const pointer = rawPointer
      ? rawPointer.startsWith("/")
        ? rawPointer
        : `/${rawPointer}`
      : "";

    const bases = new Set<string>();

    if (
      typeof this.config.url === "string" &&
      this.isHttpUrl(this.config.url)
    ) {
      bases.add(this.config.url);
    }

    for (const cachedUrl of this.externalSchemaCache.keys()) {
      if (this.isHttpUrl(cachedUrl)) {
        bases.add(cachedUrl);
      }
    }

    for (const resolver of this.resolvers) {
      try {
        const resolverPaths =
          typeof resolver.paths === "function" ? resolver.paths() : [];
        for (const resolverPath of resolverPaths) {
          if (
            typeof resolverPath === "string" &&
            this.isHttpUrl(resolverPath)
          ) {
            bases.add(resolverPath);
          }
        }
      } catch (e) {
        consola.debug(e);
      }
    }

    const results = new Set<string>();

    for (const base of bases) {
      try {
        const absolutePath = new URL(relativePath, base).toString();
        results.add(pointer ? `${absolutePath}#${pointer}` : absolutePath);
      } catch (e) {
        consola.debug(e);
      }
    }

    return [...results];
  }

  private resolveFromRemoteSchemaCache(
    absoluteRef: string,
  ): Maybe<AnyObject | Primitive> {
    const normalizedRef = this.normalizeRef(absoluteRef);
    const [externalPath = "", rawPointer = ""] = normalizedRef.split("#");

    if (!externalPath || !this.isHttpUrl(externalPath)) {
      return null;
    }

    const schema = this.externalSchemaCache.get(this.stripHash(externalPath));
    if (!schema) {
      return null;
    }

    const pointer = rawPointer
      ? rawPointer.startsWith("/")
        ? rawPointer
        : `/${rawPointer}`
      : "/";

    const resolved = this.resolveJsonPointer(schema, pointer);
    if (resolved == null) {
      return null;
    }

    return this.absolutizeLocalRefs(resolved, this.stripHash(externalPath));
  }

  private originalProducesByRoute: Record<string, Record<string, string[]>> =
    Object.create(null);

  private constructor(
    private config: CodeGenConfig,
    public usageSchema: OpenAPI.Document,
    public originalSchema: OpenAPI.Document,
    private resolvers: Awaited<ReturnType<typeof resolve>>[],
    originalProducesByRoute?: Record<string, Record<string, string[]>>,
  ) {
    this.usageSchema = usageSchema;
    this.originalSchema = originalSchema;
    if (originalProducesByRoute) {
      this.originalProducesByRoute = originalProducesByRoute;
    }
  }

  getOriginalProduces(pathName: string, method: string): string[] | undefined {
    return this.originalProducesByRoute[pathName]?.[method];
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
        const externalUrlOrPath = normalizedRef.split("#")[0] || "";
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

    const cachedRef = this.parsedRefsCache.get(ref);
    if (cachedRef) {
      return cachedRef;
    }

    if (normalizedRef.startsWith("#")) {
      return {
        ref: normalizedRef,
        isLocal: true,
        externalUrlOrPath: null,
      };
    }

    return {
      ref: normalizedRef,
      isLocal: false,
      externalUrlOrPath: normalizedRef.split("#")[0] || null,
      externalOpenapiFileName: "",
    };
  }

  isLocalRef(ref: string): boolean {
    return this.getRefDetails(ref).isLocal;
  }

  getRef(ref: Maybe<string>): Maybe<AnyObject | Primitive> {
    if (!ref) {
      return null;
    }

    const normalizedRef = this.normalizeRef(ref);
    const escapedPathsRefVariant = this.createEscapedPathsRefVariant(ref);

    if (normalizedRef !== ref) {
      const resolvedByNormalizedRef = this.tryToResolveRef(normalizedRef);

      if (resolvedByNormalizedRef) {
        return this.normalizeResolvedExternalSchemaRef(
          normalizedRef,
          resolvedByNormalizedRef,
        );
      }
    }

    if (escapedPathsRefVariant) {
      const resolvedByEscapedPathsRef = this.tryToResolveRef(
        escapedPathsRefVariant,
      );

      if (resolvedByEscapedPathsRef) {
        return this.normalizeResolvedExternalSchemaRef(
          escapedPathsRefVariant,
          resolvedByEscapedPathsRef,
        );
      }
    }

    const remoteAbsoluteCandidates =
      this.collectRemoteAbsoluteRefCandidates(ref);
    for (const remoteAbsoluteRef of remoteAbsoluteCandidates) {
      const resolvedFromRemoteCache =
        this.resolveFromRemoteSchemaCache(remoteAbsoluteRef);
      if (resolvedFromRemoteCache) {
        return resolvedFromRemoteCache;
      }

      const resolvedByRemoteAbsoluteRef =
        this.tryToResolveRef(remoteAbsoluteRef);
      if (resolvedByRemoteAbsoluteRef) {
        return this.normalizeResolvedExternalSchemaRef(
          remoteAbsoluteRef,
          resolvedByRemoteAbsoluteRef,
        );
      }
    }

    const resolvedByOrigRef = this.tryToResolveRef(ref);

    if (resolvedByOrigRef) {
      return this.normalizeResolvedExternalSchemaRef(ref, resolvedByOrigRef);
    }

    // const ref.match(/\#[a-z]/)
    if (/#[a-z]/.test(ref)) {
      const fixedRef = ref.replace(/#[a-z]/, (match) => {
        const [hashtag, char] = match.split("");
        return `${hashtag}/${char}`;
      });

      const resolvedByFixedRef = this.tryToResolveRef(fixedRef);

      if (resolvedByFixedRef) {
        return this.normalizeResolvedExternalSchemaRef(
          fixedRef,
          resolvedByFixedRef,
        );
      }
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
      const parsed = parseSchemaContent(content);
      this.externalSchemaCache.set(filePath, parsed);
      return parsed;
    } catch {
      consola.debug("Failed to parse external schema", filePath);
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

    let current: unknown = source;

    for (const token of tokens) {
      if (!current || typeof current !== "object") {
        return null;
      }
      current = (current as Record<string, unknown>)[token];
    }

    return (current as Maybe<AnyObject | Primitive>) ?? null;
  }

  private absolutizeLocalRefs(
    value: Maybe<AnyObject | Primitive>,
    externalPath: string,
  ): Maybe<AnyObject | Primitive> {
    if (value == null || typeof value !== "object") {
      return value;
    }

    const cloneValue = structuredClone(value) as Maybe<AnyObject | Primitive>;
    const walk = (node: unknown) => {
      if (!node || typeof node !== "object") {
        return;
      }

      if (Array.isArray(node)) {
        for (const item of node) {
          walk(item);
        }
        return;
      }

      const recordNode = node as Record<string, unknown>;

      if (
        typeof recordNode.$ref === "string" &&
        recordNode.$ref.startsWith("#")
      ) {
        recordNode.$ref = `${externalPath}${this.normalizeRef(recordNode.$ref)}`;
      }

      for (const nested of Object.values(recordNode)) {
        walk(nested);
      }
    };

    walk(cloneValue);

    return cloneValue;
  }

  private normalizeResolvedExternalSchemaRef(
    ref: string,
    resolved: Maybe<AnyObject | Primitive>,
  ): Maybe<AnyObject | Primitive> {
    const normalizedRef = this.normalizeRef(ref);
    if (normalizedRef.startsWith("#")) {
      return resolved;
    }

    const externalPath = normalizedRef.split("#")[0] || "";
    if (!externalPath) {
      return resolved;
    }

    return this.absolutizeLocalRefs(resolved, externalPath);
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
          candidates.add(
            path.resolve(path.dirname(resolverPath), externalPath),
          );
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
        return this.absolutizeLocalRefs(resolved, externalPath);
      }
    }

    return null;
  }

  static async create(
    config: CodeGenConfig,
    usageSchema: OpenAPI.Document,
    originalSchema: OpenAPI.Document,
    originalProducesByRoute?: Record<string, Record<string, string[]>>,
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
          config.url || config.input || (config.spec as OpenAPI.Document),
          options,
        ),
      );
    } catch (e) {
      consola.debug(e);
    }

    const resolvedSwaggerSchema = new ResolvedSwaggerSchema(
      config,
      usageSchema,
      originalSchema,
      resolvers,
      originalProducesByRoute,
    );

    await resolvedSwaggerSchema.warmUpRemoteSchemasCache();

    return resolvedSwaggerSchema;
  }
}
