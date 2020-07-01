import "openapi-types";

declare module "openapi-types" {
  namespace OpenAPIV3 {
    interface BaseSchemaObject {
      /** NOTE: non declared propertiy in "openapi-types" */
      schema?: SchemaObject | ReferenceObject;
    }
  }
}
