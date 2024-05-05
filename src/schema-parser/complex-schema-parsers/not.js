const { MonoSchemaParser } = require("../mono-schema-parser");

class NotSchemaParser extends MonoSchemaParser {
  parse() {
    return this.config.Ts.Keyword.Any;
  }
}

module.exports = { NotSchemaParser };
