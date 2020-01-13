const mustache = require("mustache");
const _ = require("lodash");
const fs = require("fs");
const { info, paths, servers, components } = require('./swagger.json');
const { parseSchema } = require('./modelTypes')
const { parseRoutes } = require('./routes')
const { createApiConfig } = require('./apiConfig');

const apiTemplate = fs.readFileSync('api.mustache', { encoding: 'UTF-8' })

const routes = parseRoutes(paths);
const hasSecurityRoutes = routes.some(route => route.security);
const apiConfig = createApiConfig({ info, servers }, hasSecurityRoutes);

const configuration = {
  apiConfig,
  modelTypes: _.map(components && components.schemas, parseSchema),
  hasSecurityRoutes,
  routes
}

const sourceFile = mustache.render(apiTemplate, configuration)
fs.writeFile("api.ts", sourceFile, _.noop)