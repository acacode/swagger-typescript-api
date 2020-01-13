const mustache = require("mustache");
const _ = require("lodash");
const fs = require("fs");
const { parseSchema } = require('./schema');
const { parseRoutes, groupRoutes } = require('./routes');
const { createApiConfig } = require('./apiConfig');
const { getModelType } = require('./modelTypes');
const { getSwaggerObject } = require('./swagger');

mustache.escape = value => value

getSwaggerObject('./swagger.json').then(({ info, paths, servers, components }) => {
  const apiTemplate = fs.readFileSync('api.mustache', { encoding: 'UTF-8' })

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
  fs.writeFile("api.ts", sourceFile, _.noop)
});

