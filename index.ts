#!/usr/bin/env node

import * as path from "node:path";
import { loadConfig } from "c12";
import { defineCommand, runMain } from "citty";
import packageJson from "./package.json" with { type: "json" };
import { TemplatesGenConfig } from "./src/commands/generate-templates/configuration.js";
import { CodeGenConfig } from "./src/configuration.js";
import { HTTP_CLIENT } from "./src/constants.js";
import { generateApi, generateTemplates } from "./src/index.js";
import type {
  GenerateApiConfiguration,
  HttpClientType,
} from "./types/index.js";

const templateGenBaseConfig = new TemplatesGenConfig({});

const generateTemplatesCommand = defineCommand({
  meta: {
    name: "generate-templates",
    description: 'Generate ".ejs" templates needed for generate api',
  },
  args: {
    "clean-output": {
      type: "boolean",
      description:
        "clean output folder before generate template. WARNING: May cause data loss",
      default: templateGenBaseConfig.cleanOutput,
    },
    debug: {
      type: "boolean",
      description: "additional information about processes inside this tool",
      default: templateGenBaseConfig.debug,
    },
    "http-client": {
      type: "string",
      description: `http client type (possible values: ${Object.values(
        HTTP_CLIENT,
      )})`,
      default: templateGenBaseConfig.httpClientType,
    },
    modular: {
      type: "boolean",
      description:
        "generate templates needed to separate files for http client, data contracts, and routes",
      default: templateGenBaseConfig.modular,
    },
    output: {
      type: "string",
      alias: "o",
      description: "output path of generated templates",
      default: templateGenBaseConfig.output,
      required: true,
    },
    rewrite: {
      type: "boolean",
      alias: "r",
      description: "rewrite content in existing templates",
      default: templateGenBaseConfig.rewrite,
    },
    silent: {
      type: "boolean",
      description: "Output only errors to console",
      default: templateGenBaseConfig.silent,
    },
  },
  run: async ({ args }) => {
    await generateTemplates({
      cleanOutput: args["clean-output"],
      httpClientType: args["http-client"] as HttpClientType,
      modular: args.modular,
      output: args.output,
      rewrite: args.rewrite,
      silent: args.silent,
      debug: args.debug,
    });
  },
});

const codeGenBaseConfig = new CodeGenConfig({});

