const _ = require("lodash");
const Eta = require("eta");
const { getFileContent, pathIsExist } = require("./files");
const { config } = require("./config");
const { resolve } = require("path");
const { logger } = require("./logger");

const TEMPLATE_EXTENSIONS = [".eta", ".ejs"];

/**
 * name - project template name,
 * fileName - template file name,
 */
const TEMPLATE_INFOS = [
  { name: "api", fileName: "api" },
  { name: "dataContracts", fileName: "data-contracts" },
  { name: "dataContractJsDoc", fileName: "data-contract-jsdoc" },
  { name: "interfaceDataContract", fileName: "interface-data-contract" },
  { name: "typeDataContract", fileName: "type-data-contract" },
  { name: "enumDataContract", fileName: "enum-data-contract" },
  { name: "objectFieldJsDoc", fileName: "object-field-jsdoc" },
  { name: "httpClient", fileName: "http-client" },
  { name: "routeTypes", fileName: "route-types" },
  { name: "routeName", fileName: "route-name" },
];

const getTemplatePaths = ({ templates, modular }) => {
  const baseTemplatesPath = resolve(__dirname, "../templates/base");
  const defaultTemplatesPath = resolve(__dirname, "../templates/default");
  const modularTemplatesPath = resolve(__dirname, "../templates/modular");
  const originalTemplatesPath = modular ? modularTemplatesPath : defaultTemplatesPath;
  const customTemplatesPath = templates ? resolve(process.cwd(), templates) : originalTemplatesPath;

  return {
    /** `templates/base` */
    base: baseTemplatesPath,
    /** `templates/default` */
    default: defaultTemplatesPath,
    /** `templates/modular` */
    modular: modularTemplatesPath,
    /** usage path if `--templates` option is not set */
    original: originalTemplatesPath,
    /** custom path to templates (`--templates`) */
    custom: customTemplatesPath,
  };
};

const cropExtension = (path) =>
  TEMPLATE_EXTENSIONS.reduce((path, ext) => (_.endsWith(path, ext) ? path.replace(ext, "") : path), path);

const getTemplateFullPath = (path, fileName) => {
  const raw = resolve(path, "./", cropExtension(fileName));
  const pathVariants = TEMPLATE_EXTENSIONS.map((extension) => `${raw}${extension}`);

  return pathVariants.find((variant) => !!pathIsExist(variant));
};

const getTemplate = ({ fileName, name, path }) => {
  const { templatePaths } = config;

  if (path) {
    return getFileContent(path);
  }

  if (!fileName) return "";

  const customFullPath = getTemplateFullPath(templatePaths.custom, fileName);
  let fileContent = customFullPath && getFileContent(customFullPath);

  if (!fileContent) {
    const baseFullPath = getTemplateFullPath(templatePaths.base, fileName);

    if (baseFullPath) {
      fileContent = getFileContent(baseFullPath);
    } else {
      logger.warn(
        `${_.lowerCase(name)} template not found in ${customFullPath}`,
        `\nCode generator will use the default template`,
      );
    }

    const originalFullPath = getTemplateFullPath(templatePaths.original, fileName);

    if (originalFullPath) {
      fileContent = getFileContent(originalFullPath);
    }
  }

  return fileContent;
};

const getTemplates = ({ templatePaths }) => {
  logger.log(`try to read templates from directory "${templatePaths.custom}"`);

  const templatesMap = _.reduce(
    TEMPLATE_INFOS,
    (acc, { fileName, name }) => ({
      ...acc,
      [name]: getTemplate({ fileName, name }),
    }),
    {},
  );

  return templatesMap;
};

const getTemplateContent = (path) => {
  const foundTemplatePathKey = _.keys(config.templatePaths).find((key) => _.startsWith(path, `@${key}`));

  const findPathWithExt = (path) => {
    const raw = cropExtension(path);
    const pathVariants = TEMPLATE_EXTENSIONS.map((extension) => `${raw}${extension}`);
    return pathVariants.find((variant) => pathIsExist(variant));
  };

  const rawPath = resolve(_.replace(path, `@${foundTemplatePathKey}`, config.templatePaths[foundTemplatePathKey]));
  const fixedPath = findPathWithExt(rawPath);

  if (fixedPath) {
    return getFileContent(fixedPath);
  }

  const customPath = findPathWithExt(resolve(config.templatePaths.custom, path));

  if (customPath) {
    return getFileContent(customPath);
  }

  const originalPath = findPathWithExt(resolve(config.templatePaths.original, path));

  if (originalPath) {
    return getFileContent(originalPath);
  }

  return "";
};

const renderTemplate = (template, configuration, options) => {
  if (!template) return "";

  return Eta.render(template, configuration, {
    async: false,
    ...(options || {}),
    includeFile: (path, payload, options) => {
      return renderTemplate(getTemplateContent(path), payload, options);
    },
  });
};

module.exports = {
  getTemplate,
  getTemplates,
  getTemplatePaths,
  renderTemplate,
};
