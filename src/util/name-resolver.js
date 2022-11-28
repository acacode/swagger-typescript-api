const _ = require("lodash");

class NameResolver {
  reservedNames = [];
  getFallbackName = null;

  /** @type {CodeGenConfig} */
  config;
  /** @type {Logger} */
  logger;

  /**
   * @param {CodeGenConfig} config;
   * @param {Logger} logger;
   * @param {string[]} reservedNames
   */
  constructor(config, logger, reservedNames, getFallbackName) {
    this.config = config;
    this.logger = logger;
    this.getFallbackName = getFallbackName;
    this.reserve(reservedNames);
  }

  /**
   * @param {string[]} names
   */
  reserve(names) {
    const fixedNames = _.uniq(_.compact(names));
    for (const name of fixedNames) {
      if (this.reservedNames.indexOf(name) === -1) {
        this.reservedNames.push(name);
      }
    }
  }

  unreserve(names) {
    this.reservedNames.filter((reservedName) => !names.some((name) => name === reservedName));
  }

  isReserved(name) {
    return _.some(this.reservedNames, (reservedName) => reservedName === name);
  }

  /**
   *
   * @param {(string[])} variants
   * @param {(reserved: string[]) => string)} [resolver]
   * @param {any} [extras]
   * @returns {string | null}
   */
  resolve(variants, resolver, extras) {
    if (typeof resolver === "function") {
      let usageName = null;
      while (usageName === null) {
        const variant = resolver(variants, extras);

        if (variant === undefined) {
          this.logger.warn("unable to resolve name. current reserved names: ", this.reservedNames);
          return null;
        }
        if (!this.isReserved(variant)) {
          usageName = variant;
        }
      }

      this.reserve([usageName]);
      return usageName;
    } else if (Array.isArray(variants)) {
      let usageName = null;
      const uniqVariants = _.uniq(_.compact(variants));

      _.forEach(uniqVariants, (variant) => {
        if (!usageName && !this.isReserved(variant)) {
          usageName = variant;
        }
      });

      if (usageName) {
        this.reserve([usageName]);
        return usageName;
      }

      this.logger.debug("trying to resolve name with using fallback name generator using variants", variants);
      return this.resolve(variants, this.getFallbackName, extras);
    }

    this.logger.debug("problem with reserving names. current reserved names: ", this.reservedNames);
    return null;
  }
}

module.exports = {
  NameResolver,
};
