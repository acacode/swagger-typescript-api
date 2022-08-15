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
 * Simple User
 */
export interface SimpleUser {
  /** @example octocat */
  login: string;

  /** @example 1 */
  id: number;

  /** @example MDQ6VXNlcjE= */
  node_id: string;

  /**
   * @format uri
   * @example https://github.com/images/error/octocat_happy.gif
   */
  avatar_url: string;

  /** @example 41d064eb2195891e12d0413f63227ea7 */
  gravatar_id: string | null;

  /**
   * @format uri
   * @example https://api.github.com/users/octocat
   */
  url: string;

  /**
   * @format uri
   * @example https://github.com/octocat
   */
  html_url: string;

  /**
   * @format uri
   * @example https://api.github.com/users/octocat/followers
   */
  followers_url: string;

  /** @example https://api.github.com/users/octocat/following{/other_user} */
  following_url: string;

  /** @example https://api.github.com/users/octocat/gists{/gist_id} */
  gists_url: string;

  /** @example https://api.github.com/users/octocat/starred{/owner}{/repo} */
  starred_url: string;

  /**
   * @format uri
   * @example https://api.github.com/users/octocat/subscriptions
   */
  subscriptions_url: string;

  /**
   * @format uri
   * @example https://api.github.com/users/octocat/orgs
   */
  organizations_url: string;

  /**
   * @format uri
   * @example https://api.github.com/users/octocat/repos
   */
  repos_url: string;

  /** @example https://api.github.com/users/octocat/events{/privacy} */
  events_url: string;

  /**
   * @format uri
   * @example https://api.github.com/users/octocat/received_events
   */
  received_events_url: string;

  /** @example User */
  type: string;
  site_admin: boolean;

  /** @example "2020-07-09T00:17:55Z" */
  starred_at?: string;
}

/**
 * GitHub apps are a new way to extend GitHub. They can be installed directly on organizations and user accounts and granted access to specific repositories. They come with granular permissions and built-in webhooks. GitHub apps are first class actors within GitHub.
 */
export interface Integration {
  /**
   * Unique identifier of the GitHub app
   * @example 37
   */
  id: number;

  /**
   * The slug name of the GitHub app
   * @example probot-owners
   */
  slug?: string;

  /** @example MDExOkludGVncmF0aW9uMQ== */
  node_id: string;
  owner: SimpleUser | null;

  /**
   * The name of the GitHub app
   * @example Probot Owners
   */
  name: string;

  /** @example The description of the app. */
  description: string | null;

  /**
   * @format uri
   * @example https://example.com
   */
  external_url: string;

  /**
   * @format uri
   * @example https://github.com/apps/super-ci
   */
  html_url: string;

  /**
   * @format date-time
   * @example 2017-07-08T16:18:44-04:00
   */
  created_at: string;

  /**
   * @format date-time
   * @example 2017-07-08T16:18:44-04:00
   */
  updated_at: string;

  /**
   * The set of permissions for the GitHub app
   * @example {"issues":"read","deployments":"write"}
   */
  permissions: { issues?: string; checks?: string; metadata?: string; contents?: string; deployments?: string };

  /**
   * The list of events for the GitHub app
   * @example ["label","deployment"]
   */
  events: string[];

  /**
   * The number of installations associated with the GitHub app
   * @example 5
   */
  installations_count?: number;

  /** @example "Iv1.25b5d1e65ffc4022" */
  client_id?: string;

  /** @example "1d4b2097ac622ba702d19de498f005747a8b21d3" */
  client_secret?: string;

  /** @example "6fba8f2fc8a7e8f2cca5577eddd82ca7586b3b6b" */
  webhook_secret?: string;

  /** @example "-----BEGIN RSA PRIVATE KEY-----\nMIIEogIBAAKCAQEArYxrNYD/iT5CZVpRJu4rBKmmze3PVmT/gCo2ATUvDvZTPTey\nxcGJ3vvrJXazKk06pN05TN29o98jrYz4cengG3YGsXPNEpKsIrEl8NhbnxapEnM9\nJCMRe0P5JcPsfZlX6hmiT7136GRWiGOUba2X9+HKh8QJVLG5rM007TBER9/z9mWm\nrJuNh+m5l320oBQY/Qq3A7wzdEfZw8qm/mIN0FCeoXH1L6B8xXWaAYBwhTEh6SSn\nZHlO1Xu1JWDmAvBCi0RO5aRSKM8q9QEkvvHP4yweAtK3N8+aAbZ7ovaDhyGz8r6r\nzhU1b8Uo0Z2ysf503WqzQgIajr7Fry7/kUwpgQIDAQABAoIBADwJp80Ko1xHPZDy\nfcCKBDfIuPvkmSW6KumbsLMaQv1aGdHDwwTGv3t0ixSay8CGlxMRtRDyZPib6SvQ\n6OH/lpfpbMdW2ErkksgtoIKBVrDilfrcAvrNZu7NxRNbhCSvN8q0s4ICecjbbVQh\nnueSdlA6vGXbW58BHMq68uRbHkP+k+mM9U0mDJ1HMch67wlg5GbayVRt63H7R2+r\nVxcna7B80J/lCEjIYZznawgiTvp3MSanTglqAYi+m1EcSsP14bJIB9vgaxS79kTu\noiSo93leJbBvuGo8QEiUqTwMw4tDksmkLsoqNKQ1q9P7LZ9DGcujtPy4EZsamSJT\ny8OJt0ECgYEA2lxOxJsQk2kI325JgKFjo92mQeUObIvPfSNWUIZQDTjniOI6Gv63\nGLWVFrZcvQBWjMEQraJA9xjPbblV8PtfO87MiJGLWCHFxmPz2dzoedN+2Coxom8m\nV95CLz8QUShuao6u/RYcvUaZEoYs5bHcTmy5sBK80JyEmafJPtCQVxMCgYEAy3ar\nZr3yv4xRPEPMat4rseswmuMooSaK3SKub19WFI5IAtB/e7qR1Rj9JhOGcZz+OQrl\nT78O2OFYlgOIkJPvRMrPpK5V9lslc7tz1FSh3BZMRGq5jSyD7ETSOQ0c8T2O/s7v\nbeEPbVbDe4mwvM24XByH0GnWveVxaDl51ABD65sCgYB3ZAspUkOA5egVCh8kNpnd\nSd6SnuQBE3ySRlT2WEnCwP9Ph6oPgn+oAfiPX4xbRqkL8q/k0BdHQ4h+zNwhk7+h\nWtPYRAP1Xxnc/F+jGjb+DVaIaKGU18MWPg7f+FI6nampl3Q0KvfxwX0GdNhtio8T\nTj1E+SnFwh56SRQuxSh2gwKBgHKjlIO5NtNSflsUYFM+hyQiPiqnHzddfhSG+/3o\nm5nNaSmczJesUYreH5San7/YEy2UxAugvP7aSY2MxB+iGsiJ9WD2kZzTUlDZJ7RV\nUzWsoqBR+eZfVJ2FUWWvy8TpSG6trh4dFxImNtKejCR1TREpSiTV3Zb1dmahK9GV\nrK9NAoGAbBxRLoC01xfxCTgt5BDiBcFVh4fp5yYKwavJPLzHSpuDOrrI9jDn1oKN\nonq5sDU1i391zfQvdrbX4Ova48BN+B7p63FocP/MK5tyyBoT8zQEk2+vWDOw7H/Z\nu5dTCPxTIsoIwUw1I+7yIxqJzLPFgR2gVBwY1ra/8iAqCj+zeBw=\n-----END RSA PRIVATE KEY-----\n" */
  pem?: string;
  [key: string]: any;
}

/**
 * Basic Error
 */
export interface BasicError {
  message?: string;
  documentation_url?: string;
}

/**
 * Validation Error Simple
 */
export interface ValidationErrorSimple {
  message: string;
  documentation_url: string;
  errors?: string[];
}

/**
 * The URL to which the payloads will be delivered.
 * @format uri
 * @example https://example.com/webhook
 */
export type WebhookConfigUrl = string;

/**
 * The media type used to serialize the payloads. Supported values include `json` and `form`. The default is `form`.
 * @example "json"
 */
export type WebhookConfigContentType = string;

/**
 * If provided, the `secret` will be used as the `key` to generate the HMAC hex digest value for [delivery signature headers](https://docs.github.com/webhooks/event-payloads/#delivery-headers).
 * @example "********"
 */
export type WebhookConfigSecret = string;

/**
 * Determines whether the SSL certificate of the host for `url` will be verified when delivering payloads. Supported values include `0` (verification is performed) and `1` (verification is not performed). The default is `0`. **We strongly recommend not setting this to `1` as you are subject to man-in-the-middle and other attacks.**
 * @example "0"
 */
export type WebhookConfigInsecureSsl = string;

/**
 * Configuration object of the webhook
 */
export interface WebhookConfig {
  /** The URL to which the payloads will be delivered. */
  url?: WebhookConfigUrl;

  /** The media type used to serialize the payloads. Supported values include `json` and `form`. The default is `form`. */
  content_type?: WebhookConfigContentType;

  /** If provided, the `secret` will be used as the `key` to generate the HMAC hex digest value for [delivery signature headers](https://docs.github.com/webhooks/event-payloads/#delivery-headers). */
  secret?: WebhookConfigSecret;

  /** Determines whether the SSL certificate of the host for `url` will be verified when delivering payloads. Supported values include `0` (verification is performed) and `1` (verification is not performed). The default is `0`. **We strongly recommend not setting this to `1` as you are subject to man-in-the-middle and other attacks.** */
  insecure_ssl?: WebhookConfigInsecureSsl;
}

/**
 * An enterprise account
 */
export interface Enterprise {
  /** A short description of the enterprise. */
  description?: string | null;

  /**
   * @format uri
   * @example https://github.com/enterprises/octo-business
   */
  html_url: string;

  /**
   * The enterprise's website URL.
   * @format uri
   */
  website_url?: string | null;

  /**
   * Unique identifier of the enterprise
   * @example 42
   */
  id: number;

  /** @example MDEwOlJlcG9zaXRvcnkxMjk2MjY5 */
  node_id: string;

  /**
   * The name of the enterprise.
   * @example Octo Business
   */
  name: string;

  /**
   * The slug url identifier for the enterprise.
   * @example octo-business
   */
  slug: string;

  /**
   * @format date-time
   * @example 2019-01-26T19:01:12Z
   */
  created_at: string | null;

  /**
   * @format date-time
   * @example 2019-01-26T19:14:43Z
   */
  updated_at: string | null;

  /** @format uri */
  avatar_url: string;
}

/**
 * Installation
 */
export interface Installation {
  /**
   * The ID of the installation.
   * @example 1
   */
  id: number;
  account: SimpleUser | Enterprise | (SimpleUser & Enterprise) | null;

  /** Describe whether all repositories have been selected or there's a selection involved */
  repository_selection: "all" | "selected";

  /**
   * @format uri
   * @example https://api.github.com/installations/1/access_tokens
   */
  access_tokens_url: string;

  /**
   * @format uri
   * @example https://api.github.com/installation/repositories
   */
  repositories_url: string;

  /**
   * @format uri
   * @example https://github.com/organizations/github/settings/installations/1
   */
  html_url: string;

  /** @example 1 */
  app_id: number;

  /** The ID of the user or organization this token is being scoped to. */
  target_id: number;

  /** @example Organization */
  target_type: string;

  /** @example {"issues":"read","deployments":"write"} */
  permissions: {
    deployments?: string;
    checks?: string;
    metadata?: string;
    contents?: string;
    pull_requests?: string;
    statuses?: string;
    issues?: string;
    organization_administration?: string;
  };
  events: string[];

  /** @format date-time */
  created_at: string;

  /** @format date-time */
  updated_at: string;

  /** @example config.yaml */
  single_file_name: string | null;

  /** @example true */
  has_multiple_single_files?: boolean;

  /** @example ["config.yml",".github/issue_TEMPLATE.md"] */
  single_file_paths?: string[];

  /** @example github-actions */
  app_slug: string;
  suspended_by?: SimpleUser | null;

  /** @format date-time */
  suspended_at?: string | null;

  /** @example "test_13f1e99741e3e004@d7e1eb0bc0a1ba12.com" */
  contact_email?: string | null;
}

/**
 * The permissions granted to the user-to-server access token.
 * @example {"contents":"read","issues":"read","deployments":"write","single_file":"read"}
 */
export interface AppPermissions {
  /** The level of permission to grant the access token for GitHub Actions workflows, workflow runs, and artifacts. Can be one of: `read` or `write`. */
  actions?: "read" | "write";

  /** The level of permission to grant the access token for repository creation, deletion, settings, teams, and collaborators creation. Can be one of: `read` or `write`. */
  administration?: "read" | "write";

  /** The level of permission to grant the access token for checks on code. Can be one of: `read` or `write`. */
  checks?: "read" | "write";

  /** The level of permission to grant the access token for notification of content references and creation content attachments. Can be one of: `read` or `write`. */
  content_references?: "read" | "write";

  /** The level of permission to grant the access token for repository contents, commits, branches, downloads, releases, and merges. Can be one of: `read` or `write`. */
  contents?: "read" | "write";

  /** The level of permission to grant the access token for deployments and deployment statuses. Can be one of: `read` or `write`. */
  deployments?: "read" | "write";

  /** The level of permission to grant the access token for managing repository environments. Can be one of: `read` or `write`. */
  environments?: "read" | "write";

  /** The level of permission to grant the access token for issues and related comments, assignees, labels, and milestones. Can be one of: `read` or `write`. */
  issues?: "read" | "write";

  /** The level of permission to grant the access token to search repositories, list collaborators, and access repository metadata. Can be one of: `read` or `write`. */
  metadata?: "read" | "write";

  /** The level of permission to grant the access token for packages published to GitHub Packages. Can be one of: `read` or `write`. */
  packages?: "read" | "write";

  /** The level of permission to grant the access token to retrieve Pages statuses, configuration, and builds, as well as create new builds. Can be one of: `read` or `write`. */
  pages?: "read" | "write";

  /** The level of permission to grant the access token for pull requests and related comments, assignees, labels, milestones, and merges. Can be one of: `read` or `write`. */
  pull_requests?: "read" | "write";

  /** The level of permission to grant the access token to manage the post-receive hooks for a repository. Can be one of: `read` or `write`. */
  repository_hooks?: "read" | "write";

  /** The level of permission to grant the access token to manage repository projects, columns, and cards. Can be one of: `read`, `write`, or `admin`. */
  repository_projects?: "read" | "write" | "admin";

  /** The level of permission to grant the access token to view and manage secret scanning alerts. Can be one of: `read` or `write`. */
  secret_scanning_alerts?: "read" | "write";

  /** The level of permission to grant the access token to manage repository secrets. Can be one of: `read` or `write`. */
  secrets?: "read" | "write";

  /** The level of permission to grant the access token to view and manage security events like code scanning alerts. Can be one of: `read` or `write`. */
  security_events?: "read" | "write";

  /** The level of permission to grant the access token to manage just a single file. Can be one of: `read` or `write`. */
  single_file?: "read" | "write";

  /** The level of permission to grant the access token for commit statuses. Can be one of: `read` or `write`. */
  statuses?: "read" | "write";

  /** The level of permission to grant the access token to retrieve Dependabot alerts. Can be one of: `read`. */
  vulnerability_alerts?: "read";

  /** The level of permission to grant the access token to update GitHub Actions workflow files. Can be one of: `write`. */
  workflows?: "write";

  /** The level of permission to grant the access token for organization teams and members. Can be one of: `read` or `write`. */
  members?: "read" | "write";

  /** The level of permission to grant the access token to manage access to an organization. Can be one of: `read` or `write`. */
  organization_administration?: "read" | "write";

  /** The level of permission to grant the access token to manage the post-receive hooks for an organization. Can be one of: `read` or `write`. */
  organization_hooks?: "read" | "write";

  /** The level of permission to grant the access token for viewing an organization's plan. Can be one of: `read`. */
  organization_plan?: "read";

  /** The level of permission to grant the access token to manage organization projects, columns, and cards. Can be one of: `read`, `write`, or `admin`. */
  organization_projects?: "read" | "write" | "admin";

  /** The level of permission to grant the access token to manage organization secrets. Can be one of: `read` or `write`. */
  organization_secrets?: "read" | "write";

  /** The level of permission to grant the access token to view and manage GitHub Actions self-hosted runners available to an organization. Can be one of: `read` or `write`. */
  organization_self_hosted_runners?: "read" | "write";

  /** The level of permission to grant the access token to view and manage users blocked by the organization. Can be one of: `read` or `write`. */
  organization_user_blocking?: "read" | "write";

  /** The level of permission to grant the access token to manage team discussions and related comments. Can be one of: `read` or `write`. */
  team_discussions?: "read" | "write";
}

/**
 * License Simple
 */
export interface LicenseSimple {
  /** @example mit */
  key: string;

  /** @example MIT License */
  name: string;

  /**
   * @format uri
   * @example https://api.github.com/licenses/mit
   */
  url: string | null;

  /** @example MIT */
  spdx_id: string | null;

  /** @example MDc6TGljZW5zZW1pdA== */
  node_id: string;

  /** @format uri */
  html_url?: string;
}

/**
 * A git repository
 */
export interface Repository {
  /**
   * Unique identifier of the repository
   * @example 42
   */
  id: number;

  /** @example MDEwOlJlcG9zaXRvcnkxMjk2MjY5 */
  node_id: string;

  /**
   * The name of the repository.
   * @example Team Environment
   */
  name: string;

  /** @example octocat/Hello-World */
  full_name: string;
  license: LicenseSimple | null;
  forks: number;
  permissions?: { admin: boolean; pull: boolean; triage?: boolean; push: boolean; maintain?: boolean };
  owner: SimpleUser | null;

  /** Whether the repository is private or public. */
  private: boolean;

  /**
   * @format uri
   * @example https://github.com/octocat/Hello-World
   */
  html_url: string;

  /** @example This your first repo! */
  description: string | null;
  fork: boolean;

  /**
   * @format uri
   * @example https://api.github.com/repos/octocat/Hello-World
   */
  url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/{archive_format}{/ref} */
  archive_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/assignees{/user} */
  assignees_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/git/blobs{/sha} */
  blobs_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/branches{/branch} */
  branches_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/collaborators{/collaborator} */
  collaborators_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/comments{/number} */
  comments_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/commits{/sha} */
  commits_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/compare/{base}...{head} */
  compare_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/contents/{+path} */
  contents_url: string;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/contributors
   */
  contributors_url: string;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/deployments
   */
  deployments_url: string;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/downloads
   */
  downloads_url: string;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/events
   */
  events_url: string;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/forks
   */
  forks_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/git/commits{/sha} */
  git_commits_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/git/refs{/sha} */
  git_refs_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/git/tags{/sha} */
  git_tags_url: string;

  /** @example git:github.com/octocat/Hello-World.git */
  git_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/issues/comments{/number} */
  issue_comment_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/issues/events{/number} */
  issue_events_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/issues{/number} */
  issues_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/keys{/key_id} */
  keys_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/labels{/name} */
  labels_url: string;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/languages
   */
  languages_url: string;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/merges
   */
  merges_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/milestones{/number} */
  milestones_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/notifications{?since,all,participating} */
  notifications_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/pulls{/number} */
  pulls_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/releases{/id} */
  releases_url: string;

  /** @example git@github.com:octocat/Hello-World.git */
  ssh_url: string;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/stargazers
   */
  stargazers_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/statuses/{sha} */
  statuses_url: string;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/subscribers
   */
  subscribers_url: string;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/subscription
   */
  subscription_url: string;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/tags
   */
  tags_url: string;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/teams
   */
  teams_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/git/trees{/sha} */
  trees_url: string;

  /** @example https://github.com/octocat/Hello-World.git */
  clone_url: string;

  /**
   * @format uri
   * @example git:git.example.com/octocat/Hello-World
   */
  mirror_url: string | null;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/hooks
   */
  hooks_url: string;

  /**
   * @format uri
   * @example https://svn.github.com/octocat/Hello-World
   */
  svn_url: string;

  /**
   * @format uri
   * @example https://github.com
   */
  homepage: string | null;
  language: string | null;

  /** @example 9 */
  forks_count: number;

  /** @example 80 */
  stargazers_count: number;

  /** @example 80 */
  watchers_count: number;

  /** @example 108 */
  size: number;

  /**
   * The default branch of the repository.
   * @example master
   */
  default_branch: string;

  /** @example 0 */
  open_issues_count: number;

  /**
   * Whether this repository acts as a template that can be used to generate new repositories.
   * @example true
   */
  is_template?: boolean;
  topics?: string[];

  /**
   * Whether issues are enabled.
   * @example true
   */
  has_issues: boolean;

  /**
   * Whether projects are enabled.
   * @example true
   */
  has_projects: boolean;

  /**
   * Whether the wiki is enabled.
   * @example true
   */
  has_wiki: boolean;
  has_pages: boolean;

  /**
   * Whether downloads are enabled.
   * @example true
   */
  has_downloads: boolean;

  /** Whether the repository is archived. */
  archived: boolean;

  /** Returns whether or not this repository disabled. */
  disabled: boolean;

  /** The repository visibility: public, private, or internal. */
  visibility?: string;

  /**
   * @format date-time
   * @example 2011-01-26T19:06:43Z
   */
  pushed_at: string | null;

  /**
   * @format date-time
   * @example 2011-01-26T19:01:12Z
   */
  created_at: string | null;

  /**
   * @format date-time
   * @example 2011-01-26T19:14:43Z
   */
  updated_at: string | null;

  /**
   * Whether to allow rebase merges for pull requests.
   * @example true
   */
  allow_rebase_merge?: boolean;
  template_repository?: {
    id?: number;
    node_id?: string;
    name?: string;
    full_name?: string;
    owner?: {
      login?: string;
      id?: number;
      node_id?: string;
      avatar_url?: string;
      gravatar_id?: string;
      url?: string;
      html_url?: string;
      followers_url?: string;
      following_url?: string;
      gists_url?: string;
      starred_url?: string;
      subscriptions_url?: string;
      organizations_url?: string;
      repos_url?: string;
      events_url?: string;
      received_events_url?: string;
      type?: string;
      site_admin?: boolean;
    };
    private?: boolean;
    html_url?: string;
    description?: string;
    fork?: boolean;
    url?: string;
    archive_url?: string;
    assignees_url?: string;
    blobs_url?: string;
    branches_url?: string;
    collaborators_url?: string;
    comments_url?: string;
    commits_url?: string;
    compare_url?: string;
    contents_url?: string;
    contributors_url?: string;
    deployments_url?: string;
    downloads_url?: string;
    events_url?: string;
    forks_url?: string;
    git_commits_url?: string;
    git_refs_url?: string;
    git_tags_url?: string;
    git_url?: string;
    issue_comment_url?: string;
    issue_events_url?: string;
    issues_url?: string;
    keys_url?: string;
    labels_url?: string;
    languages_url?: string;
    merges_url?: string;
    milestones_url?: string;
    notifications_url?: string;
    pulls_url?: string;
    releases_url?: string;
    ssh_url?: string;
    stargazers_url?: string;
    statuses_url?: string;
    subscribers_url?: string;
    subscription_url?: string;
    tags_url?: string;
    teams_url?: string;
    trees_url?: string;
    clone_url?: string;
    mirror_url?: string;
    hooks_url?: string;
    svn_url?: string;
    homepage?: string;
    language?: string;
    forks_count?: number;
    stargazers_count?: number;
    watchers_count?: number;
    size?: number;
    default_branch?: string;
    open_issues_count?: number;
    is_template?: boolean;
    topics?: string[];
    has_issues?: boolean;
    has_projects?: boolean;
    has_wiki?: boolean;
    has_pages?: boolean;
    has_downloads?: boolean;
    archived?: boolean;
    disabled?: boolean;
    visibility?: string;
    pushed_at?: string;
    created_at?: string;
    updated_at?: string;
    permissions?: { admin?: boolean; push?: boolean; pull?: boolean };
    allow_rebase_merge?: boolean;
    temp_clone_token?: string;
    allow_squash_merge?: boolean;
    delete_branch_on_merge?: boolean;
    allow_merge_commit?: boolean;
    subscribers_count?: number;
    network_count?: number;
  };
  temp_clone_token?: string;

  /**
   * Whether to allow squash merges for pull requests.
   * @example true
   */
  allow_squash_merge?: boolean;

  /**
   * Whether to delete head branches when pull requests are merged
   * @example false
   */
  delete_branch_on_merge?: boolean;

  /**
   * Whether to allow merge commits for pull requests.
   * @example true
   */
  allow_merge_commit?: boolean;
  subscribers_count?: number;
  network_count?: number;
  open_issues: number;
  watchers: number;
  master_branch?: string;

  /** @example "2020-07-09T00:17:42Z" */
  starred_at?: string;
}

/**
 * Authentication token for a GitHub App installed on a user or org.
 */
export interface InstallationToken {
  token: string;
  expires_at: string;
  permissions?: { issues?: string; contents?: string; metadata?: string; single_file?: string };
  repository_selection?: "all" | "selected";
  repositories?: Repository[];

  /** @example README.md */
  single_file?: string;

  /** @example true */
  has_multiple_single_files?: boolean;

  /** @example ["config.yml",".github/issue_TEMPLATE.md"] */
  single_file_paths?: string[];
}

/**
 * Validation Error
 */
export interface ValidationError {
  message: string;
  documentation_url: string;
  errors?: {
    resource?: string;
    field?: string;
    message?: string;
    code: string;
    index?: number;
    value?: string | null | number | null | string[] | null;
  }[];
}

/**
 * The authorization associated with an OAuth Access.
 */
export interface ApplicationGrant {
  /** @example 1 */
  id: number;

  /**
   * @format uri
   * @example https://api.github.com/applications/grants/1
   */
  url: string;
  app: { client_id: string; name: string; url: string };

  /**
   * @format date-time
   * @example 2011-09-06T17:26:27Z
   */
  created_at: string;

  /**
   * @format date-time
   * @example 2011-09-06T20:39:23Z
   */
  updated_at: string;

  /** @example ["public_repo"] */
  scopes: string[];
  user?: SimpleUser | null;
}

export interface ScopedInstallation {
  /** The permissions granted to the user-to-server access token. */
  permissions: AppPermissions;

  /** Describe whether all repositories have been selected or there's a selection involved */
  repository_selection: "all" | "selected";

  /** @example config.yaml */
  single_file_name: string | null;

  /** @example true */
  has_multiple_single_files?: boolean;

  /** @example ["config.yml",".github/issue_TEMPLATE.md"] */
  single_file_paths?: string[];

  /**
   * @format uri
   * @example https://api.github.com/users/octocat/repos
   */
  repositories_url: string;

  /** Simple User */
  account: SimpleUser;
}

/**
 * The authorization for an OAuth app, GitHub App, or a Personal Access Token.
 */
export interface Authorization {
  id: number;

  /** @format uri */
  url: string;

  /** A list of scopes that this authorization is in. */
  scopes: string[] | null;
  token: string;
  token_last_eight: string | null;
  hashed_token: string | null;
  app: { client_id: string; name: string; url: string };
  note: string | null;

  /** @format uri */
  note_url: string | null;

  /** @format date-time */
  updated_at: string;

  /** @format date-time */
  created_at: string;
  fingerprint: string | null;
  user?: SimpleUser | null;
  installation?: ScopedInstallation | null;
}

/**
 * Code Of Conduct
 */
export interface CodeOfConduct {
  /** @example contributor_covenant */
  key: string;

  /** @example Contributor Covenant */
  name: string;

  /**
   * @format uri
   * @example https://api.github.com/codes_of_conduct/contributor_covenant
   */
  url: string;

  /**
   * @example # Contributor Covenant Code of Conduct
   *
   * ## Our Pledge
   * In the interest of fostering an open and welcoming environment, we as contributors and maintainers pledge to making participation in our project and our community a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.
   * ## Our Standards
   * Examples of behavior that contributes to creating a positive environment include:
   * * Using welcoming and inclusive language
   * * Being respectful of differing viewpoints and experiences
   * * Gracefully accepting constructive criticism
   * * Focusing on what is best for the community
   * * Showing empathy towards other community members
   * Examples of unacceptable behavior by participants include:
   * * The use of sexualized language or imagery and unwelcome sexual attention or advances
   * * Trolling, insulting/derogatory comments, and personal or political attacks
   * * Public or private harassment
   * * Publishing others' private information, such as a physical or electronic address, without explicit permission
   * * Other conduct which could reasonably be considered inappropriate in a professional setting
   * ## Our Responsibilities
   * Project maintainers are responsible for clarifying the standards of acceptable behavior and are expected to take appropriate and fair corrective action in response
   *                   to any instances of unacceptable behavior.
   * Project maintainers have the right and responsibility to remove, edit, or reject comments, commits, code, wiki edits, issues, and other contributions that are not aligned to this Code of Conduct, or to ban temporarily or permanently any contributor for other behaviors that they deem inappropriate, threatening, offensive, or harmful.
   * ## Scope
   * This Code of Conduct applies both within project spaces and in public spaces when an individual is representing the project or its community. Examples of representing a project or community include using an official project e-mail address,
   *                   posting via an official social media account, or acting as an appointed representative at an online or offline event. Representation of a project may be further defined and clarified by project maintainers.
   * ## Enforcement
   * Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the project team at [EMAIL]. The project team will review and investigate all complaints, and will respond in a way that it deems appropriate to the circumstances. The project team is obligated to maintain confidentiality with regard to the reporter of an incident. Further details of specific enforcement policies may be posted separately.
   * Project maintainers who do not follow or enforce the Code of Conduct in good faith may face temporary or permanent repercussions as determined by other members of the project's leadership.
   * ## Attribution
   * This Code of Conduct is adapted from the [Contributor Covenant][homepage], version 1.4, available at [http://contributor-covenant.org/version/1/4][version]
   * [homepage]: http://contributor-covenant.org
   * [version]: http://contributor-covenant.org/version/1/4/
   */
  body?: string;

  /** @format uri */
  html_url: string | null;
}

/**
 * Content Reference attachments allow you to provide context around URLs posted in comments
 */
export interface ContentReferenceAttachment {
  /**
   * The ID of the attachment
   * @example 21
   */
  id: number;

  /**
   * The title of the attachment
   * @example Title of the attachment
   */
  title: string;

  /**
   * The body of the attachment
   * @example Body of the attachment
   */
  body: string;

  /**
   * The node_id of the content attachment
   * @example MDE3OkNvbnRlbnRBdHRhY2htZW50MjE=
   */
  node_id?: string;
}

/**
 * The policy that controls the organizations in the enterprise that are allowed to run GitHub Actions. Can be one of: `all`, `none`, or `selected`.
 */
export enum EnabledOrganizations {
  All = "all",
  None = "none",
  Selected = "selected",
}

/**
 * The permissions policy that controls the actions that are allowed to run. Can be one of: `all`, `local_only`, or `selected`.
 */
export enum AllowedActions {
  All = "all",
  LocalOnly = "local_only",
  Selected = "selected",
}

/**
 * The API URL to use to get or set the actions that are allowed to run, when `allowed_actions` is set to `selected`.
 */
export type SelectedActionsUrl = string;

export interface ActionsEnterprisePermissions {
  /** The policy that controls the organizations in the enterprise that are allowed to run GitHub Actions. Can be one of: `all`, `none`, or `selected`. */
  enabled_organizations: EnabledOrganizations;

  /** The API URL to use to get or set the selected organizations that are allowed to run GitHub Actions, when `enabled_organizations` is set to `selected`. */
  selected_organizations_url?: string;

  /** The permissions policy that controls the actions that are allowed to run. Can be one of: `all`, `local_only`, or `selected`. */
  allowed_actions: AllowedActions;

  /** The API URL to use to get or set the actions that are allowed to run, when `allowed_actions` is set to `selected`. */
  selected_actions_url?: SelectedActionsUrl;
}

/**
 * Organization Simple
 */
export interface OrganizationSimple {
  /** @example github */
  login: string;

  /** @example 1 */
  id: number;

  /** @example MDEyOk9yZ2FuaXphdGlvbjE= */
  node_id: string;

  /**
   * @format uri
   * @example https://api.github.com/orgs/github
   */
  url: string;

  /**
   * @format uri
   * @example https://api.github.com/orgs/github/repos
   */
  repos_url: string;

  /**
   * @format uri
   * @example https://api.github.com/orgs/github/events
   */
  events_url: string;

  /** @example https://api.github.com/orgs/github/hooks */
  hooks_url: string;

  /** @example https://api.github.com/orgs/github/issues */
  issues_url: string;

  /** @example https://api.github.com/orgs/github/members{/member} */
  members_url: string;

  /** @example https://api.github.com/orgs/github/public_members{/member} */
  public_members_url: string;

  /** @example https://github.com/images/error/octocat_happy.gif */
  avatar_url: string;

  /** @example A great organization */
  description: string | null;
}

export interface SelectedActions {
  /** Whether GitHub-owned actions are allowed. For example, this includes the actions in the `actions` organization. */
  github_owned_allowed: boolean;

  /** Whether actions in GitHub Marketplace from verified creators are allowed. Set to `true` to allow all GitHub Marketplace actions by verified creators. */
  verified_allowed: boolean;

  /** Specifies a list of string-matching patterns to allow specific action(s). Wildcards, tags, and SHAs are allowed. For example, `monalisa/octocat@*`, `monalisa/octocat@v2`, `monalisa/*`." */
  patterns_allowed: string[];
}

export interface RunnerGroupsEnterprise {
  id: number;
  name: string;
  visibility: string;
  default: boolean;
  selected_organizations_url?: string;
  runners_url: string;
  allows_public_repositories: boolean;
}

/**
 * A self hosted runner
 */
export interface Runner {
  /**
   * The id of the runner.
   * @example 5
   */
  id: number;

  /**
   * The name of the runner.
   * @example iMac
   */
  name: string;

  /**
   * The Operating System of the runner.
   * @example macos
   */
  os: string;

  /**
   * The status of the runner.
   * @example online
   */
  status: string;
  busy: boolean;
  labels: { id?: number; name?: string; type?: "read-only" | "custom" }[];
}

/**
 * Runner Application
 */
export interface RunnerApplication {
  os: string;
  architecture: string;
  download_url: string;
  filename: string;
}

/**
 * Authentication Token
 */
export interface AuthenticationToken {
  /**
   * The token used for authentication
   * @example v1.1f699f1069f60xxx
   */
  token: string;

  /**
   * The time this token expires
   * @format date-time
   * @example 2016-07-11T22:14:10Z
   */
  expires_at: string;

  /** @example {"issues":"read","deployments":"write"} */
  permissions?: object;

  /** The repositories this token has access to */
  repositories?: Repository[];

  /** @example config.yaml */
  single_file?: string | null;

  /** Describe whether all repositories have been selected or there's a selection involved */
  repository_selection?: "all" | "selected";
}

export interface AuditLogEvent {
  /** The time the audit log event occurred, given as a [Unix timestamp](http://en.wikipedia.org/wiki/Unix_time). */
  "@timestamp"?: number;

  /** The name of the action that was performed, for example `user.login` or `repo.create`. */
  action?: string;
  active?: boolean;
  active_was?: boolean;

  /** The actor who performed the action. */
  actor?: string;

  /** The username of the account being blocked. */
  blocked_user?: string;
  business?: string;
  config?: any[];
  config_was?: any[];
  content_type?: string;

  /** The time the audit log event was recorded, given as a [Unix timestamp](http://en.wikipedia.org/wiki/Unix_time). */
  created_at?: number;
  deploy_key_fingerprint?: string;
  emoji?: string;
  events?: any[];
  events_were?: any[];
  explanation?: string;
  fingerprint?: string;
  hook_id?: number;
  limited_availability?: boolean;
  message?: string;
  name?: string;
  old_user?: string;
  openssh_public_key?: string;
  org?: string;
  previous_visibility?: string;
  read_only?: boolean;

  /** The name of the repository. */
  repo?: string;

  /** The name of the repository. */
  repository?: string;
  repository_public?: boolean;
  target_login?: string;
  team?: string;

  /** The type of protocol (for example, HTTP or SSH) used to transfer Git data. */
  transport_protocol?: number;

  /** A human readable name for the protocol (for example, HTTP or SSH) used to transfer Git data. */
  transport_protocol_name?: string;

  /** The user that was affected by the action performed (if available). */
  user?: string;

  /** The repository visibility, for example `public` or `private`. */
  visibility?: string;
}

export interface ActionsBillingUsage {
  /** The sum of the free and paid GitHub Actions minutes used. */
  total_minutes_used: number;

  /** The total paid GitHub Actions minutes used. */
  total_paid_minutes_used: number;

  /** The amount of free GitHub Actions minutes available. */
  included_minutes: number;
  minutes_used_breakdown: { UBUNTU?: number; MACOS?: number; WINDOWS?: number };
}

export interface PackagesBillingUsage {
  /** Sum of the free and paid storage space (GB) for GitHuub Packages. */
  total_gigabytes_bandwidth_used: number;

  /** Total paid storage space (GB) for GitHuub Packages. */
  total_paid_gigabytes_bandwidth_used: number;

  /** Free storage space (GB) for GitHub Packages. */
  included_gigabytes_bandwidth: number;
}

export interface CombinedBillingUsage {
  /** Numbers of days left in billing cycle. */
  days_left_in_billing_cycle: number;

  /** Estimated storage space (GB) used in billing cycle. */
  estimated_paid_storage_for_month: number;

  /** Estimated sum of free and paid storage space (GB) used in billing cycle. */
  estimated_storage_for_month: number;
}

/**
 * Actor
 */
export interface Actor {
  id: number;
  login: string;
  display_login?: string;
  gravatar_id: string | null;

  /** @format uri */
  url: string;

  /** @format uri */
  avatar_url: string;
}

/**
 * Color-coded labels help you categorize and filter your issues (just like labels in Gmail).
 */
export interface Label {
  /** @example 208045946 */
  id: number;

  /** @example MDU6TGFiZWwyMDgwNDU5NDY= */
  node_id: string;

  /**
   * URL for the label
   * @format uri
   * @example https://api.github.com/repositories/42/labels/bug
   */
  url: string;

  /**
   * The name of the label.
   * @example bug
   */
  name: string;

  /** @example Something isn't working */
  description: string | null;

  /**
   * 6-character hex code, without the leading #, identifying the color
   * @example FFFFFF
   */
  color: string;

  /** @example true */
  default: boolean;
}

/**
 * A collection of related issues and pull requests.
 */
export interface Milestone {
  /**
   * @format uri
   * @example https://api.github.com/repos/octocat/Hello-World/milestones/1
   */
  url: string;

  /**
   * @format uri
   * @example https://github.com/octocat/Hello-World/milestones/v1.0
   */
  html_url: string;

  /**
   * @format uri
   * @example https://api.github.com/repos/octocat/Hello-World/milestones/1/labels
   */
  labels_url: string;

  /** @example 1002604 */
  id: number;

  /** @example MDk6TWlsZXN0b25lMTAwMjYwNA== */
  node_id: string;

  /**
   * The number of the milestone.
   * @example 42
   */
  number: number;

  /**
   * The state of the milestone.
   * @example open
   */
  state: "open" | "closed";

  /**
   * The title of the milestone.
   * @example v1.0
   */
  title: string;

  /** @example Tracking milestone for version 1.0 */
  description: string | null;
  creator: SimpleUser | null;

  /** @example 4 */
  open_issues: number;

  /** @example 8 */
  closed_issues: number;

  /**
   * @format date-time
   * @example 2011-04-10T20:09:31Z
   */
  created_at: string;

  /**
   * @format date-time
   * @example 2014-03-03T18:58:10Z
   */
  updated_at: string;

  /**
   * @format date-time
   * @example 2013-02-12T13:22:01Z
   */
  closed_at: string | null;

  /**
   * @format date-time
   * @example 2012-10-09T23:39:01Z
   */
  due_on: string | null;
}

/**
 * How the author is associated with the repository.
 * @example OWNER
 */
export enum AuthorAssociation {
  COLLABORATOR = "COLLABORATOR",
  CONTRIBUTOR = "CONTRIBUTOR",
  FIRST_TIMER = "FIRST_TIMER",
  FIRST_TIME_CONTRIBUTOR = "FIRST_TIME_CONTRIBUTOR",
  MANNEQUIN = "MANNEQUIN",
  MEMBER = "MEMBER",
  NONE = "NONE",
  OWNER = "OWNER",
}

/**
 * Issue Simple
 */
export interface IssueSimple {
  /** @example 1 */
  id: number;

  /** @example MDU6SXNzdWUx */
  node_id: string;

  /**
   * @format uri
   * @example https://api.github.com/repos/octocat/Hello-World/issues/1347
   */
  url: string;

  /**
   * @format uri
   * @example https://api.github.com/repos/octocat/Hello-World
   */
  repository_url: string;

  /** @example https://api.github.com/repos/octocat/Hello-World/issues/1347/labels{/name} */
  labels_url: string;

  /**
   * @format uri
   * @example https://api.github.com/repos/octocat/Hello-World/issues/1347/comments
   */
  comments_url: string;

  /**
   * @format uri
   * @example https://api.github.com/repos/octocat/Hello-World/issues/1347/events
   */
  events_url: string;

  /**
   * @format uri
   * @example https://github.com/octocat/Hello-World/issues/1347
   */
  html_url: string;

  /** @example 1347 */
  number: number;

  /** @example open */
  state: string;

  /** @example Found a bug */
  title: string;

  /** @example I'm having a problem with this. */
  body?: string;
  user: SimpleUser | null;
  labels: Label[];
  assignee: SimpleUser | null;
  assignees?: SimpleUser[] | null;
  milestone: Milestone | null;

  /** @example true */
  locked: boolean;

  /** @example too heated */
  active_lock_reason?: string | null;

  /** @example 0 */
  comments: number;
  pull_request?: {
    merged_at?: string | null;
    diff_url: string | null;
    html_url: string | null;
    patch_url: string | null;
    url: string | null;
  };

  /** @format date-time */
  closed_at: string | null;

  /**
   * @format date-time
   * @example 2011-04-22T13:33:48Z
   */
  created_at: string;

  /**
   * @format date-time
   * @example 2011-04-22T13:33:48Z
   */
  updated_at: string;

  /** How the author is associated with the repository. */
  author_association: AuthorAssociation;
  body_html?: string;
  body_text?: string;

  /** @format uri */
  timeline_url?: string;

  /** A git repository */
  repository?: Repository;
  performed_via_github_app?: Integration | null;
}

export interface ReactionRollup {
  /** @format uri */
  url: string;
  total_count: number;
  "+1": number;
  "-1": number;
  laugh: number;
  confused: number;
  heart: number;
  hooray: number;
  eyes: number;
  rocket: number;
}

/**
 * Comments provide a way for people to collaborate on an issue.
 */
export interface IssueComment {
  /**
   * Unique identifier of the issue comment
   * @example 42
   */
  id: number;
  node_id: string;

  /**
   * URL for the issue comment
   * @format uri
   * @example https://api.github.com/repositories/42/issues/comments/1
   */
  url: string;

  /**
   * Contents of the issue comment
   * @example What version of Safari were you using when you observed this bug?
   */
  body?: string;
  body_text?: string;
  body_html?: string;

  /** @format uri */
  html_url: string;
  user: SimpleUser | null;

  /**
   * @format date-time
   * @example 2011-04-14T16:00:49Z
   */
  created_at: string;

  /**
   * @format date-time
   * @example 2011-04-14T16:00:49Z
   */
  updated_at: string;

  /** @format uri */
  issue_url: string;

  /** How the author is associated with the repository. */
  author_association: AuthorAssociation;
  performed_via_github_app?: Integration | null;
  reactions?: ReactionRollup;
}

/**
 * Event
 */
export interface Event {
  id: string;
  type: string | null;

  /** Actor */
  actor: Actor;
  repo: { id: number; name: string; url: string };

  /** Actor */
  org?: Actor;
  payload: {
    action: string;
    issue?: IssueSimple;
    comment?: IssueComment;
    pages?: {
      page_name?: string;
      title?: string;
      summary?: string | null;
      action?: string;
      sha?: string;
      html_url?: string;
    }[];
  };
  public: boolean;

  /** @format date-time */
  created_at: string | null;
}

/**
 * Hypermedia Link with Type
 */
export interface LinkWithType {
  href: string;
  type: string;
}

/**
 * Feed
 */
export interface Feed {
  /** @example https://github.com/timeline */
  timeline_url: string;

  /** @example https://github.com/{user} */
  user_url: string;

  /** @example https://github.com/octocat */
  current_user_public_url?: string;

  /** @example https://github.com/octocat.private?token=abc123 */
  current_user_url?: string;

  /** @example https://github.com/octocat.private.actor?token=abc123 */
  current_user_actor_url?: string;

  /** @example https://github.com/octocat-org */
  current_user_organization_url?: string;

  /** @example ["https://github.com/organizations/github/octocat.private.atom?token=abc123"] */
  current_user_organization_urls?: string[];

  /** @example https://github.com/security-advisories */
  security_advisories_url?: string;
  _links: {
    timeline: LinkWithType;
    user: LinkWithType;
    security_advisories?: LinkWithType;
    current_user?: LinkWithType;
    current_user_public?: LinkWithType;
    current_user_actor?: LinkWithType;
    current_user_organization?: LinkWithType;
    current_user_organizations?: LinkWithType[];
  };
}

/**
 * Base Gist
 */
export interface BaseGist {
  /** @format uri */
  url: string;

  /** @format uri */
  forks_url: string;

  /** @format uri */
  commits_url: string;
  id: string;
  node_id: string;

  /** @format uri */
  git_pull_url: string;

  /** @format uri */
  git_push_url: string;

  /** @format uri */
  html_url: string;
  files: Record<string, { filename?: string; type?: string; language?: string; raw_url?: string; size?: number }>;
  public: boolean;

  /** @format date-time */
  created_at: string;

  /** @format date-time */
  updated_at: string;
  description: string | null;
  comments: number;
  user: SimpleUser | null;

  /** @format uri */
  comments_url: string;
  owner?: SimpleUser | null;
  truncated?: boolean;
  forks?: any[];
  history?: any[];
}

/**
 * Gist Simple
 */
export interface GistSimple {
  url?: string;
  forks_url?: string;
  commits_url?: string;
  id?: string;
  node_id?: string;
  git_pull_url?: string;
  git_push_url?: string;
  html_url?: string;
  files?: Record<
    string,
    {
      filename?: string;
      type?: string;
      language?: string;
      raw_url?: string;
      size?: number;
      truncated?: boolean;
      content?: string;
    }
  >;
  public?: boolean;
  created_at?: string;
  updated_at?: string;
  description?: string | null;
  comments?: number;
  user?: string | null;
  comments_url?: string;

  /** Simple User */
  owner?: SimpleUser;
  truncated?: boolean;
}

/**
 * A comment made to a gist.
 */
export interface GistComment {
  /** @example 1 */
  id: number;

  /** @example MDExOkdpc3RDb21tZW50MQ== */
  node_id: string;

  /**
   * @format uri
   * @example https://api.github.com/gists/a6db0bec360bb87e9418/comments/1
   */
  url: string;

  /**
   * The comment text.
   * @example Body of the attachment
   */
  body: string;
  user: SimpleUser | null;

  /**
   * @format date-time
   * @example 2011-04-18T23:23:56Z
   */
  created_at: string;

  /**
   * @format date-time
   * @example 2011-04-18T23:23:56Z
   */
  updated_at: string;

  /** How the author is associated with the repository. */
  author_association: AuthorAssociation;
}

/**
 * Gist Commit
 */
export interface GistCommit {
  /**
   * @format uri
   * @example https://api.github.com/gists/aa5a315d61ae9438b18d/57a7f021a713b1c5a6a199b54cc514735d2d462f
   */
  url: string;

  /** @example 57a7f021a713b1c5a6a199b54cc514735d2d462f */
  version: string;
  user: SimpleUser | null;
  change_status: { total?: number; additions?: number; deletions?: number };

  /**
   * @format date-time
   * @example 2010-04-14T02:15:15Z
   */
  committed_at: string;
}

/**
 * Gitignore Template
 */
export interface GitignoreTemplate {
  /** @example C */
  name: string;

  /**
   * @example # Object files
   * *.o
   *
   * # Libraries
   * *.lib
   * *.a
   * # Shared objects (inc. Windows DLLs)
   * *.dll
   * *.so
   * *.so.*
   * *.dylib
   * # Executables
   * *.exe
   * *.out
   * *.app
   */
  source: string;
}

/**
 * Issues are a great way to keep track of tasks, enhancements, and bugs for your projects.
 */
export interface Issue {
  id: number;
  node_id: string;

  /**
   * URL for the issue
   * @format uri
   * @example https://api.github.com/repositories/42/issues/1
   */
  url: string;

  /** @format uri */
  repository_url: string;
  labels_url: string;

  /** @format uri */
  comments_url: string;

  /** @format uri */
  events_url: string;

  /** @format uri */
  html_url: string;

  /**
   * Number uniquely identifying the issue within its repository
   * @example 42
   */
  number: number;

  /**
   * State of the issue; either 'open' or 'closed'
   * @example open
   */
  state: string;

  /**
   * Title of the issue
   * @example Widget creation fails in Safari on OS X 10.8
   */
  title: string;

  /**
   * Contents of the issue
   * @example It looks like the new widget form is broken on Safari. When I try and create the widget, Safari crashes. This is reproducible on 10.8, but not 10.9. Maybe a browser bug?
   */
  body?: string;
  user: SimpleUser | null;

  /**
   * Labels to associate with this issue; pass one or more label names to replace the set of labels on this issue; send an empty array to clear all labels from the issue; note that the labels are silently dropped for users without push access to the repository
   * @example ["bug","registration"]
   */
  labels: (
    | string
    | {
        id?: number;
        node_id?: string;
        url?: string;
        name?: string;
        description?: string | null;
        color?: string | null;
        default?: boolean;
      }
  )[];
  assignee: SimpleUser | null;
  assignees?: SimpleUser[] | null;
  milestone: Milestone | null;
  locked: boolean;
  active_lock_reason?: string | null;
  comments: number;
  pull_request?: {
    merged_at?: string | null;
    diff_url: string | null;
    html_url: string | null;
    patch_url: string | null;
    url: string | null;
  };

  /** @format date-time */
  closed_at: string | null;

  /** @format date-time */
  created_at: string;

  /** @format date-time */
  updated_at: string;
  closed_by?: SimpleUser | null;
  body_html?: string;
  body_text?: string;

  /** @format uri */
  timeline_url?: string;

  /** A git repository */
  repository?: Repository;
  performed_via_github_app?: Integration | null;

  /** How the author is associated with the repository. */
  author_association: AuthorAssociation;
  reactions?: ReactionRollup;
}

/**
 * License
 */
export interface License {
  /** @example mit */
  key: string;

  /** @example MIT License */
  name: string;

  /** @example MIT */
  spdx_id: string | null;

  /**
   * @format uri
   * @example https://api.github.com/licenses/mit
   */
  url: string | null;

  /** @example MDc6TGljZW5zZW1pdA== */
  node_id: string;

  /**
   * @format uri
   * @example http://choosealicense.com/licenses/mit/
   */
  html_url: string;

  /** @example A permissive license that is short and to the point. It lets people do anything with your code with proper attribution and without warranty. */
  description: string;

  /** @example Create a text file (typically named LICENSE or LICENSE.txt) in the root of your source code and copy the text of the license into the file. Replace [year] with the current year and [fullname] with the name (or names) of the copyright holders. */
  implementation: string;

  /** @example ["commercial-use","modifications","distribution","sublicense","private-use"] */
  permissions: string[];

  /** @example ["include-copyright"] */
  conditions: string[];

  /** @example ["no-liability"] */
  limitations: string[];

  /**
   * @example
   *
   * The MIT License (MIT)
   * Copyright (c) [year] [fullname]
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */
  body: string;

  /** @example true */
  featured: boolean;
}

/**
 * Marketplace Listing Plan
 */
export interface MarketplaceListingPlan {
  /**
   * @format uri
   * @example https://api.github.com/marketplace_listing/plans/1313
   */
  url: string;

  /**
   * @format uri
   * @example https://api.github.com/marketplace_listing/plans/1313/accounts
   */
  accounts_url: string;

  /** @example 1313 */
  id: number;

  /** @example 3 */
  number: number;

  /** @example Pro */
  name: string;

  /** @example A professional-grade CI solution */
  description: string;

  /** @example 1099 */
  monthly_price_in_cents: number;

  /** @example 11870 */
  yearly_price_in_cents: number;

  /** @example flat-rate */
  price_model: string;

  /** @example true */
  has_free_trial: boolean;
  unit_name: string | null;

  /** @example published */
  state: string;

  /** @example ["Up to 25 private repositories","11 concurrent builds"] */
  bullets: string[];
}

/**
 * Marketplace Purchase
 */
export interface MarketplacePurchase {
  url: string;
  type: string;
  id: number;
  login: string;
  organization_billing_email?: string;
  marketplace_pending_change?: {
    is_installed?: boolean;
    effective_date?: string;
    unit_count?: number | null;
    id?: number;
    plan?: MarketplaceListingPlan;
  };
  marketplace_purchase: {
    billing_cycle?: string;
    next_billing_date?: string | null;
    is_installed?: boolean;
    unit_count?: number | null;
    on_free_trial?: boolean;
    free_trial_ends_on?: string | null;
    updated_at?: string;
    plan?: MarketplaceListingPlan;
  };
}

/**
 * Api Overview
 */
export interface ApiOverview {
  /** @example true */
  verifiable_password_authentication: boolean;
  ssh_key_fingerprints?: { SHA256_RSA?: string; SHA256_DSA?: string };

  /** @example ["127.0.0.1/32"] */
  hooks?: string[];

  /** @example ["127.0.0.1/32"] */
  web?: string[];

  /** @example ["127.0.0.1/32"] */
  api?: string[];

  /** @example ["127.0.0.1/32"] */
  git?: string[];

  /** @example ["192.30.252.153/32","192.30.252.154/32"] */
  pages?: string[];

  /** @example ["54.158.161.132","54.226.70.38"] */
  importer?: string[];

  /** @example ["13.64.0.0/16","13.65.0.0/16"] */
  actions?: string[];
}

/**
 * Minimal Repository
 */
export interface MinimalRepository {
  /** @example 1296269 */
  id: number;

  /** @example MDEwOlJlcG9zaXRvcnkxMjk2MjY5 */
  node_id: string;

  /** @example Hello-World */
  name: string;

  /** @example octocat/Hello-World */
  full_name: string;
  owner: SimpleUser | null;
  private: boolean;

  /**
   * @format uri
   * @example https://github.com/octocat/Hello-World
   */
  html_url: string;

  /** @example This your first repo! */
  description: string | null;
  fork: boolean;

  /**
   * @format uri
   * @example https://api.github.com/repos/octocat/Hello-World
   */
  url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/{archive_format}{/ref} */
  archive_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/assignees{/user} */
  assignees_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/git/blobs{/sha} */
  blobs_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/branches{/branch} */
  branches_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/collaborators{/collaborator} */
  collaborators_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/comments{/number} */
  comments_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/commits{/sha} */
  commits_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/compare/{base}...{head} */
  compare_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/contents/{+path} */
  contents_url: string;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/contributors
   */
  contributors_url: string;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/deployments
   */
  deployments_url: string;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/downloads
   */
  downloads_url: string;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/events
   */
  events_url: string;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/forks
   */
  forks_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/git/commits{/sha} */
  git_commits_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/git/refs{/sha} */
  git_refs_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/git/tags{/sha} */
  git_tags_url: string;
  git_url?: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/issues/comments{/number} */
  issue_comment_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/issues/events{/number} */
  issue_events_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/issues{/number} */
  issues_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/keys{/key_id} */
  keys_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/labels{/name} */
  labels_url: string;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/languages
   */
  languages_url: string;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/merges
   */
  merges_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/milestones{/number} */
  milestones_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/notifications{?since,all,participating} */
  notifications_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/pulls{/number} */
  pulls_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/releases{/id} */
  releases_url: string;
  ssh_url?: string;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/stargazers
   */
  stargazers_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/statuses/{sha} */
  statuses_url: string;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/subscribers
   */
  subscribers_url: string;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/subscription
   */
  subscription_url: string;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/tags
   */
  tags_url: string;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/teams
   */
  teams_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/git/trees{/sha} */
  trees_url: string;
  clone_url?: string;
  mirror_url?: string | null;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/hooks
   */
  hooks_url: string;
  svn_url?: string;
  homepage?: string | null;
  language?: string | null;
  forks_count?: number;
  stargazers_count?: number;
  watchers_count?: number;
  size?: number;
  default_branch?: string;
  open_issues_count?: number;
  is_template?: boolean;
  topics?: string[];
  has_issues?: boolean;
  has_projects?: boolean;
  has_wiki?: boolean;
  has_pages?: boolean;
  has_downloads?: boolean;
  archived?: boolean;
  disabled?: boolean;
  visibility?: string;

  /**
   * @format date-time
   * @example 2011-01-26T19:06:43Z
   */
  pushed_at?: string | null;

  /**
   * @format date-time
   * @example 2011-01-26T19:01:12Z
   */
  created_at?: string | null;

  /**
   * @format date-time
   * @example 2011-01-26T19:14:43Z
   */
  updated_at?: string | null;
  permissions?: { admin?: boolean; push?: boolean; pull?: boolean };
  template_repository?: Repository | null;
  temp_clone_token?: string;
  delete_branch_on_merge?: boolean;
  subscribers_count?: number;
  network_count?: number;
  license?: { key?: string; name?: string; spdx_id?: string; url?: string; node_id?: string };

  /** @example 0 */
  forks?: number;

  /** @example 0 */
  open_issues?: number;

  /** @example 0 */
  watchers?: number;
}

/**
 * Thread
 */
export interface Thread {
  id: string;

  /** Minimal Repository */
  repository: MinimalRepository;
  subject: { title: string; url: string; latest_comment_url: string; type: string };
  reason: string;
  unread: boolean;
  updated_at: string;
  last_read_at: string | null;
  url: string;

  /** @example https://api.github.com/notifications/threads/2/subscription */
  subscription_url: string;
}

/**
 * Thread Subscription
 */
export interface ThreadSubscription {
  /** @example true */
  subscribed: boolean;
  ignored: boolean;
  reason: string | null;

  /**
   * @format date-time
   * @example 2012-10-06T21:34:12Z
   */
  created_at: string | null;

  /**
   * @format uri
   * @example https://api.github.com/notifications/threads/1/subscription
   */
  url: string;

  /**
   * @format uri
   * @example https://api.github.com/notifications/threads/1
   */
  thread_url?: string;

  /**
   * @format uri
   * @example https://api.github.com/repos/1
   */
  repository_url?: string;
}

/**
 * Organization Full
 */
export interface OrganizationFull {
  /** @example github */
  login: string;

  /** @example 1 */
  id: number;

  /** @example MDEyOk9yZ2FuaXphdGlvbjE= */
  node_id: string;

  /**
   * @format uri
   * @example https://api.github.com/orgs/github
   */
  url: string;

  /**
   * @format uri
   * @example https://api.github.com/orgs/github/repos
   */
  repos_url: string;

  /**
   * @format uri
   * @example https://api.github.com/orgs/github/events
   */
  events_url: string;

  /** @example https://api.github.com/orgs/github/hooks */
  hooks_url: string;

  /** @example https://api.github.com/orgs/github/issues */
  issues_url: string;

  /** @example https://api.github.com/orgs/github/members{/member} */
  members_url: string;

  /** @example https://api.github.com/orgs/github/public_members{/member} */
  public_members_url: string;

  /** @example https://github.com/images/error/octocat_happy.gif */
  avatar_url: string;

  /** @example A great organization */
  description: string | null;

  /** @example github */
  name?: string;

  /** @example GitHub */
  company?: string;

  /**
   * @format uri
   * @example https://github.com/blog
   */
  blog?: string;

  /** @example San Francisco */
  location?: string;

  /**
   * @format email
   * @example octocat@github.com
   */
  email?: string;

  /** @example github */
  twitter_username?: string | null;

  /** @example true */
  is_verified?: boolean;

  /** @example true */
  has_organization_projects: boolean;

  /** @example true */
  has_repository_projects: boolean;

  /** @example 2 */
  public_repos: number;

  /** @example 1 */
  public_gists: number;

  /** @example 20 */
  followers: number;

  /** @example 0 */
  following: number;

  /**
   * @format uri
   * @example https://github.com/octocat
   */
  html_url: string;

  /**
   * @format date-time
   * @example 2008-01-14T04:33:35Z
   */
  created_at: string;

  /** @example Organization */
  type: string;

  /** @example 100 */
  total_private_repos?: number;

  /** @example 100 */
  owned_private_repos?: number;

  /** @example 81 */
  private_gists?: number | null;

  /** @example 10000 */
  disk_usage?: number | null;

  /** @example 8 */
  collaborators?: number | null;

  /**
   * @format email
   * @example org@example.com
   */
  billing_email?: string | null;
  plan?: { name: string; space: number; private_repos: number; filled_seats?: number; seats?: number };
  default_repository_permission?: string | null;

  /** @example true */
  members_can_create_repositories?: boolean | null;

  /** @example true */
  two_factor_requirement_enabled?: boolean | null;

  /** @example all */
  members_allowed_repository_creation_type?: string;

  /** @example true */
  members_can_create_public_repositories?: boolean;

  /** @example true */
  members_can_create_private_repositories?: boolean;

  /** @example true */
  members_can_create_internal_repositories?: boolean;

  /** @example true */
  members_can_create_pages?: boolean;

  /** @format date-time */
  updated_at: string;
}

/**
 * The policy that controls the repositories in the organization that are allowed to run GitHub Actions. Can be one of: `all`, `none`, or `selected`.
 */
export enum EnabledRepositories {
  All = "all",
  None = "none",
  Selected = "selected",
}

export interface ActionsOrganizationPermissions {
  /** The policy that controls the repositories in the organization that are allowed to run GitHub Actions. Can be one of: `all`, `none`, or `selected`. */
  enabled_repositories: EnabledRepositories;

  /** The API URL to use to get or set the selected repositories that are allowed to run GitHub Actions, when `enabled_repositories` is set to `selected`. */
  selected_repositories_url?: string;

  /** The permissions policy that controls the actions that are allowed to run. Can be one of: `all`, `local_only`, or `selected`. */
  allowed_actions: AllowedActions;

  /** The API URL to use to get or set the actions that are allowed to run, when `allowed_actions` is set to `selected`. */
  selected_actions_url?: SelectedActionsUrl;
}

export interface RunnerGroupsOrg {
  id: number;
  name: string;
  visibility: string;
  default: boolean;

  /** Link to the selected repositories resource for this runner group. Not present unless visibility was set to `selected` */
  selected_repositories_url?: string;
  runners_url: string;
  inherited: boolean;
  inherited_allows_public_repositories?: boolean;
  allows_public_repositories: boolean;
}

/**
 * Secrets for GitHub Actions for an organization.
 */
export interface OrganizationActionsSecret {
  /**
   * The name of the secret.
   * @example SECRET_TOKEN
   */
  name: string;

  /** @format date-time */
  created_at: string;

  /** @format date-time */
  updated_at: string;

  /** Visibility of a secret */
  visibility: "all" | "private" | "selected";

  /**
   * @format uri
   * @example https://api.github.com/organizations/org/secrets/my_secret/repositories
   */
  selected_repositories_url?: string;
}

/**
 * The public key used for setting Actions Secrets.
 */
export interface ActionsPublicKey {
  /**
   * The identifier for the key.
   * @example 1234567
   */
  key_id: string;

  /**
   * The Base64 encoded public key.
   * @example hBT5WZEj8ZoOv6TYJsfWq7MxTEQopZO5/IT3ZCVQPzs=
   */
  key: string;

  /** @example 2 */
  id?: number;

  /** @example https://api.github.com/user/keys/2 */
  url?: string;

  /** @example ssh-rsa AAAAB3NzaC1yc2EAAA */
  title?: string;

  /** @example 2011-01-26T19:01:12Z */
  created_at?: string;
}

/**
 * Credential Authorization
 */
export interface CredentialAuthorization {
  /**
   * User login that owns the underlying credential.
   * @example monalisa
   */
  login: string;

  /**
   * Unique identifier for the credential.
   * @example 1
   */
  credential_id: number;

  /**
   * Human-readable description of the credential type.
   * @example SSH Key
   */
  credential_type: string;

  /**
   * Last eight characters of the credential. Only included in responses with credential_type of personal access token.
   * @example 12345678
   */
  token_last_eight?: string;

  /**
   * Date when the credential was authorized for use.
   * @format date-time
   * @example 2011-01-26T19:06:43Z
   */
  credential_authorized_at: string;

  /**
   * List of oauth scopes the token has been granted.
   * @example ["user","repo"]
   */
  scopes?: string[];

  /**
   * Unique string to distinguish the credential. Only included in responses with credential_type of SSH Key.
   * @example jklmnop12345678
   */
  fingerprint?: string;

  /**
   * Date when the credential was last accessed. May be null if it was never accessed
   * @format date-time
   * @example 2011-01-26T19:06:43Z
   */
  credential_accessed_at?: string | null;

  /** @example 12345678 */
  authorized_credential_id?: number | null;

  /**
   * The title given to the ssh key. This will only be present when the credential is an ssh key.
   * @example my ssh key
   */
  authorized_credential_title?: string | null;

  /**
   * The note given to the token. This will only be present when the credential is a token.
   * @example my token
   */
  authorized_credential_note?: string | null;
}

/**
 * Organization Invitation
 */
export interface OrganizationInvitation {
  id: number;
  login: string | null;
  email: string | null;
  role: string;
  created_at: string;
  failed_at?: string;
  failed_reason?: string;

  /** Simple User */
  inviter: SimpleUser;
  team_count: number;
  invitation_team_url: string;

  /** @example "MDIyOk9yZ2FuaXphdGlvbkludml0YXRpb24x" */
  node_id: string;

  /** @example "https://api.github.com/organizations/16/invitations/1/teams" */
  invitation_teams_url?: string;
}

/**
 * Org Hook
 */
export interface OrgHook {
  /** @example 1 */
  id: number;

  /**
   * @format uri
   * @example https://api.github.com/orgs/octocat/hooks/1
   */
  url: string;

  /**
   * @format uri
   * @example https://api.github.com/orgs/octocat/hooks/1/pings
   */
  ping_url: string;

  /** @example web */
  name: string;

  /** @example ["push","pull_request"] */
  events: string[];

  /** @example true */
  active: boolean;
  config: { url?: string; insecure_ssl?: string; content_type?: string; secret?: string };

  /**
   * @format date-time
   * @example 2011-09-06T20:39:23Z
   */
  updated_at: string;

  /**
   * @format date-time
   * @example 2011-09-06T17:26:27Z
   */
  created_at: string;
  type: string;
}

/**
 * The type of GitHub user that can comment, open issues, or create pull requests while the interaction limit is in effect. Can be one of: `existing_users`, `contributors_only`, `collaborators_only`.
 * @example collaborators_only
 */
export enum InteractionGroup {
  ExistingUsers = "existing_users",
  ContributorsOnly = "contributors_only",
  CollaboratorsOnly = "collaborators_only",
}

/**
 * Interaction limit settings.
 */
export interface InteractionLimitResponse {
  /** The type of GitHub user that can comment, open issues, or create pull requests while the interaction limit is in effect. Can be one of: `existing_users`, `contributors_only`, `collaborators_only`. */
  limit: InteractionGroup;

  /** @example repository */
  origin: string;

  /**
   * @format date-time
   * @example 2018-08-17T04:18:39Z
   */
  expires_at: string;
}

/**
 * The duration of the interaction restriction. Can be one of: `one_day`, `three_days`, `one_week`, `one_month`, `six_months`. Default: `one_day`.
 * @example one_month
 */
export enum InteractionExpiry {
  OneDay = "one_day",
  ThreeDays = "three_days",
  OneWeek = "one_week",
  OneMonth = "one_month",
  SixMonths = "six_months",
}

/**
 * Limit interactions to a specific type of user for a specified duration
 */
export interface InteractionLimit {
  /** The type of GitHub user that can comment, open issues, or create pull requests while the interaction limit is in effect. Can be one of: `existing_users`, `contributors_only`, `collaborators_only`. */
  limit: InteractionGroup;

  /** The duration of the interaction restriction. Can be one of: `one_day`, `three_days`, `one_week`, `one_month`, `six_months`. Default: `one_day`. */
  expiry?: InteractionExpiry;
}

/**
 * Groups of organization members that gives permissions on specified repositories.
 */
export interface TeamSimple {
  /**
   * Unique identifier of the team
   * @example 1
   */
  id: number;

  /** @example MDQ6VGVhbTE= */
  node_id: string;

  /**
   * URL for the team
   * @format uri
   * @example https://api.github.com/organizations/1/team/1
   */
  url: string;

  /** @example https://api.github.com/organizations/1/team/1/members{/member} */
  members_url: string;

  /**
   * Name of the team
   * @example Justice League
   */
  name: string;

  /**
   * Description of the team
   * @example A great team.
   */
  description: string | null;

  /**
   * Permission that the team will have for its repositories
   * @example admin
   */
  permission: string;

  /**
   * The level of privacy this team should have
   * @example closed
   */
  privacy?: string;

  /**
   * @format uri
   * @example https://github.com/orgs/rails/teams/core
   */
  html_url: string;

  /**
   * @format uri
   * @example https://api.github.com/organizations/1/team/1/repos
   */
  repositories_url: string;

  /** @example justice-league */
  slug: string;

  /**
   * Distinguished Name (DN) that team maps to within LDAP environment
   * @example uid=example,ou=users,dc=github,dc=com
   */
  ldap_dn?: string;
}

/**
 * Groups of organization members that gives permissions on specified repositories.
 */
export interface Team {
  id: number;
  node_id: string;
  name: string;
  slug: string;
  description: string | null;
  privacy?: string;
  permission: string;

  /** @format uri */
  url: string;

  /**
   * @format uri
   * @example https://github.com/orgs/rails/teams/core
   */
  html_url: string;
  members_url: string;

  /** @format uri */
  repositories_url: string;
  parent?: TeamSimple | null;
}

/**
 * Org Membership
 */
export interface OrgMembership {
  /**
   * @format uri
   * @example https://api.github.com/orgs/octocat/memberships/defunkt
   */
  url: string;

  /** @example active */
  state: string;

  /** @example admin */
  role: string;

  /**
   * @format uri
   * @example https://api.github.com/orgs/octocat
   */
  organization_url: string;

  /** Organization Simple */
  organization: OrganizationSimple;
  user: SimpleUser | null;
  permissions?: { can_create_repository: boolean };
}

/**
 * A migration.
 */
export interface Migration {
  /** @example 79 */
  id: number;
  owner: SimpleUser | null;

  /** @example 0b989ba4-242f-11e5-81e1-c7b6966d2516 */
  guid: string;

  /** @example pending */
  state: string;

  /** @example true */
  lock_repositories: boolean;
  exclude_attachments: boolean;
  repositories: Repository[];

  /**
   * @format uri
   * @example https://api.github.com/orgs/octo-org/migrations/79
   */
  url: string;

  /**
   * @format date-time
   * @example 2015-07-06T15:33:38-07:00
   */
  created_at: string;

  /**
   * @format date-time
   * @example 2015-07-06T15:33:38-07:00
   */
  updated_at: string;
  node_id: string;

  /** @format uri */
  archive_url?: string;
  exclude?: any[];
}

/**
 * Projects are a way to organize columns and cards of work.
 */
export interface Project {
  /**
   * @format uri
   * @example https://api.github.com/repos/api-playground/projects-test
   */
  owner_url: string;

  /**
   * @format uri
   * @example https://api.github.com/projects/1002604
   */
  url: string;

  /**
   * @format uri
   * @example https://github.com/api-playground/projects-test/projects/12
   */
  html_url: string;

  /**
   * @format uri
   * @example https://api.github.com/projects/1002604/columns
   */
  columns_url: string;

  /** @example 1002604 */
  id: number;

  /** @example MDc6UHJvamVjdDEwMDI2MDQ= */
  node_id: string;

  /**
   * Name of the project
   * @example Week One Sprint
   */
  name: string;

  /**
   * Body of the project
   * @example This project represents the sprint of the first week in January
   */
  body: string | null;

  /** @example 1 */
  number: number;

  /**
   * State of the project; either 'open' or 'closed'
   * @example open
   */
  state: string;
  creator: SimpleUser | null;

  /**
   * @format date-time
   * @example 2011-04-10T20:09:31Z
   */
  created_at: string;

  /**
   * @format date-time
   * @example 2014-03-03T18:58:10Z
   */
  updated_at: string;

  /** The baseline permission that all organization members have on this project. Only present if owner is an organization. */
  organization_permission?: "read" | "write" | "admin" | "none";

  /** Whether or not this project can be seen by everyone. Only present if owner is an organization. */
  private?: boolean;
}

/**
 * External Groups to be mapped to a team for membership
 */
export interface GroupMapping {
  /**
   * Array of groups to be mapped to this team
   * @example [{"group_id":"111a1a11-aaa1-1aaa-11a1-a1a1a1a1a1aa","group_name":"saml-azuread-test","group_description":"A group of Developers working on AzureAD SAML SSO"},{"group_id":"2bb2bb2b-bb22-22bb-2bb2-bb2bbb2bb2b2","group_name":"saml-azuread-test2","group_description":"Another group of Developers working on AzureAD SAML SSO"}]
   */
  groups?: { group_id: string; group_name: string; group_description: string }[];

  /**
   * The ID of the group
   * @example 111a1a11-aaa1-1aaa-11a1-a1a1a1a1a1aa
   */
  group_id?: string;

  /**
   * The name of the group
   * @example saml-azuread-test
   */
  group_name?: string;

  /**
   * a description of the group
   * @example A group of Developers working on AzureAD SAML SSO
   */
  group_description?: string;

  /**
   * synchronization status for this group mapping
   * @example unsynced
   */
  status?: string;

  /**
   * the time of the last sync for this group-mapping
   * @example 2019-06-03 22:27:15:000 -700
   */
  synced_at?: string;
}

/**
 * Groups of organization members that gives permissions on specified repositories.
 */
export interface TeamFull {
  /**
   * Unique identifier of the team
   * @example 42
   */
  id: number;

  /** @example MDQ6VGVhbTE= */
  node_id: string;

  /**
   * URL for the team
   * @format uri
   * @example https://api.github.com/organizations/1/team/1
   */
  url: string;

  /**
   * @format uri
   * @example https://github.com/orgs/rails/teams/core
   */
  html_url: string;

  /**
   * Name of the team
   * @example Developers
   */
  name: string;

  /** @example justice-league */
  slug: string;

  /** @example A great team. */
  description: string | null;

  /**
   * The level of privacy this team should have
   * @example closed
   */
  privacy?: "closed" | "secret";

  /**
   * Permission that the team will have for its repositories
   * @example push
   */
  permission: string;

  /** @example https://api.github.com/organizations/1/team/1/members{/member} */
  members_url: string;

  /**
   * @format uri
   * @example https://api.github.com/organizations/1/team/1/repos
   */
  repositories_url: string;
  parent?: TeamSimple | null;

  /** @example 3 */
  members_count: number;

  /** @example 10 */
  repos_count: number;

  /**
   * @format date-time
   * @example 2017-07-14T16:53:42Z
   */
  created_at: string;

  /**
   * @format date-time
   * @example 2017-08-17T12:37:15Z
   */
  updated_at: string;

  /** Organization Full */
  organization: OrganizationFull;

  /**
   * Distinguished Name (DN) that team maps to within LDAP environment
   * @example uid=example,ou=users,dc=github,dc=com
   */
  ldap_dn?: string;
}

/**
 * A team discussion is a persistent record of a free-form conversation within a team.
 */
export interface TeamDiscussion {
  author: SimpleUser | null;

  /**
   * The main text of the discussion.
   * @example Please suggest improvements to our workflow in comments.
   */
  body: string;

  /** @example <p>Hi! This is an area for us to collaborate as a team</p> */
  body_html: string;

  /**
   * The current version of the body content. If provided, this update operation will be rejected if the given version does not match the latest version on the server.
   * @example 0307116bbf7ced493b8d8a346c650b71
   */
  body_version: string;

  /** @example 0 */
  comments_count: number;

  /**
   * @format uri
   * @example https://api.github.com/organizations/1/team/2343027/discussions/1/comments
   */
  comments_url: string;

  /**
   * @format date-time
   * @example 2018-01-25T18:56:31Z
   */
  created_at: string;

  /** @format date-time */
  last_edited_at: string | null;

  /**
   * @format uri
   * @example https://github.com/orgs/github/teams/justice-league/discussions/1
   */
  html_url: string;

  /** @example MDE0OlRlYW1EaXNjdXNzaW9uMQ== */
  node_id: string;

  /**
   * The unique sequence number of a team discussion.
   * @example 42
   */
  number: number;

  /**
   * Whether or not this discussion should be pinned for easy retrieval.
   * @example true
   */
  pinned: boolean;

  /**
   * Whether or not this discussion should be restricted to team members and organization administrators.
   * @example true
   */
  private: boolean;

  /**
   * @format uri
   * @example https://api.github.com/organizations/1/team/2343027
   */
  team_url: string;

  /**
   * The title of the discussion.
   * @example How can we improve our workflow?
   */
  title: string;

  /**
   * @format date-time
   * @example 2018-01-25T18:56:31Z
   */
  updated_at: string;

  /**
   * @format uri
   * @example https://api.github.com/organizations/1/team/2343027/discussions/1
   */
  url: string;
  reactions?: ReactionRollup;
}

/**
 * A reply to a discussion within a team.
 */
export interface TeamDiscussionComment {
  author: SimpleUser | null;

  /**
   * The main text of the comment.
   * @example I agree with this suggestion.
   */
  body: string;

  /** @example <p>Do you like apples?</p> */
  body_html: string;

  /**
   * The current version of the body content. If provided, this update operation will be rejected if the given version does not match the latest version on the server.
   * @example 0307116bbf7ced493b8d8a346c650b71
   */
  body_version: string;

  /**
   * @format date-time
   * @example 2018-01-15T23:53:58Z
   */
  created_at: string;

  /** @format date-time */
  last_edited_at: string | null;

  /**
   * @format uri
   * @example https://api.github.com/organizations/1/team/2403582/discussions/1
   */
  discussion_url: string;

  /**
   * @format uri
   * @example https://github.com/orgs/github/teams/justice-league/discussions/1/comments/1
   */
  html_url: string;

  /** @example MDIxOlRlYW1EaXNjdXNzaW9uQ29tbWVudDE= */
  node_id: string;

  /**
   * The unique sequence number of a team discussion comment.
   * @example 42
   */
  number: number;

  /**
   * @format date-time
   * @example 2018-01-15T23:53:58Z
   */
  updated_at: string;

  /**
   * @format uri
   * @example https://api.github.com/organizations/1/team/2403582/discussions/1/comments/1
   */
  url: string;
  reactions?: ReactionRollup;
}

/**
 * Reactions to conversations provide a way to help people express their feelings more simply and effectively.
 */
export interface Reaction {
  /** @example 1 */
  id: number;

  /** @example MDg6UmVhY3Rpb24x */
  node_id: string;
  user: SimpleUser | null;

  /**
   * The reaction to use
   * @example heart
   */
  content: "+1" | "-1" | "laugh" | "confused" | "heart" | "hooray" | "rocket" | "eyes";

  /**
   * @format date-time
   * @example 2016-05-20T20:09:31Z
   */
  created_at: string;
}

/**
 * Team Membership
 */
export interface TeamMembership {
  /** @format uri */
  url: string;

  /**
   * The role of the user in the team.
   * @example member
   */
  role: "member" | "maintainer";
  state: string;
}

/**
 * A team's access to a project.
 */
export interface TeamProject {
  owner_url: string;
  url: string;
  html_url: string;
  columns_url: string;
  id: number;
  node_id: string;
  name: string;
  body: string | null;
  number: number;
  state: string;

  /** Simple User */
  creator: SimpleUser;
  created_at: string;
  updated_at: string;

  /** The organization permission for this project. Only present when owner is an organization. */
  organization_permission?: string;

  /** Whether the project is private or not. Only present when owner is an organization. */
  private?: boolean;
  permissions: { read: boolean; write: boolean; admin: boolean };
}

/**
 * A team's access to a repository.
 */
export interface TeamRepository {
  /**
   * Unique identifier of the repository
   * @example 42
   */
  id: number;

  /** @example MDEwOlJlcG9zaXRvcnkxMjk2MjY5 */
  node_id: string;

  /**
   * The name of the repository.
   * @example Team Environment
   */
  name: string;

  /** @example octocat/Hello-World */
  full_name: string;
  license: LicenseSimple | null;
  forks: number;
  permissions?: { admin: boolean; pull: boolean; triage?: boolean; push: boolean; maintain?: boolean };
  owner: SimpleUser | null;

  /** Whether the repository is private or public. */
  private: boolean;

  /**
   * @format uri
   * @example https://github.com/octocat/Hello-World
   */
  html_url: string;

  /** @example This your first repo! */
  description: string | null;
  fork: boolean;

  /**
   * @format uri
   * @example https://api.github.com/repos/octocat/Hello-World
   */
  url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/{archive_format}{/ref} */
  archive_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/assignees{/user} */
  assignees_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/git/blobs{/sha} */
  blobs_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/branches{/branch} */
  branches_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/collaborators{/collaborator} */
  collaborators_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/comments{/number} */
  comments_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/commits{/sha} */
  commits_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/compare/{base}...{head} */
  compare_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/contents/{+path} */
  contents_url: string;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/contributors
   */
  contributors_url: string;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/deployments
   */
  deployments_url: string;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/downloads
   */
  downloads_url: string;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/events
   */
  events_url: string;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/forks
   */
  forks_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/git/commits{/sha} */
  git_commits_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/git/refs{/sha} */
  git_refs_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/git/tags{/sha} */
  git_tags_url: string;

  /** @example git:github.com/octocat/Hello-World.git */
  git_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/issues/comments{/number} */
  issue_comment_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/issues/events{/number} */
  issue_events_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/issues{/number} */
  issues_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/keys{/key_id} */
  keys_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/labels{/name} */
  labels_url: string;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/languages
   */
  languages_url: string;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/merges
   */
  merges_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/milestones{/number} */
  milestones_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/notifications{?since,all,participating} */
  notifications_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/pulls{/number} */
  pulls_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/releases{/id} */
  releases_url: string;

  /** @example git@github.com:octocat/Hello-World.git */
  ssh_url: string;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/stargazers
   */
  stargazers_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/statuses/{sha} */
  statuses_url: string;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/subscribers
   */
  subscribers_url: string;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/subscription
   */
  subscription_url: string;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/tags
   */
  tags_url: string;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/teams
   */
  teams_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/git/trees{/sha} */
  trees_url: string;

  /** @example https://github.com/octocat/Hello-World.git */
  clone_url: string;

  /**
   * @format uri
   * @example git:git.example.com/octocat/Hello-World
   */
  mirror_url: string | null;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/hooks
   */
  hooks_url: string;

  /**
   * @format uri
   * @example https://svn.github.com/octocat/Hello-World
   */
  svn_url: string;

  /**
   * @format uri
   * @example https://github.com
   */
  homepage: string | null;
  language: string | null;

  /** @example 9 */
  forks_count: number;

  /** @example 80 */
  stargazers_count: number;

  /** @example 80 */
  watchers_count: number;

  /** @example 108 */
  size: number;

  /**
   * The default branch of the repository.
   * @example master
   */
  default_branch: string;

  /** @example 0 */
  open_issues_count: number;

  /**
   * Whether this repository acts as a template that can be used to generate new repositories.
   * @example true
   */
  is_template?: boolean;
  topics?: string[];

  /**
   * Whether issues are enabled.
   * @example true
   */
  has_issues: boolean;

  /**
   * Whether projects are enabled.
   * @example true
   */
  has_projects: boolean;

  /**
   * Whether the wiki is enabled.
   * @example true
   */
  has_wiki: boolean;
  has_pages: boolean;

  /**
   * Whether downloads are enabled.
   * @example true
   */
  has_downloads: boolean;

  /** Whether the repository is archived. */
  archived: boolean;

  /** Returns whether or not this repository disabled. */
  disabled: boolean;

  /** The repository visibility: public, private, or internal. */
  visibility?: string;

  /**
   * @format date-time
   * @example 2011-01-26T19:06:43Z
   */
  pushed_at: string | null;

  /**
   * @format date-time
   * @example 2011-01-26T19:01:12Z
   */
  created_at: string | null;

  /**
   * @format date-time
   * @example 2011-01-26T19:14:43Z
   */
  updated_at: string | null;

  /**
   * Whether to allow rebase merges for pull requests.
   * @example true
   */
  allow_rebase_merge?: boolean;
  template_repository?: Repository | null;
  temp_clone_token?: string;

  /**
   * Whether to allow squash merges for pull requests.
   * @example true
   */
  allow_squash_merge?: boolean;

  /**
   * Whether to delete head branches when pull requests are merged
   * @example false
   */
  delete_branch_on_merge?: boolean;

  /**
   * Whether to allow merge commits for pull requests.
   * @example true
   */
  allow_merge_commit?: boolean;
  subscribers_count?: number;
  network_count?: number;
  open_issues: number;
  watchers: number;
  master_branch?: string;
}

/**
 * Project cards represent a scope of work.
 */
export interface ProjectCard {
  /**
   * @format uri
   * @example https://api.github.com/projects/columns/cards/1478
   */
  url: string;

  /**
   * The project card's ID
   * @example 42
   */
  id: number;

  /** @example MDExOlByb2plY3RDYXJkMTQ3OA== */
  node_id: string;

  /** @example Add payload for delete Project column */
  note: string | null;
  creator: SimpleUser | null;

  /**
   * @format date-time
   * @example 2016-09-05T14:21:06Z
   */
  created_at: string;

  /**
   * @format date-time
   * @example 2016-09-05T14:20:22Z
   */
  updated_at: string;

  /**
   * Whether or not the card is archived
   * @example false
   */
  archived?: boolean;

  /**
   * @format uri
   * @example https://api.github.com/projects/columns/367
   */
  column_url: string;

  /**
   * @format uri
   * @example https://api.github.com/repos/api-playground/projects-test/issues/3
   */
  content_url?: string;

  /**
   * @format uri
   * @example https://api.github.com/projects/120
   */
  project_url: string;
}

/**
 * Project columns contain cards of work.
 */
export interface ProjectColumn {
  /**
   * @format uri
   * @example https://api.github.com/projects/columns/367
   */
  url: string;

  /**
   * @format uri
   * @example https://api.github.com/projects/120
   */
  project_url: string;

  /**
   * @format uri
   * @example https://api.github.com/projects/columns/367/cards
   */
  cards_url: string;

  /**
   * The unique identifier of the project column
   * @example 42
   */
  id: number;

  /** @example MDEzOlByb2plY3RDb2x1bW4zNjc= */
  node_id: string;

  /**
   * Name of the project column
   * @example Remaining tasks
   */
  name: string;

  /**
   * @format date-time
   * @example 2016-09-05T14:18:44Z
   */
  created_at: string;

  /**
   * @format date-time
   * @example 2016-09-05T14:22:28Z
   */
  updated_at: string;
}

/**
 * Repository Collaborator Permission
 */
export interface RepositoryCollaboratorPermission {
  permission: string;
  user: SimpleUser | null;
}

export interface RateLimit {
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * Rate Limit Overview
 */
export interface RateLimitOverview {
  resources: {
    core: RateLimit;
    graphql?: RateLimit;
    search: RateLimit;
    source_import?: RateLimit;
    integration_manifest?: RateLimit;
    code_scanning_upload?: RateLimit;
  };
  rate: RateLimit;
}

/**
 * Full Repository
 */
export interface FullRepository {
  /** @example 1296269 */
  id: number;

  /** @example MDEwOlJlcG9zaXRvcnkxMjk2MjY5 */
  node_id: string;

  /** @example Hello-World */
  name: string;

  /** @example octocat/Hello-World */
  full_name: string;
  owner: SimpleUser | null;
  private: boolean;

  /**
   * @format uri
   * @example https://github.com/octocat/Hello-World
   */
  html_url: string;

  /** @example This your first repo! */
  description: string | null;
  fork: boolean;

  /**
   * @format uri
   * @example https://api.github.com/repos/octocat/Hello-World
   */
  url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/{archive_format}{/ref} */
  archive_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/assignees{/user} */
  assignees_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/git/blobs{/sha} */
  blobs_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/branches{/branch} */
  branches_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/collaborators{/collaborator} */
  collaborators_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/comments{/number} */
  comments_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/commits{/sha} */
  commits_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/compare/{base}...{head} */
  compare_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/contents/{+path} */
  contents_url: string;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/contributors
   */
  contributors_url: string;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/deployments
   */
  deployments_url: string;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/downloads
   */
  downloads_url: string;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/events
   */
  events_url: string;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/forks
   */
  forks_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/git/commits{/sha} */
  git_commits_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/git/refs{/sha} */
  git_refs_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/git/tags{/sha} */
  git_tags_url: string;

  /** @example git:github.com/octocat/Hello-World.git */
  git_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/issues/comments{/number} */
  issue_comment_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/issues/events{/number} */
  issue_events_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/issues{/number} */
  issues_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/keys{/key_id} */
  keys_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/labels{/name} */
  labels_url: string;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/languages
   */
  languages_url: string;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/merges
   */
  merges_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/milestones{/number} */
  milestones_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/notifications{?since,all,participating} */
  notifications_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/pulls{/number} */
  pulls_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/releases{/id} */
  releases_url: string;

  /** @example git@github.com:octocat/Hello-World.git */
  ssh_url: string;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/stargazers
   */
  stargazers_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/statuses/{sha} */
  statuses_url: string;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/subscribers
   */
  subscribers_url: string;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/subscription
   */
  subscription_url: string;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/tags
   */
  tags_url: string;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/teams
   */
  teams_url: string;

  /** @example http://api.github.com/repos/octocat/Hello-World/git/trees{/sha} */
  trees_url: string;

  /** @example https://github.com/octocat/Hello-World.git */
  clone_url: string;

  /**
   * @format uri
   * @example git:git.example.com/octocat/Hello-World
   */
  mirror_url: string | null;

  /**
   * @format uri
   * @example http://api.github.com/repos/octocat/Hello-World/hooks
   */
  hooks_url: string;

  /**
   * @format uri
   * @example https://svn.github.com/octocat/Hello-World
   */
  svn_url: string;

  /**
   * @format uri
   * @example https://github.com
   */
  homepage: string | null;
  language: string | null;

  /** @example 9 */
  forks_count: number;

  /** @example 80 */
  stargazers_count: number;

  /** @example 80 */
  watchers_count: number;

  /** @example 108 */
  size: number;

  /** @example master */
  default_branch: string;

  /** @example 0 */
  open_issues_count: number;

  /** @example true */
  is_template?: boolean;

  /** @example ["octocat","atom","electron","API"] */
  topics?: string[];

  /** @example true */
  has_issues: boolean;

  /** @example true */
  has_projects: boolean;

  /** @example true */
  has_wiki: boolean;
  has_pages: boolean;

  /** @example true */
  has_downloads: boolean;
  archived: boolean;

  /** Returns whether or not this repository disabled. */
  disabled: boolean;

  /**
   * The repository visibility: public, private, or internal.
   * @example public
   */
  visibility?: string;

  /**
   * @format date-time
   * @example 2011-01-26T19:06:43Z
   */
  pushed_at: string;

  /**
   * @format date-time
   * @example 2011-01-26T19:01:12Z
   */
  created_at: string;

  /**
   * @format date-time
   * @example 2011-01-26T19:14:43Z
   */
  updated_at: string;
  permissions?: { admin: boolean; pull: boolean; push: boolean };

  /** @example true */
  allow_rebase_merge?: boolean;
  template_repository?: Repository | null;
  temp_clone_token?: string | null;

  /** @example true */
  allow_squash_merge?: boolean;

  /** @example false */
  delete_branch_on_merge?: boolean;

  /** @example true */
  allow_merge_commit?: boolean;

  /** @example 42 */
  subscribers_count: number;

  /** @example 0 */
  network_count: number;
  license: LicenseSimple | null;
  organization?: SimpleUser | null;

  /** A git repository */
  parent?: Repository;

  /** A git repository */
  source?: Repository;
  forks: number;
  master_branch?: string;
  open_issues: number;
  watchers: number;

  /** Whether anonymous git access is allowed. */
  anonymous_access_enabled?: boolean;
}

/**
 * An artifact
 */
export interface Artifact {
  /** @example 5 */
  id: number;

  /** @example MDEwOkNoZWNrU3VpdGU1 */
  node_id: string;

  /**
   * The name of the artifact.
   * @example AdventureWorks.Framework
   */
  name: string;

  /**
   * The size in bytes of the artifact.
   * @example 12345
   */
  size_in_bytes: number;

  /** @example https://api.github.com/repos/github/hello-world/actions/artifacts/5 */
  url: string;

  /** @example https://api.github.com/repos/github/hello-world/actions/artifacts/5/zip */
  archive_download_url: string;

  /** Whether or not the artifact has expired. */
  expired: boolean;

  /** @format date-time */
  created_at: string | null;

  /** @format date-time */
  expires_at: string;

  /** @format date-time */
  updated_at: string | null;
}

/**
 * Information of a job execution in a workflow run
 */
export interface Job {
  /**
   * The id of the job.
   * @example 21
   */
  id: number;

  /**
   * The id of the associated workflow run.
   * @example 5
   */
  run_id: number;

  /** @example https://api.github.com/repos/github/hello-world/actions/runs/5 */
  run_url: string;

  /** @example MDg6Q2hlY2tSdW40 */
  node_id: string;

  /**
   * The SHA of the commit that is being run.
   * @example 009b8a3a9ccbb128af87f9b1c0f4c62e8a304f6d
   */
  head_sha: string;

  /** @example https://api.github.com/repos/github/hello-world/actions/jobs/21 */
  url: string;

  /** @example https://github.com/github/hello-world/runs/4 */
  html_url: string | null;

  /**
   * The phase of the lifecycle that the job is currently in.
   * @example queued
   */
  status: "queued" | "in_progress" | "completed";

  /**
   * The outcome of the job.
   * @example success
   */
  conclusion: string | null;

  /**
   * The time that the job started, in ISO 8601 format.
   * @format date-time
   * @example 2019-08-08T08:00:00-07:00
   */
  started_at: string;

  /**
   * The time that the job finished, in ISO 8601 format.
   * @format date-time
   * @example 2019-08-08T08:00:00-07:00
   */
  completed_at: string | null;

  /**
   * The name of the job.
   * @example test-coverage
   */
  name: string;

  /** Steps in this job. */
  steps?: {
    status: "queued" | "in_progress" | "completed";
    conclusion: string | null;
    name: string;
    number: number;
    started_at?: string | null;
    completed_at?: string | null;
  }[];

  /** @example https://api.github.com/repos/github/hello-world/check-runs/4 */
  check_run_url: string;
}

/**
 * Whether GitHub Actions is enabled on the repository.
 */
export type ActionsEnabled = boolean;

export interface ActionsRepositoryPermissions {
  /** Whether GitHub Actions is enabled on the repository. */
  enabled: ActionsEnabled;

  /** The permissions policy that controls the actions that are allowed to run. Can be one of: `all`, `local_only`, or `selected`. */
  allowed_actions: AllowedActions;

  /** The API URL to use to get or set the actions that are allowed to run, when `allowed_actions` is set to `selected`. */
  selected_actions_url?: SelectedActionsUrl;
}

export interface PullRequestMinimal {
  id: number;
  number: number;
  url: string;
  head: { ref: string; sha: string; repo: { id: number; url: string; name: string } };
  base: { ref: string; sha: string; repo: { id: number; url: string; name: string } };
}

/**
 * Simple Commit
 */
export interface SimpleCommit {
  id: string;
  tree_id: string;
  message: string;

  /** @format date-time */
  timestamp: string;
  author: { name: string; email: string };
  committer: { name: string; email: string };
}

/**
 * An invocation of a workflow
 */
export interface WorkflowRun {
  /**
   * The ID of the workflow run.
   * @example 5
   */
  id: number;

  /**
   * The name of the workflow run.
   * @example Build
   */
  name?: string;

  /** @example MDEwOkNoZWNrU3VpdGU1 */
  node_id: string;

  /** @example master */
  head_branch: string | null;

  /**
   * The SHA of the head commit that points to the version of the worflow being run.
   * @example 009b8a3a9ccbb128af87f9b1c0f4c62e8a304f6d
   */
  head_sha: string;

  /**
   * The auto incrementing run number for the workflow run.
   * @example 106
   */
  run_number: number;

  /** @example push */
  event: string;

  /** @example completed */
  status: string | null;

  /** @example neutral */
  conclusion: string | null;

  /**
   * The ID of the parent workflow.
   * @example 5
   */
  workflow_id: number;

  /**
   * The URL to the workflow run.
   * @example https://api.github.com/repos/github/hello-world/actions/runs/5
   */
  url: string;

  /** @example https://github.com/github/hello-world/suites/4 */
  html_url: string;
  pull_requests: PullRequestMinimal[] | null;

  /** @format date-time */
  created_at: string;

  /** @format date-time */
  updated_at: string;

  /**
   * The URL to the jobs for the workflow run.
   * @example https://api.github.com/repos/github/hello-world/actions/runs/5/jobs
   */
  jobs_url: string;

  /**
   * The URL to download the logs for the workflow run.
   * @example https://api.github.com/repos/github/hello-world/actions/runs/5/logs
   */
  logs_url: string;

  /**
   * The URL to the associated check suite.
   * @example https://api.github.com/repos/github/hello-world/check-suites/12
   */
  check_suite_url: string;

  /**
   * The URL to the artifacts for the workflow run.
   * @example https://api.github.com/repos/github/hello-world/actions/runs/5/rerun/artifacts
   */
  artifacts_url: string;

  /**
   * The URL to cancel the workflow run.
   * @example https://api.github.com/repos/github/hello-world/actions/runs/5/cancel
   */
  cancel_url: string;

  /**
   * The URL to rerun the workflow run.
   * @example https://api.github.com/repos/github/hello-world/actions/runs/5/rerun
   */
  rerun_url: string;

  /**
   * The URL to the workflow.
   * @example https://api.github.com/repos/github/hello-world/actions/workflows/main.yaml
   */
  workflow_url: string;

  /** Simple Commit */
  head_commit: SimpleCommit;

  /** Minimal Repository */
  repository: MinimalRepository;

  /** Minimal Repository */
  head_repository: MinimalRepository;

  /** @example 5 */
  head_repository_id?: number;
}

/**
 * Workflow Run Usage
 */
export interface WorkflowRunUsage {
  billable: {
    UBUNTU?: { total_ms: number; jobs: number };
    MACOS?: { total_ms: number; jobs: number };
    WINDOWS?: { total_ms: number; jobs: number };
  };
  run_duration_ms: number;
}

/**
 * Set secrets for GitHub Actions.
 */
export interface ActionsSecret {
  /**
   * The name of the secret.
   * @example SECRET_TOKEN
   */
  name: string;

  /** @format date-time */
  created_at: string;

  /** @format date-time */
  updated_at: string;
}

/**
 * A GitHub Actions workflow
 */
export interface Workflow {
  /** @example 5 */
  id: number;

  /** @example MDg6V29ya2Zsb3cxMg== */
  node_id: string;

  /** @example CI */
  name: string;

  /** @example ruby.yaml */
  path: string;

  /** @example active */
  state: "active" | "deleted";

  /**
   * @format date-time
   * @example 2019-12-06T14:20:20.000Z
   */
  created_at: string;

  /**
   * @format date-time
   * @example 2019-12-06T14:20:20.000Z
   */
  updated_at: string;

  /** @example https://api.github.com/repos/actions/setup-ruby/workflows/5 */
  url: string;

  /** @example https://github.com/actions/setup-ruby/blob/master/.github/workflows/ruby.yaml */
  html_url: string;

  /** @example https://github.com/actions/setup-ruby/workflows/CI/badge.svg */
  badge_url: string;

  /**
   * @format date-time
   * @example 2019-12-06T14:20:20.000Z
   */
  deleted_at?: string;
}

/**
 * Workflow Usage
 */
export interface WorkflowUsage {
  billable: { UBUNTU?: { total_ms?: number }; MACOS?: { total_ms?: number }; WINDOWS?: { total_ms?: number } };
}

/**
 * Protected Branch Admin Enforced
 */
export interface ProtectedBranchAdminEnforced {
  /**
   * @format uri
   * @example https://api.github.com/repos/octocat/Hello-World/branches/master/protection/enforce_admins
   */
  url: string;

  /** @example true */
  enabled: boolean;
}

/**
 * Protected Branch Pull Request Review
 */
export interface ProtectedBranchPullRequestReview {
  /**
   * @format uri
   * @example https://api.github.com/repos/octocat/Hello-World/branches/master/protection/dismissal_restrictions
   */
  url?: string;
  dismissal_restrictions?: {
    users?: SimpleUser[];
    teams?: Team[];
    url?: string;
    users_url?: string;
    teams_url?: string;
  };

  /** @example true */
  dismiss_stale_reviews: boolean;

  /** @example true */
  require_code_owner_reviews: boolean;

  /**
   * @min 1
   * @max 6
   * @example 2
   */
  required_approving_review_count?: number;
}

/**
 * Branch Restriction Policy
 */
export interface BranchRestrictionPolicy {
  /** @format uri */
  url: string;

  /** @format uri */
  users_url: string;

  /** @format uri */
  teams_url: string;

  /** @format uri */
  apps_url: string;
  users: {
    login?: string;
    id?: number;
    node_id?: string;
    avatar_url?: string;
    gravatar_id?: string;
    url?: string;
    html_url?: string;
    followers_url?: string;
    following_url?: string;
    gists_url?: string;
    starred_url?: string;
    subscriptions_url?: string;
    organizations_url?: string;
    repos_url?: string;
    events_url?: string;
    received_events_url?: string;
    type?: string;
    site_admin?: boolean;
  }[];
  teams: {
    id?: number;
    node_id?: string;
    url?: string;
    html_url?: string;
    name?: string;
    slug?: string;
    description?: string | null;
    privacy?: string;
    permission?: string;
    members_url?: string;
    repositories_url?: string;
    parent?: string | null;
  }[];
  apps: {
    id?: number;
    slug?: string;
    node_id?: string;
    owner?: {
      login?: string;
      id?: number;
      node_id?: string;
      url?: string;
      repos_url?: string;
      events_url?: string;
      hooks_url?: string;
      issues_url?: string;
      members_url?: string;
      public_members_url?: string;
      avatar_url?: string;
      description?: string;
      gravatar_id?: string;
      html_url?: string;
      followers_url?: string;
      following_url?: string;
      gists_url?: string;
      starred_url?: string;
      subscriptions_url?: string;
      organizations_url?: string;
      received_events_url?: string;
      type?: string;
    };
    name?: string;
    description?: string;
    external_url?: string;
    html_url?: string;
    created_at?: string;
    updated_at?: string;
    permissions?: { metadata?: string; contents?: string; issues?: string; single_file?: string };
    events?: string[];
  }[];
}

/**
 * Branch Protection
 */
export interface BranchProtection {
  url?: string;
  required_status_checks: { url?: string; enforcement_level: string; contexts: string[]; contexts_url?: string };

  /** Protected Branch Admin Enforced */
  enforce_admins?: ProtectedBranchAdminEnforced;

  /** Protected Branch Pull Request Review */
  required_pull_request_reviews?: ProtectedBranchPullRequestReview;

  /** Branch Restriction Policy */
  restrictions?: BranchRestrictionPolicy;
  required_linear_history?: { enabled?: boolean };
  allow_force_pushes?: { enabled?: boolean };
  allow_deletions?: { enabled?: boolean };
  enabled: boolean;

  /** @example "branch/with/protection" */
  name?: string;

  /** @example "https://api.github.com/repos/owner-79e94e2d36b3fd06a32bb213/AAA_Public_Repo/branches/branch/with/protection/protection" */
  protection_url?: string;
}

/**
 * Short Branch
 */
export interface ShortBranch {
  name: string;
  commit: { sha: string; url: string };
  protected: boolean;

  /** Branch Protection */
  protection?: BranchProtection;

  /** @format uri */
  protection_url?: string;
}

/**
 * Metaproperties for Git author/committer information.
 */
export interface GitUser {
  /** @example "Chris Wanstrath" */
  name?: string;

  /** @example "chris@ozmm.org" */
  email?: string;

  /** @example "2007-10-29T02:42:39.000-07:00" */
  date?: string;
}

export interface Verification {
  verified: boolean;
  reason: string;
  payload: string | null;
  signature: string | null;
}

/**
 * Commit
 */
export interface Commit {
  /**
   * @format uri
   * @example https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e
   */
  url: string;

  /** @example 6dcb09b5b57875f334f61aebed695e2e4193db5e */
  sha: string;

  /** @example MDY6Q29tbWl0NmRjYjA5YjViNTc4NzVmMzM0ZjYxYWViZWQ2OTVlMmU0MTkzZGI1ZQ== */
  node_id: string;

  /**
   * @format uri
   * @example https://github.com/octocat/Hello-World/commit/6dcb09b5b57875f334f61aebed695e2e4193db5e
   */
  html_url: string;

  /**
   * @format uri
   * @example https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e/comments
   */
  comments_url: string;
  commit: {
    url: string;
    author: GitUser | null;
    committer: GitUser | null;
    message: string;
    comment_count: number;
    tree: { sha: string; url: string };
    verification?: Verification;
  };
  author: SimpleUser | null;
  committer: SimpleUser | null;
  parents: { sha: string; url: string; html_url?: string }[];
  stats?: { additions?: number; deletions?: number; total?: number };
  files?: {
    filename?: string;
    additions?: number;
    deletions?: number;
    changes?: number;
    status?: string;
    raw_url?: string;
    blob_url?: string;
    patch?: string;
    sha?: string;
    contents_url?: string;
    previous_filename?: string;
  }[];
}

/**
 * Branch With Protection
 */
export interface BranchWithProtection {
  name: string;

  /** Commit */
  commit: Commit;
  _links: { html: string; self: string };
  protected: boolean;

  /** Branch Protection */
  protection: BranchProtection;

  /** @format uri */
  protection_url: string;

  /** @example "mas*" */
  pattern?: string;

  /** @example 1 */
  required_approving_review_count?: number;
}

/**
 * Status Check Policy
 */
export interface StatusCheckPolicy {
  /**
   * @format uri
   * @example https://api.github.com/repos/octocat/Hello-World/branches/master/protection/required_status_checks
   */
  url: string;

  /** @example true */
  strict: boolean;

  /** @example ["continuous-integration/travis-ci"] */
  contexts: string[];

  /**
   * @format uri
   * @example https://api.github.com/repos/octocat/Hello-World/branches/master/protection/required_status_checks/contexts
   */
  contexts_url: string;
}

/**
 * Branch protections protect branches
 */
export interface ProtectedBranch {
  /** @format uri */
  url: string;

  /** Status Check Policy */
  required_status_checks?: StatusCheckPolicy;
  required_pull_request_reviews?: {
    url: string;
    dismiss_stale_reviews?: boolean;
    require_code_owner_reviews?: boolean;
    required_approving_review_count?: number;
    dismissal_restrictions?: { url: string; users_url: string; teams_url: string; users: SimpleUser[]; teams: Team[] };
  };
  required_signatures?: { url: string; enabled: boolean };
  enforce_admins?: { url: string; enabled: boolean };
  required_linear_history?: { enabled: boolean };
  allow_force_pushes?: { enabled: boolean };
  allow_deletions?: { enabled: boolean };

  /** Branch Restriction Policy */
  restrictions?: BranchRestrictionPolicy;
}

/**
 * A check performed on the code of a given code change
 */
export interface CheckRun {
  /**
   * The id of the check.
   * @example 21
   */
  id: number;

  /**
   * The SHA of the commit that is being checked.
   * @example 009b8a3a9ccbb128af87f9b1c0f4c62e8a304f6d
   */
  head_sha: string;

  /** @example MDg6Q2hlY2tSdW40 */
  node_id: string;

  /** @example 42 */
  external_id: string | null;

  /** @example https://api.github.com/repos/github/hello-world/check-runs/4 */
  url: string;

  /** @example https://github.com/github/hello-world/runs/4 */
  html_url: string | null;

  /** @example https://example.com */
  details_url: string | null;

  /**
   * The phase of the lifecycle that the check is currently in.
   * @example queued
   */
  status: "queued" | "in_progress" | "completed";

  /** @example neutral */
  conclusion: "success" | "failure" | "neutral" | "cancelled" | "skipped" | "timed_out" | "action_required" | null;

  /**
   * @format date-time
   * @example 2018-05-04T01:14:52Z
   */
  started_at: string | null;

  /**
   * @format date-time
   * @example 2018-05-04T01:14:52Z
   */
  completed_at: string | null;
  output: {
    title: string | null;
    summary: string | null;
    text: string | null;
    annotations_count: number;
    annotations_url: string;
  };

  /**
   * The name of the check.
   * @example test-coverage
   */
  name: string;
  check_suite: { id: number };
  app: Integration | null;
  pull_requests: PullRequestMinimal[];
}

/**
 * Check Annotation
 */
export interface CheckAnnotation {
  /** @example README.md */
  path: string;

  /** @example 2 */
  start_line: number;

  /** @example 2 */
  end_line: number;

  /** @example 5 */
  start_column: number | null;

  /** @example 10 */
  end_column: number | null;

  /** @example warning */
  annotation_level: string | null;

  /** @example Spell Checker */
  title: string | null;

  /** @example Check your spelling for 'banaas'. */
  message: string | null;

  /** @example Do you mean 'bananas' or 'banana'? */
  raw_details: string | null;
  blob_href: string;
}

/**
 * A suite of checks performed on the code of a given code change
 */
export interface CheckSuite {
  /** @example 5 */
  id: number;

  /** @example MDEwOkNoZWNrU3VpdGU1 */
  node_id: string;

  /** @example master */
  head_branch: string | null;

  /**
   * The SHA of the head commit that is being checked.
   * @example 009b8a3a9ccbb128af87f9b1c0f4c62e8a304f6d
   */
  head_sha: string;

  /** @example completed */
  status: "queued" | "in_progress" | "completed" | null;

  /** @example neutral */
  conclusion: "success" | "failure" | "neutral" | "cancelled" | "skipped" | "timed_out" | "action_required" | null;

  /** @example https://api.github.com/repos/github/hello-world/check-suites/5 */
  url: string | null;

  /** @example 146e867f55c26428e5f9fade55a9bbf5e95a7912 */
  before: string | null;

  /** @example d6fde92930d4715a2b49857d24b940956b26d2d3 */
  after: string | null;
  pull_requests: PullRequestMinimal[] | null;
  app: Integration | null;

  /** Minimal Repository */
  repository: MinimalRepository;

  /** @format date-time */
  created_at: string | null;

  /** @format date-time */
  updated_at: string | null;

  /** Simple Commit */
  head_commit: SimpleCommit;
  latest_check_runs_count: number;
  check_runs_url: string;
}

/**
 * Check suite configuration preferences for a repository.
 */
export interface CheckSuitePreference {
  preferences: { auto_trigger_checks?: { app_id: number; setting: boolean }[] };

  /** A git repository */
  repository: Repository;
}

/**
 * State of a code scanning alert.
 */
export enum CodeScanningAlertState {
  Open = "open",
  Dismissed = "dismissed",
  Fixed = "fixed",
}

/**
 * The full Git reference, formatted as `refs/heads/<branch name>`.
 */
export type CodeScanningAlertRef = string;

/**
 * The security alert number.
 */
export type AlertNumber = number;

/**
 * The time that the alert was created in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
 * @format date-time
 */
export type AlertCreatedAt = string;

/**
 * The REST API URL of the alert resource.
 * @format uri
 */
export type AlertUrl = string;

/**
 * The GitHub URL of the alert resource.
 * @format uri
 */
export type AlertHtmlUrl = string;

/**
 * The time that the alert was dismissed in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
 * @format date-time
 */
export type CodeScanningAlertDismissedAt = string | null;

/**
 * **Required when the state is dismissed.** The reason for dismissing or closing the alert. Can be one of: `false positive`, `won't fix`, and `used in tests`.
 */
export type CodeScanningAlertDismissedReason = "false positive" | "won't fix" | "used in tests" | null;

export interface CodeScanningAlertRule {
  /** A unique identifier for the rule used to detect the alert. */
  id?: string | null;

  /** The severity of the alert. */
  severity?: "none" | "note" | "warning" | "error" | null;

  /** A short description of the rule used to detect the alert. */
  description?: string;
}

/**
 * The name of the tool used to generate the code scanning analysis alert.
 */
export type CodeScanningAnalysisToolName = string;

export interface CodeScanningAnalysisTool {
  /** The name of the tool used to generate the code scanning analysis alert. */
  name?: CodeScanningAnalysisToolName;

  /** The version of the tool used to detect the alert. */
  version?: string | null;
}

export interface CodeScanningAlertCodeScanningAlertItems {
  /** The security alert number. */
  number: AlertNumber;

  /** The time that the alert was created in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`. */
  created_at: AlertCreatedAt;

  /** The REST API URL of the alert resource. */
  url: AlertUrl;

  /** The GitHub URL of the alert resource. */
  html_url: AlertHtmlUrl;

  /** State of a code scanning alert. */
  state: CodeScanningAlertState;

  /** Simple User */
  dismissed_by: SimpleUser;

  /** The time that the alert was dismissed in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`. */
  dismissed_at: CodeScanningAlertDismissedAt;

  /** **Required when the state is dismissed.** The reason for dismissing or closing the alert. Can be one of: `false positive`, `won't fix`, and `used in tests`. */
  dismissed_reason: CodeScanningAlertDismissedReason;
  rule: CodeScanningAlertRule;
  tool: CodeScanningAnalysisTool;
}

/**
 * Identifies the configuration under which the analysis was executed. For example, in GitHub Actions this includes the workflow filename and job name.
 */
export type CodeScanningAnalysisAnalysisKey = string;

/**
 * Identifies the variable values associated with the environment in which the analysis that generated this alert instance was performed, such as the language that was analyzed.
 */
export type CodeScanningAlertEnvironment = string;

export type CodeScanningAlertInstances = {
  ref?: CodeScanningAlertRef;
  analysis_key?: CodeScanningAnalysisAnalysisKey;
  environment?: CodeScanningAlertEnvironment;
  matrix_vars?: string | null;
  state?: CodeScanningAlertState;
}[];

export interface CodeScanningAlertCodeScanningAlert {
  /** The security alert number. */
  number: AlertNumber;

  /** The time that the alert was created in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`. */
  created_at: AlertCreatedAt;

  /** The REST API URL of the alert resource. */
  url: AlertUrl;

  /** The GitHub URL of the alert resource. */
  html_url: AlertHtmlUrl;
  instances: CodeScanningAlertInstances;

  /** State of a code scanning alert. */
  state: CodeScanningAlertState;

  /** Simple User */
  dismissed_by: SimpleUser;

  /** The time that the alert was dismissed in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`. */
  dismissed_at: CodeScanningAlertDismissedAt;

  /** **Required when the state is dismissed.** The reason for dismissing or closing the alert. Can be one of: `false positive`, `won't fix`, and `used in tests`. */
  dismissed_reason: CodeScanningAlertDismissedReason;
  rule: CodeScanningAlertRule;
  tool: CodeScanningAnalysisTool;
}

/**
 * Sets the state of the code scanning alert. Can be one of `open` or `dismissed`. You must provide `dismissed_reason` when you set the state to `dismissed`.
 */
export enum CodeScanningAlertSetState {
  Open = "open",
  Dismissed = "dismissed",
}

/**
 * The full Git reference of the code scanning analysis file, formatted as `refs/heads/<branch name>`.
 */
export type CodeScanningAnalysisRef = string;

/**
 * The commit SHA of the code scanning analysis file.
 * @pattern ^[0-9a-fA-F]+$
 */
export type CodeScanningAnalysisCommitSha = string;

/**
 * The time that the analysis was created in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
 * @format date-time
 */
export type CodeScanningAnalysisCreatedAt = string;

/**
 * Identifies the variable values associated with the environment in which this analysis was performed.
 */
export type CodeScanningAnalysisEnvironment = string;

export interface CodeScanningAnalysisCodeScanningAnalysis {
  /** The commit SHA of the code scanning analysis file. */
  commit_sha: CodeScanningAnalysisCommitSha;

  /** The full Git reference of the code scanning analysis file, formatted as `refs/heads/<branch name>`. */
  ref: CodeScanningAnalysisRef;

  /** Identifies the configuration under which the analysis was executed. For example, in GitHub Actions this includes the workflow filename and job name. */
  analysis_key: CodeScanningAnalysisAnalysisKey;

  /** The time that the analysis was created in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`. */
  created_at: CodeScanningAnalysisCreatedAt;

  /** The name of the tool used to generate the code scanning analysis alert. */
  tool_name: CodeScanningAnalysisToolName;

  /** @example error reading field xyz */
  error: string;

  /** Identifies the variable values associated with the environment in which this analysis was performed. */
  environment: CodeScanningAnalysisEnvironment;
}

/**
 * A Base64 string representing the SARIF file to upload. You must first compress your SARIF file using [`gzip`](http://www.gnu.org/software/gzip/manual/gzip.html) and then translate the contents of the file into a Base64 encoding string.
 */
export type CodeScanningAnalysisSarifFile = string;

/**
 * Collaborator
 */
export interface Collaborator {
  /** @example octocat */
  login: string;

  /** @example 1 */
  id: number;

  /** @example MDQ6VXNlcjE= */
  node_id: string;

  /**
   * @format uri
   * @example https://github.com/images/error/octocat_happy.gif
   */
  avatar_url: string;

  /** @example 41d064eb2195891e12d0413f63227ea7 */
  gravatar_id: string | null;

  /**
   * @format uri
   * @example https://api.github.com/users/octocat
   */
  url: string;

  /**
   * @format uri
   * @example https://github.com/octocat
   */
  html_url: string;

  /**
   * @format uri
   * @example https://api.github.com/users/octocat/followers
   */
  followers_url: string;

  /** @example https://api.github.com/users/octocat/following{/other_user} */
  following_url: string;

  /** @example https://api.github.com/users/octocat/gists{/gist_id} */
  gists_url: string;

  /** @example https://api.github.com/users/octocat/starred{/owner}{/repo} */
  starred_url: string;

  /**
   * @format uri
   * @example https://api.github.com/users/octocat/subscriptions
   */
  subscriptions_url: string;

  /**
   * @format uri
   * @example https://api.github.com/users/octocat/orgs
   */
  organizations_url: string;

  /**
   * @format uri
   * @example https://api.github.com/users/octocat/repos
   */
  repos_url: string;

  /** @example https://api.github.com/users/octocat/events{/privacy} */
  events_url: string;

  /**
   * @format uri
   * @example https://api.github.com/users/octocat/received_events
   */
  received_events_url: string;

  /** @example User */
  type: string;
  site_admin: boolean;
  permissions?: { pull: boolean; push: boolean; admin: boolean };
}

/**
 * Repository invitations let you manage who you collaborate with.
 */
export interface RepositoryInvitation {
  /**
   * Unique identifier of the repository invitation.
   * @example 42
   */
  id: number;

  /** Minimal Repository */
  repository: MinimalRepository;
  invitee: SimpleUser | null;
  inviter: SimpleUser | null;

  /**
   * The permission associated with the invitation.
   * @example read
   */
  permissions: "read" | "write" | "admin";

  /**
   * @format date-time
   * @example 2016-06-13T14:52:50-05:00
   */
  created_at: string;

  /** Whether or not the invitation has expired */
  expired?: boolean;

  /**
   * URL for the repository invitation
   * @example https://api.github.com/user/repository-invitations/1
   */
  url: string;

  /** @example https://github.com/octocat/Hello-World/invitations */
  html_url: string;
  node_id: string;
}

/**
 * Commit Comment
 */
export interface CommitComment {
  /** @format uri */
  html_url: string;

  /** @format uri */
  url: string;
  id: number;
  node_id: string;
  body: string;
  path: string | null;
  position: number | null;
  line: number | null;
  commit_id: string;
  user: SimpleUser | null;

  /** @format date-time */
  created_at: string;

  /** @format date-time */
  updated_at: string;

  /** How the author is associated with the repository. */
  author_association: AuthorAssociation;
  reactions?: ReactionRollup;
}

/**
 * Scim Error
 */
export interface ScimError {
  message?: string | null;
  documentation_url?: string | null;
  detail?: string | null;
  status?: number;
  scimType?: string | null;
  schemas?: string[];
}

/**
 * Branch Short
 */
export interface BranchShort {
  name: string;
  commit: { sha: string; url: string };
  protected: boolean;
}

/**
 * Hypermedia Link
 */
export interface Link {
  href: string;
}

/**
 * The status of auto merging a pull request.
 */
export interface AutoMerge {
  /** Simple User */
  enabled_by: SimpleUser;

  /** The merge method to use. */
  merge_method: "merge" | "squash" | "rebase";

  /** Title for the merge commit message. */
  commit_title: string;

  /** Commit message for the merge commit. */
  commit_message: string;
}

/**
 * Pull Request Simple
 */
export interface PullRequestSimple {
  /**
   * @format uri
   * @example https://api.github.com/repos/octocat/Hello-World/pulls/1347
   */
  url: string;

  /** @example 1 */
  id: number;

  /** @example MDExOlB1bGxSZXF1ZXN0MQ== */
  node_id: string;

  /**
   * @format uri
   * @example https://github.com/octocat/Hello-World/pull/1347
   */
  html_url: string;

  /**
   * @format uri
   * @example https://github.com/octocat/Hello-World/pull/1347.diff
   */
  diff_url: string;

  /**
   * @format uri
   * @example https://github.com/octocat/Hello-World/pull/1347.patch
   */
  patch_url: string;

  /**
   * @format uri
   * @example https://api.github.com/repos/octocat/Hello-World/issues/1347
   */
  issue_url: string;

  /**
   * @format uri
   * @example https://api.github.com/repos/octocat/Hello-World/pulls/1347/commits
   */
  commits_url: string;

  /**
   * @format uri
   * @example https://api.github.com/repos/octocat/Hello-World/pulls/1347/comments
   */
  review_comments_url: string;

  /** @example https://api.github.com/repos/octocat/Hello-World/pulls/comments{/number} */
  review_comment_url: string;

  /**
   * @format uri
   * @example https://api.github.com/repos/octocat/Hello-World/issues/1347/comments
   */
  comments_url: string;

  /**
   * @format uri
   * @example https://api.github.com/repos/octocat/Hello-World/statuses/6dcb09b5b57875f334f61aebed695e2e4193db5e
   */
  statuses_url: string;

  /** @example 1347 */
  number: number;

  /** @example open */
  state: string;

  /** @example true */
  locked: boolean;

  /** @example new-feature */
  title: string;
  user: SimpleUser | null;

  /** @example Please pull these awesome changes */
  body: string | null;
  labels: {
    id?: number;
    node_id?: string;
    url?: string;
    name?: string;
    description?: string;
    color?: string;
    default?: boolean;
  }[];
  milestone: Milestone | null;

  /** @example too heated */
  active_lock_reason?: string | null;

  /**
   * @format date-time
   * @example 2011-01-26T19:01:12Z
   */
  created_at: string;

  /**
   * @format date-time
   * @example 2011-01-26T19:01:12Z
   */
  updated_at: string;

  /**
   * @format date-time
   * @example 2011-01-26T19:01:12Z
   */
  closed_at: string | null;

  /**
   * @format date-time
   * @example 2011-01-26T19:01:12Z
   */
  merged_at: string | null;

  /** @example e5bd3914e2e596debea16f433f57875b5b90bcd6 */
  merge_commit_sha: string | null;
  assignee: SimpleUser | null;
  assignees?: SimpleUser[] | null;
  requested_reviewers?: SimpleUser[] | null;
  requested_teams?: TeamSimple[] | null;
  head: { label: string; ref: string; repo: Repository; sha: string; user: SimpleUser | null };
  base: { label: string; ref: string; repo: Repository; sha: string; user: SimpleUser | null };
  _links: {
    comments: Link;
    commits: Link;
    statuses: Link;
    html: Link;
    issue: Link;
    review_comments: Link;
    review_comment: Link;
    self: Link;
  };

  /** How the author is associated with the repository. */
  author_association: AuthorAssociation;

  /** The status of auto merging a pull request. */
  auto_merge: AutoMerge;

  /**
   * Indicates whether or not the pull request is a draft.
   * @example false
   */
  draft?: boolean;
}

export interface SimpleCommitStatus {
  description: string | null;
  id: number;
  node_id: string;
  state: string;
  context: string;

  /** @format uri */
  target_url: string;
  required?: boolean | null;

  /** @format uri */
  avatar_url: string | null;

  /** @format uri */
  url: string;

  /** @format date-time */
  created_at: string;

  /** @format date-time */
  updated_at: string;
}

/**
 * Combined Commit Status
 */
export interface CombinedCommitStatus {
  state: string;
  statuses: SimpleCommitStatus[];
  sha: string;
  total_count: number;

  /** Minimal Repository */
  repository: MinimalRepository;

  /** @format uri */
  commit_url: string;

  /** @format uri */
  url: string;
}

/**
 * The status of a commit.
 */
export interface Status {
  url: string;
  avatar_url: string | null;
  id: number;
  node_id: string;
  state: string;
  description: string;
  target_url: string;
  context: string;
  created_at: string;
  updated_at: string;

  /** Simple User */
  creator: SimpleUser;
}

/**
 * Code of Conduct Simple
 */
export interface CodeOfConductSimple {
  /**
   * @format uri
   * @example https://api.github.com/codes_of_conduct/citizen_code_of_conduct
   */
  url: string;

  /** @example citizen_code_of_conduct */
  key: string;

  /** @example Citizen Code of Conduct */
  name: string;

  /** @format uri */
  html_url: string | null;
}

export interface CommunityHealthFile {
  /** @format uri */
  url: string;

  /** @format uri */
  html_url: string;
}

/**
 * Community Profile
 */
export interface CommunityProfile {
  /** @example 100 */
  health_percentage: number;

  /** @example My first repository on GitHub! */
  description: string | null;

  /** @example example.com */
  documentation: string | null;
  files: {
    code_of_conduct: CodeOfConductSimple | null;
    license: LicenseSimple | null;
    contributing: CommunityHealthFile | null;
    readme: CommunityHealthFile | null;
    issue_template: CommunityHealthFile | null;
    pull_request_template: CommunityHealthFile | null;
  };

  /**
   * @format date-time
   * @example 2017-02-28T19:09:29Z
   */
  updated_at: string | null;

  /** @example true */
  content_reports_enabled?: boolean;
}

/**
 * Diff Entry
 */
export interface DiffEntry {
  /** @example bbcd538c8e72b8c175046e27cc8f907076331401 */
  sha: string;

  /** @example file1.txt */
  filename: string;

  /** @example added */
  status: string;

  /** @example 103 */
  additions: number;

  /** @example 21 */
  deletions: number;

  /** @example 124 */
  changes: number;

  /**
   * @format uri
   * @example https://github.com/octocat/Hello-World/blob/6dcb09b5b57875f334f61aebed695e2e4193db5e/file1.txt
   */
  blob_url: string;

  /**
   * @format uri
   * @example https://github.com/octocat/Hello-World/raw/6dcb09b5b57875f334f61aebed695e2e4193db5e/file1.txt
   */
  raw_url: string;

  /**
   * @format uri
   * @example https://api.github.com/repos/octocat/Hello-World/contents/file1.txt?ref=6dcb09b5b57875f334f61aebed695e2e4193db5e
   */
  contents_url: string;

  /** @example @@ -132,7 +132,7 @@ module Test @@ -1000,7 +1000,7 @@ module Test */
  patch?: string;

  /** @example file.txt */
  previous_filename?: string;
}

/**
 * Commit Comparison
 */
export interface CommitComparison {
  /**
   * @format uri
   * @example https://api.github.com/repos/octocat/Hello-World/compare/master...topic
   */
  url: string;

  /**
   * @format uri
   * @example https://github.com/octocat/Hello-World/compare/master...topic
   */
  html_url: string;

  /**
   * @format uri
   * @example https://github.com/octocat/Hello-World/compare/octocat:bbcd538c8e72b8c175046e27cc8f907076331401...octocat:0328041d1152db8ae77652d1618a02e57f745f17
   */
  permalink_url: string;

  /**
   * @format uri
   * @example https://github.com/octocat/Hello-World/compare/master...topic.diff
   */
  diff_url: string;

  /**
   * @format uri
   * @example https://github.com/octocat/Hello-World/compare/master...topic.patch
   */
  patch_url: string;

  /** Commit */
  base_commit: Commit;

  /** Commit */
  merge_base_commit: Commit;

  /** @example ahead */
  status: "diverged" | "ahead" | "behind" | "identical";

  /** @example 4 */
  ahead_by: number;

  /** @example 5 */
  behind_by: number;

  /** @example 6 */
  total_commits: number;
  commits: Commit[];
  files: DiffEntry[];
}

/**
 * Content Tree
 */
export interface ContentTree {
  type: string;
  size: number;
  name: string;
  path: string;
  sha: string;

  /** @format uri */
  url: string;

  /** @format uri */
  git_url: string | null;

  /** @format uri */
  html_url: string | null;

  /** @format uri */
  download_url: string | null;
  entries?: {
    type: string;
    size: number;
    name: string;
    path: string;
    content?: string;
    sha: string;
    url: string;
    git_url: string | null;
    html_url: string | null;
    download_url: string | null;
    _links: { git: string | null; html: string | null; self: string };
  }[];
  _links: { git: string | null; html: string | null; self: string };
}

/**
 * A list of directory items
 */
export type ContentDirectory = {
  type: string;
  size: number;
  name: string;
  path: string;
  content?: string;
  sha: string;
  url: string;
  git_url: string | null;
  html_url: string | null;
  download_url: string | null;
  _links: { git: string | null; html: string | null; self: string };
}[];

/**
 * Content File
 */
export interface ContentFile {
  type: string;
  encoding: string;
  size: number;
  name: string;
  path: string;
  content: string;
  sha: string;

  /** @format uri */
  url: string;

  /** @format uri */
  git_url: string | null;

  /** @format uri */
  html_url: string | null;

  /** @format uri */
  download_url: string | null;
  _links: { git: string | null; html: string | null; self: string };

  /** @example "actual/actual.md" */
  target?: string;

  /** @example "git://example.com/defunkt/dotjs.git" */
  submodule_git_url?: string;
}

/**
 * An object describing a symlink
 */
export interface ContentSymlink {
  type: string;
  target: string;
  size: number;
  name: string;
  path: string;
  sha: string;

  /** @format uri */
  url: string;

  /** @format uri */
  git_url: string | null;

  /** @format uri */
  html_url: string | null;

  /** @format uri */
  download_url: string | null;
  _links: { git: string | null; html: string | null; self: string };
}

/**
 * An object describing a symlink
 */
export interface ContentSubmodule {
  type: string;

  /** @format uri */
  submodule_git_url: string;
  size: number;
  name: string;
  path: string;
  sha: string;

  /** @format uri */
  url: string;

  /** @format uri */
  git_url: string | null;

  /** @format uri */
  html_url: string | null;

  /** @format uri */
  download_url: string | null;
  _links: { git: string | null; html: string | null; self: string };
}

/**
 * File Commit
 */
export interface FileCommit {
  content: {
    name?: string;
    path?: string;
    sha?: string;
    size?: number;
    url?: string;
    html_url?: string;
    git_url?: string;
    download_url?: string;
    type?: string;
    _links?: { self?: string; git?: string; html?: string };
  };
  commit: {
    sha?: string;
    node_id?: string;
    url?: string;
    html_url?: string;
    author?: { date?: string; name?: string; email?: string };
    committer?: { date?: string; name?: string; email?: string };
    message?: string;
    tree?: { url?: string; sha?: string };
    parents?: { url?: string; html_url?: string; sha?: string }[];
    verification?: { verified?: boolean; reason?: string; signature?: string | null; payload?: string | null };
  };
}

/**
 * Contributor
 */
export interface Contributor {
  login?: string;
  id?: number;
  node_id?: string;

  /** @format uri */
  avatar_url?: string;
  gravatar_id?: string | null;

  /** @format uri */
  url?: string;

  /** @format uri */
  html_url?: string;

  /** @format uri */
  followers_url?: string;
  following_url?: string;
  gists_url?: string;
  starred_url?: string;

  /** @format uri */
  subscriptions_url?: string;

  /** @format uri */
  organizations_url?: string;

  /** @format uri */
  repos_url?: string;
  events_url?: string;

  /** @format uri */
  received_events_url?: string;
  type: string;
  site_admin?: boolean;
  contributions: number;
  email?: string;
  name?: string;
}

/**
 * A request for a specific ref(branch,sha,tag) to be deployed
 */
export interface Deployment {
  /**
   * @format uri
   * @example https://api.github.com/repos/octocat/example/deployments/1
   */
  url: string;

  /**
   * Unique identifier of the deployment
   * @example 42
   */
  id: number;

  /** @example MDEwOkRlcGxveW1lbnQx */
  node_id: string;

  /** @example a84d88e7554fc1fa21bcbc4efae3c782a70d2b9d */
  sha: string;

  /**
   * The ref to deploy. This can be a branch, tag, or sha.
   * @example topic-branch
   */
  ref: string;

  /**
   * Parameter to specify a task to execute
   * @example deploy
   */
  task: string;
  payload: object;

  /** @example staging */
  original_environment?: string;

  /**
   * Name for the target deployment environment.
   * @example production
   */
  environment: string;

  /** @example Deploy request from hubot */
  description: string | null;
  creator: SimpleUser | null;

  /**
   * @format date-time
   * @example 2012-07-20T01:19:13Z
   */
  created_at: string;

  /**
   * @format date-time
   * @example 2012-07-20T01:19:13Z
   */
  updated_at: string;

  /**
   * @format uri
   * @example https://api.github.com/repos/octocat/example/deployments/1/statuses
   */
  statuses_url: string;

  /**
   * @format uri
   * @example https://api.github.com/repos/octocat/example
   */
  repository_url: string;

  /**
   * Specifies if the given environment is will no longer exist at some point in the future. Default: false.
   * @example true
   */
  transient_environment?: boolean;

  /**
   * Specifies if the given environment is one that end-users directly interact with. Default: false.
   * @example true
   */
  production_environment?: boolean;
  performed_via_github_app?: Integration | null;
}

/**
 * The status of a deployment.
 */
export interface DeploymentStatus {
  /**
   * @format uri
   * @example https://api.github.com/repos/octocat/example/deployments/42/statuses/1
   */
  url: string;

  /** @example 1 */
  id: number;

  /** @example MDE2OkRlcGxveW1lbnRTdGF0dXMx */
  node_id: string;

  /**
   * The state of the status.
   * @example success
   */
  state: "error" | "failure" | "inactive" | "pending" | "success" | "queued" | "in_progress";
  creator: SimpleUser | null;

  /**
   * A short description of the status.
   * @example Deployment finished successfully.
   */
  description: string;

  /**
   * The environment of the deployment that the status is for.
   * @example production
   */
  environment?: string;

  /**
   * Deprecated: the URL to associate with this status.
   * @format uri
   * @example https://example.com/deployment/42/output
   */
  target_url: string;

  /**
   * @format date-time
   * @example 2012-07-20T01:19:13Z
   */
  created_at: string;

  /**
   * @format date-time
   * @example 2012-07-20T01:19:13Z
   */
  updated_at: string;

  /**
   * @format uri
   * @example https://api.github.com/repos/octocat/example/deployments/42
   */
  deployment_url: string;

  /**
   * @format uri
   * @example https://api.github.com/repos/octocat/example
   */
  repository_url: string;

  /**
   * The URL for accessing your environment.
   * @format uri
   * @example https://staging.example.com/
   */
  environment_url?: string;

  /**
   * The URL to associate with this status.
   * @format uri
   * @example https://example.com/deployment/42/output
   */
  log_url?: string;
  performed_via_github_app?: Integration | null;
}

/**
 * Short Blob
 */
export interface ShortBlob {
  url: string;
  sha: string;
}

/**
 * Blob
 */
export interface Blob {
  content: string;
  encoding: string;

  /** @format uri */
  url: string;
  sha: string;
  size: number | null;
  node_id: string;
  highlighted_content?: string;
}

/**
 * Low-level Git commit operations within a repository
 */
export interface GitCommit {
  /**
   * SHA for the commit
   * @example 7638417db6d59f3c431d3e1f261cc637155684cd
   */
  sha: string;
  node_id: string;

  /** @format uri */
  url: string;

  /** Identifying information for the git-user */
  author: { date: string; email: string; name: string };

  /** Identifying information for the git-user */
  committer: { date: string; email: string; name: string };

  /**
   * Message describing the purpose of the commit
   * @example Fix #42
   */
  message: string;
  tree: { sha: string; url: string };
  parents: { sha: string; url: string; html_url: string }[];
  verification: { verified: boolean; reason: string; signature: string | null; payload: string | null };

  /** @format uri */
  html_url: string;
}

/**
 * Git references within a repository
 */
export interface GitRef {
  ref: string;
  node_id: string;

  /** @format uri */
  url: string;
  object: { type: string; sha: string; url: string };
}

/**
 * Metadata for a Git tag
 */
export interface GitTag {
  /** @example MDM6VGFnOTQwYmQzMzYyNDhlZmFlMGY5ZWU1YmM3YjJkNWM5ODU4ODdiMTZhYw== */
  node_id: string;

  /**
   * Name of the tag
   * @example v0.0.1
   */
  tag: string;

  /** @example 940bd336248efae0f9ee5bc7b2d5c985887b16ac */
  sha: string;

  /**
   * URL for the tag
   * @format uri
   * @example https://api.github.com/repositories/42/git/tags/940bd336248efae0f9ee5bc7b2d5c985887b16ac
   */
  url: string;

  /**
   * Message describing the purpose of the tag
   * @example Initial public release
   */
  message: string;
  tagger: { date: string; email: string; name: string };
  object: { sha: string; type: string; url: string };
  verification?: Verification;
}

/**
 * The hierarchy between files in a Git repository.
 */
export interface GitTree {
  sha: string;

  /** @format uri */
  url: string;
  truncated: boolean;

  /**
   * Objects specifying a tree structure
   * @example [{"path":"file.rb","mode":"100644","type":"blob","size":30,"sha":"44b4fc6d56897b048c772eb4087f854f46256132","url":"https://api.github.com/repos/octocat/Hello-World/git/blobs/44b4fc6d56897b048c772eb4087f854f46256132","properties":{"path":{"type":"string"},"mode":{"type":"string"},"type":{"type":"string"},"size":{"type":"integer"},"sha":{"type":"string"},"url":{"type":"string"}},"required":["path","mode","type","sha","url","size"]}]
   */
  tree: { path?: string; mode?: string; type?: string; sha?: string; size?: number; url?: string }[];
}

export interface HookResponse {
  code: number | null;
  status: string | null;
  message: string | null;
}

/**
 * Webhooks for repositories.
 */
export interface Hook {
  type: string;

  /**
   * Unique identifier of the webhook.
   * @example 42
   */
  id: number;

  /**
   * The name of a valid service, use 'web' for a webhook.
   * @example web
   */
  name: string;

  /**
   * Determines whether the hook is actually triggered on pushes.
   * @example true
   */
  active: boolean;

  /**
   * Determines what events the hook is triggered for. Default: ['push'].
   * @example ["push","pull_request"]
   */
  events: string[];
  config: {
    email?: string;
    password?: string;
    room?: string;
    subdomain?: string;
    url?: WebhookConfigUrl;
    insecure_ssl?: WebhookConfigInsecureSsl;
    content_type?: WebhookConfigContentType;
    digest?: string;
    secret?: WebhookConfigSecret;
    token?: string;
  };

  /**
   * @format date-time
   * @example 2011-09-06T20:39:23Z
   */
  updated_at: string;

  /**
   * @format date-time
   * @example 2011-09-06T17:26:27Z
   */
  created_at: string;

  /**
   * @format uri
   * @example https://api.github.com/repos/octocat/Hello-World/hooks/1
   */
  url: string;

  /**
   * @format uri
   * @example https://api.github.com/repos/octocat/Hello-World/hooks/1/test
   */
  test_url: string;

  /**
   * @format uri
   * @example https://api.github.com/repos/octocat/Hello-World/hooks/1/pings
   */
  ping_url: string;
  last_response: HookResponse;
}

/**
 * A repository import from an external source.
 */
export interface Import {
  vcs: string | null;
  use_lfs?: string;

  /** The URL of the originating repository. */
  vcs_url: string;
  svc_root?: string;
  tfvc_project?: string;
  status:
    | "auth"
    | "error"
    | "none"
    | "detecting"
    | "choose"
    | "auth_failed"
    | "importing"
    | "mapping"
    | "waiting_to_push"
    | "pushing"
    | "complete"
    | "setup"
    | "unknown"
    | "detection_found_multiple"
    | "detection_found_nothing"
    | "detection_needs_auth";
  status_text?: string | null;
  failed_step?: string | null;
  error_message?: string | null;
  import_percent?: number | null;
  commit_count?: number | null;
  push_percent?: number | null;
  has_large_files?: boolean;
  large_files_size?: number;
  large_files_count?: number;
  project_choices?: { vcs?: string; tfvc_project?: string; human_name?: string }[];
  message?: string;
  authors_count?: number | null;

  /** @format uri */
  url: string;

  /** @format uri */
  html_url: string;

  /** @format uri */
  authors_url: string;

  /** @format uri */
  repository_url: string;
  svn_root?: string;
}

/**
 * Porter Author
 */
export interface PorterAuthor {
  id: number;
  remote_id: string;
  remote_name: string;
  email: string;
  name: string;

  /** @format uri */
  url: string;

  /** @format uri */
  import_url: string;
}

/**
 * Porter Large File
 */
export interface PorterLargeFile {
  ref_name: string;
  path: string;
  oid: string;
  size: number;
}

/**
 * Issue Event Label
 */
export interface IssueEventLabel {
  name: string | null;
  color: string | null;
}

export interface IssueEventDismissedReview {
  state: string;
  review_id: number;
  dismissal_message: string | null;
  dismissal_commit_id?: string | null;
}

/**
 * Issue Event Milestone
 */
export interface IssueEventMilestone {
  title: string;
}

/**
 * Issue Event Project Card
 */
export interface IssueEventProjectCard {
  /** @format uri */
  url: string;
  id: number;

  /** @format uri */
  project_url: string;
  project_id: number;
  column_name: string;
  previous_column_name?: string;
}

/**
 * Issue Event Rename
 */
export interface IssueEventRename {
  from: string;
  to: string;
}

/**
 * Issue Event
 */
export interface IssueEvent {
  /** @example 1 */
  id: number;

  /** @example MDEwOklzc3VlRXZlbnQx */
  node_id: string;

  /**
   * @format uri
   * @example https://api.github.com/repos/octocat/Hello-World/issues/events/1
   */
  url: string;
  actor: SimpleUser | null;

  /** @example closed */
  event: string;

  /** @example 6dcb09b5b57875f334f61aebed695e2e4193db5e */
  commit_id: string | null;

  /** @example https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e */
  commit_url: string | null;

  /**
   * @format date-time
   * @example 2011-04-14T16:00:49Z
   */
  created_at: string;

  /** Issue Simple */
  issue?: IssueSimple;

  /** Issue Event Label */
  label?: IssueEventLabel;
  assignee?: SimpleUser | null;
  assigner?: SimpleUser | null;
  review_requester?: SimpleUser | null;
  requested_reviewer?: SimpleUser | null;

  /** Groups of organization members that gives permissions on specified repositories. */
  requested_team?: Team;
  dismissed_review?: IssueEventDismissedReview;

  /** Issue Event Milestone */
  milestone?: IssueEventMilestone;

  /** Issue Event Project Card */
  project_card?: IssueEventProjectCard;

  /** Issue Event Rename */
  rename?: IssueEventRename;

  /** How the author is associated with the repository. */
  author_association?: AuthorAssociation;
  lock_reason?: string | null;
}

/**
 * Issue Event for Issue
 */
export interface IssueEventForIssue {
  id?: number;
  node_id?: string;
  url?: string;

  /** Simple User */
  actor?: SimpleUser;
  event?: string;
  commit_id?: string | null;
  commit_url?: string | null;
  created_at?: string;

  /** @example "480d4f47447129f015cb327536c522ca683939a1" */
  sha?: string;

  /** @example "https://github.com/owner-3906e11a33a3d55ba449d63f/BBB_Private_Repo/commit/480d4f47447129f015cb327536c522ca683939a1" */
  html_url?: string;

  /** @example "add a bunch of files" */
  message?: string;

  /** @example "https://api.github.com/repos/owner-3906e11a33a3d55ba449d63f/AAA_Public_Repo/issues/1" */
  issue_url?: string;

  /** @example "2020-07-09T00:17:36Z" */
  updated_at?: string;

  /** How the author is associated with the repository. */
  author_association?: AuthorAssociation;

  /** @example ":+1:" */
  body?: string;

  /** @example "off-topic" */
  lock_reason?: string;

  /** @example "2020-07-09T00:17:51Z" */
  submitted_at?: string;

  /** @example "commented" */
  state?: string;

  /** @example "https://api.github.com/repos/owner-3906e11a33a3d55ba449d63f/AAA_Public_Repo/pulls/2" */
  pull_request_url?: string;

  /** @example "<p>Accusantium fugiat cumque. Autem qui nostrum. Atque quae ullam.</p>" */
  body_html?: string;

  /** @example "Accusantium fugiat cumque. Autem qui nostrum. Atque quae ullam." */
  body_text?: string;
}

/**
 * An SSH key granting access to a single repository.
 */
export interface DeployKey {
  id: number;
  key: string;
  url: string;
  title: string;
  verified: boolean;
  created_at: string;
  read_only: boolean;
}

/**
 * Language
 */
export type Language = Record<string, number>;

/**
 * License Content
 */
export interface LicenseContent {
  name: string;
  path: string;
  sha: string;
  size: number;

  /** @format uri */
  url: string;

  /** @format uri */
  html_url: string | null;

  /** @format uri */
  git_url: string | null;

  /** @format uri */
  download_url: string | null;
  type: string;
  content: string;
  encoding: string;
  _links: { git: string | null; html: string | null; self: string };
  license: LicenseSimple | null;
}

export interface PagesSourceHash {
  branch: string;
  path: string;
}

/**
 * The configuration for GitHub Pages for a repository.
 */
export interface Page {
  /**
   * The API address for accessing this Page resource.
   * @format uri
   * @example https://api.github.com/repos/github/hello-world/pages
   */
  url: string;

  /**
   * The status of the most recent build of the Page.
   * @example built
   */
  status: "built" | "building" | "errored" | null;

  /**
   * The Pages site's custom domain
   * @example example.com
   */
  cname: string | null;

  /**
   * Whether the Page has a custom 404 page.
   * @example false
   */
  custom_404: boolean;

  /**
   * The web address the Page can be accessed from.
   * @format uri
   * @example https://example.com
   */
  html_url?: string;
  source?: PagesSourceHash;

  /**
   * Whether the GitHub Pages site is publicly visible. If set to `true`, the site is accessible to anyone on the internet. If set to `false`, the site will only be accessible to users who have at least `read` access to the repository that published the site.
   * @example true
   */
  public: boolean;
}

/**
 * Page Build
 */
export interface PageBuild {
  /** @format uri */
  url: string;
  status: string;
  error: { message: string | null };
  pusher: SimpleUser | null;
  commit: string;
  duration: number;

  /** @format date-time */
  created_at: string;

  /** @format date-time */
  updated_at: string;
}

/**
 * Page Build Status
 */
export interface PageBuildStatus {
  /**
   * @format uri
   * @example https://api.github.com/repos/github/hello-world/pages/builds/latest
   */
  url: string;

  /** @example queued */
  status: string;
}

/**
 * Pull requests let you tell others about changes you've pushed to a repository on GitHub. Once a pull request is sent, interested parties can review the set of changes, discuss potential modifications, and even push follow-up commits if necessary.
 */
export interface PullRequest {
  /**
   * @format uri
   * @example https://api.github.com/repos/octocat/Hello-World/pulls/1347
   */
  url: string;

  /** @example 1 */
  id: number;

  /** @example MDExOlB1bGxSZXF1ZXN0MQ== */
  node_id: string;

  /**
   * @format uri
   * @example https://github.com/octocat/Hello-World/pull/1347
   */
  html_url: string;

  /**
   * @format uri
   * @example https://github.com/octocat/Hello-World/pull/1347.diff
   */
  diff_url: string;

  /**
   * @format uri
   * @example https://github.com/octocat/Hello-World/pull/1347.patch
   */
  patch_url: string;

  /**
   * @format uri
   * @example https://api.github.com/repos/octocat/Hello-World/issues/1347
   */
  issue_url: string;

  /**
   * @format uri
   * @example https://api.github.com/repos/octocat/Hello-World/pulls/1347/commits
   */
  commits_url: string;

  /**
   * @format uri
   * @example https://api.github.com/repos/octocat/Hello-World/pulls/1347/comments
   */
  review_comments_url: string;

  /** @example https://api.github.com/repos/octocat/Hello-World/pulls/comments{/number} */
  review_comment_url: string;

  /**
   * @format uri
   * @example https://api.github.com/repos/octocat/Hello-World/issues/1347/comments
   */
  comments_url: string;

  /**
   * @format uri
   * @example https://api.github.com/repos/octocat/Hello-World/statuses/6dcb09b5b57875f334f61aebed695e2e4193db5e
   */
  statuses_url: string;

  /**
   * Number uniquely identifying the pull request within its repository.
   * @example 42
   */
  number: number;

  /**
   * State of this Pull Request. Either `open` or `closed`.
   * @example open
   */
  state: "open" | "closed";

  /** @example true */
  locked: boolean;

  /**
   * The title of the pull request.
   * @example Amazing new feature
   */
  title: string;
  user: SimpleUser | null;

  /** @example Please pull these awesome changes */
  body: string | null;
  labels: {
    id?: number;
    node_id?: string;
    url?: string;
    name?: string;
    description?: string | null;
    color?: string;
    default?: boolean;
  }[];
  milestone: Milestone | null;

  /** @example too heated */
  active_lock_reason?: string | null;

  /**
   * @format date-time
   * @example 2011-01-26T19:01:12Z
   */
  created_at: string;

  /**
   * @format date-time
   * @example 2011-01-26T19:01:12Z
   */
  updated_at: string;

  /**
   * @format date-time
   * @example 2011-01-26T19:01:12Z
   */
  closed_at: string | null;

  /**
   * @format date-time
   * @example 2011-01-26T19:01:12Z
   */
  merged_at: string | null;

  /** @example e5bd3914e2e596debea16f433f57875b5b90bcd6 */
  merge_commit_sha: string | null;
  assignee: SimpleUser | null;
  assignees?: SimpleUser[] | null;
  requested_reviewers?: SimpleUser[] | null;
  requested_teams?: TeamSimple[] | null;
  head: {
    label: string;
    ref: string;
    repo: {
      archive_url: string;
      assignees_url: string;
      blobs_url: string;
      branches_url: string;
      collaborators_url: string;
      comments_url: string;
      commits_url: string;
      compare_url: string;
      contents_url: string;
      contributors_url: string;
      deployments_url: string;
      description: string | null;
      downloads_url: string;
      events_url: string;
      fork: boolean;
      forks_url: string;
      full_name: string;
      git_commits_url: string;
      git_refs_url: string;
      git_tags_url: string;
      hooks_url: string;
      html_url: string;
      id: number;
      node_id: string;
      issue_comment_url: string;
      issue_events_url: string;
      issues_url: string;
      keys_url: string;
      labels_url: string;
      languages_url: string;
      merges_url: string;
      milestones_url: string;
      name: string;
      notifications_url: string;
      owner: {
        avatar_url: string;
        events_url: string;
        followers_url: string;
        following_url: string;
        gists_url: string;
        gravatar_id: string | null;
        html_url: string;
        id: number;
        node_id: string;
        login: string;
        organizations_url: string;
        received_events_url: string;
        repos_url: string;
        site_admin: boolean;
        starred_url: string;
        subscriptions_url: string;
        type: string;
        url: string;
      };
      private: boolean;
      pulls_url: string;
      releases_url: string;
      stargazers_url: string;
      statuses_url: string;
      subscribers_url: string;
      subscription_url: string;
      tags_url: string;
      teams_url: string;
      trees_url: string;
      url: string;
      clone_url: string;
      default_branch: string;
      forks: number;
      forks_count: number;
      git_url: string;
      has_downloads: boolean;
      has_issues: boolean;
      has_projects: boolean;
      has_wiki: boolean;
      has_pages: boolean;
      homepage: string | null;
      language: string | null;
      master_branch?: string;
      archived: boolean;
      disabled: boolean;
      mirror_url: string | null;
      open_issues: number;
      open_issues_count: number;
      permissions?: { admin: boolean; pull: boolean; push: boolean };
      temp_clone_token?: string;
      allow_merge_commit?: boolean;
      allow_squash_merge?: boolean;
      allow_rebase_merge?: boolean;
      license: { key: string; name: string; url: string | null; spdx_id: string | null; node_id: string };
      pushed_at: string;
      size: number;
      ssh_url: string;
      stargazers_count: number;
      svn_url: string;
      topics?: string[];
      watchers: number;
      watchers_count: number;
      created_at: string;
      updated_at: string;
    };
    sha: string;
    user: {
      avatar_url: string;
      events_url: string;
      followers_url: string;
      following_url: string;
      gists_url: string;
      gravatar_id: string | null;
      html_url: string;
      id: number;
      node_id: string;
      login: string;
      organizations_url: string;
      received_events_url: string;
      repos_url: string;
      site_admin: boolean;
      starred_url: string;
      subscriptions_url: string;
      type: string;
      url: string;
    };
  };
  base: {
    label: string;
    ref: string;
    repo: {
      archive_url: string;
      assignees_url: string;
      blobs_url: string;
      branches_url: string;
      collaborators_url: string;
      comments_url: string;
      commits_url: string;
      compare_url: string;
      contents_url: string;
      contributors_url: string;
      deployments_url: string;
      description: string | null;
      downloads_url: string;
      events_url: string;
      fork: boolean;
      forks_url: string;
      full_name: string;
      git_commits_url: string;
      git_refs_url: string;
      git_tags_url: string;
      hooks_url: string;
      html_url: string;
      id: number;
      node_id: string;
      issue_comment_url: string;
      issue_events_url: string;
      issues_url: string;
      keys_url: string;
      labels_url: string;
      languages_url: string;
      merges_url: string;
      milestones_url: string;
      name: string;
      notifications_url: string;
      owner: {
        avatar_url: string;
        events_url: string;
        followers_url: string;
        following_url: string;
        gists_url: string;
        gravatar_id: string | null;
        html_url: string;
        id: number;
        node_id: string;
        login: string;
        organizations_url: string;
        received_events_url: string;
        repos_url: string;
        site_admin: boolean;
        starred_url: string;
        subscriptions_url: string;
        type: string;
        url: string;
      };
      private: boolean;
      pulls_url: string;
      releases_url: string;
      stargazers_url: string;
      statuses_url: string;
      subscribers_url: string;
      subscription_url: string;
      tags_url: string;
      teams_url: string;
      trees_url: string;
      url: string;
      clone_url: string;
      default_branch: string;
      forks: number;
      forks_count: number;
      git_url: string;
      has_downloads: boolean;
      has_issues: boolean;
      has_projects: boolean;
      has_wiki: boolean;
      has_pages: boolean;
      homepage: string | null;
      language: string | null;
      master_branch?: string;
      archived: boolean;
      disabled: boolean;
      mirror_url: string | null;
      open_issues: number;
      open_issues_count: number;
      permissions?: { admin: boolean; pull: boolean; push: boolean };
      temp_clone_token?: string;
      allow_merge_commit?: boolean;
      allow_squash_merge?: boolean;
      allow_rebase_merge?: boolean;
      license: LicenseSimple | null;
      pushed_at: string;
      size: number;
      ssh_url: string;
      stargazers_count: number;
      svn_url: string;
      topics?: string[];
      watchers: number;
      watchers_count: number;
      created_at: string;
      updated_at: string;
    };
    sha: string;
    user: {
      avatar_url: string;
      events_url: string;
      followers_url: string;
      following_url: string;
      gists_url: string;
      gravatar_id: string | null;
      html_url: string;
      id: number;
      node_id: string;
      login: string;
      organizations_url: string;
      received_events_url: string;
      repos_url: string;
      site_admin: boolean;
      starred_url: string;
      subscriptions_url: string;
      type: string;
      url: string;
    };
  };
  _links: {
    comments: Link;
    commits: Link;
    statuses: Link;
    html: Link;
    issue: Link;
    review_comments: Link;
    review_comment: Link;
    self: Link;
  };

  /** How the author is associated with the repository. */
  author_association: AuthorAssociation;

  /** The status of auto merging a pull request. */
  auto_merge: AutoMerge;

  /**
   * Indicates whether or not the pull request is a draft.
   * @example false
   */
  draft?: boolean;
  merged: boolean;

  /** @example true */
  mergeable: boolean | null;

  /** @example true */
  rebaseable?: boolean | null;

  /** @example clean */
  mergeable_state: string;
  merged_by: SimpleUser | null;

  /** @example 10 */
  comments: number;

  /** @example 0 */
  review_comments: number;

  /**
   * Indicates whether maintainers can modify the pull request.
   * @example true
   */
  maintainer_can_modify: boolean;

  /** @example 3 */
  commits: number;

  /** @example 100 */
  additions: number;

  /** @example 3 */
  deletions: number;

  /** @example 5 */
  changed_files: number;
}

/**
 * Pull Request Review Comments are comments on a portion of the Pull Request's diff.
 */
export interface PullRequestReviewComment {
  /**
   * URL for the pull request review comment
   * @example https://api.github.com/repos/octocat/Hello-World/pulls/comments/1
   */
  url: string;

  /**
   * The ID of the pull request review to which the comment belongs.
   * @example 42
   */
  pull_request_review_id: number | null;

  /**
   * The ID of the pull request review comment.
   * @example 1
   */
  id: number;

  /**
   * The node ID of the pull request review comment.
   * @example MDI0OlB1bGxSZXF1ZXN0UmV2aWV3Q29tbWVudDEw
   */
  node_id: string;

  /**
   * The diff of the line that the comment refers to.
   * @example @@ -16,33 +16,40 @@ public class Connection : IConnection...
   */
  diff_hunk: string;

  /**
   * The relative path of the file to which the comment applies.
   * @example config/database.yaml
   */
  path: string;

  /**
   * The line index in the diff to which the comment applies.
   * @example 1
   */
  position: number;

  /**
   * The index of the original line in the diff to which the comment applies.
   * @example 4
   */
  original_position: number;

  /**
   * The SHA of the commit to which the comment applies.
   * @example 6dcb09b5b57875f334f61aebed695e2e4193db5e
   */
  commit_id: string;

  /**
   * The SHA of the original commit to which the comment applies.
   * @example 9c48853fa3dc5c1c3d6f1f1cd1f2743e72652840
   */
  original_commit_id: string;

  /**
   * The comment ID to reply to.
   * @example 8
   */
  in_reply_to_id?: number;

  /** Simple User */
  user: SimpleUser;

  /**
   * The text of the comment.
   * @example We should probably include a check for null values here.
   */
  body: string;

  /**
   * @format date-time
   * @example 2011-04-14T16:00:49Z
   */
  created_at: string;

  /**
   * @format date-time
   * @example 2011-04-14T16:00:49Z
   */
  updated_at: string;

  /**
   * HTML URL for the pull request review comment.
   * @format uri
   * @example https://github.com/octocat/Hello-World/pull/1#discussion-diff-1
   */
  html_url: string;

  /**
   * URL for the pull request that the review comment belongs to.
   * @format uri
   * @example https://api.github.com/repos/octocat/Hello-World/pulls/1
   */
  pull_request_url: string;

  /** How the author is associated with the repository. */
  author_association: AuthorAssociation;
  _links: { self: { href: string }; html: { href: string }; pull_request: { href: string } };

  /**
   * The first line of the range for a multi-line comment.
   * @example 2
   */
  start_line?: number | null;

  /**
   * The first line of the range for a multi-line comment.
   * @example 2
   */
  original_start_line?: number | null;

  /** The side of the first line of the range for a multi-line comment. */
  start_side?: "LEFT" | "RIGHT" | null;

  /**
   * The line of the blob to which the comment applies. The last line of the range for a multi-line comment
   * @example 2
   */
  line?: number;

  /**
   * The line of the blob to which the comment applies. The last line of the range for a multi-line comment
   * @example 2
   */
  original_line?: number;

  /** The side of the diff to which the comment applies. The side of the last line of the range for a multi-line comment */
  side?: "LEFT" | "RIGHT";
  reactions?: ReactionRollup;

  /** @example "<p>comment body</p>" */
  body_html?: string;

  /** @example "comment body" */
  body_text?: string;
}

/**
 * Pull Request Merge Result
 */
export interface PullRequestMergeResult {
  sha: string;
  merged: boolean;
  message: string;
}

/**
 * Pull Request Review Request
 */
export interface PullRequestReviewRequest {
  users: SimpleUser[];
  teams: TeamSimple[];
}

/**
 * Pull Request Reviews are reviews on pull requests.
 */
export interface PullRequestReview {
  /**
   * Unique identifier of the review
   * @example 42
   */
  id: number;

  /** @example MDE3OlB1bGxSZXF1ZXN0UmV2aWV3ODA= */
  node_id: string;
  user: SimpleUser | null;

  /**
   * The text of the review.
   * @example This looks great.
   */
  body: string;

  /** @example CHANGES_REQUESTED */
  state: string;

  /**
   * @format uri
   * @example https://github.com/octocat/Hello-World/pull/12#pullrequestreview-80
   */
  html_url: string;

  /**
   * @format uri
   * @example https://api.github.com/repos/octocat/Hello-World/pulls/12
   */
  pull_request_url: string;
  _links: { html: { href: string }; pull_request: { href: string } };

  /** @format date-time */
  submitted_at?: string;

  /**
   * A commit SHA for the review.
   * @example 54bb654c9e6025347f57900a4a5c2313a96b8035
   */
  commit_id: string;
  body_html?: string;
  body_text?: string;

  /** How the author is associated with the repository. */
  author_association: AuthorAssociation;
}

/**
 * Legacy Review Comment
 */
export interface ReviewComment {
  /**
   * @format uri
   * @example https://api.github.com/repos/octocat/Hello-World/pulls/comments/1
   */
  url: string;

  /** @example 42 */
  pull_request_review_id: number | null;

  /** @example 10 */
  id: number;

  /** @example MDI0OlB1bGxSZXF1ZXN0UmV2aWV3Q29tbWVudDEw */
  node_id: string;

  /** @example @@ -16,33 +16,40 @@ public class Connection : IConnection... */
  diff_hunk: string;

  /** @example file1.txt */
  path: string;

  /** @example 1 */
  position: number | null;

  /** @example 4 */
  original_position: number;

  /** @example 6dcb09b5b57875f334f61aebed695e2e4193db5e */
  commit_id: string;

  /** @example 9c48853fa3dc5c1c3d6f1f1cd1f2743e72652840 */
  original_commit_id: string;

  /** @example 8 */
  in_reply_to_id?: number;
  user: SimpleUser | null;

  /** @example Great stuff */
  body: string;

  /**
   * @format date-time
   * @example 2011-04-14T16:00:49Z
   */
  created_at: string;

  /**
   * @format date-time
   * @example 2011-04-14T16:00:49Z
   */
  updated_at: string;

  /**
   * @format uri
   * @example https://github.com/octocat/Hello-World/pull/1#discussion-diff-1
   */
  html_url: string;

  /**
   * @format uri
   * @example https://api.github.com/repos/octocat/Hello-World/pulls/1
   */
  pull_request_url: string;

  /** How the author is associated with the repository. */
  author_association: AuthorAssociation;
  _links: { self: Link; html: Link; pull_request: Link };
  body_text?: string;
  body_html?: string;

  /** The side of the first line of the range for a multi-line comment. */
  side?: "LEFT" | "RIGHT";

  /** The side of the first line of the range for a multi-line comment. */
  start_side?: "LEFT" | "RIGHT" | null;

  /**
   * The line of the blob to which the comment applies. The last line of the range for a multi-line comment
   * @example 2
   */
  line?: number;

  /**
   * The original line of the blob to which the comment applies. The last line of the range for a multi-line comment
   * @example 2
   */
  original_line?: number;

  /**
   * The first line of the range for a multi-line comment.
   * @example 2
   */
  start_line?: number | null;

  /**
   * The original first line of the range for a multi-line comment.
   * @example 2
   */
  original_start_line?: number | null;
}

/**
 * Data related to a release.
 */
export interface ReleaseAsset {
  /** @format uri */
  url: string;

  /** @format uri */
  browser_download_url: string;
  id: number;
  node_id: string;

  /**
   * The file name of the asset.
   * @example Team Environment
   */
  name: string;
  label: string | null;

  /** State of the release asset. */
  state: "uploaded" | "open";
  content_type: string;
  size: number;
  download_count: number;

  /** @format date-time */
  created_at: string;

  /** @format date-time */
  updated_at: string;
  uploader: SimpleUser | null;
}

/**
 * A release.
 */
export interface Release {
  /** @format uri */
  url: string;

  /** @format uri */
  html_url: string;

  /** @format uri */
  assets_url: string;
  upload_url: string;

  /** @format uri */
  tarball_url: string | null;

  /** @format uri */
  zipball_url: string | null;
  id: number;
  node_id: string;

  /**
   * The name of the tag.
   * @example v1.0.0
   */
  tag_name: string;

  /**
   * Specifies the commitish value that determines where the Git tag is created from.
   * @example master
   */
  target_commitish: string;
  name: string | null;
  body?: string | null;

  /**
   * true to create a draft (unpublished) release, false to create a published one.
   * @example false
   */
  draft: boolean;

  /**
   * Whether to identify the release as a prerelease or a full release.
   * @example false
   */
  prerelease: boolean;

  /** @format date-time */
  created_at: string;

  /** @format date-time */
  published_at: string | null;

  /** Simple User */
  author: SimpleUser;
  assets: ReleaseAsset[];
  body_html?: string;
  body_text?: string;
}

/**
 * Sets the state of the secret scanning alert. Can be either `open` or `resolved`. You must provide `resolution` when you set the state to `resolved`.
 */
export enum SecretScanningAlertState {
  Open = "open",
  Resolved = "resolved",
}

/**
 * **Required when the `state` is `resolved`.** The reason for resolving the alert. Can be one of `false_positive`, `wont_fix`, `revoked`, or `used_in_tests`.
 */
export type SecretScanningAlertResolution = "false_positive" | "wont_fix" | "revoked" | "used_in_tests" | null;

export interface SecretScanningAlert {
  /** The security alert number. */
  number?: AlertNumber;

  /** The time that the alert was created in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`. */
  created_at?: AlertCreatedAt;

  /** The REST API URL of the alert resource. */
  url?: AlertUrl;

  /** The GitHub URL of the alert resource. */
  html_url?: AlertHtmlUrl;

  /** Sets the state of the secret scanning alert. Can be either `open` or `resolved`. You must provide `resolution` when you set the state to `resolved`. */
  state?: SecretScanningAlertState;

  /** **Required when the `state` is `resolved`.** The reason for resolving the alert. Can be one of `false_positive`, `wont_fix`, `revoked`, or `used_in_tests`. */
  resolution?: SecretScanningAlertResolution;

  /**
   * The time that the alert was resolved in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
   * @format date-time
   */
  resolved_at?: string | null;

  /** Simple User */
  resolved_by?: SimpleUser;

  /** The type of secret that secret scanning detected. */
  secret_type?: string;

  /** The secret that was detected. */
  secret?: string;
}

/**
 * Stargazer
 */
export interface Stargazer {
  /** @format date-time */
  starred_at: string;
  user: SimpleUser | null;
}

/**
 * Code Frequency Stat
 */
export type CodeFrequencyStat = number[];

/**
 * Commit Activity
 */
export interface CommitActivity {
  /** @example [0,3,26,20,39,1,0] */
  days: number[];

  /** @example 89 */
  total: number;

  /** @example 1336280400 */
  week: number;
}

/**
 * Contributor Activity
 */
export interface ContributorActivity {
  author: SimpleUser | null;

  /** @example 135 */
  total: number;

  /** @example [{"w":"1367712000","a":6898,"d":77,"c":10}] */
  weeks: { w?: string; a?: number; d?: number; c?: number }[];
}

export interface ParticipationStats {
  all: number[];
  owner: number[];
}

/**
 * Repository invitations let you manage who you collaborate with.
 */
export interface RepositorySubscription {
  /**
   * Determines if notifications should be received from this repository.
   * @example true
   */
  subscribed: boolean;

  /** Determines if all notifications should be blocked from this repository. */
  ignored: boolean;
  reason: string | null;

  /**
   * @format date-time
   * @example 2012-10-06T21:34:12Z
   */
  created_at: string;

  /**
   * @format uri
   * @example https://api.github.com/repos/octocat/example/subscription
   */
  url: string;

  /**
   * @format uri
   * @example https://api.github.com/repos/octocat/example
   */
  repository_url: string;
}

/**
 * Tag
 */
export interface Tag {
  /** @example v0.1 */
  name: string;
  commit: { sha: string; url: string };

  /**
   * @format uri
   * @example https://github.com/octocat/Hello-World/zipball/v0.1
   */
  zipball_url: string;

  /**
   * @format uri
   * @example https://github.com/octocat/Hello-World/tarball/v0.1
   */
  tarball_url: string;
  node_id: string;
}

/**
 * A topic aggregates entities that are related to a subject.
 */
export interface Topic {
  names: string[];
}

export interface Traffic {
  /** @format date-time */
  timestamp: string;
  uniques: number;
  count: number;
}

/**
 * Clone Traffic
 */
export interface CloneTraffic {
  /** @example 173 */
  count: number;

  /** @example 128 */
  uniques: number;
  clones: Traffic[];
}

/**
 * Content Traffic
 */
export interface ContentTraffic {
  /** @example /github/hubot */
  path: string;

  /** @example github/hubot: A customizable life embetterment robot. */
  title: string;

  /** @example 3542 */
  count: number;

  /** @example 2225 */
  uniques: number;
}

/**
 * Referrer Traffic
 */
export interface ReferrerTraffic {
  /** @example Google */
  referrer: string;

  /** @example 4 */
  count: number;

  /** @example 3 */
  uniques: number;
}

/**
 * View Traffic
 */
export interface ViewTraffic {
  /** @example 14850 */
  count: number;

  /** @example 3782 */
  uniques: number;
  views: Traffic[];
}

export interface ScimGroupListEnterprise {
  schemas: string[];
  totalResults: number;
  itemsPerPage: number;
  startIndex: number;
  Resources: {
    schemas: string[];
    id: string;
    externalId?: string | null;
    displayName?: string;
    members?: { value?: string; $ref?: string; display?: string }[];
    meta?: { resourceType?: string; created?: string; lastModified?: string; location?: string };
  }[];
}

export interface ScimEnterpriseGroup {
  schemas: string[];
  id: string;
  externalId?: string | null;
  displayName?: string;
  members?: { value?: string; $ref?: string; display?: string }[];
  meta?: { resourceType?: string; created?: string; lastModified?: string; location?: string };
}

export interface ScimUserListEnterprise {
  schemas: string[];
  totalResults: number;
  itemsPerPage: number;
  startIndex: number;
  Resources: {
    schemas: string[];
    id: string;
    externalId?: string;
    userName?: string;
    name?: { givenName?: string; familyName?: string };
    emails?: { value?: string; primary?: boolean; type?: string }[];
    groups?: { value?: string }[];
    active?: boolean;
    meta?: { resourceType?: string; created?: string; lastModified?: string; location?: string };
  }[];
}

export interface ScimEnterpriseUser {
  schemas: string[];
  id: string;
  externalId?: string;
  userName?: string;
  name?: { givenName?: string; familyName?: string };
  emails?: { value?: string; type?: string; primary?: boolean }[];
  groups?: { value?: string }[];
  active?: boolean;
  meta?: { resourceType?: string; created?: string; lastModified?: string; location?: string };
}

/**
 * SCIM /Users provisioning endpoints
 */
export interface ScimUser {
  /** SCIM schema used. */
  schemas: string[];

  /**
   * Unique identifier of an external identity
   * @example 1b78eada-9baa-11e6-9eb6-a431576d590e
   */
  id: string;

  /**
   * The ID of the User.
   * @example a7b0f98395
   */
  externalId: string | null;

  /**
   * Configured by the admin. Could be an email, login, or username
   * @example someone@example.com
   */
  userName: string | null;

  /**
   * The name of the user, suitable for display to end-users
   * @example Jon Doe
   */
  displayName?: string | null;

  /** @example {"givenName":"Jane","familyName":"User"} */
  name: { givenName: string | null; familyName: string | null; formatted?: string | null };

  /**
   * user emails
   * @example [{"value":"someone@example.com","primary":true},{"value":"another@example.com","primary":false}]
   */
  emails: { value: string; primary?: boolean }[];

  /**
   * The active status of the User.
   * @example true
   */
  active: boolean;
  meta: { resourceType?: string; created?: string; lastModified?: string; location?: string };

  /** The ID of the organization. */
  organization_id?: number;

  /**
   * Set of operations to be performed
   * @example [{"op":"replace","value":{"active":false}}]
   */
  operations?: { op: "add" | "remove" | "replace"; path?: string; value?: string | object | any[] }[];

  /** associated groups */
  groups?: { value?: string; display?: string }[];
}

/**
 * SCIM User List
 */
export interface ScimUserList {
  /** SCIM schema used. */
  schemas: string[];

  /** @example 3 */
  totalResults: number;

  /** @example 10 */
  itemsPerPage: number;

  /** @example 1 */
  startIndex: number;
  Resources: ScimUser[];
}

export type SearchResultTextMatches = {
  object_url?: string;
  object_type?: string | null;
  property?: string;
  fragment?: string;
  matches?: { text?: string; indices?: number[] }[];
}[];

/**
 * Code Search Result Item
 */
export interface CodeSearchResultItem {
  name: string;
  path: string;
  sha: string;

  /** @format uri */
  url: string;

  /** @format uri */
  git_url: string;

  /** @format uri */
  html_url: string;

  /** Minimal Repository */
  repository: MinimalRepository;
  score: number;
  file_size?: number;
  language?: string | null;

  /** @format date-time */
  last_modified_at?: string;

  /** @example ["73..77","77..78"] */
  line_numbers?: string[];
  text_matches?: SearchResultTextMatches;
}

/**
 * Commit Search Result Item
 */
export interface CommitSearchResultItem {
  /** @format uri */
  url: string;
  sha: string;

  /** @format uri */
  html_url: string;

  /** @format uri */
  comments_url: string;
  commit: {
    author: { name: string; email: string; date: string };
    committer: GitUser | null;
    comment_count: number;
    message: string;
    tree: { sha: string; url: string };
    url: string;
    verification?: Verification;
  };
  author: SimpleUser | null;
  committer: GitUser | null;
  parents: { url?: string; html_url?: string; sha?: string }[];

  /** Minimal Repository */
  repository: MinimalRepository;
  score: number;
  node_id: string;
  text_matches?: SearchResultTextMatches;
}

/**
 * Issue Search Result Item
 */
export interface IssueSearchResultItem {
  /** @format uri */
  url: string;

  /** @format uri */
  repository_url: string;
  labels_url: string;

  /** @format uri */
  comments_url: string;

  /** @format uri */
  events_url: string;

  /** @format uri */
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  locked: boolean;
  active_lock_reason?: string | null;
  assignees?: SimpleUser[] | null;
  user: SimpleUser | null;
  labels: {
    id?: number;
    node_id?: string;
    url?: string;
    name?: string;
    color?: string;
    default?: boolean;
    description?: string | null;
  }[];
  state: string;
  assignee: SimpleUser | null;
  milestone: Milestone | null;
  comments: number;

  /** @format date-time */
  created_at: string;

  /** @format date-time */
  updated_at: string;

  /** @format date-time */
  closed_at: string | null;
  text_matches?: SearchResultTextMatches;
  pull_request?: {
    merged_at?: string | null;
    diff_url: string | null;
    html_url: string | null;
    patch_url: string | null;
    url: string | null;
  };
  body?: string;
  score: number;

  /** How the author is associated with the repository. */
  author_association: AuthorAssociation;
  draft?: boolean;

  /** A git repository */
  repository?: Repository;
  body_html?: string;
  body_text?: string;

  /** @format uri */
  timeline_url?: string;
  performed_via_github_app?: Integration | null;
}

/**
 * Label Search Result Item
 */
export interface LabelSearchResultItem {
  id: number;
  node_id: string;

  /** @format uri */
  url: string;
  name: string;
  color: string;
  default: boolean;
  description: string | null;
  score: number;
  text_matches?: SearchResultTextMatches;
}

/**
 * Repo Search Result Item
 */
export interface RepoSearchResultItem {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  owner: SimpleUser | null;
  private: boolean;

  /** @format uri */
  html_url: string;
  description: string | null;
  fork: boolean;

  /** @format uri */
  url: string;

  /** @format date-time */
  created_at: string;

  /** @format date-time */
  updated_at: string;

  /** @format date-time */
  pushed_at: string;

  /** @format uri */
  homepage: string | null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  forks_count: number;
  open_issues_count: number;
  master_branch?: string;
  default_branch: string;
  score: number;

  /** @format uri */
  forks_url: string;
  keys_url: string;
  collaborators_url: string;

  /** @format uri */
  teams_url: string;

  /** @format uri */
  hooks_url: string;
  issue_events_url: string;

  /** @format uri */
  events_url: string;
  assignees_url: string;
  branches_url: string;

  /** @format uri */
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;

  /** @format uri */
  languages_url: string;

  /** @format uri */
  stargazers_url: string;

  /** @format uri */
  contributors_url: string;

  /** @format uri */
  subscribers_url: string;

  /** @format uri */
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;

  /** @format uri */
  merges_url: string;
  archive_url: string;

  /** @format uri */
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;

  /** @format uri */
  deployments_url: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;

  /** @format uri */
  svn_url: string;
  forks: number;
  open_issues: number;
  watchers: number;
  topics?: string[];

  /** @format uri */
  mirror_url: string | null;
  has_issues: boolean;
  has_projects: boolean;
  has_pages: boolean;
  has_wiki: boolean;
  has_downloads: boolean;
  archived: boolean;

  /** Returns whether or not this repository disabled. */
  disabled: boolean;
  license: LicenseSimple | null;
  permissions?: { admin: boolean; pull: boolean; push: boolean };
  text_matches?: SearchResultTextMatches;
  temp_clone_token?: string;
  allow_merge_commit?: boolean;
  allow_squash_merge?: boolean;
  allow_rebase_merge?: boolean;
  delete_branch_on_merge?: boolean;
}

/**
 * Topic Search Result Item
 */
export interface TopicSearchResultItem {
  name: string;
  display_name: string | null;
  short_description: string | null;
  description: string | null;
  created_by: string | null;
  released: string | null;

  /** @format date-time */
  created_at: string;

  /** @format date-time */
  updated_at: string;
  featured: boolean;
  curated: boolean;
  score: number;
  repository_count?: number | null;

  /** @format uri */
  logo_url?: string | null;
  text_matches?: SearchResultTextMatches;
  related?: { topic_relation?: { id?: number; name?: string; topic_id?: number; relation_type?: string } }[] | null;
  aliases?: { topic_relation?: { id?: number; name?: string; topic_id?: number; relation_type?: string } }[] | null;
}

/**
 * User Search Result Item
 */
export interface UserSearchResultItem {
  login: string;
  id: number;
  node_id: string;

  /** @format uri */
  avatar_url: string;
  gravatar_id: string | null;

  /** @format uri */
  url: string;

  /** @format uri */
  html_url: string;

  /** @format uri */
  followers_url: string;

  /** @format uri */
  subscriptions_url: string;

  /** @format uri */
  organizations_url: string;

  /** @format uri */
  repos_url: string;

  /** @format uri */
  received_events_url: string;
  type: string;
  score: number;
  following_url: string;
  gists_url: string;
  starred_url: string;
  events_url: string;
  public_repos?: number;
  public_gists?: number;
  followers?: number;
  following?: number;

  /** @format date-time */
  created_at?: string;

  /** @format date-time */
  updated_at?: string;
  name?: string | null;
  bio?: string | null;

  /** @format email */
  email?: string | null;
  location?: string | null;
  site_admin: boolean;
  hireable?: boolean | null;
  text_matches?: SearchResultTextMatches;
  blog?: string | null;
  company?: string | null;

  /** @format date-time */
  suspended_at?: string | null;
}

/**
 * Private User
 */
export interface PrivateUser {
  /** @example octocat */
  login: string;

  /** @example 1 */
  id: number;

  /** @example MDQ6VXNlcjE= */
  node_id: string;

  /**
   * @format uri
   * @example https://github.com/images/error/octocat_happy.gif
   */
  avatar_url: string;

  /** @example 41d064eb2195891e12d0413f63227ea7 */
  gravatar_id: string | null;

  /**
   * @format uri
   * @example https://api.github.com/users/octocat
   */
  url: string;

  /**
   * @format uri
   * @example https://github.com/octocat
   */
  html_url: string;

  /**
   * @format uri
   * @example https://api.github.com/users/octocat/followers
   */
  followers_url: string;

  /** @example https://api.github.com/users/octocat/following{/other_user} */
  following_url: string;

  /** @example https://api.github.com/users/octocat/gists{/gist_id} */
  gists_url: string;

  /** @example https://api.github.com/users/octocat/starred{/owner}{/repo} */
  starred_url: string;

  /**
   * @format uri
   * @example https://api.github.com/users/octocat/subscriptions
   */
  subscriptions_url: string;

  /**
   * @format uri
   * @example https://api.github.com/users/octocat/orgs
   */
  organizations_url: string;

  /**
   * @format uri
   * @example https://api.github.com/users/octocat/repos
   */
  repos_url: string;

  /** @example https://api.github.com/users/octocat/events{/privacy} */
  events_url: string;

  /**
   * @format uri
   * @example https://api.github.com/users/octocat/received_events
   */
  received_events_url: string;

  /** @example User */
  type: string;
  site_admin: boolean;

  /** @example monalisa octocat */
  name: string | null;

  /** @example GitHub */
  company: string | null;

  /** @example https://github.com/blog */
  blog: string | null;

  /** @example San Francisco */
  location: string | null;

  /**
   * @format email
   * @example octocat@github.com
   */
  email: string | null;
  hireable: boolean | null;

  /** @example There once was... */
  bio: string | null;

  /** @example monalisa */
  twitter_username?: string | null;

  /** @example 2 */
  public_repos: number;

  /** @example 1 */
  public_gists: number;

  /** @example 20 */
  followers: number;

  /** @example 0 */
  following: number;

  /**
   * @format date-time
   * @example 2008-01-14T04:33:35Z
   */
  created_at: string;

  /**
   * @format date-time
   * @example 2008-01-14T04:33:35Z
   */
  updated_at: string;

  /** @example 81 */
  private_gists: number;

  /** @example 100 */
  total_private_repos: number;

  /** @example 100 */
  owned_private_repos: number;

  /** @example 10000 */
  disk_usage: number;

  /** @example 8 */
  collaborators: number;

  /** @example true */
  two_factor_authentication: boolean;
  plan?: { collaborators: number; name: string; space: number; private_repos: number };

  /** @format date-time */
  suspended_at?: string | null;
  business_plus?: boolean;
  ldap_dn?: string;
}

/**
 * Public User
 */
export interface PublicUser {
  login: string;
  id: number;
  node_id: string;

  /** @format uri */
  avatar_url: string;
  gravatar_id: string | null;

  /** @format uri */
  url: string;

  /** @format uri */
  html_url: string;

  /** @format uri */
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;

  /** @format uri */
  subscriptions_url: string;

  /** @format uri */
  organizations_url: string;

  /** @format uri */
  repos_url: string;
  events_url: string;

  /** @format uri */
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;

  /** @format email */
  email: string | null;
  hireable: boolean | null;
  bio: string | null;
  twitter_username?: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;

  /** @format date-time */
  created_at: string;

  /** @format date-time */
  updated_at: string;
  plan?: { collaborators: number; name: string; space: number; private_repos: number };

  /** @format date-time */
  suspended_at?: string | null;

  /** @example 1 */
  private_gists?: number;

  /** @example 2 */
  total_private_repos?: number;

  /** @example 2 */
  owned_private_repos?: number;

  /** @example 1 */
  disk_usage?: number;

  /** @example 3 */
  collaborators?: number;
}

/**
 * Email
 */
export interface Email {
  /**
   * @format email
   * @example octocat@github.com
   */
  email: string;

  /** @example true */
  primary: boolean;

  /** @example true */
  verified: boolean;

  /** @example public */
  visibility: string | null;
}

/**
 * A unique encryption key
 */
export interface GpgKey {
  /** @example 3 */
  id: number;
  primary_key_id: number | null;

  /** @example 3262EFF25BA0D270 */
  key_id: string;

  /** @example xsBNBFayYZ... */
  public_key: string;

  /** @example [{"email":"mastahyeti@users.noreply.github.com","verified":true}] */
  emails: { email?: string; verified?: boolean }[];

  /** @example [{"id":4,"primary_key_id":3,"key_id":"4A595D4C72EE49C7","public_key":"zsBNBFayYZ...","emails":[],"subkeys":[],"can_sign":false,"can_encrypt_comms":true,"can_encrypt_storage":true,"can_certify":false,"created_at":"2016-03-24T11:31:04-06:00","expires_at":null}] */
  subkeys: {
    id?: number;
    primary_key_id?: number;
    key_id?: string;
    public_key?: string;
    emails?: any[];
    subkeys?: any[];
    can_sign?: boolean;
    can_encrypt_comms?: boolean;
    can_encrypt_storage?: boolean;
    can_certify?: boolean;
    created_at?: string;
    expires_at?: string | null;
    raw_key?: string | null;
  }[];

  /** @example true */
  can_sign: boolean;
  can_encrypt_comms: boolean;
  can_encrypt_storage: boolean;

  /** @example true */
  can_certify: boolean;

  /**
   * @format date-time
   * @example 2016-03-24T11:31:04-06:00
   */
  created_at: string;

  /** @format date-time */
  expires_at: string | null;
  raw_key: string | null;
}

/**
 * Key
 */
export interface Key {
  key_id: string;
  key: string;
  id: number;
  url: string;
  title: string;

  /** @format date-time */
  created_at: string;
  verified: boolean;
  read_only: boolean;
}

export interface MarketplaceAccount {
  /** @format uri */
  url: string;
  id: number;
  type: string;
  node_id?: string;
  login: string;

  /** @format email */
  email?: string | null;

  /** @format email */
  organization_billing_email?: string | null;
}

/**
 * User Marketplace Purchase
 */
export interface UserMarketplacePurchase {
  /** @example monthly */
  billing_cycle: string;

  /**
   * @format date-time
   * @example 2017-11-11T00:00:00Z
   */
  next_billing_date: string | null;
  unit_count: number | null;

  /** @example true */
  on_free_trial: boolean;

  /**
   * @format date-time
   * @example 2017-11-11T00:00:00Z
   */
  free_trial_ends_on: string | null;

  /**
   * @format date-time
   * @example 2017-11-02T01:12:12Z
   */
  updated_at: string | null;
  account: MarketplaceAccount;

  /** Marketplace Listing Plan */
  plan: MarketplaceListingPlan;
}

/**
 * Starred Repository
 */
export interface StarredRepository {
  /** @format date-time */
  starred_at: string;

  /** A git repository */
  repo: Repository;
}

/**
 * Hovercard
 */
export interface Hovercard {
  contexts: { message: string; octicon: string }[];
}

/**
 * Key Simple
 */
export interface KeySimple {
  id: number;
  key: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "https://api.github.com";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title GitHub v3 REST API
 * @version 1.1.4
 * @license MIT (https://spdx.org/licenses/MIT)
 * @termsOfService https://docs.github.com/articles/github-terms-of-service
 * @baseUrl https://api.github.com
 * @externalDocs https://docs.github.com/rest/
 * @contact Support (https://support.github.com/contact)
 *
 * GitHub's v3 REST API.
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Get Hypermedia links to resources accessible in GitHub's REST API
   *
   * @tags meta
   * @name MetaRoot
   * @summary GitHub API Root
   * @request GET:/
   */
  metaRoot = (params: RequestParams = {}) =>
    this.request<
      {
        current_user_url: string;
        current_user_authorizations_html_url: string;
        authorizations_url: string;
        code_search_url: string;
        commit_search_url: string;
        emails_url: string;
        emojis_url: string;
        events_url: string;
        feeds_url: string;
        followers_url: string;
        following_url: string;
        gists_url: string;
        hub_url: string;
        issue_search_url: string;
        issues_url: string;
        keys_url: string;
        label_search_url: string;
        notifications_url: string;
        organization_url: string;
        organization_repositories_url: string;
        organization_teams_url: string;
        public_gists_url: string;
        rate_limit_url: string;
        repository_url: string;
        repository_search_url: string;
        current_user_repositories_url: string;
        starred_url: string;
        starred_gists_url: string;
        topic_search_url?: string;
        user_url: string;
        user_organizations_url: string;
        user_repositories_url: string;
        user_search_url: string;
      },
      any
    >({
      path: `/`,
      method: "GET",
      format: "json",
      ...params,
    });

  app = {
    /**
     * @description Returns the GitHub App associated with the authentication credentials used. To see how many app installations are associated with this GitHub App, see the `installations_count` in the response. For more details about your app's installations, see the "[List installations for the authenticated app](https://docs.github.com/rest/reference/apps#list-installations-for-the-authenticated-app)" endpoint. You must use a [JWT](https://docs.github.com/apps/building-github-apps/authenticating-with-github-apps/#authenticating-as-a-github-app) to access this endpoint.
     *
     * @tags apps
     * @name AppsGetAuthenticated
     * @summary Get the authenticated app
     * @request GET:/app
     */
    appsGetAuthenticated: (params: RequestParams = {}) =>
      this.request<Integration, any>({
        path: `/app`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Returns the webhook configuration for a GitHub App. For more information about configuring a webhook for your app, see "[Creating a GitHub App](/developers/apps/creating-a-github-app)." You must use a [JWT](https://docs.github.com/apps/building-github-apps/authenticating-with-github-apps/#authenticating-as-a-github-app) to access this endpoint.
     *
     * @tags apps
     * @name AppsGetWebhookConfigForApp
     * @summary Get a webhook configuration for an app
     * @request GET:/app/hook/config
     */
    appsGetWebhookConfigForApp: (params: RequestParams = {}) =>
      this.request<WebhookConfig, any>({
        path: `/app/hook/config`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Updates the webhook configuration for a GitHub App. For more information about configuring a webhook for your app, see "[Creating a GitHub App](/developers/apps/creating-a-github-app)." You must use a [JWT](https://docs.github.com/apps/building-github-apps/authenticating-with-github-apps/#authenticating-as-a-github-app) to access this endpoint.
     *
     * @tags apps
     * @name AppsUpdateWebhookConfigForApp
     * @summary Update a webhook configuration for an app
     * @request PATCH:/app/hook/config
     */
    appsUpdateWebhookConfigForApp: (
      data: {
        url?: WebhookConfigUrl;
        content_type?: WebhookConfigContentType;
        secret?: WebhookConfigSecret;
        insecure_ssl?: WebhookConfigInsecureSsl;
      },
      params: RequestParams = {},
    ) =>
      this.request<WebhookConfig, any>({
        path: `/app/hook/config`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description You must use a [JWT](https://docs.github.com/apps/building-github-apps/authenticating-with-github-apps/#authenticating-as-a-github-app) to access this endpoint. The permissions the installation has are included under the `permissions` key.
     *
     * @tags apps
     * @name AppsListInstallations
     * @summary List installations for the authenticated app
     * @request GET:/app/installations
     */
    appsListInstallations: (
      query?: { per_page?: number; page?: number; since?: string; outdated?: string },
      params: RequestParams = {},
    ) =>
      this.request<Installation[], any>({
        path: `/app/installations`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Enables an authenticated GitHub App to find an installation's information using the installation id. The installation's account type (`target_type`) will be either an organization or a user account, depending which account the repository belongs to. You must use a [JWT](https://docs.github.com/apps/building-github-apps/authenticating-with-github-apps/#authenticating-as-a-github-app) to access this endpoint.
     *
     * @tags apps
     * @name AppsGetInstallation
     * @summary Get an installation for the authenticated app
     * @request GET:/app/installations/{installation_id}
     */
    appsGetInstallation: (installationId: number, params: RequestParams = {}) =>
      this.request<Installation, BasicError | { message: string; documentation_url: string }>({
        path: `/app/installations/${installationId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Uninstalls a GitHub App on a user, organization, or business account. If you prefer to temporarily suspend an app's access to your account's resources, then we recommend the "[Suspend an app installation](https://docs.github.com/v3/apps/#suspend-an-app-installation)" endpoint. You must use a [JWT](https://docs.github.com/apps/building-github-apps/authenticating-with-github-apps/#authenticating-as-a-github-app) to access this endpoint.
     *
     * @tags apps
     * @name AppsDeleteInstallation
     * @summary Delete an installation for the authenticated app
     * @request DELETE:/app/installations/{installation_id}
     */
    appsDeleteInstallation: (installationId: number, params: RequestParams = {}) =>
      this.request<void, BasicError>({
        path: `/app/installations/${installationId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Creates an installation access token that enables a GitHub App to make authenticated API requests for the app's installation on an organization or individual account. Installation tokens expire one hour from the time you create them. Using an expired token produces a status code of `401 - Unauthorized`, and requires creating a new installation token. By default the installation token has access to all repositories that the installation can access. To restrict the access to specific repositories, you can provide the `repository_ids` when creating the token. When you omit `repository_ids`, the response does not contain the `repositories` key. You must use a [JWT](https://docs.github.com/apps/building-github-apps/authenticating-with-github-apps/#authenticating-as-a-github-app) to access this endpoint.
     *
     * @tags apps
     * @name AppsCreateInstallationAccessToken
     * @summary Create an installation access token for an app
     * @request POST:/app/installations/{installation_id}/access_tokens
     */
    appsCreateInstallationAccessToken: (
      installationId: number,
      data: { repositories?: string[]; repository_ids?: number[]; permissions?: AppPermissions },
      params: RequestParams = {},
    ) =>
      this.request<InstallationToken, BasicError | { message: string; documentation_url: string } | ValidationError>({
        path: `/app/installations/${installationId}/access_tokens`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description **Note:** Suspending a GitHub App installation is currently in beta and subject to change. Before you can suspend a GitHub App, the app owner must enable suspending installations for the app by opting-in to the beta. For more information, see "[Suspending a GitHub App installation](https://docs.github.com/apps/managing-github-apps/suspending-a-github-app-installation/)." Suspends a GitHub App on a user, organization, or business account, which blocks the app from accessing the account's resources. When a GitHub App is suspended, the app's access to the GitHub API or webhook events is blocked for that account. You must use a [JWT](https://docs.github.com/apps/building-github-apps/authenticating-with-github-apps/#authenticating-as-a-github-app) to access this endpoint.
     *
     * @tags apps
     * @name AppsSuspendInstallation
     * @summary Suspend an app installation
     * @request PUT:/app/installations/{installation_id}/suspended
     */
    appsSuspendInstallation: (installationId: number, params: RequestParams = {}) =>
      this.request<void, BasicError>({
        path: `/app/installations/${installationId}/suspended`,
        method: "PUT",
        ...params,
      }),

    /**
     * @description **Note:** Suspending a GitHub App installation is currently in beta and subject to change. Before you can suspend a GitHub App, the app owner must enable suspending installations for the app by opting-in to the beta. For more information, see "[Suspending a GitHub App installation](https://docs.github.com/apps/managing-github-apps/suspending-a-github-app-installation/)." Removes a GitHub App installation suspension. You must use a [JWT](https://docs.github.com/apps/building-github-apps/authenticating-with-github-apps/#authenticating-as-a-github-app) to access this endpoint.
     *
     * @tags apps
     * @name AppsUnsuspendInstallation
     * @summary Unsuspend an app installation
     * @request DELETE:/app/installations/{installation_id}/suspended
     */
    appsUnsuspendInstallation: (installationId: number, params: RequestParams = {}) =>
      this.request<void, BasicError>({
        path: `/app/installations/${installationId}/suspended`,
        method: "DELETE",
        ...params,
      }),
  };
  appManifests = {
    /**
     * @description Use this endpoint to complete the handshake necessary when implementing the [GitHub App Manifest flow](https://docs.github.com/apps/building-github-apps/creating-github-apps-from-a-manifest/). When you create a GitHub App with the manifest flow, you receive a temporary `code` used to retrieve the GitHub App's `id`, `pem` (private key), and `webhook_secret`.
     *
     * @tags apps
     * @name AppsCreateFromManifest
     * @summary Create a GitHub App from a manifest
     * @request POST:/app-manifests/{code}/conversions
     */
    appsCreateFromManifest: (code: string, params: RequestParams = {}) =>
      this.request<
        Integration & {
          client_id: string;
          client_secret: string;
          webhook_secret: string;
          pem: string;
          [key: string]: any;
        },
        BasicError | ValidationErrorSimple
      >({
        path: `/app-manifests/${code}/conversions`,
        method: "POST",
        format: "json",
        ...params,
      }),
  };
  applications = {
    /**
     * @description **Deprecation Notice:** GitHub will discontinue the [OAuth Authorizations API](https://docs.github.com/rest/reference/oauth-authorizations/), which is used by integrations to create personal access tokens and OAuth tokens, and you must now create these tokens using our [web application flow](https://docs.github.com/developers/apps/authorizing-oauth-apps#web-application-flow). The [OAuth Authorizations API](https://docs.github.com/rest/reference/oauth-authorizations) will be removed on November, 13, 2020. For more information, including scheduled brownouts, see the [blog post](https://developer.github.com/changes/2020-02-14-deprecating-oauth-auth-endpoint/). You can use this API to list the set of OAuth applications that have been granted access to your account. Unlike the [list your authorizations](https://docs.github.com/rest/reference/oauth-authorizations#list-your-authorizations) API, this API does not manage individual tokens. This API will return one entry for each OAuth application that has been granted access to your account, regardless of the number of tokens an application has generated for your user. The list of OAuth applications returned matches what is shown on [the application authorizations settings screen within GitHub](https://github.com/settings/applications#authorized). The `scopes` returned are the union of scopes authorized for the application. For example, if an application has one token with `repo` scope and another token with `user` scope, the grant will return `["repo", "user"]`.
     *
     * @tags oauth-authorizations
     * @name OauthAuthorizationsListGrants
     * @summary List your grants
     * @request GET:/applications/grants
     * @deprecated
     */
    oauthAuthorizationsListGrants: (query?: { per_page?: number; page?: number }, params: RequestParams = {}) =>
      this.request<ApplicationGrant[], BasicError>({
        path: `/applications/grants`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description **Deprecation Notice:** GitHub will discontinue the [OAuth Authorizations API](https://docs.github.com/rest/reference/oauth-authorizations), which is used by integrations to create personal access tokens and OAuth tokens, and you must now create these tokens using our [web application flow](https://docs.github.com/apps/building-oauth-apps/authorizing-oauth-apps/#web-application-flow). The [OAuth Authorizations API](https://docs.github.com/rest/reference/oauth-authorizations) will be removed on November, 13, 2020. For more information, including scheduled brownouts, see the [blog post](https://developer.github.com/changes/2020-02-14-deprecating-oauth-auth-endpoint/).
     *
     * @tags oauth-authorizations
     * @name OauthAuthorizationsGetGrant
     * @summary Get a single grant
     * @request GET:/applications/grants/{grant_id}
     * @deprecated
     */
    oauthAuthorizationsGetGrant: (grantId: number, params: RequestParams = {}) =>
      this.request<ApplicationGrant, BasicError>({
        path: `/applications/grants/${grantId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description **Deprecation Notice:** GitHub will discontinue the [OAuth Authorizations API](https://docs.github.com/rest/reference/oauth-authorizations/), which is used by integrations to create personal access tokens and OAuth tokens, and you must now create these tokens using our [web application flow](https://docs.github.com/developers/apps/authorizing-oauth-apps#web-application-flow). The [OAuth Authorizations API](https://docs.github.com/rest/reference/oauth-authorizations/) will be removed on November, 13, 2020. For more information, including scheduled brownouts, see the [blog post](https://developer.github.com/changes/2020-02-14-deprecating-oauth-auth-endpoint/). Deleting an OAuth application's grant will also delete all OAuth tokens associated with the application for your user. Once deleted, the application has no access to your account and is no longer listed on [the application authorizations settings screen within GitHub](https://github.com/settings/applications#authorized).
     *
     * @tags oauth-authorizations
     * @name OauthAuthorizationsDeleteGrant
     * @summary Delete a grant
     * @request DELETE:/applications/grants/{grant_id}
     * @deprecated
     */
    oauthAuthorizationsDeleteGrant: (grantId: number, params: RequestParams = {}) =>
      this.request<void, BasicError>({
        path: `/applications/grants/${grantId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description OAuth application owners can revoke a grant for their OAuth application and a specific user. You must use [Basic Authentication](https://docs.github.com/rest/overview/other-authentication-methods#basic-authentication) when accessing this endpoint, using the OAuth application's `client_id` and `client_secret` as the username and password. You must also provide a valid OAuth `access_token` as an input parameter and the grant for the token's owner will be deleted. Deleting an OAuth application's grant will also delete all OAuth tokens associated with the application for the user. Once deleted, the application will have no access to the user's account and will no longer be listed on [the application authorizations settings screen within GitHub](https://github.com/settings/applications#authorized).
     *
     * @tags apps
     * @name AppsDeleteAuthorization
     * @summary Delete an app authorization
     * @request DELETE:/applications/{client_id}/grant
     */
    appsDeleteAuthorization: (clientId: string, data: { access_token?: string }, params: RequestParams = {}) =>
      this.request<void, ValidationError>({
        path: `/applications/${clientId}/grant`,
        method: "DELETE",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description **Deprecation Notice:** GitHub will discontinue OAuth endpoints that contain `access_token` in the path parameter. We have introduced new endpoints that allow you to securely manage tokens for OAuth Apps by moving `access_token` to the request body. For more information, see the [blog post](https://developer.github.com/changes/2020-02-14-deprecating-oauth-app-endpoint/). OAuth application owners can revoke a grant for their OAuth application and a specific user. You must use [Basic Authentication](https://docs.github.com/rest/overview/other-authentication-methods#basic-authentication) when accessing this endpoint, using the OAuth application's `client_id` and `client_secret` as the username and password. You must also provide a valid token as `:access_token` and the grant for the token's owner will be deleted. Deleting an OAuth application's grant will also delete all OAuth tokens associated with the application for the user. Once deleted, the application will have no access to the user's account and will no longer be listed on [the Applications settings page under "Authorized OAuth Apps" on GitHub](https://github.com/settings/applications#authorized).
     *
     * @tags apps
     * @name AppsRevokeGrantForApplication
     * @summary Revoke a grant for an application
     * @request DELETE:/applications/{client_id}/grants/{access_token}
     * @deprecated
     */
    appsRevokeGrantForApplication: (clientId: string, accessToken: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/applications/${clientId}/grants/${accessToken}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description OAuth applications can use a special API method for checking OAuth token validity without exceeding the normal rate limits for failed login attempts. Authentication works differently with this particular endpoint. You must use [Basic Authentication](https://docs.github.com/rest/overview/other-authentication-methods#basic-authentication) to use this endpoint, where the username is the OAuth application `client_id` and the password is its `client_secret`. Invalid tokens will return `404 NOT FOUND`.
     *
     * @tags apps
     * @name AppsCheckToken
     * @summary Check a token
     * @request POST:/applications/{client_id}/token
     */
    appsCheckToken: (clientId: string, data: { access_token: string }, params: RequestParams = {}) =>
      this.request<Authorization, BasicError | ValidationError>({
        path: `/applications/${clientId}/token`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description OAuth applications can use this API method to reset a valid OAuth token without end-user involvement. Applications must save the "token" property in the response because changes take effect immediately. You must use [Basic Authentication](https://docs.github.com/rest/overview/other-authentication-methods#basic-authentication) when accessing this endpoint, using the OAuth application's `client_id` and `client_secret` as the username and password. Invalid tokens will return `404 NOT FOUND`.
     *
     * @tags apps
     * @name AppsResetToken
     * @summary Reset a token
     * @request PATCH:/applications/{client_id}/token
     */
    appsResetToken: (clientId: string, data: { access_token: string }, params: RequestParams = {}) =>
      this.request<Authorization, ValidationError>({
        path: `/applications/${clientId}/token`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description OAuth application owners can revoke a single token for an OAuth application. You must use [Basic Authentication](https://docs.github.com/rest/overview/other-authentication-methods#basic-authentication) when accessing this endpoint, using the OAuth application's `client_id` and `client_secret` as the username and password.
     *
     * @tags apps
     * @name AppsDeleteToken
     * @summary Delete an app token
     * @request DELETE:/applications/{client_id}/token
     */
    appsDeleteToken: (clientId: string, data: { access_token?: string }, params: RequestParams = {}) =>
      this.request<void, ValidationError>({
        path: `/applications/${clientId}/token`,
        method: "DELETE",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Exchanges a non-repository scoped user-to-server OAuth access token for a repository scoped user-to-server OAuth access token. You can specify which repositories the token can access and which permissions are granted to the token. You must use [Basic Authentication](https://docs.github.com/rest/overview/other-authentication-methods#basic-authentication) when accessing this endpoint, using the OAuth application's `client_id` and `client_secret` as the username and password. Invalid tokens will return `404 NOT FOUND`.
     *
     * @tags apps
     * @name AppsScopeToken
     * @summary Create a scoped access token
     * @request POST:/applications/{client_id}/token/scoped
     */
    appsScopeToken: (
      clientId: string,
      data: {
        access_token?: string;
        target?: string;
        target_id?: number;
        repositories?: string[];
        repository_ids?: number[];
        permissions?: AppPermissions;
      },
      params: RequestParams = {},
    ) =>
      this.request<Authorization, BasicError | ValidationError>({
        path: `/applications/${clientId}/token/scoped`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description **Deprecation Notice:** GitHub will discontinue OAuth endpoints that contain `access_token` in the path parameter. We have introduced new endpoints that allow you to securely manage tokens for OAuth Apps by moving `access_token` to the request body. For more information, see the [blog post](https://developer.github.com/changes/2020-02-14-deprecating-oauth-app-endpoint/). OAuth applications can use a special API method for checking OAuth token validity without exceeding the normal rate limits for failed login attempts. Authentication works differently with this particular endpoint. You must use [Basic Authentication](https://docs.github.com/rest/overview/other-authentication-methods#basic-authentication) when accessing this endpoint, using the OAuth application's `client_id` and `client_secret` as the username and password. Invalid tokens will return `404 NOT FOUND`.
     *
     * @tags apps
     * @name AppsCheckAuthorization
     * @summary Check an authorization
     * @request GET:/applications/{client_id}/tokens/{access_token}
     * @deprecated
     */
    appsCheckAuthorization: (clientId: string, accessToken: string, params: RequestParams = {}) =>
      this.request<Authorization | null, BasicError>({
        path: `/applications/${clientId}/tokens/${accessToken}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description **Deprecation Notice:** GitHub will discontinue OAuth endpoints that contain `access_token` in the path parameter. We have introduced new endpoints that allow you to securely manage tokens for OAuth Apps by moving `access_token` to the request body. For more information, see the [blog post](https://developer.github.com/changes/2020-02-14-deprecating-oauth-app-endpoint/). OAuth applications can use this API method to reset a valid OAuth token without end-user involvement. Applications must save the "token" property in the response because changes take effect immediately. You must use [Basic Authentication](https://docs.github.com/rest/overview/other-authentication-methods#basic-authentication) when accessing this endpoint, using the OAuth application's `client_id` and `client_secret` as the username and password. Invalid tokens will return `404 NOT FOUND`.
     *
     * @tags apps
     * @name AppsResetAuthorization
     * @summary Reset an authorization
     * @request POST:/applications/{client_id}/tokens/{access_token}
     * @deprecated
     */
    appsResetAuthorization: (clientId: string, accessToken: string, params: RequestParams = {}) =>
      this.request<Authorization, any>({
        path: `/applications/${clientId}/tokens/${accessToken}`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * @description **Deprecation Notice:** GitHub will discontinue OAuth endpoints that contain `access_token` in the path parameter. We have introduced new endpoints that allow you to securely manage tokens for OAuth Apps by moving `access_token` to the request body. For more information, see the [blog post](https://developer.github.com/changes/2020-02-14-deprecating-oauth-app-endpoint/). OAuth application owners can revoke a single token for an OAuth application. You must use [Basic Authentication](https://docs.github.com/rest/overview/other-authentication-methods#basic-authentication) when accessing this endpoint, using the OAuth application's `client_id` and `client_secret` as the username and password.
     *
     * @tags apps
     * @name AppsRevokeAuthorizationForApplication
     * @summary Revoke an authorization for an application
     * @request DELETE:/applications/{client_id}/tokens/{access_token}
     * @deprecated
     */
    appsRevokeAuthorizationForApplication: (clientId: string, accessToken: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/applications/${clientId}/tokens/${accessToken}`,
        method: "DELETE",
        ...params,
      }),
  };
  apps = {
    /**
     * @description **Note**: The `:app_slug` is just the URL-friendly name of your GitHub App. You can find this on the settings page for your GitHub App (e.g., `https://github.com/settings/apps/:app_slug`). If the GitHub App you specify is public, you can access this endpoint without authenticating. If the GitHub App you specify is private, you must authenticate with a [personal access token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/) or an [installation access token](https://docs.github.com/apps/building-github-apps/authenticating-with-github-apps/#authenticating-as-an-installation) to access this endpoint.
     *
     * @tags apps
     * @name AppsGetBySlug
     * @summary Get an app
     * @request GET:/apps/{app_slug}
     */
    appsGetBySlug: (appSlug: string, params: RequestParams = {}) =>
      this.request<Integration, BasicError | { message: string; documentation_url: string }>({
        path: `/apps/${appSlug}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  authorizations = {
    /**
     * @description **Deprecation Notice:** GitHub will discontinue the [OAuth Authorizations API](https://docs.github.com/rest/reference/oauth-authorizations), which is used by integrations to create personal access tokens and OAuth tokens, and you must now create these tokens using our [web application flow](https://docs.github.com/apps/building-oauth-apps/authorizing-oauth-apps/#web-application-flow). The [OAuth Authorizations API](https://docs.github.com/rest/reference/oauth-authorizations) will be removed on November, 13, 2020. For more information, including scheduled brownouts, see the [blog post](https://developer.github.com/changes/2020-02-14-deprecating-oauth-auth-endpoint/).
     *
     * @tags oauth-authorizations
     * @name OauthAuthorizationsListAuthorizations
     * @summary List your authorizations
     * @request GET:/authorizations
     * @deprecated
     */
    oauthAuthorizationsListAuthorizations: (query?: { per_page?: number; page?: number }, params: RequestParams = {}) =>
      this.request<Authorization[], BasicError>({
        path: `/authorizations`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description **Deprecation Notice:** GitHub will discontinue the [OAuth Authorizations API](https://docs.github.com/rest/reference/oauth-authorizations), which is used by integrations to create personal access tokens and OAuth tokens, and you must now create these tokens using our [web application flow](https://docs.github.com/developers/apps/authorizing-oauth-apps#web-application-flow). The [OAuth Authorizations API](https://docs.github.com/rest/reference/oauth-authorizations) will be removed on November, 13, 2020. For more information, including scheduled brownouts, see the [blog post](https://developer.github.com/changes/2020-02-14-deprecating-oauth-auth-endpoint/). **Warning:** Apps must use the [web application flow](https://docs.github.com/apps/building-oauth-apps/authorizing-oauth-apps/#web-application-flow) to obtain OAuth tokens that work with GitHub SAML organizations. OAuth tokens created using the Authorizations API will be unable to access GitHub SAML organizations. For more information, see the [blog post](https://developer.github.com/changes/2019-11-05-deprecated-passwords-and-authorizations-api). Creates OAuth tokens using [Basic Authentication](https://docs.github.com/rest/overview/other-authentication-methods#basic-authentication). If you have two-factor authentication setup, Basic Authentication for this endpoint requires that you use a one-time password (OTP) and your username and password instead of tokens. For more information, see "[Working with two-factor authentication](https://docs.github.com/rest/overview/other-authentication-methods#working-with-two-factor-authentication)." To create tokens for a particular OAuth application using this endpoint, you must authenticate as the user you want to create an authorization for and provide the app's client ID and secret, found on your OAuth application's settings page. If your OAuth application intends to create multiple tokens for one user, use `fingerprint` to differentiate between them. You can also create tokens on GitHub from the [personal access tokens settings](https://github.com/settings/tokens) page. Read more about these tokens in [the GitHub Help documentation](https://help.github.com/articles/creating-an-access-token-for-command-line-use). Organizations that enforce SAML SSO require personal access tokens to be allowed. Read more about allowing tokens in [the GitHub Help documentation](https://help.github.com/articles/about-identity-and-access-management-with-saml-single-sign-on).
     *
     * @tags oauth-authorizations
     * @name OauthAuthorizationsCreateAuthorization
     * @summary Create a new authorization
     * @request POST:/authorizations
     * @deprecated
     */
    oauthAuthorizationsCreateAuthorization: (
      data: {
        scopes?: string[] | null;
        note?: string;
        note_url?: string;
        client_id?: string;
        client_secret?: string;
        fingerprint?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Authorization, BasicError | ValidationError>({
        path: `/authorizations`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description **Deprecation Notice:** GitHub will discontinue the [OAuth Authorizations API](https://docs.github.com/rest/reference/oauth-authorizations/), which is used by integrations to create personal access tokens and OAuth tokens, and you must now create these tokens using our [web application flow](https://docs.github.com/developers/apps/authorizing-oauth-apps#web-application-flow). The [OAuth Authorizations API](https://docs.github.com/rest/reference/oauth-authorizations) will be removed on November, 13, 2020. For more information, including scheduled brownouts, see the [blog post](https://developer.github.com/changes/2020-02-14-deprecating-oauth-auth-endpoint/). **Warning:** Apps must use the [web application flow](https://docs.github.com/apps/building-oauth-apps/authorizing-oauth-apps/#web-application-flow) to obtain OAuth tokens that work with GitHub SAML organizations. OAuth tokens created using the Authorizations API will be unable to access GitHub SAML organizations. For more information, see the [blog post](https://developer.github.com/changes/2019-11-05-deprecated-passwords-and-authorizations-api). Creates a new authorization for the specified OAuth application, only if an authorization for that application doesn't already exist for the user. The URL includes the 20 character client ID for the OAuth app that is requesting the token. It returns the user's existing authorization for the application if one is present. Otherwise, it creates and returns a new one. If you have two-factor authentication setup, Basic Authentication for this endpoint requires that you use a one-time password (OTP) and your username and password instead of tokens. For more information, see "[Working with two-factor authentication](https://docs.github.com/rest/overview/other-authentication-methods#working-with-two-factor-authentication)." **Deprecation Notice:** GitHub will discontinue the [OAuth Authorizations API](https://docs.github.com/rest/reference/oauth-authorizations/), which is used by integrations to create personal access tokens and OAuth tokens, and you must now create these tokens using our [web application flow](https://docs.github.com/developers/apps/authorizing-oauth-apps#web-application-flow). The [OAuth Authorizations API](https://docs.github.com/rest/reference/oauth-authorizations) will be removed on November, 13, 2020. For more information, including scheduled brownouts, see the [blog post](https://developer.github.com/changes/2020-02-14-deprecating-oauth-auth-endpoint/).
     *
     * @tags oauth-authorizations
     * @name OauthAuthorizationsGetOrCreateAuthorizationForApp
     * @summary Get-or-create an authorization for a specific app
     * @request PUT:/authorizations/clients/{client_id}
     * @deprecated
     */
    oauthAuthorizationsGetOrCreateAuthorizationForApp: (
      clientId: string,
      data: { client_secret: string; scopes?: string[] | null; note?: string; note_url?: string; fingerprint?: string },
      params: RequestParams = {},
    ) =>
      this.request<Authorization, BasicError | ValidationError>({
        path: `/authorizations/clients/${clientId}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description **Deprecation Notice:** GitHub will discontinue the [OAuth Authorizations API](https://docs.github.com/rest/reference/oauth-authorizations/), which is used by integrations to create personal access tokens and OAuth tokens, and you must now create these tokens using our [web application flow](https://docs.github.com/developers/apps/authorizing-oauth-apps#web-application-flow). The [OAuth Authorizations API](https://docs.github.com/rest/reference/oauth-authorizations) will be removed on November, 13, 2020. For more information, including scheduled brownouts, see the [blog post](https://developer.github.com/changes/2020-02-14-deprecating-oauth-auth-endpoint/). **Warning:** Apps must use the [web application flow](https://docs.github.com/apps/building-oauth-apps/authorizing-oauth-apps/#web-application-flow) to obtain OAuth tokens that work with GitHub SAML organizations. OAuth tokens created using the Authorizations API will be unable to access GitHub SAML organizations. For more information, see the [blog post](https://developer.github.com/changes/2019-11-05-deprecated-passwords-and-authorizations-api). This method will create a new authorization for the specified OAuth application, only if an authorization for that application and fingerprint do not already exist for the user. The URL includes the 20 character client ID for the OAuth app that is requesting the token. `fingerprint` is a unique string to distinguish an authorization from others created for the same client ID and user. It returns the user's existing authorization for the application if one is present. Otherwise, it creates and returns a new one. If you have two-factor authentication setup, Basic Authentication for this endpoint requires that you use a one-time password (OTP) and your username and password instead of tokens. For more information, see "[Working with two-factor authentication](https://docs.github.com/rest/overview/other-authentication-methods#working-with-two-factor-authentication)."
     *
     * @tags oauth-authorizations
     * @name OauthAuthorizationsGetOrCreateAuthorizationForAppAndFingerprint
     * @summary Get-or-create an authorization for a specific app and fingerprint
     * @request PUT:/authorizations/clients/{client_id}/{fingerprint}
     * @deprecated
     */
    oauthAuthorizationsGetOrCreateAuthorizationForAppAndFingerprint: (
      clientId: string,
      fingerprint: string,
      data: { client_secret: string; scopes?: string[] | null; note?: string; note_url?: string },
      params: RequestParams = {},
    ) =>
      this.request<Authorization, ValidationError>({
        path: `/authorizations/clients/${clientId}/${fingerprint}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description **Deprecation Notice:** GitHub will discontinue the [OAuth Authorizations API](https://docs.github.com/rest/reference/oauth-authorizations), which is used by integrations to create personal access tokens and OAuth tokens, and you must now create these tokens using our [web application flow](https://docs.github.com/apps/building-oauth-apps/authorizing-oauth-apps/#web-application-flow). The [OAuth Authorizations API](https://docs.github.com/rest/reference/oauth-authorizations) will be removed on November, 13, 2020. For more information, including scheduled brownouts, see the [blog post](https://developer.github.com/changes/2020-02-14-deprecating-oauth-auth-endpoint/).
     *
     * @tags oauth-authorizations
     * @name OauthAuthorizationsGetAuthorization
     * @summary Get a single authorization
     * @request GET:/authorizations/{authorization_id}
     * @deprecated
     */
    oauthAuthorizationsGetAuthorization: (authorizationId: number, params: RequestParams = {}) =>
      this.request<Authorization, BasicError>({
        path: `/authorizations/${authorizationId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description **Deprecation Notice:** GitHub will discontinue the [OAuth Authorizations API](https://docs.github.com/rest/reference/oauth-authorizations/), which is used by integrations to create personal access tokens and OAuth tokens, and you must now create these tokens using our [web application flow](https://docs.github.com/developers/apps/authorizing-oauth-apps#web-application-flow). The [OAuth Authorizations API](https://docs.github.com/rest/reference/oauth-authorizations) will be removed on November, 13, 2020. For more information, including scheduled brownouts, see the [blog post](https://developer.github.com/changes/2020-02-14-deprecating-oauth-auth-endpoint/). If you have two-factor authentication setup, Basic Authentication for this endpoint requires that you use a one-time password (OTP) and your username and password instead of tokens. For more information, see "[Working with two-factor authentication](https://docs.github.com/rest/overview/other-authentication-methods#working-with-two-factor-authentication)." You can only send one of these scope keys at a time.
     *
     * @tags oauth-authorizations
     * @name OauthAuthorizationsUpdateAuthorization
     * @summary Update an existing authorization
     * @request PATCH:/authorizations/{authorization_id}
     * @deprecated
     */
    oauthAuthorizationsUpdateAuthorization: (
      authorizationId: number,
      data: {
        scopes?: string[] | null;
        add_scopes?: string[];
        remove_scopes?: string[];
        note?: string;
        note_url?: string;
        fingerprint?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Authorization, ValidationError>({
        path: `/authorizations/${authorizationId}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description **Deprecation Notice:** GitHub will discontinue the [OAuth Authorizations API](https://docs.github.com/rest/reference/oauth-authorizations), which is used by integrations to create personal access tokens and OAuth tokens, and you must now create these tokens using our [web application flow](https://docs.github.com/apps/building-oauth-apps/authorizing-oauth-apps/#web-application-flow). The [OAuth Authorizations API](https://docs.github.com/rest/reference/oauth-authorizations) will be removed on November, 13, 2020. For more information, including scheduled brownouts, see the [blog post](https://developer.github.com/changes/2020-02-14-deprecating-oauth-auth-endpoint/).
     *
     * @tags oauth-authorizations
     * @name OauthAuthorizationsDeleteAuthorization
     * @summary Delete an authorization
     * @request DELETE:/authorizations/{authorization_id}
     * @deprecated
     */
    oauthAuthorizationsDeleteAuthorization: (authorizationId: number, params: RequestParams = {}) =>
      this.request<void, BasicError>({
        path: `/authorizations/${authorizationId}`,
        method: "DELETE",
        ...params,
      }),
  };
  codesOfConduct = {
    /**
     * No description
     *
     * @tags codes-of-conduct
     * @name CodesOfConductGetAllCodesOfConduct
     * @summary Get all codes of conduct
     * @request GET:/codes_of_conduct
     */
    codesOfConductGetAllCodesOfConduct: (params: RequestParams = {}) =>
      this.request<CodeOfConduct[], { message: string; documentation_url: string }>({
        path: `/codes_of_conduct`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags codes-of-conduct
     * @name CodesOfConductGetConductCode
     * @summary Get a code of conduct
     * @request GET:/codes_of_conduct/{key}
     */
    codesOfConductGetConductCode: (key: string, params: RequestParams = {}) =>
      this.request<CodeOfConduct, BasicError | { message: string; documentation_url: string }>({
        path: `/codes_of_conduct/${key}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  contentReferences = {
    /**
     * @description Creates an attachment under a content reference URL in the body or comment of an issue or pull request. Use the `id` of the content reference from the [`content_reference` event](https://docs.github.com/webhooks/event-payloads/#content_reference) to create an attachment. The app must create a content attachment within six hours of the content reference URL being posted. See "[Using content attachments](https://docs.github.com/apps/using-content-attachments/)" for details about content attachments. You must use an [installation access token](https://docs.github.com/apps/building-github-apps/authenticating-with-github-apps/#authenticating-as-an-installation) to access this endpoint.
     *
     * @tags apps
     * @name AppsCreateContentAttachment
     * @summary Create a content attachment
     * @request POST:/content_references/{content_reference_id}/attachments
     */
    appsCreateContentAttachment: (
      contentReferenceId: number,
      data: { title: string; body: string },
      params: RequestParams = {},
    ) =>
      this.request<
        ContentReferenceAttachment,
        BasicError | { message: string; documentation_url: string } | ValidationError
      >({
        path: `/content_references/${contentReferenceId}/attachments`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  emojis = {
    /**
     * @description Lists all the emojis available to use on GitHub.
     *
     * @tags emojis
     * @name EmojisGet
     * @summary Get emojis
     * @request GET:/emojis
     */
    emojisGet: (params: RequestParams = {}) =>
      this.request<Record<string, string>, any>({
        path: `/emojis`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  enterprises = {
    /**
     * @description Gets the GitHub Actions permissions policy for organizations and allowed actions in an enterprise. You must authenticate using an access token with the `admin:enterprise` scope to use this endpoint.
     *
     * @tags enterprise-admin
     * @name EnterpriseAdminGetGithubActionsPermissionsEnterprise
     * @summary Get GitHub Actions permissions for an enterprise
     * @request GET:/enterprises/{enterprise}/actions/permissions
     */
    enterpriseAdminGetGithubActionsPermissionsEnterprise: (enterprise: string, params: RequestParams = {}) =>
      this.request<ActionsEnterprisePermissions, any>({
        path: `/enterprises/${enterprise}/actions/permissions`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Sets the GitHub Actions permissions policy for organizations and allowed actions in an enterprise. You must authenticate using an access token with the `admin:enterprise` scope to use this endpoint.
     *
     * @tags enterprise-admin
     * @name EnterpriseAdminSetGithubActionsPermissionsEnterprise
     * @summary Set GitHub Actions permissions for an enterprise
     * @request PUT:/enterprises/{enterprise}/actions/permissions
     */
    enterpriseAdminSetGithubActionsPermissionsEnterprise: (
      enterprise: string,
      data: { enabled_organizations: EnabledOrganizations; allowed_actions?: AllowedActions },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/enterprises/${enterprise}/actions/permissions`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Lists the organizations that are selected to have GitHub Actions enabled in an enterprise. To use this endpoint, the enterprise permission policy for `enabled_organizations` must be configured to `selected`. For more information, see "[Set GitHub Actions permissions for an enterprise](#set-github-actions-permissions-for-an-enterprise)." You must authenticate using an access token with the `admin:enterprise` scope to use this endpoint.
     *
     * @tags enterprise-admin
     * @name EnterpriseAdminListSelectedOrganizationsEnabledGithubActionsEnterprise
     * @summary List selected organizations enabled for GitHub Actions in an enterprise
     * @request GET:/enterprises/{enterprise}/actions/permissions/organizations
     */
    enterpriseAdminListSelectedOrganizationsEnabledGithubActionsEnterprise: (
      enterprise: string,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<{ total_count: number; organizations: OrganizationSimple[] }, any>({
        path: `/enterprises/${enterprise}/actions/permissions/organizations`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Replaces the list of selected organizations that are enabled for GitHub Actions in an enterprise. To use this endpoint, the enterprise permission policy for `enabled_organizations` must be configured to `selected`. For more information, see "[Set GitHub Actions permissions for an enterprise](#set-github-actions-permissions-for-an-enterprise)." You must authenticate using an access token with the `admin:enterprise` scope to use this endpoint.
     *
     * @tags enterprise-admin
     * @name EnterpriseAdminSetSelectedOrganizationsEnabledGithubActionsEnterprise
     * @summary Set selected organizations enabled for GitHub Actions in an enterprise
     * @request PUT:/enterprises/{enterprise}/actions/permissions/organizations
     */
    enterpriseAdminSetSelectedOrganizationsEnabledGithubActionsEnterprise: (
      enterprise: string,
      data: { selected_organization_ids: number[] },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/enterprises/${enterprise}/actions/permissions/organizations`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Adds an organization to the list of selected organizations that are enabled for GitHub Actions in an enterprise. To use this endpoint, the enterprise permission policy for `enabled_organizations` must be configured to `selected`. For more information, see "[Set GitHub Actions permissions for an enterprise](#set-github-actions-permissions-for-an-enterprise)." You must authenticate using an access token with the `admin:enterprise` scope to use this endpoint.
     *
     * @tags enterprise-admin
     * @name EnterpriseAdminEnableSelectedOrganizationGithubActionsEnterprise
     * @summary Enable a selected organization for GitHub Actions in an enterprise
     * @request PUT:/enterprises/{enterprise}/actions/permissions/organizations/{org_id}
     */
    enterpriseAdminEnableSelectedOrganizationGithubActionsEnterprise: (
      enterprise: string,
      orgId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/enterprises/${enterprise}/actions/permissions/organizations/${orgId}`,
        method: "PUT",
        ...params,
      }),

    /**
     * @description Removes an organization from the list of selected organizations that are enabled for GitHub Actions in an enterprise. To use this endpoint, the enterprise permission policy for `enabled_organizations` must be configured to `selected`. For more information, see "[Set GitHub Actions permissions for an enterprise](#set-github-actions-permissions-for-an-enterprise)." You must authenticate using an access token with the `admin:enterprise` scope to use this endpoint.
     *
     * @tags enterprise-admin
     * @name EnterpriseAdminDisableSelectedOrganizationGithubActionsEnterprise
     * @summary Disable a selected organization for GitHub Actions in an enterprise
     * @request DELETE:/enterprises/{enterprise}/actions/permissions/organizations/{org_id}
     */
    enterpriseAdminDisableSelectedOrganizationGithubActionsEnterprise: (
      enterprise: string,
      orgId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/enterprises/${enterprise}/actions/permissions/organizations/${orgId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Gets the selected actions that are allowed in an enterprise. To use this endpoint, the enterprise permission policy for `allowed_actions` must be configured to `selected`. For more information, see "[Set GitHub Actions permissions for an enterprise](#set-github-actions-permissions-for-an-enterprise)." You must authenticate using an access token with the `admin:enterprise` scope to use this endpoint.
     *
     * @tags enterprise-admin
     * @name EnterpriseAdminGetAllowedActionsEnterprise
     * @summary Get allowed actions for an enterprise
     * @request GET:/enterprises/{enterprise}/actions/permissions/selected-actions
     */
    enterpriseAdminGetAllowedActionsEnterprise: (enterprise: string, params: RequestParams = {}) =>
      this.request<SelectedActions, any>({
        path: `/enterprises/${enterprise}/actions/permissions/selected-actions`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Sets the actions that are allowed in an enterprise. To use this endpoint, the enterprise permission policy for `allowed_actions` must be configured to `selected`. For more information, see "[Set GitHub Actions permissions for an enterprise](#set-github-actions-permissions-for-an-enterprise)." You must authenticate using an access token with the `admin:enterprise` scope to use this endpoint.
     *
     * @tags enterprise-admin
     * @name EnterpriseAdminSetAllowedActionsEnterprise
     * @summary Set allowed actions for an enterprise
     * @request PUT:/enterprises/{enterprise}/actions/permissions/selected-actions
     */
    enterpriseAdminSetAllowedActionsEnterprise: (
      enterprise: string,
      data: SelectedActions,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/enterprises/${enterprise}/actions/permissions/selected-actions`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Lists all self-hosted runner groups for an enterprise. You must authenticate using an access token with the `admin:enterprise` scope to use this endpoint.
     *
     * @tags enterprise-admin
     * @name EnterpriseAdminListSelfHostedRunnerGroupsForEnterprise
     * @summary List self-hosted runner groups for an enterprise
     * @request GET:/enterprises/{enterprise}/actions/runner-groups
     */
    enterpriseAdminListSelfHostedRunnerGroupsForEnterprise: (
      enterprise: string,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<{ total_count: number; runner_groups: RunnerGroupsEnterprise[] }, any>({
        path: `/enterprises/${enterprise}/actions/runner-groups`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Creates a new self-hosted runner group for an enterprise. You must authenticate using an access token with the `admin:enterprise` scope to use this endpoint.
     *
     * @tags enterprise-admin
     * @name EnterpriseAdminCreateSelfHostedRunnerGroupForEnterprise
     * @summary Create a self-hosted runner group for an enterprise
     * @request POST:/enterprises/{enterprise}/actions/runner-groups
     */
    enterpriseAdminCreateSelfHostedRunnerGroupForEnterprise: (
      enterprise: string,
      data: { name: string; visibility?: "selected" | "all"; selected_organization_ids?: number[]; runners?: number[] },
      params: RequestParams = {},
    ) =>
      this.request<RunnerGroupsEnterprise, any>({
        path: `/enterprises/${enterprise}/actions/runner-groups`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets a specific self-hosted runner group for an enterprise. You must authenticate using an access token with the `admin:enterprise` scope to use this endpoint.
     *
     * @tags enterprise-admin
     * @name EnterpriseAdminGetSelfHostedRunnerGroupForEnterprise
     * @summary Get a self-hosted runner group for an enterprise
     * @request GET:/enterprises/{enterprise}/actions/runner-groups/{runner_group_id}
     */
    enterpriseAdminGetSelfHostedRunnerGroupForEnterprise: (
      enterprise: string,
      runnerGroupId: number,
      params: RequestParams = {},
    ) =>
      this.request<RunnerGroupsEnterprise, any>({
        path: `/enterprises/${enterprise}/actions/runner-groups/${runnerGroupId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Updates the `name` and `visibility` of a self-hosted runner group in an enterprise. You must authenticate using an access token with the `admin:enterprise` scope to use this endpoint.
     *
     * @tags enterprise-admin
     * @name EnterpriseAdminUpdateSelfHostedRunnerGroupForEnterprise
     * @summary Update a self-hosted runner group for an enterprise
     * @request PATCH:/enterprises/{enterprise}/actions/runner-groups/{runner_group_id}
     */
    enterpriseAdminUpdateSelfHostedRunnerGroupForEnterprise: (
      enterprise: string,
      runnerGroupId: number,
      data: { name?: string; visibility?: "selected" | "all" },
      params: RequestParams = {},
    ) =>
      this.request<RunnerGroupsEnterprise, any>({
        path: `/enterprises/${enterprise}/actions/runner-groups/${runnerGroupId}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Deletes a self-hosted runner group for an enterprise. You must authenticate using an access token with the `admin:enterprise` scope to use this endpoint.
     *
     * @tags enterprise-admin
     * @name EnterpriseAdminDeleteSelfHostedRunnerGroupFromEnterprise
     * @summary Delete a self-hosted runner group from an enterprise
     * @request DELETE:/enterprises/{enterprise}/actions/runner-groups/{runner_group_id}
     */
    enterpriseAdminDeleteSelfHostedRunnerGroupFromEnterprise: (
      enterprise: string,
      runnerGroupId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/enterprises/${enterprise}/actions/runner-groups/${runnerGroupId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Lists the organizations with access to a self-hosted runner group. You must authenticate using an access token with the `admin:enterprise` scope to use this endpoint.
     *
     * @tags enterprise-admin
     * @name EnterpriseAdminListOrgAccessToSelfHostedRunnerGroupInEnterprise
     * @summary List organization access to a self-hosted runner group in an enterprise
     * @request GET:/enterprises/{enterprise}/actions/runner-groups/{runner_group_id}/organizations
     */
    enterpriseAdminListOrgAccessToSelfHostedRunnerGroupInEnterprise: (
      enterprise: string,
      runnerGroupId: number,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<{ total_count: number; organizations: OrganizationSimple[] }, any>({
        path: `/enterprises/${enterprise}/actions/runner-groups/${runnerGroupId}/organizations`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Replaces the list of organizations that have access to a self-hosted runner configured in an enterprise. You must authenticate using an access token with the `admin:enterprise` scope to use this endpoint.
     *
     * @tags enterprise-admin
     * @name EnterpriseAdminSetOrgAccessToSelfHostedRunnerGroupInEnterprise
     * @summary Set organization access for a self-hosted runner group in an enterprise
     * @request PUT:/enterprises/{enterprise}/actions/runner-groups/{runner_group_id}/organizations
     */
    enterpriseAdminSetOrgAccessToSelfHostedRunnerGroupInEnterprise: (
      enterprise: string,
      runnerGroupId: number,
      data: { selected_organization_ids: number[] },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/enterprises/${enterprise}/actions/runner-groups/${runnerGroupId}/organizations`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Adds an organization to the list of selected organizations that can access a self-hosted runner group. The runner group must have `visibility` set to `selected`. For more information, see "[Create a self-hosted runner group for an enterprise](#create-a-self-hosted-runner-group-for-an-enterprise)." You must authenticate using an access token with the `admin:enterprise` scope to use this endpoint.
     *
     * @tags enterprise-admin
     * @name EnterpriseAdminAddOrgAccessToSelfHostedRunnerGroupInEnterprise
     * @summary Add organization access to a self-hosted runner group in an enterprise
     * @request PUT:/enterprises/{enterprise}/actions/runner-groups/{runner_group_id}/organizations/{org_id}
     */
    enterpriseAdminAddOrgAccessToSelfHostedRunnerGroupInEnterprise: (
      enterprise: string,
      runnerGroupId: number,
      orgId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/enterprises/${enterprise}/actions/runner-groups/${runnerGroupId}/organizations/${orgId}`,
        method: "PUT",
        ...params,
      }),

    /**
     * @description Removes an organization from the list of selected organizations that can access a self-hosted runner group. The runner group must have `visibility` set to `selected`. For more information, see "[Create a self-hosted runner group for an enterprise](#create-a-self-hosted-runner-group-for-an-enterprise)." You must authenticate using an access token with the `admin:enterprise` scope to use this endpoint.
     *
     * @tags enterprise-admin
     * @name EnterpriseAdminRemoveOrgAccessToSelfHostedRunnerGroupInEnterprise
     * @summary Remove organization access to a self-hosted runner group in an enterprise
     * @request DELETE:/enterprises/{enterprise}/actions/runner-groups/{runner_group_id}/organizations/{org_id}
     */
    enterpriseAdminRemoveOrgAccessToSelfHostedRunnerGroupInEnterprise: (
      enterprise: string,
      runnerGroupId: number,
      orgId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/enterprises/${enterprise}/actions/runner-groups/${runnerGroupId}/organizations/${orgId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Lists the self-hosted runners that are in a specific enterprise group. You must authenticate using an access token with the `admin:enterprise` scope to use this endpoint.
     *
     * @tags enterprise-admin
     * @name EnterpriseAdminListSelfHostedRunnersInGroupForEnterprise
     * @summary List self-hosted runners in a group for an enterprise
     * @request GET:/enterprises/{enterprise}/actions/runner-groups/{runner_group_id}/runners
     */
    enterpriseAdminListSelfHostedRunnersInGroupForEnterprise: (
      enterprise: string,
      runnerGroupId: number,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<{ total_count: number; runners: Runner[] }, any>({
        path: `/enterprises/${enterprise}/actions/runner-groups/${runnerGroupId}/runners`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Replaces the list of self-hosted runners that are part of an enterprise runner group. You must authenticate using an access token with the `admin:enterprise` scope to use this endpoint.
     *
     * @tags enterprise-admin
     * @name EnterpriseAdminSetSelfHostedRunnersInGroupForEnterprise
     * @summary Set self-hosted runners in a group for an enterprise
     * @request PUT:/enterprises/{enterprise}/actions/runner-groups/{runner_group_id}/runners
     */
    enterpriseAdminSetSelfHostedRunnersInGroupForEnterprise: (
      enterprise: string,
      runnerGroupId: number,
      data: { runners: number[] },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/enterprises/${enterprise}/actions/runner-groups/${runnerGroupId}/runners`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Adds a self-hosted runner to a runner group configured in an enterprise. You must authenticate using an access token with the `admin:enterprise` scope to use this endpoint.
     *
     * @tags enterprise-admin
     * @name EnterpriseAdminAddSelfHostedRunnerToGroupForEnterprise
     * @summary Add a self-hosted runner to a group for an enterprise
     * @request PUT:/enterprises/{enterprise}/actions/runner-groups/{runner_group_id}/runners/{runner_id}
     */
    enterpriseAdminAddSelfHostedRunnerToGroupForEnterprise: (
      enterprise: string,
      runnerGroupId: number,
      runnerId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/enterprises/${enterprise}/actions/runner-groups/${runnerGroupId}/runners/${runnerId}`,
        method: "PUT",
        ...params,
      }),

    /**
     * @description Removes a self-hosted runner from a group configured in an enterprise. The runner is then returned to the default group. You must authenticate using an access token with the `admin:enterprise` scope to use this endpoint.
     *
     * @tags enterprise-admin
     * @name EnterpriseAdminRemoveSelfHostedRunnerFromGroupForEnterprise
     * @summary Remove a self-hosted runner from a group for an enterprise
     * @request DELETE:/enterprises/{enterprise}/actions/runner-groups/{runner_group_id}/runners/{runner_id}
     */
    enterpriseAdminRemoveSelfHostedRunnerFromGroupForEnterprise: (
      enterprise: string,
      runnerGroupId: number,
      runnerId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/enterprises/${enterprise}/actions/runner-groups/${runnerGroupId}/runners/${runnerId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Lists all self-hosted runners configured for an enterprise. You must authenticate using an access token with the `admin:enterprise` scope to use this endpoint.
     *
     * @tags enterprise-admin
     * @name EnterpriseAdminListSelfHostedRunnersForEnterprise
     * @summary List self-hosted runners for an enterprise
     * @request GET:/enterprises/{enterprise}/actions/runners
     */
    enterpriseAdminListSelfHostedRunnersForEnterprise: (
      enterprise: string,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<{ total_count?: number; runners?: Runner[] }, any>({
        path: `/enterprises/${enterprise}/actions/runners`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Lists binaries for the runner application that you can download and run. You must authenticate using an access token with the `admin:enterprise` scope to use this endpoint.
     *
     * @tags enterprise-admin
     * @name EnterpriseAdminListRunnerApplicationsForEnterprise
     * @summary List runner applications for an enterprise
     * @request GET:/enterprises/{enterprise}/actions/runners/downloads
     */
    enterpriseAdminListRunnerApplicationsForEnterprise: (enterprise: string, params: RequestParams = {}) =>
      this.request<RunnerApplication[], any>({
        path: `/enterprises/${enterprise}/actions/runners/downloads`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a token that you can pass to the `config` script. The token expires after one hour. You must authenticate using an access token with the `admin:enterprise` scope to use this endpoint. #### Example using registration token Configure your self-hosted runner, replacing `TOKEN` with the registration token provided by this endpoint. ``` ./config.sh --url https://github.com/enterprises/octo-enterprise --token TOKEN ```
     *
     * @tags enterprise-admin
     * @name EnterpriseAdminCreateRegistrationTokenForEnterprise
     * @summary Create a registration token for an enterprise
     * @request POST:/enterprises/{enterprise}/actions/runners/registration-token
     */
    enterpriseAdminCreateRegistrationTokenForEnterprise: (enterprise: string, params: RequestParams = {}) =>
      this.request<AuthenticationToken, any>({
        path: `/enterprises/${enterprise}/actions/runners/registration-token`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a token that you can pass to the `config` script to remove a self-hosted runner from an enterprise. The token expires after one hour. You must authenticate using an access token with the `admin:enterprise` scope to use this endpoint. #### Example using remove token To remove your self-hosted runner from an enterprise, replace `TOKEN` with the remove token provided by this endpoint. ``` ./config.sh remove --token TOKEN ```
     *
     * @tags enterprise-admin
     * @name EnterpriseAdminCreateRemoveTokenForEnterprise
     * @summary Create a remove token for an enterprise
     * @request POST:/enterprises/{enterprise}/actions/runners/remove-token
     */
    enterpriseAdminCreateRemoveTokenForEnterprise: (enterprise: string, params: RequestParams = {}) =>
      this.request<AuthenticationToken, any>({
        path: `/enterprises/${enterprise}/actions/runners/remove-token`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * @description Gets a specific self-hosted runner configured in an enterprise. You must authenticate using an access token with the `admin:enterprise` scope to use this endpoint.
     *
     * @tags enterprise-admin
     * @name EnterpriseAdminGetSelfHostedRunnerForEnterprise
     * @summary Get a self-hosted runner for an enterprise
     * @request GET:/enterprises/{enterprise}/actions/runners/{runner_id}
     */
    enterpriseAdminGetSelfHostedRunnerForEnterprise: (
      enterprise: string,
      runnerId: number,
      params: RequestParams = {},
    ) =>
      this.request<Runner, any>({
        path: `/enterprises/${enterprise}/actions/runners/${runnerId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Forces the removal of a self-hosted runner from an enterprise. You can use this endpoint to completely remove the runner when the machine you were using no longer exists. You must authenticate using an access token with the `admin:enterprise` scope to use this endpoint.
     *
     * @tags enterprise-admin
     * @name EnterpriseAdminDeleteSelfHostedRunnerFromEnterprise
     * @summary Delete a self-hosted runner from an enterprise
     * @request DELETE:/enterprises/{enterprise}/actions/runners/{runner_id}
     */
    enterpriseAdminDeleteSelfHostedRunnerFromEnterprise: (
      enterprise: string,
      runnerId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/enterprises/${enterprise}/actions/runners/${runnerId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description **Note:** The audit log REST API is currently in beta and is subject to change. Gets the audit log for an enterprise. To use this endpoint, you must be an enterprise admin, and you must use an access token with the `admin:enterprise` scope.
     *
     * @tags audit-log
     * @name AuditLogGetAuditLog
     * @summary Get the audit log for an enterprise
     * @request GET:/enterprises/{enterprise}/audit-log
     */
    auditLogGetAuditLog: (
      enterprise: string,
      query?: {
        phrase?: string;
        include?: "web" | "git" | "all";
        after?: string;
        before?: string;
        order?: "desc" | "asc";
        per_page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<AuditLogEvent[], any>({
        path: `/enterprises/${enterprise}/audit-log`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets the summary of the free and paid GitHub Actions minutes used. Paid minutes only apply to workflows in private repositories that use GitHub-hosted runners. Minutes used is listed for each GitHub-hosted runner operating system. Any job re-runs are also included in the usage. The usage does not include the multiplier for macOS and Windows runners and is not rounded up to the nearest whole minute. For more information, see "[Managing billing for GitHub Actions](https://help.github.com/github/setting-up-and-managing-billing-and-payments-on-github/managing-billing-for-github-actions)". The authenticated user must be an enterprise admin.
     *
     * @tags billing
     * @name BillingGetGithubActionsBillingGhe
     * @summary Get GitHub Actions billing for an enterprise
     * @request GET:/enterprises/{enterprise}/settings/billing/actions
     */
    billingGetGithubActionsBillingGhe: (enterprise: string, params: RequestParams = {}) =>
      this.request<ActionsBillingUsage, any>({
        path: `/enterprises/${enterprise}/settings/billing/actions`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Gets the free and paid storage used for GitHub Packages in gigabytes. Paid minutes only apply to packages stored for private repositories. For more information, see "[Managing billing for GitHub Packages](https://help.github.com/github/setting-up-and-managing-billing-and-payments-on-github/managing-billing-for-github-packages)." The authenticated user must be an enterprise admin.
     *
     * @tags billing
     * @name BillingGetGithubPackagesBillingGhe
     * @summary Get GitHub Packages billing for an enterprise
     * @request GET:/enterprises/{enterprise}/settings/billing/packages
     */
    billingGetGithubPackagesBillingGhe: (enterprise: string, params: RequestParams = {}) =>
      this.request<PackagesBillingUsage, any>({
        path: `/enterprises/${enterprise}/settings/billing/packages`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Gets the estimated paid and estimated total storage used for GitHub Actions and Github Packages. Paid minutes only apply to packages stored for private repositories. For more information, see "[Managing billing for GitHub Packages](https://help.github.com/github/setting-up-and-managing-billing-and-payments-on-github/managing-billing-for-github-packages)." The authenticated user must be an enterprise admin.
     *
     * @tags billing
     * @name BillingGetSharedStorageBillingGhe
     * @summary Get shared storage billing for an enterprise
     * @request GET:/enterprises/{enterprise}/settings/billing/shared-storage
     */
    billingGetSharedStorageBillingGhe: (enterprise: string, params: RequestParams = {}) =>
      this.request<CombinedBillingUsage, any>({
        path: `/enterprises/${enterprise}/settings/billing/shared-storage`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  events = {
    /**
     * @description We delay the public events feed by five minutes, which means the most recent event returned by the public events API actually occurred at least five minutes ago.
     *
     * @tags activity
     * @name ActivityListPublicEvents
     * @summary List public events
     * @request GET:/events
     */
    activityListPublicEvents: (query?: { per_page?: number; page?: number }, params: RequestParams = {}) =>
      this.request<Event[], BasicError | { code?: string; message?: string; documentation_url?: string }>({
        path: `/events`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  feeds = {
    /**
     * @description GitHub provides several timeline resources in [Atom](http://en.wikipedia.org/wiki/Atom_(standard)) format. The Feeds API lists all the feeds available to the authenticated user: *   **Timeline**: The GitHub global public timeline *   **User**: The public timeline for any user, using [URI template](https://docs.github.com/rest/overview/resources-in-the-rest-api#hypermedia) *   **Current user public**: The public timeline for the authenticated user *   **Current user**: The private timeline for the authenticated user *   **Current user actor**: The private timeline for activity created by the authenticated user *   **Current user organizations**: The private timeline for the organizations the authenticated user is a member of. *   **Security advisories**: A collection of public announcements that provide information about security-related vulnerabilities in software on GitHub. **Note**: Private feeds are only returned when [authenticating via Basic Auth](https://docs.github.com/rest/overview/other-authentication-methods#basic-authentication) since current feed URIs use the older, non revocable auth tokens.
     *
     * @tags activity
     * @name ActivityGetFeeds
     * @summary Get feeds
     * @request GET:/feeds
     */
    activityGetFeeds: (params: RequestParams = {}) =>
      this.request<Feed, any>({
        path: `/feeds`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  gists = {
    /**
     * @description Lists the authenticated user's gists or if called anonymously, this endpoint returns all public gists:
     *
     * @tags gists
     * @name GistsList
     * @summary List gists for the authenticated user
     * @request GET:/gists
     */
    gistsList: (query?: { since?: string; per_page?: number; page?: number }, params: RequestParams = {}) =>
      this.request<BaseGist[], BasicError>({
        path: `/gists`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Allows you to add a new gist with one or more files. **Note:** Don't name your files "gistfile" with a numerical suffix. This is the format of the automatic naming scheme that Gist uses internally.
     *
     * @tags gists
     * @name GistsCreate
     * @summary Create a gist
     * @request POST:/gists
     */
    gistsCreate: (
      data: { description?: string; files: Record<string, { content: string }>; public?: boolean | "true" | "false" },
      params: RequestParams = {},
    ) =>
      this.request<GistSimple, BasicError | ValidationError>({
        path: `/gists`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description List public gists sorted by most recently updated to least recently updated. Note: With [pagination](https://docs.github.com/rest/overview/resources-in-the-rest-api#pagination), you can fetch up to 3000 gists. For example, you can fetch 100 pages with 30 gists per page or 30 pages with 100 gists per page.
     *
     * @tags gists
     * @name GistsListPublic
     * @summary List public gists
     * @request GET:/gists/public
     */
    gistsListPublic: (query?: { since?: string; per_page?: number; page?: number }, params: RequestParams = {}) =>
      this.request<BaseGist[], BasicError | ValidationError>({
        path: `/gists/public`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description List the authenticated user's starred gists:
     *
     * @tags gists
     * @name GistsListStarred
     * @summary List starred gists
     * @request GET:/gists/starred
     */
    gistsListStarred: (query?: { since?: string; per_page?: number; page?: number }, params: RequestParams = {}) =>
      this.request<BaseGist[], BasicError>({
        path: `/gists/starred`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags gists
     * @name GistsGet
     * @summary Get a gist
     * @request GET:/gists/{gist_id}
     */
    gistsGet: (gistId: string, params: RequestParams = {}) =>
      this.request<
        GistSimple,
        | {
            block?: { reason?: string; created_at?: string; html_url?: string | null };
            message?: string;
            documentation_url?: string;
          }
        | BasicError
      >({
        path: `/gists/${gistId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Allows you to update or delete a gist file and rename gist files. Files from the previous version of the gist that aren't explicitly changed during an edit are unchanged.
     *
     * @tags gists
     * @name GistsUpdate
     * @summary Update a gist
     * @request PATCH:/gists/{gist_id}
     */
    gistsUpdate: (
      gistId: string,
      data: (
        | { description: string }
        | {
            files: Record<
              string,
              (
                | { content: string }
                | { filename: string | null }
                | object
                | ({ content: string } & { filename: string | null } & object)
              ) & { content?: string; filename?: string | null }
            >;
          }
        | ({ description: string } & {
            files: Record<
              string,
              (
                | { content: string }
                | { filename: string | null }
                | object
                | ({ content: string } & { filename: string | null } & object)
              ) & { content?: string; filename?: string | null }
            >;
          })
      ) & {
        description?: string;
        files?: Record<
          string,
          (
            | { content: string }
            | { filename: string | null }
            | object
            | ({ content: string } & { filename: string | null } & object)
          ) & { content?: string; filename?: string | null }
        >;
      },
      params: RequestParams = {},
    ) =>
      this.request<GistSimple, BasicError | ValidationError>({
        path: `/gists/${gistId}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags gists
     * @name GistsDelete
     * @summary Delete a gist
     * @request DELETE:/gists/{gist_id}
     */
    gistsDelete: (gistId: string, params: RequestParams = {}) =>
      this.request<void, BasicError>({
        path: `/gists/${gistId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags gists
     * @name GistsListComments
     * @summary List gist comments
     * @request GET:/gists/{gist_id}/comments
     */
    gistsListComments: (gistId: string, query?: { per_page?: number; page?: number }, params: RequestParams = {}) =>
      this.request<GistComment[], BasicError>({
        path: `/gists/${gistId}/comments`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags gists
     * @name GistsCreateComment
     * @summary Create a gist comment
     * @request POST:/gists/{gist_id}/comments
     */
    gistsCreateComment: (gistId: string, data: { body: string }, params: RequestParams = {}) =>
      this.request<GistComment, BasicError>({
        path: `/gists/${gistId}/comments`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags gists
     * @name GistsGetComment
     * @summary Get a gist comment
     * @request GET:/gists/{gist_id}/comments/{comment_id}
     */
    gistsGetComment: (gistId: string, commentId: number, params: RequestParams = {}) =>
      this.request<
        GistComment,
        | {
            block?: { reason?: string; created_at?: string; html_url?: string | null };
            message?: string;
            documentation_url?: string;
          }
        | BasicError
      >({
        path: `/gists/${gistId}/comments/${commentId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags gists
     * @name GistsUpdateComment
     * @summary Update a gist comment
     * @request PATCH:/gists/{gist_id}/comments/{comment_id}
     */
    gistsUpdateComment: (gistId: string, commentId: number, data: { body: string }, params: RequestParams = {}) =>
      this.request<GistComment, BasicError>({
        path: `/gists/${gistId}/comments/${commentId}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags gists
     * @name GistsDeleteComment
     * @summary Delete a gist comment
     * @request DELETE:/gists/{gist_id}/comments/{comment_id}
     */
    gistsDeleteComment: (gistId: string, commentId: number, params: RequestParams = {}) =>
      this.request<void, BasicError>({
        path: `/gists/${gistId}/comments/${commentId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags gists
     * @name GistsListCommits
     * @summary List gist commits
     * @request GET:/gists/{gist_id}/commits
     */
    gistsListCommits: (gistId: string, query?: { per_page?: number; page?: number }, params: RequestParams = {}) =>
      this.request<GistCommit[], BasicError>({
        path: `/gists/${gistId}/commits`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags gists
     * @name GistsListForks
     * @summary List gist forks
     * @request GET:/gists/{gist_id}/forks
     */
    gistsListForks: (gistId: string, query?: { per_page?: number; page?: number }, params: RequestParams = {}) =>
      this.request<GistSimple[], BasicError>({
        path: `/gists/${gistId}/forks`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description **Note**: This was previously `/gists/:gist_id/fork`.
     *
     * @tags gists
     * @name GistsFork
     * @summary Fork a gist
     * @request POST:/gists/{gist_id}/forks
     */
    gistsFork: (gistId: string, params: RequestParams = {}) =>
      this.request<BaseGist, BasicError | ValidationError>({
        path: `/gists/${gistId}/forks`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags gists
     * @name GistsCheckIsStarred
     * @summary Check if a gist is starred
     * @request GET:/gists/{gist_id}/star
     */
    gistsCheckIsStarred: (gistId: string, params: RequestParams = {}) =>
      this.request<void, BasicError | object>({
        path: `/gists/${gistId}/star`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Note that you'll need to set `Content-Length` to zero when calling out to this endpoint. For more information, see "[HTTP verbs](https://docs.github.com/rest/overview/resources-in-the-rest-api#http-verbs)."
     *
     * @tags gists
     * @name GistsStar
     * @summary Star a gist
     * @request PUT:/gists/{gist_id}/star
     */
    gistsStar: (gistId: string, params: RequestParams = {}) =>
      this.request<void, BasicError>({
        path: `/gists/${gistId}/star`,
        method: "PUT",
        ...params,
      }),

    /**
     * No description
     *
     * @tags gists
     * @name GistsUnstar
     * @summary Unstar a gist
     * @request DELETE:/gists/{gist_id}/star
     */
    gistsUnstar: (gistId: string, params: RequestParams = {}) =>
      this.request<void, BasicError>({
        path: `/gists/${gistId}/star`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags gists
     * @name GistsGetRevision
     * @summary Get a gist revision
     * @request GET:/gists/{gist_id}/{sha}
     */
    gistsGetRevision: (gistId: string, sha: string, params: RequestParams = {}) =>
      this.request<GistSimple, BasicError | ValidationError>({
        path: `/gists/${gistId}/${sha}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  gitignore = {
    /**
     * @description List all templates available to pass as an option when [creating a repository](https://docs.github.com/rest/reference/repos#create-a-repository-for-the-authenticated-user).
     *
     * @tags gitignore
     * @name GitignoreGetAllTemplates
     * @summary Get all gitignore templates
     * @request GET:/gitignore/templates
     */
    gitignoreGetAllTemplates: (params: RequestParams = {}) =>
      this.request<string[], any>({
        path: `/gitignore/templates`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description The API also allows fetching the source of a single template. Use the raw [media type](https://docs.github.com/rest/overview/media-types/) to get the raw contents.
     *
     * @tags gitignore
     * @name GitignoreGetTemplate
     * @summary Get a gitignore template
     * @request GET:/gitignore/templates/{name}
     */
    gitignoreGetTemplate: (name: string, params: RequestParams = {}) =>
      this.request<GitignoreTemplate, any>({
        path: `/gitignore/templates/${name}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  installation = {
    /**
     * @description List repositories that an app installation can access. You must use an [installation access token](https://docs.github.com/apps/building-github-apps/authenticating-with-github-apps/#authenticating-as-an-installation) to access this endpoint.
     *
     * @tags apps
     * @name AppsListReposAccessibleToInstallation
     * @summary List repositories accessible to the app installation
     * @request GET:/installation/repositories
     */
    appsListReposAccessibleToInstallation: (query?: { per_page?: number; page?: number }, params: RequestParams = {}) =>
      this.request<{ total_count: number; repositories: Repository[]; repository_selection?: string }, BasicError>({
        path: `/installation/repositories`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Revokes the installation token you're using to authenticate as an installation and access this endpoint. Once an installation token is revoked, the token is invalidated and cannot be used. Other endpoints that require the revoked installation token must have a new installation token to work. You can create a new token using the "[Create an installation access token for an app](https://docs.github.com/rest/reference/apps#create-an-installation-access-token-for-an-app)" endpoint. You must use an [installation access token](https://docs.github.com/apps/building-github-apps/authenticating-with-github-apps/#authenticating-as-an-installation) to access this endpoint.
     *
     * @tags apps
     * @name AppsRevokeInstallationAccessToken
     * @summary Revoke an installation access token
     * @request DELETE:/installation/token
     */
    appsRevokeInstallationAccessToken: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/installation/token`,
        method: "DELETE",
        ...params,
      }),
  };
  issues = {
    /**
     * @description List issues assigned to the authenticated user across all visible repositories including owned repositories, member repositories, and organization repositories. You can use the `filter` query parameter to fetch issues that are not necessarily assigned to you. **Note**: GitHub's REST API v3 considers every pull request an issue, but not every issue is a pull request. For this reason, "Issues" endpoints may return both issues and pull requests in the response. You can identify pull requests by the `pull_request` key. Be aware that the `id` of a pull request returned from "Issues" endpoints will be an _issue id_. To find out the pull request id, use the "[List pull requests](https://docs.github.com/rest/reference/pulls#list-pull-requests)" endpoint.
     *
     * @tags issues
     * @name IssuesList
     * @summary List issues assigned to the authenticated user
     * @request GET:/issues
     */
    issuesList: (
      query?: {
        filter?: "assigned" | "created" | "mentioned" | "subscribed" | "all";
        state?: "open" | "closed" | "all";
        labels?: string;
        sort?: "created" | "updated" | "comments";
        direction?: "asc" | "desc";
        since?: string;
        collab?: boolean;
        orgs?: boolean;
        owned?: boolean;
        pulls?: boolean;
        per_page?: number;
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<Issue[], BasicError | ValidationError>({
        path: `/issues`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  licenses = {
    /**
     * No description
     *
     * @tags licenses
     * @name LicensesGetAllCommonlyUsed
     * @summary Get all commonly used licenses
     * @request GET:/licenses
     */
    licensesGetAllCommonlyUsed: (query?: { featured?: boolean; per_page?: number }, params: RequestParams = {}) =>
      this.request<LicenseSimple[], any>({
        path: `/licenses`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags licenses
     * @name LicensesGet
     * @summary Get a license
     * @request GET:/licenses/{license}
     */
    licensesGet: (license: string, params: RequestParams = {}) =>
      this.request<License, BasicError>({
        path: `/licenses/${license}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  markdown = {
    /**
     * No description
     *
     * @tags markdown
     * @name MarkdownRender
     * @summary Render a Markdown document
     * @request POST:/markdown
     */
    markdownRender: (data: { text: string; mode?: "markdown" | "gfm"; context?: string }, params: RequestParams = {}) =>
      this.request<WebhookConfigUrl, any>({
        path: `/markdown`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description You must send Markdown as plain text (using a `Content-Type` header of `text/plain` or `text/x-markdown`) to this endpoint, rather than using JSON format. In raw mode, [GitHub Flavored Markdown](https://github.github.com/gfm/) is not supported and Markdown will be rendered in plain format like a README.md file. Markdown content must be 400 KB or less.
     *
     * @tags markdown
     * @name MarkdownRenderRaw
     * @summary Render a Markdown document in raw mode
     * @request POST:/markdown/raw
     */
    markdownRenderRaw: (data: WebhookConfigUrl, params: RequestParams = {}) =>
      this.request<WebhookConfigUrl, any>({
        path: `/markdown/raw`,
        method: "POST",
        body: data,
        ...params,
      }),
  };
  marketplaceListing = {
    /**
     * @description Shows whether the user or organization account actively subscribes to a plan listed by the authenticated GitHub App. When someone submits a plan change that won't be processed until the end of their billing cycle, you will also see the upcoming pending change. GitHub Apps must use a [JWT](https://docs.github.com/apps/building-github-apps/authenticating-with-github-apps/#authenticating-as-a-github-app) to access this endpoint. OAuth Apps must use [basic authentication](https://docs.github.com/rest/overview/other-authentication-methods#basic-authentication) with their client ID and client secret to access this endpoint.
     *
     * @tags apps
     * @name AppsGetSubscriptionPlanForAccount
     * @summary Get a subscription plan for an account
     * @request GET:/marketplace_listing/accounts/{account_id}
     */
    appsGetSubscriptionPlanForAccount: (accountId: number, params: RequestParams = {}) =>
      this.request<MarketplacePurchase, BasicError>({
        path: `/marketplace_listing/accounts/${accountId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Lists all plans that are part of your GitHub Marketplace listing. GitHub Apps must use a [JWT](https://docs.github.com/apps/building-github-apps/authenticating-with-github-apps/#authenticating-as-a-github-app) to access this endpoint. OAuth Apps must use [basic authentication](https://docs.github.com/rest/overview/other-authentication-methods#basic-authentication) with their client ID and client secret to access this endpoint.
     *
     * @tags apps
     * @name AppsListPlans
     * @summary List plans
     * @request GET:/marketplace_listing/plans
     */
    appsListPlans: (query?: { per_page?: number; page?: number }, params: RequestParams = {}) =>
      this.request<MarketplaceListingPlan[], BasicError>({
        path: `/marketplace_listing/plans`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns user and organization accounts associated with the specified plan, including free plans. For per-seat pricing, you see the list of accounts that have purchased the plan, including the number of seats purchased. When someone submits a plan change that won't be processed until the end of their billing cycle, you will also see the upcoming pending change. GitHub Apps must use a [JWT](https://docs.github.com/apps/building-github-apps/authenticating-with-github-apps/#authenticating-as-a-github-app) to access this endpoint. OAuth Apps must use [basic authentication](https://docs.github.com/rest/overview/other-authentication-methods#basic-authentication) with their client ID and client secret to access this endpoint.
     *
     * @tags apps
     * @name AppsListAccountsForPlan
     * @summary List accounts for a plan
     * @request GET:/marketplace_listing/plans/{plan_id}/accounts
     */
    appsListAccountsForPlan: (
      planId: number,
      query?: { sort?: "created" | "updated"; direction?: "asc" | "desc"; per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<MarketplacePurchase[], BasicError | ValidationError>({
        path: `/marketplace_listing/plans/${planId}/accounts`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Shows whether the user or organization account actively subscribes to a plan listed by the authenticated GitHub App. When someone submits a plan change that won't be processed until the end of their billing cycle, you will also see the upcoming pending change. GitHub Apps must use a [JWT](https://docs.github.com/apps/building-github-apps/authenticating-with-github-apps/#authenticating-as-a-github-app) to access this endpoint. OAuth Apps must use [basic authentication](https://docs.github.com/rest/overview/other-authentication-methods#basic-authentication) with their client ID and client secret to access this endpoint.
     *
     * @tags apps
     * @name AppsGetSubscriptionPlanForAccountStubbed
     * @summary Get a subscription plan for an account (stubbed)
     * @request GET:/marketplace_listing/stubbed/accounts/{account_id}
     */
    appsGetSubscriptionPlanForAccountStubbed: (accountId: number, params: RequestParams = {}) =>
      this.request<MarketplacePurchase, BasicError | void>({
        path: `/marketplace_listing/stubbed/accounts/${accountId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Lists all plans that are part of your GitHub Marketplace listing. GitHub Apps must use a [JWT](https://docs.github.com/apps/building-github-apps/authenticating-with-github-apps/#authenticating-as-a-github-app) to access this endpoint. OAuth Apps must use [basic authentication](https://docs.github.com/rest/overview/other-authentication-methods#basic-authentication) with their client ID and client secret to access this endpoint.
     *
     * @tags apps
     * @name AppsListPlansStubbed
     * @summary List plans (stubbed)
     * @request GET:/marketplace_listing/stubbed/plans
     */
    appsListPlansStubbed: (query?: { per_page?: number; page?: number }, params: RequestParams = {}) =>
      this.request<MarketplaceListingPlan[], BasicError>({
        path: `/marketplace_listing/stubbed/plans`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns repository and organization accounts associated with the specified plan, including free plans. For per-seat pricing, you see the list of accounts that have purchased the plan, including the number of seats purchased. When someone submits a plan change that won't be processed until the end of their billing cycle, you will also see the upcoming pending change. GitHub Apps must use a [JWT](https://docs.github.com/apps/building-github-apps/authenticating-with-github-apps/#authenticating-as-a-github-app) to access this endpoint. OAuth Apps must use [basic authentication](https://docs.github.com/rest/overview/other-authentication-methods#basic-authentication) with their client ID and client secret to access this endpoint.
     *
     * @tags apps
     * @name AppsListAccountsForPlanStubbed
     * @summary List accounts for a plan (stubbed)
     * @request GET:/marketplace_listing/stubbed/plans/{plan_id}/accounts
     */
    appsListAccountsForPlanStubbed: (
      planId: number,
      query?: { sort?: "created" | "updated"; direction?: "asc" | "desc"; per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<MarketplacePurchase[], BasicError>({
        path: `/marketplace_listing/stubbed/plans/${planId}/accounts`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  meta = {
    /**
     * @description Returns meta information about GitHub, including a list of GitHub's IP addresses. For more information, see "[About GitHub's IP addresses](https://help.github.com/articles/about-github-s-ip-addresses/)." **Note:** The IP addresses shown in the documentation's response are only example values. You must always query the API directly to get the latest list of IP addresses.
     *
     * @tags meta
     * @name MetaGet
     * @summary Get GitHub meta information
     * @request GET:/meta
     */
    metaGet: (params: RequestParams = {}) =>
      this.request<ApiOverview, any>({
        path: `/meta`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  networks = {
    /**
     * No description
     *
     * @tags activity
     * @name ActivityListPublicEventsForRepoNetwork
     * @summary List public events for a network of repositories
     * @request GET:/networks/{owner}/{repo}/events
     */
    activityListPublicEventsForRepoNetwork: (
      owner: string,
      repo: string,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<Event[], BasicError>({
        path: `/networks/${owner}/${repo}/events`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  notifications = {
    /**
     * @description List all notifications for the current user, sorted by most recently updated.
     *
     * @tags activity
     * @name ActivityListNotificationsForAuthenticatedUser
     * @summary List notifications for the authenticated user
     * @request GET:/notifications
     */
    activityListNotificationsForAuthenticatedUser: (
      query?: {
        all?: boolean;
        participating?: boolean;
        since?: string;
        before?: string;
        per_page?: number;
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<Thread[], BasicError | ValidationError>({
        path: `/notifications`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Marks all notifications as "read" removes it from the [default view on GitHub](https://github.com/notifications). If the number of notifications is too large to complete in one request, you will receive a `202 Accepted` status and GitHub will run an asynchronous process to mark notifications as "read." To check whether any "unread" notifications remain, you can use the [List notifications for the authenticated user](https://docs.github.com/rest/reference/activity#list-notifications-for-the-authenticated-user) endpoint and pass the query parameter `all=false`.
     *
     * @tags activity
     * @name ActivityMarkNotificationsAsRead
     * @summary Mark notifications as read
     * @request PUT:/notifications
     */
    activityMarkNotificationsAsRead: (data: { last_read_at?: string; read?: boolean }, params: RequestParams = {}) =>
      this.request<{ message?: string }, BasicError>({
        path: `/notifications`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags activity
     * @name ActivityGetThread
     * @summary Get a thread
     * @request GET:/notifications/threads/{thread_id}
     */
    activityGetThread: (threadId: number, params: RequestParams = {}) =>
      this.request<Thread, BasicError>({
        path: `/notifications/threads/${threadId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags activity
     * @name ActivityMarkThreadAsRead
     * @summary Mark a thread as read
     * @request PATCH:/notifications/threads/{thread_id}
     */
    activityMarkThreadAsRead: (threadId: number, params: RequestParams = {}) =>
      this.request<void, BasicError>({
        path: `/notifications/threads/${threadId}`,
        method: "PATCH",
        ...params,
      }),

    /**
     * @description This checks to see if the current user is subscribed to a thread. You can also [get a repository subscription](https://docs.github.com/rest/reference/activity#get-a-repository-subscription). Note that subscriptions are only generated if a user is participating in a conversation--for example, they've replied to the thread, were **@mentioned**, or manually subscribe to a thread.
     *
     * @tags activity
     * @name ActivityGetThreadSubscriptionForAuthenticatedUser
     * @summary Get a thread subscription for the authenticated user
     * @request GET:/notifications/threads/{thread_id}/subscription
     */
    activityGetThreadSubscriptionForAuthenticatedUser: (threadId: number, params: RequestParams = {}) =>
      this.request<ThreadSubscription, BasicError>({
        path: `/notifications/threads/${threadId}/subscription`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description If you are watching a repository, you receive notifications for all threads by default. Use this endpoint to ignore future notifications for threads until you comment on the thread or get an **@mention**. You can also use this endpoint to subscribe to threads that you are currently not receiving notifications for or to subscribed to threads that you have previously ignored. Unsubscribing from a conversation in a repository that you are not watching is functionally equivalent to the [Delete a thread subscription](https://docs.github.com/rest/reference/activity#delete-a-thread-subscription) endpoint.
     *
     * @tags activity
     * @name ActivitySetThreadSubscription
     * @summary Set a thread subscription
     * @request PUT:/notifications/threads/{thread_id}/subscription
     */
    activitySetThreadSubscription: (threadId: number, data: { ignored?: boolean }, params: RequestParams = {}) =>
      this.request<ThreadSubscription, BasicError>({
        path: `/notifications/threads/${threadId}/subscription`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Mutes all future notifications for a conversation until you comment on the thread or get an **@mention**. If you are watching the repository of the thread, you will still receive notifications. To ignore future notifications for a repository you are watching, use the [Set a thread subscription](https://docs.github.com/rest/reference/activity#set-a-thread-subscription) endpoint and set `ignore` to `true`.
     *
     * @tags activity
     * @name ActivityDeleteThreadSubscription
     * @summary Delete a thread subscription
     * @request DELETE:/notifications/threads/{thread_id}/subscription
     */
    activityDeleteThreadSubscription: (threadId: number, params: RequestParams = {}) =>
      this.request<void, BasicError>({
        path: `/notifications/threads/${threadId}/subscription`,
        method: "DELETE",
        ...params,
      }),
  };
  octocat = {
    /**
     * @description Get the octocat as ASCII art
     *
     * @tags meta
     * @name MetaGetOctocat
     * @summary Get Octocat
     * @request GET:/octocat
     */
    metaGetOctocat: (query?: { s?: string }, params: RequestParams = {}) =>
      this.request<WebhookConfigUrl, any>({
        path: `/octocat`,
        method: "GET",
        query: query,
        ...params,
      }),
  };
  organizations = {
    /**
     * @description Lists all organizations, in the order that they were created on GitHub. **Note:** Pagination is powered exclusively by the `since` parameter. Use the [Link header](https://docs.github.com/rest/overview/resources-in-the-rest-api#link-header) to get the URL for the next page of organizations.
     *
     * @tags orgs
     * @name OrgsList
     * @summary List organizations
     * @request GET:/organizations
     */
    orgsList: (query?: { since?: number; per_page?: number }, params: RequestParams = {}) =>
      this.request<OrganizationSimple[], any>({
        path: `/organizations`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  orgs = {
    /**
     * @description To see many of the organization response values, you need to be an authenticated organization owner with the `admin:org` scope. When the value of `two_factor_requirement_enabled` is `true`, the organization requires all members, billing managers, and outside collaborators to enable [two-factor authentication](https://help.github.com/articles/securing-your-account-with-two-factor-authentication-2fa/). GitHub Apps with the `Organization plan` permission can use this endpoint to retrieve information about an organization's GitHub plan. See "[Authenticating with GitHub Apps](https://docs.github.com/apps/building-github-apps/authenticating-with-github-apps/)" for details. For an example response, see 'Response with GitHub plan information' below."
     *
     * @tags orgs
     * @name OrgsGet
     * @summary Get an organization
     * @request GET:/orgs/{org}
     */
    orgsGet: (org: string, params: RequestParams = {}) =>
      this.request<OrganizationFull, BasicError>({
        path: `/orgs/${org}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description **Parameter Deprecation Notice:** GitHub will replace and discontinue `members_allowed_repository_creation_type` in favor of more granular permissions. The new input parameters are `members_can_create_public_repositories`, `members_can_create_private_repositories` for all organizations and `members_can_create_internal_repositories` for organizations associated with an enterprise account using GitHub Enterprise Cloud or GitHub Enterprise Server 2.20+. For more information, see the [blog post](https://developer.github.com/changes/2019-12-03-internal-visibility-changes). Enables an authenticated organization owner with the `admin:org` scope to update the organization's profile and member privileges.
     *
     * @tags orgs
     * @name OrgsUpdate
     * @summary Update an organization
     * @request PATCH:/orgs/{org}
     */
    orgsUpdate: (
      org: string,
      data: {
        billing_email?: string;
        company?: string;
        email?: string;
        twitter_username?: string;
        location?: string;
        name?: string;
        description?: string;
        has_organization_projects?: boolean;
        has_repository_projects?: boolean;
        default_repository_permission?: "read" | "write" | "admin" | "none";
        members_can_create_repositories?: boolean;
        members_can_create_internal_repositories?: boolean;
        members_can_create_private_repositories?: boolean;
        members_can_create_public_repositories?: boolean;
        members_allowed_repository_creation_type?: "all" | "private" | "none";
        members_can_create_pages?: boolean;
        members_can_create_public_pages?: boolean;
        members_can_create_private_pages?: boolean;
        blog?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        OrganizationFull,
        BasicError | { message: string; documentation_url: string } | (ValidationError | ValidationErrorSimple)
      >({
        path: `/orgs/${org}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets the GitHub Actions permissions policy for repositories and allowed actions in an organization. You must authenticate using an access token with the `admin:org` scope to use this endpoint. GitHub Apps must have the `administration` organization permission to use this API.
     *
     * @tags actions
     * @name ActionsGetGithubActionsPermissionsOrganization
     * @summary Get GitHub Actions permissions for an organization
     * @request GET:/orgs/{org}/actions/permissions
     */
    actionsGetGithubActionsPermissionsOrganization: (org: string, params: RequestParams = {}) =>
      this.request<ActionsOrganizationPermissions, any>({
        path: `/orgs/${org}/actions/permissions`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Sets the GitHub Actions permissions policy for repositories and allowed actions in an organization. If the organization belongs to an enterprise that has set restrictive permissions at the enterprise level, such as `allowed_actions` to `selected` actions, then you cannot override them for the organization. You must authenticate using an access token with the `admin:org` scope to use this endpoint. GitHub Apps must have the `administration` organization permission to use this API.
     *
     * @tags actions
     * @name ActionsSetGithubActionsPermissionsOrganization
     * @summary Set GitHub Actions permissions for an organization
     * @request PUT:/orgs/{org}/actions/permissions
     */
    actionsSetGithubActionsPermissionsOrganization: (
      org: string,
      data: { enabled_repositories: EnabledRepositories; allowed_actions?: AllowedActions },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/orgs/${org}/actions/permissions`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Lists the selected repositories that are enabled for GitHub Actions in an organization. To use this endpoint, the organization permission policy for `enabled_repositories` must be configured to `selected`. For more information, see "[Set GitHub Actions permissions for an organization](#set-github-actions-permissions-for-an-organization)." You must authenticate using an access token with the `admin:org` scope to use this endpoint. GitHub Apps must have the `administration` organization permission to use this API.
     *
     * @tags actions
     * @name ActionsListSelectedRepositoriesEnabledGithubActionsOrganization
     * @summary List selected repositories enabled for GitHub Actions in an organization
     * @request GET:/orgs/{org}/actions/permissions/repositories
     */
    actionsListSelectedRepositoriesEnabledGithubActionsOrganization: (
      org: string,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<{ total_count: number; repositories: Repository[] }, any>({
        path: `/orgs/${org}/actions/permissions/repositories`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Replaces the list of selected repositories that are enabled for GitHub Actions in an organization. To use this endpoint, the organization permission policy for `enabled_repositories` must be configured to `selected`. For more information, see "[Set GitHub Actions permissions for an organization](#set-github-actions-permissions-for-an-organization)." You must authenticate using an access token with the `admin:org` scope to use this endpoint. GitHub Apps must have the `administration` organization permission to use this API.
     *
     * @tags actions
     * @name ActionsSetSelectedRepositoriesEnabledGithubActionsOrganization
     * @summary Set selected repositories enabled for GitHub Actions in an organization
     * @request PUT:/orgs/{org}/actions/permissions/repositories
     */
    actionsSetSelectedRepositoriesEnabledGithubActionsOrganization: (
      org: string,
      data: { selected_repository_ids: number[] },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/orgs/${org}/actions/permissions/repositories`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Adds a repository to the list of selected repositories that are enabled for GitHub Actions in an organization. To use this endpoint, the organization permission policy for `enabled_repositories` must be must be configured to `selected`. For more information, see "[Set GitHub Actions permissions for an organization](#set-github-actions-permissions-for-an-organization)." You must authenticate using an access token with the `admin:org` scope to use this endpoint. GitHub Apps must have the `administration` organization permission to use this API.
     *
     * @tags actions
     * @name ActionsEnableSelectedRepositoryGithubActionsOrganization
     * @summary Enable a selected repository for GitHub Actions in an organization
     * @request PUT:/orgs/{org}/actions/permissions/repositories/{repository_id}
     */
    actionsEnableSelectedRepositoryGithubActionsOrganization: (
      org: string,
      repositoryId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/orgs/${org}/actions/permissions/repositories/${repositoryId}`,
        method: "PUT",
        ...params,
      }),

    /**
     * @description Removes a repository from the list of selected repositories that are enabled for GitHub Actions in an organization. To use this endpoint, the organization permission policy for `enabled_repositories` must be configured to `selected`. For more information, see "[Set GitHub Actions permissions for an organization](#set-github-actions-permissions-for-an-organization)." You must authenticate using an access token with the `admin:org` scope to use this endpoint. GitHub Apps must have the `administration` organization permission to use this API.
     *
     * @tags actions
     * @name ActionsDisableSelectedRepositoryGithubActionsOrganization
     * @summary Disable a selected repository for GitHub Actions in an organization
     * @request DELETE:/orgs/{org}/actions/permissions/repositories/{repository_id}
     */
    actionsDisableSelectedRepositoryGithubActionsOrganization: (
      org: string,
      repositoryId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/orgs/${org}/actions/permissions/repositories/${repositoryId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Gets the selected actions that are allowed in an organization. To use this endpoint, the organization permission policy for `allowed_actions` must be configured to `selected`. For more information, see "[Set GitHub Actions permissions for an organization](#set-github-actions-permissions-for-an-organization)."" You must authenticate using an access token with the `admin:org` scope to use this endpoint. GitHub Apps must have the `administration` organization permission to use this API.
     *
     * @tags actions
     * @name ActionsGetAllowedActionsOrganization
     * @summary Get allowed actions for an organization
     * @request GET:/orgs/{org}/actions/permissions/selected-actions
     */
    actionsGetAllowedActionsOrganization: (org: string, params: RequestParams = {}) =>
      this.request<SelectedActions, any>({
        path: `/orgs/${org}/actions/permissions/selected-actions`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Sets the actions that are allowed in an organization. To use this endpoint, the organization permission policy for `allowed_actions` must be configured to `selected`. For more information, see "[Set GitHub Actions permissions for an organization](#set-github-actions-permissions-for-an-organization)." If the organization belongs to an enterprise that has `selected` actions set at the enterprise level, then you cannot override any of the enterprise's allowed actions settings. To use the `patterns_allowed` setting for private repositories, the organization must belong to an enterprise. If the organization does not belong to an enterprise, then the `patterns_allowed` setting only applies to public repositories in the organization. You must authenticate using an access token with the `admin:org` scope to use this endpoint. GitHub Apps must have the `administration` organization permission to use this API.
     *
     * @tags actions
     * @name ActionsSetAllowedActionsOrganization
     * @summary Set allowed actions for an organization
     * @request PUT:/orgs/{org}/actions/permissions/selected-actions
     */
    actionsSetAllowedActionsOrganization: (org: string, data: SelectedActions, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/orgs/${org}/actions/permissions/selected-actions`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description The self-hosted runner groups REST API is available with GitHub Enterprise Cloud. For more information, see "[GitHub's products](https://docs.github.com/github/getting-started-with-github/githubs-products)." Lists all self-hosted runner groups configured in an organization and inherited from an enterprise. You must authenticate using an access token with the `admin:org` scope to use this endpoint.
     *
     * @tags actions
     * @name ActionsListSelfHostedRunnerGroupsForOrg
     * @summary List self-hosted runner groups for an organization
     * @request GET:/orgs/{org}/actions/runner-groups
     */
    actionsListSelfHostedRunnerGroupsForOrg: (
      org: string,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<{ total_count: number; runner_groups: RunnerGroupsOrg[] }, any>({
        path: `/orgs/${org}/actions/runner-groups`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description The self-hosted runner groups REST API is available with GitHub Enterprise Cloud and GitHub Enterprise Server. For more information, see "[GitHub's products](https://docs.github.com/github/getting-started-with-github/githubs-products)." Creates a new self-hosted runner group for an organization. You must authenticate using an access token with the `admin:org` scope to use this endpoint.
     *
     * @tags actions
     * @name ActionsCreateSelfHostedRunnerGroupForOrg
     * @summary Create a self-hosted runner group for an organization
     * @request POST:/orgs/{org}/actions/runner-groups
     */
    actionsCreateSelfHostedRunnerGroupForOrg: (
      org: string,
      data: {
        name: string;
        visibility?: "selected" | "all" | "private";
        selected_repository_ids?: number[];
        runners?: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<RunnerGroupsOrg, any>({
        path: `/orgs/${org}/actions/runner-groups`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description The self-hosted runner groups REST API is available with GitHub Enterprise Cloud. For more information, see "[GitHub's products](https://docs.github.com/github/getting-started-with-github/githubs-products)." Gets a specific self-hosted runner group for an organization. You must authenticate using an access token with the `admin:org` scope to use this endpoint.
     *
     * @tags actions
     * @name ActionsGetSelfHostedRunnerGroupForOrg
     * @summary Get a self-hosted runner group for an organization
     * @request GET:/orgs/{org}/actions/runner-groups/{runner_group_id}
     */
    actionsGetSelfHostedRunnerGroupForOrg: (org: string, runnerGroupId: number, params: RequestParams = {}) =>
      this.request<RunnerGroupsOrg, any>({
        path: `/orgs/${org}/actions/runner-groups/${runnerGroupId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description The self-hosted runner groups REST API is available with GitHub Enterprise Cloud. For more information, see "[GitHub's products](https://docs.github.com/github/getting-started-with-github/githubs-products)." Updates the `name` and `visibility` of a self-hosted runner group in an organization. You must authenticate using an access token with the `admin:org` scope to use this endpoint.
     *
     * @tags actions
     * @name ActionsUpdateSelfHostedRunnerGroupForOrg
     * @summary Update a self-hosted runner group for an organization
     * @request PATCH:/orgs/{org}/actions/runner-groups/{runner_group_id}
     */
    actionsUpdateSelfHostedRunnerGroupForOrg: (
      org: string,
      runnerGroupId: number,
      data: { name?: string; visibility?: "selected" | "all" | "private" },
      params: RequestParams = {},
    ) =>
      this.request<RunnerGroupsOrg, any>({
        path: `/orgs/${org}/actions/runner-groups/${runnerGroupId}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description The self-hosted runner groups REST API is available with GitHub Enterprise Cloud. For more information, see "[GitHub's products](https://docs.github.com/github/getting-started-with-github/githubs-products)." Deletes a self-hosted runner group for an organization. You must authenticate using an access token with the `admin:org` scope to use this endpoint.
     *
     * @tags actions
     * @name ActionsDeleteSelfHostedRunnerGroupFromOrg
     * @summary Delete a self-hosted runner group from an organization
     * @request DELETE:/orgs/{org}/actions/runner-groups/{runner_group_id}
     */
    actionsDeleteSelfHostedRunnerGroupFromOrg: (org: string, runnerGroupId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/orgs/${org}/actions/runner-groups/${runnerGroupId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description The self-hosted runner groups REST API is available with GitHub Enterprise Cloud and GitHub Enterprise Server. For more information, see "[GitHub's products](https://docs.github.com/github/getting-started-with-github/githubs-products)." Lists the repositories with access to a self-hosted runner group configured in an organization. You must authenticate using an access token with the `admin:org` scope to use this endpoint.
     *
     * @tags actions
     * @name ActionsListRepoAccessToSelfHostedRunnerGroupInOrg
     * @summary List repository access to a self-hosted runner group in an organization
     * @request GET:/orgs/{org}/actions/runner-groups/{runner_group_id}/repositories
     */
    actionsListRepoAccessToSelfHostedRunnerGroupInOrg: (
      org: string,
      runnerGroupId: number,
      params: RequestParams = {},
    ) =>
      this.request<{ total_count: number; repositories: Repository[] }, any>({
        path: `/orgs/${org}/actions/runner-groups/${runnerGroupId}/repositories`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description The self-hosted runner groups REST API is available with GitHub Enterprise Cloud. For more information, see "[GitHub's products](https://docs.github.com/github/getting-started-with-github/githubs-products)." Replaces the list of repositories that have access to a self-hosted runner group configured in an organization. You must authenticate using an access token with the `admin:org` scope to use this endpoint.
     *
     * @tags actions
     * @name ActionsSetRepoAccessToSelfHostedRunnerGroupInOrg
     * @summary Set repository access for a self-hosted runner group in an organization
     * @request PUT:/orgs/{org}/actions/runner-groups/{runner_group_id}/repositories
     */
    actionsSetRepoAccessToSelfHostedRunnerGroupInOrg: (
      org: string,
      runnerGroupId: number,
      data: { selected_repository_ids: number[] },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/orgs/${org}/actions/runner-groups/${runnerGroupId}/repositories`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description The self-hosted runner groups REST API is available with GitHub Enterprise Cloud. For more information, see "[GitHub's products](https://docs.github.com/github/getting-started-with-github/githubs-products)." Adds a repository to the list of selected repositories that can access a self-hosted runner group. The runner group must have `visibility` set to `selected`. For more information, see "[Create a self-hosted runner group for an organization](#create-a-self-hosted-runner-group-for-an-organization)." You must authenticate using an access token with the `admin:org` scope to use this endpoint.
     *
     * @tags actions
     * @name ActionsAddRepoAccessToSelfHostedRunnerGroupInOrg
     * @summary Add repository access to a self-hosted runner group in an organization
     * @request PUT:/orgs/{org}/actions/runner-groups/{runner_group_id}/repositories/{repository_id}
     */
    actionsAddRepoAccessToSelfHostedRunnerGroupInOrg: (
      org: string,
      runnerGroupId: number,
      repositoryId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/orgs/${org}/actions/runner-groups/${runnerGroupId}/repositories/${repositoryId}`,
        method: "PUT",
        ...params,
      }),

    /**
     * @description The self-hosted runner groups REST API is available with GitHub Enterprise Cloud. For more information, see "[GitHub's products](https://docs.github.com/github/getting-started-with-github/githubs-products)." Removes a repository from the list of selected repositories that can access a self-hosted runner group. The runner group must have `visibility` set to `selected`. For more information, see "[Create a self-hosted runner group for an organization](#create-a-self-hosted-runner-group-for-an-organization)." You must authenticate using an access token with the `admin:org` scope to use this endpoint.
     *
     * @tags actions
     * @name ActionsRemoveRepoAccessToSelfHostedRunnerGroupInOrg
     * @summary Remove repository access to a self-hosted runner group in an organization
     * @request DELETE:/orgs/{org}/actions/runner-groups/{runner_group_id}/repositories/{repository_id}
     */
    actionsRemoveRepoAccessToSelfHostedRunnerGroupInOrg: (
      org: string,
      runnerGroupId: number,
      repositoryId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/orgs/${org}/actions/runner-groups/${runnerGroupId}/repositories/${repositoryId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description The self-hosted runner groups REST API is available with GitHub Enterprise Cloud. For more information, see "[GitHub's products](https://docs.github.com/github/getting-started-with-github/githubs-products)." Lists self-hosted runners that are in a specific organization group. You must authenticate using an access token with the `admin:org` scope to use this endpoint.
     *
     * @tags actions
     * @name ActionsListSelfHostedRunnersInGroupForOrg
     * @summary List self-hosted runners in a group for an organization
     * @request GET:/orgs/{org}/actions/runner-groups/{runner_group_id}/runners
     */
    actionsListSelfHostedRunnersInGroupForOrg: (
      org: string,
      runnerGroupId: number,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<{ total_count: number; runners: Runner[] }, any>({
        path: `/orgs/${org}/actions/runner-groups/${runnerGroupId}/runners`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description The self-hosted runner groups REST API is available with GitHub Enterprise Cloud. For more information, see "[GitHub's products](https://docs.github.com/github/getting-started-with-github/githubs-products)." Replaces the list of self-hosted runners that are part of an organization runner group. You must authenticate using an access token with the `admin:org` scope to use this endpoint.
     *
     * @tags actions
     * @name ActionsSetSelfHostedRunnersInGroupForOrg
     * @summary Set self-hosted runners in a group for an organization
     * @request PUT:/orgs/{org}/actions/runner-groups/{runner_group_id}/runners
     */
    actionsSetSelfHostedRunnersInGroupForOrg: (
      org: string,
      runnerGroupId: number,
      data: { runners: number[] },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/orgs/${org}/actions/runner-groups/${runnerGroupId}/runners`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description The self-hosted runner groups REST API is available with GitHub Enterprise Cloud. For more information, see "[GitHub's products](https://docs.github.com/github/getting-started-with-github/githubs-products)." Adds a self-hosted runner to a runner group configured in an organization. You must authenticate using an access token with the `admin:org` scope to use this endpoint.
     *
     * @tags actions
     * @name ActionsAddSelfHostedRunnerToGroupForOrg
     * @summary Add a self-hosted runner to a group for an organization
     * @request PUT:/orgs/{org}/actions/runner-groups/{runner_group_id}/runners/{runner_id}
     */
    actionsAddSelfHostedRunnerToGroupForOrg: (
      org: string,
      runnerGroupId: number,
      runnerId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/orgs/${org}/actions/runner-groups/${runnerGroupId}/runners/${runnerId}`,
        method: "PUT",
        ...params,
      }),

    /**
     * @description The self-hosted runner groups REST API is available with GitHub Enterprise Cloud. For more information, see "[GitHub's products](https://docs.github.com/github/getting-started-with-github/githubs-products)." Removes a self-hosted runner from a group configured in an organization. The runner is then returned to the default group. You must authenticate using an access token with the `admin:org` scope to use this endpoint.
     *
     * @tags actions
     * @name ActionsRemoveSelfHostedRunnerFromGroupForOrg
     * @summary Remove a self-hosted runner from a group for an organization
     * @request DELETE:/orgs/{org}/actions/runner-groups/{runner_group_id}/runners/{runner_id}
     */
    actionsRemoveSelfHostedRunnerFromGroupForOrg: (
      org: string,
      runnerGroupId: number,
      runnerId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/orgs/${org}/actions/runner-groups/${runnerGroupId}/runners/${runnerId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Lists all self-hosted runners configured in an organization. You must authenticate using an access token with the `admin:org` scope to use this endpoint.
     *
     * @tags actions
     * @name ActionsListSelfHostedRunnersForOrg
     * @summary List self-hosted runners for an organization
     * @request GET:/orgs/{org}/actions/runners
     */
    actionsListSelfHostedRunnersForOrg: (
      org: string,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<{ total_count: number; runners: Runner[] }, any>({
        path: `/orgs/${org}/actions/runners`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Lists binaries for the runner application that you can download and run. You must authenticate using an access token with the `admin:org` scope to use this endpoint.
     *
     * @tags actions
     * @name ActionsListRunnerApplicationsForOrg
     * @summary List runner applications for an organization
     * @request GET:/orgs/{org}/actions/runners/downloads
     */
    actionsListRunnerApplicationsForOrg: (org: string, params: RequestParams = {}) =>
      this.request<RunnerApplication[], any>({
        path: `/orgs/${org}/actions/runners/downloads`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a token that you can pass to the `config` script. The token expires after one hour. You must authenticate using an access token with the `admin:org` scope to use this endpoint. #### Example using registration token Configure your self-hosted runner, replacing `TOKEN` with the registration token provided by this endpoint. ``` ./config.sh --url https://github.com/octo-org --token TOKEN ```
     *
     * @tags actions
     * @name ActionsCreateRegistrationTokenForOrg
     * @summary Create a registration token for an organization
     * @request POST:/orgs/{org}/actions/runners/registration-token
     */
    actionsCreateRegistrationTokenForOrg: (org: string, params: RequestParams = {}) =>
      this.request<AuthenticationToken, any>({
        path: `/orgs/${org}/actions/runners/registration-token`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a token that you can pass to the `config` script to remove a self-hosted runner from an organization. The token expires after one hour. You must authenticate using an access token with the `admin:org` scope to use this endpoint. #### Example using remove token To remove your self-hosted runner from an organization, replace `TOKEN` with the remove token provided by this endpoint. ``` ./config.sh remove --token TOKEN ```
     *
     * @tags actions
     * @name ActionsCreateRemoveTokenForOrg
     * @summary Create a remove token for an organization
     * @request POST:/orgs/{org}/actions/runners/remove-token
     */
    actionsCreateRemoveTokenForOrg: (org: string, params: RequestParams = {}) =>
      this.request<AuthenticationToken, any>({
        path: `/orgs/${org}/actions/runners/remove-token`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * @description Gets a specific self-hosted runner configured in an organization. You must authenticate using an access token with the `admin:org` scope to use this endpoint.
     *
     * @tags actions
     * @name ActionsGetSelfHostedRunnerForOrg
     * @summary Get a self-hosted runner for an organization
     * @request GET:/orgs/{org}/actions/runners/{runner_id}
     */
    actionsGetSelfHostedRunnerForOrg: (org: string, runnerId: number, params: RequestParams = {}) =>
      this.request<Runner, any>({
        path: `/orgs/${org}/actions/runners/${runnerId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Forces the removal of a self-hosted runner from an organization. You can use this endpoint to completely remove the runner when the machine you were using no longer exists. You must authenticate using an access token with the `admin:org` scope to use this endpoint.
     *
     * @tags actions
     * @name ActionsDeleteSelfHostedRunnerFromOrg
     * @summary Delete a self-hosted runner from an organization
     * @request DELETE:/orgs/{org}/actions/runners/{runner_id}
     */
    actionsDeleteSelfHostedRunnerFromOrg: (org: string, runnerId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/orgs/${org}/actions/runners/${runnerId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Lists all secrets available in an organization without revealing their encrypted values. You must authenticate using an access token with the `admin:org` scope to use this endpoint. GitHub Apps must have the `secrets` organization permission to use this endpoint.
     *
     * @tags actions
     * @name ActionsListOrgSecrets
     * @summary List organization secrets
     * @request GET:/orgs/{org}/actions/secrets
     */
    actionsListOrgSecrets: (org: string, query?: { per_page?: number; page?: number }, params: RequestParams = {}) =>
      this.request<{ total_count: number; secrets: OrganizationActionsSecret[] }, any>({
        path: `/orgs/${org}/actions/secrets`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets your public key, which you need to encrypt secrets. You need to encrypt a secret before you can create or update secrets. You must authenticate using an access token with the `admin:org` scope to use this endpoint. GitHub Apps must have the `secrets` organization permission to use this endpoint.
     *
     * @tags actions
     * @name ActionsGetOrgPublicKey
     * @summary Get an organization public key
     * @request GET:/orgs/{org}/actions/secrets/public-key
     */
    actionsGetOrgPublicKey: (org: string, params: RequestParams = {}) =>
      this.request<ActionsPublicKey, any>({
        path: `/orgs/${org}/actions/secrets/public-key`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Gets a single organization secret without revealing its encrypted value. You must authenticate using an access token with the `admin:org` scope to use this endpoint. GitHub Apps must have the `secrets` organization permission to use this endpoint.
     *
     * @tags actions
     * @name ActionsGetOrgSecret
     * @summary Get an organization secret
     * @request GET:/orgs/{org}/actions/secrets/{secret_name}
     */
    actionsGetOrgSecret: (org: string, secretName: string, params: RequestParams = {}) =>
      this.request<OrganizationActionsSecret, any>({
        path: `/orgs/${org}/actions/secrets/${secretName}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Creates or updates an organization secret with an encrypted value. Encrypt your secret using [LibSodium](https://libsodium.gitbook.io/doc/bindings_for_other_languages). You must authenticate using an access token with the `admin:org` scope to use this endpoint. GitHub Apps must have the `secrets` organization permission to use this endpoint. #### Example encrypting a secret using Node.js Encrypt your secret using the [tweetsodium](https://github.com/github/tweetsodium) library. ``` const sodium = require('tweetsodium'); const key = "base64-encoded-public-key"; const value = "plain-text-secret"; // Convert the message and key to Uint8Array's (Buffer implements that interface) const messageBytes = Buffer.from(value); const keyBytes = Buffer.from(key, 'base64'); // Encrypt using LibSodium. const encryptedBytes = sodium.seal(messageBytes, keyBytes); // Base64 the encrypted secret const encrypted = Buffer.from(encryptedBytes).toString('base64'); console.log(encrypted); ``` #### Example encrypting a secret using Python Encrypt your secret using [pynacl](https://pynacl.readthedocs.io/en/stable/public/#nacl-public-sealedbox) with Python 3. ``` from base64 import b64encode from nacl import encoding, public def encrypt(public_key: str, secret_value: str) -> str: """Encrypt a Unicode string using the public key.""" public_key = public.PublicKey(public_key.encode("utf-8"), encoding.Base64Encoder()) sealed_box = public.SealedBox(public_key) encrypted = sealed_box.encrypt(secret_value.encode("utf-8")) return b64encode(encrypted).decode("utf-8") ``` #### Example encrypting a secret using C# Encrypt your secret using the [Sodium.Core](https://www.nuget.org/packages/Sodium.Core/) package. ``` var secretValue = System.Text.Encoding.UTF8.GetBytes("mySecret"); var publicKey = Convert.FromBase64String("2Sg8iYjAxxmI2LvUXpJjkYrMxURPc8r+dB7TJyvvcCU="); var sealedPublicKeyBox = Sodium.SealedPublicKeyBox.Create(secretValue, publicKey); Console.WriteLine(Convert.ToBase64String(sealedPublicKeyBox)); ``` #### Example encrypting a secret using Ruby Encrypt your secret using the [rbnacl](https://github.com/RubyCrypto/rbnacl) gem. ```ruby require "rbnacl" require "base64" key = Base64.decode64("+ZYvJDZMHUfBkJdyq5Zm9SKqeuBQ4sj+6sfjlH4CgG0=") public_key = RbNaCl::PublicKey.new(key) box = RbNaCl::Boxes::Sealed.from_public_key(public_key) encrypted_secret = box.encrypt("my_secret") # Print the base64 encoded secret puts Base64.strict_encode64(encrypted_secret) ```
     *
     * @tags actions
     * @name ActionsCreateOrUpdateOrgSecret
     * @summary Create or update an organization secret
     * @request PUT:/orgs/{org}/actions/secrets/{secret_name}
     */
    actionsCreateOrUpdateOrgSecret: (
      org: string,
      secretName: string,
      data: {
        encrypted_value?: string;
        key_id?: string;
        visibility?: "all" | "private" | "selected";
        selected_repository_ids?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/orgs/${org}/actions/secrets/${secretName}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Deletes a secret in an organization using the secret name. You must authenticate using an access token with the `admin:org` scope to use this endpoint. GitHub Apps must have the `secrets` organization permission to use this endpoint.
     *
     * @tags actions
     * @name ActionsDeleteOrgSecret
     * @summary Delete an organization secret
     * @request DELETE:/orgs/{org}/actions/secrets/{secret_name}
     */
    actionsDeleteOrgSecret: (org: string, secretName: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/orgs/${org}/actions/secrets/${secretName}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Lists all repositories that have been selected when the `visibility` for repository access to a secret is set to `selected`. You must authenticate using an access token with the `admin:org` scope to use this endpoint. GitHub Apps must have the `secrets` organization permission to use this endpoint.
     *
     * @tags actions
     * @name ActionsListSelectedReposForOrgSecret
     * @summary List selected repositories for an organization secret
     * @request GET:/orgs/{org}/actions/secrets/{secret_name}/repositories
     */
    actionsListSelectedReposForOrgSecret: (org: string, secretName: string, params: RequestParams = {}) =>
      this.request<{ total_count: number; repositories: MinimalRepository[] }, any>({
        path: `/orgs/${org}/actions/secrets/${secretName}/repositories`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Replaces all repositories for an organization secret when the `visibility` for repository access is set to `selected`. The visibility is set when you [Create or update an organization secret](https://docs.github.com/rest/reference/actions#create-or-update-an-organization-secret). You must authenticate using an access token with the `admin:org` scope to use this endpoint. GitHub Apps must have the `secrets` organization permission to use this endpoint.
     *
     * @tags actions
     * @name ActionsSetSelectedReposForOrgSecret
     * @summary Set selected repositories for an organization secret
     * @request PUT:/orgs/{org}/actions/secrets/{secret_name}/repositories
     */
    actionsSetSelectedReposForOrgSecret: (
      org: string,
      secretName: string,
      data: { selected_repository_ids?: number[] },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/orgs/${org}/actions/secrets/${secretName}/repositories`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Adds a repository to an organization secret when the `visibility` for repository access is set to `selected`. The visibility is set when you [Create or update an organization secret](https://docs.github.com/rest/reference/actions#create-or-update-an-organization-secret). You must authenticate using an access token with the `admin:org` scope to use this endpoint. GitHub Apps must have the `secrets` organization permission to use this endpoint.
     *
     * @tags actions
     * @name ActionsAddSelectedRepoToOrgSecret
     * @summary Add selected repository to an organization secret
     * @request PUT:/orgs/{org}/actions/secrets/{secret_name}/repositories/{repository_id}
     */
    actionsAddSelectedRepoToOrgSecret: (
      org: string,
      secretName: string,
      repositoryId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/orgs/${org}/actions/secrets/${secretName}/repositories/${repositoryId}`,
        method: "PUT",
        ...params,
      }),

    /**
     * @description Removes a repository from an organization secret when the `visibility` for repository access is set to `selected`. The visibility is set when you [Create or update an organization secret](https://docs.github.com/rest/reference/actions#create-or-update-an-organization-secret). You must authenticate using an access token with the `admin:org` scope to use this endpoint. GitHub Apps must have the `secrets` organization permission to use this endpoint.
     *
     * @tags actions
     * @name ActionsRemoveSelectedRepoFromOrgSecret
     * @summary Remove selected repository from an organization secret
     * @request DELETE:/orgs/{org}/actions/secrets/{secret_name}/repositories/{repository_id}
     */
    actionsRemoveSelectedRepoFromOrgSecret: (
      org: string,
      secretName: string,
      repositoryId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/orgs/${org}/actions/secrets/${secretName}/repositories/${repositoryId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description **Note:** The audit log REST API is currently in beta and is subject to change. Gets the audit log for an organization. For more information, see "[Reviewing the audit log for your organization](https://docs.github.com/github/setting-up-and-managing-organizations-and-teams/reviewing-the-audit-log-for-your-organization)." To use this endpoint, you must be an organization owner, and you must use an access token with the `admin:org` scope. GitHub Apps must have the `organization_administration` read permission to use this endpoint.
     *
     * @tags orgs
     * @name OrgsGetAuditLog
     * @summary Get the audit log for an organization
     * @request GET:/orgs/{org}/audit-log
     */
    orgsGetAuditLog: (
      org: string,
      query?: {
        phrase?: string;
        include?: "web" | "git" | "all";
        after?: string;
        before?: string;
        order?: "desc" | "asc";
        per_page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<AuditLogEvent[], any>({
        path: `/orgs/${org}/audit-log`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description List the users blocked by an organization.
     *
     * @tags orgs
     * @name OrgsListBlockedUsers
     * @summary List users blocked by an organization
     * @request GET:/orgs/{org}/blocks
     */
    orgsListBlockedUsers: (org: string, params: RequestParams = {}) =>
      this.request<SimpleUser[], { message: string; documentation_url: string }>({
        path: `/orgs/${org}/blocks`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags orgs
     * @name OrgsCheckBlockedUser
     * @summary Check if a user is blocked by an organization
     * @request GET:/orgs/{org}/blocks/{username}
     */
    orgsCheckBlockedUser: (org: string, username: string, params: RequestParams = {}) =>
      this.request<void, BasicError>({
        path: `/orgs/${org}/blocks/${username}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags orgs
     * @name OrgsBlockUser
     * @summary Block a user from an organization
     * @request PUT:/orgs/{org}/blocks/{username}
     */
    orgsBlockUser: (org: string, username: string, params: RequestParams = {}) =>
      this.request<void, ValidationError>({
        path: `/orgs/${org}/blocks/${username}`,
        method: "PUT",
        ...params,
      }),

    /**
     * No description
     *
     * @tags orgs
     * @name OrgsUnblockUser
     * @summary Unblock a user from an organization
     * @request DELETE:/orgs/{org}/blocks/{username}
     */
    orgsUnblockUser: (org: string, username: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/orgs/${org}/blocks/${username}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Listing and deleting credential authorizations is available to organizations with GitHub Enterprise Cloud. For more information, see [GitHub's products](https://help.github.com/github/getting-started-with-github/githubs-products). An authenticated organization owner with the `read:org` scope can list all credential authorizations for an organization that uses SAML single sign-on (SSO). The credentials are either personal access tokens or SSH keys that organization members have authorized for the organization. For more information, see [About authentication with SAML single sign-on](https://help.github.com/en/articles/about-authentication-with-saml-single-sign-on).
     *
     * @tags orgs
     * @name OrgsListSamlSsoAuthorizations
     * @summary List SAML SSO authorizations for an organization
     * @request GET:/orgs/{org}/credential-authorizations
     */
    orgsListSamlSsoAuthorizations: (org: string, params: RequestParams = {}) =>
      this.request<CredentialAuthorization[], any>({
        path: `/orgs/${org}/credential-authorizations`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Listing and deleting credential authorizations is available to organizations with GitHub Enterprise Cloud. For more information, see [GitHub's products](https://help.github.com/github/getting-started-with-github/githubs-products). An authenticated organization owner with the `admin:org` scope can remove a credential authorization for an organization that uses SAML SSO. Once you remove someone's credential authorization, they will need to create a new personal access token or SSH key and authorize it for the organization they want to access.
     *
     * @tags orgs
     * @name OrgsRemoveSamlSsoAuthorization
     * @summary Remove a SAML SSO authorization for an organization
     * @request DELETE:/orgs/{org}/credential-authorizations/{credential_id}
     */
    orgsRemoveSamlSsoAuthorization: (org: string, credentialId: number, params: RequestParams = {}) =>
      this.request<void, BasicError>({
        path: `/orgs/${org}/credential-authorizations/${credentialId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags activity
     * @name ActivityListPublicOrgEvents
     * @summary List public organization events
     * @request GET:/orgs/{org}/events
     */
    activityListPublicOrgEvents: (
      org: string,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<Event[], any>({
        path: `/orgs/${org}/events`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description The return hash contains `failed_at` and `failed_reason` fields which represent the time at which the invitation failed and the reason for the failure.
     *
     * @tags orgs
     * @name OrgsListFailedInvitations
     * @summary List failed organization invitations
     * @request GET:/orgs/{org}/failed_invitations
     */
    orgsListFailedInvitations: (
      org: string,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<OrganizationInvitation[], BasicError>({
        path: `/orgs/${org}/failed_invitations`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags orgs
     * @name OrgsListWebhooks
     * @summary List organization webhooks
     * @request GET:/orgs/{org}/hooks
     */
    orgsListWebhooks: (org: string, query?: { per_page?: number; page?: number }, params: RequestParams = {}) =>
      this.request<OrgHook[], BasicError>({
        path: `/orgs/${org}/hooks`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Here's how you can create a hook that posts payloads in JSON format:
     *
     * @tags orgs
     * @name OrgsCreateWebhook
     * @summary Create an organization webhook
     * @request POST:/orgs/{org}/hooks
     */
    orgsCreateWebhook: (
      org: string,
      data: {
        name: string;
        config: {
          url: WebhookConfigUrl;
          content_type?: WebhookConfigContentType;
          secret?: WebhookConfigSecret;
          insecure_ssl?: WebhookConfigInsecureSsl;
          username?: string;
          password?: string;
        };
        events?: string[];
        active?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<OrgHook, BasicError | ValidationError>({
        path: `/orgs/${org}/hooks`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a webhook configured in an organization. To get only the webhook `config` properties, see "[Get a webhook configuration for an organization](/rest/reference/orgs#get-a-webhook-configuration-for-an-organization)."
     *
     * @tags orgs
     * @name OrgsGetWebhook
     * @summary Get an organization webhook
     * @request GET:/orgs/{org}/hooks/{hook_id}
     */
    orgsGetWebhook: (org: string, hookId: number, params: RequestParams = {}) =>
      this.request<OrgHook, BasicError>({
        path: `/orgs/${org}/hooks/${hookId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Updates a webhook configured in an organization. When you update a webhook, the `secret` will be overwritten. If you previously had a `secret` set, you must provide the same `secret` or set a new `secret` or the secret will be removed. If you are only updating individual webhook `config` properties, use "[Update a webhook configuration for an organization](/rest/reference/orgs#update-a-webhook-configuration-for-an-organization)."
     *
     * @tags orgs
     * @name OrgsUpdateWebhook
     * @summary Update an organization webhook
     * @request PATCH:/orgs/{org}/hooks/{hook_id}
     */
    orgsUpdateWebhook: (
      org: string,
      hookId: number,
      data: {
        config?: {
          url: WebhookConfigUrl;
          content_type?: WebhookConfigContentType;
          secret?: WebhookConfigSecret;
          insecure_ssl?: WebhookConfigInsecureSsl;
        };
        events?: string[];
        active?: boolean;
        name?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<OrgHook, BasicError | ValidationError>({
        path: `/orgs/${org}/hooks/${hookId}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags orgs
     * @name OrgsDeleteWebhook
     * @summary Delete an organization webhook
     * @request DELETE:/orgs/{org}/hooks/{hook_id}
     */
    orgsDeleteWebhook: (org: string, hookId: number, params: RequestParams = {}) =>
      this.request<void, BasicError>({
        path: `/orgs/${org}/hooks/${hookId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Returns the webhook configuration for an organization. To get more information about the webhook, including the `active` state and `events`, use "[Get an organization webhook ](/rest/reference/orgs#get-an-organization-webhook)." Access tokens must have the `admin:org_hook` scope, and GitHub Apps must have the `organization_hooks:read` permission.
     *
     * @tags orgs
     * @name OrgsGetWebhookConfigForOrg
     * @summary Get a webhook configuration for an organization
     * @request GET:/orgs/{org}/hooks/{hook_id}/config
     */
    orgsGetWebhookConfigForOrg: (org: string, hookId: number, params: RequestParams = {}) =>
      this.request<WebhookConfig, any>({
        path: `/orgs/${org}/hooks/${hookId}/config`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Updates the webhook configuration for an organization. To update more information about the webhook, including the `active` state and `events`, use "[Update an organization webhook ](/rest/reference/orgs#update-an-organization-webhook)." Access tokens must have the `admin:org_hook` scope, and GitHub Apps must have the `organization_hooks:write` permission.
     *
     * @tags orgs
     * @name OrgsUpdateWebhookConfigForOrg
     * @summary Update a webhook configuration for an organization
     * @request PATCH:/orgs/{org}/hooks/{hook_id}/config
     */
    orgsUpdateWebhookConfigForOrg: (
      org: string,
      hookId: number,
      data: {
        url?: WebhookConfigUrl;
        content_type?: WebhookConfigContentType;
        secret?: WebhookConfigSecret;
        insecure_ssl?: WebhookConfigInsecureSsl;
      },
      params: RequestParams = {},
    ) =>
      this.request<WebhookConfig, any>({
        path: `/orgs/${org}/hooks/${hookId}/config`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description This will trigger a [ping event](https://docs.github.com/webhooks/#ping-event) to be sent to the hook.
     *
     * @tags orgs
     * @name OrgsPingWebhook
     * @summary Ping an organization webhook
     * @request POST:/orgs/{org}/hooks/{hook_id}/pings
     */
    orgsPingWebhook: (org: string, hookId: number, params: RequestParams = {}) =>
      this.request<void, BasicError>({
        path: `/orgs/${org}/hooks/${hookId}/pings`,
        method: "POST",
        ...params,
      }),

    /**
     * @description Enables an authenticated GitHub App to find the organization's installation information. You must use a [JWT](https://docs.github.com/apps/building-github-apps/authenticating-with-github-apps/#authenticating-as-a-github-app) to access this endpoint.
     *
     * @tags apps
     * @name AppsGetOrgInstallation
     * @summary Get an organization installation for the authenticated app
     * @request GET:/orgs/{org}/installation
     */
    appsGetOrgInstallation: (org: string, params: RequestParams = {}) =>
      this.request<Installation, any>({
        path: `/orgs/${org}/installation`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Lists all GitHub Apps in an organization. The installation count includes all GitHub Apps installed on repositories in the organization. You must be an organization owner with `admin:read` scope to use this endpoint.
     *
     * @tags orgs
     * @name OrgsListAppInstallations
     * @summary List app installations for an organization
     * @request GET:/orgs/{org}/installations
     */
    orgsListAppInstallations: (org: string, query?: { per_page?: number; page?: number }, params: RequestParams = {}) =>
      this.request<{ total_count: number; installations: Installation[] }, any>({
        path: `/orgs/${org}/installations`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Shows which type of GitHub user can interact with this organization and when the restriction expires. If there is no restrictions, you will see an empty response.
     *
     * @tags interactions
     * @name InteractionsGetRestrictionsForOrg
     * @summary Get interaction restrictions for an organization
     * @request GET:/orgs/{org}/interaction-limits
     */
    interactionsGetRestrictionsForOrg: (org: string, params: RequestParams = {}) =>
      this.request<InteractionLimitResponse, any>({
        path: `/orgs/${org}/interaction-limits`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Temporarily restricts interactions to a certain type of GitHub user in any public repository in the given organization. You must be an organization owner to set these restrictions. Setting the interaction limit at the organization level will overwrite any interaction limits that are set for individual repositories owned by the organization.
     *
     * @tags interactions
     * @name InteractionsSetRestrictionsForOrg
     * @summary Set interaction restrictions for an organization
     * @request PUT:/orgs/{org}/interaction-limits
     */
    interactionsSetRestrictionsForOrg: (org: string, data: InteractionLimit, params: RequestParams = {}) =>
      this.request<InteractionLimitResponse, ValidationError>({
        path: `/orgs/${org}/interaction-limits`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Removes all interaction restrictions from public repositories in the given organization. You must be an organization owner to remove restrictions.
     *
     * @tags interactions
     * @name InteractionsRemoveRestrictionsForOrg
     * @summary Remove interaction restrictions for an organization
     * @request DELETE:/orgs/{org}/interaction-limits
     */
    interactionsRemoveRestrictionsForOrg: (org: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/orgs/${org}/interaction-limits`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description The return hash contains a `role` field which refers to the Organization Invitation role and will be one of the following values: `direct_member`, `admin`, `billing_manager`, `hiring_manager`, or `reinstate`. If the invitee is not a GitHub member, the `login` field in the return hash will be `null`.
     *
     * @tags orgs
     * @name OrgsListPendingInvitations
     * @summary List pending organization invitations
     * @request GET:/orgs/{org}/invitations
     */
    orgsListPendingInvitations: (
      org: string,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<OrganizationInvitation[], BasicError>({
        path: `/orgs/${org}/invitations`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Invite people to an organization by using their GitHub user ID or their email address. In order to create invitations in an organization, the authenticated user must be an organization owner. This endpoint triggers [notifications](https://docs.github.com/en/github/managing-subscriptions-and-notifications-on-github/about-notifications). Creating content too quickly using this endpoint may result in abuse rate limiting. See "[Abuse rate limits](https://docs.github.com/rest/overview/resources-in-the-rest-api#abuse-rate-limits)" and "[Dealing with abuse rate limits](https://docs.github.com/rest/guides/best-practices-for-integrators#dealing-with-rate-limits)" for details.
     *
     * @tags orgs
     * @name OrgsCreateInvitation
     * @summary Create an organization invitation
     * @request POST:/orgs/{org}/invitations
     */
    orgsCreateInvitation: (
      org: string,
      data: {
        invitee_id?: number;
        email?: string;
        role?: "admin" | "direct_member" | "billing_manager";
        team_ids?: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<OrganizationInvitation, BasicError | ValidationError>({
        path: `/orgs/${org}/invitations`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Cancel an organization invitation. In order to cancel an organization invitation, the authenticated user must be an organization owner. This endpoint triggers [notifications](https://docs.github.com/en/github/managing-subscriptions-and-notifications-on-github/about-notifications).
     *
     * @tags orgs
     * @name OrgsCancelInvitation
     * @summary Cancel an organization invitation
     * @request DELETE:/orgs/{org}/invitations/{invitation_id}
     */
    orgsCancelInvitation: (org: string, invitationId: number, params: RequestParams = {}) =>
      this.request<void, BasicError | ValidationError>({
        path: `/orgs/${org}/invitations/${invitationId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description List all teams associated with an invitation. In order to see invitations in an organization, the authenticated user must be an organization owner.
     *
     * @tags orgs
     * @name OrgsListInvitationTeams
     * @summary List organization invitation teams
     * @request GET:/orgs/{org}/invitations/{invitation_id}/teams
     */
    orgsListInvitationTeams: (
      org: string,
      invitationId: number,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<Team[], BasicError>({
        path: `/orgs/${org}/invitations/${invitationId}/teams`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description List issues in an organization assigned to the authenticated user. **Note**: GitHub's REST API v3 considers every pull request an issue, but not every issue is a pull request. For this reason, "Issues" endpoints may return both issues and pull requests in the response. You can identify pull requests by the `pull_request` key. Be aware that the `id` of a pull request returned from "Issues" endpoints will be an _issue id_. To find out the pull request id, use the "[List pull requests](https://docs.github.com/rest/reference/pulls#list-pull-requests)" endpoint.
     *
     * @tags issues
     * @name IssuesListForOrg
     * @summary List organization issues assigned to the authenticated user
     * @request GET:/orgs/{org}/issues
     */
    issuesListForOrg: (
      org: string,
      query?: {
        filter?: "assigned" | "created" | "mentioned" | "subscribed" | "all";
        state?: "open" | "closed" | "all";
        labels?: string;
        sort?: "created" | "updated" | "comments";
        direction?: "asc" | "desc";
        since?: string;
        per_page?: number;
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<Issue[], BasicError>({
        path: `/orgs/${org}/issues`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description List all users who are members of an organization. If the authenticated user is also a member of this organization then both concealed and public members will be returned.
     *
     * @tags orgs
     * @name OrgsListMembers
     * @summary List organization members
     * @request GET:/orgs/{org}/members
     */
    orgsListMembers: (
      org: string,
      query?: { filter?: "2fa_disabled" | "all"; role?: "all" | "admin" | "member"; per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<SimpleUser[], void | ValidationError>({
        path: `/orgs/${org}/members`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Check if a user is, publicly or privately, a member of the organization.
     *
     * @tags orgs
     * @name OrgsCheckMembershipForUser
     * @summary Check organization membership for a user
     * @request GET:/orgs/{org}/members/{username}
     */
    orgsCheckMembershipForUser: (org: string, username: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/orgs/${org}/members/${username}`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Removing a user from this list will remove them from all teams and they will no longer have any access to the organization's repositories.
     *
     * @tags orgs
     * @name OrgsRemoveMember
     * @summary Remove an organization member
     * @request DELETE:/orgs/{org}/members/{username}
     */
    orgsRemoveMember: (org: string, username: string, params: RequestParams = {}) =>
      this.request<void, BasicError>({
        path: `/orgs/${org}/members/${username}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description In order to get a user's membership with an organization, the authenticated user must be an organization member.
     *
     * @tags orgs
     * @name OrgsGetMembershipForUser
     * @summary Get organization membership for a user
     * @request GET:/orgs/{org}/memberships/{username}
     */
    orgsGetMembershipForUser: (org: string, username: string, params: RequestParams = {}) =>
      this.request<OrgMembership, BasicError>({
        path: `/orgs/${org}/memberships/${username}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Only authenticated organization owners can add a member to the organization or update the member's role. *   If the authenticated user is _adding_ a member to the organization, the invited user will receive an email inviting them to the organization. The user's [membership status](https://docs.github.com/rest/reference/orgs#get-organization-membership-for-a-user) will be `pending` until they accept the invitation. *   Authenticated users can _update_ a user's membership by passing the `role` parameter. If the authenticated user changes a member's role to `admin`, the affected user will receive an email notifying them that they've been made an organization owner. If the authenticated user changes an owner's role to `member`, no email will be sent. **Rate limits** To prevent abuse, the authenticated user is limited to 50 organization invitations per 24 hour period. If the organization is more than one month old or on a paid plan, the limit is 500 invitations per 24 hour period.
     *
     * @tags orgs
     * @name OrgsSetMembershipForUser
     * @summary Set organization membership for a user
     * @request PUT:/orgs/{org}/memberships/{username}
     */
    orgsSetMembershipForUser: (
      org: string,
      username: string,
      data: { role?: "admin" | "member" },
      params: RequestParams = {},
    ) =>
      this.request<OrgMembership, BasicError | ValidationError>({
        path: `/orgs/${org}/memberships/${username}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description In order to remove a user's membership with an organization, the authenticated user must be an organization owner. If the specified user is an active member of the organization, this will remove them from the organization. If the specified user has been invited to the organization, this will cancel their invitation. The specified user will receive an email notification in both cases.
     *
     * @tags orgs
     * @name OrgsRemoveMembershipForUser
     * @summary Remove organization membership for a user
     * @request DELETE:/orgs/{org}/memberships/{username}
     */
    orgsRemoveMembershipForUser: (org: string, username: string, params: RequestParams = {}) =>
      this.request<void, BasicError>({
        path: `/orgs/${org}/memberships/${username}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Lists the most recent migrations.
     *
     * @tags migrations
     * @name MigrationsListForOrg
     * @summary List organization migrations
     * @request GET:/orgs/{org}/migrations
     */
    migrationsListForOrg: (org: string, query?: { per_page?: number; page?: number }, params: RequestParams = {}) =>
      this.request<Migration[], any>({
        path: `/orgs/${org}/migrations`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Initiates the generation of a migration archive.
     *
     * @tags migrations
     * @name MigrationsStartForOrg
     * @summary Start an organization migration
     * @request POST:/orgs/{org}/migrations
     */
    migrationsStartForOrg: (
      org: string,
      data: { repositories: string[]; lock_repositories?: boolean; exclude_attachments?: boolean; exclude?: string[] },
      params: RequestParams = {},
    ) =>
      this.request<Migration, BasicError | ValidationError>({
        path: `/orgs/${org}/migrations`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Fetches the status of a migration. The `state` of a migration can be one of the following values: *   `pending`, which means the migration hasn't started yet. *   `exporting`, which means the migration is in progress. *   `exported`, which means the migration finished successfully. *   `failed`, which means the migration failed.
     *
     * @tags migrations
     * @name MigrationsGetStatusForOrg
     * @summary Get an organization migration status
     * @request GET:/orgs/{org}/migrations/{migration_id}
     */
    migrationsGetStatusForOrg: (org: string, migrationId: number, params: RequestParams = {}) =>
      this.request<Migration, BasicError>({
        path: `/orgs/${org}/migrations/${migrationId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Fetches the URL to a migration archive.
     *
     * @tags migrations
     * @name MigrationsDownloadArchiveForOrg
     * @summary Download an organization migration archive
     * @request GET:/orgs/{org}/migrations/{migration_id}/archive
     */
    migrationsDownloadArchiveForOrg: (org: string, migrationId: number, params: RequestParams = {}) =>
      this.request<any, void | BasicError>({
        path: `/orgs/${org}/migrations/${migrationId}/archive`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Deletes a previous migration archive. Migration archives are automatically deleted after seven days.
     *
     * @tags migrations
     * @name MigrationsDeleteArchiveForOrg
     * @summary Delete an organization migration archive
     * @request DELETE:/orgs/{org}/migrations/{migration_id}/archive
     */
    migrationsDeleteArchiveForOrg: (org: string, migrationId: number, params: RequestParams = {}) =>
      this.request<void, BasicError>({
        path: `/orgs/${org}/migrations/${migrationId}/archive`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Unlocks a repository that was locked for migration. You should unlock each migrated repository and [delete them](https://docs.github.com/rest/reference/repos#delete-a-repository) when the migration is complete and you no longer need the source data.
     *
     * @tags migrations
     * @name MigrationsUnlockRepoForOrg
     * @summary Unlock an organization repository
     * @request DELETE:/orgs/{org}/migrations/{migration_id}/repos/{repo_name}/lock
     */
    migrationsUnlockRepoForOrg: (org: string, migrationId: number, repoName: string, params: RequestParams = {}) =>
      this.request<void, BasicError>({
        path: `/orgs/${org}/migrations/${migrationId}/repos/${repoName}/lock`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description List all the repositories for this organization migration.
     *
     * @tags migrations
     * @name MigrationsListReposForOrg
     * @summary List repositories in an organization migration
     * @request GET:/orgs/{org}/migrations/{migration_id}/repositories
     */
    migrationsListReposForOrg: (
      org: string,
      migrationId: number,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<MinimalRepository[], BasicError>({
        path: `/orgs/${org}/migrations/${migrationId}/repositories`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description List all users who are outside collaborators of an organization.
     *
     * @tags orgs
     * @name OrgsListOutsideCollaborators
     * @summary List outside collaborators for an organization
     * @request GET:/orgs/{org}/outside_collaborators
     */
    orgsListOutsideCollaborators: (
      org: string,
      query?: { filter?: "2fa_disabled" | "all"; per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<SimpleUser[], any>({
        path: `/orgs/${org}/outside_collaborators`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description When an organization member is converted to an outside collaborator, they'll only have access to the repositories that their current team membership allows. The user will no longer be a member of the organization. For more information, see "[Converting an organization member to an outside collaborator](https://help.github.com/articles/converting-an-organization-member-to-an-outside-collaborator/)".
     *
     * @tags orgs
     * @name OrgsConvertMemberToOutsideCollaborator
     * @summary Convert an organization member to outside collaborator
     * @request PUT:/orgs/{org}/outside_collaborators/{username}
     */
    orgsConvertMemberToOutsideCollaborator: (org: string, username: string, params: RequestParams = {}) =>
      this.request<void, { message?: string; documentation_url?: string } | BasicError>({
        path: `/orgs/${org}/outside_collaborators/${username}`,
        method: "PUT",
        ...params,
      }),

    /**
     * @description Removing a user from this list will remove them from all the organization's repositories.
     *
     * @tags orgs
     * @name OrgsRemoveOutsideCollaborator
     * @summary Remove outside collaborator from an organization
     * @request DELETE:/orgs/{org}/outside_collaborators/{username}
     */
    orgsRemoveOutsideCollaborator: (org: string, username: string, params: RequestParams = {}) =>
      this.request<void, { message?: string; documentation_url?: string }>({
        path: `/orgs/${org}/outside_collaborators/${username}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Lists the projects in an organization. Returns a `404 Not Found` status if projects are disabled in the organization. If you do not have sufficient privileges to perform this action, a `401 Unauthorized` or `410 Gone` status is returned.
     *
     * @tags projects
     * @name ProjectsListForOrg
     * @summary List organization projects
     * @request GET:/orgs/{org}/projects
     */
    projectsListForOrg: (
      org: string,
      query?: { state?: "open" | "closed" | "all"; per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<Project[], ValidationErrorSimple>({
        path: `/orgs/${org}/projects`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Creates an organization project board. Returns a `404 Not Found` status if projects are disabled in the organization. If you do not have sufficient privileges to perform this action, a `401 Unauthorized` or `410 Gone` status is returned.
     *
     * @tags projects
     * @name ProjectsCreateForOrg
     * @summary Create an organization project
     * @request POST:/orgs/{org}/projects
     */
    projectsCreateForOrg: (org: string, data: { name: string; body?: string }, params: RequestParams = {}) =>
      this.request<Project, BasicError | ValidationErrorSimple>({
        path: `/orgs/${org}/projects`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Members of an organization can choose to have their membership publicized or not.
     *
     * @tags orgs
     * @name OrgsListPublicMembers
     * @summary List public organization members
     * @request GET:/orgs/{org}/public_members
     */
    orgsListPublicMembers: (org: string, query?: { per_page?: number; page?: number }, params: RequestParams = {}) =>
      this.request<SimpleUser[], any>({
        path: `/orgs/${org}/public_members`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags orgs
     * @name OrgsCheckPublicMembershipForUser
     * @summary Check public organization membership for a user
     * @request GET:/orgs/{org}/public_members/{username}
     */
    orgsCheckPublicMembershipForUser: (org: string, username: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/orgs/${org}/public_members/${username}`,
        method: "GET",
        ...params,
      }),

    /**
     * @description The user can publicize their own membership. (A user cannot publicize the membership for another user.) Note that you'll need to set `Content-Length` to zero when calling out to this endpoint. For more information, see "[HTTP verbs](https://docs.github.com/rest/overview/resources-in-the-rest-api#http-verbs)."
     *
     * @tags orgs
     * @name OrgsSetPublicMembershipForAuthenticatedUser
     * @summary Set public organization membership for the authenticated user
     * @request PUT:/orgs/{org}/public_members/{username}
     */
    orgsSetPublicMembershipForAuthenticatedUser: (org: string, username: string, params: RequestParams = {}) =>
      this.request<void, BasicError>({
        path: `/orgs/${org}/public_members/${username}`,
        method: "PUT",
        ...params,
      }),

    /**
     * No description
     *
     * @tags orgs
     * @name OrgsRemovePublicMembershipForAuthenticatedUser
     * @summary Remove public organization membership for the authenticated user
     * @request DELETE:/orgs/{org}/public_members/{username}
     */
    orgsRemovePublicMembershipForAuthenticatedUser: (org: string, username: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/orgs/${org}/public_members/${username}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Lists repositories for the specified organization.
     *
     * @tags repos
     * @name ReposListForOrg
     * @summary List organization repositories
     * @request GET:/orgs/{org}/repos
     */
    reposListForOrg: (
      org: string,
      query?: {
        type?: "all" | "public" | "private" | "forks" | "sources" | "member" | "internal";
        sort?: "created" | "updated" | "pushed" | "full_name";
        direction?: "asc" | "desc";
        per_page?: number;
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<MinimalRepository[], any>({
        path: `/orgs/${org}/repos`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Creates a new repository in the specified organization. The authenticated user must be a member of the organization. **OAuth scope requirements** When using [OAuth](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/), authorizations must include: *   `public_repo` scope or `repo` scope to create a public repository *   `repo` scope to create a private repository
     *
     * @tags repos
     * @name ReposCreateInOrg
     * @summary Create an organization repository
     * @request POST:/orgs/{org}/repos
     */
    reposCreateInOrg: (
      org: string,
      data: {
        name: string;
        description?: string;
        homepage?: string;
        private?: boolean;
        visibility?: "public" | "private" | "visibility" | "internal";
        has_issues?: boolean;
        has_projects?: boolean;
        has_wiki?: boolean;
        is_template?: boolean;
        team_id?: number;
        auto_init?: boolean;
        gitignore_template?: string;
        license_template?: string;
        allow_squash_merge?: boolean;
        allow_merge_commit?: boolean;
        allow_rebase_merge?: boolean;
        delete_branch_on_merge?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<Repository, BasicError | ValidationError>({
        path: `/orgs/${org}/repos`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets the summary of the free and paid GitHub Actions minutes used. Paid minutes only apply to workflows in private repositories that use GitHub-hosted runners. Minutes used is listed for each GitHub-hosted runner operating system. Any job re-runs are also included in the usage. The usage does not include the multiplier for macOS and Windows runners and is not rounded up to the nearest whole minute. For more information, see "[Managing billing for GitHub Actions](https://help.github.com/github/setting-up-and-managing-billing-and-payments-on-github/managing-billing-for-github-actions)". Access tokens must have the `repo` or `admin:org` scope.
     *
     * @tags billing
     * @name BillingGetGithubActionsBillingOrg
     * @summary Get GitHub Actions billing for an organization
     * @request GET:/orgs/{org}/settings/billing/actions
     */
    billingGetGithubActionsBillingOrg: (org: string, params: RequestParams = {}) =>
      this.request<ActionsBillingUsage, any>({
        path: `/orgs/${org}/settings/billing/actions`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Gets the free and paid storage usued for GitHub Packages in gigabytes. Paid minutes only apply to packages stored for private repositories. For more information, see "[Managing billing for GitHub Packages](https://help.github.com/github/setting-up-and-managing-billing-and-payments-on-github/managing-billing-for-github-packages)." Access tokens must have the `repo` or `admin:org` scope.
     *
     * @tags billing
     * @name BillingGetGithubPackagesBillingOrg
     * @summary Get GitHub Packages billing for an organization
     * @request GET:/orgs/{org}/settings/billing/packages
     */
    billingGetGithubPackagesBillingOrg: (org: string, params: RequestParams = {}) =>
      this.request<PackagesBillingUsage, any>({
        path: `/orgs/${org}/settings/billing/packages`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Gets the estimated paid and estimated total storage used for GitHub Actions and Github Packages. Paid minutes only apply to packages stored for private repositories. For more information, see "[Managing billing for GitHub Packages](https://help.github.com/github/setting-up-and-managing-billing-and-payments-on-github/managing-billing-for-github-packages)." Access tokens must have the `repo` or `admin:org` scope.
     *
     * @tags billing
     * @name BillingGetSharedStorageBillingOrg
     * @summary Get shared storage billing for an organization
     * @request GET:/orgs/{org}/settings/billing/shared-storage
     */
    billingGetSharedStorageBillingOrg: (org: string, params: RequestParams = {}) =>
      this.request<CombinedBillingUsage, any>({
        path: `/orgs/${org}/settings/billing/shared-storage`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Team synchronization is available for organizations using GitHub Enterprise Cloud. For more information, see [GitHub's products](https://help.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation. List IdP groups available in an organization. You can limit your page results using the `per_page` parameter. GitHub generates a url-encoded `page` token using a cursor value for where the next page begins. For more information on cursor pagination, see "[Offset and Cursor Pagination explained](https://dev.to/jackmarchant/offset-and-cursor-pagination-explained-b89)." The `per_page` parameter provides pagination for a list of IdP groups the authenticated user can access in an organization. For example, if the user `octocat` wants to see two groups per page in `octo-org` via cURL, it would look like this:
     *
     * @tags teams
     * @name TeamsListIdpGroupsForOrg
     * @summary List IdP groups for an organization
     * @request GET:/orgs/{org}/team-sync/groups
     */
    teamsListIdpGroupsForOrg: (org: string, query?: { per_page?: number; page?: number }, params: RequestParams = {}) =>
      this.request<GroupMapping, any>({
        path: `/orgs/${org}/team-sync/groups`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Lists all teams in an organization that are visible to the authenticated user.
     *
     * @tags teams
     * @name TeamsList
     * @summary List teams
     * @request GET:/orgs/{org}/teams
     */
    teamsList: (org: string, query?: { per_page?: number; page?: number }, params: RequestParams = {}) =>
      this.request<Team[], BasicError>({
        path: `/orgs/${org}/teams`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description To create a team, the authenticated user must be a member or owner of `{org}`. By default, organization members can create teams. Organization owners can limit team creation to organization owners. For more information, see "[Setting team creation permissions](https://help.github.com/en/articles/setting-team-creation-permissions-in-your-organization)." When you create a new team, you automatically become a team maintainer without explicitly adding yourself to the optional array of `maintainers`. For more information, see "[About teams](https://help.github.com/en/github/setting-up-and-managing-organizations-and-teams/about-teams)".
     *
     * @tags teams
     * @name TeamsCreate
     * @summary Create a team
     * @request POST:/orgs/{org}/teams
     */
    teamsCreate: (
      org: string,
      data: {
        name: string;
        description?: string;
        maintainers?: string[];
        repo_names?: string[];
        privacy?: "secret" | "closed";
        permission?: "pull" | "push" | "admin";
        parent_team_id?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<TeamFull, BasicError | ValidationError>({
        path: `/orgs/${org}/teams`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets a team using the team's `slug`. GitHub generates the `slug` from the team `name`. **Note:** You can also specify a team by `org_id` and `team_id` using the route `GET /organizations/{org_id}/team/{team_id}`.
     *
     * @tags teams
     * @name TeamsGetByName
     * @summary Get a team by name
     * @request GET:/orgs/{org}/teams/{team_slug}
     */
    teamsGetByName: (org: string, teamSlug: string, params: RequestParams = {}) =>
      this.request<TeamFull, BasicError>({
        path: `/orgs/${org}/teams/${teamSlug}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description To edit a team, the authenticated user must either be an organization owner or a team maintainer. **Note:** You can also specify a team by `org_id` and `team_id` using the route `PATCH /organizations/{org_id}/team/{team_id}`.
     *
     * @tags teams
     * @name TeamsUpdateInOrg
     * @summary Update a team
     * @request PATCH:/orgs/{org}/teams/{team_slug}
     */
    teamsUpdateInOrg: (
      org: string,
      teamSlug: string,
      data: {
        name: string;
        description?: string;
        privacy?: "secret" | "closed";
        permission?: "pull" | "push" | "admin";
        parent_team_id?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<TeamFull, any>({
        path: `/orgs/${org}/teams/${teamSlug}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description To delete a team, the authenticated user must be an organization owner or team maintainer. If you are an organization owner, deleting a parent team will delete all of its child teams as well. **Note:** You can also specify a team by `org_id` and `team_id` using the route `DELETE /organizations/{org_id}/team/{team_id}`.
     *
     * @tags teams
     * @name TeamsDeleteInOrg
     * @summary Delete a team
     * @request DELETE:/orgs/{org}/teams/{team_slug}
     */
    teamsDeleteInOrg: (org: string, teamSlug: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/orgs/${org}/teams/${teamSlug}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description List all discussions on a team's page. OAuth access tokens require the `read:discussion` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/). **Note:** You can also specify a team by `org_id` and `team_id` using the route `GET /organizations/{org_id}/team/{team_id}/discussions`.
     *
     * @tags teams
     * @name TeamsListDiscussionsInOrg
     * @summary List discussions
     * @request GET:/orgs/{org}/teams/{team_slug}/discussions
     */
    teamsListDiscussionsInOrg: (
      org: string,
      teamSlug: string,
      query?: { direction?: "asc" | "desc"; per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<TeamDiscussion[], any>({
        path: `/orgs/${org}/teams/${teamSlug}/discussions`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Creates a new discussion post on a team's page. OAuth access tokens require the `write:discussion` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/). This endpoint triggers [notifications](https://docs.github.com/en/github/managing-subscriptions-and-notifications-on-github/about-notifications). Creating content too quickly using this endpoint may result in abuse rate limiting. See "[Abuse rate limits](https://docs.github.com/rest/overview/resources-in-the-rest-api#abuse-rate-limits)" and "[Dealing with abuse rate limits](https://docs.github.com/rest/guides/best-practices-for-integrators#dealing-with-rate-limits)" for details. **Note:** You can also specify a team by `org_id` and `team_id` using the route `POST /organizations/{org_id}/team/{team_id}/discussions`.
     *
     * @tags teams
     * @name TeamsCreateDiscussionInOrg
     * @summary Create a discussion
     * @request POST:/orgs/{org}/teams/{team_slug}/discussions
     */
    teamsCreateDiscussionInOrg: (
      org: string,
      teamSlug: string,
      data: { title: string; body: string; private?: boolean },
      params: RequestParams = {},
    ) =>
      this.request<TeamDiscussion, any>({
        path: `/orgs/${org}/teams/${teamSlug}/discussions`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a specific discussion on a team's page. OAuth access tokens require the `read:discussion` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/). **Note:** You can also specify a team by `org_id` and `team_id` using the route `GET /organizations/{org_id}/team/{team_id}/discussions/{discussion_number}`.
     *
     * @tags teams
     * @name TeamsGetDiscussionInOrg
     * @summary Get a discussion
     * @request GET:/orgs/{org}/teams/{team_slug}/discussions/{discussion_number}
     */
    teamsGetDiscussionInOrg: (org: string, teamSlug: string, discussionNumber: number, params: RequestParams = {}) =>
      this.request<TeamDiscussion, any>({
        path: `/orgs/${org}/teams/${teamSlug}/discussions/${discussionNumber}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Edits the title and body text of a discussion post. Only the parameters you provide are updated. OAuth access tokens require the `write:discussion` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/). **Note:** You can also specify a team by `org_id` and `team_id` using the route `PATCH /organizations/{org_id}/team/{team_id}/discussions/{discussion_number}`.
     *
     * @tags teams
     * @name TeamsUpdateDiscussionInOrg
     * @summary Update a discussion
     * @request PATCH:/orgs/{org}/teams/{team_slug}/discussions/{discussion_number}
     */
    teamsUpdateDiscussionInOrg: (
      org: string,
      teamSlug: string,
      discussionNumber: number,
      data: { title?: string; body?: string },
      params: RequestParams = {},
    ) =>
      this.request<TeamDiscussion, any>({
        path: `/orgs/${org}/teams/${teamSlug}/discussions/${discussionNumber}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a discussion from a team's page. OAuth access tokens require the `write:discussion` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/). **Note:** You can also specify a team by `org_id` and `team_id` using the route `DELETE /organizations/{org_id}/team/{team_id}/discussions/{discussion_number}`.
     *
     * @tags teams
     * @name TeamsDeleteDiscussionInOrg
     * @summary Delete a discussion
     * @request DELETE:/orgs/{org}/teams/{team_slug}/discussions/{discussion_number}
     */
    teamsDeleteDiscussionInOrg: (org: string, teamSlug: string, discussionNumber: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/orgs/${org}/teams/${teamSlug}/discussions/${discussionNumber}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description List all comments on a team discussion. OAuth access tokens require the `read:discussion` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/). **Note:** You can also specify a team by `org_id` and `team_id` using the route `GET /organizations/{org_id}/team/{team_id}/discussions/{discussion_number}/comments`.
     *
     * @tags teams
     * @name TeamsListDiscussionCommentsInOrg
     * @summary List discussion comments
     * @request GET:/orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments
     */
    teamsListDiscussionCommentsInOrg: (
      org: string,
      teamSlug: string,
      discussionNumber: number,
      query?: { direction?: "asc" | "desc"; per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<TeamDiscussionComment[], any>({
        path: `/orgs/${org}/teams/${teamSlug}/discussions/${discussionNumber}/comments`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Creates a new comment on a team discussion. OAuth access tokens require the `write:discussion` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/). This endpoint triggers [notifications](https://docs.github.com/en/github/managing-subscriptions-and-notifications-on-github/about-notifications). Creating content too quickly using this endpoint may result in abuse rate limiting. See "[Abuse rate limits](https://docs.github.com/rest/overview/resources-in-the-rest-api#abuse-rate-limits)" and "[Dealing with abuse rate limits](https://docs.github.com/rest/guides/best-practices-for-integrators#dealing-with-rate-limits)" for details. **Note:** You can also specify a team by `org_id` and `team_id` using the route `POST /organizations/{org_id}/team/{team_id}/discussions/{discussion_number}/comments`.
     *
     * @tags teams
     * @name TeamsCreateDiscussionCommentInOrg
     * @summary Create a discussion comment
     * @request POST:/orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments
     */
    teamsCreateDiscussionCommentInOrg: (
      org: string,
      teamSlug: string,
      discussionNumber: number,
      data: { body: string },
      params: RequestParams = {},
    ) =>
      this.request<TeamDiscussionComment, any>({
        path: `/orgs/${org}/teams/${teamSlug}/discussions/${discussionNumber}/comments`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a specific comment on a team discussion. OAuth access tokens require the `read:discussion` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/). **Note:** You can also specify a team by `org_id` and `team_id` using the route `GET /organizations/{org_id}/team/{team_id}/discussions/{discussion_number}/comments/{comment_number}`.
     *
     * @tags teams
     * @name TeamsGetDiscussionCommentInOrg
     * @summary Get a discussion comment
     * @request GET:/orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}
     */
    teamsGetDiscussionCommentInOrg: (
      org: string,
      teamSlug: string,
      discussionNumber: number,
      commentNumber: number,
      params: RequestParams = {},
    ) =>
      this.request<TeamDiscussionComment, any>({
        path: `/orgs/${org}/teams/${teamSlug}/discussions/${discussionNumber}/comments/${commentNumber}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Edits the body text of a discussion comment. OAuth access tokens require the `write:discussion` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/). **Note:** You can also specify a team by `org_id` and `team_id` using the route `PATCH /organizations/{org_id}/team/{team_id}/discussions/{discussion_number}/comments/{comment_number}`.
     *
     * @tags teams
     * @name TeamsUpdateDiscussionCommentInOrg
     * @summary Update a discussion comment
     * @request PATCH:/orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}
     */
    teamsUpdateDiscussionCommentInOrg: (
      org: string,
      teamSlug: string,
      discussionNumber: number,
      commentNumber: number,
      data: { body: string },
      params: RequestParams = {},
    ) =>
      this.request<TeamDiscussionComment, any>({
        path: `/orgs/${org}/teams/${teamSlug}/discussions/${discussionNumber}/comments/${commentNumber}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Deletes a comment on a team discussion. OAuth access tokens require the `write:discussion` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/). **Note:** You can also specify a team by `org_id` and `team_id` using the route `DELETE /organizations/{org_id}/team/{team_id}/discussions/{discussion_number}/comments/{comment_number}`.
     *
     * @tags teams
     * @name TeamsDeleteDiscussionCommentInOrg
     * @summary Delete a discussion comment
     * @request DELETE:/orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}
     */
    teamsDeleteDiscussionCommentInOrg: (
      org: string,
      teamSlug: string,
      discussionNumber: number,
      commentNumber: number,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/orgs/${org}/teams/${teamSlug}/discussions/${discussionNumber}/comments/${commentNumber}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description List the reactions to a [team discussion comment](https://docs.github.com/rest/reference/teams#discussion-comments/). OAuth access tokens require the `read:discussion` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/). **Note:** You can also specify a team by `org_id` and `team_id` using the route `GET /organizations/:org_id/team/:team_id/discussions/:discussion_number/comments/:comment_number/reactions`.
     *
     * @tags reactions
     * @name ReactionsListForTeamDiscussionCommentInOrg
     * @summary List reactions for a team discussion comment
     * @request GET:/orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions
     */
    reactionsListForTeamDiscussionCommentInOrg: (
      org: string,
      teamSlug: string,
      discussionNumber: number,
      commentNumber: number,
      query?: {
        content?: "+1" | "-1" | "laugh" | "confused" | "heart" | "hooray" | "rocket" | "eyes";
        per_page?: number;
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<Reaction[], any>({
        path: `/orgs/${org}/teams/${teamSlug}/discussions/${discussionNumber}/comments/${commentNumber}/reactions`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a reaction to a [team discussion comment](https://docs.github.com/rest/reference/teams#discussion-comments). OAuth access tokens require the `write:discussion` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/). A response with a `Status: 200 OK` means that you already added the reaction type to this team discussion comment. **Note:** You can also specify a team by `org_id` and `team_id` using the route `POST /organizations/:org_id/team/:team_id/discussions/:discussion_number/comments/:comment_number/reactions`.
     *
     * @tags reactions
     * @name ReactionsCreateForTeamDiscussionCommentInOrg
     * @summary Create reaction for a team discussion comment
     * @request POST:/orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions
     */
    reactionsCreateForTeamDiscussionCommentInOrg: (
      org: string,
      teamSlug: string,
      discussionNumber: number,
      commentNumber: number,
      data: { content: "+1" | "-1" | "laugh" | "confused" | "heart" | "hooray" | "rocket" | "eyes" },
      params: RequestParams = {},
    ) =>
      this.request<Reaction, any>({
        path: `/orgs/${org}/teams/${teamSlug}/discussions/${discussionNumber}/comments/${commentNumber}/reactions`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description **Note:** You can also specify a team or organization with `team_id` and `org_id` using the route `DELETE /organizations/:org_id/team/:team_id/discussions/:discussion_number/comments/:comment_number/reactions/:reaction_id`. Delete a reaction to a [team discussion comment](https://docs.github.com/rest/reference/teams#discussion-comments). OAuth access tokens require the `write:discussion` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/).
     *
     * @tags reactions
     * @name ReactionsDeleteForTeamDiscussionComment
     * @summary Delete team discussion comment reaction
     * @request DELETE:/orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions/{reaction_id}
     */
    reactionsDeleteForTeamDiscussionComment: (
      org: string,
      teamSlug: string,
      discussionNumber: number,
      commentNumber: number,
      reactionId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/orgs/${org}/teams/${teamSlug}/discussions/${discussionNumber}/comments/${commentNumber}/reactions/${reactionId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description List the reactions to a [team discussion](https://docs.github.com/rest/reference/teams#discussions). OAuth access tokens require the `read:discussion` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/). **Note:** You can also specify a team by `org_id` and `team_id` using the route `GET /organizations/:org_id/team/:team_id/discussions/:discussion_number/reactions`.
     *
     * @tags reactions
     * @name ReactionsListForTeamDiscussionInOrg
     * @summary List reactions for a team discussion
     * @request GET:/orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions
     */
    reactionsListForTeamDiscussionInOrg: (
      org: string,
      teamSlug: string,
      discussionNumber: number,
      query?: {
        content?: "+1" | "-1" | "laugh" | "confused" | "heart" | "hooray" | "rocket" | "eyes";
        per_page?: number;
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<Reaction[], any>({
        path: `/orgs/${org}/teams/${teamSlug}/discussions/${discussionNumber}/reactions`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a reaction to a [team discussion](https://docs.github.com/rest/reference/teams#discussions). OAuth access tokens require the `write:discussion` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/). A response with a `Status: 200 OK` means that you already added the reaction type to this team discussion. **Note:** You can also specify a team by `org_id` and `team_id` using the route `POST /organizations/:org_id/team/:team_id/discussions/:discussion_number/reactions`.
     *
     * @tags reactions
     * @name ReactionsCreateForTeamDiscussionInOrg
     * @summary Create reaction for a team discussion
     * @request POST:/orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions
     */
    reactionsCreateForTeamDiscussionInOrg: (
      org: string,
      teamSlug: string,
      discussionNumber: number,
      data: { content: "+1" | "-1" | "laugh" | "confused" | "heart" | "hooray" | "rocket" | "eyes" },
      params: RequestParams = {},
    ) =>
      this.request<Reaction, any>({
        path: `/orgs/${org}/teams/${teamSlug}/discussions/${discussionNumber}/reactions`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description **Note:** You can also specify a team or organization with `team_id` and `org_id` using the route `DELETE /organizations/:org_id/team/:team_id/discussions/:discussion_number/reactions/:reaction_id`. Delete a reaction to a [team discussion](https://docs.github.com/rest/reference/teams#discussions). OAuth access tokens require the `write:discussion` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/).
     *
     * @tags reactions
     * @name ReactionsDeleteForTeamDiscussion
     * @summary Delete team discussion reaction
     * @request DELETE:/orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions/{reaction_id}
     */
    reactionsDeleteForTeamDiscussion: (
      org: string,
      teamSlug: string,
      discussionNumber: number,
      reactionId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/orgs/${org}/teams/${teamSlug}/discussions/${discussionNumber}/reactions/${reactionId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description The return hash contains a `role` field which refers to the Organization Invitation role and will be one of the following values: `direct_member`, `admin`, `billing_manager`, `hiring_manager`, or `reinstate`. If the invitee is not a GitHub member, the `login` field in the return hash will be `null`. **Note:** You can also specify a team by `org_id` and `team_id` using the route `GET /organizations/{org_id}/team/{team_id}/invitations`.
     *
     * @tags teams
     * @name TeamsListPendingInvitationsInOrg
     * @summary List pending team invitations
     * @request GET:/orgs/{org}/teams/{team_slug}/invitations
     */
    teamsListPendingInvitationsInOrg: (
      org: string,
      teamSlug: string,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<OrganizationInvitation[], any>({
        path: `/orgs/${org}/teams/${teamSlug}/invitations`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Team members will include the members of child teams. To list members in a team, the team must be visible to the authenticated user.
     *
     * @tags teams
     * @name TeamsListMembersInOrg
     * @summary List team members
     * @request GET:/orgs/{org}/teams/{team_slug}/members
     */
    teamsListMembersInOrg: (
      org: string,
      teamSlug: string,
      query?: { role?: "member" | "maintainer" | "all"; per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<SimpleUser[], any>({
        path: `/orgs/${org}/teams/${teamSlug}/members`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Team members will include the members of child teams. To get a user's membership with a team, the team must be visible to the authenticated user. **Note:** You can also specify a team by `org_id` and `team_id` using the route `GET /organizations/{org_id}/team/{team_id}/memberships/{username}`. **Note:** The `role` for organization owners returns as `maintainer`. For more information about `maintainer` roles, see [Create a team](https://docs.github.com/rest/reference/teams#create-a-team).
     *
     * @tags teams
     * @name TeamsGetMembershipForUserInOrg
     * @summary Get team membership for a user
     * @request GET:/orgs/{org}/teams/{team_slug}/memberships/{username}
     */
    teamsGetMembershipForUserInOrg: (org: string, teamSlug: string, username: string, params: RequestParams = {}) =>
      this.request<TeamMembership, void>({
        path: `/orgs/${org}/teams/${teamSlug}/memberships/${username}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Team synchronization is available for organizations using GitHub Enterprise Cloud. For more information, see [GitHub's products](https://help.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation. Adds an organization member to a team. An authenticated organization owner or team maintainer can add organization members to a team. **Note:** When you have team synchronization set up for a team with your organization's identity provider (IdP), you will see an error if you attempt to use the API for making changes to the team's membership. If you have access to manage group membership in your IdP, you can manage GitHub team membership through your identity provider, which automatically adds and removes team members in an organization. For more information, see "[Synchronizing teams between your identity provider and GitHub](https://help.github.com/articles/synchronizing-teams-between-your-identity-provider-and-github/)." An organization owner can add someone who is not part of the team's organization to a team. When an organization owner adds someone to a team who is not an organization member, this endpoint will send an invitation to the person via email. This newly-created membership will be in the "pending" state until the person accepts the invitation, at which point the membership will transition to the "active" state and the user will be added as a member of the team. If the user is already a member of the team, this endpoint will update the role of the team member's role. To update the membership of a team member, the authenticated user must be an organization owner or a team maintainer. **Note:** You can also specify a team by `org_id` and `team_id` using the route `PUT /organizations/{org_id}/team/{team_id}/memberships/{username}`.
     *
     * @tags teams
     * @name TeamsAddOrUpdateMembershipForUserInOrg
     * @summary Add or update team membership for a user
     * @request PUT:/orgs/{org}/teams/{team_slug}/memberships/{username}
     */
    teamsAddOrUpdateMembershipForUserInOrg: (
      org: string,
      teamSlug: string,
      username: string,
      data: { role?: "member" | "maintainer" },
      params: RequestParams = {},
    ) =>
      this.request<
        TeamMembership,
        void | { message?: string; errors?: { code?: string; field?: string; resource?: string }[] }
      >({
        path: `/orgs/${org}/teams/${teamSlug}/memberships/${username}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Team synchronization is available for organizations using GitHub Enterprise Cloud. For more information, see [GitHub's products](https://help.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation. To remove a membership between a user and a team, the authenticated user must have 'admin' permissions to the team or be an owner of the organization that the team is associated with. Removing team membership does not delete the user, it just removes their membership from the team. **Note:** When you have team synchronization set up for a team with your organization's identity provider (IdP), you will see an error if you attempt to use the API for making changes to the team's membership. If you have access to manage group membership in your IdP, you can manage GitHub team membership through your identity provider, which automatically adds and removes team members in an organization. For more information, see "[Synchronizing teams between your identity provider and GitHub](https://help.github.com/articles/synchronizing-teams-between-your-identity-provider-and-github/)." **Note:** You can also specify a team by `org_id` and `team_id` using the route `DELETE /organizations/{org_id}/team/{team_id}/memberships/{username}`.
     *
     * @tags teams
     * @name TeamsRemoveMembershipForUserInOrg
     * @summary Remove team membership for a user
     * @request DELETE:/orgs/{org}/teams/{team_slug}/memberships/{username}
     */
    teamsRemoveMembershipForUserInOrg: (org: string, teamSlug: string, username: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/orgs/${org}/teams/${teamSlug}/memberships/${username}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Lists the organization projects for a team. **Note:** You can also specify a team by `org_id` and `team_id` using the route `GET /organizations/{org_id}/team/{team_id}/projects`.
     *
     * @tags teams
     * @name TeamsListProjectsInOrg
     * @summary List team projects
     * @request GET:/orgs/{org}/teams/{team_slug}/projects
     */
    teamsListProjectsInOrg: (
      org: string,
      teamSlug: string,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<TeamProject[], any>({
        path: `/orgs/${org}/teams/${teamSlug}/projects`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Checks whether a team has `read`, `write`, or `admin` permissions for an organization project. The response includes projects inherited from a parent team. **Note:** You can also specify a team by `org_id` and `team_id` using the route `GET /organizations/{org_id}/team/{team_id}/projects/{project_id}`.
     *
     * @tags teams
     * @name TeamsCheckPermissionsForProjectInOrg
     * @summary Check team permissions for a project
     * @request GET:/orgs/{org}/teams/{team_slug}/projects/{project_id}
     */
    teamsCheckPermissionsForProjectInOrg: (
      org: string,
      teamSlug: string,
      projectId: number,
      params: RequestParams = {},
    ) =>
      this.request<TeamProject, void>({
        path: `/orgs/${org}/teams/${teamSlug}/projects/${projectId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Adds an organization project to a team. To add a project to a team or update the team's permission on a project, the authenticated user must have `admin` permissions for the project. The project and team must be part of the same organization. **Note:** You can also specify a team by `org_id` and `team_id` using the route `PUT /organizations/{org_id}/team/{team_id}/projects/{project_id}`.
     *
     * @tags teams
     * @name TeamsAddOrUpdateProjectPermissionsInOrg
     * @summary Add or update team project permissions
     * @request PUT:/orgs/{org}/teams/{team_slug}/projects/{project_id}
     */
    teamsAddOrUpdateProjectPermissionsInOrg: (
      org: string,
      teamSlug: string,
      projectId: number,
      data: { permission?: "read" | "write" | "admin" },
      params: RequestParams = {},
    ) =>
      this.request<void, { message?: string; documentation_url?: string }>({
        path: `/orgs/${org}/teams/${teamSlug}/projects/${projectId}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Removes an organization project from a team. An organization owner or a team maintainer can remove any project from the team. To remove a project from a team as an organization member, the authenticated user must have `read` access to both the team and project, or `admin` access to the team or project. This endpoint removes the project from the team, but does not delete the project. **Note:** You can also specify a team by `org_id` and `team_id` using the route `DELETE /organizations/{org_id}/team/{team_id}/projects/{project_id}`.
     *
     * @tags teams
     * @name TeamsRemoveProjectInOrg
     * @summary Remove a project from a team
     * @request DELETE:/orgs/{org}/teams/{team_slug}/projects/{project_id}
     */
    teamsRemoveProjectInOrg: (org: string, teamSlug: string, projectId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/orgs/${org}/teams/${teamSlug}/projects/${projectId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Lists a team's repositories visible to the authenticated user. **Note:** You can also specify a team by `org_id` and `team_id` using the route `GET /organizations/{org_id}/team/{team_id}/repos`.
     *
     * @tags teams
     * @name TeamsListReposInOrg
     * @summary List team repositories
     * @request GET:/orgs/{org}/teams/{team_slug}/repos
     */
    teamsListReposInOrg: (
      org: string,
      teamSlug: string,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<MinimalRepository[], any>({
        path: `/orgs/${org}/teams/${teamSlug}/repos`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Checks whether a team has `admin`, `push`, `maintain`, `triage`, or `pull` permission for a repository. Repositories inherited through a parent team will also be checked. You can also get information about the specified repository, including what permissions the team grants on it, by passing the following custom [media type](https://docs.github.com/rest/overview/media-types/) via the `application/vnd.github.v3.repository+json` accept header. If a team doesn't have permission for the repository, you will receive a `404 Not Found` response status. **Note:** You can also specify a team by `org_id` and `team_id` using the route `GET /organizations/{org_id}/team/{team_id}/repos/{owner}/{repo}`.
     *
     * @tags teams
     * @name TeamsCheckPermissionsForRepoInOrg
     * @summary Check team permissions for a repository
     * @request GET:/orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}
     */
    teamsCheckPermissionsForRepoInOrg: (
      org: string,
      teamSlug: string,
      owner: string,
      repo: string,
      params: RequestParams = {},
    ) =>
      this.request<TeamRepository, void>({
        path: `/orgs/${org}/teams/${teamSlug}/repos/${owner}/${repo}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description To add a repository to a team or update the team's permission on a repository, the authenticated user must have admin access to the repository, and must be able to see the team. The repository must be owned by the organization, or a direct fork of a repository owned by the organization. You will get a `422 Unprocessable Entity` status if you attempt to add a repository to a team that is not owned by the organization. Note that, if you choose not to pass any parameters, you'll need to set `Content-Length` to zero when calling out to this endpoint. For more information, see "[HTTP verbs](https://docs.github.com/rest/overview/resources-in-the-rest-api#http-verbs)." **Note:** You can also specify a team by `org_id` and `team_id` using the route `PUT /organizations/{org_id}/team/{team_id}/repos/{owner}/{repo}`. For more information about the permission levels, see "[Repository permission levels for an organization](https://help.github.com/en/github/setting-up-and-managing-organizations-and-teams/repository-permission-levels-for-an-organization#permission-levels-for-repositories-owned-by-an-organization)".
     *
     * @tags teams
     * @name TeamsAddOrUpdateRepoPermissionsInOrg
     * @summary Add or update team repository permissions
     * @request PUT:/orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}
     */
    teamsAddOrUpdateRepoPermissionsInOrg: (
      org: string,
      teamSlug: string,
      owner: string,
      repo: string,
      data: { permission?: "pull" | "push" | "admin" | "maintain" | "triage" },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/orgs/${org}/teams/${teamSlug}/repos/${owner}/${repo}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description If the authenticated user is an organization owner or a team maintainer, they can remove any repositories from the team. To remove a repository from a team as an organization member, the authenticated user must have admin access to the repository and must be able to see the team. This does not delete the repository, it just removes it from the team. **Note:** You can also specify a team by `org_id` and `team_id` using the route `DELETE /organizations/{org_id}/team/{team_id}/repos/{owner}/{repo}`.
     *
     * @tags teams
     * @name TeamsRemoveRepoInOrg
     * @summary Remove a repository from a team
     * @request DELETE:/orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}
     */
    teamsRemoveRepoInOrg: (org: string, teamSlug: string, owner: string, repo: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/orgs/${org}/teams/${teamSlug}/repos/${owner}/${repo}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Team synchronization is available for organizations using GitHub Enterprise Cloud. For more information, see [GitHub's products](https://help.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation. List IdP groups connected to a team on GitHub. **Note:** You can also specify a team by `org_id` and `team_id` using the route `GET /organizations/{org_id}/team/{team_id}/team-sync/group-mappings`.
     *
     * @tags teams
     * @name TeamsListIdpGroupsInOrg
     * @summary List IdP groups for a team
     * @request GET:/orgs/{org}/teams/{team_slug}/team-sync/group-mappings
     */
    teamsListIdpGroupsInOrg: (org: string, teamSlug: string, params: RequestParams = {}) =>
      this.request<GroupMapping, any>({
        path: `/orgs/${org}/teams/${teamSlug}/team-sync/group-mappings`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Team synchronization is available for organizations using GitHub Enterprise Cloud. For more information, see [GitHub's products](https://help.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation. Creates, updates, or removes a connection between a team and an IdP group. When adding groups to a team, you must include all new and existing groups to avoid replacing existing groups with the new ones. Specifying an empty `groups` array will remove all connections for a team. **Note:** You can also specify a team by `org_id` and `team_id` using the route `PATCH /organizations/{org_id}/team/{team_id}/team-sync/group-mappings`.
     *
     * @tags teams
     * @name TeamsCreateOrUpdateIdpGroupConnectionsInOrg
     * @summary Create or update IdP group connections
     * @request PATCH:/orgs/{org}/teams/{team_slug}/team-sync/group-mappings
     */
    teamsCreateOrUpdateIdpGroupConnectionsInOrg: (
      org: string,
      teamSlug: string,
      data: { groups: { group_id: string; group_name: string; group_description: string }[] },
      params: RequestParams = {},
    ) =>
      this.request<GroupMapping, any>({
        path: `/orgs/${org}/teams/${teamSlug}/team-sync/group-mappings`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Lists the child teams of the team specified by `{team_slug}`. **Note:** You can also specify a team by `org_id` and `team_id` using the route `GET /organizations/{org_id}/team/{team_id}/teams`.
     *
     * @tags teams
     * @name TeamsListChildInOrg
     * @summary List child teams
     * @request GET:/orgs/{org}/teams/{team_slug}/teams
     */
    teamsListChildInOrg: (
      org: string,
      teamSlug: string,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<Team[], any>({
        path: `/orgs/${org}/teams/${teamSlug}/teams`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  projects = {
    /**
     * No description
     *
     * @tags projects
     * @name ProjectsGetCard
     * @summary Get a project card
     * @request GET:/projects/columns/cards/{card_id}
     */
    projectsGetCard: (cardId: number, params: RequestParams = {}) =>
      this.request<ProjectCard, BasicError>({
        path: `/projects/columns/cards/${cardId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags projects
     * @name ProjectsUpdateCard
     * @summary Update an existing project card
     * @request PATCH:/projects/columns/cards/{card_id}
     */
    projectsUpdateCard: (
      cardId: number,
      data: { note?: string | null; archived?: boolean },
      params: RequestParams = {},
    ) =>
      this.request<ProjectCard, BasicError | ValidationErrorSimple>({
        path: `/projects/columns/cards/${cardId}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags projects
     * @name ProjectsDeleteCard
     * @summary Delete a project card
     * @request DELETE:/projects/columns/cards/{card_id}
     */
    projectsDeleteCard: (cardId: number, params: RequestParams = {}) =>
      this.request<void, BasicError | { message?: string; documentation_url?: string; errors?: string[] }>({
        path: `/projects/columns/cards/${cardId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags projects
     * @name ProjectsMoveCard
     * @summary Move a project card
     * @request POST:/projects/columns/cards/{card_id}/moves
     */
    projectsMoveCard: (cardId: number, data: { position: string; column_id?: number }, params: RequestParams = {}) =>
      this.request<
        object,
        | BasicError
        | {
            message?: string;
            documentation_url?: string;
            errors?: { code?: string; message?: string; resource?: string; field?: string }[];
          }
        | ValidationError
        | {
            code?: string;
            message?: string;
            documentation_url?: string;
            errors?: { code?: string; message?: string }[];
          }
      >({
        path: `/projects/columns/cards/${cardId}/moves`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags projects
     * @name ProjectsGetColumn
     * @summary Get a project column
     * @request GET:/projects/columns/{column_id}
     */
    projectsGetColumn: (columnId: number, params: RequestParams = {}) =>
      this.request<ProjectColumn, BasicError>({
        path: `/projects/columns/${columnId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags projects
     * @name ProjectsUpdateColumn
     * @summary Update an existing project column
     * @request PATCH:/projects/columns/{column_id}
     */
    projectsUpdateColumn: (columnId: number, data: { name: string }, params: RequestParams = {}) =>
      this.request<ProjectColumn, BasicError>({
        path: `/projects/columns/${columnId}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags projects
     * @name ProjectsDeleteColumn
     * @summary Delete a project column
     * @request DELETE:/projects/columns/{column_id}
     */
    projectsDeleteColumn: (columnId: number, params: RequestParams = {}) =>
      this.request<void, BasicError>({
        path: `/projects/columns/${columnId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags projects
     * @name ProjectsListCards
     * @summary List project cards
     * @request GET:/projects/columns/{column_id}/cards
     */
    projectsListCards: (
      columnId: number,
      query?: { archived_state?: "all" | "archived" | "not_archived"; per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<ProjectCard[], BasicError>({
        path: `/projects/columns/${columnId}/cards`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description **Note**: GitHub's REST API v3 considers every pull request an issue, but not every issue is a pull request. For this reason, "Issues" endpoints may return both issues and pull requests in the response. You can identify pull requests by the `pull_request` key. Be aware that the `id` of a pull request returned from "Issues" endpoints will be an _issue id_. To find out the pull request id, use the "[List pull requests](https://docs.github.com/rest/reference/pulls#list-pull-requests)" endpoint.
     *
     * @tags projects
     * @name ProjectsCreateCard
     * @summary Create a project card
     * @request POST:/projects/columns/{column_id}/cards
     */
    projectsCreateCard: (
      columnId: number,
      data: { note: string | null } | { content_id: number; content_type: string },
      params: RequestParams = {},
    ) =>
      this.request<
        ProjectCard,
        | BasicError
        | (ValidationError | ValidationErrorSimple)
        | {
            code?: string;
            message?: string;
            documentation_url?: string;
            errors?: { code?: string; message?: string }[];
          }
      >({
        path: `/projects/columns/${columnId}/cards`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags projects
     * @name ProjectsMoveColumn
     * @summary Move a project column
     * @request POST:/projects/columns/{column_id}/moves
     */
    projectsMoveColumn: (columnId: number, data: { position: string }, params: RequestParams = {}) =>
      this.request<object, BasicError | ValidationErrorSimple>({
        path: `/projects/columns/${columnId}/moves`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets a project by its `id`. Returns a `404 Not Found` status if projects are disabled. If you do not have sufficient privileges to perform this action, a `401 Unauthorized` or `410 Gone` status is returned.
     *
     * @tags projects
     * @name ProjectsGet
     * @summary Get a project
     * @request GET:/projects/{project_id}
     */
    projectsGet: (projectId: number, params: RequestParams = {}) =>
      this.request<Project, BasicError>({
        path: `/projects/${projectId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Updates a project board's information. Returns a `404 Not Found` status if projects are disabled. If you do not have sufficient privileges to perform this action, a `401 Unauthorized` or `410 Gone` status is returned.
     *
     * @tags projects
     * @name ProjectsUpdate
     * @summary Update a project
     * @request PATCH:/projects/{project_id}
     */
    projectsUpdate: (
      projectId: number,
      data: {
        name?: string;
        body?: string | null;
        state?: string;
        organization_permission?: "read" | "write" | "admin" | "none";
        private?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        Project,
        BasicError | { message?: string; documentation_url?: string; errors?: string[] } | void | ValidationErrorSimple
      >({
        path: `/projects/${projectId}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Deletes a project board. Returns a `404 Not Found` status if projects are disabled.
     *
     * @tags projects
     * @name ProjectsDelete
     * @summary Delete a project
     * @request DELETE:/projects/{project_id}
     */
    projectsDelete: (projectId: number, params: RequestParams = {}) =>
      this.request<void, BasicError | { message?: string; documentation_url?: string; errors?: string[] }>({
        path: `/projects/${projectId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Lists the collaborators for an organization project. For a project, the list of collaborators includes outside collaborators, organization members that are direct collaborators, organization members with access through team memberships, organization members with access through default organization permissions, and organization owners. You must be an organization owner or a project `admin` to list collaborators.
     *
     * @tags projects
     * @name ProjectsListCollaborators
     * @summary List project collaborators
     * @request GET:/projects/{project_id}/collaborators
     */
    projectsListCollaborators: (
      projectId: number,
      query?: { affiliation?: "outside" | "direct" | "all"; per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<SimpleUser[], BasicError | { message: string; documentation_url: string } | ValidationError>({
        path: `/projects/${projectId}/collaborators`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Adds a collaborator to an organization project and sets their permission level. You must be an organization owner or a project `admin` to add a collaborator.
     *
     * @tags projects
     * @name ProjectsAddCollaborator
     * @summary Add project collaborator
     * @request PUT:/projects/{project_id}/collaborators/{username}
     */
    projectsAddCollaborator: (
      projectId: number,
      username: string,
      data: { permission?: "read" | "write" | "admin" },
      params: RequestParams = {},
    ) =>
      this.request<void, BasicError | { message: string; documentation_url: string } | ValidationError>({
        path: `/projects/${projectId}/collaborators/${username}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Removes a collaborator from an organization project. You must be an organization owner or a project `admin` to remove a collaborator.
     *
     * @tags projects
     * @name ProjectsRemoveCollaborator
     * @summary Remove user as a collaborator
     * @request DELETE:/projects/{project_id}/collaborators/{username}
     */
    projectsRemoveCollaborator: (projectId: number, username: string, params: RequestParams = {}) =>
      this.request<void, BasicError | { message: string; documentation_url: string } | ValidationError>({
        path: `/projects/${projectId}/collaborators/${username}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Returns the collaborator's permission level for an organization project. Possible values for the `permission` key: `admin`, `write`, `read`, `none`. You must be an organization owner or a project `admin` to review a user's permission level.
     *
     * @tags projects
     * @name ProjectsGetPermissionForUser
     * @summary Get project permission for a user
     * @request GET:/projects/{project_id}/collaborators/{username}/permission
     */
    projectsGetPermissionForUser: (projectId: number, username: string, params: RequestParams = {}) =>
      this.request<
        RepositoryCollaboratorPermission,
        BasicError | { message: string; documentation_url: string } | ValidationError
      >({
        path: `/projects/${projectId}/collaborators/${username}/permission`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags projects
     * @name ProjectsListColumns
     * @summary List project columns
     * @request GET:/projects/{project_id}/columns
     */
    projectsListColumns: (
      projectId: number,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<ProjectColumn[], BasicError>({
        path: `/projects/${projectId}/columns`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags projects
     * @name ProjectsCreateColumn
     * @summary Create a project column
     * @request POST:/projects/{project_id}/columns
     */
    projectsCreateColumn: (projectId: number, data: { name: string }, params: RequestParams = {}) =>
      this.request<ProjectColumn, BasicError | ValidationErrorSimple>({
        path: `/projects/${projectId}/columns`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  rateLimit = {
    /**
     * @description **Note:** Accessing this endpoint does not count against your REST API rate limit. **Note:** The `rate` object is deprecated. If you're writing new API client code or updating existing code, you should use the `core` object instead of the `rate` object. The `core` object contains the same information that is present in the `rate` object.
     *
     * @tags rate-limit
     * @name RateLimitGet
     * @summary Get rate limit status for the authenticated user
     * @request GET:/rate_limit
     */
    rateLimitGet: (params: RequestParams = {}) =>
      this.request<RateLimitOverview, BasicError>({
        path: `/rate_limit`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  reactions = {
    /**
     * @description **Deprecation Notice:** This endpoint route is deprecated and will be removed from the Reactions API. We recommend migrating your existing code to use the new delete reactions endpoints. For more information, see this [blog post](https://developer.github.com/changes/2020-02-26-new-delete-reactions-endpoints/). OAuth access tokens require the `write:discussion` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/), when deleting a [team discussion](https://docs.github.com/rest/reference/teams#discussions) or [team discussion comment](https://docs.github.com/rest/reference/teams#discussion-comments).
     *
     * @tags reactions
     * @name ReactionsDeleteLegacy
     * @summary Delete a reaction (Legacy)
     * @request DELETE:/reactions/{reaction_id}
     * @deprecated
     */
    reactionsDeleteLegacy: (reactionId: number, params: RequestParams = {}) =>
      this.request<void, BasicError | { message: string; documentation_url: string }>({
        path: `/reactions/${reactionId}`,
        method: "DELETE",
        ...params,
      }),
  };
  repos = {
    /**
     * @description When you pass the `scarlet-witch-preview` media type, requests to get a repository will also return the repository's code of conduct if it can be detected from the repository's code of conduct file. The `parent` and `source` objects are present when the repository is a fork. `parent` is the repository this repository was forked from, `source` is the ultimate source for the network.
     *
     * @tags repos
     * @name ReposGet
     * @summary Get a repository
     * @request GET:/repos/{owner}/{repo}
     */
    reposGet: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<FullRepository, BasicError>({
        path: `/repos/${owner}/${repo}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description **Note**: To edit a repository's topics, use the [Replace all repository topics](https://docs.github.com/rest/reference/repos#replace-all-repository-topics) endpoint.
     *
     * @tags repos
     * @name ReposUpdate
     * @summary Update a repository
     * @request PATCH:/repos/{owner}/{repo}
     */
    reposUpdate: (
      owner: string,
      repo: string,
      data: {
        name?: string;
        description?: string;
        homepage?: string;
        private?: boolean;
        visibility?: "public" | "private" | "visibility" | "internal";
        has_issues?: boolean;
        has_projects?: boolean;
        has_wiki?: boolean;
        is_template?: boolean;
        default_branch?: string;
        allow_squash_merge?: boolean;
        allow_merge_commit?: boolean;
        allow_rebase_merge?: boolean;
        delete_branch_on_merge?: boolean;
        archived?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<FullRepository, BasicError | ValidationError>({
        path: `/repos/${owner}/${repo}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Deleting a repository requires admin access. If OAuth is used, the `delete_repo` scope is required. If an organization owner has configured the organization to prevent members from deleting organization-owned repositories, you will get a `403 Forbidden` response.
     *
     * @tags repos
     * @name ReposDelete
     * @summary Delete a repository
     * @request DELETE:/repos/{owner}/{repo}
     */
    reposDelete: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<void, { message?: string; documentation_url?: string } | BasicError>({
        path: `/repos/${owner}/${repo}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Lists all artifacts for a repository. Anyone with read access to the repository can use this endpoint. If the repository is private you must use an access token with the `repo` scope. GitHub Apps must have the `actions:read` permission to use this endpoint.
     *
     * @tags actions
     * @name ActionsListArtifactsForRepo
     * @summary List artifacts for a repository
     * @request GET:/repos/{owner}/{repo}/actions/artifacts
     */
    actionsListArtifactsForRepo: (
      owner: string,
      repo: string,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<{ total_count: number; artifacts: Artifact[] }, any>({
        path: `/repos/${owner}/${repo}/actions/artifacts`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets a specific artifact for a workflow run. Anyone with read access to the repository can use this endpoint. If the repository is private you must use an access token with the `repo` scope. GitHub Apps must have the `actions:read` permission to use this endpoint.
     *
     * @tags actions
     * @name ActionsGetArtifact
     * @summary Get an artifact
     * @request GET:/repos/{owner}/{repo}/actions/artifacts/{artifact_id}
     */
    actionsGetArtifact: (owner: string, repo: string, artifactId: number, params: RequestParams = {}) =>
      this.request<Artifact, any>({
        path: `/repos/${owner}/${repo}/actions/artifacts/${artifactId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Deletes an artifact for a workflow run. You must authenticate using an access token with the `repo` scope to use this endpoint. GitHub Apps must have the `actions:write` permission to use this endpoint.
     *
     * @tags actions
     * @name ActionsDeleteArtifact
     * @summary Delete an artifact
     * @request DELETE:/repos/{owner}/{repo}/actions/artifacts/{artifact_id}
     */
    actionsDeleteArtifact: (owner: string, repo: string, artifactId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/repos/${owner}/${repo}/actions/artifacts/${artifactId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Gets a redirect URL to download an archive for a repository. This URL expires after 1 minute. Look for `Location:` in the response header to find the URL for the download. The `:archive_format` must be `zip`. Anyone with read access to the repository can use this endpoint. If the repository is private you must use an access token with the `repo` scope. GitHub Apps must have the `actions:read` permission to use this endpoint.
     *
     * @tags actions
     * @name ActionsDownloadArtifact
     * @summary Download an artifact
     * @request GET:/repos/{owner}/{repo}/actions/artifacts/{artifact_id}/{archive_format}
     */
    actionsDownloadArtifact: (
      owner: string,
      repo: string,
      artifactId: number,
      archiveFormat: string,
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/repos/${owner}/${repo}/actions/artifacts/${artifactId}/${archiveFormat}`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Gets a specific job in a workflow run. Anyone with read access to the repository can use this endpoint. If the repository is private you must use an access token with the `repo` scope. GitHub Apps must have the `actions:read` permission to use this endpoint.
     *
     * @tags actions
     * @name ActionsGetJobForWorkflowRun
     * @summary Get a job for a workflow run
     * @request GET:/repos/{owner}/{repo}/actions/jobs/{job_id}
     */
    actionsGetJobForWorkflowRun: (owner: string, repo: string, jobId: number, params: RequestParams = {}) =>
      this.request<Job, any>({
        path: `/repos/${owner}/${repo}/actions/jobs/${jobId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Gets a redirect URL to download a plain text file of logs for a workflow job. This link expires after 1 minute. Look for `Location:` in the response header to find the URL for the download. Anyone with read access to the repository can use this endpoint. If the repository is private you must use an access token with the `repo` scope. GitHub Apps must have the `actions:read` permission to use this endpoint.
     *
     * @tags actions
     * @name ActionsDownloadJobLogsForWorkflowRun
     * @summary Download job logs for a workflow run
     * @request GET:/repos/{owner}/{repo}/actions/jobs/{job_id}/logs
     */
    actionsDownloadJobLogsForWorkflowRun: (owner: string, repo: string, jobId: number, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/repos/${owner}/${repo}/actions/jobs/${jobId}/logs`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Gets the GitHub Actions permissions policy for a repository, including whether GitHub Actions is enabled and the actions allowed to run in the repository. You must authenticate using an access token with the `repo` scope to use this endpoint. GitHub Apps must have the `administration` repository permission to use this API.
     *
     * @tags actions
     * @name ActionsGetGithubActionsPermissionsRepository
     * @summary Get GitHub Actions permissions for a repository
     * @request GET:/repos/{owner}/{repo}/actions/permissions
     */
    actionsGetGithubActionsPermissionsRepository: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<ActionsRepositoryPermissions, any>({
        path: `/repos/${owner}/${repo}/actions/permissions`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Sets the GitHub Actions permissions policy for enabling GitHub Actions and allowed actions in the repository. If the repository belongs to an organization or enterprise that has set restrictive permissions at the organization or enterprise levels, such as `allowed_actions` to `selected` actions, then you cannot override them for the repository. You must authenticate using an access token with the `repo` scope to use this endpoint. GitHub Apps must have the `administration` repository permission to use this API.
     *
     * @tags actions
     * @name ActionsSetGithubActionsPermissionsRepository
     * @summary Set GitHub Actions permissions for a repository
     * @request PUT:/repos/{owner}/{repo}/actions/permissions
     */
    actionsSetGithubActionsPermissionsRepository: (
      owner: string,
      repo: string,
      data: { enabled: ActionsEnabled; allowed_actions?: AllowedActions },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/repos/${owner}/${repo}/actions/permissions`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Gets the settings for selected actions that are allowed in a repository. To use this endpoint, the repository policy for `allowed_actions` must be configured to `selected`. For more information, see "[Set GitHub Actions permissions for a repository](#set-github-actions-permissions-for-a-repository)." You must authenticate using an access token with the `repo` scope to use this endpoint. GitHub Apps must have the `administration` repository permission to use this API.
     *
     * @tags actions
     * @name ActionsGetAllowedActionsRepository
     * @summary Get allowed actions for a repository
     * @request GET:/repos/{owner}/{repo}/actions/permissions/selected-actions
     */
    actionsGetAllowedActionsRepository: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<SelectedActions, any>({
        path: `/repos/${owner}/${repo}/actions/permissions/selected-actions`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Sets the actions that are allowed in a repository. To use this endpoint, the repository permission policy for `allowed_actions` must be configured to `selected`. For more information, see "[Set GitHub Actions permissions for a repository](#set-github-actions-permissions-for-a-repository)." If the repository belongs to an organization or enterprise that has `selected` actions set at the organization or enterprise levels, then you cannot override any of the allowed actions settings. To use the `patterns_allowed` setting for private repositories, the repository must belong to an enterprise. If the repository does not belong to an enterprise, then the `patterns_allowed` setting only applies to public repositories. You must authenticate using an access token with the `repo` scope to use this endpoint. GitHub Apps must have the `administration` repository permission to use this API.
     *
     * @tags actions
     * @name ActionsSetAllowedActionsRepository
     * @summary Set allowed actions for a repository
     * @request PUT:/repos/{owner}/{repo}/actions/permissions/selected-actions
     */
    actionsSetAllowedActionsRepository: (
      owner: string,
      repo: string,
      data: SelectedActions,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/repos/${owner}/${repo}/actions/permissions/selected-actions`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Lists all self-hosted runners configured in a repository. You must authenticate using an access token with the `repo` scope to use this endpoint.
     *
     * @tags actions
     * @name ActionsListSelfHostedRunnersForRepo
     * @summary List self-hosted runners for a repository
     * @request GET:/repos/{owner}/{repo}/actions/runners
     */
    actionsListSelfHostedRunnersForRepo: (
      owner: string,
      repo: string,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<{ total_count: number; runners: Runner[] }, any>({
        path: `/repos/${owner}/${repo}/actions/runners`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Lists binaries for the runner application that you can download and run. You must authenticate using an access token with the `repo` scope to use this endpoint.
     *
     * @tags actions
     * @name ActionsListRunnerApplicationsForRepo
     * @summary List runner applications for a repository
     * @request GET:/repos/{owner}/{repo}/actions/runners/downloads
     */
    actionsListRunnerApplicationsForRepo: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<RunnerApplication[], any>({
        path: `/repos/${owner}/${repo}/actions/runners/downloads`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a token that you can pass to the `config` script. The token expires after one hour. You must authenticate using an access token with the `repo` scope to use this endpoint. #### Example using registration token Configure your self-hosted runner, replacing `TOKEN` with the registration token provided by this endpoint. ``` ./config.sh --url https://github.com/octo-org/octo-repo-artifacts --token TOKEN ```
     *
     * @tags actions
     * @name ActionsCreateRegistrationTokenForRepo
     * @summary Create a registration token for a repository
     * @request POST:/repos/{owner}/{repo}/actions/runners/registration-token
     */
    actionsCreateRegistrationTokenForRepo: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<AuthenticationToken, any>({
        path: `/repos/${owner}/${repo}/actions/runners/registration-token`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a token that you can pass to remove a self-hosted runner from a repository. The token expires after one hour. You must authenticate using an access token with the `repo` scope to use this endpoint. #### Example using remove token To remove your self-hosted runner from a repository, replace TOKEN with the remove token provided by this endpoint. ``` ./config.sh remove --token TOKEN ```
     *
     * @tags actions
     * @name ActionsCreateRemoveTokenForRepo
     * @summary Create a remove token for a repository
     * @request POST:/repos/{owner}/{repo}/actions/runners/remove-token
     */
    actionsCreateRemoveTokenForRepo: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<AuthenticationToken, any>({
        path: `/repos/${owner}/${repo}/actions/runners/remove-token`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * @description Gets a specific self-hosted runner configured in a repository. You must authenticate using an access token with the `repo` scope to use this endpoint.
     *
     * @tags actions
     * @name ActionsGetSelfHostedRunnerForRepo
     * @summary Get a self-hosted runner for a repository
     * @request GET:/repos/{owner}/{repo}/actions/runners/{runner_id}
     */
    actionsGetSelfHostedRunnerForRepo: (owner: string, repo: string, runnerId: number, params: RequestParams = {}) =>
      this.request<Runner, any>({
        path: `/repos/${owner}/${repo}/actions/runners/${runnerId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Forces the removal of a self-hosted runner from a repository. You can use this endpoint to completely remove the runner when the machine you were using no longer exists. You must authenticate using an access token with the `repo` scope to use this endpoint.
     *
     * @tags actions
     * @name ActionsDeleteSelfHostedRunnerFromRepo
     * @summary Delete a self-hosted runner from a repository
     * @request DELETE:/repos/{owner}/{repo}/actions/runners/{runner_id}
     */
    actionsDeleteSelfHostedRunnerFromRepo: (
      owner: string,
      repo: string,
      runnerId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/repos/${owner}/${repo}/actions/runners/${runnerId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Lists all workflow runs for a repository. You can use parameters to narrow the list of results. For more information about using parameters, see [Parameters](https://docs.github.com/rest/overview/resources-in-the-rest-api#parameters). Anyone with read access to the repository can use this endpoint. If the repository is private you must use an access token with the `repo` scope. GitHub Apps must have the `actions:read` permission to use this endpoint.
     *
     * @tags actions
     * @name ActionsListWorkflowRunsForRepo
     * @summary List workflow runs for a repository
     * @request GET:/repos/{owner}/{repo}/actions/runs
     */
    actionsListWorkflowRunsForRepo: (
      owner: string,
      repo: string,
      query?: {
        actor?: string;
        branch?: string;
        event?: string;
        status?: "completed" | "status" | "conclusion";
        per_page?: number;
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<{ total_count: number; workflow_runs: WorkflowRun[] }, any>({
        path: `/repos/${owner}/${repo}/actions/runs`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets a specific workflow run. Anyone with read access to the repository can use this endpoint. If the repository is private you must use an access token with the `repo` scope. GitHub Apps must have the `actions:read` permission to use this endpoint.
     *
     * @tags actions
     * @name ActionsGetWorkflowRun
     * @summary Get a workflow run
     * @request GET:/repos/{owner}/{repo}/actions/runs/{run_id}
     */
    actionsGetWorkflowRun: (owner: string, repo: string, runId: number, params: RequestParams = {}) =>
      this.request<WorkflowRun, any>({
        path: `/repos/${owner}/${repo}/actions/runs/${runId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a specific workflow run. Anyone with write access to the repository can use this endpoint. If the repository is private you must use an access token with the `repo` scope. GitHub Apps must have the `actions:write` permission to use this endpoint.
     *
     * @tags actions
     * @name ActionsDeleteWorkflowRun
     * @summary Delete a workflow run
     * @request DELETE:/repos/{owner}/{repo}/actions/runs/{run_id}
     */
    actionsDeleteWorkflowRun: (owner: string, repo: string, runId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/repos/${owner}/${repo}/actions/runs/${runId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Lists artifacts for a workflow run. Anyone with read access to the repository can use this endpoint. If the repository is private you must use an access token with the `repo` scope. GitHub Apps must have the `actions:read` permission to use this endpoint.
     *
     * @tags actions
     * @name ActionsListWorkflowRunArtifacts
     * @summary List workflow run artifacts
     * @request GET:/repos/{owner}/{repo}/actions/runs/{run_id}/artifacts
     */
    actionsListWorkflowRunArtifacts: (
      owner: string,
      repo: string,
      runId: number,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<{ total_count: number; artifacts: Artifact[] }, any>({
        path: `/repos/${owner}/${repo}/actions/runs/${runId}/artifacts`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Cancels a workflow run using its `id`. You must authenticate using an access token with the `repo` scope to use this endpoint. GitHub Apps must have the `actions:write` permission to use this endpoint.
     *
     * @tags actions
     * @name ActionsCancelWorkflowRun
     * @summary Cancel a workflow run
     * @request POST:/repos/{owner}/{repo}/actions/runs/{run_id}/cancel
     */
    actionsCancelWorkflowRun: (owner: string, repo: string, runId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/repos/${owner}/${repo}/actions/runs/${runId}/cancel`,
        method: "POST",
        ...params,
      }),

    /**
     * @description Lists jobs for a workflow run. Anyone with read access to the repository can use this endpoint. If the repository is private you must use an access token with the `repo` scope. GitHub Apps must have the `actions:read` permission to use this endpoint. You can use parameters to narrow the list of results. For more information about using parameters, see [Parameters](https://docs.github.com/rest/overview/resources-in-the-rest-api#parameters).
     *
     * @tags actions
     * @name ActionsListJobsForWorkflowRun
     * @summary List jobs for a workflow run
     * @request GET:/repos/{owner}/{repo}/actions/runs/{run_id}/jobs
     */
    actionsListJobsForWorkflowRun: (
      owner: string,
      repo: string,
      runId: number,
      query?: { filter?: "latest" | "all"; per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<{ total_count: number; jobs: Job[] }, any>({
        path: `/repos/${owner}/${repo}/actions/runs/${runId}/jobs`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets a redirect URL to download an archive of log files for a workflow run. This link expires after 1 minute. Look for `Location:` in the response header to find the URL for the download. Anyone with read access to the repository can use this endpoint. If the repository is private you must use an access token with the `repo` scope. GitHub Apps must have the `actions:read` permission to use this endpoint.
     *
     * @tags actions
     * @name ActionsDownloadWorkflowRunLogs
     * @summary Download workflow run logs
     * @request GET:/repos/{owner}/{repo}/actions/runs/{run_id}/logs
     */
    actionsDownloadWorkflowRunLogs: (owner: string, repo: string, runId: number, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/repos/${owner}/${repo}/actions/runs/${runId}/logs`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Deletes all logs for a workflow run. You must authenticate using an access token with the `repo` scope to use this endpoint. GitHub Apps must have the `actions:write` permission to use this endpoint.
     *
     * @tags actions
     * @name ActionsDeleteWorkflowRunLogs
     * @summary Delete workflow run logs
     * @request DELETE:/repos/{owner}/{repo}/actions/runs/{run_id}/logs
     */
    actionsDeleteWorkflowRunLogs: (owner: string, repo: string, runId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/repos/${owner}/${repo}/actions/runs/${runId}/logs`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Re-runs your workflow run using its `id`. You must authenticate using an access token with the `repo` scope to use this endpoint. GitHub Apps must have the `actions:write` permission to use this endpoint.
     *
     * @tags actions
     * @name ActionsReRunWorkflow
     * @summary Re-run a workflow
     * @request POST:/repos/{owner}/{repo}/actions/runs/{run_id}/rerun
     */
    actionsReRunWorkflow: (owner: string, repo: string, runId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/repos/${owner}/${repo}/actions/runs/${runId}/rerun`,
        method: "POST",
        ...params,
      }),

    /**
     * @description Gets the number of billable minutes and total run time for a specific workflow run. Billable minutes only apply to workflows in private repositories that use GitHub-hosted runners. Usage is listed for each GitHub-hosted runner operating system in milliseconds. Any job re-runs are also included in the usage. The usage does not include the multiplier for macOS and Windows runners and is not rounded up to the nearest whole minute. For more information, see "[Managing billing for GitHub Actions](https://help.github.com/github/setting-up-and-managing-billing-and-payments-on-github/managing-billing-for-github-actions)". Anyone with read access to the repository can use this endpoint. If the repository is private you must use an access token with the `repo` scope. GitHub Apps must have the `actions:read` permission to use this endpoint.
     *
     * @tags actions
     * @name ActionsGetWorkflowRunUsage
     * @summary Get workflow run usage
     * @request GET:/repos/{owner}/{repo}/actions/runs/{run_id}/timing
     */
    actionsGetWorkflowRunUsage: (owner: string, repo: string, runId: number, params: RequestParams = {}) =>
      this.request<WorkflowRunUsage, any>({
        path: `/repos/${owner}/${repo}/actions/runs/${runId}/timing`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Lists all secrets available in a repository without revealing their encrypted values. You must authenticate using an access token with the `repo` scope to use this endpoint. GitHub Apps must have the `secrets` repository permission to use this endpoint.
     *
     * @tags actions
     * @name ActionsListRepoSecrets
     * @summary List repository secrets
     * @request GET:/repos/{owner}/{repo}/actions/secrets
     */
    actionsListRepoSecrets: (
      owner: string,
      repo: string,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<{ total_count: number; secrets: ActionsSecret[] }, any>({
        path: `/repos/${owner}/${repo}/actions/secrets`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets your public key, which you need to encrypt secrets. You need to encrypt a secret before you can create or update secrets. Anyone with read access to the repository can use this endpoint. If the repository is private you must use an access token with the `repo` scope. GitHub Apps must have the `secrets` repository permission to use this endpoint.
     *
     * @tags actions
     * @name ActionsGetRepoPublicKey
     * @summary Get a repository public key
     * @request GET:/repos/{owner}/{repo}/actions/secrets/public-key
     */
    actionsGetRepoPublicKey: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<ActionsPublicKey, any>({
        path: `/repos/${owner}/${repo}/actions/secrets/public-key`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Gets a single repository secret without revealing its encrypted value. You must authenticate using an access token with the `repo` scope to use this endpoint. GitHub Apps must have the `secrets` repository permission to use this endpoint.
     *
     * @tags actions
     * @name ActionsGetRepoSecret
     * @summary Get a repository secret
     * @request GET:/repos/{owner}/{repo}/actions/secrets/{secret_name}
     */
    actionsGetRepoSecret: (owner: string, repo: string, secretName: string, params: RequestParams = {}) =>
      this.request<ActionsSecret, any>({
        path: `/repos/${owner}/${repo}/actions/secrets/${secretName}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Creates or updates a repository secret with an encrypted value. Encrypt your secret using [LibSodium](https://libsodium.gitbook.io/doc/bindings_for_other_languages). You must authenticate using an access token with the `repo` scope to use this endpoint. GitHub Apps must have the `secrets` repository permission to use this endpoint. #### Example encrypting a secret using Node.js Encrypt your secret using the [tweetsodium](https://github.com/github/tweetsodium) library. ``` const sodium = require('tweetsodium'); const key = "base64-encoded-public-key"; const value = "plain-text-secret"; // Convert the message and key to Uint8Array's (Buffer implements that interface) const messageBytes = Buffer.from(value); const keyBytes = Buffer.from(key, 'base64'); // Encrypt using LibSodium. const encryptedBytes = sodium.seal(messageBytes, keyBytes); // Base64 the encrypted secret const encrypted = Buffer.from(encryptedBytes).toString('base64'); console.log(encrypted); ``` #### Example encrypting a secret using Python Encrypt your secret using [pynacl](https://pynacl.readthedocs.io/en/stable/public/#nacl-public-sealedbox) with Python 3. ``` from base64 import b64encode from nacl import encoding, public def encrypt(public_key: str, secret_value: str) -> str: """Encrypt a Unicode string using the public key.""" public_key = public.PublicKey(public_key.encode("utf-8"), encoding.Base64Encoder()) sealed_box = public.SealedBox(public_key) encrypted = sealed_box.encrypt(secret_value.encode("utf-8")) return b64encode(encrypted).decode("utf-8") ``` #### Example encrypting a secret using C# Encrypt your secret using the [Sodium.Core](https://www.nuget.org/packages/Sodium.Core/) package. ``` var secretValue = System.Text.Encoding.UTF8.GetBytes("mySecret"); var publicKey = Convert.FromBase64String("2Sg8iYjAxxmI2LvUXpJjkYrMxURPc8r+dB7TJyvvcCU="); var sealedPublicKeyBox = Sodium.SealedPublicKeyBox.Create(secretValue, publicKey); Console.WriteLine(Convert.ToBase64String(sealedPublicKeyBox)); ``` #### Example encrypting a secret using Ruby Encrypt your secret using the [rbnacl](https://github.com/RubyCrypto/rbnacl) gem. ```ruby require "rbnacl" require "base64" key = Base64.decode64("+ZYvJDZMHUfBkJdyq5Zm9SKqeuBQ4sj+6sfjlH4CgG0=") public_key = RbNaCl::PublicKey.new(key) box = RbNaCl::Boxes::Sealed.from_public_key(public_key) encrypted_secret = box.encrypt("my_secret") # Print the base64 encoded secret puts Base64.strict_encode64(encrypted_secret) ```
     *
     * @tags actions
     * @name ActionsCreateOrUpdateRepoSecret
     * @summary Create or update a repository secret
     * @request PUT:/repos/{owner}/{repo}/actions/secrets/{secret_name}
     */
    actionsCreateOrUpdateRepoSecret: (
      owner: string,
      repo: string,
      secretName: string,
      data: { encrypted_value?: string; key_id?: string },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/repos/${owner}/${repo}/actions/secrets/${secretName}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Deletes a secret in a repository using the secret name. You must authenticate using an access token with the `repo` scope to use this endpoint. GitHub Apps must have the `secrets` repository permission to use this endpoint.
     *
     * @tags actions
     * @name ActionsDeleteRepoSecret
     * @summary Delete a repository secret
     * @request DELETE:/repos/{owner}/{repo}/actions/secrets/{secret_name}
     */
    actionsDeleteRepoSecret: (owner: string, repo: string, secretName: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/repos/${owner}/${repo}/actions/secrets/${secretName}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Lists the workflows in a repository. Anyone with read access to the repository can use this endpoint. If the repository is private you must use an access token with the `repo` scope. GitHub Apps must have the `actions:read` permission to use this endpoint.
     *
     * @tags actions
     * @name ActionsListRepoWorkflows
     * @summary List repository workflows
     * @request GET:/repos/{owner}/{repo}/actions/workflows
     */
    actionsListRepoWorkflows: (
      owner: string,
      repo: string,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<{ total_count: number; workflows: Workflow[] }, any>({
        path: `/repos/${owner}/${repo}/actions/workflows`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets a specific workflow. You can replace `workflow_id` with the workflow file name. For example, you could use `main.yaml`. Anyone with read access to the repository can use this endpoint. If the repository is private you must use an access token with the `repo` scope. GitHub Apps must have the `actions:read` permission to use this endpoint.
     *
     * @tags actions
     * @name ActionsGetWorkflow
     * @summary Get a workflow
     * @request GET:/repos/{owner}/{repo}/actions/workflows/{workflow_id}
     */
    actionsGetWorkflow: (owner: string, repo: string, workflowId: number | string, params: RequestParams = {}) =>
      this.request<Workflow, any>({
        path: `/repos/${owner}/${repo}/actions/workflows/${workflowId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Disables a workflow and sets the `state` of the workflow to `disabled_manually`. You can replace `workflow_id` with the workflow file name. For example, you could use `main.yaml`. You must authenticate using an access token with the `repo` scope to use this endpoint. GitHub Apps must have the `actions:write` permission to use this endpoint.
     *
     * @tags actions
     * @name ActionsDisableWorkflow
     * @summary Disable a workflow
     * @request PUT:/repos/{owner}/{repo}/actions/workflows/{workflow_id}/disable
     */
    actionsDisableWorkflow: (owner: string, repo: string, workflowId: number | string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/repos/${owner}/${repo}/actions/workflows/${workflowId}/disable`,
        method: "PUT",
        ...params,
      }),

    /**
     * @description You can use this endpoint to manually trigger a GitHub Actions workflow run. You can replace `workflow_id` with the workflow file name. For example, you could use `main.yaml`. You must configure your GitHub Actions workflow to run when the [`workflow_dispatch` webhook](/developers/webhooks-and-events/webhook-events-and-payloads#workflow_dispatch) event occurs. The `inputs` are configured in the workflow file. For more information about how to configure the `workflow_dispatch` event in the workflow file, see "[Events that trigger workflows](/actions/reference/events-that-trigger-workflows#workflow_dispatch)." You must authenticate using an access token with the `repo` scope to use this endpoint. GitHub Apps must have the `actions:write` permission to use this endpoint. For more information, see "[Creating a personal access token for the command line](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line)."
     *
     * @tags actions
     * @name ActionsCreateWorkflowDispatch
     * @summary Create a workflow dispatch event
     * @request POST:/repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches
     */
    actionsCreateWorkflowDispatch: (
      owner: string,
      repo: string,
      workflowId: number | string,
      data: { ref: string; inputs?: Record<string, string> },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/repos/${owner}/${repo}/actions/workflows/${workflowId}/dispatches`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Enables a workflow and sets the `state` of the workflow to `active`. You can replace `workflow_id` with the workflow file name. For example, you could use `main.yaml`. You must authenticate using an access token with the `repo` scope to use this endpoint. GitHub Apps must have the `actions:write` permission to use this endpoint.
     *
     * @tags actions
     * @name ActionsEnableWorkflow
     * @summary Enable a workflow
     * @request PUT:/repos/{owner}/{repo}/actions/workflows/{workflow_id}/enable
     */
    actionsEnableWorkflow: (owner: string, repo: string, workflowId: number | string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/repos/${owner}/${repo}/actions/workflows/${workflowId}/enable`,
        method: "PUT",
        ...params,
      }),

    /**
     * @description List all workflow runs for a workflow. You can replace `workflow_id` with the workflow file name. For example, you could use `main.yaml`. You can use parameters to narrow the list of results. For more information about using parameters, see [Parameters](https://docs.github.com/rest/overview/resources-in-the-rest-api#parameters). Anyone with read access to the repository can use this endpoint. If the repository is private you must use an access token with the `repo` scope.
     *
     * @tags actions
     * @name ActionsListWorkflowRuns
     * @summary List workflow runs
     * @request GET:/repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs
     */
    actionsListWorkflowRuns: (
      owner: string,
      repo: string,
      workflowId: number | string,
      query?: {
        actor?: string;
        branch?: string;
        event?: string;
        status?: "completed" | "status" | "conclusion";
        per_page?: number;
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<{ total_count: number; workflow_runs: WorkflowRun[] }, any>({
        path: `/repos/${owner}/${repo}/actions/workflows/${workflowId}/runs`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets the number of billable minutes used by a specific workflow during the current billing cycle. Billable minutes only apply to workflows in private repositories that use GitHub-hosted runners. Usage is listed for each GitHub-hosted runner operating system in milliseconds. Any job re-runs are also included in the usage. The usage does not include the multiplier for macOS and Windows runners and is not rounded up to the nearest whole minute. For more information, see "[Managing billing for GitHub Actions](https://help.github.com/github/setting-up-and-managing-billing-and-payments-on-github/managing-billing-for-github-actions)". You can replace `workflow_id` with the workflow file name. For example, you could use `main.yaml`. Anyone with read access to the repository can use this endpoint. If the repository is private you must use an access token with the `repo` scope. GitHub Apps must have the `actions:read` permission to use this endpoint.
     *
     * @tags actions
     * @name ActionsGetWorkflowUsage
     * @summary Get workflow usage
     * @request GET:/repos/{owner}/{repo}/actions/workflows/{workflow_id}/timing
     */
    actionsGetWorkflowUsage: (owner: string, repo: string, workflowId: number | string, params: RequestParams = {}) =>
      this.request<WorkflowUsage, any>({
        path: `/repos/${owner}/${repo}/actions/workflows/${workflowId}/timing`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Lists the [available assignees](https://help.github.com/articles/assigning-issues-and-pull-requests-to-other-github-users/) for issues in a repository.
     *
     * @tags issues
     * @name IssuesListAssignees
     * @summary List assignees
     * @request GET:/repos/{owner}/{repo}/assignees
     */
    issuesListAssignees: (
      owner: string,
      repo: string,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<SimpleUser[], BasicError>({
        path: `/repos/${owner}/${repo}/assignees`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Checks if a user has permission to be assigned to an issue in this repository. If the `assignee` can be assigned to issues in the repository, a `204` header with no content is returned. Otherwise a `404` status code is returned.
     *
     * @tags issues
     * @name IssuesCheckUserCanBeAssigned
     * @summary Check if a user can be assigned
     * @request GET:/repos/{owner}/{repo}/assignees/{assignee}
     */
    issuesCheckUserCanBeAssigned: (owner: string, repo: string, assignee: string, params: RequestParams = {}) =>
      this.request<void, BasicError>({
        path: `/repos/${owner}/${repo}/assignees/${assignee}`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Enables automated security fixes for a repository. The authenticated user must have admin access to the repository. For more information, see "[Configuring automated security fixes](https://help.github.com/en/articles/configuring-automated-security-fixes)".
     *
     * @tags repos
     * @name ReposEnableAutomatedSecurityFixes
     * @summary Enable automated security fixes
     * @request PUT:/repos/{owner}/{repo}/automated-security-fixes
     */
    reposEnableAutomatedSecurityFixes: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/repos/${owner}/${repo}/automated-security-fixes`,
        method: "PUT",
        ...params,
      }),

    /**
     * @description Disables automated security fixes for a repository. The authenticated user must have admin access to the repository. For more information, see "[Configuring automated security fixes](https://help.github.com/en/articles/configuring-automated-security-fixes)".
     *
     * @tags repos
     * @name ReposDisableAutomatedSecurityFixes
     * @summary Disable automated security fixes
     * @request DELETE:/repos/{owner}/{repo}/automated-security-fixes
     */
    reposDisableAutomatedSecurityFixes: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/repos/${owner}/${repo}/automated-security-fixes`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags repos
     * @name ReposListBranches
     * @summary List branches
     * @request GET:/repos/{owner}/{repo}/branches
     */
    reposListBranches: (
      owner: string,
      repo: string,
      query?: { protected?: boolean; per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<ShortBranch[], BasicError>({
        path: `/repos/${owner}/${repo}/branches`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags repos
     * @name ReposGetBranch
     * @summary Get a branch
     * @request GET:/repos/{owner}/{repo}/branches/{branch}
     */
    reposGetBranch: (owner: string, repo: string, branch: string, params: RequestParams = {}) =>
      this.request<BranchWithProtection, BasicError | { message: string; documentation_url: string }>({
        path: `/repos/${owner}/${repo}/branches/${branch}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Protected branches are available in public repositories with GitHub Free and GitHub Free for organizations, and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server. For more information, see [GitHub's products](https://help.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation.
     *
     * @tags repos
     * @name ReposGetBranchProtection
     * @summary Get branch protection
     * @request GET:/repos/{owner}/{repo}/branches/{branch}/protection
     */
    reposGetBranchProtection: (owner: string, repo: string, branch: string, params: RequestParams = {}) =>
      this.request<BranchProtection, BasicError>({
        path: `/repos/${owner}/${repo}/branches/${branch}/protection`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Protected branches are available in public repositories with GitHub Free and GitHub Free for organizations, and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server. For more information, see [GitHub's products](https://help.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation. Protecting a branch requires admin or owner permissions to the repository. **Note**: Passing new arrays of `users` and `teams` replaces their previous values. **Note**: The list of users, apps, and teams in total is limited to 100 items.
     *
     * @tags repos
     * @name ReposUpdateBranchProtection
     * @summary Update branch protection
     * @request PUT:/repos/{owner}/{repo}/branches/{branch}/protection
     */
    reposUpdateBranchProtection: (
      owner: string,
      repo: string,
      branch: string,
      data: {
        required_status_checks: { strict: boolean; contexts: string[] };
        enforce_admins: boolean | null;
        required_pull_request_reviews: {
          dismissal_restrictions?: { users?: string[]; teams?: string[] };
          dismiss_stale_reviews?: boolean;
          require_code_owner_reviews?: boolean;
          required_approving_review_count?: number;
        };
        restrictions: { users: string[]; teams: string[]; apps?: string[] };
        required_linear_history?: boolean;
        allow_force_pushes?: boolean | null;
        allow_deletions?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        ProtectedBranch,
        BasicError | { message: string; documentation_url: string } | ValidationErrorSimple
      >({
        path: `/repos/${owner}/${repo}/branches/${branch}/protection`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Protected branches are available in public repositories with GitHub Free and GitHub Free for organizations, and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server. For more information, see [GitHub's products](https://help.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation.
     *
     * @tags repos
     * @name ReposDeleteBranchProtection
     * @summary Delete branch protection
     * @request DELETE:/repos/{owner}/{repo}/branches/{branch}/protection
     */
    reposDeleteBranchProtection: (owner: string, repo: string, branch: string, params: RequestParams = {}) =>
      this.request<void, BasicError>({
        path: `/repos/${owner}/${repo}/branches/${branch}/protection`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Protected branches are available in public repositories with GitHub Free and GitHub Free for organizations, and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server. For more information, see [GitHub's products](https://help.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation.
     *
     * @tags repos
     * @name ReposGetAdminBranchProtection
     * @summary Get admin branch protection
     * @request GET:/repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins
     */
    reposGetAdminBranchProtection: (owner: string, repo: string, branch: string, params: RequestParams = {}) =>
      this.request<ProtectedBranchAdminEnforced, any>({
        path: `/repos/${owner}/${repo}/branches/${branch}/protection/enforce_admins`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Protected branches are available in public repositories with GitHub Free and GitHub Free for organizations, and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server. For more information, see [GitHub's products](https://help.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation. Adding admin enforcement requires admin or owner permissions to the repository and branch protection to be enabled.
     *
     * @tags repos
     * @name ReposSetAdminBranchProtection
     * @summary Set admin branch protection
     * @request POST:/repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins
     */
    reposSetAdminBranchProtection: (owner: string, repo: string, branch: string, params: RequestParams = {}) =>
      this.request<ProtectedBranchAdminEnforced, any>({
        path: `/repos/${owner}/${repo}/branches/${branch}/protection/enforce_admins`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * @description Protected branches are available in public repositories with GitHub Free and GitHub Free for organizations, and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server. For more information, see [GitHub's products](https://help.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation. Removing admin enforcement requires admin or owner permissions to the repository and branch protection to be enabled.
     *
     * @tags repos
     * @name ReposDeleteAdminBranchProtection
     * @summary Delete admin branch protection
     * @request DELETE:/repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins
     */
    reposDeleteAdminBranchProtection: (owner: string, repo: string, branch: string, params: RequestParams = {}) =>
      this.request<void, BasicError>({
        path: `/repos/${owner}/${repo}/branches/${branch}/protection/enforce_admins`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Protected branches are available in public repositories with GitHub Free and GitHub Free for organizations, and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server. For more information, see [GitHub's products](https://help.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation.
     *
     * @tags repos
     * @name ReposGetPullRequestReviewProtection
     * @summary Get pull request review protection
     * @request GET:/repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews
     */
    reposGetPullRequestReviewProtection: (owner: string, repo: string, branch: string, params: RequestParams = {}) =>
      this.request<ProtectedBranchPullRequestReview, any>({
        path: `/repos/${owner}/${repo}/branches/${branch}/protection/required_pull_request_reviews`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Protected branches are available in public repositories with GitHub Free and GitHub Free for organizations, and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server. For more information, see [GitHub's products](https://help.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation. Updating pull request review enforcement requires admin or owner permissions to the repository and branch protection to be enabled. **Note**: Passing new arrays of `users` and `teams` replaces their previous values.
     *
     * @tags repos
     * @name ReposUpdatePullRequestReviewProtection
     * @summary Update pull request review protection
     * @request PATCH:/repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews
     */
    reposUpdatePullRequestReviewProtection: (
      owner: string,
      repo: string,
      branch: string,
      data: {
        dismissal_restrictions?: { users?: string[]; teams?: string[] };
        dismiss_stale_reviews?: boolean;
        require_code_owner_reviews?: boolean;
        required_approving_review_count?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ProtectedBranchPullRequestReview, ValidationError>({
        path: `/repos/${owner}/${repo}/branches/${branch}/protection/required_pull_request_reviews`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Protected branches are available in public repositories with GitHub Free and GitHub Free for organizations, and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server. For more information, see [GitHub's products](https://help.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation.
     *
     * @tags repos
     * @name ReposDeletePullRequestReviewProtection
     * @summary Delete pull request review protection
     * @request DELETE:/repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews
     */
    reposDeletePullRequestReviewProtection: (owner: string, repo: string, branch: string, params: RequestParams = {}) =>
      this.request<void, BasicError>({
        path: `/repos/${owner}/${repo}/branches/${branch}/protection/required_pull_request_reviews`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Protected branches are available in public repositories with GitHub Free and GitHub Free for organizations, and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server. For more information, see [GitHub's products](https://help.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation. When authenticated with admin or owner permissions to the repository, you can use this endpoint to check whether a branch requires signed commits. An enabled status of `true` indicates you must sign commits on this branch. For more information, see [Signing commits with GPG](https://help.github.com/articles/signing-commits-with-gpg) in GitHub Help. **Note**: You must enable branch protection to require signed commits.
     *
     * @tags repos
     * @name ReposGetCommitSignatureProtection
     * @summary Get commit signature protection
     * @request GET:/repos/{owner}/{repo}/branches/{branch}/protection/required_signatures
     */
    reposGetCommitSignatureProtection: (owner: string, repo: string, branch: string, params: RequestParams = {}) =>
      this.request<ProtectedBranchAdminEnforced, BasicError>({
        path: `/repos/${owner}/${repo}/branches/${branch}/protection/required_signatures`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Protected branches are available in public repositories with GitHub Free and GitHub Free for organizations, and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server. For more information, see [GitHub's products](https://help.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation. When authenticated with admin or owner permissions to the repository, you can use this endpoint to require signed commits on a branch. You must enable branch protection to require signed commits.
     *
     * @tags repos
     * @name ReposCreateCommitSignatureProtection
     * @summary Create commit signature protection
     * @request POST:/repos/{owner}/{repo}/branches/{branch}/protection/required_signatures
     */
    reposCreateCommitSignatureProtection: (owner: string, repo: string, branch: string, params: RequestParams = {}) =>
      this.request<ProtectedBranchAdminEnforced, BasicError>({
        path: `/repos/${owner}/${repo}/branches/${branch}/protection/required_signatures`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * @description Protected branches are available in public repositories with GitHub Free and GitHub Free for organizations, and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server. For more information, see [GitHub's products](https://help.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation. When authenticated with admin or owner permissions to the repository, you can use this endpoint to disable required signed commits on a branch. You must enable branch protection to require signed commits.
     *
     * @tags repos
     * @name ReposDeleteCommitSignatureProtection
     * @summary Delete commit signature protection
     * @request DELETE:/repos/{owner}/{repo}/branches/{branch}/protection/required_signatures
     */
    reposDeleteCommitSignatureProtection: (owner: string, repo: string, branch: string, params: RequestParams = {}) =>
      this.request<void, BasicError>({
        path: `/repos/${owner}/${repo}/branches/${branch}/protection/required_signatures`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Protected branches are available in public repositories with GitHub Free and GitHub Free for organizations, and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server. For more information, see [GitHub's products](https://help.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation.
     *
     * @tags repos
     * @name ReposGetStatusChecksProtection
     * @summary Get status checks protection
     * @request GET:/repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks
     */
    reposGetStatusChecksProtection: (owner: string, repo: string, branch: string, params: RequestParams = {}) =>
      this.request<StatusCheckPolicy, BasicError>({
        path: `/repos/${owner}/${repo}/branches/${branch}/protection/required_status_checks`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Protected branches are available in public repositories with GitHub Free and GitHub Free for organizations, and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server. For more information, see [GitHub's products](https://help.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation. Updating required status checks requires admin or owner permissions to the repository and branch protection to be enabled.
     *
     * @tags repos
     * @name ReposUpdateStatusCheckProtection
     * @summary Update status check protection
     * @request PATCH:/repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks
     */
    reposUpdateStatusCheckProtection: (
      owner: string,
      repo: string,
      branch: string,
      data: { strict?: boolean; contexts?: string[] },
      params: RequestParams = {},
    ) =>
      this.request<StatusCheckPolicy, BasicError | ValidationError>({
        path: `/repos/${owner}/${repo}/branches/${branch}/protection/required_status_checks`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Protected branches are available in public repositories with GitHub Free and GitHub Free for organizations, and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server. For more information, see [GitHub's products](https://help.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation.
     *
     * @tags repos
     * @name ReposRemoveStatusCheckProtection
     * @summary Remove status check protection
     * @request DELETE:/repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks
     */
    reposRemoveStatusCheckProtection: (owner: string, repo: string, branch: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/repos/${owner}/${repo}/branches/${branch}/protection/required_status_checks`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Protected branches are available in public repositories with GitHub Free and GitHub Free for organizations, and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server. For more information, see [GitHub's products](https://help.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation.
     *
     * @tags repos
     * @name ReposGetAllStatusCheckContexts
     * @summary Get all status check contexts
     * @request GET:/repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts
     */
    reposGetAllStatusCheckContexts: (owner: string, repo: string, branch: string, params: RequestParams = {}) =>
      this.request<string[], BasicError>({
        path: `/repos/${owner}/${repo}/branches/${branch}/protection/required_status_checks/contexts`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Protected branches are available in public repositories with GitHub Free and GitHub Free for organizations, and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server. For more information, see [GitHub's products](https://help.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation.
     *
     * @tags repos
     * @name ReposAddStatusCheckContexts
     * @summary Add status check contexts
     * @request POST:/repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts
     */
    reposAddStatusCheckContexts: (
      owner: string,
      repo: string,
      branch: string,
      data: { contexts: string[] },
      params: RequestParams = {},
    ) =>
      this.request<string[], BasicError | ValidationError>({
        path: `/repos/${owner}/${repo}/branches/${branch}/protection/required_status_checks/contexts`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Protected branches are available in public repositories with GitHub Free and GitHub Free for organizations, and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server. For more information, see [GitHub's products](https://help.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation.
     *
     * @tags repos
     * @name ReposSetStatusCheckContexts
     * @summary Set status check contexts
     * @request PUT:/repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts
     */
    reposSetStatusCheckContexts: (
      owner: string,
      repo: string,
      branch: string,
      data: { contexts: string[] },
      params: RequestParams = {},
    ) =>
      this.request<string[], BasicError | ValidationError>({
        path: `/repos/${owner}/${repo}/branches/${branch}/protection/required_status_checks/contexts`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Protected branches are available in public repositories with GitHub Free and GitHub Free for organizations, and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server. For more information, see [GitHub's products](https://help.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation.
     *
     * @tags repos
     * @name ReposRemoveStatusCheckContexts
     * @summary Remove status check contexts
     * @request DELETE:/repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts
     */
    reposRemoveStatusCheckContexts: (
      owner: string,
      repo: string,
      branch: string,
      data: { contexts: string[] },
      params: RequestParams = {},
    ) =>
      this.request<string[], BasicError | ValidationError>({
        path: `/repos/${owner}/${repo}/branches/${branch}/protection/required_status_checks/contexts`,
        method: "DELETE",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Protected branches are available in public repositories with GitHub Free and GitHub Free for organizations, and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server. For more information, see [GitHub's products](https://help.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation. Lists who has access to this protected branch. **Note**: Users, apps, and teams `restrictions` are only available for organization-owned repositories.
     *
     * @tags repos
     * @name ReposGetAccessRestrictions
     * @summary Get access restrictions
     * @request GET:/repos/{owner}/{repo}/branches/{branch}/protection/restrictions
     */
    reposGetAccessRestrictions: (owner: string, repo: string, branch: string, params: RequestParams = {}) =>
      this.request<BranchRestrictionPolicy, BasicError>({
        path: `/repos/${owner}/${repo}/branches/${branch}/protection/restrictions`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Protected branches are available in public repositories with GitHub Free and GitHub Free for organizations, and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server. For more information, see [GitHub's products](https://help.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation. Disables the ability to restrict who can push to this branch.
     *
     * @tags repos
     * @name ReposDeleteAccessRestrictions
     * @summary Delete access restrictions
     * @request DELETE:/repos/{owner}/{repo}/branches/{branch}/protection/restrictions
     */
    reposDeleteAccessRestrictions: (owner: string, repo: string, branch: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/repos/${owner}/${repo}/branches/${branch}/protection/restrictions`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Protected branches are available in public repositories with GitHub Free and GitHub Free for organizations, and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server. For more information, see [GitHub's products](https://help.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation. Lists the GitHub Apps that have push access to this branch. Only installed GitHub Apps with `write` access to the `contents` permission can be added as authorized actors on a protected branch.
     *
     * @tags repos
     * @name ReposGetAppsWithAccessToProtectedBranch
     * @summary Get apps with access to the protected branch
     * @request GET:/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps
     */
    reposGetAppsWithAccessToProtectedBranch: (
      owner: string,
      repo: string,
      branch: string,
      params: RequestParams = {},
    ) =>
      this.request<Integration[], BasicError>({
        path: `/repos/${owner}/${repo}/branches/${branch}/protection/restrictions/apps`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Protected branches are available in public repositories with GitHub Free and GitHub Free for organizations, and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server. For more information, see [GitHub's products](https://help.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation. Grants the specified apps push access for this branch. Only installed GitHub Apps with `write` access to the `contents` permission can be added as authorized actors on a protected branch. | Type    | Description                                                                                                                                                | | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | | `array` | The GitHub Apps that have push access to this branch. Use the app's `slug`. **Note**: The list of users, apps, and teams in total is limited to 100 items. |
     *
     * @tags repos
     * @name ReposAddAppAccessRestrictions
     * @summary Add app access restrictions
     * @request POST:/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps
     */
    reposAddAppAccessRestrictions: (
      owner: string,
      repo: string,
      branch: string,
      data: { apps: string[] },
      params: RequestParams = {},
    ) =>
      this.request<Integration[], ValidationError>({
        path: `/repos/${owner}/${repo}/branches/${branch}/protection/restrictions/apps`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Protected branches are available in public repositories with GitHub Free and GitHub Free for organizations, and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server. For more information, see [GitHub's products](https://help.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation. Replaces the list of apps that have push access to this branch. This removes all apps that previously had push access and grants push access to the new list of apps. Only installed GitHub Apps with `write` access to the `contents` permission can be added as authorized actors on a protected branch. | Type    | Description                                                                                                                                                | | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | | `array` | The GitHub Apps that have push access to this branch. Use the app's `slug`. **Note**: The list of users, apps, and teams in total is limited to 100 items. |
     *
     * @tags repos
     * @name ReposSetAppAccessRestrictions
     * @summary Set app access restrictions
     * @request PUT:/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps
     */
    reposSetAppAccessRestrictions: (
      owner: string,
      repo: string,
      branch: string,
      data: { apps: string[] },
      params: RequestParams = {},
    ) =>
      this.request<Integration[], ValidationError>({
        path: `/repos/${owner}/${repo}/branches/${branch}/protection/restrictions/apps`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Protected branches are available in public repositories with GitHub Free and GitHub Free for organizations, and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server. For more information, see [GitHub's products](https://help.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation. Removes the ability of an app to push to this branch. Only installed GitHub Apps with `write` access to the `contents` permission can be added as authorized actors on a protected branch. | Type    | Description                                                                                                                                                | | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | | `array` | The GitHub Apps that have push access to this branch. Use the app's `slug`. **Note**: The list of users, apps, and teams in total is limited to 100 items. |
     *
     * @tags repos
     * @name ReposRemoveAppAccessRestrictions
     * @summary Remove app access restrictions
     * @request DELETE:/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps
     */
    reposRemoveAppAccessRestrictions: (
      owner: string,
      repo: string,
      branch: string,
      data: { apps: string[] },
      params: RequestParams = {},
    ) =>
      this.request<Integration[], ValidationError>({
        path: `/repos/${owner}/${repo}/branches/${branch}/protection/restrictions/apps`,
        method: "DELETE",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Protected branches are available in public repositories with GitHub Free and GitHub Free for organizations, and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server. For more information, see [GitHub's products](https://help.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation. Lists the teams who have push access to this branch. The list includes child teams.
     *
     * @tags repos
     * @name ReposGetTeamsWithAccessToProtectedBranch
     * @summary Get teams with access to the protected branch
     * @request GET:/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams
     */
    reposGetTeamsWithAccessToProtectedBranch: (
      owner: string,
      repo: string,
      branch: string,
      params: RequestParams = {},
    ) =>
      this.request<Team[], BasicError>({
        path: `/repos/${owner}/${repo}/branches/${branch}/protection/restrictions/teams`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Protected branches are available in public repositories with GitHub Free and GitHub Free for organizations, and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server. For more information, see [GitHub's products](https://help.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation. Grants the specified teams push access for this branch. You can also give push access to child teams. | Type    | Description                                                                                                                                | | ------- | ------------------------------------------------------------------------------------------------------------------------------------------ | | `array` | The teams that can have push access. Use the team's `slug`. **Note**: The list of users, apps, and teams in total is limited to 100 items. |
     *
     * @tags repos
     * @name ReposAddTeamAccessRestrictions
     * @summary Add team access restrictions
     * @request POST:/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams
     */
    reposAddTeamAccessRestrictions: (
      owner: string,
      repo: string,
      branch: string,
      data: { teams: string[] },
      params: RequestParams = {},
    ) =>
      this.request<Team[], ValidationError>({
        path: `/repos/${owner}/${repo}/branches/${branch}/protection/restrictions/teams`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Protected branches are available in public repositories with GitHub Free and GitHub Free for organizations, and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server. For more information, see [GitHub's products](https://help.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation. Replaces the list of teams that have push access to this branch. This removes all teams that previously had push access and grants push access to the new list of teams. Team restrictions include child teams. | Type    | Description                                                                                                                                | | ------- | ------------------------------------------------------------------------------------------------------------------------------------------ | | `array` | The teams that can have push access. Use the team's `slug`. **Note**: The list of users, apps, and teams in total is limited to 100 items. |
     *
     * @tags repos
     * @name ReposSetTeamAccessRestrictions
     * @summary Set team access restrictions
     * @request PUT:/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams
     */
    reposSetTeamAccessRestrictions: (
      owner: string,
      repo: string,
      branch: string,
      data: { teams: string[] },
      params: RequestParams = {},
    ) =>
      this.request<Team[], ValidationError>({
        path: `/repos/${owner}/${repo}/branches/${branch}/protection/restrictions/teams`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Protected branches are available in public repositories with GitHub Free and GitHub Free for organizations, and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server. For more information, see [GitHub's products](https://help.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation. Removes the ability of a team to push to this branch. You can also remove push access for child teams. | Type    | Description                                                                                                                                         | | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | | `array` | Teams that should no longer have push access. Use the team's `slug`. **Note**: The list of users, apps, and teams in total is limited to 100 items. |
     *
     * @tags repos
     * @name ReposRemoveTeamAccessRestrictions
     * @summary Remove team access restrictions
     * @request DELETE:/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams
     */
    reposRemoveTeamAccessRestrictions: (
      owner: string,
      repo: string,
      branch: string,
      data: { teams: string[] },
      params: RequestParams = {},
    ) =>
      this.request<Team[], ValidationError>({
        path: `/repos/${owner}/${repo}/branches/${branch}/protection/restrictions/teams`,
        method: "DELETE",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Protected branches are available in public repositories with GitHub Free and GitHub Free for organizations, and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server. For more information, see [GitHub's products](https://help.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation. Lists the people who have push access to this branch.
     *
     * @tags repos
     * @name ReposGetUsersWithAccessToProtectedBranch
     * @summary Get users with access to the protected branch
     * @request GET:/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users
     */
    reposGetUsersWithAccessToProtectedBranch: (
      owner: string,
      repo: string,
      branch: string,
      params: RequestParams = {},
    ) =>
      this.request<SimpleUser[], BasicError>({
        path: `/repos/${owner}/${repo}/branches/${branch}/protection/restrictions/users`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Protected branches are available in public repositories with GitHub Free and GitHub Free for organizations, and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server. For more information, see [GitHub's products](https://help.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation. Grants the specified people push access for this branch. | Type    | Description                                                                                                                   | | ------- | ----------------------------------------------------------------------------------------------------------------------------- | | `array` | Usernames for people who can have push access. **Note**: The list of users, apps, and teams in total is limited to 100 items. |
     *
     * @tags repos
     * @name ReposAddUserAccessRestrictions
     * @summary Add user access restrictions
     * @request POST:/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users
     */
    reposAddUserAccessRestrictions: (
      owner: string,
      repo: string,
      branch: string,
      data: { users: string[] },
      params: RequestParams = {},
    ) =>
      this.request<SimpleUser[], ValidationError>({
        path: `/repos/${owner}/${repo}/branches/${branch}/protection/restrictions/users`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Protected branches are available in public repositories with GitHub Free and GitHub Free for organizations, and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server. For more information, see [GitHub's products](https://help.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation. Replaces the list of people that have push access to this branch. This removes all people that previously had push access and grants push access to the new list of people. | Type    | Description                                                                                                                   | | ------- | ----------------------------------------------------------------------------------------------------------------------------- | | `array` | Usernames for people who can have push access. **Note**: The list of users, apps, and teams in total is limited to 100 items. |
     *
     * @tags repos
     * @name ReposSetUserAccessRestrictions
     * @summary Set user access restrictions
     * @request PUT:/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users
     */
    reposSetUserAccessRestrictions: (
      owner: string,
      repo: string,
      branch: string,
      data: { users: string[] },
      params: RequestParams = {},
    ) =>
      this.request<SimpleUser[], ValidationError>({
        path: `/repos/${owner}/${repo}/branches/${branch}/protection/restrictions/users`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Protected branches are available in public repositories with GitHub Free and GitHub Free for organizations, and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server. For more information, see [GitHub's products](https://help.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation. Removes the ability of a user to push to this branch. | Type    | Description                                                                                                                                   | | ------- | --------------------------------------------------------------------------------------------------------------------------------------------- | | `array` | Usernames of the people who should no longer have push access. **Note**: The list of users, apps, and teams in total is limited to 100 items. |
     *
     * @tags repos
     * @name ReposRemoveUserAccessRestrictions
     * @summary Remove user access restrictions
     * @request DELETE:/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users
     */
    reposRemoveUserAccessRestrictions: (
      owner: string,
      repo: string,
      branch: string,
      data: { users: string[] },
      params: RequestParams = {},
    ) =>
      this.request<SimpleUser[], ValidationError>({
        path: `/repos/${owner}/${repo}/branches/${branch}/protection/restrictions/users`,
        method: "DELETE",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Renames a branch in a repository. **Note:** Although the API responds immediately, the branch rename process might take some extra time to complete in the background. You won't be able to push to the old branch name while the rename process is in progress. For more information, see "[Renaming a branch](https://docs.github.com/github/administering-a-repository/renaming-a-branch)". The permissions required to use this endpoint depends on whether you are renaming the default branch. To rename a non-default branch: * Users must have push access. * GitHub Apps must have the `contents:write` repository permission. To rename the default branch: * Users must have admin or owner permissions. * GitHub Apps must have the `administration:write` repository permission.
     *
     * @tags repos
     * @name ReposRenameBranch
     * @summary Rename a branch
     * @request POST:/repos/{owner}/{repo}/branches/{branch}/rename
     */
    reposRenameBranch: (
      owner: string,
      repo: string,
      branch: string,
      data: { new_name: string },
      params: RequestParams = {},
    ) =>
      this.request<BranchWithProtection, BasicError | ValidationError>({
        path: `/repos/${owner}/${repo}/branches/${branch}/rename`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description **Note:** The Checks API only looks for pushes in the repository where the check suite or check run were created. Pushes to a branch in a forked repository are not detected and return an empty `pull_requests` array. Creates a new check run for a specific commit in a repository. Your GitHub App must have the `checks:write` permission to create check runs. In a check suite, GitHub limits the number of check runs with the same name to 1000. Once these check runs exceed 1000, GitHub will start to automatically delete older check runs.
     *
     * @tags checks
     * @name ChecksCreate
     * @summary Create a check run
     * @request POST:/repos/{owner}/{repo}/check-runs
     */
    checksCreate: (
      owner: string,
      repo: string,
      data: (
        | {
            status?: "completed";
            conclusion: "success" | "failure" | "neutral" | "cancelled" | "skipped" | "timed_out" | "action_required";
            name: string;
            head_sha: string;
            [key: string]: any;
          }
        | { status?: "queued" | "in_progress"; name: string; head_sha: string; [key: string]: any }
        | ({
            status?: "completed";
            conclusion: "success" | "failure" | "neutral" | "cancelled" | "skipped" | "timed_out" | "action_required";
            name: string;
            head_sha: string;
            [key: string]: any;
          } & { status?: "queued" | "in_progress"; name: string; head_sha: string; [key: string]: any })
      ) & {
        name: string;
        head_sha: string;
        details_url?: string;
        external_id?: string;
        status?: "queued" | "in_progress" | "completed";
        started_at?: string;
        conclusion?: "success" | "failure" | "neutral" | "cancelled" | "skipped" | "timed_out" | "action_required";
        completed_at?: string;
        output?: {
          title: string;
          summary: string;
          text?: string;
          annotations?: {
            path: string;
            start_line: number;
            end_line: number;
            start_column?: number;
            end_column?: number;
            annotation_level: "notice" | "warning" | "failure";
            message: string;
            title?: string;
            raw_details?: string;
          }[];
          images?: { alt: string; image_url: string; caption?: string }[];
        };
        actions?: { label: string; description: string; identifier: string }[];
      },
      params: RequestParams = {},
    ) =>
      this.request<CheckRun, any>({
        path: `/repos/${owner}/${repo}/check-runs`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description **Note:** The Checks API only looks for pushes in the repository where the check suite or check run were created. Pushes to a branch in a forked repository are not detected and return an empty `pull_requests` array. Gets a single check run using its `id`. GitHub Apps must have the `checks:read` permission on a private repository or pull access to a public repository to get check runs. OAuth Apps and authenticated users must have the `repo` scope to get check runs in a private repository.
     *
     * @tags checks
     * @name ChecksGet
     * @summary Get a check run
     * @request GET:/repos/{owner}/{repo}/check-runs/{check_run_id}
     */
    checksGet: (owner: string, repo: string, checkRunId: number, params: RequestParams = {}) =>
      this.request<CheckRun, any>({
        path: `/repos/${owner}/${repo}/check-runs/${checkRunId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description **Note:** The Checks API only looks for pushes in the repository where the check suite or check run were created. Pushes to a branch in a forked repository are not detected and return an empty `pull_requests` array. Updates a check run for a specific commit in a repository. Your GitHub App must have the `checks:write` permission to edit check runs.
     *
     * @tags checks
     * @name ChecksUpdate
     * @summary Update a check run
     * @request PATCH:/repos/{owner}/{repo}/check-runs/{check_run_id}
     */
    checksUpdate: (
      owner: string,
      repo: string,
      checkRunId: number,
      data: (
        | {
            status?: "completed";
            conclusion: "success" | "failure" | "neutral" | "cancelled" | "skipped" | "timed_out" | "action_required";
            [key: string]: any;
          }
        | { status?: "queued" | "in_progress"; [key: string]: any }
        | ({
            status?: "completed";
            conclusion: "success" | "failure" | "neutral" | "cancelled" | "skipped" | "timed_out" | "action_required";
            [key: string]: any;
          } & { status?: "queued" | "in_progress"; [key: string]: any })
      ) & {
        name?: string;
        details_url?: string;
        external_id?: string;
        started_at?: string;
        status?: "queued" | "in_progress" | "completed";
        conclusion?: "success" | "failure" | "neutral" | "cancelled" | "skipped" | "timed_out" | "action_required";
        completed_at?: string;
        output?: {
          title?: string;
          summary: string;
          text?: string;
          annotations?: {
            path: string;
            start_line: number;
            end_line: number;
            start_column?: number;
            end_column?: number;
            annotation_level: "notice" | "warning" | "failure";
            message: string;
            title?: string;
            raw_details?: string;
          }[];
          images?: { alt: string; image_url: string; caption?: string }[];
        };
        actions?: { label: string; description: string; identifier: string }[];
      },
      params: RequestParams = {},
    ) =>
      this.request<CheckRun, any>({
        path: `/repos/${owner}/${repo}/check-runs/${checkRunId}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Lists annotations for a check run using the annotation `id`. GitHub Apps must have the `checks:read` permission on a private repository or pull access to a public repository to get annotations for a check run. OAuth Apps and authenticated users must have the `repo` scope to get annotations for a check run in a private repository.
     *
     * @tags checks
     * @name ChecksListAnnotations
     * @summary List check run annotations
     * @request GET:/repos/{owner}/{repo}/check-runs/{check_run_id}/annotations
     */
    checksListAnnotations: (
      owner: string,
      repo: string,
      checkRunId: number,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<CheckAnnotation[], any>({
        path: `/repos/${owner}/${repo}/check-runs/${checkRunId}/annotations`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description **Note:** The Checks API only looks for pushes in the repository where the check suite or check run were created. Pushes to a branch in a forked repository are not detected and return an empty `pull_requests` array and a `null` value for `head_branch`. By default, check suites are automatically created when you create a [check run](https://docs.github.com/rest/reference/checks#check-runs). You only need to use this endpoint for manually creating check suites when you've disabled automatic creation using "[Update repository preferences for check suites](https://docs.github.com/rest/reference/checks#update-repository-preferences-for-check-suites)". Your GitHub App must have the `checks:write` permission to create check suites.
     *
     * @tags checks
     * @name ChecksCreateSuite
     * @summary Create a check suite
     * @request POST:/repos/{owner}/{repo}/check-suites
     */
    checksCreateSuite: (owner: string, repo: string, data: { head_sha: string }, params: RequestParams = {}) =>
      this.request<CheckSuite, any>({
        path: `/repos/${owner}/${repo}/check-suites`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Changes the default automatic flow when creating check suites. By default, a check suite is automatically created each time code is pushed to a repository. When you disable the automatic creation of check suites, you can manually [Create a check suite](https://docs.github.com/rest/reference/checks#create-a-check-suite). You must have admin permissions in the repository to set preferences for check suites.
     *
     * @tags checks
     * @name ChecksSetSuitesPreferences
     * @summary Update repository preferences for check suites
     * @request PATCH:/repos/{owner}/{repo}/check-suites/preferences
     */
    checksSetSuitesPreferences: (
      owner: string,
      repo: string,
      data: { auto_trigger_checks?: { app_id: number; setting: boolean }[] },
      params: RequestParams = {},
    ) =>
      this.request<CheckSuitePreference, any>({
        path: `/repos/${owner}/${repo}/check-suites/preferences`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description **Note:** The Checks API only looks for pushes in the repository where the check suite or check run were created. Pushes to a branch in a forked repository are not detected and return an empty `pull_requests` array and a `null` value for `head_branch`. Gets a single check suite using its `id`. GitHub Apps must have the `checks:read` permission on a private repository or pull access to a public repository to get check suites. OAuth Apps and authenticated users must have the `repo` scope to get check suites in a private repository.
     *
     * @tags checks
     * @name ChecksGetSuite
     * @summary Get a check suite
     * @request GET:/repos/{owner}/{repo}/check-suites/{check_suite_id}
     */
    checksGetSuite: (owner: string, repo: string, checkSuiteId: number, params: RequestParams = {}) =>
      this.request<CheckSuite, any>({
        path: `/repos/${owner}/${repo}/check-suites/${checkSuiteId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description **Note:** The Checks API only looks for pushes in the repository where the check suite or check run were created. Pushes to a branch in a forked repository are not detected and return an empty `pull_requests` array. Lists check runs for a check suite using its `id`. GitHub Apps must have the `checks:read` permission on a private repository or pull access to a public repository to get check runs. OAuth Apps and authenticated users must have the `repo` scope to get check runs in a private repository.
     *
     * @tags checks
     * @name ChecksListForSuite
     * @summary List check runs in a check suite
     * @request GET:/repos/{owner}/{repo}/check-suites/{check_suite_id}/check-runs
     */
    checksListForSuite: (
      owner: string,
      repo: string,
      checkSuiteId: number,
      query?: {
        check_name?: string;
        status?: "queued" | "in_progress" | "completed";
        filter?: "latest" | "all";
        per_page?: number;
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<{ total_count: number; check_runs: CheckRun[] }, any>({
        path: `/repos/${owner}/${repo}/check-suites/${checkSuiteId}/check-runs`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Triggers GitHub to rerequest an existing check suite, without pushing new code to a repository. This endpoint will trigger the [`check_suite` webhook](https://docs.github.com/webhooks/event-payloads/#check_suite) event with the action `rerequested`. When a check suite is `rerequested`, its `status` is reset to `queued` and the `conclusion` is cleared. To rerequest a check suite, your GitHub App must have the `checks:read` permission on a private repository or pull access to a public repository.
     *
     * @tags checks
     * @name ChecksRerequestSuite
     * @summary Rerequest a check suite
     * @request POST:/repos/{owner}/{repo}/check-suites/{check_suite_id}/rerequest
     */
    checksRerequestSuite: (owner: string, repo: string, checkSuiteId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/repos/${owner}/${repo}/check-suites/${checkSuiteId}/rerequest`,
        method: "POST",
        ...params,
      }),

    /**
     * @description Lists all open code scanning alerts for the default branch (usually `main` or `master`). You must use an access token with the `security_events` scope to use this endpoint. GitHub Apps must have the `security_events` read permission to use this endpoint.
     *
     * @tags code-scanning
     * @name CodeScanningListAlertsForRepo
     * @summary List code scanning alerts for a repository
     * @request GET:/repos/{owner}/{repo}/code-scanning/alerts
     */
    codeScanningListAlertsForRepo: (
      owner: string,
      repo: string,
      query?: { state?: CodeScanningAlertState; ref?: CodeScanningAlertRef },
      params: RequestParams = {},
    ) =>
      this.request<
        CodeScanningAlertCodeScanningAlertItems[],
        void | { code?: string; message?: string; documentation_url?: string }
      >({
        path: `/repos/${owner}/${repo}/code-scanning/alerts`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets a single code scanning alert. You must use an access token with the `security_events` scope to use this endpoint. GitHub Apps must have the `security_events` read permission to use this endpoint. The security `alert_number` is found at the end of the security alert's URL. For example, the security alert ID for `https://github.com/Octo-org/octo-repo/security/code-scanning/88` is `88`.
     *
     * @tags code-scanning
     * @name CodeScanningGetAlert
     * @summary Get a code scanning alert
     * @request GET:/repos/{owner}/{repo}/code-scanning/alerts/{alert_number}
     */
    codeScanningGetAlert: (owner: string, repo: string, alertNumber: number, params: RequestParams = {}) =>
      this.request<
        CodeScanningAlertCodeScanningAlert,
        void | BasicError | { code?: string; message?: string; documentation_url?: string }
      >({
        path: `/repos/${owner}/${repo}/code-scanning/alerts/${alertNumber}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Updates the status of a single code scanning alert. You must use an access token with the `security_events` scope to use this endpoint. GitHub Apps must have the `security_events` write permission to use this endpoint.
     *
     * @tags code-scanning
     * @name CodeScanningUpdateAlert
     * @summary Update a code scanning alert
     * @request PATCH:/repos/{owner}/{repo}/code-scanning/alerts/{alert_number}
     */
    codeScanningUpdateAlert: (
      owner: string,
      repo: string,
      alertNumber: AlertNumber,
      data: { state: CodeScanningAlertSetState; dismissed_reason?: CodeScanningAlertDismissedReason },
      params: RequestParams = {},
    ) =>
      this.request<CodeScanningAlertCodeScanningAlert, void>({
        path: `/repos/${owner}/${repo}/code-scanning/alerts/${alertNumber}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description List the details of recent code scanning analyses for a repository. You must use an access token with the `security_events` scope to use this endpoint. GitHub Apps must have the `security_events` read permission to use this endpoint.
     *
     * @tags code-scanning
     * @name CodeScanningListRecentAnalyses
     * @summary List recent code scanning analyses for a repository
     * @request GET:/repos/{owner}/{repo}/code-scanning/analyses
     */
    codeScanningListRecentAnalyses: (
      owner: string,
      repo: string,
      query?: { ref?: CodeScanningAnalysisRef; tool_name?: CodeScanningAnalysisToolName },
      params: RequestParams = {},
    ) =>
      this.request<CodeScanningAnalysisCodeScanningAnalysis[], void>({
        path: `/repos/${owner}/${repo}/code-scanning/analyses`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Upload a SARIF file containing the results of a code scanning analysis to make the results available in a repository. You must use an access token with the `security_events` scope to use this endpoint. GitHub Apps must have the `security_events` write permission to use this endpoint.
     *
     * @tags code-scanning
     * @name CodeScanningUploadSarif
     * @summary Upload a SARIF file
     * @request POST:/repos/{owner}/{repo}/code-scanning/sarifs
     */
    codeScanningUploadSarif: (
      owner: string,
      repo: string,
      data: {
        commit_sha: CodeScanningAnalysisCommitSha;
        ref: CodeScanningAnalysisRef;
        sarif: CodeScanningAnalysisSarifFile;
        checkout_uri?: string;
        started_at?: string;
        tool_name: CodeScanningAnalysisToolName;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/repos/${owner}/${repo}/code-scanning/sarifs`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description For organization-owned repositories, the list of collaborators includes outside collaborators, organization members that are direct collaborators, organization members with access through team memberships, organization members with access through default organization permissions, and organization owners. Team members will include the members of child teams.
     *
     * @tags repos
     * @name ReposListCollaborators
     * @summary List repository collaborators
     * @request GET:/repos/{owner}/{repo}/collaborators
     */
    reposListCollaborators: (
      owner: string,
      repo: string,
      query?: { affiliation?: "outside" | "direct" | "all"; per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<Collaborator[], BasicError>({
        path: `/repos/${owner}/${repo}/collaborators`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description For organization-owned repositories, the list of collaborators includes outside collaborators, organization members that are direct collaborators, organization members with access through team memberships, organization members with access through default organization permissions, and organization owners. Team members will include the members of child teams.
     *
     * @tags repos
     * @name ReposCheckCollaborator
     * @summary Check if a user is a repository collaborator
     * @request GET:/repos/{owner}/{repo}/collaborators/{username}
     */
    reposCheckCollaborator: (owner: string, repo: string, username: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/repos/${owner}/${repo}/collaborators/${username}`,
        method: "GET",
        ...params,
      }),

    /**
     * @description This endpoint triggers [notifications](https://docs.github.com/en/github/managing-subscriptions-and-notifications-on-github/about-notifications). Creating content too quickly using this endpoint may result in abuse rate limiting. See "[Abuse rate limits](https://docs.github.com/rest/overview/resources-in-the-rest-api#abuse-rate-limits)" and "[Dealing with abuse rate limits](https://docs.github.com/rest/guides/best-practices-for-integrators#dealing-with-rate-limits)" for details. For more information the permission levels, see "[Repository permission levels for an organization](https://help.github.com/en/github/setting-up-and-managing-organizations-and-teams/repository-permission-levels-for-an-organization#permission-levels-for-repositories-owned-by-an-organization)". Note that, if you choose not to pass any parameters, you'll need to set `Content-Length` to zero when calling out to this endpoint. For more information, see "[HTTP verbs](https://docs.github.com/rest/overview/resources-in-the-rest-api#http-verbs)." The invitee will receive a notification that they have been invited to the repository, which they must accept or decline. They may do this via the notifications page, the email they receive, or by using the [repository invitations API endpoints](https://docs.github.com/rest/reference/repos#invitations). **Rate limits** To prevent abuse, you are limited to sending 50 invitations to a repository per 24 hour period. Note there is no limit if you are inviting organization members to an organization repository.
     *
     * @tags repos
     * @name ReposAddCollaborator
     * @summary Add a repository collaborator
     * @request PUT:/repos/{owner}/{repo}/collaborators/{username}
     */
    reposAddCollaborator: (
      owner: string,
      repo: string,
      username: string,
      data: { permission?: "pull" | "push" | "admin" | "maintain" | "triage"; permissions?: string },
      params: RequestParams = {},
    ) =>
      this.request<RepositoryInvitation, BasicError | ValidationError>({
        path: `/repos/${owner}/${repo}/collaborators/${username}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags repos
     * @name ReposRemoveCollaborator
     * @summary Remove a repository collaborator
     * @request DELETE:/repos/{owner}/{repo}/collaborators/{username}
     */
    reposRemoveCollaborator: (owner: string, repo: string, username: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/repos/${owner}/${repo}/collaborators/${username}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Checks the repository permission of a collaborator. The possible repository permissions are `admin`, `write`, `read`, and `none`.
     *
     * @tags repos
     * @name ReposGetCollaboratorPermissionLevel
     * @summary Get repository permissions for a user
     * @request GET:/repos/{owner}/{repo}/collaborators/{username}/permission
     */
    reposGetCollaboratorPermissionLevel: (owner: string, repo: string, username: string, params: RequestParams = {}) =>
      this.request<RepositoryCollaboratorPermission, BasicError>({
        path: `/repos/${owner}/${repo}/collaborators/${username}/permission`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Commit Comments use [these custom media types](https://docs.github.com/rest/reference/repos#custom-media-types). You can read more about the use of media types in the API [here](https://docs.github.com/rest/overview/media-types/). Comments are ordered by ascending ID.
     *
     * @tags repos
     * @name ReposListCommitCommentsForRepo
     * @summary List commit comments for a repository
     * @request GET:/repos/{owner}/{repo}/comments
     */
    reposListCommitCommentsForRepo: (
      owner: string,
      repo: string,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<CommitComment[], any>({
        path: `/repos/${owner}/${repo}/comments`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags repos
     * @name ReposGetCommitComment
     * @summary Get a commit comment
     * @request GET:/repos/{owner}/{repo}/comments/{comment_id}
     */
    reposGetCommitComment: (owner: string, repo: string, commentId: number, params: RequestParams = {}) =>
      this.request<CommitComment, BasicError>({
        path: `/repos/${owner}/${repo}/comments/${commentId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags repos
     * @name ReposUpdateCommitComment
     * @summary Update a commit comment
     * @request PATCH:/repos/{owner}/{repo}/comments/{comment_id}
     */
    reposUpdateCommitComment: (
      owner: string,
      repo: string,
      commentId: number,
      data: { body: string },
      params: RequestParams = {},
    ) =>
      this.request<CommitComment, BasicError>({
        path: `/repos/${owner}/${repo}/comments/${commentId}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags repos
     * @name ReposDeleteCommitComment
     * @summary Delete a commit comment
     * @request DELETE:/repos/{owner}/{repo}/comments/{comment_id}
     */
    reposDeleteCommitComment: (owner: string, repo: string, commentId: number, params: RequestParams = {}) =>
      this.request<void, BasicError>({
        path: `/repos/${owner}/${repo}/comments/${commentId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description List the reactions to a [commit comment](https://docs.github.com/rest/reference/repos#comments).
     *
     * @tags reactions
     * @name ReactionsListForCommitComment
     * @summary List reactions for a commit comment
     * @request GET:/repos/{owner}/{repo}/comments/{comment_id}/reactions
     */
    reactionsListForCommitComment: (
      owner: string,
      repo: string,
      commentId: number,
      query?: {
        content?: "+1" | "-1" | "laugh" | "confused" | "heart" | "hooray" | "rocket" | "eyes";
        per_page?: number;
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<Reaction[], BasicError | { message: string; documentation_url: string }>({
        path: `/repos/${owner}/${repo}/comments/${commentId}/reactions`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a reaction to a [commit comment](https://docs.github.com/rest/reference/repos#comments). A response with a `Status: 200 OK` means that you already added the reaction type to this commit comment.
     *
     * @tags reactions
     * @name ReactionsCreateForCommitComment
     * @summary Create reaction for a commit comment
     * @request POST:/repos/{owner}/{repo}/comments/{comment_id}/reactions
     */
    reactionsCreateForCommitComment: (
      owner: string,
      repo: string,
      commentId: number,
      data: { content: "+1" | "-1" | "laugh" | "confused" | "heart" | "hooray" | "rocket" | "eyes" },
      params: RequestParams = {},
    ) =>
      this.request<Reaction, { message: string; documentation_url: string } | ValidationError>({
        path: `/repos/${owner}/${repo}/comments/${commentId}/reactions`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description **Note:** You can also specify a repository by `repository_id` using the route `DELETE /repositories/:repository_id/comments/:comment_id/reactions/:reaction_id`. Delete a reaction to a [commit comment](https://docs.github.com/rest/reference/repos#comments).
     *
     * @tags reactions
     * @name ReactionsDeleteForCommitComment
     * @summary Delete a commit comment reaction
     * @request DELETE:/repos/{owner}/{repo}/comments/{comment_id}/reactions/{reaction_id}
     */
    reactionsDeleteForCommitComment: (
      owner: string,
      repo: string,
      commentId: number,
      reactionId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/repos/${owner}/${repo}/comments/${commentId}/reactions/${reactionId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description **Signature verification object** The response will include a `verification` object that describes the result of verifying the commit's signature. The following fields are included in the `verification` object: | Name | Type | Description | | ---- | ---- | ----------- | | `verified` | `boolean` | Indicates whether GitHub considers the signature in this commit to be verified. | | `reason` | `string` | The reason for verified value. Possible values and their meanings are enumerated in table below. | | `signature` | `string` | The signature that was extracted from the commit. | | `payload` | `string` | The value that was signed. | These are the possible values for `reason` in the `verification` object: | Value | Description | | ----- | ----------- | | `expired_key` | The key that made the signature is expired. | | `not_signing_key` | The "signing" flag is not among the usage flags in the GPG key that made the signature. | | `gpgverify_error` | There was an error communicating with the signature verification service. | | `gpgverify_unavailable` | The signature verification service is currently unavailable. | | `unsigned` | The object does not include a signature. | | `unknown_signature_type` | A non-PGP signature was found in the commit. | | `no_user` | No user was associated with the `committer` email address in the commit. | | `unverified_email` | The `committer` email address in the commit was associated with a user, but the email address is not verified on her/his account. | | `bad_email` | The `committer` email address in the commit is not included in the identities of the PGP key that made the signature. | | `unknown_key` | The key that made the signature has not been registered with any user's account. | | `malformed_signature` | There was an error parsing the signature. | | `invalid` | The signature could not be cryptographically verified using the key whose key-id was found in the signature. | | `valid` | None of the above errors applied, so the signature is considered to be verified. |
     *
     * @tags repos
     * @name ReposListCommits
     * @summary List commits
     * @request GET:/repos/{owner}/{repo}/commits
     */
    reposListCommits: (
      owner: string,
      repo: string,
      query?: {
        sha?: string;
        path?: string;
        author?: string;
        since?: string;
        until?: string;
        per_page?: number;
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<Commit[], BasicError>({
        path: `/repos/${owner}/${repo}/commits`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Protected branches are available in public repositories with GitHub Free and GitHub Free for organizations, and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server. For more information, see [GitHub's products](https://help.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation. Returns all branches where the given commit SHA is the HEAD, or latest commit for the branch.
     *
     * @tags repos
     * @name ReposListBranchesForHeadCommit
     * @summary List branches for HEAD commit
     * @request GET:/repos/{owner}/{repo}/commits/{commit_sha}/branches-where-head
     */
    reposListBranchesForHeadCommit: (owner: string, repo: string, commitSha: string, params: RequestParams = {}) =>
      this.request<BranchShort[], { message: string; documentation_url: string } | ValidationError>({
        path: `/repos/${owner}/${repo}/commits/${commitSha}/branches-where-head`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Use the `:commit_sha` to specify the commit that will have its comments listed.
     *
     * @tags repos
     * @name ReposListCommentsForCommit
     * @summary List commit comments
     * @request GET:/repos/{owner}/{repo}/commits/{commit_sha}/comments
     */
    reposListCommentsForCommit: (
      owner: string,
      repo: string,
      commitSha: string,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<CommitComment[], any>({
        path: `/repos/${owner}/${repo}/commits/${commitSha}/comments`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a comment for a commit using its `:commit_sha`. This endpoint triggers [notifications](https://docs.github.com/en/github/managing-subscriptions-and-notifications-on-github/about-notifications). Creating content too quickly using this endpoint may result in abuse rate limiting. See "[Abuse rate limits](https://docs.github.com/rest/overview/resources-in-the-rest-api#abuse-rate-limits)" and "[Dealing with abuse rate limits](https://docs.github.com/rest/guides/best-practices-for-integrators#dealing-with-rate-limits)" for details.
     *
     * @tags repos
     * @name ReposCreateCommitComment
     * @summary Create a commit comment
     * @request POST:/repos/{owner}/{repo}/commits/{commit_sha}/comments
     */
    reposCreateCommitComment: (
      owner: string,
      repo: string,
      commitSha: string,
      data: { body: string; path?: string; position?: number; line?: number },
      params: RequestParams = {},
    ) =>
      this.request<CommitComment, BasicError | ValidationError>({
        path: `/repos/${owner}/${repo}/commits/${commitSha}/comments`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Lists all pull requests containing the provided commit SHA, which can be from any point in the commit history. The results will include open and closed pull requests. Additional preview headers may be required to see certain details for associated pull requests, such as whether a pull request is in a draft state. For more information about previews that might affect this endpoint, see the [List pull requests](https://docs.github.com/rest/reference/pulls#list-pull-requests) endpoint.
     *
     * @tags repos
     * @name ReposListPullRequestsAssociatedWithCommit
     * @summary List pull requests associated with a commit
     * @request GET:/repos/{owner}/{repo}/commits/{commit_sha}/pulls
     */
    reposListPullRequestsAssociatedWithCommit: (
      owner: string,
      repo: string,
      commitSha: string,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<PullRequestSimple[], { message: string; documentation_url: string }>({
        path: `/repos/${owner}/${repo}/commits/${commitSha}/pulls`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns the contents of a single commit reference. You must have `read` access for the repository to use this endpoint. **Note:** If there are more than 300 files in the commit diff, the response will include pagination link headers for the remaining files, up to a limit of 3000 files. Each page contains the static commit information, and the only changes are to the file listing. You can pass the appropriate [media type](https://docs.github.com/rest/overview/media-types/#commits-commit-comparison-and-pull-requests) to  fetch `diff` and `patch` formats. Diffs with binary data will have no `patch` property. To return only the SHA-1 hash of the commit reference, you can provide the `sha` custom [media type](https://docs.github.com/rest/overview/media-types/#commits-commit-comparison-and-pull-requests) in the `Accept` header. You can use this endpoint to check if a remote reference's SHA-1 hash is the same as your local reference's SHA-1 hash by providing the local SHA-1 reference as the ETag. **Signature verification object** The response will include a `verification` object that describes the result of verifying the commit's signature. The following fields are included in the `verification` object: | Name | Type | Description | | ---- | ---- | ----------- | | `verified` | `boolean` | Indicates whether GitHub considers the signature in this commit to be verified. | | `reason` | `string` | The reason for verified value. Possible values and their meanings are enumerated in table below. | | `signature` | `string` | The signature that was extracted from the commit. | | `payload` | `string` | The value that was signed. | These are the possible values for `reason` in the `verification` object: | Value | Description | | ----- | ----------- | | `expired_key` | The key that made the signature is expired. | | `not_signing_key` | The "signing" flag is not among the usage flags in the GPG key that made the signature. | | `gpgverify_error` | There was an error communicating with the signature verification service. | | `gpgverify_unavailable` | The signature verification service is currently unavailable. | | `unsigned` | The object does not include a signature. | | `unknown_signature_type` | A non-PGP signature was found in the commit. | | `no_user` | No user was associated with the `committer` email address in the commit. | | `unverified_email` | The `committer` email address in the commit was associated with a user, but the email address is not verified on her/his account. | | `bad_email` | The `committer` email address in the commit is not included in the identities of the PGP key that made the signature. | | `unknown_key` | The key that made the signature has not been registered with any user's account. | | `malformed_signature` | There was an error parsing the signature. | | `invalid` | The signature could not be cryptographically verified using the key whose key-id was found in the signature. | | `valid` | None of the above errors applied, so the signature is considered to be verified. |
     *
     * @tags repos
     * @name ReposGetCommit
     * @summary Get a commit
     * @request GET:/repos/{owner}/{repo}/commits/{ref}
     */
    reposGetCommit: (owner: string, repo: string, ref: string, params: RequestParams = {}) =>
      this.request<Commit, BasicError | ValidationError>({
        path: `/repos/${owner}/${repo}/commits/${ref}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description **Note:** The Checks API only looks for pushes in the repository where the check suite or check run were created. Pushes to a branch in a forked repository are not detected and return an empty `pull_requests` array. Lists check runs for a commit ref. The `ref` can be a SHA, branch name, or a tag name. GitHub Apps must have the `checks:read` permission on a private repository or pull access to a public repository to get check runs. OAuth Apps and authenticated users must have the `repo` scope to get check runs in a private repository.
     *
     * @tags checks
     * @name ChecksListForRef
     * @summary List check runs for a Git reference
     * @request GET:/repos/{owner}/{repo}/commits/{ref}/check-runs
     */
    checksListForRef: (
      owner: string,
      repo: string,
      ref: string,
      query?: {
        check_name?: string;
        status?: "queued" | "in_progress" | "completed";
        filter?: "latest" | "all";
        per_page?: number;
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<{ total_count: number; check_runs: CheckRun[] }, any>({
        path: `/repos/${owner}/${repo}/commits/${ref}/check-runs`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description **Note:** The Checks API only looks for pushes in the repository where the check suite or check run were created. Pushes to a branch in a forked repository are not detected and return an empty `pull_requests` array and a `null` value for `head_branch`. Lists check suites for a commit `ref`. The `ref` can be a SHA, branch name, or a tag name. GitHub Apps must have the `checks:read` permission on a private repository or pull access to a public repository to list check suites. OAuth Apps and authenticated users must have the `repo` scope to get check suites in a private repository.
     *
     * @tags checks
     * @name ChecksListSuitesForRef
     * @summary List check suites for a Git reference
     * @request GET:/repos/{owner}/{repo}/commits/{ref}/check-suites
     */
    checksListSuitesForRef: (
      owner: string,
      repo: string,
      ref: string,
      query?: { app_id?: number; check_name?: string; per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<{ total_count: number; check_suites: CheckSuite[] }, any>({
        path: `/repos/${owner}/${repo}/commits/${ref}/check-suites`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Users with pull access in a repository can access a combined view of commit statuses for a given ref. The ref can be a SHA, a branch name, or a tag name. The most recent status for each context is returned, up to 100. This field [paginates](https://docs.github.com/rest/overview/resources-in-the-rest-api#pagination) if there are over 100 contexts. Additionally, a combined `state` is returned. The `state` is one of: *   **failure** if any of the contexts report as `error` or `failure` *   **pending** if there are no statuses or a context is `pending` *   **success** if the latest status for all contexts is `success`
     *
     * @tags repos
     * @name ReposGetCombinedStatusForRef
     * @summary Get the combined status for a specific reference
     * @request GET:/repos/{owner}/{repo}/commits/{ref}/status
     */
    reposGetCombinedStatusForRef: (owner: string, repo: string, ref: string, params: RequestParams = {}) =>
      this.request<CombinedCommitStatus, BasicError>({
        path: `/repos/${owner}/${repo}/commits/${ref}/status`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Users with pull access in a repository can view commit statuses for a given ref. The ref can be a SHA, a branch name, or a tag name. Statuses are returned in reverse chronological order. The first status in the list will be the latest one. This resource is also available via a legacy route: `GET /repos/:owner/:repo/statuses/:ref`.
     *
     * @tags repos
     * @name ReposListCommitStatusesForRef
     * @summary List commit statuses for a reference
     * @request GET:/repos/{owner}/{repo}/commits/{ref}/statuses
     */
    reposListCommitStatusesForRef: (
      owner: string,
      repo: string,
      ref: string,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<Status[], any>({
        path: `/repos/${owner}/${repo}/commits/${ref}/statuses`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns the contents of the repository's code of conduct file, if one is detected. A code of conduct is detected if there is a file named `CODE_OF_CONDUCT` in the root directory of the repository. GitHub detects which code of conduct it is using fuzzy matching.
     *
     * @tags codes-of-conduct
     * @name CodesOfConductGetForRepo
     * @summary Get the code of conduct for a repository
     * @request GET:/repos/{owner}/{repo}/community/code_of_conduct
     */
    codesOfConductGetForRepo: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<CodeOfConduct, any>({
        path: `/repos/${owner}/${repo}/community/code_of_conduct`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description This endpoint will return all community profile metrics, including an overall health score, repository description, the presence of documentation, detected code of conduct, detected license, and the presence of ISSUE\_TEMPLATE, PULL\_REQUEST\_TEMPLATE, README, and CONTRIBUTING files. The `health_percentage` score is defined as a percentage of how many of these four documents are present: README, CONTRIBUTING, LICENSE, and CODE_OF_CONDUCT. For example, if all four documents are present, then the `health_percentage` is `100`. If only one is present, then the `health_percentage` is `25`. `content_reports_enabled` is only returned for organization-owned repositories.
     *
     * @tags repos
     * @name ReposGetCommunityProfileMetrics
     * @summary Get community profile metrics
     * @request GET:/repos/{owner}/{repo}/community/profile
     */
    reposGetCommunityProfileMetrics: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<CommunityProfile, any>({
        path: `/repos/${owner}/${repo}/community/profile`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Both `:base` and `:head` must be branch names in `:repo`. To compare branches across other repositories in the same network as `:repo`, use the format `<USERNAME>:branch`. The response from the API is equivalent to running the `git log base..head` command; however, commits are returned in chronological order. Pass the appropriate [media type](https://docs.github.com/rest/overview/media-types/#commits-commit-comparison-and-pull-requests) to fetch diff and patch formats. The response also includes details on the files that were changed between the two commits. This includes the status of the change (for example, if a file was added, removed, modified, or renamed), and details of the change itself. For example, files with a `renamed` status have a `previous_filename` field showing the previous filename of the file, and files with a `modified` status have a `patch` field showing the changes made to the file. **Working with large comparisons** The response will include a comparison of up to 250 commits. If you are working with a larger commit range, you can use the [List commits](https://docs.github.com/rest/reference/repos#list-commits) to enumerate all commits in the range. For comparisons with extremely large diffs, you may receive an error response indicating that the diff took too long to generate. You can typically resolve this error by using a smaller commit range. **Signature verification object** The response will include a `verification` object that describes the result of verifying the commit's signature. The following fields are included in the `verification` object: | Name | Type | Description | | ---- | ---- | ----------- | | `verified` | `boolean` | Indicates whether GitHub considers the signature in this commit to be verified. | | `reason` | `string` | The reason for verified value. Possible values and their meanings are enumerated in table below. | | `signature` | `string` | The signature that was extracted from the commit. | | `payload` | `string` | The value that was signed. | These are the possible values for `reason` in the `verification` object: | Value | Description | | ----- | ----------- | | `expired_key` | The key that made the signature is expired. | | `not_signing_key` | The "signing" flag is not among the usage flags in the GPG key that made the signature. | | `gpgverify_error` | There was an error communicating with the signature verification service. | | `gpgverify_unavailable` | The signature verification service is currently unavailable. | | `unsigned` | The object does not include a signature. | | `unknown_signature_type` | A non-PGP signature was found in the commit. | | `no_user` | No user was associated with the `committer` email address in the commit. | | `unverified_email` | The `committer` email address in the commit was associated with a user, but the email address is not verified on her/his account. | | `bad_email` | The `committer` email address in the commit is not included in the identities of the PGP key that made the signature. | | `unknown_key` | The key that made the signature has not been registered with any user's account. | | `malformed_signature` | There was an error parsing the signature. | | `invalid` | The signature could not be cryptographically verified using the key whose key-id was found in the signature. | | `valid` | None of the above errors applied, so the signature is considered to be verified. |
     *
     * @tags repos
     * @name ReposCompareCommits
     * @summary Compare two commits
     * @request GET:/repos/{owner}/{repo}/compare/{base}...{head}
     */
    reposCompareCommits: (owner: string, repo: string, base: string, head: string, params: RequestParams = {}) =>
      this.request<CommitComparison, BasicError>({
        path: `/repos/${owner}/${repo}/compare/${base}...${head}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Gets the contents of a file or directory in a repository. Specify the file path or directory in `:path`. If you omit `:path`, you will receive the contents of the repository's root directory. See the description below regarding what the API response includes for directories. Files and symlinks support [a custom media type](https://docs.github.com/rest/reference/repos#custom-media-types) for retrieving the raw content or rendered HTML (when supported). All content types support [a custom media type](https://docs.github.com/rest/reference/repos#custom-media-types) to ensure the content is returned in a consistent object format. **Note**: *   To get a repository's contents recursively, you can [recursively get the tree](https://docs.github.com/rest/reference/git#trees). *   This API has an upper limit of 1,000 files for a directory. If you need to retrieve more files, use the [Git Trees API](https://docs.github.com/rest/reference/git#get-a-tree). *   This API supports files up to 1 megabyte in size. #### If the content is a directory The response will be an array of objects, one object for each item in the directory. When listing the contents of a directory, submodules have their "type" specified as "file". Logically, the value _should_ be "submodule". This behavior exists in API v3 [for backwards compatibility purposes](https://git.io/v1YCW). In the next major version of the API, the type will be returned as "submodule". #### If the content is a symlink If the requested `:path` points to a symlink, and the symlink's target is a normal file in the repository, then the API responds with the content of the file (in the format shown in the example. Otherwise, the API responds with an object describing the symlink itself. #### If the content is a submodule The `submodule_git_url` identifies the location of the submodule repository, and the `sha` identifies a specific commit within the submodule repository. Git uses the given URL when cloning the submodule repository, and checks out the submodule at that specific commit. If the submodule repository is not hosted on github.com, the Git URLs (`git_url` and `_links["git"]`) and the github.com URLs (`html_url` and `_links["html"]`) will have null values.
     *
     * @tags repos
     * @name ReposGetContent
     * @summary Get repository content
     * @request GET:/repos/{owner}/{repo}/contents/{path}
     */
    reposGetContent: (
      owner: string,
      repo: string,
      path: string,
      query?: { ref?: string },
      params: RequestParams = {},
    ) =>
      this.request<ContentTree, BasicError>({
        path: `/repos/${owner}/${repo}/contents/${path}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Creates a new file or replaces an existing file in a repository.
     *
     * @tags repos
     * @name ReposCreateOrUpdateFileContents
     * @summary Create or update file contents
     * @request PUT:/repos/{owner}/{repo}/contents/{path}
     */
    reposCreateOrUpdateFileContents: (
      owner: string,
      repo: string,
      path: string,
      data: {
        message: string;
        content: string;
        sha?: string;
        branch?: string;
        committer?: { name: string; email: string; date?: string };
        author?: { name: string; email: string; date?: string };
      },
      params: RequestParams = {},
    ) =>
      this.request<FileCommit, BasicError | ValidationError>({
        path: `/repos/${owner}/${repo}/contents/${path}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Deletes a file in a repository. You can provide an additional `committer` parameter, which is an object containing information about the committer. Or, you can provide an `author` parameter, which is an object containing information about the author. The `author` section is optional and is filled in with the `committer` information if omitted. If the `committer` information is omitted, the authenticated user's information is used. You must provide values for both `name` and `email`, whether you choose to use `author` or `committer`. Otherwise, you'll receive a `422` status code.
     *
     * @tags repos
     * @name ReposDeleteFile
     * @summary Delete a file
     * @request DELETE:/repos/{owner}/{repo}/contents/{path}
     */
    reposDeleteFile: (
      owner: string,
      repo: string,
      path: string,
      data: {
        message: string;
        sha: string;
        branch?: string;
        committer?: { name?: string; email?: string };
        author?: { name?: string; email?: string };
      },
      params: RequestParams = {},
    ) =>
      this.request<
        FileCommit,
        BasicError | ValidationError | { code?: string; message?: string; documentation_url?: string }
      >({
        path: `/repos/${owner}/${repo}/contents/${path}`,
        method: "DELETE",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Lists contributors to the specified repository and sorts them by the number of commits per contributor in descending order. This endpoint may return information that is a few hours old because the GitHub REST API v3 caches contributor data to improve performance. GitHub identifies contributors by author email address. This endpoint groups contribution counts by GitHub user, which includes all associated email addresses. To improve performance, only the first 500 author email addresses in the repository link to GitHub users. The rest will appear as anonymous contributors without associated GitHub user information.
     *
     * @tags repos
     * @name ReposListContributors
     * @summary List repository contributors
     * @request GET:/repos/{owner}/{repo}/contributors
     */
    reposListContributors: (
      owner: string,
      repo: string,
      query?: { anon?: string; per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<Contributor[], BasicError>({
        path: `/repos/${owner}/${repo}/contributors`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Simple filtering of deployments is available via query parameters:
     *
     * @tags repos
     * @name ReposListDeployments
     * @summary List deployments
     * @request GET:/repos/{owner}/{repo}/deployments
     */
    reposListDeployments: (
      owner: string,
      repo: string,
      query?: { sha?: string; ref?: string; task?: string; environment?: string; per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<Deployment[], any>({
        path: `/repos/${owner}/${repo}/deployments`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Deployments offer a few configurable parameters with certain defaults. The `ref` parameter can be any named branch, tag, or SHA. At GitHub we often deploy branches and verify them before we merge a pull request. The `environment` parameter allows deployments to be issued to different runtime environments. Teams often have multiple environments for verifying their applications, such as `production`, `staging`, and `qa`. This parameter makes it easier to track which environments have requested deployments. The default environment is `production`. The `auto_merge` parameter is used to ensure that the requested ref is not behind the repository's default branch. If the ref _is_ behind the default branch for the repository, we will attempt to merge it for you. If the merge succeeds, the API will return a successful merge commit. If merge conflicts prevent the merge from succeeding, the API will return a failure response. By default, [commit statuses](https://docs.github.com/rest/reference/repos#statuses) for every submitted context must be in a `success` state. The `required_contexts` parameter allows you to specify a subset of contexts that must be `success`, or to specify contexts that have not yet been submitted. You are not required to use commit statuses to deploy. If you do not require any contexts or create any commit statuses, the deployment will always succeed. The `payload` parameter is available for any extra information that a deployment system might need. It is a JSON text field that will be passed on when a deployment event is dispatched. The `task` parameter is used by the deployment system to allow different execution paths. In the web world this might be `deploy:migrations` to run schema changes on the system. In the compiled world this could be a flag to compile an application with debugging enabled. Users with `repo` or `repo_deployment` scopes can create a deployment for a given ref. #### Merged branch response You will see this response when GitHub automatically merges the base branch into the topic branch instead of creating a deployment. This auto-merge happens when: *   Auto-merge option is enabled in the repository *   Topic branch does not include the latest changes on the base branch, which is `master` in the response example *   There are no merge conflicts If there are no new commits in the base branch, a new request to create a deployment should give a successful response. #### Merge conflict response This error happens when the `auto_merge` option is enabled and when the default branch (in this case `master`), can't be merged into the branch that's being deployed (in this case `topic-branch`), due to merge conflicts. #### Failed commit status checks This error happens when the `required_contexts` parameter indicates that one or more contexts need to have a `success` status for the commit to be deployed, but one or more of the required contexts do not have a state of `success`.
     *
     * @tags repos
     * @name ReposCreateDeployment
     * @summary Create a deployment
     * @request POST:/repos/{owner}/{repo}/deployments
     */
    reposCreateDeployment: (
      owner: string,
      repo: string,
      data: {
        ref: string;
        task?: string;
        auto_merge?: boolean;
        required_contexts?: string[];
        payload?: Record<string, any> | string;
        environment?: string;
        description?: string | null;
        transient_environment?: boolean;
        production_environment?: boolean;
        created_at?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Deployment, { message?: string; documentation_url?: string } | ValidationError>({
        path: `/repos/${owner}/${repo}/deployments`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags repos
     * @name ReposGetDeployment
     * @summary Get a deployment
     * @request GET:/repos/{owner}/{repo}/deployments/{deployment_id}
     */
    reposGetDeployment: (owner: string, repo: string, deploymentId: number, params: RequestParams = {}) =>
      this.request<Deployment, BasicError>({
        path: `/repos/${owner}/${repo}/deployments/${deploymentId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description To ensure there can always be an active deployment, you can only delete an _inactive_ deployment. Anyone with `repo` or `repo_deployment` scopes can delete an inactive deployment. To set a deployment as inactive, you must: *   Create a new deployment that is active so that the system has a record of the current state, then delete the previously active deployment. *   Mark the active deployment as inactive by adding any non-successful deployment status. For more information, see "[Create a deployment](https://docs.github.com/rest/reference/repos/#create-a-deployment)" and "[Create a deployment status](https://docs.github.com/rest/reference/repos#create-a-deployment-status)."
     *
     * @tags repos
     * @name ReposDeleteDeployment
     * @summary Delete a deployment
     * @request DELETE:/repos/{owner}/{repo}/deployments/{deployment_id}
     */
    reposDeleteDeployment: (owner: string, repo: string, deploymentId: number, params: RequestParams = {}) =>
      this.request<void, BasicError | ValidationErrorSimple>({
        path: `/repos/${owner}/${repo}/deployments/${deploymentId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Users with pull access can view deployment statuses for a deployment:
     *
     * @tags repos
     * @name ReposListDeploymentStatuses
     * @summary List deployment statuses
     * @request GET:/repos/{owner}/{repo}/deployments/{deployment_id}/statuses
     */
    reposListDeploymentStatuses: (
      owner: string,
      repo: string,
      deploymentId: number,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<DeploymentStatus[], BasicError>({
        path: `/repos/${owner}/${repo}/deployments/${deploymentId}/statuses`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Users with `push` access can create deployment statuses for a given deployment. GitHub Apps require `read & write` access to "Deployments" and `read-only` access to "Repo contents" (for private repos). OAuth Apps require the `repo_deployment` scope.
     *
     * @tags repos
     * @name ReposCreateDeploymentStatus
     * @summary Create a deployment status
     * @request POST:/repos/{owner}/{repo}/deployments/{deployment_id}/statuses
     */
    reposCreateDeploymentStatus: (
      owner: string,
      repo: string,
      deploymentId: number,
      data: {
        state: "error" | "failure" | "inactive" | "in_progress" | "queued" | "pending" | "success";
        target_url?: string;
        log_url?: string;
        description?: string;
        environment?: "production" | "staging" | "qa";
        environment_url?: string;
        auto_inactive?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<DeploymentStatus, ValidationError>({
        path: `/repos/${owner}/${repo}/deployments/${deploymentId}/statuses`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Users with pull access can view a deployment status for a deployment:
     *
     * @tags repos
     * @name ReposGetDeploymentStatus
     * @summary Get a deployment status
     * @request GET:/repos/{owner}/{repo}/deployments/{deployment_id}/statuses/{status_id}
     */
    reposGetDeploymentStatus: (
      owner: string,
      repo: string,
      deploymentId: number,
      statusId: number,
      params: RequestParams = {},
    ) =>
      this.request<DeploymentStatus, BasicError | { message: string; documentation_url: string }>({
        path: `/repos/${owner}/${repo}/deployments/${deploymentId}/statuses/${statusId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description You can use this endpoint to trigger a webhook event called `repository_dispatch` when you want activity that happens outside of GitHub to trigger a GitHub Actions workflow or GitHub App webhook. You must configure your GitHub Actions workflow or GitHub App to run when the `repository_dispatch` event occurs. For an example `repository_dispatch` webhook payload, see "[RepositoryDispatchEvent](https://docs.github.com/webhooks/event-payloads/#repository_dispatch)." The `client_payload` parameter is available for any extra information that your workflow might need. This parameter is a JSON payload that will be passed on when the webhook event is dispatched. For example, the `client_payload` can include a message that a user would like to send using a GitHub Actions workflow. Or the `client_payload` can be used as a test to debug your workflow. This endpoint requires write access to the repository by providing either: - Personal access tokens with `repo` scope. For more information, see "[Creating a personal access token for the command line](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line)" in the GitHub Help documentation. - GitHub Apps with both `metadata:read` and `contents:read&write` permissions. This input example shows how you can use the `client_payload` as a test to debug your workflow.
     *
     * @tags repos
     * @name ReposCreateDispatchEvent
     * @summary Create a repository dispatch event
     * @request POST:/repos/{owner}/{repo}/dispatches
     */
    reposCreateDispatchEvent: (
      owner: string,
      repo: string,
      data: { event_type: string; client_payload?: Record<string, any> },
      params: RequestParams = {},
    ) =>
      this.request<void, ValidationError>({
        path: `/repos/${owner}/${repo}/dispatches`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags activity
     * @name ActivityListRepoEvents
     * @summary List repository events
     * @request GET:/repos/{owner}/{repo}/events
     */
    activityListRepoEvents: (
      owner: string,
      repo: string,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<Event[], any>({
        path: `/repos/${owner}/${repo}/events`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags repos
     * @name ReposListForks
     * @summary List forks
     * @request GET:/repos/{owner}/{repo}/forks
     */
    reposListForks: (
      owner: string,
      repo: string,
      query?: { sort?: "newest" | "oldest" | "stargazers"; per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<MinimalRepository[], BasicError>({
        path: `/repos/${owner}/${repo}/forks`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a fork for the authenticated user. **Note**: Forking a Repository happens asynchronously. You may have to wait a short period of time before you can access the git objects. If this takes longer than 5 minutes, be sure to contact [GitHub Support](https://support.github.com/contact) or [GitHub Premium Support](https://premium.githubsupport.com).
     *
     * @tags repos
     * @name ReposCreateFork
     * @summary Create a fork
     * @request POST:/repos/{owner}/{repo}/forks
     */
    reposCreateFork: (owner: string, repo: string, data: { organization?: string }, params: RequestParams = {}) =>
      this.request<Repository, BasicError | ValidationError>({
        path: `/repos/${owner}/${repo}/forks`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags git
     * @name GitCreateBlob
     * @summary Create a blob
     * @request POST:/repos/{owner}/{repo}/git/blobs
     */
    gitCreateBlob: (
      owner: string,
      repo: string,
      data: { content: string; encoding?: string },
      params: RequestParams = {},
    ) =>
      this.request<ShortBlob, BasicError | ValidationError>({
        path: `/repos/${owner}/${repo}/git/blobs`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description The `content` in the response will always be Base64 encoded. _Note_: This API supports blobs up to 100 megabytes in size.
     *
     * @tags git
     * @name GitGetBlob
     * @summary Get a blob
     * @request GET:/repos/{owner}/{repo}/git/blobs/{file_sha}
     */
    gitGetBlob: (owner: string, repo: string, fileSha: string, params: RequestParams = {}) =>
      this.request<Blob, BasicError | ValidationError>({
        path: `/repos/${owner}/${repo}/git/blobs/${fileSha}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Creates a new Git [commit object](https://git-scm.com/book/en/v1/Git-Internals-Git-Objects#Commit-Objects). **Signature verification object** The response will include a `verification` object that describes the result of verifying the commit's signature. The following fields are included in the `verification` object: | Name | Type | Description | | ---- | ---- | ----------- | | `verified` | `boolean` | Indicates whether GitHub considers the signature in this commit to be verified. | | `reason` | `string` | The reason for verified value. Possible values and their meanings are enumerated in table below. | | `signature` | `string` | The signature that was extracted from the commit. | | `payload` | `string` | The value that was signed. | These are the possible values for `reason` in the `verification` object: | Value | Description | | ----- | ----------- | | `expired_key` | The key that made the signature is expired. | | `not_signing_key` | The "signing" flag is not among the usage flags in the GPG key that made the signature. | | `gpgverify_error` | There was an error communicating with the signature verification service. | | `gpgverify_unavailable` | The signature verification service is currently unavailable. | | `unsigned` | The object does not include a signature. | | `unknown_signature_type` | A non-PGP signature was found in the commit. | | `no_user` | No user was associated with the `committer` email address in the commit. | | `unverified_email` | The `committer` email address in the commit was associated with a user, but the email address is not verified on her/his account. | | `bad_email` | The `committer` email address in the commit is not included in the identities of the PGP key that made the signature. | | `unknown_key` | The key that made the signature has not been registered with any user's account. | | `malformed_signature` | There was an error parsing the signature. | | `invalid` | The signature could not be cryptographically verified using the key whose key-id was found in the signature. | | `valid` | None of the above errors applied, so the signature is considered to be verified. |
     *
     * @tags git
     * @name GitCreateCommit
     * @summary Create a commit
     * @request POST:/repos/{owner}/{repo}/git/commits
     */
    gitCreateCommit: (
      owner: string,
      repo: string,
      data: {
        message: string;
        tree: string;
        parents?: string[];
        author?: { name?: string; email?: string; date?: string };
        committer?: { name?: string; email?: string; date?: string };
        signature?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<GitCommit, BasicError | ValidationError>({
        path: `/repos/${owner}/${repo}/git/commits`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets a Git [commit object](https://git-scm.com/book/en/v1/Git-Internals-Git-Objects#Commit-Objects). **Signature verification object** The response will include a `verification` object that describes the result of verifying the commit's signature. The following fields are included in the `verification` object: | Name | Type | Description | | ---- | ---- | ----------- | | `verified` | `boolean` | Indicates whether GitHub considers the signature in this commit to be verified. | | `reason` | `string` | The reason for verified value. Possible values and their meanings are enumerated in table below. | | `signature` | `string` | The signature that was extracted from the commit. | | `payload` | `string` | The value that was signed. | These are the possible values for `reason` in the `verification` object: | Value | Description | | ----- | ----------- | | `expired_key` | The key that made the signature is expired. | | `not_signing_key` | The "signing" flag is not among the usage flags in the GPG key that made the signature. | | `gpgverify_error` | There was an error communicating with the signature verification service. | | `gpgverify_unavailable` | The signature verification service is currently unavailable. | | `unsigned` | The object does not include a signature. | | `unknown_signature_type` | A non-PGP signature was found in the commit. | | `no_user` | No user was associated with the `committer` email address in the commit. | | `unverified_email` | The `committer` email address in the commit was associated with a user, but the email address is not verified on her/his account. | | `bad_email` | The `committer` email address in the commit is not included in the identities of the PGP key that made the signature. | | `unknown_key` | The key that made the signature has not been registered with any user's account. | | `malformed_signature` | There was an error parsing the signature. | | `invalid` | The signature could not be cryptographically verified using the key whose key-id was found in the signature. | | `valid` | None of the above errors applied, so the signature is considered to be verified. |
     *
     * @tags git
     * @name GitGetCommit
     * @summary Get a commit
     * @request GET:/repos/{owner}/{repo}/git/commits/{commit_sha}
     */
    gitGetCommit: (owner: string, repo: string, commitSha: string, params: RequestParams = {}) =>
      this.request<GitCommit, BasicError>({
        path: `/repos/${owner}/${repo}/git/commits/${commitSha}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Returns an array of references from your Git database that match the supplied name. The `:ref` in the URL must be formatted as `heads/<branch name>` for branches and `tags/<tag name>` for tags. If the `:ref` doesn't exist in the repository, but existing refs start with `:ref`, they will be returned as an array. When you use this endpoint without providing a `:ref`, it will return an array of all the references from your Git database, including notes and stashes if they exist on the server. Anything in the namespace is returned, not just `heads` and `tags`. **Note:** You need to explicitly [request a pull request](https://docs.github.com/rest/reference/pulls#get-a-pull-request) to trigger a test merge commit, which checks the mergeability of pull requests. For more information, see "[Checking mergeability of pull requests](https://docs.github.com/rest/guides/getting-started-with-the-git-database-api#checking-mergeability-of-pull-requests)". If you request matching references for a branch named `feature` but the branch `feature` doesn't exist, the response can still include other matching head refs that start with the word `feature`, such as `featureA` and `featureB`.
     *
     * @tags git
     * @name GitListMatchingRefs
     * @summary List matching references
     * @request GET:/repos/{owner}/{repo}/git/matching-refs/{ref}
     */
    gitListMatchingRefs: (
      owner: string,
      repo: string,
      ref: string,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<GitRef[], any>({
        path: `/repos/${owner}/${repo}/git/matching-refs/${ref}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a single reference from your Git database. The `:ref` in the URL must be formatted as `heads/<branch name>` for branches and `tags/<tag name>` for tags. If the `:ref` doesn't match an existing ref, a `404` is returned. **Note:** You need to explicitly [request a pull request](https://docs.github.com/rest/reference/pulls#get-a-pull-request) to trigger a test merge commit, which checks the mergeability of pull requests. For more information, see "[Checking mergeability of pull requests](https://docs.github.com/rest/guides/getting-started-with-the-git-database-api#checking-mergeability-of-pull-requests)".
     *
     * @tags git
     * @name GitGetRef
     * @summary Get a reference
     * @request GET:/repos/{owner}/{repo}/git/ref/{ref}
     */
    gitGetRef: (owner: string, repo: string, ref: string, params: RequestParams = {}) =>
      this.request<GitRef, BasicError>({
        path: `/repos/${owner}/${repo}/git/ref/${ref}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Creates a reference for your repository. You are unable to create new references for empty repositories, even if the commit SHA-1 hash used exists. Empty repositories are repositories without branches.
     *
     * @tags git
     * @name GitCreateRef
     * @summary Create a reference
     * @request POST:/repos/{owner}/{repo}/git/refs
     */
    gitCreateRef: (
      owner: string,
      repo: string,
      data: { ref: string; sha: string; key?: string },
      params: RequestParams = {},
    ) =>
      this.request<GitRef, ValidationError>({
        path: `/repos/${owner}/${repo}/git/refs`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags git
     * @name GitUpdateRef
     * @summary Update a reference
     * @request PATCH:/repos/{owner}/{repo}/git/refs/{ref}
     */
    gitUpdateRef: (
      owner: string,
      repo: string,
      ref: string,
      data: { sha: string; force?: boolean },
      params: RequestParams = {},
    ) =>
      this.request<GitRef, ValidationError>({
        path: `/repos/${owner}/${repo}/git/refs/${ref}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags git
     * @name GitDeleteRef
     * @summary Delete a reference
     * @request DELETE:/repos/{owner}/{repo}/git/refs/{ref}
     */
    gitDeleteRef: (owner: string, repo: string, ref: string, params: RequestParams = {}) =>
      this.request<void, ValidationError>({
        path: `/repos/${owner}/${repo}/git/refs/${ref}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Note that creating a tag object does not create the reference that makes a tag in Git. If you want to create an annotated tag in Git, you have to do this call to create the tag object, and then [create](https://docs.github.com/rest/reference/git#create-a-reference) the `refs/tags/[tag]` reference. If you want to create a lightweight tag, you only have to [create](https://docs.github.com/rest/reference/git#create-a-reference) the tag reference - this call would be unnecessary. **Signature verification object** The response will include a `verification` object that describes the result of verifying the commit's signature. The following fields are included in the `verification` object: | Name | Type | Description | | ---- | ---- | ----------- | | `verified` | `boolean` | Indicates whether GitHub considers the signature in this commit to be verified. | | `reason` | `string` | The reason for verified value. Possible values and their meanings are enumerated in table below. | | `signature` | `string` | The signature that was extracted from the commit. | | `payload` | `string` | The value that was signed. | These are the possible values for `reason` in the `verification` object: | Value | Description | | ----- | ----------- | | `expired_key` | The key that made the signature is expired. | | `not_signing_key` | The "signing" flag is not among the usage flags in the GPG key that made the signature. | | `gpgverify_error` | There was an error communicating with the signature verification service. | | `gpgverify_unavailable` | The signature verification service is currently unavailable. | | `unsigned` | The object does not include a signature. | | `unknown_signature_type` | A non-PGP signature was found in the commit. | | `no_user` | No user was associated with the `committer` email address in the commit. | | `unverified_email` | The `committer` email address in the commit was associated with a user, but the email address is not verified on her/his account. | | `bad_email` | The `committer` email address in the commit is not included in the identities of the PGP key that made the signature. | | `unknown_key` | The key that made the signature has not been registered with any user's account. | | `malformed_signature` | There was an error parsing the signature. | | `invalid` | The signature could not be cryptographically verified using the key whose key-id was found in the signature. | | `valid` | None of the above errors applied, so the signature is considered to be verified. |
     *
     * @tags git
     * @name GitCreateTag
     * @summary Create a tag object
     * @request POST:/repos/{owner}/{repo}/git/tags
     */
    gitCreateTag: (
      owner: string,
      repo: string,
      data: {
        tag: string;
        message: string;
        object: string;
        type: "commit" | "tree" | "blob";
        tagger?: { name?: string; email?: string; date?: string };
      },
      params: RequestParams = {},
    ) =>
      this.request<GitTag, ValidationError>({
        path: `/repos/${owner}/${repo}/git/tags`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description **Signature verification object** The response will include a `verification` object that describes the result of verifying the commit's signature. The following fields are included in the `verification` object: | Name | Type | Description | | ---- | ---- | ----------- | | `verified` | `boolean` | Indicates whether GitHub considers the signature in this commit to be verified. | | `reason` | `string` | The reason for verified value. Possible values and their meanings are enumerated in table below. | | `signature` | `string` | The signature that was extracted from the commit. | | `payload` | `string` | The value that was signed. | These are the possible values for `reason` in the `verification` object: | Value | Description | | ----- | ----------- | | `expired_key` | The key that made the signature is expired. | | `not_signing_key` | The "signing" flag is not among the usage flags in the GPG key that made the signature. | | `gpgverify_error` | There was an error communicating with the signature verification service. | | `gpgverify_unavailable` | The signature verification service is currently unavailable. | | `unsigned` | The object does not include a signature. | | `unknown_signature_type` | A non-PGP signature was found in the commit. | | `no_user` | No user was associated with the `committer` email address in the commit. | | `unverified_email` | The `committer` email address in the commit was associated with a user, but the email address is not verified on her/his account. | | `bad_email` | The `committer` email address in the commit is not included in the identities of the PGP key that made the signature. | | `unknown_key` | The key that made the signature has not been registered with any user's account. | | `malformed_signature` | There was an error parsing the signature. | | `invalid` | The signature could not be cryptographically verified using the key whose key-id was found in the signature. | | `valid` | None of the above errors applied, so the signature is considered to be verified. |
     *
     * @tags git
     * @name GitGetTag
     * @summary Get a tag
     * @request GET:/repos/{owner}/{repo}/git/tags/{tag_sha}
     */
    gitGetTag: (owner: string, repo: string, tagSha: string, params: RequestParams = {}) =>
      this.request<GitTag, BasicError>({
        path: `/repos/${owner}/${repo}/git/tags/${tagSha}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description The tree creation API accepts nested entries. If you specify both a tree and a nested path modifying that tree, this endpoint will overwrite the contents of the tree with the new path contents, and create a new tree structure. If you use this endpoint to add, delete, or modify the file contents in a tree, you will need to commit the tree and then update a branch to point to the commit. For more information see "[Create a commit](https://docs.github.com/rest/reference/git#create-a-commit)" and "[Update a reference](https://docs.github.com/rest/reference/git#update-a-reference)."
     *
     * @tags git
     * @name GitCreateTree
     * @summary Create a tree
     * @request POST:/repos/{owner}/{repo}/git/trees
     */
    gitCreateTree: (
      owner: string,
      repo: string,
      data: {
        tree: {
          path?: string;
          mode?: "100644" | "100755" | "040000" | "160000" | "120000";
          type?: "blob" | "tree" | "commit";
          sha?: string | null;
          content?: string;
        }[];
        base_tree?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<GitTree, BasicError | ValidationError>({
        path: `/repos/${owner}/${repo}/git/trees`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a single tree using the SHA1 value for that tree. If `truncated` is `true` in the response then the number of items in the `tree` array exceeded our maximum limit. If you need to fetch more items, use the non-recursive method of fetching trees, and fetch one sub-tree at a time.
     *
     * @tags git
     * @name GitGetTree
     * @summary Get a tree
     * @request GET:/repos/{owner}/{repo}/git/trees/{tree_sha}
     */
    gitGetTree: (
      owner: string,
      repo: string,
      treeSha: string,
      query?: { recursive?: string },
      params: RequestParams = {},
    ) =>
      this.request<GitTree, BasicError | ValidationError>({
        path: `/repos/${owner}/${repo}/git/trees/${treeSha}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags repos
     * @name ReposListWebhooks
     * @summary List repository webhooks
     * @request GET:/repos/{owner}/{repo}/hooks
     */
    reposListWebhooks: (
      owner: string,
      repo: string,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<Hook[], BasicError>({
        path: `/repos/${owner}/${repo}/hooks`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Repositories can have multiple webhooks installed. Each webhook should have a unique `config`. Multiple webhooks can share the same `config` as long as those webhooks do not have any `events` that overlap.
     *
     * @tags repos
     * @name ReposCreateWebhook
     * @summary Create a repository webhook
     * @request POST:/repos/{owner}/{repo}/hooks
     */
    reposCreateWebhook: (
      owner: string,
      repo: string,
      data: {
        name?: string;
        config: {
          url: WebhookConfigUrl;
          content_type?: WebhookConfigContentType;
          secret?: WebhookConfigSecret;
          insecure_ssl?: WebhookConfigInsecureSsl;
          token?: string;
          digest?: string;
        };
        events?: string[];
        active?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<Hook, BasicError | ValidationError>({
        path: `/repos/${owner}/${repo}/hooks`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a webhook configured in a repository. To get only the webhook `config` properties, see "[Get a webhook configuration for a repository](/rest/reference/repos#get-a-webhook-configuration-for-a-repository)."
     *
     * @tags repos
     * @name ReposGetWebhook
     * @summary Get a repository webhook
     * @request GET:/repos/{owner}/{repo}/hooks/{hook_id}
     */
    reposGetWebhook: (owner: string, repo: string, hookId: number, params: RequestParams = {}) =>
      this.request<Hook, BasicError>({
        path: `/repos/${owner}/${repo}/hooks/${hookId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Updates a webhook configured in a repository. If you previously had a `secret` set, you must provide the same `secret` or set a new `secret` or the secret will be removed. If you are only updating individual webhook `config` properties, use "[Update a webhook configuration for a repository](/rest/reference/repos#update-a-webhook-configuration-for-a-repository)."
     *
     * @tags repos
     * @name ReposUpdateWebhook
     * @summary Update a repository webhook
     * @request PATCH:/repos/{owner}/{repo}/hooks/{hook_id}
     */
    reposUpdateWebhook: (
      owner: string,
      repo: string,
      hookId: number,
      data: {
        config?: {
          url: WebhookConfigUrl;
          content_type?: WebhookConfigContentType;
          secret?: WebhookConfigSecret;
          insecure_ssl?: WebhookConfigInsecureSsl;
          address?: string;
          room?: string;
        };
        events?: string[];
        add_events?: string[];
        remove_events?: string[];
        active?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<Hook, BasicError | ValidationError>({
        path: `/repos/${owner}/${repo}/hooks/${hookId}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags repos
     * @name ReposDeleteWebhook
     * @summary Delete a repository webhook
     * @request DELETE:/repos/{owner}/{repo}/hooks/{hook_id}
     */
    reposDeleteWebhook: (owner: string, repo: string, hookId: number, params: RequestParams = {}) =>
      this.request<void, BasicError>({
        path: `/repos/${owner}/${repo}/hooks/${hookId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Returns the webhook configuration for a repository. To get more information about the webhook, including the `active` state and `events`, use "[Get a repository webhook](/rest/reference/orgs#get-a-repository-webhook)." Access tokens must have the `read:repo_hook` or `repo` scope, and GitHub Apps must have the `repository_hooks:read` permission.
     *
     * @tags repos
     * @name ReposGetWebhookConfigForRepo
     * @summary Get a webhook configuration for a repository
     * @request GET:/repos/{owner}/{repo}/hooks/{hook_id}/config
     */
    reposGetWebhookConfigForRepo: (owner: string, repo: string, hookId: number, params: RequestParams = {}) =>
      this.request<WebhookConfig, any>({
        path: `/repos/${owner}/${repo}/hooks/${hookId}/config`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Updates the webhook configuration for a repository. To update more information about the webhook, including the `active` state and `events`, use "[Update a repository webhook](/rest/reference/orgs#update-a-repository-webhook)." Access tokens must have the `write:repo_hook` or `repo` scope, and GitHub Apps must have the `repository_hooks:write` permission.
     *
     * @tags repos
     * @name ReposUpdateWebhookConfigForRepo
     * @summary Update a webhook configuration for a repository
     * @request PATCH:/repos/{owner}/{repo}/hooks/{hook_id}/config
     */
    reposUpdateWebhookConfigForRepo: (
      owner: string,
      repo: string,
      hookId: number,
      data: {
        url?: WebhookConfigUrl;
        content_type?: WebhookConfigContentType;
        secret?: WebhookConfigSecret;
        insecure_ssl?: WebhookConfigInsecureSsl;
      },
      params: RequestParams = {},
    ) =>
      this.request<WebhookConfig, any>({
        path: `/repos/${owner}/${repo}/hooks/${hookId}/config`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description This will trigger a [ping event](https://docs.github.com/webhooks/#ping-event) to be sent to the hook.
     *
     * @tags repos
     * @name ReposPingWebhook
     * @summary Ping a repository webhook
     * @request POST:/repos/{owner}/{repo}/hooks/{hook_id}/pings
     */
    reposPingWebhook: (owner: string, repo: string, hookId: number, params: RequestParams = {}) =>
      this.request<void, BasicError>({
        path: `/repos/${owner}/${repo}/hooks/${hookId}/pings`,
        method: "POST",
        ...params,
      }),

    /**
     * @description This will trigger the hook with the latest push to the current repository if the hook is subscribed to `push` events. If the hook is not subscribed to `push` events, the server will respond with 204 but no test POST will be generated. **Note**: Previously `/repos/:owner/:repo/hooks/:hook_id/test`
     *
     * @tags repos
     * @name ReposTestPushWebhook
     * @summary Test the push repository webhook
     * @request POST:/repos/{owner}/{repo}/hooks/{hook_id}/tests
     */
    reposTestPushWebhook: (owner: string, repo: string, hookId: number, params: RequestParams = {}) =>
      this.request<void, BasicError>({
        path: `/repos/${owner}/${repo}/hooks/${hookId}/tests`,
        method: "POST",
        ...params,
      }),

    /**
     * @description View the progress of an import. **Import status** This section includes details about the possible values of the `status` field of the Import Progress response. An import that does not have errors will progress through these steps: *   `detecting` - the "detection" step of the import is in progress because the request did not include a `vcs` parameter. The import is identifying the type of source control present at the URL. *   `importing` - the "raw" step of the import is in progress. This is where commit data is fetched from the original repository. The import progress response will include `commit_count` (the total number of raw commits that will be imported) and `percent` (0 - 100, the current progress through the import). *   `mapping` - the "rewrite" step of the import is in progress. This is where SVN branches are converted to Git branches, and where author updates are applied. The import progress response does not include progress information. *   `pushing` - the "push" step of the import is in progress. This is where the importer updates the repository on GitHub. The import progress response will include `push_percent`, which is the percent value reported by `git push` when it is "Writing objects". *   `complete` - the import is complete, and the repository is ready on GitHub. If there are problems, you will see one of these in the `status` field: *   `auth_failed` - the import requires authentication in order to connect to the original repository. To update authentication for the import, please see the [Update an import](https://docs.github.com/rest/reference/migrations#update-an-import) section. *   `error` - the import encountered an error. The import progress response will include the `failed_step` and an error message. Contact [GitHub Support](https://support.github.com/contact) or [GitHub Premium Support](https://premium.githubsupport.com) for more information. *   `detection_needs_auth` - the importer requires authentication for the originating repository to continue detection. To update authentication for the import, please see the [Update an import](https://docs.github.com/rest/reference/migrations#update-an-import) section. *   `detection_found_nothing` - the importer didn't recognize any source control at the URL. To resolve, [Cancel the import](https://docs.github.com/rest/reference/migrations#cancel-an-import) and [retry](https://docs.github.com/rest/reference/migrations#start-an-import) with the correct URL. *   `detection_found_multiple` - the importer found several projects or repositories at the provided URL. When this is the case, the Import Progress response will also include a `project_choices` field with the possible project choices as values. To update project choice, please see the [Update an import](https://docs.github.com/rest/reference/migrations#update-an-import) section. **The project_choices field** When multiple projects are found at the provided URL, the response hash will include a `project_choices` field, the value of which is an array of hashes each representing a project choice. The exact key/value pairs of the project hashes will differ depending on the version control type. **Git LFS related fields** This section includes details about Git LFS related fields that may be present in the Import Progress response. *   `use_lfs` - describes whether the import has been opted in or out of using Git LFS. The value can be `opt_in`, `opt_out`, or `undecided` if no action has been taken. *   `has_large_files` - the boolean value describing whether files larger than 100MB were found during the `importing` step. *   `large_files_size` - the total size in gigabytes of files larger than 100MB found in the originating repository. *   `large_files_count` - the total number of files larger than 100MB found in the originating repository. To see a list of these files, make a "Get Large Files" request.
     *
     * @tags migrations
     * @name MigrationsGetImportStatus
     * @summary Get an import status
     * @request GET:/repos/{owner}/{repo}/import
     */
    migrationsGetImportStatus: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<Import, BasicError>({
        path: `/repos/${owner}/${repo}/import`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Start a source import to a GitHub repository using GitHub Importer.
     *
     * @tags migrations
     * @name MigrationsStartImport
     * @summary Start an import
     * @request PUT:/repos/{owner}/{repo}/import
     */
    migrationsStartImport: (
      owner: string,
      repo: string,
      data: {
        vcs_url: string;
        vcs?: "subversion" | "git" | "mercurial" | "tfvc";
        vcs_username?: string;
        vcs_password?: string;
        tfvc_project?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Import, BasicError | ValidationError>({
        path: `/repos/${owner}/${repo}/import`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description An import can be updated with credentials or a project choice by passing in the appropriate parameters in this API request. If no parameters are provided, the import will be restarted.
     *
     * @tags migrations
     * @name MigrationsUpdateImport
     * @summary Update an import
     * @request PATCH:/repos/{owner}/{repo}/import
     */
    migrationsUpdateImport: (
      owner: string,
      repo: string,
      data: { vcs_username?: string; vcs_password?: string; vcs?: string; tfvc_project?: string },
      params: RequestParams = {},
    ) =>
      this.request<Import, any>({
        path: `/repos/${owner}/${repo}/import`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Stop an import for a repository.
     *
     * @tags migrations
     * @name MigrationsCancelImport
     * @summary Cancel an import
     * @request DELETE:/repos/{owner}/{repo}/import
     */
    migrationsCancelImport: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/repos/${owner}/${repo}/import`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Each type of source control system represents authors in a different way. For example, a Git commit author has a display name and an email address, but a Subversion commit author just has a username. The GitHub Importer will make the author information valid, but the author might not be correct. For example, it will change the bare Subversion username `hubot` into something like `hubot <hubot@12341234-abab-fefe-8787-fedcba987654>`. This endpoint and the [Map a commit author](https://docs.github.com/rest/reference/migrations#map-a-commit-author) endpoint allow you to provide correct Git author information.
     *
     * @tags migrations
     * @name MigrationsGetCommitAuthors
     * @summary Get commit authors
     * @request GET:/repos/{owner}/{repo}/import/authors
     */
    migrationsGetCommitAuthors: (owner: string, repo: string, query?: { since?: number }, params: RequestParams = {}) =>
      this.request<PorterAuthor[], BasicError>({
        path: `/repos/${owner}/${repo}/import/authors`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Update an author's identity for the import. Your application can continue updating authors any time before you push new commits to the repository.
     *
     * @tags migrations
     * @name MigrationsMapCommitAuthor
     * @summary Map a commit author
     * @request PATCH:/repos/{owner}/{repo}/import/authors/{author_id}
     */
    migrationsMapCommitAuthor: (
      owner: string,
      repo: string,
      authorId: number,
      data: { email?: string; name?: string; remote_id?: string },
      params: RequestParams = {},
    ) =>
      this.request<PorterAuthor, BasicError | ValidationError>({
        path: `/repos/${owner}/${repo}/import/authors/${authorId}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description List files larger than 100MB found during the import
     *
     * @tags migrations
     * @name MigrationsGetLargeFiles
     * @summary Get large files
     * @request GET:/repos/{owner}/{repo}/import/large_files
     */
    migrationsGetLargeFiles: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<PorterLargeFile[], any>({
        path: `/repos/${owner}/${repo}/import/large_files`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description You can import repositories from Subversion, Mercurial, and TFS that include files larger than 100MB. This ability is powered by [Git LFS](https://git-lfs.github.com). You can learn more about our LFS feature and working with large files [on our help site](https://help.github.com/articles/versioning-large-files/).
     *
     * @tags migrations
     * @name MigrationsSetLfsPreference
     * @summary Update Git LFS preference
     * @request PATCH:/repos/{owner}/{repo}/import/lfs
     */
    migrationsSetLfsPreference: (
      owner: string,
      repo: string,
      data: { use_lfs: "opt_in" | "opt_out" },
      params: RequestParams = {},
    ) =>
      this.request<Import, ValidationError>({
        path: `/repos/${owner}/${repo}/import/lfs`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Enables an authenticated GitHub App to find the repository's installation information. The installation's account type will be either an organization or a user account, depending which account the repository belongs to. You must use a [JWT](https://docs.github.com/apps/building-github-apps/authenticating-with-github-apps/#authenticating-as-a-github-app) to access this endpoint.
     *
     * @tags apps
     * @name AppsGetRepoInstallation
     * @summary Get a repository installation for the authenticated app
     * @request GET:/repos/{owner}/{repo}/installation
     */
    appsGetRepoInstallation: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<Installation, BasicError>({
        path: `/repos/${owner}/${repo}/installation`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Shows which type of GitHub user can interact with this repository and when the restriction expires. If there are no restrictions, you will see an empty response.
     *
     * @tags interactions
     * @name InteractionsGetRestrictionsForRepo
     * @summary Get interaction restrictions for a repository
     * @request GET:/repos/{owner}/{repo}/interaction-limits
     */
    interactionsGetRestrictionsForRepo: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<InteractionLimitResponse, any>({
        path: `/repos/${owner}/${repo}/interaction-limits`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Temporarily restricts interactions to a certain type of GitHub user within the given repository. You must have owner or admin access to set these restrictions. If an interaction limit is set for the user or organization that owns this repository, you will receive a `409 Conflict` response and will not be able to use this endpoint to change the interaction limit for a single repository.
     *
     * @tags interactions
     * @name InteractionsSetRestrictionsForRepo
     * @summary Set interaction restrictions for a repository
     * @request PUT:/repos/{owner}/{repo}/interaction-limits
     */
    interactionsSetRestrictionsForRepo: (
      owner: string,
      repo: string,
      data: InteractionLimit,
      params: RequestParams = {},
    ) =>
      this.request<InteractionLimitResponse, void>({
        path: `/repos/${owner}/${repo}/interaction-limits`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Removes all interaction restrictions from the given repository. You must have owner or admin access to remove restrictions. If the interaction limit is set for the user or organization that owns this repository, you will receive a `409 Conflict` response and will not be able to use this endpoint to change the interaction limit for a single repository.
     *
     * @tags interactions
     * @name InteractionsRemoveRestrictionsForRepo
     * @summary Remove interaction restrictions for a repository
     * @request DELETE:/repos/{owner}/{repo}/interaction-limits
     */
    interactionsRemoveRestrictionsForRepo: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/repos/${owner}/${repo}/interaction-limits`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description When authenticating as a user with admin rights to a repository, this endpoint will list all currently open repository invitations.
     *
     * @tags repos
     * @name ReposListInvitations
     * @summary List repository invitations
     * @request GET:/repos/{owner}/{repo}/invitations
     */
    reposListInvitations: (
      owner: string,
      repo: string,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<RepositoryInvitation[], any>({
        path: `/repos/${owner}/${repo}/invitations`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags repos
     * @name ReposUpdateInvitation
     * @summary Update a repository invitation
     * @request PATCH:/repos/{owner}/{repo}/invitations/{invitation_id}
     */
    reposUpdateInvitation: (
      owner: string,
      repo: string,
      invitationId: number,
      data: { permissions?: "read" | "write" | "maintain" | "triage" | "admin" },
      params: RequestParams = {},
    ) =>
      this.request<RepositoryInvitation, any>({
        path: `/repos/${owner}/${repo}/invitations/${invitationId}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags repos
     * @name ReposDeleteInvitation
     * @summary Delete a repository invitation
     * @request DELETE:/repos/{owner}/{repo}/invitations/{invitation_id}
     */
    reposDeleteInvitation: (owner: string, repo: string, invitationId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/repos/${owner}/${repo}/invitations/${invitationId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description List issues in a repository. **Note**: GitHub's REST API v3 considers every pull request an issue, but not every issue is a pull request. For this reason, "Issues" endpoints may return both issues and pull requests in the response. You can identify pull requests by the `pull_request` key. Be aware that the `id` of a pull request returned from "Issues" endpoints will be an _issue id_. To find out the pull request id, use the "[List pull requests](https://docs.github.com/rest/reference/pulls#list-pull-requests)" endpoint.
     *
     * @tags issues
     * @name IssuesListForRepo
     * @summary List repository issues
     * @request GET:/repos/{owner}/{repo}/issues
     */
    issuesListForRepo: (
      owner: string,
      repo: string,
      query?: {
        milestone?: string;
        state?: "open" | "closed" | "all";
        assignee?: string;
        creator?: string;
        mentioned?: string;
        labels?: string;
        sort?: "created" | "updated" | "comments";
        direction?: "asc" | "desc";
        since?: string;
        per_page?: number;
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<IssueSimple[], BasicError | ValidationError>({
        path: `/repos/${owner}/${repo}/issues`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Any user with pull access to a repository can create an issue. If [issues are disabled in the repository](https://help.github.com/articles/disabling-issues/), the API returns a `410 Gone` status. This endpoint triggers [notifications](https://docs.github.com/en/github/managing-subscriptions-and-notifications-on-github/about-notifications). Creating content too quickly using this endpoint may result in abuse rate limiting. See "[Abuse rate limits](https://docs.github.com/rest/overview/resources-in-the-rest-api#abuse-rate-limits)" and "[Dealing with abuse rate limits](https://docs.github.com/rest/guides/best-practices-for-integrators#dealing-with-abuse-rate-limits)" for details.
     *
     * @tags issues
     * @name IssuesCreate
     * @summary Create an issue
     * @request POST:/repos/{owner}/{repo}/issues
     */
    issuesCreate: (
      owner: string,
      repo: string,
      data: {
        title: string | number;
        body?: string;
        assignee?: string | null;
        milestone?: string | number | null;
        labels?: (string | { id?: number; name?: string; description?: string | null; color?: string | null })[];
        assignees?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        Issue,
        BasicError | ValidationError | { code?: string; message?: string; documentation_url?: string }
      >({
        path: `/repos/${owner}/${repo}/issues`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description By default, Issue Comments are ordered by ascending ID.
     *
     * @tags issues
     * @name IssuesListCommentsForRepo
     * @summary List issue comments for a repository
     * @request GET:/repos/{owner}/{repo}/issues/comments
     */
    issuesListCommentsForRepo: (
      owner: string,
      repo: string,
      query?: {
        sort?: "created" | "updated";
        direction?: "asc" | "desc";
        since?: string;
        per_page?: number;
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<IssueComment[], BasicError | ValidationError>({
        path: `/repos/${owner}/${repo}/issues/comments`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags issues
     * @name IssuesGetComment
     * @summary Get an issue comment
     * @request GET:/repos/{owner}/{repo}/issues/comments/{comment_id}
     */
    issuesGetComment: (owner: string, repo: string, commentId: number, params: RequestParams = {}) =>
      this.request<IssueComment, BasicError>({
        path: `/repos/${owner}/${repo}/issues/comments/${commentId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags issues
     * @name IssuesUpdateComment
     * @summary Update an issue comment
     * @request PATCH:/repos/{owner}/{repo}/issues/comments/{comment_id}
     */
    issuesUpdateComment: (
      owner: string,
      repo: string,
      commentId: number,
      data: { body: string },
      params: RequestParams = {},
    ) =>
      this.request<IssueComment, ValidationError>({
        path: `/repos/${owner}/${repo}/issues/comments/${commentId}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags issues
     * @name IssuesDeleteComment
     * @summary Delete an issue comment
     * @request DELETE:/repos/{owner}/{repo}/issues/comments/{comment_id}
     */
    issuesDeleteComment: (owner: string, repo: string, commentId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/repos/${owner}/${repo}/issues/comments/${commentId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description List the reactions to an [issue comment](https://docs.github.com/rest/reference/issues#comments).
     *
     * @tags reactions
     * @name ReactionsListForIssueComment
     * @summary List reactions for an issue comment
     * @request GET:/repos/{owner}/{repo}/issues/comments/{comment_id}/reactions
     */
    reactionsListForIssueComment: (
      owner: string,
      repo: string,
      commentId: number,
      query?: {
        content?: "+1" | "-1" | "laugh" | "confused" | "heart" | "hooray" | "rocket" | "eyes";
        per_page?: number;
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<Reaction[], BasicError | { message: string; documentation_url: string }>({
        path: `/repos/${owner}/${repo}/issues/comments/${commentId}/reactions`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a reaction to an [issue comment](https://docs.github.com/rest/reference/issues#comments). A response with a `Status: 200 OK` means that you already added the reaction type to this issue comment.
     *
     * @tags reactions
     * @name ReactionsCreateForIssueComment
     * @summary Create reaction for an issue comment
     * @request POST:/repos/{owner}/{repo}/issues/comments/{comment_id}/reactions
     */
    reactionsCreateForIssueComment: (
      owner: string,
      repo: string,
      commentId: number,
      data: { content: "+1" | "-1" | "laugh" | "confused" | "heart" | "hooray" | "rocket" | "eyes" },
      params: RequestParams = {},
    ) =>
      this.request<Reaction, { message: string; documentation_url: string } | ValidationError>({
        path: `/repos/${owner}/${repo}/issues/comments/${commentId}/reactions`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description **Note:** You can also specify a repository by `repository_id` using the route `DELETE delete /repositories/:repository_id/issues/comments/:comment_id/reactions/:reaction_id`. Delete a reaction to an [issue comment](https://docs.github.com/rest/reference/issues#comments).
     *
     * @tags reactions
     * @name ReactionsDeleteForIssueComment
     * @summary Delete an issue comment reaction
     * @request DELETE:/repos/{owner}/{repo}/issues/comments/{comment_id}/reactions/{reaction_id}
     */
    reactionsDeleteForIssueComment: (
      owner: string,
      repo: string,
      commentId: number,
      reactionId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/repos/${owner}/${repo}/issues/comments/${commentId}/reactions/${reactionId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags issues
     * @name IssuesListEventsForRepo
     * @summary List issue events for a repository
     * @request GET:/repos/{owner}/{repo}/issues/events
     */
    issuesListEventsForRepo: (
      owner: string,
      repo: string,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<IssueEvent[], ValidationError>({
        path: `/repos/${owner}/${repo}/issues/events`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags issues
     * @name IssuesGetEvent
     * @summary Get an issue event
     * @request GET:/repos/{owner}/{repo}/issues/events/{event_id}
     */
    issuesGetEvent: (owner: string, repo: string, eventId: number, params: RequestParams = {}) =>
      this.request<IssueEvent, BasicError>({
        path: `/repos/${owner}/${repo}/issues/events/${eventId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description The API returns a [`301 Moved Permanently` status](https://docs.github.com/rest/overview/resources-in-the-rest-api#http-redirects-redirects) if the issue was [transferred](https://help.github.com/articles/transferring-an-issue-to-another-repository/) to another repository. If the issue was transferred to or deleted from a repository where the authenticated user lacks read access, the API returns a `404 Not Found` status. If the issue was deleted from a repository where the authenticated user has read access, the API returns a `410 Gone` status. To receive webhook events for transferred and deleted issues, subscribe to the [`issues`](https://docs.github.com/webhooks/event-payloads/#issues) webhook. **Note**: GitHub's REST API v3 considers every pull request an issue, but not every issue is a pull request. For this reason, "Issues" endpoints may return both issues and pull requests in the response. You can identify pull requests by the `pull_request` key. Be aware that the `id` of a pull request returned from "Issues" endpoints will be an _issue id_. To find out the pull request id, use the "[List pull requests](https://docs.github.com/rest/reference/pulls#list-pull-requests)" endpoint.
     *
     * @tags issues
     * @name IssuesGet
     * @summary Get an issue
     * @request GET:/repos/{owner}/{repo}/issues/{issue_number}
     */
    issuesGet: (owner: string, repo: string, issueNumber: number, params: RequestParams = {}) =>
      this.request<Issue, BasicError>({
        path: `/repos/${owner}/${repo}/issues/${issueNumber}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Issue owners and users with push access can edit an issue.
     *
     * @tags issues
     * @name IssuesUpdate
     * @summary Update an issue
     * @request PATCH:/repos/{owner}/{repo}/issues/{issue_number}
     */
    issuesUpdate: (
      owner: string,
      repo: string,
      issueNumber: number,
      data: {
        title?: string | number;
        body?: string;
        assignee?: string | null;
        state?: "open" | "closed";
        milestone?: string | number | null;
        labels?: (string | { id?: number; name?: string; description?: string | null; color?: string | null })[];
        assignees?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        Issue,
        BasicError | ValidationError | { code?: string; message?: string; documentation_url?: string }
      >({
        path: `/repos/${owner}/${repo}/issues/${issueNumber}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Adds up to 10 assignees to an issue. Users already assigned to an issue are not replaced.
     *
     * @tags issues
     * @name IssuesAddAssignees
     * @summary Add assignees to an issue
     * @request POST:/repos/{owner}/{repo}/issues/{issue_number}/assignees
     */
    issuesAddAssignees: (
      owner: string,
      repo: string,
      issueNumber: number,
      data: { assignees?: string[] },
      params: RequestParams = {},
    ) =>
      this.request<IssueSimple, any>({
        path: `/repos/${owner}/${repo}/issues/${issueNumber}/assignees`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Removes one or more assignees from an issue.
     *
     * @tags issues
     * @name IssuesRemoveAssignees
     * @summary Remove assignees from an issue
     * @request DELETE:/repos/{owner}/{repo}/issues/{issue_number}/assignees
     */
    issuesRemoveAssignees: (
      owner: string,
      repo: string,
      issueNumber: number,
      data: { assignees?: string[] },
      params: RequestParams = {},
    ) =>
      this.request<IssueSimple, any>({
        path: `/repos/${owner}/${repo}/issues/${issueNumber}/assignees`,
        method: "DELETE",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Issue Comments are ordered by ascending ID.
     *
     * @tags issues
     * @name IssuesListComments
     * @summary List issue comments
     * @request GET:/repos/{owner}/{repo}/issues/{issue_number}/comments
     */
    issuesListComments: (
      owner: string,
      repo: string,
      issueNumber: number,
      query?: { since?: string; per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<IssueComment[], BasicError>({
        path: `/repos/${owner}/${repo}/issues/${issueNumber}/comments`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description This endpoint triggers [notifications](https://docs.github.com/en/github/managing-subscriptions-and-notifications-on-github/about-notifications). Creating content too quickly using this endpoint may result in abuse rate limiting. See "[Abuse rate limits](https://docs.github.com/rest/overview/resources-in-the-rest-api#abuse-rate-limits)" and "[Dealing with abuse rate limits](https://docs.github.com/rest/guides/best-practices-for-integrators#dealing-with-abuse-rate-limits)" for details.
     *
     * @tags issues
     * @name IssuesCreateComment
     * @summary Create an issue comment
     * @request POST:/repos/{owner}/{repo}/issues/{issue_number}/comments
     */
    issuesCreateComment: (
      owner: string,
      repo: string,
      issueNumber: number,
      data: { body: string },
      params: RequestParams = {},
    ) =>
      this.request<IssueComment, BasicError | ValidationError>({
        path: `/repos/${owner}/${repo}/issues/${issueNumber}/comments`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags issues
     * @name IssuesListEvents
     * @summary List issue events
     * @request GET:/repos/{owner}/{repo}/issues/{issue_number}/events
     */
    issuesListEvents: (
      owner: string,
      repo: string,
      issueNumber: number,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<IssueEventForIssue[], BasicError>({
        path: `/repos/${owner}/${repo}/issues/${issueNumber}/events`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags issues
     * @name IssuesListLabelsOnIssue
     * @summary List labels for an issue
     * @request GET:/repos/{owner}/{repo}/issues/{issue_number}/labels
     */
    issuesListLabelsOnIssue: (
      owner: string,
      repo: string,
      issueNumber: number,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<Label[], BasicError>({
        path: `/repos/${owner}/${repo}/issues/${issueNumber}/labels`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags issues
     * @name IssuesAddLabels
     * @summary Add labels to an issue
     * @request POST:/repos/{owner}/{repo}/issues/{issue_number}/labels
     */
    issuesAddLabels: (
      owner: string,
      repo: string,
      issueNumber: number,
      data: { labels: string[] },
      params: RequestParams = {},
    ) =>
      this.request<Label[], BasicError | ValidationError>({
        path: `/repos/${owner}/${repo}/issues/${issueNumber}/labels`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Removes any previous labels and sets the new labels for an issue.
     *
     * @tags issues
     * @name IssuesSetLabels
     * @summary Set labels for an issue
     * @request PUT:/repos/{owner}/{repo}/issues/{issue_number}/labels
     */
    issuesSetLabels: (
      owner: string,
      repo: string,
      issueNumber: number,
      data: { labels?: string[] },
      params: RequestParams = {},
    ) =>
      this.request<Label[], BasicError | ValidationError>({
        path: `/repos/${owner}/${repo}/issues/${issueNumber}/labels`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags issues
     * @name IssuesRemoveAllLabels
     * @summary Remove all labels from an issue
     * @request DELETE:/repos/{owner}/{repo}/issues/{issue_number}/labels
     */
    issuesRemoveAllLabels: (owner: string, repo: string, issueNumber: number, params: RequestParams = {}) =>
      this.request<void, BasicError>({
        path: `/repos/${owner}/${repo}/issues/${issueNumber}/labels`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Removes the specified label from the issue, and returns the remaining labels on the issue. This endpoint returns a `404 Not Found` status if the label does not exist.
     *
     * @tags issues
     * @name IssuesRemoveLabel
     * @summary Remove a label from an issue
     * @request DELETE:/repos/{owner}/{repo}/issues/{issue_number}/labels/{name}
     */
    issuesRemoveLabel: (owner: string, repo: string, issueNumber: number, name: string, params: RequestParams = {}) =>
      this.request<Label[], BasicError>({
        path: `/repos/${owner}/${repo}/issues/${issueNumber}/labels/${name}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * @description Users with push access can lock an issue or pull request's conversation. Note that, if you choose not to pass any parameters, you'll need to set `Content-Length` to zero when calling out to this endpoint. For more information, see "[HTTP verbs](https://docs.github.com/rest/overview/resources-in-the-rest-api#http-verbs)."
     *
     * @tags issues
     * @name IssuesLock
     * @summary Lock an issue
     * @request PUT:/repos/{owner}/{repo}/issues/{issue_number}/lock
     */
    issuesLock: (
      owner: string,
      repo: string,
      issueNumber: number,
      data: { lock_reason?: "off-topic" | "too heated" | "resolved" | "spam" },
      params: RequestParams = {},
    ) =>
      this.request<void, BasicError | ValidationError>({
        path: `/repos/${owner}/${repo}/issues/${issueNumber}/lock`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Users with push access can unlock an issue's conversation.
     *
     * @tags issues
     * @name IssuesUnlock
     * @summary Unlock an issue
     * @request DELETE:/repos/{owner}/{repo}/issues/{issue_number}/lock
     */
    issuesUnlock: (owner: string, repo: string, issueNumber: number, params: RequestParams = {}) =>
      this.request<void, BasicError>({
        path: `/repos/${owner}/${repo}/issues/${issueNumber}/lock`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description List the reactions to an [issue](https://docs.github.com/rest/reference/issues).
     *
     * @tags reactions
     * @name ReactionsListForIssue
     * @summary List reactions for an issue
     * @request GET:/repos/{owner}/{repo}/issues/{issue_number}/reactions
     */
    reactionsListForIssue: (
      owner: string,
      repo: string,
      issueNumber: number,
      query?: {
        content?: "+1" | "-1" | "laugh" | "confused" | "heart" | "hooray" | "rocket" | "eyes";
        per_page?: number;
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<Reaction[], BasicError | { message: string; documentation_url: string }>({
        path: `/repos/${owner}/${repo}/issues/${issueNumber}/reactions`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a reaction to an [issue](https://docs.github.com/rest/reference/issues/). A response with a `Status: 200 OK` means that you already added the reaction type to this issue.
     *
     * @tags reactions
     * @name ReactionsCreateForIssue
     * @summary Create reaction for an issue
     * @request POST:/repos/{owner}/{repo}/issues/{issue_number}/reactions
     */
    reactionsCreateForIssue: (
      owner: string,
      repo: string,
      issueNumber: number,
      data: { content: "+1" | "-1" | "laugh" | "confused" | "heart" | "hooray" | "rocket" | "eyes" },
      params: RequestParams = {},
    ) =>
      this.request<Reaction, { message: string; documentation_url: string } | ValidationError>({
        path: `/repos/${owner}/${repo}/issues/${issueNumber}/reactions`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description **Note:** You can also specify a repository by `repository_id` using the route `DELETE /repositories/:repository_id/issues/:issue_number/reactions/:reaction_id`. Delete a reaction to an [issue](https://docs.github.com/rest/reference/issues/).
     *
     * @tags reactions
     * @name ReactionsDeleteForIssue
     * @summary Delete an issue reaction
     * @request DELETE:/repos/{owner}/{repo}/issues/{issue_number}/reactions/{reaction_id}
     */
    reactionsDeleteForIssue: (
      owner: string,
      repo: string,
      issueNumber: number,
      reactionId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/repos/${owner}/${repo}/issues/${issueNumber}/reactions/${reactionId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags issues
     * @name IssuesListEventsForTimeline
     * @summary List timeline events for an issue
     * @request GET:/repos/{owner}/{repo}/issues/{issue_number}/timeline
     */
    issuesListEventsForTimeline: (
      owner: string,
      repo: string,
      issueNumber: number,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<IssueEventForIssue[], BasicError | { message: string; documentation_url: string }>({
        path: `/repos/${owner}/${repo}/issues/${issueNumber}/timeline`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags repos
     * @name ReposListDeployKeys
     * @summary List deploy keys
     * @request GET:/repos/{owner}/{repo}/keys
     */
    reposListDeployKeys: (
      owner: string,
      repo: string,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<DeployKey[], any>({
        path: `/repos/${owner}/${repo}/keys`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description You can create a read-only deploy key.
     *
     * @tags repos
     * @name ReposCreateDeployKey
     * @summary Create a deploy key
     * @request POST:/repos/{owner}/{repo}/keys
     */
    reposCreateDeployKey: (
      owner: string,
      repo: string,
      data: { title?: string; key: string; read_only?: boolean },
      params: RequestParams = {},
    ) =>
      this.request<DeployKey, ValidationError>({
        path: `/repos/${owner}/${repo}/keys`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags repos
     * @name ReposGetDeployKey
     * @summary Get a deploy key
     * @request GET:/repos/{owner}/{repo}/keys/{key_id}
     */
    reposGetDeployKey: (owner: string, repo: string, keyId: number, params: RequestParams = {}) =>
      this.request<DeployKey, BasicError>({
        path: `/repos/${owner}/${repo}/keys/${keyId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Deploy keys are immutable. If you need to update a key, remove the key and create a new one instead.
     *
     * @tags repos
     * @name ReposDeleteDeployKey
     * @summary Delete a deploy key
     * @request DELETE:/repos/{owner}/{repo}/keys/{key_id}
     */
    reposDeleteDeployKey: (owner: string, repo: string, keyId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/repos/${owner}/${repo}/keys/${keyId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags issues
     * @name IssuesListLabelsForRepo
     * @summary List labels for a repository
     * @request GET:/repos/{owner}/{repo}/labels
     */
    issuesListLabelsForRepo: (
      owner: string,
      repo: string,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<Label[], BasicError>({
        path: `/repos/${owner}/${repo}/labels`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags issues
     * @name IssuesCreateLabel
     * @summary Create a label
     * @request POST:/repos/{owner}/{repo}/labels
     */
    issuesCreateLabel: (
      owner: string,
      repo: string,
      data: { name: string; color?: string; description?: string },
      params: RequestParams = {},
    ) =>
      this.request<Label, BasicError | ValidationError>({
        path: `/repos/${owner}/${repo}/labels`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags issues
     * @name IssuesGetLabel
     * @summary Get a label
     * @request GET:/repos/{owner}/{repo}/labels/{name}
     */
    issuesGetLabel: (owner: string, repo: string, name: string, params: RequestParams = {}) =>
      this.request<Label, BasicError>({
        path: `/repos/${owner}/${repo}/labels/${name}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags issues
     * @name IssuesUpdateLabel
     * @summary Update a label
     * @request PATCH:/repos/{owner}/{repo}/labels/{name}
     */
    issuesUpdateLabel: (
      owner: string,
      repo: string,
      name: string,
      data: { new_name?: string; color?: string; description?: string },
      params: RequestParams = {},
    ) =>
      this.request<Label, any>({
        path: `/repos/${owner}/${repo}/labels/${name}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags issues
     * @name IssuesDeleteLabel
     * @summary Delete a label
     * @request DELETE:/repos/{owner}/{repo}/labels/{name}
     */
    issuesDeleteLabel: (owner: string, repo: string, name: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/repos/${owner}/${repo}/labels/${name}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Lists languages for the specified repository. The value shown for each language is the number of bytes of code written in that language.
     *
     * @tags repos
     * @name ReposListLanguages
     * @summary List repository languages
     * @request GET:/repos/{owner}/{repo}/languages
     */
    reposListLanguages: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<Language, any>({
        path: `/repos/${owner}/${repo}/languages`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description This method returns the contents of the repository's license file, if one is detected. Similar to [Get repository content](https://docs.github.com/rest/reference/repos#get-repository-content), this method also supports [custom media types](https://docs.github.com/rest/overview/media-types) for retrieving the raw license content or rendered license HTML.
     *
     * @tags licenses
     * @name LicensesGetForRepo
     * @summary Get the license for a repository
     * @request GET:/repos/{owner}/{repo}/license
     */
    licensesGetForRepo: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<LicenseContent, any>({
        path: `/repos/${owner}/${repo}/license`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags repos
     * @name ReposMerge
     * @summary Merge a branch
     * @request POST:/repos/{owner}/{repo}/merges
     */
    reposMerge: (
      owner: string,
      repo: string,
      data: { base: string; head: string; commit_message?: string },
      params: RequestParams = {},
    ) =>
      this.request<Commit, BasicError | { message?: string; documentation_url?: string } | ValidationError>({
        path: `/repos/${owner}/${repo}/merges`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags issues
     * @name IssuesListMilestones
     * @summary List milestones
     * @request GET:/repos/{owner}/{repo}/milestones
     */
    issuesListMilestones: (
      owner: string,
      repo: string,
      query?: {
        state?: "open" | "closed" | "all";
        sort?: "due_on" | "completeness";
        direction?: "asc" | "desc";
        per_page?: number;
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<Milestone[], BasicError>({
        path: `/repos/${owner}/${repo}/milestones`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags issues
     * @name IssuesCreateMilestone
     * @summary Create a milestone
     * @request POST:/repos/{owner}/{repo}/milestones
     */
    issuesCreateMilestone: (
      owner: string,
      repo: string,
      data: { title: string; state?: "open" | "closed"; description?: string; due_on?: string },
      params: RequestParams = {},
    ) =>
      this.request<Milestone, BasicError | ValidationError>({
        path: `/repos/${owner}/${repo}/milestones`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags issues
     * @name IssuesGetMilestone
     * @summary Get a milestone
     * @request GET:/repos/{owner}/{repo}/milestones/{milestone_number}
     */
    issuesGetMilestone: (owner: string, repo: string, milestoneNumber: number, params: RequestParams = {}) =>
      this.request<Milestone, BasicError>({
        path: `/repos/${owner}/${repo}/milestones/${milestoneNumber}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags issues
     * @name IssuesUpdateMilestone
     * @summary Update a milestone
     * @request PATCH:/repos/{owner}/{repo}/milestones/{milestone_number}
     */
    issuesUpdateMilestone: (
      owner: string,
      repo: string,
      milestoneNumber: number,
      data: { title?: string; state?: "open" | "closed"; description?: string; due_on?: string },
      params: RequestParams = {},
    ) =>
      this.request<Milestone, any>({
        path: `/repos/${owner}/${repo}/milestones/${milestoneNumber}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags issues
     * @name IssuesDeleteMilestone
     * @summary Delete a milestone
     * @request DELETE:/repos/{owner}/{repo}/milestones/{milestone_number}
     */
    issuesDeleteMilestone: (owner: string, repo: string, milestoneNumber: number, params: RequestParams = {}) =>
      this.request<void, BasicError>({
        path: `/repos/${owner}/${repo}/milestones/${milestoneNumber}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags issues
     * @name IssuesListLabelsForMilestone
     * @summary List labels for issues in a milestone
     * @request GET:/repos/{owner}/{repo}/milestones/{milestone_number}/labels
     */
    issuesListLabelsForMilestone: (
      owner: string,
      repo: string,
      milestoneNumber: number,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<Label[], any>({
        path: `/repos/${owner}/${repo}/milestones/${milestoneNumber}/labels`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description List all notifications for the current user.
     *
     * @tags activity
     * @name ActivityListRepoNotificationsForAuthenticatedUser
     * @summary List repository notifications for the authenticated user
     * @request GET:/repos/{owner}/{repo}/notifications
     */
    activityListRepoNotificationsForAuthenticatedUser: (
      owner: string,
      repo: string,
      query?: {
        all?: boolean;
        participating?: boolean;
        since?: string;
        before?: string;
        per_page?: number;
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<Thread[], any>({
        path: `/repos/${owner}/${repo}/notifications`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Marks all notifications in a repository as "read" removes them from the [default view on GitHub](https://github.com/notifications). If the number of notifications is too large to complete in one request, you will receive a `202 Accepted` status and GitHub will run an asynchronous process to mark notifications as "read." To check whether any "unread" notifications remain, you can use the [List repository notifications for the authenticated user](https://docs.github.com/rest/reference/activity#list-repository-notifications-for-the-authenticated-user) endpoint and pass the query parameter `all=false`.
     *
     * @tags activity
     * @name ActivityMarkRepoNotificationsAsRead
     * @summary Mark repository notifications as read
     * @request PUT:/repos/{owner}/{repo}/notifications
     */
    activityMarkRepoNotificationsAsRead: (
      owner: string,
      repo: string,
      data: { last_read_at?: string },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/repos/${owner}/${repo}/notifications`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags repos
     * @name ReposGetPages
     * @summary Get a GitHub Pages site
     * @request GET:/repos/{owner}/{repo}/pages
     */
    reposGetPages: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<Page, BasicError>({
        path: `/repos/${owner}/${repo}/pages`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Configures a GitHub Pages site. For more information, see "[About GitHub Pages](/github/working-with-github-pages/about-github-pages)."
     *
     * @tags repos
     * @name ReposCreatePagesSite
     * @summary Create a GitHub Pages site
     * @request POST:/repos/{owner}/{repo}/pages
     */
    reposCreatePagesSite: (
      owner: string,
      repo: string,
      data: { source: { branch: string; path?: "/" | "/docs" } },
      params: RequestParams = {},
    ) =>
      this.request<Page, BasicError | { message: string; documentation_url: string } | ValidationError>({
        path: `/repos/${owner}/${repo}/pages`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Updates information for a GitHub Pages site. For more information, see "[About GitHub Pages](/github/working-with-github-pages/about-github-pages).
     *
     * @tags repos
     * @name ReposUpdateInformationAboutPagesSite
     * @summary Update information about a GitHub Pages site
     * @request PUT:/repos/{owner}/{repo}/pages
     */
    reposUpdateInformationAboutPagesSite: (
      owner: string,
      repo: string,
      data: {
        cname?: string | null;
        public?: boolean;
        source:
          | "gh-pages"
          | "master"
          | "master /docs"
          | { branch: string; path: "/" | "/docs" }
          | ("gh-pages" | "master" | ("master /docs" & { branch: string; path: "/" | "/docs" }));
      },
      params: RequestParams = {},
    ) =>
      this.request<void, BasicError | ValidationError>({
        path: `/repos/${owner}/${repo}/pages`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags repos
     * @name ReposDeletePagesSite
     * @summary Delete a GitHub Pages site
     * @request DELETE:/repos/{owner}/{repo}/pages
     */
    reposDeletePagesSite: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<void, BasicError | { message: string; documentation_url: string } | ValidationError>({
        path: `/repos/${owner}/${repo}/pages`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags repos
     * @name ReposListPagesBuilds
     * @summary List GitHub Pages builds
     * @request GET:/repos/{owner}/{repo}/pages/builds
     */
    reposListPagesBuilds: (
      owner: string,
      repo: string,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<PageBuild[], any>({
        path: `/repos/${owner}/${repo}/pages/builds`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description You can request that your site be built from the latest revision on the default branch. This has the same effect as pushing a commit to your default branch, but does not require an additional commit. Manually triggering page builds can be helpful when diagnosing build warnings and failures. Build requests are limited to one concurrent build per repository and one concurrent build per requester. If you request a build while another is still in progress, the second request will be queued until the first completes.
     *
     * @tags repos
     * @name ReposRequestPagesBuild
     * @summary Request a GitHub Pages build
     * @request POST:/repos/{owner}/{repo}/pages/builds
     */
    reposRequestPagesBuild: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<PageBuildStatus, any>({
        path: `/repos/${owner}/${repo}/pages/builds`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags repos
     * @name ReposGetLatestPagesBuild
     * @summary Get latest Pages build
     * @request GET:/repos/{owner}/{repo}/pages/builds/latest
     */
    reposGetLatestPagesBuild: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<PageBuild, any>({
        path: `/repos/${owner}/${repo}/pages/builds/latest`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags repos
     * @name ReposGetPagesBuild
     * @summary Get GitHub Pages build
     * @request GET:/repos/{owner}/{repo}/pages/builds/{build_id}
     */
    reposGetPagesBuild: (owner: string, repo: string, buildId: number, params: RequestParams = {}) =>
      this.request<PageBuild, any>({
        path: `/repos/${owner}/${repo}/pages/builds/${buildId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Lists the projects in a repository. Returns a `404 Not Found` status if projects are disabled in the repository. If you do not have sufficient privileges to perform this action, a `401 Unauthorized` or `410 Gone` status is returned.
     *
     * @tags projects
     * @name ProjectsListForRepo
     * @summary List repository projects
     * @request GET:/repos/{owner}/{repo}/projects
     */
    projectsListForRepo: (
      owner: string,
      repo: string,
      query?: { state?: "open" | "closed" | "all"; per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<Project[], BasicError | ValidationErrorSimple>({
        path: `/repos/${owner}/${repo}/projects`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Creates a repository project board. Returns a `404 Not Found` status if projects are disabled in the repository. If you do not have sufficient privileges to perform this action, a `401 Unauthorized` or `410 Gone` status is returned.
     *
     * @tags projects
     * @name ProjectsCreateForRepo
     * @summary Create a repository project
     * @request POST:/repos/{owner}/{repo}/projects
     */
    projectsCreateForRepo: (
      owner: string,
      repo: string,
      data: { name: string; body?: string },
      params: RequestParams = {},
    ) =>
      this.request<Project, BasicError | ValidationErrorSimple>({
        path: `/repos/${owner}/${repo}/projects`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Draft pull requests are available in public repositories with GitHub Free and GitHub Free for organizations, GitHub Pro, and legacy per-repository billing plans, and in public and private repositories with GitHub Team and GitHub Enterprise Cloud. For more information, see [GitHub's products](https://help.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation.
     *
     * @tags pulls
     * @name PullsList
     * @summary List pull requests
     * @request GET:/repos/{owner}/{repo}/pulls
     */
    pullsList: (
      owner: string,
      repo: string,
      query?: {
        state?: "open" | "closed" | "all";
        head?: string;
        base?: string;
        sort?: "created" | "updated" | "popularity" | "long-running";
        direction?: "asc" | "desc";
        per_page?: number;
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PullRequestSimple[], ValidationError>({
        path: `/repos/${owner}/${repo}/pulls`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Draft pull requests are available in public repositories with GitHub Free and GitHub Free for organizations, GitHub Pro, and legacy per-repository billing plans, and in public and private repositories with GitHub Team and GitHub Enterprise Cloud. For more information, see [GitHub's products](https://help.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation. To open or update a pull request in a public repository, you must have write access to the head or the source branch. For organization-owned repositories, you must be a member of the organization that owns the repository to open or update a pull request. You can create a new pull request. This endpoint triggers [notifications](https://docs.github.com/en/github/managing-subscriptions-and-notifications-on-github/about-notifications). Creating content too quickly using this endpoint may result in abuse rate limiting. See "[Abuse rate limits](https://docs.github.com/rest/overview/resources-in-the-rest-api#abuse-rate-limits)" and "[Dealing with abuse rate limits](https://docs.github.com/rest/guides/best-practices-for-integrators#dealing-with-rate-limits)" for details.
     *
     * @tags pulls
     * @name PullsCreate
     * @summary Create a pull request
     * @request POST:/repos/{owner}/{repo}/pulls
     */
    pullsCreate: (
      owner: string,
      repo: string,
      data: {
        title?: string;
        head: string;
        base: string;
        body?: string;
        maintainer_can_modify?: boolean;
        draft?: boolean;
        issue?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PullRequest, BasicError | ValidationError>({
        path: `/repos/${owner}/${repo}/pulls`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Lists review comments for all pull requests in a repository. By default, review comments are in ascending order by ID.
     *
     * @tags pulls
     * @name PullsListReviewCommentsForRepo
     * @summary List review comments in a repository
     * @request GET:/repos/{owner}/{repo}/pulls/comments
     */
    pullsListReviewCommentsForRepo: (
      owner: string,
      repo: string,
      query?: {
        sort?: "created" | "updated";
        direction?: "asc" | "desc";
        since?: string;
        per_page?: number;
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PullRequestReviewComment[], any>({
        path: `/repos/${owner}/${repo}/pulls/comments`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Provides details for a review comment.
     *
     * @tags pulls
     * @name PullsGetReviewComment
     * @summary Get a review comment for a pull request
     * @request GET:/repos/{owner}/{repo}/pulls/comments/{comment_id}
     */
    pullsGetReviewComment: (owner: string, repo: string, commentId: number, params: RequestParams = {}) =>
      this.request<PullRequestReviewComment, BasicError>({
        path: `/repos/${owner}/${repo}/pulls/comments/${commentId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Enables you to edit a review comment.
     *
     * @tags pulls
     * @name PullsUpdateReviewComment
     * @summary Update a review comment for a pull request
     * @request PATCH:/repos/{owner}/{repo}/pulls/comments/{comment_id}
     */
    pullsUpdateReviewComment: (
      owner: string,
      repo: string,
      commentId: number,
      data: { body: string },
      params: RequestParams = {},
    ) =>
      this.request<PullRequestReviewComment, any>({
        path: `/repos/${owner}/${repo}/pulls/comments/${commentId}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Deletes a review comment.
     *
     * @tags pulls
     * @name PullsDeleteReviewComment
     * @summary Delete a review comment for a pull request
     * @request DELETE:/repos/{owner}/{repo}/pulls/comments/{comment_id}
     */
    pullsDeleteReviewComment: (owner: string, repo: string, commentId: number, params: RequestParams = {}) =>
      this.request<void, BasicError>({
        path: `/repos/${owner}/${repo}/pulls/comments/${commentId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description List the reactions to a [pull request review comment](https://docs.github.com/rest/reference/pulls#review-comments).
     *
     * @tags reactions
     * @name ReactionsListForPullRequestReviewComment
     * @summary List reactions for a pull request review comment
     * @request GET:/repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions
     */
    reactionsListForPullRequestReviewComment: (
      owner: string,
      repo: string,
      commentId: number,
      query?: {
        content?: "+1" | "-1" | "laugh" | "confused" | "heart" | "hooray" | "rocket" | "eyes";
        per_page?: number;
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<Reaction[], BasicError | { message: string; documentation_url: string }>({
        path: `/repos/${owner}/${repo}/pulls/comments/${commentId}/reactions`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a reaction to a [pull request review comment](https://docs.github.com/rest/reference/pulls#comments). A response with a `Status: 200 OK` means that you already added the reaction type to this pull request review comment.
     *
     * @tags reactions
     * @name ReactionsCreateForPullRequestReviewComment
     * @summary Create reaction for a pull request review comment
     * @request POST:/repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions
     */
    reactionsCreateForPullRequestReviewComment: (
      owner: string,
      repo: string,
      commentId: number,
      data: { content: "+1" | "-1" | "laugh" | "confused" | "heart" | "hooray" | "rocket" | "eyes" },
      params: RequestParams = {},
    ) =>
      this.request<Reaction, { message: string; documentation_url: string } | ValidationError>({
        path: `/repos/${owner}/${repo}/pulls/comments/${commentId}/reactions`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description **Note:** You can also specify a repository by `repository_id` using the route `DELETE /repositories/:repository_id/pulls/comments/:comment_id/reactions/:reaction_id.` Delete a reaction to a [pull request review comment](https://docs.github.com/rest/reference/pulls#review-comments).
     *
     * @tags reactions
     * @name ReactionsDeleteForPullRequestComment
     * @summary Delete a pull request comment reaction
     * @request DELETE:/repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions/{reaction_id}
     */
    reactionsDeleteForPullRequestComment: (
      owner: string,
      repo: string,
      commentId: number,
      reactionId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/repos/${owner}/${repo}/pulls/comments/${commentId}/reactions/${reactionId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Draft pull requests are available in public repositories with GitHub Free and GitHub Free for organizations, GitHub Pro, and legacy per-repository billing plans, and in public and private repositories with GitHub Team and GitHub Enterprise Cloud. For more information, see [GitHub's products](https://help.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation. Lists details of a pull request by providing its number. When you get, [create](https://docs.github.com/rest/reference/pulls/#create-a-pull-request), or [edit](https://docs.github.com/rest/reference/pulls#update-a-pull-request) a pull request, GitHub creates a merge commit to test whether the pull request can be automatically merged into the base branch. This test commit is not added to the base branch or the head branch. You can review the status of the test commit using the `mergeable` key. For more information, see "[Checking mergeability of pull requests](https://docs.github.com/rest/guides/getting-started-with-the-git-database-api#checking-mergeability-of-pull-requests)". The value of the `mergeable` attribute can be `true`, `false`, or `null`. If the value is `null`, then GitHub has started a background job to compute the mergeability. After giving the job time to complete, resubmit the request. When the job finishes, you will see a non-`null` value for the `mergeable` attribute in the response. If `mergeable` is `true`, then `merge_commit_sha` will be the SHA of the _test_ merge commit. The value of the `merge_commit_sha` attribute changes depending on the state of the pull request. Before merging a pull request, the `merge_commit_sha` attribute holds the SHA of the _test_ merge commit. After merging a pull request, the `merge_commit_sha` attribute changes depending on how you merged the pull request: *   If merged as a [merge commit](https://help.github.com/articles/about-merge-methods-on-github/), `merge_commit_sha` represents the SHA of the merge commit. *   If merged via a [squash](https://help.github.com/articles/about-merge-methods-on-github/#squashing-your-merge-commits), `merge_commit_sha` represents the SHA of the squashed commit on the base branch. *   If [rebased](https://help.github.com/articles/about-merge-methods-on-github/#rebasing-and-merging-your-commits), `merge_commit_sha` represents the commit that the base branch was updated to. Pass the appropriate [media type](https://docs.github.com/rest/overview/media-types/#commits-commit-comparison-and-pull-requests) to fetch diff and patch formats.
     *
     * @tags pulls
     * @name PullsGet
     * @summary Get a pull request
     * @request GET:/repos/{owner}/{repo}/pulls/{pull_number}
     */
    pullsGet: (owner: string, repo: string, pullNumber: number, params: RequestParams = {}) =>
      this.request<PullRequest, BasicError>({
        path: `/repos/${owner}/${repo}/pulls/${pullNumber}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Draft pull requests are available in public repositories with GitHub Free and GitHub Free for organizations, GitHub Pro, and legacy per-repository billing plans, and in public and private repositories with GitHub Team and GitHub Enterprise Cloud. For more information, see [GitHub's products](https://help.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation. To open or update a pull request in a public repository, you must have write access to the head or the source branch. For organization-owned repositories, you must be a member of the organization that owns the repository to open or update a pull request.
     *
     * @tags pulls
     * @name PullsUpdate
     * @summary Update a pull request
     * @request PATCH:/repos/{owner}/{repo}/pulls/{pull_number}
     */
    pullsUpdate: (
      owner: string,
      repo: string,
      pullNumber: number,
      data: {
        title?: string;
        body?: string;
        state?: "open" | "closed";
        base?: string;
        maintainer_can_modify?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<PullRequest, BasicError | ValidationError>({
        path: `/repos/${owner}/${repo}/pulls/${pullNumber}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Lists all review comments for a pull request. By default, review comments are in ascending order by ID.
     *
     * @tags pulls
     * @name PullsListReviewComments
     * @summary List review comments on a pull request
     * @request GET:/repos/{owner}/{repo}/pulls/{pull_number}/comments
     */
    pullsListReviewComments: (
      owner: string,
      repo: string,
      pullNumber: number,
      query?: {
        sort?: "created" | "updated";
        direction?: "asc" | "desc";
        since?: string;
        per_page?: number;
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PullRequestReviewComment[], any>({
        path: `/repos/${owner}/${repo}/pulls/${pullNumber}/comments`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Creates a review comment in the pull request diff. To add a regular comment to a pull request timeline, see "[Create an issue comment](https://docs.github.com/rest/reference/issues#create-an-issue-comment)." We recommend creating a review comment using `line`, `side`, and optionally `start_line` and `start_side` if your comment applies to more than one line in the pull request diff. You can still create a review comment using the `position` parameter. When you use `position`, the `line`, `side`, `start_line`, and `start_side` parameters are not required. For more information, see the [`comfort-fade` preview notice](https://docs.github.com/rest/reference/pulls#create-a-review-comment-for-a-pull-request-preview-notices). **Note:** The position value equals the number of lines down from the first "@@" hunk header in the file you want to add a comment. The line just below the "@@" line is position 1, the next line is position 2, and so on. The position in the diff continues to increase through lines of whitespace and additional hunks until the beginning of a new file. This endpoint triggers [notifications](https://docs.github.com/en/github/managing-subscriptions-and-notifications-on-github/about-notifications). Creating content too quickly using this endpoint may result in abuse rate limiting. See "[Abuse rate limits](https://docs.github.com/rest/overview/resources-in-the-rest-api#abuse-rate-limits)" and "[Dealing with abuse rate limits](https://docs.github.com/rest/guides/best-practices-for-integrators#dealing-with-rate-limits)" for details.
     *
     * @tags pulls
     * @name PullsCreateReviewComment
     * @summary Create a review comment for a pull request
     * @request POST:/repos/{owner}/{repo}/pulls/{pull_number}/comments
     */
    pullsCreateReviewComment: (
      owner: string,
      repo: string,
      pullNumber: number,
      data: {
        body: string;
        commit_id?: string;
        path: string;
        position?: number;
        side?: "LEFT" | "RIGHT";
        line?: number;
        start_line?: number;
        start_side?: "LEFT" | "RIGHT" | "side";
        in_reply_to?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PullRequestReviewComment, BasicError | ValidationError>({
        path: `/repos/${owner}/${repo}/pulls/${pullNumber}/comments`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Creates a reply to a review comment for a pull request. For the `comment_id`, provide the ID of the review comment you are replying to. This must be the ID of a _top-level review comment_, not a reply to that comment. Replies to replies are not supported. This endpoint triggers [notifications](https://docs.github.com/en/github/managing-subscriptions-and-notifications-on-github/about-notifications). Creating content too quickly using this endpoint may result in abuse rate limiting. See "[Abuse rate limits](https://docs.github.com/rest/overview/resources-in-the-rest-api#abuse-rate-limits)" and "[Dealing with abuse rate limits](https://docs.github.com/rest/guides/best-practices-for-integrators#dealing-with-rate-limits)" for details.
     *
     * @tags pulls
     * @name PullsCreateReplyForReviewComment
     * @summary Create a reply for a review comment
     * @request POST:/repos/{owner}/{repo}/pulls/{pull_number}/comments/{comment_id}/replies
     */
    pullsCreateReplyForReviewComment: (
      owner: string,
      repo: string,
      pullNumber: number,
      commentId: number,
      data: { body: string },
      params: RequestParams = {},
    ) =>
      this.request<PullRequestReviewComment, BasicError>({
        path: `/repos/${owner}/${repo}/pulls/${pullNumber}/comments/${commentId}/replies`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Lists a maximum of 250 commits for a pull request. To receive a complete commit list for pull requests with more than 250 commits, use the [List commits](https://docs.github.com/rest/reference/repos#list-commits) endpoint.
     *
     * @tags pulls
     * @name PullsListCommits
     * @summary List commits on a pull request
     * @request GET:/repos/{owner}/{repo}/pulls/{pull_number}/commits
     */
    pullsListCommits: (
      owner: string,
      repo: string,
      pullNumber: number,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<Commit[], any>({
        path: `/repos/${owner}/${repo}/pulls/${pullNumber}/commits`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description **Note:** Responses include a maximum of 3000 files. The paginated response returns 30 files per page by default.
     *
     * @tags pulls
     * @name PullsListFiles
     * @summary List pull requests files
     * @request GET:/repos/{owner}/{repo}/pulls/{pull_number}/files
     */
    pullsListFiles: (
      owner: string,
      repo: string,
      pullNumber: number,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<DiffEntry[], ValidationError | BasicError>({
        path: `/repos/${owner}/${repo}/pulls/${pullNumber}/files`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags pulls
     * @name PullsCheckIfMerged
     * @summary Check if a pull request has been merged
     * @request GET:/repos/{owner}/{repo}/pulls/{pull_number}/merge
     */
    pullsCheckIfMerged: (owner: string, repo: string, pullNumber: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/repos/${owner}/${repo}/pulls/${pullNumber}/merge`,
        method: "GET",
        ...params,
      }),

    /**
     * @description This endpoint triggers [notifications](https://docs.github.com/github/managing-subscriptions-and-notifications-on-github/about-notifications). Creating content too quickly using this endpoint may result in abuse rate limiting. See "[Abuse rate limits](https://docs.github.com/rest/overview/resources-in-the-rest-api#abuse-rate-limits)" and "[Dealing with abuse rate limits](https://docs.github.com/rest/guides/best-practices-for-integrators#dealing-with-abuse-rate-limits)" for details.
     *
     * @tags pulls
     * @name PullsMerge
     * @summary Merge a pull request
     * @request PUT:/repos/{owner}/{repo}/pulls/{pull_number}/merge
     */
    pullsMerge: (
      owner: string,
      repo: string,
      pullNumber: number,
      data: {
        commit_title?: string;
        commit_message?: string;
        sha?: string;
        merge_method?: "merge" | "squash" | "rebase";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        PullRequestMergeResult,
        BasicError | { message?: string; documentation_url?: string } | ValidationError
      >({
        path: `/repos/${owner}/${repo}/pulls/${pullNumber}/merge`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags pulls
     * @name PullsListRequestedReviewers
     * @summary List requested reviewers for a pull request
     * @request GET:/repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers
     */
    pullsListRequestedReviewers: (
      owner: string,
      repo: string,
      pullNumber: number,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<PullRequestReviewRequest, any>({
        path: `/repos/${owner}/${repo}/pulls/${pullNumber}/requested_reviewers`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description This endpoint triggers [notifications](https://docs.github.com/github/managing-subscriptions-and-notifications-on-github/about-notifications). Creating content too quickly using this endpoint may result in abuse rate limiting. See "[Abuse rate limits](https://docs.github.com/rest/overview/resources-in-the-rest-api#abuse-rate-limits)" and "[Dealing with abuse rate limits](https://docs.github.com/rest/guides/best-practices-for-integrators#dealing-with-abuse-rate-limits)" for details.
     *
     * @tags pulls
     * @name PullsRequestReviewers
     * @summary Request reviewers for a pull request
     * @request POST:/repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers
     */
    pullsRequestReviewers: (
      owner: string,
      repo: string,
      pullNumber: number,
      data: { reviewers?: string[]; team_reviewers?: string[] },
      params: RequestParams = {},
    ) =>
      this.request<PullRequestSimple, BasicError | void>({
        path: `/repos/${owner}/${repo}/pulls/${pullNumber}/requested_reviewers`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags pulls
     * @name PullsRemoveRequestedReviewers
     * @summary Remove requested reviewers from a pull request
     * @request DELETE:/repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers
     */
    pullsRemoveRequestedReviewers: (
      owner: string,
      repo: string,
      pullNumber: number,
      data: { reviewers?: string[]; team_reviewers?: string[] },
      params: RequestParams = {},
    ) =>
      this.request<void, ValidationError>({
        path: `/repos/${owner}/${repo}/pulls/${pullNumber}/requested_reviewers`,
        method: "DELETE",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description The list of reviews returns in chronological order.
     *
     * @tags pulls
     * @name PullsListReviews
     * @summary List reviews for a pull request
     * @request GET:/repos/{owner}/{repo}/pulls/{pull_number}/reviews
     */
    pullsListReviews: (
      owner: string,
      repo: string,
      pullNumber: number,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<PullRequestReview[], any>({
        path: `/repos/${owner}/${repo}/pulls/${pullNumber}/reviews`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description This endpoint triggers [notifications](https://docs.github.com/en/github/managing-subscriptions-and-notifications-on-github/about-notifications). Creating content too quickly using this endpoint may result in abuse rate limiting. See "[Abuse rate limits](https://docs.github.com/rest/overview/resources-in-the-rest-api#abuse-rate-limits)" and "[Dealing with abuse rate limits](https://docs.github.com/rest/guides/best-practices-for-integrators#dealing-with-rate-limits)" for details. Pull request reviews created in the `PENDING` state do not include the `submitted_at` property in the response. **Note:** To comment on a specific line in a file, you need to first determine the _position_ of that line in the diff. The GitHub REST API v3 offers the `application/vnd.github.v3.diff` [media type](https://docs.github.com/rest/overview/media-types#commits-commit-comparison-and-pull-requests). To see a pull request diff, add this media type to the `Accept` header of a call to the [single pull request](https://docs.github.com/rest/reference/pulls#get-a-pull-request) endpoint. The `position` value equals the number of lines down from the first "@@" hunk header in the file you want to add a comment. The line just below the "@@" line is position 1, the next line is position 2, and so on. The position in the diff continues to increase through lines of whitespace and additional hunks until the beginning of a new file.
     *
     * @tags pulls
     * @name PullsCreateReview
     * @summary Create a review for a pull request
     * @request POST:/repos/{owner}/{repo}/pulls/{pull_number}/reviews
     */
    pullsCreateReview: (
      owner: string,
      repo: string,
      pullNumber: number,
      data: {
        commit_id?: string;
        body?: string;
        event?: "APPROVE" | "REQUEST_CHANGES" | "COMMENT";
        comments?: {
          path: string;
          position?: number;
          body: string;
          line?: number;
          side?: string;
          start_line?: number;
          start_side?: string;
        }[];
      },
      params: RequestParams = {},
    ) =>
      this.request<PullRequestReview, BasicError | ValidationErrorSimple>({
        path: `/repos/${owner}/${repo}/pulls/${pullNumber}/reviews`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags pulls
     * @name PullsGetReview
     * @summary Get a review for a pull request
     * @request GET:/repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}
     */
    pullsGetReview: (owner: string, repo: string, pullNumber: number, reviewId: number, params: RequestParams = {}) =>
      this.request<PullRequestReview, BasicError>({
        path: `/repos/${owner}/${repo}/pulls/${pullNumber}/reviews/${reviewId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Update the review summary comment with new text.
     *
     * @tags pulls
     * @name PullsUpdateReview
     * @summary Update a review for a pull request
     * @request PUT:/repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}
     */
    pullsUpdateReview: (
      owner: string,
      repo: string,
      pullNumber: number,
      reviewId: number,
      data: { body: string },
      params: RequestParams = {},
    ) =>
      this.request<PullRequestReview, ValidationErrorSimple>({
        path: `/repos/${owner}/${repo}/pulls/${pullNumber}/reviews/${reviewId}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags pulls
     * @name PullsDeletePendingReview
     * @summary Delete a pending review for a pull request
     * @request DELETE:/repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}
     */
    pullsDeletePendingReview: (
      owner: string,
      repo: string,
      pullNumber: number,
      reviewId: number,
      params: RequestParams = {},
    ) =>
      this.request<PullRequestReview, BasicError | ValidationErrorSimple>({
        path: `/repos/${owner}/${repo}/pulls/${pullNumber}/reviews/${reviewId}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * @description List comments for a specific pull request review.
     *
     * @tags pulls
     * @name PullsListCommentsForReview
     * @summary List comments for a pull request review
     * @request GET:/repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/comments
     */
    pullsListCommentsForReview: (
      owner: string,
      repo: string,
      pullNumber: number,
      reviewId: number,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<ReviewComment[], BasicError>({
        path: `/repos/${owner}/${repo}/pulls/${pullNumber}/reviews/${reviewId}/comments`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description **Note:** To dismiss a pull request review on a [protected branch](https://docs.github.com/rest/reference/repos#branches), you must be a repository administrator or be included in the list of people or teams who can dismiss pull request reviews.
     *
     * @tags pulls
     * @name PullsDismissReview
     * @summary Dismiss a review for a pull request
     * @request PUT:/repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/dismissals
     */
    pullsDismissReview: (
      owner: string,
      repo: string,
      pullNumber: number,
      reviewId: number,
      data: { message: string; event?: string },
      params: RequestParams = {},
    ) =>
      this.request<PullRequestReview, BasicError | ValidationErrorSimple>({
        path: `/repos/${owner}/${repo}/pulls/${pullNumber}/reviews/${reviewId}/dismissals`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags pulls
     * @name PullsSubmitReview
     * @summary Submit a review for a pull request
     * @request POST:/repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/events
     */
    pullsSubmitReview: (
      owner: string,
      repo: string,
      pullNumber: number,
      reviewId: number,
      data: { body?: string; event: "APPROVE" | "REQUEST_CHANGES" | "COMMENT" },
      params: RequestParams = {},
    ) =>
      this.request<PullRequestReview, BasicError | ValidationErrorSimple>({
        path: `/repos/${owner}/${repo}/pulls/${pullNumber}/reviews/${reviewId}/events`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Updates the pull request branch with the latest upstream changes by merging HEAD from the base branch into the pull request branch.
     *
     * @tags pulls
     * @name PullsUpdateBranch
     * @summary Update a pull request branch
     * @request PUT:/repos/{owner}/{repo}/pulls/{pull_number}/update-branch
     */
    pullsUpdateBranch: (
      owner: string,
      repo: string,
      pullNumber: number,
      data: { expected_head_sha?: string },
      params: RequestParams = {},
    ) =>
      this.request<
        { message?: string; url?: string },
        BasicError | { message: string; documentation_url: string } | ValidationError
      >({
        path: `/repos/${owner}/${repo}/pulls/${pullNumber}/update-branch`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets the preferred README for a repository. READMEs support [custom media types](https://docs.github.com/rest/reference/repos#custom-media-types) for retrieving the raw content or rendered HTML.
     *
     * @tags repos
     * @name ReposGetReadme
     * @summary Get a repository README
     * @request GET:/repos/{owner}/{repo}/readme
     */
    reposGetReadme: (owner: string, repo: string, query?: { ref?: string }, params: RequestParams = {}) =>
      this.request<ContentFile, BasicError | ValidationError>({
        path: `/repos/${owner}/${repo}/readme`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description This returns a list of releases, which does not include regular Git tags that have not been associated with a release. To get a list of Git tags, use the [Repository Tags API](https://docs.github.com/rest/reference/repos#list-repository-tags). Information about published releases are available to everyone. Only users with push access will receive listings for draft releases.
     *
     * @tags repos
     * @name ReposListReleases
     * @summary List releases
     * @request GET:/repos/{owner}/{repo}/releases
     */
    reposListReleases: (
      owner: string,
      repo: string,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<Release[], BasicError>({
        path: `/repos/${owner}/${repo}/releases`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Users with push access to the repository can create a release. This endpoint triggers [notifications](https://docs.github.com/en/github/managing-subscriptions-and-notifications-on-github/about-notifications). Creating content too quickly using this endpoint may result in abuse rate limiting. See "[Abuse rate limits](https://docs.github.com/rest/overview/resources-in-the-rest-api#abuse-rate-limits)" and "[Dealing with abuse rate limits](https://docs.github.com/rest/guides/best-practices-for-integrators#dealing-with-rate-limits)" for details.
     *
     * @tags repos
     * @name ReposCreateRelease
     * @summary Create a release
     * @request POST:/repos/{owner}/{repo}/releases
     */
    reposCreateRelease: (
      owner: string,
      repo: string,
      data: {
        tag_name: string;
        target_commitish?: string;
        name?: string;
        body?: string;
        draft?: boolean;
        prerelease?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<Release, ValidationError>({
        path: `/repos/${owner}/${repo}/releases`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description To download the asset's binary content, set the `Accept` header of the request to [`application/octet-stream`](https://docs.github.com/rest/overview/media-types). The API will either redirect the client to the location, or stream it directly if possible. API clients should handle both a `200` or `302` response.
     *
     * @tags repos
     * @name ReposGetReleaseAsset
     * @summary Get a release asset
     * @request GET:/repos/{owner}/{repo}/releases/assets/{asset_id}
     */
    reposGetReleaseAsset: (owner: string, repo: string, assetId: number, params: RequestParams = {}) =>
      this.request<ReleaseAsset, BasicError | { message: string; documentation_url: string }>({
        path: `/repos/${owner}/${repo}/releases/assets/${assetId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Users with push access to the repository can edit a release asset.
     *
     * @tags repos
     * @name ReposUpdateReleaseAsset
     * @summary Update a release asset
     * @request PATCH:/repos/{owner}/{repo}/releases/assets/{asset_id}
     */
    reposUpdateReleaseAsset: (
      owner: string,
      repo: string,
      assetId: number,
      data: { name?: string; label?: string; state?: string },
      params: RequestParams = {},
    ) =>
      this.request<ReleaseAsset, any>({
        path: `/repos/${owner}/${repo}/releases/assets/${assetId}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags repos
     * @name ReposDeleteReleaseAsset
     * @summary Delete a release asset
     * @request DELETE:/repos/{owner}/{repo}/releases/assets/{asset_id}
     */
    reposDeleteReleaseAsset: (owner: string, repo: string, assetId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/repos/${owner}/${repo}/releases/assets/${assetId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description View the latest published full release for the repository. The latest release is the most recent non-prerelease, non-draft release, sorted by the `created_at` attribute. The `created_at` attribute is the date of the commit used for the release, and not the date when the release was drafted or published.
     *
     * @tags repos
     * @name ReposGetLatestRelease
     * @summary Get the latest release
     * @request GET:/repos/{owner}/{repo}/releases/latest
     */
    reposGetLatestRelease: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<Release, any>({
        path: `/repos/${owner}/${repo}/releases/latest`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get a published release with the specified tag.
     *
     * @tags repos
     * @name ReposGetReleaseByTag
     * @summary Get a release by tag name
     * @request GET:/repos/{owner}/{repo}/releases/tags/{tag}
     */
    reposGetReleaseByTag: (owner: string, repo: string, tag: string, params: RequestParams = {}) =>
      this.request<Release, BasicError>({
        path: `/repos/${owner}/${repo}/releases/tags/${tag}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description **Note:** This returns an `upload_url` key corresponding to the endpoint for uploading release assets. This key is a [hypermedia resource](https://docs.github.com/rest/overview/resources-in-the-rest-api#hypermedia).
     *
     * @tags repos
     * @name ReposGetRelease
     * @summary Get a release
     * @request GET:/repos/{owner}/{repo}/releases/{release_id}
     */
    reposGetRelease: (owner: string, repo: string, releaseId: number, params: RequestParams = {}) =>
      this.request<Release, BasicError>({
        path: `/repos/${owner}/${repo}/releases/${releaseId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Users with push access to the repository can edit a release.
     *
     * @tags repos
     * @name ReposUpdateRelease
     * @summary Update a release
     * @request PATCH:/repos/{owner}/{repo}/releases/{release_id}
     */
    reposUpdateRelease: (
      owner: string,
      repo: string,
      releaseId: number,
      data: {
        tag_name?: string;
        target_commitish?: string;
        name?: string;
        body?: string;
        draft?: boolean;
        prerelease?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<Release, any>({
        path: `/repos/${owner}/${repo}/releases/${releaseId}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Users with push access to the repository can delete a release.
     *
     * @tags repos
     * @name ReposDeleteRelease
     * @summary Delete a release
     * @request DELETE:/repos/{owner}/{repo}/releases/{release_id}
     */
    reposDeleteRelease: (owner: string, repo: string, releaseId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/repos/${owner}/${repo}/releases/${releaseId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags repos
     * @name ReposListReleaseAssets
     * @summary List release assets
     * @request GET:/repos/{owner}/{repo}/releases/{release_id}/assets
     */
    reposListReleaseAssets: (
      owner: string,
      repo: string,
      releaseId: number,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<ReleaseAsset[], any>({
        path: `/repos/${owner}/${repo}/releases/${releaseId}/assets`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description This endpoint makes use of [a Hypermedia relation](https://docs.github.com/rest/overview/resources-in-the-rest-api#hypermedia) to determine which URL to access. The endpoint you call to upload release assets is specific to your release. Use the `upload_url` returned in the response of the [Create a release endpoint](https://docs.github.com/rest/reference/repos#create-a-release) to upload a release asset. You need to use an HTTP client which supports [SNI](http://en.wikipedia.org/wiki/Server_Name_Indication) to make calls to this endpoint. Most libraries will set the required `Content-Length` header automatically. Use the required `Content-Type` header to provide the media type of the asset. For a list of media types, see [Media Types](https://www.iana.org/assignments/media-types/media-types.xhtml). For example: `application/zip` GitHub expects the asset data in its raw binary form, rather than JSON. You will send the raw binary content of the asset as the request body. Everything else about the endpoint is the same as the rest of the API. For example, you'll still need to pass your authentication to be able to upload an asset. When an upstream failure occurs, you will receive a `502 Bad Gateway` status. This may leave an empty asset with a state of `starter`. It can be safely deleted. **Notes:** *   GitHub renames asset filenames that have special characters, non-alphanumeric characters, and leading or trailing periods. The "[List assets for a release](https://docs.github.com/rest/reference/repos#list-assets-for-a-release)" endpoint lists the renamed filenames. For more information and help, contact [GitHub Support](https://support.github.com/contact). *   If you upload an asset with the same filename as another uploaded asset, you'll receive an error and must delete the old file before you can re-upload the new asset.
     *
     * @tags repos
     * @name ReposUploadReleaseAsset
     * @summary Upload a release asset
     * @request POST:/repos/{owner}/{repo}/releases/{release_id}/assets
     */
    reposUploadReleaseAsset: (
      owner: string,
      repo: string,
      releaseId: number,
      data: WebhookConfigUrl,
      query?: { name?: string; label?: string },
      params: RequestParams = {},
    ) =>
      this.request<ReleaseAsset, any>({
        path: `/repos/${owner}/${repo}/releases/${releaseId}/assets`,
        method: "POST",
        query: query,
        body: data,
        format: "json",
        ...params,
      }),

    /**
     * @description Lists all secret scanning alerts for a private repository, from newest to oldest. To use this endpoint, you must be an administrator for the repository or organization, and you must use an access token with the `repo` scope or `security_events` scope. GitHub Apps must have the `secret_scanning_alerts` read permission to use this endpoint.
     *
     * @tags secret-scanning
     * @name SecretScanningListAlertsForRepo
     * @summary List secret scanning alerts for a repository
     * @request GET:/repos/{owner}/{repo}/secret-scanning/alerts
     */
    secretScanningListAlertsForRepo: (
      owner: string,
      repo: string,
      query?: { state?: "open" | "resolved"; page?: number; per_page?: number },
      params: RequestParams = {},
    ) =>
      this.request<SecretScanningAlert[], void | { code?: string; message?: string; documentation_url?: string }>({
        path: `/repos/${owner}/${repo}/secret-scanning/alerts`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets a single secret scanning alert detected in a private repository. To use this endpoint, you must be an administrator for the repository or organization, and you must use an access token with the `repo` scope or `security_events` scope. GitHub Apps must have the `secret_scanning_alerts` read permission to use this endpoint.
     *
     * @tags secret-scanning
     * @name SecretScanningGetAlert
     * @summary Get a secret scanning alert
     * @request GET:/repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}
     */
    secretScanningGetAlert: (owner: string, repo: string, alertNumber: AlertNumber, params: RequestParams = {}) =>
      this.request<SecretScanningAlert, void | { code?: string; message?: string; documentation_url?: string }>({
        path: `/repos/${owner}/${repo}/secret-scanning/alerts/${alertNumber}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Updates the status of a secret scanning alert in a private repository. To use this endpoint, you must be an administrator for the repository or organization, and you must use an access token with the `repo` scope or `security_events` scope. GitHub Apps must have the `secret_scanning_alerts` write permission to use this endpoint.
     *
     * @tags secret-scanning
     * @name SecretScanningUpdateAlert
     * @summary Update a secret scanning alert
     * @request PATCH:/repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}
     */
    secretScanningUpdateAlert: (
      owner: string,
      repo: string,
      alertNumber: AlertNumber,
      data: { state: SecretScanningAlertState; resolution?: SecretScanningAlertResolution },
      params: RequestParams = {},
    ) =>
      this.request<SecretScanningAlert, void | { code?: string; message?: string; documentation_url?: string }>({
        path: `/repos/${owner}/${repo}/secret-scanning/alerts/${alertNumber}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Lists the people that have starred the repository. You can also find out _when_ stars were created by passing the following custom [media type](https://docs.github.com/rest/overview/media-types/) via the `Accept` header:
     *
     * @tags activity
     * @name ActivityListStargazersForRepo
     * @summary List stargazers
     * @request GET:/repos/{owner}/{repo}/stargazers
     */
    activityListStargazersForRepo: (
      owner: string,
      repo: string,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<SimpleUser[], ValidationError>({
        path: `/repos/${owner}/${repo}/stargazers`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a weekly aggregate of the number of additions and deletions pushed to a repository.
     *
     * @tags repos
     * @name ReposGetCodeFrequencyStats
     * @summary Get the weekly commit activity
     * @request GET:/repos/{owner}/{repo}/stats/code_frequency
     */
    reposGetCodeFrequencyStats: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<CodeFrequencyStat[], any>({
        path: `/repos/${owner}/${repo}/stats/code_frequency`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Returns the last year of commit activity grouped by week. The `days` array is a group of commits per day, starting on `Sunday`.
     *
     * @tags repos
     * @name ReposGetCommitActivityStats
     * @summary Get the last year of commit activity
     * @request GET:/repos/{owner}/{repo}/stats/commit_activity
     */
    reposGetCommitActivityStats: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<CommitActivity[], any>({
        path: `/repos/${owner}/${repo}/stats/commit_activity`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Returns the `total` number of commits authored by the contributor. In addition, the response includes a Weekly Hash (`weeks` array) with the following information: *   `w` - Start of the week, given as a [Unix timestamp](http://en.wikipedia.org/wiki/Unix_time). *   `a` - Number of additions *   `d` - Number of deletions *   `c` - Number of commits
     *
     * @tags repos
     * @name ReposGetContributorsStats
     * @summary Get all contributor commit activity
     * @request GET:/repos/{owner}/{repo}/stats/contributors
     */
    reposGetContributorsStats: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<ContributorActivity[], any>({
        path: `/repos/${owner}/${repo}/stats/contributors`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Returns the total commit counts for the `owner` and total commit counts in `all`. `all` is everyone combined, including the `owner` in the last 52 weeks. If you'd like to get the commit counts for non-owners, you can subtract `owner` from `all`. The array order is oldest week (index 0) to most recent week.
     *
     * @tags repos
     * @name ReposGetParticipationStats
     * @summary Get the weekly commit count
     * @request GET:/repos/{owner}/{repo}/stats/participation
     */
    reposGetParticipationStats: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<ParticipationStats, BasicError>({
        path: `/repos/${owner}/${repo}/stats/participation`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Each array contains the day number, hour number, and number of commits: *   `0-6`: Sunday - Saturday *   `0-23`: Hour of day *   Number of commits For example, `[2, 14, 25]` indicates that there were 25 total commits, during the 2:00pm hour on Tuesdays. All times are based on the time zone of individual commits.
     *
     * @tags repos
     * @name ReposGetPunchCardStats
     * @summary Get the hourly commit count for each day
     * @request GET:/repos/{owner}/{repo}/stats/punch_card
     */
    reposGetPunchCardStats: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<CodeFrequencyStat[], any>({
        path: `/repos/${owner}/${repo}/stats/punch_card`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Users with push access in a repository can create commit statuses for a given SHA. Note: there is a limit of 1000 statuses per `sha` and `context` within a repository. Attempts to create more than 1000 statuses will result in a validation error.
     *
     * @tags repos
     * @name ReposCreateCommitStatus
     * @summary Create a commit status
     * @request POST:/repos/{owner}/{repo}/statuses/{sha}
     */
    reposCreateCommitStatus: (
      owner: string,
      repo: string,
      sha: string,
      data: {
        state: "error" | "failure" | "pending" | "success";
        target_url?: string;
        description?: string;
        context?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Status, any>({
        path: `/repos/${owner}/${repo}/statuses/${sha}`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Lists the people watching the specified repository.
     *
     * @tags activity
     * @name ActivityListWatchersForRepo
     * @summary List watchers
     * @request GET:/repos/{owner}/{repo}/subscribers
     */
    activityListWatchersForRepo: (
      owner: string,
      repo: string,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<SimpleUser[], any>({
        path: `/repos/${owner}/${repo}/subscribers`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags activity
     * @name ActivityGetRepoSubscription
     * @summary Get a repository subscription
     * @request GET:/repos/{owner}/{repo}/subscription
     */
    activityGetRepoSubscription: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<RepositorySubscription, BasicError | void>({
        path: `/repos/${owner}/${repo}/subscription`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description If you would like to watch a repository, set `subscribed` to `true`. If you would like to ignore notifications made within a repository, set `ignored` to `true`. If you would like to stop watching a repository, [delete the repository's subscription](https://docs.github.com/rest/reference/activity#delete-a-repository-subscription) completely.
     *
     * @tags activity
     * @name ActivitySetRepoSubscription
     * @summary Set a repository subscription
     * @request PUT:/repos/{owner}/{repo}/subscription
     */
    activitySetRepoSubscription: (
      owner: string,
      repo: string,
      data: { subscribed?: boolean; ignored?: boolean },
      params: RequestParams = {},
    ) =>
      this.request<RepositorySubscription, any>({
        path: `/repos/${owner}/${repo}/subscription`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description This endpoint should only be used to stop watching a repository. To control whether or not you wish to receive notifications from a repository, [set the repository's subscription manually](https://docs.github.com/rest/reference/activity#set-a-repository-subscription).
     *
     * @tags activity
     * @name ActivityDeleteRepoSubscription
     * @summary Delete a repository subscription
     * @request DELETE:/repos/{owner}/{repo}/subscription
     */
    activityDeleteRepoSubscription: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/repos/${owner}/${repo}/subscription`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags repos
     * @name ReposListTags
     * @summary List repository tags
     * @request GET:/repos/{owner}/{repo}/tags
     */
    reposListTags: (
      owner: string,
      repo: string,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<Tag[], any>({
        path: `/repos/${owner}/${repo}/tags`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets a redirect URL to download a tar archive for a repository. If you omit `:ref`, the repository’s default branch (usually `master`) will be used. Please make sure your HTTP framework is configured to follow redirects or you will need to use the `Location` header to make a second `GET` request. **Note**: For private repositories, these links are temporary and expire after five minutes.
     *
     * @tags repos
     * @name ReposDownloadTarballArchive
     * @summary Download a repository archive (tar)
     * @request GET:/repos/{owner}/{repo}/tarball/{ref}
     */
    reposDownloadTarballArchive: (owner: string, repo: string, ref: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/repos/${owner}/${repo}/tarball/${ref}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags repos
     * @name ReposListTeams
     * @summary List repository teams
     * @request GET:/repos/{owner}/{repo}/teams
     */
    reposListTeams: (
      owner: string,
      repo: string,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<Team[], any>({
        path: `/repos/${owner}/${repo}/teams`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags repos
     * @name ReposGetAllTopics
     * @summary Get all repository topics
     * @request GET:/repos/{owner}/{repo}/topics
     */
    reposGetAllTopics: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<Topic, BasicError | { message: string; documentation_url: string }>({
        path: `/repos/${owner}/${repo}/topics`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags repos
     * @name ReposReplaceAllTopics
     * @summary Replace all repository topics
     * @request PUT:/repos/{owner}/{repo}/topics
     */
    reposReplaceAllTopics: (owner: string, repo: string, data: { names: string[] }, params: RequestParams = {}) =>
      this.request<Topic, BasicError | { message: string; documentation_url: string } | ValidationErrorSimple>({
        path: `/repos/${owner}/${repo}/topics`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get the total number of clones and breakdown per day or week for the last 14 days. Timestamps are aligned to UTC midnight of the beginning of the day or week. Week begins on Monday.
     *
     * @tags repos
     * @name ReposGetClones
     * @summary Get repository clones
     * @request GET:/repos/{owner}/{repo}/traffic/clones
     */
    reposGetClones: (owner: string, repo: string, query?: { per?: "day" | "week" }, params: RequestParams = {}) =>
      this.request<CloneTraffic, BasicError>({
        path: `/repos/${owner}/${repo}/traffic/clones`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Get the top 10 popular contents over the last 14 days.
     *
     * @tags repos
     * @name ReposGetTopPaths
     * @summary Get top referral paths
     * @request GET:/repos/{owner}/{repo}/traffic/popular/paths
     */
    reposGetTopPaths: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<ContentTraffic[], BasicError>({
        path: `/repos/${owner}/${repo}/traffic/popular/paths`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get the top 10 referrers over the last 14 days.
     *
     * @tags repos
     * @name ReposGetTopReferrers
     * @summary Get top referral sources
     * @request GET:/repos/{owner}/{repo}/traffic/popular/referrers
     */
    reposGetTopReferrers: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<ReferrerTraffic[], BasicError>({
        path: `/repos/${owner}/${repo}/traffic/popular/referrers`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get the total number of views and breakdown per day or week for the last 14 days. Timestamps are aligned to UTC midnight of the beginning of the day or week. Week begins on Monday.
     *
     * @tags repos
     * @name ReposGetViews
     * @summary Get page views
     * @request GET:/repos/{owner}/{repo}/traffic/views
     */
    reposGetViews: (owner: string, repo: string, query?: { per?: "day" | "week" }, params: RequestParams = {}) =>
      this.request<ViewTraffic, BasicError>({
        path: `/repos/${owner}/${repo}/traffic/views`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description A transfer request will need to be accepted by the new owner when transferring a personal repository to another user. The response will contain the original `owner`, and the transfer will continue asynchronously. For more details on the requirements to transfer personal and organization-owned repositories, see [about repository transfers](https://help.github.com/articles/about-repository-transfers/).
     *
     * @tags repos
     * @name ReposTransfer
     * @summary Transfer a repository
     * @request POST:/repos/{owner}/{repo}/transfer
     */
    reposTransfer: (
      owner: string,
      repo: string,
      data: { new_owner: string; team_ids?: number[] },
      params: RequestParams = {},
    ) =>
      this.request<Repository, any>({
        path: `/repos/${owner}/${repo}/transfer`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Shows whether dependency alerts are enabled or disabled for a repository. The authenticated user must have admin access to the repository. For more information, see "[About security alerts for vulnerable dependencies](https://help.github.com/en/articles/about-security-alerts-for-vulnerable-dependencies)".
     *
     * @tags repos
     * @name ReposCheckVulnerabilityAlerts
     * @summary Check if vulnerability alerts are enabled for a repository
     * @request GET:/repos/{owner}/{repo}/vulnerability-alerts
     */
    reposCheckVulnerabilityAlerts: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/repos/${owner}/${repo}/vulnerability-alerts`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Enables dependency alerts and the dependency graph for a repository. The authenticated user must have admin access to the repository. For more information, see "[About security alerts for vulnerable dependencies](https://help.github.com/en/articles/about-security-alerts-for-vulnerable-dependencies)".
     *
     * @tags repos
     * @name ReposEnableVulnerabilityAlerts
     * @summary Enable vulnerability alerts
     * @request PUT:/repos/{owner}/{repo}/vulnerability-alerts
     */
    reposEnableVulnerabilityAlerts: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/repos/${owner}/${repo}/vulnerability-alerts`,
        method: "PUT",
        ...params,
      }),

    /**
     * @description Disables dependency alerts and the dependency graph for a repository. The authenticated user must have admin access to the repository. For more information, see "[About security alerts for vulnerable dependencies](https://help.github.com/en/articles/about-security-alerts-for-vulnerable-dependencies)".
     *
     * @tags repos
     * @name ReposDisableVulnerabilityAlerts
     * @summary Disable vulnerability alerts
     * @request DELETE:/repos/{owner}/{repo}/vulnerability-alerts
     */
    reposDisableVulnerabilityAlerts: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/repos/${owner}/${repo}/vulnerability-alerts`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Gets a redirect URL to download a zip archive for a repository. If you omit `:ref`, the repository’s default branch (usually `master`) will be used. Please make sure your HTTP framework is configured to follow redirects or you will need to use the `Location` header to make a second `GET` request. **Note**: For private repositories, these links are temporary and expire after five minutes.
     *
     * @tags repos
     * @name ReposDownloadZipballArchive
     * @summary Download a repository archive (zip)
     * @request GET:/repos/{owner}/{repo}/zipball/{ref}
     */
    reposDownloadZipballArchive: (owner: string, repo: string, ref: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/repos/${owner}/${repo}/zipball/${ref}`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Creates a new repository using a repository template. Use the `template_owner` and `template_repo` route parameters to specify the repository to use as the template. The authenticated user must own or be a member of an organization that owns the repository. To check if a repository is available to use as a template, get the repository's information using the [Get a repository](https://docs.github.com/rest/reference/repos#get-a-repository) endpoint and check that the `is_template` key is `true`. **OAuth scope requirements** When using [OAuth](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/), authorizations must include: *   `public_repo` scope or `repo` scope to create a public repository *   `repo` scope to create a private repository
     *
     * @tags repos
     * @name ReposCreateUsingTemplate
     * @summary Create a repository using a template
     * @request POST:/repos/{template_owner}/{template_repo}/generate
     */
    reposCreateUsingTemplate: (
      templateOwner: string,
      templateRepo: string,
      data: { owner?: string; name: string; description?: string; include_all_branches?: boolean; private?: boolean },
      params: RequestParams = {},
    ) =>
      this.request<Repository, any>({
        path: `/repos/${templateOwner}/${templateRepo}/generate`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  repositories = {
    /**
     * @description Lists all public repositories in the order that they were created. Note: Pagination is powered exclusively by the `since` parameter. Use the [Link header](https://docs.github.com/rest/overview/resources-in-the-rest-api#link-header) to get the URL for the next page of repositories.
     *
     * @tags repos
     * @name ReposListPublic
     * @summary List public repositories
     * @request GET:/repositories
     */
    reposListPublic: (query?: { since?: number }, params: RequestParams = {}) =>
      this.request<MinimalRepository[], ValidationError>({
        path: `/repositories`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  scim = {
    /**
     * @description **Note:** The SCIM API endpoints for enterprise accounts are currently in beta and are subject to change.
     *
     * @tags enterprise-admin
     * @name EnterpriseAdminListProvisionedGroupsEnterprise
     * @summary List provisioned SCIM groups for an enterprise
     * @request GET:/scim/v2/enterprises/{enterprise}/Groups
     */
    enterpriseAdminListProvisionedGroupsEnterprise: (
      enterprise: string,
      query?: { startIndex?: number; count?: number },
      params: RequestParams = {},
    ) =>
      this.request<ScimGroupListEnterprise, any>({
        path: `/scim/v2/enterprises/${enterprise}/Groups`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description **Note:** The SCIM API endpoints for enterprise accounts are currently in beta and are subject to change. Provision an enterprise group, and invite users to the group. This sends invitation emails to the email address of the invited users to join the GitHub organization that the SCIM group corresponds to.
     *
     * @tags enterprise-admin
     * @name EnterpriseAdminProvisionAndInviteEnterpriseGroup
     * @summary Provision a SCIM enterprise group and invite users
     * @request POST:/scim/v2/enterprises/{enterprise}/Groups
     */
    enterpriseAdminProvisionAndInviteEnterpriseGroup: (
      enterprise: string,
      data: { schemas: string[]; displayName: string; members?: { value: string }[] },
      params: RequestParams = {},
    ) =>
      this.request<ScimEnterpriseGroup, any>({
        path: `/scim/v2/enterprises/${enterprise}/Groups`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description **Note:** The SCIM API endpoints for enterprise accounts are currently in beta and are subject to change.
     *
     * @tags enterprise-admin
     * @name EnterpriseAdminGetProvisioningInformationForEnterpriseGroup
     * @summary Get SCIM provisioning information for an enterprise group
     * @request GET:/scim/v2/enterprises/{enterprise}/Groups/{scim_group_id}
     */
    enterpriseAdminGetProvisioningInformationForEnterpriseGroup: (
      enterprise: string,
      scimGroupId: string,
      params: RequestParams = {},
    ) =>
      this.request<ScimEnterpriseGroup, any>({
        path: `/scim/v2/enterprises/${enterprise}/Groups/${scimGroupId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description **Note:** The SCIM API endpoints for enterprise accounts are currently in beta and are subject to change. Replaces an existing provisioned group’s information. You must provide all the information required for the group as if you were provisioning it for the first time. Any existing group information that you don't provide will be removed, including group membership. If you want to only update a specific attribute, use the [Update an attribute for a SCIM enterprise group](#update-an-attribute-for-a-scim-enterprise-group) endpoint instead.
     *
     * @tags enterprise-admin
     * @name EnterpriseAdminSetInformationForProvisionedEnterpriseGroup
     * @summary Set SCIM information for a provisioned enterprise group
     * @request PUT:/scim/v2/enterprises/{enterprise}/Groups/{scim_group_id}
     */
    enterpriseAdminSetInformationForProvisionedEnterpriseGroup: (
      enterprise: string,
      scimGroupId: string,
      data: { schemas: string[]; displayName: string; members?: { value: string }[] },
      params: RequestParams = {},
    ) =>
      this.request<ScimEnterpriseGroup, any>({
        path: `/scim/v2/enterprises/${enterprise}/Groups/${scimGroupId}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description **Note:** The SCIM API endpoints for enterprise accounts are currently in beta and are subject to change. Allows you to change a provisioned group’s individual attributes. To change a group’s values, you must provide a specific Operations JSON format that contains at least one of the add, remove, or replace operations. For examples and more information on the SCIM operations format, see the [SCIM specification](https://tools.ietf.org/html/rfc7644#section-3.5.2).
     *
     * @tags enterprise-admin
     * @name EnterpriseAdminUpdateAttributeForEnterpriseGroup
     * @summary Update an attribute for a SCIM enterprise group
     * @request PATCH:/scim/v2/enterprises/{enterprise}/Groups/{scim_group_id}
     */
    enterpriseAdminUpdateAttributeForEnterpriseGroup: (
      enterprise: string,
      scimGroupId: string,
      data: { schemas: string[]; Operations: object[] },
      params: RequestParams = {},
    ) =>
      this.request<ScimEnterpriseGroup, any>({
        path: `/scim/v2/enterprises/${enterprise}/Groups/${scimGroupId}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description **Note:** The SCIM API endpoints for enterprise accounts are currently in beta and are subject to change.
     *
     * @tags enterprise-admin
     * @name EnterpriseAdminDeleteScimGroupFromEnterprise
     * @summary Delete a SCIM group from an enterprise
     * @request DELETE:/scim/v2/enterprises/{enterprise}/Groups/{scim_group_id}
     */
    enterpriseAdminDeleteScimGroupFromEnterprise: (
      enterprise: string,
      scimGroupId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/scim/v2/enterprises/${enterprise}/Groups/${scimGroupId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description **Note:** The SCIM API endpoints for enterprise accounts are currently in beta and are subject to change. Retrieves a paginated list of all provisioned enterprise members, including pending invitations. When a user with a SAML-provisioned external identity leaves (or is removed from) an enterprise, the account's metadata is immediately removed. However, the returned list of user accounts might not always match the organization or enterprise member list you see on GitHub. This can happen in certain cases where an external identity associated with an organization will not match an organization member: - When a user with a SCIM-provisioned external identity is removed from an enterprise, the account's metadata is preserved to allow the user to re-join the organization in the future. - When inviting a user to join an organization, you can expect to see their external identity in the results before they accept the invitation, or if the invitation is cancelled (or never accepted). - When a user is invited over SCIM, an external identity is created that matches with the invitee's email address. However, this identity is only linked to a user account when the user accepts the invitation by going through SAML SSO. The returned list of external identities can include an entry for a `null` user. These are unlinked SAML identities that are created when a user goes through the following Single Sign-On (SSO) process but does not sign in to their GitHub account after completing SSO: 1. The user is granted access by the IdP and is not a member of the GitHub enterprise. 1. The user attempts to access the GitHub enterprise and initiates the SAML SSO process, and is not currently signed in to their GitHub account. 1. After successfully authenticating with the SAML SSO IdP, the `null` external identity entry is created and the user is prompted to sign in to their GitHub account: - If the user signs in, their GitHub account is linked to this entry. - If the user does not sign in (or does not create a new account when prompted), they are not added to the GitHub enterprise, and the external identity `null` entry remains in place.
     *
     * @tags enterprise-admin
     * @name EnterpriseAdminListProvisionedIdentitiesEnterprise
     * @summary List SCIM provisioned identities for an enterprise
     * @request GET:/scim/v2/enterprises/{enterprise}/Users
     */
    enterpriseAdminListProvisionedIdentitiesEnterprise: (
      enterprise: string,
      query?: { startIndex?: number; count?: number },
      params: RequestParams = {},
    ) =>
      this.request<ScimUserListEnterprise, any>({
        path: `/scim/v2/enterprises/${enterprise}/Users`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description **Note:** The SCIM API endpoints for enterprise accounts are currently in beta and are subject to change. Provision enterprise membership for a user, and send organization invitation emails to the email address. You can optionally include the groups a user will be invited to join. If you do not provide a list of `groups`, the user is provisioned for the enterprise, but no organization invitation emails will be sent.
     *
     * @tags enterprise-admin
     * @name EnterpriseAdminProvisionAndInviteEnterpriseUser
     * @summary Provision and invite a SCIM enterprise user
     * @request POST:/scim/v2/enterprises/{enterprise}/Users
     */
    enterpriseAdminProvisionAndInviteEnterpriseUser: (
      enterprise: string,
      data: {
        schemas: string[];
        userName: string;
        name: { givenName: string; familyName: string };
        emails: { value: string; type: string; primary: boolean }[];
        groups?: { value?: string }[];
      },
      params: RequestParams = {},
    ) =>
      this.request<ScimEnterpriseUser, any>({
        path: `/scim/v2/enterprises/${enterprise}/Users`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description **Note:** The SCIM API endpoints for enterprise accounts are currently in beta and are subject to change.
     *
     * @tags enterprise-admin
     * @name EnterpriseAdminGetProvisioningInformationForEnterpriseUser
     * @summary Get SCIM provisioning information for an enterprise user
     * @request GET:/scim/v2/enterprises/{enterprise}/Users/{scim_user_id}
     */
    enterpriseAdminGetProvisioningInformationForEnterpriseUser: (
      enterprise: string,
      scimUserId: string,
      params: RequestParams = {},
    ) =>
      this.request<ScimEnterpriseUser, any>({
        path: `/scim/v2/enterprises/${enterprise}/Users/${scimUserId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description **Note:** The SCIM API endpoints for enterprise accounts are currently in beta and are subject to change. Replaces an existing provisioned user's information. You must provide all the information required for the user as if you were provisioning them for the first time. Any existing user information that you don't provide will be removed. If you want to only update a specific attribute, use the [Update an attribute for a SCIM user](#update-an-attribute-for-an-enterprise-scim-user) endpoint instead. You must at least provide the required values for the user: `userName`, `name`, and `emails`. **Warning:** Setting `active: false` removes the user from the enterprise, deletes the external identity, and deletes the associated `{scim_user_id}`.
     *
     * @tags enterprise-admin
     * @name EnterpriseAdminSetInformationForProvisionedEnterpriseUser
     * @summary Set SCIM information for a provisioned enterprise user
     * @request PUT:/scim/v2/enterprises/{enterprise}/Users/{scim_user_id}
     */
    enterpriseAdminSetInformationForProvisionedEnterpriseUser: (
      enterprise: string,
      scimUserId: string,
      data: {
        schemas: string[];
        userName: string;
        name: { givenName: string; familyName: string };
        emails: { value: string; type: string; primary: boolean }[];
        groups?: { value?: string }[];
      },
      params: RequestParams = {},
    ) =>
      this.request<ScimEnterpriseUser, any>({
        path: `/scim/v2/enterprises/${enterprise}/Users/${scimUserId}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description **Note:** The SCIM API endpoints for enterprise accounts are currently in beta and are subject to change. Allows you to change a provisioned user's individual attributes. To change a user's values, you must provide a specific `Operations` JSON format that contains at least one of the `add`, `remove`, or `replace` operations. For examples and more information on the SCIM operations format, see the [SCIM specification](https://tools.ietf.org/html/rfc7644#section-3.5.2). **Note:** Complicated SCIM `path` selectors that include filters are not supported. For example, a `path` selector defined as `"path": "emails[type eq \"work\"]"` will not work. **Warning:** If you set `active:false` using the `replace` operation (as shown in the JSON example below), it removes the user from the enterprise, deletes the external identity, and deletes the associated `:scim_user_id`. ``` { "Operations":[{ "op":"replace", "value":{ "active":false } }] } ```
     *
     * @tags enterprise-admin
     * @name EnterpriseAdminUpdateAttributeForEnterpriseUser
     * @summary Update an attribute for a SCIM enterprise user
     * @request PATCH:/scim/v2/enterprises/{enterprise}/Users/{scim_user_id}
     */
    enterpriseAdminUpdateAttributeForEnterpriseUser: (
      enterprise: string,
      scimUserId: string,
      data: { schemas: string[]; Operations: object[] },
      params: RequestParams = {},
    ) =>
      this.request<ScimEnterpriseUser, any>({
        path: `/scim/v2/enterprises/${enterprise}/Users/${scimUserId}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description **Note:** The SCIM API endpoints for enterprise accounts are currently in beta and are subject to change.
     *
     * @tags enterprise-admin
     * @name EnterpriseAdminDeleteUserFromEnterprise
     * @summary Delete a SCIM user from an enterprise
     * @request DELETE:/scim/v2/enterprises/{enterprise}/Users/{scim_user_id}
     */
    enterpriseAdminDeleteUserFromEnterprise: (enterprise: string, scimUserId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/scim/v2/enterprises/${enterprise}/Users/${scimUserId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Retrieves a paginated list of all provisioned organization members, including pending invitations. If you provide the `filter` parameter, the resources for all matching provisions members are returned. When a user with a SAML-provisioned external identity leaves (or is removed from) an organization, the account's metadata is immediately removed. However, the returned list of user accounts might not always match the organization or enterprise member list you see on GitHub. This can happen in certain cases where an external identity associated with an organization will not match an organization member: - When a user with a SCIM-provisioned external identity is removed from an organization, the account's metadata is preserved to allow the user to re-join the organization in the future. - When inviting a user to join an organization, you can expect to see their external identity in the results before they accept the invitation, or if the invitation is cancelled (or never accepted). - When a user is invited over SCIM, an external identity is created that matches with the invitee's email address. However, this identity is only linked to a user account when the user accepts the invitation by going through SAML SSO. The returned list of external identities can include an entry for a `null` user. These are unlinked SAML identities that are created when a user goes through the following Single Sign-On (SSO) process but does not sign in to their GitHub account after completing SSO: 1. The user is granted access by the IdP and is not a member of the GitHub organization. 1. The user attempts to access the GitHub organization and initiates the SAML SSO process, and is not currently signed in to their GitHub account. 1. After successfully authenticating with the SAML SSO IdP, the `null` external identity entry is created and the user is prompted to sign in to their GitHub account: - If the user signs in, their GitHub account is linked to this entry. - If the user does not sign in (or does not create a new account when prompted), they are not added to the GitHub organization, and the external identity `null` entry remains in place.
     *
     * @tags scim
     * @name ScimListProvisionedIdentities
     * @summary List SCIM provisioned identities
     * @request GET:/scim/v2/organizations/{org}/Users
     */
    scimListProvisionedIdentities: (
      org: string,
      query?: { startIndex?: number; count?: number; filter?: string },
      params: RequestParams = {},
    ) =>
      this.request<ScimUserList, ScimError>({
        path: `/scim/v2/organizations/${org}/Users`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Provision organization membership for a user, and send an activation email to the email address.
     *
     * @tags scim
     * @name ScimProvisionAndInviteUser
     * @summary Provision and invite a SCIM user
     * @request POST:/scim/v2/organizations/{org}/Users
     */
    scimProvisionAndInviteUser: (
      org: string,
      data: {
        userName: string;
        displayName?: string;
        name: { givenName: string; familyName: string; formatted?: string };
        emails: { value: string; primary?: boolean; type?: string }[];
        schemas?: string[];
        externalId?: string;
        groups?: string[];
        active?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<ScimUser, ScimError>({
        path: `/scim/v2/organizations/${org}/Users`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags scim
     * @name ScimGetProvisioningInformationForUser
     * @summary Get SCIM provisioning information for a user
     * @request GET:/scim/v2/organizations/{org}/Users/{scim_user_id}
     */
    scimGetProvisioningInformationForUser: (org: string, scimUserId: string, params: RequestParams = {}) =>
      this.request<ScimUser, ScimError>({
        path: `/scim/v2/organizations/${org}/Users/${scimUserId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Replaces an existing provisioned user's information. You must provide all the information required for the user as if you were provisioning them for the first time. Any existing user information that you don't provide will be removed. If you want to only update a specific attribute, use the [Update an attribute for a SCIM user](https://docs.github.com/rest/reference/scim#update-an-attribute-for-a-scim-user) endpoint instead. You must at least provide the required values for the user: `userName`, `name`, and `emails`. **Warning:** Setting `active: false` removes the user from the organization, deletes the external identity, and deletes the associated `{scim_user_id}`.
     *
     * @tags scim
     * @name ScimSetInformationForProvisionedUser
     * @summary Update a provisioned organization membership
     * @request PUT:/scim/v2/organizations/{org}/Users/{scim_user_id}
     */
    scimSetInformationForProvisionedUser: (
      org: string,
      scimUserId: string,
      data: {
        schemas?: string[];
        displayName?: string;
        externalId?: string;
        groups?: string[];
        active?: boolean;
        userName: string;
        name: { givenName: string; familyName: string; formatted?: string };
        emails: { type?: string; value: string; primary?: boolean }[];
      },
      params: RequestParams = {},
    ) =>
      this.request<ScimUser, ScimError>({
        path: `/scim/v2/organizations/${org}/Users/${scimUserId}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Allows you to change a provisioned user's individual attributes. To change a user's values, you must provide a specific `Operations` JSON format that contains at least one of the `add`, `remove`, or `replace` operations. For examples and more information on the SCIM operations format, see the [SCIM specification](https://tools.ietf.org/html/rfc7644#section-3.5.2). **Note:** Complicated SCIM `path` selectors that include filters are not supported. For example, a `path` selector defined as `"path": "emails[type eq \"work\"]"` will not work. **Warning:** If you set `active:false` using the `replace` operation (as shown in the JSON example below), it removes the user from the organization, deletes the external identity, and deletes the associated `:scim_user_id`. ``` { "Operations":[{ "op":"replace", "value":{ "active":false } }] } ```
     *
     * @tags scim
     * @name ScimUpdateAttributeForUser
     * @summary Update an attribute for a SCIM user
     * @request PATCH:/scim/v2/organizations/{org}/Users/{scim_user_id}
     */
    scimUpdateAttributeForUser: (
      org: string,
      scimUserId: string,
      data: {
        schemas?: string[];
        Operations: {
          op: "add" | "remove" | "replace";
          path?: string;
          value?:
            | {
                active?: boolean | null;
                userName?: string | null;
                externalId?: string | null;
                givenName?: string | null;
                familyName?: string | null;
              }
            | { value?: string; primary?: boolean }[]
            | string;
        }[];
      },
      params: RequestParams = {},
    ) =>
      this.request<ScimUser, ScimError | BasicError>({
        path: `/scim/v2/organizations/${org}/Users/${scimUserId}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags scim
     * @name ScimDeleteUserFromOrg
     * @summary Delete a SCIM user from an organization
     * @request DELETE:/scim/v2/organizations/{org}/Users/{scim_user_id}
     */
    scimDeleteUserFromOrg: (org: string, scimUserId: string, params: RequestParams = {}) =>
      this.request<void, ScimError>({
        path: `/scim/v2/organizations/${org}/Users/${scimUserId}`,
        method: "DELETE",
        ...params,
      }),
  };
  search = {
    /**
     * @description Searches for query terms inside of a file. This method returns up to 100 results [per page](https://docs.github.com/rest/overview/resources-in-the-rest-api#pagination). When searching for code, you can get text match metadata for the file **content** and file **path** fields when you pass the `text-match` media type. For more details about how to receive highlighted search results, see [Text match metadata](https://docs.github.com/rest/reference/search#text-match-metadata). For example, if you want to find the definition of the `addClass` function inside [jQuery](https://github.com/jquery/jquery) repository, your query would look something like this: `q=addClass+in:file+language:js+repo:jquery/jquery` This query searches for the keyword `addClass` within a file's contents. The query limits the search to files where the language is JavaScript in the `jquery/jquery` repository. #### Considerations for code search Due to the complexity of searching code, there are a few restrictions on how searches are performed: *   Only the _default branch_ is considered. In most cases, this will be the `master` branch. *   Only files smaller than 384 KB are searchable. *   You must always include at least one search term when searching source code. For example, searching for [`language:go`](https://github.com/search?utf8=%E2%9C%93&q=language%3Ago&type=Code) is not valid, while [`amazing language:go`](https://github.com/search?utf8=%E2%9C%93&q=amazing+language%3Ago&type=Code) is.
     *
     * @tags search
     * @name SearchCode
     * @summary Search code
     * @request GET:/search/code
     */
    searchCode: (
      query: { q: string; sort?: "indexed"; order?: "desc" | "asc"; per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<
        { total_count: number; incomplete_results: boolean; items: CodeSearchResultItem[] },
        BasicError | ValidationError | { code?: string; message?: string; documentation_url?: string }
      >({
        path: `/search/code`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Find commits via various criteria on the default branch (usually `master`). This method returns up to 100 results [per page](https://docs.github.com/rest/overview/resources-in-the-rest-api#pagination). When searching for commits, you can get text match metadata for the **message** field when you provide the `text-match` media type. For more details about how to receive highlighted search results, see [Text match metadata](https://docs.github.com/rest/reference/search#text-match-metadata). For example, if you want to find commits related to CSS in the [octocat/Spoon-Knife](https://github.com/octocat/Spoon-Knife) repository. Your query would look something like this: `q=repo:octocat/Spoon-Knife+css`
     *
     * @tags search
     * @name SearchCommits
     * @summary Search commits
     * @request GET:/search/commits
     */
    searchCommits: (
      query: {
        q: string;
        sort?: "author-date" | "committer-date";
        order?: "desc" | "asc";
        per_page?: number;
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        { total_count: number; incomplete_results: boolean; items: CommitSearchResultItem[] },
        { message: string; documentation_url: string }
      >({
        path: `/search/commits`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Find issues by state and keyword. This method returns up to 100 results [per page](https://docs.github.com/rest/overview/resources-in-the-rest-api#pagination). When searching for issues, you can get text match metadata for the issue **title**, issue **body**, and issue **comment body** fields when you pass the `text-match` media type. For more details about how to receive highlighted search results, see [Text match metadata](https://docs.github.com/rest/reference/search#text-match-metadata). For example, if you want to find the oldest unresolved Python bugs on Windows. Your query might look something like this. `q=windows+label:bug+language:python+state:open&sort=created&order=asc` This query searches for the keyword `windows`, within any open issue that is labeled as `bug`. The search runs across repositories whose primary language is Python. The results are sorted by creation date in ascending order, which means the oldest issues appear first in the search results. **Note:** For [user-to-server](https://docs.github.com/developers/apps/identifying-and-authorizing-users-for-github-apps#user-to-server-requests) GitHub App requests, you can't retrieve a combination of issues and pull requests in a single query. Requests that don't include the `is:issue` or `is:pull-request` qualifier will receive an HTTP `422 Unprocessable Entity` response. To get results for both issues and pull requests, you must send separate queries for issues and pull requests. For more information about the `is` qualifier, see "[Searching only issues or pull requests](https://docs.github.com/github/searching-for-information-on-github/searching-issues-and-pull-requests#search-only-issues-or-pull-requests)."
     *
     * @tags search
     * @name SearchIssuesAndPullRequests
     * @summary Search issues and pull requests
     * @request GET:/search/issues
     */
    searchIssuesAndPullRequests: (
      query: {
        q: string;
        sort?:
          | "comments"
          | "reactions"
          | "reactions-+1"
          | "reactions--1"
          | "reactions-smile"
          | "reactions-thinking_face"
          | "reactions-heart"
          | "reactions-tada"
          | "interactions"
          | "created"
          | "updated";
        order?: "desc" | "asc";
        per_page?: number;
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        { total_count: number; incomplete_results: boolean; items: IssueSearchResultItem[] },
        BasicError | ValidationError | { code?: string; message?: string; documentation_url?: string }
      >({
        path: `/search/issues`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Find labels in a repository with names or descriptions that match search keywords. Returns up to 100 results [per page](https://docs.github.com/rest/overview/resources-in-the-rest-api#pagination). When searching for labels, you can get text match metadata for the label **name** and **description** fields when you pass the `text-match` media type. For more details about how to receive highlighted search results, see [Text match metadata](https://docs.github.com/rest/reference/search#text-match-metadata). For example, if you want to find labels in the `linguist` repository that match `bug`, `defect`, or `enhancement`. Your query might look like this: `q=bug+defect+enhancement&repository_id=64778136` The labels that best match the query appear first in the search results.
     *
     * @tags search
     * @name SearchLabels
     * @summary Search labels
     * @request GET:/search/labels
     */
    searchLabels: (
      query: { repository_id: number; q: string; sort?: "created" | "updated"; order?: "desc" | "asc" },
      params: RequestParams = {},
    ) =>
      this.request<
        { total_count: number; incomplete_results: boolean; items: LabelSearchResultItem[] },
        BasicError | ValidationError
      >({
        path: `/search/labels`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Find repositories via various criteria. This method returns up to 100 results [per page](https://docs.github.com/rest/overview/resources-in-the-rest-api#pagination). When searching for repositories, you can get text match metadata for the **name** and **description** fields when you pass the `text-match` media type. For more details about how to receive highlighted search results, see [Text match metadata](https://docs.github.com/rest/reference/search#text-match-metadata). For example, if you want to search for popular Tetris repositories written in assembly code, your query might look like this: `q=tetris+language:assembly&sort=stars&order=desc` This query searches for repositories with the word `tetris` in the name, the description, or the README. The results are limited to repositories where the primary language is assembly. The results are sorted by stars in descending order, so that the most popular repositories appear first in the search results. When you include the `mercy` preview header, you can also search for multiple topics by adding more `topic:` instances. For example, your query might look like this: `q=topic:ruby+topic:rails`
     *
     * @tags search
     * @name SearchRepos
     * @summary Search repositories
     * @request GET:/search/repositories
     */
    searchRepos: (
      query: {
        q: string;
        sort?: "stars" | "forks" | "help-wanted-issues" | "updated";
        order?: "desc" | "asc";
        per_page?: number;
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        { total_count: number; incomplete_results: boolean; items: RepoSearchResultItem[] },
        ValidationError | { code?: string; message?: string; documentation_url?: string }
      >({
        path: `/search/repositories`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Find topics via various criteria. Results are sorted by best match. This method returns up to 100 results [per page](https://docs.github.com/rest/overview/resources-in-the-rest-api#pagination). See "[Searching topics](https://help.github.com/articles/searching-topics/)" for a detailed list of qualifiers. When searching for topics, you can get text match metadata for the topic's **short\_description**, **description**, **name**, or **display\_name** field when you pass the `text-match` media type. For more details about how to receive highlighted search results, see [Text match metadata](https://docs.github.com/rest/reference/search#text-match-metadata). For example, if you want to search for topics related to Ruby that are featured on https://github.com/topics. Your query might look like this: `q=ruby+is:featured` This query searches for topics with the keyword `ruby` and limits the results to find only topics that are featured. The topics that are the best match for the query appear first in the search results.
     *
     * @tags search
     * @name SearchTopics
     * @summary Search topics
     * @request GET:/search/topics
     */
    searchTopics: (query: { q: string }, params: RequestParams = {}) =>
      this.request<
        { total_count: number; incomplete_results: boolean; items: TopicSearchResultItem[] },
        { message: string; documentation_url: string }
      >({
        path: `/search/topics`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Find users via various criteria. This method returns up to 100 results [per page](https://docs.github.com/rest/overview/resources-in-the-rest-api#pagination). When searching for users, you can get text match metadata for the issue **login**, **email**, and **name** fields when you pass the `text-match` media type. For more details about highlighting search results, see [Text match metadata](https://docs.github.com/rest/reference/search#text-match-metadata). For more details about how to receive highlighted search results, see [Text match metadata](https://docs.github.com/rest/reference/search#text-match-metadata). For example, if you're looking for a list of popular users, you might try this query: `q=tom+repos:%3E42+followers:%3E1000` This query searches for users with the name `tom`. The results are restricted to users with more than 42 repositories and over 1,000 followers.
     *
     * @tags search
     * @name SearchUsers
     * @summary Search users
     * @request GET:/search/users
     */
    searchUsers: (
      query: {
        q: string;
        sort?: "followers" | "repositories" | "joined";
        order?: "desc" | "asc";
        per_page?: number;
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        { total_count: number; incomplete_results: boolean; items: UserSearchResultItem[] },
        ValidationError | { code?: string; message?: string; documentation_url?: string }
      >({
        path: `/search/users`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  teams = {
    /**
     * @description **Deprecation Notice:** This endpoint route is deprecated and will be removed from the Teams API. We recommend migrating your existing code to use the [Get a team by name](https://docs.github.com/rest/reference/teams#get-a-team-by-name) endpoint.
     *
     * @tags teams
     * @name TeamsGetLegacy
     * @summary Get a team (Legacy)
     * @request GET:/teams/{team_id}
     * @deprecated
     */
    teamsGetLegacy: (teamId: number, params: RequestParams = {}) =>
      this.request<TeamFull, BasicError>({
        path: `/teams/${teamId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description **Deprecation Notice:** This endpoint route is deprecated and will be removed from the Teams API. We recommend migrating your existing code to use the new [Update a team](https://docs.github.com/rest/reference/teams#update-a-team) endpoint. To edit a team, the authenticated user must either be an organization owner or a team maintainer. **Note:** With nested teams, the `privacy` for parent teams cannot be `secret`.
     *
     * @tags teams
     * @name TeamsUpdateLegacy
     * @summary Update a team (Legacy)
     * @request PATCH:/teams/{team_id}
     * @deprecated
     */
    teamsUpdateLegacy: (
      teamId: number,
      data: {
        name: string;
        description?: string;
        privacy?: "secret" | "closed";
        permission?: "pull" | "push" | "admin";
        parent_team_id?: number | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<TeamFull, BasicError | ValidationError>({
        path: `/teams/${teamId}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description **Deprecation Notice:** This endpoint route is deprecated and will be removed from the Teams API. We recommend migrating your existing code to use the new [Delete a team](https://docs.github.com/rest/reference/teams#delete-a-team) endpoint. To delete a team, the authenticated user must be an organization owner or team maintainer. If you are an organization owner, deleting a parent team will delete all of its child teams as well.
     *
     * @tags teams
     * @name TeamsDeleteLegacy
     * @summary Delete a team (Legacy)
     * @request DELETE:/teams/{team_id}
     * @deprecated
     */
    teamsDeleteLegacy: (teamId: number, params: RequestParams = {}) =>
      this.request<void, BasicError | ValidationError>({
        path: `/teams/${teamId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description **Deprecation Notice:** This endpoint route is deprecated and will be removed from the Teams API. We recommend migrating your existing code to use the new [`List discussions`](https://docs.github.com/rest/reference/teams#list-discussions) endpoint. List all discussions on a team's page. OAuth access tokens require the `read:discussion` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/).
     *
     * @tags teams
     * @name TeamsListDiscussionsLegacy
     * @summary List discussions (Legacy)
     * @request GET:/teams/{team_id}/discussions
     * @deprecated
     */
    teamsListDiscussionsLegacy: (
      teamId: number,
      query?: { direction?: "asc" | "desc"; per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<TeamDiscussion[], any>({
        path: `/teams/${teamId}/discussions`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description **Deprecation Notice:** This endpoint route is deprecated and will be removed from the Teams API. We recommend migrating your existing code to use the new [`Create a discussion`](https://docs.github.com/rest/reference/teams#create-a-discussion) endpoint. Creates a new discussion post on a team's page. OAuth access tokens require the `write:discussion` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/). This endpoint triggers [notifications](https://docs.github.com/en/github/managing-subscriptions-and-notifications-on-github/about-notifications). Creating content too quickly using this endpoint may result in abuse rate limiting. See "[Abuse rate limits](https://docs.github.com/rest/overview/resources-in-the-rest-api#abuse-rate-limits)" and "[Dealing with abuse rate limits](https://docs.github.com/rest/guides/best-practices-for-integrators#dealing-with-rate-limits)" for details.
     *
     * @tags teams
     * @name TeamsCreateDiscussionLegacy
     * @summary Create a discussion (Legacy)
     * @request POST:/teams/{team_id}/discussions
     * @deprecated
     */
    teamsCreateDiscussionLegacy: (
      teamId: number,
      data: { title: string; body: string; private?: boolean },
      params: RequestParams = {},
    ) =>
      this.request<TeamDiscussion, any>({
        path: `/teams/${teamId}/discussions`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description **Deprecation Notice:** This endpoint route is deprecated and will be removed from the Teams API. We recommend migrating your existing code to use the new [Get a discussion](https://docs.github.com/rest/reference/teams#get-a-discussion) endpoint. Get a specific discussion on a team's page. OAuth access tokens require the `read:discussion` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/).
     *
     * @tags teams
     * @name TeamsGetDiscussionLegacy
     * @summary Get a discussion (Legacy)
     * @request GET:/teams/{team_id}/discussions/{discussion_number}
     * @deprecated
     */
    teamsGetDiscussionLegacy: (teamId: number, discussionNumber: number, params: RequestParams = {}) =>
      this.request<TeamDiscussion, any>({
        path: `/teams/${teamId}/discussions/${discussionNumber}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description **Deprecation Notice:** This endpoint route is deprecated and will be removed from the Teams API. We recommend migrating your existing code to use the new [Update a discussion](https://docs.github.com/rest/reference/teams#update-a-discussion) endpoint. Edits the title and body text of a discussion post. Only the parameters you provide are updated. OAuth access tokens require the `write:discussion` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/).
     *
     * @tags teams
     * @name TeamsUpdateDiscussionLegacy
     * @summary Update a discussion (Legacy)
     * @request PATCH:/teams/{team_id}/discussions/{discussion_number}
     * @deprecated
     */
    teamsUpdateDiscussionLegacy: (
      teamId: number,
      discussionNumber: number,
      data: { title?: string; body?: string },
      params: RequestParams = {},
    ) =>
      this.request<TeamDiscussion, any>({
        path: `/teams/${teamId}/discussions/${discussionNumber}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description **Deprecation Notice:** This endpoint route is deprecated and will be removed from the Teams API. We recommend migrating your existing code to use the new [`Delete a discussion`](https://docs.github.com/rest/reference/teams#delete-a-discussion) endpoint. Delete a discussion from a team's page. OAuth access tokens require the `write:discussion` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/).
     *
     * @tags teams
     * @name TeamsDeleteDiscussionLegacy
     * @summary Delete a discussion (Legacy)
     * @request DELETE:/teams/{team_id}/discussions/{discussion_number}
     * @deprecated
     */
    teamsDeleteDiscussionLegacy: (teamId: number, discussionNumber: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/teams/${teamId}/discussions/${discussionNumber}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description **Deprecation Notice:** This endpoint route is deprecated and will be removed from the Teams API. We recommend migrating your existing code to use the new [List discussion comments](https://docs.github.com/rest/reference/teams#list-discussion-comments) endpoint. List all comments on a team discussion. OAuth access tokens require the `read:discussion` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/).
     *
     * @tags teams
     * @name TeamsListDiscussionCommentsLegacy
     * @summary List discussion comments (Legacy)
     * @request GET:/teams/{team_id}/discussions/{discussion_number}/comments
     * @deprecated
     */
    teamsListDiscussionCommentsLegacy: (
      teamId: number,
      discussionNumber: number,
      query?: { direction?: "asc" | "desc"; per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<TeamDiscussionComment[], any>({
        path: `/teams/${teamId}/discussions/${discussionNumber}/comments`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description **Deprecation Notice:** This endpoint route is deprecated and will be removed from the Teams API. We recommend migrating your existing code to use the new [Create a discussion comment](https://docs.github.com/rest/reference/teams#create-a-discussion-comment) endpoint. Creates a new comment on a team discussion. OAuth access tokens require the `write:discussion` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/). This endpoint triggers [notifications](https://docs.github.com/en/github/managing-subscriptions-and-notifications-on-github/about-notifications). Creating content too quickly using this endpoint may result in abuse rate limiting. See "[Abuse rate limits](https://docs.github.com/rest/overview/resources-in-the-rest-api#abuse-rate-limits)" and "[Dealing with abuse rate limits](https://docs.github.com/rest/guides/best-practices-for-integrators#dealing-with-rate-limits)" for details.
     *
     * @tags teams
     * @name TeamsCreateDiscussionCommentLegacy
     * @summary Create a discussion comment (Legacy)
     * @request POST:/teams/{team_id}/discussions/{discussion_number}/comments
     * @deprecated
     */
    teamsCreateDiscussionCommentLegacy: (
      teamId: number,
      discussionNumber: number,
      data: { body: string },
      params: RequestParams = {},
    ) =>
      this.request<TeamDiscussionComment, any>({
        path: `/teams/${teamId}/discussions/${discussionNumber}/comments`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description **Deprecation Notice:** This endpoint route is deprecated and will be removed from the Teams API. We recommend migrating your existing code to use the new [Get a discussion comment](https://docs.github.com/rest/reference/teams#get-a-discussion-comment) endpoint. Get a specific comment on a team discussion. OAuth access tokens require the `read:discussion` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/).
     *
     * @tags teams
     * @name TeamsGetDiscussionCommentLegacy
     * @summary Get a discussion comment (Legacy)
     * @request GET:/teams/{team_id}/discussions/{discussion_number}/comments/{comment_number}
     * @deprecated
     */
    teamsGetDiscussionCommentLegacy: (
      teamId: number,
      discussionNumber: number,
      commentNumber: number,
      params: RequestParams = {},
    ) =>
      this.request<TeamDiscussionComment, any>({
        path: `/teams/${teamId}/discussions/${discussionNumber}/comments/${commentNumber}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description **Deprecation Notice:** This endpoint route is deprecated and will be removed from the Teams API. We recommend migrating your existing code to use the new [Update a discussion comment](https://docs.github.com/rest/reference/teams#update-a-discussion-comment) endpoint. Edits the body text of a discussion comment. OAuth access tokens require the `write:discussion` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/).
     *
     * @tags teams
     * @name TeamsUpdateDiscussionCommentLegacy
     * @summary Update a discussion comment (Legacy)
     * @request PATCH:/teams/{team_id}/discussions/{discussion_number}/comments/{comment_number}
     * @deprecated
     */
    teamsUpdateDiscussionCommentLegacy: (
      teamId: number,
      discussionNumber: number,
      commentNumber: number,
      data: { body: string },
      params: RequestParams = {},
    ) =>
      this.request<TeamDiscussionComment, any>({
        path: `/teams/${teamId}/discussions/${discussionNumber}/comments/${commentNumber}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description **Deprecation Notice:** This endpoint route is deprecated and will be removed from the Teams API. We recommend migrating your existing code to use the new [Delete a discussion comment](https://docs.github.com/rest/reference/teams#delete-a-discussion-comment) endpoint. Deletes a comment on a team discussion. OAuth access tokens require the `write:discussion` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/).
     *
     * @tags teams
     * @name TeamsDeleteDiscussionCommentLegacy
     * @summary Delete a discussion comment (Legacy)
     * @request DELETE:/teams/{team_id}/discussions/{discussion_number}/comments/{comment_number}
     * @deprecated
     */
    teamsDeleteDiscussionCommentLegacy: (
      teamId: number,
      discussionNumber: number,
      commentNumber: number,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/teams/${teamId}/discussions/${discussionNumber}/comments/${commentNumber}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description **Deprecation Notice:** This endpoint route is deprecated and will be removed from the Teams API. We recommend migrating your existing code to use the new [`List reactions for a team discussion comment`](https://docs.github.com/rest/reference/reactions#list-reactions-for-a-team-discussion-comment) endpoint. List the reactions to a [team discussion comment](https://docs.github.com/rest/reference/teams#discussion-comments). OAuth access tokens require the `read:discussion` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/).
     *
     * @tags reactions
     * @name ReactionsListForTeamDiscussionCommentLegacy
     * @summary List reactions for a team discussion comment (Legacy)
     * @request GET:/teams/{team_id}/discussions/{discussion_number}/comments/{comment_number}/reactions
     * @deprecated
     */
    reactionsListForTeamDiscussionCommentLegacy: (
      teamId: number,
      discussionNumber: number,
      commentNumber: number,
      query?: {
        content?: "+1" | "-1" | "laugh" | "confused" | "heart" | "hooray" | "rocket" | "eyes";
        per_page?: number;
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<Reaction[], any>({
        path: `/teams/${teamId}/discussions/${discussionNumber}/comments/${commentNumber}/reactions`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description **Deprecation Notice:** This endpoint route is deprecated and will be removed from the Teams API. We recommend migrating your existing code to use the new "[Create reaction for a team discussion comment](https://docs.github.com/rest/reference/reactions#create-reaction-for-a-team-discussion-comment)" endpoint. Create a reaction to a [team discussion comment](https://docs.github.com/rest/reference/teams#discussion-comments). OAuth access tokens require the `write:discussion` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/). A response with a `Status: 200 OK` means that you already added the reaction type to this team discussion comment.
     *
     * @tags reactions
     * @name ReactionsCreateForTeamDiscussionCommentLegacy
     * @summary Create reaction for a team discussion comment (Legacy)
     * @request POST:/teams/{team_id}/discussions/{discussion_number}/comments/{comment_number}/reactions
     * @deprecated
     */
    reactionsCreateForTeamDiscussionCommentLegacy: (
      teamId: number,
      discussionNumber: number,
      commentNumber: number,
      data: { content: "+1" | "-1" | "laugh" | "confused" | "heart" | "hooray" | "rocket" | "eyes" },
      params: RequestParams = {},
    ) =>
      this.request<Reaction, any>({
        path: `/teams/${teamId}/discussions/${discussionNumber}/comments/${commentNumber}/reactions`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description **Deprecation Notice:** This endpoint route is deprecated and will be removed from the Teams API. We recommend migrating your existing code to use the new [`List reactions for a team discussion`](https://docs.github.com/rest/reference/reactions#list-reactions-for-a-team-discussion) endpoint. List the reactions to a [team discussion](https://docs.github.com/rest/reference/teams#discussions). OAuth access tokens require the `read:discussion` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/).
     *
     * @tags reactions
     * @name ReactionsListForTeamDiscussionLegacy
     * @summary List reactions for a team discussion (Legacy)
     * @request GET:/teams/{team_id}/discussions/{discussion_number}/reactions
     * @deprecated
     */
    reactionsListForTeamDiscussionLegacy: (
      teamId: number,
      discussionNumber: number,
      query?: {
        content?: "+1" | "-1" | "laugh" | "confused" | "heart" | "hooray" | "rocket" | "eyes";
        per_page?: number;
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<Reaction[], any>({
        path: `/teams/${teamId}/discussions/${discussionNumber}/reactions`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description **Deprecation Notice:** This endpoint route is deprecated and will be removed from the Teams API. We recommend migrating your existing code to use the new [`Create reaction for a team discussion`](https://docs.github.com/rest/reference/reactions#create-reaction-for-a-team-discussion) endpoint. Create a reaction to a [team discussion](https://docs.github.com/rest/reference/teams#discussions). OAuth access tokens require the `write:discussion` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/). A response with a `Status: 200 OK` means that you already added the reaction type to this team discussion.
     *
     * @tags reactions
     * @name ReactionsCreateForTeamDiscussionLegacy
     * @summary Create reaction for a team discussion (Legacy)
     * @request POST:/teams/{team_id}/discussions/{discussion_number}/reactions
     * @deprecated
     */
    reactionsCreateForTeamDiscussionLegacy: (
      teamId: number,
      discussionNumber: number,
      data: { content: "+1" | "-1" | "laugh" | "confused" | "heart" | "hooray" | "rocket" | "eyes" },
      params: RequestParams = {},
    ) =>
      this.request<Reaction, any>({
        path: `/teams/${teamId}/discussions/${discussionNumber}/reactions`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description **Deprecation Notice:** This endpoint route is deprecated and will be removed from the Teams API. We recommend migrating your existing code to use the new [`List pending team invitations`](https://docs.github.com/rest/reference/teams#list-pending-team-invitations) endpoint. The return hash contains a `role` field which refers to the Organization Invitation role and will be one of the following values: `direct_member`, `admin`, `billing_manager`, `hiring_manager`, or `reinstate`. If the invitee is not a GitHub member, the `login` field in the return hash will be `null`.
     *
     * @tags teams
     * @name TeamsListPendingInvitationsLegacy
     * @summary List pending team invitations (Legacy)
     * @request GET:/teams/{team_id}/invitations
     * @deprecated
     */
    teamsListPendingInvitationsLegacy: (
      teamId: number,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<OrganizationInvitation[], any>({
        path: `/teams/${teamId}/invitations`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description **Deprecation Notice:** This endpoint route is deprecated and will be removed from the Teams API. We recommend migrating your existing code to use the new [`List team members`](https://docs.github.com/rest/reference/teams#list-team-members) endpoint. Team members will include the members of child teams.
     *
     * @tags teams
     * @name TeamsListMembersLegacy
     * @summary List team members (Legacy)
     * @request GET:/teams/{team_id}/members
     * @deprecated
     */
    teamsListMembersLegacy: (
      teamId: number,
      query?: { role?: "member" | "maintainer" | "all"; per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<SimpleUser[], BasicError>({
        path: `/teams/${teamId}/members`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description The "Get team member" endpoint (described below) is deprecated. We recommend using the [Get team membership for a user](https://docs.github.com/rest/reference/teams#get-team-membership-for-a-user) endpoint instead. It allows you to get both active and pending memberships. To list members in a team, the team must be visible to the authenticated user.
     *
     * @tags teams
     * @name TeamsGetMemberLegacy
     * @summary Get team member (Legacy)
     * @request GET:/teams/{team_id}/members/{username}
     * @deprecated
     */
    teamsGetMemberLegacy: (teamId: number, username: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/teams/${teamId}/members/${username}`,
        method: "GET",
        ...params,
      }),

    /**
     * @description The "Add team member" endpoint (described below) is deprecated. We recommend using the [Add or update team membership for a user](https://docs.github.com/rest/reference/teams#add-or-update-team-membership-for-a-user) endpoint instead. It allows you to invite new organization members to your teams. Team synchronization is available for organizations using GitHub Enterprise Cloud. For more information, see [GitHub's products](https://help.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation. To add someone to a team, the authenticated user must be an organization owner or a team maintainer in the team they're changing. The person being added to the team must be a member of the team's organization. **Note:** When you have team synchronization set up for a team with your organization's identity provider (IdP), you will see an error if you attempt to use the API for making changes to the team's membership. If you have access to manage group membership in your IdP, you can manage GitHub team membership through your identity provider, which automatically adds and removes team members in an organization. For more information, see "[Synchronizing teams between your identity provider and GitHub](https://help.github.com/articles/synchronizing-teams-between-your-identity-provider-and-github/)." Note that you'll need to set `Content-Length` to zero when calling out to this endpoint. For more information, see "[HTTP verbs](https://docs.github.com/rest/overview/resources-in-the-rest-api#http-verbs)."
     *
     * @tags teams
     * @name TeamsAddMemberLegacy
     * @summary Add team member (Legacy)
     * @request PUT:/teams/{team_id}/members/{username}
     * @deprecated
     */
    teamsAddMemberLegacy: (teamId: number, username: string, params: RequestParams = {}) =>
      this.request<
        void,
        | BasicError
        | void
        | {
            message?: string;
            errors?: { code?: string; field?: string; resource?: string }[];
            documentation_url?: string;
          }
      >({
        path: `/teams/${teamId}/members/${username}`,
        method: "PUT",
        ...params,
      }),

    /**
     * @description The "Remove team member" endpoint (described below) is deprecated. We recommend using the [Remove team membership for a user](https://docs.github.com/rest/reference/teams#remove-team-membership-for-a-user) endpoint instead. It allows you to remove both active and pending memberships. Team synchronization is available for organizations using GitHub Enterprise Cloud. For more information, see [GitHub's products](https://help.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation. To remove a team member, the authenticated user must have 'admin' permissions to the team or be an owner of the org that the team is associated with. Removing a team member does not delete the user, it just removes them from the team. **Note:** When you have team synchronization set up for a team with your organization's identity provider (IdP), you will see an error if you attempt to use the API for making changes to the team's membership. If you have access to manage group membership in your IdP, you can manage GitHub team membership through your identity provider, which automatically adds and removes team members in an organization. For more information, see "[Synchronizing teams between your identity provider and GitHub](https://help.github.com/articles/synchronizing-teams-between-your-identity-provider-and-github/)."
     *
     * @tags teams
     * @name TeamsRemoveMemberLegacy
     * @summary Remove team member (Legacy)
     * @request DELETE:/teams/{team_id}/members/{username}
     * @deprecated
     */
    teamsRemoveMemberLegacy: (teamId: number, username: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/teams/${teamId}/members/${username}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description **Deprecation Notice:** This endpoint route is deprecated and will be removed from the Teams API. We recommend migrating your existing code to use the new [Get team membership for a user](https://docs.github.com/rest/reference/teams#get-team-membership-for-a-user) endpoint. Team members will include the members of child teams. To get a user's membership with a team, the team must be visible to the authenticated user. **Note:** The `role` for organization owners returns as `maintainer`. For more information about `maintainer` roles, see [Create a team](https://docs.github.com/rest/reference/teams#create-a-team).
     *
     * @tags teams
     * @name TeamsGetMembershipForUserLegacy
     * @summary Get team membership for a user (Legacy)
     * @request GET:/teams/{team_id}/memberships/{username}
     * @deprecated
     */
    teamsGetMembershipForUserLegacy: (teamId: number, username: string, params: RequestParams = {}) =>
      this.request<TeamMembership, BasicError>({
        path: `/teams/${teamId}/memberships/${username}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description **Deprecation Notice:** This endpoint route is deprecated and will be removed from the Teams API. We recommend migrating your existing code to use the new [Add or update team membership for a user](https://docs.github.com/rest/reference/teams#add-or-update-team-membership-for-a-user) endpoint. Team synchronization is available for organizations using GitHub Enterprise Cloud. For more information, see [GitHub's products](https://help.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation. If the user is already a member of the team's organization, this endpoint will add the user to the team. To add a membership between an organization member and a team, the authenticated user must be an organization owner or a team maintainer. **Note:** When you have team synchronization set up for a team with your organization's identity provider (IdP), you will see an error if you attempt to use the API for making changes to the team's membership. If you have access to manage group membership in your IdP, you can manage GitHub team membership through your identity provider, which automatically adds and removes team members in an organization. For more information, see "[Synchronizing teams between your identity provider and GitHub](https://help.github.com/articles/synchronizing-teams-between-your-identity-provider-and-github/)." If the user is unaffiliated with the team's organization, this endpoint will send an invitation to the user via email. This newly-created membership will be in the "pending" state until the user accepts the invitation, at which point the membership will transition to the "active" state and the user will be added as a member of the team. To add a membership between an unaffiliated user and a team, the authenticated user must be an organization owner. If the user is already a member of the team, this endpoint will update the role of the team member's role. To update the membership of a team member, the authenticated user must be an organization owner or a team maintainer.
     *
     * @tags teams
     * @name TeamsAddOrUpdateMembershipForUserLegacy
     * @summary Add or update team membership for a user (Legacy)
     * @request PUT:/teams/{team_id}/memberships/{username}
     * @deprecated
     */
    teamsAddOrUpdateMembershipForUserLegacy: (
      teamId: number,
      username: string,
      data: { role?: "member" | "maintainer" },
      params: RequestParams = {},
    ) =>
      this.request<
        TeamMembership,
        | void
        | BasicError
        | {
            message?: string;
            errors?: { code?: string; field?: string; resource?: string }[];
            documentation_url?: string;
          }
      >({
        path: `/teams/${teamId}/memberships/${username}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description **Deprecation Notice:** This endpoint route is deprecated and will be removed from the Teams API. We recommend migrating your existing code to use the new [Remove team membership for a user](https://docs.github.com/rest/reference/teams#remove-team-membership-for-a-user) endpoint. Team synchronization is available for organizations using GitHub Enterprise Cloud. For more information, see [GitHub's products](https://help.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation. To remove a membership between a user and a team, the authenticated user must have 'admin' permissions to the team or be an owner of the organization that the team is associated with. Removing team membership does not delete the user, it just removes their membership from the team. **Note:** When you have team synchronization set up for a team with your organization's identity provider (IdP), you will see an error if you attempt to use the API for making changes to the team's membership. If you have access to manage group membership in your IdP, you can manage GitHub team membership through your identity provider, which automatically adds and removes team members in an organization. For more information, see "[Synchronizing teams between your identity provider and GitHub](https://help.github.com/articles/synchronizing-teams-between-your-identity-provider-and-github/)."
     *
     * @tags teams
     * @name TeamsRemoveMembershipForUserLegacy
     * @summary Remove team membership for a user (Legacy)
     * @request DELETE:/teams/{team_id}/memberships/{username}
     * @deprecated
     */
    teamsRemoveMembershipForUserLegacy: (teamId: number, username: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/teams/${teamId}/memberships/${username}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description **Deprecation Notice:** This endpoint route is deprecated and will be removed from the Teams API. We recommend migrating your existing code to use the new [`List team projects`](https://docs.github.com/rest/reference/teams#list-team-projects) endpoint. Lists the organization projects for a team.
     *
     * @tags teams
     * @name TeamsListProjectsLegacy
     * @summary List team projects (Legacy)
     * @request GET:/teams/{team_id}/projects
     * @deprecated
     */
    teamsListProjectsLegacy: (
      teamId: number,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<TeamProject[], BasicError | { message: string; documentation_url: string }>({
        path: `/teams/${teamId}/projects`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description **Deprecation Notice:** This endpoint route is deprecated and will be removed from the Teams API. We recommend migrating your existing code to use the new [Check team permissions for a project](https://docs.github.com/rest/reference/teams#check-team-permissions-for-a-project) endpoint. Checks whether a team has `read`, `write`, or `admin` permissions for an organization project. The response includes projects inherited from a parent team.
     *
     * @tags teams
     * @name TeamsCheckPermissionsForProjectLegacy
     * @summary Check team permissions for a project (Legacy)
     * @request GET:/teams/{team_id}/projects/{project_id}
     * @deprecated
     */
    teamsCheckPermissionsForProjectLegacy: (teamId: number, projectId: number, params: RequestParams = {}) =>
      this.request<TeamProject, void | { message: string; documentation_url: string }>({
        path: `/teams/${teamId}/projects/${projectId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description **Deprecation Notice:** This endpoint route is deprecated and will be removed from the Teams API. We recommend migrating your existing code to use the new [Add or update team project permissions](https://docs.github.com/rest/reference/teams#add-or-update-team-project-permissions) endpoint. Adds an organization project to a team. To add a project to a team or update the team's permission on a project, the authenticated user must have `admin` permissions for the project. The project and team must be part of the same organization.
     *
     * @tags teams
     * @name TeamsAddOrUpdateProjectPermissionsLegacy
     * @summary Add or update team project permissions (Legacy)
     * @request PUT:/teams/{team_id}/projects/{project_id}
     * @deprecated
     */
    teamsAddOrUpdateProjectPermissionsLegacy: (
      teamId: number,
      projectId: number,
      data: { permission?: "read" | "write" | "admin" },
      params: RequestParams = {},
    ) =>
      this.request<
        void,
        | { message?: string; documentation_url?: string }
        | BasicError
        | { message: string; documentation_url: string }
        | ValidationError
      >({
        path: `/teams/${teamId}/projects/${projectId}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description **Deprecation Notice:** This endpoint route is deprecated and will be removed from the Teams API. We recommend migrating your existing code to use the new [Remove a project from a team](https://docs.github.com/rest/reference/teams#remove-a-project-from-a-team) endpoint. Removes an organization project from a team. An organization owner or a team maintainer can remove any project from the team. To remove a project from a team as an organization member, the authenticated user must have `read` access to both the team and project, or `admin` access to the team or project. **Note:** This endpoint removes the project from the team, but does not delete it.
     *
     * @tags teams
     * @name TeamsRemoveProjectLegacy
     * @summary Remove a project from a team (Legacy)
     * @request DELETE:/teams/{team_id}/projects/{project_id}
     * @deprecated
     */
    teamsRemoveProjectLegacy: (teamId: number, projectId: number, params: RequestParams = {}) =>
      this.request<void, BasicError | { message: string; documentation_url: string } | ValidationError>({
        path: `/teams/${teamId}/projects/${projectId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description **Deprecation Notice:** This endpoint route is deprecated and will be removed from the Teams API. We recommend migrating your existing code to use the new [List team repositories](https://docs.github.com/rest/reference/teams#list-team-repositories) endpoint.
     *
     * @tags teams
     * @name TeamsListReposLegacy
     * @summary List team repositories (Legacy)
     * @request GET:/teams/{team_id}/repos
     * @deprecated
     */
    teamsListReposLegacy: (teamId: number, query?: { per_page?: number; page?: number }, params: RequestParams = {}) =>
      this.request<MinimalRepository[], BasicError>({
        path: `/teams/${teamId}/repos`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description **Note**: Repositories inherited through a parent team will also be checked. **Deprecation Notice:** This endpoint route is deprecated and will be removed from the Teams API. We recommend migrating your existing code to use the new [Check team permissions for a repository](https://docs.github.com/rest/reference/teams#check-team-permissions-for-a-repository) endpoint. You can also get information about the specified repository, including what permissions the team grants on it, by passing the following custom [media type](https://docs.github.com/rest/overview/media-types/) via the `Accept` header:
     *
     * @tags teams
     * @name TeamsCheckPermissionsForRepoLegacy
     * @summary Check team permissions for a repository (Legacy)
     * @request GET:/teams/{team_id}/repos/{owner}/{repo}
     * @deprecated
     */
    teamsCheckPermissionsForRepoLegacy: (teamId: number, owner: string, repo: string, params: RequestParams = {}) =>
      this.request<TeamRepository, void>({
        path: `/teams/${teamId}/repos/${owner}/${repo}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description **Deprecation Notice:** This endpoint route is deprecated and will be removed from the Teams API. We recommend migrating your existing code to use the new "[Add or update team repository permissions](https://docs.github.com/rest/reference/teams#add-or-update-team-repository-permissions)" endpoint. To add a repository to a team or update the team's permission on a repository, the authenticated user must have admin access to the repository, and must be able to see the team. The repository must be owned by the organization, or a direct fork of a repository owned by the organization. You will get a `422 Unprocessable Entity` status if you attempt to add a repository to a team that is not owned by the organization. Note that, if you choose not to pass any parameters, you'll need to set `Content-Length` to zero when calling out to this endpoint. For more information, see "[HTTP verbs](https://docs.github.com/rest/overview/resources-in-the-rest-api#http-verbs)."
     *
     * @tags teams
     * @name TeamsAddOrUpdateRepoPermissionsLegacy
     * @summary Add or update team repository permissions (Legacy)
     * @request PUT:/teams/{team_id}/repos/{owner}/{repo}
     * @deprecated
     */
    teamsAddOrUpdateRepoPermissionsLegacy: (
      teamId: number,
      owner: string,
      repo: string,
      data: { permission?: "pull" | "push" | "admin" },
      params: RequestParams = {},
    ) =>
      this.request<void, BasicError | ValidationError>({
        path: `/teams/${teamId}/repos/${owner}/${repo}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description **Deprecation Notice:** This endpoint route is deprecated and will be removed from the Teams API. We recommend migrating your existing code to use the new [Remove a repository from a team](https://docs.github.com/rest/reference/teams#remove-a-repository-from-a-team) endpoint. If the authenticated user is an organization owner or a team maintainer, they can remove any repositories from the team. To remove a repository from a team as an organization member, the authenticated user must have admin access to the repository and must be able to see the team. NOTE: This does not delete the repository, it just removes it from the team.
     *
     * @tags teams
     * @name TeamsRemoveRepoLegacy
     * @summary Remove a repository from a team (Legacy)
     * @request DELETE:/teams/{team_id}/repos/{owner}/{repo}
     * @deprecated
     */
    teamsRemoveRepoLegacy: (teamId: number, owner: string, repo: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/teams/${teamId}/repos/${owner}/${repo}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description **Deprecation Notice:** This endpoint route is deprecated and will be removed from the Teams API. We recommend migrating your existing code to use the new [`List IdP groups for a team`](https://docs.github.com/rest/reference/teams#list-idp-groups-for-a-team) endpoint. Team synchronization is available for organizations using GitHub Enterprise Cloud. For more information, see [GitHub's products](https://help.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation. List IdP groups connected to a team on GitHub.
     *
     * @tags teams
     * @name TeamsListIdpGroupsForLegacy
     * @summary List IdP groups for a team (Legacy)
     * @request GET:/teams/{team_id}/team-sync/group-mappings
     * @deprecated
     */
    teamsListIdpGroupsForLegacy: (teamId: number, params: RequestParams = {}) =>
      this.request<GroupMapping, BasicError>({
        path: `/teams/${teamId}/team-sync/group-mappings`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description **Deprecation Notice:** This endpoint route is deprecated and will be removed from the Teams API. We recommend migrating your existing code to use the new [`Create or update IdP group connections`](https://docs.github.com/rest/reference/teams#create-or-update-idp-group-connections) endpoint. Team synchronization is available for organizations using GitHub Enterprise Cloud. For more information, see [GitHub's products](https://help.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation. Creates, updates, or removes a connection between a team and an IdP group. When adding groups to a team, you must include all new and existing groups to avoid replacing existing groups with the new ones. Specifying an empty `groups` array will remove all connections for a team.
     *
     * @tags teams
     * @name TeamsCreateOrUpdateIdpGroupConnectionsLegacy
     * @summary Create or update IdP group connections (Legacy)
     * @request PATCH:/teams/{team_id}/team-sync/group-mappings
     * @deprecated
     */
    teamsCreateOrUpdateIdpGroupConnectionsLegacy: (
      teamId: number,
      data: {
        groups: {
          group_id: string;
          group_name: string;
          group_description: string;
          id?: string;
          name?: string;
          description?: string;
        }[];
        synced_at?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<GroupMapping, BasicError | ValidationError>({
        path: `/teams/${teamId}/team-sync/group-mappings`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description **Deprecation Notice:** This endpoint route is deprecated and will be removed from the Teams API. We recommend migrating your existing code to use the new [`List child teams`](https://docs.github.com/rest/reference/teams#list-child-teams) endpoint.
     *
     * @tags teams
     * @name TeamsListChildLegacy
     * @summary List child teams (Legacy)
     * @request GET:/teams/{team_id}/teams
     * @deprecated
     */
    teamsListChildLegacy: (teamId: number, query?: { per_page?: number; page?: number }, params: RequestParams = {}) =>
      this.request<Team[], BasicError | ValidationError>({
        path: `/teams/${teamId}/teams`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  user = {
    /**
     * @description If the authenticated user is authenticated through basic authentication or OAuth with the `user` scope, then the response lists public and private profile information. If the authenticated user is authenticated through OAuth without the `user` scope, then the response lists only public profile information.
     *
     * @tags users
     * @name UsersGetAuthenticated
     * @summary Get the authenticated user
     * @request GET:/user
     */
    usersGetAuthenticated: (params: RequestParams = {}) =>
      this.request<PrivateUser | PublicUser, BasicError>({
        path: `/user`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description **Note:** If your email is set to private and you send an `email` parameter as part of this request to update your profile, your privacy settings are still enforced: the email address will not be displayed on your public profile or via the API.
     *
     * @tags users
     * @name UsersUpdateAuthenticated
     * @summary Update the authenticated user
     * @request PATCH:/user
     */
    usersUpdateAuthenticated: (
      data: {
        name?: string;
        email?: string;
        blog?: string;
        twitter_username?: string | null;
        company?: string;
        location?: string;
        hireable?: boolean;
        bio?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<PrivateUser, BasicError | ValidationError>({
        path: `/user`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description List the users you've blocked on your personal account.
     *
     * @tags users
     * @name UsersListBlockedByAuthenticated
     * @summary List users blocked by the authenticated user
     * @request GET:/user/blocks
     */
    usersListBlockedByAuthenticated: (params: RequestParams = {}) =>
      this.request<SimpleUser[], BasicError | { message: string; documentation_url: string }>({
        path: `/user/blocks`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersCheckBlocked
     * @summary Check if a user is blocked by the authenticated user
     * @request GET:/user/blocks/{username}
     */
    usersCheckBlocked: (username: string, params: RequestParams = {}) =>
      this.request<void, BasicError>({
        path: `/user/blocks/${username}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersBlock
     * @summary Block a user
     * @request PUT:/user/blocks/{username}
     */
    usersBlock: (username: string, params: RequestParams = {}) =>
      this.request<void, BasicError | ValidationError>({
        path: `/user/blocks/${username}`,
        method: "PUT",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersUnblock
     * @summary Unblock a user
     * @request DELETE:/user/blocks/{username}
     */
    usersUnblock: (username: string, params: RequestParams = {}) =>
      this.request<void, BasicError>({
        path: `/user/blocks/${username}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Sets the visibility for your primary email addresses.
     *
     * @tags users
     * @name UsersSetPrimaryEmailVisibilityForAuthenticated
     * @summary Set primary email visibility for the authenticated user
     * @request PATCH:/user/email/visibility
     */
    usersSetPrimaryEmailVisibilityForAuthenticated: (
      data: { email: string; visibility: "public" | "private" },
      params: RequestParams = {},
    ) =>
      this.request<Email[], BasicError | ValidationError>({
        path: `/user/email/visibility`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Lists all of your email addresses, and specifies which one is visible to the public. This endpoint is accessible with the `user:email` scope.
     *
     * @tags users
     * @name UsersListEmailsForAuthenticated
     * @summary List email addresses for the authenticated user
     * @request GET:/user/emails
     */
    usersListEmailsForAuthenticated: (query?: { per_page?: number; page?: number }, params: RequestParams = {}) =>
      this.request<Email[], BasicError>({
        path: `/user/emails`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description This endpoint is accessible with the `user` scope.
     *
     * @tags users
     * @name UsersAddEmailForAuthenticated
     * @summary Add an email address for the authenticated user
     * @request POST:/user/emails
     */
    usersAddEmailForAuthenticated: (data: { emails: string[] } | string[] | string, params: RequestParams = {}) =>
      this.request<Email[], BasicError | ValidationError>({
        path: `/user/emails`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description This endpoint is accessible with the `user` scope.
     *
     * @tags users
     * @name UsersDeleteEmailForAuthenticated
     * @summary Delete an email address for the authenticated user
     * @request DELETE:/user/emails
     */
    usersDeleteEmailForAuthenticated: (data: { emails: string[] } | string[] | string, params: RequestParams = {}) =>
      this.request<void, BasicError | ValidationError>({
        path: `/user/emails`,
        method: "DELETE",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Lists the people following the authenticated user.
     *
     * @tags users
     * @name UsersListFollowersForAuthenticatedUser
     * @summary List followers of the authenticated user
     * @request GET:/user/followers
     */
    usersListFollowersForAuthenticatedUser: (
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<SimpleUser[], BasicError>({
        path: `/user/followers`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Lists the people who the authenticated user follows.
     *
     * @tags users
     * @name UsersListFollowedByAuthenticated
     * @summary List the people the authenticated user follows
     * @request GET:/user/following
     */
    usersListFollowedByAuthenticated: (query?: { per_page?: number; page?: number }, params: RequestParams = {}) =>
      this.request<SimpleUser[], BasicError>({
        path: `/user/following`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersCheckPersonIsFollowedByAuthenticated
     * @summary Check if a person is followed by the authenticated user
     * @request GET:/user/following/{username}
     */
    usersCheckPersonIsFollowedByAuthenticated: (username: string, params: RequestParams = {}) =>
      this.request<void, BasicError>({
        path: `/user/following/${username}`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Note that you'll need to set `Content-Length` to zero when calling out to this endpoint. For more information, see "[HTTP verbs](https://docs.github.com/rest/overview/resources-in-the-rest-api#http-verbs)." Following a user requires the user to be logged in and authenticated with basic auth or OAuth with the `user:follow` scope.
     *
     * @tags users
     * @name UsersFollow
     * @summary Follow a user
     * @request PUT:/user/following/{username}
     */
    usersFollow: (username: string, params: RequestParams = {}) =>
      this.request<void, BasicError>({
        path: `/user/following/${username}`,
        method: "PUT",
        ...params,
      }),

    /**
     * @description Unfollowing a user requires the user to be logged in and authenticated with basic auth or OAuth with the `user:follow` scope.
     *
     * @tags users
     * @name UsersUnfollow
     * @summary Unfollow a user
     * @request DELETE:/user/following/{username}
     */
    usersUnfollow: (username: string, params: RequestParams = {}) =>
      this.request<void, BasicError>({
        path: `/user/following/${username}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Lists the current user's GPG keys. Requires that you are authenticated via Basic Auth or via OAuth with at least `read:gpg_key` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/).
     *
     * @tags users
     * @name UsersListGpgKeysForAuthenticated
     * @summary List GPG keys for the authenticated user
     * @request GET:/user/gpg_keys
     */
    usersListGpgKeysForAuthenticated: (query?: { per_page?: number; page?: number }, params: RequestParams = {}) =>
      this.request<GpgKey[], BasicError>({
        path: `/user/gpg_keys`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Adds a GPG key to the authenticated user's GitHub account. Requires that you are authenticated via Basic Auth, or OAuth with at least `write:gpg_key` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/).
     *
     * @tags users
     * @name UsersCreateGpgKeyForAuthenticated
     * @summary Create a GPG key for the authenticated user
     * @request POST:/user/gpg_keys
     */
    usersCreateGpgKeyForAuthenticated: (data: { armored_public_key: string }, params: RequestParams = {}) =>
      this.request<GpgKey, BasicError | ValidationError>({
        path: `/user/gpg_keys`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description View extended details for a single GPG key. Requires that you are authenticated via Basic Auth or via OAuth with at least `read:gpg_key` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/).
     *
     * @tags users
     * @name UsersGetGpgKeyForAuthenticated
     * @summary Get a GPG key for the authenticated user
     * @request GET:/user/gpg_keys/{gpg_key_id}
     */
    usersGetGpgKeyForAuthenticated: (gpgKeyId: number, params: RequestParams = {}) =>
      this.request<GpgKey, BasicError>({
        path: `/user/gpg_keys/${gpgKeyId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Removes a GPG key from the authenticated user's GitHub account. Requires that you are authenticated via Basic Auth or via OAuth with at least `admin:gpg_key` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/).
     *
     * @tags users
     * @name UsersDeleteGpgKeyForAuthenticated
     * @summary Delete a GPG key for the authenticated user
     * @request DELETE:/user/gpg_keys/{gpg_key_id}
     */
    usersDeleteGpgKeyForAuthenticated: (gpgKeyId: number, params: RequestParams = {}) =>
      this.request<void, BasicError | ValidationError>({
        path: `/user/gpg_keys/${gpgKeyId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Lists installations of your GitHub App that the authenticated user has explicit permission (`:read`, `:write`, or `:admin`) to access. You must use a [user-to-server OAuth access token](https://docs.github.com/apps/building-github-apps/identifying-and-authorizing-users-for-github-apps/#identifying-users-on-your-site), created for a user who has authorized your GitHub App, to access this endpoint. The authenticated user has explicit permission to access repositories they own, repositories where they are a collaborator, and repositories that they can access through an organization membership. You can find the permissions for the installation under the `permissions` key.
     *
     * @tags apps
     * @name AppsListInstallationsForAuthenticatedUser
     * @summary List app installations accessible to the user access token
     * @request GET:/user/installations
     */
    appsListInstallationsForAuthenticatedUser: (
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<
        { total_count: number; installations: Installation[] },
        BasicError | { message: string; documentation_url: string }
      >({
        path: `/user/installations`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description List repositories that the authenticated user has explicit permission (`:read`, `:write`, or `:admin`) to access for an installation. The authenticated user has explicit permission to access repositories they own, repositories where they are a collaborator, and repositories that they can access through an organization membership. You must use a [user-to-server OAuth access token](https://docs.github.com/apps/building-github-apps/identifying-and-authorizing-users-for-github-apps/#identifying-users-on-your-site), created for a user who has authorized your GitHub App, to access this endpoint. The access the user has to each repository is included in the hash under the `permissions` key.
     *
     * @tags apps
     * @name AppsListInstallationReposForAuthenticatedUser
     * @summary List repositories accessible to the user access token
     * @request GET:/user/installations/{installation_id}/repositories
     */
    appsListInstallationReposForAuthenticatedUser: (
      installationId: number,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<{ total_count: number; repository_selection?: string; repositories: Repository[] }, BasicError>({
        path: `/user/installations/${installationId}/repositories`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Add a single repository to an installation. The authenticated user must have admin access to the repository. You must use a personal access token (which you can create via the [command line](https://docs.github.com/github/authenticating-to-github/creating-a-personal-access-token) or [Basic Authentication](https://docs.github.com/rest/overview/other-authentication-methods#basic-authentication)) to access this endpoint.
     *
     * @tags apps
     * @name AppsAddRepoToInstallation
     * @summary Add a repository to an app installation
     * @request PUT:/user/installations/{installation_id}/repositories/{repository_id}
     */
    appsAddRepoToInstallation: (installationId: number, repositoryId: number, params: RequestParams = {}) =>
      this.request<void, BasicError>({
        path: `/user/installations/${installationId}/repositories/${repositoryId}`,
        method: "PUT",
        ...params,
      }),

    /**
     * @description Remove a single repository from an installation. The authenticated user must have admin access to the repository. You must use a personal access token (which you can create via the [command line](https://docs.github.com/github/authenticating-to-github/creating-a-personal-access-token) or [Basic Authentication](https://docs.github.com/rest/overview/other-authentication-methods#basic-authentication)) to access this endpoint.
     *
     * @tags apps
     * @name AppsRemoveRepoFromInstallation
     * @summary Remove a repository from an app installation
     * @request DELETE:/user/installations/{installation_id}/repositories/{repository_id}
     */
    appsRemoveRepoFromInstallation: (installationId: number, repositoryId: number, params: RequestParams = {}) =>
      this.request<void, BasicError>({
        path: `/user/installations/${installationId}/repositories/${repositoryId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Shows which type of GitHub user can interact with your public repositories and when the restriction expires. If there are no restrictions, you will see an empty response.
     *
     * @tags interactions
     * @name InteractionsGetRestrictionsForAuthenticatedUser
     * @summary Get interaction restrictions for your public repositories
     * @request GET:/user/interaction-limits
     */
    interactionsGetRestrictionsForAuthenticatedUser: (params: RequestParams = {}) =>
      this.request<InteractionLimitResponse, any>({
        path: `/user/interaction-limits`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Temporarily restricts which type of GitHub user can interact with your public repositories. Setting the interaction limit at the user level will overwrite any interaction limits that are set for individual repositories owned by the user.
     *
     * @tags interactions
     * @name InteractionsSetRestrictionsForAuthenticatedUser
     * @summary Set interaction restrictions for your public repositories
     * @request PUT:/user/interaction-limits
     */
    interactionsSetRestrictionsForAuthenticatedUser: (data: InteractionLimit, params: RequestParams = {}) =>
      this.request<InteractionLimitResponse, ValidationError>({
        path: `/user/interaction-limits`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Removes any interaction restrictions from your public repositories.
     *
     * @tags interactions
     * @name InteractionsRemoveRestrictionsForAuthenticatedUser
     * @summary Remove interaction restrictions from your public repositories
     * @request DELETE:/user/interaction-limits
     */
    interactionsRemoveRestrictionsForAuthenticatedUser: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/user/interaction-limits`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description List issues across owned and member repositories assigned to the authenticated user. **Note**: GitHub's REST API v3 considers every pull request an issue, but not every issue is a pull request. For this reason, "Issues" endpoints may return both issues and pull requests in the response. You can identify pull requests by the `pull_request` key. Be aware that the `id` of a pull request returned from "Issues" endpoints will be an _issue id_. To find out the pull request id, use the "[List pull requests](https://docs.github.com/rest/reference/pulls#list-pull-requests)" endpoint.
     *
     * @tags issues
     * @name IssuesListForAuthenticatedUser
     * @summary List user account issues assigned to the authenticated user
     * @request GET:/user/issues
     */
    issuesListForAuthenticatedUser: (
      query?: {
        filter?: "assigned" | "created" | "mentioned" | "subscribed" | "all";
        state?: "open" | "closed" | "all";
        labels?: string;
        sort?: "created" | "updated" | "comments";
        direction?: "asc" | "desc";
        since?: string;
        per_page?: number;
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<Issue[], BasicError>({
        path: `/user/issues`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Lists the public SSH keys for the authenticated user's GitHub account. Requires that you are authenticated via Basic Auth or via OAuth with at least `read:public_key` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/).
     *
     * @tags users
     * @name UsersListPublicSshKeysForAuthenticated
     * @summary List public SSH keys for the authenticated user
     * @request GET:/user/keys
     */
    usersListPublicSshKeysForAuthenticated: (
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<Key[], BasicError>({
        path: `/user/keys`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Adds a public SSH key to the authenticated user's GitHub account. Requires that you are authenticated via Basic Auth, or OAuth with at least `write:public_key` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/).
     *
     * @tags users
     * @name UsersCreatePublicSshKeyForAuthenticated
     * @summary Create a public SSH key for the authenticated user
     * @request POST:/user/keys
     */
    usersCreatePublicSshKeyForAuthenticated: (data: { title?: string; key: string }, params: RequestParams = {}) =>
      this.request<Key, BasicError | ValidationError>({
        path: `/user/keys`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description View extended details for a single public SSH key. Requires that you are authenticated via Basic Auth or via OAuth with at least `read:public_key` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/).
     *
     * @tags users
     * @name UsersGetPublicSshKeyForAuthenticated
     * @summary Get a public SSH key for the authenticated user
     * @request GET:/user/keys/{key_id}
     */
    usersGetPublicSshKeyForAuthenticated: (keyId: number, params: RequestParams = {}) =>
      this.request<Key, BasicError>({
        path: `/user/keys/${keyId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Removes a public SSH key from the authenticated user's GitHub account. Requires that you are authenticated via Basic Auth or via OAuth with at least `admin:public_key` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/).
     *
     * @tags users
     * @name UsersDeletePublicSshKeyForAuthenticated
     * @summary Delete a public SSH key for the authenticated user
     * @request DELETE:/user/keys/{key_id}
     */
    usersDeletePublicSshKeyForAuthenticated: (keyId: number, params: RequestParams = {}) =>
      this.request<void, BasicError>({
        path: `/user/keys/${keyId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Lists the active subscriptions for the authenticated user. You must use a [user-to-server OAuth access token](https://docs.github.com/apps/building-github-apps/identifying-and-authorizing-users-for-github-apps/#identifying-users-on-your-site), created for a user who has authorized your GitHub App, to access this endpoint. . OAuth Apps must authenticate using an [OAuth token](https://docs.github.com/apps/building-github-apps/authenticating-with-github-apps/).
     *
     * @tags apps
     * @name AppsListSubscriptionsForAuthenticatedUser
     * @summary List subscriptions for the authenticated user
     * @request GET:/user/marketplace_purchases
     */
    appsListSubscriptionsForAuthenticatedUser: (
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<UserMarketplacePurchase[], BasicError>({
        path: `/user/marketplace_purchases`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Lists the active subscriptions for the authenticated user. You must use a [user-to-server OAuth access token](https://docs.github.com/apps/building-github-apps/identifying-and-authorizing-users-for-github-apps/#identifying-users-on-your-site), created for a user who has authorized your GitHub App, to access this endpoint. . OAuth Apps must authenticate using an [OAuth token](https://docs.github.com/apps/building-github-apps/authenticating-with-github-apps/).
     *
     * @tags apps
     * @name AppsListSubscriptionsForAuthenticatedUserStubbed
     * @summary List subscriptions for the authenticated user (stubbed)
     * @request GET:/user/marketplace_purchases/stubbed
     */
    appsListSubscriptionsForAuthenticatedUserStubbed: (
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<UserMarketplacePurchase[], BasicError>({
        path: `/user/marketplace_purchases/stubbed`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags orgs
     * @name OrgsListMembershipsForAuthenticatedUser
     * @summary List organization memberships for the authenticated user
     * @request GET:/user/memberships/orgs
     */
    orgsListMembershipsForAuthenticatedUser: (
      query?: { state?: "active" | "pending"; per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<OrgMembership[], BasicError | ValidationError>({
        path: `/user/memberships/orgs`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags orgs
     * @name OrgsGetMembershipForAuthenticatedUser
     * @summary Get an organization membership for the authenticated user
     * @request GET:/user/memberships/orgs/{org}
     */
    orgsGetMembershipForAuthenticatedUser: (org: string, params: RequestParams = {}) =>
      this.request<OrgMembership, BasicError>({
        path: `/user/memberships/orgs/${org}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags orgs
     * @name OrgsUpdateMembershipForAuthenticatedUser
     * @summary Update an organization membership for the authenticated user
     * @request PATCH:/user/memberships/orgs/{org}
     */
    orgsUpdateMembershipForAuthenticatedUser: (org: string, data: { state: "active" }, params: RequestParams = {}) =>
      this.request<OrgMembership, BasicError | ValidationError>({
        path: `/user/memberships/orgs/${org}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Lists all migrations a user has started.
     *
     * @tags migrations
     * @name MigrationsListForAuthenticatedUser
     * @summary List user migrations
     * @request GET:/user/migrations
     */
    migrationsListForAuthenticatedUser: (query?: { per_page?: number; page?: number }, params: RequestParams = {}) =>
      this.request<Migration[], BasicError>({
        path: `/user/migrations`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Initiates the generation of a user migration archive.
     *
     * @tags migrations
     * @name MigrationsStartForAuthenticatedUser
     * @summary Start a user migration
     * @request POST:/user/migrations
     */
    migrationsStartForAuthenticatedUser: (
      data: {
        lock_repositories?: boolean;
        exclude_attachments?: boolean;
        exclude?: "repositories"[];
        repositories: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<Migration, BasicError | ValidationError>({
        path: `/user/migrations`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Fetches a single user migration. The response includes the `state` of the migration, which can be one of the following values: *   `pending` - the migration hasn't started yet. *   `exporting` - the migration is in progress. *   `exported` - the migration finished successfully. *   `failed` - the migration failed. Once the migration has been `exported` you can [download the migration archive](https://docs.github.com/rest/reference/migrations#download-a-user-migration-archive).
     *
     * @tags migrations
     * @name MigrationsGetStatusForAuthenticatedUser
     * @summary Get a user migration status
     * @request GET:/user/migrations/{migration_id}
     */
    migrationsGetStatusForAuthenticatedUser: (
      migrationId: number,
      query?: { exclude?: string[] },
      params: RequestParams = {},
    ) =>
      this.request<Migration, BasicError>({
        path: `/user/migrations/${migrationId}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Fetches the URL to download the migration archive as a `tar.gz` file. Depending on the resources your repository uses, the migration archive can contain JSON files with data for these objects: *   attachments *   bases *   commit\_comments *   issue\_comments *   issue\_events *   issues *   milestones *   organizations *   projects *   protected\_branches *   pull\_request\_reviews *   pull\_requests *   releases *   repositories *   review\_comments *   schema *   users The archive will also contain an `attachments` directory that includes all attachment files uploaded to GitHub.com and a `repositories` directory that contains the repository's Git data.
     *
     * @tags migrations
     * @name MigrationsGetArchiveForAuthenticatedUser
     * @summary Download a user migration archive
     * @request GET:/user/migrations/{migration_id}/archive
     */
    migrationsGetArchiveForAuthenticatedUser: (migrationId: number, params: RequestParams = {}) =>
      this.request<any, void | BasicError>({
        path: `/user/migrations/${migrationId}/archive`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Deletes a previous migration archive. Downloadable migration archives are automatically deleted after seven days. Migration metadata, which is returned in the [List user migrations](https://docs.github.com/rest/reference/migrations#list-user-migrations) and [Get a user migration status](https://docs.github.com/rest/reference/migrations#get-a-user-migration-status) endpoints, will continue to be available even after an archive is deleted.
     *
     * @tags migrations
     * @name MigrationsDeleteArchiveForAuthenticatedUser
     * @summary Delete a user migration archive
     * @request DELETE:/user/migrations/{migration_id}/archive
     */
    migrationsDeleteArchiveForAuthenticatedUser: (migrationId: number, params: RequestParams = {}) =>
      this.request<void, BasicError>({
        path: `/user/migrations/${migrationId}/archive`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Unlocks a repository. You can lock repositories when you [start a user migration](https://docs.github.com/rest/reference/migrations#start-a-user-migration). Once the migration is complete you can unlock each repository to begin using it again or [delete the repository](https://docs.github.com/rest/reference/repos#delete-a-repository) if you no longer need the source data. Returns a status of `404 Not Found` if the repository is not locked.
     *
     * @tags migrations
     * @name MigrationsUnlockRepoForAuthenticatedUser
     * @summary Unlock a user repository
     * @request DELETE:/user/migrations/{migration_id}/repos/{repo_name}/lock
     */
    migrationsUnlockRepoForAuthenticatedUser: (migrationId: number, repoName: string, params: RequestParams = {}) =>
      this.request<void, BasicError>({
        path: `/user/migrations/${migrationId}/repos/${repoName}/lock`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Lists all the repositories for this user migration.
     *
     * @tags migrations
     * @name MigrationsListReposForUser
     * @summary List repositories for a user migration
     * @request GET:/user/migrations/{migration_id}/repositories
     */
    migrationsListReposForUser: (
      migrationId: number,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<MinimalRepository[], BasicError>({
        path: `/user/migrations/${migrationId}/repositories`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description List organizations for the authenticated user. **OAuth scope requirements** This only lists organizations that your authorization allows you to operate on in some way (e.g., you can list teams with `read:org` scope, you can publicize your organization membership with `user` scope, etc.). Therefore, this API requires at least `user` or `read:org` scope. OAuth requests with insufficient scope receive a `403 Forbidden` response.
     *
     * @tags orgs
     * @name OrgsListForAuthenticatedUser
     * @summary List organizations for the authenticated user
     * @request GET:/user/orgs
     */
    orgsListForAuthenticatedUser: (query?: { per_page?: number; page?: number }, params: RequestParams = {}) =>
      this.request<OrganizationSimple[], BasicError>({
        path: `/user/orgs`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags projects
     * @name ProjectsCreateForAuthenticatedUser
     * @summary Create a user project
     * @request POST:/user/projects
     */
    projectsCreateForAuthenticatedUser: (data: { name: string; body?: string | null }, params: RequestParams = {}) =>
      this.request<Project, BasicError | { message: string; documentation_url: string } | ValidationErrorSimple>({
        path: `/user/projects`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Lists your publicly visible email address, which you can set with the [Set primary email visibility for the authenticated user](https://docs.github.com/rest/reference/users#set-primary-email-visibility-for-the-authenticated-user) endpoint. This endpoint is accessible with the `user:email` scope.
     *
     * @tags users
     * @name UsersListPublicEmailsForAuthenticated
     * @summary List public email addresses for the authenticated user
     * @request GET:/user/public_emails
     */
    usersListPublicEmailsForAuthenticated: (query?: { per_page?: number; page?: number }, params: RequestParams = {}) =>
      this.request<Email[], BasicError>({
        path: `/user/public_emails`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Lists repositories that the authenticated user has explicit permission (`:read`, `:write`, or `:admin`) to access. The authenticated user has explicit permission to access repositories they own, repositories where they are a collaborator, and repositories that they can access through an organization membership.
     *
     * @tags repos
     * @name ReposListForAuthenticatedUser
     * @summary List repositories for the authenticated user
     * @request GET:/user/repos
     */
    reposListForAuthenticatedUser: (
      query?: {
        visibility?: "all" | "public" | "private";
        affiliation?: string;
        type?: "all" | "owner" | "public" | "private" | "member";
        sort?: "created" | "updated" | "pushed" | "full_name";
        direction?: "asc" | "desc";
        per_page?: number;
        page?: number;
        since?: string;
        before?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Repository[], BasicError | ValidationError>({
        path: `/user/repos`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Creates a new repository for the authenticated user. **OAuth scope requirements** When using [OAuth](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/), authorizations must include: *   `public_repo` scope or `repo` scope to create a public repository *   `repo` scope to create a private repository
     *
     * @tags repos
     * @name ReposCreateForAuthenticatedUser
     * @summary Create a repository for the authenticated user
     * @request POST:/user/repos
     */
    reposCreateForAuthenticatedUser: (
      data: {
        name: string;
        description?: string;
        homepage?: string;
        private?: boolean;
        has_issues?: boolean;
        has_projects?: boolean;
        has_wiki?: boolean;
        team_id?: number;
        auto_init?: boolean;
        gitignore_template?: string;
        license_template?: string;
        allow_squash_merge?: boolean;
        allow_merge_commit?: boolean;
        allow_rebase_merge?: boolean;
        delete_branch_on_merge?: boolean;
        has_downloads?: boolean;
        is_template?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<Repository, BasicError | ValidationError>({
        path: `/user/repos`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description When authenticating as a user, this endpoint will list all currently open repository invitations for that user.
     *
     * @tags repos
     * @name ReposListInvitationsForAuthenticatedUser
     * @summary List repository invitations for the authenticated user
     * @request GET:/user/repository_invitations
     */
    reposListInvitationsForAuthenticatedUser: (
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<RepositoryInvitation[], BasicError>({
        path: `/user/repository_invitations`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags repos
     * @name ReposAcceptInvitation
     * @summary Accept a repository invitation
     * @request PATCH:/user/repository_invitations/{invitation_id}
     */
    reposAcceptInvitation: (invitationId: number, params: RequestParams = {}) =>
      this.request<void, BasicError>({
        path: `/user/repository_invitations/${invitationId}`,
        method: "PATCH",
        ...params,
      }),

    /**
     * No description
     *
     * @tags repos
     * @name ReposDeclineInvitation
     * @summary Decline a repository invitation
     * @request DELETE:/user/repository_invitations/{invitation_id}
     */
    reposDeclineInvitation: (invitationId: number, params: RequestParams = {}) =>
      this.request<void, BasicError>({
        path: `/user/repository_invitations/${invitationId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Lists repositories the authenticated user has starred. You can also find out _when_ stars were created by passing the following custom [media type](https://docs.github.com/rest/overview/media-types/) via the `Accept` header:
     *
     * @tags activity
     * @name ActivityListReposStarredByAuthenticatedUser
     * @summary List repositories starred by the authenticated user
     * @request GET:/user/starred
     */
    activityListReposStarredByAuthenticatedUser: (
      query?: { sort?: "created" | "updated"; direction?: "asc" | "desc"; per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<Repository[], BasicError>({
        path: `/user/starred`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags activity
     * @name ActivityCheckRepoIsStarredByAuthenticatedUser
     * @summary Check if a repository is starred by the authenticated user
     * @request GET:/user/starred/{owner}/{repo}
     */
    activityCheckRepoIsStarredByAuthenticatedUser: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<void, BasicError>({
        path: `/user/starred/${owner}/${repo}`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Note that you'll need to set `Content-Length` to zero when calling out to this endpoint. For more information, see "[HTTP verbs](https://docs.github.com/rest/overview/resources-in-the-rest-api#http-verbs)."
     *
     * @tags activity
     * @name ActivityStarRepoForAuthenticatedUser
     * @summary Star a repository for the authenticated user
     * @request PUT:/user/starred/{owner}/{repo}
     */
    activityStarRepoForAuthenticatedUser: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<void, BasicError>({
        path: `/user/starred/${owner}/${repo}`,
        method: "PUT",
        ...params,
      }),

    /**
     * No description
     *
     * @tags activity
     * @name ActivityUnstarRepoForAuthenticatedUser
     * @summary Unstar a repository for the authenticated user
     * @request DELETE:/user/starred/{owner}/{repo}
     */
    activityUnstarRepoForAuthenticatedUser: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<void, BasicError>({
        path: `/user/starred/${owner}/${repo}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Lists repositories the authenticated user is watching.
     *
     * @tags activity
     * @name ActivityListWatchedReposForAuthenticatedUser
     * @summary List repositories watched by the authenticated user
     * @request GET:/user/subscriptions
     */
    activityListWatchedReposForAuthenticatedUser: (
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<MinimalRepository[], BasicError>({
        path: `/user/subscriptions`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description List all of the teams across all of the organizations to which the authenticated user belongs. This method requires `user`, `repo`, or `read:org` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/) when authenticating via [OAuth](https://docs.github.com/apps/building-oauth-apps/).
     *
     * @tags teams
     * @name TeamsListForAuthenticatedUser
     * @summary List teams for the authenticated user
     * @request GET:/user/teams
     */
    teamsListForAuthenticatedUser: (query?: { per_page?: number; page?: number }, params: RequestParams = {}) =>
      this.request<TeamFull[], BasicError>({
        path: `/user/teams`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  users = {
    /**
     * @description Lists all users, in the order that they signed up on GitHub. This list includes personal user accounts and organization accounts. Note: Pagination is powered exclusively by the `since` parameter. Use the [Link header](https://docs.github.com/rest/overview/resources-in-the-rest-api#link-header) to get the URL for the next page of users.
     *
     * @tags users
     * @name UsersList
     * @summary List users
     * @request GET:/users
     */
    usersList: (query?: { since?: number; per_page?: number }, params: RequestParams = {}) =>
      this.request<SimpleUser[], any>({
        path: `/users`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Provides publicly available information about someone with a GitHub account. GitHub Apps with the `Plan` user permission can use this endpoint to retrieve information about a user's GitHub plan. The GitHub App must be authenticated as a user. See "[Identifying and authorizing users for GitHub Apps](https://docs.github.com/apps/building-github-apps/identifying-and-authorizing-users-for-github-apps/)" for details about authentication. For an example response, see 'Response with GitHub plan information' below" The `email` key in the following response is the publicly visible email address from your GitHub [profile page](https://github.com/settings/profile). When setting up your profile, you can select a primary email address to be “public” which provides an email entry for this endpoint. If you do not set a public email address for `email`, then it will have a value of `null`. You only see publicly visible email addresses when authenticated with GitHub. For more information, see [Authentication](https://docs.github.com/rest/overview/resources-in-the-rest-api#authentication). The Emails API enables you to list all of your email addresses, and toggle a primary email to be visible publicly. For more information, see "[Emails API](https://docs.github.com/rest/reference/users#emails)".
     *
     * @tags users
     * @name UsersGetByUsername
     * @summary Get a user
     * @request GET:/users/{username}
     */
    usersGetByUsername: (username: string, params: RequestParams = {}) =>
      this.request<PrivateUser | PublicUser, BasicError>({
        path: `/users/${username}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description If you are authenticated as the given user, you will see your private events. Otherwise, you'll only see public events.
     *
     * @tags activity
     * @name ActivityListEventsForAuthenticatedUser
     * @summary List events for the authenticated user
     * @request GET:/users/{username}/events
     */
    activityListEventsForAuthenticatedUser: (
      username: string,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<Event[], any>({
        path: `/users/${username}/events`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description This is the user's organization dashboard. You must be authenticated as the user to view this.
     *
     * @tags activity
     * @name ActivityListOrgEventsForAuthenticatedUser
     * @summary List organization events for the authenticated user
     * @request GET:/users/{username}/events/orgs/{org}
     */
    activityListOrgEventsForAuthenticatedUser: (
      username: string,
      org: string,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<Event[], any>({
        path: `/users/${username}/events/orgs/${org}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags activity
     * @name ActivityListPublicEventsForUser
     * @summary List public events for a user
     * @request GET:/users/{username}/events/public
     */
    activityListPublicEventsForUser: (
      username: string,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<Event[], any>({
        path: `/users/${username}/events/public`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Lists the people following the specified user.
     *
     * @tags users
     * @name UsersListFollowersForUser
     * @summary List followers of a user
     * @request GET:/users/{username}/followers
     */
    usersListFollowersForUser: (
      username: string,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<SimpleUser[], any>({
        path: `/users/${username}/followers`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Lists the people who the specified user follows.
     *
     * @tags users
     * @name UsersListFollowingForUser
     * @summary List the people a user follows
     * @request GET:/users/{username}/following
     */
    usersListFollowingForUser: (
      username: string,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<SimpleUser[], any>({
        path: `/users/${username}/following`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersCheckFollowingForUser
     * @summary Check if a user follows another user
     * @request GET:/users/{username}/following/{target_user}
     */
    usersCheckFollowingForUser: (username: string, targetUser: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/users/${username}/following/${targetUser}`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Lists public gists for the specified user:
     *
     * @tags gists
     * @name GistsListForUser
     * @summary List gists for a user
     * @request GET:/users/{username}/gists
     */
    gistsListForUser: (
      username: string,
      query?: { since?: string; per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<BaseGist[], ValidationError>({
        path: `/users/${username}/gists`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Lists the GPG keys for a user. This information is accessible by anyone.
     *
     * @tags users
     * @name UsersListGpgKeysForUser
     * @summary List GPG keys for a user
     * @request GET:/users/{username}/gpg_keys
     */
    usersListGpgKeysForUser: (
      username: string,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<GpgKey[], any>({
        path: `/users/${username}/gpg_keys`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Provides hovercard information when authenticated through basic auth or OAuth with the `repo` scope. You can find out more about someone in relation to their pull requests, issues, repositories, and organizations. The `subject_type` and `subject_id` parameters provide context for the person's hovercard, which returns more information than without the parameters. For example, if you wanted to find out more about `octocat` who owns the `Spoon-Knife` repository via cURL, it would look like this: ```shell curl -u username:token https://api.github.com/users/octocat/hovercard?subject_type=repository&subject_id=1300192 ```
     *
     * @tags users
     * @name UsersGetContextForUser
     * @summary Get contextual information for a user
     * @request GET:/users/{username}/hovercard
     */
    usersGetContextForUser: (
      username: string,
      query?: { subject_type?: "organization" | "repository" | "issue" | "pull_request"; subject_id?: string },
      params: RequestParams = {},
    ) =>
      this.request<Hovercard, BasicError | ValidationError>({
        path: `/users/${username}/hovercard`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Enables an authenticated GitHub App to find the user’s installation information. You must use a [JWT](https://docs.github.com/apps/building-github-apps/authenticating-with-github-apps/#authenticating-as-a-github-app) to access this endpoint.
     *
     * @tags apps
     * @name AppsGetUserInstallation
     * @summary Get a user installation for the authenticated app
     * @request GET:/users/{username}/installation
     */
    appsGetUserInstallation: (username: string, params: RequestParams = {}) =>
      this.request<Installation, any>({
        path: `/users/${username}/installation`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Lists the _verified_ public SSH keys for a user. This is accessible by anyone.
     *
     * @tags users
     * @name UsersListPublicKeysForUser
     * @summary List public keys for a user
     * @request GET:/users/{username}/keys
     */
    usersListPublicKeysForUser: (
      username: string,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<KeySimple[], any>({
        path: `/users/${username}/keys`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description List [public organization memberships](https://help.github.com/articles/publicizing-or-concealing-organization-membership) for the specified user. This method only lists _public_ memberships, regardless of authentication. If you need to fetch all of the organization memberships (public and private) for the authenticated user, use the [List organizations for the authenticated user](https://docs.github.com/rest/reference/orgs#list-organizations-for-the-authenticated-user) API instead.
     *
     * @tags orgs
     * @name OrgsListForUser
     * @summary List organizations for a user
     * @request GET:/users/{username}/orgs
     */
    orgsListForUser: (username: string, query?: { per_page?: number; page?: number }, params: RequestParams = {}) =>
      this.request<OrganizationSimple[], any>({
        path: `/users/${username}/orgs`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags projects
     * @name ProjectsListForUser
     * @summary List user projects
     * @request GET:/users/{username}/projects
     */
    projectsListForUser: (
      username: string,
      query?: { state?: "open" | "closed" | "all"; per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<Project[], { message: string; documentation_url: string } | ValidationError>({
        path: `/users/${username}/projects`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description These are events that you've received by watching repos and following users. If you are authenticated as the given user, you will see private events. Otherwise, you'll only see public events.
     *
     * @tags activity
     * @name ActivityListReceivedEventsForUser
     * @summary List events received by the authenticated user
     * @request GET:/users/{username}/received_events
     */
    activityListReceivedEventsForUser: (
      username: string,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<Event[], any>({
        path: `/users/${username}/received_events`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags activity
     * @name ActivityListReceivedPublicEventsForUser
     * @summary List public events received by a user
     * @request GET:/users/{username}/received_events/public
     */
    activityListReceivedPublicEventsForUser: (
      username: string,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<Event[], any>({
        path: `/users/${username}/received_events/public`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Lists public repositories for the specified user.
     *
     * @tags repos
     * @name ReposListForUser
     * @summary List repositories for a user
     * @request GET:/users/{username}/repos
     */
    reposListForUser: (
      username: string,
      query?: {
        type?: "all" | "owner" | "member";
        sort?: "created" | "updated" | "pushed" | "full_name";
        direction?: "asc" | "desc";
        per_page?: number;
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<MinimalRepository[], any>({
        path: `/users/${username}/repos`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets the summary of the free and paid GitHub Actions minutes used. Paid minutes only apply to workflows in private repositories that use GitHub-hosted runners. Minutes used is listed for each GitHub-hosted runner operating system. Any job re-runs are also included in the usage. The usage does not include the multiplier for macOS and Windows runners and is not rounded up to the nearest whole minute. For more information, see "[Managing billing for GitHub Actions](https://help.github.com/github/setting-up-and-managing-billing-and-payments-on-github/managing-billing-for-github-actions)". Access tokens must have the `user` scope.
     *
     * @tags billing
     * @name BillingGetGithubActionsBillingUser
     * @summary Get GitHub Actions billing for a user
     * @request GET:/users/{username}/settings/billing/actions
     */
    billingGetGithubActionsBillingUser: (username: string, params: RequestParams = {}) =>
      this.request<ActionsBillingUsage, any>({
        path: `/users/${username}/settings/billing/actions`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Gets the free and paid storage used for GitHub Packages in gigabytes. Paid minutes only apply to packages stored for private repositories. For more information, see "[Managing billing for GitHub Packages](https://help.github.com/github/setting-up-and-managing-billing-and-payments-on-github/managing-billing-for-github-packages)." Access tokens must have the `user` scope.
     *
     * @tags billing
     * @name BillingGetGithubPackagesBillingUser
     * @summary Get GitHub Packages billing for a user
     * @request GET:/users/{username}/settings/billing/packages
     */
    billingGetGithubPackagesBillingUser: (username: string, params: RequestParams = {}) =>
      this.request<PackagesBillingUsage, any>({
        path: `/users/${username}/settings/billing/packages`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Gets the estimated paid and estimated total storage used for GitHub Actions and Github Packages. Paid minutes only apply to packages stored for private repositories. For more information, see "[Managing billing for GitHub Packages](https://help.github.com/github/setting-up-and-managing-billing-and-payments-on-github/managing-billing-for-github-packages)." Access tokens must have the `user` scope.
     *
     * @tags billing
     * @name BillingGetSharedStorageBillingUser
     * @summary Get shared storage billing for a user
     * @request GET:/users/{username}/settings/billing/shared-storage
     */
    billingGetSharedStorageBillingUser: (username: string, params: RequestParams = {}) =>
      this.request<CombinedBillingUsage, any>({
        path: `/users/${username}/settings/billing/shared-storage`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Lists repositories a user has starred. You can also find out _when_ stars were created by passing the following custom [media type](https://docs.github.com/rest/overview/media-types/) via the `Accept` header:
     *
     * @tags activity
     * @name ActivityListReposStarredByUser
     * @summary List repositories starred by a user
     * @request GET:/users/{username}/starred
     */
    activityListReposStarredByUser: (
      username: string,
      query?: { sort?: "created" | "updated"; direction?: "asc" | "desc"; per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<Repository[], any>({
        path: `/users/${username}/starred`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Lists repositories a user is watching.
     *
     * @tags activity
     * @name ActivityListReposWatchedByUser
     * @summary List repositories watched by a user
     * @request GET:/users/{username}/subscriptions
     */
    activityListReposWatchedByUser: (
      username: string,
      query?: { per_page?: number; page?: number },
      params: RequestParams = {},
    ) =>
      this.request<MinimalRepository[], any>({
        path: `/users/${username}/subscriptions`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  zen = {
    /**
     * @description Get a random sentence from the Zen of GitHub
     *
     * @tags meta
     * @name MetaGetZen
     * @summary Get the Zen of GitHub
     * @request GET:/zen
     */
    metaGetZen: (params: RequestParams = {}) =>
      this.request<WebhookConfigUrl, any>({
        path: `/zen`,
        method: "GET",
        ...params,
      }),
  };
}
