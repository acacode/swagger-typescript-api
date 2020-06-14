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

/**
 * From T, pick a set of properties whose keys are in the union K
 */
export interface PickUserTypeExcludeKeysIdOrId {
  username: string;
  password: string;
}

export type OmitUserTypeIdOrId = PickUserTypeExcludeKeysIdOrId;

export type OmitId_UserType_ = OmitUserTypeIdOrId;

export type AuthUserType = OmitId_UserType_;

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

export type OmitId_JobType_ = OmitJobTypeIdOrId;

export type JobUpdateType = OmitId_JobType_;

/**
 * From T, pick a set of properties whose keys are in the union K
 */
export interface Pick_ProjectType_ExcludeKeys_job {
  id: string;
  name?: string;
  year: number;
  description: string;
  notImportant?: boolean;
  prefix?: string;
  tags: string[];
  teamSize: string;
}

export type Omit_ProjectType_job_ = Pick_ProjectType_ExcludeKeys_job;

export type ExtractedProjectType = Omit_ProjectType_job_ & { job: JobType };

/**
 * From T, pick a set of properties whose keys are in the union K
 */
export interface PickProjectTypeExcludeKeysIdOrId {
  name?: string;
  job: string;
  year: number;
  description: string;
  notImportant?: boolean;
  prefix?: string;
  tags: string[];
  teamSize: string;
}

export type OmitProjectTypeIdOrId = PickProjectTypeExcludeKeysIdOrId;

export type OmitId_ProjectType_ = OmitProjectTypeIdOrId;

export type ProjectUpdateType = OmitId_ProjectType_;

export interface ProjectType {
  id: string;
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

type ApiConfig<SecurityDataType> = {
  baseUrl?: string;
  baseApiParams?: RequestParams;
  securityWorker?: (securityData: SecurityDataType) => RequestParams;
};

const enum BodyType {
  Json,
}

class HttpClient<SecurityDataType> {
  public baseUrl: string = "http://localhost:8080/api/v1";
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

  private bodyFormatters: Record<BodyType, (input: any) => any> = {
    [BodyType.Json]: JSON.stringify,
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
      .then((data) => data)
      .catch((e) => response.text);

  public request = <T = any, E = any>(
    path: string,
    method: string,
    { secure, ...params }: RequestParams = {},
    body?: any,
    bodyType?: BodyType,
    secureByDefault?: boolean,
  ): Promise<T> =>
    fetch(`${this.baseUrl}${path}`, {
      // @ts-ignore
      ...this.mergeRequestOptions(params, (secureByDefault || secure) && this.securityWorker(this.securityData)),
      method,
      body: body ? this.bodyFormatters[bodyType || BodyType.Json](body) : null,
    }).then(async (response) => {
      const data = await this.safeParseResponse<T, E>(response);
      if (!response.ok) throw data;
      return data;
    });
}

/**
 * @title Api
 * @baseUrl http://localhost:8080/api/v1
 */
export class Api<SecurityDataType = any> extends HttpClient<SecurityDataType> {
  auth = {
    /**
     * @tags Auth
     * @name Login
     * @request POST:/auth
     */
    login: (data: AuthUserType, params?: RequestParams) => this.request<string, any>(`/auth`, "POST", params, data),

    /**
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
     * @tags Jobs
     * @name GetJobs
     * @request GET:/jobs
     * @secure
     */
    getJobs: (params?: RequestParams) =>
      this.request<JobType[], any>(`/jobs`, "GET", params, null, BodyType.Json, true),

    /**
     * @tags Jobs
     * @name AddJob
     * @request POST:/jobs
     * @secure
     */
    addJob: (data: JobUpdateType, params?: RequestParams) =>
      this.request<string, any>(`/jobs`, "POST", params, data, BodyType.Json, true),

    /**
     * @tags Jobs
     * @name GetJob
     * @request GET:/jobs/{id}
     * @secure
     */
    getJob: (id: string, params?: RequestParams) =>
      this.request<JobType, any>(`/jobs/${id}`, "GET", params, null, BodyType.Json, true),

    /**
     * @tags Jobs
     * @name UpdateJob
     * @request PATCH:/jobs/{id}
     * @secure
     */
    updateJob: (id: string, data: JobUpdateType, params?: RequestParams) =>
      this.request<JobType, any>(`/jobs/${id}`, "PATCH", params, data, BodyType.Json, true),

    /**
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
     * @tags Projects
     * @name GetProjects
     * @request GET:/projects
     */
    getProjects: (params?: RequestParams) => this.request<ExtractedProjectType[], any>(`/projects`, "GET", params),

    /**
     * @tags Projects
     * @name AddProjects
     * @request POST:/projects
     * @secure
     */
    addProjects: (data: ProjectUpdateType, params?: RequestParams) =>
      this.request<string, any>(`/projects`, "POST", params, data, BodyType.Json, true),

    /**
     * @tags Projects
     * @name UpdateProject
     * @request PATCH:/projects/{id}
     * @secure
     */
    updateProject: (id: string, data: ProjectUpdateType, params?: RequestParams) =>
      this.request<ProjectType, any>(`/projects/${id}`, "PATCH", params, data, BodyType.Json, true),

    /**
     * @tags Projects
     * @name DeleteProject
     * @request DELETE:/projects/{id}
     */
    deleteProject: (id: string, params?: RequestParams) => this.request<any, any>(`/projects/${id}`, "DELETE", params),
  };
}
