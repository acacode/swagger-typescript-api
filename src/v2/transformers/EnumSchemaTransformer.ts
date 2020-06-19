import { SchemaContainer } from "../models/components/SchemaContainer";
import { SchemaTransformer } from "./SchemaTransformer";

export class EnumSchemaTransformer extends SchemaTransformer {
  transform() {
    console.log(this.schema.value.enum);
    return this.schema.value.enum.toString();
  }
}
