import * as _ from "lodash";
import { OpenAPIV3 } from "openapi-types";
import { RefWorker } from "../services/RefWorker";
import { PathPart } from "./PathPart";
import { TemplateConfigPart, GroupedRoutes } from "../interfaces/template";

export class Paths implements TemplateConfigPart<GroupedRoutes> {
  value: PathPart[] = [];

  hasSecurityRoutes: boolean;
  hasQueryRoutes: boolean;
  hasFormDataRoutes: boolean;

  constructor(private $value: OpenAPIV3.PathsObject) {
    _.each($value, (pathObject, pathPattern) => {
      // TODO?:
      const ref = RefWorker.extract(pathObject);

      const routeOuterData = _.pick(
        pathObject,
        "$ref",
        "summary",
        "parameters",
        "servers",
        "description",
      );
      const operationsByMethods = _.omit(
        pathObject,
        "$ref",
        "summary",
        "parameters",
        "servers",
        "description",
      );

      // operationsByMethods.get.callbacks

      _.each(operationsByMethods, (operation: OpenAPIV3.OperationObject, method: string) => {
        this.value.push(new PathPart(pathPattern, method, operation, routeOuterData));
      });

      this.hasSecurityRoutes = this.value.some((route) => route.secure);
      this.hasQueryRoutes = this.value.some((route) => route.hasQuery);
      this.hasFormDataRoutes = this.value.some((route) => route.hasFormDataParams);
      // const Constructor = componentsContainers[componentName]

      // _.each(componentMap, (componentPart, componentPartName) => {
      //   this[componentName][componentPartName] = new Constructor(componentPart)
      // })
    });
  }

  toTemplatePart() {
    return {
      combined: [],
      outOfModule: [],
    };
  }
}
