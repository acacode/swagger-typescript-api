const { SwaggerSchemaResolver } = require("./swagger-schema-resolver.js");
const { SchemaComponentsMap } = require("./schema-components-map.js");
const { NameResolver } = require("./util/name-resolver");
const { Logger } = require("./util/logger.js");
const { TypeName } = require("./type-name.js");
const _ = require("lodash");
const { SchemaParser } = require("./schema-parser/schema-parser.js");
const { SchemaRoutes } = require("./schema-parser/schema-routes.js");
const { CodeGenConfig } = require("./configuration.js");
const { FileSystem } = require("./util/file-system");
const { Templates } = require("./templates");
const { translate: translateToJS } = require("./translators/JavaScript");
const ts = require("typescript");
const { CodeFormatter } = require("./code-formatter");
const { pascalCase } = require("./util/pascal-case");
const { internalCase } = require("./util/internal-case");

class CodeGenProcess {
  /**
   * @type {CodeGenConfig}
   */
  config;
  /**
   * @type {SwaggerSchemaResolver}
   */
  swaggerSchemaResolver;
  /**
   * @type {SchemaComponentsMap}
   */
  schemaComponentMap;
  /**
   * @type {Logger}
   */
  logger;
  /**
   * @type {TypeName}
   */
  typeName;
  /**
   * @type {SchemaParser}
   */
  schemaParser;
  /**
   * @type {SchemaRoutes}
   */
  schemaRoutes;
  /**
   * @type {FileSystem}
   */
  fileSystem;
  /**
   * @type {CodeFormatter}
   */
  codeFormatter;

  /**
   *
   * @param config {Partial<import("../index.d.ts").GenerateApiConfiguration['config']>}
   */
  constructor(config) {
    this.config = new CodeGenConfig(config);
    this.logger = new Logger(this.config);
    this.fileSystem = new FileSystem();
    this.swaggerSchemaResolver = new SwaggerSchemaResolver(this.config, this.logger, this.fileSystem);
    this.schemaComponentMap = new SchemaComponentsMap(this.config);
    this.typeName = new TypeName(this.config, this.logger);
    this.templates = new Templates(this.config, this.logger, this.fileSystem, this.getRenderTemplateData);
    this.codeFormatter = new CodeFormatter(this.config);
    this.schemaParser = new SchemaParser(
      this.config,
      this.logger,
      this.templates,
      this.schemaComponentMap,
      this.typeName,
    );
    this.schemaRoutes = new SchemaRoutes(
      this.config,
      this.schemaParser,
      this.schemaComponentMap,
      this.logger,
      this.templates,
      this.typeName,
    );
    this.config.componentTypeNameResolver.logger = this.logger;
  }

