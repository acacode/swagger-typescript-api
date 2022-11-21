const { getRandomInt } = require("./util/random");
const { pascalCase } = require("./util/pascal-case");
const { NameResolver } = require("./util/name-resolver");

class ComponentTypeNameResolver extends NameResolver {
  counter = 1;
  fallbackNameCounter = 1;

  /**
   * @param {CodeGenConfig} config;
   * @param {Logger} logger;
   * @param {string[]} reservedNames
   */
  constructor(config, logger, reservedNames) {
    super(config, logger, reservedNames, (variants) => {
      const randomVariant = variants[getRandomInt(0, variants.length - 1)];
      const generatedVariant = pascalCase(
        (randomVariant && `${randomVariant}${this.counter++}`) ||
          `${this.config.componentTypeNameResolver}${this.fallbackNameCounter++}`,
      );
      this.logger.debug("generated fallback type name for component - ", generatedVariant);
      return generatedVariant;
    });
  }
}

module.exports = {
  ComponentTypeNameResolver,
};
