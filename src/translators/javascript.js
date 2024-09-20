import * as typescript from "typescript";
import { Translator } from "./translator.js";

class JavascriptTranslator extends Translator {
  /**
   * @param {TranslatorIO} input
   * @returns {Record<string, string>}
   */
  compileTSCode = (input) => {
    const fileNameFull = `${input.fileName}${input.fileExtension}`;
    const output = {};
    const host = typescript.createCompilerHost(
      this.config.compilerTsConfig,
      true,
    );
    const fileNames = [fileNameFull];
    const originalSourceFileGet = host.getSourceFile.bind(host);
    host.getSourceFile = (
      sourceFileName,
      languageVersion,
      onError,
      shouldCreateNewSourceFile,
    ) => {
      if (sourceFileName !== fileNameFull)
        return originalSourceFileGet(
          sourceFileName,
          languageVersion,
          onError,
          shouldCreateNewSourceFile,
        );

      return typescript.createSourceFile(
        sourceFileName,
        input.fileContent,
        languageVersion,
        true,
        typescript.ScriptKind.TS,
      );
    };

    host.writeFile = (fileName, contents) => {
      output[fileName] = contents;
    };

    typescript
      .createProgram(fileNames, this.config.compilerTsConfig, host)
      .emit();

    return output;
  };

  translate = async (input) => {
    const compiled = this.compileTSCode(input);

    const jsFileName = `${input.fileName}${typescript.Extension.Js}`;
    const dtsFileName = `${input.fileName}${typescript.Extension.Dts}`;
    const sourceContent = compiled[jsFileName];
    const tsImportRows = input.fileContent
      .split("\n")
      .filter((line) => line.startsWith("import "));
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
        fileExtension: typescript.Extension.Js,
        fileContent: await this.codeFormatter.formatCode(sourceContent),
      },
      {
        fileName: input.fileName,
        fileExtension: typescript.Extension.Dts,
        fileContent: await this.codeFormatter.formatCode(declarationContent),
      },
    ];
  };
}

export { JavascriptTranslator };
