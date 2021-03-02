const _ = require("lodash");
const yaml = require("js-yaml");
const axios = require("axios");
const converter = require("swagger2openapi");
const https = require("https");
const { addToConfig, config } = require("./config");
const { pathIsExist, getFileContent } = require("./files");

const parseSwaggerFile = (file) => {
  if (typeof file !== "string") return file;

  try {
    return JSON.parse(file);
  } catch (e) {
    return yaml.load(file);
  }
};

const getSwaggerFile = (pathToSwagger, urlToSwagger, disableStrictSSL) =>
  new Promise((resolve) => {
    if (pathIsExist(pathToSwagger)) {
      if (!config.silent) console.log(`✨ try to get swagger by path "${pathToSwagger}"`);
      resolve(getFileContent(pathToSwagger));
    } else {
      if (!config.silent) console.log(`✨ try to get swagger by url "${urlToSwagger}"`);
      let agent = undefined;
      if (disableStrictSSL) {
        agent = new https.Agent({
          rejectUnauthorized: false,
        });
      }
      axios.get(urlToSwagger, { httpsAgent: agent }).then((res) => resolve(res.data));
    }
  });

const getSwaggerObject = (pathToSwagger, urlToSwagger, disableStrictSSL) =>
  getSwaggerFile(pathToSwagger, urlToSwagger, disableStrictSSL).then((file) =>
    convertSwaggerObject(parseSwaggerFile(file)),
  );

const convertSwaggerObject = (swaggerSchema) => {
  return new Promise((resolve) => {
    if (!swaggerSchema.openapi) {
      converter.convertObj(
        swaggerSchema,
        {
          warnOnly: true,
          refSiblings: "preserve",
          rbname: "requestBodyName",
        },
        function (err, options) {
          const parsedSwaggerSchema = _.get(err, "options.openapi", _.get(options, "openapi"));
          if (!parsedSwaggerSchema && err) {
            throw new Error(err);
          }
          addToConfig({ convertedFromSwagger2: true });
          resolve({
            usageSchema: parsedSwaggerSchema,
            originalSchema: swaggerSchema,
          });
        },
      );
    } else {
      resolve({
        usageSchema: swaggerSchema,
        originalSchema: swaggerSchema,
      });
    }
  });
};

const fixSwaggerScheme = (usage, original) => {
  const usagePaths = _.get(usage, "paths");
  const originalPaths = _.get(original, "paths");

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
};

module.exports = {
  getSwaggerObject,
  fixSwaggerScheme,
  convertSwaggerObject,
};
