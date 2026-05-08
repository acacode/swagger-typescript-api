import { consola } from "consola";
import { compact, uniq } from "es-toolkit";
import type { CodeGenConfig } from "./configuration.js";
import { NameResolver } from "./util/name-resolver.js";

export class ComponentTypeNameResolver extends NameResolver {
  counter = 1;
  fallbackNameCounter = 1;
  countersByVariant = new Map<string, number>();

  constructor(config: CodeGenConfig, reservedNames: string[]) {
    super(config, reservedNames, (variants) => {
      const sortedVariants = uniq(compact(variants)).sort((a, b) =>
        a.localeCompare(b),
      );
      const baseVariant = sortedVariants[0];
      if (baseVariant) {
        if (!this.countersByVariant.has(baseVariant)) {
          this.countersByVariant.set(baseVariant, 0);
        }
        const variantCounter =
          (this.countersByVariant.get(baseVariant) as number) + 1;
        this.countersByVariant.set(baseVariant, variantCounter);
        const dirtyResolvedName = `${baseVariant}${variantCounter}`;
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
