import { ComponentsGroup, ComponentRawGroup } from "../../ComponentsGroup";
import { OpenAPIV3 } from "openapi-types";
import { ResponseContainer } from "../ResponseContainer";
import { Configuration } from "../../../services/Configuration";
import { TransformOptions } from "../../../transformers/SchemaTransformer";

export const SUCCESS_CODE_RANGE = [200, 300];

const isSuccessResponseCode = (code) =>
  (Configuration.value.defaultResponseAsSuccess && code === "default") ||
  (+code >= SUCCESS_CODE_RANGE[0] && +code < SUCCESS_CODE_RANGE[1]);

export class ResponsesGroup extends ComponentsGroup<OpenAPIV3.ResponseObject, ResponseContainer> {
  constructor(group: ComponentRawGroup<OpenAPIV3.ResponseObject>) {
    super(group, ResponseContainer);
  }

  get success() {
    return this.filter((response, code) => isSuccessResponseCode(code));
  }
  get bad() {
    return this.filter((response, code) => !isSuccessResponseCode(code));
  }

  transformResponses(responses: ResponseContainer[], options?: TransformOptions) {
    return super.transform(
      responses.map((response) => response.content && response.content.getActualSchema()),
      options,
    );
  }
}
