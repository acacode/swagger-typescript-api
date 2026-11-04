import { isEqual } from "es-toolkit";
import { MonoSchemaParser } from "../mono-schema-parser.js";

export class NotSchemaParser extends MonoSchemaParser {
  override parse() {
    // `{}` and `true` accept every value, so negating them leaves no valid value.
    const allowsNothing =
      this.schema.not === true || isEqual(this.schema.not, {});

    return allowsNothing
      ? this.config.Ts.Keyword.Never
      : this.config.Ts.Keyword.Any;
  }
}
