const _ = require("lodash");
const { config } = require("./config");
const { TS_KEYWORDS, SCHEMA_TYPES } = require("./constants");

const formatters = {
  [SCHEMA_TYPES.ENUM]: (content) => {
    const isNumberEnum = _.some(content, (content) => typeof content.key === "number");
    const formatAsUnionType = !!(isNumberEnum || config.generateUnionEnums);

    if (formatAsUnionType) {
      return _.map(content, ({ value }) => value).join(" | ");
    }

    return _.map(content, ({ key, value }) => `  ${key} = ${value}`).join(",\n");
  },
  [SCHEMA_TYPES.OBJECT]: (content) =>
    _.map(content, (part) => {
      const extraSpace = "  ";
      const result = `${extraSpace}${part.field};\n`;

      const comments = _.uniq(_.compact([part.title, part.description]).reduce(
        (acc, comment) => [...acc, ...comment.split(/\n/g)],
        [],
      ));

      const commonText = comments.length
        ? [
            "",
            ...(comments.length === 1
              ? [`/** ${comments[0]} */`]
              : ["/**", ...comments.map((commentPart) => ` * ${commentPart}`), " */"]),
          ]
            .map((part) => `${extraSpace}${part}\n`)
            .join("")
        : "";

      return `${commonText}${result}`;
    }).join(""),
  [SCHEMA_TYPES.PRIMITIVE]: (content) => {
    return content;
  },
};

/** transform content of parsed schema to string or compact size */
const inlineExtraFormatters = {
  [SCHEMA_TYPES.OBJECT]: (parsedSchema) => {
    return {
      ...parsedSchema,
      typeIdentifier: TS_KEYWORDS.TYPE,
      content: _.isString(parsedSchema.content)
        ? parsedSchema.content
        : parsedSchema.content.length
        ? `{ ${parsedSchema.content.map((part) => part.field).join(", ")} }`
        : TS_KEYWORDS.OBJECT,
    };
  },
  [SCHEMA_TYPES.ENUM]: (parsedSchema) => {
    return {
      ...parsedSchema,
      content: parsedSchema.$ref
        ? parsedSchema.typeName
        : _.uniq(
            _.compact([
              ..._.map(parsedSchema.content, ({ value }) => `${value}`),
              parsedSchema.nullable && TS_KEYWORDS.NULL,
            ]),
          ).join(" | "),
    };
  },
};

module.exports = {
  formatters,
  inlineExtraFormatters,
};
