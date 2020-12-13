const Eta = require("eta");
const { getFileContent } = require("./files");
const { resolve } = require("path");

const getTemplates = (config) => {
  console.log(`✨ try to read templates from directory "${config.templates}"`);

  Eta.configure({
    views: resolve(config.templates),
  });

  const templatePaths = {
    api: resolve(config.templates, "./api.eta"),
    dataContracts: resolve(config.templates, "./data-contracts.eta"),
    httpClient: resolve(config.templates, "./http-client.eta"),
    routeTypes: resolve(config.templates, "./route-types.eta"),
  };

  const api = getFileContent(templatePaths.api);

  if (!api) {
    console.log(`❗❗❗ api template not found in ${templatePaths.api}`);
  }

  const dataContracts = getFileContent(resolve(config.templates, "./data-contracts.eta"));

  if (!dataContracts) {
    console.log(`❗❗❗ data contracts template not found in ${templatePaths.dataContracts}`);
  }

  const httpClient = getFileContent(resolve(config.templates, "./http-client.eta"));

  if (!httpClient) {
    console.log(`❗❗❗ http client template not found in ${templatePaths.httpClient}`);
  }

  const routeTypes = getFileContent(resolve(config.templates, "./route-types.eta"));

  if (!routeTypes) {
    console.log(`❗❗❗ route types template not found in ${templatePaths.routeTypes}`);
  }

  return {
    api,
    dataContracts,
    httpClient,
    routeTypes,
  };
};

const renderTemplate = (template, configuration, options) => {
  return Eta.render(template, configuration, { async: false, ...(options || {}) });
};

module.exports = {
  getTemplates,
  renderTemplate,
};
