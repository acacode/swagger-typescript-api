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
import { HttpClient, RequestParams } from "./http-client";

export class Login<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description push sign-in request See: https://github.com/skion/authentiq/wiki/JWT-Examples
   *
   * @tags login, post
   * @name PushLoginRequest
   * @request POST:/login
   */
  pushLoginRequest = (
    query: {
      /** URI App will connect to */
      callback: string;
    },
    body: PushToken,
    params: RequestParams = {},
  ) =>
    this.request<
      {
        /** sent */
        status?: string;
      },
      Error
    >({
      path: `/login`,
      method: "POST",
      query: query,
      body: body,
      format: "json",
      ...params,
    });
  /**
   * @description Get a current key register
   *
   * @tags key, get
   * @name KeyRegister
   * @request GET:/login
   */
  keyRegister = (params: RequestParams = {}) =>
    this.request<
      {
        /** revoke key */
        secret?: string;
        /** registered */
        status?: string;
      },
      Error
    >({
      path: `/login`,
      method: "GET",
      format: "json",
      ...params,
    });
}
