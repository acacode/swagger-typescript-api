#!/usr/bin/env node

import { CodeGenProcess } from "./code-gen-process.js";
import { generateTemplates } from "./commands/generate-templates/index.js";
import * as constants from "./constants.js";

async function generateApi({ name, prettier, ...config }) {
  const codeGenProcess = new CodeGenProcess({
    ...config,
    fileName: name,
    prettierOptions: prettier,
  });
  return await codeGenProcess.start();
}

export { constants, generateApi, generateTemplates };
