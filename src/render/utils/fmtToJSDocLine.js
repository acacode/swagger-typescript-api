/**
 * Format a line in JSDOC line by adding ' *' at the beginning and \n character at the end
 *
 * @example 'abc' -> ' * abc\n'
 * @param line
 * @return {string}
 */
module.exports = function fmtToJSDocLine(line, { eol = true }) {
  return ` * ${line}${eol ? "\n" : ""}`;
};
