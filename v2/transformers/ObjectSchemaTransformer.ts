import * as _ from "lodash";
import { SchemaTransformer, TransformOptions } from "./SchemaTransformer";
import { SchemaContainer } from "../models/components/SchemaContainer";
import { formatDescription } from "../utils/common";
import { checkAndAddNull } from "./schema/checkAndAddNull";
import { isValidName } from "./schema/fixRefName";
import { getPrimitiveType } from "./schema/getPrimitiveType";

export class ObjectSchemaTransformer extends SchemaTransformer {
  transform(options: TransformOptions) {
    if (options.inline && this.schema.$refName) {
      return checkAndAddNull(this.schema, this.schema.$refName);
    }

    if (this.schema.properties) {
      return this.transformObjectWithProperties(options);
    }
    return this.transformSimpleObject(options);
  }

  private transformSimpleObject(options: TransformOptions): string {
    const { additionalProperties, type, format } = this.schema;

    if (additionalProperties) {
      return `Record<string, ${getPrimitiveType(
        additionalProperties.type,
        additionalProperties.format,
      )}>`;
    }

    return getPrimitiveType(type, format);
  }

  private transformObjectWithProperties({ inline }: TransformOptions): string {
    const result: string[] = this.schema.properties.map((property, name) => {
      const propertyParts = _.compact([
        !inline &&
          property.value.description &&
          `  /** ${formatDescription(property.value.description, true)} */\r\n`,
        `${inline ? "" : "  "}${this.fixName(name)}${
          SchemaContainer.isRequiredProperty(name, property, this.schema) ? "" : "?"
        }: ${property.transform({ inline: true })};`,
      ]);

      return propertyParts.join("");
    });

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
