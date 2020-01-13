export interface Category {
  id: number,
  name: string,
}
export interface Pet {
  id: number,
  category: Category,
  name: string,
  photoUrls: string[],
  tags: Tag[],
  status: "available" | "pending" | "sold",
}
export interface Tag {
  id: number,
  name: string,
}
export interface ApiResponse {
  code: number,
  type: string,
  message: string,
}
export interface Order {
  id: number,
  petId: number,
  quantity: number,
  shipDate: string,
  status: "placed" | "approved" | "delivered",
  complete: boolean,
}
export interface User {
  id: number,
  username: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  phone: string,
  userStatus: number,
}

export type ApiParams = Omit<RequestInit, "body" | "method">

type ApiConfig<SecurityDataType> = {
  baseUrl?: string,
  securityWorker?: (securityData: SecurityDataType) => ApiParams,
}



export class Api<SecurityDataType> {
  
  public baseUrl = "https://petstore.swagger.io/v2";
  public title = "Swagger Petstore";
  public version = "1.0.3";
  
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

  private addQueryParams(query: object): string {
    const keys = Object.keys(query);
    return keys.length ? (
      '?' +
      keys.reduce(function(paramsArray, param) {
        paramsArray.push(param + '=' + encodeURIComponent(query[param]))
        return paramsArray
      }, []).join('&')
    ) : ''
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
  
  public request = <T = any>(path: string, method: string, params: ApiParams = {}, body?: any, isSecure?: boolean): Promise<T> =>
    fetch(`${this.baseUrl}${path}`, {
      ...this.mergeRequestOptions(params, isSecure && this.securityWorker(this.securityData)),
      method,
      body: body ? JSON.stringify(body) : null,
    }).then(response => response.json())



    pet = {


        /**
        * @tags pet
        * @name getPetById
        * @description Find pet by ID
        * @request GET:/pet/{petId}
        * @security true
        */
        getPetById: (petId: number, params: ApiParams = {}) =>
          this.request<Pet>(`/pet/${petId}`, "GET", params, null, true),


        /**
        * @tags pet
        * @name updatePetWithForm
        * @description Updates a pet in the store with form data
        * @request POST:/pet/{petId}
        * @security true
        */
        updatePetWithForm: (petId: number, data: any, params: ApiParams = {}) =>
          this.request<any>(`/pet/${petId}`, "POST", params, data, true),


        /**
        * @tags pet
        * @name deletePet
        * @description Deletes a pet
        * @request DELETE:/pet/{petId}
        * @security true
        */
        deletePet: (petId: number, params: ApiParams = {}) =>
          this.request<any>(`/pet/${petId}`, "DELETE", params, null, true),


        /**
        * @tags pet
        * @name uploadFile
        * @description uploads an image
        * @request POST:/pet/{petId}/uploadImage
        * @security true
        */
        uploadFile: (petId: number, data: any, params: ApiParams = {}) =>
          this.request<ApiResponse>(`/pet/${petId}/uploadImage`, "POST", params, data, true),


        /**
        * @tags pet
        * @name addPet
        * @description Add a new pet to the store
        * @request POST:/pet
        * @security true
        */
        addPet: (data: any, params: ApiParams = {}) =>
          this.request<any>(`/pet`, "POST", params, data, true),


        /**
        * @tags pet
        * @name updatePet
        * @description Update an existing pet
        * @request PUT:/pet
        * @security true
        */
        updatePet: (data: any, params: ApiParams = {}) =>
          this.request<any>(`/pet`, "PUT", params, data, true),


        /**
        * @tags pet
        * @name findPetsByStatus
        * @description Finds Pets by status
        * @request GET:/pet/findByStatus
        * @security true
        */
        findPetsByStatus: (query: { status: Array<"available" | "pending" | "sold">, }, params: ApiParams = {}) =>
          this.request<Pet[]>(`/pet/findByStatus${this.addQueryParams(query)}`, "GET", params, null, true),


        /**
        * @tags pet
        * @name findPetsByTags
        * @description Finds Pets by tags
        * @request GET:/pet/findByTags
        * @security true
        */
        findPetsByTags: (query: { tags: string[], }, params: ApiParams = {}) =>
          this.request<Pet[]>(`/pet/findByTags${this.addQueryParams(query)}`, "GET", params, null, true),
    }
    store = {


        /**
        * @tags store
        * @name getInventory
        * @description Returns pet inventories by status
        * @request GET:/store/inventory
        * @security true
        */
        getInventory: (params: ApiParams = {}) =>
          this.request<number>(`/store/inventory`, "GET", params, null, true),


        /**
        * @tags store
        * @name getOrderById
        * @description Find purchase order by ID
        * @request GET:/store/order/{orderId}
        */
        getOrderById: (orderId: number, params: ApiParams = {}) =>
          this.request<Order>(`/store/order/${orderId}`, "GET", params, null),


        /**
        * @tags store
        * @name deleteOrder
        * @description Delete purchase order by ID
        * @request DELETE:/store/order/{orderId}
        */
        deleteOrder: (orderId: number, params: ApiParams = {}) =>
          this.request<any>(`/store/order/${orderId}`, "DELETE", params, null),


        /**
        * @tags store
        * @name placeOrder
        * @description Place an order for a pet
        * @request POST:/store/order
        */
        placeOrder: (data: Order, params: ApiParams = {}) =>
          this.request<Order>(`/store/order`, "POST", params, data),
    }
    user = {


        /**
        * @tags user
        * @name getUserByName
        * @description Get user by user name
        * @request GET:/user/{username}
        */
        getUserByName: (username: string, params: ApiParams = {}) =>
          this.request<User>(`/user/${username}`, "GET", params, null),


        /**
        * @tags user
        * @name updateUser
        * @description Updated user
        * @request PUT:/user/{username}
        */
        updateUser: (username: string, data: User, params: ApiParams = {}) =>
          this.request<any>(`/user/${username}`, "PUT", params, data),


        /**
        * @tags user
        * @name deleteUser
        * @description Delete user
        * @request DELETE:/user/{username}
        */
        deleteUser: (username: string, params: ApiParams = {}) =>
          this.request<any>(`/user/${username}`, "DELETE", params, null),


        /**
        * @tags user
        * @name loginUser
        * @description Logs user into the system
        * @request GET:/user/login
        */
        loginUser: (query: { username: string, password: string, }, params: ApiParams = {}) =>
          this.request<string>(`/user/login${this.addQueryParams(query)}`, "GET", params, null),


        /**
        * @tags user
        * @name logoutUser
        * @description Logs out current logged in user session
        * @request GET:/user/logout
        */
        logoutUser: (params: ApiParams = {}) =>
          this.request<any>(`/user/logout`, "GET", params, null),


        /**
        * @tags user
        * @name createUser
        * @description Create user
        * @request POST:/user
        */
        createUser: (data: User, params: ApiParams = {}) =>
          this.request<any>(`/user`, "POST", params, data),


        /**
        * @tags user
        * @name createUsersWithArrayInput
        * @description Creates list of users with given input array
        * @request POST:/user/createWithArray
        */
        createUsersWithArrayInput: (data: any, params: ApiParams = {}) =>
          this.request<any>(`/user/createWithArray`, "POST", params, data),


        /**
        * @tags user
        * @name createUsersWithListInput
        * @description Creates list of users with given input array
        * @request POST:/user/createWithList
        */
        createUsersWithListInput: (data: any, params: ApiParams = {}) =>
          this.request<any>(`/user/createWithList`, "POST", params, data),
    }

}
