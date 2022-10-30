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

export class Login {
  http;
  constructor(http) {
    this.http = http;
  }
  /**
   * @description push sign-in request See: https://github.com/skion/authentiq/wiki/JWT-Examples
   *
   * @tags login, post
   * @name PushLoginRequest
   * @request POST:/login
   */
  pushLoginRequest = (query, body, params = {}) =>
    this.http.request({
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
  keyRegister = (params = {}) =>
    this.http.request({
      path: `/login`,
      method: "GET",
      format: "json",
      ...params,
    });
}
