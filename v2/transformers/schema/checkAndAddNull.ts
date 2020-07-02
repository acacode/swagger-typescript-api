import { SchemaContainer } from "../../models/components/SchemaContainer";
import { EXTRA_TYPES } from "./getPrimitiveType";

export const checkAndAddNull = (schema: SchemaContainer, content: string) => {
  const { nullable, type } = schema;
  return nullable || type === EXTRA_TYPES.NULL ? `${content} | ${EXTRA_TYPES.NULL}` : content;
};
