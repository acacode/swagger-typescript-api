import type { CodeFormatter } from "../code-formatter.js";
import type { CodeGenConfig } from "../configuration.js";

export interface TranslatorIO {
  fileName: string;
  fileExtension: string;
  fileContent: string;
}

export class Translator {
  config: CodeGenConfig;
  codeFormatter: CodeFormatter;

  constructor(config: CodeGenConfig, codeFormatter: CodeFormatter) {
    this.config = config;
    this.codeFormatter = codeFormatter;
  }

  translate(_input: TranslatorIO): Promise<TranslatorIO[]> {
    throw new Error("not implemented");
  }
}
