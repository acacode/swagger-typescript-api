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
 * An order for a pets from the pet store
 */
export interface Order {
  id?: number;
  petId?: number;
  quantity?: number;
  shipDate?: string;

  /** Order Status */
  status?: "placed" | "approved" | "delivered";
  complete?: boolean;
}

/**
 * A category for a pet
 */
export interface Category {
  id?: number;
  name?: string;
}

/**
 * A User who is purchasing from the pet store
 */
export interface User {
  id?: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phone?: string;

  /** User Status */
  userStatus?: number;
}

/**
 * A tag for a pet
 */
export interface Tag {
  id?: number;
  name?: string;
}

export enum PetNames {
  FluffyHero = "Fluffy Hero",
  PiggyPo = "Piggy Po",
  SwaggerTypescriptApi = "Swagger Typescript Api",
}

export type PetIds = 10 | 20 | 30 | 40;

/**
 * A pet for sale in the pet store
 */
export interface Pet {
  id?: number;
  category?: Category;
  name: string;
  photoUrls: string[];
  tags?: Tag[];

  /** pet status in the store */
  status?: "available" | "pending" | "sold";
}

/**
 * Describes the result of uploading an image resource
 */
export interface ApiResponse {
  code?: number;
  type?: string;
  message?: string;
}

/**
 * some description
 */
export interface Amount {
  /**
   * some description
   *
   */
  value: number;
  currency: Currency;
}

/**
 * some description
 */
export type Currency = string;

export type RequestParams = Omit<RequestInit, "body" | "method"> & {
  secure?: boolean;
};

export type RequestQueryParamsType = Record<string | number, any>;

interface ApiConfig<SecurityDataType> {
  baseUrl?: string;
  baseApiParams?: RequestParams;
  securityWorker?: (securityData: SecurityDataType) => RequestParams;
}

interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D | null;
  error: E | null;
}

enum BodyType {
  Json,
  FormData,
}

