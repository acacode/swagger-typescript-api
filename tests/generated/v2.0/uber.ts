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
  
  /**
  * Unique identifier representing a specific product for a given latitude & longitude. For example, uberX in San Francisco will have a different product_id than uberX in Los Angeles.
  */
  product_id?: string;
  
  /**
  * Description of product.
  */
  description?: string;
  
  /**
  * Display name of product.
  */
  display_name?: string;
  
  /**
  * Capacity of product. For example, 4 people.
  */
  capacity?: number;
  
  /**
  * Image URL representing the product.
  */
  image?: string;
}

export interface ProductList {
  
  /**
  * Contains the list of products
  */
  products?: Product[];
}

export interface PriceEstimate {
  
  /**
  * Unique identifier representing a specific product for a given latitude & longitude. For example, uberX in San Francisco will have a different product_id than uberX in Los Angeles
  */
  product_id?: string;
  
  /**
  * [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217) currency code.
  */
  currency_code?: string;
  
  /**
  * Display name of product.
  */
  display_name?: string;
  
  /**
  * Formatted string of estimate in local currency of the start location. Estimate could be a range, a single number (flat rate) or "Metered" for TAXI.
  */
  estimate?: string;
  
  /**
  * Lower bound of the estimated price.
  */
  low_estimate?: number;
  
  /**
  * Upper bound of the estimated price.
  */
  high_estimate?: number;
  
  /**
  * Expected surge multiplier. Surge is active if surge_multiplier is greater than 1. Price estimate already factors in the surge multiplier.
  */
  surge_multiplier?: number;
}

export interface Profile {
  
  /**
  * First name of the Uber user.
  */
  first_name?: string;
  
  /**
  * Last name of the Uber user.
  */
  last_name?: string;
  
  /**
  * Email address of the Uber user
  */
  email?: string;
  
  /**
  * Image URL of the Uber user.
  */
  picture?: string;
  
  /**
  * Promo code of the Uber user.
  */
  promo_code?: string;
}

export interface Activity {
  
  /**
  * Unique identifier for the activity
  */
  uuid?: string;
}

export interface Activities {
  
  /**
  * Position in pagination.
  */
  offset?: number;
  
  /**
  * Number of items to retrieve (100 max).
  */
  limit?: number;
  
  /**
  * Total number of items available.
  */
  count?: number;
  history?: Activity[];
}

export interface Error {
  code?: number;
  message?: string;
  fields?: string;
}

export type RequestParams = Omit<RequestInit, "body" | "method"> & {
  secure?: boolean;
}

type ApiConfig<SecurityDataType> = {
  baseUrl?: string,
  baseApiParams?: RequestParams,
  securityWorker?: (securityData: SecurityDataType) => RequestParams,
}


export namespace products {

  /**
  * @tags Products
  * @name productsList
  * @summary Product Types
  * @request GET:/products
  * @secure
  * @description The Products endpoint returns information about the Uber products offered at a given location. The response includes the display name and other details about each product, and lists the products in the proper display order.
  */
  export namespace ProductsList {
    export type RequestQuery = { latitude: number, longitude: number };
    export type RequestBody = never;
    export type ResponseBody = Product[];
  }
}
export namespace estimates {

  /**
  * @tags Estimates
  * @name priceList
  * @summary Price Estimates
  * @request GET:/estimates/price
  * @description The Price Estimates endpoint returns an estimated price range for each product offered at a given location. The price estimate is provided as a formatted string with the full price range and the localized currency symbol.<br><br>The response also includes low and high estimates, and the [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217) currency code for situations requiring currency conversion. When surge is active for a particular product, its surge_multiplier will be greater than 1, but the price estimate already factors in this multiplier.
  */
  export namespace PriceList {
    export type RequestQuery = { start_latitude: number, start_longitude: number, end_latitude?: number, end_longitude: number };
    export type RequestBody = never;
    export type ResponseBody = PriceEstimate[];
  }

