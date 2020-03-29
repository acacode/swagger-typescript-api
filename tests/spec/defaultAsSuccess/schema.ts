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
  /**
   * device token for push messages
   */
  devtoken?: string;

  /**
   * UUID and public signing key
   */
  sub: string;
}

/**
 * Claim in JWT format, self- or issuer-signed.
 */
export interface Claims {
  email?: string;
  phone?: string;

  /**
   * claim scope
   */
  scope: string;

  /**
   * UUID
   */
  sub: string;
  type?: string;
}

export interface Error {
  detail?: string;
  error: number;
  title?: string;

  /**
   * unique uri for this error
   */
  type?: string;
}

/**
 * PushToken in JWT format, self-signed.
 */
export interface PushToken {
  /**
   * audience (URI)
   */
  aud: string;
  exp?: number;
  iat?: number;

  /**
   * issuer (URI)
   */
  iss: string;
  nbf?: number;

  /**
   * UUID and public signing key
   */
  sub: string;
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
  public baseUrl: string = "https://6-dot-authentiqio.appspot.com/";
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
 * @title Authentiq
 * @version 6
 * @baseUrl https://6-dot-authentiqio.appspot.com/
 * Strong authentication, without the passwords.
 */
export class Api<SecurityDataType = any> extends HttpClient<SecurityDataType> {
  key = {
    /**
     * @tags key, delete
     * @name key_revoke_nosecret
     * @request DELETE:/key
     * @description Revoke an Authentiq ID using email & phone. If called with `email` and `phone` only, a verification code will be sent by email. Do a second call adding `code` to complete the revocation.
     */
    keyRevokeNosecret: (query: { email: string; phone: string; code?: string }, params?: RequestParams) =>
      this.request<{ status?: string }, Error>(`/key${this.addQueryParams(query)}`, "DELETE", params),

    /**
     * @tags key, post
     * @name key_register
     * @request POST:/key
     * @description Register a new ID `JWT(sub, devtoken)` v5: `JWT(sub, pk, devtoken, ...)` See: https://github.com/skion/authentiq/wiki/JWT-Examples
     */
    keyRegister: (body: AuthentiqID, params?: RequestParams) =>
      this.request<{ secret?: string; status?: string }, Error>(`/key`, "POST", params, body),

    /**
     * @tags key, delete
     * @name key_revoke
     * @request DELETE:/key/{PK}
     * @description Revoke an Identity (Key) with a revocation secret
     */
    keyRevoke: (PK: string, query: { secret: string }, params?: RequestParams) =>
      this.request<{ status?: string }, Error>(`/key/${PK}${this.addQueryParams(query)}`, "DELETE", params),

    /**
     * @tags key, get
     * @name getKey
     * @request GET:/key/{PK}
     * @description Get public details of an Authentiq ID.
     */
    getKey: (PK: string, params?: RequestParams) =>
      this.request<{ since?: string; status?: string; sub?: string }, Error>(`/key/${PK}`, "GET", params),

    /**
     * @tags key, head
     * @name headKey
     * @request HEAD:/key/{PK}
     * @description HEAD info on Authentiq ID
     */
    headKey: (PK: string, params?: RequestParams) => this.request<any, Error>(`/key/${PK}`, "HEAD", params),

    /**
     * @tags key, post
     * @name key_update
     * @request POST:/key/{PK}
     * @description update properties of an Authentiq ID. (not operational in v4; use PUT for now) v5: POST issuer-signed email & phone scopes in a self-signed JWT See: https://github.com/skion/authentiq/wiki/JWT-Examples
     */
    keyUpdate: (PK: string, body: AuthentiqID, params?: RequestParams) =>
      this.request<{ status?: string }, Error>(`/key/${PK}`, "POST", params, body),

    /**
     * @tags key, put
     * @name key_bind
     * @request PUT:/key/{PK}
     * @description Update Authentiq ID by replacing the object. v4: `JWT(sub,email,phone)` to bind email/phone hash; v5: POST issuer-signed email & phone scopes and PUT to update registration `JWT(sub, pk, devtoken, ...)` See: https://github.com/skion/authentiq/wiki/JWT-Examples
     */
    keyBind: (PK: string, body: AuthentiqID, params?: RequestParams) =>
      this.request<{ status?: string }, Error>(`/key/${PK}`, "PUT", params, body),
  };
  login = {
    /**
     * @tags login, post
     * @name push_login_request
     * @request POST:/login
     * @description push sign-in request See: https://github.com/skion/authentiq/wiki/JWT-Examples
     */
    pushLoginRequest: (query: { callback: string }, body: PushToken, params?: RequestParams) =>
      this.request<{ status?: string }, Error>(`/login${this.addQueryParams(query)}`, "POST", params, body),
  };
  scope = {
    /**
     * @tags scope, post
     * @name sign_request
     * @request POST:/scope
     * @description scope verification request See: https://github.com/skion/authentiq/wiki/JWT-Examples
     */
    signRequest: (body: Claims, query?: { test?: number }, params?: RequestParams) =>
      this.request<{ job?: string; status?: string }, Error>(
        `/scope${this.addQueryParams(query)}`,
        "POST",
        params,
        body,
      ),

    /**
     * @tags scope, delete
     * @name sign_delete
     * @request DELETE:/scope/{job}
     * @description delete a verification job
     */
    signDelete: (job: string, params?: RequestParams) =>
      this.request<{ status?: string }, Error>(`/scope/${job}`, "DELETE", params),

    /**
     * @tags scope, get
     * @name sign_retrieve
     * @request GET:/scope/{job}
     * @description get the status / current content of a verification job
     */
    signRetrieve: (job: string, params?: RequestParams) =>
      this.request<{ exp?: number; field?: string; sub?: string }, Error>(`/scope/${job}`, "GET", params),

    /**
     * @tags scope, head
     * @name sign_retrieve_head
     * @request HEAD:/scope/{job}
     * @description HEAD to get the status of a verification job
     */
    signRetrieveHead: (job: string, params?: RequestParams) =>
      this.request<any, Error>(`/scope/${job}`, "HEAD", params),

    /**
     * @tags scope, post
     * @name sign_confirm
     * @request POST:/scope/{job}
     * @description this is a scope confirmation
     */
    signConfirm: (job: string, params?: RequestParams) =>
      this.request<{ status?: string }, Error>(`/scope/${job}`, "POST", params),

    /**
     * @tags scope, put
     * @name sign_update
     * @request PUT:/scope/{job}
     * @description authority updates a JWT with its signature See: https://github.com/skion/authentiq/wiki/JWT-Examples
     */
    signUpdate: (job: string, params?: RequestParams) =>
      this.request<{ jwt?: string; status?: string }, Error>(`/scope/${job}`, "PUT", params),
  };
}
