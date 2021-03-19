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

import { Claims } from "./data-contracts";

export namespace Scope {
  /**
   * @description scope verification request See: https://github.com/skion/authentiq/wiki/JWT-Examples
   * @tags scope, post
   * @name SignRequest
   * @request POST:/scope
   */
  export namespace SignRequest {
    export type RequestParams = {};
    export type RequestQuery = { test?: number };
    export type RequestBody = Claims;
    export type RequestHeaders = {};
    export type ResponseBody = { job?: string; status?: string };
  }

  /**
   * @description delete a verification job
   * @tags scope, delete
   * @name SignDelete
   * @request DELETE:/scope/{job}
   */
  export namespace SignDelete {
    export type RequestParams = { job: string };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = { status?: string };
  }

  /**
   * @description get the status / current content of a verification job
   * @tags scope, get
   * @name SignRetrieve
   * @request GET:/scope/{job}
   */
  export namespace SignRetrieve {
    export type RequestParams = { job: string };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = { exp?: number; field?: string; sub?: string };
  }

  /**
   * @description HEAD to get the status of a verification job
   * @tags scope, head
   * @name SignRetrieveHead
   * @request HEAD:/scope/{job}
   */
  export namespace SignRetrieveHead {
    export type RequestParams = { job: string };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * @description this is a scope confirmation
   * @tags scope, post
   * @name SignConfirm
   * @request POST:/scope/{job}
   */
  export namespace SignConfirm {
    export type RequestParams = { job: string };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = { status?: string };
  }

  /**
   * @description authority updates a JWT with its signature See: https://github.com/skion/authentiq/wiki/JWT-Examples
   * @tags scope, put
   * @name SignUpdate
   * @request PUT:/scope/{job}
   */
  export namespace SignUpdate {
    export type RequestParams = { job: string };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = { jwt?: string; status?: string };
  }
}
