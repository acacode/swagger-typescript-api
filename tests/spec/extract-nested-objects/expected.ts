/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface DatagridBody {
  _filter?: DatagridBodyFilter[];
  _sorting?: DatagridBodySorting[];
  _pagination?: DatagridBodyPagination;
}

export interface WorkdayStateBody {
  event?: WorkdayStateBodyEventEnum;
  dealership_uuid?: string;
}

export interface User {
  uuid?: string;
  ui_id?: number;
  oracle_id?: number;
  is_client?: boolean;
  is_employee?: boolean;
  username?: string;
  fullname?: string;
  work_day?: Workday;
  person?: Person;
  hr?: HR;
  telephones?: Telephone[];
  emails?: Email[];
  documents?: Document[];
  signatory_in_dealerships?: UserSignatoryInDealerships[];
  user_group_dealership?: UserGroupDealership[];
  managers?: UserManagers[];
  under_employees?: UserUnderEmployees[];
}

export interface Workday {
  uuid?: string;
  state?: boolean;
  date_begin?: string;
  date_finish?: string;
  dealership?: DealershipLite;
}

export interface DealershipLite {
  uuid?: string;
  name?: string;
  location?: DealershipLiteLocation;
  vehicle_manufacturer_brand?: DealershipLiteVehicleManufacturerBrand;
}

export interface ArrayOfDealershipsLite {
  data?: DealershipLite[];
}

export interface Person {
  uuid?: string;
  ui_id?: number;
  person_type?: PersonPersonType;
  date_begin?: string;
  date_finish?: string;
  surname?: string;
  name?: string;
  middlename?: string;
  gender_is_female?: boolean;
  birth_date?: string;
  driving_begin_date?: string;
  driving_begin_date_is_calc?: boolean;
  photo_url?: string;
  is_married?: boolean;
  famous_person_type?: PersonFamousPersonType;
  hide_personal_data?: boolean;
  children?: PersonChildren[];
  comments?: object[];
}

export interface HR {
  tabelniy_nomer?: number;
  post_name?: string;
  post_name_rod_padeg?: string;
  post_name_dat_padeg?: string;
  department_cfo?: string;
  department_name?: string;
  department_in_organization_structure?: string;
  internal_organization_uuid?: string;
}

export interface Telephone {
  uuid?: string;
  /** @example true */
  is_main?: boolean;
  country?: Country;
  telephone_number?: string;
  is_verified?: boolean;
  comments?: object;
  is_archived?: boolean;
}

export interface Country {
  alpha2?: string;
  alpha3?: string;
  code?: string;
  short_name?: string;
  name_rus?: string;
  name_eng?: string;
  uuid?: string;
}

export interface Email {
  uuid?: string;
  email_address?: string;
  /** @example true */
  is_verified?: boolean;
  /** @example true */
  is_main?: boolean;
}

export interface Document {
  uuid?: string;
  class?: DocumentClass;
  type?: DocumentType;
  /** @example null */
  subtype?: DocumentSubtype;
  /** @example null */
  series?: string;
  number?: string;
  /** @example null */
  gave_organization_name?: string;
  /** @example null */
  gave_department_code?: string;
  valid_since_date?: string;
  expired_date?: string;
  /** @example null */
  date_begin?: string;
  /** @example null */
  date_finish?: string;
  /** @example false */
  is_verified?: string;
  /** @example true */
  is_hidden_for_mobile_application?: string;
  /** @example null */
  vin?: string;
  /** @example null */
  vehicle_state_registration_number?: string;
  legal_user_uuid?: string;
  principal_for_power_of_attorney_uuid?: string;
  /** @example null */
  account_number_for_transponder?: string;
}

export interface UserGroup {
  uuid?: string;
  name?: string;
  /** @example null */
  operations_managers?: UserGroupOperationsManagers[];
  /** @example null */
  under_groups?: UserGroupUnderGroups[];
  business_domain?: UserGroupBusinessDomain[];
  business_subdomain?: UserGroupBusinessSubdomain[];
  business_tasks_subset?: UserGroupBusinessTasksSubset[];
}

