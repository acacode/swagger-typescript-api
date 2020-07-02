#!/usr/bin/env node

// Copyright (c) 2019-present acacode
// Node module: swagger-typescript-api
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
// Repository https://github.com/acacode/swagger-typescript-api

import * as path from "path";
import * as _ from "lodash";
import * as prettier from "prettier";
import { Configuration } from "./services/Configuration";
import { SwaggerSchemaContainer } from "./swagger/SwaggerSchemaContainer";
import { Template } from "./services/Template";
import { GenerateAPIOptions } from "./interfaces/cli";
import { TemplateConfig } from "./interfaces/template";
import { HttpClient } from "./swagger/internal/HttpClient";
import { ModelTypes } from "./swagger/internal/ModelTypes";
import { FileSystem } from "./services/FileSystem";
import { Routes } from "./swagger/internal/Routes";

const prettierConfig = {
  printWidth: 120,
  tabWidth: 2,
  trailingComma: "all",
  parser: "typescript",
} as const;

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
      name,
    } = Configuration.update(options);

    const schema = await SwaggerSchemaContainer.create(input, url);

    const templateData: TemplateConfig = {
      apiConfig: new HttpClient(schema).toTemplatePart(),
      hasFormDataRoutes: schema.paths.hasFormDataRoutes,
      hasQueryRoutes: schema.paths.hasQueryRoutes,
      hasSecurityRoutes: schema.paths.hasSecurityRoutes,
      generateResponses: generateResponses,
      modelTypes: new ModelTypes(schema.components.schemas).toTemplatePart(),
      routes: new Routes(schema.paths).toTemplatePart(),
    };

    const sourceFile = prettier.format(
      [
        Template.render("../templates/api.mustache", templateData),
        generateRouteTypes
          ? Template.render("../templates/route-types.mustache", templateData)
          : "",
        generateClient ? Template.render("../templates/client.mustache", templateData) : "",
      ].join(""),
      prettierConfig,
    );

    if (FileSystem.pathIsExist(output)) {
      FileSystem.createFile(output, name, sourceFile);
      console.log(`✔️  your typescript api file created in "${output}"`);
    }

    console.log("sourceFile", sourceFile);

    resolve(sourceFile);
  });

// TODO: REMOVE_ME
generateApi({
  input: path.resolve(__dirname, "../swagger-test-cli.json"),
  url: "",
  generateClient: true,
  output: ".",
  name: "swagger-test-cli.ts",
});
