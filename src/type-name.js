const _ = require("lodash");

/**
 * @typedef {"enum-key" | "type-name"} FormattingSchemaType
 */

class TypeName {
  /** @type {Map<string, string>} */
  formattedModelNamesMap = new Map();

  /** @type {CodeGenConfig} */
  config;

  /** @type {Logger} */
  logger;

  constructor(config, logger) {
    this.config = config;
    this.logger = logger;
  }

  /**
   * @param name
   * @param options {{ type?: FormattingSchemaType }}
   * @return {string}
   */
  format = (name, options) => {
    options = options || {};

    /**
     * @type {FormattingSchemaType}
     */
    const schemaType = options.type || "type-name";

    const typePrefix = schemaType === "enum-key" ? this.config.enumKeyPrefix : this.config.typePrefix;
    const typeSuffix = schemaType === "enum-key" ? this.config.enumKeySuffix : this.config.typeSuffix;

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

    const fixedModelName = this.fixModelName(name, { type: schemaType });

    const formattedName = _.replace(_.startCase(`${typePrefix}_${fixedModelName}_${typeSuffix}`), /\s/g, "");
    const formattedResultName = this.config.hooks.onFormatTypeName(formattedName, name, schemaType) || formattedName;

    this.formattedModelNamesMap.set(hashKey, formattedResultName);

    return formattedResultName;
  };

  isValidName = (name) => /^([A-Za-z$_]{1,})$/g.test(name);

  /**
   * @param name
   * @param options {{ type?: FormattingSchemaType }}
   * @return {string}
   */
  fixModelName = (name, options) => {
    if (!this.isValidName(name)) {
      if (!/^[a-zA-Z_$]/g.test(name)) {
        const fixPrefix =
          options && options.type === "enum-key"
            ? this.config.fixInvalidEnumKeyPrefix
            : this.config.fixInvalidTypeNamePrefix;
        name = `${fixPrefix} ${name}`;
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
}

module.exports = {
  TypeName,
};
