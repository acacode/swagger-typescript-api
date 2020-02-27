const _ = require("lodash");
const { collect } = require("./utils");
const { parseSchema, getRefType } = require("./schema");
const { checkAndRenameModelName } = require("./modelNames");
const { inlineExtraFormatters } = require("./typeFormatters");
const {
  DEFAULT_PRIMITIVE_TYPE,
  DEFAULT_BODY_ARG_NAME,
  SUCCESS_RESPONSE_STATUS_RANGE,
} = require("./constants");
const { formatDescription } = require("./common");
const { config } = require("./config")

const methodAliases = {
  get: (pathName, hasPathInserts) => _.camelCase(`${pathName}_${hasPathInserts ? 'detail': 'list'}`),
  post: (pathName, hasPathInserts) => _.camelCase(`${pathName}_create`),
  put: (pathName, hasPathInserts) => _.camelCase(`${pathName}_update`),
  patch: (pathName, hasPathInserts) => _.camelCase(`${pathName}_partial_update`),
  delete: (pathName, hasPathInserts) => _.camelCase(`${pathName}_delete`)
}

const getSchemaFromRequestType = requestType => {
  const content = _.get(requestType, "content")

  if (!content) return null;

  const contentByType = _.find(content, contentByType => contentByType.schema);

  return contentByType && contentByType.schema;
}

const getTypeFromRequestInfo = (requestInfo, parsedSchemas, operationId, contentType) => {
  // TODO: make more flexible pick schema without content type
  const schema = getSchemaFromRequestType(requestInfo);
  // const refType = getRefTypeName(requestInfo);
  const refTypeInfo = getRefType(requestInfo);

  if (schema) {
    const extractedSchema = _.get(schema, 'additionalProperties', schema);
    const { content } = parseSchema(extractedSchema, 'none', inlineExtraFormatters);
    const foundedSchemaByName = _.find(parsedSchemas, parsedSchema => parsedSchema.name === content)
    const foundSchemaByContent = _.find(parsedSchemas, parsedSchema => _.isEqual(parsedSchema.content, content))

    const foundSchema = foundedSchemaByName || foundSchemaByContent

    return checkAndRenameModelName(foundSchema ? foundSchema.name : content);
  }
  
  if (refTypeInfo) {
    // const refTypeWithoutOpId = refType.replace(operationId, '');
    // const foundedSchemaByName = _.find(parsedSchemas, ({ name }) => name === refType || name === refTypeWithoutOpId)

    // TODO:HACK fix problem of swagger2opeanpi
    const typeNameWithoutOpId = _.replace(refTypeInfo.typeName, operationId, '')
    if (_.find(parsedSchemas, schema => schema.name === typeNameWithoutOpId))
      return checkAndRenameModelName(typeNameWithoutOpId);

    switch (refTypeInfo.componentName) {
      case "schemas":
        return checkAndRenameModelName(refTypeInfo.typeName);
      case "responses":
      case "requestBodies":
        return parseSchema(getSchemaFromRequestType(refTypeInfo.rawTypeData), 'none', inlineExtraFormatters).content
      default:
        return parseSchema(refTypeInfo.rawTypeData, 'none', inlineExtraFormatters).content
    }
  }

  return DEFAULT_PRIMITIVE_TYPE;
}

const getTypesFromResponses = (responses, parsedSchemas, operationId) =>
  _.reduce(responses, (acc, response, status) => {
    return [
      ...acc,
      {
        type: getTypeFromRequestInfo(response, parsedSchemas, operationId),
        description: formatDescription(response.description || "", true),
        status: status === 'default' ? "default" : +status,
        isSuccess: isSuccessResponseStatus(status),
      }
    ];
  }, [])

const isSuccessResponseStatus = status => (config.defaultResponseAsSuccess && status === "default") || (+status >= SUCCESS_RESPONSE_STATUS_RANGE[0] && +status < SUCCESS_RESPONSE_STATUS_RANGE[1])

const findBadResponses = responses =>
  _.filter(responses, (v, status) => !isSuccessResponseStatus(status))

const findSuccessResponse = (responses) =>
  _.find(responses, (v, status) => isSuccessResponseStatus(status))

