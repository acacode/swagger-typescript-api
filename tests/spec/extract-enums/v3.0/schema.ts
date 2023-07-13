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
    mode?: TypeNamePrefixTreeModeEnumTypeNameSuffix;
    "mode-num"?: TypeNamePrefixTreeModeNumEnumTypeNameSuffix;
    type?: TypeNamePrefixTreeTypeEnumTypeNameSuffix;
    bereke?: TypeNamePrefixTreeBerekeEnumTypeNameSuffix;
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

export enum TypeNamePrefixTreeModeEnumTypeNameSuffix {
  EnumKeyPrefixInvalidKey100644EnumKeySuffix = "100644",
  EnumKeyPrefixInvalidKey100755EnumKeySuffix = "100755",
  EnumKeyPrefixInvalidKey040000EnumKeySuffix = "040000",
  EnumKeyPrefixInvalidKey160000EnumKeySuffix = "160000",
  EnumKeyPrefixInvalidKey120000EnumKeySuffix = "120000",
}

export enum TypeNamePrefixTreeModeNumEnumTypeNameSuffix {
  EnumKeyPrefixInvalidKey100644EnumKeySuffix = 100644,
  EnumKeyPrefixInvalidKey100755EnumKeySuffix = 100755,
  EnumKeyPrefixInvalidKey40000EnumKeySuffix = 40000,
  EnumKeyPrefixInvalidKey160000EnumKeySuffix = 160000,
  EnumKeyPrefixInvalidKey120000EnumKeySuffix = 120000,
}

export enum TypeNamePrefixTreeTypeEnumTypeNameSuffix {
  EnumKeyPrefixBlobEnumKeySuffix = "blob",
  EnumKeyPrefixTreeEnumKeySuffix = "tree",
  EnumKeyPrefixCommitEnumKeySuffix = "commit",
}

export enum TypeNamePrefixTreeBerekeEnumTypeNameSuffix {
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
  order_by?: TypeNamePrefixOrderByEnumTypeNameSuffix;
  statusesPath?: any[];
  /**
   * Order By
   * @default "created_time"
   */
  orderPathBy?: TypeNamePrefixOrderPathByEnumTypeNameSuffix;
  /** Tag Ids */
  tagPathIds?: string[];
}

/**
 * Order By
 * @default "created_time"
 */
export enum TypeNamePrefixOrderByEnumTypeNameSuffix {
  EnumKeyPrefixCreatedTimeEnumKeySuffix = "created_time",
}

/**
 * Order By
 * @default "created_time"
 */
export enum TypeNamePrefixOrderPathByEnumTypeNameSuffix {
  EnumKeyPrefixCreatedTimeEnumKeySuffix = "created_time",
}

/**
 * Order By
 * @default "created_time"
 */
export enum TypeNamePrefixGetAbcGetParams1OrderByEnumTypeNameSuffix {
  EnumKeyPrefixCreatedTimeEnumKeySuffix = "created_time",
}

/**
 * Order By
 * @default "created_time"
 */
export enum TypeNamePrefixGetAbcGetParams1OrderPathByEnumTypeNameSuffix {
  EnumKeyPrefixCreatedTimeEnumKeySuffix = "created_time",
}

/**
 * Order By
 * @default "created_time"
 */
export enum TypeNamePrefixGetAbcGetParams1OrderHeaderByEnumTypeNameSuffix {
  EnumKeyPrefixCreatedTimeEnumKeySuffix = "created_time",
}

/**
 * Order By
 * @default "created_time"
 */
export enum TypeNamePrefixGetAbcGetParams1EnumTypeNameSuffix {
  EnumKeyPrefixCreatedTimeEnumKeySuffix = "created_time",
}

export interface TypeNamePrefixGetCdeGetParamsTypeNameSuffix {
  /** Tag Ids */
  tag_ids?: string[];
  SHOULD_NOT_BE_ANY?: {
    tree?: {
      mode?: TypeNamePrefixShouldNotBeAnyModeEnumTypeNameSuffix;
      "mode-num"?: TypeNamePrefixShouldNotBeAnyModeNumEnumTypeNameSuffix;
      type?: TypeNamePrefixShouldNotBeAnyTypeEnumTypeNameSuffix;
      bereke?: TypeNamePrefixShouldNotBeAnyBerekeEnumTypeNameSuffix;
    }[];
  };
  /**
   * Order By
   * @default "created_time"
   */
  order_by?: TypeNamePrefixOrderByEnum1TypeNameSuffix;
  shouldNotBeAnyPath?: {
    tree?: {
      mode?: TypeNamePrefixShouldNotBeAnyPathModeEnumTypeNameSuffix;
      "mode-num"?: TypeNamePrefixShouldNotBeAnyPathModeNumEnumTypeNameSuffix;
      type?: TypeNamePrefixShouldNotBeAnyPathTypeEnumTypeNameSuffix;
      bereke?: TypeNamePrefixShouldNotBeAnyPathBerekeEnumTypeNameSuffix;
    }[];
  };
  /**
   * Order By
   * @default "created_time"
   */
  orderByPath?: TypeNamePrefixOrderByPathEnumTypeNameSuffix;
}

