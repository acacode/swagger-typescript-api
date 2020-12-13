interface GenerateApiParams {
  /**
   * path to swagger schema
   */
  input: string;

  /**
   * url to swagger schema
   */
  url: string;

  /**
   * swagger schema JSON
   */
  spec: import("swagger-schema-official").Spec;

  /**
   * default 'api.ts'
   */
  name?: string;

  /**
   * path to folder where will been located the created api module
   */
  output?: string;

  /**
   * path to folder containing templates (default: ./scr/templates)
   */
  templates?: string;

  /**
   * generate type definitions for API routes (default: false)
   */
  generateRouteTypes?: boolean;

  /**
   * do not generate an API class
   */
  generateClient?: boolean;

  /**
   * use "default" response status code as success response too.
   * some swagger schemas use "default" response status code as success response type by default.
   */
  defaultResponseAsSuccess?: boolean;

  /**
   * generate additional information about request responses
   * also add typings for bad responses
   */
  generateResponses?: boolean;

  /**
   * generate js api module with declaration file (default: false)
   */
  toJS?: boolean;

  /**
   * determines which path index should be used for routes separation
   */
  moduleNameIndex?: number;
  prepareConfig?: (currentConfiguration: GenerateApiConfiguration) => GenerateApiConfiguration;
  prettier?: object;
}

export interface GenerateApiConfiguration {
  apiConfig: object;
  config: object;
  modelTypes: object[];
  hasFormDataRoutes: boolean;
  hasSecurityRoutes: boolean;
  hasQueryRoutes: boolean;
  generateResponses: boolean;
  routes: object;
  utils: object;
}

export interface GenerateApiOutput {
  configuration: GenerateApiConfiguration;
  files: { name: string; content: string; declaration?: string }[];
}

export declare function generateApi(
  params: Omit<GenerateApiParams, "url" | "spec">,
): Promise<GenerateApiOutput>;
export declare function generateApi(
  params: Omit<GenerateApiParams, "input" | "spec">,
): Promise<GenerateApiOutput>;
export declare function generateApi(
  params: Omit<GenerateApiParams, "input" | "url">,
): Promise<GenerateApiOutput>;
