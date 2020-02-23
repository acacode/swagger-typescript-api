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
  OPEN_SOURCE = "OPEN_SOURCE" 
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

export interface JobUpdate {
  kind: Kind;
  name?: string;
  link?: string;
  github?: string;
  npm?: string;
  isTool?: boolean;
  address?: string;
}

export interface UpdatedJob {
  id: string;
  kind: Kind;
  name?: string;
  link?: string;
  github?: string;
  npm?: string;
  isTool?: boolean;
  address?: string;
}

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

export interface ProjectUpdate {
  year: number;
  description: string;
  name?: string;
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
  id?: string;
  username?: string;
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
  
  public baseUrl = "http://localhost:8080/api/v1";
  public title = "";
  public version = "";

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



  auth = {


    /**
    * @tags Auth
    * @name Login
    * @request POST:/auth
    */
    login: (data: AuthUser, params?: RequestParams) =>
      this.request<string>(`/auth`, "POST", params, data),


    /**
    * @tags Auth
    * @name Refresh
    * @request POST:/auth/refresh
    * @secure
    */
    refresh: (params?: RequestParams) =>
      this.request<string>(`/auth/refresh`, "POST", params, null, true),
  }
  jobs = {


    /**
    * @tags Jobs
    * @name GetJobs
    * @request GET:/jobs
    * @secure
    */
    getJobs: (params?: RequestParams) =>
      this.request<Job[]>(`/jobs`, "GET", params, null, true),


    /**
    * @tags Jobs
    * @name AddJob
    * @request POST:/jobs
    * @secure
    */
    addJob: (data: JobUpdate, params?: RequestParams) =>
      this.request<string>(`/jobs`, "POST", params, data, true),


    /**
    * @tags Jobs
    * @name GetJob
    * @request GET:/jobs/{id}
    * @secure
    */
    getJob: (id: string, params?: RequestParams) =>
      this.request<Job>(`/jobs/${id}`, "GET", params, null, true),


    /**
    * @tags Jobs
    * @name UpdateJob
    * @request PATCH:/jobs/{id}
    * @secure
    */
    updateJob: (id: string, data: JobUpdate, params?: RequestParams) =>
      this.request<UpdatedJob>(`/jobs/${id}`, "PATCH", params, data, true),
  }
  projects = {


    /**
    * @tags Projects
    * @name GetProjects
    * @request GET:/projects
    */
    getProjects: (params?: RequestParams) =>
      this.request<Project[]>(`/projects`, "GET", params, null),


    /**
    * @tags Projects
    * @name AddProjects
    * @request POST:/projects
    * @secure
    */
    addProjects: (data: ProjectUpdate, params?: RequestParams) =>
      this.request<string>(`/projects`, "POST", params, data, true),


    /**
    * @tags Projects
    * @name UpdateProject
    * @request PATCH:/projects/{id}
    * @secure
    */
    updateProject: (id: string, data: ProjectUpdate, params?: RequestParams) =>
      this.request<UpdatedProject>(`/projects/${id}`, "PATCH", params, data, true),
  }
  users = {


    /**
    * @tags Users
    * @name GetUsers
    * @request GET:/users
    * @secure
    */
    getUsers: (params?: RequestParams) =>
      this.request<User[]>(`/users`, "GET", params, null, true),


    /**
    * @tags Users
    * @name AddUser
    * @request POST:/users
    * @secure
    */
    addUser: (data: AuthUser, params?: RequestParams) =>
      this.request<User>(`/users`, "POST", params, data, true),


    /**
    * @tags Users
    * @name DeleteUser
    * @request DELETE:/users/{id}
    * @secure
    */
    deleteUser: (id: string, params?: RequestParams) =>
      this.request<any>(`/users/${id}`, "DELETE", params, null, true),


    /**
    * @tags Users
    * @name UpdateUser
    * @request PATCH:/users/{id}
    * @secure
    */
    updateUser: (id: string, data: UserUpdate, params?: RequestParams) =>
      this.request<User>(`/users/${id}`, "PATCH", params, data, true),
  }

}
