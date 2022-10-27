const { Configuration } = require("./configuration.js");
const _ = require("lodash");
const converter = require("swagger2openapi");
const https = require("https");
const axios = require("axios");
const yaml = require("js-yaml");

class SwaggerSchemaResolver {
  /**
   * @type {Configuration}
   */
  config;
  /**
   * @type {Logger}
   */
  logger;
  /**
   * @type {FileSystem}
   */
  fileSystem;

  constructor(configuration, logger, fileSystem) {
    this.config = configuration;
    this.logger = logger;
    this.fileSystem = fileSystem;
  }

  /**
   *
   * @returns {Promise<{usageSchema: Record<string, *>, originalSchema: Record<string, *>}>}
   */
  async create() {
    const { spec, patch, input, url, disableStrictSSL, disableProxy, authorizationToken } = this.config;

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
    const swaggerSchemaObject = this.processSwaggerSchemaFile(swaggerSchemaFile);
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
      const result = _.cloneDeep(swaggerSchema);
      result.info = _.merge(
        {
          title: "No title",
          version: "",
        },
        result.info,
      );

      if (!result.openapi) {
        result.paths = _.merge({}, result.paths);

        converter.convertObj(
          result,
          {
            ...converterOptions,
            warnOnly: true,
            refSiblings: "preserve",
            rbname: "requestBodyName",
          },
          (err, options) => {
            const parsedSwaggerSchema = _.get(err, "options.openapi", _.get(options, "openapi"));
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
          originalSchema: _.cloneDeep(result),
        });
      }
    });
  }

  fetchSwaggerSchemaFile(pathToSwagger, urlToSwagger, disableStrictSSL, disableProxy, authorizationToken) {
    return new Promise((resolve, reject) => {
      if (this.fileSystem.pathIsExist(pathToSwagger)) {
        this.logger.log(`try to get swagger by path "${pathToSwagger}"`);
        resolve(this.fileSystem.getFileContent(pathToSwagger));
      } else {
        this.logger.log(`try to get swagger by URL "${urlToSwagger}"`);
        // setup options for Axios
        const axiosOptions = {
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
        };
        //
        if (disableStrictSSL) {
          axiosOptions.httpsAgent = new https.Agent({
            rejectUnauthorized: false,
          });
        }
        //
        if (authorizationToken) {
          axiosOptions.headers = {
            Authorization: authorizationToken,
          };
        }
        //
        if (disableProxy) axiosOptions.proxy = false;
        //
        axios
          .get(urlToSwagger, axiosOptions)
          .then((res) => resolve(res.data))
          .catch((error) => {
            const message = `error while getting swagger by URL ${urlToSwagger}`;

            this.logger.error(message, "response" in error ? error.response : error);

            reject(message);
          });
      }
    });
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
    const usagePaths = _.get(usageSchema, "paths");
    const originalPaths = _.get(originalSchema, "paths");

    // walk by routes
    _.each(usagePaths, (usagePathObject, route) => {
      const originalPathObject = _.get(originalPaths, route);

      // walk by methods
      _.each(usagePathObject, (usageRouteInfo, methodName) => {
        const originalRouteInfo = _.get(originalPathObject, methodName);
        const usageRouteParams = _.get(usageRouteInfo, "parameters", []);
        const originalRouteParams = _.get(originalRouteInfo, "parameters", []);

        usageRouteInfo.consumes = _.uniq(
          _.compact([...(usageRouteInfo.consumes || []), ...(originalRouteInfo.consumes || [])]),
        );
        usageRouteInfo.produces = _.uniq(
          _.compact([...(usageRouteInfo.produces || []), ...(originalRouteInfo.produces || [])]),
        );

        _.each(originalRouteParams, (originalRouteParam) => {
          const existUsageParam = _.find(
            usageRouteParams,
            (param) => originalRouteParam.in === param.in && originalRouteParam.name === param.name,
          );
          if (!existUsageParam) {
            usageRouteParams.push(originalRouteParam);
          }
        });
      });
    });
  }
}

module.exports = {
  SwaggerSchemaResolver,
};
