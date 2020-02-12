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


export interface user {
  username: string,
  uuid: string,
}

export interface repository {
  slug: string,
  owner: user,
}

export interface pullrequest {
  id: number,
  title: string,
  repository: repository,
  author: user,
}

export type RequestParams = Omit<RequestInit, "body" | "method"> & {
  secure?: boolean;
}

type ApiConfig<SecurityDataType> = {
  baseUrl?: string,
  baseApiParams?: RequestParams,
  securityWorker?: (securityData: SecurityDataType) => RequestParams,
}



export class Api<SecurityDataType> {
  
  public baseUrl = "";
  public title = "Link Example";
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



  20 = {


    /**
    * @name getUserByName
    * @request GET:/2.0/users/{username}
    */
    getUserByName: (username: string, params?: RequestParams) =>
      this.request<user>(`/2.0/users/${username}`, "GET", params, null),


    /**
    * @name getRepositoriesByOwner
    * @request GET:/2.0/repositories/{username}
    */
    getRepositoriesByOwner: (username: string, params?: RequestParams) =>
      this.request<repository[]>(`/2.0/repositories/${username}`, "GET", params, null),


    /**
    * @name getRepository
    * @request GET:/2.0/repositories/{username}/{slug}
    */
    getRepository: (username: string, slug: string, params?: RequestParams) =>
      this.request<repository>(`/2.0/repositories/${username}/${slug}`, "GET", params, null),


    /**
    * @name getPullRequestsByRepository
    * @request GET:/2.0/repositories/{username}/{slug}/pullrequests
    */
    getPullRequestsByRepository: (username: string, slug: string, query: { state: "open" | "merged" | "declined", }, params?: RequestParams) =>
      this.request<pullrequest[]>(`/2.0/repositories/${username}/${slug}/pullrequests${this.addQueryParams(query)}`, "GET", params, null),


    /**
    * @name getPullRequestsById
    * @request GET:/2.0/repositories/{username}/{slug}/pullrequests/{pid}
    */
    getPullRequestsById: (username: string, slug: string, pid: string, params?: RequestParams) =>
      this.request<pullrequest>(`/2.0/repositories/${username}/${slug}/pullrequests/${pid}`, "GET", params, null),


    /**
    * @name mergePullRequest
    * @request POST:/2.0/repositories/{username}/{slug}/pullrequests/{pid}/merge
    */
    mergePullRequest: (username: string, slug: string, pid: string, params?: RequestParams) =>
      this.request<any>(`/2.0/repositories/${username}/${slug}/pullrequests/${pid}/merge`, "POST", params, null),
  }

}
