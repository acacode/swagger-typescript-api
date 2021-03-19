const _ = require("lodash");
const path = require("path");
const { classNameCase, formatDescription, internalCase } = require("../../common");
const { getComponentByRef } = require("../../components");
const { config } = require("../../config");
const { formatModelName } = require("../../modelNames");
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
  formatModelName,
  fmtToJSDocLine: require("./fmtToJSDocLine"),
  _: _,
  require: (packageOrPath) => {
    const isPath = _.startsWith(packageOrPath, "./") || _.startsWith(packageOrPath, "../");

    if (isPath) {
      return require(path.resolve(config.templates, packageOrPath));
    }

    return require(packageOrPath);
  },
};
