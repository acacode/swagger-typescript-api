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


export interface Product {
  
  /** Unique identifier representing a specific product for a given latitude & longitude. For example, uberX in San Francisco will have a different product_id than uberX in Los Angeles. */
  product_id: string;
  
  /** Description of product. */
  description: string;
  
  /** Display name of product. */
  display_name: string;
  
  /** Capacity of product. For example, 4 people. */
  capacity: number;
  
  /** Image URL representing the product. */
  image: string;
}

export interface ProductList {
  
  /** Contains the list of products */
  products: Product[];
}

export interface PriceEstimate {
  
  /** Unique identifier representing a specific product for a given latitude & longitude. For example, uberX in San Francisco will have a different product_id than uberX in Los Angeles */
  product_id: string;
  
  /** [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217) currency code. */
  currency_code: string;
  
  /** Display name of product. */
  display_name: string;
  
  /** Formatted string of estimate in local currency of the start location. Estimate could be a range, a single number (flat rate) or "Metered" for TAXI. */
  estimate: string;
  
  /** Lower bound of the estimated price. */
  low_estimate: number;
  
  /** Upper bound of the estimated price. */
  high_estimate: number;
  
  /** Expected surge multiplier. Surge is active if surge_multiplier is greater than 1. Price estimate already factors in the surge multiplier. */
  surge_multiplier: number;
}

export interface Profile {
  
  /** First name of the Uber user. */
  first_name: string;
  
  /** Last name of the Uber user. */
  last_name: string;
  
  /** Email address of the Uber user */
  email: string;
  
  /** Image URL of the Uber user. */
  picture: string;
  
  /** Promo code of the Uber user. */
  promo_code: string;
}

export interface Activity {
  
  /** Unique identifier for the activity */
  uuid: string;
}

export interface Activities {
  
  /** Position in pagination. */
  offset: number;
  
  /** Number of items to retrieve (100 max). */
  limit: number;
  
  /** Total number of items available. */
  count: number;
  history: Activity[];
}

export interface Error {
  code: number;
  message: string;
  fields: string;
}

export type RequestParams = Omit<RequestInit, "body" | "method"> & {
  secure?: boolean;
}

type ApiConfig<SecurityDataType> = {
  baseUrl?: string,
  baseApiParams?: RequestParams,
  securityWorker?: (securityData: SecurityDataType) => RequestParams,
}



export class Api<SecurityDataType> {
  
  public baseUrl = "https://api.uber.com/v1";
  public title = "Uber API";
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



  products = {


    /**
    * @tags Products
    * @name get
    * @description Product Types
    * @request GET:/products
    * @security true
    */
    get: (query: { latitude: number, longitude: number }, params?: RequestParams) =>
      this.request<Product[]>(`/products${this.addQueryParams(query)}`, "GET", params, null, true),
  }
  estimates = {


    /**
    * @tags Estimates
    * @name getPrice
    * @description Price Estimates
    * @request GET:/estimates/price
    */
    getPrice: (query: { start_latitude: number, start_longitude: number, end_latitude: number, end_longitude: number }, params?: RequestParams) =>
      this.request<PriceEstimate[]>(`/estimates/price${this.addQueryParams(query)}`, "GET", params, null),


    /**
    * @tags Estimates
    * @name getTime
    * @description Time Estimates
    * @request GET:/estimates/time
    */
    getTime: (query: { start_latitude: number, start_longitude: number, customer_uuid: string, product_id: string }, params?: RequestParams) =>
      this.request<Product[]>(`/estimates/time${this.addQueryParams(query)}`, "GET", params, null),
  }
  me = {


    /**
    * @tags User
    * @name get
    * @description User Profile
    * @request GET:/me
    */
    get: (params?: RequestParams) =>
      this.request<Profile>(`/me`, "GET", params, null),
  }
  history = {


    /**
    * @tags User
    * @name get
    * @description User Activity
    * @request GET:/history
    */
    get: (query: { offset: number, limit: number }, params?: RequestParams) =>
      this.request<Activities>(`/history${this.addQueryParams(query)}`, "GET", params, null),
  }

}
