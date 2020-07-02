#!/usr/bin/env node

// Copyright (c) 2019-present acacode
// Node module: swagger-typescript-api
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
// Repository https://github.com/acacode/swagger-typescript-api

import * as program from "commander";
import * as path from "path";
import { generateApi } from "./generateApi";
import { version } from "../package.json";

program
  .version(version, "-v, --version", "output the current version")
  .description("Generate api via swagger scheme.\nSupports OA 3.0, 2.0, JSON, yaml.")
  .requiredOption("-p, --path <path>", "path/url to swagger scheme")
  .option("-o, --output <output>", "output path of typescript api file", "./")
  .option("-n, --name <name>", "name of output typescript api file", "Api.ts")
  .option(
    "-d, --default-as-success",
    'use "default" response status code as success response too.\n' +
      'some swagger schemas use "default" response status code as success response type by default.',
    false,
  )
  .option(
    "-r, --responses",
    "generate additional information about request responses\n" +
      "also add typings for bad responses",
    false,
  )
  .option("--route-types", "generate type definitions for API routes", false)
  .option("--no-client", "do not generate an API class", false);

program.parse(process.argv);

generateApi({
  name: (program.name as unknown) as string,
  url: program.path,
  generateRouteTypes: program.routeTypes,
  generateClient: program.client,
  defaultResponseAsSuccess: program.defaultAsSuccess,
  generateResponses: program.responses,
  input: path.resolve(process.cwd(), program.path),
  output: path.resolve(process.cwd(), program.output || "."),
});
