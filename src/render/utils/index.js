const { classNameCase, formatDescription, internalCase } = require("../../common");
const { getComponentByRef } = require("../../components");
const { getInlineParseContent, getParseContent, parseSchema } = require("../../schema");
const { formatters, inlineExtraFormatters } = require("../../typeFormatters");

module.exports = {
  formatDescription,
  internalCase,
  classNameCase,
  getInlineParseContent,
  getParseContent,
  getComponentByRef,
  parseSchema,
  formatters,
  inlineExtraFormatters,
  fmtToJSDocLine: require("./fmtToJSDocLine"),
  _: require("lodash"),
  require: require,
};
