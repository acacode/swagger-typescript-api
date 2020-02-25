
const config = {
  defaultResponseAsSuccess: false,
  generateRouteTypes: false,
  generateClient: true,
}

/** needs to use CLI config data everywhere in project */
module.exports = {
  setConfig: configParts => Object.assign(config, configParts),
  config,
}