const { generateApi } = require("../../src");

/**
 *
 * @param {import("../../index").GenerateApiParams & { testName?: string }} options
 * @returns {Promise<import("../../index").GenerateApiOutput>}
 */
const generateApiForTest = (options) => generateApi(options);

module.exports = {
  generateApiForTest: generateApiForTest,
};
