/* tslint:disable */
/* eslint-disable */

/*
* ---------------------------------------------------------------
* ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
* ##                                                           ##
* ## AUTHOR: acacode                                           ##
* ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
* ---------------------------------------------------------------
*/


export interface Pet {
  id: number;
  name: string;
  tag?: string;
}

export type Pets = Pet[]

export interface Error {
  code: number;
  message: string;
}

export type RequestParams = Omit<RequestInit, "body" | "method"> & {
  secure?: boolean;
}

type ApiConfig<SecurityDataType> = {
  baseUrl?: string,
  baseApiParams?: RequestParams,
  securityWorker?: (securityData: SecurityDataType) => RequestParams,
}


export namespace pets {

  /**
  * @tags pets
  * @name listPets
  * @summary List all pets
  * @request GET:/pets
  */
  export namespace ListPets {
    export type RequestQuery = { limit?: number };
    export type RequestBody = never;
    export type ResponseBody = Pets;
  }

  /**
  * @tags pets
  * @name createPets
  * @summary Create a pet
  * @request POST:/pets
  */
  export namespace CreatePets {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
  * @tags pets
  * @name showPetById
  * @summary Info for a specific pet
  * @request GET:/pets/{petId}
  */
  export namespace ShowPetById {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = Pet;
  }
}

export class Api<SecurityDataType> {
  
  public baseUrl = "http://petstore.swagger.io/v1";
  public title = "Swagger Petstore";
  public version = "1.0.0";

  private securityData: SecurityDataType = (null as any);
  private securityWorker: ApiConfig<SecurityDataType>["securityWorker"] = (() => {}) as any
  
  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  }

  constructor({ baseUrl,baseApiParams,securityWorker, }: ApiConfig<SecurityDataType> = {}) {
    this.baseUrl = baseUrl || this.baseUrl;
    this.baseApiParams = baseApiParams || this.baseApiParams;
    this.securityWorker = securityWorker || this.securityWorker;
  }

  public setSecurityData = (data: SecurityDataType) => {
    this.securityData = data
  }

  private addQueryParams(query: object): string {
    const keys = Object.keys(query);
    return keys.length ? (
      '?' +
      keys.reduce((paramsArray, param) => [
        ...paramsArray,
        param + '=' + encodeURIComponent(query[param])
      ], []).join('&')
    ) : ''
  }

  private mergeRequestOptions(params: RequestParams, securityParams?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params,
      ...(securityParams || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params.headers || {}),
        ...((securityParams && securityParams.headers) || {})
      }
    }
  }
  
  private safeParseResponse = <T = any>(response: Response): Promise<T> =>
    response.json()
      .then(data => data)
      .catch(e => response.text);
  
  public request = <T = any>(
    path: string,
    method: string,
    { secure, ...params }: RequestParams = {},
    body?: any,
    secureByDefault?: boolean,
  ): Promise<T> =>
    fetch(`${this.baseUrl}${path}`, {
      // @ts-ignore
      ...this.mergeRequestOptions(params, (secureByDefault || secure) && this.securityWorker(this.securityData)),
      method,
      body: body ? JSON.stringify(body) : null,
    }).then(async response => {
      const data = await this.safeParseResponse<T>(response);
      if (!response.ok) throw data
      return data
    })



  pets = {


    /**
    * @tags pets
    * @name listPets
    * @summary List all pets
    * @request GET:/pets
    */
    listPets: (query: { limit?: number }, params?: RequestParams) =>
      this.request<Pets>(`/pets${this.addQueryParams(query)}`, "GET", params, null),


    /**
    * @tags pets
    * @name createPets
    * @summary Create a pet
    * @request POST:/pets
    */
    createPets: (params?: RequestParams) =>
      this.request<any>(`/pets`, "POST", params, null),


    /**
    * @tags pets
    * @name showPetById
    * @summary Info for a specific pet
    * @request GET:/pets/{petId}
    */
    showPetById: (petId: string, params?: RequestParams) =>
      this.request<Pet>(`/pets/${petId}`, "GET", params, null),
  }

}
