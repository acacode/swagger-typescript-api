import { Component } from "./Component";
import { OpenAPIV3 } from "openapi-types";
import { TransferContent, TransferContentKind } from "./TransferContent";

type TransferableComponent = {
  content?: Record<string, OpenAPIV3.MediaTypeObject>;
};

export abstract class TransferComponent<T extends TransferableComponent> extends Component<T> {
  content?: TransferContent;

  protected initialize() {
    this.content = new TransferContent(this.value.content);
  }

  transferIs(kind: TransferContentKind) {
    return this.content && this.content.is(kind);
  }
}
