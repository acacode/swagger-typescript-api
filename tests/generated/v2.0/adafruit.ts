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

export interface Activity {
  action?: string;
  created_at?: string;
  data?: object;
  id?: number;
  model?: string;
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
  created_at?: string;
  id?: number;
  name?: string;
  time_zone?: string;
  updated_at?: string;
  username?: string;
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
  data: D | null;
  error: E | null;
}

enum BodyType {
  Json,
  FormData,
}

class HttpClient<SecurityDataType> {
  public baseUrl: string = "https://io.adafruit.com/api/v2";
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
    const r = response.clone() as HttpResponse<T, E>;
    r.data = null;
    r.error = null;

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
 * @title Adafruit IO
 * @version 2.0.0
 * @baseUrl https://io.adafruit.com/api/v2
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
export class Api<SecurityDataType = any> extends HttpClient<SecurityDataType> {
  user = {
    /**
     * No description
     *
     * @tags Users
     * @name currentUser
     * @summary Get information about the current user
     * @request GET:/user
     * @secure
     */
    currentUser: (params?: RequestParams) => this.request<User, any>(`/user`, "GET", params, null, BodyType.Json, true),
  };
  webhooks = {
    /**
     * No description
     *
     * @tags Webhooks, Data
     * @name createWebhookFeedData
     * @summary Send data to a feed via webhook URL.
     * @request POST:/webhooks/feed/:token
     * @secure
     */
    createWebhookFeedData: (payload: { value?: string }, params?: RequestParams) =>
      this.request<Data, any>(`/webhooks/feed/:token`, "POST", params, payload, BodyType.Json, true),

    /**
     * @description The raw data webhook receiver accepts POST requests and stores the raw request body on your feed. This is useful when you don't have control of the webhook sender. If feed history is turned on, payloads will be truncated at 1024 bytes. If feed history is turned off, payloads will be truncated at 100KB.
     *
     * @tags Webhooks, Data
     * @name createRawWebhookFeedData
     * @summary Send arbitrary data to a feed via webhook URL.
     * @request POST:/webhooks/feed/:token/raw
     * @secure
     */
    createRawWebhookFeedData: (params?: RequestParams) =>
      this.request<Data, any>(`/webhooks/feed/:token/raw`, "POST", params, null, BodyType.Json, true),
  };
  username = {
    /**
     * @description Delete all your activities.
     *
     * @tags Activities
     * @name destroyActivities
     * @summary All activities for current user
     * @request DELETE:/{username}/activities
     * @secure
     */
    destroyActivities: (username: string, params?: RequestParams) =>
      this.request<any, any>(`/${username}/activities`, "DELETE", params, null, BodyType.Json, true),

    /**
     * @description The Activities endpoint returns information about the user's activities.
     *
     * @tags Activities
     * @name allActivities
     * @summary All activities for current user
     * @request GET:/{username}/activities
     * @secure
     */
    allActivities: (
      username: string,
      query?: { start_time?: string; end_time?: string; limit?: number },
      params?: RequestParams,
    ) =>
      this.request<Activity[], any>(
        `/${username}/activities${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @description The Activities endpoint returns information about the user's activities.
     *
     * @tags Activities
     * @name getActivity
     * @summary Get activities by type for current user
     * @request GET:/{username}/activities/{type}
     * @secure
     */
    getActivity: (
      username: string,
      type: string,
      query?: { start_time?: string; end_time?: string; limit?: number },
      params?: RequestParams,
    ) =>
      this.request<Activity[], any>(
        `/${username}/activities/${type}${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @description The Dashboards endpoint returns information about the user's dashboards.
     *
     * @tags Dashboards
     * @name allDashboards
     * @summary All dashboards for current user
     * @request GET:/{username}/dashboards
     * @secure
     */
    allDashboards: (username: string, params?: RequestParams) =>
      this.request<Dashboard[], any>(`/${username}/dashboards`, "GET", params, null, BodyType.Json, true),

    /**
     * No description
     *
     * @tags Dashboards
     * @name createDashboard
     * @summary Create a new Dashboard
     * @request POST:/{username}/dashboards
     * @secure
     */
    createDashboard: (username: string, dashboard: Dashboard, params?: RequestParams) =>
      this.request<Dashboard, any>(`/${username}/dashboards`, "POST", params, dashboard, BodyType.Json, true),

    /**
     * @description The Blocks endpoint returns information about the user's blocks.
     *
     * @tags Blocks
     * @name allBlocks
     * @summary All blocks for current user
     * @request GET:/{username}/dashboards/{dashboard_id}/blocks
     * @secure
     */
    allBlocks: (username: string, dashboard_id: string, params?: RequestParams) =>
      this.request<Block[], any>(
        `/${username}/dashboards/${dashboard_id}/blocks`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * No description
     *
     * @tags Blocks
     * @name createBlock
     * @summary Create a new Block
     * @request POST:/{username}/dashboards/{dashboard_id}/blocks
     * @secure
     */
    createBlock: (username: string, dashboard_id: string, block: Block, params?: RequestParams) =>
      this.request<Block, any>(
        `/${username}/dashboards/${dashboard_id}/blocks`,
        "POST",
        params,
        block,
        BodyType.Json,
        true,
      ),

    /**
     * No description
     *
     * @tags Blocks
     * @name destroyBlock
     * @summary Delete an existing Block
     * @request DELETE:/{username}/dashboards/{dashboard_id}/blocks/{id}
     * @secure
     */
    destroyBlock: (username: string, dashboard_id: string, id: string, params?: RequestParams) =>
      this.request<string, any>(
        `/${username}/dashboards/${dashboard_id}/blocks/${id}`,
        "DELETE",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * No description
     *
     * @tags Blocks
     * @name getBlock
     * @summary Returns Block based on ID
     * @request GET:/{username}/dashboards/{dashboard_id}/blocks/{id}
     * @secure
     */
    getBlock: (username: string, dashboard_id: string, id: string, params?: RequestParams) =>
      this.request<Block, any>(
        `/${username}/dashboards/${dashboard_id}/blocks/${id}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * No description
     *
     * @tags Blocks
     * @name updateBlock
     * @summary Update properties of an existing Block
     * @request PATCH:/{username}/dashboards/{dashboard_id}/blocks/{id}
     * @secure
     */
    updateBlock: (
      username: string,
      dashboard_id: string,
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
      params?: RequestParams,
    ) =>
      this.request<Block, any>(
        `/${username}/dashboards/${dashboard_id}/blocks/${id}`,
        "PATCH",
        params,
        block,
        BodyType.Json,
        true,
      ),

    /**
     * No description
     *
     * @tags Blocks
     * @name replaceBlock
     * @summary Replace an existing Block
     * @request PUT:/{username}/dashboards/{dashboard_id}/blocks/{id}
     * @secure
     */
    replaceBlock: (
      username: string,
      dashboard_id: string,
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
      params?: RequestParams,
    ) =>
      this.request<Block, any>(
        `/${username}/dashboards/${dashboard_id}/blocks/${id}`,
        "PUT",
        params,
        block,
        BodyType.Json,
        true,
      ),

    /**
     * No description
     *
     * @tags Dashboards
     * @name destroyDashboard
     * @summary Delete an existing Dashboard
     * @request DELETE:/{username}/dashboards/{id}
     * @secure
     */
    destroyDashboard: (username: string, id: string, params?: RequestParams) =>
      this.request<string, any>(`/${username}/dashboards/${id}`, "DELETE", params, null, BodyType.Json, true),

    /**
     * No description
     *
     * @tags Dashboards
     * @name getDashboard
     * @summary Returns Dashboard based on ID
     * @request GET:/{username}/dashboards/{id}
     * @secure
     */
    getDashboard: (username: string, id: string, params?: RequestParams) =>
      this.request<Dashboard, any>(`/${username}/dashboards/${id}`, "GET", params, null, BodyType.Json, true),

    /**
     * No description
     *
     * @tags Dashboards
     * @name updateDashboard
     * @summary Update properties of an existing Dashboard
     * @request PATCH:/{username}/dashboards/{id}
     * @secure
     */
    updateDashboard: (
      username: string,
      id: string,
      dashboard: { description?: string; key?: string; name?: string },
      params?: RequestParams,
    ) => this.request<Dashboard, any>(`/${username}/dashboards/${id}`, "PATCH", params, dashboard, BodyType.Json, true),

    /**
     * No description
     *
     * @tags Dashboards
     * @name replaceDashboard
     * @summary Replace an existing Dashboard
     * @request PUT:/{username}/dashboards/{id}
     * @secure
     */
    replaceDashboard: (
      username: string,
      id: string,
      dashboard: { description?: string; key?: string; name?: string },
      params?: RequestParams,
    ) => this.request<Dashboard, any>(`/${username}/dashboards/${id}`, "PUT", params, dashboard, BodyType.Json, true),

    /**
     * @description The Feeds endpoint returns information about the user's feeds. The response includes the latest value of each feed, and other metadata about each feed.
     *
     * @tags Feeds
     * @name allFeeds
     * @summary All feeds for current user
     * @request GET:/{username}/feeds
     * @secure
     */
    allFeeds: (username: string, params?: RequestParams) =>
      this.request<Feed[], any>(`/${username}/feeds`, "GET", params, null, BodyType.Json, true),

    /**
     * No description
     *
     * @tags Feeds
     * @name createFeed
     * @summary Create a new Feed
     * @request POST:/{username}/feeds
     * @secure
     */
    createFeed: (username: string, feed: Feed, query?: { group_key?: string }, params?: RequestParams) =>
      this.request<Feed, any>(
        `/${username}/feeds${this.addQueryParams(query)}`,
        "POST",
        params,
        feed,
        BodyType.Json,
        true,
      ),

    /**
     * No description
     *
     * @tags Feeds
     * @name destroyFeed
     * @summary Delete an existing Feed
     * @request DELETE:/{username}/feeds/{feed_key}
     * @secure
     */
    destroyFeed: (username: string, feed_key: string, params?: RequestParams) =>
      this.request<any, any>(`/${username}/feeds/${feed_key}`, "DELETE", params, null, BodyType.Json, true),

    /**
     * @description Returns feed based on the feed key
     *
     * @tags Feeds
     * @name getFeed
     * @summary Get feed by feed key
     * @request GET:/{username}/feeds/{feed_key}
     * @secure
     */
    getFeed: (username: string, feed_key: string, params?: RequestParams) =>
      this.request<Feed, any>(`/${username}/feeds/${feed_key}`, "GET", params, null, BodyType.Json, true),

    /**
     * No description
     *
     * @tags Feeds
     * @name updateFeed
     * @summary Update properties of an existing Feed
     * @request PATCH:/{username}/feeds/{feed_key}
     * @secure
     */
    updateFeed: (
      username: string,
      feed_key: string,
      feed: { description?: string; key?: string; license?: string; name?: string },
      params?: RequestParams,
    ) => this.request<Feed, any>(`/${username}/feeds/${feed_key}`, "PATCH", params, feed, BodyType.Json, true),

    /**
     * No description
     *
     * @tags Feeds
     * @name replaceFeed
     * @summary Replace an existing Feed
     * @request PUT:/{username}/feeds/{feed_key}
     * @secure
     */
    replaceFeed: (
      username: string,
      feed_key: string,
      feed: { description?: string; key?: string; license?: string; name?: string },
      params?: RequestParams,
    ) => this.request<Feed, any>(`/${username}/feeds/${feed_key}`, "PUT", params, feed, BodyType.Json, true),

    /**
     * No description
     *
     * @tags Data
     * @name allData
     * @summary Get all data for the given feed
     * @request GET:/{username}/feeds/{feed_key}/data
     * @secure
     */
    allData: (
      username: string,
      feed_key: string,
      query?: { start_time?: string; end_time?: string; limit?: number; include?: string },
      params?: RequestParams,
    ) =>
      this.request<DataResponse[], any>(
        `/${username}/feeds/${feed_key}/data${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @description Create new data records on the given feed. **NOTE:** when feed history is on, data `value` size is limited to 1KB, when feed history is turned off data value size is limited to 100KB.
     *
     * @tags Data
     * @name createData
     * @summary Create new Data
     * @request POST:/{username}/feeds/{feed_key}/data
     * @secure
     */
    createData: (
      username: string,
      feed_key: string,
      datum: { created_at?: string; ele?: string; epoch?: number; lat?: string; lon?: string; value?: string },
      params?: RequestParams,
    ) => this.request<Data, any>(`/${username}/feeds/${feed_key}/data`, "POST", params, datum, BodyType.Json, true),

    /**
     * No description
     *
     * @tags Data
     * @name batchCreateData
     * @summary Create multiple new Data records
     * @request POST:/{username}/feeds/{feed_key}/data/batch
     * @secure
     */
    batchCreateData: (username: string, feed_key: string, data: Data, params?: RequestParams) =>
      this.request<DataResponse[], any>(
        `/${username}/feeds/${feed_key}/data/batch`,
        "POST",
        params,
        data,
        BodyType.Json,
        true,
      ),

    /**
     * @description The Chart API is what we use on io.adafruit.com to populate charts over varying timespans with a consistent number of data points. The maximum number of points returned is 480. This API works by aggregating slices of time into a single value by averaging. All time-based parameters are optional, if none are given it will default to 1 hour at the finest-grained resolution possible.
     *
     * @tags Data
     * @name chartData
     * @summary Chart data for current feed
     * @request GET:/{username}/feeds/{feed_key}/data/chart
     * @secure
     */
    chartData: (
      username: string,
      feed_key: string,
      query?: { start_time?: string; end_time?: string; resolution?: number; hours?: number },
      params?: RequestParams,
    ) =>
      this.request<
        {
          columns?: string[];
          data?: string[][];
          feed?: { id?: number; key?: string; name?: string };
          parameters?: object;
        },
        any
      >(
        `/${username}/feeds/${feed_key}/data/chart${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @description Get the oldest data point in the feed. This request sets the queue pointer to the beginning of the feed.
     *
     * @tags Data
     * @name firstData
     * @summary First Data in Queue
     * @request GET:/{username}/feeds/{feed_key}/data/first
     * @secure
     */
    firstData: (username: string, feed_key: string, query?: { include?: string }, params?: RequestParams) =>
      this.request<DataResponse, any>(
        `/${username}/feeds/${feed_key}/data/first${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @description Get the most recent data point in the feed. This request sets the queue pointer to the end of the feed.
     *
     * @tags Data
     * @name lastData
     * @summary Last Data in Queue
     * @request GET:/{username}/feeds/{feed_key}/data/last
     * @secure
     */
    lastData: (username: string, feed_key: string, query?: { include?: string }, params?: RequestParams) =>
      this.request<DataResponse, any>(
        `/${username}/feeds/${feed_key}/data/last${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @description Get the next newest data point in the feed. If queue processing hasn't been started, the first data point in the feed will be returned.
     *
     * @tags Data
     * @name nextData
     * @summary Next Data in Queue
     * @request GET:/{username}/feeds/{feed_key}/data/next
     * @secure
     */
    nextData: (username: string, feed_key: string, query?: { include?: string }, params?: RequestParams) =>
      this.request<DataResponse, any>(
        `/${username}/feeds/${feed_key}/data/next${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @description Get the previously processed data point in the feed. NOTE: this method doesn't move the processing queue pointer.
     *
     * @tags Data
     * @name previousData
     * @summary Previous Data in Queue
     * @request GET:/{username}/feeds/{feed_key}/data/previous
     * @secure
     */
    previousData: (username: string, feed_key: string, query?: { include?: string }, params?: RequestParams) =>
      this.request<DataResponse, any>(
        `/${username}/feeds/${feed_key}/data/previous${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @description Get the most recent data point in the feed in an MQTT compatible CSV format: `value,lat,lon,ele`
     *
     * @tags Data
     * @name retainData
     * @summary Last Data in MQTT CSV format
     * @request GET:/{username}/feeds/{feed_key}/data/retain
     * @secure
     */
    retainData: (username: string, feed_key: string, params?: RequestParams) =>
      this.request<string, any>(`/${username}/feeds/${feed_key}/data/retain`, "GET", params, null, BodyType.Json, true),

    /**
     * No description
     *
     * @tags Data
     * @name destroyData
     * @summary Delete existing Data
     * @request DELETE:/{username}/feeds/{feed_key}/data/{id}
     * @secure
     */
    destroyData: (username: string, feed_key: string, id: string, params?: RequestParams) =>
      this.request<string, any>(
        `/${username}/feeds/${feed_key}/data/${id}`,
        "DELETE",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * No description
     *
     * @tags Data
     * @name getData
     * @summary Returns data based on feed key
     * @request GET:/{username}/feeds/{feed_key}/data/{id}
     * @secure
     */
    getData: (username: string, feed_key: string, id: string, query?: { include?: string }, params?: RequestParams) =>
      this.request<DataResponse, any>(
        `/${username}/feeds/${feed_key}/data/${id}${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * No description
     *
     * @tags Data
     * @name updateData
     * @summary Update properties of existing Data
     * @request PATCH:/{username}/feeds/{feed_key}/data/{id}
     * @secure
     */
    updateData: (
      username: string,
      feed_key: string,
      id: string,
      datum: { created_at?: string; ele?: string; epoch?: number; lat?: string; lon?: string; value?: string },
      params?: RequestParams,
    ) =>
      this.request<DataResponse, any>(
        `/${username}/feeds/${feed_key}/data/${id}`,
        "PATCH",
        params,
        datum,
        BodyType.Json,
        true,
      ),

    /**
     * No description
     *
     * @tags Data
     * @name replaceData
     * @summary Replace existing Data
     * @request PUT:/{username}/feeds/{feed_key}/data/{id}
     * @secure
     */
    replaceData: (
      username: string,
      feed_key: string,
      id: string,
      datum: { created_at?: string; ele?: string; epoch?: number; lat?: string; lon?: string; value?: string },
      params?: RequestParams,
    ) =>
      this.request<DataResponse, any>(
        `/${username}/feeds/${feed_key}/data/${id}`,
        "PUT",
        params,
        datum,
        BodyType.Json,
        true,
      ),

    /**
     * @description Returns more detailed feed record based on the feed key
     *
     * @tags Feeds
     * @name getFeedDetails
     * @summary Get detailed feed by feed key
     * @request GET:/{username}/feeds/{feed_key}/details
     * @secure
     */
    getFeedDetails: (username: string, feed_key: string, params?: RequestParams) =>
      this.request<Feed, any>(`/${username}/feeds/${feed_key}/details`, "GET", params, null, BodyType.Json, true),

    /**
     * @description The Groups endpoint returns information about the user's groups. The response includes the latest value of each feed in the group, and other metadata about the group.
     *
     * @tags Groups
     * @name allGroups
     * @summary All groups for current user
     * @request GET:/{username}/groups
     * @secure
     */
    allGroups: (username: string, params?: RequestParams) =>
      this.request<Group[], any>(`/${username}/groups`, "GET", params, null, BodyType.Json, true),

    /**
     * No description
     *
     * @tags Groups
     * @name createGroup
     * @summary Create a new Group
     * @request POST:/{username}/groups
     * @secure
     */
    createGroup: (username: string, group: Group, params?: RequestParams) =>
      this.request<Group, any>(`/${username}/groups`, "POST", params, group, BodyType.Json, true),

    /**
     * No description
     *
     * @tags Groups
     * @name destroyGroup
     * @summary Delete an existing Group
     * @request DELETE:/{username}/groups/{group_key}
     * @secure
     */
    destroyGroup: (username: string, group_key: string, params?: RequestParams) =>
      this.request<string, any>(`/${username}/groups/${group_key}`, "DELETE", params, null, BodyType.Json, true),

    /**
     * No description
     *
     * @tags Groups
     * @name getGroup
     * @summary Returns Group based on ID
     * @request GET:/{username}/groups/{group_key}
     * @secure
     */
    getGroup: (username: string, group_key: string, params?: RequestParams) =>
      this.request<Group, any>(`/${username}/groups/${group_key}`, "GET", params, null, BodyType.Json, true),

    /**
     * No description
     *
     * @tags Groups
     * @name updateGroup
     * @summary Update properties of an existing Group
     * @request PATCH:/{username}/groups/{group_key}
     * @secure
     */
    updateGroup: (
      username: string,
      group_key: string,
      group: { description?: string; key?: string; name?: string },
      params?: RequestParams,
    ) => this.request<Group, any>(`/${username}/groups/${group_key}`, "PATCH", params, group, BodyType.Json, true),

    /**
     * No description
     *
     * @tags Groups
     * @name replaceGroup
     * @summary Replace an existing Group
     * @request PUT:/{username}/groups/{group_key}
     * @secure
     */
    replaceGroup: (
      username: string,
      group_key: string,
      group: { description?: string; key?: string; name?: string },
      params?: RequestParams,
    ) => this.request<Group, any>(`/${username}/groups/${group_key}`, "PUT", params, group, BodyType.Json, true),

    /**
     * No description
     *
     * @tags Groups, Feeds
     * @name addFeedToGroup
     * @summary Add an existing Feed to a Group
     * @request POST:/{username}/groups/{group_key}/add
     * @secure
     */
    addFeedToGroup: (group_key: string, username: string, query?: { feed_key?: string }, params?: RequestParams) =>
      this.request<Group, any>(
        `/${username}/groups/${group_key}/add${this.addQueryParams(query)}`,
        "POST",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * No description
     *
     * @tags Data
     * @name createGroupData
     * @summary Create new data for multiple feeds in a group
     * @request POST:/{username}/groups/{group_key}/data
     * @secure
     */
    createGroupData: (
      username: string,
      group_key: string,
      group_feed_data: {
        created_at?: string;
        feeds: { key: string; value: string }[];
        location: { ele?: number; lat: number; lon: number };
      },
      params?: RequestParams,
    ) =>
      this.request<DataResponse[], any>(
        `/${username}/groups/${group_key}/data`,
        "POST",
        params,
        group_feed_data,
        BodyType.Json,
        true,
      ),

    /**
     * @description The Group Feeds endpoint returns information about the user's feeds. The response includes the latest value of each feed, and other metadata about each feed, but only for feeds within the given group.
     *
     * @tags Groups, Feeds
     * @name allGroupFeeds
     * @summary All feeds for current user in a given group
     * @request GET:/{username}/groups/{group_key}/feeds
     * @secure
     */
    allGroupFeeds: (group_key: string, username: string, params?: RequestParams) =>
      this.request<Feed[], any>(`/${username}/groups/${group_key}/feeds`, "GET", params, null, BodyType.Json, true),

    /**
     * No description
     *
     * @tags Feeds
     * @name createGroupFeed
     * @summary Create a new Feed in a Group
     * @request POST:/{username}/groups/{group_key}/feeds
     * @secure
     */
    createGroupFeed: (
      username: string,
      group_key: string,
      feed: { description?: string; key?: string; license?: string; name?: string },
      params?: RequestParams,
    ) => this.request<Feed, any>(`/${username}/groups/${group_key}/feeds`, "POST", params, feed, BodyType.Json, true),

    /**
     * No description
     *
     * @tags Data
     * @name allGroupFeedData
     * @summary All data for current feed in a specific group
     * @request GET:/{username}/groups/{group_key}/feeds/{feed_key}/data
     * @secure
     */
    allGroupFeedData: (
      username: string,
      group_key: string,
      feed_key: string,
      query?: { start_time?: string; end_time?: string; limit?: number },
      params?: RequestParams,
    ) =>
      this.request<DataResponse[], any>(
        `/${username}/groups/${group_key}/feeds/${feed_key}/data${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * No description
     *
     * @tags Data
     * @name createGroupFeedData
     * @summary Create new Data in a feed belonging to a particular group
     * @request POST:/{username}/groups/{group_key}/feeds/{feed_key}/data
     * @secure
     */
    createGroupFeedData: (
      username: string,
      group_key: string,
      feed_key: string,
      datum: { created_at?: string; ele?: string; epoch?: number; lat?: string; lon?: string; value?: string },
      params?: RequestParams,
    ) =>
      this.request<DataResponse, any>(
        `/${username}/groups/${group_key}/feeds/${feed_key}/data`,
        "POST",
        params,
        datum,
        BodyType.Json,
        true,
      ),

    /**
     * No description
     *
     * @tags Data
     * @name batchCreateGroupFeedData
     * @summary Create multiple new Data records in a feed belonging to a particular group
     * @request POST:/{username}/groups/{group_key}/feeds/{feed_key}/data/batch
     * @secure
     */
    batchCreateGroupFeedData: (
      username: string,
      group_key: string,
      feed_key: string,
      data: { created_at?: string; ele?: string; epoch?: number; lat?: string; lon?: string; value?: string }[],
      params?: RequestParams,
    ) =>
      this.request<DataResponse[], any>(
        `/${username}/groups/${group_key}/feeds/${feed_key}/data/batch`,
        "POST",
        params,
        data,
        BodyType.Json,
        true,
      ),

    /**
     * No description
     *
     * @tags Groups, Feeds
     * @name removeFeedFromGroup
     * @summary Remove a Feed from a Group
     * @request POST:/{username}/groups/{group_key}/remove
     * @secure
     */
    removeFeedFromGroup: (group_key: string, username: string, query?: { feed_key?: string }, params?: RequestParams) =>
      this.request<Group, any>(
        `/${username}/groups/${group_key}/remove${this.addQueryParams(query)}`,
        "POST",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * No description
     *
     * @tags Users
     * @name getCurrentUserThrottle
     * @summary Get the user's data rate limit and current activity level.
     * @request GET:/{username}/throttle
     * @secure
     */
    getCurrentUserThrottle: (username: string, params?: RequestParams) =>
      this.request<{ active_data_rate?: number; data_rate_limit?: number }, any>(
        `/${username}/throttle`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @description The Tokens endpoint returns information about the user's tokens.
     *
     * @tags Tokens
     * @name allTokens
     * @summary All tokens for current user
     * @request GET:/{username}/tokens
     * @secure
     */
    allTokens: (username: string, params?: RequestParams) =>
      this.request<Token[], any>(`/${username}/tokens`, "GET", params, null, BodyType.Json, true),

    /**
     * No description
     *
     * @tags Tokens
     * @name createToken
     * @summary Create a new Token
     * @request POST:/{username}/tokens
     * @secure
     */
    createToken: (username: string, token: Token, params?: RequestParams) =>
      this.request<Token, any>(`/${username}/tokens`, "POST", params, token, BodyType.Json, true),

    /**
     * No description
     *
     * @tags Tokens
     * @name destroyToken
     * @summary Delete an existing Token
     * @request DELETE:/{username}/tokens/{id}
     * @secure
     */
    destroyToken: (username: string, id: string, params?: RequestParams) =>
      this.request<string, any>(`/${username}/tokens/${id}`, "DELETE", params, null, BodyType.Json, true),

    /**
     * No description
     *
     * @tags Tokens
     * @name getToken
     * @summary Returns Token based on ID
     * @request GET:/{username}/tokens/{id}
     * @secure
     */
    getToken: (username: string, id: string, params?: RequestParams) =>
      this.request<Token, any>(`/${username}/tokens/${id}`, "GET", params, null, BodyType.Json, true),

    /**
     * No description
     *
     * @tags Tokens
     * @name updateToken
     * @summary Update properties of an existing Token
     * @request PATCH:/{username}/tokens/{id}
     * @secure
     */
    updateToken: (username: string, id: string, token: { token?: string }, params?: RequestParams) =>
      this.request<Token, any>(`/${username}/tokens/${id}`, "PATCH", params, token, BodyType.Json, true),

    /**
     * No description
     *
     * @tags Tokens
     * @name replaceToken
     * @summary Replace an existing Token
     * @request PUT:/{username}/tokens/{id}
     * @secure
     */
    replaceToken: (username: string, id: string, token: { token?: string }, params?: RequestParams) =>
      this.request<Token, any>(`/${username}/tokens/${id}`, "PUT", params, token, BodyType.Json, true),

    /**
     * @description The Triggers endpoint returns information about the user's triggers.
     *
     * @tags Triggers
     * @name allTriggers
     * @summary All triggers for current user
     * @request GET:/{username}/triggers
     * @secure
     */
    allTriggers: (username: string, params?: RequestParams) =>
      this.request<Trigger[], any>(`/${username}/triggers`, "GET", params, null, BodyType.Json, true),

    /**
     * No description
     *
     * @tags Triggers
     * @name createTrigger
     * @summary Create a new Trigger
     * @request POST:/{username}/triggers
     * @secure
     */
    createTrigger: (username: string, trigger: Trigger, params?: RequestParams) =>
      this.request<Trigger, any>(`/${username}/triggers`, "POST", params, trigger, BodyType.Json, true),

    /**
     * No description
     *
     * @tags Triggers
     * @name destroyTrigger
     * @summary Delete an existing Trigger
     * @request DELETE:/{username}/triggers/{id}
     * @secure
     */
    destroyTrigger: (username: string, id: string, params?: RequestParams) =>
      this.request<string, any>(`/${username}/triggers/${id}`, "DELETE", params, null, BodyType.Json, true),

    /**
     * No description
     *
     * @tags Triggers
     * @name getTrigger
     * @summary Returns Trigger based on ID
     * @request GET:/{username}/triggers/{id}
     * @secure
     */
    getTrigger: (username: string, id: string, params?: RequestParams) =>
      this.request<Trigger, any>(`/${username}/triggers/${id}`, "GET", params, null, BodyType.Json, true),

    /**
     * No description
     *
     * @tags Triggers
     * @name updateTrigger
     * @summary Update properties of an existing Trigger
     * @request PATCH:/{username}/triggers/{id}
     * @secure
     */
    updateTrigger: (username: string, id: string, trigger: { name?: string }, params?: RequestParams) =>
      this.request<Trigger, any>(`/${username}/triggers/${id}`, "PATCH", params, trigger, BodyType.Json, true),

    /**
     * No description
     *
     * @tags Triggers
     * @name replaceTrigger
     * @summary Replace an existing Trigger
     * @request PUT:/{username}/triggers/{id}
     * @secure
     */
    replaceTrigger: (username: string, id: string, trigger: { name?: string }, params?: RequestParams) =>
      this.request<Trigger, any>(`/${username}/triggers/${id}`, "PUT", params, trigger, BodyType.Json, true),

    /**
     * @description The Permissions endpoint returns information about the user's permissions.
     *
     * @tags Permissions
     * @name allPermissions
     * @summary All permissions for current user and type
     * @request GET:/{username}/{type}/{type_id}/acl
     * @secure
     */
    allPermissions: (username: string, type: string, type_id: string, params?: RequestParams) =>
      this.request<Permission[], any>(`/${username}/${type}/${type_id}/acl`, "GET", params, null, BodyType.Json, true),

    /**
     * No description
     *
     * @tags Permissions
     * @name createPermission
     * @summary Create a new Permission
     * @request POST:/{username}/{type}/{type_id}/acl
     * @secure
     */
    createPermission: (
      username: string,
      type: string,
      type_id: string,
      permission: Permission,
      params?: RequestParams,
    ) =>
      this.request<Permission, any>(
        `/${username}/${type}/${type_id}/acl`,
        "POST",
        params,
        permission,
        BodyType.Json,
        true,
      ),

    /**
     * No description
     *
     * @tags Permissions
     * @name destroyPermission
     * @summary Delete an existing Permission
     * @request DELETE:/{username}/{type}/{type_id}/acl/{id}
     * @secure
     */
    destroyPermission: (username: string, type: string, type_id: string, id: string, params?: RequestParams) =>
      this.request<string, any>(
        `/${username}/${type}/${type_id}/acl/${id}`,
        "DELETE",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * No description
     *
     * @tags Permissions
     * @name getPermission
     * @summary Returns Permission based on ID
     * @request GET:/{username}/{type}/{type_id}/acl/{id}
     * @secure
     */
    getPermission: (username: string, type: string, type_id: string, id: string, params?: RequestParams) =>
      this.request<Permission, any>(
        `/${username}/${type}/${type_id}/acl/${id}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * No description
     *
     * @tags Permissions
     * @name updatePermission
     * @summary Update properties of an existing Permission
     * @request PATCH:/{username}/{type}/{type_id}/acl/{id}
     * @secure
     */
    updatePermission: (
      username: string,
      type: string,
      type_id: string,
      id: string,
      permission: {
        mode?: "r" | "w" | "rw";
        scope?: "secret" | "public" | "user" | "organization";
        scope_value?: string;
      },
      params?: RequestParams,
    ) =>
      this.request<Permission, any>(
        `/${username}/${type}/${type_id}/acl/${id}`,
        "PATCH",
        params,
        permission,
        BodyType.Json,
        true,
      ),

    /**
     * No description
     *
     * @tags Permissions
     * @name replacePermission
     * @summary Replace an existing Permission
     * @request PUT:/{username}/{type}/{type_id}/acl/{id}
     * @secure
     */
    replacePermission: (
      username: string,
      type: string,
      type_id: string,
      id: string,
      permission: {
        mode?: "r" | "w" | "rw";
        scope?: "secret" | "public" | "user" | "organization";
        scope_value?: string;
      },
      params?: RequestParams,
    ) =>
      this.request<Permission, any>(
        `/${username}/${type}/${type_id}/acl/${id}`,
        "PUT",
        params,
        permission,
        BodyType.Json,
        true,
      ),
  };
}
