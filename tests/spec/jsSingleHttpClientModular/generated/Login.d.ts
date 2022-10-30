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

import { Error, PushToken } from "./data-contracts";
import { HttpClient, HttpResponse, RequestParams } from "./http-client";
export declare class Login<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;
  constructor(http: HttpClient<SecurityDataType>);
  /**
   * @description push sign-in request See: https://github.com/skion/authentiq/wiki/JWT-Examples
   *
   * @tags login, post
   * @name PushLoginRequest
   * @request POST:/login
   */
  pushLoginRequest: (
    query: {
      /** URI App will connect to */
      callback: string;
    },
    body: PushToken,
    params?: RequestParams,
  ) => Promise<
    HttpResponse<
      {
        /** sent */
        status?: string;
      },
      Error
    >
  >;
  /**
   * @description Get a current key register
   *
   * @tags key, get
   * @name KeyRegister
   * @request GET:/login
   */
  keyRegister: (params?: RequestParams) => Promise<
    HttpResponse<
      {
        /** revoke key */
        secret?: string;
        /** registered */
        status?: string;
      },
      Error
    >
  >;
}
