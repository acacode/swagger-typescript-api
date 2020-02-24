const { relative } = require("path");
const tsc = require("typescript");

const compilerOptions = {
  noEmitOnError: true,
  noImplicitAny: false,
  target: tsc.ScriptTarget.ES2019,
  module: tsc.ModuleKind.CommonJS
}

const getDiagnosticsFromPath = pathToFile =>
  tsc.createProgram([pathToFile], compilerOptions).emit(void 0, void 0, void 0, true).diagnostics

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