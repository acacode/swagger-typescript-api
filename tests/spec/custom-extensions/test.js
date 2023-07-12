const createSchemaInfos = require("../../helpers/createSchemaInfos");
const { resolve } = require("path");
const { generateApiForTest } = require("../../helpers/generateApiForTest");
const validateGeneratedModule = require("../../helpers/validateGeneratedModule");
const assertGeneratedModule = require("../../helpers/assertGeneratedModule");

const schemas = createSchemaInfos({ absolutePathToSchemas: resolve(__dirname, "./") });

schemas.forEach(({ absolutePath, apiFileName }) => {
  generateApiForTest({
    testName: "custom extensions",
    silent: true,
    name: apiFileName,
    input: absolutePath,
    output: resolve(__dirname, "./"),
  }).then(() => {
    validateGeneratedModule(resolve(__dirname, `./${apiFileName}`));
    assertGeneratedModule(resolve(__dirname, `./${apiFileName}`), resolve(__dirname, "./expected.ts"));
  });
});
