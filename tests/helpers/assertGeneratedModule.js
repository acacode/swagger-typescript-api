const fs = require("fs");
const gitDiff = require("git-diff");

const assertGeneratedModule = (pathToModule1, pathToModule2) => {
  if (process.env.UPDATE_SNAPSHOTS) {
    const output = fs.readFileSync(pathToModule1).toString("utf8");
    fs.writeFileSync(pathToModule2, output, { encoding: "utf8" });
  } else {
    const output = fs.readFileSync(pathToModule1).toString("utf8");
    const expected = fs.readFileSync(pathToModule2).toString("utf8");

    const diff = gitDiff(output, expected, {
      color: true,
      flags: "--diff-algorithm=default --ignore-space-at-eol --ignore-cr-at-eol",
    });

    if (diff && diff.length) {
      console.error("\n" + diff);
      throw new Error("expected another output");
    }
  }

  return void 0;
};

module.exports = assertGeneratedModule;
