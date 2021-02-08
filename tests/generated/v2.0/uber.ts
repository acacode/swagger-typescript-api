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
  product_id?: string;

  /** Description of product. */
  description?: string;

  /** Display name of product. */
  display_name?: string;

  /** Capacity of product. For example, 4 people. */
  capacity?: number;

  /** Image URL representing the product. */
  image?: string;
}

export interface ProductList {
  /** Contains the list of products */
  products?: Product[];
}

export interface PriceEstimate {
  /** Unique identifier representing a specific product for a given latitude & longitude. For example, uberX in San Francisco will have a different product_id than uberX in Los Angeles */
  product_id?: string;

  /** [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217) currency code. */
  currency_code?: string;

  /** Display name of product. */
  display_name?: string;

  /** Formatted string of estimate in local currency of the start location. Estimate could be a range, a single number (flat rate) or "Metered" for TAXI. */
  estimate?: string;

  /** Lower bound of the estimated price. */
  low_estimate?: number;

  /** Upper bound of the estimated price. */
  high_estimate?: number;

  /** Expected surge multiplier. Surge is active if surge_multiplier is greater than 1. Price estimate already factors in the surge multiplier. */
  surge_multiplier?: number;
}

export interface Profile {
  /** First name of the Uber user. */
  first_name?: string;

  /** Last name of the Uber user. */
  last_name?: string;

  /** Email address of the Uber user */
  email?: string;

  /** Image URL of the Uber user. */
  picture?: string;

  /** Promo code of the Uber user. */
  promo_code?: string;
}

export interface Activity {
  /** Unique identifier for the activity */
  uuid?: string;
}

export interface Activities {
  /**
   * Position in pagination.
   * @format int32
   */
  offset?: number;

  /**
   * Number of items to retrieve (100 max).
   * @format int32
   */
  limit?: number;

  /**
   * Total number of items available.
   * @format int32
   */
  count?: number;
  history?: Activity[];
}

export interface Error {
  /** @format int32 */
  code?: number;
  message?: string;
  fields?: string;
}

export type RequestParams = Omit<RequestInit, "body" | "method"> & {
  secure?: boolean;
};

export type RequestQueryParamsType = Record<string | number, any>;

interface ApiConfig<SecurityDataType> {
  baseUrl?: string;
  baseApiParams?: RequestParams;
  securityWorker?: (securityData: SecurityDataType) => RequestParams;
}

interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

enum BodyType {
  Json,
  FormData,
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "https://api.uber.com/v1";
  private securityData: SecurityDataType = null as any;
  private securityWorker: null | ApiConfig<SecurityDataType>["securityWorker"] = null;

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType) => {
    this.securityData = data;
  };

  private addQueryParam(query: RequestQueryParamsType, key: string) {
    return (
      encodeURIComponent(key) + "=" + encodeURIComponent(Array.isArray(query[key]) ? query[key].join(",") : query[key])
    );
  }

  protected addQueryParams(rawQuery?: RequestQueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys.length
      ? `?${keys
          .map((key) =>
            typeof query[key] === "object" && !Array.isArray(query[key])
              ? this.addQueryParams(query[key] as object).substring(1)
              : this.addQueryParam(query, key),
          )
          .join("&")}`
      : "";
  }

  private bodyFormatters: Record<BodyType, (input: any) => any> = {
    [BodyType.Json]: JSON.stringify,
    [BodyType.FormData]: (input: any) =>
      Object.keys(input).reduce((data, key) => {
        data.append(key, input[key]);
        return data;
      }, new FormData()),
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

  private safeParseResponse = <T = any, E = any>(response: Response): Promise<HttpResponse<T, E>> => {
    const r = response as HttpResponse<T, E>;
    r.data = (null as unknown) as T;
    r.error = (null as unknown) as E;

    return response
      .json()
      .then((data) => {
        if (r.ok) {
          r.data = data;
        } else {
          r.error = data;
        }
        return r;
      })
      .catch((e) => {
        r.error = e;
        return r;
      });
  };

  public request = <T = any, E = any>(
    path: string,
    method: string,
    { secure, ...params }: RequestParams = {},
    body?: any,
    bodyType?: BodyType,
    secureByDefault?: boolean,
  ): Promise<HttpResponse<T>> => {
    const requestUrl = `${this.baseUrl}${path}`;
    const secureOptions =
      (secureByDefault || secure) && this.securityWorker ? this.securityWorker(this.securityData) : {};
    const requestOptions = {
      ...this.mergeRequestOptions(params, secureOptions),
      method,
      body: body ? this.bodyFormatters[bodyType || BodyType.Json](body) : null,
    };

    return fetch(requestUrl, requestOptions).then(async (response) => {
      const data = await this.safeParseResponse<T, E>(response);
      if (!response.ok) throw data;
      return data;
    });
  };
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
     * @description The Products endpoint returns information about the Uber products offered at a given location. The response includes the display name and other details about each product, and lists the products in the proper display order.
     *
     * @tags Products
     * @name ProductsList
     * @summary Product Types
     * @request GET:/products
     * @secure
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
     * @description The Price Estimates endpoint returns an estimated price range for each product offered at a given location. The price estimate is provided as a formatted string with the full price range and the localized currency symbol.<br><br>The response also includes low and high estimates, and the [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217) currency code for situations requiring currency conversion. When surge is active for a particular product, its surge_multiplier will be greater than 1, but the price estimate already factors in this multiplier.
     *
     * @tags Estimates
     * @name PriceList
     * @summary Price Estimates
     * @request GET:/estimates/price
     */
    priceList: (
      query: { start_latitude: number; start_longitude: number; end_latitude?: number; end_longitude: number },
      params?: RequestParams,
    ) => this.request<PriceEstimate[], Error>(`/estimates/price${this.addQueryParams(query)}`, "GET", params),

    /**
     * @description The Time Estimates endpoint returns ETAs for all products offered at a given location, with the responses expressed as integers in seconds. We recommend that this endpoint be called every minute to provide the most accurate, up-to-date ETAs.
     *
     * @tags Estimates
     * @name TimeList
     * @summary Time Estimates
     * @request GET:/estimates/time
     */
    timeList: (
      query: { start_latitude: number; start_longitude: number; customer_uuid?: string; product_id?: string },
      params?: RequestParams,
    ) => this.request<Product[], Error>(`/estimates/time${this.addQueryParams(query)}`, "GET", params),
  };
  me = {
    /**
     * @description The User Profile endpoint returns information about the Uber user that has authorized with the application.
     *
     * @tags User
     * @name GetMe
     * @summary User Profile
     * @request GET:/me
     */
    getMe: (params?: RequestParams) => this.request<Profile, Error>(`/me`, "GET", params),
  };
  history = {
    /**
     * @description The User Activity endpoint returns data about a user's lifetime activity with Uber. The response will include pickup locations and times, dropoff locations and times, the distance of past requests, and information about which products were requested.<br><br>The history array in the response will have a maximum length based on the limit parameter. The response value count may exceed limit, therefore subsequent API requests may be necessary.
     *
     * @tags User
     * @name HistoryList
     * @summary User Activity
     * @request GET:/history
     */
    historyList: (query?: { offset?: number; limit?: number }, params?: RequestParams) =>
      this.request<Activities, Error>(`/history${this.addQueryParams(query)}`, "GET", params),
  };
}
