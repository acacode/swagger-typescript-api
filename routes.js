const _ = require("lodash");
const { getType } = require("./modelTypes")
// TODO: if false remove security middleware


const getTypeFromRequestInfo = requestInfo => {
  const schema = _.get(requestInfo, 'content["application/json"].schema')
  if (schema) {
    return getType(_.get(schema, 'additionalProperties', schema));
  }

  return 'any';
}

const findSuccessResponse = (responses) => {
  return _.find(responses, (v, status) => +status >= 200 && +status < 300)
}

const createQueryInlineType = (queryParams) => {

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
            (summary || description) && `@description ${_.replace(summary || description, /\n/g, '')}`,
            hasSecurity && `@security true`
          ].filter(Boolean);

          return {
            moduleName,
            security: hasSecurity,
            name: _.camelCase(operationId),
            comments,
            args,
            method: _.upperCase(method),
            path: route.replace(/{/g, '${'),
            returnType: getTypeFromRequestInfo(findSuccessResponse(responses)) || 'any',
            bodyArg: requestBody ? 'data' : 'null'
          }})
      ]
    }, [])

module.exports = {
  parseRoutes,
}