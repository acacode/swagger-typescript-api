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

export enum TypeNamePrefixEnumRootTypeNameSuffix {
  EnumKeyPrefixInvalidKey100644EnumKeySuffix = "100644",
  EnumKeyPrefixInvalidKey100755EnumKeySuffix = "100755",
  EnumKeyPrefixInvalidKey040000EnumKeySuffix = "040000",
  EnumKeyPrefixInvalidKey160000EnumKeySuffix = "160000",
  EnumKeyPrefixInvalidKey120000EnumKeySuffix = "120000",
  EnumKeyPrefixTest1EnumKeySuffix = "test1",
  EnumKeyPrefixTest2EnumKeySuffix = "test2",
}

export interface TypeNamePrefixTreeTypeNameSuffix {
  tree?: {
    mode?: TypeNamePrefixTreeModeTypeNameSuffix;
    "mode-num"?: TypeNamePrefixTreeModeNumTypeNameSuffix;
    type?: TypeNamePrefixTreeTypeTypeNameSuffix;
    bereke?: TypeNamePrefixTreeBerekeTypeNameSuffix;
  }[];
}

export enum TypeNamePrefixOnlyEnumNamesTypeNameSuffix {
  EnumKeyPrefixBlaEnumKeySuffix = "Bla",
  EnumKeyPrefixBlablaEnumKeySuffix = "Blabla",
  EnumKeyPrefixBoilerEnumKeySuffix = "Boiler",
}

export enum TypeNamePrefixStringOnlyEnumNamesTypeNameSuffix {
  EnumKeyPrefixBlaEnumKeySuffix = "Bla",
  EnumKeyPrefixBlablaEnumKeySuffix = "Blabla",
  EnumKeyPrefixBoilerEnumKeySuffix = "Boiler",
}

export enum TypeNamePrefixStringEnumsTypeNameSuffix {
  EnumKeyPrefixBlaEnumKeySuffix = "foo",
  EnumKeyPrefixBlablaEnumKeySuffix = "bar",
  EnumKeyPrefixBoilerEnumKeySuffix = "Boiler",
}

export enum TypeNamePrefixStringCompleteEnumsTypeNameSuffix {
  EnumKeyPrefixBlaEnumKeySuffix = "foo",
  EnumKeyPrefixBlablaEnumKeySuffix = "bar",
  EnumKeyPrefixBoilerEnumKeySuffix = "baz",
}

/** @format int32 */
export enum TypeNamePrefixEmptyEnumTypeNameSuffix {
  EnumKeyPrefixBlaEnumKeySuffix = "Bla",
  EnumKeyPrefixBlablaEnumKeySuffix = "Blabla",
  EnumKeyPrefixBoilerEnumKeySuffix = "Boiler",
}

/** @format int32 */
export enum TypeNamePrefixEnumWithMoreNamesTypeNameSuffix {
  EnumKeyPrefixBlaEnumKeySuffix = 1,
  EnumKeyPrefixBlablaEnumKeySuffix = "Blabla",
  EnumKeyPrefixBoilerEnumKeySuffix = "Boiler",
}

/** @format int32 */
export enum TypeNamePrefixSomeInterestEnumTypeNameSuffix {
  EnumKeyPrefixBlaEnumKeySuffix = 6,
  EnumKeyPrefixBlablaEnumKeySuffix = 2,
  EnumKeyPrefixBoilerEnumKeySuffix = 1,
  EnumKeyPrefixBbababEnumKeySuffix = 67,
  EnumKeyPrefixNowadaysEnumKeySuffix = 88,
  EnumKeyPrefix_FAIL_EnumKeySuffix = 122,
  EnumKeyPrefixVvvvvEnumKeySuffix = 88,
  EnumKeyPrefixASdasASEnumKeySuffix = 0,
  EnumKeyPrefixASDsacZXEnumKeySuffix = 213,
  EnumKeyPrefixZookEnumKeySuffix = 12378,
  EnumKeyPrefixEnumMmEnumKeySuffix = 123125,
  EnumKeyPrefixVCsaEnumKeySuffix = 32452,
  EnumKeyPrefixYuuuEnumKeySuffix = 1111,
  EnumKeyPrefixASdddEnumKeySuffix = 66666,
  EnumKeyPrefixASdsdsaEnumKeySuffix = "ASdsdsa",
  EnumKeyPrefixASDdsEnumKeySuffix = "ASDds",
  EnumKeyPrefix_HSDFDS_EnumKeySuffix = "HSDFDS",
}

export enum TypeNamePrefixTreeModeTypeNameSuffix {
  EnumKeyPrefixInvalidKey100644EnumKeySuffix = "100644",
  EnumKeyPrefixInvalidKey100755EnumKeySuffix = "100755",
  EnumKeyPrefixInvalidKey040000EnumKeySuffix = "040000",
  EnumKeyPrefixInvalidKey160000EnumKeySuffix = "160000",
  EnumKeyPrefixInvalidKey120000EnumKeySuffix = "120000",
}

export enum TypeNamePrefixTreeModeNumTypeNameSuffix {
  EnumKeyPrefixInvalidKey100644EnumKeySuffix = 100644,
  EnumKeyPrefixInvalidKey100755EnumKeySuffix = 100755,
  EnumKeyPrefixInvalidKey40000EnumKeySuffix = 40000,
  EnumKeyPrefixInvalidKey160000EnumKeySuffix = 160000,
  EnumKeyPrefixInvalidKey120000EnumKeySuffix = 120000,
}

