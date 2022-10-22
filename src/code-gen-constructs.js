const _ = require("lodash");

const Keyword = {
  Number: "number",
  String: "string",
  Boolean: "boolean",
  Any: "any",
  Void: "void",
  Unknown: "unknown",
  Null: "null",
  Undefined: "undefined",
  Object: "object",
  File: "File",
  Date: "Date",
  Type: "type",
  Enum: "enum",
  Interface: "interface",
  Array: "Array",
  Record: "Record",
  Intersection: "&",
  Union: "|",
};

const CodeGenKeyword = {
  UtilRequiredKeys: "UtilRequiredKeys",
};

const Ts = {
  Keyword,
  CodeGenKeyword,
  /**
   * $A[] or Array<$A>
   */
  ArrayType: (content) => {
    const { config } = require("./config");

    if (config.anotherArrayType) {
      return Ts.TypeWithGeneric(Ts.Keyword.Array, [content]);
    }

    return `${Ts.ExpressionGroup(content)}[]`;
  },
  /**
   * "$A"
   */
  StringValue: (content) => `"${content}"`,
  /**
   * $A
   */
  BooleanValue: (content) => `${content}`,
  /**
   * $A
   */
  NumberValue: (content) => `${content}`,
  /**
   * $A
   */
  NullValue: (content) => content,
  /**
   * $A1 | $A2
   */
  UnionType: (contents) => _.join(_.uniq(contents), ` ${Ts.Keyword.Union} `),
  /**
   * ($A1)
   */
  ExpressionGroup: (content) => (content ? `(${content})` : ""),
  /**
   * $A1 & $A2
   */
  IntersectionType: (contents) => _.join(_.uniq(contents), ` ${Ts.Keyword.Intersection} `),
  /**
   * Record<$A1, $A2>
   */
  RecordType: (key, value) => Ts.TypeWithGeneric(Ts.Keyword.Record, [key, value]),
  /**
   * readonly $key?:$value
   */
  TypeField: ({ readonly, key, optional, value }) =>
    _.compact([readonly && "readonly ", key, optional && "?", ": ", value]).join(""),
  /**
   * [key: $A1]: $A2
   */
  InterfaceDynamicField: (key, value) => `[key: ${key}]: ${value}`,
  /**
   * $A1 = $A2
   */
  EnumField: (key, value) => `${key} = ${value}`,
  /**
   * $A0.key = $A0.value,
   * $A1.key = $A1.value,
   * $AN.key = $AN.value,
   */
  EnumFieldsWrapper: (contents) => _.map(contents, ({ key, value }) => `  ${Ts.EnumField(key, value)}`).join(",\n"),
  /**
   * {\n $A \n}
   */
  ObjectWrapper: (content) => `{\n${content}\n}`,
  /**
   * /** $A *\/
   */
  MultilineComment: (contents, formatFn) =>
    [
      ...(contents.length === 1
        ? [`/** ${contents[0]} */`]
        : ["/**", ...contents.map((content) => ` * ${content}`), " */"]),
    ].map((part) => `${formatFn ? formatFn(part) : part}\n`),
  /**
   * $A1<...$A2.join(,)>
   */
  TypeWithGeneric: (typeName, genericArgs) => {
    return `${typeName}${genericArgs.length ? `<${genericArgs.join(",")}>` : ""}`;
  },
};

const JsDoc = {
  Deprecated: "@deprecated",
  Format: "@format",
  Min: "@min",
  Max: "@max",
  Pattern: "@pattern",
  Example: "@example",
  Description: "",
  Title: "",
  TextLine: (key, text) => _.compact([key, `${text === undefined ? "" : text}`]).join(" "),
  ObjectFieldDescription: ({ title, description, deprecated, format, minimum, maximum, pattern, example }) => {
    return _.compact([
      JsDoc.TextLine(JsDoc.Title, title),
      JsDoc.TextLine(JsDoc.Description, description),
      !_.isUndefined(deprecated) && JsDoc.Deprecated,
      !_.isUndefined(format) && JsDoc.TextLine(JsDoc.Format, format),
      !_.isUndefined(minimum) && JsDoc.TextLine(JsDoc.Min, minimum),
      !_.isUndefined(maximum) && JsDoc.TextLine(JsDoc.Max, maximum),
      !_.isUndefined(pattern) && JsDoc.TextLine(JsDoc.Pattern, pattern),
      !_.isUndefined(example) && JsDoc.TextLine(JsDoc.Example, _.isObject(example) ? JSON.stringify(example) : example),
    ]).join("\n");
  },
};

module.exports = {
  Ts,
  JsDoc,
};
