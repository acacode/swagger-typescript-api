import _ from "lodash";

function internalCase(value) {
  return _.camelCase(_.lowerCase(value));
}

export { internalCase };
