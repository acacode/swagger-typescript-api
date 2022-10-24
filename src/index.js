#!/usr/bin/env node

// Copyright (c) 2019-present acacode
// Node module: swagger-typescript-api
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
// Repository https://github.com/acacode/swagger-typescript-api

const _ = require("lodash");
const constants = require("./constants");
const { CodeGenProcess } = require("./code-gen-process.js");

module.exports = {
  constants: constants,
  generateApi: async (config) => {
    const codeGenProcess = new CodeGenProcess(config);
    return await codeGenProcess.start();
  },
};
