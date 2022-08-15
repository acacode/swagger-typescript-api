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

export interface Activity {
  action?: string;

  /** @format dateTime */
  created_at?: string;
  data?: object;
  id?: number;
  model?: string;

  /** @format dateTime */
  updated_at?: string;
  user_id?: number;
}

export interface Block {
  block_feeds?: BlockFeed[];
  column?: number;
  description?: string;
  key?: string;
  name?: string;
  row?: number;
  size_x?: number;
  size_y?: number;
  visual_type?: string;
}

export interface BlockFeed {
  feed?: Feed;
  group?: Group;
  id?: string;
}

export interface Dashboard {
  blocks?: Block[];
  description?: string;
  key?: string;
  name?: string;
}

export interface Data {
  completed_at?: string;
  created_at?: string;
  created_epoch?: number;
  ele?: number;
  expiration?: string;
  feed_id?: number;
  group_id?: number;
  id?: string;
  lat?: number;
  lon?: number;
  updated_at?: string;
  value?: string;
}

export interface DataResponse {
  completed_at?: string;
  created_at?: string;
  created_epoch?: number;
  ele?: number;
  expiration?: string;
  feed_id?: number;
  group_id?: number;
  id?: string;
  lat?: number;
  lon?: number;
  updated_at?: string;
  value?: string;
}

export interface Error {
  code?: string;
  message?: string;
}

export interface Feed {
  created_at?: string;
  description?: string;

  /** Additional details about this feed. */
  details?: {
    data?: { count?: number; first?: Record<string, Data>; last?: Record<string, Data> };
    shared_with?: object[];
  };
  enabled?: boolean;
  group?: Record<string, ShallowGroup>;
  groups?: ShallowGroup[];
  history?: boolean;
  id?: number;
  key?: string;
  last_value?: string;
  license?: string;
  name?: string;
  status?: string;

  /** Is status notification active? */
  status_notify?: boolean;

  /** Status notification timeout in minutes. */
  status_timeout?: number;
  unit_symbol?: string;
  unit_type?: string;
  updated_at?: string;
  visibility?: "private" | "public" | "in progress" | "out of access";
}

export interface Group {
  created_at?: string;
  description?: string;
  feeds?: Feed[];
  id?: number;
  name?: string;
  updated_at?: string;
}

export interface Permission {
  created_at?: string;
  id?: number;
  model?: "feed" | "group" | "dashboard";
  object_id?: number;
  scope?: "secret" | "public" | "user" | "organization";
  scope_value?: string;
  updated_at?: string;
  user_id?: number;
}

export interface ShallowGroup {
  created_at?: string;
  description?: string;
  id?: number;
  name?: string;
  updated_at?: string;
}

export interface Token {
  token?: string;
}

export interface Trigger {
  name?: string;
}

export interface User {
  color?: string;

  /** @format dateTime */
  created_at?: string;
  id?: number;
  name?: string;
  time_zone?: string;

