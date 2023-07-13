const allSchemas = require("./allSchemas");
const dotenv = require("dotenv");
const { generateApiForTest } = require("./helpers/generateApiForTest");

dotenv.config();

allSchemas.forEach(({ absolutePath, apiFileName, outputPath }) => {
  generateApiForTest({
    testName: "generate script",
    name: apiFileName,
    input: absolutePath,
    output: outputPath,
    generateClient: true,
    generateRouteTypes: false,
    silent: !process.env.TEST_WITH_DEBUG,
    debug: process.env.TEST_WITH_DEBUG,
    sortTypes: true,
    debugExtras: ["generate", apiFileName],
  });
});
