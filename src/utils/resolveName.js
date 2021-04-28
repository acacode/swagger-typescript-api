const _ = require("lodash");
const { getRandomInt } = require("./random");

class NameResolver {
  reservedNames = [];
  getDefaultName = null;

  /**
   *
   * @param {string[]} reservedNames
   */
  constructor(reservedNames, getDefaultName) {
    this.getDefaultName = getDefaultName;
    this.addReservedNames(reservedNames);
  }

  /**
   *
   * @param {string[]} names
   */
  addReservedNames(names) {
    this.reservedNames.push(..._.uniq(_.compact(names)));
  }

  /**
   *
   * @param {string[]} variants
   * @returns {string | null}
   */
  resolve(variants) {
    let usageName = null;
    const uniqVariants = _.uniq(_.compact(variants));

    _.forEach(uniqVariants, (variant) => {
      if (!usageName && !_.some(this.reservedNames, (name) => name === variant)) {
        usageName = variant;
      }
    });

    if (usageName) {
      this.reservedNames.push(usageName);
      return usageName;
    }

    const defaultName = this.getDefaultName && this.getDefaultName(variants);

    if (defaultName) {
      this.reservedNames.push(defaultName);
      return defaultName;
    }

    return null;
  }
}

class SpecificArgNameResolver extends NameResolver {
  /**
   *
   * @param {string[]} reservedNames
   */
  constructor(reservedNames) {
    super(reservedNames, (variants) => {
      return (variants[0] && `${variants[0]}${getRandomInt(1, 10)}`) || `arg${getRandomInt(1, 10)}`;
    });
  }
}

class ComponentTypeNameResolver extends NameResolver {
  /**
   *
   * @param {string[]} reservedNames
   */
  constructor(reservedNames) {
    super(reservedNames, (variants) => {
      return (
        (variants[0] && `${variants[0]}${getRandomInt(1, 10)}`) ||
        `ComponentType${getRandomInt(1, 10)}`
      );
    });
  }
}

module.exports = {
  NameResolver,
  SpecificArgNameResolver,
  ComponentTypeNameResolver,
};
