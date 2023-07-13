const _ = require("lodash");
const { generateApiForTest } = require("../../helpers/generateApiForTest");
const { resolve } = require("path");
const validateGeneratedModule = require("../../helpers/validateGeneratedModule");
const createSchemaInfos = require("../../helpers/createSchemaInfos");
const assertGeneratedModule = require("../../helpers/assertGeneratedModule");

const schemas = createSchemaInfos({ absolutePathToSchemas: resolve(__dirname, "./") });

schemas.forEach(({ absolutePath, apiFileName, Exception }) => {
  generateApiForTest({
    testName: "partialBaseTemplate test",
    silent: true,
    name: apiFileName,
    input: absolutePath,
    output: resolve(__dirname, "./"),
    // because this script was called from package.json folder
    templates: "./tests/spec/partialBaseTemplate/spec_templates",
  }).then((output) => {
    if (!_.includes(_.get(output.files, "[0].fileContent"), "/** PARTIAL TEMPLATES */")) {
      throw new Exception("Failed, spec templates are not applied");
    }

    validateGeneratedModule(resolve(__dirname, `./${apiFileName}`));
    assertGeneratedModule(resolve(__dirname, `./${apiFileName}`), resolve(__dirname, `./expected.ts`));
  });
});
