import { consola } from "consola";
import type { GenerateApiConfiguration } from "../types/index.js";
import { CodeGenProcess } from "./code-gen-process.js";

export async function generateApi(
  config: Partial<GenerateApiConfiguration["config"]>,
) {
  if (config.debug) consola.level = Number.MAX_SAFE_INTEGER;
  if (config.silent) consola.level = 0;
  const codeGenProcess = new CodeGenProcess(config);
  return await codeGenProcess.start();
}

export { generateTemplates } from "./commands/generate-templates/index.js";
export * as constants from "./constants.js";
