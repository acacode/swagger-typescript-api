import { TemplateConfigPart, ModelType } from "../interfaces/template";
import { SwaggerSchemaContainer } from "./SwaggerSchemaContainer";
import { SchemaKind } from "./components/SchemaContainer";
import { formatDescription } from "../utils/common";
import { fixRefName } from "../transformers/schema/fixRefName";

export class ModelTypes implements TemplateConfigPart<ModelType[]> {
  value: any[] = [];

  constructor(private schema: SwaggerSchemaContainer) {}

  toTemplatePart(): ModelType[] {
    return Object.entries(this.schema.components.schemas).map(([name, schema]) => {
      return {
        content: ModelTypes.wrapContent(schema.kind, schema.transform({ inline: false })),
        description: formatDescription(schema.value.description),
        name: schema.$refName || fixRefName(name),
        typeIdentifier: ModelTypes.getTypeIdentifier(schema.kind),
      };
    });
  }

  static getTypeIdentifier(kind: SchemaKind) {
    switch (kind) {
      case SchemaKind.Enum:
        return "enum";
      case SchemaKind.Primitive:
        return "type";
      case SchemaKind.Object:
        return "interface";
      case SchemaKind.Complex:
        return "type";
      case SchemaKind.Array:
        return "type";
    }
  }

  static wrapContent(kind: SchemaKind, content: string) {
    switch (kind) {
      case SchemaKind.Enum:
        return `{\r\n${content}\r\n}`;
      case SchemaKind.Primitive:
        return `= ${content}`;
      case SchemaKind.Object:
        return `{\r\n${content}\r\n}`;
      case SchemaKind.Complex:
        return `= ${content}`;
      case SchemaKind.Array:
        return `= ${content}`;
    }
  }
}
