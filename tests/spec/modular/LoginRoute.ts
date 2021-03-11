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

import { PushToken } from "./data-contracts";

export namespace Login {
  /**
   * @description push sign-in request See: https://github.com/skion/authentiq/wiki/JWT-Examples
   * @tags login, post
   * @name PushLoginRequest
   * @request POST:/login
   */
  export namespace PushLoginRequest {
    export type RequestParams = {};
    export type RequestQuery = { callback: string };
    export type RequestBody = PushToken;
    export type RequestHeaders = {};
    export type ResponseBody = { status?: string };
  }

  /**
   * @description Get a current key register
   * @tags key, get
   * @name KeyRegister
   * @request GET:/login
   */
  export namespace KeyRegister {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = { secret?: string; status?: string };
  }
}
