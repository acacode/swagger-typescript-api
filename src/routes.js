const _ = require("lodash");
const { types, parseSchema, getType, getRefType, getInlineParseContent, checkAndAddNull } = require("./schema");
const { formatModelName } = require("./modelNames");
const {
  DEFAULT_BODY_ARG_NAME,
  SUCCESS_RESPONSE_STATUS_RANGE,
  TS_KEYWORDS,
  RESERVED_QUERY_ARG_NAMES,
  RESERVED_BODY_ARG_NAMES,
  RESERVED_PATH_ARG_NAMES,
  RESERVED_HEADER_ARG_NAMES,
} = require("./constants");
const { formatDescription, classNameCase } = require("./common");
const { config } = require("./config");
const { generateId } = require("./utils/id");
const { getRouteName } = require("./routeNames");
const { createComponent } = require("./components");
const { logger } = require("./logger");
const { SpecificArgNameResolver } = require("./utils/resolveName");

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

const getTypeFromRequestInfo = ({ requestInfo, parsedSchemas, operationId, defaultType, typeName }) => {
  // TODO: make more flexible pick schema without content type
  const schema = getSchemaFromRequestType(requestInfo);
  const refTypeInfo = getRefType(requestInfo);

  if (schema) {
    const content = getInlineParseContent(schema, typeName);
    const foundedSchemaByName = _.find(parsedSchemas, (parsedSchema) => formatModelName(parsedSchema.name) === content);
    const foundSchemaByContent = _.find(parsedSchemas, (parsedSchema) => _.isEqual(parsedSchema.content, content));

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
        return getInlineParseContent(getSchemaFromRequestType(refTypeInfo.rawTypeData), refTypeInfo.typeName || null);
      default:
        return getInlineParseContent(refTypeInfo.rawTypeData, refTypeInfo.typeName || null);
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
  (+status >= SUCCESS_RESPONSE_STATUS_RANGE[0] && +status < SUCCESS_RESPONSE_STATUS_RANGE[1]) ||
  status === "2xx";

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
        logger.warn("wrong path param name", paramName);
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
    const typeName = config.componentTypeNameResolver.resolve([classNameCase(`${routeName.usage} Params`)]);

    return createComponent("schemas", typeName, { ...schema });
  }

  return schema;
};

