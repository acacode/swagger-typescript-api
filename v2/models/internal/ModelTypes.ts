import { TemplateConfigPart, ModelType } from "../../interfaces/template";
import { SchemaKind, SchemaContainer } from "../components/SchemaContainer";
import { formatDescription } from "../../transformers/utils/formatDescription";
import { fixRefName } from "../../transformers/utils/fixRefName";

export class ModelTypes implements TemplateConfigPart<ModelType[]> {
  constructor(private schemas: Record<string, SchemaContainer>) {}

  toTemplatePart(): ModelType[] {
    return Object.entries(this.schemas).map(([name, schema]) => {
      return {
        // TODO: здесь будет проблема в том случае если схема будет преобразована в onion а на самом деле оборачивается в enum и это приведет к ошибке.
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
