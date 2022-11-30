const _ = require("lodash");

/**
 * @typedef {{
 *  $ref: string,
 *  schemas: { original: Record<string, any>, parsed: Record<string, any>, ref: Record<string, any> },
 *  content: Record<string, any> | string,
 *  inlineContent: string,
 *  refContent: string,
 *  name: string,
 *  typeName: string,
 *  linkers: string[],
 * }} DataContract
 */

class DataContracts {
  /** @type {CodeGenConfig} */
  config;
  /** @type {Logger} */
  logger;
  /** @type {SchemaParserFabric} */
  schemaParserFabric;
  /** @type {TypeNameFormatter} */
  typeNameFormatter;
  /** @type {SchemaUtils} */
  schemaUtils;
  /** @type {SchemaComponentsMap} */
  schemaComponentsMap;

  /** @type {DataContract[]} */
  values;

  constructor({ config, logger, schemaParserFabric }) {
    this.values = [];
    this.config = config;
    this.logger = logger;
    this.schemaParserFabric = schemaParserFabric;
    this.schemaUtils = this.schemaParserFabric.schemaUtils;
    this.typeNameFormatter = this.schemaParserFabric.typeNameFormatter;
    this.schemaComponentsMap = this.schemaParserFabric.schemaComponentsMap;
  }

  _createDataContractNames = (name, builder) => {
    if (!builder) {
      const formatted = this.typeNameFormatter.format(name);
      const usageName = this.config.componentTypeNameResolver.resolve([formatted]);

      return { formatted, usageName, originalName: name };
    }

    const { usageName, original, formatted } = builder();

    return { formatted: formatted || usageName, usageName, originalName: original || null };
  };

  /**
   *
   * @param schema
   * @param name
   * @param $ref
   * @param {() => ({ usageName: string, formatted: string, original: string })} [nameBuilder]
   * @returns {DataContract}
   */
  add = ({ schema, name, nameBuilder, contractType = "schemas", schemaPath }) => {
    const { formatted, usageName, originalName } = this._createDataContractNames(name, nameBuilder);
    const parser = this.schemaParserFabric.createSchemaParser({
      schema,
      typeName: originalName,
      schemaPath,
    });
    const parsed = parser.parseSchema();
    const $ref = this.schemaComponentsMap.createRef(["components", contractType, usageName]);

    const refContent = usageName;

    const linkers = _.uniq(
      _.compact([
        originalName,
        usageName,
        formatted,
        $ref,
        originalName && this.typeNameFormatter.format(originalName, { onlyFormat: true }),
        originalName && this.schemaComponentsMap.createRef(["components", "schemas", originalName]),
        this.schemaComponentsMap.createRef(["components", "schemas", formatted]),
        refContent,
      ]),
    );

    /**
     * @type {DataContract}
     */
    const dataContract = {
      $ref: $ref,
      schemas: {
        original: schema,
        parsed,
      },
      refContent,
      content: parser.getParseContent(),
      inlineContent: parser.getInlineParseContent(),
      name: usageName,
      typeName: usageName,
      linkers: linkers,
    };

    this.values.push(dataContract);

    dataContract.schemas.ref = this.schemaParserFabric.parseSchema({ $ref: $ref });

    return dataContract;
  };

  /**
   * @param name
   * @returns {DataContract | null}
   */
  findByLinker = (name) => {
    return this.values.find((value) => value.linkers.includes(name)) || null;
  };

  /**
   * @param content
   * @returns {DataContract | null}
   */
  findByContent = (content) => {
    return (
      this.values.find(
        (value) =>
          _.isEqual(value.content, content) ||
          _.isEqual(value.inlineContent, content) ||
          _.isEqual(value.refContent, content),
      ) || null
    );
  };
}

module.exports = {
  DataContracts,
};
