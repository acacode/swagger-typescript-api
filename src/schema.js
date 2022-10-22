const _ = require("lodash");
const { inlineExtraFormatters } = require("./typeFormatters");
const { isValidName, formatModelName, formatEnumKey } = require("./modelNames");
const { formatDescription, internalCase } = require("./common");
const { JS_PRIMITIVE_TYPES, SCHEMA_TYPES } = require("./constants");
const { config } = require("./config");
const { isObject } = require("lodash");
const { Ts, JsDoc } = require("./code-gen-constructs");

const types = {
  // swagger schema type -> typescript type
  /** { type: "integer" } -> { type: "number" } */
  integer: Ts.Keyword.Number,
  number: Ts.Keyword.Number,
  boolean: Ts.Keyword.Boolean,
  object: Ts.Keyword.Object,
  file: Ts.Keyword.File,
  string: {
    $default: Ts.Keyword.String,

    /** formats */
    binary: Ts.Keyword.File,
  },
  array: ({ items, ...schemaPart }) => {
    const content = getInlineParseContent(items);
    return checkAndAddNull(schemaPart, Ts.ArrayType(content));
  },

  // TODO: probably it can be needed
  // date: "Date",
  // dateTime: "Date",
};

const stealTypeFromSchema = (rawSchema) => {
  const schema = rawSchema || {};

  if (schema.type) {
    return schema.type;
  }
  if (schema.enum) {
    const enumFieldType = typeof schema.enum[0];
    if (enumFieldType === Ts.Keyword.Undefined) return;

    return enumFieldType;
  }
  if (_.keys(schema.properties).length) {
    return SCHEMA_TYPES.OBJECT;
  }
  if (!!schema.items) {
    return SCHEMA_TYPES.ARRAY;
  }
};

const getTypeAlias = (rawSchema) => {
  const schema = rawSchema || {};
  const type = internalCase(stealTypeFromSchema(schema));
  const format = internalCase(schema.format);
  const typeAlias = _.get(types, [type, format]) || _.get(types, [type, "$default"]) || types[type];

  if (_.isFunction(typeAlias)) {
    return typeAlias(schema);
  }

  return typeAlias || type;
};

const getEnumNames = (schema) => {
  return schema["x-enumNames"] || schema["xEnumNames"] || schema["x-enumnames"] || schema["x-enum-varnames"];
};

const getInternalSchemaType = (schema) => {
  if (!_.isEmpty(schema.enum) || !_.isEmpty(getEnumNames(schema))) return SCHEMA_TYPES.ENUM;
  if (schema.allOf || schema.oneOf || schema.anyOf || schema.not) return SCHEMA_TYPES.COMPLEX;
  if (!_.isEmpty(schema.properties)) return SCHEMA_TYPES.OBJECT;

  return SCHEMA_TYPES.PRIMITIVE;
};

const isNeedToAddNull = (contract, value) => {
  const { nullable, type } = contract || {};
  return (
    (nullable || !!_.get(contract, "x-nullable") || type === Ts.Keyword.Null) &&
    (!_.isString(value) || (!value.includes(` ${Ts.Keyword.Null}`) && !value.includes(`${Ts.Keyword.Null} `)))
  );
};

const checkAndAddRequiredKeys = (schema, resultType) => {
  if ("$$requiredKeys" in schema && schema.$$requiredKeys.length) {
    config.internalTemplateOptions.addUtilRequiredKeysType = true;
    return Ts.TypeWithGeneric(Ts.CodeGenKeyword.UtilRequiredKeys, [
      resultType,
      Ts.UnionType(schema.$$requiredKeys.map(Ts.StringValue)),
    ]);
  }

  return resultType;
};

const checkAndAddNull = (schema, value) => {
  const { nullable, type } = schema || {};
  return (nullable || !!_.get(schema, "x-nullable") || type === Ts.Keyword.Null) &&
    _.isString(value) &&
    !value.includes(` ${Ts.Keyword.Null}`) &&
    !value.includes(`${Ts.Keyword.Null} `)
    ? Ts.UnionType([value, Ts.Keyword.Null])
    : value;
};

