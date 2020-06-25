import { ComponentsGroup, ComponentRawGroup } from "../../ComponentsGroup";
import { OpenAPIV3 } from "openapi-types";
import { ResponseContainer } from "../ResponseContainer";
import { Configuration } from "../../../services/Configuration";

export const SUCCESS_CODE_RANGE = [200, 300];

const isSuccessResponseCode = (code) =>
  (Configuration.value.defaultResponseAsSuccess && code === "default") ||
  (+code >= SUCCESS_CODE_RANGE[0] && +code < SUCCESS_CODE_RANGE[1]);

export class Responses extends ComponentsGroup<OpenAPIV3.ResponseObject, ResponseContainer> {
  constructor(group: ComponentRawGroup<OpenAPIV3.ResponseObject>) {
    super(group, ResponseContainer);
  }

  get successResponses() {
    return this.filter((code) => isSuccessResponseCode(code));
  }
  get badResponses() {
    return this.filter((code) => !isSuccessResponseCode(code));
  }
}
