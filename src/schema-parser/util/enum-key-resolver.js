import { consola } from "consola";
import { NameResolver } from "../../util/name-resolver.js";

class EnumKeyResolver extends NameResolver {
  counter = 1;
  /**
   * @param {CodeGenConfig} config;
   * @param {string[]} reservedNames
   */
  constructor(config, reservedNames) {
    super(config, reservedNames, (variants) => {
      const generatedVariant =
        (variants[0] && `${variants[0]}${this.counter++}`) ||
        `${this.config.enumKeyResolverName}${this.counter++}`;
      consola.debug(
        "generated fallback type name for enum key - ",
        generatedVariant,
      );
      return generatedVariant;
    });
  }
}

export { EnumKeyResolver };
