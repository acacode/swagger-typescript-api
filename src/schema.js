const _ = require("lodash");
const { inlineExtraFormatters } = require("./typeFormatters");
const { isValidName, checkAndRenameModelName } = require("./modelNames");
const { formatDescription, internalCase } = require("./common");
const { JS_PRIMITIVE_TYPES, JS_EMPTY_TYPES, TS_KEYWORDS, SCHEMA_TYPES } = require("./constants");
const { config } = require("./config");
const { isObject } = require("lodash");

const types = {
  /** { type: "integer" } -> { type: "number" } */
  integer: TS_KEYWORDS.NUMBER,
  number: TS_KEYWORDS.NUMBER,
  boolean: TS_KEYWORDS.BOOLEAN,
  object: TS_KEYWORDS.OBJECT,
  file: TS_KEYWORDS.FILE,
  string: {
    $default: TS_KEYWORDS.STRING,

    /** formats */
    binary: TS_KEYWORDS.FILE,
  },
  array: ({ items, ...schemaPart }) => {
    const content = getInlineParseContent(items);
    return checkAndAddNull(schemaPart, `(${content})[]`);
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
    if (enumFieldType === TS_KEYWORDS.UNDEFINED) return;

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
  return schema["x-enumNames"] || schema["xEnumNames"] || schema["x-enumnames"];
};

const getInternalSchemaType = (schema) => {
  if (!_.isEmpty(schema.enum) || !_.isEmpty(getEnumNames(schema))) return SCHEMA_TYPES.ENUM;
  if (schema.allOf || schema.oneOf || schema.anyOf || schema.not) return SCHEMA_TYPES.COMPLEX;
  if (!_.isEmpty(schema.properties)) return SCHEMA_TYPES.OBJECT;

  return SCHEMA_TYPES.PRIMITIVE;
};

const checkAndAddNull = (schema, value) => {
  const { nullable, type } = schema || {};
  return (nullable || !!_.get(schema, "x-nullable") || type === TS_KEYWORDS.NULL) &&
    _.isString(value) &&
    !value.includes(` ${TS_KEYWORDS.NULL}`) &&
    !value.includes(`${TS_KEYWORDS.NULL} `)
    ? `${value} | ${TS_KEYWORDS.NULL}`
    : value;
};

const getRefType = (property) => {
  const ref = property && property["$ref"];
  return (ref && config.componentsMap[ref]) || null;
};

const getType = (schema) => {
  if (!schema) return TS_KEYWORDS.ANY;

  const refTypeInfo = getRefType(schema);

  if (refTypeInfo) {
    return checkAndAddNull(schema, checkAndRenameModelName(refTypeInfo.typeName));
  }

  const primitiveType = getTypeAlias(schema);
  return primitiveType ? checkAndAddNull(schema, primitiveType) : TS_KEYWORDS.ANY;
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
    return typeof property.nullable === TS_KEYWORDS.UNDEFINED ? isRequired : !property.nullable;
  }
  return isRequired;
};

const getObjectTypeContent = (schema) => {
  const { properties, additionalProperties, required: requiredProperties } = schema || {};

  const propertiesContent = _.map(properties, (property, name) => {
    const required = isRequired(property, name, requiredProperties);
    const rawTypeData = _.get(getRefType(property), "rawTypeData", {});
    const nullable = !!(rawTypeData.nullable || property.nullable);

    return {
      $$raw: property,
      description: _.compact([
        property.description ||
          rawTypeData.description ||
          _.compact(_.map(rawTypeData.allOf, "description"))[0] ||
          _.compact(_.map(rawTypeData.oneOf, "description"))[0] ||
          _.compact(_.map(rawTypeData.anyOf, "description"))[0] ||
          "",
        !_.isUndefined(property.format) && `@format ${property.format}`,
        !_.isUndefined(property.minimum) && `@min ${property.minimum}`,
        !_.isUndefined(property.maximum) && `@max ${property.maximum}`,
        !_.isUndefined(property.pattern) && `@pattern ${property.pattern}`,
        !_.isUndefined(property.example) &&
          `@example ${
            _.isObject(property.example) ? JSON.stringify(property.example) : property.example
          }`,
      ]).join("\n"),
      isRequired: required,
      isNullable: nullable,
      field: _.compact([
        isValidName(name) ? name : `"${name}"`,
        !required && "?",
        ": ",
        getInlineParseContent(property),
      ]).join(""),
    };
  });

  if (additionalProperties === true) {
    propertiesContent.push({
      $$raw: { additionalProperties },
      description: "",
      isRequired: false,
      field: `[key: ${TS_KEYWORDS.STRING}]: ${TS_KEYWORDS.ANY}`,
    });
  }

  return propertiesContent;
};

const complexTypeGetter = ({ description, ...schema }) => getInlineParseContent(schema);

const complexSchemaParsers = {
  [SCHEMA_TYPES.COMPLEX_ONE_OF]: (schema) => {
    // T1 | T2
    const combined = _.map(schema.oneOf, complexTypeGetter);
    return checkAndAddNull(schema, combined.join(" | "));
  },
  [SCHEMA_TYPES.COMPLEX_ALL_OF]: (schema) => {
    // T1 & T2
    return checkAndAddNull(schema, _.map(schema.allOf, complexTypeGetter).join(" & "));
  },
  [SCHEMA_TYPES.COMPLEX_ANY_OF]: (schema) => {
    // T1 | T2 | (T1 & T2)
    const combined = _.map(schema.anyOf, complexTypeGetter);
    const nonEmptyTypesCombined = combined.filter(
      (type) => !JS_EMPTY_TYPES.includes(type) && !JS_PRIMITIVE_TYPES.includes(type),
    );
    return checkAndAddNull(
      schema,
      `${combined.join(" | ")}` +
        (nonEmptyTypesCombined.length > 1 ? ` | (${nonEmptyTypesCombined.join(" & ")})` : ""),
    );
  },
  // TODO
  [SCHEMA_TYPES.COMPLEX_NOT_OF]: (schema) => {
    // TODO
    return TS_KEYWORDS.ANY;
  },
};

