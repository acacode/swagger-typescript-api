const fs = require("fs");
const { resolve, relative } = require("path");
const tsc = require("typescript");

const createGeneratedApiInfos = (pathToApis) =>
  (fs.readdirSync(pathToApis) || [])
    .map(fileName => resolve(pathToApis, fileName))

const v2ApiPaths = createGeneratedApiInfos(resolve(__dirname, "./generated/v2.0"));
const v3ApiPaths = createGeneratedApiInfos(resolve(__dirname, "./generated/v3.0"));

let hasErrors = false;

[
  ...v2ApiPaths,
  ...v3ApiPaths,
].forEach(path => {
  process.stdout.write(`validating ${relative('', path)}: `)
  var program = tsc.createProgram([path], {
    noEmitOnError: true,
    noImplicitAny: false,
    target: tsc.ScriptTarget.ES5, module: tsc.ModuleKind.CommonJS
  });
  var emitResult = program.emit(void 0, void 0, void 0, true)

  var allDiagnostics = emitResult.diagnostics;

  allDiagnostics.forEach(diagnostic => {
      var message = tsc.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
      if (!diagnostic.file) {
          console.error(message);
          return;
      }
      var { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
      console.error(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
  });

  process.stdout.write(`errors ${emitResult.diagnostics.length}\r\n`)

  if (!hasErrors) {
    hasErrors = !!emitResult.diagnostics.length
  }
})

if (hasErrors) {
  process.exit(1)
} else {
  console.log('everything is good:)')
}
