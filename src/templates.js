const { getFileContent } = require("./files");
const { resolve } = require("path");

const getTemplate = (config) => {
  console.log(`✨ try to read templates from directory "${config.templates}"`);
  return getFileContent(resolve(config.templates, "./index.eta"));
};

module.exports = {
  getTemplate,
};
