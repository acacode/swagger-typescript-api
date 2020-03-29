const config = {
  /** CLI flag */
  generateResponses: false,
  /** CLI flag */
  defaultResponseAsSuccess: false,
  /** CLI flag */
  generateRouteTypes: false,
  /** CLI flag */
  generateClient: true,
  /** parsed swagger schema from getSwaggerObject() */

  /** parsed swagger schema ref */
  swaggerSchema: null,
  /** original (converted to json) swagger schema ref */
  originalSchema: null,

  /** { "#/components/schemas/Foo": @TypeInfo, ... } */
  componentsMap: {},
  /** flag for catching convertion from swagger 2.0 */
  convertedFromSwagger2: false,
};

/** needs to use data everywhere in project */
module.exports = {
  addToConfig: (configParts) => Object.assign(config, configParts),
  config,
};
