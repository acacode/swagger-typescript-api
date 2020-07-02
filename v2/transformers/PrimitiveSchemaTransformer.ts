import { SchemaTransformer, TransformOptions } from "./SchemaTransformer";
import { checkAndAddNull } from "./utils/checkAndAddNull";
import { getPrimitiveType } from "./utils/getPrimitiveType";

export class PrimitiveSchemaTransformer extends SchemaTransformer {
  transform({ inline, excludeAny }: TransformOptions) {
    if (inline && this.schema.$refName) {
      return checkAndAddNull(this.schema, this.schema.$refName);
    }

    if (!this.schema.type && excludeAny) {
      return "";
    }

    return checkAndAddNull(this.schema, getPrimitiveType(this.schema.type, this.schema.format));
  }
}
