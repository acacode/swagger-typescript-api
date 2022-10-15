const { generateApiForTest } = require("../../helpers/generateApiForTest");
const { resolve } = require("path");
const validateGeneratedModule = require("../../helpers/validateGeneratedModule");
const createSchemaInfos = require("../../helpers/createSchemaInfos");
const fs = require("fs");
const gitDiff = require("git-diff");

const schemas = createSchemaInfos({ absolutePathToSchemas: resolve(__dirname, "./") });

schemas.forEach(({ absolutePath, apiFileName }) => {
  generateApiForTest({
    testName: "object-types test",
    silent: true,
    name: apiFileName,
    input: absolutePath,
    output: resolve(__dirname, "./"),
    addReadonly: true,
    generateClient: false,
  }).then(() => {
    validateGeneratedModule(resolve(__dirname, `./${apiFileName}`));

    const output = fs.readFileSync(resolve(__dirname, `./${apiFileName}`)).toString("utf8");
    const expected = fs.readFileSync(resolve(__dirname, `./expected.ts`)).toString("utf8");

    const diff = gitDiff(output, expected, {
      color: true,
      flags: "--diff-algorithm=default",
    });

    if (diff && diff.length) {
      console.error("\n" + diff);
      throw new Error("expected another output");
    }

    return void 0;
  });
});
