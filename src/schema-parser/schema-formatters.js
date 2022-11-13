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
   * @type {SchemaProcessor}
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
    [SCHEMA_TYPES.OBJECT]: async (parsedSchema) => {
      if (parsedSchema.nullable) return this.inline[SCHEMA_TYPES.OBJECT](parsedSchema);
      return {
        ...parsedSchema,
        $content: parsedSchema.content,
        content: await this.formatObjectContent(parsedSchema.content),
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
    [SCHEMA_TYPES.OBJECT]: async (parsedSchema) => {
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
            ? this.config.Ts.ObjectWrapper(await this.formatObjectContent(parsedSchema.content))
            : this.config.Ts.RecordType(Ts.Keyword.String, this.config.Ts.Keyword.Any),
        ),
      };
    },
  };

  /**
   * @param parsedSchema {Record<string, any>}
   * @param cfg {{ formatType?: "base" | "inline", schemaType?: string } }
   */
  formatSchema = async (parsedSchema, { schemaType: outerSchemaType, formatType = "base" } = {}) => {
    const schemaType =
      outerSchemaType || _.get(parsedSchema, ["schemaType"]) || _.get(parsedSchema, ["$parsed", "schemaType"]);
    const formatterFn = _.get(this, [formatType, schemaType]);
    return (formatterFn && (await formatterFn(parsedSchema))) || parsedSchema;
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

  formatObjectContent = async (content) => {
    return (
      await Promise.all(
        _.map(content, async (part) => {
          const extraSpace = "  ";
          const result = `${extraSpace}${part.field},\n`;

          const renderedJsDoc = await this.templates.renderTemplate(this.config.templatesToRender.dataContractJsDoc, {
            data: part,
          });

          const routeNameFromTemplate = renderedJsDoc
            .split("\n")
            .map((c) => `${extraSpace}${c}`)
            .join("\n");

          if (routeNameFromTemplate) return `${routeNameFromTemplate}${result}`;

          return `${result}`;
        }),
      )
    ).join("");
  };
}

module.exports = {
  SchemaFormatters,
};
