
interface BaseGenerateApiParams {

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
   * Some swagger schemas have "default" response status code.
   */
  defaultResponseAsSuccess?: boolean;
}

interface LocalFileGenerateApiParams extends BaseGenerateApiParams {

  /**
   * path to swagger schema
   */
  input: string;
}

interface UrlGenerateApiParams extends BaseGenerateApiParams {

  /**
   * url to swagger schema
   */
  url: string;
}

export declare function generateApi(params: LocalFileGenerateApiParams): Promise<string>
export declare function generateApi(params: UrlGenerateApiParams): Promise<string>