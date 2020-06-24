import { OpenAPIV3 } from "openapi-types";
import { HeaderContainer } from "./HeaderContainer";
import { SchemaContainer } from "./SchemaContainer";
import { ExampleContainer } from "./ExampleContainer";
import { TransferComponent } from "../TransferComponent";

/** "in" key */
export const enum ParameterKind {
  Header = "header",
  Body = "body",
  Query = "query",
  Path = "path",
  FormData = "formData",
}

export class ParameterContainer extends TransferComponent<OpenAPIV3.ParameterObject> {
  name: string;
  kind: ParameterKind;
  schema: SchemaContainer;
  examples: Record<string, ExampleContainer>;

  required: boolean;
  nullable: boolean;

  protected initialize() {
    super.initialize();
    const headerContainer = new HeaderContainer(this.value);

    this.schema = headerContainer.schema;
    this.examples = headerContainer.examples;
    this.name = this.value.name;
    this.kind = this.value.in as ParameterKind;
    this.required = !!this.value.required;
    this.nullable = this.schema.nullable;
  }

  is(kind: ParameterKind) {
    return this.kind === kind;
  }
}
