const ts = require("typescript");
const { Translator } = require("./translator");

class JavascriptTranslator extends Translator {
  /**
   * @param {TranslatorIO} input
   * @returns {Record<string, string>}
   */
  compileTSCode = (input) => {
    const fileNameFull = `${input.fileName}${input.fileExtension}`;
    const output = {};
    const host = ts.createCompilerHost(this.config.compilerTsConfig, true);
    const fileNames = [fileNameFull];
    const originalSourceFileGet = host.getSourceFile.bind(host);
    host.getSourceFile = (sourceFileName, languageVersion, onError, shouldCreateNewSourceFile) => {
      if (sourceFileName !== fileNameFull)
        return originalSourceFileGet(sourceFileName, languageVersion, onError, shouldCreateNewSourceFile);

      return ts.createSourceFile(sourceFileName, input.fileContent, languageVersion, true, ts.ScriptKind.TS);
    };

    host.writeFile = (fileName, contents) => {
      output[fileName] = contents;
    };

    ts.createProgram(fileNames, this.config.compilerTsConfig, host).emit();

    return output;
  };

  translate(input) {
    const compiled = this.compileTSCode(input);

    const jsFileName = `${input.fileName}${ts.Extension.Js}`;
    const dtsFileName = `${input.fileName}${ts.Extension.Dts}`;
    const sourceContent = compiled[jsFileName];
    const tsImportRows = input.fileContent.split("\n").filter((line) => line.startsWith("import "));
    const declarationContent = compiled[dtsFileName]
      .split("\n")
      .map((line) => {
        if (line.startsWith("import ")) {
          return tsImportRows.shift();
        }
        return line;
      })
      .join("\n");

    return [
      {
        fileName: input.fileName,
        fileExtension: ts.Extension.Js,
        fileContent: this.codeFormatter.formatCode(sourceContent),
      },
      {
        fileName: input.fileName,
        fileExtension: ts.Extension.Dts,
        fileContent: this.codeFormatter.formatCode(declarationContent),
      },
    ];
  }
}

module.exports = {
  JavascriptTranslator,
};
