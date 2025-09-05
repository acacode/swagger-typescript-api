import { SCHEMA_TYPES } from "../../constants.js";
import { MonoSchemaParser } from "../mono-schema-parser.js";

export class JsonLdTypeSchemaParser extends MonoSchemaParser {
  override parse() {
    const typeSchema = this.schema;

    // Handle single type
    if (typeof typeSchema === "string") {
      return {
        ...(typeof this.schema === "object" && !Array.isArray(this.schema)
          ? this.schema
          : {}),
        $schemaPath: this.schemaPath.slice(),
        $parsedSchema: true,
        schemaType: SCHEMA_TYPES.JSONLD_TYPE,
        type: SCHEMA_TYPES.PRIMITIVE,
        typeIdentifier: this.config.Ts.Keyword.String,
        name: this.typeName || "JsonLdType",
        description: `JSON-LD Type: ${typeSchema}`,
        content: this.config.Ts.StringValue(typeSchema),
      };
    }

    // Handle array of types
    if (Array.isArray(typeSchema)) {
      const typeUnion = this.config.Ts.UnionType(
        typeSchema.map((type) => this.config.Ts.StringValue(type)),
      );

      return {
        ...(typeof this.schema === "object" && !Array.isArray(this.schema)
          ? this.schema
          : {}),
        $schemaPath: this.schemaPath.slice(),
        $parsedSchema: true,
        schemaType: SCHEMA_TYPES.JSONLD_TYPE,
        type: SCHEMA_TYPES.PRIMITIVE,
        typeIdentifier: this.config.Ts.Keyword.String,
        name: this.typeName || "JsonLdType",
        description: `JSON-LD Types: ${typeSchema.join(", ")}`,
        content: typeUnion,
      };
    }

    // Handle object with enum-like structure
    if (
      typeof typeSchema === "object" &&
      typeSchema !== null &&
      typeSchema.enum
    ) {
      const enumValues = typeSchema.enum.map((value) =>
        this.config.Ts.StringValue(value),
      );

      return {
        ...(typeof this.schema === "object" && !Array.isArray(this.schema)
          ? this.schema
          : {}),
        $schemaPath: this.schemaPath.slice(),
        $parsedSchema: true,
        schemaType: SCHEMA_TYPES.JSONLD_TYPE,
        type: SCHEMA_TYPES.ENUM,
        typeIdentifier: this.config.Ts.Keyword.Type,
        name: this.typeName || "JsonLdType",
        description: this.schemaFormatters.formatDescription(
          typeSchema.description || `JSON-LD Type enumeration`,
        ),
        content: this.config.Ts.UnionType(enumValues),
        enum: typeSchema.enum,
      };
    }

    // Fallback for complex type definitions
    return {
      $schemaPath: this.schemaPath.slice(),
      $parsedSchema: true,
      schemaType: SCHEMA_TYPES.JSONLD_TYPE,
      type: SCHEMA_TYPES.PRIMITIVE,
      typeIdentifier: this.config.Ts.Keyword.String,
      name: this.typeName || "JsonLdType",
      description: "JSON-LD Type",
      content: this.config.Ts.Keyword.String,
    };
  }
}
