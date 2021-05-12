const { generateApiForTest } = require("../../helpers/generateApiForTest");
const { resolve } = require("path");
const validateGeneratedModule = require("../../helpers/validateGeneratedModule");
const createSchemaInfos = require("../../helpers/createSchemaInfos");

const schemas = createSchemaInfos({ absolutePathToSchemas: resolve(__dirname, "./") });

schemas.forEach(({ absolutePath, apiFileName, Exception }) => {
  generateApiForTest({
    testName: "--templates option test",
    silent: true,
    name: apiFileName,
    input: absolutePath,
    output: resolve(__dirname, "./"),
    // because this script was called from package.json folder
    templates: "./tests/spec/templates/spec_templates",
  })
    .then((output) => {
      if (!output.files[0]) throw new Exception("Failed. no output file")
      if (!output.files[0].content) throw new Exception("Failed. no output file content")

      const matches = output.files[0].content.match(/\/\* CUSTOM TEMPLATE \*\//g)

      if (!matches || matches.length < 4) throw Exception("Failed. too few comment matches")

      validateGeneratedModule(resolve(__dirname, `./${apiFileName}`));
    });
});
