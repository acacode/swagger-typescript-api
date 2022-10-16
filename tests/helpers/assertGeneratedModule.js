const fs = require("fs");
const gitDiff = require("git-diff");

const assertGeneratedModule = (pathToModule1, pathToModule2) => {
  const output = fs.readFileSync(pathToModule1).toString("utf8");
  const expected = fs.readFileSync(pathToModule2).toString("utf8");

  const diff = gitDiff(output, expected, {
    color: true,
    flags: "--diff-algorithm=default",
  });

  if (diff && diff.length) {
    console.error("\n" + diff);
    throw new Error("expected another output");
  }

  return void 0;
};

module.exports = assertGeneratedModule;
