import { SCHEMA_TYPES } from "../../constants.js";
import { MonoSchemaParser } from "../mono-schema-parser.js";

export class PrimitiveSchemaParser extends MonoSchemaParser {
  override parse() {
    let contentType = null;
    const { additionalProperties, type, description, items } =
      this.schema || {};

    if (type === this.config.Ts.Keyword.Object && additionalProperties) {
      const propertyNamesSchema = this.schemaUtils.getSchemaPropertyNamesSchema(
        this.schema,
      );

      let recordKeysContent: any;
      let recordValuesContent: any;

      if (propertyNamesSchema) {
        recordKeysContent = this.schemaParserFabric
          .createSchemaParser({
            schema: propertyNamesSchema,
            schemaPath: this.schemaPath,
          })
          .getInlineParseContent();
      } else {
        recordKeysContent = this.config.Ts.Keyword.String;
      }

      if (typeof additionalProperties === "object") {
        recordValuesContent = this.schemaParserFabric
          .createSchemaParser({
            schema: additionalProperties,
            schemaPath: this.schemaPath,
          })
          .getInlineParseContent();
      } else {
        recordValuesContent = this.config.Ts.Keyword.Any;
      }

      contentType = this.config.Ts.RecordType(
        recordKeysContent,
        recordValuesContent,
      );
    }

    if (Array.isArray(type) && type.length) {
      contentType = this.schemaParser._complexSchemaParsers.oneOf({
        ...(typeof this.schema === "object" ? this.schema : {}),
        oneOf: type.map((type) => ({ type })),
      });
    }

    if (Array.isArray(items) && type === SCHEMA_TYPES.ARRAY) {
      contentType = this.config.Ts.Tuple(
        items.map((item) =>
          this.schemaParserFabric
            .createSchemaParser({ schema: item, schemaPath: this.schemaPath })
            .getInlineParseContent(),
        ),
      );
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
      // TODO: probably it should be refactored. `type === 'null'` is not flexible
      content:
        type === this.config.Ts.Keyword.Null
          ? type
          : contentType || this.schemaUtils.getSchemaType(this.schema),
    };
  }
}
