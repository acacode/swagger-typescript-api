const _ = require("lodash");
const { getFileContent } = require("./files");
const { classNameCase } = require("./render/utils");
const { renderTemplate } = require("./templates");
const { translate: translateToJS } = require("./translators/JavaScript");
const ts = require("typescript");
const formatFileContent = require("./formatFileContent");

const getFileNameWithoutExt = (fileName) => {
  const fileNameParts = _.split(fileName, ".");

  if (fileNameParts.length > 1) {
    fileNameParts.pop();
  }

  return fileNameParts.join(".");
};

const createFileInfo = (configuration, fileName, content) => {
  const fixedFileName = getFileNameWithoutExt(fileName);

  if (configuration.translateToJavaScript) {
    const { sourceContent, declarationContent } = translateToJS(
      `${fixedFileName}${ts.Extension.Ts}`,
      content,
    );

    return {
      name: `${fixedFileName}${ts.Extension.Js}`,
      content: formatFileContent(sourceContent),
      declaration: {
        name: `${fixedFileName}${ts.Extension.Dts}`,
        content: formatFileContent(declarationContent),
      },
    };
  }

  return {
    name: `${fixedFileName}${ts.Extension.Ts}`,
    content: formatFileContent(content),
    declaration: null,
  };
};

const createMultipleFileInfos = (templatesToRender, configuration) => {
  const { routes } = configuration;
  const { fileNames, generateRouteTypes, generateClient } = configuration.config;
  const modularApiFileInfos = [];

  if (routes.$outOfModule) {
    if (generateRouteTypes) {
      const outOfModuleRouteContent = renderTemplate(templatesToRender.routeTypes, {
        ...configuration,
        route: configuration.routes.$outOfModule,
      });

      modularApiFileInfos.push(
        createFileInfo(configuration, fileNames.outOfModuleApi, outOfModuleRouteContent),
      );
    }
    if (generateClient) {
      const outOfModuleApiContent = renderTemplate(templatesToRender.api, {
        ...configuration,
        route: configuration.routes.$outOfModule,
      });

      modularApiFileInfos.push(
        createFileInfo(configuration, fileNames.outOfModuleApi, outOfModuleApiContent),
      );
    }
  }

  if (routes.combined) {
    modularApiFileInfos.push(
      ..._.reduce(
        routes.combined,
        (apiFileInfos, route) => {
          if (generateRouteTypes) {
            const routeModuleContent = renderTemplate(templatesToRender.routeTypes, {
              ...configuration,
              route,
            });

            apiFileInfos.push(
              createFileInfo(
                configuration,
                classNameCase(`${route.moduleName}_Route`),
                routeModuleContent,
              ),
            );
          }

          if (generateClient) {
            const apiModuleContent = renderTemplate(templatesToRender.api, {
              ...configuration,
              route,
            });

            apiFileInfos.push(
              createFileInfo(configuration, classNameCase(route.moduleName), apiModuleContent),
            );
          }

          return apiFileInfos;
        },
        [],
      ),
    );
  }

  return [
    createFileInfo(
      configuration,
      fileNames.dataContracts,
      renderTemplate(templatesToRender.dataContracts, configuration),
    ),
    generateClient &&
      createFileInfo(
        configuration,
        fileNames.httpClient,
        renderTemplate(templatesToRender.httpClient, configuration),
      ),
    ...modularApiFileInfos,
  ];
};

const createSingleFileInfo = (templatesToRender, configuration) => {
  const { generateRouteTypes, generateClient } = configuration.config;

  return [
    createFileInfo(
      configuration,
      configuration.fileName,
      _.compact([
        renderTemplate(templatesToRender.dataContracts, configuration),
        generateRouteTypes && renderTemplate(templatesToRender.routeTypes, configuration),
        generateClient && renderTemplate(templatesToRender.httpClient, configuration),
        generateClient && renderTemplate(templatesToRender.api, configuration),
      ]).join("\n"),
    ),
  ];
};

const createExtraFileInfos = (configuration) => {
  return _.map(configuration.extraTemplates, (extraTemplate) => {
    return createFileInfo(
      configuration,
      extraTemplate.name,
      renderTemplate(getFileContent(extraTemplate.path), configuration),
    );
  });
};

module.exports = {
  generateOutputFiles: ({ modular, templatesToRender, configuration }) => {
    const output = modular
      ? createMultipleFileInfos(templatesToRender, configuration)
      : createSingleFileInfo(templatesToRender, configuration);

    if (!_.isEmpty(configuration.extraTemplates)) {
      output.push(...createExtraFileInfos(configuration));
    }

    return output.filter((fileInfo) => !!fileInfo && !!fileInfo.content);
  },
};
