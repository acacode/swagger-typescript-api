import { consola } from "consola";
import * as yaml from "js-yaml";
import lodash from "lodash";
import type { OpenAPI, OpenAPIV2 } from "openapi-types";
import * as swagger2openapi from "swagger2openapi";
import type { CodeGenConfig } from "./configuration.js";
import { JsonLdSchemaResolver } from "./jsonld-schema-resolver.js";
import type { FileSystem } from "./util/file-system.js";
import { Request } from "./util/request.js";

export class SwaggerSchemaResolver {
  config: CodeGenConfig;
  fileSystem: FileSystem;
  request: Request;

  constructor(config: CodeGenConfig, fileSystem: FileSystem) {
    this.config = config;
    this.fileSystem = fileSystem;
    this.request = new Request(config);
  }

  async create() {
    const { spec, patch, input, url, authorizationToken } = this.config;

    if (spec) {
      return await this.convertSwaggerObject(spec, { patch });
    }

    const swaggerSchemaFile = await this.fetchSwaggerSchemaFile(
      input,
      url,
      authorizationToken,
    );
    const swaggerSchemaObject =
      this.processSwaggerSchemaFile(swaggerSchemaFile);
    return await this.convertSwaggerObject(swaggerSchemaObject, { patch });
  }

  convertSwaggerObject(
    swaggerSchema: OpenAPI.Document,
    converterOptions: { patch?: boolean },
  ): Promise<{
    usageSchema: OpenAPI.Document;
    originalSchema: OpenAPI.Document;
  }> {
    return new Promise((resolve) => {
      const result = structuredClone(swaggerSchema);
      result.info = lodash.merge(
        {
          title: "No title",
          version: "",
        },
        result.info,
      );

      // Process JSON-LD schemas
      this.processJsonLdSchemas(result);

      if (!Object.hasOwn(result, "openapi")) {
        result.paths = lodash.merge({}, result.paths);

        swagger2openapi.convertObj(
          result as OpenAPIV2.Document,
          {
            ...converterOptions,
            resolveInternal: true,
            warnOnly: true,
            refSiblings: "preserve",
            rbname: "requestBodyName",
          },
          (err, options) => {
            const parsedSwaggerSchema = lodash.get(
              err,
              "options.openapi",
              lodash.get(options, "openapi"),
            );
            if (!parsedSwaggerSchema && err) {
              throw err;
            }
            this.config.update({ convertedFromSwagger2: true });
            resolve({
              usageSchema: parsedSwaggerSchema,
              originalSchema: result,
            });
          },
        );
      } else {
        resolve({
          usageSchema: result,
          originalSchema: structuredClone(result),
        });
      }
    });
  }

  getSwaggerSchemaByPath = (pathToSwagger: string) => {
    consola.info(`try to get swagger by path "${pathToSwagger}"`);
    return this.fileSystem.getFileContent(pathToSwagger);
  };

  async fetchSwaggerSchemaFile(
    pathToSwagger: string,
    urlToSwagger: string,
    authToken?: string,
  ) {
    if (this.fileSystem.pathIsExist(pathToSwagger)) {
      return this.getSwaggerSchemaByPath(pathToSwagger);
    }
    consola.info(`try to get swagger by URL "${urlToSwagger}"`);
    return await this.request.download({
      url: urlToSwagger,
      authToken: authToken,
    });
  }

  processSwaggerSchemaFile(file: string) {
    if (typeof file !== "string") return file;

    try {
      return JSON.parse(file);
    } catch (e) {
      return yaml.load(file);
    }
  }

  fixSwaggerSchema({ usageSchema, originalSchema }) {
    const usagePaths = lodash.get(usageSchema, "paths");
    const originalPaths = lodash.get(originalSchema, "paths");

    // walk by routes
    lodash.each(usagePaths, (usagePathObject, route) => {
      const originalPathObject = lodash.get(originalPaths, route);

      // walk by methods
      lodash.each(usagePathObject, (usageRouteInfo, methodName) => {
        const originalRouteInfo = lodash.get(originalPathObject, methodName);
        const usageRouteParams = lodash.get(usageRouteInfo, "parameters", []);
        const originalRouteParams = lodash.get(
          originalRouteInfo,
          "parameters",
          [],
        );

        if (typeof usageRouteInfo === "object") {
          usageRouteInfo.consumes = lodash.uniq(
            lodash.compact([
              ...(usageRouteInfo.consumes || []),
              ...(originalRouteInfo.consumes || []),
            ]),
          );
          usageRouteInfo.produces = lodash.uniq(
            lodash.compact([
              ...(usageRouteInfo.produces || []),
              ...(originalRouteInfo.produces || []),
            ]),
          );
        }

        lodash.each(originalRouteParams, (originalRouteParam) => {
          const existUsageParam = usageRouteParams.find(
            (param) =>
              originalRouteParam.in === param.in &&
              originalRouteParam.name === param.name,
          );
          if (!existUsageParam) {
            usageRouteParams.push(originalRouteParam);
          }
        });
      });
    });
  }

  /**
   * Process JSON-LD schemas within the OpenAPI document
   */
  processJsonLdSchemas(schema: OpenAPI.Document) {
    if (!schema.components?.schemas) return;

    const jsonLdResolver = new JsonLdSchemaResolver(this.config, null, null);

    Object.entries(schema.components.schemas).forEach(
      ([schemaName, schemaDefinition]) => {
        if (jsonLdResolver.isJsonLdSchema(schemaDefinition)) {
          consola.info(`Processing JSON-LD schema: ${schemaName}`);

          // Resolve JSON-LD schema to internal format
          const resolvedSchema =
            jsonLdResolver.resolveJsonLdSchema(schemaDefinition);

          // Merge resolved schema back
          Object.assign(schemaDefinition, resolvedSchema);

          // Add JSON-LD utilities if enabled
          if (this.config.jsonLdOptions.generateUtils) {
            this.ensureJsonLdUtilities(schema);
          }
        }
      },
    );
  }

  /**
   * Ensure JSON-LD utility types are available
   */
  private ensureJsonLdUtilities(schema: OpenAPI.Document) {
    if (!schema.components) {
      schema.components = {};
    }
    if (!schema.components.schemas) {
      schema.components.schemas = {};
    }

    // Add base JSON-LD entity interface if not present
    if (!schema.components.schemas.JsonLdEntity) {
      schema.components.schemas.JsonLdEntity = {
        type: "object",
        properties: {
          "@context": {
            oneOf: [
              { type: "string" },
              { type: "object" },
              {
                type: "array",
                items: {
                  oneOf: [{ type: "string" }, { type: "object" }],
                },
              },
            ],
            description: "JSON-LD context defining the meaning of terms",
          },
          "@type": {
            oneOf: [
              { type: "string" },
              {
                type: "array",
                items: { type: "string" },
              },
            ],
            description: "JSON-LD type identifier",
          },
          "@id": {
            type: "string",
            format: "uri",
            description: "JSON-LD identifier (IRI)",
          },
        },
        "x-jsonld-base": true,
      };
    }
  }
}
