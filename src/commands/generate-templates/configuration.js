const { objectAssign } = require("../../util/object-assign");
const { HTTP_CLIENT, PROJECT_VERSION } = require("../../constants");

/**
 * @type {GenerateTemplatesParams}}
 */
class TemplatesGenConfig {
  cleanOutput = false;
  output = undefined;
  httpClientType = HTTP_CLIENT.FETCH;
  modular = false;
  silent = false;
  version = PROJECT_VERSION;
  rewrite = false;

  /**
   * @param config {GenerateTemplatesParams}
   */
  constructor(config) {
    this.update(config);
  }

  /**
   * @param update {Partial<GenerateTemplatesParams>}
   */
  update = (update) => {
    objectAssign(this, update);
  };
}

module.exports = {
  TemplatesGenConfig,
};
