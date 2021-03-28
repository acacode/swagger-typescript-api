const _ = require("lodash");
const {
  types,
  parseSchema,
  getRefType,
  getInlineParseContent,
  checkAndAddNull,
} = require("./schema");
const { formatModelName } = require("./modelNames");
const {
  DEFAULT_BODY_ARG_NAME,
  SUCCESS_RESPONSE_STATUS_RANGE,
  TS_KEYWORDS,
} = require("./constants");
const { formatDescription, classNameCase } = require("./common");
const { config } = require("./config");
const { nanoid } = require("nanoid");
const { getRouteName } = require("./routeNames");
const { createComponent } = require("./components");
const { warnLog } = require("./logger");

const formDataTypes = _.uniq([types.file, types.string.binary]);

const getSchemaFromRequestType = (requestInfo) => {
  const content = _.get(requestInfo, "content");

  if (!content) return null;

  /* content: { "multipart/form-data": { schema: {...} }, "application/json": { schema: {...} } } */

  /* for example: dataType = "multipart/form-data" */
  for (const dataType in content) {
    if (content[dataType] && content[dataType].schema) {
      return {
        ...content[dataType].schema,
        dataType,
      };
    }
  }

  return null;
};

const getTypeFromRequestInfo = ({ requestInfo, parsedSchemas, operationId, defaultType }) => {
  // TODO: make more flexible pick schema without content type
  const schema = getSchemaFromRequestType(requestInfo);
  const refTypeInfo = getRefType(requestInfo);

  if (schema) {
    const content = getInlineParseContent(schema, "none");
    const foundedSchemaByName = _.find(
      parsedSchemas,
      (parsedSchema) => formatModelName(parsedSchema.name) === content,
    );
    const foundSchemaByContent = _.find(parsedSchemas, (parsedSchema) =>
      _.isEqual(parsedSchema.content, content),
    );

    const foundSchema = foundedSchemaByName || foundSchemaByContent;

    return foundSchema ? formatModelName(foundSchema.name) : content;
  }

  if (refTypeInfo) {
    // const refTypeWithoutOpId = refType.replace(operationId, '');
    // const foundedSchemaByName = _.find(parsedSchemas, ({ name }) => name === refType || name === refTypeWithoutOpId)

    // TODO:HACK fix problem of swagger2opeanpi
    const typeNameWithoutOpId = _.replace(refTypeInfo.typeName, operationId, "");
    if (_.find(parsedSchemas, (schema) => schema.name === typeNameWithoutOpId)) {
      return formatModelName(typeNameWithoutOpId);
    }

    switch (refTypeInfo.componentName) {
      case "schemas":
        return formatModelName(refTypeInfo.typeName);
      case "responses":
      case "requestBodies":
        return getInlineParseContent(getSchemaFromRequestType(refTypeInfo.rawTypeData), "none");
      default:
        return getInlineParseContent(refTypeInfo.rawTypeData, "none");
    }
  }

  return defaultType || TS_KEYWORDS.ANY;
};

const getRequestInfoTypes = ({ requestInfos, parsedSchemas, operationId, defaultType }) =>
  _.reduce(
    requestInfos,
    (acc, requestInfo, status) => {
      const contentTypes = getContentTypes([requestInfo]);

      return [
        ...acc,
        {
          ...(requestInfo || {}),
          contentTypes: contentTypes,
          contentKind: getContentKind(contentTypes),
          type: checkAndAddNull(
            requestInfo,
            getTypeFromRequestInfo({
              requestInfo,
              parsedSchemas,
              operationId,
              defaultType,
            }),
          ),
          description: formatDescription(requestInfo.description || "", true),
          status: _.isNaN(+status) ? status : +status,
          isSuccess: isSuccessStatus(status),
        },
      ];
    },
    [],
  );

const isSuccessStatus = (status) =>
  (config.defaultResponseAsSuccess && status === "default") ||
  (+status >= SUCCESS_RESPONSE_STATUS_RANGE[0] && +status < SUCCESS_RESPONSE_STATUS_RANGE[1]);

