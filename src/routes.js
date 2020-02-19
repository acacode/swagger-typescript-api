const _ = require("lodash");
const { parseSchema } = require("./schema");
const { checkAndRenameModelName } = require("./modelNames");
const { inlineExtraFormatters } = require("./typeFormatters");

const methodAliases = {
  get: (pathName, hasPathInserts) => _.camelCase(`${pathName}_${hasPathInserts ? 'detail': 'list'}`),
  post: (pathName, hasPathInserts) => _.camelCase(`${pathName}_create`),
  put: (pathName, hasPathInserts) => _.camelCase(`${pathName}_update`),
  patch: (pathName, hasPathInserts) => _.camelCase(`${pathName}_partial_update`),
  delete: (pathName, hasPathInserts) => _.camelCase(`${pathName}_delete`)
}

const getTypeFromRequestInfo = (requestInfo, parsedSchemas, contentType) => {
  // TODO: make more flexible pick schema without content type
  const schema = _.get(requestInfo, `content["${contentType}"].schema`);

  if (schema) {
    const extractedSchema = _.get(schema, 'additionalProperties', schema);
    const { content } = parseSchema(extractedSchema, 'none', inlineExtraFormatters);
    const foundSchema = _.find(parsedSchemas, parsedSchema => _.isEqual(parsedSchema.content, content))

    return foundSchema ? foundSchema.name : checkAndRenameModelName(content);
  }

  return 'any';
}

const findSuccessResponse = (responses) => {
  return _.find(responses, (v, status) => status === 'default' || (+status >= 200 && +status < 300))
}

const createCustomOperationId = (method, route, moduleName) => {
  const hasPathInserts = /\{(\w){1,}\}/g.test(route);
  const splitedRouteBySlash = _.replace(route, /\{(\w){1,}\}/g, '').split('/').filter(Boolean);
  const routeParts = (splitedRouteBySlash.length > 1 ? splitedRouteBySlash.splice(1) : splitedRouteBySlash).join('_');
  return routeParts.length > 3 && methodAliases[method] ? methodAliases[method](routeParts, hasPathInserts) : _.camelCase(_.lowerCase(method) + '_' + ([moduleName]).join('_')) || 'index'
}

const getRouteName = (operationId, method, route, moduleName) => {
  if (operationId) return operationId;
  if (route === '/') return `${_.lowerCase(method)}Root`;
  return createCustomOperationId(method, route, moduleName);
}

const parseRoutes = (routes, parsedSchemas) =>
  _.entries(routes)
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
            summary && `@summary ${summary}`,
            `@request ${_.upperCase(method)}:${route}`,
            // requestBody && requestBody.description && `@body ${requestBody.description}`,
            hasSecurity && `@secure`,
            description && `@description ${_.replace(description, /\n/g, '. ')}`,
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
        route.comments.push(`@duplicate`)
        route.name += ++duplicates[route.moduleName][route.name];
      }
      
      modules[route.moduleName].push(route)
    } else {
      modules.$outOfModule.push(route)
    }

    return modules
  }, {
    $outOfModule: []
  }), (acc, packRoutes, moduleName) => {

    // if (moduleName === "$outOfModule") {
    //   acc.outOfModule.push(...routes)
    // } else {
    //   if (routes.length === 1) {
    //     const route = routes[0]
    //     acc.outOfModule.push({
    //       ...route,
    //       name: route.name === _.lowerCase(route.name) ? moduleName : route.name,
    //     })
    //   } else {
    //     acc.combined.push({
    //       moduleName,
    //       routes: routes,
    //     })
    //   }
    // }

    if (moduleName === "$outOfModule") {
      acc.outOfModule = packRoutes
    } else {
      if (!acc.combined) acc.combined = []

      acc.combined.push({
        moduleName,
        routes: packRoutes,
      })
    }

    return acc;
  }, {})
}

module.exports = {
  parseRoutes,
  groupRoutes,
}