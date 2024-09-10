import { consola } from "consola";
import lodash from "lodash";
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

    if (typeof name !== "string") {
      consola.warn("wrong name of the model name", name);
      return name;
    }

    // constant names like LEFT_ARROW, RIGHT_FORWARD, ETC_KEY, _KEY_NUM_
    if (/^([A-Z_]{1,})$/g.test(name)) {
      return lodash.compact([typePrefix, name, typeSuffix]).join("_");
    }

    if (this.formattedModelNamesMap.has(hashKey)) {
      return this.formattedModelNamesMap.get(hashKey);
    }

    const fixedModelName = this.fixModelName(name, { type: schemaType });

    const formattedName = lodash
      .startCase(`${typePrefix}_${fixedModelName}_${typeSuffix}`)
      .replace(/\s/g, "");
    const formattedResultName =
      this.config.hooks.onFormatTypeName(formattedName, name, schemaType) ||
      formattedName;

    this.formattedModelNamesMap.set(hashKey, formattedResultName);

    return formattedResultName;
  };

  isValidName = (name: string) => /^([A-Za-z$_]{1,})$/g.test(name);

  fixModelName = (
    name: string,
    options: { type?: FormattingSchemaType },
  ): string => {
    const { type } = options || {};

    if (!this.isValidName(name)) {
      if (!/^[a-zA-Z_$]/g.test(name)) {
        const fixPrefix =
          type === "enum-key"
            ? this.config.fixInvalidEnumKeyPrefix
            : this.config.fixInvalidTypeNamePrefix;
        name = `${fixPrefix} ${name}`;
      }

      // specific replaces for TSOA 3.x
      if (name.includes("."))
        name = name
          .replace(/Exclude_keyof[A-Za-z]+/g, () => "ExcludeKeys")
          .replace(/%22~AND~%22/g, "And")
          .replace(/%22~OR~%22/g, "Or")
          .replace(/(\.?%22)|\./g, "_")
          .replace(/__+$/, "");

      if (name.includes("-")) name = lodash.startCase(name).replace(/ /g, "");
    }

    return name;
  };
}
