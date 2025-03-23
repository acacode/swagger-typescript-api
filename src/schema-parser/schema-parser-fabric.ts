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

  createSchemaParser = ({ schema, typeName, schemaPath }) => {
    return new SchemaParser(this, { schema, typeName, schemaPath });
  };

  createSchema = ({
    content,
    linkedSchema = {},
    linkedComponent,
    schemaPath,
    ...otherSchemaProps
  }) => {
    // @ts-expect-error TS(2345) FIXME: Argument of type '{ schema: any; schemaPath: any; ... Remove this comment to see the full error message
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
  }): SchemaComponent => {
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
    schema: string,
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
    schema: string,
    typeName: string | null,
    schemaPath: string[],
  ): Record<string, any> => {
    const parser = this.createSchemaParser({ schema, typeName, schemaPath });
    return parser.getInlineParseContent();
  };

  getParseContent = (
    schema: string,
    typeName: string | null,
    schemaPath: string[],
  ): Record<string, any> => {
    const parser = this.createSchemaParser({ schema, typeName, schemaPath });
    return parser.getParseContent();
  };
}
