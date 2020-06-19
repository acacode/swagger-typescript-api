#!/usr/bin/env node

// Copyright (c) 2019-present acacode
// Node module: swagger-typescript-api
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
// Repository https://github.com/acacode/swagger-typescript-api

import { Configuration } from "./services/Configuration";
import { SwaggerSchemaContainer } from "./models/SwaggerSchemaContainer";
import { Template } from "./models/Template";
import { GenerateAPIOptions } from "./interfaces/cli";
import * as path from "path";
import { TemplateConfig } from "./interfaces/template";
import { HttpClient } from "./models/HttpClient";
import { ModelTypes } from "./models/ModelTypes";
import { FileSystem } from "./utils/FileSystem";
import { createSchemaTransformer } from "./transformers/schema/createSchemaTransformer";

const mustache = require("mustache");
const prettier = require("prettier");
const _ = require("lodash");
// const { parseSchemas } = require("./schema");
// const { parseRoutes, groupRoutes } = require("./routes");
// const { createApiConfig } = require("./apiConfig");
// const { getModelType } = require("./modelTypes");
// const { getSwaggerObject, fixSwaggerScheme } = require("./swagger");
// const { createComponentsMap, filterComponentsMap } = require("./components");
// const { getTemplate, createFile, pathIsExist } = require("./files");

const prettierConfig = {
  printWidth: 120,
  tabWidth: 2,
  trailingComma: "all",
  parser: "typescript",
};

export const generateApi = (options: GenerateAPIOptions) =>
  new Promise(async (resolve, reject) => {
    console.log("☄️  start generating your typescript api");

    const {
      input,
      url,
      generateResponses,
      generateRouteTypes,
      generateClient,
      output,
    } = Configuration.update(options);

    const schema = await SwaggerSchemaContainer.create(input, url);

    Object.values(schema.components.schemas).forEach((schema) => {
      createSchemaTransformer(schema).transform();
    });

    const templateData: TemplateConfig = {
      apiConfig: new HttpClient(schema).toTemplatePart(),
      hasFormDataRoutes: schema.paths.hasFormDataRoutes,
      hasQueryRoutes: schema.paths.hasQueryRoutes,
      hasSecurityRoutes: schema.paths.hasSecurityRoutes,
      generateResponses: generateResponses,
      modelTypes: new ModelTypes(schema).toTemplatePart(),
      routes: schema.paths.toTemplatePart(),
    };

    // const componentsMap = createComponentsMap(components);
    // const schemasMap = filterComponentsMap(componentsMap, "schemas");

    // const parsedSchemas = parseSchemas(components);
    // const routes = parseRoutes(schema.usage, parsedSchemas, componentsMap, components);
    // const hasSecurityRoutes = routes.some((route) => route.security);
    // const hasQueryRoutes = routes.some((route) => route.hasQuery);
    // const hasFormDataRoutes = routes.some((route) => route.hasFormDataParams);
    // const apiConfig = createApiConfig({ info, servers }, hasSecurityRoutes);

    // const templateData = {
    //   apiConfig,
    //   modelTypes: _.map(schemasMap, getModelType),
    //   hasFormDataRoutes,
    //   hasSecurityRoutes,
    //   hasQueryRoutes,
    //   generateResponses,
    //   routes: groupRoutes(routes),
    // };

    const sourceFile = prettier.format(
      [
        Template.render("./templates/api.mustache", templateData),
        generateRouteTypes ? Template.render("./templates/route-types.mustache", templateData) : "",
        generateClient ? Template.render("./templates/client.mustache", templateData) : "",
      ].join(""),
      prettierConfig,
    );

    if (FileSystem.pathIsExist(output)) {
      FileSystem.createFile(output, name, sourceFile);
      console.log(`✔️  your typescript api file created in "${output}"`);
    }

    resolve(sourceFile);
  });

// TODO: REMOVE_ME
generateApi({
  input: path.resolve(__dirname, "../../swagger-test-cli.json"),
  url: "",
  generateClient: true,
});
