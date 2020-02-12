const fs = require("fs");
const path = require("path");
const tsc = require("typescript");

const createGeneratedApiInfos = (pathToApis) =>
  (fs.readdirSync(pathToApis) || [])
    .map(fileName => path.resolve(pathToApis, fileName))

const v2ApiPaths = createGeneratedApiInfos(path.resolve(__dirname, "./generated/v2.0"));
const v3ApiPaths = createGeneratedApiInfos(path.resolve(__dirname, "./generated/v3.0"));

[
  ...v2ApiPaths,
  ...v3ApiPaths,
].forEach(path => {
  var program = tsc.createProgram([path], {
    noEmitOnError: true,
    noImplicitAny: false,
    target: tsc.ScriptTarget.ES5, module: tsc.ModuleKind.CommonJS
  });
  var emitResult = program.emit(void 0, void 0, void 0, true,)

  var allDiagnostics = emitResult.diagnostics;

  allDiagnostics.forEach(diagnostic => {
      var message = tsc.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
      if (!diagnostic.file) {
          console.log(message);
          return;
      }
      var { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
      console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
  });

  if (emitResult.diagnostics.length){
    process.exit(1)
  }
})
