import * as _ from "lodash";
import { FileSystem } from "../utils/FileSystem";
import yaml from "js-yaml";
import axios from "axios";
import { schemaIsOpenAPIV3, AnySchema, UsageSchema } from "../interfaces/schema";
import * as swagger2openapi from "swagger2openapi";
import { Configuration } from "./Configuration";

export class Schema {
  static async readSchemaFile(
    pathToSwagger?: string,
    urlToSwagger?: string,
  ): Promise<string | object> {
    if (FileSystem.pathIsExist(pathToSwagger)) {
      console.log(`✨ try to get swagger by path "${pathToSwagger}"`);
      return FileSystem.getFileContent(FileSystem.resolveUserPath(pathToSwagger));
    } else {
      console.log(`✨ try to get swagger by url "${urlToSwagger}"`);
      return (await axios.get(urlToSwagger)).data;
    }
  }

  static parseSchemaFile(file: string | object): AnySchema {
    if (typeof file !== "string") return file as AnySchema;

    try {
      return JSON.parse(file);
    } catch (e) {
      return yaml.safeLoad(file);
    }
  }

  static convertSchemaToOpenAPIV3(schema: AnySchema): Promise<UsageSchema> {
    return new Promise((resolve) => {
      if (schemaIsOpenAPIV3(schema)) {
        resolve(schema);
      } else {
        swagger2openapi.convertObj(
          schema,
          {
            warnOnly: true,
            refSiblings: "preserve",
            rbname: "requestBodyName",
          },
          function (err, options) {
            const parsedSwaggerSchema = _.get(err, "options.openapi", _.get(options, "openapi"));
            if (!parsedSwaggerSchema && err) {
              throw new Error(err);
            }
            Configuration.update({ convertedFromSwagger2: true });
            resolve(parsedSwaggerSchema);
          },
        );
      }
    });
  }

  static fixSchema(original: AnySchema, usage: UsageSchema) {
    const usagePaths = _.get(usage, "paths");
    const originalPaths = _.get(original, "paths");

    // walk by routes
    _.each(usagePaths, (usagePathObject, route) => {
      const originalPathObject = _.get(originalPaths, route);

      // walk by methods
      _.each(usagePathObject, (usageRouteInfo, methodName) => {
        const originalRouteInfo = _.get(originalPathObject, methodName);
        const usageRouteParams = _.get(usageRouteInfo, "parameters", []);
        const originalRouteParams = _.get(originalRouteInfo, "parameters", []);

        _.each(originalRouteParams, (originalRouteParam) => {
          const existUsageParam = _.find(
            usageRouteParams,
            (param) => originalRouteParam.in === param.in && originalRouteParam.name === param.name,
          );
          if (!existUsageParam) {
            usageRouteParams.push(originalRouteParam);
          } else if (originalRouteParam.in === "formData") {
            // console.log("HERE");
          }
        });
      });
    });
  }
}
