const mustache = require("mustache");
const _ = require("lodash");
const fs = require("fs");
const path = require("path");
const { parseSchema } = require('./schema');
const { parseRoutes, groupRoutes } = require('./routes');
const { createApiConfig } = require('./apiConfig');
const { getModelType } = require('./modelTypes');
const { getSwaggerObject } = require('./swagger');
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

      const apiTemplate = fs.readFileSync(path.resolve(__dirname, './templates/api.mustache'), 'utf-8');
      const clientTemplate = fs.readFileSync(path.resolve(__dirname, './templates/client.mustache'), 'utf-8');
      const routeTypesTemplate = fs.readFileSync(path.resolve(__dirname, './templates/route-types.mustache'), 'utf-8');

      const parsedSchemas = _.map(_.get(components, "schemas"), parseSchema)
      const routes = parseRoutes(paths, parsedSchemas, components);
      const hasSecurityRoutes = routes.some(route => route.security);
      const hasQueryRoutes = routes.some(route => route.hasQuery);
      const apiConfig = createApiConfig({ info, servers }, hasSecurityRoutes);
    
      const configuration = {
        apiConfig,
        modelTypes: _.map(parsedSchemas, getModelType),
        hasSecurityRoutes,
        hasQueryRoutes,
        routes: groupRoutes(routes),
      };
    
      const sourceFile = [
        mustache.render(apiTemplate, configuration),
        generateRouteTypes ? mustache.render(routeTypesTemplate, configuration) : '',
        generateClient ? mustache.render(clientTemplate, configuration) : '',
      ].join('');

      if (output && fs.existsSync(output)) {
        fs.writeFileSync(path.resolve(__dirname, output, `./${name}`), sourceFile, _.noop)
        console.log(`✔️  your typescript api file created in "${output}"`)
      }

      resolve(sourceFile);
    }).catch(e =>{
      reject(e);
      throw new Error('Swagger schema parse error!\r\n ' + e)
    })
  })
}

