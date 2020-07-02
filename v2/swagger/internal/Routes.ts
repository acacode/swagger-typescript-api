import * as _ from "lodash";
import { TemplateConfigPart, GroupedRoutes, TemplateConfigRoute } from "../../interfaces/template";
import { Paths } from "../Paths";
import { RoutePath } from "./RoutePath";

export class Routes implements TemplateConfigPart<GroupedRoutes> {
  constructor(private paths: Paths) {}

  toTemplatePart(): GroupedRoutes {
    const combinedGroups: Record<string, GroupedRoutes["combined"][0]> = {};
    const outOfModule: TemplateConfigRoute[] = [];

    const createCombinedGroup = (moduleName: string) => {
      combinedGroups[moduleName] = {
        moduleName,
        routes: [],
      };
    };

    const addToCombinedGroup = (moduleName: string, routePath: RoutePath) => {
      combinedGroups[moduleName].routes.push(routePath);
    };

    for (const path of this.paths.value) {
      const moduleName = path.moduleName;
      const routePath = new RoutePath(path);

      if (moduleName) {
        if (!combinedGroups[moduleName]) {
          createCombinedGroup(moduleName);
        }
        addToCombinedGroup(moduleName, routePath);
      } else {
        outOfModule.push(routePath);
      }
    }

    return {
      combined: Object.values(combinedGroups),
      outOfModule,
    };
  }
}
