const _ = require("lodash");
const { inlineExtraFormatters } = require("./typeFormatters");
const { isValidName } = require("./modelNames");
const { checkAndRenameModelName } = require("./modelNames");
const { config } = require("./config");


const jsTypes = ['number', 'boolean', 'string', 'object'];
const jsEmptyTypes = ['null', 'undefined'];
const typeAliases = {
  "integer": "number",
}

const findSchemaType = schema => {
  if (schema.enum)
    return 'enum';
  if (schema.properties)
    return 'object';
  if (schema.allOf || schema.oneOf || schema.anyOf || schema.not)
    return 'complex';

  return 'primitive';
}

const getPrimitiveType = property => {
  const type = _.get(property, "type")
  return typeAliases[type] || type || 'any'
}

const specificObjectTypes = {
  'array': ({ items }) => {
    const { content, type } = parseSchema(items, null, inlineExtraFormatters)
    return type === 'primitive' ? `${content}[]` : `Array<${content}>`
  }
}

const getRefType = property => {
  const ref = property && property["$ref"]
  return (ref && config.componentsMap[ref]) || null;
}

const getRefTypeName = property => {
  const refTypeInfo = getRefType(property);
  return refTypeInfo && checkAndRenameModelName(refTypeInfo.typeName);
}

const getType = property => {
  const anotherTypeGetter = specificObjectTypes[property.type] || getPrimitiveType
  return getRefTypeName(property) || anotherTypeGetter(property)
}

const getObjectTypeContent = properties => {
  return _.map(properties, (property, name) => {
    // TODO: probably nullable should'n be use as required/no-required conditions
    const isRequired = typeof property.nullable === "undefined" ? property.required : !property.nullable
    return {
      description: property.description,
      field: `${isValidName(name) ? name : `"${name}"`}${isRequired ? '' : '?'}: ${getInlineParseContent(property)}`,
    }
  })
}

const complexTypeGetter = ({ description, ...schema }) => getInlineParseContent(schema)

const complexSchemaParsers = {
  'oneOf': schema => {
    // T1 | T2
    const combined = _.map(schema.oneOf, complexTypeGetter);
    return combined.join(' | ');
  },
  'allOf': schema => {
    // T1 & T2
    return _.map(schema.allOf, complexTypeGetter).join(' & ')
  },
  'anyOf': schema => {
    // T1 | T2 | (T1 & T2)
    const combined = _.map(schema.anyOf, complexTypeGetter);
    return `${combined.join(' | ')}` + (combined.length > 1 ? ` | (${combined.join(' & ')})` : '');
  },
  // TODO
  'not': schema => {
    // TODO
  }
}

const getComplexType = schema => {
  if (schema.oneOf) return 'oneOf';
  if (schema.allOf) return 'allOf';
  if (schema.anyOf) return 'anyOf';

  // TODO :(
  if (schema.not) return 'not';

  throw new Error("Uknown complex type")
}

const schemaParsers = {
  'enum': (schema, typeName) => {
    const type = getPrimitiveType(schema);
    const isIntegerEnum = type === "number";
    return {
      type: isIntegerEnum ? "intEnum" : 'enum',
      typeIdentifier: isIntegerEnum ? 'type' : 'enum',
      name: typeName,
      description: schema.description,
      content: _.map(schema.enum, key => ({
        key,
        type,
        value: isIntegerEnum ? `${key}` : `"${key}"`,
      }))
    }
  },
  'object': (schema, typeName) => {
    if (_.isArray(schema.required) && schema.properties) {
      schema.required.forEach(requiredFieldName => {
        if (schema.properties[requiredFieldName]) {
          schema.properties[requiredFieldName].required = true
        }
      })
    }

    return {
      type: 'object',
      typeIdentifier: 'interface',
      name: typeName,
      description: schema.description,
      content: getObjectTypeContent(schema.properties)
    }
  },
  'complex': (schema, typeName) => {
    const complexType = getComplexType(schema);

    return {
      type: 'type',
      typeIdentifier: 'type',
      name: typeName,
      description: schema.description,
      content: complexSchemaParsers[complexType](schema),
    }
  },
  'primitive': (schema, typeName) => {
    return {
      type: 'primitive',
      typeIdentifier: 'type',
      name: typeName,
      description: schema.description,
      content: getType(schema),
    }
  }
}

/** @returns {{ type, typeIdentifier, name, description, content }} */
const parseSchema = (rawTypeData, typeName, formattersMap) => {
  const schemaType = findSchemaType(rawTypeData);
  const parsedSchema = schemaParsers[schemaType](rawTypeData, typeName);
  return (formattersMap && formattersMap[schemaType] && formattersMap[schemaType](parsedSchema)) || parsedSchema
}

const parseSchemas = components =>
  _.map(_.get(components, "schemas"), (schema, typeName) => parseSchema(schema, typeName))

const getInlineParseContent = rawTypeData =>
  parseSchema(rawTypeData, null, inlineExtraFormatters).content

module.exports = {
  parseSchema,
  parseSchemas,
  getInlineParseContent,
  getType,
  getRefTypeName,
  getRefType,
}