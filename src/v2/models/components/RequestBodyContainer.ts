import { OpenAPIV3 } from "openapi-types";
import { TransferComponent } from "../TransferComponent";

export const DEFAULT_BODY_ARG_NAME = "data";

export class RequestBodyContainer extends TransferComponent<OpenAPIV3.RequestBodyObject> {
  name: string;

  constructor(value: OpenAPIV3.RequestBodyObject | OpenAPIV3.ReferenceObject, name?: string) {
    super(value);
    this.name = name || this.value["name"] || DEFAULT_BODY_ARG_NAME;
  }
}
