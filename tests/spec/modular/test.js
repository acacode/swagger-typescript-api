const { generateApi } = require("../../../src");
const { resolve } = require("path");
const validateGeneratedModule = require("../../helpers/validateGeneratedModule");
const createSchemasInfos = require("../../helpers/createSchemaInfos");

const schemas = createSchemasInfos({ absolutePathToSchemas: resolve(__dirname, "./") });

schemas.forEach(({ absolutePath }) => {
  generateApi({
    silent: true,
    input: absolutePath,
    output: resolve(__dirname, "./"),
    modular: true,
    generateClient: true,
    generateRouteTypes: true,
  })
    .then(() => {
      const diagnostics = [
        ...validateGeneratedModule({
          pathToFile: resolve(__dirname, `./data-contracts.ts`),
        }),
        ...validateGeneratedModule({
          pathToFile: resolve(__dirname, `./http-client.ts`),
        }),
        ...validateGeneratedModule({
          pathToFile: resolve(__dirname, `./Key`),
        }),
        ...validateGeneratedModule({
          pathToFile: resolve(__dirname, `./Login`),
        }),
        ...validateGeneratedModule({
          pathToFile: resolve(__dirname, `./Scope`),
        }),
      ];
      if (diagnostics.length) throw "Failed";
    })
    .catch((e) => {
      console.error("modular option test failed.");
      throw e;
    });
});
