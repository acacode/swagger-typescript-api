const _ = require("lodash");
const { inlineExtraFormatters } = require("./typeFormatters");

const findSchemaType = schema => {
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
const getTypeAlias = type => typeAliases[type] || type || 'any'

const specificObjectTypes = {
  'array': ({ items }) => {
    const { content, type } = parseSchema(items, null, inlineExtraFormatters)
    return type === 'primitive' ? `${content}[]` : `Array<${content}>`
  }
}
const getRefType = (ref) => _.last(_.split(ref, '/'))
const getType = (property) => {
  const func = specificObjectTypes[property.type] || (() => getTypeAlias(property.type))
  return property["$ref"] ? getRefType(property["$ref"]) : func(property)
}
const getObjectTypeContent = (properties) => {
  return _.map(properties, (property, name) => {
    const isRequired = typeof property.nullable === "undefined" ? property.required : !property.nullable
    return {
      description: property.description,
      field: `${name}${isRequired ? '' : '?'}: ${parseSchema(property, null, inlineExtraFormatters).content}`,
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
    // const { description, }
    return _.map(schema.allOf, complexTypeGetter).join(' & ')
  },
  'anyOf': (schema) => {
    // T1 | T2 | (T1 & T2)
    const combined = _.map(schema.anyOf, complexTypeGetter);
    return `${combined.join(' | ')}` + (combined.length > 1 ? ` | (${combined.join(' & ')})` : '');
  },
  // TODO
  // 'not': (schema) => {
  //   // TODO
  // }
}

const getComplexType = (schema) => {
  if (schema.oneOf) return 'oneOf';
  if (schema.allOf) return 'allOf';
  if (schema.anyOf) return 'anyOf';
  // if (schema.not) return 'not';
}

const schemaParsers = {
  'enum': (schema, typeName) => {
    const type = getTypeAlias(schema.type);
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

// { typeIdentifier, name, content }[]
const parseSchema = (schema, typeName, formattersMap) => {
  const schemaType = findSchemaType(schema);
  const parsedSchema = schemaParsers[schemaType](schema, typeName);
  return (formattersMap && formattersMap[schemaType] && formattersMap[schemaType](parsedSchema)) || parsedSchema
}

module.exports = {
  parseSchema,
  getType,
}