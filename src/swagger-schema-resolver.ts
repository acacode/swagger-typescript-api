import SwaggerParser, { type resolve } from "@apidevtools/swagger-parser";
import { consola } from "consola";
import lodash from "lodash";
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

    const resolvers: Awaited<ReturnType<typeof resolve>>[] = [];

    try {
      resolvers.push(
        await SwaggerParser.resolve(
          swaggerSchemas.originalSchema,
          // this.config.url || this.config.input || (this.config.spec as any),
          {
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
                ...this.config.requestOptions,
                headers: Object.assign(
                  {},
                  this.config.authorizationToken
                    ? {
                        Authorization: this.config.authorizationToken,
                      }
                    : {},
                  this.config.requestOptions?.headers ?? {},
                ),
              },
            },
          },
        ),
      );
    } catch (e) {
      consola.debug(e);
    }
    try {
      resolvers.push(
        await SwaggerParser.resolve(
          swaggerSchemas.usageSchema,
          // this.config.url || this.config.input || (this.config.spec as any),
          {
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
                ...this.config.requestOptions,
                headers: Object.assign(
                  {},
                  this.config.authorizationToken
                    ? {
                        Authorization: this.config.authorizationToken,
                      }
                    : {},
                  this.config.requestOptions?.headers ?? {},
                ),
              },
            },
          },
        ),
      );
    } catch (e) {
      consola.debug(e);
    }
    try {
      resolvers.push(
        await SwaggerParser.resolve(
          this.config.url || this.config.input || (this.config.spec as any),
          {
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
                ...this.config.requestOptions,
                headers: Object.assign(
                  {},
                  this.config.authorizationToken
                    ? {
                        Authorization: this.config.authorizationToken,
                      }
                    : {},
                  this.config.requestOptions?.headers ?? {},
                ),
              },
            },
          },
        ),
      );
    } catch (e) {
      consola.debug(e);
    }

    const resolvedSwaggerSchema = new ResolvedSwaggerSchema(
      this.config,
      swaggerSchemas.usageSchema,
      swaggerSchemas.originalSchema,
      resolvers,
    );

    return resolvedSwaggerSchema;
  }

  convertSwaggerObject(
    swaggerSchema: OpenAPI.Document,
    converterOptions: { patch?: boolean },
  ): Promise<SwaggerSchemas> {
    return new Promise((resolve) => {
      const result = structuredClone(swaggerSchema);
      result.info = lodash.merge(
        {
          title: "No title",
          version: "",
        },
        result.info,
      );

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
    } catch {
      return YAML.parse(file);
    }
  }

  private fixSwaggerSchemas({ usageSchema, originalSchema }: SwaggerSchemas) {
    const usagePaths = lodash.get(usageSchema, "paths");
    const originalPaths = lodash.get(originalSchema, "paths");

    // walk by routes
    lodash.each(usagePaths, (usagePathObject, route) => {
      const originalPathObject = lodash.get(originalPaths, route);

      // walk by methods
      lodash.each(usagePathObject, (usageRouteInfo, methodName) => {
        const originalRouteInfo = lodash.get(originalPathObject, methodName);
        const usageRouteParams = lodash.get(
          usageRouteInfo,
          "parameters",
          [],
        ) as OpenAPIV3.ParameterObject[];
        const originalRouteParams = lodash.get(
          originalRouteInfo,
          "parameters",
          [],
        );

        const usageAsOpenapiv2 =
          usageRouteInfo as unknown as OpenAPIV2.Document;

        if (typeof usageRouteInfo === "object") {
          usageAsOpenapiv2.consumes = lodash.uniq(
            lodash.compact([
              ...(usageAsOpenapiv2.consumes || []),
              ...(originalRouteInfo.consumes || []),
            ]),
          );
          usageAsOpenapiv2.produces = lodash.uniq(
            lodash.compact([
              ...(usageAsOpenapiv2.produces || []),
              ...(originalRouteInfo.produces || []),
            ]),
          );
        }

        lodash.each(originalRouteParams, (originalRouteParam) => {
          const existUsageParam = usageRouteParams.find(
            (param: OpenAPIV3.ParameterObject) =>
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
}
