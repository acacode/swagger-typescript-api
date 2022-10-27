const allSchemas = require("./allSchemas");
const { generateApiForTest } = require("./helpers/generateApiForTest");

allSchemas.forEach(({ absolutePath, apiFileName, outputPath }) => {
  generateApiForTest({
    testName: "generate script",
    name: apiFileName,
    input: absolutePath,
    output: outputPath,
    generateClient: true,
    generateRouteTypes: false,
    silent: true,
    sortTypes: true,
  });
});
