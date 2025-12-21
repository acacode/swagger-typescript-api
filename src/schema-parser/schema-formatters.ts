import { compact } from "es-toolkit";
import { get } from "es-toolkit/compat";
import type { CodeGenConfig } from "../configuration.js";
import { SCHEMA_TYPES } from "../constants.js";
import type { TemplatesWorker } from "../templates-worker.js";
import type { SchemaParser } from "./schema-parser.js";
import type { SchemaParserFabric } from "./schema-parser-fabric.js";
import type { SchemaUtils } from "./schema-utils.js";

export class SchemaFormatters {
  config: CodeGenConfig;
  templatesWorker: TemplatesWorker;
  schemaUtils: SchemaUtils;

  constructor(schemaParser: SchemaParser | SchemaParserFabric) {
    this.config = schemaParser.config;
    this.schemaUtils = schemaParser.schemaUtils;
    this.templatesWorker = schemaParser.templatesWorker;
  }

  base = {
    [SCHEMA_TYPES.ENUM]: (parsedSchema) => {
      if (this.config.generateUnionEnums) {
        return {
          ...parsedSchema,
          $content: parsedSchema.content,
          content: this.config.Ts.UnionType(
            parsedSchema.content.map(({ value }) => value),
          ),
        };
      }

      return {
        ...parsedSchema,
        $content: parsedSchema.content,
        content: this.config.Ts.EnumFieldsWrapper(parsedSchema.content),
      };
    },
    [SCHEMA_TYPES.OBJECT]: (parsedSchema) => {
      if (parsedSchema.nullable)
        return this.inline[SCHEMA_TYPES.OBJECT](parsedSchema);
      return {
        ...parsedSchema,
        $content: parsedSchema.content,
        content: this.formatObjectContent(parsedSchema.content),
      };
    },
    [SCHEMA_TYPES.PRIMITIVE]: (parsedSchema) => {
      return {
        ...parsedSchema,
        $content: parsedSchema.content,
      };
    },
  };
  inline = {
    [SCHEMA_TYPES.ENUM]: (parsedSchema) => {
      return {
        ...parsedSchema,
        content: parsedSchema.$ref
          ? parsedSchema.typeName
          : this.config.Ts.UnionType(
              compact([
                ...parsedSchema.content.map(({ value }) => `${value}`),
                parsedSchema.nullable && this.config.Ts.Keyword.Null,
              ]),
            ) || this.config.Ts.Keyword.Any,
      };
    },
    [SCHEMA_TYPES.OBJECT]: (parsedSchema) => {
      if (typeof parsedSchema.content === "string")
        return {
          ...parsedSchema,
          typeIdentifier: this.config.Ts.Keyword.Type,
          content: this.schemaUtils.safeAddNullToType(parsedSchema.content),
        };

      return {
        ...parsedSchema,
        typeIdentifier: this.config.Ts.Keyword.Type,
        content: this.schemaUtils.safeAddNullToType(
          parsedSchema,
          parsedSchema.content.length
            ? this.config.Ts.ObjectWrapper(
                this.formatObjectContent(parsedSchema.content),
              )
            : this.config.Ts.RecordType(
                this.config.Ts.Keyword.String,
                this.config.Ts.Keyword.Any,
              ),
        ),
      };
    },
  };

  formatSchema = (
    parsedSchema: Record<string, any>,
    formatType: "base" | "inline" = "base",
  ) => {
    const schemaType =
      get(parsedSchema, ["schemaType"]) ||
      get(parsedSchema, ["$parsed", "schemaType"]);
    const formatterFn = get(this, [formatType, schemaType]);
    return formatterFn?.(parsedSchema) || parsedSchema;
  };

  formatDescription = (description: string | undefined, inline?: boolean) => {
    if (!description) return "";

    const hasMultipleLines = description.includes("\n");

    if (!hasMultipleLines) return description;

    if (inline) {
      return compact(description.split(/\n/g).map((part) => part.trim())).join(
        " ",
      );
    }

    return description.replace(/\n$/g, "");
  };

  formatObjectContent = (content) => {
    const fields: string[] = [];

    for (const part of content) {
      const extraSpace = "  ";
      const result = `${extraSpace}${part.field},\n`;

      const renderedJsDoc = this.templatesWorker.renderTemplate(
        this.config.templatesToRender.dataContractJsDoc,
        {
          data: part,
        },
      );

      const routeNameFromTemplate = renderedJsDoc
        .split("\n")
        .map((c) => `${extraSpace}${c}`)
        .join("\n");

      if (routeNameFromTemplate) {
        fields.push(`${routeNameFromTemplate}${result}`);
      } else {
        fields.push(`${result}`);
      }
    }

    return fields.join("");
  };
}
