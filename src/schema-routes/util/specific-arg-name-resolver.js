const { NameResolver } = require("../../util/name-resolver");

class SpecificArgNameResolver extends NameResolver {
  counter = 1;
  /**
   * @param {CodeGenConfig} config;
   * @param {Logger} logger;
   * @param {string[]} reservedNames
   */
  constructor(config, logger, reservedNames) {
    super(config, logger, reservedNames, (variants) => {
      const generatedVariant =
        (variants[0] && `${variants[0]}${this.counter++}`) ||
        `${this.config.specificArgNameResolverName}${this.counter++}`;
      this.logger.debug("generated fallback type name for specific arg - ", generatedVariant);
      return generatedVariant;
    });
  }
}

module.exports = {
  SpecificArgNameResolver,
};
