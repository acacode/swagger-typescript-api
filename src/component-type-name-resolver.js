import { consola } from "consola";
import { NameResolver } from "./util/name-resolver.js";
import { getRandomInt } from "./util/random.js";

class ComponentTypeNameResolver extends NameResolver {
  counter = 1;
  fallbackNameCounter = 1;
  countersByVariant = new Map();

  /**
   * @param {CodeGenConfig} config;
   * @param {string[]} reservedNames
   */
  constructor(config, reservedNames) {
    super(config, reservedNames, (variants) => {
      const randomVariant = variants[getRandomInt(0, variants.length - 1)];
      if (randomVariant) {
        if (!this.countersByVariant.has(randomVariant)) {
          this.countersByVariant.set(randomVariant, 0);
        }
        const variantCounter = this.countersByVariant.get(randomVariant) + 1;
        this.countersByVariant.set(randomVariant, variantCounter);
        const dirtyResolvedName = `${randomVariant}${variantCounter}`;
        consola.debug(
          "generated dirty resolved type name for component - ",
          dirtyResolvedName,
        );
        return dirtyResolvedName;
      }

      const fallbackName = `${this.config.componentTypeNameResolver}${this
        .fallbackNameCounter++}`;
      consola.debug(
        "generated fallback type name for component - ",
        fallbackName,
      );
      return fallbackName;
    });
  }
}

export { ComponentTypeNameResolver };
