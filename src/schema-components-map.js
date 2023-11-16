const _ = require('lodash');

class SchemaComponentsMap {
  /**
   * Список компонентов схемы
   * @type {SchemaComponent[]} */
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

  /**
   * Создает компонент.
   * typeName - ключ ключа компонента (например, "Need", "User", "Jwt").
   * componentName - ключ компонента (например, "schemas", "securitySchemes")
   * rawTypeData - содержимое при обращении к typeName
   * @param $ref {String}
   * @param rawTypeData {Object}
   * @return {{rawTypeData: object, typeName: string, componentName: string, typeData: null, $ref: string}}
   */
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
   * Фильтрует компоненты из this._data, возвращает только те, что начинаются с одного из переданных компонентов
   * @params {...string[]} componentNames - имена компонентов #/components/ИМЯ
   * @returns {SchemaComponent[]}
   */
  filter(...componentNames) {
    // ['schemas']
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
