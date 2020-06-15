import { AnySchema, UsageSchema } from "../interfaces/schema";
import { GenerateAPIOptions } from "../interfaces/cli";

interface AppConfiguration extends GenerateAPIOptions {
  swaggerSchema: UsageSchema;
  originalSchema: AnySchema;
  componentsMap: any;
  convertedFromSwagger2: boolean;
}

const appConfiguration: AppConfiguration = {
  input: null,
  url: null,
  generateResponses: false,
  defaultResponseAsSuccess: false,
  generateRouteTypes: false,
  generateClient: true,
  swaggerSchema: null,
  originalSchema: null,

  /** { "#/components/schemas/Foo": @TypeInfo, ... } */
  componentsMap: {},
  /** flag for catching convertion from swagger 2.0 */
  convertedFromSwagger2: false,
};

/** Application configuration (global flags, options, etc) */
export class Configuration {
  static get value() {
    return appConfiguration;
  }

  static update(configUpdate: Partial<AppConfiguration>): AppConfiguration {
    Object.assign(appConfiguration, configUpdate);
    return Configuration.value;
  }
}
