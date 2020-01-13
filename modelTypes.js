const _ = require("lodash");

const jsTypes = ['number', 'string', 'object', 'boolean']

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
const specificObjectTypes = {
  'array': ({ items }) => {
    switch(true) {
      case (!!items.type): return `${items.type}[]`;
      case (!!items.$ref): return `${getRefType(items.$ref)}[]`;
      default: return `any[]`
    }
  }
}
const getRefType = (ref) => _.last(_.split(ref, '/'))
const getType = (property) => {
  const func = specificObjectTypes[property.type] || (() => typeAliases[property.type] || property.type)
  return property["$ref"] ? getRefType(property["$ref"]) : func(property)
}
const getEnumTypeContent = (_enum) => _enum.map(key => `  ${key} = \"${key}"`).join(',\n')
const getObjectTypeContent = (properties) => {
  return _.map(properties, (property, name) => {
    return `${name}${property.nullable ? '?' : ''}:${getType(property)},`
  })
}


const complexTypeGetter = (schema) => {
  const schemaType = findSchemaType(schema);
  switch (schemaType) {
    case 'object': return `{ ${getObjectTypeContent(schema.properties).join('')} }`
    default: return getType(schema);
  }
}
const complexSchemaParsers = {
  'oneOf': (schema) => {
    // T1 | T2
    const combined = _.map(schema.allOf, complexTypeGetter);
    return combined.join(' | ');
  },
  'allOf': (schema) => {
    // T1 & T2
    return _.map(schema.allOf, complexTypeGetter).join(' & ')
  },
  'anyOf': (schema) => {
    // T1 | T2 | (T1 & T2)
    const combined = _.map(schema.allOf, complexTypeGetter);
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
    return {
      typeIdentifier: 'enum',
      name: typeName,
      content: `{\r\n${getEnumTypeContent(schema.enum)} \r\n }`
    }
  },
  'object': (schema, typeName) => {

    return {
      typeIdentifier: 'interface',
      name: typeName,
      content: `{\r\n${getObjectTypeContent(schema.properties).map(contentPart => `  ${contentPart}\n`).join('')}}`
    }
  },
  'complex': (schema, typeName) => {
    const complexType = getComplexType(schema);
    return {
      typeIdentifier: 'type',
      name: typeName,
      content: ` = ${complexSchemaParsers[complexType](schema)}`,
    }
  },
  'primitive': (schema, typeName) => {
    return {
      typeIdentifier: 'type',
      name: typeName,
      content: ` = ${getType(schema)}`,
    }
  }
}

// { typeIdentifier, name, content }[]
const parseSchema = (schema, typeName) => {
  const schemaType = findSchemaType(schema);
  return schemaParsers[schemaType](schema, typeName);
}

module.exports = {
  parseSchema,
  getType,
}