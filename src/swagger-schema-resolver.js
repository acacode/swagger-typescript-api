import { consola } from "consola";
import * as yaml from "js-yaml";
import lodash from "lodash";
import * as swagger2openapi from "swagger2openapi";
import { Request } from "./util/request.js";

class SwaggerSchemaResolver {
  /**
   * @type {CodeGenConfig}
   */
  config;
  /**
   * @type {FileSystem}
   */
  fileSystem;
  /**
   * @type {Request}
   */
  request;

  constructor({ config, fileSystem }) {
    this.config = config;
    this.fileSystem = fileSystem;
    this.request = new Request(config);
  }

  /**
   *
   * @returns {Promise<{usageSchema: Record<string, *>, originalSchema: Record<string, *>}>}
   */
  async create() {
    const {
      spec,
      patch,
      input,
      url,
      disableStrictSSL,
      disableProxy,
      authorizationToken,
    } = this.config;

    if (this.config.spec) {
      return await this.convertSwaggerObject(spec, { patch });
    }

    const swaggerSchemaFile = await this.fetchSwaggerSchemaFile(
      input,
      url,
      disableStrictSSL,
      disableProxy,
      authorizationToken,
    );
    const swaggerSchemaObject =
      this.processSwaggerSchemaFile(swaggerSchemaFile);
    return await this.convertSwaggerObject(swaggerSchemaObject, { patch });
  }

  /**
   *
   * @param swaggerSchema {Record<string, any>}
   * @param converterOptions {{ patch?: boolean }}
   * @returns {Promise<{ usageSchema: Record<string, any>, originalSchema: Record<string, any>}>}
   */
  convertSwaggerObject(swaggerSchema, converterOptions) {
    return new Promise((resolve) => {
      const result = structuredClone(swaggerSchema);
      result.info = lodash.merge(
        {
          title: "No title",
          version: "",
        },
        result.info,
      );

      if (!result.openapi) {
        result.paths = lodash.merge({}, result.paths);

        swagger2openapi.convertObj(
          result,
          {
            ...converterOptions,
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
              throw new Error(err);
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

  getSwaggerSchemaByPath = (pathToSwagger) => {
    consola.info(`try to get swagger by path "${pathToSwagger}"`);
    return this.fileSystem.getFileContent(pathToSwagger);
  };

  async fetchSwaggerSchemaFile(
    pathToSwagger,
    urlToSwagger,
    disableStrictSSL,
    disableProxy,
    authToken,
  ) {
    if (this.fileSystem.pathIsExist(pathToSwagger)) {
      return this.getSwaggerSchemaByPath(pathToSwagger);
    } else {
      consola.info(`try to get swagger by URL "${urlToSwagger}"`);
      return await this.request.download({
        url: urlToSwagger,
        disableStrictSSL,
        authToken,
        disableProxy,
      });
    }
  }

  processSwaggerSchemaFile(file) {
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
}

export { SwaggerSchemaResolver };
