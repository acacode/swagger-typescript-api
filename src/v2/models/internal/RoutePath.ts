import * as _ from "lodash";
import { TemplateConfigRoute, FuncArg } from "../../interfaces/template";
import { Path } from "../PathPart";
import { TransferContentKind } from "../TransferContent";
import { ParameterKind } from "../components/ParameterContainer";
import { SchemaContainer } from "../components/SchemaContainer";
import { formatDescription } from "../../utils/common";
import { Configuration } from "../../services/Configuration";
import { EXTRA_TYPES } from "../../transformers/PrimitiveSchemaTransformer";

export class RoutePath implements TemplateConfigRoute {
  bodyArg: string;
  bodyType: string;
  comments: string[];
  errorReturnType: string;
  hasFormDataParams: boolean;
  hasQuery: boolean;
  method: string;
  moduleName: string;
  name: string;
  pascalName: string;
  path: string;
  queryType: string;
  requestMethodContent: string;
  returnType: string;
  routeArgs: FuncArg[];
  security: boolean;
  specificArgs: {
    body?: FuncArg;
    query?: FuncArg;
    requestParams?: FuncArg;
  };

  constructor(private $path: Path) {
    const formDataParams = $path.getParamsByKind(ParameterKind.FormData);
    const pathParams = $path.getParamsByKind(ParameterKind.Path);
    const queryParams = $path.getParamsByKind(ParameterKind.Query);
    const requestBodyType = $path.requestBody.value;
    const responsesTypes = $path.responses.toArray();
    const asdasd = $path.responses.success;
    const queryObjectSchema = $path.paramsToSchema(ParameterKind.Query);

    // const formDataObjectSchema = hasFormDataParams
    // ? convertRouteParamsIntoObject(formDataParams)
    // : formDataRequestBody
    // ? getSchemaFromRequestType(requestBody)
    // : null;
    // const queryObjectSchema = convertRouteParamsIntoObject(queryParams);

    const bodyParamName = $path.requestBody.name;

    // const queryType = queryParams.length
    //   ? parseSchema(queryObjectSchema, null, inlineExtraFormatters).content
    //   : null;
    let bodyObjectSchema: SchemaContainer | null = null;

    if ($path.requestBody.exist) {
      bodyObjectSchema = $path.requestBody.content.getActualSchema();
    } else if ($path.hasParams(ParameterKind.FormData)) {
      bodyObjectSchema = $path.paramsToSchema(ParameterKind.FormData);
    } else if ($path.hasParams(ParameterKind.Body)) {
      bodyObjectSchema = $path.paramsToSchema(ParameterKind.Body);
    }

    const queryType = queryObjectSchema && queryObjectSchema.transform({ inline: true });
    const bodyType = bodyObjectSchema && bodyObjectSchema.transform({ inline: true });

    const pathArgs: FuncArg[] = $path.pathArgNames.length
      ? _.map(pathParams, (param) => ({
          name: param.name,
          optional: !param.required,
          type: param.schema.transform({ inline: true }),
        }))
      : [];

    $path.pathArgNames.forEach((routePathArg) => {
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
            name: pathArgs.some((pathArg) => pathArg.name === "query") ? "queryParams" : "query",
            optional: queryObjectSchema.properties && !queryObjectSchema.properties.hasRequired,
            type: queryType,
          }
        : void 0,
      body: bodyType
        ? {
            name: bodyParamName,
            optional: !$path.requestBody.required,
            type: bodyType,
          }
        : void 0,
      requestParams: {
        name: pathArgs.some((pathArg) => pathArg.name === "params") ? "requestParams" : "params",
        optional: true,
        type: "RequestParams",
      },
    };

    let routeArgs: FuncArg[] = _.compact([...pathArgs, specificArgs.query, specificArgs.body]);

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

    const comments = _.compact([
      $path.tags.length && `@tags ${$path.tags.join(", ")}`,
      `@name ${$path.operationId}`,
      $path.summary && `@summary ${$path.summary}`,
      `@request ${_.upperCase($path.method)}:${$path.pattern}`,
      // requestBody && requestBody.description && `@body ${requestBody.description}`,
      $path.isSecure && `@secure`,
      $path.description && `@description ${formatDescription($path.description, true)}`,
      ...(Configuration.value.generateResponses && $path.responses.length
        ? $path.responses.map(
            (response, code) =>
              `@response \`${code}\` \`${response.transformContent({ inline: true })}\` ${
                response.description
              }`,
          )
        : []),
    ]);

    this.moduleName = _.replace($path.moduleName, /^(\d)/, "v$1");
    this.security = $path.isSecure;
    this.hasQuery = $path.hasQueryParams;
    this.hasFormDataParams =
      $path.hasFormDataParams || $path.requestBody.transferIs(TransferContentKind.FormData);
    this.queryType = queryType || EXTRA_TYPES.EMPTY_OBJECT;
    this.bodyType = bodyType || EXTRA_TYPES.NEVER;
    this.name = _.camelCase($path.operationId);
    this.pascalName = _.upperFirst($path.operationId);
    this.comments = comments;
    this.routeArgs = routeArgs;
    this.specificArgs = specificArgs;
    this.method = _.upperCase($path.method);
    this.path = this.escapedPath;
    this.returnType = $path.responses.transformResponses($path.responses.success, { inline: true });
    this.errorReturnType = $path.responses.transformResponses($path.responses.bad, {
      inline: true,
    });
    this.bodyArg = bodyType ? $path.requestBody.name : EXTRA_TYPES.NULL;
    this.requestMethodContent =
      `\`${this.escapedPath}${
        queryType ? `\${this.addQueryParams(${specificArgs.query.name})}` : ""
      }\`,` +
      `"${_.upperCase($path.method)}", ` +
      `${specificArgs.requestParams.name}`;
    // _.compact([
    //   bodyType && `, ${bodyParamName}`,
    //   (hasFormDataParams || formDataRequestBody) &&
    //     `${requestBody ? "" : ", null"}, BodyType.FormData`,
    //   hasSecurity &&
    //     `${
    //       hasFormDataParams || formDataRequestBody
    //         ? ""
    //         : `${requestBody ? "" : ", null"}, BodyType.Json`
    //     }, true`,
    // ]).join("");
  }

  get escapedPath() {
    return _.replace(this.$path.pattern, /{/g, "${");
  }
}
