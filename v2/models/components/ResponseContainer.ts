import * as _ from "lodash";
import { OpenAPIV3 } from "openapi-types";
import { fromRecord } from "../Component";
import { HeaderContainer } from "./HeaderContainer";
import { LinkContainer } from "./LinkContainer";
import { TransferComponent } from "../TransferComponent";

export class ResponseContainer extends TransferComponent<OpenAPIV3.ResponseObject> {
  headers: Record<string, HeaderContainer>;
  links: Record<string, LinkContainer>;

  protected initialize() {
    super.initialize();
    this.headers = fromRecord(HeaderContainer, this.value.headers);
    this.links = fromRecord(LinkContainer, this.value.links);
  }

  get description() {
    return this.value.description;
  }
}
