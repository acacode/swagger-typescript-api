const { resolve } = require("path");
const dotenv = require("dotenv");
const createSchemaInfos = require("./helpers/createSchemaInfos");

dotenv.config();

let allSchemas = [
  ...createSchemaInfos({
    absolutePathToSchemas: resolve(__dirname, "./schemas/v2.0"),
    absoluteOutputPath: resolve(__dirname, "./generated/v2.0"),
  }),
  ...createSchemaInfos({
    absolutePathToSchemas: resolve(__dirname, "./schemas/v3.0"),
    absoluteOutputPath: resolve(__dirname, "./generated/v3.0"),
  }),
];

if (process.env.TEST_FILE_NAME) {
  console.warn("TEST ONLY", process.env.TEST_FILE_NAME);
  allSchemas = allSchemas.filter((schema) => schema.apiFileName === process.env.TEST_FILE_NAME);
}

if (process.env.TEST_SCHEMA_VERSION) {
  console.warn("TEST ONLY", process.env.TEST_SCHEMA_VERSION);
  allSchemas = allSchemas.filter((schema) => schema.outputPath.endsWith(process.env.TEST_SCHEMA_VERSION));
}

module.exports = allSchemas;
