const { generateApiForTest } = require("../../helpers/generateApiForTest");
const { resolve } = require("path");
const validateGeneratedModule = require("../../helpers/validateGeneratedModule");
const createSchemaInfos = require("../../helpers/createSchemaInfos");

const schemas = createSchemaInfos({ absolutePathToSchemas: resolve(__dirname, "./") });

schemas.forEach(({ absolutePath, apiFileName }) => {
  generateApiForTest({
    silent: true,
    name: apiFileName,
    input: absolutePath,
    output: resolve(__dirname, "./"),
    generateResponses: true,
  })
    .then(() => {
      validateGeneratedModule(resolve(__dirname, `./${apiFileName}`));
    })
    .catch((e) => {
      console.error("responses option test failed.");
      throw e;
    });
});
