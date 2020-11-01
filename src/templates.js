const { getFileContent } = require("./files");
const { config } = require("./config");
const { resolve } = require("path");

const getTemplate = (templateName) =>
  getFileContent(resolve(config.templates, `./${templateName}.mustache`));

const getTemplates = () => {
  console.log(`✨ try to read templates from directory "${config.templates}"`);

  return {
    dataContractsTemplate: getTemplate("data-contracts"),
    routeTypesTemplate: config.generateRouteTypes ? getTemplate("route-types") : null,
    httpClientTemplate: config.generateClient ? getTemplate("http-client") : null,
    apiTemplate: config.generateClient ? getTemplate("api") : null,
  };
};

module.exports = {
  getTemplates,
};
