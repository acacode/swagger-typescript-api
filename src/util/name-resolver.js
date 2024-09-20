import { consola } from "consola";
import lodash from "lodash";

class NameResolver {
  reservedNames = [];
  getFallbackName = null;

  /** @type {CodeGenConfig} */
  config;

  /**
   * @param {CodeGenConfig} config;
   * @param {string[]} reservedNames
   */
  constructor(config, reservedNames, getFallbackName) {
    this.config = config;
    this.getFallbackName = getFallbackName;
    this.reserve(reservedNames);
  }

  /**
   * @param {string[]} names
   */
  reserve(names) {
    const fixedNames = lodash.uniq(lodash.compact(names));
    for (const name of fixedNames) {
      if (this.reservedNames.indexOf(name) === -1) {
        this.reservedNames.push(name);
      }
    }
  }

  unreserve(names) {
    this.reservedNames.filter(
      (reservedName) => !names.some((name) => name === reservedName),
    );
  }

  isReserved(name) {
    return this.reservedNames.some((reservedName) => reservedName === name);
  }

  /**
   *
   * @param {(string[])} variants
   * @param {(reserved: string[]) => string)} [resolver]
   * @param {any} [extras]
   * @returns {string | null}
   */
  resolve(variants, resolver, extras, shouldReserve = true) {
    if (typeof resolver === "function") {
      let usageName = null;
      while (usageName === null) {
        const variant = resolver(variants, extras);

        if (variant === undefined) {
          consola.warn(
            "unable to resolve name. current reserved names: ",
            this.reservedNames,
          );
          return null;
        }
        if (!shouldReserve || !this.isReserved(variant)) {
          usageName = variant;
        }
      }

      shouldReserve && this.reserve([usageName]);
      return usageName;
    }

    if (Array.isArray(variants)) {
      let usageName = null;
      const uniqVariants = lodash.uniq(lodash.compact(variants));

      for (const variant of uniqVariants) {
        if (!usageName && (!shouldReserve || !this.isReserved(variant))) {
          usageName = variant;
        }
      }

      if (usageName) {
        shouldReserve && this.reserve([usageName]);
        return usageName;
      }

      consola.debug(
        "trying to resolve name with using fallback name generator using variants",
        variants,
      );
      return this.resolve(variants, this.getFallbackName, extras);
    }

    consola.debug(
      "problem with reserving names. current reserved names: ",
      this.reservedNames,
    );
    return null;
  }
}

export { NameResolver };
