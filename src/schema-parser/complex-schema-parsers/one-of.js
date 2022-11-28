const { MonoSchemaParser } = require("../mono-schema-parser");
const _ = require("lodash");

// T1 | T2
class OneOfSchemaParser extends MonoSchemaParser {
  parse() {
    const ignoreTypes = [this.config.Ts.Keyword.Any];
    const combined = _.map(this.schema.oneOf, (childSchema) =>
      this.schemaParserFabric.getInlineParseContent(
        this.schemaUtils.makeAddRequiredToChildSchema(this.schema, childSchema),
        null,
        this.schemaPath,
      ),
    );

    const filtered = this.schemaUtils.filterSchemaContents(combined, (content) => !ignoreTypes.includes(content));

    const type = this.config.Ts.UnionType(filtered);

    return this.schemaUtils.safeAddNullToType(this.schema, type);
  }
}

module.exports = { OneOfSchemaParser };
