const { generateApi } = require("../../src");
const dotenv = require("dotenv");

dotenv.config();

/**
 *
 * @param options {import("../../index").GenerateApiParams & { testName?: string }}
 * @returns {Promise<import("../../index").GenerateApiOutput>}
 */
const generateApiForTest = (options) =>
  generateApi({
    ...options,
    silent: !process.env.TEST_WITH_DEBUG,
    debug: process.env.TEST_WITH_DEBUG,
    debugExtras: options.debugExtras || ["spec", options.testName],
  });

module.exports = {
  generateApiForTest: generateApiForTest,
};
