const ts = require("typescript");

function translate(fileName, content, options) {
  const output = {};
  const host = ts.createCompilerHost(options);
  const fileNames = [fileName];
  const originalSourceFileGet = host.getSourceFile.bind(host);
  host.getSourceFile = (sourceFileName, languageVersion, onError, shouldCreateNewSourceFile) => {
    if (sourceFileName !== fileName)
      return originalSourceFileGet(
        sourceFileName,
        languageVersion,
        onError,
        shouldCreateNewSourceFile,
      );

    return ts.createLanguageServiceSourceFile(
      sourceFileName,
      ts.ScriptSnapshot.fromString(content),
      ts.ScriptTarget.ESNext,
      ts.version,
      false,
      ts.ScriptKind.TS,
    );
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
      target: ts.ScriptTarget.Latest,
      declaration: true,
      removeComments: false,
    });

    const sourceFileName = fileName.replace(".ts", ".js");
    const declarationFileName = fileName.replace(".ts", ".d.ts");

    return {
      sourceFile: {
        name: sourceFileName,
        content: translated[sourceFileName],
      },
      declarationFile: {
        name: declarationFileName,
        content: translated[declarationFileName],
      },
    };
  },
};
