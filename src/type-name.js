const _ = require("lodash");

class TypeName {
  /** @type {Map<string, string>} */
  formattedModelNamesMap = new Map();

  /** @type {Configuration} */
  config;

  /** @type {Logger} */
  logger;

  constructor(config, logger) {
    this.config = config;
    this.logger = logger;
  }

  /**
   * @param name
   * @param options {{ ignorePrefix?: boolean, ignoreSuffix?: boolean }}
   * @return {string}
   */
  format = (name, options) => {
    const typePrefix = options && options.ignorePrefix ? "" : this.config.typePrefix;
    const typeSuffix = options && options.ignoreSuffix ? "" : this.config.typeSuffix;
    const hashKey = `${typePrefix}_${name}_${typeSuffix}`;

    if (typeof name !== "string") {
      this.logger.warn("wrong name of the model name", name);
      return name;
    }

    if (/^([A-Z_]{1,})$/g.test(name)) {
      return _.compact([typePrefix, name, typeSuffix]).join("_");
    }

    if (this.formattedModelNamesMap.has(hashKey)) {
      return this.formattedModelNamesMap.get(hashKey);
    }

    const fixedModelName = fixModelName(name);

    const formattedModelName = _.replace(_.startCase(`${typePrefix}_${fixedModelName}_${typeSuffix}`), /\s/g, "");
    const modelName = this.config.hooks.onFormatTypeName(formattedModelName, name) || formattedModelName;

    this.formattedModelNamesMap.set(hashKey, modelName);

    return modelName;
  };

  isValidName = isValidName;
}

const isValidName = (name) => /^([A-Za-z$_]{1,})$/g.test(name);

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

module.exports = {
  TypeName,
};
