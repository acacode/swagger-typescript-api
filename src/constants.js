module.exports = {
  DEFAULT_PRIMITIVE_TYPE: "any",
  DEFAULT_BODY_ARG_NAME: "data",
  SUCCESS_RESPONSE_STATUS_RANGE: [200, 300],
  JS_PRIMITIVE_TYPES: ["number", "string", "boolean"],
  JS_EMPTY_TYPES: ["null", "undefined"],
  PRETTIER_OPTIONS: {
    printWidth: 120,
    tabWidth: 2,
    trailingComma: "all",
    parser: "typescript",
    plugins: ["prettier-plugin-organize-imports"],
  },
};
