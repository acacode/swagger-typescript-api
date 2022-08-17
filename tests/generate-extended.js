const _ = require("lodash");
const { resolve } = require("path");
const allSchemas = require("./allSchemas");
const { generateApiForTest } = require("./helpers/generateApiForTest");

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
    silent: true,
    extractRequestBody: true,
    extractRequestParams: true,
    typePrefix: "IMySuperPrefix",
    typeSuffix: "MySuperSuffix",
    sortTypes: true,
  }).then((result) => {
    result.configuration.modelTypes.forEach((modelType) => {
      if (modelType.name) {
        if (modelType.name.startsWith("IMySuperPrefixIMySuperPrefix")) {
          throw new GenerateExtendedError(`modelType has prefix/suffix duplicates - ${modelType.name}`, output, name);
        }
        if (!modelType.name.startsWith("IMySuperPrefix")) {
          throw new GenerateExtendedError(`modelType has not prefix/suffix - ${modelType.name}`, output, name);
        }
      }
    });
  });
});
