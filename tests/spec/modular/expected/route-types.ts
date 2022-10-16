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

import { AuthentiqID, Claims, PushToken } from "./data-contracts";

export namespace key {
  /**
   * @description Revoke an Authentiq ID using email & phone. If called with `email` and `phone` only, a verification code will be sent by email. Do a second call adding `code` to complete the revocation.
   * @tags key, delete
   * @name KeyRevokeNosecret
   * @request DELETE:/key
   */
  export namespace KeyRevokeNosecret {
    export type RequestParams = {};
    export type RequestQuery = { email: string; phone: string; code?: string };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = { status?: string };
  }
  /**
   * @description Register a new ID `JWT(sub, devtoken)` v5: `JWT(sub, pk, devtoken, ...)` See: https://github.com/skion/authentiq/wiki/JWT-Examples
   * @tags key, post
   * @name KeyRegister
   * @request POST:/key
   */
  export namespace KeyRegister {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AuthentiqID;
    export type RequestHeaders = {};
    export type ResponseBody = { secret?: string; status?: string };
  }
  /**
   * @description Revoke an Identity (Key) with a revocation secret
   * @tags key, delete
   * @name KeyRevoke
   * @request DELETE:/key/{PK}
   */
  export namespace KeyRevoke {
    export type RequestParams = { pk: string };
    export type RequestQuery = { secret: string };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = { status?: string };
  }
  /**
   * @description Get public details of an Authentiq ID.
   * @tags key, get
   * @name GetKey
   * @request GET:/key/{PK}
   */
  export namespace GetKey {
    export type RequestParams = { pk: string };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = { since?: string; status?: string; sub?: string };
  }
  /**
   * @description HEAD info on Authentiq ID
   * @tags key, head
   * @name HeadKey
   * @request HEAD:/key/{PK}
   */
  export namespace HeadKey {
    export type RequestParams = { pk: string };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
  /**
   * @description update properties of an Authentiq ID. (not operational in v4; use PUT for now) v5: POST issuer-signed email & phone scopes in a self-signed JWT See: https://github.com/skion/authentiq/wiki/JWT-Examples
   * @tags key, post
   * @name KeyUpdate
   * @request POST:/key/{PK}
   */
  export namespace KeyUpdate {
    export type RequestParams = { pk: string };
    export type RequestQuery = {};
    export type RequestBody = AuthentiqID;
    export type RequestHeaders = {};
    export type ResponseBody = { status?: string };
  }
  /**
   * @description Update Authentiq ID by replacing the object. v4: `JWT(sub,email,phone)` to bind email/phone hash; v5: POST issuer-signed email & phone scopes and PUT to update registration `JWT(sub, pk, devtoken, ...)` See: https://github.com/skion/authentiq/wiki/JWT-Examples
   * @tags key, put
   * @name KeyBind
   * @request PUT:/key/{PK}
   */
  export namespace KeyBind {
    export type RequestParams = { pk: string };
    export type RequestQuery = {};
    export type RequestBody = AuthentiqID;
    export type RequestHeaders = {};
    export type ResponseBody = { status?: string };
  }
}

export namespace login {
  /**
   * @description push sign-in request See: https://github.com/skion/authentiq/wiki/JWT-Examples
   * @tags login, post
   * @name PushLoginRequest
   * @request POST:/login
   */
  export namespace PushLoginRequest {
    export type RequestParams = {};
    export type RequestQuery = { callback: string };
    export type RequestBody = PushToken;
    export type RequestHeaders = {};
    export type ResponseBody = { status?: string };
  }
  /**
   * @description Get a current key register
   * @tags key, get
   * @name KeyRegister
   * @request GET:/login
   */
  export namespace KeyRegister {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = { secret?: string; status?: string };
  }
}

export namespace scope {
  /**
   * @description scope verification request See: https://github.com/skion/authentiq/wiki/JWT-Examples
   * @tags scope, post
   * @name SignRequest
   * @request POST:/scope
   */
  export namespace SignRequest {
    export type RequestParams = {};
    export type RequestQuery = { test?: number };
    export type RequestBody = Claims;
    export type RequestHeaders = {};
    export type ResponseBody = { job?: string; status?: string };
  }
  /**
   * @description delete a verification job
   * @tags scope, delete
   * @name SignDelete
   * @request DELETE:/scope/{job}
   */
  export namespace SignDelete {
    export type RequestParams = { job: string };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = { status?: string };
  }
  /**
   * @description get the status / current content of a verification job
   * @tags scope, get
   * @name SignRetrieve
   * @request GET:/scope/{job}
   */
  export namespace SignRetrieve {
    export type RequestParams = { job: string };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = { exp?: number; field?: string; sub?: string };
  }
  /**
   * @description HEAD to get the status of a verification job
   * @tags scope, head
   * @name SignRetrieveHead
   * @request HEAD:/scope/{job}
   */
  export namespace SignRetrieveHead {
    export type RequestParams = { job: string };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
  /**
   * @description this is a scope confirmation
   * @tags scope, post
   * @name SignConfirm
   * @request POST:/scope/{job}
   */
  export namespace SignConfirm {
    export type RequestParams = { job: string };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = { status?: string };
  }
  /**
   * @description authority updates a JWT with its signature See: https://github.com/skion/authentiq/wiki/JWT-Examples
   * @tags scope, put
   * @name SignUpdate
   * @request PUT:/scope/{job}
   */
  export namespace SignUpdate {
    export type RequestParams = { job: string };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = { jwt?: string; status?: string };
  }
}
