const { SCHEMA_TYPES } = require("../constants.js");
const _ = require("lodash");
const { SchemaFormatters } = require("./schema-formatters");
const { internalCase } = require("../util/internal-case");
const { SchemaUtils } = require("./schema-utils");
const { camelCase } = require("lodash");
const { pascalCase } = require("../util/pascal-case");
const { DiscriminatorSchemaParser } = require("./base-schema-parsers/discriminator");
const { EnumSchemaParser } = require("./base-schema-parsers/enum");
const { ObjectSchemaParser } = require("./base-schema-parsers/object");
const { PrimitiveSchemaParser } = require("./base-schema-parsers/primitive");
const { ComplexSchemaParser } = require("./base-schema-parsers/complex");
const { OneOfSchemaParser } = require("./complex-schema-parsers/one-of");
const { AllOfSchemaParser } = require("./complex-schema-parsers/all-of");
const { AnyOfSchemaParser } = require("./complex-schema-parsers/any-of");
const { NotSchemaParser } = require("./complex-schema-parsers/not");
const { ArraySchemaParser } = require("./base-schema-parsers/array");

class SchemaParser {
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

  schemaPath = [];

  constructor(config, logger, templates, schemaComponentsMap, typeName) {
    this.config = config;
    this.schemaComponentsMap = schemaComponentsMap;
    this.typeNameFormatter = typeName;
    this.schemaFormatters = new SchemaFormatters(config, logger, this, templates);
    this.schemaUtils = new SchemaUtils(config, schemaComponentsMap, this.typeNameFormatter);
  }

  complexSchemaParsers = {
    // T1 | T2
    [SCHEMA_TYPES.COMPLEX_ONE_OF]: (schema) => {
      const schemaParser = new OneOfSchemaParser(this, schema);
      return schemaParser.parse();
    },
    // T1 & T2
    [SCHEMA_TYPES.COMPLEX_ALL_OF]: (schema) => {
      const schemaParser = new AllOfSchemaParser(this, schema);
      return schemaParser.parse();
    },
    // T1 | T2 | (T1 & T2)
    [SCHEMA_TYPES.COMPLEX_ANY_OF]: (schema) => {
      const schemaParser = new AnyOfSchemaParser(this, schema);
      return schemaParser.parse();
    },
    [SCHEMA_TYPES.COMPLEX_NOT]: (schema) => {
      const schemaParser = new NotSchemaParser(this, schema);
      return schemaParser.parse();
    },
  };

  baseSchemaParsers = {
    [SCHEMA_TYPES.ENUM]: (schema, typeName) => {
      const schemaParser = new EnumSchemaParser(this, schema, typeName);
      return schemaParser.parse();
    },
    [SCHEMA_TYPES.OBJECT]: (schema, typeName) => {
      const schemaParser = new ObjectSchemaParser(this, schema, typeName);
      return schemaParser.parse();
    },
    [SCHEMA_TYPES.COMPLEX]: (schema, typeName) => {
      const schemaParser = new ComplexSchemaParser(this, schema, typeName);
      return schemaParser.parse();
    },
    [SCHEMA_TYPES.PRIMITIVE]: (schema, typeName) => {
      const schemaParser = new PrimitiveSchemaParser(this, schema, typeName);
      return schemaParser.parse();
    },
    [SCHEMA_TYPES.DISCRIMINATOR]: (schema, typeName) => {
      const schemaParser = new DiscriminatorSchemaParser(this, schema, typeName);
      return schemaParser.parse();
    },
    [SCHEMA_TYPES.ARRAY]: (schema, typeName) => {
      const schemaParser = new ArraySchemaParser(this, schema, typeName);
      return schemaParser.parse();
    },
  };

  getInternalSchemaType = (schema) => {
    if (!_.isEmpty(schema.enum) || !_.isEmpty(this.schemaUtils.getEnumNames(schema))) return SCHEMA_TYPES.ENUM;
    if (schema.discriminator) return SCHEMA_TYPES.DISCRIMINATOR;
    if (schema.allOf || schema.oneOf || schema.anyOf || schema.not) return SCHEMA_TYPES.COMPLEX;
    if (!_.isEmpty(schema.properties)) return SCHEMA_TYPES.OBJECT;

    return SCHEMA_TYPES.PRIMITIVE;
  };

  /**
   *
   * @param schema {any}
   * @param typeName {null | string}
   * @param formatter {"inline" | "base"}
   * @return {Record<string, any>}
   */
  parseSchema = (schema, typeName = null, schemaPath) => {
    if (!schema) return this.baseSchemaParsers[SCHEMA_TYPES.PRIMITIVE](null, typeName);

    let schemaType = null;
    let parsedSchema = null;

    if (typeof schema === "string") {
      return schema;
    }

    if (!schema.$parsed) {
      if (!typeName && this.schemaUtils.isRefSchema(schema)) {
        typeName = this.schemaUtils.getSchemaType(schema);
      }

      if (schema.items && !Array.isArray(schema.items) && !schema.type) {
        schema.type = SCHEMA_TYPES.ARRAY;
      }
      schemaType = this.getInternalSchemaType(schema);

      this.schemaPath.push(...(schemaPath || []));
      this.schemaPath.push(typeName);

      _.merge(schema, this.config.hooks.onPreParseSchema(schema, typeName, schemaType));
      parsedSchema = this.baseSchemaParsers[schemaType](schema, typeName);
      schema.$parsed = this.config.hooks.onParseSchema(schema, parsedSchema) || parsedSchema;
    }

    this.schemaPath.pop();

    return schema.$parsed;
  };

  getInlineParseContent = (rawTypeData, typeName, schemaPath) => {
    this.schemaPath.push(...(schemaPath || []));
    const parsedSchema = this.parseSchema(rawTypeData, typeName);
    const formattedSchema = this.schemaFormatters.formatSchema(parsedSchema, "inline");
    return formattedSchema.content;
  };

  getParseContent = (rawTypeData, typeName, schemaPath) => {
    this.schemaPath.push(...(schemaPath || []));
    const parsedSchema = this.parseSchema(rawTypeData, typeName);
    const formattedSchema = this.schemaFormatters.formatSchema(parsedSchema, "base");
    return formattedSchema.content;
  };

  buildTypeNameFromPath = () => {
    const schemaPath = _.uniq(_.compact(this.schemaPath));

    if (!schemaPath || !schemaPath[0]) return null;

    return pascalCase(camelCase(_.uniq([schemaPath[0], schemaPath[schemaPath.length - 1]]).join("_")));
  };
}

module.exports = {
  SchemaParser,
};
