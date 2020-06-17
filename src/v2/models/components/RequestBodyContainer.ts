import { OpenAPIV3 } from "openapi-types";
import { Component, fromRecord } from "../Component";
import { TransferContent } from "../TransferContent";

export class RequestBodyContainer extends Component<OpenAPIV3.RequestBodyObject> {
  content: TransferContent;

  protected initialize() {
    this.content = new TransferContent(this.value.content);
  }

  serialize() {
    return "";
  }
}
