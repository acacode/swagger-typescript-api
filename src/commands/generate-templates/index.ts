#!/usr/bin/env node

import { TemplatesGenProcess } from "./templates-gen-process.js";

export async function generateTemplates(config) {
  const codeGenProcess = new TemplatesGenProcess(config);
  return await codeGenProcess.start();
}
