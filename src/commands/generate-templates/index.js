#!/usr/bin/env node

// Copyright (c) 2019-present acacode
// Node module: swagger-typescript-api
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
// Repository https://github.com/acacode/swagger-typescript-api

const _ = require("lodash");
const { TemplatesGenProcess } = require("./templates-gen-process");

module.exports = {
  generateTemplates: async (config) => {
    const codeGenProcess = new TemplatesGenProcess(config);
    return await codeGenProcess.start();
  },
};
