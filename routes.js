const _ = require("lodash");
const { getType, parseSchema, inlineFormatters } = require("./schema")

const getTypeFromRequestInfo = (requestInfo, parsedSchemas) => {
  const schema = _.get(requestInfo, 'content["application/json"].schema');

  if (schema) {
    const extractedSchema = _.get(schema, 'additionalProperties', schema);
    const { content } = parseSchema(extractedSchema, 'none')
    const foundSchema = _.find(parsedSchemas, parsedSchema => parsedSchema.content === content)
    return foundSchema ? foundSchema.name : content;
  }

  return 'any';
}

const findSuccessResponse = (responses) => {
  return _.find(responses, (v, status) => +status >= 200 && +status < 300)
}

const createQueryInlineType = (queryParams) => {}


const parseRoutes = (routes, parsedSchemas) =>
  Object.entries(routes)
    .reduce((routes, [route, requestInfoByMethodsMap]) => {
      return [
      ...routes,
      ..._.map(requestInfoByMethodsMap, ({
        operationId,
        requestBody,
        security,
        parameters,
        summary,
        description,
        tags,
        responses,
      }, method) => {
          const hasSecurity = !!(security && security.length);
          const pathParams = _.filter(parameters, parameter => parameter.in === 'path');
          const moduleName = _.camelCase(route.split('/').filter(Boolean)[0])

          /*
          TODO:
          {
						"name": "callbackUrl",
						"in": "query",
						"required": true,
						"description": "the location where data will be sent.  Must be network accessible\nby the source server\n",
						"schema": {
							"type": "string",
							"format": "uri",
							"example": "https://tonys-server.com"
						}
					}[]
          */
          const queryParams = _.filter(parameters, parameter => parameter.in === 'query')

          const queryObjectSchema = queryParams.length && queryParams.reduce((objectSchema, queryPartSchema) => {
            if (queryPartSchema.schema && queryPartSchema.name) {
              objectSchema.properties[queryPartSchema.name] = queryPartSchema.schema
            }
            return objectSchema;
          }, {
            properties: {},
            type: 'object',
          })

          const args = [
            ...(pathParams.map(param => ({
              name: param.name,
              type: parseSchema(param.schema, null, inlineFormatters).content
            }))),
            queryParams.length && {
              name: 'query',
              type: parseSchema(queryObjectSchema, null, inlineFormatters).content,
            },
            requestBody && {
              name: 'data',
              type: getTypeFromRequestInfo(requestBody, parsedSchemas),
            },
          ].filter(Boolean)

          const comments = [
            tags && tags.length && `@tags ${tags.join(', ')}`,
            `@name ${operationId}`,
            (summary || description) && `@description ${_.replace(summary || description, /\n/g, '')}`,
            `@request ${_.upperCase(method)}:${route}`,
            hasSecurity && `@security true`
          ].filter(Boolean);

          return {
            moduleName,
            security: hasSecurity,
            hasQuery: !!queryParams.length,
            name: _.camelCase(operationId),
            comments,
            args,
            method: _.upperCase(method),
            path: route.replace(/{/g, '${'),
            returnType: getTypeFromRequestInfo(findSuccessResponse(responses), parsedSchemas) || 'any',
            bodyArg: requestBody ? 'data' : 'null'
          }})
      ]
    }, [])


const groupRoutes = routes => {
  return _.reduce(routes.reduce((modules, route) => {
    
    if (route.moduleName) {
      if (!modules[route.moduleName]) {
        modules[route.moduleName] = []
      }
      
      modules[route.moduleName].push(route)
    } else {
      modules.$outOfModule.push(route)
    }

    return modules
  }, {
    $outOfModule: []
  }), (shuffle, packRoutes, moduleName) => {


    if (moduleName === "$outOfModule") {
      shuffle['outOfModule'] = packRoutes
    } else {
      if (!shuffle.combined) shuffle.combined = []

      shuffle.combined.push({
        moduleName,
        routes: packRoutes,
      })
    }

    return shuffle;
  }, {})
}

module.exports = {
  parseRoutes,
  groupRoutes,
}