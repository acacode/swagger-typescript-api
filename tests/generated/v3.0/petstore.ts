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

export type StringNullable = string | null;

export interface Pet {
  id: number;
  name: string;
  tag?: string;
}

export type Pets = Pet[];

export interface Error {
  code: number;
  message: string;
}

export type RequestParams = Omit<RequestInit, "body" | "method"> & {
  secure?: boolean;
};

export type RequestQueryParamsType = Record<string, string | string[] | number | number[] | boolean | undefined>;

type ApiConfig<SecurityDataType> = {
  baseUrl?: string;
  baseApiParams?: RequestParams;
  securityWorker?: (securityData: SecurityDataType) => RequestParams;
};

const enum BodyType {
  Json,
}

class HttpClient<SecurityDataType> {
  public baseUrl: string = "http://petstore.swagger.io/v1";
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

  private addQueryParam(query: RequestQueryParamsType, key: string) {
    return (
      encodeURIComponent(key) +
      "=" +
      encodeURIComponent(Array.isArray(query[key]) ? (query[key] as any).join(",") : query[key])
    );
  }

  protected addQueryParams(query?: RequestQueryParamsType): string {
    const fixedQuery = query || {};
    const keys = Object.keys(fixedQuery).filter((key) => "undefined" !== typeof fixedQuery[key]);
    return keys.length === 0 ? "" : `?${keys.map((key) => this.addQueryParam(fixedQuery, key)).join("&")}`;
  }

  private bodyFormatters: Record<BodyType, (input: object) => any> = {
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
 * @title Swagger Petstore
 * @version 1.0.0
 * @baseUrl http://petstore.swagger.io/v1
 */
export class Api<SecurityDataType = any> extends HttpClient<SecurityDataType> {
  pets = {
    /**
     * @tags pets
     * @name listPets
     * @summary List all pets
     * @request GET:/pets
     */
    listPets: (query?: { limit?: number }, params?: RequestParams) =>
      this.request<Pets, Error>(`/pets${this.addQueryParams(query)}`, "GET", params),

    /**
     * @tags pets
     * @name createPets
     * @summary Create a pet
     * @request POST:/pets
     */
    createPets: (params?: RequestParams) => this.request<any, Error>(`/pets`, "POST", params),

    /**
     * @tags pets
     * @name showPetById
     * @summary Info for a specific pet
     * @request GET:/pets/{petId}
     */
    showPetById: (petId: string, params?: RequestParams) => this.request<Pet, Error>(`/pets/${petId}`, "GET", params),
  };
}
