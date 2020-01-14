const _ = require("lodash");
const { getType, parseSchema, inlineFormatters } = require("./schema")

const getTypeFromRequestInfo = (requestInfo, parsedSchemas) => {
  const schema = _.get(requestInfo, 'content["application/json"].schema');

  if (schema) {
    const extractedSchema = _.get(schema, 'additionalProperties', schema);
    const { content } = parseSchema(extractedSchema, 'none', inlineFormatters)
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
      parameters = _.get(requestInfoByMethodsMap, 'parameters');
      requestInfoByMethodsMap = _.reduce(
        _.omit(requestInfoByMethodsMap, "parameters"),
        (acc, requestInfo, method) => {
          acc[method] = {
            ...requestInfo,
            parameters: _.concat(parameters, requestInfo.parameters).filter(Boolean)
          }

          return acc;
        }, {})
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
          const queryParams = _.filter(parameters, parameter => parameter.in === 'query');
          const moduleName = _.camelCase(route.split('/').filter(Boolean)[0]);

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
  const duplicates = {

  }
  return _.reduce(routes.reduce((modules, route) => {
    
    if (route.moduleName) {
      if (!modules[route.moduleName]) {
        modules[route.moduleName] = []
      }

      if (!duplicates[route.moduleName]) duplicates[route.moduleName] = {}
      if (!duplicates[route.moduleName][route.name]) {
        duplicates[route.moduleName][route.name] = 1;
      } else {
        console.warn(
          `Confict methods!!!\r\n` +
          `Module "${route.moduleName}" already have method "${route.name}()"\r\n` +
          `Current method has been renamed to "${route.name + (duplicates[route.moduleName][route.name] + 1)}()" to solve conflict names.\r\n`
        )
        route.comments.push(`@originalName ${route.name}`)
        route.comments.push(`@duplicate true`)
        route.name += ++duplicates[route.moduleName][route.name];
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