import { OpenAPIV3 } from "openapi-types";

export class SchemaContainer {
  constructor(private $schema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject) {
    if ("$ref" in this.$schema) {
    }
  }
}
