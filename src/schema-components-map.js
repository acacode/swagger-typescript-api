const _ = require("lodash");

class SchemaComponentsMap {
  /**
   * @type {Record<string, SchemaComponent>}
   */
  data = {};
  /**
   * @type {CodeGenConfig}
   */
  config;

  constructor(config, schema) {
    this.config = config;
    this.processSchema(schema);
  }

  processSchema(schema) {
    this.data = {};
    if (!schema) return;
    _.each(schema.components, (component, componentName) =>
      _.each(component, (rawTypeData, typeName) => this.createComponent(componentName, typeName, rawTypeData)),
    );
  }

  createComponent(componentName, typeName, rawTypeData) {
    const $ref = `#/components/${componentName}/${typeName}`;

    const componentSchema = {
      $ref,
      typeName,
      rawTypeData,
      componentName,
      /** result from schema parser */
      typeData: null,
    };

    const usageComponent = this.config.hooks.onCreateComponent(componentSchema) || componentSchema;

    this.data[$ref] = usageComponent;

    return usageComponent;
  }

  /**
   * @param componentName {string}
   * @returns {SchemaComponent[]}
   */
  filter(componentName) {
    return _.filter(this.data, (v, ref) => _.startsWith(ref, `#/components/${componentName}`));
  }

  get(ref) {
    return this.data[ref] || null;
  }
}

module.exports = {
  SchemaComponentsMap,
};
