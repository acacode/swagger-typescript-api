#!/usr/bin/env node

// Copyright (c) 2019-present acacode
// Node module: swagger-typescript-api
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
// Repository https://github.com/acacode/swagger-typescript-api

const _ = require("lodash");
const { version, name } = require("./package.json");
const { cli } = require("./cli");
const { generateApi, generateTemplates } = require("./src");
const { HTTP_CLIENT } = require("./src/constants");
const { resolve } = require("path");
const { CodeGenConfig } = require("./src/configuration");
const { TemplatesGenConfig } = require("./src/commands/generate-templates/configuration");

const codeGenBaseConfig = new CodeGenConfig({});
const templateGenBaseConfig = new TemplatesGenConfig({});

const program = cli({
  name: name,
  alias: "sta",
  version: version,
  description: "Generate api via swagger scheme.\nSupports OA 3.0, 2.0, JSON, yaml.",
  options: [
    {
      flags: "-p, --path <string>",
      description: "path/url to swagger scheme",
      required: true,
    },
    {
      flags: "-o, --output <string>",
      description: "output path of typescript api file",
      default: "./",
    },
    {
      flags: "-n, --name <string>",
      description: "name of output typescript api file",
      default: codeGenBaseConfig.fileName,
    },
    {
      flags: "-t, --templates <string>",
      description: "path to folder containing templates",
    },
    {
      flags: "-d, --default-as-success",
      description:
        'use "default" response status code as success response too.\n' +
        'some swagger schemas use "default" response status code as success response type by default.',
      default: codeGenBaseConfig.defaultResponseAsSuccess,
    },
    {
      flags: "-r, --responses",
      description: "generate additional information about request responses\n" + "also add typings for bad responses",
      default: codeGenBaseConfig.generateResponses,
    },
    {
      flags: "--union-enums",
      description: 'generate all "enum" types as union types (T1 | T2 | TN)',
      default: codeGenBaseConfig.generateUnionEnums,
    },
    {
      flags: "--add-readonly",
      description: "generate readonly properties",
      default: codeGenBaseConfig.addReadonly,
    },
    {
      flags: "--route-types",
      description: "generate type definitions for API routes",
      default: codeGenBaseConfig.generateRouteTypes,
    },
    {
      flags: "--no-client",
      description: "do not generate an API class",
      default: codeGenBaseConfig.generateClient,
    },
    {
      flags: "--enum-names-as-values",
      description: "use values in 'x-enumNames' as enum values (not only as keys)",
      default: codeGenBaseConfig.enumNamesAsValues,
    },
    {
      flags: "--extract-request-params",
      description:
        "extract request params to data contract (Also combine path params and query params into one object)",
      default: codeGenBaseConfig.extractRequestParams,
    },
    {
      flags: "--extract-request-body",
      description: "extract request body type to data contract",
      default: codeGenBaseConfig.extractRequestBody,
    },
    {
      flags: "--extract-response-body",
      description: "extract response body type to data contract",
      default: codeGenBaseConfig.extractResponseBody,
    },
    {
      flags: "--extract-response-error",
      description: "extract response error type to data contract",
      default: codeGenBaseConfig.extractResponseError,
    },
    {
      flags: "--modular",
      description: "generate separated files for http client, data contracts, and routes",
      default: codeGenBaseConfig.modular,
    },
    {
      flags: "--js",
      description: "generate js api module with declaration file",
      default: codeGenBaseConfig.toJS,
    },
    {
      flags: "--module-name-index <number>",
      description:
        "determines which path index should be used for routes separation (example: GET:/fruites/getFruit -> index:0 -> moduleName -> fruites)",
      default: codeGenBaseConfig.moduleNameIndex,
    },
    {
      flags: "--module-name-first-tag",
      description: "splits routes based on the first tag",
      default: codeGenBaseConfig.moduleNameFirstTag,
    },
    {
      flags: "--disableStrictSSL",
      description: "disabled strict SSL",
      default: codeGenBaseConfig.disableStrictSSL,
    },
    {
      flags: "--disableProxy",
      description: "disabled proxy",
      default: codeGenBaseConfig.disableProxy,
    },
    {
      flags: "--axios",
      description: "generate axios http client",
      default: codeGenBaseConfig.httpClientType === "axios",
    },
    {
      flags: "--unwrap-response-data",
      description: "unwrap the data item from the response",
      default: codeGenBaseConfig.unwrapResponseData,
    },
    {
      flags: "--disable-throw-on-error",
      description: "Do not throw an error when response.ok is not true",
      default: codeGenBaseConfig.disableThrowOnError,
    },
    {
      flags: "--single-http-client",
      description: "Ability to send HttpClient instance to Api constructor",
      default: codeGenBaseConfig.singleHttpClient,
    },
    {
      flags: "--silent",
      description: "Output only errors to console",
      default: codeGenBaseConfig.silent,
    },
    {
      flags: "--default-response <type>",
      description: "default type for empty response schema",
      default: codeGenBaseConfig.defaultResponseType,
    },
    {
      flags: "--type-prefix <string>",
      description: "data contract name prefix",
      default: codeGenBaseConfig.typePrefix,
    },
    {
      flags: "--type-suffix <string>",
      description: "data contract name suffix",
      default: codeGenBaseConfig.typeSuffix,
    },
    {
      flags: "--clean-output",
      description: "clean output folder before generate api. WARNING: May cause data loss",
      default: codeGenBaseConfig.cleanOutput,
    },
    {
      flags: "--api-class-name <string>",
      description: "name of the api class",
      default: codeGenBaseConfig.apiClassName,
    },
    {
      flags: "--patch",
      description: "fix up small errors in the swagger source definition",
      default: codeGenBaseConfig.patch,
    },
    {
      flags: "--debug",
      description: "additional information about processes inside this tool",
      default: codeGenBaseConfig.debug,
    },
    {
      flags: "--another-array-type",
      description: "generate array types as Array<Type> (by default Type[])",
      default: codeGenBaseConfig.anotherArrayType,
    },
    {
      flags: "--sort-types",
      description: "sort fields and types",
      default: codeGenBaseConfig.sortTypes,
    },
    {
      flags: "--extract-enums",
      description: "extract all enums from inline interface\\type content to typescript enum construction",
      default: codeGenBaseConfig.extractEnums,
    },
  ],
});

