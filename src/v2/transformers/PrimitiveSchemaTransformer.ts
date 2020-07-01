import { SchemaTransformer, TransformOptions } from "./SchemaTransformer";
import { OpenAPIV3 } from "openapi-types";
import { checkAndAddNull } from "./schema/checkAndAddNull";

type ExtraTypeAliases = "never" | "unknown" | "void";

const typeAliases: Record<
  OpenAPIV3.NonArraySchemaObjectType | ExtraTypeAliases | "file" | "$default",
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
  never: {
    $default: "never",
  },
  unknown: {
    $default: "unknown",
  },
  void: {
    $default: "void",
  },
  $default: {
    $default: "any",
  },
};

export const EXTRA_TYPES = {
  ANY: typeAliases.$default.$default,
  NULL: typeAliases.null.$default,
  NEVER: typeAliases.never.$default,
  UNKNOWN: typeAliases.unknown.$default,
  VOID: typeAliases.void.$default,
  EMPTY_OBJECT: "{}",
};

export class PrimitiveSchemaTransformer extends SchemaTransformer {
  transform({ inline, excludeAny }: TransformOptions) {
    if (inline && this.schema.$refName) {
      return checkAndAddNull(this.schema, this.schema.$refName);
    }

    if (!this.schema.type && excludeAny) {
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
