import { consola } from "consola";
import type { CodeGenConfig } from "./configuration.js";
import { NameResolver } from "./util/name-resolver.js";
import { getRandomInt } from "./util/random.js";

export class ComponentTypeNameResolver extends NameResolver {
  counter = 1;
  fallbackNameCounter = 1;
  countersByVariant = new Map<string, number>();

  constructor(config: CodeGenConfig, reservedNames: string[]) {
    super(config, reservedNames, (variants) => {
      const randomVariant = variants[getRandomInt(0, variants.length - 1)];
      if (randomVariant) {
        if (!this.countersByVariant.has(randomVariant)) {
          this.countersByVariant.set(randomVariant, 0);
        }
        const variantCounter =
          (this.countersByVariant.get(randomVariant) as number) + 1;
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
