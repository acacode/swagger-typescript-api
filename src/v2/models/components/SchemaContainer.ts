import * as _ from "lodash";
import { OpenAPIV3 } from "openapi-types";
import { Component, fromArray, fromRecord } from "../Component";
import { Configuration } from "../../services/Configuration";
import { TransformOptions, SchemaTransformer } from "../../transformers/SchemaTransformer";
import { createSchemaTransformer } from "../../transformers/schema/createSchemaTransformer";

export enum SchemaKind {
  Enum = "Enum",
  Object = "Object",
  Array = "Array",
  Complex = "Complex",
  Primitive = "Primitive",
}

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
  nullable: boolean;

  private transformer: SchemaTransformer;

  initialize() {
    this.fixSchema();
    this.kind = SchemaContainer.getSchemaKind(this.value);
    this.transformer = createSchemaTransformer(this);
    this.type = this.value.type;
    this.format = this.value.format;
    this.nullable = !!this.value.nullable;

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

  transform(options?: TransformOptions) {
    return this.transformer.transform(options);
  }

  is(kind: SchemaKind) {
    return kind === this.kind;
  }

  private fixSchema() {
    // for cases when schema is array but haven't the "type" property
    if ("items" in this.value && !this.value.type) {
      this.value.type = "array";
    }
    // for cases when schema is enum but haven't the "type" property
    if ("enum" in this.value && !this.value.type) {
      this.value.type = "string";
    }
  }

  static getSchemaKind(schema?: OpenAPIV3.SchemaObject): SchemaKind {
    if (SchemaContainer.isEnumSchema(schema)) {
      return SchemaKind.Enum;
    }
    if (SchemaContainer.isArraySchema(schema)) {
      return SchemaKind.Array;
    }
    if (SchemaContainer.isObjectSchema(schema)) {
      return SchemaKind.Object;
    }
    if (SchemaContainer.isComplexSchema(schema)) {
      return SchemaKind.Complex;
    }

    return SchemaKind.Primitive;
  }

  static isEnumSchema(schema?: OpenAPIV3.SchemaObject) {
    return schema && !!schema.enum;
  }

  static isArraySchema(schema?: OpenAPIV3.SchemaObject): schema is OpenAPIV3.ArraySchemaObject {
    return schema && schema && "items" in schema && schema.type === "array";
  }

  static isObjectSchema(schema?: OpenAPIV3.SchemaObject) {
    return schema && !!(schema.properties && _.keys(schema.properties).length);
  }

  static isComplexSchema(schema?: OpenAPIV3.SchemaObject) {
    return schema && !!(schema.allOf || schema.oneOf || schema.anyOf || schema.not);
  }

  static isRequiredProperty(
    property: string,
    schema: SchemaContainer,
    parentSchema: SchemaContainer,
  ) {
    return (
      _.includes(parentSchema.value.required, property) ||
      (Configuration.value.convertedFromSwagger2 && schema.nullable)
    );
  }
}
