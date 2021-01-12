const _ = require("lodash");

module.exports = {
  formatDescription: (description, inline) => {
    if (!description) return "";

    let prettified = description;

    prettified = _.replace(prettified, /\*\//g, "*/");

    const hasMultipleLines = _.includes(prettified, "\n");

    if (!hasMultipleLines) return prettified;

    if (inline) {
      return _(prettified)
        .split(/\n/g)
        .map((part) => _.trim(part))
        .compact()
        .join(" ")
        .valueOf();
    }

    return _.replace(prettified, /\n$/g, "");
  },
  internalCase: (value) => _.camelCase(_.lowerCase(value)),
  classNameCase: (value) => _.upperFirst(_.camelCase(value)),
};
