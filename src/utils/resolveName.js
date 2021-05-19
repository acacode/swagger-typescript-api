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
    this.reserve(reservedNames);
  }

  /**
   *
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
   * @param {string[]} variants
   * @param {((variant: string) => string) | undefined} onSelectMutation
   * @returns {string | null}
   */
  resolve(variants, onSelectMutation) {
    let usageName = null;
    const uniqVariants = _.uniq(_.compact(variants));

    _.forEach(uniqVariants, (variant) => {
      const mutatedVariant = onSelectMutation ? onSelectMutation(variant) : variant;
      if (!usageName && !this.isReserved(mutatedVariant)) {
        usageName = mutatedVariant;
      }
    });

    if (usageName) {
      this.reserve([usageName]);
      return usageName;
    }

    const defaultName = this.getDefaultName && this.getDefaultName(variants);

    if (defaultName) {
      this.reserve([onSelectMutation ? onSelectMutation(defaultName) : defaultName]);
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
