import * as _ from "lodash";
import { SwaggerSchemaContainer } from "../SwaggerSchemaContainer";
import { formatDescription } from "../../transformers/utils/formatDescription";
import { TemplateConfigPart, FuncArg, ApiConfig } from "../../interfaces/template";

export class HttpClient implements TemplateConfigPart<ApiConfig> {
  generic: Record<string, { defaultValue: string; name: string }>;
  props: FuncArg[];
  baseUrl?: string;
  title?: string;
  version?: string;
  description: string[];

  constructor(private schema: SwaggerSchemaContainer) {
    const { info, servers } = this.schema;
    const server = servers[0] || { url: "" };

    this.baseUrl = server.url;
    this.title = info.title;
    this.version = info.version;

    this.generic = {
      securityDataType: {
        name: "SecurityDataType",
        defaultValue: "any",
      },
    };

    this.description = _.compact([
      `@title ${info.title || "Api"}`,
      info.version && `@version ${info.version}`,
      server.url && `@baseUrl ${server.url}`,
      _.replace(formatDescription(info.description), /\n/g, "\n * "),
    ]);

    this.props = _.compact([
      {
        name: "baseUrl",
        optional: true,
        type: "string",
      },
      {
        name: "baseApiParams",
        optional: true,
        type: "RequestParams",
      },
      {
        name: "securityWorker",
        optional: true,
        type: `(securityData: ${this.generic.securityDataType.name}) => RequestParams`,
      },
    ]);
  }

  toTemplatePart() {
    const { schema, ...templatePart } = this;
    return {
      ...templatePart,
      generic: _.values(this.generic),
      hasDescription: !!this.description.length,
    };
  }
}