export interface UserGroupDealership {
  uuid?: string;
  name?: string;
  /** @example null */
  operations_managers?: UserGroupDealershipOperationsManagers[];
  under_groups?: UserGroupDealershipUnderGroups[];
  business_domain?: UserGroupDealershipBusinessDomain[];
  business_subdomain?: UserGroupDealershipBusinessSubdomain[];
  business_tasks_subset?: UserGroupDealershipBusinessTasksSubset[];
  user_dealerships?: DealershipLite[];
}

export interface Type404Response {
  error?: Type404ResponseError;
}

export interface Type400Response {
  error?: Type400ResponseError;
}

export enum DatagridBodyUnionConditionEnum {
  Or = "or",
  And = "and",
}

export interface DatagridBodyFieldValue {
  unionCondition?: DatagridBodyUnionConditionEnum;
  values?: string[];
}

export interface DatagridBodyFilter {
  fieldUid?: string;
  fieldValue?: DatagridBodyFieldValue;
  field?: string;
  type?: string;
}

export enum DatagridBodyOrderEnum {
  Asc = "asc",
  Desc = "desc",
}

export interface DatagridBodySorting {
  field?: string;
  order?: DatagridBodyOrderEnum;
}

export interface DatagridBodyPagination {
  offset?: number;
  rowCount?: number;
}

export enum WorkdayStateBodyEventEnum {
  Begin = "begin",
  Finish = "finish",
}

export interface UserSignatoryInDealerships {
  uuid?: string;
  organization_uuid?: string;
}

export interface UserManagers {
  uuid?: string;
}

export interface UserUnderEmployees {
  uuid?: string;
}

export interface DealershipLiteLocation {
  uuid?: string;
  name?: string;
}

export interface DealershipLiteVehicleManufacturerBrand {
  uuid?: string;
}

export interface PersonPersonType {
  uuid?: string;
  name?: string;
}

export interface PersonFamousPersonType {
  uuid?: string;
  name?: string;
}

export interface PersonChildren {
  uuid?: string;
  birth_year?: number;
  gender_is_female?: boolean;
}

export interface DocumentClass {
  name?: string;
  uuid?: string;
}

export interface DocumentType {
  name?: string;
  uuid?: string;
  class_uuid?: string;
  imenitelny_padezh?: string;
  roditelny_padezh?: string;
  short_name?: string;
}

/** @example null */
export interface DocumentSubtype {
  uuid?: string;
  type_uuid?: string;
  name?: string;
}

export interface UserGroupOperationsManagers {
  /** @example null */
  uuid?: string;
}

export interface UserGroupUnderGroups {
  /** @example null */
  uuid?: string;
}

export interface UserGroupBusinessDomain {
  uuid?: string;
}

export interface UserGroupBusinessSubdomain {
  uuid?: string;
}

export interface UserGroupBusinessTasksSubset {
  uuid?: string;
}

export interface UserGroupDealershipOperationsManagers {
  uuid?: string;
}

export interface UserGroupDealershipUnderGroups {
  uuid?: string;
}

export interface UserGroupDealershipBusinessDomain {
  uuid?: string;
}

export interface UserGroupDealershipBusinessSubdomain {
  uuid?: string;
}

export interface UserGroupDealershipBusinessTasksSubset {
  uuid?: string;
}

export interface Type404ResponseError {
  code?: string;
  detail?: string;
}

export interface Type400ResponseError {
  code?: string;
  detail?: string;
}

export interface UsersDetailParams {
  format?: string;
  id: string;
}

export type UsersDetailData = User;

export interface UsersDetailParams11 {
  format?: string;
}

export interface UsersDetailParams12 {
  id: string;
}

export namespace V3 {
  /**
   * No description
   * @tags users
   * @name UsersDetail
   * @summary get users
   * @request GET:/v3/users/{id}
   */
  export namespace UsersDetail {
    export type RequestParams = UsersDetailParams12;
    export type RequestQuery = UsersDetailParams11;
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = UsersDetailData;
  }
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
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

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Some Public API
 * @version 1.4.1
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  v3 = {
    /**
     * No description
     *
     * @tags users
     * @name UsersDetail
     * @summary get users
     * @request GET:/v3/users/{id}
     */
    usersDetail: ({ id, ...query }: UsersDetailParams, params: RequestParams = {}) =>
      this.request<UsersDetailData, any>({
        path: `/v3/users/${id}`,
        method: "GET",
        query: query,
        ...params,
      }),
  };
}