export enum TypeNamePrefixTreeTypeTypeNameSuffix {
  EnumKeyPrefixBlobEnumKeySuffix = "blob",
  EnumKeyPrefixTreeEnumKeySuffix = "tree",
  EnumKeyPrefixCommitEnumKeySuffix = "commit",
}

export enum TypeNamePrefixTreeBerekeTypeNameSuffix {
  EnumKeyPrefixBlaEnumKeySuffix = "Bla",
  EnumKeyPrefixBlablaEnumKeySuffix = "Blabla",
  EnumKeyPrefixBoilerEnumKeySuffix = "Boiler",
}

export interface TypeNamePrefixGetAbcGetParamsTypeNameSuffix {
  statuses?: any[];
  /**
   * Order By
   * @default "created_time"
   */
  order_by?: TypeNamePrefixGetAbcGetParamsOrderByTypeNameSuffix;
  statusesPath?: any[];
  /**
   * Order By
   * @default "created_time"
   */
  orderPathBy?: TypeNamePrefixGetAbcGetParamsOrderPathByTypeNameSuffix;
  /** Tag Ids */
  tagPathIds?: string[];
}

/**
 * Order By
 * @default "created_time"
 */
export enum TypeNamePrefixGetAbcGetParamsOrderByTypeNameSuffix {
  EnumKeyPrefixCreatedTimeEnumKeySuffix = "created_time",
}

/**
 * Order By
 * @default "created_time"
 */
export enum TypeNamePrefixGetAbcGetParamsOrderPathByTypeNameSuffix {
  EnumKeyPrefixCreatedTimeEnumKeySuffix = "created_time",
}

/**
 * Order By
 * @default "created_time"
 */
export enum TypeNamePrefixGetAbcGetParamsOrderHeaderByTypeNameSuffix {
  EnumKeyPrefixCreatedTimeEnumKeySuffix = "created_time",
}

export interface TypeNamePrefixGetCdeGetParamsTypeNameSuffix {
  /** Tag Ids */
  tag_ids?: string[];
  SHOULD_NOT_BE_ANY?: {
    tree?: {
      mode?: TypeNamePrefixGetCdeGetParamsModeTypeNameSuffix;
      "mode-num"?: TypeNamePrefixGetCdeGetParamsModeNumTypeNameSuffix;
      type?: TypeNamePrefixGetCdeGetParamsTypeTypeNameSuffix;
      bereke?: TypeNamePrefixGetCdeGetParamsBerekeTypeNameSuffix;
    }[];
  };
  /**
   * Order By
   * @default "created_time"
   */
  order_by?: TypeNamePrefixGetCdeGetParamsOrderByTypeNameSuffix;
  shouldNotBeAnyPath?: {
    tree?: {
      mode?: TypeNamePrefixGetCdeGetParamsModeTypeNameSuffix;
      "mode-num"?: TypeNamePrefixGetCdeGetParamsModeNumTypeNameSuffix;
      type?: TypeNamePrefixGetCdeGetParamsTypeTypeNameSuffix;
      bereke?: TypeNamePrefixGetCdeGetParamsBerekeTypeNameSuffix;
    }[];
  };
  /**
   * Order By
   * @default "created_time"
   */
  orderByPath?: TypeNamePrefixGetCdeGetParamsOrderByPathTypeNameSuffix;
}

export enum TypeNamePrefixGetCdeGetParamsModeTypeNameSuffix {
  EnumKeyPrefixInvalidKey100644EnumKeySuffix = "100644",
  EnumKeyPrefixInvalidKey100755EnumKeySuffix = "100755",
  EnumKeyPrefixInvalidKey040000EnumKeySuffix = "040000",
  EnumKeyPrefixInvalidKey160000EnumKeySuffix = "160000",
  EnumKeyPrefixInvalidKey120000EnumKeySuffix = "120000",
}

export enum TypeNamePrefixGetCdeGetParamsModeNumTypeNameSuffix {
  EnumKeyPrefixInvalidKey100644EnumKeySuffix = 100644,
  EnumKeyPrefixInvalidKey100755EnumKeySuffix = 100755,
  EnumKeyPrefixInvalidKey40000EnumKeySuffix = 40000,
  EnumKeyPrefixInvalidKey160000EnumKeySuffix = 160000,
  EnumKeyPrefixInvalidKey120000EnumKeySuffix = 120000,
}

export enum TypeNamePrefixGetCdeGetParamsTypeTypeNameSuffix {
  EnumKeyPrefixBlobEnumKeySuffix = "blob",
  EnumKeyPrefixTreeEnumKeySuffix = "tree",
  EnumKeyPrefixCommitEnumKeySuffix = "commit",
}

export enum TypeNamePrefixGetCdeGetParamsBerekeTypeNameSuffix {
  EnumKeyPrefixBlaEnumKeySuffix = "Bla",
  EnumKeyPrefixBlablaEnumKeySuffix = "Blabla",
  EnumKeyPrefixBoilerEnumKeySuffix = "Boiler",
}

/**
 * Order By
 * @default "created_time"
 */
export enum TypeNamePrefixGetCdeGetParamsOrderByTypeNameSuffix {
  EnumKeyPrefixCreatedTimeEnumKeySuffix = "created_time",
}

/**
 * Order By
 * @default "created_time"
 */
export enum TypeNamePrefixGetCdeGetParamsOrderByPathTypeNameSuffix {
  EnumKeyPrefixCreatedTimeEnumKeySuffix = "created_time",
}

/**
 * Order By
 * @default "created_time"
 */
export enum TypeNamePrefixGetCdeGetParamsOrderByHeaderTypeNameSuffix {
  EnumKeyPrefixCreatedTimeEnumKeySuffix = "created_time",
}
