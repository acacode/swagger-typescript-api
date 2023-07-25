/* eslint-disable no-unused-vars */
const { SCHEMA_TYPES } = require('../constants.js');
const _ = require('lodash');
const { SchemaFormatters } = require('./schema-formatters');
const { SchemaUtils } = require('./schema-utils');
const {
  DiscriminatorSchemaParser,
} = require('./base-schema-parsers/discriminator');
const { EnumSchemaParser } = require('./base-schema-parsers/enum');
const { ObjectSchemaParser } = require('./base-schema-parsers/object');
const { PrimitiveSchemaParser } = require('./base-schema-parsers/primitive');
const { ComplexSchemaParser } = require('./base-schema-parsers/complex');
const { OneOfSchemaParser } = require('./complex-schema-parsers/one-of');
const { AllOfSchemaParser } = require('./complex-schema-parsers/all-of');
const { AnyOfSchemaParser } = require('./complex-schema-parsers/any-of');
const { NotSchemaParser } = require('./complex-schema-parsers/not');
const { ArraySchemaParser } = require('./base-schema-parsers/array');
const { sortByProperty } = require('../util/sort-by-property');

class SchemaParser {
  /** @type {SchemaParserFabric} */
  schemaParserFabric;
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
  /** @type {SchemaUtils} */
  schemaUtils;
  /** @type {TemplatesWorker} */
  templatesWorker;
  /** @type {SchemaWalker} */
  schemaWalker;

  typeName;
  schema;
  schemaPath = [];

  constructor(schemaParserFabric, { typeName, schema, schemaPath } = {}) {
    this.schemaParserFabric = schemaParserFabric;
    this.config = schemaParserFabric.config;
    this.logger = schemaParserFabric.logger;
    this.templatesWorker = schemaParserFabric.templatesWorker;
    this.schemaComponentsMap = schemaParserFabric.schemaComponentsMap;
    this.typeNameFormatter = schemaParserFabric.typeNameFormatter;
    this.schemaWalker = schemaParserFabric.schemaWalker;
    this.schemaFormatters = schemaParserFabric.schemaFormatters;
    this.schemaUtils = schemaParserFabric.schemaUtils;

    this.typeName = typeName || null;
    this.schema = schema;
    this.schemaPath = [...(schemaPath || [])];
  }

  _complexSchemaParsers = {
    [SCHEMA_TYPES.COMPLEX_ONE_OF]: (schema) => {
      const SchemaParser =
        this.config.schemaParsers.complexOneOf || OneOfSchemaParser;
      const schemaParser = new SchemaParser(
        this,
        schema,
        null,
        this.schemaPath,
      );
      return schemaParser.parse();
    },
    [SCHEMA_TYPES.COMPLEX_ALL_OF]: (schema) => {
      const SchemaParser =
        this.config.schemaParsers.complexAllOf || AllOfSchemaParser;
      const schemaParser = new SchemaParser(
        this,
        schema,
        null,
        this.schemaPath,
      );
      return schemaParser.parse();
    },
    [SCHEMA_TYPES.COMPLEX_ANY_OF]: (schema) => {
      const SchemaParser =
        this.config.schemaParsers.complexAnyOf || AnyOfSchemaParser;
      const schemaParser = new SchemaParser(
        this,
        schema,
        null,
        this.schemaPath,
      );
      return schemaParser.parse();
    },
    [SCHEMA_TYPES.COMPLEX_NOT]: (schema) => {
      const SchemaParser =
        this.config.schemaParsers.complexNot || NotSchemaParser;
      const schemaParser = new SchemaParser(
        this,
        schema,
        null,
        this.schemaPath,
      );
      return schemaParser.parse();
    },
  };

