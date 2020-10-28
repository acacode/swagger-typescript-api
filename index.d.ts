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
}

export declare function generateApi(
  params: Omit<GenerateApiParams, "url" | "spec">,
): Promise<string>;
export declare function generateApi(
  params: Omit<GenerateApiParams, "input" | "spec">,
): Promise<string>;
export declare function generateApi(
  params: Omit<GenerateApiParams, "input" | "url">,
): Promise<string>;
