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

export type Pet = NewPet & {
  /** @format int64 */
  id: number;
};

export interface NewPet {
  name: string;
  tag?: string;
}

export interface Error {
  /** @format int32 */
  code: number;
  message: string;
}

/** Page«TemplateResponseDto» */
export interface PageTemplateResponseDto {
  content?: any[];
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  /** @format int32 */
  number?: number;
  /** @format int32 */
  numberOfElements?: number;
  pageable?: any;
  /** @format int32 */
  size?: number;
  sort?: any;
  /** @format int64 */
  totalElements?: number;
  /** @format int32 */
  totalPages?: number;
}

export namespace Pets {
  /**
   * @description Returns all pets from the system that the user has access to Nam sed condimentum est. Maecenas tempor sagittis sapien, nec rhoncus sem sagittis sit amet. Aenean at gravida augue, ac iaculis sem. Curabitur odio lorem, ornare eget elementum nec, cursus id lectus. Duis mi turpis, pulvinar ac eros ac, tincidunt varius justo. In hac habitasse platea dictumst. Integer at adipiscing ante, a sagittis ligula. Aenean pharetra tempor ante molestie imperdiet. Vivamus id aliquam diam. Cras quis velit non tortor eleifend sagittis. Praesent at enim pharetra urna volutpat venenatis eget eget mauris. In eleifend fermentum facilisis. Praesent enim enim, gravida ac sodales sed, placerat id erat. Suspendisse lacus dolor, consectetur non augue vel, vehicula interdum libero. Morbi euismod sagittis libero sed lacinia. Sed tempus felis lobortis leo pulvinar rutrum. Nam mattis velit nisl, eu condimentum ligula luctus nec. Phasellus semper velit eget aliquet faucibus. In a mattis elit. Phasellus vel urna viverra, condimentum lorem id, rhoncus nibh. Ut pellentesque posuere elementum. Sed a varius odio. Morbi rhoncus ligula libero, vel eleifend nunc tristique vitae. Fusce et sem dui. Aenean nec scelerisque tortor. Fusce malesuada accumsan magna vel tempus. Quisque mollis felis eu dolor tristique, sit amet auctor felis gravida. Sed libero lorem, molestie sed nisl in, accumsan tempor nisi. Fusce sollicitudin massa ut lacinia mattis. Sed vel eleifend lorem. Pellentesque vitae felis pretium, pulvinar elit eu, euismod sapien.
   * @name FindPets
   * @request GET:/pets
   */
  export namespace FindPets {
    export type RequestParams = {};
    export type RequestQuery = {
      /** tags to filter by */
      tags?: string[];
      /**
       * maximum number of results to return
       * @format int32
       */
      limit?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Pet[];
  }
  /**
   * @description Creates a new pet in the store.  Duplicates are allowed
   * @name AddPet
   * @request POST:/pets
   */
  export namespace AddPet {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = NewPet;
    export type RequestHeaders = {};
    export type ResponseBody = Pet;
  }
  /**
   * @description Returns a user based on a single ID, if the user does not have access to the pet
   * @name FindPetById
   * @request GET:/pets/{id}
   */
  export namespace FindPetById {
    export type RequestParams = {
      /**
       * ID of pet to fetch
       * @format int64
       */
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Pet;
  }
  /**
   * @description deletes a single pet based on the ID supplied
   * @name DeletePet
   * @request DELETE:/pets/{id}
   */
  export namespace DeletePet {
    export type RequestParams = {
      /**
       * ID of pet to delete
       * @format int64
       */
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
}
