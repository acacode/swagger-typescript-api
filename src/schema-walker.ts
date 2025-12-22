import { get } from "es-toolkit/compat";
import type { OpenAPI } from "openapi-types";
import type { CodeGenConfig } from "./configuration.js";
import type { SwaggerSchemaResolver } from "./swagger-schema-resolver.js";

// TODO: WIP
// this class will be needed to walk by schema everywhere
export class SchemaWalker {
  config: CodeGenConfig;
  swaggerSchemaResolver: SwaggerSchemaResolver;
  schemas = new Map<string, OpenAPI.Document>();
  caches = new Map<string, OpenAPI.Document>();

  constructor(
    config: CodeGenConfig,
    swaggerSchemaResolver: SwaggerSchemaResolver,
  ) {
    this.config = config;
    this.swaggerSchemaResolver = swaggerSchemaResolver;
  }

  addSchema = (name: string, schema: OpenAPI.Document) => {
    this.schemas.set(name, structuredClone(schema));
  };

  _isLocalRef = (ref: string) => {
    return ref.startsWith("#");
  };

  _isRemoteRef = (ref: string) => {
    return ref.startsWith("http://") || ref.startsWith("https://");
  };

  _getRefDataFromSchema = (schema: Record<string, unknown>, ref: string) => {
    const path = ref.replace("#", "").split("/");
    const refData = get(schema, path);
    if (refData) {
      this.caches.set(ref, refData);
    }
    return refData;
  };
}
