const constants = require("./constants");

const config = {
  /** CLI flag */
  templates: "../templates/default",
  /** CLI flag */
  generateResponses: false,
  /** CLI flag */
  defaultResponseAsSuccess: false,
  /** CLI flag */
  generateRouteTypes: false,
  /** CLI flag */
  generateClient: true,
  /** CLI flag */
  generateUnionEnums: false,
  enumNamesAsValues: false,
  /** parsed swagger schema from getSwaggerObject() */

  /** parsed swagger schema ref */
  swaggerSchema: null,
  /** original (converted to json) swagger schema ref */
  originalSchema: null,

  /** { "#/components/schemas/Foo": @TypeInfo, ... } */
  componentsMap: {},
  /** flag for catching convertion from swagger 2.0 */
  convertedFromSwagger2: false,

  /** url index from paths used for merging into modules */
  moduleNameIndex: 0,
  disableStrictSSL: false,
  extractRequestParams: false,
  fileNames: {
    dataContracts: "data-contracts",
    routeTypes: "route-types",
    httpClient: "http-client",
    outOfModuleApi: "Common",
  },
  routeNameDuplicatesMap: new Map(),
  prettierOptions: constants.PRETTIER_OPTIONS,
  hooks: {
    onCreateComponent: (schema) => schema,
    onParseSchema: (originalSchema, parsedSchema) => parsedSchema,
    onCreateRoute: (routeData) => routeData,
    onInit: (config) => config,
    onPrepareConfig: (apiConfig) => apiConfig,
    onCreateRequestParams: (rawType) => {},
    onCreateRouteName: () => {},
  },
  defaultResponseType: constants.TS_KEYWORDS.VOID,
  singleHttpClient: false,
};

/** needs to use data everywhere in project */
module.exports = {
  addToConfig: (configParts) => Object.assign(config, configParts),
  config,
};