  /** @format dateTime */
  updated_at?: string;
  username?: string;
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
  public baseUrl: string = "https://io.adafruit.com/api/v2";
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
 * @title Adafruit IO
 * @version 2.0.0
 * @baseUrl https://io.adafruit.com/api/v2
 *
 * ### The Internet of Things for Everyone
 *
 * The Adafruit IO HTTP API provides access to your Adafruit IO data from any programming language or hardware environment that can speak HTTP. The easiest way to get started is with [an Adafruit IO learn guide](https://learn.adafruit.com/series/adafruit-io-basics) and [a simple Internet of Things capable device like the Feather Huzzah](https://www.adafruit.com/product/2821).
 *
 * This API documentation is hosted on GitHub Pages and is available at [https://github.com/adafruit/io-api](https://github.com/adafruit/io-api). For questions or comments visit the [Adafruit IO Forums](https://forums.adafruit.com/viewforum.php?f=56) or the [adafruit-io channel on the Adafruit Discord server](https://discord.gg/adafruit).
 *
 * #### Authentication
 *
 * Authentication for every API request happens through the `X-AIO-Key` header or query parameter and your IO API key. A simple cURL request to get all available feeds for a user with the username "io_username" and the key "io_key_12345" could look like this:
 *
 *     $ curl -H "X-AIO-Key: io_key_12345" https://io.adafruit.com/api/v2/io_username/feeds
 *
 * Or like this:
 *
 *     $ curl "https://io.adafruit.com/api/v2/io_username/feeds?X-AIO-Key=io_key_12345
 *
 * Using the node.js [request](https://github.com/request/request) library, IO HTTP requests are as easy as:
 *
 * ```js
 * var request = require('request');
 *
 * var options = {
 *   url: 'https://io.adafruit.com/api/v2/io_username/feeds',
 *   headers: {
 *     'X-AIO-Key': 'io_key_12345',
 *     'Content-Type': 'application/json'
 *   }
 * };
 *
 * function callback(error, response, body) {
 *   if (!error && response.statusCode == 200) {
 *     var feeds = JSON.parse(body);
 *     console.log(feeds.length + " FEEDS AVAILABLE");
 *
 *     feeds.forEach(function (feed) {
 *       console.log(feed.name, feed.key);
 *     })
 *   }
 * }
 *
 * request(options, callback);
 * ```
 *
 * Using the ESP8266 Arduino HTTPClient library, an HTTPS GET request would look like this (replacing `---` with your own values in the appropriate locations):
 *
 * ```arduino
 * /// based on
 * /// https://github.com/esp8266/Arduino/blob/master/libraries/ESP8266HTTPClient/examples/Authorization/Authorization.ino
 *
 * #include <Arduino.h>
 * #include <ESP8266WiFi.h>
 * #include <ESP8266WiFiMulti.h>
 * #include <ESP8266HTTPClient.h>
 *
 * ESP8266WiFiMulti WiFiMulti;
 *
 * const char* ssid = "---";
 * const char* password = "---";
 *
 * const char* host = "io.adafruit.com";
 *
 * const char* io_key = "---";
 * const char* path_with_username = "/api/v2/---/dashboards";
 *
 * // Use web browser to view and copy
 * // SHA1 fingerprint of the certificate
 * const char* fingerprint = "77 00 54 2D DA E7 D8 03 27 31 23 99 EB 27 DB CB A5 4C 57 18";
 *
 * void setup() {
 *   Serial.begin(115200);
 *
 *   for(uint8_t t = 4; t > 0; t--) {
 *     Serial.printf("[SETUP] WAIT %d...\n", t);
 *     Serial.flush();
 *     delay(1000);
 *   }
 *
 *   WiFi.mode(WIFI_STA);
 *   WiFiMulti.addAP(ssid, password);
 *
 *   // wait for WiFi connection
 *   while(WiFiMulti.run() != WL_CONNECTED) {
 *     Serial.print('.');
 *     delay(1000);
 *   }
 *
 *   Serial.println("[WIFI] connected!");
 *
 *   HTTPClient http;
 *
 *   // start request with URL and TLS cert fingerprint for verification
 *   http.begin("https://" + String(host) + String(path_with_username), fingerprint);
 *
 *   // IO API authentication
 *   http.addHeader("X-AIO-Key", io_key);
 *
 *   // start connection and send HTTP header
 *   int httpCode = http.GET();
 *
 *   // httpCode will be negative on error
 *   if(httpCode > 0) {
 *     // HTTP header has been send and Server response header has been handled
 *     Serial.printf("[HTTP] GET response: %d\n", httpCode);
 *
 *     // HTTP 200 OK
 *     if(httpCode == HTTP_CODE_OK) {
 *       String payload = http.getString();
 *       Serial.println(payload);
 *     }
 *
 *     http.end();
 *   }
 * }
 *
 * void loop() {}
 * ```
 *
 * #### Client Libraries
 *
 * We have client libraries to help you get started with your project: [Python](https://github.com/adafruit/io-client-python), [Ruby](https://github.com/adafruit/io-client-ruby), [Arduino C++](https://github.com/adafruit/Adafruit_IO_Arduino), [Javascript](https://github.com/adafruit/adafruit-io-node), and [Go](https://github.com/adafruit/io-client-go) are available. They're all open source, so if they don't already do what you want, you can fork and add any feature you'd like.
 *
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  user = {
    /**
     * No description
     *
     * @tags Users
     * @name CurrentUser
     * @summary Get information about the current user
     * @request GET:/user
     * @secure
     */
    currentUser: (params: RequestParams = {}) =>
      this.request<User, void>({
        path: `/user`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  webhooks = {
    /**
     * No description
     *
     * @tags Webhooks, Data
     * @name CreateWebhookFeedData
     * @summary Send data to a feed via webhook URL.
     * @request POST:/webhooks/feed/:token
     * @secure
     */
    createWebhookFeedData: (token: string, payload: { value?: string }, params: RequestParams = {}) =>
      this.request<Data, void>({
        path: `/webhooks/feed/${token}`,
        method: "POST",
        body: payload,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description The raw data webhook receiver accepts POST requests and stores the raw request body on your feed. This is useful when you don't have control of the webhook sender. If feed history is turned on, payloads will be truncated at 1024 bytes. If feed history is turned off, payloads will be truncated at 100KB.
     *
     * @tags Webhooks, Data
     * @name CreateRawWebhookFeedData
     * @summary Send arbitrary data to a feed via webhook URL.
     * @request POST:/webhooks/feed/:token/raw
     * @secure
     */
    createRawWebhookFeedData: (token: string, params: RequestParams = {}) =>
      this.request<Data, void>({
        path: `/webhooks/feed/${token}/raw`,
        method: "POST",
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  username = {
    /**
     * @description Delete all your activities.
     *
     * @tags Activities
     * @name DestroyActivities
     * @summary All activities for current user
     * @request DELETE:/{username}/activities
     * @secure
     */
    destroyActivities: (username: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/${username}/activities`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description The Activities endpoint returns information about the user's activities.
     *
     * @tags Activities
     * @name AllActivities
     * @summary All activities for current user
     * @request GET:/{username}/activities
     * @secure
     */
    allActivities: (
      username: string,
      query?: { start_time?: string; end_time?: string; limit?: number },
      params: RequestParams = {},
    ) =>
      this.request<Activity[], void>({
        path: `/${username}/activities`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description The Activities endpoint returns information about the user's activities.
     *
     * @tags Activities
     * @name GetActivity
     * @summary Get activities by type for current user
     * @request GET:/{username}/activities/{type}
     * @secure
     */
    getActivity: (
      username: string,
      type: string,
      query?: { start_time?: string; end_time?: string; limit?: number },
      params: RequestParams = {},
    ) =>
      this.request<Activity[], void>({
        path: `/${username}/activities/${type}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description The Dashboards endpoint returns information about the user's dashboards.
     *
     * @tags Dashboards
     * @name AllDashboards
     * @summary All dashboards for current user
     * @request GET:/{username}/dashboards
     * @secure
     */
    allDashboards: (username: string, params: RequestParams = {}) =>
      this.request<Dashboard[], void>({
        path: `/${username}/dashboards`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Dashboards
     * @name CreateDashboard
     * @summary Create a new Dashboard
     * @request POST:/{username}/dashboards
     * @secure
     */
    createDashboard: (username: string, dashboard: Dashboard, params: RequestParams = {}) =>
      this.request<Dashboard, void>({
        path: `/${username}/dashboards`,
        method: "POST",
        body: dashboard,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description The Blocks endpoint returns information about the user's blocks.
     *
     * @tags Blocks
     * @name AllBlocks
     * @summary All blocks for current user
     * @request GET:/{username}/dashboards/{dashboard_id}/blocks
     * @secure
     */
    allBlocks: (username: string, dashboardId: string, params: RequestParams = {}) =>
      this.request<Block[], void>({
        path: `/${username}/dashboards/${dashboardId}/blocks`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Blocks
     * @name CreateBlock
     * @summary Create a new Block
     * @request POST:/{username}/dashboards/{dashboard_id}/blocks
     * @secure
     */
    createBlock: (username: string, dashboardId: string, block: Block, params: RequestParams = {}) =>
      this.request<Block, void>({
        path: `/${username}/dashboards/${dashboardId}/blocks`,
        method: "POST",
        body: block,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Blocks
     * @name DestroyBlock
     * @summary Delete an existing Block
     * @request DELETE:/{username}/dashboards/{dashboard_id}/blocks/{id}
     * @secure
     */
    destroyBlock: (username: string, dashboardId: string, id: string, params: RequestParams = {}) =>
      this.request<string, void>({
        path: `/${username}/dashboards/${dashboardId}/blocks/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Blocks
     * @name GetBlock
     * @summary Returns Block based on ID
     * @request GET:/{username}/dashboards/{dashboard_id}/blocks/{id}
     * @secure
     */
    getBlock: (username: string, dashboardId: string, id: string, params: RequestParams = {}) =>
      this.request<Block, void>({
        path: `/${username}/dashboards/${dashboardId}/blocks/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Blocks
     * @name UpdateBlock
     * @summary Update properties of an existing Block
     * @request PATCH:/{username}/dashboards/{dashboard_id}/blocks/{id}
     * @secure
     */
    updateBlock: (
      username: string,
      dashboardId: string,
      id: string,
      block: {
        block_feeds?: { feed_id?: string; group_id?: string }[];
        column?: number;
        dashboard_id?: number;
        description?: string;
        key?: string;
        name?: string;
        properties?: object;
        row?: number;
        size_x?: number;
        size_y?: number;
        visual_type?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Block, void>({
        path: `/${username}/dashboards/${dashboardId}/blocks/${id}`,
        method: "PATCH",
        body: block,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Blocks
     * @name ReplaceBlock
     * @summary Replace an existing Block
     * @request PUT:/{username}/dashboards/{dashboard_id}/blocks/{id}
     * @secure
     */
    replaceBlock: (
      username: string,
      dashboardId: string,
      id: string,
      block: {
        block_feeds?: { feed_id?: string; group_id?: string }[];
        column?: number;
        dashboard_id?: number;
        description?: string;
        key?: string;
        name?: string;
        properties?: object;
        row?: number;
        size_x?: number;
        size_y?: number;
        visual_type?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Block, void>({
        path: `/${username}/dashboards/${dashboardId}/blocks/${id}`,
        method: "PUT",
        body: block,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Dashboards
     * @name DestroyDashboard
     * @summary Delete an existing Dashboard
     * @request DELETE:/{username}/dashboards/{id}
     * @secure
     */
    destroyDashboard: (username: string, id: string, params: RequestParams = {}) =>
      this.request<string, void>({
        path: `/${username}/dashboards/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Dashboards
     * @name GetDashboard
     * @summary Returns Dashboard based on ID
     * @request GET:/{username}/dashboards/{id}
     * @secure
     */
    getDashboard: (username: string, id: string, params: RequestParams = {}) =>
      this.request<Dashboard, void>({
        path: `/${username}/dashboards/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Dashboards
     * @name UpdateDashboard
     * @summary Update properties of an existing Dashboard
     * @request PATCH:/{username}/dashboards/{id}
     * @secure
     */
    updateDashboard: (
      username: string,
      id: string,
      dashboard: { description?: string; key?: string; name?: string },
      params: RequestParams = {},
    ) =>
      this.request<Dashboard, void>({
        path: `/${username}/dashboards/${id}`,
        method: "PATCH",
        body: dashboard,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Dashboards
     * @name ReplaceDashboard
     * @summary Replace an existing Dashboard
     * @request PUT:/{username}/dashboards/{id}
     * @secure
     */
    replaceDashboard: (
      username: string,
      id: string,
      dashboard: { description?: string; key?: string; name?: string },
      params: RequestParams = {},
    ) =>
      this.request<Dashboard, void>({
        path: `/${username}/dashboards/${id}`,
        method: "PUT",
        body: dashboard,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description The Feeds endpoint returns information about the user's feeds. The response includes the latest value of each feed, and other metadata about each feed.
     *
     * @tags Feeds
     * @name AllFeeds
     * @summary All feeds for current user
     * @request GET:/{username}/feeds
     * @secure
     */
    allFeeds: (username: string, params: RequestParams = {}) =>
      this.request<Feed[], void>({
        path: `/${username}/feeds`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Feeds
     * @name CreateFeed
     * @summary Create a new Feed
     * @request POST:/{username}/feeds
     * @secure
     */
    createFeed: (username: string, feed: Feed, query?: { group_key?: string }, params: RequestParams = {}) =>
      this.request<Feed, void>({
        path: `/${username}/feeds`,
        method: "POST",
        query: query,
        body: feed,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Feeds
     * @name DestroyFeed
     * @summary Delete an existing Feed
     * @request DELETE:/{username}/feeds/{feed_key}
     * @secure
     */
    destroyFeed: (username: string, feedKey: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/${username}/feeds/${feedKey}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Returns feed based on the feed key
     *
     * @tags Feeds
     * @name GetFeed
     * @summary Get feed by feed key
     * @request GET:/{username}/feeds/{feed_key}
     * @secure
     */
    getFeed: (username: string, feedKey: string, params: RequestParams = {}) =>
      this.request<Feed, void>({
        path: `/${username}/feeds/${feedKey}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Feeds
     * @name UpdateFeed
     * @summary Update properties of an existing Feed
     * @request PATCH:/{username}/feeds/{feed_key}
     * @secure
     */
    updateFeed: (
      username: string,
      feedKey: string,
      feed: { description?: string; key?: string; license?: string; name?: string },
      params: RequestParams = {},
    ) =>
      this.request<Feed, void>({
        path: `/${username}/feeds/${feedKey}`,
        method: "PATCH",
        body: feed,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Feeds
     * @name ReplaceFeed
     * @summary Replace an existing Feed
     * @request PUT:/{username}/feeds/{feed_key}
     * @secure
     */
    replaceFeed: (
      username: string,
      feedKey: string,
      feed: { description?: string; key?: string; license?: string; name?: string },
      params: RequestParams = {},
    ) =>
      this.request<Feed, void>({
        path: `/${username}/feeds/${feedKey}`,
        method: "PUT",
        body: feed,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Data
     * @name AllData
     * @summary Get all data for the given feed
     * @request GET:/{username}/feeds/{feed_key}/data
     * @secure
     */
    allData: (
      username: string,
      feedKey: string,
      query?: { start_time?: string; end_time?: string; limit?: number; include?: string },
      params: RequestParams = {},
    ) =>
      this.request<DataResponse[], void>({
        path: `/${username}/feeds/${feedKey}/data`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Create new data records on the given feed. **NOTE:** when feed history is on, data `value` size is limited to 1KB, when feed history is turned off data value size is limited to 100KB.
     *
     * @tags Data
     * @name CreateData
     * @summary Create new Data
     * @request POST:/{username}/feeds/{feed_key}/data
     * @secure
     */
    createData: (
      username: string,
      feedKey: string,
      datum: { created_at?: string; ele?: string; epoch?: number; lat?: string; lon?: string; value?: string },
      params: RequestParams = {},
    ) =>
      this.request<Data, void>({
        path: `/${username}/feeds/${feedKey}/data`,
        method: "POST",
        body: datum,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Data
     * @name BatchCreateData
     * @summary Create multiple new Data records
     * @request POST:/{username}/feeds/{feed_key}/data/batch
     * @secure
     */
    batchCreateData: (username: string, feedKey: string, data: Data, params: RequestParams = {}) =>
      this.request<DataResponse[], void>({
        path: `/${username}/feeds/${feedKey}/data/batch`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description The Chart API is what we use on io.adafruit.com to populate charts over varying timespans with a consistent number of data points. The maximum number of points returned is 480. This API works by aggregating slices of time into a single value by averaging. All time-based parameters are optional, if none are given it will default to 1 hour at the finest-grained resolution possible.
     *
     * @tags Data
     * @name ChartData
     * @summary Chart data for current feed
     * @request GET:/{username}/feeds/{feed_key}/data/chart
     * @secure
     */
    chartData: (
      username: string,
      feedKey: string,
      query?: { start_time?: string; end_time?: string; resolution?: number; hours?: number },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          columns?: string[];
          data?: string[][];
          feed?: { id?: number; key?: string; name?: string };
          parameters?: object;
        },
        void
      >({
        path: `/${username}/feeds/${feedKey}/data/chart`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get the oldest data point in the feed. This request sets the queue pointer to the beginning of the feed.
     *
     * @tags Data
     * @name FirstData
     * @summary First Data in Queue
     * @request GET:/{username}/feeds/{feed_key}/data/first
     * @secure
     */
    firstData: (username: string, feedKey: string, query?: { include?: string }, params: RequestParams = {}) =>
      this.request<DataResponse, void>({
        path: `/${username}/feeds/${feedKey}/data/first`,
        method: "GET",
        query: query,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get the most recent data point in the feed. This request sets the queue pointer to the end of the feed.
     *
     * @tags Data
     * @name LastData
     * @summary Last Data in Queue
     * @request GET:/{username}/feeds/{feed_key}/data/last
     * @secure
     */
    lastData: (username: string, feedKey: string, query?: { include?: string }, params: RequestParams = {}) =>
      this.request<DataResponse, void>({
        path: `/${username}/feeds/${feedKey}/data/last`,
        method: "GET",
        query: query,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get the next newest data point in the feed. If queue processing hasn't been started, the first data point in the feed will be returned.
     *
     * @tags Data
     * @name NextData
     * @summary Next Data in Queue
     * @request GET:/{username}/feeds/{feed_key}/data/next
     * @secure
     */
    nextData: (username: string, feedKey: string, query?: { include?: string }, params: RequestParams = {}) =>
      this.request<DataResponse, void>({
        path: `/${username}/feeds/${feedKey}/data/next`,
        method: "GET",
        query: query,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get the previously processed data point in the feed. NOTE: this method doesn't move the processing queue pointer.
     *
     * @tags Data
     * @name PreviousData
     * @summary Previous Data in Queue
     * @request GET:/{username}/feeds/{feed_key}/data/previous
     * @secure
     */
    previousData: (username: string, feedKey: string, query?: { include?: string }, params: RequestParams = {}) =>
      this.request<DataResponse, void>({
        path: `/${username}/feeds/${feedKey}/data/previous`,
        method: "GET",
        query: query,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get the most recent data point in the feed in an MQTT compatible CSV format: `value,lat,lon,ele`
     *
     * @tags Data
     * @name RetainData
     * @summary Last Data in MQTT CSV format
     * @request GET:/{username}/feeds/{feed_key}/data/retain
     * @secure
     */
    retainData: (username: string, feedKey: string, params: RequestParams = {}) =>
      this.request<string, void>({
        path: `/${username}/feeds/${feedKey}/data/retain`,
        method: "GET",
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Data
     * @name DestroyData
     * @summary Delete existing Data
     * @request DELETE:/{username}/feeds/{feed_key}/data/{id}
     * @secure
     */
    destroyData: (username: string, feedKey: string, id: string, params: RequestParams = {}) =>
      this.request<string, void>({
        path: `/${username}/feeds/${feedKey}/data/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Data
     * @name GetData
     * @summary Returns data based on feed key
     * @request GET:/{username}/feeds/{feed_key}/data/{id}
     * @secure
     */
    getData: (
      username: string,
      feedKey: string,
      id: string,
      query?: { include?: string },
      params: RequestParams = {},
    ) =>
      this.request<DataResponse, void>({
        path: `/${username}/feeds/${feedKey}/data/${id}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Data
     * @name UpdateData
     * @summary Update properties of existing Data
     * @request PATCH:/{username}/feeds/{feed_key}/data/{id}
     * @secure
     */
    updateData: (
      username: string,
      feedKey: string,
      id: string,
      datum: { created_at?: string; ele?: string; epoch?: number; lat?: string; lon?: string; value?: string },
      params: RequestParams = {},
    ) =>
      this.request<DataResponse, void>({
        path: `/${username}/feeds/${feedKey}/data/${id}`,
        method: "PATCH",
        body: datum,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Data
     * @name ReplaceData
     * @summary Replace existing Data
     * @request PUT:/{username}/feeds/{feed_key}/data/{id}
     * @secure
     */
    replaceData: (
      username: string,
      feedKey: string,
      id: string,
      datum: { created_at?: string; ele?: string; epoch?: number; lat?: string; lon?: string; value?: string },
      params: RequestParams = {},
    ) =>
      this.request<DataResponse, void>({
        path: `/${username}/feeds/${feedKey}/data/${id}`,
        method: "PUT",
        body: datum,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns more detailed feed record based on the feed key
     *
     * @tags Feeds
     * @name GetFeedDetails
     * @summary Get detailed feed by feed key
     * @request GET:/{username}/feeds/{feed_key}/details
     * @secure
     */
    getFeedDetails: (username: string, feedKey: string, params: RequestParams = {}) =>
      this.request<Feed, void>({
        path: `/${username}/feeds/${feedKey}/details`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description The Groups endpoint returns information about the user's groups. The response includes the latest value of each feed in the group, and other metadata about the group.
     *
     * @tags Groups
     * @name AllGroups
     * @summary All groups for current user
     * @request GET:/{username}/groups
     * @secure
     */
    allGroups: (username: string, params: RequestParams = {}) =>
      this.request<Group[], void>({
        path: `/${username}/groups`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Groups
     * @name CreateGroup
     * @summary Create a new Group
     * @request POST:/{username}/groups
     * @secure
     */
    createGroup: (username: string, group: Group, params: RequestParams = {}) =>
      this.request<Group, void>({
        path: `/${username}/groups`,
        method: "POST",
        body: group,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Groups
     * @name DestroyGroup
     * @summary Delete an existing Group
     * @request DELETE:/{username}/groups/{group_key}
     * @secure
     */
    destroyGroup: (username: string, groupKey: string, params: RequestParams = {}) =>
      this.request<string, void>({
        path: `/${username}/groups/${groupKey}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Groups
     * @name GetGroup
     * @summary Returns Group based on ID
     * @request GET:/{username}/groups/{group_key}
     * @secure
     */
    getGroup: (username: string, groupKey: string, params: RequestParams = {}) =>
      this.request<Group, void>({
        path: `/${username}/groups/${groupKey}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Groups
     * @name UpdateGroup
     * @summary Update properties of an existing Group
     * @request PATCH:/{username}/groups/{group_key}
     * @secure
     */
    updateGroup: (
      username: string,
      groupKey: string,
      group: { description?: string; key?: string; name?: string },
      params: RequestParams = {},
    ) =>
      this.request<Group, void>({
        path: `/${username}/groups/${groupKey}`,
        method: "PATCH",
        body: group,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Groups
     * @name ReplaceGroup
     * @summary Replace an existing Group
     * @request PUT:/{username}/groups/{group_key}
     * @secure
     */
    replaceGroup: (
      username: string,
      groupKey: string,
      group: { description?: string; key?: string; name?: string },
      params: RequestParams = {},
    ) =>
      this.request<Group, void>({
        path: `/${username}/groups/${groupKey}`,
        method: "PUT",
        body: group,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Groups, Feeds
     * @name AddFeedToGroup
     * @summary Add an existing Feed to a Group
     * @request POST:/{username}/groups/{group_key}/add
     * @secure
     */
    addFeedToGroup: (groupKey: string, username: string, query?: { feed_key?: string }, params: RequestParams = {}) =>
      this.request<Group, void>({
        path: `/${username}/groups/${groupKey}/add`,
        method: "POST",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Data
     * @name CreateGroupData
     * @summary Create new data for multiple feeds in a group
     * @request POST:/{username}/groups/{group_key}/data
     * @secure
     */
    createGroupData: (
      username: string,
      groupKey: string,
      group_feed_data: {
        created_at?: string;
        feeds: { key: string; value: string }[];
        location?: { ele?: number; lat: number; lon: number };
      },
      params: RequestParams = {},
    ) =>
      this.request<DataResponse[], void>({
        path: `/${username}/groups/${groupKey}/data`,
        method: "POST",
        body: group_feed_data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description The Group Feeds endpoint returns information about the user's feeds. The response includes the latest value of each feed, and other metadata about each feed, but only for feeds within the given group.
     *
     * @tags Groups, Feeds
     * @name AllGroupFeeds
     * @summary All feeds for current user in a given group
     * @request GET:/{username}/groups/{group_key}/feeds
     * @secure
     */
    allGroupFeeds: (groupKey: string, username: string, params: RequestParams = {}) =>
      this.request<Feed[], void>({
        path: `/${username}/groups/${groupKey}/feeds`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Feeds
     * @name CreateGroupFeed
     * @summary Create a new Feed in a Group
     * @request POST:/{username}/groups/{group_key}/feeds
     * @secure
     */
    createGroupFeed: (
      username: string,
      groupKey: string,
      feed: { description?: string; key?: string; license?: string; name?: string },
      params: RequestParams = {},
    ) =>
      this.request<Feed, void>({
        path: `/${username}/groups/${groupKey}/feeds`,
        method: "POST",
        body: feed,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Data
     * @name AllGroupFeedData
     * @summary All data for current feed in a specific group
     * @request GET:/{username}/groups/{group_key}/feeds/{feed_key}/data
     * @secure
     */
    allGroupFeedData: (
      username: string,
      groupKey: string,
      feedKey: string,
      query?: { start_time?: string; end_time?: string; limit?: number },
      params: RequestParams = {},
    ) =>
      this.request<DataResponse[], void>({
        path: `/${username}/groups/${groupKey}/feeds/${feedKey}/data`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Data
     * @name CreateGroupFeedData
     * @summary Create new Data in a feed belonging to a particular group
     * @request POST:/{username}/groups/{group_key}/feeds/{feed_key}/data
     * @secure
     */
    createGroupFeedData: (
      username: string,
      groupKey: string,
      feedKey: string,
      datum: { created_at?: string; ele?: string; epoch?: number; lat?: string; lon?: string; value?: string },
      params: RequestParams = {},
    ) =>
      this.request<DataResponse, void>({
        path: `/${username}/groups/${groupKey}/feeds/${feedKey}/data`,
        method: "POST",
        body: datum,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Data
     * @name BatchCreateGroupFeedData
     * @summary Create multiple new Data records in a feed belonging to a particular group
     * @request POST:/{username}/groups/{group_key}/feeds/{feed_key}/data/batch
     * @secure
     */
    batchCreateGroupFeedData: (
      username: string,
      groupKey: string,
      feedKey: string,
      data: { created_at?: string; ele?: string; epoch?: number; lat?: string; lon?: string; value?: string }[],
      params: RequestParams = {},
    ) =>
      this.request<DataResponse[], void>({
        path: `/${username}/groups/${groupKey}/feeds/${feedKey}/data/batch`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Groups, Feeds
     * @name RemoveFeedFromGroup
     * @summary Remove a Feed from a Group
     * @request POST:/{username}/groups/{group_key}/remove
     * @secure
     */
    removeFeedFromGroup: (
      groupKey: string,
      username: string,
      query?: { feed_key?: string },
      params: RequestParams = {},
    ) =>
      this.request<Group, void>({
        path: `/${username}/groups/${groupKey}/remove`,
        method: "POST",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name GetCurrentUserThrottle
     * @summary Get the user's data rate limit and current activity level.
     * @request GET:/{username}/throttle
     * @secure
     */
    getCurrentUserThrottle: (username: string, params: RequestParams = {}) =>
      this.request<{ active_data_rate?: number; data_rate_limit?: number }, void>({
        path: `/${username}/throttle`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description The Tokens endpoint returns information about the user's tokens.
     *
     * @tags Tokens
     * @name AllTokens
     * @summary All tokens for current user
     * @request GET:/{username}/tokens
     * @secure
     */
    allTokens: (username: string, params: RequestParams = {}) =>
      this.request<Token[], void>({
        path: `/${username}/tokens`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tokens
     * @name CreateToken
     * @summary Create a new Token
     * @request POST:/{username}/tokens
     * @secure
     */
    createToken: (username: string, token: Token, params: RequestParams = {}) =>
      this.request<Token, void>({
        path: `/${username}/tokens`,
        method: "POST",
        body: token,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tokens
     * @name DestroyToken
     * @summary Delete an existing Token
     * @request DELETE:/{username}/tokens/{id}
     * @secure
     */
    destroyToken: (username: string, id: string, params: RequestParams = {}) =>
      this.request<string, void>({
        path: `/${username}/tokens/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tokens
     * @name GetToken
     * @summary Returns Token based on ID
     * @request GET:/{username}/tokens/{id}
     * @secure
     */
    getToken: (username: string, id: string, params: RequestParams = {}) =>
      this.request<Token, void>({
        path: `/${username}/tokens/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tokens
     * @name UpdateToken
     * @summary Update properties of an existing Token
     * @request PATCH:/{username}/tokens/{id}
     * @secure
     */
    updateToken: (username: string, id: string, token: { token?: string }, params: RequestParams = {}) =>
      this.request<Token, void>({
        path: `/${username}/tokens/${id}`,
        method: "PATCH",
        body: token,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tokens
     * @name ReplaceToken
     * @summary Replace an existing Token
     * @request PUT:/{username}/tokens/{id}
     * @secure
     */
    replaceToken: (username: string, id: string, token: { token?: string }, params: RequestParams = {}) =>
      this.request<Token, void>({
        path: `/${username}/tokens/${id}`,
        method: "PUT",
        body: token,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description The Triggers endpoint returns information about the user's triggers.
     *
     * @tags Triggers
     * @name AllTriggers
     * @summary All triggers for current user
     * @request GET:/{username}/triggers
     * @secure
     */
    allTriggers: (username: string, params: RequestParams = {}) =>
      this.request<Trigger[], void>({
        path: `/${username}/triggers`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Triggers
     * @name CreateTrigger
     * @summary Create a new Trigger
     * @request POST:/{username}/triggers
     * @secure
     */
    createTrigger: (username: string, trigger: Trigger, params: RequestParams = {}) =>
      this.request<Trigger, void>({
        path: `/${username}/triggers`,
        method: "POST",
        body: trigger,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Triggers
     * @name DestroyTrigger
     * @summary Delete an existing Trigger
     * @request DELETE:/{username}/triggers/{id}
     * @secure
     */
    destroyTrigger: (username: string, id: string, params: RequestParams = {}) =>
      this.request<string, void>({
        path: `/${username}/triggers/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Triggers
     * @name GetTrigger
     * @summary Returns Trigger based on ID
     * @request GET:/{username}/triggers/{id}
     * @secure
     */
    getTrigger: (username: string, id: string, params: RequestParams = {}) =>
      this.request<Trigger, void>({
        path: `/${username}/triggers/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Triggers
     * @name UpdateTrigger
     * @summary Update properties of an existing Trigger
     * @request PATCH:/{username}/triggers/{id}
     * @secure
     */
    updateTrigger: (username: string, id: string, trigger: { name?: string }, params: RequestParams = {}) =>
      this.request<Trigger, void>({
        path: `/${username}/triggers/${id}`,
        method: "PATCH",
        body: trigger,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Triggers
     * @name ReplaceTrigger
     * @summary Replace an existing Trigger
     * @request PUT:/{username}/triggers/{id}
     * @secure
     */
    replaceTrigger: (username: string, id: string, trigger: { name?: string }, params: RequestParams = {}) =>
      this.request<Trigger, void>({
        path: `/${username}/triggers/${id}`,
        method: "PUT",
        body: trigger,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description The Permissions endpoint returns information about the user's permissions.
     *
     * @tags Permissions
     * @name AllPermissions
     * @summary All permissions for current user and type
     * @request GET:/{username}/{type}/{type_id}/acl
     * @secure
     */
    allPermissions: (username: string, type: string, typeId: string, params: RequestParams = {}) =>
      this.request<Permission[], void>({
        path: `/${username}/${type}/${typeId}/acl`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Permissions
     * @name CreatePermission
     * @summary Create a new Permission
     * @request POST:/{username}/{type}/{type_id}/acl
     * @secure
     */
    createPermission: (
      username: string,
      type: string,
      typeId: string,
      permission: Permission,
      params: RequestParams = {},
    ) =>
      this.request<Permission, void>({
        path: `/${username}/${type}/${typeId}/acl`,
        method: "POST",
        body: permission,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Permissions
     * @name DestroyPermission
     * @summary Delete an existing Permission
     * @request DELETE:/{username}/{type}/{type_id}/acl/{id}
     * @secure
     */
    destroyPermission: (username: string, type: string, typeId: string, id: string, params: RequestParams = {}) =>
      this.request<string, void>({
        path: `/${username}/${type}/${typeId}/acl/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Permissions
     * @name GetPermission
     * @summary Returns Permission based on ID
     * @request GET:/{username}/{type}/{type_id}/acl/{id}
     * @secure
     */
    getPermission: (username: string, type: string, typeId: string, id: string, params: RequestParams = {}) =>
      this.request<Permission, void>({
        path: `/${username}/${type}/${typeId}/acl/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Permissions
     * @name UpdatePermission
     * @summary Update properties of an existing Permission
     * @request PATCH:/{username}/{type}/{type_id}/acl/{id}
     * @secure
     */
    updatePermission: (
      username: string,
      type: string,
      typeId: string,
      id: string,
      permission: {
        mode?: "r" | "w" | "rw";
        scope?: "secret" | "public" | "user" | "organization";
        scope_value?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Permission, void>({
        path: `/${username}/${type}/${typeId}/acl/${id}`,
        method: "PATCH",
        body: permission,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Permissions
     * @name ReplacePermission
     * @summary Replace an existing Permission
     * @request PUT:/{username}/{type}/{type_id}/acl/{id}
     * @secure
     */
    replacePermission: (
      username: string,
      type: string,
      typeId: string,
      id: string,
      permission: {
        mode?: "r" | "w" | "rw";
        scope?: "secret" | "public" | "user" | "organization";
        scope_value?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Permission, void>({
        path: `/${username}/${type}/${typeId}/acl/${id}`,
        method: "PUT",
        body: permission,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
