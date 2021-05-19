const _ = require("lodash");
const fs = require("fs");
const path = require("path");

/**
 *
 * @param {{ absolutePathToSchemas: string; absoluteOutputPath: string }} options
 * @returns {{
 *  absolutePath: string;
 *  schemaFileName: string;
 *  apiFileName: string;
 *  outputPath: string;
 *  Exception: typeof Error;
 * }[]}
 */
const createSchemaInfos = ({ absolutePathToSchemas, absoluteOutputPath }) => {
  return (fs.readdirSync(absolutePathToSchemas) || []).reduce((schemas, fileName) => {
    if (fileName.endsWith(".yaml") || fileName.endsWith(".json") || fileName.endsWith(".yml")) {
      const apiFileName = fileName.replace(/.(yaml|json|yml)/g, ".ts");
      const outputPath = absoluteOutputPath || path.resolve(__dirname, "./");

      schemas.push({
        absolutePath: path.resolve(absolutePathToSchemas, fileName),
        schemaFileName: fileName,
        apiFileName: apiFileName,
        outputPath: outputPath,
        Exception: class TestError extends Error {
          constructor(message, ...datas) {
            super(message);

            const stackLines = _.split(this.stack, "\n");
            const realStack = stackLines.slice(1);
            const stackLineExtraSpace = (realStack[0] && realStack[0].split("at")[0]) || "";

            this.stack = [
              stackLines[0],
              `${stackLineExtraSpace}at ${path.resolve(outputPath, apiFileName)}`,
              ...realStack,
            ].join("\n");

            console.error(stackLines[0], ...datas);
            console.error(`${stackLineExtraSpace}at ${path.resolve(outputPath, apiFileName)}`);
            console.error(realStack.join("\n"));
            process.exit(1);
          }
        },
      });
    }

    return schemas;
  }, []);
};

module.exports = createSchemaInfos;