const getComplexType = (schema) => {
  if (schema.oneOf) return SCHEMA_TYPES.COMPLEX_ONE_OF;
  if (schema.allOf) return SCHEMA_TYPES.COMPLEX_ALL_OF;
  if (schema.anyOf) return SCHEMA_TYPES.COMPLEX_ANY_OF;
  // TODO :(
  if (schema.not) return SCHEMA_TYPES.COMPLEX_NOT;

  throw new Error("Unknown complex type");
};

const attachParsedRef = (originalSchema, parsedSchema) => {
  const parsedSchemaAfterHook =
    config.hooks.onParseSchema(originalSchema, parsedSchema) || parsedSchema;

  if (originalSchema) {
    originalSchema.$parsed = parsedSchemaAfterHook;
  }

  return parsedSchemaAfterHook;
};

const schemaParsers = {
  [SCHEMA_TYPES.ENUM]: (schema, typeName) => {
    const enumNamesAsValues = config.enumNamesAsValues;
    const keyType = getType(schema);
    const enumNames = getEnumNames(schema);
    const isIntegerEnum = keyType === types.number;
    let content = null;

    if (enumNamesAsValues && _.size(enumNames)) {
      content = _.map(enumNames, (enumName, index) => ({
        key: checkAndRenameModelName(enumName),
        type: TS_KEYWORDS.STRING,
        value: `"${enumName}"`,
      }));
    } else if (_.size(enumNames) > _.size(schema.enum)) {
      content = _.map(enumNames, (enumName, index) => ({
        key:
          (enumNames && enumNames[index]) ||
          (isIntegerEnum ? enumName : checkAndRenameModelName(enumName)),
        type: keyType,
        value: enumName === null ? enumName : isIntegerEnum ? `${enumName}` : `"${enumName}"`,
      }));
    } else {
      content = _.map(schema.enum, (key, index) => {
        const enumName = enumNames && enumNames[index];

        return {
          key: enumName || (isIntegerEnum ? key : checkAndRenameModelName(key)),
          type: keyType,
          value: key === null ? key : isIntegerEnum ? `${key}` : `"${key}"`,
        };
      });
    }

    return attachParsedRef(schema, {
      ...(_.isObject(schema) ? schema : {}),
      $parsedSchema: true,
      schemaType: SCHEMA_TYPES.ENUM,
      type: SCHEMA_TYPES.ENUM,
      keyType: keyType,
      typeIdentifier: !enumNames && isIntegerEnum ? TS_KEYWORDS.TYPE : TS_KEYWORDS.ENUM,
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
      typeIdentifier: TS_KEYWORDS.INTERFACE,
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
      typeIdentifier: TS_KEYWORDS.TYPE,
      name: typeName,
      description: formatDescription(schema.description),
      content:
        _.compact([
          complexSchemaContent && `(${complexSchemaContent})`,
          getInternalSchemaType(simpleSchema) === TS_KEYWORDS.OBJECT &&
            getInlineParseContent(simpleSchema),
        ]).join(" & ") || TS_KEYWORDS.ANY,
    });
  },
  [SCHEMA_TYPES.PRIMITIVE]: (schema, typeName) => {
    let contentType = null;
    const { additionalProperties, type, description } = schema || {};

    if (type === TS_KEYWORDS.OBJECT && additionalProperties) {
      const fieldType = _.isObject(additionalProperties)
        ? getInlineParseContent(additionalProperties)
        : TS_KEYWORDS.ANY;
      contentType = `Record<${TS_KEYWORDS.STRING}, ${fieldType}>`;
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
      typeIdentifier: TS_KEYWORDS.TYPE,
      name: typeName,
      description: formatDescription(description),
      // TODO: probably it should be refactored. `type === 'null'` is not flexible
      content: type === TS_KEYWORDS.NULL ? type : contentType || getType(schema),
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
    const fixedRawSchema = checkAndFixSchema(rawSchema);
    schemaType = getInternalSchemaType(fixedRawSchema);
    parsedSchema = schemaParsers[schemaType](fixedRawSchema, typeName);
  }

  return (
    (formattersMap && formattersMap[schemaType] && formattersMap[schemaType](parsedSchema)) ||
    parsedSchema
  );
};

const parseSchemas = (components) =>
  _.map(_.get(components, "schemas"), (schema, typeName) => parseSchema(schema, typeName));

const getInlineParseContent = (rawTypeData, typeName = null) =>
  parseSchema(rawTypeData, typeName, inlineExtraFormatters).content;

const getParseContent = (rawTypeData, typeName = null) =>
  parseSchema(rawTypeData, typeName).content;

module.exports = {
  types,
  parseSchema,
  parseSchemas,
  getInlineParseContent,
  getParseContent,
  getType,
  getRefType,
  SCHEMA_TYPES,
  checkAndAddNull,
};
