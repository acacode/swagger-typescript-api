import { SchemaContainer } from "../../models/components/SchemaContainer";
import { EXTRA_TYPES } from "../PrimitiveSchemaTransformer";

export const checkAndAddNull = (schema: SchemaContainer, content: string) => {
  const { nullable, type } = schema;
  return nullable || type === EXTRA_TYPES.NULL ? `${content} | ${EXTRA_TYPES.NULL}` : content;
};
