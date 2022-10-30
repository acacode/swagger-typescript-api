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

import { Claims, Error } from "./data-contracts";
import { HttpClient, HttpResponse, RequestParams } from "./http-client";
export declare class Scope<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;
  constructor(http: HttpClient<SecurityDataType>);
  /**
   * @description scope verification request See: https://github.com/skion/authentiq/wiki/JWT-Examples
   *
   * @tags scope, post
   * @name SignRequest
   * @request POST:/scope
   */
  signRequest: (
    body: Claims,
    query?: {
      /** test only mode, using test issuer */
      test?: number;
    },
    params?: RequestParams,
  ) => Promise<
    HttpResponse<
      {
        /** 20-character ID */
        job?: string;
        /** waiting */
        status?: string;
      },
      Error
    >
  >;
  /**
   * @description delete a verification job
   *
   * @tags scope, delete
   * @name SignDelete
   * @request DELETE:/scope/{job}
   */
  signDelete: (
    job: string,
    params?: RequestParams,
  ) => Promise<
    HttpResponse<
      {
        /** done */
        status?: string;
      },
      Error
    >
  >;
  /**
   * @description get the status / current content of a verification job
   *
   * @tags scope, get
   * @name SignRetrieve
   * @request GET:/scope/{job}
   */
  signRetrieve: (
    job: string,
    params?: RequestParams,
  ) => Promise<
    HttpResponse<
      {
        exp?: number;
        field?: string;
        /** base64safe encoded public signing key */
        sub?: string;
      },
      Error
    >
  >;
  /**
   * @description HEAD to get the status of a verification job
   *
   * @tags scope, head
   * @name SignRetrieveHead
   * @request HEAD:/scope/{job}
   */
  signRetrieveHead: (job: string, params?: RequestParams) => Promise<HttpResponse<void, Error>>;
  /**
   * @description this is a scope confirmation
   *
   * @tags scope, post
   * @name SignConfirm
   * @request POST:/scope/{job}
   */
  signConfirm: (
    job: string,
    params?: RequestParams,
  ) => Promise<
    HttpResponse<
      {
        /** confirmed */
        status?: string;
      },
      Error
    >
  >;
  /**
   * @description authority updates a JWT with its signature See: https://github.com/skion/authentiq/wiki/JWT-Examples
   *
   * @tags scope, put
   * @name SignUpdate
   * @request PUT:/scope/{job}
   */
  signUpdate: (
    job: string,
    params?: RequestParams,
  ) => Promise<
    HttpResponse<
      {
        /** result is JWT or JSON?? */
        jwt?: string;
        /** ready */
        status?: string;
      },
      Error
    >
  >;
}
