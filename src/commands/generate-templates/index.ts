import { consola } from "consola";
import type { GenerateTemplatesParams } from "../../../types/index.js";
import { TemplatesGenProcess } from "./templates-gen-process.js";

export async function generateTemplates(config: GenerateTemplatesParams) {
  if (config.debug) consola.level = Number.MAX_SAFE_INTEGER;
  if (config.silent) consola.level = 0;
  const codeGenProcess = new TemplatesGenProcess(config);
  return await codeGenProcess.start();
}
