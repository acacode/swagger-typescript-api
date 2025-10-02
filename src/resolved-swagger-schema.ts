import type { resolve } from "@apidevtools/swagger-parser";
import consola from "consola";
import type { OpenAPI } from "openapi-types";
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

  constructor(
    private config: CodeGenConfig,
    public usageSchema: OpenAPI.Document,
    public originalSchema: OpenAPI.Document,
    private resolvers: Awaited<ReturnType<typeof resolve>>[],
  ) {
    this.usageSchema = usageSchema;
    this.originalSchema = originalSchema;
  }

  getRefDetails(ref: string): RefDetails {
    if (!this.parsedRefsCache.has(ref)) {
      const isLocal = ref.startsWith("#");

      if (isLocal) {
        this.parsedRefsCache.set(ref, {
          ref,
          isLocal,
          externalUrlOrPath: null,
        });
      } else {
        const externalUrlOrPath = ref.split("#")[0]!;
        let externalOpenapiFileName = externalUrlOrPath.split("/").at(-1) || "";

        if (
          externalOpenapiFileName.endsWith(".json") ||
          externalOpenapiFileName.endsWith(".yaml")
        ) {
          externalOpenapiFileName = externalOpenapiFileName.slice(0, -5);
        } else if (externalOpenapiFileName.endsWith(".yml")) {
          externalOpenapiFileName = externalOpenapiFileName.slice(0, -4);
        }

        this.parsedRefsCache.set(ref, {
          ref,
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
}
