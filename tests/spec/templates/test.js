const { generateApi } = require("../../../src");
const { resolve } = require("path");
const validateGeneratedModule = require("../../helpers/validateGeneratedModule");
const createSchemasInfos = require("../../helpers/createSchemaInfos");

const schemas = createSchemasInfos({ absolutePathToSchemas: resolve(__dirname, "./") });

schemas.forEach(({ absolutePath, apiFileName }) => {
  generateApi({
    silent: true,
    name: apiFileName,
    input: absolutePath,
    output: resolve(__dirname, "./"),
    // because this script was called from package.json folder
    templates: "./tests/spec/templates/spec_templates",
  })
    .then((output) => {
      if (!output.files[0]) throw "Failed. no output file"
      if (!output.files[0].content) throw "Failed. no output file content"

      const matches = output.files[0].content.match(/\/\* CUSTOM TEMPLATE \*\//g)

      if (!matches || matches.length < 4) throw "Failed. too few comment matches"

      const diagnostics = validateGeneratedModule({
        pathToFile: resolve(__dirname, `./${apiFileName}`),
      });
      if (diagnostics.length) throw "Failed";
    })
    .catch((e) => {
      console.error("templates option test failed.");
      throw e;
    });
});
