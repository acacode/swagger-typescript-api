import * as _ from "lodash";
import { TemplateConfigRoute, FuncArg } from "../../interfaces/template";
import { Path } from "../PathPart";
import { TransferContentKind } from "../TransferContent";
import { ParameterKind } from "../components/ParameterContainer";
import { SchemaContainer } from "../components/SchemaContainer";
import { formatDescription } from "../../transformers/utils/common";
import { Configuration } from "../../services/Configuration";
import { EXTRA_TYPES } from "../../transformers/utils/getPrimitiveType";

export class RoutePath implements TemplateConfigRoute {
  bodyArg: string;
  bodyType: string;
  errorReturnType: string;
  hasFormDataParams: boolean;
  hasQuery: boolean;
  method: string;
  moduleName: string;
  name: string;
  pascalName: string;
  path: string;
  queryType: string;
  returnType: string;
  security: boolean;

  constructor(private $path: Path) {
    this.moduleName = _.replace($path.moduleName, /^(\d)/, "v$1");
    this.security = $path.isSecure;
    this.hasQuery = $path.hasQueryParams;
    this.hasFormDataParams =
      $path.hasFormDataParams || $path.requestBody.transferIs(TransferContentKind.FormData);
    this.queryType = this.internalQueryType || EXTRA_TYPES.EMPTY_OBJECT;
    this.bodyType = this.internalBodyType || EXTRA_TYPES.NEVER;
    this.name = _.camelCase($path.operationId);
    this.pascalName = _.upperFirst($path.operationId);
    this.method = _.upperCase($path.method);
    this.path = this.escapedPath;
    this.returnType = $path.responses.transformResponses($path.responses.success, { inline: true });
    this.errorReturnType = $path.responses.transformResponses($path.responses.bad, {
      inline: true,
    });
    this.bodyArg = this.internalBodyType ? $path.requestBody.name : EXTRA_TYPES.NULL;
  }

  get escapedPath() {
    return _.replace(this.$path.pattern, /{/g, "${");
  }

  /** this.request($requestPath, $method, $requestParamsName, ...) */
  get requestMethodContent() {
    const requestPath = `\`${this.escapedPath}${
      this.queryObjectSchema ? `\${this.addQueryParams(${this.specificArgs.query.name})}` : ""
    }\``;
    const method = `"${_.upperCase(this.$path.method)}"`;
    const requestParamsName = `${this.specificArgs.requestParams.name}`;
    const bodyParamName = this.bodyObjectSchema && this.$path.requestBody.name;
    const bodyType =
      (this.bodyTransferKind !== TransferContentKind.Json || this.$path.isSecure) &&
      this.bodyTransferKind;
    const isSecure = this.$path.isSecure && "true";
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

    return _.compact([
      requestPath,
      method,
      requestParamsName,
      bodyParamName,
      bodyType,
      isSecure,
    ]).join(", ");
  }

  get comments() {
    const {
      tags,
      operationId,
      summary,
      method,
      pattern,
      description,
      isSecure,
      responses,
    } = this.$path;

    return _.compact([
      tags.length && `@tags ${tags.join(", ")}`,
      `@name ${operationId}`,
      summary && `@summary ${summary}`,
      `@request ${_.upperCase(method)}:${pattern}`,
      // requestBody && requestBody.description && `@body ${requestBody.description}`,
      isSecure && `@secure`,
      description && `@description ${formatDescription(description, true)}`,
      ...(Configuration.value.generateResponses && responses.length
        ? responses.map(
            (response, code) =>
              `@response \`${code}\` \`${response.transformContent({ inline: true })}\` ${
                response.description
              }`,
          )
        : []),
    ]);
  }

  get specificArgs() {
    return {
      query: this.queryObjectSchema
        ? {
            name: this.pathArgs.some((pathArg) => pathArg.name === "query")
              ? "queryParams"
              : "query",
            optional:
              this.queryObjectSchema.properties && !this.queryObjectSchema.properties.hasRequired,
            type: this.internalQueryType,
          }
        : void 0,
      body: this.bodyObjectSchema
        ? {
            name: this.$path.requestBody.name,
            optional: !this.$path.requestBody.required,
            type: this.internalBodyType,
          }
        : void 0,
      requestParams: {
        name: this.pathArgs.some((pathArg) => pathArg.name === "params")
          ? "requestParams"
          : "params",
        optional: true,
        type: "RequestParams",
      },
    };
  }

  get routeArgs() {
    let routeArgs: FuncArg[] = _.compact([
      ...this.pathArgs,
      this.specificArgs.query,
      this.specificArgs.body,
    ]);

    if (routeArgs.some((routeArg) => routeArg.optional)) {
      routeArgs = _.flatten(
        _.values(
          _.reduce(
            routeArgs,
            (filteredArgs, routeArg) => {
              if (routeArg.optional) {
                filteredArgs.optionalArgs.push(routeArg);
              } else {
                filteredArgs.requiredArgs.push(routeArg);
              }

              return filteredArgs;
            },
            {
              optionalArgs: [] as FuncArg[],
              requiredArgs: [] as FuncArg[],
            },
          ),
        ),
      );
    }

    routeArgs.push(this.specificArgs.requestParams);

    return routeArgs;
  }

  private get pathArgs() {
    const pathArgs: FuncArg[] = this.$path.pathArgNames.length
      ? _.map(this.pathParams, (param) => ({
          name: param.name,
          optional: !param.required,
          type: param.schema.transform({ inline: true }),
        }))
      : [];

    this.$path.pathArgNames.forEach((routePathArg) => {
      // Cases when in path parameters is not exist in "parameters"
      if (!pathArgs.find((pathArg) => pathArg && pathArg.name === routePathArg)) {
        pathArgs.push({
          name: routePathArg,
          optional: false,
          type: "string",
        });
      }
    });

    return pathArgs;
  }

  private get internalQueryType() {
    return this.queryObjectSchema && this.queryObjectSchema.transform({ inline: true });
  }

  private get internalBodyType() {
    return this.bodyObjectSchema && this.bodyObjectSchema.transform({ inline: true });
  }

  private get bodyObjectSchema() {
    let bodyObjectSchema: SchemaContainer | null = null;

    if (this.$path.requestBody.exist && this.$path.requestBody.content) {
      bodyObjectSchema = this.$path.requestBody.content.getActualSchema();
    } else if (this.$path.hasParams(ParameterKind.FormData)) {
      bodyObjectSchema = this.$path.paramsToSchema(ParameterKind.FormData);
    } else if (this.$path.hasParams(ParameterKind.Body)) {
      bodyObjectSchema = this.$path.paramsToSchema(ParameterKind.Body);
    }

    return bodyObjectSchema;
  }

  private get bodyTransferKind() {
    if (!this.bodyObjectSchema) return null;

    if (this.$path.requestBody.exist && this.$path.requestBody.content) {
      return this.$path.requestBody.content.kind;
    }
    if (this.$path.hasParams(ParameterKind.FormData)) {
      return TransferContentKind.FormData;
    }
    if (this.$path.hasParams(ParameterKind.Body)) {
      return TransferContentKind.Json;
    }

    return null;
  }

  private get queryObjectSchema() {
    return this.$path.paramsToSchema(ParameterKind.Query);
  }

  private get pathParams() {
    return this.$path.getParamsByKind(ParameterKind.Path);
  }
}
