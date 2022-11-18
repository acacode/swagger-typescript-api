const { MonoSchemaParser } = require("../mono-schema-parser");
const _ = require("lodash");

// T1 & T2
class AllOfSchemaParser extends MonoSchemaParser {
  parse() {
    const ignoreTypes = [this.config.Ts.Keyword.Any];
    const combined = _.map(this.schema.allOf, (childSchema) =>
      this.schemaParserFabric
        .createSchemaParser({
          schema: this.schemaUtils.makeAddRequiredToChildSchema(this.schema, childSchema),
          schemaPath: this.schemaPath,
        })
        .getInlineParseContent(),
    );
    const filtered = this.schemaUtils.filterSchemaContents(combined, (content) => !ignoreTypes.includes(content));

    const type = this.config.Ts.IntersectionType(filtered);

    return this.schemaUtils.safeAddNullToType(this.schema, type);
  }
}

module.exports = { AllOfSchemaParser };
