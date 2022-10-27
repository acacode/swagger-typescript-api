const _ = require("lodash");
const ts = require("typescript");
const prettier = require("prettier");

class CodeFormatter {
  /**
   * @type {CodeGenConfig}
   */
  config;

  constructor(config) {
    this.config = config;
  }

  removeUnusedImports = (content) => {
    const tempFileName = "file.ts";

    const host = new TsLanguageServiceHost(tempFileName, content);
    const languageService = ts.createLanguageService(host);

    const fileTextChanges = languageService.organizeImports(
      { type: "file", fileName: tempFileName },
      { newLineCharacter: ts.sys.newLine },
    )[0];

    if (fileTextChanges && fileTextChanges.textChanges.length) {
      return _.reduceRight(
        fileTextChanges.textChanges,
        (content, { span, newText }) =>
          `${content.slice(0, span.start)}${newText}${content.slice(span.start + span.length)}`,
        content,
      );
    }

    return content;
  };

  prettierFormat = (content) => {
    return prettier.format(content, this.config.prettierOptions);
  };

  formatCode = (code, { removeUnusedImports = true, prettierFormat = true } = {}) => {
    if (removeUnusedImports) {
      code = this.removeUnusedImports(code);
    }
    if (prettierFormat) {
      code = this.prettierFormat(code);
    }
    return code;
  };
}

class TsLanguageServiceHost {
  constructor(fileName, content) {
    const tsconfig = ts.findConfigFile(fileName, ts.sys.fileExists);

    Object.assign(this, {
      fileName,
      content,
      compilerOptions: tsconfig
        ? ts.convertCompilerOptionsFromJson(ts.readConfigFile(tsconfig, ts.sys.readFile).config.compilerOptions).options
        : ts.getDefaultCompilerOptions(),
    });
  }

  getNewLine() {
    return "newLine" in ts.sys ? ts.sys.newLine : "\n";
  }
  getScriptFileNames() {
    return [this.fileName];
  }
  getCompilationSettings() {
    return this.compilerOptions;
  }
  getDefaultLibFileName() {
    return ts.getDefaultLibFileName(this.getCompilationSettings());
  }
  getCurrentDirectory() {
    return process.cwd();
  }
  getScriptVersion() {
    return ts.version;
  }
  getScriptSnapshot() {
    return ts.ScriptSnapshot.fromString(this.content);
  }
  readFile(fileName, encoding) {
    if (fileName === this.fileName) {
      return this.content;
    }

    return ts.sys.readFile(fileName, encoding);
  }
  fileExists(path) {
    return ts.sys.fileExists(path);
  }
}

module.exports = {
  CodeFormatter,
};