export enum TypeNamePrefixShouldNotBeAnyModeEnumTypeNameSuffix {
  EnumKeyPrefixInvalidKey100644EnumKeySuffix = "100644",
  EnumKeyPrefixInvalidKey100755EnumKeySuffix = "100755",
  EnumKeyPrefixInvalidKey040000EnumKeySuffix = "040000",
  EnumKeyPrefixInvalidKey160000EnumKeySuffix = "160000",
  EnumKeyPrefixInvalidKey120000EnumKeySuffix = "120000",
}

export enum TypeNamePrefixShouldNotBeAnyModeNumEnumTypeNameSuffix {
  EnumKeyPrefixInvalidKey100644EnumKeySuffix = 100644,
  EnumKeyPrefixInvalidKey100755EnumKeySuffix = 100755,
  EnumKeyPrefixInvalidKey40000EnumKeySuffix = 40000,
  EnumKeyPrefixInvalidKey160000EnumKeySuffix = 160000,
  EnumKeyPrefixInvalidKey120000EnumKeySuffix = 120000,
}

export enum TypeNamePrefixShouldNotBeAnyTypeEnumTypeNameSuffix {
  EnumKeyPrefixBlobEnumKeySuffix = "blob",
  EnumKeyPrefixTreeEnumKeySuffix = "tree",
  EnumKeyPrefixCommitEnumKeySuffix = "commit",
}

export enum TypeNamePrefixShouldNotBeAnyBerekeEnumTypeNameSuffix {
  EnumKeyPrefixBlaEnumKeySuffix = "Bla",
  EnumKeyPrefixBlablaEnumKeySuffix = "Blabla",
  EnumKeyPrefixBoilerEnumKeySuffix = "Boiler",
}

/**
 * Order By
 * @default "created_time"
 */
export enum TypeNamePrefixOrderByEnum1TypeNameSuffix {
  EnumKeyPrefixCreatedTimeEnumKeySuffix = "created_time",
}

export enum TypeNamePrefixShouldNotBeAnyPathModeEnumTypeNameSuffix {
  EnumKeyPrefixInvalidKey100644EnumKeySuffix = "100644",
  EnumKeyPrefixInvalidKey100755EnumKeySuffix = "100755",
  EnumKeyPrefixInvalidKey040000EnumKeySuffix = "040000",
  EnumKeyPrefixInvalidKey160000EnumKeySuffix = "160000",
  EnumKeyPrefixInvalidKey120000EnumKeySuffix = "120000",
}

export enum TypeNamePrefixShouldNotBeAnyPathModeNumEnumTypeNameSuffix {
  EnumKeyPrefixInvalidKey100644EnumKeySuffix = 100644,
  EnumKeyPrefixInvalidKey100755EnumKeySuffix = 100755,
  EnumKeyPrefixInvalidKey40000EnumKeySuffix = 40000,
  EnumKeyPrefixInvalidKey160000EnumKeySuffix = 160000,
  EnumKeyPrefixInvalidKey120000EnumKeySuffix = 120000,
}

export enum TypeNamePrefixShouldNotBeAnyPathTypeEnumTypeNameSuffix {
  EnumKeyPrefixBlobEnumKeySuffix = "blob",
  EnumKeyPrefixTreeEnumKeySuffix = "tree",
  EnumKeyPrefixCommitEnumKeySuffix = "commit",
}

export enum TypeNamePrefixShouldNotBeAnyPathBerekeEnumTypeNameSuffix {
  EnumKeyPrefixBlaEnumKeySuffix = "Bla",
  EnumKeyPrefixBlablaEnumKeySuffix = "Blabla",
  EnumKeyPrefixBoilerEnumKeySuffix = "Boiler",
}

/**
 * Order By
 * @default "created_time"
 */
export enum TypeNamePrefixOrderByPathEnumTypeNameSuffix {
  EnumKeyPrefixCreatedTimeEnumKeySuffix = "created_time",
}

export enum TypeNamePrefixGetCdeGetParams1ModeEnumTypeNameSuffix {
  EnumKeyPrefixInvalidKey100644EnumKeySuffix = "100644",
  EnumKeyPrefixInvalidKey100755EnumKeySuffix = "100755",
  EnumKeyPrefixInvalidKey040000EnumKeySuffix = "040000",
  EnumKeyPrefixInvalidKey160000EnumKeySuffix = "160000",
  EnumKeyPrefixInvalidKey120000EnumKeySuffix = "120000",
}

export enum TypeNamePrefixGetCdeGetParams1ModeNumEnumTypeNameSuffix {
  EnumKeyPrefixInvalidKey100644EnumKeySuffix = 100644,
  EnumKeyPrefixInvalidKey100755EnumKeySuffix = 100755,
  EnumKeyPrefixInvalidKey40000EnumKeySuffix = 40000,
  EnumKeyPrefixInvalidKey160000EnumKeySuffix = 160000,
  EnumKeyPrefixInvalidKey120000EnumKeySuffix = 120000,
}

