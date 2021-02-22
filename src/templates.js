const _ = require("lodash");
const Eta = require("eta");
const { getFileContent, pathIsExist } = require("./files");
const { resolve } = require("path");

const getTemplates = ({ templates, modular }) => {
  const originalTemplatesPath = resolve(
    __dirname,
    modular ? "../templates/modular" : "../templates/default",
  );
  const customTemplatesPath = templates ? resolve(process.cwd(), templates) : originalTemplatesPath;

  console.log(`✨ try to read templates from directory "${customTemplatesPath}"`);

  Eta.configure({
    views: customTemplatesPath,
  });

  const templatePaths = {
    api: "./api.eta",
    dataContracts: "./data-contracts.eta",
    httpClient: "./http-client.eta",
    routeTypes: "./route-types.eta",
    routeName: "./route-name.eta",
  };

  const templatesMap = _.reduce(
    templatePaths,
    (acc, pathToTemplate, key) => {
      const customFullPath = resolve(customTemplatesPath, pathToTemplate)
      let fileContent = pathIsExist(customFullPath) && getFileContent(customFullPath);

      if (!fileContent) {
        console.log(
          `❗❗❗ ${_.lowerCase(key)} template not found in ${pathToTemplate}\n` +
            `Code generator will use the default template`,
        );
        fileContent = getFileContent(resolve(originalTemplatesPath, pathToTemplate));
      }

      acc[key] = fileContent;

      return acc;
    },
    {},
  );

  return templatesMap;
};

const renderTemplate = (template, configuration, options) => {
  if (!template) return "";

  return Eta.render(template, configuration, { async: false, ...(options || {}) });
};

module.exports = {
  getTemplates,
  renderTemplate,
};
