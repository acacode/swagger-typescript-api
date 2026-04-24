import { consola } from "consola";
import { compact } from "es-toolkit";
import { startCase } from "es-toolkit/compat";
import type { CodeGenConfig } from "./configuration.js";

type FormattingSchemaType = "enum-key" | "type-name";

export class TypeNameFormatter {
  formattedModelNamesMap = new Map<string, string>();
  config: CodeGenConfig;

  constructor(config: CodeGenConfig) {
    this.config = config;
  }

  format = (name: string, options: { type?: FormattingSchemaType } = {}) => {
    const schemaType = options.type ?? "type-name";

    const typePrefix =
      schemaType === "enum-key"
        ? this.config.enumKeyPrefix
        : this.config.typePrefix;
    const typeSuffix =
      schemaType === "enum-key"
        ? this.config.enumKeySuffix
        : this.config.typeSuffix;

    const hashKey = `${typePrefix}_${name}_${typeSuffix}`;

    if (this.formattedModelNamesMap.has(hashKey)) {
      return this.formattedModelNamesMap.get(hashKey);
    }

    if (typeof name !== "string") {
      consola.warn("wrong model name", name);
      return name;
    }

    let resultName = name;

    if (this.config.disableFormatTypeNames) {
      resultName = compact([typePrefix, resultName, typeSuffix]).join("_");
    } else {
      // https://github.com/acacode/swagger-typescript-api/issues/1260
      if (/^(?!\d)([A-Z0-9_]{1,})$/g.test(resultName)) {
        resultName = compact([typePrefix, resultName, typeSuffix]).join("_");
      } else {
        const fixedModelName = this.fixModelName(resultName, {
          type: schemaType,
        });
        resultName = startCase(
          compact([typePrefix, fixedModelName, typeSuffix]).join("_"),
        ).replace(/\s/g, "");
      }
    }

    const formattedResultName =
      this.config.hooks.onFormatTypeName?.(resultName, name, schemaType) ||
      resultName;

    this.formattedModelNamesMap.set(hashKey, formattedResultName);

    return formattedResultName;
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
}
