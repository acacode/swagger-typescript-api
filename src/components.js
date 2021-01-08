const _ = require("lodash");
const { parseSchema } = require("./schema");
const { addToConfig, config } = require("./config");

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
  const componentsMap = _.reduce(
    components,
    (map, component, componentName) => {
      _.each(component, (rawTypeData, typeName) => {
        // only map data for now
        const componentSchema = {
          typeName,
          rawTypeData,
          componentName,
          typeData: null,
        };

        map[`#/components/${componentName}/${typeName}`] =
          config.hooks.onCreateComponent(componentSchema) || componentSchema;
      });
      return map;
    },
    {},
  );

  addToConfig({ componentsMap });

  return componentsMap;
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
  createComponentsMap,
  filterComponentsMap,
  getComponentByRef,
};
