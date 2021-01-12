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

import { Error, PushToken } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Login extends HttpClient {
  /**
   * @description push sign-in request See: https://github.com/skion/authentiq/wiki/JWT-Examples
   *
   * @tags login, post
   * @name PushLoginRequest
   * @request POST:/login
   */
  pushLoginRequest = (query: { callback: string }, body: PushToken, params?: RequestParams) =>
    this.request<{ status?: string }, Error>(`/login${this.addQueryParams(query)}`, "POST", params, body);
}
