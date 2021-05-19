const _ = require("lodash");
const { config } = require("./config");
const { logger } = require("./logger");

const isValidName = (name) => /^([A-Za-z$_]{1,})$/g.test(name);

const formattedModelNamesMap = new Map();

const fixModelName = (name) => {
  if (!isValidName(name)) {
    if (!/^[a-zA-Z_$]/g.test(name)) {
      name = `Type ${name}`;
    }

    // specific replaces for TSOA 3.x
    if (name.includes("."))
      name = name
        .replace(/Exclude_keyof[A-Za-z]{1,}/g, (match) => "ExcludeKeys")
        .replace(/%22\~AND\~%22/g, "And")
        .replace(/%22\~OR\~%22/g, "Or")
        .replace(/(\.?%22)|\./g, "_")
        .replace(/__+$/, "");

    if (name.includes("-")) name = _.startCase(name).replace(/ /g, "");
  }

  return name;
};

/**
 *
 * @param {string} name
 * @param {{ ignorePrefix?: boolean; ignoreSuffix?: boolean }} options
 * @returns
 */
const formatModelName = (name, options) => {
  const typePrefix = options && options.ignorePrefix ? "" : config.typePrefix;
  const typeSuffix = options && options.ignoreSuffix ? "" : config.typeSuffix;
  const hashKey = `${typePrefix}_${name}_${typeSuffix}`;

  if (typeof name !== "string") {
    logger.warn("wrong name of the model name", name);
    return name;
  }

  if (/^([A-Z_]{1,})$/g.test(name)) {
    return _.compact([typePrefix, name, typeSuffix]).join("_");
  }

  if (formattedModelNamesMap.has(hashKey)) {
    return formattedModelNamesMap.get(hashKey);
  }

  const fixedModelName = fixModelName(name);

  const formattedModelName = _.replace(
    _.startCase(`${typePrefix}_${fixedModelName}_${typeSuffix}`),
    /\s/g,
    "",
  );
  const modelName = config.hooks.onFormatTypeName(formattedModelName, name) || formattedModelName;

  formattedModelNamesMap.set(hashKey, modelName);

  return modelName;
};

const formatEnumKey = (key) =>
  formatModelName(key, {
    ignorePrefix: true,
    ignoreSuffix: true,
  });

module.exports = {
  formatModelName: formatModelName,
  formatEnumKey: formatEnumKey,
  isValidName,
};
