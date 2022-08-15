#!/usr/bin/env node

// Copyright (c) 2019-present acacode
// Node module: swagger-typescript-api
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
// Repository https://github.com/acacode/swagger-typescript-api

const { Command } = require("commander");
const { resolve } = require("path");
const { generateApi } = require("./src");
const { version, name: packageName } = require("./package.json");
const { TS_KEYWORDS, HTTP_CLIENT } = require("./src/constants");

const program = new Command(packageName);

const options = program
  .alias("sta")
  .version(version, "-v, --version", "output the current version")
  .description("Generate api via swagger scheme.\nSupports OA 3.0, 2.0, JSON, yaml.")
  .requiredOption("-p, --path <string>", "path/url to swagger scheme")
  .option("-o, --output <string>", "output path of typescript api file", "./")
  .option("-n, --name <string>", "name of output typescript api file", "Api.ts")
  .option("-t, --templates <string>", "path to folder containing templates")
  .option(
    "-d, --default-as-success",
    'use "default" response status code as success response too.\n' +
      'some swagger schemas use "default" response status code as success response type by default.',
    false,
  )
  .option(
    "-r, --responses",
    "generate additional information about request responses\n" + "also add typings for bad responses",
    false,
  )
  .option("--union-enums", 'generate all "enum" types as union types (T1 | T2 | TN)', false)
  .option("--add-readonly", "generate readonly properties", false)
  .option("--route-types", "generate type definitions for API routes", false)
  .option("--no-client", "do not generate an API class", true)
  .option("--enum-names-as-values", "use values in 'x-enumNames' as enum values (not only as keys)", false)
  .option(
    "--extract-request-params",
    "extract request params to data contract (Also combine path params and query params into one object)",
    false,
  )
  .option("--extract-request-body", "extract request body type to data contract", false)
  .option("--extract-response-body", "extract response body type to data contract", false)
  .option("--extract-response-error", "extract response error type to data contract", false)
  .option("--modular", "generate separated files for http client, data contracts, and routes", false)
  .option("--js", "generate js api module with declaration file", false)
  .option(
    "--module-name-index <number>",
    "determines which path index should be used for routes separation (example: GET:/fruites/getFruit -> index:0 -> moduleName -> fruites)",
    0,
  )
  .option("--module-name-first-tag", "splits routes based on the first tag", false)
  .option("--disableStrictSSL", "disabled strict SSL", false)
  .option("--disableProxy", "disabled proxy", false)
  .option("--axios", "generate axios http client", false)
  .option("--unwrap-response-data", "unwrap the data item from the response", false)
  .option("--disable-throw-on-error", "Do not throw an error when response.ok is not true", false)
  .option("--single-http-client", "Ability to send HttpClient instance to Api constructor", false)
  .option("--silent", "Output only errors to console", false)
  .option("--default-response <type>", "default type for empty response schema", TS_KEYWORDS.VOID)
  .option("--type-prefix <string>", "data contract name prefix", "")
  .option("--type-suffix <string>", "data contract name suffix", "")
  .option("--clean-output", "clean output folder before generate api. WARNING: May cause data loss", false)
  .option("--api-class-name <string>", "name of the api class")
  .option("--patch", "fix up small errors in the swagger source definition", false)
  .parse(process.argv)
  .opts();

generateApi({
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
}).catch((err) => {
  // NOTE collect all errors on top level and shows to users in any case
  console.error(err);

  process.exit(1);
});
