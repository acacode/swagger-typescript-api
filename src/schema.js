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
  file: "File",
};

const findSchemaType = (schema) => {
  if (schema.enum) return "enum";
  if (schema.properties) return "object";
  if (schema.allOf || schema.oneOf || schema.anyOf || schema.not) return "complex";

  return "primitive";
};

const nullableExtras = (schema, value) => {
  const { nullable, type } = schema || {};
  return nullable || type === "null" ? `${value} | null` : value;
};

const getPrimitiveType = (property) => {
  const { type } = property || {};
  const primitiveType = typeAliases[type] || type;
  return primitiveType ? nullableExtras(property, primitiveType) : DEFAULT_PRIMITIVE_TYPE;
};

const specificObjectTypes = {
  array: ({ items, ...schemaPart }) => {
    const { content, type } = parseSchema(items, null, inlineExtraFormatters);
    return nullableExtras(schemaPart, type === "primitive" ? `${content}[]` : `Array<${content}>`);
  },
};

const getRefType = (property) => {
  const ref = property && property["$ref"];
  return (ref && config.componentsMap[ref]) || null;
};

const getRefTypeName = (property) => {
  const refTypeInfo = getRefType(property);
  return refTypeInfo && checkAndRenameModelName(refTypeInfo.typeName);
};

const getType = (property) => {
  if (!property) return DEFAULT_PRIMITIVE_TYPE;

  const anotherTypeGetter = specificObjectTypes[property.type] || getPrimitiveType;
  const refType = getRefTypeName(property);
  return refType ? nullableExtras(property, refType) : anotherTypeGetter(property);
};

const getObjectTypeContent = (properties) => {
  return _.map(properties, (property, name) => {
    const isRequired = config.convertedFromSwagger2
      ? typeof property.nullable === "undefined"
        ? property.required
        : !property.nullable
      : !!property.required;
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
  oneOf: (schema) => {
    // T1 | T2
    const combined = _.map(schema.oneOf, complexTypeGetter);
    return nullableExtras(schema, combined.join(" | "));
  },
  allOf: (schema) => {
    // T1 & T2
    return nullableExtras(schema, _.map(schema.allOf, complexTypeGetter).join(" & "));
  },
  anyOf: (schema) => {
    // T1 | T2 | (T1 & T2)
    const combined = _.map(schema.anyOf, complexTypeGetter);
    const nonEmptyTypesCombined = combined.filter((type) => !jsEmptyTypes.includes(type));
    return nullableExtras(
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
      content: _.map(schema.enum, (key) => ({
        key,
        type,
        value: isIntegerEnum ? `${key}` : `"${key}"`,
      })),
    };
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

    return {
      $parsedSchema: true,
      schemaType: "object",
      type: "object",
      typeIdentifier: "interface",
      name: typeName,
      description: formatDescription(schema.description),
      allFieldsAreOptional: !_.some(_.values(typeContent), (part) => part.isRequired),
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
      // TODO: probably it should be refactored. `type === 'null'` is not flexible
      content: type === "null" ? type : contentType || getType(schema),
    };
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

  if (rawSchema.$parsedSchema) {
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

const parseSchemas = (components) =>
  _.map(_.get(components, "schemas"), (schema, typeName) => parseSchema(schema, typeName));

const getInlineParseContent = (rawTypeData) =>
  parseSchema(rawTypeData, null, inlineExtraFormatters).content;

module.exports = {
  parseSchema,
  parseSchemas,
  getInlineParseContent,
  getType,
  getRefTypeName,
  getRefType,
};
