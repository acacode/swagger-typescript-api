const fs = require("fs");
const path = require("path");

module.exports = ({
  absolutePathToSchemas,
  absoluteOutputPath,
}) => {
  return (fs.readdirSync(absolutePathToSchemas) || [])
    .reduce((schemas, fileName) => ([
      ...schemas,
      {
        absolutePath: path.resolve(absolutePathToSchemas, fileName),
        schemaFileName: fileName,
        apiFileName: fileName.replace(/.(yaml|json|yml)/g, '.ts'),
        outputPath: absoluteOutputPath
      }
    ]), [])
}
