const { generateApiForTest } = require("../../helpers/generateApiForTest");
const { resolve } = require("path");
const validateGeneratedModule = require("../../helpers/validateGeneratedModule");
const createSchemaInfos = require("../../helpers/createSchemaInfos");
const assertGeneratedModule = require("../../helpers/assertGeneratedModule");

const schemasv2 = resolve(__dirname, "./v2.0");
const schemasv3 = resolve(__dirname, "./v3.0");

createSchemaInfos({ absolutePathToSchemas: schemasv2 }).forEach(({ absolutePath, apiFileName }) => {
  generateApiForTest({
    testName: "--extract-enums (v2.0) option test",
    silent: true,
    name: apiFileName,
    input: absolutePath,
    output: resolve(schemasv2, "./"),
    extractEnums: true,
    extractRequestParams: true,
    extractResponseBody: true,
    extractResponseError: true,
    generateClient: false,
    fixInvalidEnumKeyPrefix: "InvalidKey",
    enumKeyPrefix: "EnumKeyPrefix",
    enumKeySuffix: "EnumKeySuffix",
    typePrefix: "TypeNamePrefix",
    typeSuffix: "TypeNameSuffix",
  }).then(() => {
    validateGeneratedModule(resolve(schemasv2, `./${apiFileName}`));
    assertGeneratedModule(resolve(schemasv2, `./${apiFileName}`), resolve(schemasv2, `./expected.ts`));
  });
});

createSchemaInfos({ absolutePathToSchemas: resolve(schemasv3, "./") }).forEach(({ absolutePath, apiFileName }) => {
  generateApiForTest({
    testName: "--extract-enums (v3.0) option test",
    silent: true,
    name: apiFileName,
    input: absolutePath,
    output: resolve(schemasv3, "./"),
    extractEnums: true,
    extractRequestParams: true,
    extractResponseBody: true,
    extractResponseError: true,
    generateClient: false,
    fixInvalidEnumKeyPrefix: "InvalidKey",
    enumKeyPrefix: "EnumKeyPrefix",
    enumKeySuffix: "EnumKeySuffix",
    typePrefix: "TypeNamePrefix",
    typeSuffix: "TypeNameSuffix",
  }).then(() => {
    validateGeneratedModule(resolve(schemasv3, `./${apiFileName}`));
    assertGeneratedModule(resolve(schemasv3, `./${apiFileName}`), resolve(schemasv3, `./expected.ts`));
  });
});
