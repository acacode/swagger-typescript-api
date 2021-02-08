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
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "http://localhost:8080/api/v1";
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
 * @title Api
 * @baseUrl http://localhost:8080/api/v1
 */
export class Api<SecurityDataType = any> extends HttpClient<SecurityDataType> {
  auth = {
    /**
     * No description
     *
     * @tags Auth
     * @name Login
     * @request POST:/auth
     */
    login: (data: AuthUserType, params?: RequestParams) => this.request<string, any>(`/auth`, "POST", params, data),

    /**
     * No description
     *
     * @tags Auth
     * @name Refresh
     * @request POST:/auth/refresh
     * @secure
     */
    refresh: (params?: RequestParams) =>
      this.request<string, any>(`/auth/refresh`, "POST", params, null, BodyType.Json, true),
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
    getJobs: (params?: RequestParams) =>
      this.request<JobType[], any>(`/jobs`, "GET", params, null, BodyType.Json, true),

    /**
     * No description
     *
     * @tags Jobs
     * @name AddJob
     * @request POST:/jobs
     * @secure
     */
    addJob: (data: JobUpdateType, params?: RequestParams) =>
      this.request<string, any>(`/jobs`, "POST", params, data, BodyType.Json, true),

    /**
     * No description
     *
     * @tags Jobs
     * @name GetJob
     * @request GET:/jobs/{id}
     * @secure
     */
    getJob: (id: string, params?: RequestParams) =>
      this.request<JobType, any>(`/jobs/${id}`, "GET", params, null, BodyType.Json, true),

    /**
     * No description
     *
     * @tags Jobs
     * @name UpdateJob
     * @request PATCH:/jobs/{id}
     * @secure
     */
    updateJob: (id: string, data: JobUpdateType, params?: RequestParams) =>
      this.request<JobType, any>(`/jobs/${id}`, "PATCH", params, data, BodyType.Json, true),

    /**
     * No description
     *
     * @tags Jobs
     * @name DeleteJob
     * @request DELETE:/jobs/{id}
     * @secure
     */
    deleteJob: (id: string, params?: RequestParams) =>
      this.request<any, any>(`/jobs/${id}`, "DELETE", params, null, BodyType.Json, true),
  };
  projects = {
    /**
     * No description
     *
     * @tags Projects
     * @name GetProjects
     * @request GET:/projects
     */
    getProjects: (params?: RequestParams) => this.request<ExtractedProjectType[], any>(`/projects`, "GET", params),

    /**
     * No description
     *
     * @tags Projects
     * @name AddProjects
     * @request POST:/projects
     * @secure
     */
    addProjects: (data: ProjectUpdateType, params?: RequestParams) =>
      this.request<string, any>(`/projects`, "POST", params, data, BodyType.Json, true),

    /**
     * No description
     *
     * @tags Projects
     * @name UpdateProject
     * @request PATCH:/projects/{id}
     * @secure
     */
    updateProject: (id: string, data: ProjectUpdateType, params?: RequestParams) =>
      this.request<ProjectType, any>(`/projects/${id}`, "PATCH", params, data, BodyType.Json, true),

    /**
     * No description
     *
     * @tags Projects
     * @name DeleteProject
     * @request DELETE:/projects/{id}
     */
    deleteProject: (id: string, params?: RequestParams) => this.request<any, any>(`/projects/${id}`, "DELETE", params),
  };
}
