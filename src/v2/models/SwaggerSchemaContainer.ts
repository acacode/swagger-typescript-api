import { Schema } from "../services/SwaggerSchema";
import { AnySchema, UsageSchema } from "../interfaces/schema";
import { ComponentsContainer } from "./ComponentsContainer";

export class SchemaContainer {
  components: ComponentsContainer;

  constructor(public original: AnySchema, public usage: UsageSchema) {
    Schema.fixSchema(this.original, this.usage);

    this.components = new ComponentsContainer(this.usage.components);
  }

  static async create(pathToSwagger?: string, urlToSwagger?: string) {
    const schemaFile = await Schema.readSchemaFile(pathToSwagger, urlToSwagger);
    const parsedSchema = Schema.parseSchemaFile(schemaFile);
    const openAPIV3Schema = await Schema.convertSchemaToOpenAPIV3(parsedSchema);

    return new SchemaContainer(parsedSchema, openAPIV3Schema);
  }
}
