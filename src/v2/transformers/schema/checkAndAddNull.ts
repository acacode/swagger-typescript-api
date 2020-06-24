import { SchemaContainer } from "../../models/components/SchemaContainer";

export const checkAndAddNull = (schema: SchemaContainer, content: string) => {
  const { nullable, type } = schema;
  return nullable || type === "null" ? `${content} | null` : content;
};
