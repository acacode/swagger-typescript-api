const _ = require("lodash");
const { config } = require("./config");
const { SCHEMA_TYPES } = require("./constants");
const { Ts } = require("./code-gen-constructs");

const checkAndAddNull = (schema, value) => {
  const { nullable, type } = schema || {};
  return (nullable || !!_.get(schema, "x-nullable") || type === Ts.Keyword.Null) &&
    _.isString(value) &&
    !value.includes(` ${Ts.Keyword.Null}`) &&
    !value.includes(`${Ts.Keyword.Null} `)
    ? Ts.UnionType([value, Ts.Keyword.Null])
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
        content: Ts.UnionType(_.map(parsedSchema.content, ({ value }) => value)),
      };
    }

    return {
      ...parsedSchema,
      $content: parsedSchema.content,
      content: Ts.EnumFieldsWrapper(parsedSchema.content),
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
        typeIdentifier: Ts.Keyword.Type,
        content: checkAndAddNull(parsedSchema.content),
      };
    }

    return {
      ...parsedSchema,
      typeIdentifier: Ts.Keyword.Type,
      content: checkAndAddNull(
        parsedSchema,
        parsedSchema.content.length
          ? Ts.ObjectWrapper(formatObjectContent(parsedSchema.content))
          : Ts.RecordType(Ts.Keyword.String, Ts.Keyword.Any),
      ),
    };
  },
  [SCHEMA_TYPES.ENUM]: (parsedSchema) => {
    return {
      ...parsedSchema,
      content: parsedSchema.$ref
        ? parsedSchema.typeName
        : Ts.UnionType(
            _.compact([
              ..._.map(parsedSchema.content, ({ value }) => `${value}`),
              parsedSchema.nullable && Ts.Keyword.Null,
            ]),
          ),
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
      ? Ts.MultilineComment(comments, (comment) => `${extraSpace}${comment}`).join("")
      : "";

    return `${commonText}${result}`;
  }).join("");
};

module.exports = {
  formatters,
  inlineExtraFormatters,
};
