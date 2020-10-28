const { generateApi } = require("../../../src");
const { resolve } = require("path");
const validateGeneratedModule = require("../../helpers/validateGeneratedModule");
const createSchemasInfos = require("../../helpers/createSchemaInfos");

const schemas = createSchemasInfos({ absolutePathToSchemas: resolve(__dirname, "./") });

schemas.forEach(({ absolutePath, apiFileName }) => {
  console.info("apiFileName", apiFileName);

  generateApi({
    name: apiFileName,
    input: absolutePath,
    output: resolve(__dirname, "./"),
    toJS: true,
  }).catch((e) => {
    console.error("js option test failed.");
    throw e;
  });
});
