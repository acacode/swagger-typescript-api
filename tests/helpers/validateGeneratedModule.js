const { relative } = require("path");
const fs = require("fs");
const ts = require("typescript");

/** @type {ts.CompilerOptions} */
const compilerOptions = {
  allowJs: true,
  noEmitOnError: true,
  noImplicitAny: true,
  target: ts.ScriptTarget.ES2018,
  module: ts.ModuleKind.CommonJS,
  strict: true,
  alwaysStrict: true,
  noEmit: true,
};

function compile(fileNames) {
  console.log(`compiling ${fileNames.join(", ")}`);

  let program = ts.createProgram(fileNames, compilerOptions);
  let emitResult = program.emit();

  let allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

  allDiagnostics.forEach((diagnostic) => {
    if (diagnostic.file) {
      let { line, character } = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start);
      let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
      console.error(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
    } else {
      console.error(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
    }
  });

  let exitCode = allDiagnostics.length || emitResult.emitSkipped ? 1 : 0;

  if (exitCode) {
    console.log(`Process exiting with code '${exitCode}'.`);
    // process.kill(process.pid, "SIGABRT");
    // throw "FFFFFFFFFFFFF"
    process.exit(exitCode);
  }

  return {
    code: exitCode,
    diagnostics: allDiagnostics,
  };
}

const getDiagnosticsFromPath = (pathToFile) =>
  ts.createProgram([pathToFile], compilerOptions).emit(void 0, void 0, void 0, true).diagnostics;
// TODO: that's faster but return 0 error kind of "Cannot find name ''"
// tsc.transpileModule(fs.readFileSync(pathToFile).toString(), {
//   compilerOptions,
//   reportDiagnostics: true,
//   moduleName:"TEST",
//   fileName: relative('', pathToFile),
// }).diagnostics

module.exports = ({ pathToFile }) => {
  const { diagnostics, code } = compile([pathToFile]);
  // const relativePathToFile = relative("", pathToFile);

  // console.log(`validating ${relativePathToFile}: errors ${diagnostics.length}`);
  // diagnostics.forEach(({ messageText, file, start }) => {
  //   var message = ts.flattenDiagnosticMessageText(messageText, "\n");
  //   if (!file) {
  //     console.error(`${relativePathToFile}\r\n`, message);
  //     return;
  //   }
  //   var { line, character } = file.getLineAndCharacterOfPosition(start);
  //   console.error(
  //     `${relativePathToFile}\r\n`,
  //     `${file.fileName} (${line + 1},${character + 1}): ${message}`,
  //   );
  // });

  return diagnostics;
};