  async start() {
    this.config.update({ templatePaths: this.templates.getTemplatePaths(this.config) });
    this.config.update({ templatesToRender: this.templates.getTemplates(this.config) });

    const swagger = await this.swaggerSchemaResolver.create();

    this.swaggerSchemaResolver.fixSwaggerSchema(swagger);

    this.config.update({
      swaggerSchema: swagger.usageSchema,
      originalSchema: swagger.originalSchema,
    });

    this.logger.event("start generating your typescript api");

    this.config.update(this.config.hooks.onInit(this.config) || this.config);

    this.schemaComponentMap.processSchema(swagger.usageSchema);

    const componentSchemaNames = this.schemaComponentMap.filter("schemas").map((c) => c.typeName);

    this.config.componentTypeNameResolver.reserve(componentSchemaNames);

    const parsedSchemas = _.map(_.get(swagger.usageSchema.components, "schemas"), (schema, typeName) =>
      this.schemaParser.parseSchema(schema, typeName),
    );

    this.schemaRoutes.attachSchema({
      usageSchema: swagger.usageSchema,
      parsedSchemas,
    });

    const usageComponentSchemas = this.schemaComponentMap.filter("schemas");
    const sortByProperty = (propertyName) => (o1, o2) => {
      if (o1[propertyName] > o2[propertyName]) {
        return 1;
      }
      if (o1[propertyName] < o2[propertyName]) {
        return -1;
      }
      return 0;
    };

    const sortSchemas = (schemas) => {
      if (this.config.sortTypes) {
        return schemas.sort(sortByProperty("typeName")).map((schema) => {
          if (schema.rawTypeData?.properties) {
            return {
              ...schema,
              rawTypeData: {
                ...schema.rawTypeData,
                $parsed: schema.rawTypeData["$parsed"] && {
                  ...schema.rawTypeData["$parsed"],
                  content: Array.isArray(schema.rawTypeData["$parsed"].content)
                    ? schema.rawTypeData["$parsed"].content.sort(sortByProperty("name"))
                    : schema.rawTypeData["$parsed"].content,
                },
              },
            };
          }
          return schema;
        });
      }
      return schemas;
    };

    const rawConfiguration = {
      apiConfig: this.createApiConfig(swagger.usageSchema),
      config: this.config,
      modelTypes: _.map(sortSchemas(usageComponentSchemas), this.prepareModelType).filter(Boolean),
      rawModelTypes: usageComponentSchemas,
      hasSecurityRoutes: this.schemaRoutes.hasSecurityRoutes,
      hasQueryRoutes: this.schemaRoutes.hasQueryRoutes,
      hasFormDataRoutes: this.schemaRoutes.hasFormDataRoutes,
      generateResponses: this.config.generateResponses,
      routes: this.schemaRoutes.getGroupedRoutes(),
      extraTemplates: this.config.extraTemplates,
      fileName: this.config.fileName,
      translateToJavaScript: this.config.toJS,
      utils: this.getRenderTemplateData().utils,
    };

    const configuration = this.config.hooks.onPrepareConfig(rawConfiguration) || rawConfiguration;

    if (this.fileSystem.pathIsExist(this.config.output)) {
      if (this.config.cleanOutput) {
        this.logger.debug(`cleaning dir ${this.config.output}`);
        this.fileSystem.cleanDir(this.config.output);
      }
    } else {
      this.logger.debug(`path ${this.config.output} is not exist. creating dir by this path`);
      this.fileSystem.createDir(this.config.output);
    }

    const files = this.generateOutputFiles({
      configuration: configuration,
    });

    const isDirPath = this.fileSystem.pathIsDir(this.config.output);

    const generatedFiles = files.map((file) => {
      if (!isDirPath) return file;

      if (this.config.toJS) {
        this.fileSystem.createFile({
          path: this.config.output,
          fileName: file.name,
          content: file.content,
          withPrefix: true,
        });
        this.fileSystem.createFile({
          path: this.config.output,
          fileName: file.declaration.name,
          content: file.declaration.content,
          withPrefix: true,
        });
        this.logger.success(`javascript api file`, file.name, `created in ${this.config.output}`);
      } else {
        this.fileSystem.createFile({
          path: this.config.output,
          fileName: file.name,
          content: file.content,
          withPrefix: true,
        });
        this.logger.success(`typescript api file`, file.name, `created in ${this.config.output}`);
      }

      return file;
    });

    return {
      files: generatedFiles,
      configuration,
      getTemplate: this.templates.getTemplate,
      renderTemplate: this.templates.renderTemplate,
      createFile: this.fileSystem.createFile,
      formatTSContent: this.codeFormatter.formatCode,
    };
  }

  getRenderTemplateData = () => {
    return {
      utils: {
        Ts: this.config.Ts,
        formatDescription: this.schemaParser.schemaFormatters.formatDescription,
        internalCase: internalCase,
        classNameCase: pascalCase,
        pascalCase: pascalCase,
        getInlineParseContent: this.schemaParser.getInlineParseContent,
        getParseContent: this.schemaParser.getParseContent,
        getComponentByRef: this.schemaComponentMap.get,
        parseSchema: this.schemaParser.parseSchema,
        checkAndAddNull: this.schemaParser.schemaUtils.safeAddNullToType,
        safeAddNullToType: this.schemaParser.schemaUtils.safeAddNullToType,
        isNeedToAddNull: this.schemaParser.schemaUtils.isNullMissingInType,
        inlineExtraFormatters: this.schemaParser.schemaFormatters.inline,
        formatters: this.schemaParser.schemaFormatters.base,
        formatModelName: this.typeName.format,
        fmtToJSDocLine: function fmtToJSDocLine(line, { eol = true }) {
          return ` * ${line}${eol ? "\n" : ""}`;
        },
        NameResolver: NameResolver,
        _,
        require: this.templates.requireFnFromTemplate,
      },
      config: this.config,
    };
  };

  prepareModelType = (typeInfo) => {
    if (!typeInfo.typeData) {
      typeInfo.typeData = this.schemaParser.parseSchema(typeInfo.rawTypeData, typeInfo.typeName);
    }
    const rawTypeData = typeInfo.typeData;
    const typeData = this.schemaParser.schemaFormatters.base[rawTypeData.type]
      ? this.schemaParser.schemaFormatters.base[rawTypeData.type](rawTypeData)
      : rawTypeData;
    let { typeIdentifier, name: originalName, content, description } = typeData;
    const name = this.typeName.format(originalName);

    if (name === null) return null;

    return {
      ...typeData,
      typeIdentifier,
      name,
      description,
      $content: rawTypeData.content,
      rawContent: rawTypeData.content,
      content: content,
      typeData,
    };
  };

  generateOutputFiles = ({ configuration }) => {
    const { modular, templatesToRender } = this.config;

    const output = modular
      ? this.createMultipleFileInfos(templatesToRender, configuration)
      : this.createSingleFileInfo(templatesToRender, configuration);

    if (!_.isEmpty(configuration.extraTemplates)) {
      output.push(
        ..._.map(configuration.extraTemplates, (extraTemplate) => {
          return this.createOutputFileInfo(
            configuration,
            extraTemplate.name,
            this.templates.renderTemplate(this.fileSystem.getFileContent(extraTemplate.path), configuration),
          );
        }),
      );
    }

    return output.filter((fileInfo) => !!fileInfo && !!fileInfo.content);
  };

