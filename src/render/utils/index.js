const { classNameCase, formatDescription, internalCase } = require("../../common");
const { getComponentByRef } = require("../../components");
const { formatModelName } = require("../../modelNames");
const {
  getInlineParseContent,
  getParseContent,
  parseSchema,
  checkAndAddNull,
  isNeedToAddNull,
} = require("../../schema");
const { formatters, inlineExtraFormatters } = require("../../typeFormatters");
const { NameResolver } = require("../../utils/resolveName");
const { Ts, JsDoc } = require("../../code-gen-constructs");

module.exports = {
  Ts,
  JsDoc,
  formatDescription,
  internalCase,
  classNameCase,
  getInlineParseContent,
  getParseContent,
  getComponentByRef,
  parseSchema,
  formatters,
  checkAndAddNull,
  isNeedToAddNull,
  inlineExtraFormatters,
  formatModelName,
  fmtToJSDocLine: require("./fmtToJSDocLine"),
  NameResolver: NameResolver,
  _: require("lodash"),
  require: require("./templateRequire").templateRequire,
};
