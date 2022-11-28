const { SwaggerSchemaResolver } = require("./swagger-schema-resolver.js");
const { SchemaComponentsMap } = require("./schema-components-map.js");
const { NameResolver } = require("./util/name-resolver");
const { Logger } = require("./util/logger.js");
const { TypeNameFormatter } = require("./type-name-formatter.js");
const _ = require("lodash");
const { SchemaParserFabric } = require("./schema-parser/schema-parser-fabric");
const { SchemaRoutes } = require("./schema-routes/schema-routes.js");
const { CodeGenConfig } = require("./configuration.js");
const { SchemaWalker } = require("./schema-walker");
const { FileSystem } = require("./util/file-system");
const { TemplatesWorker } = require("./templates-worker");
const { JavascriptTranslator } = require("./translators/javascript");
const ts = require("typescript");
const { CodeFormatter } = require("./code-formatter");
const { pascalCase } = require("./util/pascal-case");
const { internalCase } = require("./util/internal-case");
const { sortByProperty } = require("./util/sort-by-property");

const PATCHABLE_INSTANCES = [
  "schemaWalker",
  "swaggerSchemaResolver",
  "schemaComponentsMap",
  "typeNameFormatter",
  "templatesWorker",
  "codeFormatter",
  "schemaParserFabric",
  "schemaRoutes",
  "javascriptTranslator",
];

class CodeGenProcess {
  /** @type {CodeGenConfig} */
  config;
  /** @type {SwaggerSchemaResolver} */
  swaggerSchemaResolver;
  /** @type {SchemaComponentsMap} */
  schemaComponentsMap;
  /** @type {Logger} */
  logger;
  /** @type {TypeNameFormatter} */
  typeNameFormatter;
  /** @type {SchemaParserFabric} */
  schemaParserFabric;
  /** @type {SchemaRoutes} */
  schemaRoutes;
  /** @type {FileSystem} */
  fileSystem;
  /** @type {CodeFormatter} */
  codeFormatter;
  /** type {TemplatesWorker} */
  templatesWorker;
  /** @type {SchemaWalker} */
  schemaWalker;
  /** @type {JavascriptTranslator} */
  javascriptTranslator;

  /**
   *
   * @param config {Partial<import("../index.d.ts").GenerateApiConfiguration['config']>}
   */
  constructor(config) {
    this.config = new CodeGenConfig(config);
    this.logger = new Logger(this);
    this.fileSystem = new FileSystem(this);
    this.schemaWalker = new SchemaWalker(this);
    this.swaggerSchemaResolver = new SwaggerSchemaResolver(this);
    this.schemaComponentsMap = new SchemaComponentsMap(this);
    this.typeNameFormatter = new TypeNameFormatter(this);
    this.templatesWorker = new TemplatesWorker(this);
    this.codeFormatter = new CodeFormatter(this);
    this.schemaParserFabric = new SchemaParserFabric(this);
    this.schemaRoutes = new SchemaRoutes(this);
    this.javascriptTranslator = new JavascriptTranslator(this);
    this.config.componentTypeNameResolver.logger = this.logger;
  }

