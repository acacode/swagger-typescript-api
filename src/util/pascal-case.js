import * as lodash from "lodash";

function pascalCase(value) {
  return lodash.upperFirst(lodash.camelCase(value));
}

export { pascalCase };
