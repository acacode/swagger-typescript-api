const { generateApi } = require("../../../src");
const { resolve } = require("path");
const validateGeneratedModule = require("../../helpers/validateGeneratedModule");
const createSchemasInfos = require("../../helpers/createSchemaInfos");

const schemas = createSchemasInfos({ absolutePathToSchemas: resolve(__dirname, "./") });

schemas.forEach(({ absolutePath, apiFileName }) => {
  generateApi({
    name: apiFileName,
    spec: require(absolutePath),
    output: resolve(__dirname, "./"),
    moduleNameIndex: 2,
  })
    .then(() => {
      const diagnostics = validateGeneratedModule({
        pathToFile: resolve(__dirname, `./${apiFileName}`),
      });
      if (diagnostics.length) throw "Failed";
    })
    .catch((e) => {
      console.error("moduleNameIndex option test failed.");
      throw e;
    });
});
