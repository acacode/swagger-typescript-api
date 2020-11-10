#!/usr/bin/env node

// Copyright (c) 2019-present acacode
// Node module: swagger-typescript-api
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
// Repository https://github.com/acacode/swagger-typescript-api

const eta = require("eta");
const prettier = require("prettier");
const _ = require("lodash");
const { resolve } = require("path");
const { parseSchemas } = require("./schema");
const { parseRoutes, groupRoutes } = require("./routes");
const { createApiConfig } = require("./apiConfig");
const { getModelType } = require("./modelTypes");
const { getSwaggerObject, fixSwaggerScheme, convertSwaggerObject } = require("./swagger");
const { createComponentsMap, filterComponentsMap } = require("./components");
const { createFile, pathIsExist } = require("./files");
const { addToConfig, config } = require("./config");
const { getTemplates } = require("./templates");

const prettierFormat = (content) =>
  prettier.format(content, {
    printWidth: 120,
    tabWidth: 2,
    trailingComma: "all",
    parser: "typescript",
  });

module.exports = {
  generateApi: ({
    input,
    output,
    url,
    spec,
    name,
    toJS,
    templates = resolve(__dirname, config.templates),
    generateResponses = config.generateResponses,
    defaultResponseAsSuccess = config.defaultResponseAsSuccess,
    generateRouteTypes = config.generateRouteTypes,
    generateClient = config.generateClient,
    generateUnionEnums = config.generateUnionEnums,
  }) =>
    new Promise((resolve, reject) => {
      addToConfig({
        defaultResponseAsSuccess,
        generateRouteTypes,
        generateClient,
        generateResponses,
        templates,
        generateUnionEnums,
      });
      (spec ? convertSwaggerObject(spec) : getSwaggerObject(input, url))
        .then(({ usageSchema, originalSchema }) => {
          const {
            dataContractsTemplate,
            httpClientTemplate,
            apiTemplate,
            routeTypesTemplate,
          } = getTemplates();

          console.log("☄️  start generating your typescript api");

          fixSwaggerScheme(usageSchema, originalSchema);

          addToConfig({
            swaggerSchema: usageSchema,
            originalSchema,
          });

          const { info, paths, servers, components } = usageSchema;

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

          let sourceFileContent = [
            eta.render(dataContractsTemplate, configuration, { async: false }),
            generateRouteTypes
              ? eta.render(routeTypesTemplate, configuration, { async: false })
              : "",
            generateClient ? eta.render(httpClientTemplate, configuration, { async: false }) : "",
            generateClient ? eta.render(apiTemplate, configuration, { async: false }) : "",
          ].join("");

          if (toJS) {
            const {
              sourceFile: sourceJsFile,
              declarationFile,
            } = require("./translators/JavaScript").translate(name, sourceFileContent);

            sourceJsFile.content = prettierFormat(sourceJsFile.content);
            declarationFile.content = prettierFormat(declarationFile.content);

            if (pathIsExist(output)) {
              createFile(output, sourceJsFile.name, sourceJsFile.content);
              createFile(output, declarationFile.name, declarationFile.content);
              console.log(`✔️  your javascript api file created in "${output}"`);
            }
            resolve(sourceJsFile.content);
          } else {
            sourceFileContent = prettierFormat(sourceFileContent);

            if (pathIsExist(output)) {
              createFile(output, name, sourceFileContent);
              console.log(`✔️  your typescript api file created in "${output}"`);
            }
            resolve(sourceFileContent);
          }
        })
        .catch((e) => {
          reject(e);
          throw new Error("Swagger schema parse error!\r\n " + e);
        });
    }),
};
