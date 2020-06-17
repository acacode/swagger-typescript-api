import { Schema } from "../services/SwaggerSchema";
import { AnySchema, UsageSchema } from "../interfaces/schema";
import { Components } from "./Components";
import { Paths } from "./Paths";
import { Configuration } from "../services/Configuration";
import { OpenAPIV3 } from "openapi-types";

export class SwaggerSchemaContainer
  implements Omit<OpenAPIV3.Document, "paths" | "components" | ""> {
  openapi: string;
  info: OpenAPIV3.InfoObject;
  servers: OpenAPIV3.ServerObject[];
  paths: Paths;
  components: Components;
  security: OpenAPIV3.SecurityRequirementObject[];
  tags?: OpenAPIV3.TagObject[];
  externalDocs?: OpenAPIV3.ExternalDocumentationObject;

  constructor(original: AnySchema, usage: UsageSchema) {
    Schema.fixSchema(original, usage);

    Configuration.update({
      usageSchema: usage,
      originalSchema: original,
    });

    this.openapi = usage.openapi;
    this.info = usage.info;
    this.servers = usage.servers || [];
    this.paths = new Paths(usage.paths);
    this.components = new Components(usage.components);
    this.security = usage.security || [];
    this.tags = usage.tags || [];
    this.externalDocs = usage.externalDocs || { url: "" };
  }

  static async create(pathToSwagger?: string, urlToSwagger?: string) {
    const schemaFile = await Schema.readSchemaFile(pathToSwagger, urlToSwagger);
    const parsedSchema = Schema.parseSchemaFile(schemaFile);
    const openAPIV3Schema = await Schema.convertSchemaToOpenAPIV3(parsedSchema);

    return new SwaggerSchemaContainer(parsedSchema, openAPIV3Schema);
  }
}
