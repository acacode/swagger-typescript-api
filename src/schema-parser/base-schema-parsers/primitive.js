const { MonoSchemaParser } = require("../mono-schema-parser");
const _ = require("lodash");
const { SCHEMA_TYPES } = require("../../constants");

class PrimitiveSchemaParser extends MonoSchemaParser {
  parse() {
    let contentType = null;
    const { additionalProperties, type, description, items } = this.schema || {};

    if (type === this.config.Ts.Keyword.Object && additionalProperties) {
      const fieldType = _.isObject(additionalProperties)
        ? this.schemaParserFabric
            .createSchemaParser({ schema: additionalProperties, schemaPath: this.schemaPath })
            .getInlineParseContent()
        : this.config.Ts.Keyword.Any;
      contentType = this.config.Ts.RecordType(this.config.Ts.Keyword.String, fieldType);
    }

    if (_.isArray(type) && type.length) {
      contentType = this.schemaParser._complexSchemaParsers.oneOf({
        ...(_.isObject(this.schema) ? this.schema : {}),
        oneOf: type.map((type) => ({ type })),
      });
    }

    if (_.isArray(items) && type === SCHEMA_TYPES.ARRAY) {
      contentType = this.config.Ts.Tuple(
        items.map((item) =>
          this.schemaParserFabric
            .createSchemaParser({ schema: item, schemaPath: this.schemaPath })
            .getInlineParseContent(),
        ),
      );
    }

    return {
      ...(_.isObject(this.schema) ? this.schema : {}),
      $schemaPath: this.schemaPath.slice(),
      $parsedSchema: true,
      schemaType: SCHEMA_TYPES.PRIMITIVE,
      type: SCHEMA_TYPES.PRIMITIVE,
      typeIdentifier: this.config.Ts.Keyword.Type,
      name: this.typeName,
      description: this.schemaFormatters.formatDescription(description),
      // TODO: probably it should be refactored. `type === 'null'` is not flexible
      content: type === this.config.Ts.Keyword.Null ? type : contentType || this.schemaUtils.getSchemaType(this.schema),
    };
  }
}

module.exports = {
  PrimitiveSchemaParser,
};
