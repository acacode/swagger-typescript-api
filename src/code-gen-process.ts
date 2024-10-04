import { consola } from "consola";
import lodash from "lodash";
import * as typescript from "typescript";
import type {
  GenerateApiConfiguration,
  SchemaComponent,
} from "../types/index.js";
import { CodeFormatter } from "./code-formatter.js";
import { CodeGenConfig } from "./configuration.js";
import { SchemaComponentsMap } from "./schema-components-map.js";
import { SchemaParserFabric } from "./schema-parser/schema-parser-fabric.js";
import { SchemaRoutes } from "./schema-routes/schema-routes.js";
import { SchemaWalker } from "./schema-walker.js";
import { SwaggerSchemaResolver } from "./swagger-schema-resolver.js";
import { TemplatesWorker } from "./templates-worker.js";
import { JavascriptTranslator } from "./translators/javascript.js";
import type { TranslatorIO } from "./translators/translator.js";
import { TypeNameFormatter } from "./type-name-formatter.js";
import { FileSystem } from "./util/file-system.js";
import { internalCase } from "./util/internal-case.js";
import { NameResolver } from "./util/name-resolver.js";
import { pascalCase } from "./util/pascal-case.js";
import { sortByProperty } from "./util/sort-by-property.js";

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

export class CodeGenProcess {
  config: CodeGenConfig;
  swaggerSchemaResolver: SwaggerSchemaResolver;
  schemaComponentsMap: SchemaComponentsMap;
  typeNameFormatter: TypeNameFormatter;
  schemaParserFabric: SchemaParserFabric;
  schemaRoutes: SchemaRoutes;
  fileSystem: FileSystem;
  codeFormatter: CodeFormatter;
  templatesWorker: TemplatesWorker;
  schemaWalker: SchemaWalker;
  javascriptTranslator: JavascriptTranslator;

  constructor(config: Partial<GenerateApiConfiguration["config"]>) {
    this.config = new CodeGenConfig(config);
    this.fileSystem = new FileSystem();
    this.swaggerSchemaResolver = new SwaggerSchemaResolver(
      this.config,
      this.fileSystem,
    );
    this.schemaWalker = new SchemaWalker(
      this.config,
      this.swaggerSchemaResolver,
    );
    this.schemaComponentsMap = new SchemaComponentsMap(this.config);
    this.typeNameFormatter = new TypeNameFormatter(this.config);
    this.templatesWorker = new TemplatesWorker(
      this.config,
      this.fileSystem,
      this.getRenderTemplateData,
    );
    this.codeFormatter = new CodeFormatter(this.config);
    this.schemaParserFabric = new SchemaParserFabric(
      this.config,
      this.templatesWorker,
      this.schemaComponentsMap,
      this.typeNameFormatter,
      this.schemaWalker,
    );
    this.schemaRoutes = new SchemaRoutes(
      this.config,
      this.schemaParserFabric,
      this.schemaComponentsMap,
      this.templatesWorker,
      this.typeNameFormatter,
    );
    this.javascriptTranslator = new JavascriptTranslator(
      this.config,
      this.codeFormatter,
    );
  }

