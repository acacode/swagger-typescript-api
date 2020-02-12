
interface BaseGenerateApiParams {

  /**
   * default 'api.ts'
   */
  name?: string;

  /**
   * path to folder where will been located the created api module
   */
  output?: string;
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