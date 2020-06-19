import * as _ from "lodash";
import { OpenAPIV3 } from "openapi-types";
import { Component, fromArray, fromRecord } from "../Component";

export enum SchemaKind {
  Object = "Object",
  Array = "Array",
  Complex = "Complex",
  Primitive = "Primitive",
}

const typeAliases: Record<
  OpenAPIV3.NonArraySchemaObjectType | "file",
  Record<string, string> & { $default: string }
> = {
  boolean: {
    $default: "boolean",
  },
  integer: {
    $default: "number",
  },
  file: {
    $default: "File",
  },
  null: {
    $default: "null",
  },
  number: {
    $default: "number",
  },
  string: {
    $default: "string",
    binary: "File",
  },
  object: {
    $default: "object",
  },
};

const getTypeAlias = (type: OpenAPIV3.NonArraySchemaObjectType, format?: string): string =>
  typeAliases[type][format] || typeAliases[type].$default;

const schemaSerializers: Record<SchemaKind, (instance: SchemaContainer) => string> = {
  [SchemaKind.Object]: (schema) => {
    const serializedProps = _.map(
      schema.properties,
      (property, name) => `${name}: ${property.serialize()}`,
    );
    return serializedProps.join(",");
  },
  [SchemaKind.Array]: () => "",
  [SchemaKind.Complex]: () => "",
  [SchemaKind.Primitive]: (schema) => {
    return getTypeAlias(schema.type as OpenAPIV3.NonArraySchemaObjectType, schema.format);
  },
};

export class SchemaContainer extends Component<OpenAPIV3.SchemaObject> {
  type: OpenAPIV3.SchemaObject["type"];
  format?: OpenAPIV3.SchemaObject["format"];

  items?: SchemaContainer;
  additionalProperties?: SchemaContainer;
  properties?: Record<string, SchemaContainer>;

  allOf?: SchemaContainer[];
  oneOf?: SchemaContainer[];
  anyOf?: SchemaContainer[];
  not?: SchemaContainer;

  kind: SchemaKind;

  initialize() {
    this.kind = SchemaContainer.getSchemaKind(this.value);
    this.type = this.value.type;
    this.format = this.value.format;

    if (this.value) {
      if (SchemaContainer.isArraySchema(this.value)) {
        this.items = new SchemaContainer(this.value.items);
      } else {
        if (
          this.value.additionalProperties &&
          typeof this.value.additionalProperties !== "boolean"
        ) {
          this.additionalProperties = new SchemaContainer(this.value.additionalProperties);
        }
        if (this.value.properties) {
          this.properties = fromRecord(SchemaContainer, this.value.properties);
        }
        if (this.value.allOf) {
          this.allOf = fromArray(SchemaContainer, this.value.allOf);
        }
        if (this.value.oneOf) {
          this.oneOf = fromArray(SchemaContainer, this.value.oneOf);
        }
        if (this.value.anyOf) {
          this.anyOf = fromArray(SchemaContainer, this.value.anyOf);
        }
        if (this.value.not) {
          this.not = new SchemaContainer(this.value.not);
        }
      }
    }
  }

  static getSchemaKind(schema?: OpenAPIV3.SchemaObject): SchemaKind {
    if (schema) {
      if (SchemaContainer.isArraySchema(schema)) {
        return SchemaKind.Array;
      }
      if (schema.properties && Object.keys(schema.properties).length) {
        return SchemaKind.Object;
      }
      if (schema.allOf || schema.oneOf || schema.anyOf || schema.not) {
        return SchemaKind.Complex;
      }
    }

    return SchemaKind.Primitive;
  }

  is(kind: SchemaKind) {
    return kind === this.kind;
  }

  static isArraySchema(schema: OpenAPIV3.SchemaObject): schema is OpenAPIV3.ArraySchemaObject {
    return schema && "items" in schema && schema.type === "array";
  }

  serialize() {
    return schemaSerializers[this.kind](this);
  }
}
