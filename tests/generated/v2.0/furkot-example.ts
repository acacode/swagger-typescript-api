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
  coordinates?: { lat?: number, lon?: number };
  
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
  route?: { distance?: number, duration?: number, mode?: "car" | "motorcycle" | "bicycle" | "walk" | "other", polyline?: string };
  
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
}

type ApiConfig<SecurityDataType> = {
  baseUrl?: string,
  baseApiParams?: RequestParams,
  securityWorker?: (securityData: SecurityDataType) => RequestParams,
}

/** Overrided Promise type. Needs for additional typings of `.catch` callback */
type TPromise<ResolveType, RejectType = any> = {
  then<TResult1 = ResolveType, TResult2 = never>(onfulfilled?: ((value: ResolveType) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: RejectType) => TResult2 | PromiseLike<TResult2>) | undefined | null): TPromise<TResult1 | TResult2, RejectType>;
  catch<TResult = never>(onrejected?: ((reason: RejectType) => TResult | PromiseLike<TResult>) | undefined | null): TPromise<ResolveType | TResult, RejectType>;
}

/** Furkot provides Rest API to access user trip data.
Using Furkot API an application can list user trips and display stops for a specific trip.
Furkot API uses OAuth2 protocol to authorize applications to access data on behalf of users.
 */
export class Api<SecurityDataType> {
  
  public baseUrl = "https://trips.furkot.com/pub/api";
  public title = "Furkot Trips";
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



  trip = {


    /**
    * @name tripList
    * @request GET:/trip
    * @description list user's trips
    * @response `200` `Trip[]` Successful response
    */
    tripList: (params?: RequestParams) =>
      this.request<Trip[], any>(`/trip`, "GET", params, null),


    /**
    * @name stopDetail
    * @request GET:/trip/{trip_id}/stop
    * @description list stops for a trip identified by {trip_id}
    * @response `200` `Step[]` Successful response
    */
    stopDetail: (trip_id: string, params?: RequestParams) =>
      this.request<Step[], any>(`/trip/${trip_id}/stop`, "GET", params, null),
  }

}
