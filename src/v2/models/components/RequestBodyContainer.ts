import { OpenAPIV3 } from "openapi-types";
import { TransferComponent } from "../TransferComponent";

export const DEFAULT_BODY_ARG_NAME = "data";

export class RequestBodyContainer extends TransferComponent<OpenAPIV3.RequestBodyObject> {
  constructor(
    value: OpenAPIV3.RequestBodyObject | OpenAPIV3.ReferenceObject,
    private outerName?: string,
  ) {
    super(value);
  }

  get name() {
    return this.outerName || (this.value && this.value["name"]) || DEFAULT_BODY_ARG_NAME;
  }
}