export enum TypeNamePrefixGetCdeGetParams1TypeEnumTypeNameSuffix {
  EnumKeyPrefixBlobEnumKeySuffix = "blob",
  EnumKeyPrefixTreeEnumKeySuffix = "tree",
  EnumKeyPrefixCommitEnumKeySuffix = "commit",
}

export enum TypeNamePrefixGetCdeGetParams1BerekeEnumTypeNameSuffix {
  EnumKeyPrefixBlaEnumKeySuffix = "Bla",
  EnumKeyPrefixBlablaEnumKeySuffix = "Blabla",
  EnumKeyPrefixBoilerEnumKeySuffix = "Boiler",
}

/**
 * Order By
 * @default "created_time"
 */
export enum TypeNamePrefixGetCdeGetParams1OrderByEnumTypeNameSuffix {
  EnumKeyPrefixCreatedTimeEnumKeySuffix = "created_time",
}

export enum TypeNamePrefixGetCdeGetParams1ModeEnum1TypeNameSuffix {
  EnumKeyPrefixInvalidKey100644EnumKeySuffix = "100644",
  EnumKeyPrefixInvalidKey100755EnumKeySuffix = "100755",
  EnumKeyPrefixInvalidKey040000EnumKeySuffix = "040000",
  EnumKeyPrefixInvalidKey160000EnumKeySuffix = "160000",
  EnumKeyPrefixInvalidKey120000EnumKeySuffix = "120000",
}

export enum TypeNamePrefixGetCdeGetParams1ModeNumEnum1TypeNameSuffix {
  EnumKeyPrefixInvalidKey100644EnumKeySuffix = 100644,
  EnumKeyPrefixInvalidKey100755EnumKeySuffix = 100755,
  EnumKeyPrefixInvalidKey40000EnumKeySuffix = 40000,
  EnumKeyPrefixInvalidKey160000EnumKeySuffix = 160000,
  EnumKeyPrefixInvalidKey120000EnumKeySuffix = 120000,
}

export enum TypeNamePrefixGetCdeGetParams1TypeEnum1TypeNameSuffix {
  EnumKeyPrefixBlobEnumKeySuffix = "blob",
  EnumKeyPrefixTreeEnumKeySuffix = "tree",
  EnumKeyPrefixCommitEnumKeySuffix = "commit",
}

export enum TypeNamePrefixGetCdeGetParams1BerekeEnum1TypeNameSuffix {
  EnumKeyPrefixBlaEnumKeySuffix = "Bla",
  EnumKeyPrefixBlablaEnumKeySuffix = "Blabla",
  EnumKeyPrefixBoilerEnumKeySuffix = "Boiler",
}

/**
 * Order By
 * @default "created_time"
 */
export enum TypeNamePrefixGetCdeGetParams1OrderByPathEnumTypeNameSuffix {
  EnumKeyPrefixCreatedTimeEnumKeySuffix = "created_time",
}

export enum TypeNamePrefixGetCdeGetParams1ModeEnum2TypeNameSuffix {
  EnumKeyPrefixInvalidKey100644EnumKeySuffix = "100644",
  EnumKeyPrefixInvalidKey100755EnumKeySuffix = "100755",
  EnumKeyPrefixInvalidKey040000EnumKeySuffix = "040000",
  EnumKeyPrefixInvalidKey160000EnumKeySuffix = "160000",
  EnumKeyPrefixInvalidKey120000EnumKeySuffix = "120000",
}

export enum TypeNamePrefixGetCdeGetParams1ModeNumEnum2TypeNameSuffix {
  EnumKeyPrefixInvalidKey100644EnumKeySuffix = 100644,
  EnumKeyPrefixInvalidKey100755EnumKeySuffix = 100755,
  EnumKeyPrefixInvalidKey40000EnumKeySuffix = 40000,
  EnumKeyPrefixInvalidKey160000EnumKeySuffix = 160000,
  EnumKeyPrefixInvalidKey120000EnumKeySuffix = 120000,
}

export enum TypeNamePrefixGetCdeGetParams1TypeEnum2TypeNameSuffix {
  EnumKeyPrefixBlobEnumKeySuffix = "blob",
  EnumKeyPrefixTreeEnumKeySuffix = "tree",
  EnumKeyPrefixCommitEnumKeySuffix = "commit",
}

export enum TypeNamePrefixGetCdeGetParams1BerekeEnum2TypeNameSuffix {
  EnumKeyPrefixBlaEnumKeySuffix = "Bla",
  EnumKeyPrefixBlablaEnumKeySuffix = "Blabla",
  EnumKeyPrefixBoilerEnumKeySuffix = "Boiler",
}

/**
 * Order By
 * @default "created_time"
 */
export enum TypeNamePrefixGetCdeGetParams1OrderByHeaderEnumTypeNameSuffix {
  EnumKeyPrefixCreatedTimeEnumKeySuffix = "created_time",
}

/**
 * Order By
 * @default "created_time"
 */
export enum TypeNamePrefixGetCdeGetParams1EnumTypeNameSuffix {
  EnumKeyPrefixCreatedTimeEnumKeySuffix = "created_time",
}
