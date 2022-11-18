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