  async start() {
    this.config.update({
      templatePaths: this.templatesWorker.getTemplatePaths(this.config),
    });
    this.config.update({
      templatesToRender: this.templatesWorker.getTemplates(this.config),
    });

    const swagger = await this.swaggerSchemaResolver.create();

    this.swaggerSchemaResolver.fixSwaggerSchema(swagger);

    this.config.update({
      swaggerSchema: swagger.usageSchema,
      originalSchema: swagger.originalSchema,
    });

    this.schemaWalker.addSchema("$usage", swagger.usageSchema);
    this.schemaWalker.addSchema("$original", swagger.originalSchema);

    consola.info("start generating your typescript api");

    this.config.update(
      this.config.hooks.onInit(this.config, this) || this.config,
    );

    this.schemaComponentsMap.clear();

    lodash.each(swagger.usageSchema.components, (component, componentName) =>
      lodash.each(component, (rawTypeData, typeName) => {
        this.schemaComponentsMap.createComponent(
          this.schemaComponentsMap.createRef([
            "components",
            componentName,
            typeName,
          ]),
          rawTypeData,
        );
      }),
    );

    const componentsToParse: SchemaComponent[] =
      this.schemaComponentsMap.filter(
        lodash.compact([
          "schemas",
          this.config.extractResponses && "responses",
        ]),
      );

    const parsedSchemas = componentsToParse.map((schemaComponent) => {
      const parsed = this.schemaParserFabric.parseSchema(
        schemaComponent.rawTypeData,
        schemaComponent.typeName,
      );
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
      customTranslator: this.config.customTranslator
        ? new this.config.customTranslator()
        : null,
      utils: this.getRenderTemplateData().utils,
    };

    const configuration =
      this.config.hooks.onPrepareConfig(rawConfiguration) || rawConfiguration;

    if (this.fileSystem.pathIsExist(this.config.output)) {
      if (this.config.cleanOutput) {
        consola.debug("cleaning dir", this.config.output);
        this.fileSystem.cleanDir(this.config.output);
      }
    } else {
      consola.debug(
        `path ${this.config.output} is not exist. creating dir by this path`,
      );
      this.fileSystem.createDir(this.config.output);
    }

    const files = await this.generateOutputFiles({
      configuration: configuration,
    });

    const isDirPath = this.fileSystem.pathIsDir(this.config.output);

    if (isDirPath) {
      for (const file of files) {
        this.fileSystem.createFile({
          path: this.config.output,
          fileName: `${file.fileName}${file.fileExtension}`,
          content: file.fileContent,
          withPrefix: true,
        });

        consola.success(
          "api file",
          `"${file.fileName}${file.fileExtension}"`,
          `created in ${this.config.output}`,
        );
      }
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
        formatDescription:
          this.schemaParserFabric.schemaFormatters.formatDescription,
        internalCase: internalCase,
        classNameCase: pascalCase,
        pascalCase: pascalCase,
        getInlineParseContent: this.schemaParserFabric.getInlineParseContent,
        getParseContent: this.schemaParserFabric.getParseContent,
        getComponentByRef: this.schemaComponentsMap.get,
        parseSchema: this.schemaParserFabric.parseSchema,
        checkAndAddNull: this.schemaParserFabric.schemaUtils.safeAddNullToType,
        safeAddNullToType:
          this.schemaParserFabric.schemaUtils.safeAddNullToType,
        isNeedToAddNull:
          this.schemaParserFabric.schemaUtils.isNullMissingInType,
        inlineExtraFormatters: this.schemaParserFabric.schemaFormatters.inline,
        formatters: this.schemaParserFabric.schemaFormatters.base,
        formatModelName: this.typeNameFormatter.format,
        fmtToJSDocLine: (line: string, { eol = true }) => {
          return ` * ${line}${eol ? "\n" : ""}`;
        },
        NameResolver: NameResolver,
        _: lodash,
        require: this.templatesWorker.requireFnFromTemplate,
      },
      config: this.config,
    };
  };

