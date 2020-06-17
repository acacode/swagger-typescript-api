import * as _ from "lodash";
import { OpenAPIV3 } from "openapi-types";
import { Component, fromRecord } from "../Component";
import { HeaderContainer } from "./HeaderContainer";
import { LinkContainer } from "./LinkContainer";
import { TransferContent } from "../TransferContent";

export class ResponseContainer extends Component<OpenAPIV3.ResponseObject> {
  headers: Record<string, HeaderContainer>;
  content: TransferContent;
  links: Record<string, LinkContainer>;

  protected initialize() {
    this.headers = fromRecord(HeaderContainer, this.value.headers);
    this.links = fromRecord(LinkContainer, this.value.links);
    this.content = new TransferContent(this.value.content);
  }

  serialize() {
    return "";
  }
}
