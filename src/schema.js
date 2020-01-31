const _ = require("lodash");

const inlineFormatters = {
  'object': (parsedSchema) => {
    return {
      ...parsedSchema,
      typeIdentifier: parsedSchema.content.length ? parsedSchema.typeIdentifier : 'type',
      content: parsedSchema.content.length ? `{ ${parsedSchema.content.join(' ')} }` : 'object'
    }
  },
  'enum': (parsedSchema) => {
    return {
      ...parsedSchema,
      content: _.map(parsedSchema.content, ({ value }) => `${value}`).join(' | ')
    }
  }
}

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
    const { content, type } = parseSchema(items, null, inlineFormatters)
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
    return `${name}${property.nullable ? '?' : ''}: ${parseSchema(property, null, inlineFormatters).content},`
  })
}


const complexTypeGetter = (schema) => parseSchema(schema, null, inlineFormatters).content
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
    const type = getTypeAlias(schema.type);
    const isIntegerEnum = type === "number";
    return {
      type: isIntegerEnum ? "intEnum" : 'enum',
      typeIdentifier: isIntegerEnum ? 'type' : 'enum',
      name: typeName,
      content: _.map(schema.enum, key => ({
        key,
        type,
        value: isIntegerEnum ? `${key}` : `"${key}"`,
      }))
    }
  },
  'object': (schema, typeName) => {

    return {
      type: 'object',
      typeIdentifier: 'interface',
      name: typeName,
      content: getObjectTypeContent(schema.properties)
    }
  },
  'complex': (schema, typeName) => {
    const complexType = getComplexType(schema);
    return {
      type: 'type',
      typeIdentifier: 'type',
      name: typeName,
      content: complexSchemaParsers[complexType](schema),
    }
  },
  'primitive': (schema, typeName) => {
    return {
      type: 'primitive',
      typeIdentifier: 'type',
      name: typeName,
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
  inlineFormatters,
  parseSchema,
  getType,
}