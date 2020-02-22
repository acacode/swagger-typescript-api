const fs = require("fs");
const path = require("path");

module.exports = ({
  absolutePathToSchemas,
  absoluteOutputPath,
}) => {
  return (fs.readdirSync(absolutePathToSchemas) || [])
    .reduce((schemas, fileName) => {

      if (
        fileName.endsWith('.yaml') ||
        fileName.endsWith('.json') ||
        fileName.endsWith('.yml')
      ) {
        schemas.push({
          absolutePath: path.resolve(absolutePathToSchemas, fileName),
          schemaFileName: fileName,
          apiFileName: fileName.replace(/.(yaml|json|yml)/g, '.ts'),
          outputPath: absoluteOutputPath
        }) 
      }

      return schemas;
    }, [])
}
