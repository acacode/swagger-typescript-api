const { classNameCase, formatDescription, internalCase } = require("../../common");
const { getComponentByRef } = require("../../components");
const { formatModelName } = require("../../modelNames");
const { getInlineParseContent, getParseContent, parseSchema } = require("../../schema");
const { formatters, inlineExtraFormatters } = require("../../typeFormatters");
const { defineSpecificArgName } = require("../../utils/defineSpecificArgName");

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
  formatModelName,
  fmtToJSDocLine: require("./fmtToJSDocLine"),
  defineSpecificArgName,
  _: require("lodash"),
  require: require("./templateRequire"),
};
