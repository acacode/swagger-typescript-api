const { MonoSchemaParser } = require("../mono-schema-parser");
const _ = require("lodash");
const { SCHEMA_TYPES } = require("../../constants");

class ArraySchemaParser extends MonoSchemaParser {
  parse() {
    let contentType;
    const { type, description, items } = this.schema || {};

    if (_.isArray(items) && type === SCHEMA_TYPES.ARRAY) {
      const tupleContent = items.map((item) => this.schemaParser.getInlineParseContent(item, null, this.schemaPath));
      contentType = this.config.Ts.Tuple(tupleContent);
    } else {
      const content = this.schemaParser.getInlineParseContent(items, null, this.schemaPath);
      contentType = this.config.Ts.ArrayType(content);
    }

    return {
      ...(_.isObject(this.schema) ? this.schema : {}),
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
