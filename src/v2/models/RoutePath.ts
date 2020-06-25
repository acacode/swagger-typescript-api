import * as _ from "lodash";
import { TemplateConfigRoute, FuncArg } from "../interfaces/template";
import { Path } from "./PathPart";
import { TransferContentKind } from "./TransferContent";
import { ParameterKind } from "./components/ParameterContainer";

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
    const responsesTypes = $path.responses.array;

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

    // let bodyType = null;

    (this.moduleName = _.replace($path.moduleName, /^(\d)/, "v$1")),
      (this.security = $path.isSecure);
    this.hasQuery = $path.hasQueryParams;
    this.hasFormDataParams =
      $path.hasFormDataParams || $path.requestBody.transferIs(TransferContentKind.FormData);
    // queryType = queryType || "{}",
    this.queryType = "{}"; // TODO = queryType
    // bodyType = bodyType || "never",
    this.bodyType = "never"; // TODO: bodyType
    (this.name = _.camelCase($path.operationId)),
      (this.pascalName = _.upperFirst($path.operationId)),
      (this.comments = []); // TODO:
    this.routeArgs = []; // TODO:
    (this.specificArgs = {
      body: undefined,
      query: undefined,
      requestParams: undefined,
    }),
      (this.method = _.upperCase($path.method));
    this.path = this.escapedPath;
    this.returnType = "string";
    this.errorReturnType = "string";
    this.bodyArg = "string";
    this.requestMethodContent = "";
  }

  get escapedPath() {
    return _.replace(this.$path.pattern, /{/g, "${");
  }
}
