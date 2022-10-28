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
export declare namespace Login {
  /**
   * @description push sign-in request See: https://github.com/skion/authentiq/wiki/JWT-Examples
   * @tags login, post
   * @name PushLoginRequest
   * @request POST:/login
   */
  namespace PushLoginRequest {
    type RequestParams = {};
    type RequestQuery = {
      /** URI App will connect to */
      callback: string;
    };
    type RequestBody = PushToken;
    type RequestHeaders = {};
    type ResponseBody = {
      /** sent */
      status?: string;
    };
  }
  /**
   * @description Get a current key register
   * @tags key, get
   * @name KeyRegister
   * @request GET:/login
   */
  namespace KeyRegister {
    type RequestParams = {};
    type RequestQuery = {};
    type RequestBody = never;
    type RequestHeaders = {};
    type ResponseBody = {
      /** revoke key */
      secret?: string;
      /** registered */
      status?: string;
    };
  }
}
