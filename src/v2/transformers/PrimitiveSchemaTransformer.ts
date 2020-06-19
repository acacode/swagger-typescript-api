import { SchemaContainer } from "../models/components/SchemaContainer";
import { SchemaTransformer } from "./SchemaTransformer";
import { OpenAPIV3 } from "openapi-types";

const typeAliases: Record<
  OpenAPIV3.NonArraySchemaObjectType | "file" | "$default",
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
  $default: {
    $default: "any",
  },
};

export class PrimitiveSchemaTransformer extends SchemaTransformer {
  transform() {
    const type = this.schema.type || "$default";
    const format = this.schema.format || "$default";
    return typeAliases[type][format];
  }
}
