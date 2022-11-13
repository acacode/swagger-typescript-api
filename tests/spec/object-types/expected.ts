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

type UtilRequiredKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/** https://github.com/acacode/swagger-typescript-api/issues/445 */
export interface SpecificEnum1 {
  myEnum?: ["foo", "bar", "baz"];
}

/** https://github.com/acacode/swagger-typescript-api/issues/445 */
export interface SpecificEnum2 {
  myEnum?: ["foo", "bar", "baz"] | ["foo", "bar", "bad"];
}

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
  [key: string]: any;
}

export interface AdditionalIntProperties {
  id?: string;
  [key: string]: any;
}

export interface ABCOptional {
  /** a */
  a?: string;
  /** b */
  b?: string;
  /** c */
  c?: number;
}

export type ABCOptionalWithRequiredId = UtilRequiredKeys<ABCOptional, "b"> & {
  /** id */
  id: number;
};

export type NestedObjectWithRequiredId = {
  /** id */
  id: number;
} & {
  /** id */
  id1?: number;
};
