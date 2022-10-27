const _ = require("lodash");

module.exports = {
  internalCase: (value) => _.camelCase(_.lowerCase(value)),
};
