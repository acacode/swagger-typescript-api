import * as _ from "lodash";
import { SchemaContainer } from "../models/components/SchemaContainer";
import { SchemaTransformer } from "./SchemaTransformer";
import { createSchemaTransformer } from "./schema/createSchemaTransformer";

export class ObjectSchemaTransformer extends SchemaTransformer {
  transform() {
    let result: string[] = [];
    const propertyEntries = Object.entries(this.schema.properties);

    for (const [key, property] of propertyEntries) {
      result.push(`${key}: ${createSchemaTransformer(property).transform()}`);
    }

    return result.join(",");
  }
}
