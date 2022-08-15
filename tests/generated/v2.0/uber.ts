/* eslint-disable */
/* tslint:disable */
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

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "https://api.uber.com/v1";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
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

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Uber API
 * @version 1.0.0
 * @baseUrl https://api.uber.com/v1
 *
 * Move your app forward with the Uber API
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
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
    productsList: (query: { latitude: number; longitude: number }, params: RequestParams = {}) =>
      this.request<Product[], Error>({
        path: `/products`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
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
      params: RequestParams = {},
    ) =>
      this.request<PriceEstimate[], Error>({
        path: `/estimates/price`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

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
      params: RequestParams = {},
    ) =>
      this.request<Product[], Error>({
        path: `/estimates/time`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
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
    getMe: (params: RequestParams = {}) =>
      this.request<Profile, Error>({
        path: `/me`,
        method: "GET",
        format: "json",
        ...params,
      }),
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
    historyList: (query?: { offset?: number; limit?: number }, params: RequestParams = {}) =>
      this.request<Activities, Error>({
        path: `/history`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
}
