

export type AuthUser = {
  username:string,
  password:string,
}
export enum Kind {
  COMPANY = "COMPANY",
  PERSONAL = "PERSONAL",
  FREELANCE = "FREELANCE",
  OPEN_SOURCE = "OPEN_SOURCE" 
 }
export type Job = {
  id:string,
  kind:Kind,
  name?:string,
  link?:string,
  github?:string,
  npm?:string,
  isTool?:boolean,
  address?:string,
}
export type NewJob = {
  kind:Kind,
  name?:string,
  link?:string,
  github?:string,
  npm?:string,
  isTool?:boolean,
  address?:string,
}
export type Project = {
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
export type NewProject = {
  year:number,
  description:string,
  name?:string,
  notImportant?:boolean,
  prefix?:string,
  tags:string[],
  teamSize?:string,
  job:string,
}
export type User = {
  id:string,
  username:string,
}
export type UserUpdate = {
  id?:string,
  username?:string,
}


export type ApiParams = Omit<RequestInit, "body" | "method">

type ApiConfig<SecurityDataType> = {
  baseUrl?: string,
  securityWorker?: (securityData: SecurityDataType) => ApiParams
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

  constructor({ securityWorker, baseUrl }: ApiConfig<SecurityDataType> = {}) {
    this.baseUrl = baseUrl || this.baseUrl;
    this.securityWorker = securityWorker || this.securityWorker;
  }
  public setSecurityData = (data: SecurityDataType) => {
    this.securityData = data
  }

  

  /**
   * @tags Auth
   * @name Login
   */
  login = (data: AuthUser, params: ApiParams = {}): Promise<string> =>
    fetch(`${this.baseUrl}/auth`, {
      ...this.defaultRequestParams,
      method: 'POST',
      body: JSON.stringify(data),
      ...params,
    }).then(response => response.json()) 
    

  /**
   * @tags Auth
   * @name Refresh
   * @security true
   */
  refresh = (params: ApiParams = {}): Promise<string> =>
    fetch(`${this.baseUrl}/auth/refresh`, {
      ...this.defaultRequestParams,
      method: 'POST',
      body: null,
      ...params,
      ...(this.securityWorker(this.securityData))
    }).then(response => response.json()) 
    

  /**
   * @tags Jobs
   * @name GetJob
   * @security true
   */
  getJob = (id: string, params: ApiParams = {}): Promise<Job> =>
    fetch(`${this.baseUrl}/jobs/${id}`, {
      ...this.defaultRequestParams,
      method: 'GET',
      body: null,
      ...params,
      ...(this.securityWorker(this.securityData))
    }).then(response => response.json()) 
    

  /**
   * @tags Jobs
   * @name AddJob
   * @security true
   */
  addJob = (data: NewJob, params: ApiParams = {}): Promise<string> =>
    fetch(`${this.baseUrl}/jobs`, {
      ...this.defaultRequestParams,
      method: 'POST',
      body: JSON.stringify(data),
      ...params,
      ...(this.securityWorker(this.securityData))
    }).then(response => response.json()) 
    

  /**
   * @tags Projects
   * @name GetProjects
   */
  getProjects = (params: ApiParams = {}): Promise<Project[]> =>
    fetch(`${this.baseUrl}/projects`, {
      ...this.defaultRequestParams,
      method: 'GET',
      body: null,
      ...params,
    }).then(response => response.json()) 
    

  /**
   * @tags Projects
   * @name AddProjects
   * @security true
   */
  addProjects = (data: NewProject, params: ApiParams = {}): Promise<string> =>
    fetch(`${this.baseUrl}/projects`, {
      ...this.defaultRequestParams,
      method: 'POST',
      body: JSON.stringify(data),
      ...params,
      ...(this.securityWorker(this.securityData))
    }).then(response => response.json()) 
    

  /**
   * @tags Users
   * @name GetUsers
   * @security true
   */
  getUsers = (params: ApiParams = {}): Promise<User[]> =>
    fetch(`${this.baseUrl}/users`, {
      ...this.defaultRequestParams,
      method: 'GET',
      body: null,
      ...params,
      ...(this.securityWorker(this.securityData))
    }).then(response => response.json()) 
    

  /**
   * @tags Users
   * @name AddUser
   * @security true
   */
  addUser = (data: AuthUser, params: ApiParams = {}): Promise<User> =>
    fetch(`${this.baseUrl}/users`, {
      ...this.defaultRequestParams,
      method: 'POST',
      body: JSON.stringify(data),
      ...params,
      ...(this.securityWorker(this.securityData))
    }).then(response => response.json()) 
    

  /**
   * @tags Users
   * @name DeleteUser
   * @security true
   */
  deleteUser = (id: string, params: ApiParams = {}): Promise<any> =>
    fetch(`${this.baseUrl}/users/${id}`, {
      ...this.defaultRequestParams,
      method: 'DELETE',
      body: null,
      ...params,
      ...(this.securityWorker(this.securityData))
    }).then(response => response.json()) 
    

  /**
   * @tags Users
   * @name UpdateUser
   * @security true
   */
  updateUser = (id: string, data: UserUpdate, params: ApiParams = {}): Promise<User> =>
    fetch(`${this.baseUrl}/users/${id}`, {
      ...this.defaultRequestParams,
      method: 'PATCH',
      body: JSON.stringify(data),
      ...params,
      ...(this.securityWorker(this.securityData))
    }).then(response => response.json()) 
    
}
