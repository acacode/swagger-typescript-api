import { consola } from "consola";
import type { CodeGenConfig } from "../../configuration.js";
import { NameResolver } from "../../util/name-resolver.js";

export class EnumKeyResolver extends NameResolver {
  counter = 1;
  constructor(config: CodeGenConfig, reservedNames: string[]) {
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
