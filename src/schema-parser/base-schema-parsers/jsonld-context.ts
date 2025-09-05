import lodash from "lodash";
import { SCHEMA_TYPES } from "../../constants.js";
import { MonoSchemaParser } from "../mono-schema-parser.js";

export class JsonLdContextSchemaParser extends MonoSchemaParser {
  override parse() {
    const contextSchema = this.schema;

    // Handle string context (URI reference)
    if (typeof contextSchema === "string") {
      return {
        ...(typeof this.schema === "object" && !Array.isArray(this.schema)
          ? this.schema
          : {}),
        $schemaPath: this.schemaPath.slice(),
        $parsedSchema: true,
        schemaType: SCHEMA_TYPES.JSONLD_CONTEXT,
        type: SCHEMA_TYPES.PRIMITIVE,
        typeIdentifier: this.config.Ts.Keyword.String,
        name: this.typeName || "JsonLdContext",
        description: "JSON-LD Context URI",
        content: this.config.Ts.StringValue(contextSchema),
      };
    }

    // Handle array context
    if (Array.isArray(contextSchema)) {
      return {
        ...(typeof this.schema === "object" && !Array.isArray(this.schema)
          ? this.schema
          : {}),
        $schemaPath: this.schemaPath.slice(),
        $parsedSchema: true,
        schemaType: SCHEMA_TYPES.JSONLD_CONTEXT,
        type: SCHEMA_TYPES.ARRAY,
        typeIdentifier: this.config.Ts.Keyword.Array,
        name: this.typeName || "JsonLdContext",
        description: "JSON-LD Context Array",
        content: this.config.Ts.ArrayType(
          this.config.Ts.UnionType(
            contextSchema.map((ctx) =>
              typeof ctx === "string"
                ? this.config.Ts.StringValue(ctx)
                : this.config.Ts.Keyword.Object,
            ),
          ),
        ),
      };
    }

    // Handle object context (term mappings)
    if (typeof contextSchema === "object" && contextSchema !== null) {
      const contextProperties = this.getContextSchemaContent(contextSchema);

      return {
        ...(typeof this.schema === "object" && !Array.isArray(this.schema)
          ? this.schema
          : {}),
        $schemaPath: this.schemaPath.slice(),
        $parsedSchema: true,
        schemaType: SCHEMA_TYPES.JSONLD_CONTEXT,
        type: SCHEMA_TYPES.OBJECT,
        typeIdentifier: this.config.Ts.Keyword.Interface,
        name: this.typeName || "JsonLdContext",
        description: this.schemaFormatters.formatDescription(
          "JSON-LD Context with term mappings",
        ),
        allFieldsAreOptional: true,
        content: contextProperties,
      };
    }

    // Fallback
    return {
      $schemaPath: this.schemaPath.slice(),
      $parsedSchema: true,
      schemaType: SCHEMA_TYPES.JSONLD_CONTEXT,
      type: SCHEMA_TYPES.PRIMITIVE,
      typeIdentifier: this.config.Ts.Keyword.Any,
      name: this.typeName || "JsonLdContext",
      description: "JSON-LD Context",
      content: this.config.Ts.Keyword.Any,
    };
  }

  getContextSchemaContent = (contextSchema) => {
    const properties = [];

    Object.entries(contextSchema).forEach(([term, definition]) => {
      const fieldName = this.typeNameFormatter.isValidName(term)
        ? term
        : this.config.Ts.StringValue(term);

      let fieldValue: string;
      let description = `JSON-LD term mapping for '${term}'`;

      if (typeof definition === "string") {
        // Simple IRI mapping
        fieldValue = this.config.Ts.StringValue(definition);
        description += ` -> ${definition}`;
      } else if (typeof definition === "object" && definition !== null) {
        // Complex term definition
        const termDefProperties = [];

        if (definition["@id"]) {
          termDefProperties.push(
            this.config.Ts.TypeField({
              key: '"@id"',
              value: this.config.Ts.StringValue(definition["@id"]),
              optional: false,
              readonly: false,
            }),
          );
        }

        if (definition["@type"]) {
          termDefProperties.push(
            this.config.Ts.TypeField({
              key: '"@type"',
              value: this.config.Ts.StringValue(definition["@type"]),
              optional: true,
              readonly: false,
            }),
          );
        }

        if (definition["@container"]) {
          termDefProperties.push(
            this.config.Ts.TypeField({
              key: '"@container"',
              value: this.config.Ts.StringValue(definition["@container"]),
              optional: true,
              readonly: false,
            }),
          );
        }

        fieldValue = this.config.Ts.ObjectWrapper(
          termDefProperties.join(";\n  "),
        );
      } else {
        fieldValue = this.config.Ts.Keyword.String;
      }

      properties.push({
        $$raw: { [term]: definition },
        title: term,
        description,
        isRequired: false,
        isNullable: false,
        name: fieldName,
        value: fieldValue,
        field: this.config.Ts.TypeField({
          readonly: false,
          optional: true,
          key: fieldName,
          value: fieldValue,
        }),
      });
    });

    return properties;
  };
}
