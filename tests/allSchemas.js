const { resolve } = require("path");
const dotenv = require("dotenv");
const createSchemaInfos = require("./helpers/createSchemaInfos");

dotenv.config();

const allSchemas = [
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
}

module.exports = process.env.TEST_FILE_NAME
  ? allSchemas.filter((schema) => schema.apiFileName === process.env.TEST_FILE_NAME)
  : allSchemas;
