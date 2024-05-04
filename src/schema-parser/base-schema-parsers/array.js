const { MonoSchemaParser } = require("../mono-schema-parser");
const _ = require("lodash");
const { SCHEMA_TYPES } = require("../../constants");

class ArraySchemaParser extends MonoSchemaParser {
  parse() {
    let contentType;
    const { type, description, items } = this.schema || {};

    if (_.isArray(items) && type === SCHEMA_TYPES.ARRAY) {
      const tupleContent = [];
      for (const item of items) {
        tupleContent.push(
          this.schemaParserFabric
            .createSchemaParser({ schema: item, schemaPath: this.schemaPath })
            .getInlineParseContent(),
        );
      }
      contentType = this.config.Ts.Tuple(tupleContent);
    } else {
      const content = this.schemaParserFabric
        .createSchemaParser({ schema: items, schemaPath: this.schemaPath })
        .getInlineParseContent();
      contentType = this.config.Ts.ArrayType(content);
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
      content: this.schemaUtils.safeAddNullToType(this.schema, contentType),
    };
  }
}

module.exports = {
  ArraySchemaParser,
};
