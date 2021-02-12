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

export type TestAllOfDc = (FooBarBaz & FooBar) & { prop?: string };

export type TestAllOfDc2 = FooBarBaz & { prop?: string };

export type TestAnyOfDc = (FooBarBaz | FooBar | (FooBarBaz & FooBar)) & { prop?: string };

export type TestOneOfDc = (FooBarBaz | FooBar) & { prop?: string };

/**
 * FooBar
 * @format int32
 */
export enum IntEnumWithNames {
  Unknown = 0,
  String = 1,
  Int32 = 2,
  Int64 = 3,
  Double = 4,
  DateTime = 5,
  Test2 = 6,
  Test23 = 7,
  Tess44 = 8,
  BooFar = 9,
}

export interface NullableEnum {
  /** @format int64 */
  id?: number;
  legalCategory?: "SARL" | "ASSOCIATION" | null;
}

/**
 * Information about job
 */
export interface FooBarBaz {
  id?: string;
  kind?: JobKind;
  name?: string;
  link?: string;
  [key: string]: any;
}

/**
 * Information about job
 */
export interface FooBar {
  kind?: JobKind;
}

/**
 * Information about job
 */
export interface FooBaz {
  name?: string;
  link?: string;
}

/**
 * From T, pick a set of properties whose keys are in the union K
 */
export interface PickUserTypeExcludeKeysIdOrId {
  username: string;
  password: string;
}

export type OmitUserTypeIdOrId = PickUserTypeExcludeKeysIdOrId;

export type OmitIdUserType = OmitUserTypeIdOrId;

export type AuthUserType = OmitIdUserType;

export enum JobKind {
  COMPANY = "COMPANY",
  PERSONAL = "PERSONAL",
  FREELANCE = "FREELANCE",
  OPEN_SOURCE = "OPEN_SOURCE",
}

/**
 * Information about job
 */
export interface JobType {
  id: string;
  kind: JobKind;
  name?: string;
  link?: string;

  /**
   * Exist only in open source jobs
   * Format: `${username}/${projectName}`
   */
  github?: string;

  /**
   * Exist only in open source jobs
   * Format: `${orgname}/${projectName}`
   */
  npm?: string;

  /**
   * Exist only in open source jobs
   * Means project is dev. tool (like swagger code generator)
   */
  isTool?: boolean;

  /** web site address */
  address?: string;
}

/**
 * From T, pick a set of properties whose keys are in the union K
 */
export interface PickJobTypeExcludeKeysIdOrId {
  kind: JobKind;
  name?: string;
  link?: string;

  /**
   * Exist only in open source jobs
   * Format: `${username}/${projectName}`
   */
  github?: string;

  /**
   * Exist only in open source jobs
   * Format: `${orgname}/${projectName}`
   */
  npm?: string;

  /**
   * Exist only in open source jobs
   * Means project is dev. tool (like swagger code generator)
   */
  isTool?: boolean;

  /** web site address */
  address?: string;
}

export type OmitJobTypeIdOrId = PickJobTypeExcludeKeysIdOrId;

export type OmitIdJobType = OmitJobTypeIdOrId;

export type JobUpdateType = OmitIdJobType;

/**
 * From T, pick a set of properties whose keys are in the union K
 */
export interface PickProjectTypeExcludeKeysJob {
  id: string;
  name?: string;

  /** @format double */
  year: number;
  description: string;
  notImportant?: boolean;
  prefix?: string;
  tags: string[];
  teamSize: string;
}

export type OmitProjectTypeJob = PickProjectTypeExcludeKeysJob;

export type ExtractedProjectType = OmitProjectTypeJob & { job: JobType };

/**
 * From T, pick a set of properties whose keys are in the union K
 */
export interface PickProjectTypeExcludeKeysIdOrId {
  name?: string;
  job: string;

  /** @format double */
  year: number;
  description: string;
  notImportant?: boolean;
  prefix?: string;
  tags: string[];
  teamSize: string;
}

