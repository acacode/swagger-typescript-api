import { OpenAPIV3 } from "openapi-types";
import { Component, fromRecord } from "../Component";
import { HeaderContainer } from "./HeaderContainer";
import { SchemaContainer } from "./SchemaContainer";
import { ExampleContainer } from "./ExampleContainer";

export class ParameterContainer extends Component<OpenAPIV3.ParameterObject> {
  name: string;
  in: string;
  schema: SchemaContainer;
  examples: Record<string, ExampleContainer>;

  protected initialize() {
    const headerContainer = new HeaderContainer(this.value);

    this.schema = headerContainer.schema;
    this.examples = headerContainer.examples;
    this.name = this.value.name;
    this.in = this.value.in;
  }

  serialize() {
    return "";
  }
}
