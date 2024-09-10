import { MonoSchemaParser } from "../mono-schema-parser.js";

// T1 | T2
export class AnyOfSchemaParser extends MonoSchemaParser {
  override parse() {
    const ignoreTypes = [this.config.Ts.Keyword.Any];
    const combined = this.schema.anyOf.map((childSchema) =>
      this.schemaParserFabric.getInlineParseContent(
        this.schemaUtils.makeAddRequiredToChildSchema(this.schema, childSchema),
        null,
        this.schemaPath,
      ),
    );

    const filtered = this.schemaUtils.filterSchemaContents(
      combined,
      (content) => !ignoreTypes.includes(content),
    );

    const type = this.config.Ts.UnionType(filtered);

    return this.schemaUtils.safeAddNullToType(this.schema, type);
  }
}
