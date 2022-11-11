const { generateApi } = require("../../src");

/**
 *
 * @param options {import("../../index").GenerateApiParams & { testName?: string }}
 * @returns {Promise<import("../../index").GenerateApiOutput>}
 */
const generateApiForTest = (options) => generateApi(options);

module.exports = {
  generateApiForTest: generateApiForTest,
};
