const _ = require("lodash");
const { generateApiForTest } = require("../../helpers/generateApiForTest");
const { resolve } = require("path");
const validateGeneratedModule = require("../../helpers/validateGeneratedModule");
const createSchemaInfos = require("../../helpers/createSchemaInfos");
const assertGeneratedModule = require("../../helpers/assertGeneratedModule");

const schemas = createSchemaInfos({
  absolutePathToSchemas: resolve(__dirname, "./"),
  absoluteOutputPath: resolve(__dirname, "./"),
});

schemas.forEach(({ absolutePath, apiFileName, Exception }) => {
  generateApiForTest({
    testName: "--type-suffix --type-prefix options test",
    silent: true,
    name: apiFileName,
    input: absolutePath,
    output: resolve(__dirname, "./"),
    typePrefix: "SwaggerType",
    typeSuffix: "GeneratedDataContract",
    generateClient: true,
    generateResponses: true,
  }).then((output) => {
    validateGeneratedModule(resolve(__dirname, `./${apiFileName}`));
    assertGeneratedModule(resolve(__dirname, `./${apiFileName}`), resolve(__dirname, `./expected.ts`));
  });
});
