const fs = require("fs");
const gitDiff = require("git-diff");
const _ = require("lodash");

const assertGeneratedModule = (pathToModule1, pathToModule2) => {
  if (process.env.UPDATE_SNAPSHOTS) {
    const output = fs.readFileSync(pathToModule1).toString("utf8");
    fs.writeFileSync(pathToModule2, output, { encoding: "utf8" });
  } else {
    const output = fs.readFileSync(pathToModule1).toString("utf8");
    const expected = fs.readFileSync(pathToModule2).toString("utf8");

    const diff = gitDiff(expected, output, {
      color: true,
      flags:
        "--diff-algorithm=default --ignore-space-at-eol --ignore-cr-at-eol --ignore-space-change --ignore-all-space",
    });

    if (diff && diff.length) {
      const minusLinePrefix1 = "[31m-";
      const minusLinePrefix2 = "-";
      const plusLinePrefix1 = "[31m[39m[32m+";
      const plusLinePrefix2 = "[32m+";
      const plusLinePrefix3 = "+";
      const lines = diff.split("\n");
      const lineStructs = [];
      let deletedLines = 0;
      let addedLines = 0;
      const printPos = (pos) => {
        const fills = lines.length.toString().length;
        return `${pos + 1}`.padStart(fills, "0") + ": ";
      };
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.startsWith(minusLinePrefix1) || line.startsWith(minusLinePrefix2)) {
          lineStructs.push({
            pos: i,
            id: Math.random().toString() + i,
            deleted: true,
            line: `${printPos(i + addedLines)}${line}`,
          });
          ++deletedLines;
        } else if (
          line.startsWith(plusLinePrefix1) ||
          line.startsWith(plusLinePrefix2) ||
          line.startsWith(plusLinePrefix3)
        ) {
          lineStructs.push({
            pos: i,
            id: Math.random().toString() + i,
            added: true,
            line: `${printPos(i - deletedLines)}${line}`,
          });
          ++addedLines;
        } else {
          lineStructs.push({
            pos: i,
            id: Math.random().toString() + i,
            line: `${printPos(i - deletedLines)}${line}`,
          });
          addedLines = 0;
          deletedLines = 0;
        }
      }

      const computedLines = [];
      for (let i = 0; i < lineStructs.length; i++) {
        const lineStruct = lineStructs[i];
        if (lineStruct.deleted) {
          const sliced = lineStructs.slice(i - 5, i + 5);
          computedLines.push(...sliced);
        } else if (lineStruct.added) {
          const sliced = lineStructs.slice(i, i + 5 + 5);
          computedLines.push(...sliced);
        }
      }

      const sortedLines = _.sortBy(_.uniqBy(computedLines, "id"), "pos");
      const maxLine = (sortedLines.map((v) => v.line).sort((a, b) => b.length - a.length)[0] || "").length;
      const fixedLines = sortedLines.reduce((acc, computedLine, i, arr) => {
        const prev = arr[i - 1];
        if ((prev && computedLine.pos - prev.pos > 10) || !i) {
          acc.push("".padEnd(maxLine, "-"));
        }
        acc.push(computedLine.line);
        if (arr.length - 1 === i) {
          acc.push("".padEnd(maxLine, "-"));
        }
        return acc;
      }, []);
      console.log("\n");
      fixedLines.forEach((line) => {
        console.log(line);
      });
      console.error(new Error("expected another output").stack);
      process.exit(1);
    }
  }

  return void 0;
};

module.exports = assertGeneratedModule;
