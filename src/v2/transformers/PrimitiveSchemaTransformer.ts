import { SchemaContainer } from "../models/components/SchemaContainer";
import { SchemaTransformer, TransformOptions } from "./SchemaTransformer";
import { OpenAPIV3 } from "openapi-types";
import { checkAndAddNull } from "./schema/checkAndAddNull";

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
  transform({ inline, excludeAny }: TransformOptions) {
    if (inline && this.schema.$refName) {
      return checkAndAddNull(this.schema, this.schema.$refName);
    }

    if (!this.schema.type && excludeAny) {
      console.log("this.schema", this.schema);
      return "";
    }

    return checkAndAddNull(
      this.schema,
      PrimitiveSchemaTransformer.getPrimitiveType(this.schema.type, this.schema.format),
    );
  }

  static getPrimitiveType(rawType?: string, format?: string) {
    const type = rawType || "$default";
    return typeAliases[type][format] || typeAliases[type].$default;
  }
}
