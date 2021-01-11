#!/usr/bin/env node

// Copyright (c) 2019-present acacode
// Node module: swagger-typescript-api
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
// Repository https://github.com/acacode/swagger-typescript-api

const prettier = require("prettier");
const _ = require("lodash");
const { parseSchemas } = require("./schema");
const { parseRoutes, groupRoutes } = require("./routes");
const { createApiConfig } = require("./apiConfig");
const { prepareModelType } = require("./modelTypes");
const { getSwaggerObject, fixSwaggerScheme, convertSwaggerObject } = require("./swagger");
const { createComponentsMap, filterComponentsMap } = require("./components");
const { createFile, getFileContent, pathIsExist } = require("./files");
const { addToConfig, config } = require("./config");
const { getTemplates, renderTemplate } = require("./templates");
const constants = require("./constants");
const { classNameCase } = require("./render/utils");

module.exports = {
  generateApi: ({
    input,
    output,
    url,
    spec,
    name,
    toJS,
    modular,
    templates,
    generateResponses = config.generateResponses,
    defaultResponseAsSuccess = config.defaultResponseAsSuccess,
    generateRouteTypes = config.generateRouteTypes,
    generateClient = config.generateClient,
    generateUnionEnums = config.generateUnionEnums,
    moduleNameIndex = config.moduleNameIndex,
    extractRequestParams = config.extractRequestParams,
    prettier: prettierOptions = constants.PRETTIER_OPTIONS,
    hooks: rawHooks,
    extraTemplates,
    enumNamesAsValues,
  }) =>
    new Promise((resolve, reject) => {
      addToConfig({
        defaultResponseAsSuccess,
        generateRouteTypes,
        generateClient,
        generateResponses,
        templates,
        generateUnionEnums,
        moduleNameIndex,
        modular,
        extractRequestParams,
        hooks: _.merge(config.hooks, rawHooks || {}),
        enumNamesAsValues,
      });
      (spec ? convertSwaggerObject(spec) : getSwaggerObject(input, url))
        .then(({ usageSchema, originalSchema }) => {
          const templatesToRender = getTemplates(config);

          console.log("☄️  start generating your typescript api");

          fixSwaggerScheme(usageSchema, originalSchema);

          addToConfig({
            swaggerSchema: usageSchema,
            originalSchema,
            templatesToRender,
          });

          const { info, paths, servers, components } = usageSchema;

          addToConfig(config.hooks.onInit(config) || config);

          const componentsMap = createComponentsMap(components);

          const parsedSchemas = parseSchemas(components);
          const routes = parseRoutes({
            usageSchema,
            parsedSchemas,
            moduleNameIndex,
            extractRequestParams,
          });

          const hasSecurityRoutes = routes.some((route) => route.security);
          const hasQueryRoutes = routes.some((route) => route.hasQuery);
          const hasFormDataRoutes = routes.some((route) => route.hasFormDataParams);
          const apiConfig = createApiConfig({ info, servers }, hasSecurityRoutes);
          const rawConfiguration = {
            apiConfig,
            config,
            modelTypes: _.map(filterComponentsMap(componentsMap, "schemas"), prepareModelType),
            hasFormDataRoutes,
            hasSecurityRoutes,
            hasQueryRoutes,
            generateResponses,
            routes: groupRoutes(routes),
            utils: {
              ...require("./render/utils"),
              ...require("./common"),
            },
          };

          const prettierFormat = (content) => prettier.format(content, prettierOptions);

          const configuration = config.hooks.onPrepareConfig(rawConfiguration) || rawConfiguration;

          const files = modular
            ? [
                templatesToRender.dataContracts && {
                  name: `${config.fileNames.dataContracts}.ts`,
                  content: renderTemplate(templatesToRender.dataContracts, configuration),
                },
                configuration.config.generateRouteTypes &&
                  templatesToRender.routeTypes && {
                    name: `${config.fileNames.routeTypes}.ts`,
                    content: renderTemplate(templatesToRender.routeTypes, configuration),
                  },
                configuration.config.generateClient &&
                  templatesToRender.httpClient && {
                    name: `${config.fileNames.httpClient}.ts`,
                    content: renderTemplate(templatesToRender.httpClient, configuration),
                  },
                configuration.config.generateClient &&
                  templatesToRender.api &&
                  configuration.routes.$outOfModule && {
                    name: `${config.fileNames.outOfModuleApi}.ts`,
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
                          name: `${classNameCase(route.moduleName)}.ts`,
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

          if (extraTemplates) {
            extraTemplates.forEach((extraTemplate) => {
              files.push({
                name: `${extraTemplate.name}.ts`,
                content: renderTemplate(getFileContent(extraTemplate.path), configuration),
              });
            });
          }

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
