import { OpenAPIV2, OpenAPIV3 } from "openapi-types";

export type AnySchema = OpenAPIV2.Document | OpenAPIV3.Document;
export type UsageSchema = OpenAPIV3.Document;

export const schemaIsOpenAPIV3 = (schema: AnySchema): schema is OpenAPIV3.Document =>
  "openapi" in schema;
export const schemaIsOpenAPIV2 = (schema: AnySchema): schema is OpenAPIV2.Document =>
  !schemaIsOpenAPIV3(schema);
