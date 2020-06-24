import * as _ from "lodash";
import { OpenAPIV3 } from "openapi-types";
import { ResponseContainer } from "./components/ResponseContainer";
import { RequestBodyContainer } from "./components/RequestBodyContainer";
import { ParameterContainer, ParameterKind } from "./components/ParameterContainer";
import { CallbackContainer } from "./components/CallbackContainer";
import { fromRecord, fromArray } from "./Component";
import { PathItemOperations, PathItemCommon } from "./Paths";
import { TemplateConfigRoute } from "../interfaces/template";
import { stringify } from "querystring";
import { TransferContentKind } from "./TransferContent";

export class Path {
  parameters: ParameterContainer[] = [];
  responses: Record<string, ResponseContainer> = {};
  callbacks: Record<string, CallbackContainer> = {};
  requestBody: RequestBodyContainer;

  operationId: string;

  constructor(
    public pattern: string,
    public method: string,
    public operation: OpenAPIV3.OperationObject,
    outerData: PathItemCommon,
  ) {
    this.requestBody = new RequestBodyContainer(operation.requestBody);

    this.responses = fromRecord(ResponseContainer, operation.responses);
    this.callbacks = fromRecord(CallbackContainer, operation.callbacks);
    this.parameters = [
      ...fromArray(ParameterContainer, operation.parameters),
      ...fromArray(ParameterContainer, outerData.parameters || []),
    ];

    this.operationId = this.getOperationId();
  }

  get isSecure(): boolean {
    return !!(this.operation.security && this.operation.security.length);
  }

  get hasQueryParams(): boolean {
    return this.hasParams(ParameterKind.Query);
  }

  get hasFormDataParams(): boolean {
    return this.hasParams(ParameterKind.FormData);
  }

  get hasBodyParams(): boolean {
    return this.hasParams(ParameterKind.Body);
  }

  hasParams(kind: ParameterKind): boolean {
    return this.parameters.some((parameter) => parameter.is(kind));
  }

  getParamsByKind(kind: ParameterKind) {
    return this.parameters.filter((parameter) => parameter.is(kind));
  }

  // TODO: REFACTOR
  private getOperationId() {
    const existedOperationId = this.operation.operationId;

    if (existedOperationId) return existedOperationId;

    const hasPathInserts = /\{(\w){1,}\}/g.test(this.pattern);
    const splitedRouteBySlash = _.compact(_.replace(this.pattern, /\{(\w){1,}\}/g, "").split("/"));
    const routeParts = (splitedRouteBySlash.length > 1
      ? splitedRouteBySlash.splice(1)
      : splitedRouteBySlash
    ).join("_");

    return _.camelCase(
      routeParts.length > 3 && operationIdPartByPathMethod[this.method]
        ? operationIdPartByPathMethod[this.method](routeParts, hasPathInserts)
        : _.lowerCase(this.method) + "_" + [this.moduleName].join("_") || "index",
    );
  }

  get moduleName() {
    return _.camelCase(_.compact(_.split(this.pattern, "/"))[0]);
  }

  toTemplateConfigRoute(): TemplateConfigRoute {
    return {
      moduleName: _.replace(this.moduleName, /^(\d)/, "v$1"),
      security: this.isSecure,
      hasQuery: this.hasQueryParams,
      hasFormDataParams:
        this.hasFormDataParams || this.requestBody.transferIs(TransferContentKind.FormData),
      // queryType: queryType || "{}",
      queryType: "{}", // TODO: queryType
      // bodyType: bodyType || "never",
      bodyType: "never", // TODO: bodyType
      name: _.camelCase(this.operationId),
      pascalName: _.upperFirst(this.operationId),
      comments: [""], // TODO:
      routeArgs: [], // TODO:
      specificArgs: {
        // TODO:
        body: undefined,
        query: undefined,
        requestParams: undefined,
      },
      method: _.upperCase(this.method),
      path: _.replace(this.pattern, /{/g, "${"),
      returnType: "string",
      errorReturnType: "string",
      bodyArg: "string",
      requestMethodContent: "string",
      // returnType: getReturnType(responses, parsedSchemas, operationId),
      // errorReturnType: getErrorReturnType(responses, parsedSchemas, operationId),
      // bodyArg,
      // requestMethodContent:
      //   `\`${path}${hasQuery ? `\${this.addQueryParams(${specificArgs.query.name})}` : ""}\`,` +
      //   `"${upperCaseMethod}", ` +
      //   `${specificArgs.requestParams.name}` +
      //   _.compact([
      //     requestBody && `, ${bodyParamName}`,
      //     (hasFormDataParams || formDataRequestBody) &&
      //       `${requestBody ? "" : ", null"}, BodyType.FormData`,
      //     hasSecurity &&
      //       `${
      //         hasFormDataParams || formDataRequestBody
      //           ? ""
      //           : `${requestBody ? "" : ", null"}, BodyType.Json`
      //       }, true`,
      //   ]).join(""),
    };
  }
}

const operationIdPartByPathMethod: Record<keyof PathItemOperations, any> = {
  get: (pathName, hasPathInserts) => `${pathName}_${hasPathInserts ? "detail" : "list"}`,
  post: (pathName, hasPathInserts) => `${pathName}_create`,
  put: (pathName, hasPathInserts) => `${pathName}_update`,
  patch: (pathName, hasPathInserts) => `${pathName}_partial_update`,
  delete: (pathName, hasPathInserts) => `${pathName}_delete`,
  head: (pathName) => `${pathName}_head`,
  trace: (pathName) => `${pathName}_trace`,
  options: (pathName) => `${pathName}_options`,
};

/**
 * 
 * 
 * 
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
*/
