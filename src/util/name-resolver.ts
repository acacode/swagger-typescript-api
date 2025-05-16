import { consola } from "consola";
import lodash from "lodash";
import type { CodeGenConfig } from "../configuration.js";

type Resolver = (reserved: string[], extras?: string[]) => string;

export class NameResolver {
  reservedNames: string[] = [];
  getFallbackName: Resolver;

  config: CodeGenConfig;

  constructor(
    config: CodeGenConfig,
    reservedNames: string[],
    getFallbackName: Resolver,
  ) {
    this.config = config;
    this.getFallbackName = getFallbackName;
    this.reserve(reservedNames);
  }

  reserve(names: string[]) {
    const fixedNames = lodash.uniq(lodash.compact(names));
    for (const name of fixedNames) {
      if (this.reservedNames.indexOf(name) === -1) {
        this.reservedNames.push(name);
      }
    }
  }

  unreserve(names: string[]) {
    this.reservedNames = this.reservedNames.filter(
      (reservedName) => !names.some((name) => name === reservedName),
    );
  }

  isReserved(name: string) {
    return this.reservedNames.some((reservedName) => reservedName === name);
  }

  resolve(
    variants: string[],
    resolver?: Resolver,
    extras?: string[],
    shouldReserve = true,
  ): string | null {
    if (typeof resolver === "function") {
      let usageName: string | null = null;
      while (usageName === null) {
        const variant = resolver(variants, extras);

        if (variant === undefined) {
          consola.warn(
            "unable to resolve name. current reserved names: ",
            ...this.reservedNames,
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
      let usageName: string | null = null;
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
        ...variants,
      );
      return this.resolve(variants, this.getFallbackName, extras);
    }

    consola.debug(
      "problem with reserving names. current reserved names: ",
      ...this.reservedNames,
    );
    return null;
  }
}
