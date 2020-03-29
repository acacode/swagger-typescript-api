#!/usr/bin/env node

// Copyright (c) 2019-present acacode
// Node module: swagger-typescript-api
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
// Repository https://github.com/acacode/swagger-typescript-api

const mustache = require("mustache");
const prettier = require("prettier");
const _ = require("lodash");
const { parseSchemas } = require("./schema");
const { parseRoutes, groupRoutes } = require("./routes");
const { createApiConfig } = require("./apiConfig");
const { getModelType } = require("./modelTypes");
const { getSwaggerObject, fixSwaggerScheme } = require("./swagger");
const { createComponentsMap, filterComponentsMap } = require("./components");
const { getTemplate, createFile, pathIsExist } = require("./files");
const { addToConfig, config } = require("./config");

mustache.escape = (value) => value;

const prettierConfig = {
  printWidth: 120,
  tabWidth: 2,
  trailingComma: "all",
  parser: "typescript",
};

module.exports = {
  generateApi: ({
    input,
    output,
    url,
    name,
    generateResponses = config.generateResponses,
    defaultResponseAsSuccess = config.defaultResponseAsSuccess,
    generateRouteTypes = config.generateRouteTypes,
    generateClient = config.generateClient,
  }) =>
    new Promise((resolve, reject) => {
      addToConfig({
        defaultResponseAsSuccess,
        generateRouteTypes,
        generateClient,
        generateResponses,
      });
      getSwaggerObject(input, url)
        .then(({ usageSchema, originalSchema }) => {
          console.log("☄️  start generating your typescript api");

          fixSwaggerScheme(usageSchema, originalSchema);

          addToConfig({
            swaggerSchema: usageSchema,
            originalSchema,
          });

          const { info, paths, servers, components } = usageSchema;

          const apiTemplate = getTemplate("api");
          const clientTemplate = getTemplate("client");
          const routeTypesTemplate = getTemplate("route-types");

          const componentsMap = createComponentsMap(components);
          const schemasMap = filterComponentsMap(componentsMap, "schemas");

          const parsedSchemas = parseSchemas(components);
          const routes = parseRoutes(usageSchema, parsedSchemas, componentsMap, components);
          const hasSecurityRoutes = routes.some((route) => route.security);
          const hasQueryRoutes = routes.some((route) => route.hasQuery);
          const hasFormDataRoutes = routes.some((route) => route.hasFormDataParams);
          const apiConfig = createApiConfig({ info, servers }, hasSecurityRoutes);

          const configuration = {
            apiConfig,
            modelTypes: _.map(schemasMap, getModelType),
            hasFormDataRoutes,
            hasSecurityRoutes,
            hasQueryRoutes,
            generateResponses,
            routes: groupRoutes(routes),
          };

          const sourceFile = prettier.format(
            [
              mustache.render(apiTemplate, configuration),
              generateRouteTypes ? mustache.render(routeTypesTemplate, configuration) : "",
              generateClient ? mustache.render(clientTemplate, configuration) : "",
            ].join(""),
            prettierConfig,
          );

          if (pathIsExist(output)) {
            createFile(output, name, sourceFile);
            console.log(`✔️  your typescript api file created in "${output}"`);
          }

          resolve(sourceFile);
        })
        .catch((e) => {
          reject(e);
          throw new Error("Swagger schema parse error!\r\n " + e);
        });
    }),
};
