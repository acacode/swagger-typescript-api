#!/usr/bin/env node

// Copyright (c) 2019-present acacode
// Node module: swagger-typescript-api
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
// Repository https://github.com/acacode/swagger-typescript-api

const _ = require("lodash");
const { parseSchemas } = require("./schema");
const { parseRoutes, groupRoutes } = require("./routes");
const { createApiConfig } = require("./apiConfig");
const { prepareModelType } = require("./modelTypes");
const { getSwaggerObject, fixSwaggerScheme, convertSwaggerObject } = require("./swagger");
const { createComponentsMap, filterComponentsMap } = require("./components");
const { createFile, pathIsExist, pathIsDir, createDir, cleanDir } = require("./files");
const { addToConfig, config } = require("./config");
const { getTemplates, getTemplatePaths } = require("./templates");
const constants = require("./constants");
const { generateOutputFiles } = require("./output");

module.exports = {
  generateApi: ({
    input,
    output,
    url,
    spec,
    name: fileName,
    toJS: translateToJavaScript,
    modular,
    templates,
    generateResponses = config.generateResponses,
    defaultResponseAsSuccess = config.defaultResponseAsSuccess,
    generateRouteTypes = config.generateRouteTypes,
    generateClient = config.generateClient,
    httpClientType = config.httpClientType,
    generateUnionEnums = config.generateUnionEnums,
    moduleNameIndex = config.moduleNameIndex,
    extractRequestParams = config.extractRequestParams,
    defaultResponseType = config.defaultResponseType,
    singleHttpClient = config.singleHttpClient,
    prettier: prettierOptions = constants.PRETTIER_OPTIONS,
    hooks: rawHooks,
    extraTemplates,
    enumNamesAsValues,
    disableStrictSSL = config.disableStrictSSL,
    cleanOutput,
  }) =>
    new Promise((resolve, reject) => {
      addToConfig({
        defaultResponseAsSuccess,
        generateRouteTypes,
        generateClient,
        httpClientType,
        generateResponses,
        templates,
        generateUnionEnums,
        moduleNameIndex,
        prettierOptions,
        modular,
        extractRequestParams,
        hooks: _.merge(config.hooks, rawHooks || {}),
        enumNamesAsValues,
        disableStrictSSL,
        cleanOutput,
        defaultResponseType,
        singleHttpClient,
        constants,
      });
      (spec ? convertSwaggerObject(spec) : getSwaggerObject(input, url, disableStrictSSL))
        .then(({ usageSchema, originalSchema }) => {
          const templatePaths = getTemplatePaths(config);

          addToConfig({ templatePaths });

          const templatesToRender = getTemplates(config);

          console.log("☄️  start generating your typescript api");

          fixSwaggerScheme(usageSchema, originalSchema);

          addToConfig({
            swaggerSchema: usageSchema,
            originalSchema,
            templatesToRender,
          });

          const { components } = usageSchema;

          addToConfig(config.hooks.onInit(config) || config);

          const componentsMap = createComponentsMap(components);

          const parsedSchemas = parseSchemas(components);

          config.routeNameDuplicatesMap.clear();

          const routes = parseRoutes({
            usageSchema,
            parsedSchemas,
            moduleNameIndex,
            extractRequestParams,
          });

          const hasSecurityRoutes = routes.some((route) => route.security);
          const hasQueryRoutes = routes.some((route) => route.hasQuery);
          const hasFormDataRoutes = routes.some((route) => route.hasFormDataParams);

          const rawConfiguration = {
            apiConfig: createApiConfig(usageSchema, hasSecurityRoutes),
            config,
            modelTypes: _.map(filterComponentsMap(componentsMap, "schemas"), prepareModelType),
            hasFormDataRoutes,
            hasSecurityRoutes,
            hasQueryRoutes,
            generateResponses,
            routes: groupRoutes(routes),
            extraTemplates,
            fileName,
            translateToJavaScript,
            utils: {
              ...require("./render/utils"),
              ...require("./common"),
            },
          };

          const configuration = config.hooks.onPrepareConfig(rawConfiguration) || rawConfiguration;

          if (pathIsExist(output)) {
            if (cleanOutput) {
              cleanDir(output);
            }
          } else {
            createDir(output);
          }

          const files = generateOutputFiles({
            modular,
            templatesToRender,
            configuration,
          });

          const isDirPath = pathIsDir(output);

          const generatedFiles = files.map((file) => {
            if (!isDirPath) return file;

            if (translateToJavaScript) {
              createFile(output, file.name, file.content);
              createFile(output, file.declaration.name, file.declaration.content);
              console.log(`✔️  your javascript api file created in "${output}"`);
            } else {
              createFile(output, file.name, file.content);
              console.log(`✔️  your typescript api file created in "${output}"`);
            }

            return file;
          });

          resolve({
            files: generatedFiles,
            configuration,
          });
        })
        .catch((e) => {
          reject(e);
          throw new Error("Swagger schema parse error!\r\n " + e);
        });
    }),
};
