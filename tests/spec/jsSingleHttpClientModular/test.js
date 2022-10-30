const { generateApiForTest } = require("../../helpers/generateApiForTest");
const { resolve } = require("path");
const validateGeneratedModule = require("../../helpers/validateGeneratedModule");
const createSchemaInfos = require("../../helpers/createSchemaInfos");
const assertGeneratedModule = require("../../helpers/assertGeneratedModule");

const schemas = createSchemaInfos({ absolutePathToSchemas: resolve(__dirname, "./") });

schemas.forEach(({ absolutePath, Exception }) => {
  generateApiForTest({
    testName: "--modular-js option test",
    silent: true,
    input: absolutePath,
    output: resolve(__dirname, "./generated"),
    modular: true,
    toJS: true,
    singleHttpClient: true,
    generateClient: true,
    generateRouteTypes: true,
  }).then(() => {
    const outputFileNames = [
      "data-contracts.d.ts",
      "data-contracts.js",
      "http-client.d.ts",
      "http-client.js",
      "Key.d.ts",
      "Key.js",
      "KeyRoute.d.ts",
      "KeyRoute.js",
      "Login.d.ts",
      "Login.js",
      "LoginRoute.d.ts",
      "LoginRoute.js",
      "Scope.d.ts",
      "Scope.js",
      "ScopeRoute.d.ts",
      "ScopeRoute.js",
    ];

    for (const fileName of outputFileNames) {
      validateGeneratedModule(resolve(__dirname, `./generated/${fileName}`));
      assertGeneratedModule(
        resolve(__dirname, `./generated/${fileName}`),
        resolve(__dirname, `./expected/${fileName}`),
      );
    }
  });
});
