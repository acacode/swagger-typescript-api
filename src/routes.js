const _ = require("lodash");
const { parseSchema } = require("./schema");
const { inlineExtraFormatters } = require("./typeFormatters");

const getTypeFromRequestInfo = (requestInfo, parsedSchemas, contentType) => {
  // TODO: make more flexible pick schema without content type
  const schema = _.get(requestInfo, `content["${contentType}"].schema`);

  if (schema) {
    const extractedSchema = _.get(schema, 'additionalProperties', schema);
    const { content } = parseSchema(extractedSchema, 'none', inlineExtraFormatters);
    const foundSchema = _.find(parsedSchemas, parsedSchema => _.isEqual(parsedSchema.content, content))
    return foundSchema ? foundSchema.name : content;
  }

  return 'any';
}

const findSuccessResponse = (responses) => {
  return _.find(responses, (v, status) => status === 'default' || (+status >= 200 && +status < 300))
}

const getRouteName = (operationId, method, route, moduleName) => {
  if (operationId) return operationId;
  if (route === '/') return `${_.lowerCase(method)}Root`;

  const routeParts = _.replace(route, /\{(\w){1,}\}/g, '').split('/').filter(Boolean);

  // create route name via method and route
  return _.camelCase(_.lowerCase(method) + '_' + (moduleName ? routeParts.splice(1) : routeParts).join('_')) || 'index'
}

const parseRoutes = (routes, parsedSchemas) =>
  Object.entries(routes)
    .reduce((routes, [route, requestInfoByMethodsMap]) => {
      parameters = _.get(requestInfoByMethodsMap, 'parameters');

      // TODO: refactor that hell
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
      ..._.map(requestInfoByMethodsMap, (requestInfo, method) => {
          const {
            operationId,
            requestBody,
            security,
            parameters,
            summary,
            description,
            tags,
            responses,
          } = requestInfo;
          const hasSecurity = !!(security && security.length);
          const pathParams = _.filter(parameters, parameter => parameter.in === 'path');
          const queryParams = _.filter(parameters, parameter => parameter.in === 'query');
          const moduleName = _.camelCase(route.split('/').filter(Boolean)[0]);

          const routeName = getRouteName(operationId, method, route, moduleName);
          
          const queryObjectSchema = queryParams.length && queryParams.reduce((objectSchema, queryPartSchema) => ({
            ...objectSchema,
            properties: {
              ...objectSchema.properties,
              [queryPartSchema.name]: _.merge(_.omit(queryPartSchema, "in", "schema"), queryPartSchema.schema)
            }
          }), {
            properties: {},
            type: 'object',
          });

          const bodyParamName = requestInfo.requestBodyName || (requestBody && requestBody.name) || "data";

          const args = [
            ...(pathParams.map(param => ({
              name: param.name,
              type: parseSchema(param.schema, null, inlineExtraFormatters).content
            }))),
            queryParams.length && {
              name: 'query',
              type: parseSchema(queryObjectSchema, null, inlineExtraFormatters).content,
            },
            requestBody && {
              name: bodyParamName,
              type: getTypeFromRequestInfo(requestBody, parsedSchemas, "application/json"),
            },
          ].filter(Boolean)

          // TODO: get args for formData
          // "name": "file",
          // "in": "formData",


          // const responsesInfos = _.reduce(responses, (acc, response, status) => {

          //   const type = getTypeFromRequestInfo(response, parsedSchemas, 'application/json');

          //   if (type) {
          //     acc.push(`@response`)
          //     acc.push(`  status: ${status === 'default' ? 200 : status}`)
          //     acc.push(`  type: ${type}`)
          //     if (response.description) {
          //       acc.push(`  description: ${response.description}`)
          //     }
          //   }

          //   return acc;
          // }, [' '])

          const comments = [
            tags && tags.length && `@tags ${tags.join(', ')}`,
            `@name ${routeName}`,
            (description || summary) && `@description ${_.replace(summary || description, /\n/g, '')}`,
            `@request ${_.upperCase(method)}:${route}`,
            // requestBody && requestBody.description && `@body ${requestBody.description}`,
            hasSecurity && `@security true`,
            // ...responsesInfos,
          ].filter(Boolean);

          return {
            moduleName,
            security: hasSecurity,
            hasQuery: !!queryParams.length,
            name: _.camelCase(routeName),
            comments,
            args,
            method: _.upperCase(method),
            path: route.replace(/{/g, '${'),
            returnType: getTypeFromRequestInfo(findSuccessResponse(responses), parsedSchemas, 'application/json') || 'any',
            bodyArg: requestBody ? bodyParamName : 'null'
          }})
      ]
    }, [])


const groupRoutes = routes => {
  const duplicates = {}
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
          `🥵  Module "${route.moduleName}" already have method "${route.name}()"\r\n` +
          `🥵  This method has been renamed to "${route.name + (duplicates[route.moduleName][route.name] + 1)}()" to solve conflict names.`
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