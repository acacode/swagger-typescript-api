import { consola } from "consola";
import { compact, merge, uniq } from "es-toolkit";
import { get } from "es-toolkit/compat";
import type { OpenAPI, OpenAPIV2, OpenAPIV3 } from "openapi-types";
import * as swagger2openapi from "swagger2openapi";
import * as YAML from "yaml";
import type { CodeGenConfig } from "./configuration.js";
import { ResolvedSwaggerSchema } from "./resolved-swagger-schema.js";
import type { FileSystem } from "./util/file-system.js";
import { Request } from "./util/request.js";

interface SwaggerSchemas {
  usageSchema: OpenAPI.Document;
  originalSchema: OpenAPI.Document;
}

export class SwaggerSchemaResolver {
  config: CodeGenConfig;
  fileSystem: FileSystem;
  request: Request;

  constructor(config: CodeGenConfig, fileSystem: FileSystem) {
    this.config = config;
    this.fileSystem = fileSystem;
    this.request = new Request(config);
  }

  async create(): Promise<ResolvedSwaggerSchema> {
    const { spec, patch, input, url, authorizationToken } = this.config;
    let swaggerSchemas: SwaggerSchemas;

    if (spec) {
      swaggerSchemas = await this.convertSwaggerObject(spec, { patch });
    } else {
      const swaggerSchemaFile = await this.fetchSwaggerSchemaFile(
        input,
        url,
        authorizationToken,
      );
      const swaggerSchemaObject =
        this.processSwaggerSchemaFile(swaggerSchemaFile);

      swaggerSchemas = await this.convertSwaggerObject(swaggerSchemaObject, {
        patch,
      });
    }

    this.fixSwaggerSchemas(swaggerSchemas);

    const resolvedSwaggerSchema = ResolvedSwaggerSchema.create(
      this.config,
      swaggerSchemas.usageSchema,
      swaggerSchemas.originalSchema,
    );

    return resolvedSwaggerSchema;
  }

  convertSwaggerObject(
    swaggerSchema: OpenAPI.Document,
    converterOptions: { patch?: boolean },
  ): Promise<SwaggerSchemas> {
    return new Promise((resolve) => {
      const result = structuredClone(swaggerSchema);
      result.info = merge(
        {
          title: "No title",
          version: "",
        },
        result.info || {},
      );

      if (!Object.hasOwn(result, "openapi")) {
        result.paths = merge({}, result.paths || {});

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
            const parsedSwaggerSchema =
              get(err, "options.openapi") ?? get(options, "openapi");
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
    } catch {
      return YAML.parse(file);
    }
  }

  private normalizeRefValue(ref: string): string {
    return ref
      .replace(/\/#(?=\/)/g, "#")
      .replace(/#(?!\/)/, "#/");
  }

  private normalizeRefsInSchema(schema: unknown): void {
    if (!schema || typeof schema !== "object") {
      return;
    }

    if (Array.isArray(schema)) {
      for (const value of schema) {
        this.normalizeRefsInSchema(value);
      }
      return;
    }

    const objectSchema = schema as Record<string, unknown>;

    if (typeof objectSchema.$ref === "string") {
      objectSchema.$ref = this.normalizeRefValue(objectSchema.$ref);
    }

    for (const value of Object.values(objectSchema)) {
      this.normalizeRefsInSchema(value);
    }
  }

  private fixSwaggerSchemas({ usageSchema, originalSchema }: SwaggerSchemas) {
    this.normalizeRefsInSchema(usageSchema);
    this.normalizeRefsInSchema(originalSchema);

    const usagePaths = get(usageSchema, "paths") || {};
    const originalPaths = get(originalSchema, "paths") || {};

    // walk by routes
    for (const [route, usagePathObject] of Object.entries(usagePaths)) {
      const originalPathObject = get(originalPaths, route) || {};

      // walk by methods
      for (const [methodName, usageRouteInfo] of Object.entries(
        usagePathObject as Record<string, any>,
      )) {
        const originalRouteInfo = get(originalPathObject, methodName) || {};
        const usageRouteParams = get(usageRouteInfo, "parameters") || [];
        const originalRouteParams = get(originalRouteInfo, "parameters") || [];

        const usageAsOpenapiv2 =
          usageRouteInfo as unknown as OpenAPIV2.Document;

        if (typeof usageRouteInfo === "object") {
          usageAsOpenapiv2.consumes = uniq(
            compact([
              ...(usageAsOpenapiv2.consumes || []),
              ...(originalRouteInfo.consumes || []),
            ]),
          );
          usageAsOpenapiv2.produces = uniq(
            compact([
              ...(usageAsOpenapiv2.produces || []),
              ...(originalRouteInfo.produces || []),
            ]),
          );
        }

        for (const originalRouteParam of originalRouteParams) {
          const existUsageParam = usageRouteParams.find(
            (param: OpenAPIV3.ParameterObject) =>
              originalRouteParam.in === param.in &&
              originalRouteParam.name === param.name,
          );
          if (!existUsageParam) {
            usageRouteParams.push(originalRouteParam);
          }
        }
      }
    }
  }
}
