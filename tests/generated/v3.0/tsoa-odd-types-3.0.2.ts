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

export interface AuthUser {
  username: string;
  password: string;
}

export enum Kind {
  COMPANY = "COMPANY",
  PERSONAL = "PERSONAL",
  FREELANCE = "FREELANCE",
  OPEN_SOURCE = "OPEN_SOURCE",
}

export interface Job {
  id: string;
  kind: Kind;
  name?: string;
  link?: string;
  github?: string;
  npm?: string;
  isTool?: boolean;
  address?: string;
}

/**
 * From T, pick a set of properties whose keys are in the union K
 */
export interface Pick_Job_github {
  github?: string;
}

export type UpdatedJob = Job;

/**
 * From T, pick a set of properties whose keys are in the union K
 */
export interface Pick_Job_ExcludeKeys_id {
  address?: string;
  isTool?: boolean;
  npm?: string;
  link?: string;
  name?: string;
  kind: Kind;
  github?: string;
}

export type Omit_Job_id = Pick_Job_ExcludeKeys_id;

export type JobUpdate = Omit_Job_id | Pick_Job_github | object;

export interface Project {
  id: string;
  year: number;
  description: string;
  job: Job;
  name?: string;
  notImportant?: boolean;
  prefix?: string;
  tags: string[];
  teamSize: string;
}

/**
 * From T, pick a set of properties whose keys are in the union K
 */
export interface Pick_Project_ExcludeKeys_idOrjob {
  teamSize: string;
  tags: string[];
  prefix?: string;
  notImportant?: boolean;
  description: string;
  year: number;
  name?: string;
}

export interface ProjectUpdate {
  name?: string;
  year: number;
  description: string;
  notImportant?: boolean;
  prefix?: string;
  tags: string[];
  teamSize: string;
  job: string;
}

export interface UpdatedProject {
  id: string;
  year: number;
  description: string;
  name?: string;
  notImportant?: boolean;
  prefix?: string;
  tags: string[];
  teamSize: string;
  job: string;
}

export interface User {
  id: string;
  username: string;
}

export interface UserUpdate {
  username?: string;
  id?: string;
}

export type RequestParams = Omit<RequestInit, "body" | "method"> & {
  secure?: boolean;
};

type ApiConfig<SecurityDataType> = {
  baseUrl?: string;
  baseApiParams?: RequestParams;
  securityWorker?: (securityData: SecurityDataType) => RequestParams;
};

export class Api<SecurityDataType> {
  public baseUrl = "http://localhost:8080/api/v1";
  public title = "";
  public version = "";

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
      .then(data => data)
      .catch(e => response.text);

  public request = <T = any, E = any>(
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
      const data = await this.safeParseResponse<T, E>(response);
      if (!response.ok) throw data;
      return data;
    });

  auth = {
    /**
     * @tags Auth
     * @name Login
     * @request POST:/auth
     */
    login: (data: AuthUser, params?: RequestParams) => this.request<string, any>(`/auth`, "POST", params, data),

    /**
     * @tags Auth
     * @name Refresh
     * @request POST:/auth/refresh
     * @secure
     */
    refresh: (params?: RequestParams) => this.request<string, any>(`/auth/refresh`, "POST", params, null, true),
  };
  jobs = {
    /**
     * @tags Jobs
     * @name GetJobs
     * @request GET:/jobs
     * @secure
     */
    getJobs: (params?: RequestParams) => this.request<Job[], any>(`/jobs`, "GET", params, null, true),

    /**
     * @tags Jobs
     * @name AddJob
     * @request POST:/jobs
     * @secure
     */
    addJob: (data: Pick_Job_github, params?: RequestParams) =>
      this.request<string, any>(`/jobs`, "POST", params, data, true),

    /**
     * @tags Jobs
     * @name GetJob
     * @request GET:/jobs/{id}
     * @secure
     */
    getJob: (id: string, params?: RequestParams) => this.request<Job, any>(`/jobs/${id}`, "GET", params, null, true),

    /**
     * @tags Jobs
     * @name UpdateJob
     * @request PATCH:/jobs/{id}
     * @secure
     */
    updateJob: (id: string, data: JobUpdate, params?: RequestParams) =>
      this.request<UpdatedJob, any>(`/jobs/${id}`, "PATCH", params, data, true),

    /**
     * @tags Jobs
     * @name DeleteJob
     * @request DELETE:/jobs/{id}
     * @secure
     */
    deleteJob: (id: string, params?: RequestParams) =>
      this.request<any, any>(`/jobs/${id}`, "DELETE", params, null, true),
  };
  projects = {
    /**
     * @tags Projects
     * @name GetProjects
     * @request GET:/projects
     */
    getProjects: (params?: RequestParams) => this.request<Project[], any>(`/projects`, "GET", params, null),

    /**
     * @tags Projects
     * @name AddProjects
     * @request POST:/projects
     * @secure
     */
    addProjects: (data: ProjectUpdate, params?: RequestParams) =>
      this.request<string, any>(`/projects`, "POST", params, data, true),

    /**
     * @tags Projects
     * @name UpdateProject
     * @request PATCH:/projects/{id}
     * @secure
     */
    updateProject: (id: string, data: ProjectUpdate, params?: RequestParams) =>
      this.request<UpdatedProject, any>(`/projects/${id}`, "PATCH", params, data, true),
  };
  users = {
    /**
     * @tags Users
     * @name GetUsers
     * @request GET:/users
     * @secure
     */
    getUsers: (params?: RequestParams) => this.request<User[], any>(`/users`, "GET", params, null, true),

    /**
     * @tags Users
     * @name AddUser
     * @request POST:/users
     * @secure
     */
    addUser: (data: AuthUser, params?: RequestParams) => this.request<User, any>(`/users`, "POST", params, data, true),

    /**
     * @tags Users
     * @name DeleteUser
     * @request DELETE:/users/{id}
     * @secure
     */
    deleteUser: (id: string, params?: RequestParams) =>
      this.request<any, any>(`/users/${id}`, "DELETE", params, null, true),

    /**
     * @tags Users
     * @name UpdateUser
     * @request PATCH:/users/{id}
     * @secure
     */
    updateUser: (id: string, data: UserUpdate, params?: RequestParams) =>
      this.request<User, any>(`/users/${id}`, "PATCH", params, data, true),
  };
}
