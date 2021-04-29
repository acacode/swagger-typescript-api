const _ = require("lodash");
const path = require("path");
const { config } = require("../../config");

const templateRequire = (packageOrPath) => {
  const isPath = _.startsWith(packageOrPath, "./") || _.startsWith(packageOrPath, "../");

  if (isPath) {
    return require(path.resolve(config.templates, packageOrPath));
  }

  return require(packageOrPath);
};

module.exports = {
  templateRequire,
};
