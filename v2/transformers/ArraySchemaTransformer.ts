import * as _ from "lodash";
import { SchemaTransformer, TransformOptions } from "./SchemaTransformer";
import { checkAndAddNull } from "./schema/checkAndAddNull";

export class ArraySchemaTransformer extends SchemaTransformer {
  transform(options: TransformOptions) {
    return checkAndAddNull(this.schema, `(${this.schema.items.transform({ inline: true })})[]`);
  }
}
