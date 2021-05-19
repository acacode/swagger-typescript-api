const { resolve } = require("path");
const createSchemaInfos = require("./helpers/createSchemaInfos");

module.exports = [
  ...createSchemaInfos({
    absolutePathToSchemas: resolve(__dirname, "./schemas/v2.0"),
    absoluteOutputPath: resolve(__dirname, "./generated/v2.0"),
  }),
  ...createSchemaInfos({
    absolutePathToSchemas: resolve(__dirname, "./schemas/v3.0"),
    absoluteOutputPath: resolve(__dirname, "./generated/v3.0"),
  }),
];
