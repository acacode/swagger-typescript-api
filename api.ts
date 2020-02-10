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
  username: string,
  password: string,
}

export enum Kind {
  COMPANY = "COMPANY",
  PERSONAL = "PERSONAL",
  FREELANCE = "FREELANCE",
  OPEN_SOURCE = "OPEN_SOURCE" 
 }

export interface Job {
  id: string,
  kind: Kind,
  name?: string,
  link?: string,
  github?: string,
  npm?: string,
  isTool?: boolean,
  address?: string,
}

export interface JobUpdate {
  kind: Kind,
  name?: string,
  link?: string,
  github?: string,
  npm?: string,
  isTool?: boolean,
  address?: string,
}

export interface Project {
  id: string,
  year: number,
  description: string,
  job: Job,
  name?: string,
  notImportant?: boolean,
  prefix?: string,
  tags: string[],
  teamSize: string,
}

export interface ProjectUpdate {
  year: number,
  description: string,
  name?: string,
  notImportant?: boolean,
  prefix?: string,
  tags: string[],
  teamSize: string,
  job: string,
}

export interface UpdatedProject {
  id: string,
  year: number,
  description: string,
  name?: string,
  notImportant?: boolean,
  prefix?: string,
  tags: string[],
  teamSize: string,
  job: string,
}

export interface User {
  id: string,
  username: string,
}

export interface UserUpdate {
  id?: string,
  username?: string,
}

export type ApiParams = Omit<RequestInit, "body" | "method">

type ApiConfig<SecurityDataType> = {
  baseUrl?: string,
  baseApiParams?: ApiParams,
  securityWorker?: (securityData: SecurityDataType) => ApiParams,
}



export class Api<SecurityDataType> {
  
  public baseUrl = "http://localhost:8080/api/v1";
  public title = "";
  public version = "";
  
  private securityData: SecurityDataType = (null as any);
  private securityWorker: ApiConfig<SecurityDataType>["securityWorker"] = (() => {}) as any
  
  private baseApiParams: ApiParams = {
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


  private mergeRequestOptions(params: ApiParams, securityParams?: ApiParams): ApiParams {
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
  
  public request = <T = any>(path: string, method: string, params: ApiParams = {}, body?: any, isSecure?: boolean): Promise<T> =>
    fetch(`${this.baseUrl}${path}`, {
      // @ts-ignore
      ...this.mergeRequestOptions(params, isSecure && this.securityWorker(this.securityData)),
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
    login: (data: AuthUser, params: ApiParams = {}) =>
      this.request<string>(`/auth`, "POST", params, data),


    /**
    * @tags Auth
    * @name Refresh
    * @request POST:/auth/refresh
    * @security true
    */
    refresh: (params: ApiParams = {}) =>
      this.request<string>(`/auth/refresh`, "POST", params, null, true),
  }
  jobs = {


    /**
    * @tags Jobs
    * @name GetJobs
    * @request GET:/jobs
    * @security true
    */
    getJobs: (params: ApiParams = {}) =>
      this.request<Job[]>(`/jobs`, "GET", params, null, true),


    /**
    * @tags Jobs
    * @name AddJob
    * @request POST:/jobs
    * @security true
    */
    addJob: (data: JobUpdate, params: ApiParams = {}) =>
      this.request<string>(`/jobs`, "POST", params, data, true),


    /**
    * @tags Jobs
    * @name GetJob
    * @request GET:/jobs/{id}
    * @security true
    */
    getJob: (id: string, params: ApiParams = {}) =>
      this.request<Job>(`/jobs/${id}`, "GET", params, null, true),
  }
  projects = {


    /**
    * @tags Projects
    * @name GetProjects
    * @request GET:/projects
    */
    getProjects: (params: ApiParams = {}) =>
      this.request<Project[]>(`/projects`, "GET", params, null),


    /**
    * @tags Projects
    * @name AddProjects
    * @request POST:/projects
    * @security true
    */
    addProjects: (data: ProjectUpdate, params: ApiParams = {}) =>
      this.request<string>(`/projects`, "POST", params, data, true),


    /**
    * @tags Projects
    * @name UpdateProject
    * @request PATCH:/projects/{id}
    * @security true
    */
    updateProject: (id: string, data: ProjectUpdate, params: ApiParams = {}) =>
      this.request<UpdatedProject>(`/projects/${id}`, "PATCH", params, data, true),
  }
  users = {


    /**
    * @tags Users
    * @name GetUsers
    * @request GET:/users
    * @security true
    */
    getUsers: (params: ApiParams = {}) =>
      this.request<User[]>(`/users`, "GET", params, null, true),


    /**
    * @tags Users
    * @name AddUser
    * @request POST:/users
    * @security true
    */
    addUser: (data: AuthUser, params: ApiParams = {}) =>
      this.request<User>(`/users`, "POST", params, data, true),


    /**
    * @tags Users
    * @name DeleteUser
    * @request DELETE:/users/{id}
    * @security true
    */
    deleteUser: (id: string, params: ApiParams = {}) =>
      this.request<any>(`/users/${id}`, "DELETE", params, null, true),


    /**
    * @tags Users
    * @name UpdateUser
    * @request PATCH:/users/{id}
    * @security true
    */
    updateUser: (id: string, data: UserUpdate, params: ApiParams = {}) =>
      this.request<User>(`/users/${id}`, "PATCH", params, data, true),
  }

}
