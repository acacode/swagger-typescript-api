/* eslint:disable */
/* tslint-disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { AuthentiqID, Error } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Key<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Revoke an Authentiq ID using email & phone. If called with `email` and `phone` only, a verification code will be sent by email. Do a second call adding `code` to complete the revocation.
   *
   * @tags key, delete
   * @name KeyRevokeNosecret
   * @request DELETE:/key
   */
  keyRevokeNosecret = (query: { email: string; phone: string; code?: string }, params: RequestParams = {}) =>
    this.request<{ status?: string }, Error>({
      path: `/key`,
      method: "DELETE",
      query: query,
      ...params,
    });
  /**
   * @description Register a new ID `JWT(sub, devtoken)` v5: `JWT(sub, pk, devtoken, ...)` See: https://github.com/skion/authentiq/wiki/JWT-Examples
   *
   * @tags key, post
   * @name KeyRegister
   * @request POST:/key
   */
  keyRegister = (body: AuthentiqID, params: RequestParams = {}) =>
    this.request<{ secret?: string; status?: string }, Error>({
      path: `/key`,
      method: "POST",
      body: body,
      ...params,
    });
  /**
   * @description Revoke an Identity (Key) with a revocation secret
   *
   * @tags key, delete
   * @name KeyRevoke
   * @request DELETE:/key/{PK}
   */
  keyRevoke = (PK: string, query: { secret: string }, params: RequestParams = {}) =>
    this.request<{ status?: string }, Error>({
      path: `/key/${PK}`,
      method: "DELETE",
      query: query,
      ...params,
    });
  /**
   * @description Get public details of an Authentiq ID.
   *
   * @tags key, get
   * @name GetKey
   * @request GET:/key/{PK}
   */
  getKey = (PK: string, params: RequestParams = {}) =>
    this.request<{ since?: string; status?: string; sub?: string }, Error>({
      path: `/key/${PK}`,
      method: "GET",
      ...params,
    });
  /**
   * @description HEAD info on Authentiq ID
   *
   * @tags key, head
   * @name HeadKey
   * @request HEAD:/key/{PK}
   */
  headKey = (PK: string, params: RequestParams = {}) =>
    this.request<void, Error>({
      path: `/key/${PK}`,
      method: "HEAD",
      ...params,
    });
  /**
   * @description update properties of an Authentiq ID. (not operational in v4; use PUT for now) v5: POST issuer-signed email & phone scopes in a self-signed JWT See: https://github.com/skion/authentiq/wiki/JWT-Examples
   *
   * @tags key, post
   * @name KeyUpdate
   * @request POST:/key/{PK}
   */
  keyUpdate = (PK: string, body: AuthentiqID, params: RequestParams = {}) =>
    this.request<{ status?: string }, Error>({
      path: `/key/${PK}`,
      method: "POST",
      body: body,
      ...params,
    });
  /**
   * @description Update Authentiq ID by replacing the object. v4: `JWT(sub,email,phone)` to bind email/phone hash; v5: POST issuer-signed email & phone scopes and PUT to update registration `JWT(sub, pk, devtoken, ...)` See: https://github.com/skion/authentiq/wiki/JWT-Examples
   *
   * @tags key, put
   * @name KeyBind
   * @request PUT:/key/{PK}
   */
  keyBind = (PK: string, body: AuthentiqID, params: RequestParams = {}) =>
    this.request<{ status?: string }, Error>({
      path: `/key/${PK}`,
      method: "PUT",
      body: body,
      ...params,
    });
}
