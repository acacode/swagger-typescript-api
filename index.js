#!/usr/bin/env node

// Copyright (c) 2019-present acacode
// Node module: swagger-typescript-api
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
// Repository https://github.com/acacode/swagger-typescript-api

const program = require('commander');
const { resolve } = require('path');
const { generateApi } = require('./src');
const { version } = require('./package.json');

program
  .version(version, '-v, --version', 'output the current version')
  .description("Generate api via swagger scheme.\nSupports OA 3.0, 2.0, JSON, yaml.")
  .requiredOption('-p, --path <path>', 'path/url to swagger scheme')
  .option('-o, --output <output>', 'output path of typescript api file', './')
  .option('-n, --name <name>', 'name of output typescript api file', 'Api.ts')
  .option(
    '-d, --default-as-success',
    'use "default" response status code as success response too.\n' +
    'some swagger schemas use "default" response status code as success response type by default.',
    false
  )
  .option(
    '-r, --responses',
    'generate additional information about request responses\n' +
    'also add typings for bad responses',
    false,
  )
  .option('--route-types', 'generate type definitions for API routes', false)
  .option('--no-client', 'do not generate an API class', false);
 
program.parse(process.argv);

const {
  path,
  output,
  name,
  routeTypes,
  client,
  defaultAsSuccess,
  responses,
} = program;

generateApi({
  name,
  url: path,
  generateRouteTypes: routeTypes,
  generateClient: client,
  defaultResponseAsSuccess: defaultAsSuccess,
  generateResponses: responses,
  input: resolve(process.cwd(), path),
  output: resolve(process.cwd(), output || '.')
})