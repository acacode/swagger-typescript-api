const { SCHEMA_TYPES } = require("../constants.js");
const _ = require("lodash");
const { SchemaFormatters } = require("./schema-formatters");
const { internalCase } = require("../util/internal-case");

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

  constructor(config, logger, templates, schemaComponentsMap, typeName) {
    this.config = config;
    this.schemaComponentsMap = schemaComponentsMap;
    this.typeName = typeName;
    this.schemaFormatters = new SchemaFormatters(config, logger, this, templates);
  }

  complexSchemaParsers = {
    // T1 | T2
    [SCHEMA_TYPES.COMPLEX_ONE_OF]: (schema) => {
      const combined = _.map(schema.oneOf, (childSchema) =>
        this.getInlineParseContent(this.makeAddRequiredToChildSchema(schema, childSchema)),
      );
      const filtered = this.filterContents(combined, [this.config.Ts.Keyword.Any]);

      const type = this.config.Ts.UnionType(filtered);

      return this.checkAndAddNull(schema, type);
    },
    // T1 & T2
    [SCHEMA_TYPES.COMPLEX_ALL_OF]: (schema) => {
      const combined = _.map(schema.allOf, (childSchema) =>
        this.getInlineParseContent(this.makeAddRequiredToChildSchema(schema, childSchema)),
      );
      const filtered = this.filterContents(combined, [...this.config.jsPrimitiveTypes, this.config.Ts.Keyword.Any]);

      const type = this.config.Ts.IntersectionType(filtered);

      return this.checkAndAddNull(schema, type);
    },
    // T1 | T2 | (T1 & T2)
    [SCHEMA_TYPES.COMPLEX_ANY_OF]: (schema) => {
      const combined = _.map(schema.anyOf, (childSchema) =>
        this.getInlineParseContent(this.makeAddRequiredToChildSchema(schema, childSchema)),
      );
      const filtered = this.filterContents(combined, [...this.config.jsPrimitiveTypes, this.config.Ts.Keyword.Any]);

      const type = this.config.Ts.UnionType(
        _.compact([
          ...filtered,
          filtered.length > 1 && this.config.Ts.ExpressionGroup(this.config.Ts.IntersectionType(filtered)),
        ]),
      );

      return this.checkAndAddNull(schema, type);
    },
    // TODO
    [SCHEMA_TYPES.COMPLEX_NOT]: (schema) => {
      // TODO
      return this.config.Ts.Keyword.Any;
    },
  };

  baseSchemaParsers = {
    [SCHEMA_TYPES.ENUM]: (schema, typeName) => {
      const refType = this.getRefType(schema);
      const $ref = (refType && refType.$ref) || null;
      const enumNamesAsValues = this.config.enumNamesAsValues;
      const keyType = this.getType(schema);
      const enumNames = this.getEnumNames(schema);
      const isIntegerOrBooleanEnum =
        keyType === this.getTypeAlias({ type: "number" }) || keyType === this.getTypeAlias({ type: "boolean" });
      let content = null;

      const formatValue = (value) => {
        if (value === null) {
          return this.config.Ts.NullValue(value);
        }
        if (keyType === this.getTypeAlias({ type: "number" })) {
          return this.config.Ts.NumberValue(value);
        }
        if (keyType === this.getTypeAlias({ type: "boolean" })) {
          return this.config.Ts.BooleanValue(value);
        }

        return this.config.Ts.StringValue(value);
      };

      if (_.isArray(enumNames) && _.size(enumNames)) {
        content = _.map(enumNames, (enumName, index) => {
          const enumValue = _.get(schema.enum, index);
          const formattedKey =
            (enumName && this.typeName.format(enumName, { ignorePrefix: true, ignoreSuffix: true })) ||
            this.typeName.format(enumValue, { ignorePrefix: true, ignoreSuffix: true });

          if (enumNamesAsValues || _.isUndefined(enumValue)) {
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
            key: isIntegerOrBooleanEnum ? key : this.typeName.format(key, { ignorePrefix: true, ignoreSuffix: true }),
            type: keyType,
            value: formatValue(key),
          };
        });
      }

      return this.attachParsedRef(schema, {
        ...(_.isObject(schema) ? schema : {}),
        $ref: $ref,
        typeName: typeName || ($ref && refType.typeName) || null,
        $parsedSchema: true,
        schemaType: SCHEMA_TYPES.ENUM,
        type: SCHEMA_TYPES.ENUM,
        keyType: keyType,
        typeIdentifier:
          this.config.generateUnionEnums || (!enumNames && isIntegerOrBooleanEnum)
            ? this.config.Ts.Keyword.Type
            : this.config.Ts.Keyword.Enum,
        name: typeName,
        description: this.schemaFormatters.formatDescription(schema.description),
        content,
      });
    },
    [SCHEMA_TYPES.OBJECT]: (schema, typeName) => {
      const content = this.getObjectSchemaContent(schema);

      return this.attachParsedRef(schema, {
        ...(_.isObject(schema) ? schema : {}),
        $parsedSchema: true,
        schemaType: SCHEMA_TYPES.OBJECT,
        type: SCHEMA_TYPES.OBJECT,
        typeIdentifier: this.config.Ts.Keyword.Interface,
        name: typeName,
        description: this.schemaFormatters.formatDescription(schema.description),
        allFieldsAreOptional: !_.some(_.values(content), (part) => part.isRequired),
        content: content,
      });
    },
    [SCHEMA_TYPES.COMPLEX]: (schema, typeName) => {
      const complexType = this.getComplexType(schema);
      const simpleSchema = _.omit(_.clone(schema), _.keys(this.complexSchemaParsers));
      const complexSchemaContent = this.complexSchemaParsers[complexType](schema);

      return this.attachParsedRef(schema, {
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
      });
    },
    [SCHEMA_TYPES.PRIMITIVE]: (schema, typeName) => {
      let contentType = null;
      const { additionalProperties, type, description, $$requiredKeys } = schema || {};

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

      return this.attachParsedRef(schema, {
        ...(_.isObject(schema) ? schema : {}),
        $parsedSchema: true,
        schemaType: SCHEMA_TYPES.PRIMITIVE,
        type: SCHEMA_TYPES.PRIMITIVE,
        typeIdentifier: this.config.Ts.Keyword.Type,
        name: typeName,
        description: this.schemaFormatters.formatDescription(description),
        // TODO: probably it should be refactored. `type === 'null'` is not flexible
        content: type === this.config.Ts.Keyword.Null ? type : contentType || this.getType(schema),
      });
    },
  };

  filterContents = (contents, types) => _.uniq(_.filter(contents, (type) => !_.includes(types, type)));

  makeAddRequiredToChildSchema = (parentSchema, childSchema) => {
    if (!childSchema) return childSchema;

    const required = _.uniq([...(parentSchema.required || []), ...(childSchema.required || [])]);

    const refData = this.getRefType(childSchema);

    if (refData) {
      const refObjectProperties = _.keys((refData.rawTypeData && refData.rawTypeData.properties) || {});
      const existedRequiredKeys = refObjectProperties.filter((key) => required.includes(key));

      if (!existedRequiredKeys.length) return childSchema;

      return {
        ...childSchema,
        $$requiredKeys: existedRequiredKeys,
      };
    } else if (childSchema.properties) {
      const childSchemaProperties = _.keys(childSchema.properties);
      const existedRequiredKeys = childSchemaProperties.filter((key) => required.includes(key));

      if (!existedRequiredKeys.length) return childSchema;

      return {
        required: _.uniq([...(childSchema.required || []), ...existedRequiredKeys]),
        ...childSchema,
      };
    }

    return childSchema;
  };

  attachParsedRef = (originalSchema, parsedSchema) => {
    const parsedSchemaAfterHook = this.config.hooks.onParseSchema(originalSchema, parsedSchema) || parsedSchema;

    if (originalSchema) {
      originalSchema.$parsed = parsedSchemaAfterHook;
    }

    return parsedSchemaAfterHook;
  };

  stealTypeFromSchema = (rawSchema) => {
    const schema = rawSchema || {};

    if (schema.type) {
      return schema.type;
    }
    if (schema.enum) {
      const enumFieldType = typeof schema.enum[0];
      if (enumFieldType === this.config.Ts.Keyword.Undefined) return;

      return enumFieldType;
    }
    if (_.keys(schema.properties).length) {
      return SCHEMA_TYPES.OBJECT;
    }
    if (!!schema.items) {
      return SCHEMA_TYPES.ARRAY;
    }
  };

  getTypeAlias = (rawSchema) => {
    const schema = rawSchema || {};
    const type = internalCase(this.stealTypeFromSchema(schema));
    const typeAlias =
      _.get(this.config.primitiveTypes, [type, schema.format]) ||
      _.get(this.config.primitiveTypes, [type, "$default"]) ||
      this.config.primitiveTypes[type];

    if (_.isFunction(typeAlias)) {
      return typeAlias(schema, this);
    }

    return typeAlias || type;
  };

  getEnumNames = (schema) => {
    return schema["x-enumNames"] || schema["xEnumNames"] || schema["x-enumnames"] || schema["x-enum-varnames"];
  };

  getInternalSchemaType = (schema) => {
    if (!_.isEmpty(schema.enum) || !_.isEmpty(this.getEnumNames(schema))) return SCHEMA_TYPES.ENUM;
    if (schema.allOf || schema.oneOf || schema.anyOf || schema.not) return SCHEMA_TYPES.COMPLEX;
    if (!_.isEmpty(schema.properties)) return SCHEMA_TYPES.OBJECT;

    return SCHEMA_TYPES.PRIMITIVE;
  };

  isNeedToAddNull = (contract, value) => {
    const { nullable, type } = contract || {};
    return (
      (nullable || !!_.get(contract, "x-nullable") || type === this.config.Ts.Keyword.Null) &&
      (!_.isString(value) ||
        (!value.includes(` ${this.config.Ts.Keyword.Null}`) && !value.includes(`${this.config.Ts.Keyword.Null} `)))
    );
  };

  checkAndAddRequiredKeys = (schema, resultType) => {
    if ("$$requiredKeys" in schema && schema.$$requiredKeys.length) {
      this.config.update({
        internalTemplateOptions: {
          addUtilRequiredKeysType: true,
        },
      });
      return this.config.Ts.TypeWithGeneric(this.config.Ts.CodeGenKeyword.UtilRequiredKeys, [
        resultType,
        this.config.Ts.UnionType(schema.$$requiredKeys.map(this.config.Ts.StringValue)),
      ]);
    }

    return resultType;
  };

  checkAndAddNull = (schema, value) => {
    const { nullable, type } = schema || {};
    return (nullable || !!_.get(schema, "x-nullable") || type === this.config.Ts.Keyword.Null) &&
      _.isString(value) &&
      !value.includes(` ${this.config.Ts.Keyword.Null}`) &&
      !value.includes(`${this.config.Ts.Keyword.Null} `)
      ? this.config.Ts.UnionType([value, this.config.Ts.Keyword.Null])
      : value;
  };

  isRef = (property) => {
    return !!(property && property["$ref"]);
  };

  getRefType = (schema) => {
    const ref = schema && schema["$ref"];
    return this.schemaComponentsMap.get(ref);
  };

  getType = (schema) => {
    if (!schema) return this.config.Ts.Keyword.Any;

    const refTypeInfo = this.getRefType(schema);

    if (refTypeInfo) {
      return this.checkAndAddRequiredKeys(
        schema,
        this.checkAndAddNull(schema, this.typeName.format(refTypeInfo.typeName)),
      );
    }

    const primitiveType = this.getTypeAlias(schema);
    return primitiveType
      ? this.checkAndAddRequiredKeys(schema, this.checkAndAddNull(schema, primitiveType))
      : this.config.Ts.Keyword.Any;
  };

  isRequired = (property, name, requiredProperties) => {
    if (property["x-omitempty"] === false) {
      return true;
    }

    const isRequired = _.isBoolean(property.required)
      ? !!property.required
      : _.isArray(requiredProperties)
      ? requiredProperties.includes(name)
      : !!requiredProperties;

    if (this.config.convertedFromSwagger2) {
      return typeof property.nullable === this.config.Ts.Keyword.Undefined ? isRequired : !property.nullable;
    }
    return isRequired;
  };

  getObjectSchemaContent = (schema) => {
    const { properties, additionalProperties, required: requiredProperties } = schema || {};

    const propertiesContent = _.map(properties, (property, name) => {
      const required = this.isRequired(property, name, requiredProperties);
      const rawTypeData = _.get(this.getRefType(property), "rawTypeData", {});
      const nullable = !!(rawTypeData.nullable || property.nullable);
      const fieldName = this.typeName.isValidName(name) ? name : this.config.Ts.StringValue(name);
      const fieldValue = this.getInlineParseContent(property);
      const readOnly = property.readOnly;

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

    if (additionalProperties === true) {
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
  parseSchema = (schema, typeName, formatter) => {
    if (!schema) return this.baseSchemaParsers[SCHEMA_TYPES.PRIMITIVE](null, typeName);

    let schemaType = null;
    let parsedSchema = null;

    if (typeof schema === "string") {
      return schema;
    }

    if (schema.$parsed) {
      schemaType = schema.$parsed.schemaType;
      parsedSchema = schema.$parsed;
    } else {
      if (!typeName && this.isRef(schema)) {
        typeName = this.getType(schema);
      }

      if (schema.items && !schema.type) {
        schema.type = SCHEMA_TYPES.ARRAY;
      }

      schemaType = this.getInternalSchemaType(schema);
      parsedSchema = this.baseSchemaParsers[schemaType](schema, typeName);
    }

    const formatterFn =
      formatter in this.schemaFormatters &&
      this.schemaFormatters[formatter] &&
      this.schemaFormatters[formatter][schemaType];

    return (formatterFn && formatterFn(parsedSchema)) || parsedSchema;
  };

  getInlineParseContent = (rawTypeData, typeName = null) => this.parseSchema(rawTypeData, typeName, "inline").content;

  getParseContent = (rawTypeData, typeName = null) => this.parseSchema(rawTypeData, typeName).content;
}

module.exports = {
  SchemaParser,
};
