import { MonoSchemaParser } from "../mono-schema-parser.js";

export class NotSchemaParser extends MonoSchemaParser {
  override parse() {
    return this.config.Ts.Keyword.Any;
  }
}
