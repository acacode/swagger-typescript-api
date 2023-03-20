const _ = require("lodash");
const { getRandomInt } = require("./random.js");

class NameResolver {
  reservedNames = [];
  getFallbackName = null;

  /**
   * @type {Logger}
   */
  logger;

  /**
   * @param {Logger} logger;
   * @param {string[]} reservedNames
   */
  constructor(logger, reservedNames, getFallbackName) {
    this.logger = logger;
    this.getFallbackName = getFallbackName;
    this.reserve(reservedNames);
  }

  /**
   * @param {string[]} names
   */
  reserve(names) {
    this.reservedNames.push(..._.uniq(_.compact(names)));
  }

  unreserve(names) {
    this.reservedNames.filter((reservedName) => !names.some((name) => name === reservedName));
  }

  isReserved(name) {
    return _.some(this.reservedNames, (reservedName) => reservedName === name);
  }

  /**
   *
   * @param {(string[]) | ((reserved: string[]) => string)} variantsOrResolver
   * @returns {string | null}
   */
  resolve(variantsOrResolver, shouldReserve = true) {
    this.logger.debug("resolving name with using", variantsOrResolver);
    if (Array.isArray(variantsOrResolver)) {
      const variants = variantsOrResolver;
      let usageName = null;
      const uniqVariants = _.uniq(_.compact(variants));

      _.forEach(uniqVariants, (variant) => {
        if (!usageName && (!shouldReserve || !this.isReserved(variant))) {
          usageName = variant;
        }
      });

      if (usageName) {
        shouldReserve && this.reserve([usageName]);
        return usageName;
      }

      this.logger.debug("trying to resolve name with using fallback name generator");
      return this.resolve(this.getFallbackName);
    } else if (typeof variantsOrResolver === "function") {
      let usageName = null;
      while (usageName === null) {
        const variant = variantsOrResolver(this.reservedNames);

        if (variant === undefined) {
          this.logger.warn("unable to resolve name. current reserved names: ", this.reservedNames);
          return null;
        }
        if (!this.isReserved(variant)) {
          usageName = variant;
        }
      }

      shouldReserve && this.reserve([usageName]);
      return usageName;
    }

    this.logger.debug("problem with reserving names. current reserved names: ", this.reservedNames);
    return null;
  }
}

class SpecificArgNameResolver extends NameResolver {
  /**
   * @param {Logger} logger;
   * @param {string[]} reservedNames
   */
  constructor(logger, reservedNames) {
    super(logger, reservedNames, (variants) => {
      return (variants[0] && `${variants[0]}${getRandomInt(1, 10)}`) || `arg${getRandomInt(1, 10)}`;
    });
  }
}

class ComponentTypeNameResolver extends NameResolver {
  /**
   * @param {Logger} logger;
   * @param {string[]} reservedNames
   */
  constructor(logger, reservedNames) {
    super(logger, reservedNames, (variants) => {
      return (variants[0] && `${variants[0]}${getRandomInt(1, 10)}`) || `ComponentType${getRandomInt(1, 10)}`;
    });
  }
}

module.exports = {
  SpecificArgNameResolver,
  ComponentTypeNameResolver,
};
