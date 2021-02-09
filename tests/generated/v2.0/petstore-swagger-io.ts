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

export interface Category {
  /** @format int64 */
  id?: number;
  name?: string;
}

export interface Pet {
  /** @format int64 */
  id?: number;
  category?: Category;

  /** @example doggie */
  name: string;
  photoUrls: string[];
  tags?: Tag[];

  /** pet status in the store */
  status?: "available" | "pending" | "sold";
}

export interface Tag {
  /** @format int64 */
  id?: number;
  name?: string;
}

export interface ApiResponse {
  /** @format int32 */
  code?: number;
  type?: string;
  message?: string;
}

export interface Order {
  /** @format int64 */
  id?: number;

  /** @format int64 */
  petId?: number;

  /** @format int32 */
  quantity?: number;

  /** @format date-time */
  shipDate?: string;

  /** Order Status */
  status?: "placed" | "approved" | "delivered";
  complete?: boolean;
}

export interface User {
  /** @format int64 */
  id?: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phone?: string;

  /**
   * User Status
   * @format int32
   */
  userStatus?: number;
}

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
  data: D;
  error: E;
}

enum BodyType {
  Json,
  FormData,
  UrlEncoded,
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "https://petstore.swagger.io/v2";
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

  protected toQueryString(rawQuery?: RequestQueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) =>
        typeof query[key] === "object" && !Array.isArray(query[key])
          ? this.toQueryString(query[key] as object)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: RequestQueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private bodyFormatters: Record<BodyType, (input: any) => any> = {
    [BodyType.Json]: JSON.stringify,
    [BodyType.FormData]: (input: any) =>
      Object.keys(input).reduce((data, key) => {
        data.append(key, input[key]);
        return data;
      }, new FormData()),
    [BodyType.UrlEncoded]: (input: any) => this.toQueryString(input),
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
    r.data = (null as unknown) as T;
    r.error = (null as unknown) as E;

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
 * @version 1.0.3
 * @baseUrl https://petstore.swagger.io/v2
 * This is a sample server Petstore server.  You can find out more about Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).  For this sample, you can use the api key `special-key` to test the authorization filters.
 */
export class Api<SecurityDataType = any> extends HttpClient<SecurityDataType> {
  pet = {
    /**
     * @description Returns a single pet
     *
     * @tags pet
     * @name GetPetById
     * @summary Find pet by ID
     * @request GET:/pet/{petId}
     * @secure
     */
    getPetById: (petId: number, params?: RequestParams) =>
      this.request<Pet, any>(`/pet/${petId}`, "GET", params, null, BodyType.Json, true),

    /**
     * No description
     *
     * @tags pet
     * @name UpdatePetWithForm
     * @summary Updates a pet in the store with form data
     * @request POST:/pet/{petId}
     * @secure
     */
    updatePetWithForm: (petId: number, data: { name?: string; status?: string }, params?: RequestParams) =>
      this.request<any, any>(`/pet/${petId}`, "POST", params, data, BodyType.FormData, true),

    /**
     * No description
     *
     * @tags pet
     * @name DeletePet
     * @summary Deletes a pet
     * @request DELETE:/pet/{petId}
     * @secure
     */
    deletePet: (petId: number, params?: RequestParams) =>
      this.request<any, any>(`/pet/${petId}`, "DELETE", params, null, BodyType.Json, true),

    /**
     * No description
     *
     * @tags pet
     * @name UploadFile
     * @summary uploads an image
     * @request POST:/pet/{petId}/uploadImage
     * @secure
     */
    uploadFile: (petId: number, data: { additionalMetadata?: string; file?: File }, params?: RequestParams) =>
      this.request<ApiResponse, any>(`/pet/${petId}/uploadImage`, "POST", params, data, BodyType.FormData, true),

    /**
     * No description
     *
     * @tags pet
     * @name AddPet
     * @summary Add a new pet to the store
     * @request POST:/pet
     * @secure
     */
    addPet: (body: Pet, params?: RequestParams) =>
      this.request<any, any>(`/pet`, "POST", params, body, BodyType.Json, true),

    /**
     * No description
     *
     * @tags pet
     * @name UpdatePet
     * @summary Update an existing pet
     * @request PUT:/pet
     * @secure
     */
    updatePet: (body: Pet, params?: RequestParams) =>
      this.request<any, any>(`/pet`, "PUT", params, body, BodyType.Json, true),

    /**
     * @description Multiple status values can be provided with comma separated strings
     *
     * @tags pet
     * @name FindPetsByStatus
     * @summary Finds Pets by status
     * @request GET:/pet/findByStatus
     * @secure
     */
    findPetsByStatus: (query: { status: ("available" | "pending" | "sold")[] }, params?: RequestParams) =>
      this.request<Pet[], any>(
        `/pet/findByStatus${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @description Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
     *
     * @tags pet
     * @name FindPetsByTags
     * @summary Finds Pets by tags
     * @request GET:/pet/findByTags
     * @secure
     */
    findPetsByTags: (query: { tags: string[] }, params?: RequestParams) =>
      this.request<Pet[], any>(
        `/pet/findByTags${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),
  };
  store = {
    /**
     * @description Returns a map of status codes to quantities
     *
     * @tags store
     * @name GetInventory
     * @summary Returns pet inventories by status
     * @request GET:/store/inventory
     * @secure
     */
    getInventory: (params?: RequestParams) =>
      this.request<Record<string, number>, any>(`/store/inventory`, "GET", params, null, BodyType.Json, true),

    /**
     * @description For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions
     *
     * @tags store
     * @name GetOrderById
     * @summary Find purchase order by ID
     * @request GET:/store/order/{orderId}
     */
    getOrderById: (orderId: number, params?: RequestParams) =>
      this.request<Order, any>(`/store/order/${orderId}`, "GET", params),

    /**
     * @description For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors
     *
     * @tags store
     * @name DeleteOrder
     * @summary Delete purchase order by ID
     * @request DELETE:/store/order/{orderId}
     */
    deleteOrder: (orderId: number, params?: RequestParams) =>
      this.request<any, any>(`/store/order/${orderId}`, "DELETE", params),

    /**
     * No description
     *
     * @tags store
     * @name PlaceOrder
     * @summary Place an order for a pet
     * @request POST:/store/order
     */
    placeOrder: (body: Order, params?: RequestParams) =>
      this.request<Order, any>(`/store/order`, "POST", params, body, BodyType.Json),
  };
  user = {
    /**
     * No description
     *
     * @tags user
     * @name GetUserByName
     * @summary Get user by user name
     * @request GET:/user/{username}
     */
    getUserByName: (username: string, params?: RequestParams) =>
      this.request<User, any>(`/user/${username}`, "GET", params),

    /**
     * @description This can only be done by the logged in user.
     *
     * @tags user
     * @name UpdateUser
     * @summary Updated user
     * @request PUT:/user/{username}
     */
    updateUser: (username: string, body: User, params?: RequestParams) =>
      this.request<any, any>(`/user/${username}`, "PUT", params, body, BodyType.Json),

    /**
     * @description This can only be done by the logged in user.
     *
     * @tags user
     * @name DeleteUser
     * @summary Delete user
     * @request DELETE:/user/{username}
     */
    deleteUser: (username: string, params?: RequestParams) =>
      this.request<any, any>(`/user/${username}`, "DELETE", params),

    /**
     * No description
     *
     * @tags user
     * @name LoginUser
     * @summary Logs user into the system
     * @request GET:/user/login
     */
    loginUser: (query: { username: string; password: string }, params?: RequestParams) =>
      this.request<string, any>(`/user/login${this.addQueryParams(query)}`, "GET", params),

    /**
     * No description
     *
     * @tags user
     * @name LogoutUser
     * @summary Logs out current logged in user session
     * @request GET:/user/logout
     */
    logoutUser: (params?: RequestParams) => this.request<any, any>(`/user/logout`, "GET", params),

    /**
     * @description This can only be done by the logged in user.
     *
     * @tags user
     * @name CreateUser
     * @summary Create user
     * @request POST:/user
     */
    createUser: (body: User, params?: RequestParams) =>
      this.request<any, any>(`/user`, "POST", params, body, BodyType.Json),

    /**
     * No description
     *
     * @tags user
     * @name CreateUsersWithArrayInput
     * @summary Creates list of users with given input array
     * @request POST:/user/createWithArray
     */
    createUsersWithArrayInput: (body: User[], params?: RequestParams) =>
      this.request<any, any>(`/user/createWithArray`, "POST", params, body, BodyType.Json),

    /**
     * No description
     *
     * @tags user
     * @name CreateUsersWithListInput
     * @summary Creates list of users with given input array
     * @request POST:/user/createWithList
     */
    createUsersWithListInput: (body: User[], params?: RequestParams) =>
      this.request<any, any>(`/user/createWithList`, "POST", params, body, BodyType.Json),
  };
}
