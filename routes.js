const _ = require("lodash");
const { getType } = require("./modelTypes")
// TODO: if false remove security middleware


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

const parseRoutes = (routes) =>
  Object.entries(routes)
    .reduce((routes, [route, requestInfoByMethodsMap]) => {

      return [
      ...routes,
      ..._.map(requestInfoByMethodsMap, ({
        operationId,
        requestBody,
        security,
        parameters,
        tags,
        responses,
      }, method) => {
          const hasSecurity = !!(security && security.length);
          const pathParams = _.filter(parameters, parameter => parameter.in === 'path')

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

          const args = [
            ...(pathParams.map(param => ({
              name: param.name,
              type: getType(param.schema) 
            }))),
            requestBody && {
              name: 'data',
              type: getTypeFromRequestInfo(requestBody),
            },
          ].filter(Boolean)

          const comments = [
            tags && tags.length && `@tags ${tags.join(', ')}`,
            `@name ${operationId}`,
            hasSecurity && `@security true`
          ].filter(Boolean);

          return {
            security: hasSecurity,
            name: _.camelCase(operationId),
            comments,
            args,
            method: _.upperCase(method),
            path: route.replace(/{/g, '${'),
            returnType: getTypeFromRequestInfo(findSuccessResponse(responses)) || 'any',
            bodyArg: requestBody ? 'JSON.stringify(data)' : 'null'
          }})
      ]
    }, [])

module.exports = {
  parseRoutes,
}