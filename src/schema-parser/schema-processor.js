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

  $processingSchemaPath = [];

  /**
   * @type {((schema, typeName) => SchemaParser)}
   */
  createSchemaParser;

  constructor(config, logger, templates, schemaComponentsMap, typeNameFormatter) {
    this.config = config;
    this.schemaComponentsMap = schemaComponentsMap;
    this.typeNameFormatter = typeNameFormatter;
    this.schemaFormatters = new SchemaFormatters(config, logger, this, templates);
    this.schemaUtils = new SchemaUtils(config, schemaComponentsMap);
    this.createSchemaParser = SchemaParser.create.bind(
      null,
      config,
      schemaComponentsMap,
      typeNameFormatter,
      this.schemaFormatters,
      this.schemaUtils,
    );
  }

  getSchemaType = async (schema) => {
    if (!schema) return this.config.Ts.Keyword.Any;

    const refTypeInfo = this.schemaUtils.getSchemaRefType(schema);

    if (refTypeInfo) {
      return this.schemaUtils.checkAndAddRequiredKeys(
        schema,
        this.schemaUtils.safeAddNullToType(schema, this.typeNameFormatter.format(refTypeInfo.typeName)),
      );
    }

    const primitiveType = this.schemaUtils.getSchemaPrimitiveType(schema);

    if (primitiveType == null) return this.config.Ts.Keyword.Any;

    let resultType;

    /**
     * @type {string | (() => Promise<string>)}
     */
    const typeAlias =
      _.get(this.config.primitiveTypes, [primitiveType, schema.format]) ||
      _.get(this.config.primitiveTypes, [primitiveType, "$default"]) ||
      this.config.primitiveTypes[primitiveType];

    if (_.isFunction(typeAlias)) {
      resultType = await typeAlias(schema, this);
    } else {
      resultType = typeAlias || primitiveType;
    }

    if (!resultType) return this.config.Ts.Keyword.Any;

    return this.schemaUtils.checkAndAddRequiredKeys(schema, this.schemaUtils.safeAddNullToType(schema, resultType));
  };

  getObjectSchemaContent = async (schema) => {
    const { properties, additionalProperties } = schema || {};

    const propertiesContent = await Promise.all(
      _.map(properties, async (property, name) => {
        this.$processingSchemaPath.push(name);
        const required = this.schemaUtils.isPropertyRequired(name, property, schema);
        const rawTypeData = _.get(this.schemaUtils.getSchemaRefType(property), "rawTypeData", {});
        const nullable = !!(rawTypeData.nullable || property.nullable);
        const fieldName = this.typeNameFormatter.isValidName(name) ? name : this.config.Ts.StringValue(name);
        const fieldValue = await this.getInlineParseContent(property);
        const readOnly = property.readOnly;

        this.$processingSchemaPath.pop();

        return {
          ...property,
          $$raw: property,
          title: property.title,
          description:
            property.description ||
            _.compact(_.map(property[this.getComplexType(property)], "description"))[0] ||
            rawTypeData.description ||
            _.compact(_.map(rawTypeData[this.getComplexType(rawTypeData)], "description"))[0] ||
            "",
          isRequired: required,
          isNullable: nullable,
          name: fieldName,
          value: fieldValue,
          field: this.config.Ts.TypeField({
            readonly: readOnly && this.config.addReadonly,
            optional: !required,
            key: fieldName,
            value: fieldValue,
          }),
        };
      }),
    );

    if (additionalProperties) {
      propertiesContent.push({
        $$raw: { additionalProperties },
        description: "",
        isRequired: false,
        field: this.config.Ts.InterfaceDynamicField(this.config.Ts.Keyword.String, this.config.Ts.Keyword.Any),
      });
    }

    return propertiesContent;
  };

  getComplexType = (schema) => {
    if (schema.oneOf) return SCHEMA_TYPES.COMPLEX_ONE_OF;
    if (schema.allOf) return SCHEMA_TYPES.COMPLEX_ALL_OF;
    if (schema.anyOf) return SCHEMA_TYPES.COMPLEX_ANY_OF;
    // TODO :(
    if (schema.not) return SCHEMA_TYPES.COMPLEX_NOT;

    return SCHEMA_TYPES.COMPLEX_UNKNOWN;
  };

  /**
   *
   * @param schema {any}
   * @param typeName {null | string}
   * @return {Promise<Record<string, any>>}
   */
  parseSchema = async (schema, typeName = null) => {
    const schemaParser = this.createSchemaParser(schema, typeName);
    return await schemaParser.parse();
  };

  getInlineParseContent = async (schema, typeName) => {
    const parser = this.createSchemaParser(schema, typeName);
    return await parser.getInlineContent();
  };

  getParseContent = async (schema, typeName) => {
    const parser = this.createSchemaParser(schema, typeName);
    return await parser.getContent();
  };

  buildTypeNameFromPath = () => {
    const schemaPath = _.uniq(_.compact(this.$processingSchemaPath));

    if (!schemaPath || !schemaPath[0]) return null;

    return internalCase(camelCase(`${schemaPath[0]}_${schemaPath[schemaPath.length - 1]}`));
  };
}

module.exports = {
  SchemaProcessor,
};
