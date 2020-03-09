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

export type Pet = NewPet & { id: number };

/**
 * Description of Test type
 */
export type Test = NewPet;

export interface Test2 {
  /**
   * Field description
   */
  data?: NewPet;
}

export interface NewPet {
  name: string;
  tag?: string;
}

export interface ErrorModel {
  code: number;
  message: string;
}

export type RequestParams = Omit<RequestInit, "body" | "method"> & {
  secure?: boolean;
};

type ApiConfig<SecurityDataType> = {
  baseUrl?: string;
  baseApiParams?: RequestParams;
  securityWorker?: (securityData: SecurityDataType) => RequestParams;
};

/** A sample API that uses a petstore as an example to demonstrate features in the swagger-2.0 specification */
export class Api<SecurityDataType> {
  public baseUrl = "http://petstore.swagger.io/api";
  public title = "Swagger Petstore";
  public version = "1.0.0";

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

  private addQueryParams(query: Record<string, string | string[] | number | number[] | boolean | undefined>): string {
    const keys = Object.keys(query).filter(key => "undefined" !== typeof query[key]);
    return keys.length === 0
      ? ""
      : "?" +
          keys
            .map(
              key =>
                encodeURIComponent(key) +
                "=" +
                encodeURIComponent(Array.isArray(query[key]) ? (query[key] as any).join(",") : query[key]),
            )
            .join("&");
  }

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

  pets = {
    /**
     * @name findPets
     * @request GET:/pets
     * @description Returns all pets from the system that the user has access to
     */
    findPets: (query: { tags?: string[]; limit?: number }, params?: RequestParams) =>
      this.request<Pet[], ErrorModel>(`/pets${this.addQueryParams(query)}`, "GET", params, null),

    /**
     * @name addPet
     * @request POST:/pets
     * @description Creates a new pet in the store.  Duplicates are allowed
     */
    addPet: (pet: NewPet, params?: RequestParams) => this.request<Pet, ErrorModel>(`/pets`, "POST", params, pet),

    /**
     * @name findPetById
     * @request GET:/pets/{id}
     * @description Returns a user based on a single ID, if the user does not have access to the pet
     */
    findPetById: (id: number, params?: RequestParams) =>
      this.request<Pet, ErrorModel>(`/pets/${id}`, "GET", params, null),

    /**
     * @name deletePet
     * @request DELETE:/pets/{id}
     * @description deletes a single pet based on the ID supplied
     */
    deletePet: (id: number, params?: RequestParams) =>
      this.request<any, ErrorModel>(`/pets/${id}`, "DELETE", params, null),
  };
}
