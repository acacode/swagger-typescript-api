import { MonoSchemaParser } from "../mono-schema-parser.js";

class NotSchemaParser extends MonoSchemaParser {
  parse() {
    return this.config.Ts.Keyword.Any;
  }
}

export { NotSchemaParser };
