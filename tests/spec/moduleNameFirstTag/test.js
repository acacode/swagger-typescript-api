const { generateApi } = require("../../../src");
const { resolve } = require("path");
const validateGeneratedModule = require("../../helpers/validateGeneratedModule");
const createSchemasInfos = require("../../helpers/createSchemaInfos");

const schemas = createSchemasInfos({ absolutePathToSchemas: resolve(__dirname, "./") });

schemas.forEach(({ absolutePath, apiFileName }) => {
  generateApi({
    silent: true,
    name: apiFileName,
    spec: require(absolutePath),
    output: resolve(__dirname, "./"),
    moduleNameFirstTag: true,
  })
    .then(() => {
      const diagnostics = validateGeneratedModule({
        pathToFile: resolve(__dirname, `./${apiFileName}`),
      });
      if (diagnostics.length) throw "Failed";
    })
    .catch((e) => {
      console.error("moduleNameFirstTag option test failed.");
      throw e;
    });
});
