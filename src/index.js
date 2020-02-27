const mustache = require("mustache");
const _ = require("lodash");
const { parseSchemas } = require('./schema');
const { parseRoutes, groupRoutes } = require('./routes');
const { createApiConfig } = require('./apiConfig');
const { getModelType } = require('./modelTypes');
const { getSwaggerObject } = require('./swagger');
const { createComponentsMap, filterComponentsMap } = require("./components");
const { getTemplate, createFile, pathIsExist } = require('./files');
const { addToConfig, config: defaults } = require("./config");

mustache.escape = value => value

module.exports = {
  generateApi: ({
    input,
    output,
    url,
    name,
    defaultResponseAsSuccess = defaults.defaultResponseAsSuccess,
    generateRouteTypes = defaults.generateRouteTypes,
    generateClient = defaults.generateClient,
  }) => new Promise((resolve, reject) => {
    addToConfig({
      defaultResponseAsSuccess,
      generateRouteTypes,
      generateClient,
    })
    getSwaggerObject(input, url).then(({ info, paths, servers, components }) => {
      console.log('☄️  start generating your typescript api')

      const apiTemplate = getTemplate('api');
      const clientTemplate = getTemplate('client');
      const routeTypesTemplate = getTemplate('route-types');

      const componentsMap = createComponentsMap(components);
      const schemasMap = filterComponentsMap(componentsMap, "schemas")

      const parsedSchemas = parseSchemas(components);
      const routes = parseRoutes(swaggerSchema, parsedSchemas, componentsMap, components);
      const hasSecurityRoutes = routes.some(route => route.security);
      const hasQueryRoutes = routes.some(route => route.hasQuery);
      const apiConfig = createApiConfig({ info, servers }, hasSecurityRoutes);
    
      const configuration = {
        apiConfig,
        modelTypes: _.map(schemasMap, getModelType),
        hasSecurityRoutes,
        hasQueryRoutes,
        routes: groupRoutes(routes),
      };
    
      const sourceFile = [
        mustache.render(apiTemplate, configuration),
        generateRouteTypes ? mustache.render(routeTypesTemplate, configuration) : '',
        generateClient ? mustache.render(clientTemplate, configuration) : '',
      ].join('');

      if (pathIsExist(output)) {
        createFile(output, name, sourceFile);
        console.log(`✔️  your typescript api file created in "${output}"`)
      }

      resolve(sourceFile);
    }).catch(e =>{
      reject(e);
      throw new Error('Swagger schema parse error!\r\n ' + e)
    })
  })
}

