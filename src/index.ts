import { consola } from "consola";
import type { GenerateApiConfiguration } from "../types/index.js";
import { CodeGenProcess } from "./code-gen-process.js";

export async function generateApi(
  config: Partial<GenerateApiConfiguration["config"]>,
) {
  if (config.debug) {
    consola.level = Number.MAX_SAFE_INTEGER;
  }
  const codeGenProcess = new CodeGenProcess(config);
  return await codeGenProcess.start();
}

export * as constants from "./constants.js";
export { generateTemplates } from "./commands/generate-templates/index.js";