const generateCommand = defineCommand({
  meta: {
    name: "generate",
    description: packageJson.description,
  },
  args: {
    "add-readonly": {
      type: "boolean",
      description: "generate readonly properties",
      default: codeGenBaseConfig.addReadonly,
    },
    "another-array-type": {
      type: "boolean",
      description: "generate array types as Array<Type> (by default Type[])",
      default: codeGenBaseConfig.anotherArrayType,
    },
    "api-class-name": {
      type: "string",
      description: "name of the api class",
      default: codeGenBaseConfig.apiClassName,
    },
    axios: {
      type: "boolean",
      description: "generate axios http client",
      default: false,
    },
    "clean-output": {
      type: "boolean",
      description:
        "clean output folder before generate api. WARNING: May cause data loss",
      default: codeGenBaseConfig.cleanOutput,
    },
    client: {
      type: "boolean",
      description: "do not generate an API class",
      default: codeGenBaseConfig.generateClient,
    },
    "custom-config": {
      type: "string",
      description: "custom config: primitiveTypeConstructs, hooks, ... ",
    },
    debug: {
      type: "boolean",
      description: "additional information about processes inside this tool",
      default: codeGenBaseConfig.debug,
    },
    "default-as-success": {
      type: "boolean",
      alias: "d",
      description:
        'use "default" response status code as success response too. some swagger schemas use "default" response status code as success response type by default.',
      default: codeGenBaseConfig.defaultResponseAsSuccess,
    },
    "default-response": {
      type: "string",
      description: "default type for empty response schema",
      default: codeGenBaseConfig.defaultResponseType,
    },
    "disable-throw-on-error": {
      type: "boolean",
      description: "Do not throw an error when response.ok is not true",
      default: codeGenBaseConfig.disableThrowOnError,
    },
    "enum-names-as-values": {
      type: "boolean",
      description:
        "use values in 'x-enumNames' as enum values (not only as keys)",
      default: codeGenBaseConfig.enumNamesAsValues,
    },
    "extract-enums": {
      type: "boolean",
      description:
        "extract all enums from inline interface/type content to typescript enum construction",
      default: codeGenBaseConfig.extractEnums,
    },
    "extract-request-body": {
      type: "boolean",
      description: "extract request body type to data contract",
      default: codeGenBaseConfig.extractRequestBody,
    },
    "extract-request-params": {
      type: "boolean",
      description:
        "extract request params to data contract (Also combine path params and query params into one object)",
      default: codeGenBaseConfig.extractRequestParams,
    },
    "extract-response-body": {
      type: "boolean",
      description: "extract response body type to data contract",
      default: codeGenBaseConfig.extractResponseBody,
    },
    "extract-response-error": {
      type: "boolean",
      description: "extract response error type to data contract",
      default: codeGenBaseConfig.extractResponseError,
    },
    "extract-responses": {
      type: "boolean",
      description: "extract all responses described in /components/responses",
      default: codeGenBaseConfig.extractResponses,
    },
    "generate-union-enums": {
      type: "boolean",
      description: 'generate all "enum" types as union types (T1 | T2 | TN)',
      default: codeGenBaseConfig.generateUnionEnums,
    },
    "http-client": {
      type: "string",
      description: `http client type (possible values: ${Object.values(
        HTTP_CLIENT,
      )})`,
    },
    js: {
      type: "boolean",
      description: "generate js api module with declaration file",
      default: codeGenBaseConfig.toJS,
    },
    modular: {
      type: "boolean",
      description:
        "generate separated files for http client, data contracts, and routes",
      default: codeGenBaseConfig.modular,
    },
    "module-name-first-tag": {
      type: "boolean",
      description: "splits routes based on the first tag",
      default: codeGenBaseConfig.moduleNameFirstTag,
    },
    "module-name-index": {
      type: "string",
      description:
        "determines which path index should be used for routes separation (example: GET:/fruits/getFruit -> index:0 -> moduleName -> fruits)",
      default: codeGenBaseConfig.moduleNameIndex.toString(),
    },
    name: {
      type: "string",
      alias: "n",
      description: "name of output typescript api file",
      default: codeGenBaseConfig.fileName,
    },
    output: {
      type: "string",
      alias: "o",
      description: "output path of typescript api file",
      default: "./",
    },
    patch: {
      type: "boolean",
      description: "fix up small errors in the swagger source definition",
      default: codeGenBaseConfig.patch,
    },
    path: {
      type: "string",
      alias: "p",
      description: "path/url to swagger scheme",
      required: true,
    },
    responses: {
      type: "boolean",
      alias: "r",
      description:
        "generate additional information about request responses also add typings for bad responses",
      default: codeGenBaseConfig.generateResponses,
    },
    "route-types": {
      type: "boolean",
      description: "generate type definitions for API routes",
      default: codeGenBaseConfig.generateRouteTypes,
    },
    silent: {
      type: "boolean",
      description: "Output only errors to console",
      default: codeGenBaseConfig.silent,
    },
    "single-http-client": {
      type: "boolean",
      description: "Ability to send HttpClient instance to Api constructor",
      default: codeGenBaseConfig.singleHttpClient,
    },
    "sort-routes": {
      type: "boolean",
      description: "sort routes in alphabetical order",
      default: codeGenBaseConfig.sortRoutes,
    },
    "sort-types": {
      type: "boolean",
      description: "sort fields and types",
      default: codeGenBaseConfig.sortTypes,
    },
    templates: {
      type: "string",
      alias: "t",
      description: "path to folder containing templates",
    },
    "type-prefix": {
      type: "string",
      description: "data contract name prefix",
      default: codeGenBaseConfig.typePrefix,
    },
    "type-suffix": {
      type: "string",
      description: "data contract name suffix",
      default: codeGenBaseConfig.typeSuffix,
    },
    "unwrap-response-data": {
      type: "boolean",
      description: "unwrap the data item from the response",
      default: codeGenBaseConfig.unwrapResponseData,
    },
  },
  run: async ({ args }) => {
    const customConfig = await loadConfig<
      Partial<GenerateApiConfiguration["config"]>
    >({
      name: "swagger-typescript-api",
      configFile: args["custom-config"],
    });

    await generateApi({
      addReadonly: args["add-readonly"],
      anotherArrayType: args["another-array-type"],
      apiClassName: args["api-class-name"],
      cleanOutput: args["clean-output"],
      debug: args.debug,
      defaultResponseAsSuccess: args["default-as-success"],
      defaultResponseType: args["default-response"],
      disableThrowOnError: args["disable-throw-on-error"],
      enumNamesAsValues: args["enum-names-as-values"],
      extractEnums: args["extract-enums"],
      extractRequestBody: args["extract-request-body"],
      extractRequestParams: args["extract-request-params"],
      extractResponseBody: args["extract-response-body"],
      extractResponseError: args["extract-response-error"],
      extractResponses: args["extract-responses"],
      fileName: args.name,
      generateClient: args.client,
      generateResponses: args.responses,
      generateRouteTypes: args["route-types"],
      generateUnionEnums: args["generate-union-enums"],
      httpClientType:
        args["http-client"] || args.axios
          ? HTTP_CLIENT.AXIOS
          : HTTP_CLIENT.FETCH,
      input: path.resolve(process.cwd(), args.path as string),
      modular: args.modular,
      moduleNameFirstTag: args["module-name-first-tag"],
      moduleNameIndex: +args["module-name-index"] || 0,
      output: path.resolve(process.cwd(), (args.output as string) || "."),
      patch: args.patch,
      silent: args.silent,
      singleHttpClient: args["single-http-client"],
      sortRoutes: args["sort-routes"],
      sortTypes: args["sort-types"],
      templates: args.templates,
      toJS: args.js,
      typePrefix: args["type-prefix"],
      typeSuffix: args["type-suffix"],
      unwrapResponseData: args["unwrap-response-data"],
      url: args.path,
      ...customConfig.config,
    });
  },
});

const main = defineCommand({
  meta: {
    name: packageJson.name,
    description: packageJson.description,
    version: packageJson.version,
  },
  args: generateCommand.args,
  run: generateCommand.run,
  subCommands: {
    generate: generateCommand,
    "generate-templates": generateTemplatesCommand,
  },
});

runMain(main);