const parseRoute = (route) => {
  const pathParamMatches = (route || "").match(
    /({(([a-zA-Z]-?_?){1,})([0-9]{1,})?})|(:(([a-zA-Z]-?_?){1,})([0-9]{1,})?:?)/g,
  );

  // used in case when path parameters is not declared in requestInfo.parameters ("in": "path")
  const pathParams = _.reduce(
    pathParamMatches,
    (pathParams, match) => {
      const paramName = _.replace(match, /\{|\}|\:/g, "");

      if (!paramName) return pathParams;

      if (_.includes(paramName, "-")) {
        warnLog("wrong path param name", paramName);
      }

      return [
        ...pathParams,
        {
          $match: match,
          name: _.camelCase(paramName),
          required: true,
          type: "string",
          description: "",
          schema: {
            type: "string",
          },
          in: "path",
        },
      ];
    },
    [],
  );

  const fixedRoute = _.reduce(
    pathParams,
    (fixedRoute, pathParam) => {
      return _.replace(fixedRoute, pathParam.$match, `\${${pathParam.name}}`);
    },
    route || "",
  );

  return {
    originalRoute: route || "",
    route: fixedRoute,
    pathParams,
  };
};

const getRouteParams = (routeInfo, pathParams) => {
  const { parameters } = routeInfo;

  const routeParams = {
    path: [],
    header: [],
    body: [],
    query: [],
    body: [],
    formData: [],
    cookie: [],
  };

  _.each(parameters, (parameter) => {
    const refTypeInfo = getRefType(parameter);
    let routeParam = null;

    if (refTypeInfo && refTypeInfo.rawTypeData.in && refTypeInfo.rawTypeData) {
      if (!routeParams[refTypeInfo.rawTypeData.in]) {
        routeParams[refTypeInfo.rawTypeData.in] = [];
      }

      routeParam = {
        ...refTypeInfo.rawTypeData,
        ...(refTypeInfo.rawTypeData.schema || {}),
      };
    } else {
      if (!parameter.in) return;

      if (!routeParams[parameter.in]) {
        routeParams[parameter.in] = [];
      }

      routeParam = {
        ...parameter,
        ...(parameter.schema || {}),
      };
    }

    if (routeParam.in === "path") {
      if (!routeParam.name) return;

      routeParam.name = _.camelCase(routeParam.name);
    }

    if (routeParam) {
      routeParams[routeParam.in].push(routeParam);
    }
  });

  // used in case when path parameters is not declared in requestInfo.parameters ("in": "path")
  _.each(pathParams, (pathParam) => {
    const alreadyExist = _.some(routeParams.path, (parameter) => parameter.name === pathParam.name);

    if (!alreadyExist) {
      routeParams.path.push(pathParam);
    }
  });

  return routeParams;
};

const convertRouteParamsIntoObject = (params) => {
  return _.reduce(
    params,
    (objectSchema, schemaPart) => {
      if (!schemaPart || !schemaPart.name) return objectSchema;

      return {
        ...objectSchema,
        properties: {
          ...objectSchema.properties,
          [schemaPart.name]: {
            ...schemaPart,
            ...(schemaPart.schema || {}),
          },
        },
      };
    },
    {
      properties: {},
      type: "object",
    },
  );
};

const createRequestsMap = (routeInfoByMethodsMap) => {
  const parameters = _.get(routeInfoByMethodsMap, "parameters");

  return _.reduce(
    routeInfoByMethodsMap,
    (acc, requestInfo, method) => {
      if (method.startsWith("x-") || ["parameters", "$ref"].includes(method)) {
        return acc;
      }

      acc[method] = {
        ...requestInfo,
        parameters: _.compact(_.concat(parameters, requestInfo.parameters)),
      };

      return acc;
    },
    {},
  );
};

