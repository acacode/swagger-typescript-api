const _ = require("lodash");
const { checkAndRenameModelName } = require("./modelNames");

const formatters = {
  enum: (content) => _.map(content, ({ key, value }) => `  ${key} = ${value}`).join(",\n"),
  intEnum: (content) => _.map(content, ({ value }) => value).join(" | "),
  object: (content) =>
    _.map(content, (part) => {
      const extraSpace = "  ";
      const result = `${extraSpace}${part.field};\n`;

      const comments = [part.title, part.description].filter(Boolean);

      const commonText = comments.length
        ? [
            "",
            "/**",
            ...comments.reduce(
              (acc, comment) => [...acc, ...comment.split(/\n/g).map((part) => ` * ${part}`)],
              [],
            ),
            " */",
          ]
            .map((part) => `${extraSpace}${part}\n`)
            .join("")
        : "";

      return `${commonText}${result}`;
    }).join(""),
  type: (content) => {
    if (content.includes(" & ")) {
      return content.split(" & ").map(checkAndRenameModelName).join(" & ");
    }

    if (content.includes(" | ")) {
      return content.split(" | ").map(checkAndRenameModelName).join(" | ");
    }

    return content;
  },
  primitive: (content) => checkAndRenameModelName(content),
};

const inlineExtraFormatters = {
  object: (parsedSchema) => {
    return {
      ...parsedSchema,
      typeIdentifier: parsedSchema.content.length ? parsedSchema.typeIdentifier : "type",
      content: parsedSchema.content.length
        ? `{ ${parsedSchema.content.map((part) => part.field).join(", ")} }`
        : "object",
    };
  },
  enum: (parsedSchema) => {
    return {
      ...parsedSchema,
      content: _.map(parsedSchema.content, ({ value }) => `${value}`).join(" | "),
    };
  },
};

module.exports = {
  formatters,
  inlineExtraFormatters,
};
