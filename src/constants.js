import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const packageJson = require("../package.json");

const DEFAULT_BODY_ARG_NAME = "data";

const FILE_PREFIX = `/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

`;

const HTTP_CLIENT = {
  FETCH: "fetch",
  AXIOS: "axios",
};

const PRETTIER_OPTIONS = {
  printWidth: 120,
  tabWidth: 2,
  trailingComma: "all",
  parser: "typescript",
};

const PROJECT_VERSION = packageJson.version;

const RESERVED_BODY_ARG_NAMES = ["data", "body", "reqBody"];

const RESERVED_HEADER_ARG_NAMES = ["headers", "headersParams"];

const RESERVED_PATH_ARG_NAMES = ["path", "pathParams"];

const RESERVED_QUERY_ARG_NAMES = ["query", "queryParams", "queryArg"];

const RESERVED_REQ_PARAMS_ARG_NAMES = [
  "params",
  "requestParams",
  "reqParams",
  "httpParams",
];

const SCHEMA_TYPES = {
  ARRAY: "array",
  OBJECT: "object",
  ENUM: "enum",
  REF: "$ref",
  PRIMITIVE: "primitive",
  COMPLEX: "complex",
  DISCRIMINATOR: "discriminator",
  COMPLEX_ONE_OF: "oneOf",
  COMPLEX_ANY_OF: "anyOf",
  COMPLEX_ALL_OF: "allOf",
  COMPLEX_NOT: "not",
  COMPLEX_UNKNOWN: "__unknown",
};

export {
  DEFAULT_BODY_ARG_NAME,
  FILE_PREFIX,
  HTTP_CLIENT,
  PRETTIER_OPTIONS,
  PROJECT_VERSION,
  RESERVED_BODY_ARG_NAMES,
  RESERVED_HEADER_ARG_NAMES,
  RESERVED_PATH_ARG_NAMES,
  RESERVED_QUERY_ARG_NAMES,
  RESERVED_REQ_PARAMS_ARG_NAMES,
  SCHEMA_TYPES,
};
