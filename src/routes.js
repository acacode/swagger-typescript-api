const _ = require("lodash");
const { collect } = require("./utils");
const { types, parseSchema, getRefType, getInlineParseContent } = require("./schema");
const { checkAndRenameModelName } = require("./modelNames");
const {
  DEFAULT_BODY_ARG_NAME,
  SUCCESS_RESPONSE_STATUS_RANGE,
  TS_KEYWORDS,
} = require("./constants");
const { formatDescription, classNameCase } = require("./common");
const { config, addToConfig } = require("./config");
const { nanoid } = require("nanoid");
const { getRouteName } = require("./routeNames");
const { createComponent } = require("./components");

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

const getTypeFromRequestInfo = (requestInfo, parsedSchemas, operationId) => {
  // TODO: make more flexible pick schema without content type
  const schema = getSchemaFromRequestType(requestInfo);
  const refTypeInfo = getRefType(requestInfo);

  if (schema) {
    const content = getInlineParseContent(schema, "none");
    const foundedSchemaByName = _.find(
      parsedSchemas,
      (parsedSchema) => checkAndRenameModelName(parsedSchema.name) === content,
    );
    const foundSchemaByContent = _.find(parsedSchemas, (parsedSchema) =>
      _.isEqual(parsedSchema.content, content),
    );

    const foundSchema = foundedSchemaByName || foundSchemaByContent;

    return foundSchema ? checkAndRenameModelName(foundSchema.name) : content;
  }

  if (refTypeInfo) {
    // const refTypeWithoutOpId = refType.replace(operationId, '');
    // const foundedSchemaByName = _.find(parsedSchemas, ({ name }) => name === refType || name === refTypeWithoutOpId)

    // TODO:HACK fix problem of swagger2opeanpi
    const typeNameWithoutOpId = _.replace(refTypeInfo.typeName, operationId, "");
    if (_.find(parsedSchemas, (schema) => schema.name === typeNameWithoutOpId)) {
      return checkAndRenameModelName(typeNameWithoutOpId);
    }

    switch (refTypeInfo.componentName) {
      case "schemas":
        return checkAndRenameModelName(refTypeInfo.typeName);
      case "responses":
      case "requestBodies":
        return getInlineParseContent(getSchemaFromRequestType(refTypeInfo.rawTypeData), "none");
      default:
        return getInlineParseContent(refTypeInfo.rawTypeData, "none");
    }
  }

  return TS_KEYWORDS.ANY;
};

const getRequestInfoTypes = (requestInfos, parsedSchemas, operationId) =>
  _.reduce(
    requestInfos,
    (acc, requestInfo, status) => {
      return [
        ...acc,
        {
          ...(requestInfo || {}),
          contentTypes: getContentTypes([requestInfo]),
          type: getTypeFromRequestInfo(requestInfo, parsedSchemas, operationId),
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

const getRouteParams = (routeInfo, route) => {
  const { parameters } = routeInfo;
  const pathParamMatches = (route || "").match(/{(([a-zA-Z]-?_?){1,})([0-9]{1,})?}/g);
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

    if (refTypeInfo && refTypeInfo.rawTypeData.in && refTypeInfo.rawTypeData) {
      if (!routeParams[refTypeInfo.rawTypeData.in]) {
        routeParams[refTypeInfo.rawTypeData.in] = [];
      }

      routeParams[refTypeInfo.rawTypeData.in].push({
        ...refTypeInfo.rawTypeData,
        ...(refTypeInfo.rawTypeData.schema || {}),
      });
    } else {
      if (!parameter.in) return;

      if (!routeParams[parameter.in]) {
        routeParams[parameter.in] = [];
      }

      routeParams[parameter.in].push({
        ...parameter,
        ...(parameter.schema || {}),
      });
    }
  });

  // used in case when path parameters is not declared in requestInfo.parameters ("in": "path")
  _.each(pathParamMatches, (match) => {
    const paramName = _.replace(match, /\{|\}/g, "");

    if (!paramName) return;

    const alreadyExist = _.some(routeParams.path, (parameter) => parameter.name === paramName);

    if (!alreadyExist) {
      routeParams.path.push({
        name: paramName,
        required: true,
        type: "string",
        description: "",
        in: "path",
      });
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
  OTHER: "OTHER",
};

const getContentKind = (contentTypes) => {
  if (contentTypes.includes("application/json")) {
    return CONTENT_KIND.JSON;
  }

  if (contentTypes.includes("application/x-www-form-urlencoded")) {
    return CONTENT_KIND.URL_ENCODED;
  }

  if (contentTypes.includes("multipart/form-data")) {
    return CONTENT_KIND.FORM_DATA;
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
    type = getTypeFromRequestInfo(requestBody, parsedSchemas, operationId);

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

  const responseInfos = getRequestInfoTypes(responses, parsedSchemas, operationId);

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

const parseRoutes = ({ usageSchema, parsedSchemas, moduleNameIndex, extractRequestParams }) => {
  const { paths, security: globalSecurity } = usageSchema;
  const pathsEntries = _.entries(paths);
  addToConfig({
    routeNameDuplicatesMap: new Map(),
  });

  return pathsEntries.reduce((routes, [route, routeInfoByMethodsMap]) => {
    if (route.startsWith("x-")) return routes;

    const routeInfosMap = createRequestsMap(routeInfoByMethodsMap);

    return [
      ...routes,
      ..._.map(routeInfosMap, (routeInfo, method) => {
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

        const routeId = nanoid(12);
        const moduleName = _.camelCase(_.compact(_.split(route, "/"))[moduleNameIndex]);
        const hasSecurity = !!(
          (globalSecurity && globalSecurity.length) ||
          (security && security.length)
        );

        const routeParams = getRouteParams(routeInfo, route);

        const pathArgs = routeParams.path.map((pathArgSchema) => ({
          name: pathArgSchema.name,
          optional: !pathArgSchema.required,
          type: getInlineParseContent(pathArgSchema.schema),
          description: pathArgSchema.description,
        }));

        const requestBodyInfo = getRequestBodyInfo(routeInfo, routeParams, parsedSchemas);
        const responseBodyInfo = getResponseBodyInfo(routeInfo, routeParams, parsedSchemas);

        const queryObjectSchema = convertRouteParamsIntoObject(routeParams.query);

        const routeName = getRouteName({
          operationId,
          method,
          route,
          moduleName,
          responsesTypes: responseBodyInfo.responses,
          description,
          tags,
          summary,
          pathArgs,
        });

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
          },
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

        const routeData = {
          id: routeId,
          namespace: _.replace(moduleName, /^(\d)/, "v$1"),
          routeName,
          routeParams,
          requestBodyInfo,
          responseBodyInfo,
          request: {
            contentTypes: requestBodyInfo.contentTypes,
            parameters: pathArgs,
            query: specificArgs.query,
            path: route.replace(/{/g, "${"),
            formData: requestBodyInfo.contentKind === CONTENT_KIND.FORM_DATA,
            isQueryBody: requestBodyInfo.contentKind === CONTENT_KIND.URL_ENCODED,
            security: hasSecurity,
            method: method,
            payload: specificArgs.body,
            params: specificArgs.requestParams,
            requestParams: requestParamsSchema,
          },
          response: {
            contentTypes: responseBodyInfo.contentTypes,
            type: responseBodyInfo.success.type,
            errorType: responseBodyInfo.error.type,
          },
          raw: {
            operationId,
            method,
            route,
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
          },
        };

        return config.hooks.onCreateRoute(routeData) || routeData;
      }),
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
          routes: packRoutes,
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
