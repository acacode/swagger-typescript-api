
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
  swaggerSchema: null,
  /** { "#/components/schemas/Foo": @TypeInfo, ... } */
  componentsMap: {},
}

/** needs to use data everywhere in project */
module.exports = {
  addToConfig: configParts => Object.assign(config, configParts),
  config,
} 
