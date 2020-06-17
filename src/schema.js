const _ = require("lodash");
const { inlineExtraFormatters } = require("./typeFormatters");
const { isValidName, checkAndRenameModelName } = require("./modelNames");
const { formatDescription, toInternalCase } = require("./common");
const { DEFAULT_PRIMITIVE_TYPE } = require("./constants");
const { config } = require("./config");

const types = {
  /** { type: "integer" } -> { type: "number" } */
  integer: "number",
  number: "number",
  boolean: "boolean",
  object: "object",
  file: "File",
  string: {
    $default: "string",

    /** formats */
    binary: "File",
  },
  array: ({ items, ...schemaPart }) => {
    const { content } = parseSchema(items, null, inlineExtraFormatters);
    return checkAndAddNull(schemaPart, `(${content})[]`);
  },

  // TODO: probably it can be needed
  // date: "Date",
  // dateTime: "Date",
};

const jsEmptyTypes = _.uniq(["null", "undefined"]);
const formDataTypes = _.uniq([types.file, types.string.binary]);

const getTypeAlias = (rawSchema) => {
  const schema = rawSchema || {};
  const type = toInternalCase(schema.type);
  const format = toInternalCase(schema.format);
  const typeAlias = _.get(types, [type, format]) || _.get(types, [type, "$default"]) || types[type];

  if (_.isFunction(typeAlias)) {
    return typeAlias(schema);
  }

  return typeAlias || type;
};

const getInternalSchemaType = (schema) => {
  if (schema.enum) return "enum";
  if (schema.properties) return "object";
  if (schema.allOf || schema.oneOf || schema.anyOf || schema.not) return "complex";

  return "primitive";
};

const checkAndAddNull = (schema, value) => {
  const { nullable, type } = schema || {};
  return nullable || type === "null" ? `${value} | null` : value;
};

const getRefType = (property) => {
  const ref = property && property["$ref"];
  return (ref && config.componentsMap[ref]) || null;
};

const getType = (schema) => {
  if (!schema) return DEFAULT_PRIMITIVE_TYPE;

  const refTypeInfo = getRefType(schema);

  if (refTypeInfo) {
    return checkAndAddNull(schema, checkAndRenameModelName(refTypeInfo.typeName));
  }

  const primitiveType = getTypeAlias(schema);
  return primitiveType ? checkAndAddNull(schema, primitiveType) : DEFAULT_PRIMITIVE_TYPE;
};

const getObjectTypeContent = (properties) => {
  return _.map(properties, (property, name) => {
    const isRequired = config.convertedFromSwagger2
      ? typeof property.nullable === "undefined"
        ? property.required
        : !property.nullable
      : !!property.required;
    return {
      $$raw: property,
      description: property.description,
      isRequired,
      field: `${isValidName(name) ? name : `"${name}"`}${
        isRequired ? "" : "?"
      }: ${getInlineParseContent(property)}`,
    };
  });
};

const complexTypeGetter = ({ description, ...schema }) => getInlineParseContent(schema);

const complexSchemaParsers = {
  oneOf: (schema) => {
    // T1 | T2
    const combined = _.map(schema.oneOf, complexTypeGetter);
    return checkAndAddNull(schema, combined.join(" | "));
  },
  allOf: (schema) => {
    // T1 & T2
    return checkAndAddNull(schema, _.map(schema.allOf, complexTypeGetter).join(" & "));
  },
  anyOf: (schema) => {
    // T1 | T2 | (T1 & T2)
    const combined = _.map(schema.anyOf, complexTypeGetter);
    const nonEmptyTypesCombined = combined.filter((type) => !jsEmptyTypes.includes(type));
    return checkAndAddNull(
      schema,
      `${combined.join(" | ")}` +
        (nonEmptyTypesCombined.length > 1 ? ` | (${nonEmptyTypesCombined.join(" & ")})` : ""),
    );
  },
  // TODO
  not: (schema) => {
    // TODO
  },
};

const getComplexType = (schema) => {
  if (schema.oneOf) return "oneOf";
  if (schema.allOf) return "allOf";
  if (schema.anyOf) return "anyOf";

  // TODO :(
  if (schema.not) return "not";

  throw new Error("Uknown complex type");
};

const attachParsedRef = (originalSchema, parsedSchema) => {
  if (originalSchema) {
    originalSchema.$parsed = parsedSchema;
  }

  return parsedSchema;
};

const schemaParsers = {
  enum: (schema, typeName) => {
    const type = getType(schema);
    const isIntegerEnum = type === types.number;

    return attachParsedRef(schema, {
      $parsedSchema: true,
      schemaType: "enum",
      type: isIntegerEnum ? "intEnum" : "enum",
      typeIdentifier: isIntegerEnum ? "type" : "enum",
      name: typeName,
      description: formatDescription(schema.description),
      content: _.map(schema.enum, (key) => ({
        key,
        type,
        value: isIntegerEnum ? `${key}` : `"${key}"`,
      })),
    });
  },
  object: (schema, typeName) => {
    if (_.isArray(schema.required) && schema.properties) {
      schema.required.forEach((requiredFieldName) => {
        if (schema.properties[requiredFieldName]) {
          schema.properties[requiredFieldName].required = true;
        }
      });
    }

    const properties = _.get(schema, "properties");
    const typeContent = getObjectTypeContent(properties);

    return attachParsedRef(schema, {
      $parsedSchema: true,
      schemaType: "object",
      type: "object",
      typeIdentifier: "interface",
      name: typeName,
      description: formatDescription(schema.description),
      allFieldsAreOptional: !_.some(_.values(typeContent), (part) => part.isRequired),
      content: typeContent,
    });
  },
  complex: (schema, typeName) => {
    const complexType = getComplexType(schema);

    return attachParsedRef(schema, {
      $parsedSchema: true,
      schemaType: "complex",
      type: "type",
      typeIdentifier: "type",
      name: typeName,
      description: formatDescription(schema.description),
      content: complexSchemaParsers[complexType](schema),
    });
  },
  primitive: (schema, typeName) => {
    let contentType = null;
    const { additionalProperties, type, description } = schema || {};

    if (type === "object" && _.isObject(additionalProperties)) {
      const fieldType = getInlineParseContent(additionalProperties);
      contentType = `Record<string, ${fieldType}>`;
    }

    if (_.isArray(type) && type.length) {
      contentType = complexSchemaParsers.oneOf({
        oneOf: type.map((type) => ({ type })),
        description,
      });
    }

    return attachParsedRef(schema, {
      $parsedSchema: true,
      schemaType: "primitive",
      type: "primitive",
      typeIdentifier: "type",
      name: typeName,
      description: formatDescription(description),
      // TODO: probably it should be refactored. `type === 'null'` is not flexible
      content: type === "null" ? type : contentType || getType(schema),
    });
  },
};

const checkAndFixSchema = (schema) => {
  if (schema.items && !schema.type) {
    schema.type = "array";
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

const getInlineParseContent = (rawTypeData) =>
  parseSchema(rawTypeData, null, inlineExtraFormatters).content;

module.exports = {
  parseSchema,
  parseSchemas,
  getInlineParseContent,
  getType,
  getRefType,
  formDataTypes,
};
