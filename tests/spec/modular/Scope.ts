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

import { HttpClient, RequestParams } from "./http-client";
import { Claims, Error } from "./data-contracts";

/**
 * @title Authentiq
 * @version 6
 * @baseUrl https://6-dot-authentiqio.appspot.com/
 * Strong authentication, without the passwords.
 */
export class Scope extends HttpClient {
  /**
   * @description scope verification request See: https://github.com/skion/authentiq/wiki/JWT-Examples
   *
   * @tags scope, post
   * @name sign_request
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
   * @name sign_delete
   * @request DELETE:/scope/{job}
   */
  signDelete = (job: string, params?: RequestParams) =>
    this.request<{ status?: string }, Error>(`/scope/${job}`, "DELETE", params);
  /**
   * @description get the status / current content of a verification job
   *
   * @tags scope, get
   * @name sign_retrieve
   * @request GET:/scope/{job}
   */
  signRetrieve = (job: string, params?: RequestParams) =>
    this.request<{ exp?: number; field?: string; sub?: string }, Error>(`/scope/${job}`, "GET", params);
  /**
   * @description HEAD to get the status of a verification job
   *
   * @tags scope, head
   * @name sign_retrieve_head
   * @request HEAD:/scope/{job}
   */
  signRetrieveHead = (job: string, params?: RequestParams) =>
    this.request<any, Error>(`/scope/${job}`, "HEAD", params);
  /**
   * @description this is a scope confirmation
   *
   * @tags scope, post
   * @name sign_confirm
   * @request POST:/scope/{job}
   */
  signConfirm = (job: string, params?: RequestParams) =>
    this.request<{ status?: string }, Error>(`/scope/${job}`, "POST", params);
  /**
   * @description authority updates a JWT with its signature See: https://github.com/skion/authentiq/wiki/JWT-Examples
   *
   * @tags scope, put
   * @name sign_update
   * @request PUT:/scope/{job}
   */
  signUpdate = (job: string, params?: RequestParams) =>
    this.request<{ jwt?: string; status?: string }, Error>(`/scope/${job}`, "PUT", params);
}
