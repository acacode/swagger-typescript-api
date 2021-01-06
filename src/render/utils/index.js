const { classNameCase, formatDescription, internalCase } = require("../../common");
const { getInlineParseContent } = require("../../schema");

module.exports = {
  formatDescription,
  internalCase,
  classNameCase,
  fmtToJSDocLine: require("./fmtToJSDocLine"),
  _: require("lodash"),
};
