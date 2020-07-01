import * as _ from "lodash";
import { OpenAPIV3 } from "openapi-types";
import { ResponseContainer } from "./components/ResponseContainer";
import { RequestBodyContainer } from "./components/RequestBodyContainer";
import { ParameterContainer, ParameterKind } from "./components/ParameterContainer";
import { CallbackContainer } from "./components/CallbackContainer";
import { fromRecord, fromArray } from "./Component";
import { PathItemOperations, PathItemCommon } from "./Paths";
import { ResponsesGroup } from "./components/groups/ResponsesGroup";
import { SchemaContainer } from "./components/SchemaContainer";

export class Path {
  pattern: string;
  method: string;
  operation: OpenAPIV3.OperationObject;
  parameters: ParameterContainer[] = [];
  responses: ResponsesGroup;
  callbacks: Record<string, CallbackContainer> = {};
  requestBody: RequestBodyContainer;
  tags: string[];
  summary?: string;
  description?: string;

  constructor(
    pattern: string,
    method: string,
    operation: OpenAPIV3.OperationObject,
    outerData: PathItemCommon,
  ) {
    this.pattern = pattern;
    this.method = method;
    this.operation = operation;
    this.tags = operation.tags || [];
    this.summary = operation.summary;
    this.description = operation.description;
    this.requestBody = new RequestBodyContainer(
      operation.requestBody,
      operation["requestBodyName"],
    );
    this.responses = new ResponsesGroup(operation.responses);
    this.callbacks = fromRecord(CallbackContainer, operation.callbacks);
    this.parameters = [
      ...fromArray(ParameterContainer, operation.parameters),
      ...fromArray(ParameterContainer, outerData.parameters || []),
    ];
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

  paramsToSchema(kind: ParameterKind): SchemaContainer | null {
    const parameters = this.getParamsByKind(kind);

    if (!parameters.length) return null;

    return new SchemaContainer({
      type: "object",
      properties: parameters.reduce((properties, param) => {
        if (param.name) {
          properties[param.name] = param.$value;
        }

        return properties;
      }, {}),
    });
  }

  // TODO: prev name: routeName
  get operationId() {
    const existedOperationId = this.operation.operationId;

    if (existedOperationId) return existedOperationId;

    const hasPathInserts = /\{(\w){1,}\}/g.test(this.pattern);
    const splitedRouteBySlash = _.compact(_.replace(this.pattern, /\{(\w){1,}\}/g, "").split("/"));
    const routeParts = (splitedRouteBySlash.length > 1
      ? splitedRouteBySlash.splice(1)
      : splitedRouteBySlash
    ).join("_");

    return _.camelCase(
      routeParts.length > 3 && operationIdPartByMethod[this.method]
        ? operationIdPartByMethod[this.method](routeParts, hasPathInserts)
        : _.lowerCase(this.method) + "_" + [this.moduleName].join("_") || "index",
    );
  }

  get moduleName() {
    return _.camelCase(_.compact(_.split(this.pattern, "/"))[0]);
  }

  get pathArgNames() {
    return _.compact(
      _.split(this.pattern, "{").map((part) => (part.includes("}") ? part.split("}")[0] : null)),
    );
  }
}

const operationIdPartByMethod: Record<keyof PathItemOperations, any> = {
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
