const { relative } = require("path");
const fs = require("fs")
const tsc = require("typescript");

const compilerOptions = {
  noEmitOnError: true,
  noImplicitAny: false,
  target: tsc.ScriptTarget.ES2018,
  module: tsc.ModuleKind.CommonJS
}

const getDiagnosticsFromPath = pathToFile =>
  tsc.createProgram([pathToFile], compilerOptions).emit(void 0, void 0, void 0, true).diagnostics
  // TODO: that's faster but return 0 error kind of "Cannot find name ''"
  // tsc.transpileModule(fs.readFileSync(pathToFile).toString(), {
  //   compilerOptions,
  //   reportDiagnostics: true,
  //   moduleName:"TEST",
  //   fileName: relative('', pathToFile),
  // }).diagnostics

module.exports = ({ pathToFile }) => {
  process.stdout.write(`validating ${relative('', pathToFile)}: `)

  const diagnostics = getDiagnosticsFromPath(pathToFile)

  diagnostics.forEach(({
    messageText,
    file,
    start,
  }) => {
      var message = tsc.flattenDiagnosticMessageText(messageText, '\n');
      if (!file) {
          console.error(message);
          return;
      }
      var { line, character } = file.getLineAndCharacterOfPosition(start);
      console.error(`${file.fileName} (${line + 1},${character + 1}): ${message}`);
  });

  process.stdout.write(`errors ${diagnostics.length}\r\n`)

  return diagnostics
}