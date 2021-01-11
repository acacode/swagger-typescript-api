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

export interface GetProfileBioDTO {
  candidateId?: number;
  cityName?: string | null;
}

export interface AuthUser {
  username: string;
  password: string;
}

export enum Kind {
  COMPANY = "COMPANY",
  PERSONAL = "PERSONAL",
  FREELANCE = "FREELANCE",
  OPENSOURCE = "OPEN_SOURCE",
}

export interface Job {
  id: string;
  kind: Kind;
  name?: string | null;
  link?: string | null;
  github?: string | null;
  npm?: string | null;
  isTool?: boolean | null;
  address?: string | null;
}

/**
 * From T, pick a set of properties whose keys are in the union K
 */
export interface PickJobGithub {
  github?: string;
}

export type UpdatedJob = Job;

/**
 * From T, pick a set of properties whose keys are in the union K
 */
export interface PickJobExcludeKeysId {
  address?: string;
  isTool?: boolean;
  npm?: string;
  link?: string;
  name?: string;
  kind: Kind;
  github?: string;
}

export type OmitJobId = PickJobExcludeKeysId;

export type JobUpdate = OmitJobId | PickJobGithub | Record<string, any>;

export interface Project {
  id: string;
  year: number;
  description: string;
  job: Job;
  name?: string | null;
  notImportant?: boolean | null;
  prefix?: string | null;
  tags: string[];
  teamSize: string;
}

/**
 * From T, pick a set of properties whose keys are in the union K
 */
export interface PickProjectExcludeKeysIdOrjob {
  teamSize: string;
  tags: string[];
  prefix?: string;
  notImportant?: boolean;
  description: string;
  year: number;
  name?: string;
}

export interface ProjectUpdate {
  name?: string | null;
  year: number;
  description: string;
  notImportant?: boolean | null;
  prefix?: string | null;
  tags: string[];
  teamSize: string;
  job: string;
}

export interface UpdatedProject {
  id: string;
  year: number;
  description: string;
  name?: string | null;
  notImportant?: boolean | null;
  prefix?: string | null;
  tags: string[];
  teamSize: string;
  job: string;
}

export interface User {
  id: string;
  username: string;
}

export interface UserUpdate {
  username?: string | null;
  id?: string | null;
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
    login: (data?: AuthUser, params?: RequestParams) => this.request<string, any>(`/auth`, "POST", params, data),

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
    getJobs: (params?: RequestParams) => this.request<Job[], any>(`/jobs`, "GET", params, null, BodyType.Json, true),

    /**
     * No description
     *
     * @tags Jobs
     * @name AddJob
     * @request POST:/jobs
     * @secure
     */
    addJob: (data: PickJobGithub, params?: RequestParams) =>
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
      this.request<Job, any>(`/jobs/${id}`, "GET", params, null, BodyType.Json, true),

    /**
     * No description
     *
     * @tags Jobs
     * @name UpdateJob
     * @request PATCH:/jobs/{id}
     * @secure
     */
    updateJob: (id: string, data: JobUpdate, params?: RequestParams) =>
      this.request<UpdatedJob, any>(`/jobs/${id}`, "PATCH", params, data, BodyType.Json, true),

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
    getProjects: (params?: RequestParams) => this.request<Project[], any>(`/projects`, "GET", params),

    /**
     * No description
     *
     * @tags Projects
     * @name AddProjects
     * @request POST:/projects
     * @secure
     */
    addProjects: (data: ProjectUpdate, params?: RequestParams) =>
      this.request<string, any>(`/projects`, "POST", params, data, BodyType.Json, true),

    /**
     * No description
     *
     * @tags Projects
     * @name UpdateProject
     * @request PATCH:/projects/{id}
     * @secure
     */
    updateProject: (id: string, data: ProjectUpdate, params?: RequestParams) =>
      this.request<UpdatedProject, any>(`/projects/${id}`, "PATCH", params, data, BodyType.Json, true),
  };
  users = {
    /**
     * No description
     *
     * @tags Users
     * @name GetUsers
     * @request GET:/users
     * @secure
     */
    getUsers: (params?: RequestParams) => this.request<User[], any>(`/users`, "GET", params, null, BodyType.Json, true),

    /**
     * No description
     *
     * @tags Users
     * @name AddUser
     * @request POST:/users
     * @secure
     */
    addUser: (data: AuthUser, params?: RequestParams) =>
      this.request<User, any>(`/users`, "POST", params, data, BodyType.Json, true),

    /**
     * No description
     *
     * @tags Users
     * @name DeleteUser
     * @request DELETE:/users/{id}
     * @secure
     */
    deleteUser: (id: string, params?: RequestParams) =>
      this.request<any, any>(`/users/${id}`, "DELETE", params, null, BodyType.Json, true),

    /**
     * No description
     *
     * @tags Users
     * @name UpdateUser
     * @request PATCH:/users/{id}
     * @secure
     */
    updateUser: (id: string, data: UserUpdate, params?: RequestParams) =>
      this.request<User, any>(`/users/${id}`, "PATCH", params, data, BodyType.Json, true),
  };
}
