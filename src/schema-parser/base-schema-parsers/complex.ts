import { compact, omit } from "es-toolkit";
import { SCHEMA_TYPES } from "../../constants.js";
import { MonoSchemaParser } from "../mono-schema-parser.js";

export class ComplexSchemaParser extends MonoSchemaParser {
  override parse() {
    const complexType = this.schemaUtils.getComplexType(this.schema);
    const simpleSchema = omit(
      this.schema,
      Object.keys(this.schemaParser._complexSchemaParsers),
    );
    const complexSchemaContent = this.schemaParser._complexSchemaParsers[
      complexType
    ](this.schema);

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
          compact(
            (this.schema[complexType] || []).map(
              (item: any) => item?.description,
            ),
          )[0] ||
          "",
      ),
      content:
        this.config.Ts.IntersectionType(
          compact([
            this.config.Ts.ExpressionGroup(complexSchemaContent),
            this.schemaUtils.getInternalSchemaType(simpleSchema) ===
              SCHEMA_TYPES.OBJECT &&
              this.config.Ts.ExpressionGroup(
                this.schemaParserFabric
                  .createSchemaParser({
                    schema: simpleSchema,
                    schemaPath: this.schemaPath,
                  })
                  .getInlineParseContent(),
              ),
          ]),
        ) || this.config.Ts.Keyword.Any,
    };
  }
}
