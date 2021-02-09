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

/**
 * Authentiq ID in JWT format, self-signed.
 */
export interface AuthentiqID {
  /** device token for push messages */
  devtoken?: string;

  /** UUID and public signing key */
  sub: string;
}

/**
 * Claim in JWT format, self- or issuer-signed.
 */
export interface Claims {
  email?: string;
  phone?: string;

  /** claim scope */
  scope: string;

  /** UUID */
  sub: string;
  type?: string;
}

export interface Error {
  detail?: string;
  error: number;
  title?: string;

  /** unique uri for this error */
  type?: string;
}

/**
 * PushToken in JWT format, self-signed.
 */
export interface PushToken {
  /** audience (URI) */
  aud: string;
  exp?: number;
  iat?: number;

  /** issuer (URI) */
  iss: string;
  nbf: number;

  /** UUID and public signing key */
  sub: string;
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
  UrlEncoded,
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "https://6-dot-authentiqio.appspot.com";
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

  protected toQueryString(rawQuery?: RequestQueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) =>
        typeof query[key] === "object" && !Array.isArray(query[key])
          ? this.toQueryString(query[key] as object)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: RequestQueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private bodyFormatters: Record<BodyType, (input: any) => any> = {
    [BodyType.Json]: JSON.stringify,
    [BodyType.FormData]: (input: any) =>
      Object.keys(input).reduce((data, key) => {
        data.append(key, input[key]);
        return data;
      }, new FormData()),
    [BodyType.UrlEncoded]: (input: any) => this.toQueryString(input),
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
 * @title Authentiq
 * @version 6
 * @baseUrl https://6-dot-authentiqio.appspot.com
 * Strong authentication, without the passwords.
 */
export class Api<SecurityDataType = any> extends HttpClient<SecurityDataType> {
  key = {
    /**
     * @description Revoke an Authentiq ID using email & phone. If called with `email` and `phone` only, a verification code will be sent by email. Do a second call adding `code` to complete the revocation.
     *
     * @tags key, delete
     * @name KeyRevokeNosecret
     * @request DELETE:/key
     */
    keyRevokeNosecret: (query: { email: string; phone: string; code?: string }, params?: RequestParams) =>
      this.request<{ status?: string }, Error>(`/key${this.addQueryParams(query)}`, "DELETE", params),

    /**
     * @description Register a new ID `JWT(sub, devtoken)` v5: `JWT(sub, pk, devtoken, ...)` See: https://github.com/skion/authentiq/wiki/JWT-Examples
     *
     * @tags key, post
     * @name KeyRegister
     * @request POST:/key
     */
    keyRegister: (body: AuthentiqID, params?: RequestParams) =>
      this.request<{ secret?: string; status?: string }, Error>(`/key`, "POST", params, body),

    /**
     * @description Revoke an Identity (Key) with a revocation secret
     *
     * @tags key, delete
     * @name KeyRevoke
     * @request DELETE:/key/{PK}
     */
    keyRevoke: (PK: string, query: { secret: string }, params?: RequestParams) =>
      this.request<{ status?: string }, Error>(`/key/${PK}${this.addQueryParams(query)}`, "DELETE", params),

    /**
     * @description Get public details of an Authentiq ID.
     *
     * @tags key, get
     * @name GetKey
     * @request GET:/key/{PK}
     */
    getKey: (PK: string, params?: RequestParams) =>
      this.request<{ since?: string; status?: string; sub?: string }, Error>(`/key/${PK}`, "GET", params),

    /**
     * @description HEAD info on Authentiq ID
     *
     * @tags key, head
     * @name HeadKey
     * @request HEAD:/key/{PK}
     */
    headKey: (PK: string, params?: RequestParams) => this.request<any, Error>(`/key/${PK}`, "HEAD", params),

    /**
     * @description update properties of an Authentiq ID. (not operational in v4; use PUT for now) v5: POST issuer-signed email & phone scopes in a self-signed JWT See: https://github.com/skion/authentiq/wiki/JWT-Examples
     *
     * @tags key, post
     * @name KeyUpdate
     * @request POST:/key/{PK}
     */
    keyUpdate: (PK: string, body: AuthentiqID, params?: RequestParams) =>
      this.request<{ status?: string }, Error>(`/key/${PK}`, "POST", params, body),

    /**
     * @description Update Authentiq ID by replacing the object. v4: `JWT(sub,email,phone)` to bind email/phone hash; v5: POST issuer-signed email & phone scopes and PUT to update registration `JWT(sub, pk, devtoken, ...)` See: https://github.com/skion/authentiq/wiki/JWT-Examples
     *
     * @tags key, put
     * @name KeyBind
     * @request PUT:/key/{PK}
     */
    keyBind: (PK: string, body: AuthentiqID, params?: RequestParams) =>
      this.request<{ status?: string }, Error>(`/key/${PK}`, "PUT", params, body),
  };
  login = {
    /**
     * @description push sign-in request See: https://github.com/skion/authentiq/wiki/JWT-Examples
     *
     * @tags login, post
     * @name PushLoginRequest
     * @request POST:/login
     */
    pushLoginRequest: (query: { callback: string }, body: PushToken, params?: RequestParams) =>
      this.request<{ status?: string }, Error>(`/login${this.addQueryParams(query)}`, "POST", params, body),
  };
  scope = {
    /**
     * @description scope verification request See: https://github.com/skion/authentiq/wiki/JWT-Examples
     *
     * @tags scope, post
     * @name SignRequest
     * @request POST:/scope
     */
    signRequest: (body: Claims, query?: { test?: number }, params?: RequestParams) =>
      this.request<{ job?: string; status?: string }, Error>(
        `/scope${this.addQueryParams(query)}`,
        "POST",
        params,
        body,
      ),

    /**
     * @description delete a verification job
     *
     * @tags scope, delete
     * @name SignDelete
     * @request DELETE:/scope/{job}
     */
    signDelete: (job: string, params?: RequestParams) =>
      this.request<{ status?: string }, Error>(`/scope/${job}`, "DELETE", params),

    /**
     * @description get the status / current content of a verification job
     *
     * @tags scope, get
     * @name SignRetrieve
     * @request GET:/scope/{job}
     */
    signRetrieve: (job: string, params?: RequestParams) =>
      this.request<{ exp?: number; field?: string; sub?: string }, Error>(`/scope/${job}`, "GET", params),

    /**
     * @description HEAD to get the status of a verification job
     *
     * @tags scope, head
     * @name SignRetrieveHead
     * @request HEAD:/scope/{job}
     */
    signRetrieveHead: (job: string, params?: RequestParams) =>
      this.request<any, Error>(`/scope/${job}`, "HEAD", params),

    /**
     * @description this is a scope confirmation
     *
     * @tags scope, post
     * @name SignConfirm
     * @request POST:/scope/{job}
     */
    signConfirm: (job: string, params?: RequestParams) =>
      this.request<{ status?: string }, Error>(`/scope/${job}`, "POST", params, null, BodyType.Json),

    /**
     * @description authority updates a JWT with its signature See: https://github.com/skion/authentiq/wiki/JWT-Examples
     *
     * @tags scope, put
     * @name SignUpdate
     * @request PUT:/scope/{job}
     */
    signUpdate: (job: string, params?: RequestParams) =>
      this.request<{ jwt?: string; status?: string }, Error>(`/scope/${job}`, "PUT", params),
  };
}
