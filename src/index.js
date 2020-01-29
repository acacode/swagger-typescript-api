const mustache = require("mustache");
const _ = require("lodash");
const fs = require("fs");
const path = require("path");
const { parseSchema } = require('./schema');
const { parseRoutes, groupRoutes } = require('./routes');
const { createApiConfig } = require('./apiConfig');
const { getModelType } = require('./modelTypes');
const { getSwaggerObject } = require('./swagger');

mustache.escape = value => value

module.exports = {
  generateApi: ({ input, output, url }) => new Promise((resolve, reject) => {
    getSwaggerObject(input, url).then(({ info, paths, servers, components }) => {
      console.log('☄️  start generating your typescript api')

      const apiTemplate = fs.readFileSync(path.resolve(__dirname, './templates/api.mustache'), { encoding: 'UTF-8' })
    
      const parsedSchemas = _.map(components && components.schemas, parseSchema)
      const routes = parseRoutes(paths, parsedSchemas);
      const hasSecurityRoutes = routes.some(route => route.security);
      const hasQueryRoutes = routes.some(route => route.hasQuery);
      const apiConfig = createApiConfig({ info, servers }, hasSecurityRoutes);
    
      const configuration = {
        apiConfig,
        modelTypes: _.map(parsedSchemas, getModelType),
        hasSecurityRoutes,
        hasQueryRoutes,
        routes: groupRoutes(routes),
      }
    
      const sourceFile = mustache.render(apiTemplate, configuration)

      if (output) {
        fs.writeFile(output, sourceFile, _.noop)
      }
      console.log(`✔️  your typescript api file created in "${output}"`)
      resolve(sourceFile);
    }).catch(e =>{
      reject(e);
      throw new Error('Swagger schema parse error!\r\n ' + e)
    })
  })
}

