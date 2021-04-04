const { relative } = require("path");
const fs = require("fs");
const tsc = require("typescript");

const compilerOptions = {
  noEmitOnError: true,
  noImplicitAny: true,
  target: tsc.ScriptTarget.ES2018,
  module: tsc.ModuleKind.CommonJS,
  strict: true,
};

const getDiagnosticsFromPath = (pathToFile) =>
  tsc.createProgram([pathToFile], compilerOptions).emit(void 0, void 0, void 0, true).diagnostics;
// TODO: that's faster but return 0 error kind of "Cannot find name ''"
// tsc.transpileModule(fs.readFileSync(pathToFile).toString(), {
//   compilerOptions,
//   reportDiagnostics: true,
//   moduleName:"TEST",
//   fileName: relative('', pathToFile),
// }).diagnostics

module.exports = ({ pathToFile }) => {
  const diagnostics = getDiagnosticsFromPath(pathToFile);
  const relativePathToFile = relative("", pathToFile);

  console.log(`validating ${relativePathToFile}: errors ${diagnostics.length}`);
  diagnostics.forEach(({ messageText, file, start }) => {
    var message = tsc.flattenDiagnosticMessageText(messageText, "\n");
    if (!file) {
      console.error(`${relativePathToFile}\r\n`, message);
      return;
    }
    var { line, character } = file.getLineAndCharacterOfPosition(start);
    console.error(
      `${relativePathToFile}\r\n`,
      `${file.fileName} (${line + 1},${character + 1}): ${message}`,
    );
  });

  return diagnostics;
};
