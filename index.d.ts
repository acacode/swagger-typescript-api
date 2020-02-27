
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
   * default 'api.ts'
   */
  name?: string;

  /**
   * path to folder where will been located the created api module
   */
  output?: string;
  
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
}

export declare function generateApi(params: Omit<GenerateApiParams, "url">): Promise<string>
export declare function generateApi(params: Omit<GenerateApiParams, "input">): Promise<string>