const path = require("path");
const createSchemasInfos = require("./utils/createSchemaInfos")
const { generateApi } = require('../src');

const schemas = [
  ...createSchemasInfos({
    absolutePathToSchemas: path.resolve(__dirname, "./schemas/v2.0"),
    absoluteOutputPath: path.resolve(__dirname, "./generated/v2.0")
  }),
  ...createSchemasInfos({
    absolutePathToSchemas: path.resolve(__dirname, "./schemas/v3.0"),
    absoluteOutputPath: path.resolve(__dirname, "./generated/v3.0")
  }),
]

schemas.forEach(({
  absolutePath,
  apiFileName,
  outputPath,
}) => {
  generateApi({
    name: apiFileName,
    input: absolutePath,
    output: outputPath,
  });
})