  /**
  * @tags Estimates
  * @name timeList
  * @summary Time Estimates
  * @request GET:/estimates/time
  * @description The Time Estimates endpoint returns ETAs for all products offered at a given location, with the responses expressed as integers in seconds. We recommend that this endpoint be called every minute to provide the most accurate, up-to-date ETAs.
  */
  export namespace TimeList {
    export type RequestQuery = { start_latitude: number, start_longitude: number, customer_uuid?: string, product_id?: string };
    export type RequestBody = never;
    export type ResponseBody = Product[];
  }
}
export namespace me {

  /**
  * @tags User
  * @name getMe
  * @summary User Profile
  * @request GET:/me
  * @description The User Profile endpoint returns information about the Uber user that has authorized with the application.
  */
  export namespace GetMe {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = Profile;
  }
}
export namespace history {

  /**
  * @tags User
  * @name historyList
  * @summary User Activity
  * @request GET:/history
  * @description The User Activity endpoint returns data about a user's lifetime activity with Uber. The response will include pickup locations and times, dropoff locations and times, the distance of past requests, and information about which products were requested.<br><br>The history array in the response will have a maximum length based on the limit parameter. The response value count may exceed limit, therefore subsequent API requests may be necessary.
  */
  export namespace HistoryList {
    export type RequestQuery = { offset?: number, limit?: number };
    export type RequestBody = never;
    export type ResponseBody = Activities;
  }
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
    * @name productsList
    * @summary Product Types
    * @request GET:/products
    * @secure
    * @description The Products endpoint returns information about the Uber products offered at a given location. The response includes the display name and other details about each product, and lists the products in the proper display order.
    */
    productsList: (query: { latitude: number, longitude: number }, params?: RequestParams) =>
      this.request<Product[]>(`/products${this.addQueryParams(query)}`, "GET", params, null, true),
  }
  estimates = {


    /**
    * @tags Estimates
    * @name priceList
    * @summary Price Estimates
    * @request GET:/estimates/price
    * @description The Price Estimates endpoint returns an estimated price range for each product offered at a given location. The price estimate is provided as a formatted string with the full price range and the localized currency symbol.<br><br>The response also includes low and high estimates, and the [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217) currency code for situations requiring currency conversion. When surge is active for a particular product, its surge_multiplier will be greater than 1, but the price estimate already factors in this multiplier.
    */
    priceList: (query: { start_latitude: number, start_longitude: number, end_latitude?: number, end_longitude: number }, params?: RequestParams) =>
      this.request<PriceEstimate[]>(`/estimates/price${this.addQueryParams(query)}`, "GET", params, null),


    /**
    * @tags Estimates
    * @name timeList
    * @summary Time Estimates
    * @request GET:/estimates/time
    * @description The Time Estimates endpoint returns ETAs for all products offered at a given location, with the responses expressed as integers in seconds. We recommend that this endpoint be called every minute to provide the most accurate, up-to-date ETAs.
    */
    timeList: (query: { start_latitude: number, start_longitude: number, customer_uuid?: string, product_id?: string }, params?: RequestParams) =>
      this.request<Product[]>(`/estimates/time${this.addQueryParams(query)}`, "GET", params, null),
  }
  me = {


    /**
    * @tags User
    * @name getMe
    * @summary User Profile
    * @request GET:/me
    * @description The User Profile endpoint returns information about the Uber user that has authorized with the application.
    */
    getMe: (params?: RequestParams) =>
      this.request<Profile>(`/me`, "GET", params, null),
  }
  history = {


    /**
    * @tags User
    * @name historyList
    * @summary User Activity
    * @request GET:/history
    * @description The User Activity endpoint returns data about a user's lifetime activity with Uber. The response will include pickup locations and times, dropoff locations and times, the distance of past requests, and information about which products were requested.<br><br>The history array in the response will have a maximum length based on the limit parameter. The response value count may exceed limit, therefore subsequent API requests may be necessary.
    */
    historyList: (query: { offset?: number, limit?: number }, params?: RequestParams) =>
      this.request<Activities>(`/history${this.addQueryParams(query)}`, "GET", params, null),
  }

}
