const { SCHEMA_TYPES } = require("../constants.js");
const _ = require("lodash");
const { SchemaFormatters } = require("./schema-formatters");
const { internalCase } = require("../util/internal-case");
const { SchemaUtils } = require("./schema-utils");
const { camelCase } = require("lodash");
const { pascalCase } = require("../util/pascal-case");
const { SchemaParser } = require("./schema-parser");

class SchemaParserFabric {
  /** @type {CodeGenConfig} */
  config;
  /** @type {Logger} */
  logger;
  /** @type {SchemaComponentsMap} */
  schemaComponentsMap;
  /** @type {TypeNameFormatter} */
  typeNameFormatter;
  /** @type {SchemaFormatters} */
  schemaFormatters;
  /** @type {TemplatesWorker} */
  templatesWorker;
  /** @type {SchemaUtils} */
  schemaUtils;
  /** @type {SchemaWalker} */
  schemaWalker;

  constructor({ config, logger, templatesWorker, schemaComponentsMap, typeNameFormatter, schemaWalker }) {
    this.config = config;
    this.logger = logger;
    this.schemaComponentsMap = schemaComponentsMap;
    this.typeNameFormatter = typeNameFormatter;
    this.templatesWorker = templatesWorker;
    this.schemaWalker = schemaWalker;
    this.schemaUtils = new SchemaUtils(this);
    this.schemaFormatters = new SchemaFormatters(this);
  }

  createSchemaParser = ({ schema, typeName, schemaPath }) => {
    return new SchemaParser(this, { schema, typeName, schemaPath });
  };

  /**
   *
   * @param content schema content
   * @param linkedSchema link content to attached schema
   * @param linkedComponent link content and other schema props to attached component
   * @param schemaPath
   * @param otherSchemaProps
   * @returns {{}}
   */
  createSchema = ({ content, linkedSchema = {}, linkedComponent, schemaPath, ...otherSchemaProps }) => {
    const parser = this.createSchemaParser({
      schema: linkedComponent || linkedSchema,
      schemaPath,
    });
    const parsed = parser.parseSchema();
    parsed.content = content;
    Object.assign(parsed, otherSchemaProps);
    if (linkedComponent) {
      linkedComponent.typeData = parsed;
    }
    return parser.schema;
  };

  createParsedComponent = ({ typeName, schema, schemaPath }) => {
    const schemaCopy = _.cloneDeep(schema);
    const customComponent = this.schemaComponentsMap.createComponent(
      this.schemaComponentsMap.createRef(["components", "schemas", typeName]),
      schemaCopy,
    );
    const parsed = this.parseSchema(schemaCopy, null, schemaPath);
    parsed.name = typeName;
    customComponent.typeData = parsed;

    return customComponent;
  };

  /**
   *
   * @param schema {any}
   * @param typeName {null | string}
   * @param [schemaPath] {string[]}
   * @return {Record<string, any>}
   */
  parseSchema = (schema, typeName = null, schemaPath = []) => {
    const schemaParser = this.createSchemaParser({ schema, typeName, schemaPath });
    return schemaParser.parseSchema();
  };

  /**
   *
   * @param schema {any}
   * @param typeName {null | string}
   * @param [schemaPath] {string[]}
   * @return {Record<string, any>}
   */
  getInlineParseContent = (schema, typeName, schemaPath) => {
    const parser = this.createSchemaParser({ schema, typeName, schemaPath });
    return parser.getInlineParseContent();
  };

  /**
   *
   * @param schema {any}
   * @param typeName {null | string}
   * @param [schemaPath] {string[]}
   * @return {Record<string, any>}
   */
  getParseContent = (schema, typeName, schemaPath) => {
    const parser = this.createSchemaParser({ schema, typeName, schemaPath });
    return parser.getParseContent();
  };
}

module.exports = {
  SchemaParserFabric,
};
