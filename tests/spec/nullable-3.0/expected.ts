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

export type MyObject = {
  id: string;
  name: string;
} | null;

export interface TestObject {
  stringMaybeUndefined?: string;
  stringMaybeNullA: string | null;
  stringMaybeNullB: string | null;
  stringMaybeNullAndUndefined?: string | null;
  otherObjectMaybeUndefined?: OtherObject;
  otherObjectMaybeNullA: OtherObject | null;
  otherObjectMaybeNullB: OtherObject | null;
  otherObjectMaybeNullC: OtherObject | null;
  otherObjectMaybeNullD: OtherObject | null | (OtherObject & null);
}

export type OtherObject = object;
