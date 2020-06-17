import { OpenAPIV3 } from "openapi-types";
import { Component } from "../Component";

export class CallbackContainer extends Component<OpenAPIV3.CallbackObject> {
  protected initialize() {}

  serialize() {
    return "";
  }
}
