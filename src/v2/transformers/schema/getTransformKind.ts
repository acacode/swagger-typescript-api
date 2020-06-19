import { SchemaContainer, SchemaKind } from "../../models/components/SchemaContainer";

export enum TransformKind {
  Enum = "Enum",
  Object = "Object",
  Array = "Array",
  Complex = "Complex",
  Primitive = "Primitive",
}

export const getTransformKind = (schema: SchemaContainer): TransformKind => {
  if (schema.value.enum) {
    return TransformKind.Enum;
  }
  if (schema.is(SchemaKind.Complex)) {
    return TransformKind.Complex;
  }
  if (schema.is(SchemaKind.Array)) {
    return TransformKind.Array;
  }
  if (schema.is(SchemaKind.Object)) {
    return TransformKind.Object;
  }
  if (schema.is(SchemaKind.Primitive)) {
    return TransformKind.Primitive;
  }
};