const isRef = (property) => {
  return !!(property && property["$ref"]);
};

const getRefType = (schema) => {
  const ref = schema && schema["$ref"];
  return config.componentsMap[ref] || null;
};

const getType = (schema) => {
  if (!schema) return Ts.Keyword.Any;

  const refTypeInfo = getRefType(schema);

  if (refTypeInfo) {
    return checkAndAddRequiredKeys(schema, checkAndAddNull(schema, formatModelName(refTypeInfo.typeName)));
  }

  const primitiveType = getTypeAlias(schema);
  return primitiveType ? checkAndAddRequiredKeys(schema, checkAndAddNull(schema, primitiveType)) : Ts.Keyword.Any;
};

const isRequired = (property, name, requiredProperties) => {
  if (property["x-omitempty"] === false) {
    return true;
  }

  const isRequired = _.isBoolean(property.required)
    ? !!property.required
    : _.isArray(requiredProperties)
    ? requiredProperties.includes(name)
    : !!requiredProperties;

  if (config.convertedFromSwagger2) {
    return typeof property.nullable === Ts.Keyword.Undefined ? isRequired : !property.nullable;
  }
  return isRequired;
};

const getObjectTypeContent = (schema) => {
  const { properties, additionalProperties, required: requiredProperties } = schema || {};

  const propertiesContent = _.map(properties, (property, name) => {
    const required = isRequired(property, name, requiredProperties);
    const rawTypeData = _.get(getRefType(property), "rawTypeData", {});
    const nullable = !!(rawTypeData.nullable || property.nullable);
    const fieldName = isValidName(name) ? name : Ts.StringValue(name);
    const fieldValue = getInlineParseContent(property);
    const readOnly = property.readOnly;

    return {
      $$raw: property,
      title: property.title,
      description: JsDoc.ObjectFieldDescription({
        ...property,
        description:
          property.description ||
          _.compact(_.map(property[getComplexType(property)], "description"))[0] ||
          rawTypeData.description ||
          _.compact(_.map(rawTypeData[getComplexType(rawTypeData)], "description"))[0] ||
          "",
      }),
      isRequired: required,
      isNullable: nullable,
      name: fieldName,
      value: fieldValue,
      field: Ts.TypeField({
        readonly: readOnly && config.addReadonly,
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
      field: Ts.InterfaceDynamicField(Ts.Keyword.String, Ts.Keyword.Any),
    });
  }

  return propertiesContent;
};

const filterContents = (contents, types) => _.uniq(_.filter(contents, (type) => !_.includes(types, type)));

const makeAddRequiredToChildSchema = (parentSchema, childSchema) => {
  if (!childSchema) return childSchema;

  const required = _.uniq([...(parentSchema.required || []), ...(childSchema.required || [])]);

  const refData = getRefType(childSchema);

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

const complexSchemaParsers = {
  // T1 | T2
  [SCHEMA_TYPES.COMPLEX_ONE_OF]: (schema) => {
    const combined = _.map(schema.oneOf, (childSchema) =>
      getInlineParseContent(makeAddRequiredToChildSchema(schema, childSchema)),
    );
    const filtered = filterContents(combined, [Ts.Keyword.Any]);

    const type = Ts.UnionType(filtered);

    return checkAndAddNull(schema, type);
  },
  // T1 & T2
  [SCHEMA_TYPES.COMPLEX_ALL_OF]: (schema) => {
    const combined = _.map(schema.allOf, (childSchema) =>
      getInlineParseContent(makeAddRequiredToChildSchema(schema, childSchema)),
    );
    const filtered = filterContents(combined, [...JS_PRIMITIVE_TYPES, Ts.Keyword.Any]);

    const type = Ts.IntersectionType(filtered);

    return checkAndAddNull(schema, type);
  },
  // T1 | T2 | (T1 & T2)
  [SCHEMA_TYPES.COMPLEX_ANY_OF]: (schema) => {
    const combined = _.map(schema.anyOf, (childSchema) =>
      getInlineParseContent(makeAddRequiredToChildSchema(schema, childSchema)),
    );
    const filtered = filterContents(combined, [...JS_PRIMITIVE_TYPES, Ts.Keyword.Any]);

    const type = Ts.UnionType(
      _.compact([...filtered, filtered.length > 1 && Ts.ExpressionGroup(Ts.IntersectionType(filtered))]),
    );

    return checkAndAddNull(schema, type);
  },
  // TODO
  [SCHEMA_TYPES.COMPLEX_NOT]: (schema) => {
    // TODO
    return Ts.Keyword.Any;
  },
};

const getComplexType = (schema) => {
  if (schema.oneOf) return SCHEMA_TYPES.COMPLEX_ONE_OF;
  if (schema.allOf) return SCHEMA_TYPES.COMPLEX_ALL_OF;
  if (schema.anyOf) return SCHEMA_TYPES.COMPLEX_ANY_OF;
  // TODO :(
  if (schema.not) return SCHEMA_TYPES.COMPLEX_NOT;

  return SCHEMA_TYPES.COMPLEX_UNKNOWN;
};

const attachParsedRef = (originalSchema, parsedSchema) => {
  const parsedSchemaAfterHook = config.hooks.onParseSchema(originalSchema, parsedSchema) || parsedSchema;

  if (originalSchema) {
    originalSchema.$parsed = parsedSchemaAfterHook;
  }

  return parsedSchemaAfterHook;
};

const schemaParsers = {
  [SCHEMA_TYPES.ENUM]: (schema, typeName) => {
    const refType = getRefType(schema);
    const $ref = (refType && refType.$ref) || null;
    const enumNamesAsValues = config.enumNamesAsValues;
    const keyType = getType(schema);
    const enumNames = getEnumNames(schema);
    const isIntegerOrBooleanEnum = keyType === types.number || keyType === types.boolean;
    let content = null;

    const formatValue = (value) => {
      if (value === null) {
        return Ts.NullValue(value);
      }
      if (keyType === types.number) {
        return Ts.NumberValue(value);
      }
      if (keyType === types.boolean) {
        return Ts.BooleanValue(value);
      }

      return Ts.StringValue(value);
    };

    if (_.isArray(enumNames) && _.size(enumNames)) {
      content = _.map(enumNames, (enumName, index) => {
        const enumValue = _.get(schema.enum, index);
        const formattedKey = (enumName && formatEnumKey(enumName)) || formatEnumKey(enumValue);

        if (enumNamesAsValues || _.isUndefined(enumValue)) {
          return {
            key: formattedKey,
            type: Ts.Keyword.String,
            value: Ts.StringValue(enumName),
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
          key: isIntegerOrBooleanEnum ? key : formatEnumKey(key),
          type: keyType,
          value: formatValue(key),
        };
      });
    }

    return attachParsedRef(schema, {
      ...(_.isObject(schema) ? schema : {}),
      $ref: $ref,
      typeName: typeName || ($ref && refType.typeName) || null,
      $parsedSchema: true,
      schemaType: SCHEMA_TYPES.ENUM,
      type: SCHEMA_TYPES.ENUM,
      keyType: keyType,
      typeIdentifier:
        config.generateUnionEnums || (!enumNames && isIntegerOrBooleanEnum) ? Ts.Keyword.Type : Ts.Keyword.Enum,
      name: typeName,
      description: formatDescription(schema.description),
      content,
    });
  },
  [SCHEMA_TYPES.OBJECT]: (schema, typeName) => {
    const content = getObjectTypeContent(schema);

    return attachParsedRef(schema, {
      ...(isObject(schema) ? schema : {}),
      $parsedSchema: true,
      schemaType: SCHEMA_TYPES.OBJECT,
      type: SCHEMA_TYPES.OBJECT,
      typeIdentifier: Ts.Keyword.Interface,
      name: typeName,
      description: formatDescription(schema.description),
      allFieldsAreOptional: !_.some(_.values(content), (part) => part.isRequired),
      content: content,
    });
  },
  [SCHEMA_TYPES.COMPLEX]: (schema, typeName) => {
    const complexType = getComplexType(schema);
    const simpleSchema = _.omit(_.clone(schema), _.keys(complexSchemaParsers));
    const complexSchemaContent = complexSchemaParsers[complexType](schema);

    return attachParsedRef(schema, {
      ...(isObject(schema) ? schema : {}),
      $parsedSchema: true,
      schemaType: SCHEMA_TYPES.COMPLEX,
      type: SCHEMA_TYPES.PRIMITIVE,
      typeIdentifier: Ts.Keyword.Type,
      name: typeName,
      description: formatDescription(
        schema.description || _.compact(_.map(schema[complexType], "description"))[0] || "",
      ),
      content:
        Ts.IntersectionType(
          _.compact([
            Ts.ExpressionGroup(complexSchemaContent),
            getInternalSchemaType(simpleSchema) === SCHEMA_TYPES.OBJECT &&
              Ts.ExpressionGroup(getInlineParseContent(simpleSchema)),
          ]),
        ) || Ts.Keyword.Any,
    });
  },
  [SCHEMA_TYPES.PRIMITIVE]: (schema, typeName) => {
    let contentType = null;
    const { additionalProperties, type, description, $$requiredKeys } = schema || {};

    if (type === Ts.Keyword.Object && additionalProperties) {
      const fieldType = _.isObject(additionalProperties) ? getInlineParseContent(additionalProperties) : Ts.Keyword.Any;
      contentType = Ts.RecordType(Ts.Keyword.String, fieldType);
    }

    if (_.isArray(type) && type.length) {
      contentType = complexSchemaParsers.oneOf({
        ...(_.isObject(schema) ? schema : {}),
        oneOf: type.map((type) => ({ type })),
      });
    }

    return attachParsedRef(schema, {
      ...(isObject(schema) ? schema : {}),
      $parsedSchema: true,
      schemaType: SCHEMA_TYPES.PRIMITIVE,
      type: SCHEMA_TYPES.PRIMITIVE,
      typeIdentifier: Ts.Keyword.Type,
      name: typeName,
      description: formatDescription(description),
      // TODO: probably it should be refactored. `type === 'null'` is not flexible
      content: type === Ts.Keyword.Null ? type : contentType || getType(schema),
    });
  },
};

const checkAndFixSchema = (schema) => {
  if (schema.items && !schema.type) {
    schema.type = SCHEMA_TYPES.ARRAY;
  }

  return schema;
};

/** @returns {{ type, typeIdentifier, name, description, content }} */
const parseSchema = (rawSchema, typeName, formattersMap) => {
  if (!rawSchema) return schemaParsers.primitive(null, typeName);

  let schemaType = null;
  let parsedSchema = null;

  if (typeof rawSchema === "string") {
    return rawSchema;
  }

  if (rawSchema.$parsed) {
    schemaType = rawSchema.$parsed.schemaType;
    parsedSchema = rawSchema.$parsed;
  } else {
    if (!typeName && isRef(rawSchema)) {
      typeName = getType(rawSchema);
    }

    const fixedRawSchema = checkAndFixSchema(rawSchema);
    schemaType = getInternalSchemaType(fixedRawSchema);
    parsedSchema = schemaParsers[schemaType](fixedRawSchema, typeName);
  }

  return (formattersMap && formattersMap[schemaType] && formattersMap[schemaType](parsedSchema)) || parsedSchema;
};

const parseSchemas = (components) =>
  _.map(_.get(components, "schemas"), (schema, typeName) => parseSchema(schema, typeName));

const getInlineParseContent = (rawTypeData, typeName = null) =>
  parseSchema(rawTypeData, typeName, inlineExtraFormatters).content;

const getParseContent = (rawTypeData, typeName = null) => parseSchema(rawTypeData, typeName).content;

module.exports = {
  types,
  parseSchema,
  parseSchemas,
  getInlineParseContent,
  getParseContent,
  isNeedToAddNull,
  getType,
  getRefType,
  SCHEMA_TYPES,
  checkAndAddNull,
};