export type OmitProjectTypeIdOrId = PickProjectTypeExcludeKeysIdOrId;

export type OmitIdProjectType = OmitProjectTypeIdOrId;

export type ProjectUpdateType = OmitIdProjectType;

export interface ProjectType {
  id: string;

  /** @format double */
  year: number;
  description: string;
  job: string;
  name?: string;
  notImportant?: boolean;
  prefix?: string;
  tags: string[];
  teamSize: string;
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
  format?: keyof Omit<Body, "body" | "bodyUsed">;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType) => RequestParams | void;
}

interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
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
  public baseUrl: string = "http://localhost:8080/api/v1";
  private securityData: SecurityDataType = null as any;
  private securityWorker: null | ApiConfig<SecurityDataType>["securityWorker"] = null;
  private abortControllers = new Map<CancelToken, AbortController>();

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType) => {
    this.securityData = data;
  };

  private addQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];

    return (
      encodeURIComponent(key) +
      "=" +
      encodeURIComponent(Array.isArray(value) ? value.join(",") : typeof value === "number" ? value : `${value}`)
    );
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) =>
        typeof query[key] === "object" && !Array.isArray(query[key])
          ? this.toQueryString(query[key] as QueryParamsType)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) => (input !== null && typeof input === "object" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((data, key) => {
        data.append(key, input[key]);
        return data;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  private mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
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

  private createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
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

  public request = <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format = "json",
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams = (secure && this.securityWorker && this.securityWorker(this.securityData)) || {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];

    return fetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      headers: {
        ...(type ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      ...requestParams,
      signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = (null as unknown) as T;
      r.error = (null as unknown) as E;

      const data = await response[format]()
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
 * @title No title
 * @baseUrl http://localhost:8080/api/v1
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  auth = {
    /**
     * No description
     *
     * @tags Auth
     * @name Login
     * @request POST:/auth
     */
    login: (data: AuthUserType, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/auth`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name Refresh
     * @request POST:/auth/refresh
     * @secure
     */
    refresh: (params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/auth/refresh`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  jobs = {
    /**
     * No description
     *
     * @tags Jobs
     * @name GetJobs
     * @request GET:/jobs
     * @secure
     */
    getJobs: (params: RequestParams = {}) =>
      this.request<JobType[], any>({
        path: `/jobs`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Jobs
     * @name AddJob
     * @request POST:/jobs
     * @secure
     */
    addJob: (data: JobUpdateType, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/jobs`,
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
     * @tags Jobs
     * @name GetJob
     * @request GET:/jobs/{id}
     * @secure
     */
    getJob: (id: string, params: RequestParams = {}) =>
      this.request<JobType, void>({
        path: `/jobs/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Jobs
     * @name UpdateJob
     * @request PATCH:/jobs/{id}
     * @secure
     */
    updateJob: (id: string, data: JobUpdateType, params: RequestParams = {}) =>
      this.request<JobType, any>({
        path: `/jobs/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Jobs
     * @name DeleteJob
     * @request DELETE:/jobs/{id}
     * @secure
     */
    deleteJob: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/jobs/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  projects = {
    /**
     * No description
     *
     * @tags Projects
     * @name GetProjects
     * @request GET:/projects
     */
    getProjects: (params: RequestParams = {}) =>
      this.request<ExtractedProjectType[], any>({
        path: `/projects`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Projects
     * @name AddProjects
     * @request POST:/projects
     * @secure
     */
    addProjects: (data: ProjectUpdateType, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/projects`,
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
     * @tags Projects
     * @name UpdateProject
     * @request PATCH:/projects/{id}
     * @secure
     */
    updateProject: (id: string, data: ProjectUpdateType, params: RequestParams = {}) =>
      this.request<ProjectType, any>({
        path: `/projects/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Projects
     * @name DeleteProject
     * @request DELETE:/projects/{id}
     */
    deleteProject: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/projects/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),
  };
}