class HttpClient<SecurityDataType> {
  public baseUrl: string = "http://petstore.swagger.io/v2";
  private securityData: SecurityDataType = null as any;
  private securityWorker: null | ApiConfig<SecurityDataType>["securityWorker"] = null;

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType) => {
    this.securityData = data;
  };

  private addQueryParam(query: RequestQueryParamsType, key: string) {
    return (
      encodeURIComponent(key) + "=" + encodeURIComponent(Array.isArray(query[key]) ? query[key].join(",") : query[key])
    );
  }

  protected addQueryParams(rawQuery?: RequestQueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys.length
      ? `?${keys
          .map((key) =>
            typeof query[key] === "object" && !Array.isArray(query[key])
              ? this.addQueryParams(query[key] as object).substring(1)
              : this.addQueryParam(query, key),
          )
          .join("&")}`
      : "";
  }

  private bodyFormatters: Record<BodyType, (input: any) => any> = {
    [BodyType.Json]: JSON.stringify,
    [BodyType.FormData]: (input: any) =>
      Object.keys(input).reduce((data, key) => {
        data.append(key, input[key]);
        return data;
      }, new FormData()),
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

  private safeParseResponse = <T = any, E = any>(response: Response): Promise<HttpResponse<T, E>> => {
    const r = response as HttpResponse<T, E>;
    r.data = null;
    r.error = null;

    return response
      .json()
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
  };

  public request = <T = any, E = any>(
    path: string,
    method: string,
    { secure, ...params }: RequestParams = {},
    body?: any,
    bodyType?: BodyType,
    secureByDefault?: boolean,
  ): Promise<HttpResponse<T>> => {
    const requestUrl = `${this.baseUrl}${path}`;
    const secureOptions =
      (secureByDefault || secure) && this.securityWorker ? this.securityWorker(this.securityData) : {};
    const requestOptions = {
      ...this.mergeRequestOptions(params, secureOptions),
      method,
      body: body ? this.bodyFormatters[bodyType || BodyType.Json](body) : null,
    };

    return fetch(requestUrl, requestOptions).then(async (response) => {
      const data = await this.safeParseResponse<T, E>(response);
      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Swagger Petstore
 * @version 1.0.0
 * @baseUrl http://petstore.swagger.io/v2
 * This is a sample server Petstore server.  You can find out more about Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).  For this sample, you can use the api key `special-key` to test the authorization filters.
 */
export class Api<SecurityDataType = any> extends HttpClient<SecurityDataType> {
  pet = {
    /**
     * @tags pet
     * @name addPet
     * @summary Add a new pet to the store
     * @request POST:api/v1/pet
     * @secure
     */
    addPet: (body: Pet, params?: RequestParams) =>
      this.request<any, any>(`api/v1/pet`, "POST", params, body, BodyType.Json, true),

    /**
     * @tags pet
     * @name updatePet
     * @summary Update an existing pet
     * @request PUT:api/v1/pet
     * @secure
     */
    updatePet: (body: Pet, params?: RequestParams) =>
      this.request<any, any>(`api/v1/pet`, "PUT", params, body, BodyType.Json, true),

    /**
     * @tags pet
     * @name findPetsByStatus
     * @summary Finds Pets by status
     * @request GET:api/v1/pet/findByStatus
     * @secure
     * @description Multiple status values can be provided with comma separated strings
     */
    findPetsByStatus: (query: { status: ("available" | "pending" | "sold")[] }, params?: RequestParams) =>
      this.request<Pet[], any>(
        `api/v1/pet/findByStatus${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags pet
     * @name findPetsByTags
     * @summary Finds Pets by tags
     * @request GET:api/v1/pet/findByTags
     * @secure
     * @description Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
     */
    findPetsByTags: (query: { tags: string[] }, params?: RequestParams) =>
      this.request<Pet[], any>(
        `api/v1/pet/findByTags${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags pet
     * @name getPetById
     * @summary Find pet by ID
     * @request GET:api/v1/pet/{petId}
     * @secure
     * @description Returns a single pet
     */
    getPetById: (petId: number, params?: RequestParams) =>
      this.request<Pet, any>(`api/v1/pet/${petId}`, "GET", params, null, BodyType.Json, true),

    /**
     * @tags pet
     * @name updatePetWithForm
     * @summary Updates a pet in the store with form data
     * @request POST:api/v1/pet/{petId}
     * @secure
     */
    updatePetWithForm: (petId: number, data: { name?: string; status?: string }, params?: RequestParams) =>
      this.request<any, any>(`api/v1/pet/${petId}`, "POST", params, data, BodyType.FormData, true),

    /**
     * @tags pet
     * @name deletePet
     * @summary Deletes a pet
     * @request DELETE:api/v1/pet/{petId}
     * @secure
     */
    deletePet: (petId: number, params?: RequestParams) =>
      this.request<any, any>(`api/v1/pet/${petId}`, "DELETE", params, null, BodyType.Json, true),

    /**
     * @tags pet
     * @name uploadFile
     * @summary uploads an image
     * @request POST:api/v1/pet/{petId}/uploadImage
     * @secure
     */
    uploadFile: (petId: number, data: { additionalMetadata?: string; file?: File }, params?: RequestParams) =>
      this.request<ApiResponse, any>(`api/v1/pet/${petId}/uploadImage`, "POST", params, data, BodyType.FormData, true),
  };
  store = {
    /**
     * @tags store
     * @name getInventory
     * @summary Returns pet inventories by status
     * @request GET:api/v1/store/inventory
     * @secure
     * @description Returns a map of status codes to quantities
     */
    getInventory: (params?: RequestParams) =>
      this.request<Record<string, number>, any>(`api/v1/store/inventory`, "GET", params, null, BodyType.Json, true),

    /**
     * @tags store
     * @name placeOrder
     * @summary Place an order for a pet
     * @request POST:api/v1/store/order
     */
    placeOrder: (body: Order, params?: RequestParams) =>
      this.request<Order, any>(`api/v1/store/order`, "POST", params, body),

    /**
     * @tags store
     * @name getOrderById
     * @summary Find purchase order by ID
     * @request GET:api/v1/store/order/{orderId}
     * @description For valid response try integer IDs with value <= 5 or > 10. Other values will generated exceptions
     */
    getOrderById: (orderId: number, params?: RequestParams) =>
      this.request<Order, any>(`api/v1/store/order/${orderId}`, "GET", params),

    /**
     * @tags store
     * @name deleteOrder
     * @summary Delete purchase order by ID
     * @request DELETE:api/v1/store/order/{orderId}
     * @description For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors
     */
    deleteOrder: (orderId: string, params?: RequestParams) =>
      this.request<any, any>(`api/v1/store/order/${orderId}`, "DELETE", params),
  };
  user = {
    /**
     * @tags user
     * @name createUser
     * @summary Create user
     * @request POST:api/v1/user
     * @description This can only be done by the logged in user.
     */
    createUser: (body: User, params?: RequestParams) => this.request<any, any>(`api/v1/user`, "POST", params, body),

    /**
     * @tags user
     * @name createUsersWithArrayInput
     * @summary Creates list of users with given input array
     * @request POST:api/v1/user/createWithArray
     */
    createUsersWithArrayInput: (body: User[], params?: RequestParams) =>
      this.request<any, any>(`api/v1/user/createWithArray`, "POST", params, body),

    /**
     * @tags user
     * @name createUsersWithListInput
     * @summary Creates list of users with given input array
     * @request POST:api/v1/user/createWithList
     */
    createUsersWithListInput: (body: User[], params?: RequestParams) =>
      this.request<any, any>(`api/v1/user/createWithList`, "POST", params, body),

    /**
     * @tags user
     * @name loginUser
     * @summary Logs user into the system
     * @request GET:api/v1/user/login
     */
    loginUser: (query: { username: string; password: string }, params?: RequestParams) =>
      this.request<Currency, any>(`api/v1/user/login${this.addQueryParams(query)}`, "GET", params),

    /**
     * @tags user
     * @name logoutUser
     * @summary Logs out current logged in user session
     * @request GET:api/v1/user/logout
     */
    logoutUser: (params?: RequestParams) => this.request<any, any>(`api/v1/user/logout`, "GET", params),

    /**
     * @tags user
     * @name getUserByName
     * @summary Get user by user name
     * @request GET:api/v1/user/{username}
     */
    getUserByName: (username: string, params?: RequestParams) =>
      this.request<User, any>(`api/v1/user/${username}`, "GET", params),

    /**
     * @tags user
     * @name updateUser
     * @summary Updated user
     * @request PUT:api/v1/user/{username}
     * @description This can only be done by the logged in user.
     */
    updateUser: (username: string, body: User, params?: RequestParams) =>
      this.request<any, any>(`api/v1/user/${username}`, "PUT", params, body),

    /**
     * @tags user
     * @name deleteUser
     * @summary Delete user
     * @request DELETE:api/v1/user/{username}
     * @description This can only be done by the logged in user.
     */
    deleteUser: (username: string, params?: RequestParams) =>
      this.request<any, any>(`api/v1/user/${username}`, "DELETE", params),
  };
  username = {
    /**
     * @tags user
     * @name getUserByName
     * @summary Get user by user name
     * @request GET:api/v1/{username}
     */
    getUserByName: (username: string, params?: RequestParams) =>
      this.request<User, any>(`api/v1/${username}`, "GET", params),

    /**
     * @tags user
     * @name updateUser
     * @summary Updated user
     * @request PUT:api/v1/{username}
     * @description This can only be done by the logged in user.
     */
    updateUser: (username: string, body: User, params?: RequestParams) =>
      this.request<any, any>(`api/v1/${username}`, "PUT", params, body),

    /**
     * @tags user
     * @name deleteUser
     * @summary Delete user
     * @request DELETE:api/v1/{username}
     * @description This can only be done by the logged in user.
     */
    deleteUser: (username: string, params?: RequestParams) =>
      this.request<any, any>(`api/v1/${username}`, "DELETE", params),
  };
}
