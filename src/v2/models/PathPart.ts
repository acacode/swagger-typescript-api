import { OpenAPIV3 } from "openapi-types";
import { ResponseContainer } from "./components/ResponseContainer";
import { RequestBodyContainer } from "./components/RequestBodyContainer";
import { ParameterContainer } from "./components/ParameterContainer";
import { CallbackContainer } from "./components/CallbackContainer";
import { fromRecord, fromArray } from "./Component";

export class PathPart {
  parameters: ParameterContainer[] = [];
  responses: Record<string, ResponseContainer> = {};
  callbacks: Record<string, CallbackContainer> = {};
  requestBody: RequestBodyContainer = null;

  secure = false;
  hasQuery = false;
  hasFormDataParams = false;

  constructor(
    public pattern: string,
    public method: string,
    public operation: OpenAPIV3.OperationObject,
    public outerData: Pick<
      OpenAPIV3.PathItemObject,
      "$ref" | "summary" | "parameters" | "servers" | "description"
    >,
  ) {
    this.requestBody = new RequestBodyContainer(operation.requestBody);

    this.responses = fromRecord(ResponseContainer, operation.responses);
    this.parameters = fromArray(ParameterContainer, operation.parameters);
    this.callbacks = fromRecord(CallbackContainer, operation.callbacks);

    if (outerData.parameters) {
      this.parameters.push(...fromArray(ParameterContainer, outerData.parameters));
    }

    this.secure = !!(operation.security && operation.security.length);
  }
}
