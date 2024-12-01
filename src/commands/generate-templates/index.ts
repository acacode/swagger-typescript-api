import type { GenerateTemplatesParams } from "../../../types/index.js";
import { TemplatesGenProcess } from "./templates-gen-process.js";

export async function generateTemplates(config: GenerateTemplatesParams) {
  const codeGenProcess = new TemplatesGenProcess(config);
  return await codeGenProcess.start();
}
