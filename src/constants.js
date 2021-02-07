const TS_KEYWORDS = {
  NUMBER: "number",
  STRING: "string",
  BOOLEAN: "boolean",
  ANY: "any",
  UNKNOWN: "unknown",
  NULL: "null",
  UNDEFINED: "undefined",
  OBJECT: "object",
  FILE: "File",
  DATE: "Date",
  TYPE: "type",
  ENUM: "enum",
  INTERFACE: "interface",
};

const JS_PRIMITIVE_TYPES = [TS_KEYWORDS.NUMBER, TS_KEYWORDS.STRING, TS_KEYWORDS.BOOLEAN];
const JS_EMPTY_TYPES = [TS_KEYWORDS.NULL, TS_KEYWORDS.UNDEFINED];

const SCHEMA_TYPES = {
  ARRAY: "array",
  OBJECT: "object",
  ENUM: "enum",
  REF: "$ref",
  PRIMITIVE: "primitive",
  COMPLEX: "complex",
  COMPLEX_ONE_OF: "oneOf",
  COMPLEX_ANY_OF: "anyOf",
  COMPLEX_ALL_OF: "allOf",
  COMPLEX_NOT: "not",
};

module.exports = {
  DEFAULT_BODY_ARG_NAME: "data",
  SUCCESS_RESPONSE_STATUS_RANGE: [200, 300],
  JS_PRIMITIVE_TYPES,
  JS_EMPTY_TYPES,
  TS_KEYWORDS,
  SCHEMA_TYPES,
  PRETTIER_OPTIONS: {
    printWidth: 120,
    tabWidth: 2,
    trailingComma: "all",
    parser: "typescript",
  },
};
