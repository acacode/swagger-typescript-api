const { SCHEMA_TYPES } = require("../constants.js");
const _ = require("lodash");
const { SchemaFormatters } = require("./schema-formatters");
const { internalCase } = require("../util/internal-case");
const { SchemaUtils } = require("./schema-utils");
const { camelCase } = require("lodash");
const { pascalCase } = require("../util/pascal-case");
const { SchemaParser } = require("./schema-parser");

class SchemaProcessor {
  /**
   * @type {CodeGenConfig}
   */
  config;

  /**
   * @type {SchemaComponentsMap}
   */
  schemaComponentsMap;
  /**
   * @type {TypeNameFormatter}
   */
  typeNameFormatter;
  /**
   * @type {SchemaFormatters}
   */
  schemaFormatters;

  /**
   * @type {SchemaUtils}
   */
  schemaUtils;

  /**
   * @type {((schema, typeName) => SchemaParser)}
   */
  createSchemaParser;

  constructor(config, logger, templates, schemaComponentsMap, typeNameFormatter) {
    this.config = config;
    this.schemaComponentsMap = schemaComponentsMap;
    this.typeNameFormatter = typeNameFormatter;
    this.schemaFormatters = new SchemaFormatters(config, logger, this, templates);
    this.schemaUtils = new SchemaUtils(config, schemaComponentsMap, typeNameFormatter);
    this.createSchemaParser = SchemaParser.create.bind(
      null,
      config,
      schemaComponentsMap,
      typeNameFormatter,
      this.schemaFormatters,
      this.schemaUtils,
    );
  }

  /**
   *
   * @param schema {any}
   * @param typeName {null | string}
   * @return {Promise<Record<string, any>>}
   */
  parseSchema = async (schema, typeName = null, schemaPath = []) => {
    const schemaParser = this.createSchemaParser(schema, typeName, schemaPath);
    return await schemaParser.parse();
  };

  getInlineParseContent = async (schema, typeName, schemaPath) => {
    const parser = this.createSchemaParser(schema, typeName, schemaPath);
    return await parser.getInlineContent();
  };

  getParseContent = async (schema, typeName, schemaPath) => {
    const parser = this.createSchemaParser(schema, typeName, schemaPath);
    return await parser.getContent();
  };
}

module.exports = {
  SchemaProcessor,
};
