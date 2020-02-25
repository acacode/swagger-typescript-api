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
  username?: string;
  uuid?: string;
}

export interface repository {
  slug?: string;
  owner?: user;
}

export interface pullrequest {
  id?: number;
  title?: string;
  repository?: repository;
  author?: user;
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



  v20 = {


    /**
    * @name getUserByName
    * @request GET:/2.0/users/{username}
    * @response `200` `user` The User
    */
    getUserByName: (username: string, params?: RequestParams) =>
      this.request<user, any>(`/2.0/users/${username}`, "GET", params, null),


    /**
    * @name getRepositoriesByOwner
    * @request GET:/2.0/repositories/{username}
    * @response `200` `repository[]` repositories owned by the supplied user
    */
    getRepositoriesByOwner: (username: string, params?: RequestParams) =>
      this.request<repository[], any>(`/2.0/repositories/${username}`, "GET", params, null),


    /**
    * @name getRepository
    * @request GET:/2.0/repositories/{username}/{slug}
    * @response `200` `repository` The repository
    */
    getRepository: (username: string, slug: string, params?: RequestParams) =>
      this.request<repository, any>(`/2.0/repositories/${username}/${slug}`, "GET", params, null),


    /**
    * @name getPullRequestsByRepository
    * @request GET:/2.0/repositories/{username}/{slug}/pullrequests
    * @response `200` `pullrequest[]` an array of pull request objects
    */
    getPullRequestsByRepository: (username: string, slug: string, query: { state?: "open" | "merged" | "declined" }, params?: RequestParams) =>
      this.request<pullrequest[], any>(`/2.0/repositories/${username}/${slug}/pullrequests${this.addQueryParams(query)}`, "GET", params, null),


    /**
    * @name getPullRequestsById
    * @request GET:/2.0/repositories/{username}/{slug}/pullrequests/{pid}
    * @response `200` `pullrequest` a pull request object
    */
    getPullRequestsById: (username: string, slug: string, pid: string, params?: RequestParams) =>
      this.request<pullrequest, any>(`/2.0/repositories/${username}/${slug}/pullrequests/${pid}`, "GET", params, null),


    /**
    * @name mergePullRequest
    * @request POST:/2.0/repositories/{username}/{slug}/pullrequests/{pid}/merge
    * @response `204` `any` the PR was successfully merged
    */
    mergePullRequest: (username: string, slug: string, pid: string, params?: RequestParams) =>
      this.request<any, any>(`/2.0/repositories/${username}/${slug}/pullrequests/${pid}/merge`, "POST", params, null),
  }

}
