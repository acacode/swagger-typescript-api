import { ComponentsGroup, ComponentRawGroup } from "../../ComponentsGroup";
import { OpenAPIV3 } from "openapi-types";
import { SchemaContainer } from "../SchemaContainer";

export class SchemasGroup extends ComponentsGroup<OpenAPIV3.SchemaObject, SchemaContainer> {
  constructor(group: ComponentRawGroup<OpenAPIV3.SchemaObject>) {
    super(group, SchemaContainer);
  }

  get hasRequired() {
    return this.some((schema) => schema.required);
  }

  get hasNullable() {
    return this.some((schema) => schema.nullable);
  }
}
