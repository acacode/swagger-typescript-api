import { OpenAPIV3 } from "openapi-types";
import { SchemaContainer } from "../../models/components/SchemaContainer";
import { getTransformKind, TransformKind } from "./getTransformKind";
import { EnumSchemaTransformer } from "../EnumSchemaTransformer";
import { PrimitiveSchemaTransformer } from "../PrimitiveSchemaTransformer";
import { ObjectSchemaTransformer } from "../ObjectSchemaTransformer";
import { ComplexSchemaTransformer } from "../ComplexSchemaTransformer";
import { ArraySchemaTransformer } from "../ArraySchemaTransformer";
import { SchemaTransformer } from "../SchemaTransformer";

const RefsMap = new Map<OpenAPIV3.SchemaObject, SchemaTransformer>();

const getSchemaTransformerConstructor = (
  transformKind: TransformKind,
): new (...args) => SchemaTransformer => {
  switch (transformKind) {
    case TransformKind.Enum:
      return EnumSchemaTransformer;
    case TransformKind.Array:
      return ArraySchemaTransformer;
    case TransformKind.Complex:
      return ComplexSchemaTransformer;
    case TransformKind.Object:
      return ObjectSchemaTransformer;
    case TransformKind.Primitive:
      return PrimitiveSchemaTransformer;
    default:
      return PrimitiveSchemaTransformer;
  }
};

export const createSchemaTransformer = (schema: SchemaContainer) => {
  if (RefsMap.has(schema.value)) {
    return RefsMap.get(schema.value);
  }

  const transformKind = getTransformKind(schema);
  const Constructor = getSchemaTransformerConstructor(transformKind);
  const modelType = new Constructor(schema, transformKind);
  RefsMap.set(schema.value, modelType);

  return modelType;
};
