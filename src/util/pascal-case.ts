import lodash from "lodash";

export function pascalCase(value: string) {
  return lodash.upperFirst(lodash.camelCase(value));
}
