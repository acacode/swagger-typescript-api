const _ = require("lodash");

module.exports = {
  pascalCase: (value) => _.upperFirst(_.camelCase(value)),
};
