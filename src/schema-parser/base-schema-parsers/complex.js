import lodash from "lodash";
import { SCHEMA_TYPES } from "../../constants.js";
import { MonoSchemaParser } from "../mono-schema-parser.js";

class ComplexSchemaParser extends MonoSchemaParser {
  parse() {
    const complexType = this.schemaUtils.getComplexType(this.schema);
    const simpleSchema = lodash.omit(
      lodash.clone(this.schema),
      lodash.keys(this.schemaParser._complexSchemaParsers),
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
          lodash.compact(
            lodash.map(this.schema[complexType], "description"),
          )[0] ||
          "",
      ),
      content:
        this.config.Ts.IntersectionType(
          lodash.compact([
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

export { ComplexSchemaParser };
