import * as _ from "lodash";
import { SchemaContainer } from "../models/components/SchemaContainer";
import { SchemaTransformer } from "./SchemaTransformer";
import { createSchemaTransformer } from "./schema/createSchemaTransformer";
export class ArraySchemaTransformer extends SchemaTransformer {
  transform() {
    return `(${createSchemaTransformer(this.schema.items).transform()})[]`;
  }
}
