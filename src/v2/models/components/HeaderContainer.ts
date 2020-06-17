import * as _ from "lodash";
import { OpenAPIV3 } from "openapi-types";
import { Component, fromRecord } from "../Component";
import { SchemaContainer } from "./SchemaContainer";
import { ExampleContainer } from "./ExampleContainer";

export class HeaderContainer extends Component<OpenAPIV3.HeaderObject> {
  schema: SchemaContainer;
  examples: Record<string, ExampleContainer>;

  protected initialize() {
    this.schema = new SchemaContainer(this.value.schema);
    this.examples = fromRecord(ExampleContainer, this.value.examples);
  }

  serialize() {
    return "";
  }
}
