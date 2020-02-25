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


export type Pet = NewPet & { id: number }

export interface NewPet {
  name: string;
  tag?: string;
}

export interface ErrorModel {
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

/** Overrided Promise type. Needs for additional typings of `.catch` callback */
type TPromise<ResolveType, RejectType = any> = Omit<Promise<ResolveType>, "then" | "catch"> & {
  then<TResult1 = ResolveType, TResult2 = never>(onfulfilled?: ((value: ResolveType) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: RejectType) => TResult2 | PromiseLike<TResult2>) | undefined | null): TPromise<TResult1 | TResult2, RejectType>;
  catch<TResult = never>(onrejected?: ((reason: RejectType) => TResult | PromiseLike<TResult>) | undefined | null): TPromise<ResolveType | TResult, RejectType>;
}

/** A sample API that uses a petstore as an example to demonstrate features in the swagger-2.0 specification */
export class Api<SecurityDataType> {
  
  public baseUrl = "http://petstore.swagger.io/api";
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
  
  private safeParseResponse = <T = any, E = any>(response: Response): TPromise<T, E> =>
    response.json()
      .then(data => data)
      .catch(e => response.text);
  
  public request = <T = any, E = any>(
    path: string,
    method: string,
    { secure, ...params }: RequestParams = {},
    body?: any,
    secureByDefault?: boolean,
  ): TPromise<T, E> =>
    fetch(`${this.baseUrl}${path}`, {
      // @ts-ignore
      ...this.mergeRequestOptions(params, (secureByDefault || secure) && this.securityWorker(this.securityData)),
      method,
      body: body ? JSON.stringify(body) : null,
    }).then(async response => {
      const data = await this.safeParseResponse<T, E>(response);
      if (!response.ok) throw data
      return data
    })



  pets = {


    /**
    * @name findPets
    * @request GET:/pets
    * @description Returns all pets from the system that the user has access to
    * @response `200` `Pet[]` pet response
    * @response `default` `ErrorModel` unexpected error
    */
    findPets: (query: { tags?: string[], limit?: number }, params?: RequestParams) =>
      this.request<Pet[], ErrorModel>(`/pets${this.addQueryParams(query)}`, "GET", params, null),


    /**
    * @name addPet
    * @request POST:/pets
    * @description Creates a new pet in the store.  Duplicates are allowed
    * @response `200` `Pet` pet response
    * @response `default` `ErrorModel` unexpected error
    */
    addPet: (pet: NewPet, params?: RequestParams) =>
      this.request<Pet, ErrorModel>(`/pets`, "POST", params, pet),


    /**
    * @name findPetById
    * @request GET:/pets/{id}
    * @description Returns a user based on a single ID, if the user does not have access to the pet
    * @response `200` `Pet` pet response
    * @response `default` `ErrorModel` unexpected error
    */
    findPetById: (id: number, params?: RequestParams) =>
      this.request<Pet, ErrorModel>(`/pets/${id}`, "GET", params, null),


    /**
    * @name deletePet
    * @request DELETE:/pets/{id}
    * @description deletes a single pet based on the ID supplied
    * @response `204` `any` pet deleted
    * @response `default` `ErrorModel` unexpected error
    */
    deletePet: (id: number, params?: RequestParams) =>
      this.request<any, ErrorModel>(`/pets/${id}`, "DELETE", params, null),
  }

}
