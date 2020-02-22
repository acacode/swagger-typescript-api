const { relative } = require("path");
const tsc = require("typescript");

const compilerOptions = {
  noEmitOnError: true,
  noImplicitAny: false,
  target: tsc.ScriptTarget.ES5, module: tsc.ModuleKind.CommonJS
}

module.exports = (path) => {
  process.stdout.write(`validating ${relative('', path)}: `)

  var program = tsc.createProgram([path], compilerOptions);
  var emitResult = program.emit(void 0, void 0, void 0, true)

  var allDiagnostics = emitResult.diagnostics;

  allDiagnostics.forEach(({
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

  process.stdout.write(`errors ${allDiagnostics.length}\r\n`)

  return allDiagnostics
}