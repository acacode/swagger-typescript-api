import { camelCase, upperFirst } from "es-toolkit/compat";

export function pascalCase(value: string) {
  return upperFirst(camelCase(value));
}
