const { SCHEMA_TYPES } = require("../constants");
const _ = require("lodash");

class SchemaFormatters {
  /**
   * @type {CodeGenConfig}
   */
  config;
  /**
   * @type {Logger}
   */
  logger;
  /**
   * @type {SchemaParser}
   */
  schemaParser;
  /**
   * @type {Templates}
   */
  templates;

  constructor(config, logger, schemaParser, templates) {
    this.config = config;
    this.logger = logger;
    this.schemaParser = schemaParser;
    this.templates = templates;
  }

  base = {
    [SCHEMA_TYPES.ENUM]: (parsedSchema) => {
      if (this.config.generateUnionEnums) {
        return {
          ...parsedSchema,
          $content: parsedSchema.content,
          content: this.config.Ts.UnionType(_.map(parsedSchema.content, ({ value }) => value)),
        };
      }

      return {
        ...parsedSchema,
        $content: parsedSchema.content,
        content: this.config.Ts.EnumFieldsWrapper(parsedSchema.content),
      };
    },
    [SCHEMA_TYPES.OBJECT]: (parsedSchema) => {
      if (parsedSchema.nullable) return this.inline[SCHEMA_TYPES.OBJECT](parsedSchema);
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
              _.compact([
                ..._.map(parsedSchema.content, ({ value }) => `${value}`),
                parsedSchema.nullable && this.config.Ts.Keyword.Null,
              ]),
            ),
      };
    },
    [SCHEMA_TYPES.OBJECT]: (parsedSchema) => {
      if (_.isString(parsedSchema.content)) {
        return {
          ...parsedSchema,
          typeIdentifier: this.config.Ts.Keyword.Type,
          content: this.schemaParser.schemaUtils.safeAddNullToType(parsedSchema.content),
        };
      }

      return {
        ...parsedSchema,
        typeIdentifier: this.config.Ts.Keyword.Type,
        content: this.schemaParser.schemaUtils.safeAddNullToType(
          parsedSchema,
          parsedSchema.content.length
            ? this.config.Ts.ObjectWrapper(this.formatObjectContent(parsedSchema.content))
            : this.config.Ts.RecordType(Ts.Keyword.String, this.config.Ts.Keyword.Any),
        ),
      };
    },
  };

  /**
   * @param parsedSchema {Record<string, any>}
   * @param formatType {"base" | "inline"}
   */
  formatSchema = (parsedSchema, formatType = "base") => {
    const schemaType = _.get(parsedSchema, ["schemaType"]) || _.get(parsedSchema, ["$parsed", "schemaType"]);
    const formatterFn = _.get(this, [formatType, schemaType]);
    return (formatterFn && formatterFn(parsedSchema)) || parsedSchema;
  };

  formatDescription = (description, inline) => {
    if (!description) return "";

    let prettified = description;

    prettified = _.replace(prettified, /\*\//g, "*/");

    const hasMultipleLines = _.includes(prettified, "\n");

    if (!hasMultipleLines) return prettified;

    if (inline) {
      return _(prettified)
        .split(/\n/g)
        .map((part) => _.trim(part))
        .compact()
        .join(" ")
        .valueOf();
    }

    return _.replace(prettified, /\n$/g, "");
  };

  formatObjectContent = (content) => {
    return _.map(content, (part) => {
      const extraSpace = "  ";
      const result = `${extraSpace}${part.field},\n`;

      const renderedJsDoc = this.templates.renderTemplate(this.config.templatesToRender.dataContractJsDoc, {
        data: part,
      });

      const routeNameFromTemplate = renderedJsDoc
        .split("\n")
        .map((c) => `${extraSpace}${c}`)
        .join("\n");

      if (routeNameFromTemplate) return `${routeNameFromTemplate}${result}`;

      return `${result}`;
    }).join("");
  };
}

module.exports = {
  SchemaFormatters,
};