const getContentTypes = (requestInfo, extraContentTypes) =>
  _.uniq(
    _.compact([
      ...(extraContentTypes || []),
      ..._.flatten(_.map(requestInfo, (requestInfoData) => requestInfoData && _.keys(requestInfoData.content))),
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

const getRequestBodyInfo = (routeInfo, routeParams, parsedSchemas, routeName) => {
  const { requestBody, consumes, requestBodyName, operationId } = routeInfo;
  let schema = null;
  let type = null;

  const contentTypes = getContentTypes([requestBody], [...(consumes || []), routeInfo["x-contentType"]]);
  let contentKind = getContentKind(contentTypes);

  let typeName = null;

  if (config.extractRequestBody) {
    typeName = config.componentTypeNameResolver.resolve([
      classNameCase(`${routeName.usage} Payload`),
      classNameCase(`${routeName.usage} Body`),
      classNameCase(`${routeName.usage} Input`),
    ]);
  }

  if (routeParams.formData.length) {
    contentKind = CONTENT_KIND.FORM_DATA;
    schema = convertRouteParamsIntoObject(routeParams.formData);
    type = getInlineParseContent(schema, typeName);
  } else if (contentKind === CONTENT_KIND.FORM_DATA) {
    schema = getSchemaFromRequestType(requestBody);
    type = getInlineParseContent(schema, typeName);
  } else if (requestBody) {
    schema = getSchemaFromRequestType(requestBody);
    type = checkAndAddNull(
      requestBody,
      getTypeFromRequestInfo({
        requestInfo: requestBody,
        parsedSchemas,
        operationId,
        typeName,
      }),
    );

    // TODO: Refactor that.
    // It needed for cases when swagger schema is not declared request body type as form data
    // but request body data type contains form data types like File
    if (formDataTypes.some((dataType) => _.includes(type, `: ${dataType}`))) {
      contentKind = CONTENT_KIND.FORM_DATA;
    }
  }

  if (schema && !schema.$ref && config.extractRequestBody) {
    schema = createComponent("schemas", typeName, { ...schema });
    type = getInlineParseContent(schema);
  }

  return {
    paramName: requestBodyName || (requestBody && requestBody.name) || DEFAULT_BODY_ARG_NAME,
    contentTypes,
    contentKind,
    schema,
    type,
    required: requestBody && (typeof requestBody.required === "undefined" || !!requestBody.required),
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
  const errorResponses = responseInfos.filter((response) => !response.isSuccess && response.type !== TS_KEYWORDS.ANY);

  const handleResponseHeaders = (src) => {
    if (!src) {
      return "headers: {},";
    }
    const headerTypes = Object.fromEntries(
      Object.entries(src).map(([k, v]) => {
        return [k, getType(v)];
      }),
    );
    const r = `headers: { ${Object.entries(headerTypes)
      .map(([k, v]) => `"${k}": ${v}`)
      .join(",")} },`;
    return r;
  };

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
    full: {
      types:
        responseInfos
          .map(
            (response) => `{
      data: ${response.type}, status: ${response.status}, statusCode: ${response.status}, statusText: "${
              response.description
            }", ${handleResponseHeaders(response.headers)} config: {} }`,
          )
          .join(" | ") || TS_KEYWORDS.ANY,
    },
  };
};

const parseRoutes = ({ usageSchema, parsedSchemas, moduleNameIndex, moduleNameFirstTag, extractRequestParams }) => {
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

          const routeId = generateId();
          const firstTag = tags && tags.length > 0 ? tags[0] : null;
          const moduleName =
            moduleNameFirstTag && firstTag
              ? _.camelCase(firstTag)
              : _.camelCase(_.compact(_.split(route, "/"))[moduleNameIndex]);
          const hasSecurity = !!((globalSecurity && globalSecurity.length) || (security && security.length));

          const routeParams = getRouteParams(routeInfo, pathParams);

          const pathArgs = routeParams.path.map((pathArgSchema) => ({
            name: pathArgSchema.name,
            optional: !pathArgSchema.required,
            type: getInlineParseContent(pathArgSchema.schema),
            description: pathArgSchema.description,
          }));
          const pathArgsNames = pathArgs.map((arg) => arg.name);

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

          const requestBodyInfo = getRequestBodyInfo(routeInfo, routeParams, parsedSchemas, routeName);

          const requestParamsSchema = createRequestParamsSchema({
            queryParams: routeParams.query,
            pathArgsSchemas: routeParams.path,
            queryObjectSchema,
            extractRequestParams,
            routeName,
          });

          extractResponseBodyIfItNeeded(routeInfo, responseBodyInfo, routeParams, rawRouteInfo, routeName);
          extractResponseErrorIfItNeeded(routeInfo, responseBodyInfo, routeParams, rawRouteInfo, routeName);

          const queryType = routeParams.query.length ? getInlineParseContent(queryObjectSchema) : null;
          const pathType = routeParams.path.length ? getInlineParseContent(pathObjectSchema) : null;
          const headersType = routeParams.header.length ? getInlineParseContent(headersObjectSchema) : null;

          const nameResolver = new SpecificArgNameResolver(pathArgsNames);

          const specificArgs = {
            query: queryType
              ? {
                  name: nameResolver.resolve(RESERVED_QUERY_ARG_NAMES),
                  optional: parseSchema(queryObjectSchema, null).allFieldsAreOptional,
                  type: queryType,
                }
              : void 0,
            body: requestBodyInfo.type
              ? {
                  name: nameResolver.resolve([requestBodyInfo.paramName, ...RESERVED_BODY_ARG_NAMES]),
                  optional: !requestBodyInfo.required,
                  type: requestBodyInfo.type,
                }
              : void 0,
            pathParams: pathType
              ? {
                  name: nameResolver.resolve(RESERVED_PATH_ARG_NAMES),
                  optional: parseSchema(pathObjectSchema, null).allFieldsAreOptional,
                  type: pathType,
                }
              : void 0,
            headers: headersType
              ? {
                  name: nameResolver.resolve(RESERVED_HEADER_ARG_NAMES),
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
            specificArgNameResolver: nameResolver,
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
              query: specificArgs.query,
              pathParams: specificArgs.pathParams,
              headers: specificArgs.headers,
            },
            response: {
              contentTypes: responseBodyInfo.contentTypes,
              type: responseBodyInfo.success.type,
              errorType: responseBodyInfo.error.type,
              fullTypes: responseBodyInfo.full.types,
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
              !_.some(packRoutes, ({ routeName, id }) => id !== route.id && originalName === routeName.original)
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

const extractResponseBodyIfItNeeded = (routeInfo, responseBodyInfo, routeParams, rawRouteInfo, routeName) => {
  if (
    config.extractResponseBody &&
    responseBodyInfo.responses.length &&
    responseBodyInfo.success &&
    responseBodyInfo.success.schema
  ) {
    const typeName = config.componentTypeNameResolver.resolve([
      classNameCase(`${routeName.usage} Data`),
      classNameCase(`${routeName.usage} Result`),
      classNameCase(`${routeName.usage} Output`),
    ]);

    const idx = responseBodyInfo.responses.indexOf(responseBodyInfo.success.schema);

    let successResponse = responseBodyInfo.success;

    if (successResponse.schema && !successResponse.schema.$ref) {
      const schema = getSchemaFromRequestType(successResponse.schema);
      successResponse.schema = createComponent("schemas", typeName, { ...schema });
      successResponse.type = getInlineParseContent(successResponse.schema);

      if (idx > -1) {
        responseBodyInfo.responses[idx] = successResponse.schema;
      }
    }
  }
};

const extractResponseErrorIfItNeeded = (routeInfo, responseBodyInfo, routeParams, rawRouteInfo, routeName) => {
  if (
    config.extractResponseError &&
    responseBodyInfo.responses.length &&
    responseBodyInfo.error.schemas &&
    responseBodyInfo.error.schemas.length
  ) {
    const typeName = config.componentTypeNameResolver.resolve([
      classNameCase(`${routeName.usage} Error`),
      classNameCase(`${routeName.usage} Fail`),
      classNameCase(`${routeName.usage} Fails`),
      classNameCase(`${routeName.usage} ErrorData`),
      classNameCase(`${routeName.usage} HttpError`),
      classNameCase(`${routeName.usage} BadResponse`),
    ]);

    const errorSchemas = responseBodyInfo.error.schemas.map(getSchemaFromRequestType).filter(Boolean);

    if (!errorSchemas.length) return;

    const schema = parseSchema({
      oneOf: errorSchemas,
      title: errorSchemas
        .map((schema) => schema.title)
        .filter(Boolean)
        .join(" "),
      description: errorSchemas
        .map((schema) => schema.description)
        .filter(Boolean)
        .join("\n"),
    });
    const component = createComponent("schemas", typeName, { ...schema });
    responseBodyInfo.error.schemas = [component];
    responseBodyInfo.error.type = formatModelName(component.typeName);
  }
};

module.exports = {
  parseRoutes,
  groupRoutes,
};
