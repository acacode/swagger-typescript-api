import * as lodash from "lodash";

function internalCase(value) {
  return lodash.camelCase(lodash.lowerCase(value));
}

export { internalCase };
