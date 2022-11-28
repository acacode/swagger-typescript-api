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

export enum TNPEnumRootTNS {
  EKPInvalidKey100644EKS = "100644",
  EKPInvalidKey100755EKS = "100755",
  EKPInvalidKey040000EKS = "040000",
  EKPInvalidKey160000EKS = "160000",
  EKPInvalidKey120000EKS = "120000",
  EKPTest1EKS = "test1",
  EKPTest2EKS = "test2",
}

export interface TNPTreeTNS {
  tree?: {
    mode?: TNPTreeModeEnumTNS;
    "mode-num"?: TNPTreeModeNumEnumTNS;
    type?: TNPTreeTypeEnumTNS;
    bereke?: TNPTreeBerekeEnumTNS;
  }[];
}

export enum TNPOnlyEnumNamesTNS {
  EKPBlaEKS = "Bla",
  EKPBlablaEKS = "Blabla",
  EKPBoilerEKS = "Boiler",
}

export enum TNPStringOnlyEnumNamesTNS {
  EKPBlaEKS = "Bla",
  EKPBlablaEKS = "Blabla",
  EKPBoilerEKS = "Boiler",
}

export enum TNPStringEnumsTNS {
  EKPBlaEKS = "foo",
  EKPBlablaEKS = "bar",
  EKPBoilerEKS = "Boiler",
}

export enum TNPStringCompleteEnumsTNS {
  EKPBlaEKS = "foo",
  EKPBlablaEKS = "bar",
  EKPBoilerEKS = "baz",
}

/** @format int32 */
export enum TNPEmptyEnumTNS {
  EKPBlaEKS = "Bla",
  EKPBlablaEKS = "Blabla",
  EKPBoilerEKS = "Boiler",
}

/** @format int32 */
export enum TNPEnumWithMoreNamesTNS {
  EKPBlaEKS = 1,
  EKPBlablaEKS = "Blabla",
  EKPBoilerEKS = "Boiler",
}

/** @format int32 */
export enum TNPSomeInterestEnumTNS {
  EKPBlaEKS = 6,
  EKPBlablaEKS = 2,
  EKPBoilerEKS = 1,
  EKPBbababEKS = 67,
  EKPNowadaysEKS = 88,
  EKP_FAIL_EKS = 122,
  EKPVvvvvEKS = 88,
  EKPASdasASEKS = 0,
  EKPASDsacZXEKS = 213,
  EKPZookEKS = 12378,
  EKPEnumMmEKS = 123125,
  EKPVCsaEKS = 32452,
  EKPYuuuEKS = 1111,
  EKPASdddEKS = 66666,
  EKPASdsdsaEKS = "ASdsdsa",
  EKPASDdsEKS = "ASDds",
  EKP_HSDFDS_EKS = "HSDFDS",
}

export interface TNPSuperDuperStructDTOTNS {
  /** @example "100" */
  id: number;
  /** @example "APPROVED" */
  state: TNPSuperDuperStructDtoStateEnumTNS;
}

export type TNPNullableEnumTNS = null;

/** **Required when the state is dismissed.** The reason for dismissing or closing the alert. Can be one of: `false positive`, `won't fix`, and `used in tests`. */
export type TNPCodeScanningAlertDismissedReasonTNS = TNPCodeScanningAlertDismissedReasonEnumTNS | null;

export enum TNPTreeModeEnumTNS {
  EKPInvalidKey100644EKS = "100644",
  EKPInvalidKey100755EKS = "100755",
  EKPInvalidKey040000EKS = "040000",
  EKPInvalidKey160000EKS = "160000",
  EKPInvalidKey120000EKS = "120000",
}

export enum TNPTreeModeNumEnumTNS {
  EKPInvalidKey100644EKS = 100644,
  EKPInvalidKey100755EKS = 100755,
  EKPInvalidKey40000EKS = 40000,
  EKPInvalidKey160000EKS = 160000,
  EKPInvalidKey120000EKS = 120000,
}

export enum TNPTreeTypeEnumTNS {
  EKPBlobEKS = "blob",
  EKPTreeEKS = "tree",
  EKPCommitEKS = "commit",
}

export enum TNPTreeBerekeEnumTNS {
  EKPBlaEKS = "Bla",
  EKPBlablaEKS = "Blabla",
  EKPBoilerEKS = "Boiler",
}

/** @example "APPROVED" */
export enum TNPSuperDuperStructDtoStateEnumTNS {
  EKP_NEW_EKS = "NEW",
  EKP_PENDING_EKS = "PENDING",
}

export enum TNPCodeScanningAlertDismissedReasonEnumTNS {
  EKPFalsePositiveEKS = "false positive",
  EKPWontFixEKS = "won't fix",
  EKPUsedInTestsEKS = "used in tests",
}

/** @example "APPROVED" */
export enum TNPNameSpaceAddSuperDuperEnumTNS {
  EKP_NEW_EKS = "NEW",
  EKP_PENDING_EKS = "PENDING",
}

/**
 * Issues assigned to you / created by you / mentioning you / you're
 * subscribed to updates for / All issues the authenticated user can see
 * @default "all"
 */
export enum TNPIssuesDetailFilterEnumTNS {
  EKPAssignedEKS = "assigned",
  EKPCreatedEKS = "created",
  EKPMentionedEKS = "mentioned",
  EKPSubscribedEKS = "subscribed",
  EKPAllEKS = "all",
}

/** @default "open" */
export enum TNPIssuesDetailStateEnumTNS {
  EKPOpenEKS = "open",
  EKPClosedEKS = "closed",
}

/** @default "created" */
export enum TNPIssuesDetailSortEnumTNS {
  EKPCreatedEKS = "created",
  EKPUpdatedEKS = "updated",
  EKPCommentsEKS = "comments",
}

/** @default "desc" */
export enum TNPIssuesDetailDirectionEnumTNS {
  EKPAscEKS = "asc",
  EKPDescEKS = "desc",
}
