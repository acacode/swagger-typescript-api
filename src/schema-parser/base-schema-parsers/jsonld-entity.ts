import { get } from "es-toolkit/compat";
import { SCHEMA_TYPES } from "../../constants.js";
import { MonoSchemaParser } from "../mono-schema-parser.js";
import {
  getEntityNameFromJsonLdType,
  JSONLD_UTILS_TYPES,
} from "./jsonld-utils.js";

export class JsonLdEntitySchemaParser extends MonoSchemaParser {
  override parse() {
    const entitySchema = this.schema;
    const entityProperties = this.getJsonLdEntityContent(entitySchema);

    let entityName = this.typeName;
    if (!entityName && entitySchema["x-jsonld-type"]) {
      const jsonldType = entitySchema["x-jsonld-type"];
      if (typeof jsonldType === "string") {
        entityName = getEntityNameFromJsonLdType(jsonldType);
      } else if (Array.isArray(jsonldType) && jsonldType.length > 0) {
        entityName = getEntityNameFromJsonLdType(jsonldType[0]);
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
    const properties: Record<string, unknown>[] = [];
    const { properties: schemaProperties = {} } = schema;

    if (schema["x-jsonld-context"] || schemaProperties["@context"]) {
      const context =
        schema["x-jsonld-context"] || schemaProperties["@context"];
      const contextValue = this.getContextFieldType(context);
      properties.push({
        $$raw: { "@context": context },
        description: "JSON-LD context defining the meaning of terms",
        isRequired: false,
        isNullable: false,
        name: '"@context"',
        value: contextValue,
        field: this.config.Ts.TypeField({
          readonly: false,
          optional: true,
          key: '"@context"',
          value: contextValue,
        }),
      });
    }

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

    if (schema["x-jsonld-id"] || schemaProperties["@id"]) {
      properties.push({
        $$raw: { "@id": schema["x-jsonld-id"] || schemaProperties["@id"] },
        description: "JSON-LD identifier (IRI)",
        isRequired: false,
        isNullable: false,
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

    Object.entries(schemaProperties).forEach(([name, property]) => {
      if (name.startsWith("@")) return;

      const required = this.schemaUtils.isPropertyRequired(
        name,
        property,
        schema,
      );
      const rawTypeData = get(
        this.schemaUtils.getSchemaRefType(property),
        "rawTypeData",
        {},
      );
      const propertyValue = property as Record<string, unknown>;
      const nullable = !!(rawTypeData.nullable || propertyValue.nullable);
      const fieldName = this.typeNameFormatter.isValidName(name)
        ? name
        : this.config.Ts.StringValue(name);

      const fieldValue = this.schemaParserFabric
        .createSchemaParser({
          schema: property,
          schemaPath: [...this.schemaPath, name],
        })
        .getInlineParseContent();
      const readOnly = propertyValue.readOnly;

      properties.push({
        ...propertyValue,
        $$raw: propertyValue,
        title: propertyValue.title,
        description: propertyValue.description,
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

  private getContextFieldType(context: unknown): string {
    if (typeof context === "string") {
      return this.config.Ts.StringValue(context);
    }

    // When the utils module is generated the entity extends `JsonLdEntity`,
    // whose `@context` is a `JsonLdContext`. Anything structural we could
    // derive here (`object`, `(string | object)[]`) is not assignable to it,
    // so widen to the alias instead and keep the output type-checking.
    if (this.config.jsonLdOptions.generateUtils) {
      return JSONLD_UTILS_TYPES.context;
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
}
