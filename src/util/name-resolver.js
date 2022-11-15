const _ = require("lodash");
const { getRandomInt } = require("./random.js");
const { pascalCase } = require("./pascal-case");

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
   * @param {(string[])} variants
   * @param {(reserved: string[]) => string)} [resolver]
   * @returns {string | null}
   */
  resolve(variants, resolver) {
    this.logger.debug("resolving name with using", variants);
    if (typeof resolver === "function") {
      let usageName = null;
      while (usageName === null) {
        const variant = resolver(variants);

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

      this.logger.debug("trying to resolve name with using fallback name generator");
      return this.resolve(variants, this.getFallbackName);
    }

    this.logger.debug("problem with reserving names. current reserved names: ", this.reservedNames);
    return null;
  }
}

class SpecificArgNameResolver extends NameResolver {
  counter = 1;
  /**
   * @param {Logger} logger;
   * @param {string[]} reservedNames
   */
  constructor(logger, reservedNames) {
    super(logger, reservedNames, (variants) => {
      const generatedVariant = (variants[0] && `${variants[0]}${this.counter++}`) || `arg${this.counter++}`;
      this.logger.debug("generated fallback type name for specific arg - ", generatedVariant);
      return generatedVariant;
    });
  }
}

class ComponentTypeNameResolver extends NameResolver {
  counter = 1;
  fallbackNameCounter = 1;

  /**
   * @param {Logger} logger;
   * @param {string[]} reservedNames
   */
  constructor(logger, reservedNames) {
    super(logger, reservedNames, (variants) => {
      const randomVariant = variants[getRandomInt(0, variants.length - 1)];
      const generatedVariant = pascalCase(
        (randomVariant && `${randomVariant}${this.counter++}`) || `ComponentType${this.fallbackNameCounter++}`,
      );
      this.logger.debug("generated fallback type name for component - ", generatedVariant);
      return generatedVariant;
    });
  }
}

module.exports = {
  SpecificArgNameResolver,
  ComponentTypeNameResolver,
};
