import lodash from "lodash";

export function internalCase(value: string) {
  return lodash.camelCase(lodash.lowerCase(value));
}
