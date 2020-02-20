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
  
  /** some description
 */
  value: number;
  currency: Currency;
}

/**
* some description

*/
export type Currency = string

export type RequestParams = Omit<RequestInit, "body" | "method"> & {
  secure?: boolean;
}

type ApiConfig<SecurityDataType> = {
  baseUrl?: string,
  baseApiParams?: RequestParams,
  securityWorker?: (securityData: SecurityDataType) => RequestParams,
}


export namespace pet {

  /**
  * @tags pet
  * @name addPet
  * @summary Add a new pet to the store
  * @request POST:/pet
  * @secure
  */
  export namespace AddPet {
    export type RequestQuery = {};
    export type RequestBody = any;
    export type ResponseBody = any;
  }

  /**
  * @tags pet
  * @name updatePet
  * @summary Update an existing pet
  * @request PUT:/pet
  * @secure
  */
  export namespace UpdatePet {
    export type RequestQuery = {};
    export type RequestBody = any;
    export type ResponseBody = any;
  }

  /**
  * @tags pet
  * @name findPetsByStatus
  * @summary Finds Pets by status
  * @request GET:/pet/findByStatus
  * @secure
  * @description Multiple status values can be provided with comma separated strings
  */
  export namespace FindPetsByStatus {
    export type RequestQuery = { status: Array<"available" | "pending" | "sold"> };
    export type RequestBody = never;
    export type ResponseBody = Pet[];
  }

  /**
  * @tags pet
  * @name findPetsByTags
  * @summary Finds Pets by tags
  * @request GET:/pet/findByTags
  * @secure
  * @description Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
  */
  export namespace FindPetsByTags {
    export type RequestQuery = { tags: string[] };
    export type RequestBody = never;
    export type ResponseBody = Pet[];
  }

  /**
  * @tags pet
  * @name getPetById
  * @summary Find pet by ID
  * @request GET:/pet/{petId}
  * @secure
  * @description Returns a single pet
  */
  export namespace GetPetById {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = Pet;
  }

  /**
  * @tags pet
  * @name updatePetWithForm
  * @summary Updates a pet in the store with form data
  * @request POST:/pet/{petId}
  * @secure
  */
  export namespace UpdatePetWithForm {
    export type RequestQuery = {};
    export type RequestBody = any;
    export type ResponseBody = any;
  }

  /**
  * @tags pet
  * @name deletePet
  * @summary Deletes a pet
  * @request DELETE:/pet/{petId}
  * @secure
  */
  export namespace DeletePet {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
  * @tags pet
  * @name uploadFile
  * @summary uploads an image
  * @request POST:/pet/{petId}/uploadImage
  * @secure
  */
  export namespace UploadFile {
    export type RequestQuery = {};
    export type RequestBody = any;
    export type ResponseBody = ApiResponse;
  }
}
export namespace store {

  /**
  * @tags store
  * @name getInventory
  * @summary Returns pet inventories by status
  * @request GET:/store/inventory
  * @secure
  * @description Returns a map of status codes to quantities
  */
  export namespace GetInventory {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = number;
  }

  /**
  * @tags store
  * @name placeOrder
  * @summary Place an order for a pet
  * @request POST:/store/order
  */
  export namespace PlaceOrder {
    export type RequestQuery = {};
    export type RequestBody = Order;
    export type ResponseBody = Order;
  }

  /**
  * @tags store
  * @name getOrderById
  * @summary Find purchase order by ID
  * @request GET:/store/order/{orderId}
  * @description For valid response try integer IDs with value <= 5 or > 10. Other values will generated exceptions
  */
  export namespace GetOrderById {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = Order;
  }

  /**
  * @tags store
  * @name deleteOrder
  * @summary Delete purchase order by ID
  * @request DELETE:/store/order/{orderId}
  * @description For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors
  */
  export namespace DeleteOrder {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }
}
export namespace user {

  /**
  * @tags user
  * @name createUser
  * @summary Create user
  * @request POST:/user
  * @description This can only be done by the logged in user.
  */
  export namespace CreateUser {
    export type RequestQuery = {};
    export type RequestBody = User;
    export type ResponseBody = any;
  }

  /**
  * @tags user
  * @name createUsersWithArrayInput
  * @summary Creates list of users with given input array
  * @request POST:/user/createWithArray
  */
  export namespace CreateUsersWithArrayInput {
    export type RequestQuery = {};
    export type RequestBody = any;
    export type ResponseBody = any;
  }

