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

import { ContentType } from "./http-client";
export class Scope {
  http;
  constructor(http) {
    this.http = http;
  }
  /**
   * @description scope verification request See: https://github.com/skion/authentiq/wiki/JWT-Examples
   *
   * @tags scope, post
   * @name SignRequest
   * @request POST:/scope
   */
  signRequest = (body, query, params = {}) =>
    this.http.request({
      path: `/scope`,
      method: "POST",
      query: query,
      body: body,
      format: "json",
      ...params,
    });
  /**
   * @description delete a verification job
   *
   * @tags scope, delete
   * @name SignDelete
   * @request DELETE:/scope/{job}
   */
  signDelete = (job, params = {}) =>
    this.http.request({
      path: `/scope/${job}`,
      method: "DELETE",
      format: "json",
      ...params,
    });
  /**
   * @description get the status / current content of a verification job
   *
   * @tags scope, get
   * @name SignRetrieve
   * @request GET:/scope/{job}
   */
  signRetrieve = (job, params = {}) =>
    this.http.request({
      path: `/scope/${job}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description HEAD to get the status of a verification job
   *
   * @tags scope, head
   * @name SignRetrieveHead
   * @request HEAD:/scope/{job}
   */
  signRetrieveHead = (job, params = {}) =>
    this.http.request({
      path: `/scope/${job}`,
      method: "HEAD",
      ...params,
    });
  /**
   * @description this is a scope confirmation
   *
   * @tags scope, post
   * @name SignConfirm
   * @request POST:/scope/{job}
   */
  signConfirm = (job, params = {}) =>
    this.http.request({
      path: `/scope/${job}`,
      method: "POST",
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description authority updates a JWT with its signature See: https://github.com/skion/authentiq/wiki/JWT-Examples
   *
   * @tags scope, put
   * @name SignUpdate
   * @request PUT:/scope/{job}
   */
  signUpdate = (job, params = {}) =>
    this.http.request({
      path: `/scope/${job}`,
      method: "PUT",
      ...params,
    });
}
