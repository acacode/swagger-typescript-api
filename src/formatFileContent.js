const _ = require("lodash");
const prettier = require("prettier");
const { config } = require("./config");
const ts = require("typescript");

class LanguageServiceHost {
  constructor(fileName, content) {
    const tsconfig = ts.findConfigFile(fileName, ts.sys.fileExists);

    Object.assign(this, {
      fileName,
      content,
      compilerOptions: tsconfig
        ? ts.convertCompilerOptionsFromJson(
            ts.readConfigFile(tsconfig, ts.sys.readFile).config.compilerOptions,
          ).options
        : ts.getDefaultCompilerOptions(),
    });
  }

  getNewLine = () => "\n";
  getScriptFileNames = () => [this.fileName];
  getCompilationSettings = () => this.compilerOptions;
  getDefaultLibFileName = () => ts.getDefaultLibFileName(this.getCompilationSettings());
  getCurrentDirectory = () => process.cwd();
  getScriptVersion = () => ts.version;
  getScriptSnapshot = () => ts.ScriptSnapshot.fromString(this.content);
}

const removeUnusedImports = (content) => {
  const tempFileName = "file.ts";

  const host = new LanguageServiceHost(tempFileName, content);
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

const prettierFormat = (content) => {
  return prettier.format(content, config.prettierOptions);
};

const formatters = [removeUnusedImports, prettierFormat];

module.exports = (content) =>
  formatters.reduce((fixedContent, formatter) => formatter(fixedContent), content);