  /**
  * @tags user
  * @name createUsersWithListInput
  * @summary Creates list of users with given input array
  * @request POST:/user/createWithList
  */
  export namespace CreateUsersWithListInput {
    export type RequestQuery = {};
    export type RequestBody = any;
    export type ResponseBody = any;
  }

  /**
  * @tags user
  * @name loginUser
  * @summary Logs user into the system
  * @request GET:/user/login
  */
  export namespace LoginUser {
    export type RequestQuery = { username: string, password: string };
    export type RequestBody = never;
    export type ResponseBody = Currency;
  }

  /**
  * @tags user
  * @name logoutUser
  * @summary Logs out current logged in user session
  * @request GET:/user/logout
  */
  export namespace LogoutUser {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
  * @tags user
  * @name getUserByName
  * @summary Get user by user name
  * @request GET:/user/{username}
  */
  export namespace GetUserByName {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = User;
  }

  /**
  * @tags user
  * @name updateUser
  * @summary Updated user
  * @request PUT:/user/{username}
  * @description This can only be done by the logged in user.
  */
  export namespace UpdateUser {
    export type RequestQuery = {};
    export type RequestBody = User;
    export type ResponseBody = any;
  }

  /**
  * @tags user
  * @name deleteUser
  * @summary Delete user
  * @request DELETE:/user/{username}
  * @description This can only be done by the logged in user.
  */
  export namespace DeleteUser {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }
}

export class Api<SecurityDataType> {
  
  public baseUrl = "http://petstore.swagger.io/v2";
  public title = "Swagger Petstore";
  public version = "1.0.0";

  private securityData: SecurityDataType = (null as any);
  private securityWorker: ApiConfig<SecurityDataType>["securityWorker"] = (() => {}) as any
  
