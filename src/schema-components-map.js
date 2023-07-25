const _ = require('lodash');

class SchemaComponentsMap {
  /** @type {SchemaComponent[]} */
  _data = [];
  /** @type {CodeGenConfig} */
  config;

  constructor({ config }) {
    this.config = config;
  }

  clear() {
    this._data = [];
  }

  createRef = (paths) => {
    return ['#', ...paths].join('/');
  };

  parseRef = (ref) => {
    return ref.split('/');
  };

  createComponent($ref, rawTypeData) {
    const parsed = this.parseRef($ref);
    const typeName = parsed[parsed.length - 1];
    const componentName = parsed[parsed.length - 2];
    const componentSchema = {
      $ref,
      typeName,
      rawTypeData,
      componentName,
      /** result from schema parser */
      typeData: null,
    };

    const usageComponent =
      this.config.hooks.onCreateComponent(componentSchema) || componentSchema;

    const refIndex = this._data.findIndex((c) => c.$ref === $ref);

    if (refIndex === -1) {
      this._data.push(usageComponent);
    } else {
      this._data[refIndex] = usageComponent;
    }

    return usageComponent;
  }

  /**
   * @returns {SchemaComponent[]}
   */
  getComponents() {
    return this._data;
  }

  /**
   * @params {...string[]} componentNames
   * @returns {SchemaComponent[]}
   */
  filter(...componentNames) {
    return _.filter(this._data, (it) =>
      componentNames.some((componentName) =>
        _.startsWith(it.$ref, `#/components/${componentName}`),
      ),
    );
  }

  get($ref) {
    return this._data.find((c) => c.$ref === $ref) || null;
  }
}

module.exports = {
  SchemaComponentsMap,
};
