const _ = require("lodash");
const { parseSchema } = require("./schema");
const { config } = require("./config");

/**
 * @typedef {"schemas" | "examples" | "headers" | "parameters" | "requestBodies" | "responses" | "securitySchemes"} ComponentName
 * @typedef {object} RawTypeData
 * @typedef {{ type, typeIdentifier, name, description, content }} TypeData
 *
 * @typedef {{
 *  typeName: string;
 *  componentName: ComponentName;
 *  rawTypeData: RawTypeData;
 *  typeData: TypeData | null;
 * }} TypeInfo
 */

/**
 *
 * @param {ComponentName} componentName
 * @param {string} typeName
 * @param {RawTypeData} rawTypeData
 * @returns {TypeInfo}
 */
const createComponent = (componentName, typeName, rawTypeData) => {
  const $ref = `#/components/${componentName}/${typeName}`;

  const componentSchema = {
    $ref,
    typeName,
    rawTypeData,
    componentName,
    typeData: null,
  };

  const usageComponent = config.hooks.onCreateComponent(componentSchema) || componentSchema;

  config.componentsMap[$ref] = usageComponent;

  return usageComponent;
};

/**
 * @returns {{ [key: string]: TypeInfo }}
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
 *
 * @param {{ [key: string]: TypeInfo }} componentsMap
 * @param {ComponentName} componentName
 * @returns {TypeInfo[]}
 */
const filterComponentsMap = (componentsMap, componentName) =>
  _.filter(componentsMap, (v, ref) => _.startsWith(ref, `#/components/${componentName}`));

/**
 *
 * @param {TypeInfo} typeInfo
 * @returns {TypeData}
 */
const getTypeData = (typeInfo) => {
  if (!typeInfo.typeData) {
    typeInfo.typeData = parseSchema(typeInfo.rawTypeData, typeInfo.typeName);
  }

  return typeInfo.typeData;
};

/**
 *
 * @param {string} ref
 * @returns {TypeInfo | undefined}
 */
const getComponentByRef = (ref) => config.componentsMap[ref];

module.exports = {
  getTypeData,
  createComponent,
  createComponentsMap,
  filterComponentsMap,
  getComponentByRef,
};
