const { generateApiForTest } = require("../../helpers/generateApiForTest");
const { resolve } = require("path");
const validateGeneratedModule = require("../../helpers/validateGeneratedModule");
const createSchemaInfos = require("../../helpers/createSchemaInfos");
const assertGeneratedModule = require("../../helpers/assertGeneratedModule");

const schemas = createSchemaInfos({ absolutePathToSchemas: resolve(__dirname, "./") });

schemas.forEach(({ absolutePath, apiFileName }) => {
  const primitiveTypeConstructs = (constructs) => ({
    string: {
      $default: "String",
      "date-time": "Date",
    },
  });
  const codeGenConstructs = () => {
    return {
      Keyword: {
        Object: "Record<string, any>",
      },
    };
  };

  Promise.all([
    generateApiForTest({
      testName: "--primitive-type-constructs option test (with another-type)",
      silent: true,
      name: apiFileName,
      input: absolutePath,
      output: resolve(__dirname, "./another-array-type"),
      generateClient: false,
      anotherArrayType: true,
      primitiveTypeConstructs,
      codeGenConstructs,
    }),
    generateApiForTest({
      testName: "--primitive-type-constructs option test (base)",
      silent: true,
      name: apiFileName,
      input: absolutePath,
      output: resolve(__dirname, "./base"),
      generateClient: false,
      anotherArrayType: false,
      primitiveTypeConstructs,
      codeGenConstructs,
    }),
  ]).then((...args) => {
    validateGeneratedModule(resolve(__dirname, `./another-array-type/${apiFileName}`));
    assertGeneratedModule(
      resolve(__dirname, `./another-array-type/${apiFileName}`),
      resolve(__dirname, `./another-array-type/expected.ts`),
    );

    validateGeneratedModule(resolve(__dirname, `./base/${apiFileName}`));
    assertGeneratedModule(resolve(__dirname, `./base/${apiFileName}`), resolve(__dirname, `./base/expected.ts`));
  });
});
