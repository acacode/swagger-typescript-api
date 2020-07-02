import * as _ from "lodash";
import { SchemaTransformer, TransformOptions } from "./SchemaTransformer";

export class EnumSchemaTransformer extends SchemaTransformer {
  transform({ inline }: TransformOptions) {
    const enumParts = _.map(this.schema.value.enum, (key) => this.createEnumField(key, inline));
    return enumParts.join(inline ? "|" : `,\r\n`);
  }

  private createEnumField(key: string, inline: boolean) {
    const enumValue = this.formatEnumValue(key);

    if (inline) {
      // TODO: add enumUnions configuration flag
      return enumValue;
    }

    return `${key} = ${this.formatEnumValue(key)}`;
  }

  private formatEnumValue(value: string) {
    switch (this.schema.type) {
      case "integer":
        return value;
      case "number":
        return value;
      case "string":
        return `"${value}"`;
      default:
        return value;
    }
  }
}