const createRequestParamsSchema = ({
  queryParams,
  queryObjectSchema,
  pathArgsSchemas,
  extractRequestParams,
  routeName,
}) => {
  if (!queryParams || !queryParams.length) return null;

  const pathParams = _.reduce(
    pathArgsSchemas,
    (acc, pathArgSchema) => {
      if (pathArgSchema.name) {
        acc[pathArgSchema.name] = {
          ...pathArgSchema,
          in: "path",
        };
      }

      return acc;
    },
    {},
  );

  const fixedQueryParams = _.reduce(
    _.get(queryObjectSchema, "properties", {}),
    (acc, property, name) => {
      if (name && _.isObject(property)) {
        acc[name] = {
          ...property,
          in: "query",
        };
      }

      return acc;
    },
    {},
  );

  const schema = {
    ...queryObjectSchema,
    properties: {
      ...fixedQueryParams,
      ...pathParams,
    },
  };

  const fixedSchema = config.hooks.onCreateRequestParams(schema);

  if (fixedSchema) return fixedSchema;

  if (extractRequestParams) {
    return createComponent("schemas", classNameCase(`${routeName.usage} Params`), { ...schema });
  }

  return schema;
};

const getContentTypes = (requestInfo, extraContentTypes) =>
  _.uniq(
    _.compact([
      ...(extraContentTypes || []),
      ..._.flatten(
        _.map(requestInfo, (requestInfoData) => requestInfoData && _.keys(requestInfoData.content)),
      ),
    ]),
  );

const CONTENT_KIND = {
  JSON: "JSON",
  URL_ENCODED: "URL_ENCODED",
  FORM_DATA: "FORM_DATA",
  IMAGE: "IMAGE",
  OTHER: "OTHER",
};

const getContentKind = (contentTypes) => {
  if (
    _.includes(contentTypes, "application/json") ||
    _.some(contentTypes, (contentType) => _.endsWith(contentType, "+json"))
  ) {
    return CONTENT_KIND.JSON;
  }

  if (contentTypes.includes("application/x-www-form-urlencoded")) {
    return CONTENT_KIND.URL_ENCODED;
  }

  if (contentTypes.includes("multipart/form-data")) {
    return CONTENT_KIND.FORM_DATA;
  }

  if (_.some(contentTypes, (contentType) => _.includes(contentType, "image/"))) {
    return CONTENT_KIND.IMAGE;
  }

  return CONTENT_KIND.OTHER;
};

const getRequestBodyInfo = (routeInfo, routeParams, parsedSchemas) => {
  const { requestBody, consumes, requestBodyName, operationId } = routeInfo;
  let schema = null;
  let type = null;

  const contentTypes = getContentTypes(
    [requestBody],
    [...(consumes || []), routeInfo["x-contentType"]],
  );
  let contentKind = getContentKind(contentTypes);

  if (routeParams.formData.length) {
    contentKind = CONTENT_KIND.FORM_DATA;
    schema = convertRouteParamsIntoObject(routeParams.formData);
    type = getInlineParseContent(schema);
  } else if (contentKind === CONTENT_KIND.FORM_DATA) {
    schema = getSchemaFromRequestType(requestBody);
    type = getInlineParseContent(schema);
  } else if (requestBody) {
    schema = requestBody;
    type = checkAndAddNull(
      requestBody,
      getTypeFromRequestInfo({
        requestInfo: requestBody,
        parsedSchemas,
        operationId,
      }),
    );

    // TODO: Refactor that.
    // It needed for cases when swagger schema is not declared request body type as form data
    // but request body data type contains form data types like File
    if (formDataTypes.some((dataType) => _.includes(type, `: ${dataType}`))) {
      contentKind = CONTENT_KIND.FORM_DATA;
    }
  }

  return {
    paramName: requestBodyName || (requestBody && requestBody.name) || DEFAULT_BODY_ARG_NAME,
    contentTypes,
    contentKind,
    schema,
    type,
    required:
      requestBody && (typeof requestBody.required === "undefined" || !!requestBody.required),
  };
};

