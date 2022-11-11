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

export enum EnumRoot {
  Key100644 = "100644",
  Key100755 = "100755",
  Key040000 = "040000",
  Key160000 = "160000",
  Key120000 = "120000",
  Test1 = "test1",
  Test2 = "test2",
}

export interface Tree {
  tree?: {
    mode?: TreeMode;
    "mode-num"?: TreeModeNum;
    type?: TreeType;
    bereke?: TreeBereke;
  }[];
}

export enum OnlyEnumNames {
  Bla = "Bla",
  Blabla = "Blabla",
  Boiler = "Boiler",
}

export enum StringOnlyEnumNames {
  Bla = "Bla",
  Blabla = "Blabla",
  Boiler = "Boiler",
}

export enum StringEnums {
  Bla = "foo",
  Blabla = "bar",
  Boiler = "Boiler",
}

export enum StringCompleteEnums {
  Bla = "foo",
  Blabla = "bar",
  Boiler = "baz",
}

/** @format int32 */
export enum EmptyEnum {
  Bla = "Bla",
  Blabla = "Blabla",
  Boiler = "Boiler",
}

/** @format int32 */
export enum EnumWithMoreNames {
  Bla = 1,
  Blabla = "Blabla",
  Boiler = "Boiler",
}

/** @format int32 */
export enum SomeInterestEnum {
  Bla = 6,
  Blabla = 2,
  Boiler = 1,
  Bbabab = 67,
  Nowadays = 88,
  FAIL = 122,
  Vvvvv = 88,
  ASdasAS = 0,
  ASDsacZX = 213,
  Zook = 12378,
  EnumMm = 123125,
  VCsa = 32452,
  Yuuu = 1111,
  ASddd = 66666,
  ASdsdsa = "ASdsdsa",
  ASDds = "ASDds",
  HSDFDS = "HSDFDS",
}

export enum TreeMode {
  Key100644 = "100644",
  Key100755 = "100755",
  Key040000 = "040000",
  Key160000 = "160000",
  Key120000 = "120000",
}

export enum TreeModeNum {
  Key100644 = 100644,
  Key100755 = 100755,
  Key40000 = 40000,
  Key160000 = 160000,
  Key120000 = 120000,
}

export enum TreeType {
  Blob = "blob",
  Tree = "tree",
  Commit = "commit",
}

export enum TreeBereke {
  Bla = "Bla",
  Blabla = "Blabla",
  Boiler = "Boiler",
}
