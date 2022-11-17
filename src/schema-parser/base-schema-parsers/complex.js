const { MonoSchemaParser } = require("../mono-schema-parser");
const _ = require("lodash");
const { SCHEMA_TYPES } = require("../../constants");

class ComplexSchemaParser extends MonoSchemaParser {
  parse() {
    const complexType = this.schemaUtils.getComplexType(this.schema);
    const simpleSchema = _.omit(_.clone(this.schema), _.keys(this.schemaParser.complexSchemaParsers));
    const complexSchemaContent = this.schemaParser.complexSchemaParsers[complexType](this.schema);

    return {
      ...(_.isObject(this.schema) ? this.schema : {}),
      $parsedSchema: true,
      schemaType: SCHEMA_TYPES.COMPLEX,
      type: SCHEMA_TYPES.PRIMITIVE,
      typeIdentifier: this.config.Ts.Keyword.Type,
      name: this.typeName,
      description: this.schemaFormatters.formatDescription(
        this.schema.description || _.compact(_.map(this.schema[complexType], "description"))[0] || "",
      ),
      content:
        this.config.Ts.IntersectionType(
          _.compact([
            this.config.Ts.ExpressionGroup(complexSchemaContent),
            this.schemaUtils.getInternalSchemaType(simpleSchema) === SCHEMA_TYPES.OBJECT &&
              this.config.Ts.ExpressionGroup(
                this.schemaParser.getInlineParseContent(simpleSchema, null, this.schemaPath),
              ),
          ]),
        ) || this.config.Ts.Keyword.Any,
    };
  }
}

module.exports = {
  ComplexSchemaParser,
};