const getResponseBodyInfo = (routeInfo, routeParams, parsedSchemas) => {
  const { produces, operationId, responses } = routeInfo;

  const contentTypes = getContentTypes(responses, [...(produces || []), routeInfo["x-accepts"]]);

  const responseInfos = getRequestInfoTypes({
    requestInfos: responses,
    parsedSchemas,
    operationId,
    defaultType: config.defaultResponseType || TS_KEYWORDS.VOID,
  });

  const successResponse = responseInfos.find((response) => response.isSuccess);
  const errorResponses = responseInfos.filter(
    (response) => !response.isSuccess && response.type !== TS_KEYWORDS.ANY,
  );

  return {
    contentTypes,
    responses: responseInfos,
    success: {
      schema: successResponse,
      type: (successResponse && successResponse.type) || TS_KEYWORDS.ANY,
    },
    error: {
      schemas: errorResponses,
      type: _.uniq(errorResponses.map((response) => response.type)).join(" | ") || TS_KEYWORDS.ANY,
    },
  };
};

const parseRoutes = ({
  usageSchema,
  parsedSchemas,
  moduleNameIndex,
  moduleNameFirstTag,
  extractRequestParams,
}) => {
  const { paths, security: globalSecurity } = usageSchema;
  const pathsEntries = _.entries(paths);

  return pathsEntries.reduce((routes, [rawRoute, routeInfoByMethodsMap]) => {
    if (rawRoute.startsWith("x-")) return routes;

    const routeInfosMap = createRequestsMap(routeInfoByMethodsMap);

    return [
      ...routes,
      ..._.compact(
        _.map(routeInfosMap, (routeInfo, method) => {
          const {
            operationId,
            requestBody,
            security,
            parameters,
            summary,
            description,
            tags,
            responses,
            requestBodyName,
            produces,
            consumes,
            ...otherInfo
          } = routeInfo;
          const { route, pathParams } = parseRoute(rawRoute);

          const routeId = nanoid(12);
          const firstTag = tags && tags.length > 0 ? tags[0] : null;
          const moduleName =
            moduleNameFirstTag && firstTag
              ? _.camelCase(firstTag)
              : _.camelCase(_.compact(_.split(route, "/"))[moduleNameIndex]);
          const hasSecurity = !!(
            (globalSecurity && globalSecurity.length) ||
            (security && security.length)
          );

          const routeParams = getRouteParams(routeInfo, pathParams);

          const pathArgs = routeParams.path.map((pathArgSchema) => ({
            name: pathArgSchema.name,
            optional: !pathArgSchema.required,
            type: getInlineParseContent(pathArgSchema.schema),
            description: pathArgSchema.description,
          }));

          const requestBodyInfo = getRequestBodyInfo(routeInfo, routeParams, parsedSchemas);
          const responseBodyInfo = getResponseBodyInfo(routeInfo, routeParams, parsedSchemas);

          const rawRouteInfo = {
            pathArgs,
            operationId,
            method,
            route: rawRoute,
            moduleName,
            responsesTypes: responseBodyInfo.responses,
            description,
            tags,
            summary,
            responses,
            produces,
            requestBody,
            consumes,
            ...otherInfo,
          };

          const queryObjectSchema = convertRouteParamsIntoObject(routeParams.query);
          const pathObjectSchema = convertRouteParamsIntoObject(routeParams.path);
          const headersObjectSchema = convertRouteParamsIntoObject(routeParams.header);

          const routeName = getRouteName(rawRouteInfo);

          const requestParamsSchema = createRequestParamsSchema({
            queryParams: routeParams.query,
            pathArgsSchemas: routeParams.path,
            queryObjectSchema,
            extractRequestParams,
            routeName,
          });

          const queryType = routeParams.query.length
            ? getInlineParseContent(queryObjectSchema)
            : null;
          const pathType = routeParams.path.length ? getInlineParseContent(pathObjectSchema) : null;
          const headersType = routeParams.header.length
            ? getInlineParseContent(headersObjectSchema)
            : null;

          const specificArgs = {
            query: queryType
              ? {
                  name: pathArgs.some((pathArg) => pathArg.name === "query")
                    ? "queryParams"
                    : "query",
                  optional: parseSchema(queryObjectSchema, null).allFieldsAreOptional,
                  type: queryType,
                }
              : void 0,
            body: requestBodyInfo.type
              ? {
                  name: requestBodyInfo.paramName,
                  optional: !requestBodyInfo.required,
                  type: requestBodyInfo.type,
                }
              : void 0,
            requestParams: {
              name: pathArgs.some((pathArg) => pathArg.name === "params")
                ? "requestParams"
                : "params",
              optional: true,
              type: "RequestParams",
              defaultValue: "{}",
            },
            pathParams: pathType
              ? {
                  name: pathArgs.some((pathArg) => pathArg.name === "path") ? "pathParams" : "path",
                  optional: parseSchema(pathObjectSchema, null).allFieldsAreOptional,
                  type: pathType,
                }
              : void 0,
            headers: headersType
              ? {
                  name: pathArgs.some((pathArg) => pathArg.name === "headers")
                    ? "headersParams"
                    : "headers",
                  optional: parseSchema(headersObjectSchema, null).allFieldsAreOptional,
                  type: headersType,
                }
              : void 0,
          };

          let routeArgs = _.compact([...pathArgs, specificArgs.query, specificArgs.body]);

          if (routeArgs.some((pathArg) => pathArg.optional)) {
            const { optionalArgs, requiredArgs } = _.reduce(
              [...routeArgs],
              (acc, pathArg) => {
                if (pathArg.optional) {
                  acc.optionalArgs.push(pathArg);
                } else {
                  acc.requiredArgs.push(pathArg);
                }

                return acc;
              },
              {
                optionalArgs: [],
                requiredArgs: [],
              },
            );

            routeArgs = [...requiredArgs, ...optionalArgs];
          }

          routeArgs.push(specificArgs.requestParams);

          const routeData = {
            id: routeId,
            namespace: _.replace(moduleName, /^(\d)/, "v$1"),
            routeName,
            routeParams,
            requestBodyInfo,
            responseBodyInfo,
            specificArgs,
            queryObjectSchema,
            pathObjectSchema,
            headersObjectSchema,
            responseBodySchema: responseBodyInfo.success.schema,
            requestBodySchema: requestBodyInfo.schema,
            request: {
              contentTypes: requestBodyInfo.contentTypes,
              parameters: pathArgs,
              path: route,
              formData: requestBodyInfo.contentKind === CONTENT_KIND.FORM_DATA,
              isQueryBody: requestBodyInfo.contentKind === CONTENT_KIND.URL_ENCODED,
              security: hasSecurity,
              method: method,
              requestParams: requestParamsSchema,

              payload: specificArgs.body,
              params: specificArgs.requestParams,
              query: specificArgs.query,
              pathParams: specificArgs.pathParams,
              headers: specificArgs.headers,
            },
            response: {
              contentTypes: responseBodyInfo.contentTypes,
              type: responseBodyInfo.success.type,
              errorType: responseBodyInfo.error.type,
            },
            raw: rawRouteInfo,
          };

          const usageRouteData = config.hooks.onCreateRoute(routeData);

          return usageRouteData === false ? null : usageRouteData || routeData;
        }),
      ),
    ];
  }, []);
};

