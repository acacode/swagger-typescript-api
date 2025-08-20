import lodash from "lodash";
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
              lodash.compact([
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
      lodash.get(parsedSchema, ["schemaType"]) ||
      lodash.get(parsedSchema, ["$parsed", "schemaType"]);
    const formatterFn = lodash.get(this, [formatType, schemaType]);
    return formatterFn?.(parsedSchema) || parsedSchema;
  };

  escapeJSDocContent = (content) => {
    if (!content) return "";
    // Escape */ sequences to prevent breaking out of JSDoc comments
    // Note: /* sequences inside JSDoc comments are harmless and don't need escaping
    return content.replace(/\*\//g, "*\\/");
  };

  formatDescription = (description, inline) => {
    if (!description) return "";

    // Check if content is already escaped - if so, don't escape again
    const isAlreadyEscaped = description.includes("*\\/");

    // Escape JSDoc comment characters only if not already escaped
    const escapedDescription = isAlreadyEscaped
      ? description
      : this.escapeJSDocContent(description);

    const hasMultipleLines = escapedDescription.includes("\n");

    if (!hasMultipleLines) return escapedDescription;

    if (inline) {
      return (
        lodash
          // @ts-expect-error TS(2339) FIXME: Property '_' does not exist on type 'LoDashStatic'... Remove this comment to see the full error message
          ._(escapedDescription)
          .split(/\n/g)
          .map((part) => part.trim())
          .compact()
          .join(" ")
          .valueOf()
      );
    }

    return escapedDescription.replace(/\n$/g, "");
  };

  formatObjectContent = (content) => {
    const fields = [];

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
