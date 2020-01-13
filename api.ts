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



  /**
   * @tags Auth
   * @name Login
   */
  login = (data: AuthUser, params: ApiParams = {}): Promise<string> =>
    fetch(`${this.baseUrl}/auth`, {
      ...this.mergeRequestOptions(params),
      method: "POST",
      body: JSON.stringify(data),
    }).then(response => response.json())


  /**
   * @tags Auth
   * @name Refresh
   * @security true
   */
  refresh = (params: ApiParams = {}): Promise<string> =>
    fetch(`${this.baseUrl}/auth/refresh`, {
      ...this.mergeRequestOptions(params, this.securityWorker(this.securityData)),
      method: "POST",
      body: null,
    }).then(response => response.json())


  /**
   * @tags Jobs
   * @name GetJob
   * @security true
   */
  getJob = (id: string, params: ApiParams = {}): Promise<Job> =>
    fetch(`${this.baseUrl}/jobs/${id}`, {
      ...this.mergeRequestOptions(params, this.securityWorker(this.securityData)),
      method: "GET",
      body: null,
    }).then(response => response.json())


  /**
   * @tags Jobs
   * @name AddJob
   * @security true
   */
  addJob = (data: NewJob, params: ApiParams = {}): Promise<string> =>
    fetch(`${this.baseUrl}/jobs`, {
      ...this.mergeRequestOptions(params, this.securityWorker(this.securityData)),
      method: "POST",
      body: JSON.stringify(data),
    }).then(response => response.json())


  /**
   * @tags Projects
   * @name GetProjects
   */
  getProjects = (params: ApiParams = {}): Promise<Project[]> =>
    fetch(`${this.baseUrl}/projects`, {
      ...this.mergeRequestOptions(params),
      method: "GET",
      body: null,
    }).then(response => response.json())


  /**
   * @tags Projects
   * @name AddProjects
   * @security true
   */
  addProjects = (data: NewProject, params: ApiParams = {}): Promise<string> =>
    fetch(`${this.baseUrl}/projects`, {
      ...this.mergeRequestOptions(params, this.securityWorker(this.securityData)),
      method: "POST",
      body: JSON.stringify(data),
    }).then(response => response.json())


  /**
   * @tags Users
   * @name GetUsers
   * @security true
   */
  getUsers = (params: ApiParams = {}): Promise<User[]> =>
    fetch(`${this.baseUrl}/users`, {
      ...this.mergeRequestOptions(params, this.securityWorker(this.securityData)),
      method: "GET",
      body: null,
    }).then(response => response.json())


  /**
   * @tags Users
   * @name AddUser
   * @security true
   */
  addUser = (data: AuthUser, params: ApiParams = {}): Promise<User> =>
    fetch(`${this.baseUrl}/users`, {
      ...this.mergeRequestOptions(params, this.securityWorker(this.securityData)),
      method: "POST",
      body: JSON.stringify(data),
    }).then(response => response.json())


  /**
   * @tags Users
   * @name DeleteUser
   * @security true
   */
  deleteUser = (id: string, params: ApiParams = {}): Promise<any> =>
    fetch(`${this.baseUrl}/users/${id}`, {
      ...this.mergeRequestOptions(params, this.securityWorker(this.securityData)),
      method: "DELETE",
      body: null,
    }).then(response => response.json())


  /**
   * @tags Users
   * @name UpdateUser
   * @security true
   */
  updateUser = (id: string, data: UserUpdate, params: ApiParams = {}): Promise<User> =>
    fetch(`${this.baseUrl}/users/${id}`, {
      ...this.mergeRequestOptions(params, this.securityWorker(this.securityData)),
      method: "PATCH",
      body: JSON.stringify(data),
    }).then(response => response.json())

}