const groupRoutes = (routes) => {
  return _.reduce(
    routes.reduce(
      (modules, route) => {
        if (route.namespace) {
          if (!modules[route.namespace]) {
            modules[route.namespace] = [];
          }

          modules[route.namespace].push(route);
        } else {
          modules.$outOfModule.push(route);
        }

        return modules;
      },
      {
        $outOfModule: [],
      },
    ),
    (acc, packRoutes, moduleName) => {
      if (moduleName === "$outOfModule") {
        acc.outOfModule = packRoutes;
      } else {
        if (!acc.combined) acc.combined = [];

        acc.combined.push({
          moduleName,
          routes: _.map(packRoutes, (route) => {
            const { original: originalName, usage: usageName } = route.routeName;

            // TODO: https://github.com/acacode/swagger-typescript-api/issues/152
            // TODO: refactor
            if (
              packRoutes.length > 1 &&
              usageName !== originalName &&
              !_.some(
                packRoutes,
                ({ routeName, id }) => id !== route.id && originalName === routeName.original,
              )
            ) {
              return {
                ...route,
                routeName: {
                  ...route.routeName,
                  usage: originalName,
                },
              };
            }

            return route;
          }),
        });
      }
      return acc;
    },
    {},
  );
};

module.exports = {
  parseRoutes,
  groupRoutes,
};
