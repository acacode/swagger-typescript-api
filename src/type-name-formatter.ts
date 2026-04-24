import { consola } from "consola";
import { compact } from "es-toolkit";
import { startCase } from "es-toolkit/compat";
import type { CodeGenConfig } from "./configuration.js";

type FormattingSchemaType = "enum-key" | "type-name";

export class TypeNameFormatter {
  formattedModelNamesMap = new Map<string, string>();
  // Tracks formatted output → raw name for top-level type names. Populated
  // by `precommit` during the resolution pass so `format()` can stay a pure
  // lookup. Enum keys are NOT tracked here — they live inside enum blocks
  // (`EnumA.Bar` and `EnumB.Bar` are both valid), so cross-enum collisions
  // don't need to be disambiguated. See issue #1724.
  usedFormattedTypeNames = new Map<string, string>();
  config: CodeGenConfig;

  constructor(config: CodeGenConfig) {
    this.config = config;
  }

  /**
   * Return the TypeScript identifier for a raw OpenAPI name. Fast path is a
   * cache hit on names resolved by `precommit`. The fallback (for names
   * discovered after precommit, e.g. enum keys inside schemas or types added
   * dynamically by `extractEnums`/`extractResponses`) computes the identifier
   * inline WITHOUT collision handling — collision resolution is the sole
   * responsibility of `precommit`. Callers expecting collision safety must
   * list every raw name in the precommit input.
   */
  format = (name: string, options: { type?: FormattingSchemaType } = {}) => {
    const schemaType = options.type ?? "type-name";
    const { typePrefix, typeSuffix } = this.getAffixes(schemaType);
    const hashKey = `${typePrefix}_${name}_${typeSuffix}`;

    const cached = this.formattedModelNamesMap.get(hashKey);
    if (cached !== undefined) return cached;

    if (typeof name !== "string") {
      consola.warn("wrong model name", name);
      return name;
    }

    // Fallback: compute inline, no collision check.
    const result = this.computeFormattedName(
      name,
      schemaType,
      typePrefix,
      typeSuffix,
    );
    this.formattedModelNamesMap.set(hashKey, result);
    return result;
  };

  /**
   * Resolve the TypeScript identifier for every raw schema name passed in,
   * populating `formattedModelNamesMap` and `usedFormattedTypeNames`. Must be
   * called once, before any `format()` call from the schema parser, so that
   * every subsequent `format()` for these names is a cache hit and returns
   * the collision-resolved identifier.
   *
   * Two passes:
   *   1. Claim every raw name whose formatted output equals the raw name
   *      itself ("canonical"). User-declared identifiers like `FooBar` or
   *      `FooBar1` are preserved regardless of the source order in which
   *      the generator later visits them.
   *   2. For non-canonical names (e.g. `Foo_Bar` → `FooBar`), suffix with
   *      the smallest integer not already claimed, so collisions produce
   *      `FooBar`, `FooBar1`, `FooBar2`, … deterministically.
   *
   * Only type-names go through collision resolution here. Enum keys use the
   * fallback path in `format()` and are handled per-enum by the template.
   */
  precommit = (rawNames: Iterable<string>): void => {
    const schemaType: FormattingSchemaType = "type-name";
    const { typePrefix, typeSuffix } = this.getAffixes(schemaType);

    const seen = new Set<string>();
    const names: string[] = [];
    for (const name of rawNames) {
      if (typeof name !== "string") continue;
      if (seen.has(name)) continue;
      seen.add(name);
      names.push(name);
    }

    // Pass 1: pre-claim canonical names.
    for (const name of names) {
      const formatted = this.computeFormattedName(
        name,
        schemaType,
        typePrefix,
        typeSuffix,
      );
      if (name !== formatted) continue;
      if (this.usedFormattedTypeNames.has(formatted)) continue;
      this.usedFormattedTypeNames.set(formatted, name);
      const hashKey = `${typePrefix}_${name}_${typeSuffix}`;
      this.formattedModelNamesMap.set(hashKey, formatted);
    }

    // Pass 2: resolve non-canonical names with suffix-until-free.
    for (const name of names) {
      const hashKey = `${typePrefix}_${name}_${typeSuffix}`;
      if (this.formattedModelNamesMap.has(hashKey)) continue;
      const formatted = this.computeFormattedName(
        name,
        schemaType,
        typePrefix,
        typeSuffix,
      );
      let final = formatted;
      if (this.usedFormattedTypeNames.has(final)) {
        let suffix = 1;
        while (this.usedFormattedTypeNames.has(`${formatted}${suffix}`)) {
          suffix += 1;
        }
        final = `${formatted}${suffix}`;
      }
      this.usedFormattedTypeNames.set(final, name);
      this.formattedModelNamesMap.set(hashKey, final);
    }
  };

  isValidName = (name: string) => /^([A-Za-z$_]{1,})$/g.test(name);

  fixModelName = (
    name: string,
    options: { type?: FormattingSchemaType },
  ): string => {
    if (!this.isValidName(name)) {
      if (!/^[a-zA-Z_$]/g.test(name)) {
        const fixPrefix =
          options.type === "enum-key"
            ? this.config.fixInvalidEnumKeyPrefix
            : this.config.fixInvalidTypeNamePrefix;
        return `${fixPrefix} ${name}`;
      }

      // specific replaces for TSOA 3.x
      if (name.includes(".")) {
        return name
          .replace(/Exclude_keyof[A-Za-z]+/g, () => "ExcludeKeys")
          .replace(/%22~AND~%22/g, "And")
          .replace(/%22~OR~%22/g, "Or")
          .replace(/(\.?%22)|\./g, "_")
          .replace(/__+$/, "");
      }

      if (name.includes("-")) {
        return this.config.disableFormatTypeNames
          ? name.replace(/-/g, "_")
          : startCase(name).replace(/ /g, "");
      }
    }

    return name;
  };

  private getAffixes = (schemaType: FormattingSchemaType) => ({
    typePrefix:
      schemaType === "enum-key"
        ? this.config.enumKeyPrefix
        : this.config.typePrefix,
    typeSuffix:
      schemaType === "enum-key"
        ? this.config.enumKeySuffix
        : this.config.typeSuffix,
  });

  private computeFormattedName = (
    name: string,
    schemaType: FormattingSchemaType,
    typePrefix: string,
    typeSuffix: string,
  ): string => {
    const typeNameSeparator = this.config.typeNameSeparator;
    let resultName = name;

    if (this.config.disableFormatTypeNames) {
      resultName = compact([typePrefix, resultName, typeSuffix]).join(
        typeNameSeparator,
      );
    } else if (/^(?!\d)([A-Z0-9_]{1,})$/g.test(resultName)) {
      // https://github.com/acacode/swagger-typescript-api/issues/1260
      resultName = compact([typePrefix, resultName, typeSuffix]).join(
        typeNameSeparator,
      );
    } else {
      const fixed = this.fixModelName(resultName, { type: schemaType });
      resultName = startCase(
        compact([typePrefix, fixed, typeSuffix]).join(typeNameSeparator),
      ).replace(/\s/g, "");
    }

    return (
      this.config.hooks.onFormatTypeName?.(resultName, name, schemaType) ||
      resultName
    );
  };
}
