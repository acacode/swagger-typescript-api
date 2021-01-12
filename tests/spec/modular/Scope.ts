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

import { Claims, Error } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Scope extends HttpClient {
  /**
   * @description scope verification request See: https://github.com/skion/authentiq/wiki/JWT-Examples
   *
   * @tags scope, post
   * @name SignRequest
   * @request POST:/scope
   */
  signRequest = (body: Claims, query?: { test?: number }, params?: RequestParams) =>
    this.request<{ job?: string; status?: string }, Error>(
      `/scope${this.addQueryParams(query)}`,
      "POST",
      params,
      body,
    );
  /**
   * @description delete a verification job
   *
   * @tags scope, delete
   * @name SignDelete
   * @request DELETE:/scope/{job}
   */
  signDelete = (job: string, params?: RequestParams) =>
    this.request<{ status?: string }, Error>(`/scope/${job}`, "DELETE", params);
  /**
   * @description get the status / current content of a verification job
   *
   * @tags scope, get
   * @name SignRetrieve
   * @request GET:/scope/{job}
   */
  signRetrieve = (job: string, params?: RequestParams) =>
    this.request<{ exp?: number; field?: string; sub?: string }, Error>(`/scope/${job}`, "GET", params);
  /**
   * @description HEAD to get the status of a verification job
   *
   * @tags scope, head
   * @name SignRetrieveHead
   * @request HEAD:/scope/{job}
   */
  signRetrieveHead = (job: string, params?: RequestParams) =>
    this.request<any, Error>(`/scope/${job}`, "HEAD", params);
  /**
   * @description this is a scope confirmation
   *
   * @tags scope, post
   * @name SignConfirm
   * @request POST:/scope/{job}
   */
  signConfirm = (job: string, params?: RequestParams) =>
    this.request<{ status?: string }, Error>(`/scope/${job}`, "POST", params);
  /**
   * @description authority updates a JWT with its signature See: https://github.com/skion/authentiq/wiki/JWT-Examples
   *
   * @tags scope, put
   * @name SignUpdate
   * @request PUT:/scope/{job}
   */
  signUpdate = (job: string, params?: RequestParams) =>
    this.request<{ jwt?: string; status?: string }, Error>(`/scope/${job}`, "PUT", params);
}
