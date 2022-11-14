const { SCHEMA_TYPES } = require("../constants.js");
const _ = require("lodash");
const { SchemaFormatters } = require("./schema-formatters");
const { internalCase } = require("../util/internal-case");
const { SchemaUtils } = require("./schema-utils");
const { camelCase } = require("lodash");
const { pascalCase } = require("../util/pascal-case");

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
   * @type {TypeName}
   */
  typeName;
  /**
   * @type {SchemaFormatters}
   */
  schemaFormatters;

  /**
   * @type {SchemaUtils}
   */
  schemaUtils;

  $processingSchemaPath = [];

  constructor(config, logger, templates, schemaComponentsMap, typeName) {
    this.config = config;
    this.schemaComponentsMap = schemaComponentsMap;
    this.typeName = typeName;
    this.schemaFormatters = new SchemaFormatters(config, logger, this, templates);
    this.schemaUtils = new SchemaUtils(config, schemaComponentsMap);
  }

  complexSchemaParsers = {
    // T1 | T2
    [SCHEMA_TYPES.COMPLEX_ONE_OF]: (schema) => {
      const ignoreTypes = [this.config.Ts.Keyword.Any];
      const combined = _.map(schema.oneOf, (childSchema) =>
        this.getInlineParseContent(this.schemaUtils.makeAddRequiredToChildSchema(schema, childSchema)),
      );
      const filtered = this.schemaUtils.filterSchemaContents(combined, (content) => !ignoreTypes.includes(content));

      const type = this.config.Ts.UnionType(filtered);

      return this.schemaUtils.safeAddNullToType(schema, type);
    },
    // T1 & T2
    [SCHEMA_TYPES.COMPLEX_ALL_OF]: (schema) => {
      const ignoreTypes = [...this.config.jsPrimitiveTypes, this.config.Ts.Keyword.Any];
      const combined = _.map(schema.allOf, (childSchema) =>
        this.getInlineParseContent(this.schemaUtils.makeAddRequiredToChildSchema(schema, childSchema)),
      );
      const filtered = this.schemaUtils.filterSchemaContents(combined, (content) => !ignoreTypes.includes(content));

      const type = this.config.Ts.IntersectionType(filtered);

      return this.schemaUtils.safeAddNullToType(schema, type);
    },
    // T1 | T2 | (T1 & T2)
    [SCHEMA_TYPES.COMPLEX_ANY_OF]: (schema) => {
      const ignoreTypes = [...this.config.jsPrimitiveTypes, this.config.Ts.Keyword.Any];
      const combined = _.map(schema.anyOf, (childSchema) =>
        this.getInlineParseContent(this.schemaUtils.makeAddRequiredToChildSchema(schema, childSchema)),
      );
      const filtered = this.schemaUtils.filterSchemaContents(combined, (content) => !ignoreTypes.includes(content));

      const type = this.config.Ts.UnionType(
        _.compact([
          ...filtered,
          filtered.length > 1 && this.config.Ts.ExpressionGroup(this.config.Ts.IntersectionType(filtered)),
        ]),
      );

      return this.schemaUtils.safeAddNullToType(schema, type);
    },
    // TODO
    [SCHEMA_TYPES.COMPLEX_NOT]: (schema) => {
      // TODO
      return this.config.Ts.Keyword.Any;
    },
  };

  baseSchemaParsers = {
    [SCHEMA_TYPES.ENUM]: (schema, typeName) => {
      if (this.config.extractEnums && !typeName) {
        const generatedTypeName = this.config.componentTypeNameResolver.resolve([this.buildTypeNameFromPath()]);
        const schemaComponent = this.schemaComponentsMap.createComponent("schemas", generatedTypeName, { ...schema });
        return this.parseSchema(schemaComponent, generatedTypeName);
      }

      const refType = this.schemaUtils.getSchemaRefType(schema);
      const $ref = (refType && refType.$ref) || null;

      if (Array.isArray(schema.enum) && Array.isArray(schema.enum[0])) {
        return this.parseSchema(
          {
            oneOf: schema.enum.map((enumNames) => ({
              type: "array",
              items: enumNames.map((enumName) => ({ type: "string", enum: [enumName] })),
            })),
          },
          typeName,
        );
      }

      const keyType = this.getSchemaType(schema);
      const enumNames = this.schemaUtils.getEnumNames(schema);
      let content = null;

      const formatValue = (value) => {
        if (value === null) {
          return this.config.Ts.NullValue(value);
        }
        if (keyType === this.getSchemaType({ type: "number" })) {
          return this.config.Ts.NumberValue(value);
        }
        if (keyType === this.getSchemaType({ type: "boolean" })) {
          return this.config.Ts.BooleanValue(value);
        }

        return this.config.Ts.StringValue(value);
      };

      if (_.isArray(enumNames) && _.size(enumNames)) {
        content = _.map(enumNames, (enumName, index) => {
          const enumValue = _.get(schema.enum, index);
          const formattedKey =
            (enumName &&
              this.typeName.format(enumName, {
                type: "enum-key",
              })) ||
            this.typeName.format(`${enumValue}`, {
              type: "enum-key",
            });

          if (this.config.enumNamesAsValues || _.isUndefined(enumValue)) {
            return {
              key: formattedKey,
              type: this.config.Ts.Keyword.String,
              value: this.config.Ts.StringValue(enumName),
            };
          }

          return {
            key: formattedKey,
            type: keyType,
            value: formatValue(enumValue),
          };
        });
      } else {
        content = _.map(schema.enum, (key) => {
          return {
            key: this.typeName.format(`${key}`, {
              type: "enum-key",
            }),
            type: keyType,
            value: formatValue(key),
          };
        });
      }

      return {
        ...(_.isObject(schema) ? schema : {}),
        $ref: $ref,
        typeName: typeName || ($ref && refType.typeName) || null,
        $parsedSchema: true,
        schemaType: SCHEMA_TYPES.ENUM,
        type: SCHEMA_TYPES.ENUM,
        keyType: keyType,
        typeIdentifier: this.config.generateUnionEnums ? this.config.Ts.Keyword.Type : this.config.Ts.Keyword.Enum,
        name: typeName,
        description: this.schemaFormatters.formatDescription(schema.description),
        content,
      };
    },
    [SCHEMA_TYPES.OBJECT]: (schema, typeName) => {
      const contentProperties = this.getObjectSchemaContent(schema);

      return {
        ...(_.isObject(schema) ? schema : {}),
        $parsedSchema: true,
        schemaType: SCHEMA_TYPES.OBJECT,
        type: SCHEMA_TYPES.OBJECT,
        typeIdentifier: this.config.Ts.Keyword.Interface,
        name: typeName,
        description: this.schemaFormatters.formatDescription(schema.description),
        allFieldsAreOptional: !_.some(_.values(contentProperties), (part) => part.isRequired),
        content: contentProperties,
      };
    },
    [SCHEMA_TYPES.COMPLEX]: (schema, typeName) => {
      const complexType = this.getComplexType(schema);
      const simpleSchema = _.omit(_.clone(schema), _.keys(this.complexSchemaParsers));
      const complexSchemaContent = this.complexSchemaParsers[complexType](schema);

      return {
        ...(_.isObject(schema) ? schema : {}),
        $parsedSchema: true,
        schemaType: SCHEMA_TYPES.COMPLEX,
        type: SCHEMA_TYPES.PRIMITIVE,
        typeIdentifier: this.config.Ts.Keyword.Type,
        name: typeName,
        description: this.schemaFormatters.formatDescription(
          schema.description || _.compact(_.map(schema[complexType], "description"))[0] || "",
        ),
        content:
          this.config.Ts.IntersectionType(
            _.compact([
              this.config.Ts.ExpressionGroup(complexSchemaContent),
              this.getInternalSchemaType(simpleSchema) === SCHEMA_TYPES.OBJECT &&
                this.config.Ts.ExpressionGroup(this.getInlineParseContent(simpleSchema)),
            ]),
          ) || this.config.Ts.Keyword.Any,
      };
    },
    [SCHEMA_TYPES.PRIMITIVE]: (schema, typeName) => {
      let contentType = null;
      const { additionalProperties, type, description, items } = schema || {};

      if (type === this.config.Ts.Keyword.Object && additionalProperties) {
        const fieldType = _.isObject(additionalProperties)
          ? this.getInlineParseContent(additionalProperties)
          : this.config.Ts.Keyword.Any;
        contentType = this.config.Ts.RecordType(this.config.Ts.Keyword.String, fieldType);
      }

      if (_.isArray(type) && type.length) {
        contentType = this.complexSchemaParsers.oneOf({
          ...(_.isObject(schema) ? schema : {}),
          oneOf: type.map((type) => ({ type })),
        });
      }

      if (_.isArray(items) && type === SCHEMA_TYPES.ARRAY) {
        contentType = this.config.Ts.Tuple(items.map((item) => this.getInlineParseContent(item)));
      }

      return {
        ...(_.isObject(schema) ? schema : {}),
        $parsedSchema: true,
        schemaType: SCHEMA_TYPES.PRIMITIVE,
        type: SCHEMA_TYPES.PRIMITIVE,
        typeIdentifier: this.config.Ts.Keyword.Type,
        name: typeName,
        description: this.schemaFormatters.formatDescription(description),
        // TODO: probably it should be refactored. `type === 'null'` is not flexible
        content: type === this.config.Ts.Keyword.Null ? type : contentType || this.getSchemaType(schema),
      };
    },
    [SCHEMA_TYPES.DISCRIMINATOR]: (schema, typeName) => {
      const { discriminator, ...noDiscriminatorSchema } = schema;

      if (typeName == null || !discriminator.mapping) return this.parseSchema(noDiscriminatorSchema, typeName);

      const refPath = this.schemaComponentsMap.createRef("schemas", typeName);
      const complexSchemaKeys = _.keys(this.complexSchemaParsers);
      const abstractSchema = _.omit(_.clone(noDiscriminatorSchema), complexSchemaKeys);
      const discTypeName = this.config.componentTypeNameResolver.resolve([
        pascalCase(`Abstract ${typeName}`),
        pascalCase(`Discriminator ${typeName}`),
        pascalCase(`Internal ${typeName}`),
        pascalCase(`Polymorph ${typeName}`),
      ]);
      const abstractSchemaIsEmpty = !_.keys(abstractSchema).length;
      const abstractComponent =
        !abstractSchemaIsEmpty &&
        this.schemaComponentsMap.createComponent("schemas", discTypeName, {
          ...abstractSchema,
          internal: true,
        });
      const complexType = this.getComplexType(schema);

      const abstractSchemaContent = !abstractSchemaIsEmpty && this.getInlineParseContent(abstractComponent);
      const complexSchemaContent =
        complexType !== SCHEMA_TYPES.COMPLEX_UNKNOWN
          ? this.config.Ts.ExpressionGroup(this.complexSchemaParsers[complexType](schema))
          : null;
      const discriminatorSchemaContent =
        discriminator.mapping &&
        this.config.Ts.ExpressionGroup(
          this.config.Ts.UnionType(
            _.map(discriminator.mapping, (schema, key) => {
              const mappingSchema = typeof schema === "string" ? { $ref: schema } : schema;
              if (mappingSchema.$ref) {
                const mappingRefSchema = this.schemaUtils.getSchemaRefType(mappingSchema)?.rawTypeData;
                if (mappingRefSchema) {
                  complexSchemaKeys.forEach((schemaKey) => {
                    if (_.isArray(mappingRefSchema[schemaKey])) {
                      mappingRefSchema[schemaKey] = mappingRefSchema[schemaKey].map((schema) => {
                        if (schema.$ref === refPath) {
                          return { ...schema, $ref: abstractComponent.$ref };
                        }
                        return schema;
                      });
                    }
                  });
                }
              }
              return this.config.Ts.ExpressionGroup(
                this.config.Ts.IntersectionType([
                  this.config.Ts.ObjectWrapper(
                    this.config.Ts.TypeField({
                      key: discriminator.propertyName,
                      value: this.config.Ts.StringValue(key),
                    }),
                  ),
                  this.getInlineParseContent(mappingSchema),
                ]),
              );
            }),
          ),
        );

      return {
        ...(_.isObject(schema) ? schema : {}),
        $parsedSchema: true,
        schemaType: SCHEMA_TYPES.COMPLEX,
        type: SCHEMA_TYPES.PRIMITIVE,
        typeIdentifier: this.config.Ts.Keyword.Type,
        name: typeName,
        description: this.schemaFormatters.formatDescription(schema.description),
        content: this.config.Ts.UnionType(
          [abstractSchemaContent, complexSchemaContent, discriminatorSchemaContent].filter(Boolean),
        ),
      };
    },
  };

  getInternalSchemaType = (schema) => {
    if (!_.isEmpty(schema.enum) || !_.isEmpty(this.schemaUtils.getEnumNames(schema))) return SCHEMA_TYPES.ENUM;
    if (schema.discriminator) return SCHEMA_TYPES.DISCRIMINATOR;
    if (schema.allOf || schema.oneOf || schema.anyOf || schema.not) return SCHEMA_TYPES.COMPLEX;
    if (!_.isEmpty(schema.properties)) return SCHEMA_TYPES.OBJECT;

    return SCHEMA_TYPES.PRIMITIVE;
  };

  getSchemaType = (schema) => {
    if (!schema) return this.config.Ts.Keyword.Any;

    const refTypeInfo = this.schemaUtils.getSchemaRefType(schema);

    if (refTypeInfo) {
      return this.schemaUtils.checkAndAddRequiredKeys(
        schema,
        this.schemaUtils.safeAddNullToType(schema, this.typeName.format(refTypeInfo.typeName)),
      );
    }

    const primitiveType = this.schemaUtils.getSchemaPrimitiveType(schema);

    if (primitiveType == null) return this.config.Ts.Keyword.Any;

    let resultType;

    const typeAlias =
      _.get(this.config.primitiveTypes, [primitiveType, schema.format]) ||
      _.get(this.config.primitiveTypes, [primitiveType, "$default"]) ||
      this.config.primitiveTypes[primitiveType];

    if (_.isFunction(typeAlias)) {
      resultType = typeAlias(schema, this);
    } else {
      resultType = typeAlias || primitiveType;
    }

    if (!resultType) return this.config.Ts.Keyword.Any;

    return this.schemaUtils.checkAndAddRequiredKeys(schema, this.schemaUtils.safeAddNullToType(schema, resultType));
  };

  getObjectSchemaContent = (schema) => {
    const { properties, additionalProperties } = schema || {};

    const propertiesContent = _.map(properties, (property, name) => {
      this.$processingSchemaPath.push(name);
      const required = this.schemaUtils.isPropertyRequired(name, property, schema);
      const rawTypeData = _.get(this.schemaUtils.getSchemaRefType(property), "rawTypeData", {});
      const nullable = !!(rawTypeData.nullable || property.nullable);
      const fieldName = this.typeName.isValidName(name) ? name : this.config.Ts.StringValue(name);
      const fieldValue = this.getInlineParseContent(property);
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
    });

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
   * @param formatter {"inline" | "base"}
   * @return {Record<string, any>}
   */
  parseSchema = (schema, typeName = null) => {
    if (!schema) return this.baseSchemaParsers[SCHEMA_TYPES.PRIMITIVE](null, typeName);

    let schemaType = null;
    let parsedSchema = null;

    if (typeof schema === "string") {
      return schema;
    }

    if (!schema.$parsed) {
      if (!typeName && this.schemaUtils.isRefSchema(schema)) {
        typeName = this.getSchemaType(schema);
      }

      if (schema.items && !Array.isArray(schema.items) && !schema.type) {
        schema.type = SCHEMA_TYPES.ARRAY;
      }
      schemaType = this.getInternalSchemaType(schema);

      this.$processingSchemaPath.push(typeName);

      _.merge(schema, this.config.hooks.onPreParseSchema(schema, typeName, schemaType));
      parsedSchema = this.baseSchemaParsers[schemaType](schema, typeName);
      schema.$parsed = this.config.hooks.onParseSchema(schema, parsedSchema) || parsedSchema;
    }

    this.$processingSchemaPath.pop();

    return schema.$parsed;
  };

  getInlineParseContent = (rawTypeData, typeName) => {
    const parsedSchema = this.parseSchema(rawTypeData, typeName);
    const formattedSchema = this.schemaFormatters.formatSchema(parsedSchema, "inline");
    return formattedSchema.content;
  };

  getParseContent = (rawTypeData, typeName) => {
    const parsedSchema = this.parseSchema(rawTypeData, typeName);
    const formattedSchema = this.schemaFormatters.formatSchema(parsedSchema, "base");
    return formattedSchema.content;
  };

  buildTypeNameFromPath = () => {
    const schemaPath = _.uniq(_.compact(this.$processingSchemaPath));

    if (!schemaPath || !schemaPath[0]) return null;

    return internalCase(camelCase(`${schemaPath[0]}_${schemaPath[schemaPath.length - 1]}`));
  };
}

module.exports = {
  SchemaParser,
};
