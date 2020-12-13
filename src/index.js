#!/usr/bin/env node

// Copyright (c) 2019-present acacode
// Node module: swagger-typescript-api
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
// Repository https://github.com/acacode/swagger-typescript-api

const Eta = require("eta");
const prettier = require("prettier");
const _ = require("lodash");
const path = require("path");
const { parseSchemas } = require("./schema");
const { parseRoutes, groupRoutes } = require("./routes");
const { createApiConfig } = require("./apiConfig");
const { getModelType } = require("./modelTypes");
const { getSwaggerObject, fixSwaggerScheme, convertSwaggerObject } = require("./swagger");
const { createComponentsMap, filterComponentsMap } = require("./components");
const { createFile, pathIsExist } = require("./files");
const { addToConfig, config } = require("./config");
const { getTemplates, renderTemplate } = require("./templates");

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
    modular,
    prepareConfig,
    templates,
    generateResponses = config.generateResponses,
    defaultResponseAsSuccess = config.defaultResponseAsSuccess,
    generateRouteTypes = config.generateRouteTypes,
    generateClient = config.generateClient,
    generateUnionEnums = config.generateUnionEnums,
    moduleNameIndex = config.moduleNameIndex,
  }) =>
    new Promise((resolve, reject) => {
      templates =
        templates ||
        path.resolve(__dirname, modular ? "../templates/modular" : "../templates/default");

      addToConfig({
        defaultResponseAsSuccess,
        generateRouteTypes,
        generateClient,
        generateResponses,
        templates,
        generateUnionEnums,
        moduleNameIndex,
      });
      (spec ? convertSwaggerObject(spec) : getSwaggerObject(input, url))
        .then(({ usageSchema, originalSchema }) => {
          const templatesToRender = getTemplates(config);

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
          const routes = parseRoutes(usageSchema, parsedSchemas, componentsMap, components, moduleNameIndex);
          const hasSecurityRoutes = routes.some((route) => route.security);
          const hasQueryRoutes = routes.some((route) => route.hasQuery);
          const hasFormDataRoutes = routes.some((route) => route.hasFormDataParams);
          const apiConfig = createApiConfig({ info, servers }, hasSecurityRoutes);
          const rawConfiguration = {
            apiConfig,
            config,
            modelTypes: _.map(schemasMap, getModelType),
            hasFormDataRoutes,
            hasSecurityRoutes,
            hasQueryRoutes,
            generateResponses,
            routes: groupRoutes(routes),
            utils: require("./render/utils"),
          };

          const configuration = prepareConfig ? prepareConfig(rawConfiguration) : rawConfiguration;

          console.info("FFF", configuration.routes.$outOfModule);

          const files = modular
            ? [
                templatesToRender.dataContracts && {
                  name: "data-contracts.ts",
                  content: renderTemplate(templatesToRender.dataContracts, configuration),
                },
                configuration.config.generateRouteTypes &&
                  templatesToRender.routeTypes && {
                    name: "route-types.ts",
                    content: renderTemplate(templatesToRender.routeTypes, configuration),
                  },
                configuration.config.generateClient &&
                  templatesToRender.httpClient && {
                    name: "http-client.ts",
                    content: renderTemplate(templatesToRender.httpClient, configuration),
                  },
                configuration.config.generateClient &&
                  templatesToRender.api &&
                  configuration.routes.$outOfModule.length && {
                    name: `Common.ts`,
                    content: renderTemplate(templatesToRender.api, {
                      ...configuration,
                      route: configuration.routes.$outOfModule,
                    }),
                  },
                ...(configuration.config.generateClient && templatesToRender.api
                  ? _.reduce(
                      configuration.routes.combined,
                      (apis, route) => [
                        ...apis,
                        {
                          name: `${_.upperFirst(route.moduleName)}.ts`,
                          content: renderTemplate(templatesToRender.api, {
                            ...configuration,
                            route,
                          }),
                        },
                      ],
                      [],
                    )
                  : []),
              ].filter(Boolean)
            : [
                {
                  name: name,
                  content: [
                    templatesToRender.dataContracts &&
                      renderTemplate(templatesToRender.dataContracts, configuration),
                    configuration.config.generateRouteTypes &&
                      templatesToRender.routeTypes &&
                      renderTemplate(templatesToRender.routeTypes, configuration),
                    configuration.config.generateClient &&
                      templatesToRender.httpClient &&
                      renderTemplate(templatesToRender.httpClient, configuration),
                    configuration.config.generateClient &&
                      templatesToRender.api &&
                      renderTemplate(templatesToRender.api, configuration),
                  ]
                    .filter(Boolean)
                    .join("\n"),
                },
              ];

          const generatedFiles = files.map((file) => {
            if (toJS) {
              const { sourceFile, declarationFile } = require("./translators/JavaScript").translate(
                file.name,
                file.content,
              );

              sourceFile.content = prettierFormat(sourceFile.content);
              declarationFile.content = prettierFormat(declarationFile.content);

              if (pathIsExist(output)) {
                createFile(output, sourceFile.name, sourceFile.content);
                createFile(output, declarationFile.name, declarationFile.content);
                console.log(`✔️  your javascript api file created in "${output}"`);
              }

              return {
                name: file.name,
                content: sourceFile.content,
                declaration: declarationFile.content,
              };
            } else {
              file.content = prettierFormat(file.content);

              if (pathIsExist(output)) {
                createFile(output, file.name, file.content);
                console.log(`✔️  your typescript api file created in "${output}"`);
              }

              return file;
            }
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