  private baseApiParams: RequestParams = {
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

  private addQueryParams(query: object): string {
    const keys = Object.keys(query);
    return keys.length ? (
      '?' +
      keys.reduce((paramsArray, param) => [
        ...paramsArray,
        param + '=' + encodeURIComponent(query[param])
      ], []).join('&')
    ) : ''
  }

  private mergeRequestOptions(params: RequestParams, securityParams?: RequestParams): RequestParams {
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
  
  private safeParseResponse = <T = any>(response: Response): Promise<T> =>
    response.json()
      .then(data => data)
      .catch(e => response.text);
  
  public request = <T = any>(
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
      const data = await this.safeParseResponse<T>(response);
      if (!response.ok) throw data
      return data
    })



  pet = {


    /**
    * @tags pet
    * @name addPet
    * @summary Add a new pet to the store
    * @request POST:/pet
    * @secure
    */
    addPet: (body: any, params?: RequestParams) =>
      this.request<any>(`/pet`, "POST", params, body, true),


    /**
    * @tags pet
    * @name updatePet
    * @summary Update an existing pet
    * @request PUT:/pet
    * @secure
    */
    updatePet: (body: any, params?: RequestParams) =>
      this.request<any>(`/pet`, "PUT", params, body, true),


    /**
    * @tags pet
    * @name findPetsByStatus
    * @summary Finds Pets by status
    * @request GET:/pet/findByStatus
    * @secure
    * @description Multiple status values can be provided with comma separated strings
    */
    findPetsByStatus: (query: { status: Array<"available" | "pending" | "sold"> }, params?: RequestParams) =>
      this.request<Pet[]>(`/pet/findByStatus${this.addQueryParams(query)}`, "GET", params, null, true),


    /**
    * @tags pet
    * @name findPetsByTags
    * @summary Finds Pets by tags
    * @request GET:/pet/findByTags
    * @secure
    * @description Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
    */
    findPetsByTags: (query: { tags: string[] }, params?: RequestParams) =>
      this.request<Pet[]>(`/pet/findByTags${this.addQueryParams(query)}`, "GET", params, null, true),


    /**
    * @tags pet
    * @name getPetById
    * @summary Find pet by ID
    * @request GET:/pet/{petId}
    * @secure
    * @description Returns a single pet
    */
    getPetById: (petId: number, params?: RequestParams) =>
      this.request<Pet>(`/pet/${petId}`, "GET", params, null, true),


    /**
    * @tags pet
    * @name updatePetWithForm
    * @summary Updates a pet in the store with form data
    * @request POST:/pet/{petId}
    * @secure
    */
    updatePetWithForm: (petId: number, data: any, params?: RequestParams) =>
      this.request<any>(`/pet/${petId}`, "POST", params, data, true),


    /**
    * @tags pet
    * @name deletePet
    * @summary Deletes a pet
    * @request DELETE:/pet/{petId}
    * @secure
    */
    deletePet: (petId: number, params?: RequestParams) =>
      this.request<any>(`/pet/${petId}`, "DELETE", params, null, true),


    /**
    * @tags pet
    * @name uploadFile
    * @summary uploads an image
    * @request POST:/pet/{petId}/uploadImage
    * @secure
    */
    uploadFile: (petId: number, data: any, params?: RequestParams) =>
      this.request<ApiResponse>(`/pet/${petId}/uploadImage`, "POST", params, data, true),
  }
  store = {


    /**
    * @tags store
    * @name getInventory
    * @summary Returns pet inventories by status
    * @request GET:/store/inventory
    * @secure
    * @description Returns a map of status codes to quantities
    */
    getInventory: (params?: RequestParams) =>
      this.request<number>(`/store/inventory`, "GET", params, null, true),


    /**
    * @tags store
    * @name placeOrder
    * @summary Place an order for a pet
    * @request POST:/store/order
    */
    placeOrder: (body: Order, params?: RequestParams) =>
      this.request<Order>(`/store/order`, "POST", params, body),


    /**
    * @tags store
    * @name getOrderById
    * @summary Find purchase order by ID
    * @request GET:/store/order/{orderId}
    * @description For valid response try integer IDs with value <= 5 or > 10. Other values will generated exceptions
    */
    getOrderById: (orderId: number, params?: RequestParams) =>
      this.request<Order>(`/store/order/${orderId}`, "GET", params, null),


    /**
    * @tags store
    * @name deleteOrder
    * @summary Delete purchase order by ID
    * @request DELETE:/store/order/{orderId}
    * @description For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors
    */
    deleteOrder: (orderId: string, params?: RequestParams) =>
      this.request<any>(`/store/order/${orderId}`, "DELETE", params, null),
  }
  user = {


    /**
    * @tags user
    * @name createUser
    * @summary Create user
    * @request POST:/user
    * @description This can only be done by the logged in user.
    */
    createUser: (body: User, params?: RequestParams) =>
      this.request<any>(`/user`, "POST", params, body),


    /**
    * @tags user
    * @name createUsersWithArrayInput
    * @summary Creates list of users with given input array
    * @request POST:/user/createWithArray
    */
    createUsersWithArrayInput: (body: any, params?: RequestParams) =>
      this.request<any>(`/user/createWithArray`, "POST", params, body),


    /**
    * @tags user
    * @name createUsersWithListInput
    * @summary Creates list of users with given input array
    * @request POST:/user/createWithList
    */
    createUsersWithListInput: (body: any, params?: RequestParams) =>
      this.request<any>(`/user/createWithList`, "POST", params, body),


    /**
    * @tags user
    * @name loginUser
    * @summary Logs user into the system
    * @request GET:/user/login
    */
    loginUser: (query: { username: string, password: string }, params?: RequestParams) =>
      this.request<Currency>(`/user/login${this.addQueryParams(query)}`, "GET", params, null),


    /**
    * @tags user
    * @name logoutUser
    * @summary Logs out current logged in user session
    * @request GET:/user/logout
    */
    logoutUser: (params?: RequestParams) =>
      this.request<any>(`/user/logout`, "GET", params, null),


    /**
    * @tags user
    * @name getUserByName
    * @summary Get user by user name
    * @request GET:/user/{username}
    */
    getUserByName: (username: string, params?: RequestParams) =>
      this.request<User>(`/user/${username}`, "GET", params, null),


    /**
    * @tags user
    * @name updateUser
    * @summary Updated user
    * @request PUT:/user/{username}
    * @description This can only be done by the logged in user.
    */
    updateUser: (username: string, body: User, params?: RequestParams) =>
      this.request<any>(`/user/${username}`, "PUT", params, body),


    /**
    * @tags user
    * @name deleteUser
    * @summary Delete user
    * @request DELETE:/user/{username}
    * @description This can only be done by the logged in user.
    */
    deleteUser: (username: string, params?: RequestParams) =>
      this.request<any>(`/user/${username}`, "DELETE", params, null),
  }

}
