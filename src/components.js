const _ = require("lodash");
const { parseSchema } = require("./schema");
const { config } = require("./config");

const createComponent = (componentName, typeName, rawTypeData) => {
  const $ref = `#/components/${componentName}/${typeName}`;

  const componentSchema = {
    $ref,
    typeName,
    rawTypeData,
    componentName,
    typeData: null,
  };

  return (config.componentsMap[$ref] =
    config.hooks.onCreateComponent(componentSchema) || componentSchema);
};

/**
 *
 * @typedef TypeInfo
 * {
 *    typeName: "Foo",
 *    componentName: "schemas",
 *    rawTypeData: {...},
 *    typeData: {...} (result parseSchema())
 * }
 */

/**
 * @returns {{ "#/components/schemas/Foo": TypeInfo, ... }}
 */
const createComponentsMap = (components) => {
  config.componentsMap = {};

  _.each(components, (component, componentName) =>
    _.each(component, (rawTypeData, typeName) =>
      createComponent(componentName, typeName, rawTypeData),
    ),
  );

  return config.componentsMap;
};

/**
 * @returns {TypeInfo[]}
 */
const filterComponentsMap = (componentsMap, componentName) =>
  _.filter(componentsMap, (v, ref) => _.startsWith(ref, `#/components/${componentName}`));

/** @returns {{ type, typeIdentifier, name, description, content }} */
const getTypeData = (typeInfo) => {
  if (!typeInfo.typeData) {
    typeInfo.typeData = parseSchema(typeInfo.rawTypeData, typeInfo.typeName);
  }

  return typeInfo.typeData;
};

const getComponentByRef = (ref) => config.componentsMap[ref];

module.exports = {
  getTypeData,
  createComponent,
  createComponentsMap,
  filterComponentsMap,
  getComponentByRef,
};
