import * as _ from "lodash";
import { OpenAPIV3 } from "openapi-types";
import { RefWorker } from "../services/RefWorker";
import { Path } from "./PathPart";
import { OmitValue, PickValue } from "../interfaces/utility";

export type PathItemOperations = PickValue<OpenAPIV3.PathItemObject, OpenAPIV3.OperationObject>;
export type PathItemCommon = OmitValue<OpenAPIV3.PathItemObject, OpenAPIV3.OperationObject>;

const pathItemCommonKeys: (keyof PathItemCommon)[] = [
  "$ref",
  "description",
  "parameters",
  "servers",
  "summary",
];

export class Paths {
  value: Path[] = [];

  constructor(private $value: OpenAPIV3.PathsObject) {
    _.each(this.$value, (pathObject, pathPattern) => {
      pathObject = RefWorker.extract(pathObject);

      const routeOuterData = _.pick(pathObject, pathItemCommonKeys);
      const operationsByMethods = _.omit(pathObject, pathItemCommonKeys);

      _.each(operationsByMethods, (operation: OpenAPIV3.OperationObject, method: string) => {
        this.value.push(new Path(pathPattern, method, operation, routeOuterData));
      });
    });
  }

  get hasSecurityRoutes() {
    return this.value.some((route) => route.isSecure);
  }

  get hasQueryRoutes() {
    return this.value.some((route) => route.hasQueryParams);
  }

  get hasFormDataRoutes() {
    return this.value.some((route) => route.hasFormDataParams);
  }
}
