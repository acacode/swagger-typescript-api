const fs = require("fs");
const ts = require("typescript");
const _ = require("lodash");
const { info, paths, servers, components } = require('./swagger.json');

const getTypeNameFromRef = (ref) => _.last(_.split(ref, '/'))

const getEnumTypeProps = (_enum) => {
  return _enum.map(key => `  ${key} = "${key}"`).join(',\n')
}

const specificObjectTypes = {
  'array': ({ items }) => {
    switch(true) {
      case (!!items.type): return `${items.type}[]`;
      case (!!items.$ref): return `${getTypeNameFromRef(items.$ref)}[]`;
      default: return `any[]`
    }
  }
}

const getType = (property) => {
  const func = specificObjectTypes[property.type] || (() => property.type)
  return property["$ref"] ? getTypeNameFromRef(property["$ref"]) : func(property)
}

const getObjectTypeProps = (properties) => {
  return _.map(properties, (property, name) => {
    return `  ${name}${property.nullable ? '?' : ''}:${getType(property)},\n`
  }).join('')
}

const parseSchema = ({ properties, type, enum: _enum }, typeName) => {

  const typeContent =
    _enum ? getEnumTypeProps(_enum) :
    properties ? getObjectTypeProps(properties) : type
  const getTypeData = {
    ['enum']: `enum ${typeName} {\r\n${typeContent} \r\n }`,
    ['type']: `type ${typeName} = {\r\n${typeContent}}`
  }


  return `export ${getTypeData[_enum ? 'enum' : 'type']}\n`
}


const SchemasTypes = _.map(components.schemas, (schema, typeName) => {

  return parseSchema(schema, typeName)
}).join('')

const server = servers[0]

let Types = `
${SchemasTypes}

export type ApiParams = Omit<RequestInit, "body" | "method">

type ApiConfig<SecurityDataType> = {
  baseUrl?: string,
  securityWorker?: (securityData: SecurityDataType) => ApiParams
}

`

const ApiProperties = `
  public baseUrl = "${server.url}";
  public title = "${info.title}";
  public version = "${info.version}";
  
  private securityData: SecurityDataType;
  private securityWorker: ApiConfig<SecurityDataType>["securityWorker"] = (() => {}) as any
  private defaultRequestParams: ApiParams = {
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  }
`

const getTypeFromRequestInfo = requestInfo => {

  const schema = _.get(requestInfo, 'content["application/json"].schema')
  if (schema) {
    return getType(schema);
  }

  return 'any';
}

const findSuccessResponse = (responses) => {
  return _.find(responses, (v, status) => +status >= 200 && +status < 300)
}

const routesByTags = Object.entries(paths)
  .reduce((routes, [route, requestInfoByMethodsMap]) => {

    return routes +
    _.map(requestInfoByMethodsMap, ({
      operationId,
      requestBody,
      security,
      parameters,
      tags,
      responses,
    }, method) => {
        const hasSecurity = !!security.length
        const hasParameters = parameters && parameters.length;
        const args = [
          ...(hasParameters ? parameters.map(param => param.in === 'path' && `${param.name}: ${param.schema.type}`) : []),
          requestBody ? `data: ${getTypeFromRequestInfo(requestBody)}` : '',
          'params: ApiParams = {}'
        ].filter(Boolean)
        const successResponse = findSuccessResponse(responses);

        const comments = [
          tags && tags.length && `@tags ${tags.join(', ')}`,
          `@name ${operationId}`,
          hasSecurity ? `@security true` : ''
        ].filter(Boolean).map(c => '   * ' + c).join('\r\n');
        return `

  /**
${comments}
   */
  ${_.camelCase(operationId)} = (${args.join(', ')}): Promise<${getTypeFromRequestInfo(successResponse)}> =>
    fetch(\`\${this.baseUrl}${route.replace(/{/g, '${')}\`, {
      ...this.defaultRequestParams,
      method: '${_.upperCase(method)}',
      body: ${requestBody ? 'JSON.stringify(data)' : 'null'},
      ...params,${hasSecurity ? '\r\n      ...(this.securityWorker(this.securityData))' : ''}
    }).then(response => response.json()) 
    `}).join('')
  }, '')


const sourceFile = `
${Types}

export class Api<SecurityDataType> {
  ${ApiProperties}
  constructor({ securityWorker, baseUrl }: ApiConfig<SecurityDataType> = {}) {
    this.baseUrl = baseUrl || this.baseUrl;
    this.securityWorker = securityWorker || this.securityWorker;
  }
  public setSecurityData = (data: SecurityDataType) => {
    this.securityData = data
  }

  ${routesByTags}
}
`

fs.writeFile("api.ts", sourceFile, () => {

})

// const program = require('commander');
 
// program
//   .option('-o, --output', 'output folder')
//   .option('-p, --path <path>', 'path to swagger.json');