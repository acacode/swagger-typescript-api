export interface AuthUser {
  username:string,
  password:string,
}
export enum Kind {
  COMPANY = "COMPANY",
  PERSONAL = "PERSONAL",
  FREELANCE = "FREELANCE",
  OPEN_SOURCE = "OPEN_SOURCE" 
 }
export interface Job {
  id:string,
  kind:Kind,
  name?:string,
  link?:string,
  github?:string,
  npm?:string,
  isTool?:boolean,
  address?:string,
}
export interface NewJob {
  kind:Kind,
  name?:string,
  link?:string,
  github?:string,
  npm?:string,
  isTool?:boolean,
  address?:string,
}
export interface Project {
  id:string,
  year:number,
  description:string,
  job?:Job,
  name?:string,
  notImportant?:boolean,
  prefix?:string,
  tags:string[],
  teamSize?:string,
}
export interface NewProject {
  year:number,
  description:string,
  name?:string,
  notImportant?:boolean,
  prefix?:string,
  tags:string[],
  teamSize?:string,
  job:string,
}
export interface User {
  id:string,
  username:string,
}
export interface UserUpdate {
  id?:string,
  username?:string,
}

export type ApiParams = Omit<RequestInit, "body" | "method">

type ApiConfig<SecurityDataType> = {
  baseUrl?: string,
  securityWorker?: (securityData: SecurityDataType) => ApiParams,
}



export class Api<SecurityDataType> {
  
  public baseUrl = "https://localhost:3000/api/v1";
  public title = "ts-mongodb-server";
  public version = "1.0.0";
  
  private securityData: SecurityDataType;
  private securityWorker: ApiConfig<SecurityDataType>["securityWorker"] = (() => {}) as any
  
  private defaultRequestParams: ApiParams = {
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  }

  constructor({ baseUrl,securityWorker, }: ApiConfig<SecurityDataType> = {}) {
    this.baseUrl = baseUrl || this.baseUrl;
    this.securityWorker = securityWorker || this.securityWorker;
  }

  public setSecurityData = (data: SecurityDataType) => {
    this.securityData = data
  }

  private mergeRequestOptions(params: ApiParams, securityParams?: ApiParams): ApiParams {
    return {
      ...this.defaultRequestParams,
      ...params,
      ...(securityParams || {}),
      headers: {
        ...(this.defaultRequestParams.headers || {}),
        ...(params.headers || {}),
        ...((securityParams && securityParams.headers) || {})
      }
    }
  }
  
  public request = <T = any>(path: string, method: string, body: any, params: ApiParams = {}, isSecure?: boolean): Promise<T> =>
    fetch(`${this.baseUrl}${path}`, {
      ...this.mergeRequestOptions(params, isSecure && this.securityWorker(this.securityData)),
      method,
      body: body ? JSON.stringify(body) : null,
    }).then(response => response.json())



    auth = {


        /**
        * @tags Auth
        * @name Login
        */
        login: (data: AuthUser, params: ApiParams = {}) =>
          this.request<string>(`/auth`, "POST", data, params),


        /**
        * @tags Auth
        * @name Refresh
        * @security true
        */
        refresh: (params: ApiParams = {}) =>
          this.request<string>(`/auth/refresh`, "POST", null, params, true),
    }
    jobs = {


        /**
        * @tags Jobs
        * @name GetJob
        * @security true
        */
        getJob: (id: string, params: ApiParams = {}) =>
          this.request<Job>(`/jobs/${id}`, "GET", null, params, true),


        /**
        * @tags Jobs
        * @name AddJob
        * @security true
        */
        addJob: (data: NewJob, params: ApiParams = {}) =>
          this.request<string>(`/jobs`, "POST", data, params, true),
    }
    projects = {


        /**
        * @tags Projects
        * @name GetProjects
        */
        getProjects: (params: ApiParams = {}) =>
          this.request<Project[]>(`/projects`, "GET", null, params),


        /**
        * @tags Projects
        * @name AddProjects
        * @security true
        */
        addProjects: (data: NewProject, params: ApiParams = {}) =>
          this.request<string>(`/projects`, "POST", data, params, true),
    }
    users = {


        /**
        * @tags Users
        * @name GetUsers
        * @security true
        */
        getUsers: (params: ApiParams = {}) =>
          this.request<User[]>(`/users`, "GET", null, params, true),


        /**
        * @tags Users
        * @name AddUser
        * @security true
        */
        addUser: (data: AuthUser, params: ApiParams = {}) =>
          this.request<User>(`/users`, "POST", data, params, true),


        /**
        * @tags Users
        * @name DeleteUser
        * @security true
        */
        deleteUser: (id: string, params: ApiParams = {}) =>
          this.request<any>(`/users/${id}`, "DELETE", null, params, true),


        /**
        * @tags Users
        * @name UpdateUser
        * @security true
        */
        updateUser: (id: string, data: UserUpdate, params: ApiParams = {}) =>
          this.request<User>(`/users/${id}`, "PATCH", data, params, true),
    }

}
