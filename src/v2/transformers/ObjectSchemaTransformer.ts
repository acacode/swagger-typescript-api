import * as _ from "lodash";
import { SchemaTransformer, TransformOptions } from "./SchemaTransformer";
import { SchemaContainer } from "../models/components/SchemaContainer";
import { formatDescription } from "../utils/common";
import { checkAndAddNull } from "./schema/checkAndAddNull";
import { isValidName } from "./schema/fixRefName";

export class ObjectSchemaTransformer extends SchemaTransformer {
  transform({ inline }: TransformOptions) {
    if (inline && this.schema.$refName) {
      return checkAndAddNull(this.schema, this.schema.$refName);
    }

    let result: string[] = [];
    const propertyEntries = _.entries(this.schema.properties);

    for (const [name, property] of propertyEntries) {
      const propertyParts = _.compact([
        !inline &&
          property.value.description &&
          `  /** ${formatDescription(property.value.description, true)} */\r\n`,
        `${inline ? "" : "  "}${this.fixName(name)}${
          SchemaContainer.isRequiredProperty(name, property, this.schema) ? "" : "?"
        }: ${property.transform({ inline: true })};`,
      ]);
      result.push(propertyParts.join(""));
    }

    const content = result.join(`${inline ? "" : "\r\n"}`);
    return inline ? `{${content}}` : content;
  }

  private fixName(name) {
    if (isValidName(name)) {
      return name;
    }
    return `"${name}"`;
  }
}
