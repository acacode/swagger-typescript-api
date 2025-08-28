import { MonoSchemaParser } from "../mono-schema-parser.js";

// T1 & T2
export class AllOfSchemaParser extends MonoSchemaParser {
  override parse() {
    const ignoreTypes = [this.config.Ts.Keyword.Any];
    const combined = this.schema.allOf.map((childSchema) => {
      const content = this.schemaParserFabric.getInlineParseContent(
        this.schemaUtils.makeAddRequiredToChildSchema(this.schema, childSchema),
        null,
        this.schemaPath,
      );

      if (content?.includes(this.config.Ts.Keyword.Union)) {
        return this.config.Ts.ExpressionGroup(content);
      }

      return content;
    });
    const filtered = this.schemaUtils.filterSchemaContents(
      combined,
      (content) => !ignoreTypes.includes(content),
    );

    const type = this.config.Ts.IntersectionType(filtered);

    return this.schemaUtils.safeAddNullToType(this.schema, type);
  }
}
