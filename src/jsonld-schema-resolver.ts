import lodash from "lodash";
import type { CodeGenConfig } from "./configuration.js";
import type { SchemaComponentsMap } from "./schema-components-map.js";
import type { SchemaWalker } from "./schema-walker.js";

export interface JsonLdSchema {
  "@context"?: any;
  "@type"?: string | string[];
  "@id"?: string;
  [key: string]: any;
}

export interface JsonLdContext {
  [key: string]:
    | string
    | { "@id": string; "@type"?: string; "@container"?: string };
}

export class JsonLdSchemaResolver {
  config: CodeGenConfig;
  schemaComponentsMap: SchemaComponentsMap;
  schemaWalker: SchemaWalker;

  constructor(
    config: CodeGenConfig,
    schemaComponentsMap: SchemaComponentsMap,
    schemaWalker: SchemaWalker,
  ) {
    this.config = config;
    this.schemaComponentsMap = schemaComponentsMap;
    this.schemaWalker = schemaWalker;
  }

  /**
   * Detects if a schema is a JSON-LD schema
   */
  isJsonLdSchema(schema: any): schema is JsonLdSchema {
    if (!schema || typeof schema !== "object") return false;

    return Boolean(
      schema["@context"] ||
        schema["@type"] ||
        schema["@id"] ||
        this.hasJsonLdProperties(schema),
    );
  }

  /**
   * Checks if an object has JSON-LD specific properties
   */
  private hasJsonLdProperties(obj: any): boolean {
    if (!obj || typeof obj !== "object") return false;

    const keys = Object.keys(obj);
    return (
      keys.some((key) => key.startsWith("@")) || this.hasSchemaOrgTypes(obj)
    );
  }

  /**
   * Checks if object contains Schema.org type references
   */
  private hasSchemaOrgTypes(obj: any): boolean {
    if (!obj || typeof obj !== "object") return false;

    const stringValues = Object.values(obj).filter(
      (v) => typeof v === "string",
    );
    return stringValues.some(
      (value) =>
        typeof value === "string" &&
        (value.startsWith("https://schema.org/") ||
          value.startsWith("http://schema.org/")),
    );
  }

  /**
   * Resolves a JSON-LD schema to internal schema format
   */
  resolveJsonLdSchema(schema: JsonLdSchema): any {
    const resolvedSchema = {
      type: "object",
      properties: {},
      required: [],
      "x-jsonld": true,
      "x-jsonld-context": schema["@context"],
      "x-jsonld-type": schema["@type"],
      "x-jsonld-id": schema["@id"],
    };

    // Process @context if present
    if (schema["@context"]) {
      resolvedSchema.properties["@context"] = this.resolveContext(
        schema["@context"],
      );
    }

    // Process @type if present
    if (schema["@type"]) {
      resolvedSchema.properties["@type"] = {
        type: "string",
        enum: Array.isArray(schema["@type"])
          ? schema["@type"]
          : [schema["@type"]],
      };
      resolvedSchema.required.push("@type");
    }

    // Process @id if present
    if (schema["@id"]) {
      resolvedSchema.properties["@id"] = {
        type: "string",
        format: "uri",
      };
    }

    // Process other properties
    Object.entries(schema).forEach(([key, value]) => {
      if (!key.startsWith("@")) {
        resolvedSchema.properties[key] = this.resolveProperty(
          key,
          value,
          schema["@context"],
        );
      }
    });

    return resolvedSchema;
  }

  /**
   * Resolves @context to schema format
   */
  private resolveContext(context: any): any {
    if (typeof context === "string") {
      return {
        type: "string",
        const: context,
        "x-jsonld-context-uri": context,
      };
    }

    if (Array.isArray(context)) {
      return {
        type: "array",
        items: {
          oneOf: context.map((ctx) => this.resolveContext(ctx)),
        },
      };
    }

    if (typeof context === "object") {
      const contextSchema = {
        type: "object",
        properties: {},
        "x-jsonld-context-mapping": true,
      };

      Object.entries(context).forEach(([term, definition]) => {
        contextSchema.properties[term] =
          this.resolveContextDefinition(definition);
      });

      return contextSchema;
    }

    return { type: "string" };
  }

  /**
   * Resolves individual context term definition
   */
  private resolveContextDefinition(definition: any): any {
    if (typeof definition === "string") {
      return {
        type: "string",
        const: definition,
        "x-jsonld-iri": definition,
      };
    }

    if (typeof definition === "object" && definition["@id"]) {
      return {
        type: "object",
        properties: {
          "@id": {
            type: "string",
            const: definition["@id"],
          },
          "@type": definition["@type"]
            ? {
                type: "string",
                const: definition["@type"],
              }
            : undefined,
          "@container": definition["@container"]
            ? {
                type: "string",
                const: definition["@container"],
              }
            : undefined,
        },
        required: ["@id"],
        "x-jsonld-term-definition": true,
      };
    }

    return { type: "string" };
  }

  /**
   * Resolves a property based on JSON-LD context
   */
  private resolveProperty(
    key: string,
    value: any,
    context?: JsonLdContext,
  ): any {
    // Basic type inference from value
    if (typeof value === "string") {
      return { type: "string" };
    }
    if (typeof value === "number") {
      return { type: "number" };
    }
    if (typeof value === "boolean") {
      return { type: "boolean" };
    }
    if (Array.isArray(value)) {
      return {
        type: "array",
        items:
          value.length > 0
            ? this.resolveProperty(`${key}_item`, value[0], context)
            : { type: "string" },
      };
    }
    if (typeof value === "object" && value !== null) {
      if (this.isJsonLdSchema(value)) {
        return this.resolveJsonLdSchema(value);
      }
      return {
        type: "object",
        additionalProperties: true,
      };
    }

    return { type: "string" };
  }

  /**
   * Extracts JSON-LD entities from a schema
   */
  extractJsonLdEntities(
    schema: JsonLdSchema,
  ): Array<{ name: string; schema: any }> {
    const entities: Array<{ name: string; schema: any }> = [];

    if (schema["@type"]) {
      const types = Array.isArray(schema["@type"])
        ? schema["@type"]
        : [schema["@type"]];

      types.forEach((type) => {
        const entityName = this.getEntityNameFromType(type);
        entities.push({
          name: entityName,
          schema: this.resolveJsonLdSchema(schema),
        });
      });
    } else {
      // Fallback: create generic JSON-LD entity
      entities.push({
        name: "JsonLdEntity",
        schema: this.resolveJsonLdSchema(schema),
      });
    }

    return entities;
  }

  /**
   * Generates entity name from JSON-LD type
   */
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

  /**
   * Normalizes JSON-LD schema for processing
   */
  normalizeJsonLdSchema(schema: JsonLdSchema): any {
    const normalized = lodash.cloneDeep(schema);

    // Expand compact IRIs if context is available
    if (normalized["@context"]) {
      this.expandCompactIris(normalized, normalized["@context"]);
    }

    return normalized;
  }

  /**
   * Expands compact IRIs based on context
   */
  private expandCompactIris(obj: any, context: JsonLdContext): void {
    if (!obj || typeof obj !== "object") return;

    Object.entries(obj).forEach(([key, value]) => {
      if (typeof value === "string" && context[key]) {
        const contextDef = context[key];
        if (typeof contextDef === "string") {
          // Simple IRI mapping
          obj[key] = contextDef;
        } else if (typeof contextDef === "object" && contextDef["@id"]) {
          // Complex term definition
          obj[key] = contextDef["@id"];
        }
      } else if (typeof value === "object") {
        this.expandCompactIris(value, context);
      }
    });
  }
}
