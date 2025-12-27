import lodash from "lodash";
import { SCHEMA_TYPES } from "../../constants.js";
import { MonoSchemaParser } from "../mono-schema-parser.js";

export class JsonLdEntitySchemaParser extends MonoSchemaParser {
  override parse() {
    const entitySchema = this.schema;
    const entityProperties = this.getJsonLdEntityContent(entitySchema);

    // Determine entity name from @type if available
    let entityName = this.typeName;
    if (!entityName && entitySchema["x-jsonld-type"]) {
      const jsonldType = entitySchema["x-jsonld-type"];
      if (typeof jsonldType === "string") {
        entityName = this.getEntityNameFromType(jsonldType);
      } else if (Array.isArray(jsonldType) && jsonldType.length > 0) {
        entityName = this.getEntityNameFromType(jsonldType[0]);
      }
    }
    entityName = entityName || "JsonLdEntity";

    return {
      ...(typeof this.schema === "object" && !Array.isArray(this.schema)
        ? this.schema
        : {}),
      $schemaPath: this.schemaPath.slice(),
      $parsedSchema: true,
      schemaType: SCHEMA_TYPES.JSONLD_ENTITY,
      type: SCHEMA_TYPES.OBJECT,
      typeIdentifier: this.config.Ts.Keyword.Interface,
      name: entityName,
      description: this.schemaFormatters.formatDescription(
        entitySchema.description || `JSON-LD Entity: ${entityName}`,
      ),
      allFieldsAreOptional: !entityProperties.some((prop) => prop.isRequired),
      content: entityProperties,
      isJsonLdEntity: true,
    };
  }

  getJsonLdEntityContent = (schema) => {
    const properties = [];
    const { properties: schemaProperties = {} } = schema;

    // Add JSON-LD specific properties first

    // @context property
    if (schema["x-jsonld-context"] || schemaProperties["@context"]) {
      properties.push({
        $$raw: {
          "@context":
            schema["x-jsonld-context"] || schemaProperties["@context"],
        },
        title: "@context",
        description: "JSON-LD context defining the meaning of terms",
        isRequired: false,
        isNullable: true,
        name: '"@context"',
        value: this.getContextFieldType(
          schema["x-jsonld-context"] || schemaProperties["@context"],
        ),
        field: this.config.Ts.TypeField({
          readonly: false,
          optional: true,
          key: '"@context"',
          value: this.getContextFieldType(
            schema["x-jsonld-context"] || schemaProperties["@context"],
          ),
        }),
      });
    }

    // @type property
    if (schema["x-jsonld-type"] || schemaProperties["@type"]) {
      const jsonldType = schema["x-jsonld-type"] || schemaProperties["@type"];
      let typeValue: string;

      if (typeof jsonldType === "string") {
        typeValue = this.config.Ts.StringValue(jsonldType);
      } else if (Array.isArray(jsonldType)) {
        typeValue = this.config.Ts.UnionType(
          jsonldType.map((type) => this.config.Ts.StringValue(type)),
        );
      } else {
        typeValue = this.config.Ts.Keyword.String;
      }

      properties.push({
        $$raw: { "@type": jsonldType },
        title: "@type",
        description: "JSON-LD type identifier",
        isRequired: true,
        isNullable: false,
        name: '"@type"',
        value: typeValue,
        field: this.config.Ts.TypeField({
          readonly: false,
          optional: false,
          key: '"@type"',
          value: typeValue,
        }),
      });
    }

    // @id property
    if (schema["x-jsonld-id"] || schemaProperties["@id"]) {
      properties.push({
        $$raw: { "@id": schema["x-jsonld-id"] || schemaProperties["@id"] },
        title: "@id",
        description: "JSON-LD identifier (IRI)",
        isRequired: false,
        isNullable: true,
        name: '"@id"',
        value: this.config.Ts.Keyword.String,
        field: this.config.Ts.TypeField({
          readonly: false,
          optional: true,
          key: '"@id"',
          value: this.config.Ts.Keyword.String,
        }),
      });
    }

    // Add regular properties
    Object.entries(schemaProperties).forEach(([name, property]) => {
      // Skip JSON-LD keywords as they're handled above
      if (name.startsWith("@")) {
        return;
      }

      const required = this.schemaUtils.isPropertyRequired(
        name,
        property,
        schema,
      );
      const rawTypeData = lodash.get(
        this.schemaUtils.getSchemaRefType(property),
        "rawTypeData",
        {},
      );
      const nullable = !!(rawTypeData.nullable || property.nullable);
      const fieldName = this.typeNameFormatter.isValidName(name)
        ? name
        : this.config.Ts.StringValue(name);

      // Check if property has JSON-LD semantics
      const fieldValue = this.getPropertyFieldType(property, [
        ...this.schemaPath,
        name,
      ]);
      const readOnly = property.readOnly;

      properties.push({
        ...property,
        $$raw: property,
        title: property.title || name,
        description: property.description || `Property: ${name}`,
        isRequired: required,
        isNullable: nullable,
        name: fieldName,
        value: fieldValue,
        field: this.config.Ts.TypeField({
          readonly: readOnly && this.config.addReadonly,
          optional: !required,
          key: fieldName,
          value: fieldValue,
        }),
      });
    });

    return properties;
  };

  private getContextFieldType(context: any): string {
    if (typeof context === "string") {
      return this.config.Ts.StringValue(context);
    }

    if (Array.isArray(context)) {
      return this.config.Ts.ArrayType(
        this.config.Ts.UnionType([
          this.config.Ts.Keyword.String,
          this.config.Ts.Keyword.Object,
        ]),
      );
    }

    if (typeof context === "object" && context !== null) {
      // Could generate specific context interface here
      return this.config.Ts.Keyword.Object;
    }

    return this.config.Ts.UnionType([
      this.config.Ts.Keyword.String,
      this.config.Ts.Keyword.Object,
      this.config.Ts.ArrayType(
        this.config.Ts.UnionType([
          this.config.Ts.Keyword.String,
          this.config.Ts.Keyword.Object,
        ]),
      ),
    ]);
  }

  private getPropertyFieldType(property: any, schemaPath: string[]): string {
    // Check if property is itself a JSON-LD entity
    if (property && typeof property === "object" && property["x-jsonld"]) {
      return this.schemaParserFabric
        .createSchemaParser({
          schema: property,
          schemaPath,
        })
        .getInlineParseContent();
    }

    // Regular property handling
    return this.schemaParserFabric
      .createSchemaParser({
        schema: property,
        schemaPath,
      })
      .getInlineParseContent();
  }

  private getEntityNameFromType(type: string): string {
    // Handle Schema.org types
    if (
      type.startsWith("https://schema.org/") ||
      type.startsWith("http://schema.org/")
    ) {
      return type.split("/").pop() || "Entity";
    }

    // Handle other URI types
    if (type.includes("/")) {
      return type.split("/").pop() || "Entity";
    }

    // Handle simple type names
    return type.charAt(0).toUpperCase() + type.slice(1);
  }
}
