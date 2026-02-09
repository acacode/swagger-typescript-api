import type {
  ParsedSchema,
  SchemaComponent,
  SchemaTypeEnumContent,
  SchemaTypeObjectContent,
  SchemaTypePrimitiveContent,
} from "../../types/index.js";
import type { CodeGenConfig } from "../configuration.js";
import type { SchemaComponentsMap } from "../schema-components-map.js";
import type { SchemaWalker } from "../schema-walker.js";
import type { TemplatesWorker } from "../templates-worker.js";
import type { TypeNameFormatter } from "../type-name-formatter.js";
import type { SchemaParserConfig } from "./mono-schema-parser.js";
import { SchemaFormatters } from "./schema-formatters.js";
import { SchemaParser } from "./schema-parser.js";
import { SchemaUtils } from "./schema-utils.js";

export class SchemaParserFabric {
  config: CodeGenConfig;
  schemaComponentsMap: SchemaComponentsMap;
  typeNameFormatter: TypeNameFormatter;
  schemaFormatters: SchemaFormatters;
  templatesWorker: TemplatesWorker;
  schemaUtils: SchemaUtils;
  schemaWalker: SchemaWalker;

  constructor(
    config: CodeGenConfig,
    templatesWorker: TemplatesWorker,
    schemaComponentsMap: SchemaComponentsMap,
    typeNameFormatter: TypeNameFormatter,
    schemaWalker: SchemaWalker,
  ) {
    this.config = config;
    this.schemaComponentsMap = schemaComponentsMap;
    this.typeNameFormatter = typeNameFormatter;
    this.templatesWorker = templatesWorker;
    this.schemaWalker = schemaWalker;
    this.schemaUtils = new SchemaUtils(this);
    this.schemaFormatters = new SchemaFormatters(this);
  }

  createSchemaParser = ({
    schema,
    typeName,
    schemaPath,
  }: SchemaParserConfig) => {
    return new SchemaParser(this, { schema, typeName, schemaPath });
  };

  createSchema = ({
    content,
    linkedSchema = {},
    linkedComponent,
    schemaPath,
    ...otherSchemaProps
  }: {
    content: unknown;
    linkedSchema?: Record<string, unknown>;
    linkedComponent?: SchemaComponent;
    schemaPath?: string[];
    [key: string]: unknown;
  }) => {
    const parser = this.createSchemaParser({
      schema: linkedComponent || linkedSchema,
      schemaPath,
    });
    const parsed = parser.parseSchema();
    parsed.content = content;
    Object.assign(parsed, otherSchemaProps);
    if (linkedComponent) {
      linkedComponent.typeData = parsed;
    }
    return parser.schema;
  };

  createParsedComponent = ({
    typeName,
    schema,
    schemaPath,
  }: Required<SchemaParserConfig> & { typeName: string }): SchemaComponent => {
    const schemaCopy = structuredClone(schema);
    const customComponent = this.schemaComponentsMap.createComponent(
      this.schemaComponentsMap.createRef(["components", "schemas", typeName]),
      schemaCopy,
    );
    const parsed = this.parseSchema(schemaCopy, null, schemaPath);

    parsed.name = typeName;
    customComponent.typeData = parsed;

    return customComponent;
  };

  parseSchema = (
    schema: SchemaParserConfig["schema"],
    typeName: string | null = null,
    schemaPath: string[] = [],
  ): ParsedSchema<
    SchemaTypeObjectContent | SchemaTypeEnumContent | SchemaTypePrimitiveContent
  > => {
    const schemaParser = this.createSchemaParser({
      schema,
      typeName,
      schemaPath,
    });
    return schemaParser.parseSchema();
  };

  getInlineParseContent = (
    schema: SchemaParserConfig["schema"],
    typeName: string | null,
    schemaPath: string[],
  ): // biome-ignore lint/suspicious/noExplicitAny: TODO: narrow return type
  Record<string, any> => {
    const parser = this.createSchemaParser({ schema, typeName, schemaPath });
    return parser.getInlineParseContent();
  };

  getParseContent = (
    schema: SchemaParserConfig["schema"],
    typeName: string | null,
    schemaPath: string[],
  ): // biome-ignore lint/suspicious/noExplicitAny: TODO: narrow return type
  Record<string, any> => {
    const parser = this.createSchemaParser({ schema, typeName, schemaPath });
    return parser.getParseContent();
  };
}
