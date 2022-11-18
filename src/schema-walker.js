const _ = require("lodash");
const path = require("path");
const { add } = require("lodash");

// TODO: WIP
// this class will be needed to walk by schema everywhere
class SchemaWalker {
  /** @type {Logger} */
  logger;
  /** @type {CodeGenConfig} */
  config;
  /** @type {SwaggerSchemaResolver} */
  swaggerSchemaResolver;
  /** @type {Map<string, Record<string, any>>} */
  schemas = new Map();
  /** @type {Map<string, Record<string, any>>} */
  caches = new Map();

  constructor({ config, logger, fileSystem }) {
    this.logger = logger;
    this.config = config;
  }

  /**
   * @param name {string}
   * @param schema {Record<string, any>}
   */
  addSchema = (name, schema) => {
    this.schemas.set(name, _.cloneDeep(schema));
  };

  /**
   * @param ref {string}
   * @returns {any}
   */
  findByRef = (ref) => {
    this.logger.debug("try to resolve ref by path", ref);

    if (this.caches.has(ref)) {
      return this.caches.get(ref);
    }

    const schemas = Array.from(this.schemas.values());
    if (this._isLocalRef(ref)) {
      for (const schema of schemas) {
        const refData = this._getRefDataFromSchema(schema, ref);
        if (refData) {
          return refData;
        }
      }
    } else if (this._isRemoteRef(ref)) {
      this.logger.debug("remote refs not supported", ref);
      return null;
    } else {
      const [address, path] = path.split("#");
      let swaggerSchemaObject;

      if (this.schemas.has(address)) {
        swaggerSchemaObject = this.schemas.get(address);
      } else {
        const pathToSchema = path.resolve(process.cwd(), address);
        const swaggerSchemaFile = this.swaggerSchemaResolver.getSwaggerSchemaByPath(pathToSchema);
        swaggerSchemaObject = this.swaggerSchemaResolver.processSwaggerSchemaFile(swaggerSchemaFile);
        this.schemas.set(address, swaggerSchemaObject);
      }

      return this._getRefDataFromSchema(swaggerSchemaObject, path);
    }
  };

  _isLocalRef = (ref) => {
    return ref.startsWith("#");
  };

  _isRemoteRef = (ref) => {
    return ref.startsWith("http://") || ref.startsWith("https://");
  };

  _getRefDataFromSchema = (schema, ref) => {
    const path = ref.replace("#", "").split("/");
    const refData = _.get(schema, path);
    if (refData) {
      this.caches.set(ref, refData);
    }
    return refData;
  };
}

module.exports = {
  SchemaWalker,
};
