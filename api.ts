

export type Pet = {
  id:number,
  name:string,
  tag:string,
}
export type Pets = Pet[]
export type Error = {
  code:number,
  message:string,
}


export type ApiParams = Omit<RequestInit, "body" | "method">

type ApiConfig<SecurityDataType> = {
  baseUrl?: string,
  securityWorker?: (securityData: SecurityDataType) => ApiParams
}



export class Api<SecurityDataType> {
  
  public baseUrl = "http://petstore.swagger.io/v1";
  public title = "Swagger Petstore";
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
   * @tags pets
   * @name listPets
   */
  listPets = (params: ApiParams = {}): Promise<Pets> =>
    fetch(`${this.baseUrl}/pets`, {
      ...this.defaultRequestParams,
      method: 'GET',
      body: null,
      ...params,
    }).then(response => response.json()) 
    

  /**
   * @tags pets
   * @name createPets
   */
  createPets = (params: ApiParams = {}): Promise<any> =>
    fetch(`${this.baseUrl}/pets`, {
      ...this.defaultRequestParams,
      method: 'POST',
      body: null,
      ...params,
    }).then(response => response.json()) 
    

  /**
   * @tags pets
   * @name showPetById
   */
  showPetById = (petId: string, params: ApiParams = {}): Promise<Pet> =>
    fetch(`${this.baseUrl}/pets/${petId}`, {
      ...this.defaultRequestParams,
      method: 'GET',
      body: null,
      ...params,
    }).then(response => response.json()) 
    
}
