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
  .requiredOption('-p, --path <path>', 'path to swagger scheme')
  .option('-o, --output <output>', 'output path of typescript api file', '.')
  .option('-n, --name <name>', 'name of output typescript api file', 'api.ts');
 
program.parse(process.argv);

const { path, output, name } = program;

generateApi({
  name,
  url: path,
  input: resolve(process.cwd(), path),
  output: resolve(process.cwd(), output || '.')
})