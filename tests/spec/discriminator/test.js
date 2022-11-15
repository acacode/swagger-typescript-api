const { generateApiForTest } = require("../../helpers/generateApiForTest");
const { resolve } = require("path");
const validateGeneratedModule = require("../../helpers/validateGeneratedModule");
const assertGeneratedModule = require("../../helpers/assertGeneratedModule");
const createSchemaInfos = require("../../helpers/createSchemaInfos");

const schemas = createSchemaInfos({ absolutePathToSchemas: resolve(__dirname, "./") });

schemas.forEach(({ absolutePath, apiFileName }) => {
  generateApiForTest({
    testName: "discriminator test",
    silent: true,
    name: apiFileName,
    input: absolutePath,
    output: resolve(__dirname, "./"),
    addReadonly: true,
    generateClient: false,
  }).then(() => {
    validateGeneratedModule(resolve(__dirname, `./${apiFileName}`));
    assertGeneratedModule(resolve(__dirname, `./${apiFileName}`), resolve(__dirname, `./expected.ts`));
  });
});