  async start() {
    this.config.update({ templatePaths: this.templatesWorker.getTemplatePaths(this.config) });
    this.config.update({ templatesToRender: this.templatesWorker.getTemplates(this.config) });

    const swagger = await this.swaggerSchemaResolver.create();

    this.swaggerSchemaResolver.fixSwaggerSchema(swagger);

    this.config.update({
      swaggerSchema: swagger.usageSchema,
      originalSchema: swagger.originalSchema,
    });

    this.schemaWalker.addSchema("$usage", swagger.usageSchema);
    this.schemaWalker.addSchema("$original", swagger.originalSchema);

    this.logger.event("start generating your typescript api");

    this.config.update(this.config.hooks.onInit(this.config, this) || this.config);

    this.schemaComponentsMap.clear();

    _.each(swagger.usageSchema.components, (component, componentName) =>
      _.each(component, (rawTypeData, typeName) => {
        this.schemaComponentsMap.createComponent(
          this.schemaComponentsMap.createRef(["components", componentName, typeName]),
          rawTypeData,
        );
      }),
    );

    const schemaComponents = this.schemaComponentsMap.filter("schemas");

    const parsedSchemas = schemaComponents.map((schemaComponent) => {
      const parsed = this.schemaParserFabric.parseSchema(schemaComponent.rawTypeData, schemaComponent.typeName);
      schemaComponent.typeData = parsed;
      return parsed;
    });

    this.schemaRoutes.attachSchema({
      usageSchema: swagger.usageSchema,
      parsedSchemas,
    });

    const rawConfiguration = {
      apiConfig: this.createApiConfig(swagger.usageSchema),
      config: this.config,
      modelTypes: this.collectModelTypes(),
      hasSecurityRoutes: this.schemaRoutes.hasSecurityRoutes,
      hasQueryRoutes: this.schemaRoutes.hasQueryRoutes,
      hasFormDataRoutes: this.schemaRoutes.hasFormDataRoutes,
      generateResponses: this.config.generateResponses,
      routes: this.schemaRoutes.getGroupedRoutes(),
      extraTemplates: this.config.extraTemplates,
      fileName: this.config.fileName,
      translateToJavaScript: this.config.toJS,
      customTranslator: this.config.customTranslator ? new this.config.customTranslator(this) : null,
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

    if (isDirPath) {
      files.forEach((file) => {
        this.fileSystem.createFile({
          path: this.config.output,
          fileName: `${file.fileName}${file.fileExtension}`,
          content: file.fileContent,
          withPrefix: true,
        });

        this.logger.success(`api file`, `"${file.fileName}${file.fileExtension}"`, `created in ${this.config.output}`);
      });
    }

    return {
      files,
      configuration,
      getTemplate: this.templatesWorker.getTemplate,
      renderTemplate: this.templatesWorker.renderTemplate,
      createFile: this.fileSystem.createFile,
      formatTSContent: this.codeFormatter.formatCode,
    };
  }

  getRenderTemplateData = () => {
    return {
      utils: {
        Ts: this.config.Ts,
        formatDescription: this.schemaParserFabric.schemaFormatters.formatDescription,
        internalCase: internalCase,
        classNameCase: pascalCase,
        pascalCase: pascalCase,
        getInlineParseContent: this.schemaParserFabric.getInlineParseContent,
        getParseContent: this.schemaParserFabric.getParseContent,
        getComponentByRef: this.schemaComponentsMap.get,
        parseSchema: this.schemaParserFabric.parseSchema,
        checkAndAddNull: this.schemaParserFabric.schemaUtils.safeAddNullToType,
        safeAddNullToType: this.schemaParserFabric.schemaUtils.safeAddNullToType,
        isNeedToAddNull: this.schemaParserFabric.schemaUtils.isNullMissingInType,
        inlineExtraFormatters: this.schemaParserFabric.schemaFormatters.inline,
        formatters: this.schemaParserFabric.schemaFormatters.base,
        formatModelName: this.typeNameFormatter.format,
        fmtToJSDocLine: function fmtToJSDocLine(line, { eol = true }) {
          return ` * ${line}${eol ? "\n" : ""}`;
        },
        NameResolver: NameResolver,
        _,
        require: this.templatesWorker.requireFnFromTemplate,
      },
      config: this.config,
    };
  };

  collectModelTypes = () => {
    const components = this.schemaComponentsMap.getComponents();
    let modelTypes = [];

    const getSchemaComponentsCount = () => components.filter((c) => c.componentName === "schemas").length;

    let schemaComponentsCount = getSchemaComponentsCount();
    let processedCount = 0;

    while (processedCount < schemaComponentsCount) {
      modelTypes = [];
      processedCount = 0;
      for (const component of components) {
        if (component.componentName === "schemas") {
          const modelType = this.prepareModelType(component);
          if (modelType) {
            modelTypes.push(modelType);
          }
          processedCount++;
        }
      }
      schemaComponentsCount = getSchemaComponentsCount();
    }

    if (this.config.sortTypes) {
      return modelTypes.sort(sortByProperty("name"));
    }

    return modelTypes;
  };

  prepareModelType = (typeInfo) => {
    if (typeInfo.$prepared) return typeInfo.$prepared;

    if (!typeInfo.typeData) {
      typeInfo.typeData = this.schemaParserFabric.parseSchema(typeInfo.rawTypeData, typeInfo.typeName);
    }
    const rawTypeData = typeInfo.typeData;
    const typeData = this.schemaParserFabric.schemaFormatters.base[rawTypeData.type]
      ? this.schemaParserFabric.schemaFormatters.base[rawTypeData.type](rawTypeData)
      : rawTypeData;
    let { typeIdentifier, name: originalName, content, description } = typeData;
    const name = this.typeNameFormatter.format(originalName);

    if (name === null) return null;

    const preparedModelType = {
      ...typeData,
      typeIdentifier,
      name,
      description,
      $content: rawTypeData.content,
      rawContent: rawTypeData.content,
      content: content,
      typeData,
    };

    typeInfo.$prepared = preparedModelType;

    return preparedModelType;
  };

  /**
   *
   * @param configuration
   * @returns {TranslatorIO[]}
   */
  generateOutputFiles = ({ configuration }) => {
    const { modular, templatesToRender } = this.config;

    const output = modular
      ? this.createMultipleFileInfos(templatesToRender, configuration)
      : this.createSingleFileInfo(templatesToRender, configuration);

    if (!_.isEmpty(configuration.extraTemplates)) {
      for (const extraTemplate of configuration.extraTemplates) {
        const content = this.templatesWorker.renderTemplate(
          this.fileSystem.getFileContent(extraTemplate.path),
          configuration,
        );
        output.push(...this.createOutputFileInfo(configuration, extraTemplate.name, content));
      }
    }

    return output.filter((fileInfo) => !!fileInfo && !!fileInfo.fileContent);
  };

  /**
   * @param templatesToRender
   * @param configuration
   * @returns {TranslatorIO[]}
   */
  createMultipleFileInfos = (templatesToRender, configuration) => {
    const { routes } = configuration;
    const { fileNames, generateRouteTypes, generateClient } = configuration.config;
    /**
     * @type {TranslatorIO[]}
     */
    const modularApiFileInfos = [];

    if (routes.$outOfModule) {
      if (generateRouteTypes) {
        const outOfModuleRouteContent = this.templatesWorker.renderTemplate(templatesToRender.routeTypes, {
          ...configuration,
          route: configuration.routes.$outOfModule,
        });

        modularApiFileInfos.push(
          ...this.createOutputFileInfo(configuration, fileNames.outOfModuleApi, outOfModuleRouteContent),
        );
      }
      if (generateClient) {
        const outOfModuleApiContent = this.templatesWorker.renderTemplate(templatesToRender.api, {
          ...configuration,
          route: configuration.routes.$outOfModule,
        });

        modularApiFileInfos.push(
          ...this.createOutputFileInfo(configuration, fileNames.outOfModuleApi, outOfModuleApiContent),
        );
      }
    }

    if (routes.combined) {
      for (const route of routes.combined) {
        if (generateRouteTypes) {
          const routeModuleContent = this.templatesWorker.renderTemplate(templatesToRender.routeTypes, {
            ...configuration,
            route,
          });

          modularApiFileInfos.push(
            ...this.createOutputFileInfo(configuration, pascalCase(`${route.moduleName}_Route`), routeModuleContent),
          );
        }

        if (generateClient) {
          const apiModuleContent = this.templatesWorker.renderTemplate(templatesToRender.api, {
            ...configuration,
            route,
          });

          modularApiFileInfos.push(
            ...this.createOutputFileInfo(configuration, pascalCase(route.moduleName), apiModuleContent),
          );
        }
      }
    }

    return [
      ...this.createOutputFileInfo(
        configuration,
        fileNames.dataContracts,
        this.templatesWorker.renderTemplate(templatesToRender.dataContracts, configuration),
      ),
      ...(generateClient
        ? this.createOutputFileInfo(
            configuration,
            fileNames.httpClient,
            this.templatesWorker.renderTemplate(templatesToRender.httpClient, configuration),
          )
        : []),
      ...modularApiFileInfos,
    ];
  };

  /**
   *
   * @param templatesToRender
   * @param configuration
   * @returns {TranslatorIO[]}
   */
  createSingleFileInfo = (templatesToRender, configuration) => {
    const { generateRouteTypes, generateClient } = configuration.config;

    return this.createOutputFileInfo(
      configuration,
      configuration.fileName,
      _.compact([
        this.templatesWorker.renderTemplate(templatesToRender.dataContracts, configuration),
        generateRouteTypes && this.templatesWorker.renderTemplate(templatesToRender.routeTypes, configuration),
        generateClient && this.templatesWorker.renderTemplate(templatesToRender.httpClient, configuration),
        generateClient && this.templatesWorker.renderTemplate(templatesToRender.api, configuration),
      ]).join("\n"),
    );
  };

  /**
   *
   * @param configuration
   * @param fileNameFull
   * @param content
   * @returns {TranslatorIO[]}
   */
  createOutputFileInfo = (configuration, fileNameFull, content) => {
    const fileName = this.fileSystem.cropExtension(fileNameFull);
    const fileExtension = ts.Extension.Ts;

    if (configuration.translateToJavaScript) {
      this.logger.debug("using js translator for", fileName);
      return this.javascriptTranslator.translate({
        fileName: fileName,
        fileExtension: fileExtension,
        fileContent: content,
      });
    }

    if (configuration.customTranslator) {
      this.logger.debug("using custom translator for", fileName);
      return configuration.customTranslator.translate({
        fileName: fileName,
        fileExtension: fileExtension,
        fileContent: content,
      });
    }

    this.logger.debug("generating output for", `${fileName}${fileExtension}`);

    return [
      {
        fileName,
        fileExtension: fileExtension,
        fileContent: this.codeFormatter.formatCode(content),
      },
    ];
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

  injectClassInstance = (key, value) => {
    this[key] = value;
    PATCHABLE_INSTANCES.forEach((instanceKey) => {
      if (instanceKey !== key && key in this[instanceKey]) {
        this[instanceKey][key] = value;
      }
    });
  };
}

module.exports = {
  CodeGenProcess,
};
