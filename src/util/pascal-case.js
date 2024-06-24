import _ from "lodash";

function pascalCase(value) {
  return _.upperFirst(_.camelCase(value));
}

export { pascalCase };
