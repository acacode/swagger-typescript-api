import { TemplateConfigPart, ModelType } from "../interfaces/template";
import { SwaggerSchemaContainer } from "./SwaggerSchemaContainer";

export class ModelTypes implements TemplateConfigPart<ModelType[]> {
  value: any[] = [];

  constructor(private schema: SwaggerSchemaContainer) {
    const asd = Object.entries(this.schema.components.schemas);
    console.log("sss", asd);
  }

  toTemplatePart() {
    return [];
  }
}
