import type { CodeGenConfig } from "../configuration.js";
import type { SchemaComponentsMap } from "../schema-components-map.js";
import type { TypeNameFormatter } from "../type-name-formatter.js";
import type { SchemaFormatters } from "./schema-formatters.js";
import type { SchemaParser } from "./schema-parser.js";
import type { SchemaParserFabric } from "./schema-parser-fabric.js";
import type { SchemaUtils } from "./schema-utils.js";

export class MonoSchemaParser {
  schema;
  typeName;
  schemaPath;

  schemaParser: SchemaParser;
  schemaParserFabric: SchemaParserFabric;
  typeNameFormatter: TypeNameFormatter;
  schemaComponentsMap: SchemaComponentsMap;
  schemaUtils: SchemaUtils;
  config: CodeGenConfig;
  schemaFormatters: SchemaFormatters;

  constructor(
    schemaParser: SchemaParser,
    schema,
    typeName = null,
    schemaPath = [],
  ) {
    this.schemaParser = schemaParser;
    this.schemaParserFabric = schemaParser.schemaParserFabric;
    this.schema = schema;
    this.typeName = typeName;
    this.typeNameFormatter = schemaParser.typeNameFormatter;
    this.schemaPath = schemaPath;
    this.schemaComponentsMap = this.schemaParser.schemaComponentsMap;
    this.schemaUtils = this.schemaParser.schemaUtils;
    this.config = this.schemaParser.config;
    this.schemaFormatters = this.schemaParser.schemaFormatters;
  }

  parse() {
    throw new Error("not implemented");
  }

  buildTypeNameFromPath = () => {
    return this.schemaUtils.buildTypeNameFromPath(this.schemaPath);
  };
}
