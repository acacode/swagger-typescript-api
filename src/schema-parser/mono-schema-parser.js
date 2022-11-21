const _ = require("lodash");

class MonoSchemaParser {
  schema;
  typeName;
  schemaPath;

  /** @type {Logger} */
  logger;
  /** @type {SchemaParser} */
  schemaParser;
  /** @type {SchemaParserFabric} */
  schemaParserFabric;
  /** @type {TypeNameFormatter} */
  typeNameFormatter;
  /** @type {SchemaComponentsMap} */
  schemaComponentsMap;
  /** @type {SchemaUtils} */
  schemaUtils;
  /** @type {CodeGenConfig} */
  config;
  /** @type {SchemaFormatters} */
  schemaFormatters;

  constructor(schemaParser, schema, typeName = null, schemaPath = []) {
    this.schemaParser = schemaParser;
    this.schemaParserFabric = schemaParser.schemaParserFabric;
    this.logger = schemaParser.logger;
    this.schema = schema;
    this.typeName = typeName;
    this.typeNameFormatter = schemaParser.typeNameFormatter;
    this.schemaPath = schemaPath;
    this.schemaComponentsMap = this.schemaParser.schemaComponentsMap;
    this.schemaUtils = this.schemaParser.schemaUtils;
    this.config = this.schemaParser.config;
    this.schemaFormatters = this.schemaParser.schemaFormatters;
  }

  parse() {
    throw new Error("not implemented");
  }

  buildTypeNameFromPath = () => {
    return this.schemaUtils.buildTypeNameFromPath(this.schemaPath);
  };
}

module.exports = {
  MonoSchemaParser,
};
