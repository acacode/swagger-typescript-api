import { SCHEMA_TYPES } from "../../constants.js";
import { MonoSchemaParser } from "../mono-schema-parser.js";

export class ArraySchemaParser extends MonoSchemaParser {
  override parse() {
    let contentType;
    const { type, description, items, readOnly } = this.schema || {};

    const readonly =
      (readOnly && this.config.addReadonly) || this.config.makeImmutable;

    if (Array.isArray(items) && type === SCHEMA_TYPES.ARRAY) {
      const tupleContent = [];
      for (const item of items) {
        tupleContent.push(
          this.schemaParserFabric
            .createSchemaParser({ schema: item, schemaPath: this.schemaPath })
            .getInlineParseContent(),
        );
      }
      contentType = this.config.Ts.Tuple({
        readonly,
        values: tupleContent,
      });
    } else {
      const content = this.schemaParserFabric
        .createSchemaParser({ schema: items, schemaPath: this.schemaPath })
        .getInlineParseContent();
      contentType = this.config.Ts.ArrayType({ readonly, content });
    }

    return {
      ...(typeof this.schema === "object" ? this.schema : {}),
      $schemaPath: this.schemaPath.slice(),
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
