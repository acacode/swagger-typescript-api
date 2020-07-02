import { OpenAPIV3 } from "openapi-types";
import { HeaderContainer } from "./HeaderContainer";
import { fromRecord } from "../Component";

export class EncodingContainer {
  headers: Record<string, HeaderContainer>;

  constructor(public $value: OpenAPIV3.EncodingObject) {
    this.headers = fromRecord(HeaderContainer, this.$value.headers);
  }
}
