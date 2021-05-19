const { generateApiForTest } = require("../../helpers/generateApiForTest");
const { resolve } = require("path");
const validateGeneratedModule = require("../../helpers/validateGeneratedModule");
const createSchemaInfos = require("../../helpers/createSchemaInfos");

const schemas = createSchemaInfos({ absolutePathToSchemas: resolve(__dirname, "./") });

schemas.forEach(({ absolutePath, Exception }) => {
  generateApiForTest({
    testName: "--modular option test",
    silent: true,
    input: absolutePath,
    output: resolve(__dirname, "./"),
    modular: true,
    generateClient: true,
    generateRouteTypes: true,
  }).then(() => {
    const diagnostics = [
      ...validateGeneratedModule(resolve(__dirname, `./data-contracts.ts`)),
      ...validateGeneratedModule(resolve(__dirname, `./http-client.ts`)),
      ...validateGeneratedModule(resolve(__dirname, `./Key`)),
      ...validateGeneratedModule(resolve(__dirname, `./Login`)),
      ...validateGeneratedModule(resolve(__dirname, `./Scope`)),
    ];
    if (diagnostics.length) throw new Exception("Failed");
  });
});
