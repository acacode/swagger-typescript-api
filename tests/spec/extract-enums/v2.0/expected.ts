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

export interface TypeNamePrefixSuperDuperStructDTOTypeNameSuffix {
  /** @example "100" */
  id: number;
  /** @example "APPROVED" */
  state: TypeNamePrefixSuperDuperStructDtoStateEnumTypeNameSuffix;
}

export type TypeNamePrefixNullableEnumTypeNameSuffix = null;

/** **Required when the state is dismissed.** The reason for dismissing or closing the alert. Can be one of: `false positive`, `won't fix`, and `used in tests`. */
export type TypeNamePrefixCodeScanningAlertDismissedReasonTypeNameSuffix =
  TypeNamePrefixCodeScanningAlertDismissedReasonEnumTypeNameSuffix | null;

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

/** @example "APPROVED" */
export enum TypeNamePrefixSuperDuperStructDtoStateEnumTypeNameSuffix {
  EnumKeyPrefix_NEW_EnumKeySuffix = "NEW",
  EnumKeyPrefix_PENDING_EnumKeySuffix = "PENDING",
}

export enum TypeNamePrefixCodeScanningAlertDismissedReasonEnumTypeNameSuffix {
  EnumKeyPrefixFalsePositiveEnumKeySuffix = "false positive",
  EnumKeyPrefixWontFixEnumKeySuffix = "won't fix",
  EnumKeyPrefixUsedInTestsEnumKeySuffix = "used in tests",
}

/** @example "APPROVED" */
export enum TypeNamePrefixNameSpaceAddSuperDuperEnumTypeNameSuffix {
  EnumKeyPrefix_NEW_EnumKeySuffix = "NEW",
  EnumKeyPrefix_PENDING_EnumKeySuffix = "PENDING",
}

export type TypeNamePrefixNameSpaceAddSuperDuperDataTypeNameSuffix =
  TypeNamePrefixNameSpaceAddSuperDuperEnum1TypeNameSuffix;

/** @example "APPROVED" */
export enum TypeNamePrefixNameSpaceAddSuperDuperEnum1TypeNameSuffix {
  EnumKeyPrefix_NEW_EnumKeySuffix = "NEW",
  EnumKeyPrefix_PENDING_EnumKeySuffix = "PENDING",
}

export interface TypeNamePrefixIssuesDetailParamsTypeNameSuffix {
  /**
   * Issues assigned to you / created by you / mentioning you / you're
   * subscribed to updates for / All issues the authenticated user can see
   * @default "all"
   */
  filter: TypeNamePrefixFilterEnumTypeNameSuffix;
  /** @default "open" */
  state: TypeNamePrefixStateEnumTypeNameSuffix;
  /** @default "created" */
  sort: TypeNamePrefixSortEnumTypeNameSuffix;
  /** @default "desc" */
  direction: TypeNamePrefixDirectionEnumTypeNameSuffix;
  org: string;
}

/**
 * Issues assigned to you / created by you / mentioning you / you're
 * subscribed to updates for / All issues the authenticated user can see
 * @default "all"
 */
export enum TypeNamePrefixFilterEnumTypeNameSuffix {
  EnumKeyPrefixAssignedEnumKeySuffix = "assigned",
  EnumKeyPrefixCreatedEnumKeySuffix = "created",
  EnumKeyPrefixMentionedEnumKeySuffix = "mentioned",
  EnumKeyPrefixSubscribedEnumKeySuffix = "subscribed",
  EnumKeyPrefixAllEnumKeySuffix = "all",
}

/** @default "open" */
export enum TypeNamePrefixStateEnumTypeNameSuffix {
  EnumKeyPrefixOpenEnumKeySuffix = "open",
  EnumKeyPrefixClosedEnumKeySuffix = "closed",
}

/** @default "created" */
export enum TypeNamePrefixSortEnumTypeNameSuffix {
  EnumKeyPrefixCreatedEnumKeySuffix = "created",
  EnumKeyPrefixUpdatedEnumKeySuffix = "updated",
  EnumKeyPrefixCommentsEnumKeySuffix = "comments",
}

/** @default "desc" */
export enum TypeNamePrefixDirectionEnumTypeNameSuffix {
  EnumKeyPrefixAscEnumKeySuffix = "asc",
  EnumKeyPrefixDescEnumKeySuffix = "desc",
}

export type TypeNamePrefixIssuesDetailDataTypeNameSuffix = any;

/**
 * Issues assigned to you / created by you / mentioning you / you're
 * subscribed to updates for / All issues the authenticated user can see
 * @default "all"
 */
export enum TypeNamePrefixIssuesDetailParams1FilterEnumTypeNameSuffix {
  EnumKeyPrefixAssignedEnumKeySuffix = "assigned",
  EnumKeyPrefixCreatedEnumKeySuffix = "created",
  EnumKeyPrefixMentionedEnumKeySuffix = "mentioned",
  EnumKeyPrefixSubscribedEnumKeySuffix = "subscribed",
  EnumKeyPrefixAllEnumKeySuffix = "all",
}

/** @default "open" */
export enum TypeNamePrefixIssuesDetailParams1StateEnumTypeNameSuffix {
  EnumKeyPrefixOpenEnumKeySuffix = "open",
  EnumKeyPrefixClosedEnumKeySuffix = "closed",
}

/** @default "created" */
export enum TypeNamePrefixIssuesDetailParams1SortEnumTypeNameSuffix {
  EnumKeyPrefixCreatedEnumKeySuffix = "created",
  EnumKeyPrefixUpdatedEnumKeySuffix = "updated",
  EnumKeyPrefixCommentsEnumKeySuffix = "comments",
}

/** @default "desc" */
export enum TypeNamePrefixIssuesDetailParams1DirectionEnumTypeNameSuffix {
  EnumKeyPrefixAscEnumKeySuffix = "asc",
  EnumKeyPrefixDescEnumKeySuffix = "desc",
}
