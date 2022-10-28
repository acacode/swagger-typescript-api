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

import { AuthentiqID } from "./data-contracts";
export declare namespace Key {
  /**
   * @description Revoke an Authentiq ID using email & phone. If called with `email` and `phone` only, a verification code will be sent by email. Do a second call adding `code` to complete the revocation.
   * @tags key, delete
   * @name KeyRevokeNosecret
   * @request DELETE:/key
   */
  namespace KeyRevokeNosecret {
    type RequestParams = {};
    type RequestQuery = {
      /** primary email associated to Key (ID) */
      email: string;
      /** primary phone number, international representation */
      phone: string;
      /** verification code sent by email */
      code?: string;
    };
    type RequestBody = never;
    type RequestHeaders = {};
    type ResponseBody = {
      /** pending or done */
      status?: string;
    };
  }
  /**
   * @description Register a new ID `JWT(sub, devtoken)` v5: `JWT(sub, pk, devtoken, ...)` See: https://github.com/skion/authentiq/wiki/JWT-Examples
   * @tags key, post
   * @name KeyRegister
   * @request POST:/key
   */
  namespace KeyRegister {
    type RequestParams = {};
    type RequestQuery = {};
    type RequestBody = AuthentiqID;
    type RequestHeaders = {};
    type ResponseBody = {
      /** revoke key */
      secret?: string;
      /** registered */
      status?: string;
    };
  }
  /**
   * @description Revoke an Identity (Key) with a revocation secret
   * @tags key, delete
   * @name KeyRevoke
   * @request DELETE:/key/{PK}
   */
  namespace KeyRevoke {
    type RequestParams = {
      /** Public Signing Key - Authentiq ID (43 chars) */
      pk: string;
    };
    type RequestQuery = {
      /** revokation secret */
      secret: string;
    };
    type RequestBody = never;
    type RequestHeaders = {};
    type ResponseBody = {
      /** done */
      status?: string;
    };
  }
  /**
   * @description Get public details of an Authentiq ID.
   * @tags key, get
   * @name GetKey
   * @request GET:/key/{PK}
   */
  namespace GetKey {
    type RequestParams = {
      /** Public Signing Key - Authentiq ID (43 chars) */
      pk: string;
    };
    type RequestQuery = {};
    type RequestBody = never;
    type RequestHeaders = {};
    type ResponseBody = {
      /** @format date-time */
      since?: string;
      status?: string;
      /** base64safe encoded public signing key */
      sub?: string;
    };
  }
  /**
   * @description HEAD info on Authentiq ID
   * @tags key, head
   * @name HeadKey
   * @request HEAD:/key/{PK}
   */
  namespace HeadKey {
    type RequestParams = {
      /** Public Signing Key - Authentiq ID (43 chars) */
      pk: string;
    };
    type RequestQuery = {};
    type RequestBody = never;
    type RequestHeaders = {};
    type ResponseBody = void;
  }
  /**
   * @description update properties of an Authentiq ID. (not operational in v4; use PUT for now) v5: POST issuer-signed email & phone scopes in a self-signed JWT See: https://github.com/skion/authentiq/wiki/JWT-Examples
   * @tags key, post
   * @name KeyUpdate
   * @request POST:/key/{PK}
   */
  namespace KeyUpdate {
    type RequestParams = {
      /** Public Signing Key - Authentiq ID (43 chars) */
      pk: string;
    };
    type RequestQuery = {};
    type RequestBody = AuthentiqID;
    type RequestHeaders = {};
    type ResponseBody = {
      /** confirmed */
      status?: string;
    };
  }
  /**
   * @description Update Authentiq ID by replacing the object. v4: `JWT(sub,email,phone)` to bind email/phone hash; v5: POST issuer-signed email & phone scopes and PUT to update registration `JWT(sub, pk, devtoken, ...)` See: https://github.com/skion/authentiq/wiki/JWT-Examples
   * @tags key, put
   * @name KeyBind
   * @request PUT:/key/{PK}
   */
  namespace KeyBind {
    type RequestParams = {
      /** Public Signing Key - Authentiq ID (43 chars) */
      pk: string;
    };
    type RequestQuery = {};
    type RequestBody = AuthentiqID;
    type RequestHeaders = {};
    type ResponseBody = {
      /** confirmed */
      status?: string;
    };
  }
}
