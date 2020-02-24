const _ = require("lodash");
const { inlineExtraFormatters } = require("./typeFormatters");
const { isValidName } = require("./modelNames")

const jsTypes = ['number', 'boolean', 'string', 'object'];
const jsEmptyTypes = ['null', 'undefined'];

const findSchemaType = schema => {
  if (!schema) return 'primitive'

  if (schema.enum) return 'enum';
  if (schema.properties) return 'object';
  if (schema.allOf || schema.oneOf || schema.anyOf || schema.not) {
    return 'complex'
  }
  return 'primitive';
}
const typeAliases = {
  "integer": "number",
}

const DEFAULT_PRIMITIVE_TYPE = "any"

const getPrimitiveType = type => typeAliases[type] || type || DEFAULT_PRIMITIVE_TYPE

const specificObjectTypes = {
  'array': ({ items }) => {
    const { content, type } = parseSchema(items, null, inlineExtraFormatters)
    return type === 'primitive' ? `${content}[]` : `Array<${content}>`
  }
}

const getRefType = (property) => {
  if (!property || !property["$ref"]) return null;
  return _.last(_.split(property["$ref"], '/'));
}

const getType = (property) => {
  if (!property) return DEFAULT_PRIMITIVE_TYPE;

  const func = specificObjectTypes[property.type] || (() => getPrimitiveType(property.type))
  return getRefType(property) || func(property)
}
const getObjectTypeContent = (properties) => {
  return _.map(properties, (property, name) => {
    const isRequired = typeof property.nullable === "undefined" ? property.required : !property.nullable
    return {
      description: property.description,
      field: `${isValidName(name) ? name : `"${name}"`}${isRequired ? '' : '?'}: ${parseSchema(property, null, inlineExtraFormatters).content}`,
    }
  })
}


const complexTypeGetter = ({description, ...schema}) => parseSchema(schema, null, inlineExtraFormatters).content

const complexSchemaParsers = {
  'oneOf': (schema) => {
    // T1 | T2
    const combined = _.map(schema.oneOf, complexTypeGetter);
    return combined.join(' | ');
  },
  'allOf': (schema) => {
    // T1 & T2
    return _.map(schema.allOf, complexTypeGetter).join(' & ')
  },
  'anyOf': (schema) => {
    // T1 | T2 | (T1 & T2)
    const combined = _.map(schema.anyOf, complexTypeGetter);
    return `${combined.join(' | ')}` + (combined.length > 1 ? ` | (${combined.join(' & ')})` : '');
  },
  // TODO
  'not': (schema) => {
    // TODO
  }
}

const getComplexType = (schema) => {
  if (schema.oneOf) return 'oneOf';
  if (schema.allOf) return 'allOf';
  if (schema.anyOf) return 'anyOf';
  if (schema.not) return 'not';

  throw new Error("Uknown complex type")
}

const schemaParsers = {
  'enum': (schema, typeName) => {
    const type = getPrimitiveType(schema.type);
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
      description: schema ? schema.description : "",
      content: getType(schema),
    }
  }
}

// { typeIdentifier, name, content }
const parseSchema = (schema, typeName, formattersMap) => {
  if (!schema) {
    return {
      type: 'primitive',
      typeIdentifier: 'type',
      name: typeName,
      description: "",
      content: DEFAULT_PRIMITIVE_TYPE,
    }
  }
  
  const schemaType = findSchemaType(schema);
  const parsedSchema = schemaParsers[schemaType](schema, typeName);
  return (formattersMap && formattersMap[schemaType] && formattersMap[schemaType](parsedSchema)) || parsedSchema
}

module.exports = {
  parseSchema,
  getType,
  getRefType,
  getPrimitiveType,
  DEFAULT_PRIMITIVE_TYPE,
}