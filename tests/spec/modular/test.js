const { generateApiForTest } = require("../../helpers/generateApiForTest");
const { resolve } = require("path");
const validateGeneratedModule = require("../../helpers/validateGeneratedModule");
const createSchemaInfos = require("../../helpers/createSchemaInfos");
const assertGeneratedModule = require("../../helpers/assertGeneratedModule");

const schemas = createSchemaInfos({ absolutePathToSchemas: resolve(__dirname, "./") });

schemas.forEach(({ absolutePath, Exception }) => {
  generateApiForTest({
    testName: "--modular option test",
    silent: true,
    input: absolutePath,
    output: resolve(__dirname, "./generated"),
    modular: true,
    generateClient: true,
    generateRouteTypes: true,
  }).then(() => {
    const outputFileNames = [
      "data-contracts",
      "http-client",
      "Key",
      "KeyRoute",
      "Login",
      "LoginRoute",
      "route-types",
      "Scope",
      "ScopeRoute",
    ];

    for (const fileName of outputFileNames) {
      validateGeneratedModule(resolve(__dirname, `./generated/${fileName}.ts`));
      assertGeneratedModule(
        resolve(__dirname, `./generated/${fileName}.ts`),
        resolve(__dirname, `./expected/${fileName}.ts`),
      );
    }
  });
});
