const _ = require("lodash");
const { collect } = require("./utils");
const { parseSchema, getRefType, formDataTypes, getInlineParseContent } = require("./schema");
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

const getSchemaFromRequestType = (requestType) => {
  const content = _.get(requestType, "content");

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

const getTypeFromRequestInfo = (requestInfo, parsedSchemas, operationId, contentType) => {
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

const getTypesFromResponses = (responses, parsedSchemas, operationId) =>
  _.reduce(
    responses,
    (acc, response, status) => {
      return [
        ...acc,
        {
          type: getTypeFromRequestInfo(response, parsedSchemas, operationId),
          description: formatDescription(response.description || "", true),
          status: status === "default" ? "default" : +status,
          isSuccess: isSuccessResponseStatus(status),
        },
      ];
    },
    [],
  );

const isSuccessResponseStatus = (status) =>
  (config.defaultResponseAsSuccess && status === "default") ||
  (+status >= SUCCESS_RESPONSE_STATUS_RANGE[0] && +status < SUCCESS_RESPONSE_STATUS_RANGE[1]);

const findBadResponses = (responses) =>
  _.filter(responses, (v, status) => !isSuccessResponseStatus(status));

const findSuccessResponse = (responses) =>
  _.find(responses, (v, status) => isSuccessResponseStatus(status));

const getReturnType = (responses, parsedSchemas, operationId) =>
  getTypeFromRequestInfo(findSuccessResponse(responses), parsedSchemas, operationId) ||
  TS_KEYWORDS.ANY;

const getErrorReturnType = (responses, parsedSchemas, operationId) =>
  _.uniq(
    findBadResponses(responses)
      .map((response) => getTypeFromRequestInfo(response, parsedSchemas, operationId))
      .filter((type) => type !== TS_KEYWORDS.ANY),
  ).join(" | ") || TS_KEYWORDS.ANY;

const getRouteParams = (parameters, where) =>
  collect(parameters, (parameter) => {
    if (parameter.in === where) return parameter;

    const refTypeInfo = getRefType(parameter);
    return refTypeInfo && refTypeInfo.rawTypeData.in === where && refTypeInfo.rawTypeData;
  });

const convertRouteParamsIntoObject = (params) =>
  _.reduce(
    params,
    (objectSchema, schemaPart) => ({
      ...objectSchema,
      properties: {
        ...objectSchema.properties,
        [_.get(schemaPart, "name")]: _.merge(
          _.omit(schemaPart, "in", "schema"),
          _.get(schemaPart, "schema"),
        ),
      },
    }),
    {
      properties: {},
      type: "object",
    },
  );

const createRequestsMap = (requestInfoByMethodsMap) => {
  const parameters = _.get(requestInfoByMethodsMap, "parameters");

  return _.reduce(
    requestInfoByMethodsMap,
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

const collectPathParams = ({ pathParams, route }) => {
  const routePathArgs = _.compact(
    _.split(route, "{").map((part) => (part.includes("}") ? part.split("}")[0] : null)),
  );

  return _.uniqBy(
    _.compact([
      ...(routePathArgs.length
        ? _.map(pathParams, (param) => ({ ...param, ...(param.schema || {}), in: "path" }))
        : []),
      ..._.map(routePathArgs, (paramName) => ({
        name: paramName,
        required: true,
        type: "string",
        description: "",
        in: "path",
      })),
    ]),
    "name",
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

  if (extractRequestParams) {
    return createComponent("schemas", classNameCase(`${routeName.usage} Params`), { ...schema });
  }

  return schema;
};

const parseRoutes = ({ usageSchema, parsedSchemas, moduleNameIndex, extractRequestParams }) => {
  const { paths, security: globalSecurity } = usageSchema;
  const pathsEntries = _.entries(paths);
  addToConfig({
    routeNameDuplicatesMap: new Map(),
  });

  return pathsEntries.reduce((routes, [route, requestInfoByMethodsMap]) => {
    if (route.startsWith("x-")) return routes;

    const requestsMap = createRequestsMap(requestInfoByMethodsMap);

    return [
      ...routes,
      ..._.map(requestsMap, (requestInfo, method) => {
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
        } = requestInfo;
        const routeId = nanoid(12);
        const hasSecurity = !!(
          (globalSecurity && globalSecurity.length) ||
          (security && security.length)
        );

        const formDataParams = getRouteParams(parameters, "formData");
        const pathParams = getRouteParams(parameters, "path");
        const queryParams = getRouteParams(parameters, "query");
        const requestBodyType = getSchemaFromRequestType(requestBody);

        const hasFormDataParams = formDataParams && !!formDataParams.length;
        let formDataRequestBody =
          requestBodyType && requestBodyType.dataType === "multipart/form-data";
        const moduleName = _.camelCase(_.compact(_.split(route, "/"))[moduleNameIndex]);
        const responsesTypes = getTypesFromResponses(responses, parsedSchemas, operationId);
        const formDataObjectSchema = hasFormDataParams
          ? convertRouteParamsIntoObject(formDataParams)
          : formDataRequestBody
          ? getSchemaFromRequestType(requestBody)
          : null;
        const queryObjectSchema = convertRouteParamsIntoObject(queryParams);

        const bodyParamName =
          requestBodyName || (requestBody && requestBody.name) || DEFAULT_BODY_ARG_NAME;

        const pathArgsSchemas = collectPathParams({
          pathParams,
          route,
        });
        const pathArgs = pathArgsSchemas.map((pathArgSchema) => ({
          name: pathArgSchema.name,
          optional: !pathArgSchema.required,
          type: getInlineParseContent(pathArgSchema.schema),
          description: pathArgSchema.description,
        }));

        const routeName = getRouteName({
          operationId,
          method,
          route,
          moduleName,
          responsesTypes,
          description,
          tags,
          summary,
          pathArgs,
        });

        const requestParamsSchema = createRequestParamsSchema({
          queryParams,
          pathArgsSchemas,
          queryObjectSchema,
          extractRequestParams,
          routeName,
        });

        const queryType = queryParams.length ? getInlineParseContent(queryObjectSchema) : null;

        let bodyType = null;

        if (formDataObjectSchema) {
          bodyType = getInlineParseContent(formDataObjectSchema);
        } else if (requestBody) {
          bodyType = getTypeFromRequestInfo(requestBody, parsedSchemas, operationId);

          // TODO: Refactor that.
          // It needed for cases when swagger schema is not declared request body type as form data
          // but request body data type contains form data types like File
          if (formDataTypes.some((formDataType) => _.includes(bodyType, `: ${formDataType}`))) {
            formDataRequestBody = true;
          }
        }

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
          body: bodyType
            ? {
                name: bodyParamName,
                optional:
                  typeof requestBody.required === "undefined" ? false : !requestBody.required,
                type: bodyType,
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
        const jsDocDescription =
          description && ` * @description ${formatDescription(description, true)}`;
        const jsDocLines = _.compact([
          _.size(tags) && ` * @tags ${tags.join(", ")}`,
          ` * @name ${routeId}`,
          summary && ` * @summary ${summary}`,
          ` * @request ${_.upperCase(method)}:${route}`,
          hasSecurity && ` * @secure`,
          ...(config.generateResponses && responsesTypes.length
            ? responsesTypes.map(
                ({ type, status, description, isSuccess }) =>
                  ` * @response \`${status}\` \`${type}\` ${description}`,
              )
            : []),
        ]).join("\n");

        const path = route.replace(/{/g, "${");

        const response = {
          type: getReturnType(responses, parsedSchemas, operationId),
          errorType: getErrorReturnType(responses, parsedSchemas, operationId),
        };

        const routeData = {
          id: routeId,
          jsDocDescription,
          jsDocLines,
          namespace: _.replace(moduleName, /^(\d)/, "v$1"),
          request: {
            parameters: pathArgs,
            query: specificArgs.query,
            path,
            formData: hasFormDataParams || formDataRequestBody,
            security: hasSecurity,
            method: method,
            payload: specificArgs.body,
            params: specificArgs.requestParams,
            requestParams: requestParamsSchema,
          },
          response,
          routeName,
          raw: {
            operationId,
            method,
            route,
            moduleName,
            responsesTypes,
            description,
            tags,
            summary,
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
