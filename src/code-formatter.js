import * as lodash from "lodash";
import * as prettier from "prettier";
import * as typescript from "typescript";

class CodeFormatter {
  /**
   * @type {CodeGenConfig}
   */
  config;

  constructor({ config }) {
    this.config = config;
  }

  removeUnusedImports = (content) => {
    const tempFileName = "file.ts";

    const host = new TsLanguageServiceHost(tempFileName, content);
    const languageService = typescript.createLanguageService(host);

    const fileTextChanges = languageService.organizeImports(
      { type: "file", fileName: tempFileName },
      { newLineCharacter: typescript.sys.newLine },
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

  /**
   * @param content
   * @returns {Promise<string>}
   */
  prettierFormat = async (content) => {
    const formatted = await prettier.format(
      content,
      this.config.prettierOptions,
    );
    return formatted;
  };

  formatCode = async (
    code,
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
  constructor(fileName, content) {
    const tsconfig = typescript.findConfigFile(
      fileName,
      typescript.sys.fileExists,
    );

    Object.assign(this, {
      fileName,
      content,
      compilerOptions: tsconfig
        ? typescript.convertCompilerOptionsFromJson(
            typescript.readConfigFile(tsconfig, typescript.sys.readFile).config
              .compilerOptions,
          ).options
        : typescript.getDefaultCompilerOptions(),
    });
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
  readFile(fileName, encoding) {
    if (fileName === this.fileName) {
      return this.content;
    }

    return typescript.sys.readFile(fileName, encoding);
  }
  fileExists(path) {
    return typescript.sys.fileExists(path);
  }
}

export { CodeFormatter };