const getReturnType = (responses, parsedSchemas, operationId) =>
  getTypeFromRequestInfo(findSuccessResponse(responses), parsedSchemas, operationId) || DEFAULT_PRIMITIVE_TYPE

const getErrorReturnType = (responses, parsedSchemas, operationId) =>
  _.uniq(
    findBadResponses(responses)
      .map(response => getTypeFromRequestInfo(response, parsedSchemas, operationId))
      .filter(type => type !== DEFAULT_PRIMITIVE_TYPE)
    )
      .join(' | ') || DEFAULT_PRIMITIVE_TYPE

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

const parseRoutes = ({ paths }, parsedSchemas) =>
  _.entries(paths)
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
          const pathParams = collect(parameters, parameter => {
            if (parameter.in === 'path') return parameter;
            
            const refTypeInfo = getRefType(parameter);
            return refTypeInfo && refTypeInfo.rawTypeData.in === "path" && refTypeInfo.rawTypeData
          })
          const queryParams = collect(parameters, parameter => {
            if (parameter.in === 'query') return parameter;
            
            const refTypeInfo = getRefType(parameter);
            return refTypeInfo && refTypeInfo.rawTypeData.in === "query" && refTypeInfo.rawTypeData
          })
          const moduleName = _.camelCase(route.split('/').filter(Boolean)[0]);

          const routeName = getRouteName(operationId, method, route, moduleName);
          const name = _.camelCase(routeName);

          const responsesTypes = getTypesFromResponses(responses, parsedSchemas, operationId);

          const queryObjectSchema = _.reduce(queryParams, (objectSchema, queryPartSchema) => ({
            ...objectSchema,
            properties: {
              ...objectSchema.properties,
              [queryPartSchema.name]: _.merge(_.omit(queryPartSchema, "in", "schema"), queryPartSchema.schema)
            }
          }), {
            properties: {},
            type: 'object',
          });

          const bodyParamName = requestInfo.requestBodyName || (requestBody && requestBody.name) || DEFAULT_BODY_ARG_NAME;

          const queryType = queryParams.length
            ? parseSchema(queryObjectSchema, null, inlineExtraFormatters).content
            : null;

          const bodyType = requestBody
            ? getTypeFromRequestInfo(requestBody, parsedSchemas, operationId)
            : null;

          const args = [
            ...(pathParams.map(param => ({
              name: param.name,
              type: parseSchema(param.schema, null, inlineExtraFormatters).content
            }))),
            queryType && {
              name: 'query',
              type: queryType,
            },
            bodyType && {
              name: bodyParamName,
              type: bodyType,
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
            description && `@description ${formatDescription(description, true)}`,
            ...(config.generateResponses && responsesTypes.length ? responsesTypes.map(({ type, status, description, isSuccess }) =>
                `@response \`${status}\` \`${type}\` ${description}`
              ) : [])
          ].filter(Boolean);

          return {
            moduleName: _.replace(moduleName, /^(\d)/, 'v$1'),
            security: hasSecurity,
            hasQuery: !!queryParams.length,
            queryType: queryType || '{}',
            bodyType: bodyType || 'never',
            name,
            pascalName: _.upperFirst(name),
            comments,
            args,
            method: _.upperCase(method),
            path: route.replace(/{/g, '${'),
            returnType: getReturnType(responses, parsedSchemas, operationId),
            errorReturnType: getErrorReturnType(responses, parsedSchemas, operationId),
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
        const routeName = route.name;
        route.comments.push(`@originalName ${routeName}`)
        route.comments.push(`@duplicate`)
        const duplicateNumber = ++duplicates[route.moduleName][routeName]
        route.name += duplicateNumber;
        route.pascalName += duplicateNumber;
        console.warn(
          `🥵  Module "${route.moduleName}" already have method "${routeName}()"`, `\n🥵  This method has been renamed to "${route.name}()" to solve conflict names.`
        )
      }

      modules[route.moduleName].push(route)
    } else {
      modules.$outOfModule.push(route)
    }

    return modules
  }, {
    $outOfModule: []
  }), (acc, packRoutes, moduleName) => {
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