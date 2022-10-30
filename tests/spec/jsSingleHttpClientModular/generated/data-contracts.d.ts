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

/** Authentiq ID in JWT format, self-signed. */
export interface AuthentiqID {
  /** device token for push messages */
  devtoken?: string;
  /** UUID and public signing key */
  sub: string;
}
/** Claim in JWT format, self- or issuer-signed.  */
export interface Claims {
  email?: string;
  phone?: string;
  /** claim scope */
  scope: string;
  /** UUID */
  sub: string;
  type?: string;
}
export interface Error {
  detail?: string;
  error: number;
  title?: string;
  /** unique uri for this error */
  type?: string;
}
/** PushToken in JWT format, self-signed.  */
export interface PushToken {
  /** audience (URI) */
  aud: string;
  exp?: number;
  iat?: number;
  /** issuer (URI) */
  iss: string;
  nbf?: number;
  /** UUID and public signing key */
  sub: string;
}