  _baseSchemaParsers = {
    [SCHEMA_TYPES.ENUM]: (schema, typeName) => {
      const SchemaParser = this.config.schemaParsers.enum || EnumSchemaParser;
      const schemaParser = new SchemaParser(
        this,
        schema,
        typeName,
        this.schemaPath,
      );
      return schemaParser.parse();
    },
    [SCHEMA_TYPES.OBJECT]: (schema, typeName) => {
      const SchemaParser =
        this.config.schemaParsers.object || ObjectSchemaParser;
      const schemaParser = new SchemaParser(
        this,
        schema,
        typeName,
        this.schemaPath,
      );
      return schemaParser.parse();
    },
    [SCHEMA_TYPES.COMPLEX]: (schema, typeName) => {
      const SchemaParser =
        this.config.schemaParsers.complex || ComplexSchemaParser;
      const schemaParser = new SchemaParser(
        this,
        schema,
        typeName,
        this.schemaPath,
      );
      return schemaParser.parse();
    },
    [SCHEMA_TYPES.PRIMITIVE]: (schema, typeName) => {
      const SchemaParser =
        this.config.schemaParsers.primitive || PrimitiveSchemaParser;
      const schemaParser = new SchemaParser(
        this,
        schema,
        typeName,
        this.schemaPath,
      );
      return schemaParser.parse();
    },
    [SCHEMA_TYPES.DISCRIMINATOR]: (schema, typeName) => {
      const SchemaParser =
        this.config.schemaParsers.discriminator || DiscriminatorSchemaParser;
      const schemaParser = new SchemaParser(
        this,
        schema,
        typeName,
        this.schemaPath,
      );
      return schemaParser.parse();
    },
    [SCHEMA_TYPES.ARRAY]: (schema, typeName) => {
      const SchemaParser = this.config.schemaParsers.array || ArraySchemaParser;
      const schemaParser = new SchemaParser(
        this,
        schema,
        typeName,
        this.schemaPath,
      );
      return schemaParser.parse();
    },
  };

  /**
   * @return {Record<string, any>}
   */
  parseSchema = () => {
    if (!this.schema)
      return this._baseSchemaParsers[SCHEMA_TYPES.PRIMITIVE](
        null,
        this.typeName,
      );

    let schemaType = null;
    let parsedSchema = null;

    if (typeof this.schema === 'string') {
      return this.schema;
    }

    if (!this.schema.$parsed) {
      if (!this.typeName && this.schemaUtils.isRefSchema(this.schema)) {
        this.typeName = this.schemaUtils.getSchemaType(this.schema);
      }

      //#region swagger schemas fixes

      // schema has items but don't have array type
      if (
        this.schema.items &&
        !Array.isArray(this.schema.items) &&
        !this.schema.type
      ) {
        this.schema.type = SCHEMA_TYPES.ARRAY;
      }
      // schema is enum with one null value
      if (
        Array.isArray(this.schema.enum) &&
        this.schema.enum.length === 1 &&
        this.schema.enum[0] == null
      ) {
        this.logger.debug('invalid enum schema', this.schema);
        this.schema = { type: this.config.Ts.Keyword.Null };
      }
      // schema is response schema
      if (
        'content' in this.schema &&
        typeof this.schema['content'] === 'object'
      ) {
        const schema = this.extractSchemaFromResponseStruct(this.schema);
        const schemaParser = this.schemaParserFabric.createSchemaParser({
          schema,
          typeName: this.typeName,
          schemaPath: this.schemaPath,
        });
        this.schema.$parsed = schemaParser.parseSchema();
        return this.schema.$parsed;
      }

      //#endregion

      schemaType = this.schemaUtils.getInternalSchemaType(this.schema);

      this.schemaPath.push(this.typeName);

      _.merge(
        this.schema,
        this.config.hooks.onPreParseSchema(
          this.schema,
          this.typeName,
          schemaType,
        ),
      );
      parsedSchema = this._baseSchemaParsers[schemaType](
        this.schema,
        this.typeName,
      );
      this.schema.$parsed =
        this.config.hooks.onParseSchema(this.schema, parsedSchema) ||
        parsedSchema;

      if (
        this.config.sortTypes &&
        Array.isArray(this.schema.$parsed?.content)
      ) {
        this.schema.$parsed.content = this.schema.$parsed.content.sort(
          sortByProperty('name'),
        );
      }
    }

    this.schemaPath.pop();

    return this.schema.$parsed;
  };

  getInlineParseContent = () => {
    const parsedSchema = this.parseSchema();
    const formattedSchema = this.schemaFormatters.formatSchema(
      parsedSchema,
      'inline',
    );
    return formattedSchema.content;
  };

  getParseContent = () => {
    const parsedSchema = this.parseSchema();
    const formattedSchema = this.schemaFormatters.formatSchema(
      parsedSchema,
      'base',
    );
    return formattedSchema.content;
  };

  extractSchemaFromResponseStruct = (responseStruct) => {
    const { content, ...extras } = responseStruct;

    const firstResponse = _.first(_.values(content));
    const firstSchema = _.get(firstResponse, 'schema');

    if (!firstSchema) return;

    return {
      ...extras,
      ..._.omit(firstResponse, 'schema'),
      ...firstSchema,
    };
  };
}

module.exports = {
  SchemaParser,
};
