const _ = require("lodash");
const { inlineExtraFormatters } = require("./typeFormatters");
const { isValidName, checkAndRenameModelName } = require("./modelNames");
const { formatDescription } = require("./common");
const { DEFAULT_PRIMITIVE_TYPE } = require("./constants");
const { config } = require("./config");

const jsTypes = ["number", "boolean", "string", "object"];
const jsEmptyTypes = ["null", "undefined"];
const typeAliases = {
  integer: "number",
};

const findSchemaType = schema => {
  if (schema.enum) return "enum";
  if (schema.properties) return "object";
  if (schema.allOf || schema.oneOf || schema.anyOf || schema.not) return "complex";

  return "primitive";
};

const getPrimitiveType = property => {
  const type = _.get(property, "type");
  return typeAliases[type] || type || DEFAULT_PRIMITIVE_TYPE;
};

const specificObjectTypes = {
  array: ({ items }) => {
    const { content, type } = parseSchema(items, null, inlineExtraFormatters);
    return type === "primitive" ? `${content}[]` : `Array<${content}>`;
  },
};

const getRefType = property => {
  const ref = property && property["$ref"];
  return (ref && config.componentsMap[ref]) || null;
};

const getRefTypeName = property => {
  const refTypeInfo = getRefType(property);
  return refTypeInfo && checkAndRenameModelName(refTypeInfo.typeName);
};

const getType = property => {
  if (!property) return DEFAULT_PRIMITIVE_TYPE;

  const anotherTypeGetter = specificObjectTypes[property.type] || getPrimitiveType;
  return getRefTypeName(property) || anotherTypeGetter(property);
};

const getObjectTypeContent = properties => {
  return _.map(properties, (property, name) => {
    // TODO: probably nullable should'n be use as required/no-required conditions
    const isRequired =
      typeof property.nullable === "undefined" ? property.required : !property.nullable;
    return {
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
  oneOf: schema => {
    // T1 | T2
    const combined = _.map(schema.oneOf, complexTypeGetter);
    return combined.join(" | ");
  },
  allOf: schema => {
    // T1 & T2
    return _.map(schema.allOf, complexTypeGetter).join(" & ");
  },
  anyOf: schema => {
    // T1 | T2 | (T1 & T2)
    const combined = _.map(schema.anyOf, complexTypeGetter);
    return `${combined.join(" | ")}` + (combined.length > 1 ? ` | (${combined.join(" & ")})` : "");
  },
  // TODO
  not: schema => {
    // TODO
  },
};

const getComplexType = schema => {
  if (schema.oneOf) return "oneOf";
  if (schema.allOf) return "allOf";
  if (schema.anyOf) return "anyOf";

  // TODO :(
  if (schema.not) return "not";

  throw new Error("Uknown complex type");
};

const schemaParsers = {
  enum: (schema, typeName) => {
    const type = getPrimitiveType(schema);
    const isIntegerEnum = type === "number";
    return {
      $parsedSchema: true,
      schemaType: "enum",
      type: isIntegerEnum ? "intEnum" : "enum",
      typeIdentifier: isIntegerEnum ? "type" : "enum",
      name: typeName,
      description: formatDescription(schema.description),
      content: _.map(schema.enum, key => ({
        key,
        type,
        value: isIntegerEnum ? `${key}` : `"${key}"`,
      })),
    };
  },
  object: (schema, typeName) => {
    if (_.isArray(schema.required) && schema.properties) {
      schema.required.forEach(requiredFieldName => {
        if (schema.properties[requiredFieldName]) {
          schema.properties[requiredFieldName].required = true;
        }
      });
    }

    const properties = _.get(schema, "properties");
    const typeContent = getObjectTypeContent(properties);

    return {
      $parsedSchema: true,
      schemaType: "object",
      type: "object",
      typeIdentifier: "interface",
      name: typeName,
      description: formatDescription(schema.description),
      allFieldsAreOptional: !_.some(_.values(typeContent), part => part.isRequired),
      content: typeContent,
    };
  },
  complex: (schema, typeName) => {
    const complexType = getComplexType(schema);

    return {
      $parsedSchema: true,
      schemaType: "complex",
      type: "type",
      typeIdentifier: "type",
      name: typeName,
      description: formatDescription(schema.description),
      content: complexSchemaParsers[complexType](schema),
    };
  },
  primitive: (schema, typeName) => {
    let contentType = null;
    const { additionalProperties, type, description } = schema || {};

    if (type === "object" && _.isObject(additionalProperties)) {
      const fieldType = getInlineParseContent(additionalProperties);
      contentType = `Record<string, ${fieldType}>`;
    }

    return {
      $parsedSchema: true,
      schemaType: "primitive",
      type: "primitive",
      typeIdentifier: "type",
      name: typeName,
      description: formatDescription(description),
      content: contentType || getType(schema),
    };
  },
};

const checkAndFixSchema = schema => {
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
    console.log("WOW THERE IS STRING", rawSchema);
    return rawSchema;
  }

  if (rawSchema.$parsedSchema) {
    console.log("IT IS ALREADY PARSED SCHEMA", rawSchema);
    schemaType = rawSchema.schemaType;
    parsedSchema = rawSchema;
  } else {
    const fixedRawSchema = checkAndFixSchema(rawSchema);
    schemaType = findSchemaType(fixedRawSchema);
    parsedSchema = schemaParsers[schemaType](fixedRawSchema, typeName);
  }

  return (
    (formattersMap && formattersMap[schemaType] && formattersMap[schemaType](parsedSchema)) ||
    parsedSchema
  );
};

const parseSchemas = components =>
  _.map(_.get(components, "schemas"), (schema, typeName) => parseSchema(schema, typeName));

const getInlineParseContent = rawTypeData =>
  parseSchema(rawTypeData, null, inlineExtraFormatters).content;

module.exports = {
  parseSchema,
  parseSchemas,
  getInlineParseContent,
  getType,
  getRefTypeName,
  getRefType,
};
