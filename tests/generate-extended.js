const _ = require("lodash");
const { resolve } = require("path");
const dotenv = require("dotenv");
const allSchemas = require("./allSchemas");
const { generateApiForTest } = require("./helpers/generateApiForTest");

dotenv.config();

class GenerateExtendedError extends Error {
  constructor(message, outputPath, fileName) {
    super(message);

    const stackLines = _.split(this.stack, "\n");
    const realStack = stackLines.slice(1);
    const stackLineExtraSpace = (realStack[0] && realStack[0].split("at")[0]) || "";

    this.stack = [stackLines[0], `${stackLineExtraSpace}at ${resolve(outputPath, fileName)}`, ...realStack].join("\n");
  }
}

allSchemas.forEach(async ({ absolutePath, apiFileName, outputPath }) => {
  const name = apiFileName;
  const input = absolutePath;
  const output = outputPath;

  await generateApiForTest({
    name: name,
    input: input,
    output: output,
    generateClient: true,
    generateRouteTypes: false,
    silent: !process.env.TEST_WITH_DEBUG,
    debug: process.env.TEST_WITH_DEBUG,
    extractRequestBody: true,
    extractResponseBody: true,
    extractEnums: true,
    extractRequestParams: true,
    extractResponseError: true,
    typePrefix: "IMySuperPrefix",
    typeSuffix: "MySuperSuffix",
    sortTypes: true,
    debugExtras: ["generate-extended", apiFileName],
  }).then((result) => {
    result.configuration.modelTypes.forEach((modelType) => {
      if (modelType.name) {
        if (modelType.name.startsWith("IMySuperPrefixIMySuperPrefix")) {
          throw new GenerateExtendedError(
            `[${outputPath}][${apiFileName}] modelType has prefix/suffix duplicates - ${modelType.name}`,
            output,
            name,
          );
        }
        if (!modelType.name.startsWith("IMySuperPrefix")) {
          throw new GenerateExtendedError(
            `[${outputPath}][${apiFileName}] modelType has not prefix/suffix - ${modelType.name}`,
            output,
            name,
          );
        }
      }
    });
  });
});
