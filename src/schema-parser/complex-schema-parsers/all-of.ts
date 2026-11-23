import { omit } from "es-toolkit";
import { MonoSchemaParser } from "../mono-schema-parser.js";

// T1 & T2
export class AllOfSchemaParser extends MonoSchemaParser {
  override parse() {
    const ignoreTypes = [this.config.Ts.Keyword.Any];
    const combined = this.schema.allOf.map((childSchema) =>
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

    // When every allOf member resolves to `any` (for example an external $ref
    // that is not resolved because `disableExternalSchemas` is on), fall back
    // to the schema's own declared type instead of degrading to `any`.
    const type =
      this.config.Ts.IntersectionType(filtered) ||
      this.schemaParserFabric.getInlineParseContent(
        omit(this.schema, ["allOf"]),
        null,
        this.schemaPath,
      );

    return this.schemaUtils.safeAddNullToType(this.schema, type);
  }
}
