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

export class Key {
  http;
  constructor(http) {
    this.http = http;
  }
  /**
   * @description Revoke an Authentiq ID using email & phone. If called with `email` and `phone` only, a verification code will be sent by email. Do a second call adding `code` to complete the revocation.
   *
   * @tags key, delete
   * @name KeyRevokeNosecret
   * @request DELETE:/key
   */
  keyRevokeNosecret = (query, params = {}) =>
    this.http.request({
      path: `/key`,
      method: "DELETE",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * @description Register a new ID `JWT(sub, devtoken)` v5: `JWT(sub, pk, devtoken, ...)` See: https://github.com/skion/authentiq/wiki/JWT-Examples
   *
   * @tags key, post
   * @name KeyRegister
   * @request POST:/key
   */
  keyRegister = (body, params = {}) =>
    this.http.request({
      path: `/key`,
      method: "POST",
      body: body,
      format: "json",
      ...params,
    });
  /**
   * @description Revoke an Identity (Key) with a revocation secret
   *
   * @tags key, delete
   * @name KeyRevoke
   * @request DELETE:/key/{PK}
   */
  keyRevoke = (pk, query, params = {}) =>
    this.http.request({
      path: `/key/${pk}`,
      method: "DELETE",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * @description Get public details of an Authentiq ID.
   *
   * @tags key, get
   * @name GetKey
   * @request GET:/key/{PK}
   */
  getKey = (pk, params = {}) =>
    this.http.request({
      path: `/key/${pk}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description HEAD info on Authentiq ID
   *
   * @tags key, head
   * @name HeadKey
   * @request HEAD:/key/{PK}
   */
  headKey = (pk, params = {}) =>
    this.http.request({
      path: `/key/${pk}`,
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
  keyUpdate = (pk, body, params = {}) =>
    this.http.request({
      path: `/key/${pk}`,
      method: "POST",
      body: body,
      format: "json",
      ...params,
    });
  /**
   * @description Update Authentiq ID by replacing the object. v4: `JWT(sub,email,phone)` to bind email/phone hash; v5: POST issuer-signed email & phone scopes and PUT to update registration `JWT(sub, pk, devtoken, ...)` See: https://github.com/skion/authentiq/wiki/JWT-Examples
   *
   * @tags key, put
   * @name KeyBind
   * @request PUT:/key/{PK}
   */
  keyBind = (pk, body, params = {}) =>
    this.http.request({
      path: `/key/${pk}`,
      method: "PUT",
      body: body,
      format: "json",
      ...params,
    });
}
