import * as prettier from "prettier";
import * as typescript from "typescript";
import type { CodeGenConfig } from "./configuration.js";

export class CodeFormatter {
  config: CodeGenConfig;

  constructor(config: CodeGenConfig) {
    this.config = config;
  }

  removeUnusedImports = (content: string) => {
    const tempFileName = "file.ts";

    const host = new TsLanguageServiceHost(tempFileName, content);
    const languageService = typescript.createLanguageService(host);

    const fileTextChanges = languageService.organizeImports(
      { type: "file", fileName: tempFileName },
      { newLineCharacter: typescript.sys.newLine },
      undefined,
    )[0];

    if (fileTextChanges?.textChanges.length) {
      return fileTextChanges.textChanges.reduceRight(
        (content, { span, newText }) =>
          `${content.slice(0, span.start)}${newText}${content.slice(
            span.start + span.length,
          )}`,
        content,
      );
    }

    return content;
  };

  prettierFormat = async (content: string) => {
    const formatted = await prettier.format(
      content,
      this.config.prettierOptions,
    );
    return formatted;
  };

  formatCode = async (
    code: string,
    { removeUnusedImports = true, prettierFormat = true } = {},
  ) => {
    if (removeUnusedImports) {
      code = this.removeUnusedImports(code);
    }
    if (prettierFormat) {
      code = await this.prettierFormat(code);
    }
    return code;
  };
}

class TsLanguageServiceHost {
  fileName: string;
  content: string;
  compilerOptions: typescript.CompilerOptions;

  constructor(fileName: string, content: string) {
    this.fileName = fileName;
    this.content = content;
    const tsconfig = typescript.findConfigFile(
      fileName,
      typescript.sys.fileExists,
    );
    this.compilerOptions = tsconfig
      ? typescript.convertCompilerOptionsFromJson(
          typescript.readConfigFile(tsconfig, typescript.sys.readFile).config
            .compilerOptions,
          "",
        ).options
      : typescript.getDefaultCompilerOptions();
  }

  getNewLine() {
    return "newLine" in typescript.sys ? typescript.sys.newLine : "\n";
  }
  getScriptFileNames() {
    return [this.fileName];
  }
  getCompilationSettings() {
    return this.compilerOptions;
  }
  getDefaultLibFileName() {
    return typescript.getDefaultLibFileName(this.getCompilationSettings());
  }
  getCurrentDirectory() {
    return process.cwd();
  }
  getScriptVersion() {
    return typescript.version;
  }
  getScriptSnapshot() {
    return typescript.ScriptSnapshot.fromString(this.content);
  }
  readFile(fileName: string, encoding: string) {
    if (fileName === this.fileName) {
      return this.content;
    }

    return typescript.sys.readFile(fileName, encoding);
  }
  fileExists(path: string) {
    return typescript.sys.fileExists(path);
  }
}
