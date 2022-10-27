#!/usr/bin/env node

// Copyright (c) 2019-present acacode
// Node module: swagger-typescript-api
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
// Repository https://github.com/acacode/swagger-typescript-api

const _ = require("lodash");
const constants = require("./constants");
const { CodeGenProcess } = require("./code-gen-process.js");
const { generateTemplates } = require("./commands/generate-templates");

module.exports = {
  constants: constants,
  generateApi: async ({ name, prettier, ...config }) => {
    const codeGenProcess = new CodeGenProcess({
      ...config,
      fileName: name,
      prettierOptions: prettier,
    });
    return await codeGenProcess.start();
  },
  generateTemplates: async (config) => {
    return await generateTemplates(config);
  },
};
