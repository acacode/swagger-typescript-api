const { generateApiForTest } = require("../../helpers/generateApiForTest");
const { resolve } = require("path");
const validateGeneratedModule = require("../../helpers/validateGeneratedModule");
const assertGeneratedModule = require("../../helpers/assertGeneratedModule");
const createSchemaInfos = require("../../helpers/createSchemaInfos");

const schemas = createSchemaInfos({ absolutePathToSchemas: resolve(__dirname, "./") });

schemas.forEach(({ absolutePath, apiFileName }) => {
  generateApiForTest({
    testName: "extra-templates test",
    silent: true,
    name: apiFileName,
    input: absolutePath,
    output: resolve(__dirname, "./"),
    generateClient: false,
    generateResponses: false,
    generateRouteTypes: false,
    generateUnionEnums: false,
    templateExtensions: [".eta", ".ejs", ".ts"],
    extraTemplates: [
      {
        name: "external-template-name",
        path: resolve(__dirname, "./templates/test.ejs"),
        metadata: { arg1: 100, arg2: 200 },
      },
    ],
  }).then(() => {
    validateGeneratedModule(resolve(__dirname, `./external-template-name.ts`));
    assertGeneratedModule(resolve(__dirname, `./external-template-name.ts`), resolve(__dirname, `./expected.ts`));
  });
});
