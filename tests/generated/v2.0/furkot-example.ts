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

export interface Step {
  /**
   * address of the stop
   */
  address?: string;

  /**
   * arrival at the stop in its local timezone as YYYY-MM-DDThh:mm
   */
  arrival?: string;

  /**
   * geographical coordinates of the stop
   */
  coordinates?: { lat?: number; lon?: number };

  /**
   * departure from the stop in its local timezone as YYYY-MM-DDThh:mm
   */
  departure?: string;

  /**
   * name of the stop
   */
  name?: string;

  /**
   * number of nights
   */
  nights?: number;

  /**
   * route leading to the stop
   */
  route?: {
    distance?: number;
    duration?: number;
    mode?: "car" | "motorcycle" | "bicycle" | "walk" | "other";
    polyline?: string;
  };

  /**
   * url of the page with more information about the stop
   */
  url?: string;
}

export interface Trip {
  /**
   * begin of the trip in its local timezone as YYYY-MM-DDThh:mm
   */
  begin?: string;

  /**
   * description of the trip (truncated to 200 characters)
   */
  description?: string;

  /**
   * end of the trip in its local timezone as YYYY-MM-DDThh:mm
   */
  end?: string;

  /**
   * Unique ID of the trip
   */
  id?: string;

  /**
   * name of the trip
   */
  name?: string;
}

export type RequestParams = Omit<RequestInit, "body" | "method"> & {
  secure?: boolean;
};

type ApiConfig<SecurityDataType> = {
  baseUrl?: string;
  baseApiParams?: RequestParams;
  securityWorker?: (securityData: SecurityDataType) => RequestParams;
};

const enum BodyType {
  Json,
}

class HttpClient<SecurityDataType> {
  public baseUrl: string = "https://trips.furkot.com/pub/api";
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
 * @title Furkot Trips
 * @version 1.0.0
 * @baseUrl https://trips.furkot.com/pub/api
 * Furkot provides Rest API to access user trip data.
 * Using Furkot API an application can list user trips and display stops for a specific trip.
 * Furkot API uses OAuth2 protocol to authorize applications to access data on behalf of users.
 */
export class Api<SecurityDataType = any> extends HttpClient<SecurityDataType> {
  trip = {
    /**
     * @name tripList
     * @request GET:/trip
     * @description list user's trips
     */
    tripList: (params?: RequestParams) => this.request<Trip[], any>(`/trip`, "GET", params),

    /**
     * @name stopDetail
     * @request GET:/trip/{trip_id}/stop
     * @description list stops for a trip identified by {trip_id}
     */
    stopDetail: (trip_id: string, params?: RequestParams) =>
      this.request<Step[], any>(`/trip/${trip_id}/stop`, "GET", params),
  };
}
