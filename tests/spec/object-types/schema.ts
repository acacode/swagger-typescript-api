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
 * It is a Pet title
 * It is a Pet description
 */
export type Test1 = {
  /**
   * It is an id title
   * It is an id description
   */
  id: number;
  /**
   * It is a name title
   * It is a name description
   */
  name: string;
  /**
   * It is a tag title
   * It is a tag description
   * @deprecated
   */
  tag: string;
  /**
   * It is a multiple title
   * It is a multiple description
   */
  multiple: string | number;
} | null;

export interface AdditionalObjectProperties {
  id?: string;
}

export interface AdditionalIntProperties {
  id?: string;
}
