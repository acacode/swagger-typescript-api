const _ = require("lodash");
const { generateApi } = require("../../../src");
const { resolve } = require("path");
const validateGeneratedModule = require("../../helpers/validateGeneratedModule");
const createSchemasInfos = require("../../helpers/createSchemaInfos");

const schemas = createSchemasInfos({ absolutePathToSchemas: resolve(__dirname, "./") });

schemas.forEach(({ absolutePath, apiFileName }) => {
  generateApi({
    name: apiFileName,
    input: absolutePath,
    output: resolve(__dirname, "./"),
    // because this script was called from package.json folder
    templates: "./tests/spec/partialBaseTemplate/spec_templates",
  })
    .then((output) => {
      if (!_.includes(_.get(output.files, "[0].content"), "/** PARTIAL TEMPLATES */")) {
        throw "Failed, spec templates are not applied";
      }

      const diagnostics = validateGeneratedModule({
        pathToFile: resolve(__dirname, `./${apiFileName}`),
      });
      if (diagnostics.length) throw "Failed";
    })
    .catch((e) => {
      console.error("partialBaseTemplate test failed.");
      throw e;
    });
});
