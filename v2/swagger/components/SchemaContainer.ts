import * as _ from "lodash";
import { OpenAPIV3 } from "openapi-types";
import { Component, fromArray, fromRecord } from "../Component";
import { Configuration } from "../../services/Configuration";
import { TransformOptions, SchemaTransformer } from "../../transformers/SchemaTransformer";
import { createSchemaTransformer } from "../../transformers/utils/createSchemaTransformer";
import { SchemasGroup } from "./groups/SchemasGroup";

// TODO: add "Combined" type for hybrid all schema kinds
export enum SchemaKind {
  Enum = "Enum",
  Object = "Object",
  Array = "Array",
  Complex = "Complex",
  Primitive = "Primitive",
}

export class SchemaContainer extends Component<OpenAPIV3.SchemaObject> {
  additionalProperties?: SchemaContainer;

  /** SchemaKind.Array */
  items?: SchemaContainer;
  /** SchemaKind.Object */
  properties?: SchemasGroup;
  /** SchemaKind.Complex */
  allOf?: SchemaContainer[];
  /** SchemaKind.Complex */
  oneOf?: SchemaContainer[];
  /** SchemaKind.Complex */
  anyOf?: SchemaContainer[];
  /** SchemaKind.Complex */
  not?: SchemaContainer;

  kind: SchemaKind;

  private transformer: SchemaTransformer;

  initialize() {
    this.fixSchema();
    this.kind = SchemaContainer.getSchemaKind(this.value);
    this.transformer = createSchemaTransformer(this);

    if (this.value) {
      if (SchemaContainer.isArraySchema(this.value)) {
        this.items = new SchemaContainer(this.value.items);
      } else {
        if (this.value.properties) {
          this.properties = new SchemasGroup(this.value.properties);
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

      if (this.value.additionalProperties && typeof this.value.additionalProperties !== "boolean") {
        this.additionalProperties = new SchemaContainer(this.value.additionalProperties);
      }
    }

    if (this.is(SchemaKind.Primitive)) {
      // TODO: not type declared case
      if (this.value && this.value.schema) {
        const instance = new SchemaContainer(this.value.schema as OpenAPIV3.SchemaObject);

        if (instance && instance.value) {
          this.value.type = this.value.type || instance.value.type;
          this.value.format = this.value.format || instance.value.format;
          this.kind = this.kind;
          this.value.enum = this.value.enum || instance.value.enum;
          this.value.properties =
            (this.value.properties || instance.value.properties) &&
            _.merge(this.value.properties, instance.value.properties);

          if (instance.value["items"] && this.value["items"]) {
            this.items = new SchemaContainer(_.merge(instance.value["items"], this.value["items"]));
          }
        }
      }
    }
  }

  get required() {
    if (Configuration.value.convertedFromSwagger2) {
      return typeof this.value.nullable === "undefined"
        ? !!this.value.required
        : !this.value.nullable;
    }

    return !!this.value.required;
  }

  get nullable() {
    return !!this.value.nullable;
  }

  get type() {
    return this.value.type;
  }

  get format() {
    return this.value.format;
  }

  get description() {
    return this.value.description || "";
  }

  /** transform schema to string presentation */
  transform(options?: TransformOptions) {
    return this.transformer.transform(options);
  }

  is(kind: SchemaKind) {
    return kind === this.kind;
  }

  private fixSchema() {
    if (!this.value) return;
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
    return schema && "items" in schema && schema.type === "array";
  }

  static isObjectSchema(schema?: OpenAPIV3.SchemaObject) {
    return schema && schema.type === "object";
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