program.addCommand({
  name: "generate-templates",
  description: `Generate ".ejs" templates needed for generate api`,
  options: [
    {
      flags: "-o, --output <string>",
      description: "output path of generated templates",
      default: templateGenBaseConfig.output,
    },
    {
      flags: "-m, --modular",
      description: "generate templates needed to separate files for http client, data contracts, and routes",
      default: templateGenBaseConfig.modular,
    },
    {
      flags: "--http-client <string>",
      description: `http client type (possible values: ${Object.values(HTTP_CLIENT)
        .map((v) => `"${v}"`)
        .join(", ")})`,
      default: templateGenBaseConfig.httpClientType,
    },
    {
      flags: "-c, --clean-output",
      description: "clean output folder before generate template. WARNING: May cause data loss",
      default: templateGenBaseConfig.cleanOutput,
    },
    {
      flags: "-r, --rewrite",
      description: "rewrite content in existing templates",
      default: templateGenBaseConfig.rewrite,
    },
    {
      flags: "--silent",
      description: "Output only errors to console",
      default: templateGenBaseConfig.silent,
    },
  ],
});

const main = async () => {
  const { command, options } = await program.execute({ args: process.argv });

  try {
    switch (command) {
      case null: {
        await generateApi({
          name: options.name,
          url: options.path,
          generateRouteTypes: options.routeTypes,
          generateClient: !!(options.axios || options.client),
          httpClientType: options.axios ? HTTP_CLIENT.AXIOS : HTTP_CLIENT.FETCH,
          defaultResponseAsSuccess: options.defaultAsSuccess,
          defaultResponseType: options.defaultResponse,
          unwrapResponseData: options.unwrapResponseData,
          disableThrowOnError: options.disableThrowOnError,
          sortTypes: options.sortTypes,
          generateUnionEnums: options.unionEnums,
          addReadonly: options.addReadonly,
          generateResponses: options.responses,
          extractRequestParams: !!options.extractRequestParams,
          extractRequestBody: !!options.extractRequestBody,
          extractResponseBody: !!options.extractResponseBody,
          extractResponseError: !!options.extractResponseError,
          input: resolve(process.cwd(), options.path),
          output: resolve(process.cwd(), options.output || "."),
          templates: options.templates,
          modular: !!options.modular,
          toJS: !!options.js,
          enumNamesAsValues: options.enumNamesAsValues,
          moduleNameIndex: +(options.moduleNameIndex || 0),
          moduleNameFirstTag: options.moduleNameFirstTag,
          disableStrictSSL: !!options.disableStrictSSL,
          disableProxy: !!options.disableProxy,
          singleHttpClient: !!options.singleHttpClient,
          cleanOutput: !!options.cleanOutput,
          silent: !!options.silent,
          typePrefix: options.typePrefix,
          typeSuffix: options.typeSuffix,
          patch: !!options.patch,
          apiClassName: options.apiClassName,
          debug: options.debug,
          anotherArrayType: options.anotherArrayType,
          extractEnums: options.extractEnums,
        });
        break;
      }
      case "generate-templates": {
        await generateTemplates({
          cleanOutput: options.cleanOutput,
          output: options.output,
          httpClientType: options.httpClient,
          modular: options.modular,
          silent: options.silent,
          rewrite: options.rewrite,
        });
        break;
      }
      default: {
        break;
      }
    }
  } catch (e) {
    console.error(e);
    process.exit(1);
    return;
  }
  process.exit(0);
};

main();
