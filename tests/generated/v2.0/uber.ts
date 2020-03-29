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
};

export type RequestQueryParamsType = Record<string, string | string[] | number | number[] | boolean | undefined>;

type ApiConfig<SecurityDataType> = {
  baseUrl?: string;
  baseApiParams?: RequestParams;
  securityWorker?: (securityData: SecurityDataType) => RequestParams;
};

const enum BodyType {
  Json,
}

class HttpClient<SecurityDataType> {
  public baseUrl: string = "https://api.uber.com/v1";
  private securityData: SecurityDataType = null as any;
  private securityWorker: ApiConfig<SecurityDataType>["securityWorker"] = (() => {}) as any;

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor({ baseUrl, baseApiParams, securityWorker }: ApiConfig<SecurityDataType> = {}) {
    this.baseUrl = baseUrl || this.baseUrl;
    this.baseApiParams = baseApiParams || this.baseApiParams;
    this.securityWorker = securityWorker || this.securityWorker;
  }

  public setSecurityData = (data: SecurityDataType) => {
    this.securityData = data;
  };

  private addQueryParam(query: RequestQueryParamsType, key: string) {
    return (
      encodeURIComponent(key) +
      "=" +
      encodeURIComponent(Array.isArray(query[key]) ? (query[key] as any).join(",") : query[key])
    );
  }

  protected addQueryParams(query?: RequestQueryParamsType): string {
    const fixedQuery = query || {};
    const keys = Object.keys(fixedQuery).filter((key) => "undefined" !== typeof fixedQuery[key]);
    return keys.length === 0 ? "" : `?${keys.map((key) => this.addQueryParam(fixedQuery, key)).join("&")}`;
  }

  private bodyFormatters: Record<BodyType, (input: object) => any> = {
    [BodyType.Json]: JSON.stringify,
  };

  private mergeRequestOptions(params: RequestParams, securityParams?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params,
      ...(securityParams || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params.headers || {}),
        ...((securityParams && securityParams.headers) || {}),
      },
    };
  }

  private safeParseResponse = <T = any, E = any>(response: Response): Promise<T> =>
    response
      .json()
      .then((data) => data)
      .catch((e) => response.text);

  public request = <T = any, E = any>(
    path: string,
    method: string,
    { secure, ...params }: RequestParams = {},
    body?: any,
    bodyType?: BodyType,
    secureByDefault?: boolean,
  ): Promise<T> =>
    fetch(`${this.baseUrl}${path}`, {
      // @ts-ignore
      ...this.mergeRequestOptions(params, (secureByDefault || secure) && this.securityWorker(this.securityData)),
      method,
      body: body ? this.bodyFormatters[bodyType || BodyType.Json](body) : null,
    }).then(async (response) => {
      const data = await this.safeParseResponse<T, E>(response);
      if (!response.ok) throw data;
      return data;
    });
}

/**
 * @title Uber API
 * @version 1.0.0
 * @baseUrl https://api.uber.com/v1
 * Move your app forward with the Uber API
 */
export class Api<SecurityDataType = any> extends HttpClient<SecurityDataType> {
  products = {
    /**
     * @tags Products
     * @name productsList
     * @summary Product Types
     * @request GET:/products
     * @secure
     * @description The Products endpoint returns information about the Uber products offered at a given location. The response includes the display name and other details about each product, and lists the products in the proper display order.
     */
    productsList: (query: { latitude: number; longitude: number }, params?: RequestParams) =>
      this.request<Product[], Error>(
        `/products${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),
  };
  estimates = {
    /**
     * @tags Estimates
     * @name priceList
     * @summary Price Estimates
     * @request GET:/estimates/price
     * @description The Price Estimates endpoint returns an estimated price range for each product offered at a given location. The price estimate is provided as a formatted string with the full price range and the localized currency symbol.<br><br>The response also includes low and high estimates, and the [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217) currency code for situations requiring currency conversion. When surge is active for a particular product, its surge_multiplier will be greater than 1, but the price estimate already factors in this multiplier.
     */
    priceList: (
      query: { start_latitude: number; start_longitude: number; end_latitude?: number; end_longitude: number },
      params?: RequestParams,
    ) => this.request<PriceEstimate[], Error>(`/estimates/price${this.addQueryParams(query)}`, "GET", params),

    /**
     * @tags Estimates
     * @name timeList
     * @summary Time Estimates
     * @request GET:/estimates/time
     * @description The Time Estimates endpoint returns ETAs for all products offered at a given location, with the responses expressed as integers in seconds. We recommend that this endpoint be called every minute to provide the most accurate, up-to-date ETAs.
     */
    timeList: (
      query: { start_latitude: number; start_longitude: number; customer_uuid?: string; product_id?: string },
      params?: RequestParams,
    ) => this.request<Product[], Error>(`/estimates/time${this.addQueryParams(query)}`, "GET", params),
  };
  me = {
    /**
     * @tags User
     * @name getMe
     * @summary User Profile
     * @request GET:/me
     * @description The User Profile endpoint returns information about the Uber user that has authorized with the application.
     */
    getMe: (params?: RequestParams) => this.request<Profile, Error>(`/me`, "GET", params),
  };
  history = {
    /**
     * @tags User
     * @name historyList
     * @summary User Activity
     * @request GET:/history
     * @description The User Activity endpoint returns data about a user's lifetime activity with Uber. The response will include pickup locations and times, dropoff locations and times, the distance of past requests, and information about which products were requested.<br><br>The history array in the response will have a maximum length based on the limit parameter. The response value count may exceed limit, therefore subsequent API requests may be necessary.
     */
    historyList: (query?: { offset?: number; limit?: number }, params?: RequestParams) =>
      this.request<Activities, Error>(`/history${this.addQueryParams(query)}`, "GET", params),
  };
}