  collectModelTypes = () => {
    const components = this.schemaComponentsMap.getComponents();
    let modelTypes = [];

    const modelTypeComponents = lodash.compact([
      "schemas",
      this.config.extractResponses && "responses",
    ]);

    const getSchemaComponentsCount = () =>
      this.schemaComponentsMap.filter(...modelTypeComponents).length;

    let schemaComponentsCount = getSchemaComponentsCount();
    let processedCount = 0;

    while (processedCount < schemaComponentsCount) {
      modelTypes = [];
      processedCount = 0;
      for (const component of components) {
        if (modelTypeComponents.includes(component.componentName)) {
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
      typeInfo.typeData = this.schemaParserFabric.parseSchema(
        typeInfo.rawTypeData,
        typeInfo.typeName,
      );
    }
    const rawTypeData = typeInfo.typeData;
    const typeData = this.schemaParserFabric.schemaFormatters.base[
      rawTypeData.type
    ]
      ? this.schemaParserFabric.schemaFormatters.base[rawTypeData.type](
          rawTypeData,
        )
      : rawTypeData;
    const {
      typeIdentifier,
      name: originalName,
      content,
      description,
    } = typeData;
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

  generateOutputFiles = async ({ configuration }): Promise<TranslatorIO[]> => {
    const { modular, templatesToRender } = this.config;

    const output = modular
      ? await this.createMultipleFileInfos(templatesToRender, configuration)
      : await this.createSingleFileInfo(templatesToRender, configuration);

    if (!lodash.isEmpty(configuration.extraTemplates)) {
      for (const extraTemplate of configuration.extraTemplates) {
        const content = this.templatesWorker.renderTemplate(
          this.fileSystem.getFileContent(extraTemplate.path),
          configuration,
        );
        output.push(
          ...(await this.createOutputFileInfo(
            configuration,
            extraTemplate.name,
            content,
          )),
        );
      }
    }

    return output.filter((fileInfo) => !!fileInfo && !!fileInfo.fileContent);
  };

  createMultipleFileInfos = async (
    templatesToRender,
    configuration,
  ): Promise<TranslatorIO[]> => {
    const { routes } = configuration;
    const { fileNames, generateRouteTypes, generateClient } =
      configuration.config;
    const modularApiFileInfos: TranslatorIO[] = [];

    if (routes.$outOfModule) {
      if (generateRouteTypes) {
        const outOfModuleRouteContent = this.templatesWorker.renderTemplate(
          templatesToRender.routeTypes,
          {
            ...configuration,
            route: configuration.routes.$outOfModule,
          },
        );

        modularApiFileInfos.push(
          ...(await this.createOutputFileInfo(
            configuration,
            fileNames.outOfModuleApi,
            outOfModuleRouteContent,
          )),
        );
      }
      if (generateClient) {
        const outOfModuleApiContent = this.templatesWorker.renderTemplate(
          templatesToRender.api,
          {
            ...configuration,
            route: configuration.routes.$outOfModule,
          },
        );

        modularApiFileInfos.push(
          ...(await this.createOutputFileInfo(
            configuration,
            fileNames.outOfModuleApi,
            outOfModuleApiContent,
          )),
        );
      }
    }

    if (routes.combined) {
      for (const route of routes.combined) {
        if (generateRouteTypes) {
          const routeModuleContent = this.templatesWorker.renderTemplate(
            templatesToRender.routeTypes,
            {
              ...configuration,
              route,
            },
          );

          modularApiFileInfos.push(
            ...(await this.createOutputFileInfo(
              configuration,
              pascalCase(`${route.moduleName}_Route`),
              routeModuleContent,
            )),
          );
        }

        if (generateClient) {
          const apiModuleContent = this.templatesWorker.renderTemplate(
            templatesToRender.api,
            {
              ...configuration,
              route,
            },
          );

          modularApiFileInfos.push(
            ...(await this.createOutputFileInfo(
              configuration,
              pascalCase(route.moduleName),
              apiModuleContent,
            )),
          );
        }
      }
    }

    return [
      ...(await this.createOutputFileInfo(
        configuration,
        fileNames.dataContracts,
        this.templatesWorker.renderTemplate(
          templatesToRender.dataContracts,
          configuration,
        ),
      )),
      ...(generateClient
        ? await this.createOutputFileInfo(
            configuration,
            fileNames.httpClient,
            this.templatesWorker.renderTemplate(
              templatesToRender.httpClient,
              configuration,
            ),
          )
        : []),
      ...modularApiFileInfos,
    ];
  };

  createSingleFileInfo = async (
    templatesToRender,
    configuration,
  ): Promise<TranslatorIO[]> => {
    const { generateRouteTypes, generateClient } = configuration.config;

    return await this.createOutputFileInfo(
      configuration,
      configuration.fileName,
      lodash
        .compact([
          this.templatesWorker.renderTemplate(
            templatesToRender.dataContracts,
            configuration,
          ),
          generateRouteTypes &&
            this.templatesWorker.renderTemplate(
              templatesToRender.routeTypes,
              configuration,
            ),
          generateClient &&
            this.templatesWorker.renderTemplate(
              templatesToRender.httpClient,
              configuration,
            ),
          generateClient &&
            this.templatesWorker.renderTemplate(
              templatesToRender.api,
              configuration,
            ),
        ])
        .join("\n"),
    );
  };

  createOutputFileInfo = async (
    configuration,
    fileNameFull,
    content,
  ): Promise<TranslatorIO[]> => {
    const fileName = this.fileSystem.cropExtension(fileNameFull);
    const fileExtension = typescript.Extension.Ts;

    if (configuration.translateToJavaScript) {
      consola.debug("using js translator for", fileName);
      return await this.javascriptTranslator.translate({
        fileName: fileName,
        fileExtension: fileExtension,
        fileContent: content,
      });
    }

    if (configuration.customTranslator) {
      consola.debug("using custom translator for", fileName);
      return await configuration.customTranslator.translate({
        fileName: fileName,
        fileExtension: fileExtension,
        fileContent: content,
      });
    }

    consola.debug("generating output for", `${fileName}${fileExtension}`);

    return [
      {
        fileName,
        fileExtension: fileExtension,
        fileContent: await this.codeFormatter.formatCode(content),
      },
    ];
  };

  createApiConfig = (swaggerSchema) => {
    const { info, servers, host, basePath, externalDocs, tags } = swaggerSchema;
    const server = servers?.[0] || { url: "" };
    const { title = "No title", version } = info || {};
    const { url: serverUrl } = server;

    return {
      info: info || {},
      servers: servers || [],
      basePath,
      host,
      externalDocs: lodash.merge(
        {
          url: "",
          description: "",
        },
        externalDocs,
      ),
      tags: lodash.compact(tags),
      baseUrl: serverUrl,
      title,
      version,
    };
  };

  injectClassInstance = (key, value) => {
    this[key] = value;
    for (const instanceKey of PATCHABLE_INSTANCES) {
      if (instanceKey !== key && key in this[instanceKey]) {
        this[instanceKey][key] = value;
      }
    }
  };
}
