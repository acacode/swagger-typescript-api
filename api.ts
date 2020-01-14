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
export interface NewJob {
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
  job?: Job,
  name?: string,
  notImportant?: boolean,
  prefix?: string,
  tags: string[],
  teamSize?: string,
}
export interface NewProject {
  year: number,
  description: string,
  name?: string,
  notImportant?: boolean,
  prefix?: string,
  tags: string[],
  teamSize?: string,
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
  
  public baseUrl = "https://localhost:3000/api/v1";
  public title = "ts-mongodb-server";
  public version = "1.0.0";
  
  private securityData: SecurityDataType;
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
  
  public request = <T = any>(path: string, method: string, params: ApiParams = {}, body?: any, isSecure?: boolean): Promise<T> =>
    fetch(`${this.baseUrl}${path}`, {
      ...this.mergeRequestOptions(params, isSecure && this.securityWorker(this.securityData)),
      method,
      body: body ? JSON.stringify(body) : null,
    }).then(response => response.json())



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
        * @name GetJob
        * @request GET:/jobs/{id}
        * @security true
        */
        getJob: (id: string, params: ApiParams = {}) =>
          this.request<Job>(`/jobs/${id}`, "GET", params, null, true),


        /**
        * @tags Jobs
        * @name AddJob
        * @request POST:/jobs
        * @security true
        */
        addJob: (data: NewJob, params: ApiParams = {}) =>
          this.request<string>(`/jobs`, "POST", params, data, true),
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
        addProjects: (data: NewProject, params: ApiParams = {}) =>
          this.request<string>(`/projects`, "POST", params, data, true),
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
