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

/**
 * Authentiq ID in JWT format, self-signed.
 */
export interface PrefixAuthentiqID {
  /** device token for push messages */
  devtoken?: string;

  /** UUID and public signing key */
  sub: string;
}

/**
 * Claim in JWT format, self- or issuer-signed.
 */
export interface PrefixClaims {
  email?: string;
  phone?: string;

  /** claim scope */
  scope: string;

  /** UUID */
  sub: string;
  type?: string;
}

export interface PrefixError {
  detail?: string;
  error: number;
  title?: string;

  /** unique uri for this error */
  type?: string;
}

/**
 * PushToken in JWT format, self-signed.
 */
export interface PrefixPushToken {
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

export interface PrefixKeyRevokeNosecretData {
  /** pending or done */
  status?: string;
}

export type PrefixKeyRevokeNosecretError = PrefixError | PrefixError | PrefixError;

export interface PrefixKeyRegisterData {
  /** revoke key */
  secret?: string;

  /** registered */
  status?: string;
}

export type PrefixKeyRegisterError = PrefixError;

export interface PrefixKeyRevokeData {
  /** done */
  status?: string;
}

export type PrefixKeyRevokeError = PrefixError | PrefixError;

export interface PrefixGetKeyData {
  /** @format date-time */
  since?: string;
  status?: string;

  /** base64safe encoded public signing key */
  sub?: string;
}

export type PrefixGetKeyError = PrefixError | PrefixError;

export type PrefixHeadKeyData = any;

export type PrefixHeadKeyError = PrefixError | PrefixError;

export interface PrefixKeyUpdateData {
  /** confirmed */
  status?: string;
}

export type PrefixKeyUpdateError = PrefixError;

export interface PrefixKeyBindData {
  /** confirmed */
  status?: string;
}

export type PrefixKeyBindError = PrefixError | PrefixError;

export interface PrefixPushLoginRequestData {
  /** sent */
  status?: string;
}

export type PrefixPushLoginRequestError = PrefixError;

export interface PrefixSignRequestData {
  /** 20-character ID */
  job?: string;

  /** waiting */
  status?: string;
}

export type PrefixSignRequestError = PrefixError;

export interface PrefixSignDeleteData {
  /** done */
  status?: string;
}

export type PrefixSignDeleteError = PrefixError;

export interface PrefixSignRetrieveData {
  exp?: number;
  field?: string;

  /** base64safe encoded public signing key */
  sub?: string;
}

export type PrefixSignRetrieveError = PrefixError;

export type PrefixSignRetrieveHeadData = any;

export type PrefixSignRetrieveHeadError = PrefixError;

export interface PrefixSignConfirmData {
  /** confirmed */
  status?: string;
}

export type PrefixSignConfirmError = PrefixError | PrefixError | PrefixError;

export interface PrefixSignUpdateData {
  /** result is JWT or JSON?? */
  jwt?: string;

  /** ready */
  status?: string;
}

export type PrefixSignUpdateError = PrefixError | PrefixError;
