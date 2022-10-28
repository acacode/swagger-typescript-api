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

import { Claims } from "./data-contracts";
export declare namespace Scope {
  /**
   * @description scope verification request See: https://github.com/skion/authentiq/wiki/JWT-Examples
   * @tags scope, post
   * @name SignRequest
   * @request POST:/scope
   */
  namespace SignRequest {
    type RequestParams = {};
    type RequestQuery = {
      /** test only mode, using test issuer */
      test?: number;
    };
    type RequestBody = Claims;
    type RequestHeaders = {};
    type ResponseBody = {
      /** 20-character ID */
      job?: string;
      /** waiting */
      status?: string;
    };
  }
  /**
   * @description delete a verification job
   * @tags scope, delete
   * @name SignDelete
   * @request DELETE:/scope/{job}
   */
  namespace SignDelete {
    type RequestParams = {
      /** Job ID (20 chars) */
      job: string;
    };
    type RequestQuery = {};
    type RequestBody = never;
    type RequestHeaders = {};
    type ResponseBody = {
      /** done */
      status?: string;
    };
  }
  /**
   * @description get the status / current content of a verification job
   * @tags scope, get
   * @name SignRetrieve
   * @request GET:/scope/{job}
   */
  namespace SignRetrieve {
    type RequestParams = {
      /** Job ID (20 chars) */
      job: string;
    };
    type RequestQuery = {};
    type RequestBody = never;
    type RequestHeaders = {};
    type ResponseBody = {
      exp?: number;
      field?: string;
      /** base64safe encoded public signing key */
      sub?: string;
    };
  }
  /**
   * @description HEAD to get the status of a verification job
   * @tags scope, head
   * @name SignRetrieveHead
   * @request HEAD:/scope/{job}
   */
  namespace SignRetrieveHead {
    type RequestParams = {
      /** Job ID (20 chars) */
      job: string;
    };
    type RequestQuery = {};
    type RequestBody = never;
    type RequestHeaders = {};
    type ResponseBody = void;
  }
  /**
   * @description this is a scope confirmation
   * @tags scope, post
   * @name SignConfirm
   * @request POST:/scope/{job}
   */
  namespace SignConfirm {
    type RequestParams = {
      /** Job ID (20 chars) */
      job: string;
    };
    type RequestQuery = {};
    type RequestBody = never;
    type RequestHeaders = {};
    type ResponseBody = {
      /** confirmed */
      status?: string;
    };
  }
  /**
   * @description authority updates a JWT with its signature See: https://github.com/skion/authentiq/wiki/JWT-Examples
   * @tags scope, put
   * @name SignUpdate
   * @request PUT:/scope/{job}
   */
  namespace SignUpdate {
    type RequestParams = {
      /** Job ID (20 chars) */
      job: string;
    };
    type RequestQuery = {};
    type RequestBody = never;
    type RequestHeaders = {};
    type ResponseBody = {
      /** result is JWT or JSON?? */
      jwt?: string;
      /** ready */
      status?: string;
    };
  }
}
