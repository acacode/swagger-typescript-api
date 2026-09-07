import { compact, omit } from "es-toolkit";
import { SCHEMA_TYPES } from "../../constants.js";
import { MonoSchemaParser } from "../mono-schema-parser.js";

export class ComplexSchemaParser extends MonoSchemaParser {
  override parse() {
    const complexType = this.schemaUtils.getComplexType(this.schema);
    const complexSchemaItems: Array<Record<string, unknown>> = Array.isArray(
      this.schema[complexType],
    )
      ? this.schema[complexType]
      : [];
    const simpleSchema = omit(
      this.schema,
      Object.keys(this.schemaParser._complexSchemaParsers),
    );
    const complexSchemaContent = this.schemaParser._complexSchemaParsers[
      complexType
    ](this.schema);

    // A $ref alongside `not`, `allOf` and friends is a sibling in OpenAPI 3.1: the
    // keywords apply on top of the referenced schema. Parsing the reference too keeps
    // the type, which would otherwise be lost with the complex keyword that cannot be
    // expressed in TypeScript.
    const shouldParseSimpleSchema =
      this.schemaUtils.getInternalSchemaType(simpleSchema) ===
        SCHEMA_TYPES.OBJECT || this.schemaUtils.isRefSchema(simpleSchema);

    return {
      ...(typeof this.schema === "object" ? this.schema : {}),
      $schemaPath: this.schemaPath.slice(),
      $parsedSchema: true,
      schemaType: SCHEMA_TYPES.COMPLEX,
      type: SCHEMA_TYPES.PRIMITIVE,
      typeIdentifier: this.config.Ts.Keyword.Type,
      name: this.typeName,
      description: this.schemaFormatters.formatDescription(
        this.schema.description ||
          compact(complexSchemaItems.map((item) => item.description))[0] ||
          "",
      ),
      content:
        this.config.Ts.IntersectionType(
          this.schemaUtils
            .filterSchemaContents(
              compact([
                complexSchemaContent,
                shouldParseSimpleSchema &&
                  this.schemaParserFabric
                    .createSchemaParser({
                      schema: simpleSchema,
                      schemaPath: this.schemaPath,
                    })
                    .getInlineParseContent(),
              ]),
              (content) => content !== this.config.Ts.Keyword.Any,
            )
            .map((content) => this.config.Ts.ExpressionGroup(content)),
        ) || this.config.Ts.Keyword.Any,
    };
  }
}