  createMultipleFileInfos = (templatesToRender, configuration) => {
    const { routes } = configuration;
    const { fileNames, generateRouteTypes, generateClient } = configuration.config;
    const modularApiFileInfos = [];

    if (routes.$outOfModule) {
      if (generateRouteTypes) {
        const outOfModuleRouteContent = this.templates.renderTemplate(templatesToRender.routeTypes, {
          ...configuration,
          route: configuration.routes.$outOfModule,
        });

        modularApiFileInfos.push(
          this.createOutputFileInfo(configuration, fileNames.outOfModuleApi, outOfModuleRouteContent),
        );
      }
      if (generateClient) {
        const outOfModuleApiContent = this.templates.renderTemplate(templatesToRender.api, {
          ...configuration,
          route: configuration.routes.$outOfModule,
        });

        modularApiFileInfos.push(
          this.createOutputFileInfo(configuration, fileNames.outOfModuleApi, outOfModuleApiContent),
        );
      }
    }

    if (routes.combined) {
      modularApiFileInfos.push(
        ..._.reduce(
          routes.combined,
          (apiFileInfos, route) => {
            if (generateRouteTypes) {
              const routeModuleContent = this.templates.renderTemplate(templatesToRender.routeTypes, {
                ...configuration,
                route,
              });

              apiFileInfos.push(
                this.createOutputFileInfo(configuration, pascalCase(`${route.moduleName}_Route`), routeModuleContent),
              );
            }

            if (generateClient) {
              const apiModuleContent = this.templates.renderTemplate(templatesToRender.api, {
                ...configuration,
                route,
              });

              apiFileInfos.push(
                this.createOutputFileInfo(configuration, pascalCase(route.moduleName), apiModuleContent),
              );
            }

            return apiFileInfos;
          },
          [],
        ),
      );
    }

    return [
      this.createOutputFileInfo(
        configuration,
        fileNames.dataContracts,
        this.templates.renderTemplate(templatesToRender.dataContracts, configuration),
      ),
      generateClient &&
        this.createOutputFileInfo(
          configuration,
          fileNames.httpClient,
          this.templates.renderTemplate(templatesToRender.httpClient, configuration),
        ),
      ...modularApiFileInfos,
    ];
  };

  createSingleFileInfo = (templatesToRender, configuration) => {
    const { generateRouteTypes, generateClient } = configuration.config;

    return [
      this.createOutputFileInfo(
        configuration,
        configuration.fileName,
        _.compact([
          this.templates.renderTemplate(templatesToRender.dataContracts, configuration),
          generateRouteTypes && this.templates.renderTemplate(templatesToRender.routeTypes, configuration),
          generateClient && this.templates.renderTemplate(templatesToRender.httpClient, configuration),
          generateClient && this.templates.renderTemplate(templatesToRender.api, configuration),
        ]).join("\n"),
      ),
    ];
  };

  createOutputFileInfo = (configuration, fileName, content) => {
    const fixedFileName = this.fileSystem.cropExtension(fileName);

    if (configuration.translateToJavaScript) {
      const { sourceContent, declarationContent } = translateToJS(`${fixedFileName}${ts.Extension.Ts}`, content);

      this.logger.debug("generating output for", `${fixedFileName}${ts.Extension.Js}`);
      this.logger.debug(sourceContent);

      this.logger.debug("generating output for", `${fixedFileName}${ts.Extension.Js}`);
      this.logger.debug(declarationContent);

      return {
        name: `${fixedFileName}${ts.Extension.Js}`,
        content: this.codeFormatter.formatCode(sourceContent),
        declaration: {
          name: `${fixedFileName}${ts.Extension.Dts}`,
          content: this.codeFormatter.formatCode(declarationContent),
        },
      };
    }

    this.logger.debug("generating output for", `${fixedFileName}${ts.Extension.Js}`);
    this.logger.debug(content);

    return {
      name: `${fixedFileName}${ts.Extension.Ts}`,
      content: this.codeFormatter.formatCode(content),
      declaration: null,
    };
  };

  createApiConfig = (swaggerSchema) => {
    const { info, servers, host, basePath, externalDocs, tags } = swaggerSchema;
    const server = (servers && servers[0]) || { url: "" };
    const { title = "No title", version, description: schemaDescription = "" } = info || {};
    const { url: serverUrl } = server;

    return {
      info: info || {},
      servers: servers || [],
      basePath,
      host,
      externalDocs: _.merge(
        {
          url: "",
          description: "",
        },
        externalDocs,
      ),
      tags: _.compact(tags),
      baseUrl: serverUrl,
      title,
      version,
    };
  };
}

module.exports = {
  CodeGenProcess,
};
