const _ = require("lodash");
const { config } = require("./config");
const { TS_KEYWORDS, SCHEMA_TYPES, TS_EXTERNAL } = require("./constants");

const checkAndAddNull = (schema, value) => {
  const { nullable, type } = schema || {};
  return (nullable || !!_.get(schema, "x-nullable") || type === TS_KEYWORDS.NULL) &&
    _.isString(value) &&
    !value.includes(` ${TS_KEYWORDS.NULL}`) &&
    !value.includes(`${TS_KEYWORDS.NULL} `)
    ? `${value} | ${TS_KEYWORDS.NULL}`
    : value;
};

const formatters = {
  [SCHEMA_TYPES.ENUM]: (parsedSchema) => {
    const isNumberEnum = _.some(parsedSchema.content, (content) => typeof content.key === "number");
    const formatAsUnionType = !!(isNumberEnum || config.generateUnionEnums);

    if (formatAsUnionType) {
      return {
        ...parsedSchema,
        $content: parsedSchema.content,
        content: _.map(parsedSchema.content, ({ value }) => value).join(" | "),
      };
    }

    return {
      ...parsedSchema,
      $content: parsedSchema.content,
      content: _.map(parsedSchema.content, ({ key, value }) => `  ${key} = ${value}`).join(",\n"),
    };
  },
  [SCHEMA_TYPES.OBJECT]: (parsedSchema) => {
    if (parsedSchema.nullable) return inlineExtraFormatters[SCHEMA_TYPES.OBJECT](parsedSchema);
    return {
      ...parsedSchema,
      $content: parsedSchema.content,
      content: formatObjectContent(parsedSchema.content),
    };
  },
  [SCHEMA_TYPES.PRIMITIVE]: (parsedSchema) => {
    return {
      ...parsedSchema,
      $content: parsedSchema.content,
    };
  },
};

/** transform content of parsed schema to string or compact size */
const inlineExtraFormatters = {
  [SCHEMA_TYPES.OBJECT]: (parsedSchema) => {
    if (_.isString(parsedSchema.content)) {
      return {
        ...parsedSchema,
        typeIdentifier: TS_KEYWORDS.TYPE,
        content: checkAndAddNull(parsedSchema.content),
      };
    }

    return {
      ...parsedSchema,
      typeIdentifier: TS_KEYWORDS.TYPE,
      content: checkAndAddNull(
        parsedSchema,
        parsedSchema.content.length ? `{\n${formatObjectContent(parsedSchema.content)}\n}` : TS_EXTERNAL.RECORD,
      ),
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

const formatObjectContent = (content) => {
  return _.map(content, (part) => {
    const extraSpace = "  ";
    const result = `${extraSpace}${part.field},\n`;

    const comments = _.uniq(
      _.compact([
        part.title,
        part.description,
        part.deprecated && ` * @deprecated`,
        !_.isUndefined(part.format) && `@format ${part.format}`,
        !_.isUndefined(part.minimum) && `@min ${part.minimum}`,
        !_.isUndefined(part.maximum) && `@max ${part.maximum}`,
        !_.isUndefined(part.pattern) && `@pattern ${part.pattern}`,
        !_.isUndefined(part.example) &&
          `@example ${_.isObject(part.example) ? JSON.stringify(part.example) : part.example}`,
      ]).reduce((acc, comment) => [...acc, ...comment.split(/\n/g)], []),
    );

    const commonText = comments.length
      ? [
          ...(comments.length === 1
            ? [`/** ${comments[0]} */`]
            : ["/**", ...comments.map((commentPart) => ` * ${commentPart}`), " */"]),
        ]
          .map((part) => `${extraSpace}${part}\n`)
          .join("")
      : "";

    return `${commonText}${result}`;
  }).join("");
};

module.exports = {
  formatters,
  inlineExtraFormatters,
};
