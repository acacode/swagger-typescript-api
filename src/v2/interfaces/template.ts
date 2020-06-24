import { ValuesType } from "utility-types";

export interface FuncArg {
  name: string;
  optional: boolean;
  type: string;
}

export interface TemplateConfigRoute {
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
}

export interface ApiConfig {
  generic: { name: string; defaultValue: string }[];
  props: FuncArg[];
  baseUrl?: string;
  title?: string;
  version?: string;
  description: string[];
  hasDescription: boolean;
}

export interface ModelType {
  content: string;
  description: string;
  name: string;
  typeIdentifier: string;
}

export interface GroupedRoutes {
  combined: { moduleName: string; routes: TemplateConfigRoute[] }[];
  outOfModule: TemplateConfigRoute[];
}

export interface TemplateConfig {
  apiConfig: ApiConfig;
  modelTypes: ModelType[];
  hasFormDataRoutes: boolean;
  hasSecurityRoutes: boolean;
  hasQueryRoutes: boolean;
  generateResponses: boolean;
  routes: GroupedRoutes;
}

export abstract class TemplateConfigPart<T extends ValuesType<TemplateConfig>> {
  abstract toTemplatePart(): T;
}
