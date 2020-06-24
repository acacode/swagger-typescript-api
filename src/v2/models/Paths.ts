import * as _ from "lodash";
import { OpenAPIV3 } from "openapi-types";
import { RefWorker } from "../services/RefWorker";
import { Path } from "./PathPart";
import { TemplateConfigPart, GroupedRoutes } from "../interfaces/template";
import { PickByValue, OmitByValue } from "utility-types";

export type PathItemOperations = PickByValue<OpenAPIV3.PathItemObject, OpenAPIV3.OperationObject>;
export type PathItemCommon = OmitByValue<OpenAPIV3.PathItemObject, OpenAPIV3.OperationObject>;

const pathItemCommonKeys: (keyof PathItemCommon)[] = [
  "$ref",
  "description",
  "parameters",
  "servers",
  "summary",
];

export class Paths implements TemplateConfigPart<GroupedRoutes> {
  value: Path[] = [];

  constructor(private $value: OpenAPIV3.PathsObject) {
    _.each($value, (pathObject, pathPattern) => {
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

  toTemplatePart(): GroupedRoutes {
    const combinedGroups: Record<string, GroupedRoutes["combined"][0]> = {};

    const groupedRoutes: GroupedRoutes = {
      combined: [],
      outOfModule: [],
    };

    for (const pathPart of this.value) {
      if (pathPart.moduleName) {
        if (!combinedGroups[pathPart.moduleName]) {
          combinedGroups[pathPart.moduleName] = {
            moduleName: pathPart.moduleName,
            routes: [],
          };
        }
        combinedGroups[pathPart.moduleName].routes.push(pathPart.toTemplateConfigRoute());
      } else {
        groupedRoutes.outOfModule.push(pathPart.toTemplateConfigRoute());
      }
    }

    groupedRoutes.combined = Object.values(combinedGroups);

    return groupedRoutes;
  }
}
