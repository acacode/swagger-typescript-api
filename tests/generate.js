const fs = require("fs");
const path = require("path");
const { generateApi } = require('../src');

const createSchemasInfos = (pathToSchemas) =>
  (fs.readdirSync(pathToSchemas) || [])
    .reduce((schemas, fileName) => ([
      ...schemas,
      {
        absolutePath: path.resolve(pathToSchemas, fileName),
        schemaFileName: fileName,
        apiFileName: fileName.replace(/.(yaml|json|yml)/g, '.ts'),
      }
    ]), [])

const v2Schemas = createSchemasInfos(path.resolve(__dirname, "./schemas/v2.0"));
const v3Schemas = createSchemasInfos(path.resolve(__dirname, "./schemas/v3.0"));

v2Schemas.forEach(({
  absolutePath,
  apiFileName,
}) => {
  generateApi({
    name: apiFileName,
    input: absolutePath,
    output: path.resolve(__dirname, "./generated/v2.0/")
  });
})

v3Schemas.forEach(({
  absolutePath,
  apiFileName,
}) => {
  generateApi({
    name: apiFileName,
    input: absolutePath,
    output: path.resolve(__dirname, "./generated/v3.0/")
  });
})