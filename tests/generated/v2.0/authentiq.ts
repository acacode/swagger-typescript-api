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
}

type ApiConfig<SecurityDataType> = {
  baseUrl?: string,
  baseApiParams?: RequestParams,
  securityWorker?: (securityData: SecurityDataType) => RequestParams,
}



/** Strong authentication, without the passwords. */
export class Api<SecurityDataType> {
  
  public baseUrl = "https://6-dot-authentiqio.appspot.com/";
  public title = "Authentiq";
  public version = "6";

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



  key = {


    /**
    * @tags key, delete
    * @name key_revoke_nosecret
    * @request DELETE:/key
    * @description Revoke an Authentiq ID using email & phone.. . If called with `email` and `phone` only, a verification code . will be sent by email. Do a second call adding `code` to . complete the revocation.. 
    */
    keyRevokeNosecret: (query: { email: string, phone: string, code?: string }, params?: RequestParams) =>
      this.request<{ status?: string }>(`/key${this.addQueryParams(query)}`, "DELETE", params, null),


    /**
    * @tags key, post
    * @name key_register
    * @request POST:/key
    * @description Register a new ID `JWT(sub, devtoken)`. . v5: `JWT(sub, pk, devtoken, ...)`. . See: https://github.com/skion/authentiq/wiki/JWT-Examples. 
    */
    keyRegister: (body: any, params?: RequestParams) =>
      this.request<{ secret?: string, status?: string }>(`/key`, "POST", params, body),


    /**
    * @tags key, delete
    * @name key_revoke
    * @request DELETE:/key/{PK}
    * @description Revoke an Identity (Key) with a revocation secret
    */
    keyRevoke: (PK: string, query: { secret: string }, params?: RequestParams) =>
      this.request<{ status?: string }>(`/key/${PK}${this.addQueryParams(query)}`, "DELETE", params, null),


    /**
    * @tags key, get
    * @name getKey
    * @request GET:/key/{PK}
    * @description Get public details of an Authentiq ID.. 
    */
    getKey: (PK: string, params?: RequestParams) =>
      this.request<{ since?: string, status?: string, sub?: string }>(`/key/${PK}`, "GET", params, null),


    /**
    * @tags key, head
    * @name headKey
    * @request HEAD:/key/{PK}
    * @description HEAD info on Authentiq ID. 
    */
    headKey: (PK: string, params?: RequestParams) =>
      this.request<any>(`/key/${PK}`, "HEAD", params, null),


    /**
    * @tags key, post
    * @name key_update
    * @request POST:/key/{PK}
    * @description update properties of an Authentiq ID.. (not operational in v4; use PUT for now). . v5: POST issuer-signed email & phone scopes in. a self-signed JWT. . See: https://github.com/skion/authentiq/wiki/JWT-Examples. 
    */
    keyUpdate: (PK: string, body: any, params?: RequestParams) =>
      this.request<{ status?: string }>(`/key/${PK}`, "POST", params, body),


    /**
    * @tags key, put
    * @name key_bind
    * @request PUT:/key/{PK}
    * @description Update Authentiq ID by replacing the object.. . v4: `JWT(sub,email,phone)` to bind email/phone hash; . . v5: POST issuer-signed email & phone scopes. and PUT to update registration `JWT(sub, pk, devtoken, ...)`. . See: https://github.com/skion/authentiq/wiki/JWT-Examples. 
    */
    keyBind: (PK: string, body: any, params?: RequestParams) =>
      this.request<{ status?: string }>(`/key/${PK}`, "PUT", params, body),
  }
  login = {


    /**
    * @tags login, post
    * @name push_login_request
    * @request POST:/login
    * @description push sign-in request. See: https://github.com/skion/authentiq/wiki/JWT-Examples. 
    */
    pushLoginRequest: (query: { callback: string }, body: any, params?: RequestParams) =>
      this.request<{ status?: string }>(`/login${this.addQueryParams(query)}`, "POST", params, body),
  }
  scope = {


    /**
    * @tags scope, post
    * @name sign_request
    * @request POST:/scope
    * @description scope verification request. See: https://github.com/skion/authentiq/wiki/JWT-Examples. 
    */
    signRequest: (query: { test?: number }, body: any, params?: RequestParams) =>
      this.request<{ job?: string, status?: string }>(`/scope${this.addQueryParams(query)}`, "POST", params, body),


    /**
    * @tags scope, delete
    * @name sign_delete
    * @request DELETE:/scope/{job}
    * @description delete a verification job
    */
    signDelete: (job: string, params?: RequestParams) =>
      this.request<{ status?: string }>(`/scope/${job}`, "DELETE", params, null),


    /**
    * @tags scope, get
    * @name sign_retrieve
    * @request GET:/scope/{job}
    * @description get the status / current content of a verification job
    */
    signRetrieve: (job: string, params?: RequestParams) =>
      this.request<{ exp?: number, field?: string, sub?: string }>(`/scope/${job}`, "GET", params, null),


    /**
    * @tags scope, head
    * @name sign_retrieve_head
    * @request HEAD:/scope/{job}
    * @description HEAD to get the status of a verification job
    */
    signRetrieveHead: (job: string, params?: RequestParams) =>
      this.request<any>(`/scope/${job}`, "HEAD", params, null),


    /**
    * @tags scope, post
    * @name sign_confirm
    * @request POST:/scope/{job}
    * @description this is a scope confirmation
    */
    signConfirm: (job: string, params?: RequestParams) =>
      this.request<{ status?: string }>(`/scope/${job}`, "POST", params, null),


    /**
    * @tags scope, put
    * @name sign_update
    * @request PUT:/scope/{job}
    * @description authority updates a JWT with its signature. See: https://github.com/skion/authentiq/wiki/JWT-Examples. 
    */
    signUpdate: (job: string, params?: RequestParams) =>
      this.request<any>(`/scope/${job}`, "PUT", params, null),
  }

}
