const ts = require("typescript");

function translate(fileName, content, options) {
  const output = {};
  const host = ts.createCompilerHost(options, true);
  const fileNames = [fileName];
  const originalSourceFileGet = host.getSourceFile.bind(host);
  host.getSourceFile = (sourceFileName, languageVersion, onError, shouldCreateNewSourceFile) => {
    if (sourceFileName !== fileName)
      return originalSourceFileGet(sourceFileName, languageVersion, onError, shouldCreateNewSourceFile);

    return ts.createSourceFile(sourceFileName, content, languageVersion, true, ts.ScriptKind.External);
  };

  host.writeFile = (fileName, contents) => {
    output[fileName] = contents;
  };

  ts.createProgram(fileNames, options, host).emit();

  return output;
}

module.exports = {
  translate: (fileName, sourceTypeScript) => {
    const translated = translate(fileName, sourceTypeScript, {
      module: "ESNext",
      noImplicitReturns: true,
      alwaysStrict: true,
      target: ts.ScriptTarget.ESNext,
      declaration: true,
      noImplicitAny: false,
      sourceMap: false,
      removeComments: false,
      disableSizeLimit: true,
      esModuleInterop: true,
      emitDecoratorMetadata: true,
      skipLibCheck: true,
    });

    const sourceFileName = fileName.replace(ts.Extension.Ts, ts.Extension.Js);
    const declarationFileName = fileName.replace(ts.Extension.Ts, ts.Extension.Dts);
    const sourceContent = translated[sourceFileName];
    const tsImportRows = sourceTypeScript.split("\n").filter((line) => line.startsWith("import "));
    const declarationContent = translated[declarationFileName]
      .split("\n")
      .map((line) => {
        if (line.startsWith("import ")) {
          return tsImportRows.shift();
        }
        return line;
      })
      .join("\n");

    return {
      sourceContent: sourceContent,
      declarationContent: declarationContent,
    };
  },
};
