const { classNameCase, formatDescription, internalCase } = require("../../common");
const { getComponentByRef } = require("../../components");
const { getInlineParseContent, getParseContent, parseSchema } = require("../../schema");

module.exports = {
  formatDescription,
  internalCase,
  classNameCase,
  getInlineParseContent,
  getParseContent,
  getComponentByRef,
  parseSchema,
  fmtToJSDocLine: require("./fmtToJSDocLine"),
  _: require("lodash"),
};
