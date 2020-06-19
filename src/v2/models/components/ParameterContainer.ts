import { OpenAPIV3 } from "openapi-types";
import { Component, fromRecord } from "../Component";
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

  protected initialize() {
    super.initialize();
    const headerContainer = new HeaderContainer(this.value);

    this.schema = headerContainer.schema;
    this.examples = headerContainer.examples;
    this.name = this.value.name;
    this.kind = this.value.in as ParameterKind;
  }

  serialize() {
    return "";
  }

  is(kind: ParameterKind) {
    return this.kind === kind;
  }
}
