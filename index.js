const mustache = require("mustache");
const _ = require("lodash");
const fs = require("fs");
const { info, paths, servers, components } = require('./swagger.json');
const { parseSchema } = require('./modelTypes')
const { parseRoutes } = require('./routes')
const { createApiConfig } = require('./apiConfig');

mustache.escape = function (value){
    return value;
};

const apiTemplate = fs.readFileSync('api.mustache', { encoding: 'UTF-8' })

const routes = parseRoutes(paths);
const hasSecurityRoutes = routes.some(route => route.security);
const apiConfig = createApiConfig({ info, servers }, hasSecurityRoutes);

const configuration = {
  apiConfig,
  modelTypes: _.map(components && components.schemas, parseSchema),
  hasSecurityRoutes,
  routes: _.reduce(routes.reduce((modules, route) => {
    
    if (route.moduleName) {
      if (!modules[route.moduleName]) {
        modules[route.moduleName] = []
      }
      
      modules[route.moduleName].push(route)
    } else {
      modules.$outOfModule.push(route)
    }

    return modules
  }, {
    $outOfModule: []
  }), (shuffle, packRoutes, moduleName) => {


    if (moduleName === "$outOfModule") {
      shuffle['outOfModule'] = packRoutes
    } else {
      if (!shuffle.combined) shuffle.combined = []

      shuffle.combined.push({
        moduleName,
        routes: packRoutes,
      })
    }

    return shuffle;
  }, {})
}

const sourceFile = mustache.render(apiTemplate, configuration)
fs.writeFile("api.ts", sourceFile, _.noop)