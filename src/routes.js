const _ = require("lodash");
const { collect } = require("./utils");
const { parseSchema, getRefType, formDataTypes } = require("./schema");
const { checkAndRenameModelName } = require("./modelNames");
const { inlineExtraFormatters } = require("./typeFormatters");
const {
  DEFAULT_PRIMITIVE_TYPE,
  DEFAULT_BODY_ARG_NAME,
  SUCCESS_RESPONSE_STATUS_RANGE,
} = require("./constants");
const { formatDescription } = require("./common");
const { config } = require("./config");

const methodAliases = {
  get: (pathName, hasPathInserts) =>
    _.camelCase(`${pathName}_${hasPathInserts ? "detail" : "list"}`),
  post: (pathName, hasPathInserts) => _.camelCase(`${pathName}_create`),
  put: (pathName, hasPathInserts) => _.camelCase(`${pathName}_update`),
  patch: (pathName, hasPathInserts) => _.camelCase(`${pathName}_partial_update`),
  delete: (pathName, hasPathInserts) => _.camelCase(`${pathName}_delete`),
};

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
    const { content } = parseSchema(schema, "none", inlineExtraFormatters);
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
    if (_.find(parsedSchemas, (schema) => schema.name === typeNameWithoutOpId))
      return checkAndRenameModelName(typeNameWithoutOpId);

    switch (refTypeInfo.componentName) {
      case "schemas":
        return checkAndRenameModelName(refTypeInfo.typeName);
      case "responses":
      case "requestBodies":
        return parseSchema(
          getSchemaFromRequestType(refTypeInfo.rawTypeData),
          "none",
          inlineExtraFormatters,
        ).content;
      default:
        return parseSchema(refTypeInfo.rawTypeData, "none", inlineExtraFormatters).content;
    }
  }

  return DEFAULT_PRIMITIVE_TYPE;
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
  DEFAULT_PRIMITIVE_TYPE;

const getErrorReturnType = (responses, parsedSchemas, operationId) =>
  _.uniq(
    findBadResponses(responses)
      .map((response) => getTypeFromRequestInfo(response, parsedSchemas, operationId))
      .filter((type) => type !== DEFAULT_PRIMITIVE_TYPE),
  ).join(" | ") || DEFAULT_PRIMITIVE_TYPE;

const createCustomOperationId = (method, route, moduleName) => {
  const hasPathInserts = /\{(\w){1,}\}/g.test(route);
  const splitedRouteBySlash = _.compact(_.replace(route, /\{(\w){1,}\}/g, "").split("/"));
  const routeParts = (splitedRouteBySlash.length > 1
    ? splitedRouteBySlash.splice(1)
    : splitedRouteBySlash
  ).join("_");
  return routeParts.length > 3 && methodAliases[method]
    ? methodAliases[method](routeParts, hasPathInserts)
    : _.camelCase(_.lowerCase(method) + "_" + [moduleName].join("_")) || "index";
};

const getRouteName = (operationId, method, route, moduleName) => {
  if (operationId) return operationId;
  if (route === "/") return `${_.lowerCase(method)}Root`;
  return createCustomOperationId(method, route, moduleName);
};

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

const parseRoutes = ({ paths, security: globalSecurity }, parsedSchemas) =>
  _.entries(paths).reduce((routes, [route, requestInfoByMethodsMap]) => {
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
        } = requestInfo;
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

        const moduleName = _.camelCase(_.compact(_.split(route, "/"))[0]);

        const routeName = getRouteName(operationId, method, route, moduleName);
        const name = _.camelCase(routeName);

        const responsesTypes = getTypesFromResponses(responses, parsedSchemas, operationId);

        const formDataObjectSchema = hasFormDataParams
          ? convertRouteParamsIntoObject(formDataParams)
          : formDataRequestBody
          ? getSchemaFromRequestType(requestBody)
          : null;
        const queryObjectSchema = convertRouteParamsIntoObject(queryParams);

        const bodyParamName =
          requestInfo.requestBodyName || (requestBody && requestBody.name) || DEFAULT_BODY_ARG_NAME;

        const queryType = queryParams.length
          ? parseSchema(queryObjectSchema, null, inlineExtraFormatters).content
          : null;

        let bodyType = null;

        if (formDataObjectSchema) {
          bodyType = parseSchema(formDataObjectSchema, null, inlineExtraFormatters).content;
        } else if (requestBody) {
          bodyType = getTypeFromRequestInfo(requestBody, parsedSchemas, operationId);

          // TODO: Refactor that.
          // It needed for cases when swagger schema is not declared request body type as form data
          // but request body data type contains form data types like File
          if (formDataTypes.some((formDataType) => _.includes(bodyType, `: ${formDataType}`))) {
            formDataRequestBody = true;
          }
        }

        // Gets all in path parameters from route
        // Example: someurl.com/{id}/{name}
        // returns: ["id", "name"]
        const insideRoutePathArgs = _.compact(
          _.split(route, "{").map((part) => (part.includes("}") ? part.split("}")[0] : null)),
        );

        // Path args - someurl.com/{id}/{name}
        // id, name its path args
        const pathArgs = insideRoutePathArgs.length
          ? _.map(pathParams, (param) => ({
              name: param.name,
              optional: !param.required,
              type: parseSchema(param.schema, null, inlineExtraFormatters).content,
            }))
          : [];

        insideRoutePathArgs.forEach((routePathArg) => {
          // Cases when in path parameters is not exist in "parameters"
          if (!pathArgs.find((pathArg) => pathArg && pathArg.name === routePathArg)) {
            pathArgs.push({
              name: routePathArg,
              optional: false,
              type: "string",
            });
          }
        });

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
          tags?.length && ` * @tags ${tags.join(", ")}`,
          ` * @name ${routeName}`,
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
        const upperCaseMethod = _.upperCase(method);

        return {
          name,
          jsDocDescription,
          jsDocLines,
          namespace: _.replace(moduleName, /^(\d)/, "v$1"),
          request: {
            parameters: pathArgs,
            query: specificArgs.query,
            path,
            formData: hasFormDataParams || formDataRequestBody,
            security: hasSecurity,
            method: upperCaseMethod,
            payload: specificArgs.body,
            params: specificArgs.requestParams,
          },
          response: {
            type: getReturnType(responses, parsedSchemas, operationId),
            errorType: getErrorReturnType(responses, parsedSchemas, operationId),
          },
        };
      }),
    ];
  }, []);

const groupRoutes = (routes) => {
  const duplicates = {};
  return _.reduce(
    routes.reduce(
      (modules, route) => {
        if (route.namespace) {
          if (!modules[route.namespace]) {
            modules[route.namespace] = [];
          }

          if (!duplicates[route.namespace]) duplicates[route.namespace] = {};
          if (!duplicates[route.namespace][route.name]) {
            duplicates[route.namespace][route.name] = 1;
          } else {
            const routeName = route.name;
            route.jsDocLines += ` * @originalName ${routeName}\n`;
            route.jsDocLines += ` * @duplicate\n`;
            const duplicateNumber = ++duplicates[route.namespace][routeName];
            route.name += duplicateNumber;
            route.pascalName += duplicateNumber;
            console.warn(
              `🥵  Module "${route.namespace}" already have method "${routeName}()"`,
              `\n🥵  This method has been renamed to "${route.name}()" to solve conflict names.`,
            );
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
