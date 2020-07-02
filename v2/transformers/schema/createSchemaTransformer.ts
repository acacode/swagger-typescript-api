import { SchemaContainer, SchemaKind } from "../../models/components/SchemaContainer";
import { EnumSchemaTransformer } from "../EnumSchemaTransformer";
import { PrimitiveSchemaTransformer } from "../PrimitiveSchemaTransformer";
import { ObjectSchemaTransformer } from "../ObjectSchemaTransformer";
import { ComplexSchemaTransformer } from "../ComplexSchemaTransformer";
import { ArraySchemaTransformer } from "../ArraySchemaTransformer";
import { SchemaTransformer } from "../SchemaTransformer";
import { AbstractContructorParameters } from "../../interfaces/utility";

const getSchemaTransformerConstructor = (
  schemaKind: SchemaKind,
): new (...args: AbstractContructorParameters<typeof SchemaTransformer>) => SchemaTransformer => {
  switch (schemaKind) {
    case SchemaKind.Enum:
      return EnumSchemaTransformer;
    case SchemaKind.Array:
      return ArraySchemaTransformer;
    case SchemaKind.Complex:
      return ComplexSchemaTransformer;
    case SchemaKind.Object:
      return ObjectSchemaTransformer;
    case SchemaKind.Primitive:
      return PrimitiveSchemaTransformer;
    default:
      return PrimitiveSchemaTransformer;
  }
};

export const createSchemaTransformer = (schema: SchemaContainer | null) => {
  if (!schema || !schema.exist) {
    return new PrimitiveSchemaTransformer(new SchemaContainer({ type: "null" }));
  }

  const Constructor = getSchemaTransformerConstructor(schema.kind);
  const modelType = new Constructor(schema);

  return modelType;
};
