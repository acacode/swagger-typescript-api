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
 * A user or organization
 */
export interface SwaggerTypeActorGeneratedDataContract {
  avatar_url?: string;
  bio?: string;

  /** The website URL from the profile page */
  blog?: string;
  collaborators?: number;
  company?: string;

  /** ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
  created_at?: string;
  disk_usage?: number;

  /** Note: The returned email is the user’s publicly visible email address (or null if the user has not specified a public email address in their profile). */
  email?: string;
  followers?: number;
  followers_url?: string;
  following?: number;
  following_url?: string;
  gists_url?: string;
  gravatar_id?: string;
  hireable?: boolean;
  html_url?: string;
  id?: number;
  location?: string;

  /** The account username */
  login?: string;

  /** The full account name */
  name?: string;
  organizations_url?: string;
  owned_private_repos?: number;
  plan?: { collaborators?: number; name?: string; private_repos?: number; space?: number };
  private_gists?: number;
  public_gists?: number;
  public_repos?: number;
  starred_url?: string;
  subscriptions_url?: string;
  total_private_repos?: number;
  type?: "User" | "Organization";

  /** ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
  updated_at?: string;
  url?: string;
}

export interface SwaggerTypeAssetGeneratedDataContract {
  content_type?: string;
  created_at?: string;
  download_count?: number;
  id?: number;
  label?: string;
  name?: string;
  size?: number;
  state?: string;
  updated_at?: string;

  /** A GitHub user */
  uploader?: SwaggerTypeUserGeneratedDataContract;
  url?: string;
}

export interface SwaggerTypeAssetPatchGeneratedDataContract {
  label?: string;
  name: string;
}

export type SwaggerTypeAssetsGeneratedDataContract = SwaggerTypeAssetGeneratedDataContract[];

export type SwaggerTypeAssigneesGeneratedDataContract = SwaggerTypeUserGeneratedDataContract[];

export interface SwaggerTypeBlobGeneratedDataContract {
  content?: string;
  encoding?: "utf-8" | "base64";
  sha?: string;
  size?: number;
}

export interface SwaggerTypeBlobsGeneratedDataContract {
  sha?: string;
}

export interface SwaggerTypeBranchGeneratedDataContract {
  _links?: { html?: string; self?: string };
  commit?: {
    author?: SwaggerTypeUserGeneratedDataContract;
    commit?: {
      author?: { date?: string; email?: string; name?: string };
      committer?: { date?: string; email?: string; name?: string };
      message?: string;
      tree?: { sha?: string; url?: string };
      url?: string;
    };
    committer?: SwaggerTypeUserGeneratedDataContract;
    parents?: { sha?: string; url?: string }[];
    sha?: string;
    url?: string;
  };
  name?: string;
}

export type SwaggerTypeBranchesGeneratedDataContract = { commit?: { sha?: string; url?: string }; name?: string }[];

export type SwaggerTypeCodeFrequencyStatsGeneratedDataContract = number[];

export interface SwaggerTypeCommentGeneratedDataContract {
  body?: string;
}

export interface SwaggerTypeCommentBodyGeneratedDataContract {
  body: string;
}

export type SwaggerTypeCommentsGeneratedDataContract = {
  body?: string;
  created_at?: string;
  id?: number;
  url?: string;
  user?: SwaggerTypeUserGeneratedDataContract;
}[];

export interface SwaggerTypeCommitGeneratedDataContract {
  /** A GitHub user */
  author?: SwaggerTypeUserGeneratedDataContract;
  commit?: {
    author?: { date?: string; email?: string; name?: string };
    committer?: { date?: string; email?: string; name?: string };
    message?: string;
    tree?: { sha?: string; url?: string };
    url?: string;
  };

  /** A GitHub user */
  committer?: SwaggerTypeUserGeneratedDataContract;
  files?: {
    additions?: number;
    blob_url?: string;
    changes?: number;
    deletions?: number;
    filename?: string;
    patch?: string;
    raw_url?: string;
    status?: string;
  }[];
  parents?: { sha?: string; url?: string }[];
  sha?: string;
  stats?: { additions?: number; deletions?: number; total?: number };
  url?: string;
}

export type SwaggerTypeCommitActivityStatsGeneratedDataContract = { days?: number[]; total?: number; week?: number }[];

export interface SwaggerTypeCommitCommentGeneratedDataContract {
  body?: string;
  commit_id?: string;

  /** ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
  created_at?: string;
  html_url?: string;
  id?: number;
  line?: number;
  path?: string;
  position?: number;

  /** ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
  updated_at?: string;
  url?: string;

  /** A GitHub user */
  user?: SwaggerTypeUserGeneratedDataContract;
}

export interface SwaggerTypeCommitCommentBodyGeneratedDataContract {
  body: string;

  /** Deprecated - Use position parameter instead. */
  line?: string;

  /** Line number in the file to comment on. Defaults to null. */
  number?: string;

  /** Relative path of the file to comment on. */
  path?: string;

  /** Line index in the diff to comment on. */
  position?: number;

  /** SHA of the commit to comment on. */
  sha: string;
}

export type SwaggerTypeCommitsGeneratedDataContract = {
  author?: SwaggerTypeUserGeneratedDataContract;
  commit?: {
    author?: { date?: string; email?: string; name?: string };
    committer?: { date?: string; email?: string; name?: string };
    message?: string;
    tree?: { sha?: string; url?: string };
    url?: string;
  };
  committer?: SwaggerTypeUserGeneratedDataContract;
  parents?: { sha?: string; url?: string }[];
  sha?: string;
  url?: string;
}[];

export interface SwaggerTypeCompareCommitsGeneratedDataContract {
  ahead_by?: number;
  base_commit?: {
    author?: SwaggerTypeUserGeneratedDataContract;
    commit?: {
      author?: { date?: string; email?: string; name?: string };
      committer?: { date?: string; email?: string; name?: string };
      message?: string;
      tree?: { sha?: string; url?: string };
      url?: string;
    };
    committer?: SwaggerTypeUserGeneratedDataContract;
    parents?: { sha?: string; url?: string }[];
    sha?: string;
    url?: string;
  };
  behind_by?: number;
  commits?: {
    author?: SwaggerTypeUserGeneratedDataContract;
    commit?: {
      author?: { date?: string; email?: string; name?: string };
      committer?: { date?: string; email?: string; name?: string };
      message?: string;
      tree?: { sha?: string; url?: string };
      url?: string;
    };
    committer?: SwaggerTypeUserGeneratedDataContract;
    parents?: { sha?: string; url?: string }[];
    sha?: string;
    url?: string;
  }[];
  diff_url?: string;
  files?: {
    additions?: number;
    blob_url?: string;
    changes?: number;
    contents_url?: string;
    deletions?: number;
    filename?: string;
    patch?: string;
    raw_url?: string;
    sha?: string;
    status?: string;
  }[];
  html_url?: string;
  patch_url?: string;
  permalink_url?: string;
  status?: string;
  total_commits?: number;
  url?: string;
}

export interface SwaggerTypeContentsPathGeneratedDataContract {
  _links?: { git?: string; html?: string; self?: string };
  content?: string;
  encoding?: string;
  git_url?: string;
  html_url?: string;
  name?: string;
  path?: string;
  sha?: string;
  size?: number;
  type?: string;
  url?: string;
}

export type SwaggerTypeContributorsStatsGeneratedDataContract = {
  author?: { avatar_url?: string; gravatar_id?: string; id?: number; login?: string; url?: string };
  total?: number;
  weeks?: { a?: number; c?: number; d?: number; w?: string }[];
}[];

export interface SwaggerTypeCreateFileGeneratedDataContract {
  commit?: {
    author?: { date?: string; email?: string; name?: string };
    committer?: { date?: string; email?: string; name?: string };
    html_url?: string;
    message?: string;
    parents?: { html_url?: string; sha?: string; url?: string }[];
    sha?: string;
    tree?: { sha?: string; url?: string };
    url?: string;
  };
  content?: {
    _links?: { git?: string; html?: string; self?: string };
    git_url?: string;
    html_url?: string;
    name?: string;
    path?: string;
    sha?: string;
    size?: number;
    type?: string;
    url?: string;
  };
}

export interface SwaggerTypeCreateFileBodyGeneratedDataContract {
  committer?: { email?: string; name?: string };
  content?: string;
  message?: string;
}

export interface SwaggerTypeDeleteFileGeneratedDataContract {
  commit?: {
    author?: { date?: string; email?: string; name?: string };
    committer?: { date?: string; email?: string; name?: string };
    html_url?: string;
    message?: string;
    parents?: { html_url?: string; sha?: string; url?: string };
    sha?: string;
    tree?: { sha?: string; url?: string };
    url?: string;
  };
  content?: string;
}

export interface SwaggerTypeDeleteFileBodyGeneratedDataContract {
  committer?: { email?: string; name?: string };
  message?: string;
  sha?: string;
}

export interface SwaggerTypeDeploymentGeneratedDataContract {
  description?: string;
  payload?: { deploy_user?: string; environment?: string; room_id?: number };
  ref?: string;
}

export interface SwaggerTypeDeploymentRespGeneratedDataContract {
  created_at?: string;

  /** A GitHub user */
  creator?: SwaggerTypeUserGeneratedDataContract;
  description?: string;
  id?: number;
  payload?: string;
  sha?: string;
  statuses_url?: string;
  updated_at?: string;
  url?: string;
}

export type SwaggerTypeDeploymentStatusesGeneratedDataContract = {
  created_at?: string;
  creator?: SwaggerTypeUserGeneratedDataContract;
  description?: string;
  id?: number;
  payload?: string;
  state?: string;
  target_url?: string;
  updated_at?: string;
  url?: string;
}[];

export interface SwaggerTypeDeploymentStatusesCreateGeneratedDataContract {
  description?: string;
  state?: string;
  target_url?: string;
}

export interface SwaggerTypeDownloadGeneratedDataContract {
  content_type?: string;
  description?: string;
  download_count?: number;
  html_url?: string;
  id?: number;
  name?: string;
  size?: number;
  url?: string;
}

export type SwaggerTypeDownloadsGeneratedDataContract = SwaggerTypeDownloadGeneratedDataContract[];

export interface SwaggerTypeEditTeamGeneratedDataContract {
  name: string;
  permission?: "pull" | "push" | "admin";
}

export type SwaggerTypeEmailsPostGeneratedDataContract = string[];

export type SwaggerTypeEmojisGeneratedDataContract = Record<string, string>;

export interface SwaggerTypeEventGeneratedDataContract {
  /** A user or organization */
  actor?: SwaggerTypeActorGeneratedDataContract;
  created_at?: object;
  id?: number;

  /** A GitHub organization */
  org?: SwaggerTypeOrganizationGeneratedDataContract;
  payload?: object;
  public?: boolean;
  repo?: { id?: number; name?: string; url?: string };
  type?: string;
}

export type SwaggerTypeEventsGeneratedDataContract = SwaggerTypeEventGeneratedDataContract[];

export interface SwaggerTypeFeedsGeneratedDataContract {
  _links?: {
    current_user?: { href?: string; type?: string };
    current_user_actor?: { href?: string; type?: string };
    current_user_organization?: { href?: string; type?: string };
    current_user_public?: { href?: string; type?: string };
    timeline?: { href?: string; type?: string };
    user?: { href?: string; type?: string };
  };
  current_user_actor_url?: string;
  current_user_organization_url?: string;
  current_user_public?: string;
  current_user_url?: string;
  timeline_url?: string;
  user_url?: string;
}

export interface SwaggerTypeForkBodyGeneratedDataContract {
  organization?: string;
}

export type SwaggerTypeForksGeneratedDataContract = SwaggerTypeReposGeneratedDataContract;

export interface SwaggerTypeGistGeneratedDataContract {
  comments?: number;
  comments_url?: string;

  /** Timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ. */
  created_at?: string;
  description?: string;
  files?: { "ring.erl"?: { filename?: string; raw_url?: string; size?: number } };
  forks?: { created_at?: string; url?: string; user?: SwaggerTypeUserGeneratedDataContract }[];
  git_pull_url?: string;
  git_push_url?: string;
  history?: {
    change_status?: { additions?: number; deletions?: number; total?: number };
    committed_at?: string;
    url?: string;
    user?: SwaggerTypeUserGeneratedDataContract;
    version?: string;
  }[];
  html_url?: string;
  id?: string;
  public?: boolean;
  url?: string;

  /** A GitHub user */
  user?: SwaggerTypeUserGeneratedDataContract;
}

export type SwaggerTypeGistsGeneratedDataContract = {
  comments?: number;
  comments_url?: string;
  created_at?: string;
  description?: string;
  files?: { "ring.erl"?: { filename?: string; raw_url?: string; size?: number } };
  git_pull_url?: string;
  git_push_url?: string;
  html_url?: string;
  id?: string;
  public?: boolean;
  url?: string;
  user?: SwaggerTypeUserGeneratedDataContract;
}[];

export interface SwaggerTypeGitCommitGeneratedDataContract {
  author?: { date?: string; email?: string; name?: string };
  message?: string;
  parents?: string;
  tree?: string;
}

export interface SwaggerTypeGitRefPatchGeneratedDataContract {
  force?: boolean;
  sha?: string;
}

export type SwaggerTypeGitignoreGeneratedDataContract = any[];

export interface SwaggerTypeGitignoreLangGeneratedDataContract {
  name?: string;
  source?: string;
}

export interface SwaggerTypeHeadBranchGeneratedDataContract {
  object?: { sha?: string; type?: string; url?: string };
  ref?: string;
  url?: string;
}

export type SwaggerTypeHookGeneratedDataContract = {
  active?: boolean;
  config?: { content_type?: string; url?: string };
  created_at?: string;
  events?: (
    | "push"
    | "issues"
    | "issue_comment"
    | "commit_comment"
    | "pull_request"
    | "pull_request_review_comment"
    | "gollum"
    | "watch"
    | "download"
    | "fork"
    | "fork_apply"
    | "member"
    | "public"
    | "team_add"
    | "status"
  )[];
  id?: number;
  name?: string;
  updated_at?: string;
  url?: string;
}[];

export interface SwaggerTypeHookBodyGeneratedDataContract {
  active?: boolean;
  add_events?: string[];
}

export interface SwaggerTypeIssueGeneratedDataContract {
  assignee?: string;
  body?: string;
  labels?: string[];
  milestone?: number;
  title?: string;
}

export interface SwaggerTypeIssueEventGeneratedDataContract {
  /** A user or organization */
  actor?: SwaggerTypeActorGeneratedDataContract;
  commit_id?: string;

  /** ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
  created_at?: string;
  event?: string;
  issue?: {
    assignee?: SwaggerTypeUserGeneratedDataContract;
    body?: string;
    closed_at?: string;
    comments?: number;
    created_at?: string;
    html_url?: string;
    labels?: { color?: string; name?: string; url?: string }[];
    milestone?: {
      closed_issues?: number;
      created_at?: string;
      creator?: SwaggerTypeUserGeneratedDataContract;
      description?: string;
      due_on?: string;
      number?: number;
      open_issues?: number;
      state?: "open" | "closed";
      title?: string;
      url?: string;
    };
    number?: number;
    pull_request?: { diff_url?: string; html_url?: string; patch_url?: string };
    state?: "open" | "closed";
    title?: string;
    updated_at?: string;
    url?: string;
    user?: SwaggerTypeUserGeneratedDataContract;
  };
  url?: string;
}

export type SwaggerTypeIssueEventsGeneratedDataContract = SwaggerTypeIssueEventGeneratedDataContract[];

export type SwaggerTypeIssuesGeneratedDataContract = {
  assignee?: SwaggerTypeUserGeneratedDataContract;
  body?: string;
  closed_at?: string;
  comments?: number;
  created_at?: string;
  html_url?: string;
  labels?: { color?: string; name?: string; url?: string }[];
  milestone?: {
    closed_issues?: number;
    created_at?: string;
    creator?: SwaggerTypeUserGeneratedDataContract;
    description?: string;
    due_on?: string;
    number?: number;
    open_issues?: number;
    state?: "open" | "closed";
    title?: string;
    url?: string;
  };
  number?: number;
  pull_request?: { diff_url?: string; html_url?: string; patch_url?: string };
  state?: "open" | "closed";
  title?: string;
  updated_at?: string;
  url?: string;
  user?: SwaggerTypeUserGeneratedDataContract;
}[];

export interface SwaggerTypeIssuesCommentGeneratedDataContract {
  body?: string;

  /** ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
  created_at?: string;
  html_url?: string;
  id?: number;

  /** ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
  updated_at?: string;
  url?: string;

  /** A GitHub user */
  user?: SwaggerTypeUserGeneratedDataContract;
}

export type SwaggerTypeIssuesCommentsGeneratedDataContract = {
  _links?: { html?: { href?: string }; pull_request?: { href?: string }; self?: { href?: string } };
  body?: string;
  commit_id?: string;
  created_at?: string;
  id?: number;
  path?: string;
  position?: number;
  updated_at?: string;
  url?: string;
  user?: SwaggerTypeUserGeneratedDataContract;
}[];

export type SwaggerTypeKeysGeneratedDataContract = { id?: number; key?: string; title?: string; url?: string }[];

export interface SwaggerTypeLabelGeneratedDataContract {
  color?: string;
  name?: string;
  url?: string;
}

export type SwaggerTypeLabelsGeneratedDataContract = { color?: string; name?: string; url?: string }[];

export type SwaggerTypeLanguagesGeneratedDataContract = Record<string, number>;

export interface SwaggerTypeMarkdownGeneratedDataContract {
  context?: string;
  mode?: string;
  text?: string;
}

export interface SwaggerTypeMergeGeneratedDataContract {
  merged?: boolean;
  message?: string;
  sha?: string;
}

export interface SwaggerTypeMergePullBodyGeneratedDataContract {
  commit_message?: string;
}

export interface SwaggerTypeMergesBodyGeneratedDataContract {
  base?: string;
  commit_message?: string;
  head?: string;
}

export interface SwaggerTypeMergesConflictGeneratedDataContract {
  /** Error message */
  message?: string;
}

export interface SwaggerTypeMergesSuccessfulGeneratedDataContract {
  /** A GitHub user */
  author?: SwaggerTypeUserGeneratedDataContract;
  comments_url?: string;
  commit?: {
    author?: { date?: string; email?: string; name?: string };
    comment_count?: number;
    committer?: { date?: string; email?: string; name?: string };
    message?: string;
    tree?: { sha?: string; url?: string };
    url?: string;
  };

  /** A GitHub user */
  committer?: SwaggerTypeUserGeneratedDataContract;
  merged?: boolean;
  message?: string;
  parents?: { sha?: string; url?: string }[];
  sha?: string;
  url?: string;
}

export interface SwaggerTypeMetaGeneratedDataContract {
  git?: string[];
  hooks?: string[];
}

export interface SwaggerTypeMilestoneGeneratedDataContract {
  closed_issues?: number;

  /** ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
  created_at?: string;

  /** A GitHub user */
  creator?: SwaggerTypeUserGeneratedDataContract;
  description?: string;

  /** ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
  due_on?: string;
  number?: number;
  open_issues?: number;
  state?: "open" | "closed";
  title?: string;
  url?: string;
}

export interface SwaggerTypeMilestoneUpdateGeneratedDataContract {
  description?: string;
  due_on?: string;
  state?: string;
  title?: string;
}

export interface SwaggerTypeNotificationMarkReadGeneratedDataContract {
  last_read_at?: string;
}

export interface SwaggerTypeNotificationsGeneratedDataContract {
  id?: number;
  last_read_at?: string;
  reason?: string;
  repository?: {
    description?: string;
    fork?: boolean;
    full_name?: string;
    html_url?: string;
    id?: number;
    name?: string;
    owner?: SwaggerTypeActorGeneratedDataContract;
    private?: boolean;
    url?: string;
  };
  subject?: { latest_comment_url?: string; title?: string; type?: string; url?: string };
  unread?: boolean;
  updated_at?: string;
  url?: string;
}

export interface SwaggerTypeOrgTeamsPostGeneratedDataContract {
  name: string;
  permission?: "pull" | "push" | "admin";
  repo_names?: string[];
}

/**
 * A GitHub organization
 */
export type SwaggerTypeOrganizationGeneratedDataContract = SwaggerTypeActorGeneratedDataContract;

export interface SwaggerTypeOrganizationAsTeamMemberGeneratedDataContract {
  errors?: { code?: string; field?: string; resource?: string }[];
  message?: string;
}

export interface SwaggerTypeParticipationStatsGeneratedDataContract {
  all?: number[];
  owner?: number[];
}

export interface SwaggerTypePatchGistGeneratedDataContract {
  description?: string;
  files?: {
    "delete_this_file.txt"?: string;
    "file1.txt"?: { content?: string };
    "new_file.txt"?: { content?: string };
    "old_name.txt"?: { content?: string; filename?: string };
  };
}

export interface SwaggerTypePatchOrgGeneratedDataContract {
  /** Billing email address. This address is not publicized. */
  billing_email?: string;
  company?: string;

  /** Publicly visible email address. */
  email?: string;
  location?: string;
  name?: string;
}

export interface SwaggerTypePostGistGeneratedDataContract {
  description?: string;
  files?: { "file1.txt"?: { content?: string } };
  public?: boolean;
}

export interface SwaggerTypePostRepoGeneratedDataContract {
  /** True to create an initial commit with empty README. Default is false. */
  auto_init?: boolean;
  description?: string;

  /** Desired language or platform .gitignore template to apply. Use the name of the template without the extension. For example, "Haskell" Ignored if auto_init parameter is not provided.  */
  gitignore_template?: string;

  /** True to enable downloads for this repository, false to disable them. Default is true. */
  has_downloads?: boolean;

  /** True to enable issues for this repository, false to disable them. Default is true. */
  has_issues?: boolean;

  /** True to enable the wiki for this repository, false to disable it. Default is true. */
  has_wiki?: boolean;
  homepage?: string;
  name: string;

  /** True to create a private repository, false to create a public one. Creating private repositories requires a paid GitHub account. */
  private?: boolean;

  /** The id of the team that will be granted access to this repository. This is only valid when creating a repo in an organization. */
  team_id?: number;
}

export interface SwaggerTypePullRequestGeneratedDataContract {
  _links?: {
    comments?: { href?: string };
    html?: { href?: string };
    review_comments?: { href?: string };
    self?: { href?: string };
  };
  additions?: number;
  base?: {
    label?: string;
    ref?: string;
    repo?: SwaggerTypeRepoGeneratedDataContract;
    sha?: string;
    user?: { avatar_url?: string; gravatar_id?: string; id?: number; login?: string; url?: string };
  };
  body?: string;
  changed_files?: number;
  closed_at?: string;
  comments?: number;
  commits?: number;
  created_at?: string;
  deletions?: number;
  diff_url?: string;
  head?: {
    label?: string;
    ref?: string;
    repo?: SwaggerTypeRepoGeneratedDataContract;
    sha?: string;
    user?: { avatar_url?: string; gravatar_id?: string; id?: number; login?: string; url?: string };
  };
  html_url?: string;
  issue_url?: string;
  merge_commit_sha?: string;
  mergeable?: boolean;
  merged?: boolean;
  merged_at?: string;
  merged_by?: { avatar_url?: string; gravatar_id?: string; id?: number; login?: string; url?: string };
  number?: number;
  patch_url?: string;
  state?: string;
  title?: string;
  updated_at?: string;
  url?: string;
  user?: { avatar_url?: string; gravatar_id?: string; id?: number; login?: string; url?: string };
}

export interface SwaggerTypePullUpdateGeneratedDataContract {
  body?: string;
  state?: string;
  title?: string;
}

export type SwaggerTypePullsGeneratedDataContract = {
  _links?: {
    comments?: { href?: string };
    html?: { href?: string };
    review_comments?: { href?: string };
    self?: { href?: string };
  };
  base?: {
    label?: string;
    ref?: string;
    repo?: SwaggerTypeRepoGeneratedDataContract;
    sha?: string;
    user?: { avatar_url?: string; gravatar_id?: string; id?: number; login?: string; url?: string };
  };
  body?: string;
  closed_at?: string;
  created_at?: string;
  diff_url?: string;
  head?: {
    label?: string;
    ref?: string;
    repo?: SwaggerTypeRepoGeneratedDataContract;
    sha?: string;
    user?: { avatar_url?: string; gravatar_id?: string; id?: number; login?: string; url?: string };
  };
  html_url?: string;
  issue_url?: string;
  merged_at?: string;
  number?: number;
  patch_url?: string;
  state?: "open" | "closed";
  title?: string;
  updated_at?: string;
  url?: string;
  user?: { avatar_url?: string; gravatar_id?: string; id?: number; login?: string; url?: string };
}[];

export interface SwaggerTypePullsCommentGeneratedDataContract {
  _links?: { html?: { href?: string }; pull_request?: { href?: string }; self?: { href?: string } };
  body?: string;
  commit_id?: string;

  /** ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
  created_at?: string;
  id?: number;
  path?: string;
  position?: number;

  /** ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
  updated_at?: string;
  url?: string;
  user?: { avatar_url?: string; gravatar_id?: string; id?: number; login?: string; url?: string };
}

export interface SwaggerTypePullsCommentPostGeneratedDataContract {
  body?: string;
  commit_id?: string;
  path?: string;
  position?: number;
}

export type SwaggerTypePullsCommentsGeneratedDataContract = {
  _links?: { html?: { href?: string }; pull_request?: { href?: string }; self?: { href?: string } };
  body?: string;
  commit_id?: string;
  created_at?: string;
  id?: number;
  path?: string;
  position?: number;
  updated_at?: string;
  url?: string;
  user?: { avatar_url?: string; gravatar_id?: string; id?: number; login?: string; url?: string };
}[];

export interface SwaggerTypePullsPostGeneratedDataContract {
  base?: string;
  body?: string;
  head?: string;
  title?: string;
}

export interface SwaggerTypePutSubscriptionGeneratedDataContract {
  created_at?: string;
  ignored?: boolean;
  reason?: object;
  subscribed?: boolean;
  thread_url?: string;
  url?: string;
}

export interface SwaggerTypeRateLimitGeneratedDataContract {
  rate?: { limit?: number; remaining?: number; reset?: number };
}

export type SwaggerTypeRefGeneratedDataContract = {
  created_at?: string;
  creator?: { avatar_url?: string; gravatar_id?: string; id?: number; login?: string; url?: string };
  description?: string;
  id?: number;
  state?: string;
  target_url?: string;
  updated_at?: string;
  url?: string;
}[];

export type SwaggerTypeRefStatusGeneratedDataContract = {
  commit_url?: string;
  name?: string;
  repository_url?: string;
  sha?: string;
  state?: string;
  statuses?: {
    context?: string;
    created_at?: string;
    description?: string;
    id?: number;
    state?: string;
    target_url?: string;
    updated_at?: string;
    url?: string;
  }[];
}[];

export type SwaggerTypeRefsGeneratedDataContract = {
  object?: { sha?: string; type?: string; url?: string };
  ref?: string;
  url?: string;
}[];

export interface SwaggerTypeRefsBodyGeneratedDataContract {
  ref?: string;
  sha?: string;
}

export interface SwaggerTypeReleaseGeneratedDataContract {
  assets?: {
    content_type?: string;
    created_at?: string;
    download_count?: number;
    id?: number;
    label?: string;
    name?: string;
    size?: number;
    state?: string;
    updated_at?: string;
    uploader?: SwaggerTypeUserGeneratedDataContract;
    url?: string;
  }[];
  assets_url?: string;

  /** A GitHub user */
  author?: SwaggerTypeUserGeneratedDataContract;
  body?: string;
  created_at?: string;
  draft?: boolean;
  html_url?: string;
  id?: number;
  name?: string;
  prerelease?: boolean;
  published_at?: string;
  tag_name?: string;
  tarball_url?: string;
  target_commitish?: string;
  upload_url?: string;
  url?: string;
  zipball_url?: string;
}

export interface SwaggerTypeReleaseCreateGeneratedDataContract {
  body?: string;
  draft?: boolean;
  name?: string;
  prerelease?: boolean;
  tag_name?: string;
  target_commitish?: string;
}

export type SwaggerTypeReleasesGeneratedDataContract = {
  assets?: {
    content_type?: string;
    created_at?: string;
    download_count?: number;
    id?: number;
    label?: string;
    name?: string;
    size?: number;
    state?: string;
    updated_at?: string;
    uploader?: SwaggerTypeUserGeneratedDataContract;
    url?: string;
  }[];
  assets_url?: string;
  author?: SwaggerTypeUserGeneratedDataContract;
  body?: string;
  created_at?: string;
  draft?: boolean;
  html_url?: string;
  id?: number;
  name?: string;
  prerelease?: boolean;
  published_at?: string;
  tag_name?: string;
  tarball_url?: string;
  target_commitish?: string;
  upload_url?: string;
  url?: string;
  zipball_url?: string;
}[];

export interface SwaggerTypeRepoGeneratedDataContract {
  clone_url?: string;

  /** ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
  created_at?: string;
  description?: string;
  fork?: boolean;
  forks?: number;
  forks_count?: number;
  full_name?: string;
  git_url?: string;
  has_downloads?: boolean;
  has_issues?: boolean;
  has_wiki?: boolean;
  homepage?: string;
  html_url?: string;
  id?: number;
  language?: string;
  master_branch?: string;
  mirror_url?: string;
  name?: string;
  open_issues?: number;
  open_issues_count?: number;

  /** A GitHub organization */
  organization?: SwaggerTypeOrganizationGeneratedDataContract;

  /** A user or organization */
  owner?: SwaggerTypeActorGeneratedDataContract;

  /** Is present when the repo is a fork. Parent is the repo this repo was forked from. */
  parent?: SwaggerTypeRepoGeneratedDataContract;
  private?: boolean;

  /** ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
  pushed_at?: string;
  size?: number;

  /** Is present when the repo is a fork. Source is the ultimate source for the network. */
  source?: SwaggerTypeRepoGeneratedDataContract;
  ssh_url?: string;
  svn_url?: string;

  /** ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
  updated_at?: string;
  url?: string;
  watchers?: number;
  watchers_count?: number;
}

export type SwaggerTypeRepoDeploymentsGeneratedDataContract = {
  created_at?: string;
  creator?: SwaggerTypeUserGeneratedDataContract;
  description?: string;
  id?: number;
  payload?: string;
  sha?: string;
  statuses_url?: string;
  updated_at?: string;
  url?: string;
}[];

export type SwaggerTypeRepoCommentsGeneratedDataContract = {
  body?: string;
  commit_id?: string;
  created_at?: string;
  html_url?: string;
  id?: number;
  line?: number;
  path?: string;
  position?: number;
  updated_at?: string;
  url?: string;
  user?: SwaggerTypeUserGeneratedDataContract;
}[];

export interface SwaggerTypeRepoCommitGeneratedDataContract {
  author?: { date?: string; email?: string; name?: string };
  committer?: { date?: string; email?: string; name?: string };
  message?: string;
  parents?: { sha?: string; url?: string }[];
  sha?: string;
  tree?: { sha?: string; url?: string };
  url?: string;
}

export interface SwaggerTypeRepoCommitBodyGeneratedDataContract {
  author?: { date?: string; email?: string; name?: string };
  message: string;
  parents: string[];
  tree: string;
}

export interface SwaggerTypeRepoEditGeneratedDataContract {
  description?: string;
  has_downloads?: boolean;
  has_issues?: boolean;
  has_wiki?: boolean;
  homepage?: string;
  name?: string;
  private?: boolean;
}

export type SwaggerTypeReposGeneratedDataContract = SwaggerTypeRepoGeneratedDataContract[];

export interface SwaggerTypeSearchCodeGeneratedDataContract {
  items?: {
    git_url?: string;
    html_url?: string;
    name?: string;
    path?: string;
    repository?: {
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
      description?: string;
      downloads_url?: string;
      events_url?: string;
      fork?: boolean;
      forks_url?: string;
      full_name?: string;
      git_commits_url?: string;
      git_refs_url?: string;
      git_tags_url?: string;
      hooks_url?: string;
      html_url?: string;
      id?: number;
      issue_comment_url?: string;
      issue_events_url?: string;
      issues_url?: string;
      keys_url?: string;
      labels_url?: string;
      languages_url?: string;
      merges_url?: string;
      milestones_url?: string;
      name?: string;
      notifications_url?: string;
      owner?: SwaggerTypeActorGeneratedDataContract;
      private?: boolean;
      pulls_url?: string;
      stargazers_url?: string;
      statuses_url?: string;
      subscribers_url?: string;
      subscription_url?: string;
      tags_url?: string;
      teams_url?: string;
      trees_url?: string;
      url?: string;
    };
    score?: number;
    sha?: string;
    url?: string;
  }[];
  total_count?: number;
}

export interface SwaggerTypeSearchIssuesGeneratedDataContract {
  items?: {
    assignee?: any;
    body?: string;
    closed_at?: any;
    comments?: number;
    comments_url?: string;
    created_at?: string;
    events_url?: string;
    html_url?: string;
    id?: number;
    labels?: { color?: string; name?: string; url?: string }[];
    labels_url?: string;
    milestone?: any;
    number?: number;
    pull_request?: { diff_url?: any; html_url?: any; patch_url?: any };
    score?: number;
    state?: string;
    title?: string;
    updated_at?: string;
    url?: string;
    user?: SwaggerTypeUserGeneratedDataContract;
  }[];
  total_count?: number;
}

export interface SwaggerTypeSearchIssuesByKeywordGeneratedDataContract {
  issues?: {
    body?: string;
    comments?: number;
    created_at?: string;
    gravatar_id?: string;
    html_url?: string;
    labels?: string[];
    number?: number;
    position?: number;
    state?: string;
    title?: string;
    updated_at?: string;
    user?: string;
    votes?: number;
  }[];
}

export interface SwaggerTypeSearchRepositoriesGeneratedDataContract {
  items?: SwaggerTypeRepoGeneratedDataContract[];
  total_count?: number;
}

export interface SwaggerTypeSearchRepositoriesByKeywordGeneratedDataContract {
  repositories?: SwaggerTypeRepoGeneratedDataContract[];
}

export interface SwaggerTypeSearchUserByEmailGeneratedDataContract {
  /** A GitHub user */
  user?: SwaggerTypeUserGeneratedDataContract;
}

export interface SwaggerTypeSearchUsersGeneratedDataContract {
  items?: SwaggerTypeUsersGeneratedDataContract;
  total_count?: number;
}

export interface SwaggerTypeSearchUsersByKeywordGeneratedDataContract {
  users?: SwaggerTypeUsersGeneratedDataContract;
}

export interface SwaggerTypeSubscriptionGeneratedDataContract {
  /** ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
  created_at?: string;
  ignored?: boolean;
  reason?: string;
  repository_url?: string;
  subscribed?: boolean;
  thread_url?: string;
  url?: string;
}

export interface SwaggerTypeSubscriptionBodyGeneratedDataContract {
  ignored?: boolean;
  subscribed?: boolean;
}

export interface SwaggerTypeTagGeneratedDataContract {
  /** String of the tag message. */
  message?: string;
  object?: { sha?: string; type?: "commit" | "tree" | "blob"; url?: string };
  sha?: string;

  /** The tag's name. This is typically a version (e.g., "v0.0.1"). */
  tag?: string;
  tagger?: { date?: string; email?: string; name?: string };
  url?: string;
}

export interface SwaggerTypeTagBodyGeneratedDataContract {
  /** String of the tag message. */
  message: string;

  /** String of the SHA of the git object this is tagging. */
  object: string;

  /** The tag's name. This is typically a version (e.g., "v0.0.1"). */
  tag: string;
  tagger: { date?: string; email?: string; name?: string };

  /** String of the type of the object we’re tagging. Normally this is a commit but it can also be a tree or a blob. */
  type: "commit" | "tree" | "blob";
}

export type SwaggerTypeTagsGeneratedDataContract = SwaggerTypeTagGeneratedDataContract[];

export interface SwaggerTypeTeamGeneratedDataContract {
  id?: number;
  members_count?: number;
  name?: string;
  permission?: string;
  repos_count?: number;
  url?: string;
}

export interface SwaggerTypeTeamMembershipGeneratedDataContract {
  state?: string;
  url?: string;
}

export type SwaggerTypeTeamReposGeneratedDataContract = SwaggerTypeReposGeneratedDataContract;

export type SwaggerTypeTeamsGeneratedDataContract = { id?: number; name?: string; url?: string }[];

export type SwaggerTypeTeamsListGeneratedDataContract = {
  id?: number;
  members_count?: number;
  name?: string;
  organization?: { avatar_url?: string; id?: number; login?: string; url?: string };
  permission?: string;
  repos_count?: number;
  url?: string;
}[];

export interface SwaggerTypeTreeGeneratedDataContract {
  sha?: string;
  tree?: {
    mode?: "100644" | "100755" | "040000" | "160000" | "120000";
    path?: string;
    sha?: string;
    size?: number;
    type?: "blob" | "tree" | "commit";
    url?: string;
  }[];
  url?: string;
}

export interface SwaggerTypeTreesGeneratedDataContract {
  base_tree?: string;

  /** SHA1 checksum ID of the object in the tree. */
  sha?: string;
  tree?: SwaggerTypeTreeGeneratedDataContract[];
  url?: string;
}

/**
 * A GitHub user
 */
export type SwaggerTypeUserGeneratedDataContract = SwaggerTypeActorGeneratedDataContract;

export type SwaggerTypeUserEmailsGeneratedDataContract = string[];

export interface SwaggerTypeUserKeysKeyIdGeneratedDataContract {
  id?: number;
  key?: string;
  title?: string;
  url?: string;
}

export interface SwaggerTypeUserKeysPostGeneratedDataContract {
  key?: string;
  title?: string;
}

export interface SwaggerTypeUserUpdateGeneratedDataContract {
  bio?: string;
  blog?: string;
  company?: string;
  email?: string;
  hireable?: boolean;
  location?: string;
  name?: string;
}

export type SwaggerTypeUsersGeneratedDataContract = SwaggerTypeUserGeneratedDataContract[];

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
 * @title GitHub
 * @version v3
 * @termsOfService https://help.github.com/articles/github-terms-of-service/#b-api-terms
 * @baseUrl https://api.github.com
 * @externalDocs https://developer.github.com/v3/
 *
 * Powerful collaboration, code review, and code management for open source and private projects.
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  someTest = {
    /**
     * @description This type should test bug https://github.com/acacode/swagger-typescript-api/issues/156 NOTE: all properties should be required
     *
     * @name SomeTestList
     * @request GET:/some-test
     * @response `200` `{ user: { foo: number, extra: { id: number, extra: { foo: string, bar: number, baz: string, bad: number, extra: { foo: string, bar: number, baz: string, bad: number, extra: { foo: string, bar: number, baz: string, bad: number, extra: { foo: string, bar: number, baz: string, bad: number } } } } } } }` Success
     */
    someTestList: (params: RequestParams = {}) =>
      this.request<
        {
          user: {
            foo: number;
            extra: {
              id: number;
              extra: {
                foo: string;
                bar: number;
                baz: string;
                bad: number;
                extra: {
                  foo: string;
                  bar: number;
                  baz: string;
                  bad: number;
                  extra: {
                    foo: string;
                    bar: number;
                    baz: string;
                    bad: number;
                    extra: { foo: string; bar: number; baz: string; bad: number };
                  };
                };
              };
            };
          };
        },
        any
      >({
        path: `/some-test`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  pathParams = {
    /**
     * @description Lists all the emojis available to use on GitHub.
     *
     * @name PathParamsList
     * @request GET:/path-params
     * @response `200` `SwaggerTypeEmojisGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    pathParamsList: (petId: number, params: RequestParams = {}) =>
      this.request<SwaggerTypeEmojisGeneratedDataContract, void>({
        path: `/path-params`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  events = {
    /**
     * @description List public events.
     *
     * @name EventsList
     * @request GET:/events
     * @response `200` `SwaggerTypeEventsGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    eventsList: (params: RequestParams = {}) =>
      this.request<SwaggerTypeEventsGeneratedDataContract, void>({
        path: `/events`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  feeds = {
    /**
     * @description List Feeds. GitHub provides several timeline resources in Atom format. The Feeds API lists all the feeds available to the authenticating user.
     *
     * @name FeedsList
     * @request GET:/feeds
     * @response `200` `SwaggerTypeFeedsGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    feedsList: (params: RequestParams = {}) =>
      this.request<SwaggerTypeFeedsGeneratedDataContract, void>({
        path: `/feeds`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  gists = {
    /**
     * @description List the authenticated user's gists or if called anonymously, this will return all public gists.
     *
     * @name GistsList
     * @request GET:/gists
     * @response `200` `SwaggerTypeGistsGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    gistsList: (query?: { since?: string }, params: RequestParams = {}) =>
      this.request<SwaggerTypeGistsGeneratedDataContract, void>({
        path: `/gists`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a gist.
     *
     * @name GistsCreate
     * @request POST:/gists
     * @response `201` `SwaggerTypeGistGeneratedDataContract` Created
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    gistsCreate: (body: SwaggerTypePostGistGeneratedDataContract, params: RequestParams = {}) =>
      this.request<SwaggerTypeGistGeneratedDataContract, void>({
        path: `/gists`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description List all public gists.
     *
     * @name PublicList
     * @request GET:/gists/public
     * @response `200` `SwaggerTypeGistsGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    publicList: (query?: { since?: string }, params: RequestParams = {}) =>
      this.request<SwaggerTypeGistsGeneratedDataContract, void>({
        path: `/gists/public`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description List the authenticated user's starred gists.
     *
     * @name StarredList
     * @request GET:/gists/starred
     * @response `200` `SwaggerTypeGistsGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    starredList: (query?: { since?: string }, params: RequestParams = {}) =>
      this.request<SwaggerTypeGistsGeneratedDataContract, void>({
        path: `/gists/starred`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a gist.
     *
     * @name GistsDelete
     * @request DELETE:/gists/{id}
     * @response `204` `void` No content.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    gistsDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/gists/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Get a single gist.
     *
     * @name GistsDetail
     * @request GET:/gists/{id}
     * @response `200` `SwaggerTypeGistGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    gistsDetail: (id: number, params: RequestParams = {}) =>
      this.request<SwaggerTypeGistGeneratedDataContract, void>({
        path: `/gists/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Edit a gist.
     *
     * @name GistsPartialUpdate
     * @request PATCH:/gists/{id}
     * @response `200` `SwaggerTypeGistGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    gistsPartialUpdate: (id: number, body: SwaggerTypePatchGistGeneratedDataContract, params: RequestParams = {}) =>
      this.request<SwaggerTypeGistGeneratedDataContract, void>({
        path: `/gists/${id}`,
        method: "PATCH",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description List comments on a gist.
     *
     * @name CommentsDetail
     * @request GET:/gists/{id}/comments
     * @response `200` `SwaggerTypeCommentsGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    commentsDetail: (id: number, params: RequestParams = {}) =>
      this.request<SwaggerTypeCommentsGeneratedDataContract, void>({
        path: `/gists/${id}/comments`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Create a commen
     *
     * @name CommentsCreate
     * @request POST:/gists/{id}/comments
     * @response `201` `SwaggerTypeCommentGeneratedDataContract` Created
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    commentsCreate: (id: number, body: SwaggerTypeCommentBodyGeneratedDataContract, params: RequestParams = {}) =>
      this.request<SwaggerTypeCommentGeneratedDataContract, void>({
        path: `/gists/${id}/comments`,
        method: "POST",
        body: body,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a comment.
     *
     * @name CommentsDelete
     * @request DELETE:/gists/{id}/comments/{commentId}
     * @response `204` `void` No content.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    commentsDelete: (id: number, commentId: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/gists/${id}/comments/${commentId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Get a single comment.
     *
     * @name CommentsDetail2
     * @request GET:/gists/{id}/comments/{commentId}
     * @originalName commentsDetail
     * @duplicate
     * @response `200` `SwaggerTypeCommentGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    commentsDetail2: (id: number, commentId: number, params: RequestParams = {}) =>
      this.request<SwaggerTypeCommentGeneratedDataContract, void>({
        path: `/gists/${id}/comments/${commentId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Edit a comment.
     *
     * @name CommentsPartialUpdate
     * @request PATCH:/gists/{id}/comments/{commentId}
     * @response `200` `SwaggerTypeCommentGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    commentsPartialUpdate: (
      id: number,
      commentId: number,
      body: SwaggerTypeCommentGeneratedDataContract,
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeCommentGeneratedDataContract, void>({
        path: `/gists/${id}/comments/${commentId}`,
        method: "PATCH",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Fork a gist.
     *
     * @name ForksCreate
     * @request POST:/gists/{id}/forks
     * @response `204` `void` Exists.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     * @response `404` `void` Not exists.
     */
    forksCreate: (id: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/gists/${id}/forks`,
        method: "POST",
        ...params,
      }),

    /**
     * @description Unstar a gist.
     *
     * @name StarDelete
     * @request DELETE:/gists/{id}/star
     * @response `204` `void` Item removed.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    starDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/gists/${id}/star`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Check if a gist is starred.
     *
     * @name StarDetail
     * @request GET:/gists/{id}/star
     * @response `204` `void` Exists.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     * @response `404` `void` Not exists.
     */
    starDetail: (id: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/gists/${id}/star`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Star a gist.
     *
     * @name StarUpdate
     * @request PUT:/gists/{id}/star
     * @response `204` `void` Starred.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    starUpdate: (id: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/gists/${id}/star`,
        method: "PUT",
        ...params,
      }),
  };
  gitignore = {
    /**
     * @description Listing available templates. List all templates available to pass as an option when creating a repository.
     *
     * @name TemplatesList
     * @request GET:/gitignore/templates
     * @response `200` `SwaggerTypeGitignoreGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    templatesList: (params: RequestParams = {}) =>
      this.request<SwaggerTypeGitignoreGeneratedDataContract, void>({
        path: `/gitignore/templates`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get a single template.
     *
     * @name TemplatesDetail
     * @request GET:/gitignore/templates/{language}
     * @response `200` `SwaggerTypeGitignoreLangGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    templatesDetail: (language: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeGitignoreLangGeneratedDataContract, void>({
        path: `/gitignore/templates/${language}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  issues = {
    /**
     * @description List issues. List all issues across all the authenticated user's visible repositories.
     *
     * @name IssuesList
     * @request GET:/issues
     * @response `200` `SwaggerTypeIssuesGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    issuesList: (
      query: {
        filter: "assigned" | "created" | "mentioned" | "subscribed" | "all";
        state: "open" | "closed";
        labels: string;
        sort: "created" | "updated" | "comments";
        direction: "asc" | "desc";
        since?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeIssuesGeneratedDataContract, void>({
        path: `/issues`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  legacy = {
    /**
     * @description Find issues by state and keyword.
     *
     * @name IssuesSearchDetail
     * @request GET:/legacy/issues/search/{owner}/{repository}/{state}/{keyword}
     * @deprecated
     * @response `200` `SwaggerTypeSearchIssuesByKeywordGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    issuesSearchDetail: (
      keyword: string,
      state: "open" | "closed",
      owner: string,
      repository: string,
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeSearchIssuesByKeywordGeneratedDataContract, void>({
        path: `/legacy/issues/search/${owner}/${repository}/${state}/${keyword}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Find repositories by keyword. Note, this legacy method does not follow the v3 pagination pattern. This method returns up to 100 results per page and pages can be fetched using the start_page parameter.
     *
     * @name ReposSearchDetail
     * @request GET:/legacy/repos/search/{keyword}
     * @deprecated
     * @response `200` `SwaggerTypeSearchRepositoriesByKeywordGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    reposSearchDetail: (
      keyword: string,
      query?: { order?: "desc" | "asc"; language?: string; start_page?: string; sort?: "updated" | "stars" | "forks" },
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeSearchRepositoriesByKeywordGeneratedDataContract, void>({
        path: `/legacy/repos/search/${keyword}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description This API call is added for compatibility reasons only.
     *
     * @name UserEmailDetail
     * @request GET:/legacy/user/email/{email}
     * @deprecated
     * @response `200` `SwaggerTypeSearchUserByEmailGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    userEmailDetail: (email: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeSearchUserByEmailGeneratedDataContract, void>({
        path: `/legacy/user/email/${email}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Find users by keyword.
     *
     * @name UserSearchDetail
     * @request GET:/legacy/user/search/{keyword}
     * @deprecated
     * @response `200` `SwaggerTypeSearchUsersByKeywordGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    userSearchDetail: (
      keyword: string,
      query?: { order?: "desc" | "asc"; start_page?: string; sort?: "updated" | "stars" | "forks" },
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeSearchUsersByKeywordGeneratedDataContract, void>({
        path: `/legacy/user/search/${keyword}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  markdown = {
    /**
     * @description Render an arbitrary Markdown document
     *
     * @name MarkdownCreate
     * @request POST:/markdown
     * @response `200` `void` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    markdownCreate: (body: SwaggerTypeMarkdownGeneratedDataContract, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/markdown`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Render a Markdown document in raw mode
     *
     * @name PostMarkdown
     * @request POST:/markdown/raw
     * @response `200` `void` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    postMarkdown: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/markdown/raw`,
        method: "POST",
        ...params,
      }),
  };
  meta = {
    /**
     * @description This gives some information about GitHub.com, the service.
     *
     * @name MetaList
     * @request GET:/meta
     * @response `200` `SwaggerTypeMetaGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    metaList: (params: RequestParams = {}) =>
      this.request<SwaggerTypeMetaGeneratedDataContract, void>({
        path: `/meta`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  networks = {
    /**
     * @description List public events for a network of repositories.
     *
     * @name EventsDetail
     * @request GET:/networks/{owner}/{repo}/events
     * @response `200` `SwaggerTypeEventsGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    eventsDetail: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeEventsGeneratedDataContract, void>({
        path: `/networks/${owner}/${repo}/events`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  notifications = {
    /**
     * @description List your notifications. List all notifications for the current user, grouped by repository.
     *
     * @name NotificationsList
     * @request GET:/notifications
     * @response `200` `SwaggerTypeNotificationsGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    notificationsList: (
      query?: { all?: boolean; participating?: boolean; since?: string },
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeNotificationsGeneratedDataContract, void>({
        path: `/notifications`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Mark as read. Marking a notification as "read" removes it from the default view on GitHub.com.
     *
     * @name NotificationsUpdate
     * @request PUT:/notifications
     * @response `205` `void` Marked as read.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    notificationsUpdate: (body: SwaggerTypeNotificationMarkReadGeneratedDataContract, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/notifications`,
        method: "PUT",
        body: body,
        ...params,
      }),

    /**
     * @description View a single thread.
     *
     * @name ThreadsDetail
     * @request GET:/notifications/threads/{id}
     * @response `200` `SwaggerTypeNotificationsGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    threadsDetail: (id: number, params: RequestParams = {}) =>
      this.request<SwaggerTypeNotificationsGeneratedDataContract, void>({
        path: `/notifications/threads/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Mark a thread as read
     *
     * @name ThreadsPartialUpdate
     * @request PATCH:/notifications/threads/{id}
     * @response `205` `void` Thread marked as read.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    threadsPartialUpdate: (id: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/notifications/threads/${id}`,
        method: "PATCH",
        ...params,
      }),

    /**
     * @description Delete a Thread Subscription.
     *
     * @name ThreadsSubscriptionDelete
     * @request DELETE:/notifications/threads/{id}/subscription
     * @response `204` `void` No Content
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    threadsSubscriptionDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/notifications/threads/${id}/subscription`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Get a Thread Subscription.
     *
     * @name ThreadsSubscriptionDetail
     * @request GET:/notifications/threads/{id}/subscription
     * @response `200` `SwaggerTypeSubscriptionGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    threadsSubscriptionDetail: (id: number, params: RequestParams = {}) =>
      this.request<SwaggerTypeSubscriptionGeneratedDataContract, void>({
        path: `/notifications/threads/${id}/subscription`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Set a Thread Subscription. This lets you subscribe to a thread, or ignore it. Subscribing to a thread is unnecessary if the user is already subscribed to the repository. Ignoring a thread will mute all future notifications (until you comment or get @mentioned).
     *
     * @name ThreadsSubscriptionUpdate
     * @request PUT:/notifications/threads/{id}/subscription
     * @response `200` `SwaggerTypeSubscriptionGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    threadsSubscriptionUpdate: (
      id: number,
      body: SwaggerTypePutSubscriptionGeneratedDataContract,
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeSubscriptionGeneratedDataContract, void>({
        path: `/notifications/threads/${id}/subscription`,
        method: "PUT",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  orgs = {
    /**
     * @description Get an Organization.
     *
     * @name OrgsDetail
     * @request GET:/orgs/{org}
     * @response `200` `SwaggerTypeOrganizationGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    orgsDetail: (org: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeOrganizationGeneratedDataContract, void>({
        path: `/orgs/${org}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Edit an Organization.
     *
     * @name OrgsPartialUpdate
     * @request PATCH:/orgs/{org}
     * @response `200` `SwaggerTypeOrganizationGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    orgsPartialUpdate: (org: string, body: SwaggerTypePatchOrgGeneratedDataContract, params: RequestParams = {}) =>
      this.request<SwaggerTypeOrganizationGeneratedDataContract, void>({
        path: `/orgs/${org}`,
        method: "PATCH",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description List public events for an organization.
     *
     * @name EventsDetail
     * @request GET:/orgs/{org}/events
     * @response `200` `SwaggerTypeEventsGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    eventsDetail: (org: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeEventsGeneratedDataContract, void>({
        path: `/orgs/${org}/events`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description List issues. List all issues for a given organization for the authenticated user.
     *
     * @name IssuesDetail
     * @request GET:/orgs/{org}/issues
     * @response `200` `SwaggerTypeIssuesGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    issuesDetail: (
      org: string,
      query: {
        filter: "assigned" | "created" | "mentioned" | "subscribed" | "all";
        state: "open" | "closed";
        labels: string;
        sort: "created" | "updated" | "comments";
        direction: "asc" | "desc";
        since?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeIssuesGeneratedDataContract, void>({
        path: `/orgs/${org}/issues`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Members list. List all users who are members of an organization. A member is a user tha belongs to at least 1 team in the organization. If the authenticated user is also an owner of this organization then both concealed and public members will be returned. If the requester is not an owner of the organization the query will be redirected to the public members list.
     *
     * @name MembersDetail
     * @request GET:/orgs/{org}/members
     * @response `200` `SwaggerTypeUsersGeneratedDataContract` OK
     * @response `302` `void` Response if requester is not an organization member.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    membersDetail: (org: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeUsersGeneratedDataContract, void>({
        path: `/orgs/${org}/members`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Remove a member. Removing a user from this list will remove them from all teams and they will no longer have any access to the organization's repositories.
     *
     * @name MembersDelete
     * @request DELETE:/orgs/{org}/members/{username}
     * @response `204` `void` No content.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    membersDelete: (org: string, username: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/orgs/${org}/members/${username}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Check if a user is, publicly or privately, a member of the organization.
     *
     * @name MembersDetail2
     * @request GET:/orgs/{org}/members/{username}
     * @originalName membersDetail
     * @duplicate
     * @response `204` `void` No content. Response if requester is an organization member and user is a member
     * @response `302` `void` Found. Response if requester is not an organization member
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     * @response `404` `void` Not Found. a. Response if requester is an organization member and user is not a member b. Response if requester is not an organization member and is inquiring about themselves
     */
    membersDetail2: (org: string, username: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/orgs/${org}/members/${username}`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Public members list. Members of an organization can choose to have their membership publicized or not.
     *
     * @name PublicMembersDetail
     * @request GET:/orgs/{org}/public_members
     * @response `200` `SwaggerTypeUsersGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    publicMembersDetail: (org: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeUsersGeneratedDataContract, void>({
        path: `/orgs/${org}/public_members`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Conceal a user's membership.
     *
     * @name PublicMembersDelete
     * @request DELETE:/orgs/{org}/public_members/{username}
     * @response `204` `void` Concealed.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    publicMembersDelete: (org: string, username: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/orgs/${org}/public_members/${username}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Check public membership.
     *
     * @name PublicMembersDetail2
     * @request GET:/orgs/{org}/public_members/{username}
     * @originalName publicMembersDetail
     * @duplicate
     * @response `204` `void` User is a public member.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     * @response `404` `void` User is not a public member.
     */
    publicMembersDetail2: (org: string, username: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/orgs/${org}/public_members/${username}`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Publicize a user's membership.
     *
     * @name PublicMembersUpdate
     * @request PUT:/orgs/{org}/public_members/{username}
     * @response `204` `void` Publicized.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    publicMembersUpdate: (org: string, username: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/orgs/${org}/public_members/${username}`,
        method: "PUT",
        ...params,
      }),

    /**
     * @description List repositories for the specified org.
     *
     * @name ReposDetail
     * @request GET:/orgs/{org}/repos
     * @response `200` `SwaggerTypeReposGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    reposDetail: (
      org: string,
      query?: { type?: "all" | "public" | "private" | "forks" | "sources" | "member" },
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeReposGeneratedDataContract, void>({
        path: `/orgs/${org}/repos`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new repository for the authenticated user. OAuth users must supply repo scope.
     *
     * @name ReposCreate
     * @request POST:/orgs/{org}/repos
     * @response `201` `SwaggerTypeReposGeneratedDataContract` Created
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    reposCreate: (org: string, body: SwaggerTypePostRepoGeneratedDataContract, params: RequestParams = {}) =>
      this.request<SwaggerTypeReposGeneratedDataContract, void>({
        path: `/orgs/${org}/repos`,
        method: "POST",
        body: body,
        format: "json",
        ...params,
      }),

    /**
     * @description List teams.
     *
     * @name TeamsDetail
     * @request GET:/orgs/{org}/teams
     * @response `200` `SwaggerTypeTeamsGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    teamsDetail: (org: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeTeamsGeneratedDataContract, void>({
        path: `/orgs/${org}/teams`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Create team. In order to create a team, the authenticated user must be an owner of organization.
     *
     * @name TeamsCreate
     * @request POST:/orgs/{org}/teams
     * @response `201` `SwaggerTypeTeamGeneratedDataContract` Created
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    teamsCreate: (org: string, body: SwaggerTypeOrgTeamsPostGeneratedDataContract, params: RequestParams = {}) =>
      this.request<SwaggerTypeTeamGeneratedDataContract, void>({
        path: `/orgs/${org}/teams`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  rateLimit = {
    /**
     * @description Get your current rate limit status Note: Accessing this endpoint does not count against your rate limit.
     *
     * @name RateLimitList
     * @request GET:/rate_limit
     * @response `200` `SwaggerTypeRateLimitGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    rateLimitList: (params: RequestParams = {}) =>
      this.request<SwaggerTypeRateLimitGeneratedDataContract, void>({
        path: `/rate_limit`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  repos = {
    /**
     * @description Delete a Repository. Deleting a repository requires admin access. If OAuth is used, the delete_repo scope is required.
     *
     * @name ReposDelete
     * @request DELETE:/repos/{owner}/{repo}
     * @response `204` `void` Item removed.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    reposDelete: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/repos/${owner}/${repo}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Get repository.
     *
     * @name ReposDetail
     * @request GET:/repos/{owner}/{repo}
     * @response `200` `SwaggerTypeRepoGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    reposDetail: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeRepoGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Edit repository.
     *
     * @name ReposPartialUpdate
     * @request PATCH:/repos/{owner}/{repo}
     * @response `200` `SwaggerTypeRepoGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    reposPartialUpdate: (
      owner: string,
      repo: string,
      body: SwaggerTypeRepoEditGeneratedDataContract,
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeRepoGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}`,
        method: "PATCH",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description List assignees. This call lists all the available assignees (owner + collaborators) to which issues may be assigned.
     *
     * @name AssigneesDetail
     * @request GET:/repos/{owner}/{repo}/assignees
     * @response `200` `SwaggerTypeAssigneesGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    assigneesDetail: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeAssigneesGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/assignees`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Check assignee. You may also check to see if a particular user is an assignee for a repository.
     *
     * @name AssigneesDetail2
     * @request GET:/repos/{owner}/{repo}/assignees/{assignee}
     * @originalName assigneesDetail
     * @duplicate
     * @response `204` `void` User is an assignee.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     * @response `404` `void` User isn't an assignee.
     */
    assigneesDetail2: (owner: string, repo: string, assignee: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/repos/${owner}/${repo}/assignees/${assignee}`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Get list of branches
     *
     * @name BranchesDetail
     * @request GET:/repos/{owner}/{repo}/branches
     * @response `200` `SwaggerTypeBranchesGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    branchesDetail: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeBranchesGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/branches`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get Branch
     *
     * @name BranchesDetail2
     * @request GET:/repos/{owner}/{repo}/branches/{branch}
     * @originalName branchesDetail
     * @duplicate
     * @response `200` `SwaggerTypeBranchGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    branchesDetail2: (owner: string, repo: string, branch: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeBranchGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/branches/${branch}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description List. When authenticating as an organization owner of an organization-owned repository, all organization owners are included in the list of collaborators. Otherwise, only users with access to the repository are returned in the collaborators list.
     *
     * @name CollaboratorsDetail
     * @request GET:/repos/{owner}/{repo}/collaborators
     * @response `200` `SwaggerTypeUsersGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    collaboratorsDetail: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeUsersGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/collaborators`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Remove collaborator.
     *
     * @name CollaboratorsDelete
     * @request DELETE:/repos/{owner}/{repo}/collaborators/{user}
     * @response `204` `void` Collaborator removed.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    collaboratorsDelete: (owner: string, repo: string, user: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/repos/${owner}/${repo}/collaborators/${user}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Check if user is a collaborator
     *
     * @name CollaboratorsDetail2
     * @request GET:/repos/{owner}/{repo}/collaborators/{user}
     * @originalName collaboratorsDetail
     * @duplicate
     * @response `204` `void` User is a collaborator.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     * @response `404` `void` User is not a collaborator.
     */
    collaboratorsDetail2: (owner: string, repo: string, user: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/repos/${owner}/${repo}/collaborators/${user}`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Add collaborator.
     *
     * @name CollaboratorsUpdate
     * @request PUT:/repos/{owner}/{repo}/collaborators/{user}
     * @response `204` `void` Collaborator added.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    collaboratorsUpdate: (owner: string, repo: string, user: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/repos/${owner}/${repo}/collaborators/${user}`,
        method: "PUT",
        ...params,
      }),

    /**
     * @description List commit comments for a repository. Comments are ordered by ascending ID.
     *
     * @name CommentsDetail
     * @request GET:/repos/{owner}/{repo}/comments
     * @response `200` `SwaggerTypeRepoCommentsGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    commentsDetail: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeRepoCommentsGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/comments`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a commit comment
     *
     * @name CommentsDelete
     * @request DELETE:/repos/{owner}/{repo}/comments/{commentId}
     * @response `204` `void` No content.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    commentsDelete: (owner: string, repo: string, commentId: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/repos/${owner}/${repo}/comments/${commentId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Get a single commit comment.
     *
     * @name CommentsDetail2
     * @request GET:/repos/{owner}/{repo}/comments/{commentId}
     * @originalName commentsDetail
     * @duplicate
     * @response `200` `SwaggerTypeCommitCommentGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    commentsDetail2: (owner: string, repo: string, commentId: number, params: RequestParams = {}) =>
      this.request<SwaggerTypeCommitCommentGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/comments/${commentId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Update a commit comment.
     *
     * @name CommentsPartialUpdate
     * @request PATCH:/repos/{owner}/{repo}/comments/{commentId}
     * @response `200` `SwaggerTypeCommitCommentGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    commentsPartialUpdate: (
      owner: string,
      repo: string,
      commentId: number,
      body: SwaggerTypeCommentBodyGeneratedDataContract,
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeCommitCommentGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/comments/${commentId}`,
        method: "PATCH",
        body: body,
        format: "json",
        ...params,
      }),

    /**
     * @description List commits on a repository.
     *
     * @name CommitsDetail
     * @request GET:/repos/{owner}/{repo}/commits
     * @response `200` `SwaggerTypeCommitsGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    commitsDetail: (
      owner: string,
      repo: string,
      query?: { since?: string; sha?: string; path?: string; author?: string; until?: string },
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeCommitsGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/commits`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Get the combined Status for a specific Ref The Combined status endpoint is currently available for developers to preview. During the preview period, the API may change without advance notice. Please see the blog post for full details. To access this endpoint during the preview period, you must provide a custom media type in the Accept header: application/vnd.github.she-hulk-preview+json
     *
     * @name CommitsStatusDetail
     * @request GET:/repos/{owner}/{repo}/commits/{ref}/status
     * @response `200` `SwaggerTypeRefStatusGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    commitsStatusDetail: (owner: string, repo: string, ref: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeRefStatusGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/commits/${ref}/status`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get a single commit.
     *
     * @name CommitsDetail2
     * @request GET:/repos/{owner}/{repo}/commits/{shaCode}
     * @originalName commitsDetail
     * @duplicate
     * @response `200` `SwaggerTypeCommitGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    commitsDetail2: (owner: string, repo: string, shaCode: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeCommitGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/commits/${shaCode}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description List comments for a single commitList comments for a single commit.
     *
     * @name CommitsCommentsDetail
     * @request GET:/repos/{owner}/{repo}/commits/{shaCode}/comments
     * @response `200` `SwaggerTypeRepoCommentsGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    commitsCommentsDetail: (owner: string, repo: string, shaCode: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeRepoCommentsGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/commits/${shaCode}/comments`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Create a commit comment.
     *
     * @name CommitsCommentsCreate
     * @request POST:/repos/{owner}/{repo}/commits/{shaCode}/comments
     * @response `201` `SwaggerTypeCommitCommentGeneratedDataContract` Created
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    commitsCommentsCreate: (
      owner: string,
      repo: string,
      shaCode: string,
      body: SwaggerTypeCommitCommentBodyGeneratedDataContract,
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeCommitCommentGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/commits/${shaCode}/comments`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Compare two commits
     *
     * @name CompareDetail
     * @request GET:/repos/{owner}/{repo}/compare/{baseId}...{headId}
     * @response `200` `SwaggerTypeCompareCommitsGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    compareDetail: (owner: string, repo: string, baseId: string, headId: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeCompareCommitsGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/compare/${baseId}...${headId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a file. This method deletes a file in a repository.
     *
     * @name ContentsDelete
     * @request DELETE:/repos/{owner}/{repo}/contents/{path}
     * @response `200` `SwaggerTypeDeleteFileGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    contentsDelete: (
      owner: string,
      repo: string,
      path: string,
      body: SwaggerTypeDeleteFileBodyGeneratedDataContract,
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeDeleteFileGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/contents/${path}`,
        method: "DELETE",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get contents. This method returns the contents of a file or directory in a repository. Files and symlinks support a custom media type for getting the raw content. Directories and submodules do not support custom media types. Note: This API supports files up to 1 megabyte in size. Here can be many outcomes. For details see "http://developer.github.com/v3/repos/contents/"
     *
     * @name ContentsDetail
     * @request GET:/repos/{owner}/{repo}/contents/{path}
     * @response `200` `SwaggerTypeContentsPathGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    contentsDetail: (
      owner: string,
      repo: string,
      path: string,
      query?: { path?: string; ref?: string },
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeContentsPathGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/contents/${path}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a file.
     *
     * @name ContentsUpdate
     * @request PUT:/repos/{owner}/{repo}/contents/{path}
     * @response `200` `SwaggerTypeCreateFileGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    contentsUpdate: (
      owner: string,
      repo: string,
      path: string,
      body: SwaggerTypeCreateFileBodyGeneratedDataContract,
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeCreateFileGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/contents/${path}`,
        method: "PUT",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get list of contributors.
     *
     * @name ContributorsDetail
     * @request GET:/repos/{owner}/{repo}/contributors
     * @response `200` `SwaggerTypeUsersGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    contributorsDetail: (owner: string, repo: string, query: { anon: string }, params: RequestParams = {}) =>
      this.request<SwaggerTypeUsersGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/contributors`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Users with pull access can view deployments for a repository
     *
     * @name DeploymentsDetail
     * @request GET:/repos/{owner}/{repo}/deployments
     * @response `200` `SwaggerTypeRepoDeploymentsGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    deploymentsDetail: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeRepoDeploymentsGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/deployments`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Users with push access can create a deployment for a given ref
     *
     * @name DeploymentsCreate
     * @request POST:/repos/{owner}/{repo}/deployments
     * @response `201` `SwaggerTypeDeploymentRespGeneratedDataContract` Created
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    deploymentsCreate: (
      owner: string,
      repo: string,
      body: SwaggerTypeDeploymentGeneratedDataContract,
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeDeploymentRespGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/deployments`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Users with pull access can view deployment statuses for a deployment
     *
     * @name DeploymentsStatusesDetail
     * @request GET:/repos/{owner}/{repo}/deployments/{id}/statuses
     * @response `200` `SwaggerTypeDeploymentStatusesGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    deploymentsStatusesDetail: (owner: string, repo: string, id: number, params: RequestParams = {}) =>
      this.request<SwaggerTypeDeploymentStatusesGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/deployments/${id}/statuses`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Create a Deployment Status Users with push access can create deployment statuses for a given deployment:
     *
     * @name DeploymentsStatusesCreate
     * @request POST:/repos/{owner}/{repo}/deployments/{id}/statuses
     * @response `201` `void` ok
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    deploymentsStatusesCreate: (
      owner: string,
      repo: string,
      id: number,
      body: SwaggerTypeDeploymentStatusesCreateGeneratedDataContract,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/repos/${owner}/${repo}/deployments/${id}/statuses`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Deprecated. List downloads for a repository.
     *
     * @name DownloadsDetail
     * @request GET:/repos/{owner}/{repo}/downloads
     * @deprecated
     * @response `200` `SwaggerTypeDownloadsGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    downloadsDetail: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeDownloadsGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/downloads`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Deprecated. Delete a download.
     *
     * @name DownloadsDelete
     * @request DELETE:/repos/{owner}/{repo}/downloads/{downloadId}
     * @deprecated
     * @response `204` `void` No content.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    downloadsDelete: (owner: string, repo: string, downloadId: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/repos/${owner}/${repo}/downloads/${downloadId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Deprecated. Get a single download.
     *
     * @name DownloadsDetail2
     * @request GET:/repos/{owner}/{repo}/downloads/{downloadId}
     * @deprecated
     * @originalName downloadsDetail
     * @duplicate
     * @response `200` `SwaggerTypeDownloadGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    downloadsDetail2: (owner: string, repo: string, downloadId: number, params: RequestParams = {}) =>
      this.request<SwaggerTypeDownloadGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/downloads/${downloadId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get list of repository events.
     *
     * @name EventsDetail
     * @request GET:/repos/{owner}/{repo}/events
     * @response `200` `SwaggerTypeEventsGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    eventsDetail: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeEventsGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/events`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description List forks.
     *
     * @name ForksDetail
     * @request GET:/repos/{owner}/{repo}/forks
     * @response `200` `SwaggerTypeForksGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    forksDetail: (
      owner: string,
      repo: string,
      query?: { sort?: "newes" | "oldes" | "watchers" },
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeForksGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/forks`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a fork. Forking a Repository happens asynchronously. Therefore, you may have to wai a short period before accessing the git objects. If this takes longer than 5 minutes, be sure to contact Support.
     *
     * @name ForksCreate
     * @request POST:/repos/{owner}/{repo}/forks
     * @response `201` `SwaggerTypeRepoGeneratedDataContract` Created
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    forksCreate: (
      owner: string,
      repo: string,
      body: SwaggerTypeForkBodyGeneratedDataContract,
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeRepoGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/forks`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a Blob.
     *
     * @name GitBlobsCreate
     * @request POST:/repos/{owner}/{repo}/git/blobs
     * @response `201` `SwaggerTypeBlobsGeneratedDataContract` Created
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    gitBlobsCreate: (
      owner: string,
      repo: string,
      body: SwaggerTypeBlobGeneratedDataContract,
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeBlobsGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/git/blobs`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a Blob. Since blobs can be any arbitrary binary data, the input and responses for the blob API takes an encoding parameter that can be either utf-8 or base64. If your data cannot be losslessly sent as a UTF-8 string, you can base64 encode it.
     *
     * @name GitBlobsDetail
     * @request GET:/repos/{owner}/{repo}/git/blobs/{shaCode}
     * @response `200` `SwaggerTypeBlobGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    gitBlobsDetail: (owner: string, repo: string, shaCode: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeBlobGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/git/blobs/${shaCode}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Create a Commit.
     *
     * @name GitCommitsCreate
     * @request POST:/repos/{owner}/{repo}/git/commits
     * @response `201` `SwaggerTypeGitCommitGeneratedDataContract` Created
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    gitCommitsCreate: (
      owner: string,
      repo: string,
      body: SwaggerTypeRepoCommitBodyGeneratedDataContract,
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeGitCommitGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/git/commits`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a Commit.
     *
     * @name GitCommitsDetail
     * @request GET:/repos/{owner}/{repo}/git/commits/{shaCode}
     * @response `200` `SwaggerTypeRepoCommitGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    gitCommitsDetail: (owner: string, repo: string, shaCode: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeRepoCommitGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/git/commits/${shaCode}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get all References
     *
     * @name GitRefsDetail
     * @request GET:/repos/{owner}/{repo}/git/refs
     * @response `200` `SwaggerTypeRefsGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    gitRefsDetail: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeRefsGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/git/refs`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Create a Reference
     *
     * @name GitRefsCreate
     * @request POST:/repos/{owner}/{repo}/git/refs
     * @response `201` `SwaggerTypeHeadBranchGeneratedDataContract` Created
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    gitRefsCreate: (
      owner: string,
      repo: string,
      body: SwaggerTypeRefsBodyGeneratedDataContract,
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeHeadBranchGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/git/refs`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a Reference Example: Deleting a branch: DELETE /repos/octocat/Hello-World/git/refs/heads/feature-a Example: Deleting a tag:        DELETE /repos/octocat/Hello-World/git/refs/tags/v1.0
     *
     * @name GitRefsDelete
     * @request DELETE:/repos/{owner}/{repo}/git/refs/{ref}
     * @response `204` `void` No Content
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    gitRefsDelete: (owner: string, repo: string, ref: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/repos/${owner}/${repo}/git/refs/${ref}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Get a Reference
     *
     * @name GitRefsDetail2
     * @request GET:/repos/{owner}/{repo}/git/refs/{ref}
     * @originalName gitRefsDetail
     * @duplicate
     * @response `200` `SwaggerTypeHeadBranchGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    gitRefsDetail2: (owner: string, repo: string, ref: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeHeadBranchGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/git/refs/${ref}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Update a Reference
     *
     * @name GitRefsPartialUpdate
     * @request PATCH:/repos/{owner}/{repo}/git/refs/{ref}
     * @response `200` `SwaggerTypeHeadBranchGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    gitRefsPartialUpdate: (
      owner: string,
      repo: string,
      ref: string,
      body: SwaggerTypeGitRefPatchGeneratedDataContract,
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeHeadBranchGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/git/refs/${ref}`,
        method: "PATCH",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a Tag Object. Note that creating a tag object does not create the reference that makes a tag in Git. If you want to create an annotated tag in Git, you have to do this call to create the tag object, and then create the refs/tags/[tag] reference. If you want to create a lightweight tag, you only have to create the tag reference - this call would be unnecessary.
     *
     * @name GitTagsCreate
     * @request POST:/repos/{owner}/{repo}/git/tags
     * @response `201` `SwaggerTypeTagGeneratedDataContract` Created
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    gitTagsCreate: (
      owner: string,
      repo: string,
      body: SwaggerTypeTagBodyGeneratedDataContract,
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeTagGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/git/tags`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a Tag.
     *
     * @name GitTagsDetail
     * @request GET:/repos/{owner}/{repo}/git/tags/{shaCode}
     * @response `200` `SwaggerTypeTagGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    gitTagsDetail: (owner: string, repo: string, shaCode: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeTagGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/git/tags/${shaCode}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Create a Tree. The tree creation API will take nested entries as well. If both a tree and a nested path modifying that tree are specified, it will overwrite the contents of that tree with the new path contents and write a new tree out.
     *
     * @name GitTreesCreate
     * @request POST:/repos/{owner}/{repo}/git/trees
     * @response `201` `SwaggerTypeTreesGeneratedDataContract` Created
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    gitTreesCreate: (
      owner: string,
      repo: string,
      body: SwaggerTypeTreeGeneratedDataContract,
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeTreesGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/git/trees`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a Tree.
     *
     * @name GitTreesDetail
     * @request GET:/repos/{owner}/{repo}/git/trees/{shaCode}
     * @response `200` `SwaggerTypeTreeGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    gitTreesDetail: (
      owner: string,
      repo: string,
      shaCode: string,
      query?: { recursive?: number },
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeTreeGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/git/trees/${shaCode}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Get list of hooks.
     *
     * @name HooksDetail
     * @request GET:/repos/{owner}/{repo}/hooks
     * @response `200` `SwaggerTypeHookGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    hooksDetail: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeHookGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/hooks`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Create a hook.
     *
     * @name HooksCreate
     * @request POST:/repos/{owner}/{repo}/hooks
     * @response `201` `SwaggerTypeHookGeneratedDataContract` Created
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    hooksCreate: (
      owner: string,
      repo: string,
      body: SwaggerTypeHookBodyGeneratedDataContract,
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeHookGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/hooks`,
        method: "POST",
        body: body,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a hook.
     *
     * @name HooksDelete
     * @request DELETE:/repos/{owner}/{repo}/hooks/{hookId}
     * @response `204` `void` No content.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    hooksDelete: (owner: string, repo: string, hookId: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/repos/${owner}/${repo}/hooks/${hookId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Get single hook.
     *
     * @name HooksDetail2
     * @request GET:/repos/{owner}/{repo}/hooks/{hookId}
     * @originalName hooksDetail
     * @duplicate
     * @response `200` `SwaggerTypeHookGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    hooksDetail2: (owner: string, repo: string, hookId: number, params: RequestParams = {}) =>
      this.request<SwaggerTypeHookGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/hooks/${hookId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Edit a hook.
     *
     * @name HooksPartialUpdate
     * @request PATCH:/repos/{owner}/{repo}/hooks/{hookId}
     * @response `200` `SwaggerTypeHookGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    hooksPartialUpdate: (
      owner: string,
      repo: string,
      hookId: number,
      body: SwaggerTypeHookBodyGeneratedDataContract,
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeHookGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/hooks/${hookId}`,
        method: "PATCH",
        body: body,
        format: "json",
        ...params,
      }),

    /**
     * @description Test a push hook. This will trigger the hook with the latest push to the current repository if the hook is subscribed to push events. If the hook is not subscribed to push events, the server will respond with 204 but no test POST will be generated. Note: Previously /repos/:owner/:repo/hooks/:id/tes
     *
     * @name HooksTestsCreate
     * @request POST:/repos/{owner}/{repo}/hooks/{hookId}/tests
     * @response `204` `void` Hook is triggered.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    hooksTestsCreate: (owner: string, repo: string, hookId: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/repos/${owner}/${repo}/hooks/${hookId}/tests`,
        method: "POST",
        ...params,
      }),

    /**
     * @description List issues for a repository.
     *
     * @name IssuesDetail
     * @request GET:/repos/{owner}/{repo}/issues
     * @response `200` `SwaggerTypeIssuesGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    issuesDetail: (
      owner: string,
      repo: string,
      query: {
        filter: "assigned" | "created" | "mentioned" | "subscribed" | "all";
        state: "open" | "closed";
        labels: string;
        sort: "created" | "updated" | "comments";
        direction: "asc" | "desc";
        since?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeIssuesGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/issues`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Create an issue. Any user with pull access to a repository can create an issue.
     *
     * @name IssuesCreate
     * @request POST:/repos/{owner}/{repo}/issues
     * @response `201` `SwaggerTypeIssueGeneratedDataContract` Created
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    issuesCreate: (
      owner: string,
      repo: string,
      body: SwaggerTypeIssueGeneratedDataContract,
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeIssueGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/issues`,
        method: "POST",
        body: body,
        format: "json",
        ...params,
      }),

    /**
     * @description List comments in a repository.
     *
     * @name IssuesCommentsDetail
     * @request GET:/repos/{owner}/{repo}/issues/comments
     * @response `200` `SwaggerTypeIssuesCommentsGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    issuesCommentsDetail: (
      owner: string,
      repo: string,
      query?: { direction?: string; sort?: "created" | "updated"; since?: string },
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeIssuesCommentsGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/issues/comments`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a comment.
     *
     * @name IssuesCommentsDelete
     * @request DELETE:/repos/{owner}/{repo}/issues/comments/{commentId}
     * @response `204` `void` No content.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    issuesCommentsDelete: (owner: string, repo: string, commentId: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/repos/${owner}/${repo}/issues/comments/${commentId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Get a single comment.
     *
     * @name IssuesCommentsDetail2
     * @request GET:/repos/{owner}/{repo}/issues/comments/{commentId}
     * @originalName issuesCommentsDetail
     * @duplicate
     * @response `200` `SwaggerTypeIssuesCommentGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    issuesCommentsDetail2: (owner: string, repo: string, commentId: number, params: RequestParams = {}) =>
      this.request<SwaggerTypeIssuesCommentGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/issues/comments/${commentId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Edit a comment.
     *
     * @name IssuesCommentsPartialUpdate
     * @request PATCH:/repos/{owner}/{repo}/issues/comments/{commentId}
     * @response `200` `SwaggerTypeIssuesCommentGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    issuesCommentsPartialUpdate: (
      owner: string,
      repo: string,
      commentId: number,
      body: SwaggerTypeCommentBodyGeneratedDataContract,
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeIssuesCommentGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/issues/comments/${commentId}`,
        method: "PATCH",
        body: body,
        format: "json",
        ...params,
      }),

    /**
     * @description List issue events for a repository.
     *
     * @name IssuesEventsDetail
     * @request GET:/repos/{owner}/{repo}/issues/events
     * @response `200` `SwaggerTypeIssueEventsGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    issuesEventsDetail: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeIssueEventsGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/issues/events`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get a single event.
     *
     * @name IssuesEventsDetail2
     * @request GET:/repos/{owner}/{repo}/issues/events/{eventId}
     * @originalName issuesEventsDetail
     * @duplicate
     * @response `200` `SwaggerTypeIssueEventGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    issuesEventsDetail2: (owner: string, repo: string, eventId: number, params: RequestParams = {}) =>
      this.request<SwaggerTypeIssueEventGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/issues/events/${eventId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get a single issue
     *
     * @name IssuesDetail2
     * @request GET:/repos/{owner}/{repo}/issues/{number}
     * @originalName issuesDetail
     * @duplicate
     * @response `200` `SwaggerTypeIssueGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    issuesDetail2: (owner: string, repo: string, number: number, params: RequestParams = {}) =>
      this.request<SwaggerTypeIssueGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/issues/${number}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Edit an issue. Issue owners and users with push access can edit an issue.
     *
     * @name IssuesPartialUpdate
     * @request PATCH:/repos/{owner}/{repo}/issues/{number}
     * @response `200` `SwaggerTypeIssueGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    issuesPartialUpdate: (
      owner: string,
      repo: string,
      number: number,
      body: SwaggerTypeIssueGeneratedDataContract,
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeIssueGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/issues/${number}`,
        method: "PATCH",
        body: body,
        format: "json",
        ...params,
      }),

    /**
     * @description List comments on an issue.
     *
     * @name IssuesCommentsDetail3
     * @request GET:/repos/{owner}/{repo}/issues/{number}/comments
     * @originalName issuesCommentsDetail
     * @duplicate
     * @response `200` `SwaggerTypeIssuesCommentsGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    issuesCommentsDetail3: (owner: string, repo: string, number: number, params: RequestParams = {}) =>
      this.request<SwaggerTypeIssuesCommentsGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/issues/${number}/comments`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Create a comment.
     *
     * @name IssuesCommentsCreate
     * @request POST:/repos/{owner}/{repo}/issues/{number}/comments
     * @response `201` `SwaggerTypeIssuesCommentGeneratedDataContract` Created
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    issuesCommentsCreate: (
      owner: string,
      repo: string,
      number: number,
      body: SwaggerTypeCommentBodyGeneratedDataContract,
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeIssuesCommentGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/issues/${number}/comments`,
        method: "POST",
        body: body,
        format: "json",
        ...params,
      }),

    /**
     * @description List events for an issue.
     *
     * @name IssuesEventsDetail3
     * @request GET:/repos/{owner}/{repo}/issues/{number}/events
     * @originalName issuesEventsDetail
     * @duplicate
     * @response `200` `SwaggerTypeIssueEventsGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    issuesEventsDetail3: (owner: string, repo: string, number: number, params: RequestParams = {}) =>
      this.request<SwaggerTypeIssueEventsGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/issues/${number}/events`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Remove all labels from an issue.
     *
     * @name IssuesLabelsDelete
     * @request DELETE:/repos/{owner}/{repo}/issues/{number}/labels
     * @response `204` `void` No content.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    issuesLabelsDelete: (owner: string, repo: string, number: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/repos/${owner}/${repo}/issues/${number}/labels`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description List labels on an issue.
     *
     * @name IssuesLabelsDetail
     * @request GET:/repos/{owner}/{repo}/issues/{number}/labels
     * @response `200` `SwaggerTypeLabelsGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    issuesLabelsDetail: (owner: string, repo: string, number: number, params: RequestParams = {}) =>
      this.request<SwaggerTypeLabelsGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/issues/${number}/labels`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Add labels to an issue.
     *
     * @name IssuesLabelsCreate
     * @request POST:/repos/{owner}/{repo}/issues/{number}/labels
     * @response `201` `SwaggerTypeLabelGeneratedDataContract` Created
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    issuesLabelsCreate: (
      owner: string,
      repo: string,
      number: number,
      body: SwaggerTypeEmailsPostGeneratedDataContract,
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeLabelGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/issues/${number}/labels`,
        method: "POST",
        body: body,
        format: "json",
        ...params,
      }),

    /**
     * @description Replace all labels for an issue. Sending an empty array ([]) will remove all Labels from the Issue.
     *
     * @name IssuesLabelsUpdate
     * @request PUT:/repos/{owner}/{repo}/issues/{number}/labels
     * @response `201` `SwaggerTypeLabelGeneratedDataContract` Created
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    issuesLabelsUpdate: (
      owner: string,
      repo: string,
      number: number,
      body: SwaggerTypeEmailsPostGeneratedDataContract,
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeLabelGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/issues/${number}/labels`,
        method: "PUT",
        body: body,
        format: "json",
        ...params,
      }),

    /**
     * @description Remove a label from an issue.
     *
     * @name IssuesLabelsDelete2
     * @request DELETE:/repos/{owner}/{repo}/issues/{number}/labels/{name}
     * @originalName issuesLabelsDelete
     * @duplicate
     * @response `204` `void` Item removed.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    issuesLabelsDelete2: (owner: string, repo: string, number: number, name: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/repos/${owner}/${repo}/issues/${number}/labels/${name}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Get list of keys.
     *
     * @name KeysDetail
     * @request GET:/repos/{owner}/{repo}/keys
     * @response `200` `SwaggerTypeKeysGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    keysDetail: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeKeysGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/keys`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Create a key.
     *
     * @name KeysCreate
     * @request POST:/repos/{owner}/{repo}/keys
     * @response `201` `SwaggerTypeUserKeysKeyIdGeneratedDataContract` Created
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    keysCreate: (
      owner: string,
      repo: string,
      body: SwaggerTypeUserKeysPostGeneratedDataContract,
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeUserKeysKeyIdGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/keys`,
        method: "POST",
        body: body,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a key.
     *
     * @name KeysDelete
     * @request DELETE:/repos/{owner}/{repo}/keys/{keyId}
     * @response `204` `void` No content.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    keysDelete: (owner: string, repo: string, keyId: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/repos/${owner}/${repo}/keys/${keyId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Get a key
     *
     * @name KeysDetail2
     * @request GET:/repos/{owner}/{repo}/keys/{keyId}
     * @originalName keysDetail
     * @duplicate
     * @response `200` `SwaggerTypeUserKeysKeyIdGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    keysDetail2: (owner: string, repo: string, keyId: number, params: RequestParams = {}) =>
      this.request<SwaggerTypeUserKeysKeyIdGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/keys/${keyId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description List all labels for this repository.
     *
     * @name LabelsDetail
     * @request GET:/repos/{owner}/{repo}/labels
     * @response `200` `SwaggerTypeLabelsGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    labelsDetail: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeLabelsGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/labels`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Create a label.
     *
     * @name LabelsCreate
     * @request POST:/repos/{owner}/{repo}/labels
     * @response `201` `SwaggerTypeLabelGeneratedDataContract` Created
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    labelsCreate: (
      owner: string,
      repo: string,
      body: SwaggerTypeEmailsPostGeneratedDataContract,
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeLabelGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/labels`,
        method: "POST",
        body: body,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a label.
     *
     * @name LabelsDelete
     * @request DELETE:/repos/{owner}/{repo}/labels/{name}
     * @response `204` `void` No content.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    labelsDelete: (owner: string, repo: string, name: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/repos/${owner}/${repo}/labels/${name}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Get a single label.
     *
     * @name LabelsDetail2
     * @request GET:/repos/{owner}/{repo}/labels/{name}
     * @originalName labelsDetail
     * @duplicate
     * @response `200` `SwaggerTypeLabelGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    labelsDetail2: (owner: string, repo: string, name: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeLabelGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/labels/${name}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Update a label.
     *
     * @name LabelsPartialUpdate
     * @request PATCH:/repos/{owner}/{repo}/labels/{name}
     * @response `200` `SwaggerTypeLabelGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    labelsPartialUpdate: (
      owner: string,
      repo: string,
      name: string,
      body: SwaggerTypeEmailsPostGeneratedDataContract,
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeLabelGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/labels/${name}`,
        method: "PATCH",
        body: body,
        format: "json",
        ...params,
      }),

    /**
     * @description List languages. List languages for the specified repository. The value on the right of a language is the number of bytes of code written in that language.
     *
     * @name LanguagesDetail
     * @request GET:/repos/{owner}/{repo}/languages
     * @response `200` `SwaggerTypeLanguagesGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    languagesDetail: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeLanguagesGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/languages`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Perform a merge.
     *
     * @name MergesCreate
     * @request POST:/repos/{owner}/{repo}/merges
     * @response `201` `SwaggerTypeMergesSuccessfulGeneratedDataContract` Successful Response (The resulting merge commit)
     * @response `204` `void` No-op response (base already contains the head, nothing to merge)
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     * @response `404` `SwaggerTypeMergesConflictGeneratedDataContract` Missing base response or missing head response
     * @response `409` `SwaggerTypeMergesConflictGeneratedDataContract` Merge conflict response.
     */
    mergesCreate: (
      owner: string,
      repo: string,
      body: SwaggerTypeMergesBodyGeneratedDataContract,
      params: RequestParams = {},
    ) =>
      this.request<
        SwaggerTypeMergesSuccessfulGeneratedDataContract,
        void | SwaggerTypeMergesConflictGeneratedDataContract
      >({
        path: `/repos/${owner}/${repo}/merges`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description List milestones for a repository.
     *
     * @name MilestonesDetail
     * @request GET:/repos/{owner}/{repo}/milestones
     * @response `200` `SwaggerTypeMilestoneGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    milestonesDetail: (
      owner: string,
      repo: string,
      query?: { state?: "open" | "closed"; direction?: string; sort?: "due_date" | "completeness" },
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeMilestoneGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/milestones`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a milestone.
     *
     * @name MilestonesCreate
     * @request POST:/repos/{owner}/{repo}/milestones
     * @response `201` `SwaggerTypeMilestoneGeneratedDataContract` Created
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    milestonesCreate: (
      owner: string,
      repo: string,
      body: SwaggerTypeMilestoneUpdateGeneratedDataContract,
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeMilestoneGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/milestones`,
        method: "POST",
        body: body,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a milestone.
     *
     * @name MilestonesDelete
     * @request DELETE:/repos/{owner}/{repo}/milestones/{number}
     * @response `204` `void` No content.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    milestonesDelete: (owner: string, repo: string, number: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/repos/${owner}/${repo}/milestones/${number}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Get a single milestone.
     *
     * @name MilestonesDetail2
     * @request GET:/repos/{owner}/{repo}/milestones/{number}
     * @originalName milestonesDetail
     * @duplicate
     * @response `200` `SwaggerTypeMilestoneGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    milestonesDetail2: (owner: string, repo: string, number: number, params: RequestParams = {}) =>
      this.request<SwaggerTypeMilestoneGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/milestones/${number}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Update a milestone.
     *
     * @name MilestonesPartialUpdate
     * @request PATCH:/repos/{owner}/{repo}/milestones/{number}
     * @response `200` `SwaggerTypeMilestoneGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    milestonesPartialUpdate: (
      owner: string,
      repo: string,
      number: number,
      body: SwaggerTypeMilestoneUpdateGeneratedDataContract,
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeMilestoneGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/milestones/${number}`,
        method: "PATCH",
        body: body,
        format: "json",
        ...params,
      }),

    /**
     * @description Get labels for every issue in a milestone.
     *
     * @name MilestonesLabelsDetail
     * @request GET:/repos/{owner}/{repo}/milestones/{number}/labels
     * @response `200` `SwaggerTypeLabelsGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    milestonesLabelsDetail: (owner: string, repo: string, number: number, params: RequestParams = {}) =>
      this.request<SwaggerTypeLabelsGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/milestones/${number}/labels`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description List your notifications in a repository List all notifications for the current user.
     *
     * @name NotificationsDetail
     * @request GET:/repos/{owner}/{repo}/notifications
     * @response `200` `SwaggerTypeNotificationsGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    notificationsDetail: (
      owner: string,
      repo: string,
      query?: { all?: boolean; participating?: boolean; since?: string },
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeNotificationsGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/notifications`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Mark notifications as read in a repository. Marking all notifications in a repository as "read" removes them from the default view on GitHub.com.
     *
     * @name NotificationsUpdate
     * @request PUT:/repos/{owner}/{repo}/notifications
     * @response `205` `void` Marked as read.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    notificationsUpdate: (
      owner: string,
      repo: string,
      body: SwaggerTypeNotificationMarkReadGeneratedDataContract,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/repos/${owner}/${repo}/notifications`,
        method: "PUT",
        body: body,
        ...params,
      }),

    /**
     * @description List pull requests.
     *
     * @name PullsDetail
     * @request GET:/repos/{owner}/{repo}/pulls
     * @response `200` `SwaggerTypePullsGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    pullsDetail: (
      owner: string,
      repo: string,
      query?: { state?: "open" | "closed"; head?: string; base?: string },
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypePullsGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/pulls`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a pull request.
     *
     * @name PullsCreate
     * @request POST:/repos/{owner}/{repo}/pulls
     * @response `201` `SwaggerTypePullsGeneratedDataContract` Created
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    pullsCreate: (
      owner: string,
      repo: string,
      body: SwaggerTypePullsPostGeneratedDataContract,
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypePullsGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/pulls`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description List comments in a repository. By default, Review Comments are ordered by ascending ID.
     *
     * @name PullsCommentsDetail
     * @request GET:/repos/{owner}/{repo}/pulls/comments
     * @response `200` `SwaggerTypeIssuesCommentsGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    pullsCommentsDetail: (
      owner: string,
      repo: string,
      query?: { direction?: string; sort?: "created" | "updated"; since?: string },
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeIssuesCommentsGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/pulls/comments`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a comment.
     *
     * @name PullsCommentsDelete
     * @request DELETE:/repos/{owner}/{repo}/pulls/comments/{commentId}
     * @response `204` `void` No content.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    pullsCommentsDelete: (owner: string, repo: string, commentId: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/repos/${owner}/${repo}/pulls/comments/${commentId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Get a single comment.
     *
     * @name PullsCommentsDetail2
     * @request GET:/repos/{owner}/{repo}/pulls/comments/{commentId}
     * @originalName pullsCommentsDetail
     * @duplicate
     * @response `200` `SwaggerTypePullsCommentGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    pullsCommentsDetail2: (owner: string, repo: string, commentId: number, params: RequestParams = {}) =>
      this.request<SwaggerTypePullsCommentGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/pulls/comments/${commentId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Edit a comment.
     *
     * @name PullsCommentsPartialUpdate
     * @request PATCH:/repos/{owner}/{repo}/pulls/comments/{commentId}
     * @response `200` `SwaggerTypePullsCommentGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    pullsCommentsPartialUpdate: (
      owner: string,
      repo: string,
      commentId: number,
      body: SwaggerTypeCommentBodyGeneratedDataContract,
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypePullsCommentGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/pulls/comments/${commentId}`,
        method: "PATCH",
        body: body,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a single pull request.
     *
     * @name PullsDetail2
     * @request GET:/repos/{owner}/{repo}/pulls/{number}
     * @originalName pullsDetail
     * @duplicate
     * @response `200` `SwaggerTypePullRequestGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    pullsDetail2: (owner: string, repo: string, number: number, params: RequestParams = {}) =>
      this.request<SwaggerTypePullRequestGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/pulls/${number}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Update a pull request.
     *
     * @name PullsPartialUpdate
     * @request PATCH:/repos/{owner}/{repo}/pulls/{number}
     * @response `200` `SwaggerTypeRepoGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    pullsPartialUpdate: (
      owner: string,
      repo: string,
      number: number,
      body: SwaggerTypePullUpdateGeneratedDataContract,
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeRepoGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/pulls/${number}`,
        method: "PATCH",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description List comments on a pull request.
     *
     * @name PullsCommentsDetail3
     * @request GET:/repos/{owner}/{repo}/pulls/{number}/comments
     * @originalName pullsCommentsDetail
     * @duplicate
     * @response `200` `SwaggerTypePullsCommentGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    pullsCommentsDetail3: (owner: string, repo: string, number: number, params: RequestParams = {}) =>
      this.request<SwaggerTypePullsCommentGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/pulls/${number}/comments`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Create a comment. #TODO Alternative input ( http://developer.github.com/v3/pulls/comments/ ) description: | Alternative Input. Instead of passing commit_id, path, and position you can reply to an existing Pull Request Comment like this: body Required string in_reply_to Required number - Comment id to reply to.
     *
     * @name PullsCommentsCreate
     * @request POST:/repos/{owner}/{repo}/pulls/{number}/comments
     * @response `201` `SwaggerTypePullsCommentGeneratedDataContract` Created
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    pullsCommentsCreate: (
      owner: string,
      repo: string,
      number: number,
      body: SwaggerTypePullsCommentPostGeneratedDataContract,
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypePullsCommentGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/pulls/${number}/comments`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description List commits on a pull request.
     *
     * @name PullsCommitsDetail
     * @request GET:/repos/{owner}/{repo}/pulls/{number}/commits
     * @response `200` `SwaggerTypeCommitsGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    pullsCommitsDetail: (owner: string, repo: string, number: number, params: RequestParams = {}) =>
      this.request<SwaggerTypeCommitsGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/pulls/${number}/commits`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description List pull requests files.
     *
     * @name PullsFilesDetail
     * @request GET:/repos/{owner}/{repo}/pulls/{number}/files
     * @response `200` `SwaggerTypePullsGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    pullsFilesDetail: (owner: string, repo: string, number: number, params: RequestParams = {}) =>
      this.request<SwaggerTypePullsGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/pulls/${number}/files`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get if a pull request has been merged.
     *
     * @name PullsMergeDetail
     * @request GET:/repos/{owner}/{repo}/pulls/{number}/merge
     * @response `204` `void` Pull request has been merged.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     * @response `404` `void` Pull request has not been merged.
     */
    pullsMergeDetail: (owner: string, repo: string, number: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/repos/${owner}/${repo}/pulls/${number}/merge`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Merge a pull request (Merge Button's)
     *
     * @name PullsMergeUpdate
     * @request PUT:/repos/{owner}/{repo}/pulls/{number}/merge
     * @response `200` `SwaggerTypeMergeGeneratedDataContract` Response if merge was successful.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     * @response `405` `SwaggerTypeMergeGeneratedDataContract` Response if merge cannot be performed.
     */
    pullsMergeUpdate: (
      owner: string,
      repo: string,
      number: number,
      body: SwaggerTypeMergePullBodyGeneratedDataContract,
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeMergeGeneratedDataContract, void | SwaggerTypeMergeGeneratedDataContract>({
        path: `/repos/${owner}/${repo}/pulls/${number}/merge`,
        method: "PUT",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get the README. This method returns the preferred README for a repository.
     *
     * @name ReadmeDetail
     * @request GET:/repos/{owner}/{repo}/readme
     * @response `200` `SwaggerTypeContentsPathGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    readmeDetail: (owner: string, repo: string, query?: { ref?: string }, params: RequestParams = {}) =>
      this.request<SwaggerTypeContentsPathGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/readme`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Users with push access to the repository will receive all releases (i.e., published releases and draft releases). Users with pull access will receive published releases only
     *
     * @name ReleasesDetail
     * @request GET:/repos/{owner}/{repo}/releases
     * @response `200` `SwaggerTypeReleasesGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    releasesDetail: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeReleasesGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/releases`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Create a release Users with push access to the repository can create a release.
     *
     * @name ReleasesCreate
     * @request POST:/repos/{owner}/{repo}/releases
     * @response `201` `SwaggerTypeReleaseGeneratedDataContract` Created
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    releasesCreate: (
      owner: string,
      repo: string,
      body: SwaggerTypeReleaseCreateGeneratedDataContract,
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeReleaseGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/releases`,
        method: "POST",
        body: body,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a release asset
     *
     * @name ReleasesAssetsDelete
     * @request DELETE:/repos/{owner}/{repo}/releases/assets/{id}
     * @response `204` `void` No Content
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    releasesAssetsDelete: (owner: string, repo: string, id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/repos/${owner}/${repo}/releases/assets/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Get a single release asset
     *
     * @name ReleasesAssetsDetail
     * @request GET:/repos/{owner}/{repo}/releases/assets/{id}
     * @response `200` `SwaggerTypeAssetGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    releasesAssetsDetail: (owner: string, repo: string, id: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeAssetGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/releases/assets/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Edit a release asset Users with push access to the repository can edit a release asset.
     *
     * @name ReleasesAssetsPartialUpdate
     * @request PATCH:/repos/{owner}/{repo}/releases/assets/{id}
     * @response `200` `SwaggerTypeAssetGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    releasesAssetsPartialUpdate: (
      owner: string,
      repo: string,
      id: string,
      body: SwaggerTypeAssetPatchGeneratedDataContract,
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeAssetGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/releases/assets/${id}`,
        method: "PATCH",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Users with push access to the repository can delete a release.
     *
     * @name ReleasesDelete
     * @request DELETE:/repos/{owner}/{repo}/releases/{id}
     * @response `204` `void` No Content
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    releasesDelete: (owner: string, repo: string, id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/repos/${owner}/${repo}/releases/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Get a single release
     *
     * @name ReleasesDetail2
     * @request GET:/repos/{owner}/{repo}/releases/{id}
     * @originalName releasesDetail
     * @duplicate
     * @response `200` `SwaggerTypeReleaseGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    releasesDetail2: (owner: string, repo: string, id: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeReleaseGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/releases/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Users with push access to the repository can edit a release
     *
     * @name ReleasesPartialUpdate
     * @request PATCH:/repos/{owner}/{repo}/releases/{id}
     * @response `200` `SwaggerTypeReleaseGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    releasesPartialUpdate: (
      owner: string,
      repo: string,
      id: string,
      body: SwaggerTypeReleaseCreateGeneratedDataContract,
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeReleaseGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/releases/${id}`,
        method: "PATCH",
        body: body,
        format: "json",
        ...params,
      }),

    /**
     * @description List assets for a release
     *
     * @name ReleasesAssetsDetail2
     * @request GET:/repos/{owner}/{repo}/releases/{id}/assets
     * @originalName releasesAssetsDetail
     * @duplicate
     * @response `200` `SwaggerTypeAssetsGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    releasesAssetsDetail2: (owner: string, repo: string, id: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeAssetsGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/releases/${id}/assets`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description List Stargazers.
     *
     * @name StargazersDetail
     * @request GET:/repos/{owner}/{repo}/stargazers
     * @response `200` `SwaggerTypeUsersGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    stargazersDetail: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeUsersGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/stargazers`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get the number of additions and deletions per week. Returns a weekly aggregate of the number of additions and deletions pushed to a repository.
     *
     * @name StatsCodeFrequencyDetail
     * @request GET:/repos/{owner}/{repo}/stats/code_frequency
     * @response `200` `SwaggerTypeCodeFrequencyStatsGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    statsCodeFrequencyDetail: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeCodeFrequencyStatsGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/stats/code_frequency`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get the last year of commit activity data. Returns the last year of commit activity grouped by week. The days array is a group of commits per day, starting on Sunday.
     *
     * @name StatsCommitActivityDetail
     * @request GET:/repos/{owner}/{repo}/stats/commit_activity
     * @response `200` `SwaggerTypeCommitActivityStatsGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    statsCommitActivityDetail: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeCommitActivityStatsGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/stats/commit_activity`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get contributors list with additions, deletions, and commit counts.
     *
     * @name StatsContributorsDetail
     * @request GET:/repos/{owner}/{repo}/stats/contributors
     * @response `200` `SwaggerTypeContributorsStatsGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    statsContributorsDetail: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeContributorsStatsGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/stats/contributors`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get the weekly commit count for the repo owner and everyone else.
     *
     * @name StatsParticipationDetail
     * @request GET:/repos/{owner}/{repo}/stats/participation
     * @response `200` `SwaggerTypeParticipationStatsGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    statsParticipationDetail: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeParticipationStatsGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/stats/participation`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get the number of commits per hour in each day. Each array contains the day number, hour number, and number of commits 0-6 Sunday - Saturday 0-23 Hour of day Number of commits For example, [2, 14, 25] indicates that there were 25 total commits, during the 2.00pm hour on Tuesdays. All times are based on the time zone of individual commits.
     *
     * @name StatsPunchCardDetail
     * @request GET:/repos/{owner}/{repo}/stats/punch_card
     * @response `200` `SwaggerTypeCodeFrequencyStatsGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    statsPunchCardDetail: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeCodeFrequencyStatsGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/stats/punch_card`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description List Statuses for a specific Ref.
     *
     * @name StatusesDetail
     * @request GET:/repos/{owner}/{repo}/statuses/{ref}
     * @response `200` `SwaggerTypeRefGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    statusesDetail: (owner: string, repo: string, ref: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeRefGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/statuses/${ref}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Create a Status.
     *
     * @name StatusesCreate
     * @request POST:/repos/{owner}/{repo}/statuses/{ref}
     * @response `201` `SwaggerTypeRefGeneratedDataContract` Created
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    statusesCreate: (
      owner: string,
      repo: string,
      ref: string,
      body: SwaggerTypeHeadBranchGeneratedDataContract,
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeRefGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/statuses/${ref}`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description List watchers.
     *
     * @name SubscribersDetail
     * @request GET:/repos/{owner}/{repo}/subscribers
     * @response `200` `SwaggerTypeUsersGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    subscribersDetail: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeUsersGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/subscribers`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a Repository Subscription.
     *
     * @name SubscriptionDelete
     * @request DELETE:/repos/{owner}/{repo}/subscription
     * @response `204` `void` No content.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    subscriptionDelete: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/repos/${owner}/${repo}/subscription`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Get a Repository Subscription.
     *
     * @name SubscriptionDetail
     * @request GET:/repos/{owner}/{repo}/subscription
     * @response `200` `SwaggerTypeSubscriptionGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    subscriptionDetail: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeSubscriptionGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/subscription`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Set a Repository Subscription
     *
     * @name SubscriptionUpdate
     * @request PUT:/repos/{owner}/{repo}/subscription
     * @response `200` `SwaggerTypeSubscriptionGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    subscriptionUpdate: (
      owner: string,
      repo: string,
      body: SwaggerTypeSubscriptionBodyGeneratedDataContract,
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeSubscriptionGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/subscription`,
        method: "PUT",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get list of tags.
     *
     * @name TagsDetail
     * @request GET:/repos/{owner}/{repo}/tags
     * @response `200` `SwaggerTypeTagsGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    tagsDetail: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeTagsGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/tags`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get list of teams
     *
     * @name TeamsDetail
     * @request GET:/repos/{owner}/{repo}/teams
     * @response `200` `SwaggerTypeTeamsGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    teamsDetail: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeTeamsGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/teams`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description List Stargazers. New implementation.
     *
     * @name WatchersDetail
     * @request GET:/repos/{owner}/{repo}/watchers
     * @response `200` `SwaggerTypeUsersGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    watchersDetail: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeUsersGeneratedDataContract, void>({
        path: `/repos/${owner}/${repo}/watchers`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get archive link. This method will return a 302 to a URL to download a tarball or zipball archive for a repository. Please make sure your HTTP framework is configured to follow redirects or you will need to use the Location header to make a second GET request. Note: For private repositories, these links are temporary and expire quickly.
     *
     * @name ReposDetail2
     * @request GET:/repos/{owner}/{repo}/{archive_format}/{path}
     * @originalName reposDetail
     * @duplicate
     * @response `302` `void` Found.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    reposDetail2: (
      owner: string,
      repo: string,
      archiveFormat: "tarball" | "zipball",
      path: string,
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/repos/${owner}/${repo}/${archiveFormat}/${path}`,
        method: "GET",
        ...params,
      }),
  };
  repositories = {
    /**
     * @description List all public repositories. This provides a dump of every public repository, in the order that they were created. Note: Pagination is powered exclusively by the since parameter. is the Link header to get the URL for the next page of repositories.
     *
     * @name RepositoriesList
     * @request GET:/repositories
     * @response `200` `SwaggerTypeReposGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    repositoriesList: (query?: { since?: string }, params: RequestParams = {}) =>
      this.request<SwaggerTypeReposGeneratedDataContract, void>({
        path: `/repositories`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  search = {
    /**
     * @description Search code.
     *
     * @name CodeList
     * @request GET:/search/code
     * @response `200` `SwaggerTypeSearchCodeGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    codeList: (query: { order?: "desc" | "asc"; q: string; sort?: "indexed" }, params: RequestParams = {}) =>
      this.request<SwaggerTypeSearchCodeGeneratedDataContract, void>({
        path: `/search/code`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Find issues by state and keyword. (This method returns up to 100 results per page.)
     *
     * @name IssuesList
     * @request GET:/search/issues
     * @response `200` `SwaggerTypeSearchIssuesGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    issuesList: (
      query: { order?: "desc" | "asc"; q: string; sort?: "updated" | "created" | "comments" },
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeSearchIssuesGeneratedDataContract, void>({
        path: `/search/issues`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Search repositories.
     *
     * @name RepositoriesList
     * @request GET:/search/repositories
     * @response `200` `SwaggerTypeSearchRepositoriesGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    repositoriesList: (
      query: { order?: "desc" | "asc"; q: string; sort?: "stars" | "forks" | "updated" },
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeSearchRepositoriesGeneratedDataContract, void>({
        path: `/search/repositories`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Search users.
     *
     * @name UsersList
     * @request GET:/search/users
     * @response `200` `SwaggerTypeSearchUsersGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    usersList: (
      query: { order?: "desc" | "asc"; q: string; sort?: "followers" | "repositories" | "joined" },
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeSearchUsersGeneratedDataContract, void>({
        path: `/search/users`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  teams = {
    /**
     * @description Delete team. In order to delete a team, the authenticated user must be an owner of the org that the team is associated with.
     *
     * @name TeamsDelete
     * @request DELETE:/teams/{teamId}
     * @response `204` `void` No content.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    teamsDelete: (teamId: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/teams/${teamId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Get team.
     *
     * @name TeamsDetail
     * @request GET:/teams/{teamId}
     * @response `200` `SwaggerTypeTeamGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    teamsDetail: (teamId: number, params: RequestParams = {}) =>
      this.request<SwaggerTypeTeamGeneratedDataContract, void>({
        path: `/teams/${teamId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Edit team. In order to edit a team, the authenticated user must be an owner of the org that the team is associated with.
     *
     * @name TeamsPartialUpdate
     * @request PATCH:/teams/{teamId}
     * @response `200` `SwaggerTypeTeamGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    teamsPartialUpdate: (teamId: number, body: SwaggerTypeEditTeamGeneratedDataContract, params: RequestParams = {}) =>
      this.request<SwaggerTypeTeamGeneratedDataContract, void>({
        path: `/teams/${teamId}`,
        method: "PATCH",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description List team members. In order to list members in a team, the authenticated user must be a member of the team.
     *
     * @name MembersDetail
     * @request GET:/teams/{teamId}/members
     * @response `200` `SwaggerTypeUsersGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    membersDetail: (teamId: number, params: RequestParams = {}) =>
      this.request<SwaggerTypeUsersGeneratedDataContract, void>({
        path: `/teams/${teamId}/members`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description The "Remove team member" API is deprecated and is scheduled for removal in the next major version of the API. We recommend using the Remove team membership API instead. It allows you to remove both active and pending memberships. Remove team member. In order to remove a user from a team, the authenticated user must have 'admin' permissions to the team or be an owner of the org that the team is associated with. NOTE This does not delete the user, it just remove them from the team.
     *
     * @name MembersDelete
     * @request DELETE:/teams/{teamId}/members/{username}
     * @deprecated
     * @response `204` `void` Team member removed.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    membersDelete: (teamId: number, username: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/teams/${teamId}/members/${username}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description The "Get team member" API is deprecated and is scheduled for removal in the next major version of the API. We recommend using the Get team membership API instead. It allows you to get both active and pending memberships. Get team member. In order to get if a user is a member of a team, the authenticated user mus be a member of the team.
     *
     * @name MembersDetail2
     * @request GET:/teams/{teamId}/members/{username}
     * @deprecated
     * @originalName membersDetail
     * @duplicate
     * @response `204` `void` User is a member.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     * @response `404` `void` User is not a member.
     */
    membersDetail2: (teamId: number, username: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/teams/${teamId}/members/${username}`,
        method: "GET",
        ...params,
      }),

    /**
     * @description The API (described below) is deprecated and is scheduled for removal in the next major version of the API. We recommend using the Add team membership API instead. It allows you to invite new organization members to your teams. Add team member. In order to add a user to a team, the authenticated user must have 'admin' permissions to the team or be an owner of the org that the team is associated with.
     *
     * @name MembersUpdate
     * @request PUT:/teams/{teamId}/members/{username}
     * @deprecated
     * @response `204` `void` Team member added.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     * @response `422` `SwaggerTypeOrganizationAsTeamMemberGeneratedDataContract` If you attempt to add an organization to a team, you will get this.
     */
    membersUpdate: (teamId: number, username: string, params: RequestParams = {}) =>
      this.request<void, void | SwaggerTypeOrganizationAsTeamMemberGeneratedDataContract>({
        path: `/teams/${teamId}/members/${username}`,
        method: "PUT",
        ...params,
      }),

    /**
     * @description Remove team membership. In order to remove a membership between a user and a team, the authenticated user must have 'admin' permissions to the team or be an owner of the organization that the team is associated with. NOTE: This does not delete the user, it just removes their membership from the team.
     *
     * @name MembershipsDelete
     * @request DELETE:/teams/{teamId}/memberships/{username}
     * @response `204` `void` Team member removed.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    membershipsDelete: (teamId: number, username: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/teams/${teamId}/memberships/${username}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Get team membership. In order to get a user's membership with a team, the authenticated user must be a member of the team or an owner of the team's organization.
     *
     * @name MembershipsDetail
     * @request GET:/teams/{teamId}/memberships/{username}
     * @response `200` `SwaggerTypeTeamMembershipGeneratedDataContract` User is a member.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     * @response `404` `void` User has no membership with team
     */
    membershipsDetail: (teamId: number, username: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeTeamMembershipGeneratedDataContract, void>({
        path: `/teams/${teamId}/memberships/${username}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Add team membership. In order to add a membership between a user and a team, the authenticated user must have 'admin' permissions to the team or be an owner of the organization that the team is associated with. If the user is already a part of the team's organization (meaning they're on at least one other team in the organization), this endpoint will add the user to the team. If the user is completely unaffiliated with the team's organization (meaning they're on none of the organization's teams), this endpoint will send an invitation to the user via email. This newly-created membership will be in the 'pending' state until the user accepts the invitation, at which point the membership will transition to the 'active' state and the user will be added as a member of the team.
     *
     * @name MembershipsUpdate
     * @request PUT:/teams/{teamId}/memberships/{username}
     * @response `200` `SwaggerTypeTeamMembershipGeneratedDataContract` Team member added.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     * @response `422` `SwaggerTypeOrganizationAsTeamMemberGeneratedDataContract` If you attempt to add an organization to a team, you will get this.
     */
    membershipsUpdate: (teamId: number, username: string, params: RequestParams = {}) =>
      this.request<
        SwaggerTypeTeamMembershipGeneratedDataContract,
        void | SwaggerTypeOrganizationAsTeamMemberGeneratedDataContract
      >({
        path: `/teams/${teamId}/memberships/${username}`,
        method: "PUT",
        format: "json",
        ...params,
      }),

    /**
     * @description List team repos
     *
     * @name ReposDetail
     * @request GET:/teams/{teamId}/repos
     * @response `200` `SwaggerTypeTeamReposGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    reposDetail: (teamId: number, params: RequestParams = {}) =>
      this.request<SwaggerTypeTeamReposGeneratedDataContract, void>({
        path: `/teams/${teamId}/repos`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description In order to remove a repository from a team, the authenticated user must be an owner of the org that the team is associated with. NOTE: This does not delete the repository, it just removes it from the team.
     *
     * @name ReposDelete
     * @request DELETE:/teams/{teamId}/repos/{owner}/{repo}
     * @response `204` `void` No content.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    reposDelete: (teamId: number, owner: string, repo: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/teams/${teamId}/repos/${owner}/${repo}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Check if a team manages a repository
     *
     * @name ReposDetail2
     * @request GET:/teams/{teamId}/repos/{owner}/{repo}
     * @originalName reposDetail
     * @duplicate
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    reposDetail2: (teamId: number, owner: string, repo: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/teams/${teamId}/repos/${owner}/${repo}`,
        method: "GET",
        ...params,
      }),

    /**
     * @description In order to add a repository to a team, the authenticated user must be an owner of the org that the team is associated with. Also, the repository must be owned by the organization, or a direct fork of a repository owned by the organization.
     *
     * @name ReposUpdate
     * @request PUT:/teams/{teamId}/repos/{owner}/{repo}
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    reposUpdate: (teamId: number, owner: string, repo: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/teams/${teamId}/repos/${owner}/${repo}`,
        method: "PUT",
        ...params,
      }),
  };
  user = {
    /**
     * @description Get the authenticated user.
     *
     * @name UserList
     * @request GET:/user
     * @response `200` `SwaggerTypeUserGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    userList: (params: RequestParams = {}) =>
      this.request<SwaggerTypeUserGeneratedDataContract, void>({
        path: `/user`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Update the authenticated user.
     *
     * @name UserPartialUpdate
     * @request PATCH:/user
     * @response `200` `SwaggerTypeUserGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    userPartialUpdate: (body: SwaggerTypeUserUpdateGeneratedDataContract, params: RequestParams = {}) =>
      this.request<SwaggerTypeUserGeneratedDataContract, void>({
        path: `/user`,
        method: "PATCH",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete email address(es). You can include a single email address or an array of addresses.
     *
     * @name EmailsDelete
     * @request DELETE:/user/emails
     * @response `204` `void` No content.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    emailsDelete: (body: SwaggerTypeUserEmailsGeneratedDataContract, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/user/emails`,
        method: "DELETE",
        body: body,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description List email addresses for a user. In the final version of the API, this method will return an array of hashes with extended information for each email address indicating if the address has been verified and if it's primary email address for GitHub. Until API v3 is finalized, use the application/vnd.github.v3 media type to get other response format.
     *
     * @name EmailsList
     * @request GET:/user/emails
     * @response `200` `SwaggerTypeUserEmailsGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    emailsList: (params: RequestParams = {}) =>
      this.request<SwaggerTypeUserEmailsGeneratedDataContract, void>({
        path: `/user/emails`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Add email address(es). You can post a single email address or an array of addresses.
     *
     * @name EmailsCreate
     * @request POST:/user/emails
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    emailsCreate: (body: SwaggerTypeEmailsPostGeneratedDataContract, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/user/emails`,
        method: "POST",
        body: body,
        ...params,
      }),

    /**
     * @description List the authenticated user's followers
     *
     * @name FollowersList
     * @request GET:/user/followers
     * @response `200` `SwaggerTypeUsersGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    followersList: (params: RequestParams = {}) =>
      this.request<SwaggerTypeUsersGeneratedDataContract, void>({
        path: `/user/followers`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description List who the authenticated user is following.
     *
     * @name FollowingList
     * @request GET:/user/following
     * @response `200` `SwaggerTypeUsersGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    followingList: (params: RequestParams = {}) =>
      this.request<SwaggerTypeUsersGeneratedDataContract, void>({
        path: `/user/following`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Unfollow a user. Unfollowing a user requires the user to be logged in and authenticated with basic auth or OAuth with the user:follow scope.
     *
     * @name FollowingDelete
     * @request DELETE:/user/following/{username}
     * @response `204` `void` User unfollowed.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    followingDelete: (username: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/user/following/${username}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Check if you are following a user.
     *
     * @name FollowingDetail
     * @request GET:/user/following/{username}
     * @response `204` `void` Response if you are following this user.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     * @response `404` `void` Response if you are not following this user.
     */
    followingDetail: (username: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/user/following/${username}`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Follow a user. Following a user requires the user to be logged in and authenticated with basic auth or OAuth with the user:follow scope.
     *
     * @name FollowingUpdate
     * @request PUT:/user/following/{username}
     * @response `204` `void` You are now following the user.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    followingUpdate: (username: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/user/following/${username}`,
        method: "PUT",
        ...params,
      }),

    /**
     * @description List issues. List all issues across owned and member repositories for the authenticated user.
     *
     * @name IssuesList
     * @request GET:/user/issues
     * @response `200` `SwaggerTypeIssuesGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    issuesList: (
      query: {
        filter: "assigned" | "created" | "mentioned" | "subscribed" | "all";
        state: "open" | "closed";
        labels: string;
        sort: "created" | "updated" | "comments";
        direction: "asc" | "desc";
        since?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeIssuesGeneratedDataContract, void>({
        path: `/user/issues`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description List your public keys. Lists the current user's keys. Management of public keys via the API requires that you are authenticated through basic auth, or OAuth with the 'user', 'write:public_key' scopes.
     *
     * @name KeysList
     * @request GET:/user/keys
     * @response `200` `SwaggerTypeGitignoreGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    keysList: (params: RequestParams = {}) =>
      this.request<SwaggerTypeGitignoreGeneratedDataContract, void>({
        path: `/user/keys`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Create a public key.
     *
     * @name KeysCreate
     * @request POST:/user/keys
     * @response `201` `SwaggerTypeUserKeysKeyIdGeneratedDataContract` Created
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    keysCreate: (body: SwaggerTypeUserKeysPostGeneratedDataContract, params: RequestParams = {}) =>
      this.request<SwaggerTypeUserKeysKeyIdGeneratedDataContract, void>({
        path: `/user/keys`,
        method: "POST",
        body: body,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a public key. Removes a public key. Requires that you are authenticated via Basic Auth or via OAuth with at least admin:public_key scope.
     *
     * @name KeysDelete
     * @request DELETE:/user/keys/{keyId}
     * @response `204` `void` No content.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    keysDelete: (keyId: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/user/keys/${keyId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Get a single public key.
     *
     * @name KeysDetail
     * @request GET:/user/keys/{keyId}
     * @response `200` `SwaggerTypeUserKeysKeyIdGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    keysDetail: (keyId: number, params: RequestParams = {}) =>
      this.request<SwaggerTypeUserKeysKeyIdGeneratedDataContract, void>({
        path: `/user/keys/${keyId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description List public and private organizations for the authenticated user.
     *
     * @name OrgsList
     * @request GET:/user/orgs
     * @response `200` `SwaggerTypeGitignoreGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    orgsList: (params: RequestParams = {}) =>
      this.request<SwaggerTypeGitignoreGeneratedDataContract, void>({
        path: `/user/orgs`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description List repositories for the authenticated user. Note that this does not include repositories owned by organizations which the user can access. You can lis user organizations and list organization repositories separately.
     *
     * @name ReposList
     * @request GET:/user/repos
     * @response `200` `SwaggerTypeReposGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    reposList: (
      query?: { type?: "all" | "public" | "private" | "forks" | "sources" | "member" },
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeReposGeneratedDataContract, void>({
        path: `/user/repos`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new repository for the authenticated user. OAuth users must supply repo scope.
     *
     * @name ReposCreate
     * @request POST:/user/repos
     * @response `201` `SwaggerTypeReposGeneratedDataContract` Created
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    reposCreate: (body: SwaggerTypePostRepoGeneratedDataContract, params: RequestParams = {}) =>
      this.request<SwaggerTypeReposGeneratedDataContract, void>({
        path: `/user/repos`,
        method: "POST",
        body: body,
        format: "json",
        ...params,
      }),

    /**
     * @description List repositories being starred by the authenticated user.
     *
     * @name StarredList
     * @request GET:/user/starred
     * @response `200` `SwaggerTypeGitignoreGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    starredList: (query?: { direction?: string; sort?: "created" | "updated" }, params: RequestParams = {}) =>
      this.request<SwaggerTypeGitignoreGeneratedDataContract, void>({
        path: `/user/starred`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Unstar a repository
     *
     * @name StarredDelete
     * @request DELETE:/user/starred/{owner}/{repo}
     * @response `204` `void` Unstarred.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    starredDelete: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/user/starred/${owner}/${repo}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Check if you are starring a repository.
     *
     * @name StarredDetail
     * @request GET:/user/starred/{owner}/{repo}
     * @response `204` `void` This repository is starred by you.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     * @response `404` `void` This repository is not starred by you.
     */
    starredDetail: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/user/starred/${owner}/${repo}`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Star a repository.
     *
     * @name StarredUpdate
     * @request PUT:/user/starred/{owner}/{repo}
     * @response `204` `void` Repository starred.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    starredUpdate: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/user/starred/${owner}/${repo}`,
        method: "PUT",
        ...params,
      }),

    /**
     * @description List repositories being watched by the authenticated user.
     *
     * @name SubscriptionsList
     * @request GET:/user/subscriptions
     * @response `200` `SwaggerTypeReposGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    subscriptionsList: (params: RequestParams = {}) =>
      this.request<SwaggerTypeReposGeneratedDataContract, void>({
        path: `/user/subscriptions`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Stop watching a repository
     *
     * @name SubscriptionsDelete
     * @request DELETE:/user/subscriptions/{owner}/{repo}
     * @deprecated
     * @response `204` `void` Unwatched.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    subscriptionsDelete: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/user/subscriptions/${owner}/${repo}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Check if you are watching a repository.
     *
     * @name SubscriptionsDetail
     * @request GET:/user/subscriptions/{owner}/{repo}
     * @deprecated
     * @response `204` `void` Repository is watched by you.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     * @response `404` `void` Repository is not watched by you.
     */
    subscriptionsDetail: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/user/subscriptions/${owner}/${repo}`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Watch a repository.
     *
     * @name SubscriptionsUpdate
     * @request PUT:/user/subscriptions/{owner}/{repo}
     * @deprecated
     * @response `204` `void` Repository is watched.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    subscriptionsUpdate: (owner: string, repo: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/user/subscriptions/${owner}/${repo}`,
        method: "PUT",
        ...params,
      }),

    /**
     * @description List all of the teams across all of the organizations to which the authenticated user belongs. This method requires user or repo scope when authenticating via OAuth.
     *
     * @name TeamsList
     * @request GET:/user/teams
     * @response `200` `SwaggerTypeTeamsListGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    teamsList: (params: RequestParams = {}) =>
      this.request<SwaggerTypeTeamsListGeneratedDataContract, void>({
        path: `/user/teams`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  users = {
    /**
     * @description Get all users. This provides a dump of every user, in the order that they signed up for GitHub. Note: Pagination is powered exclusively by the since parameter. Use the Link header to get the URL for the next page of users.
     *
     * @name UsersList
     * @request GET:/users
     * @response `200` `SwaggerTypeUsersGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    usersList: (query?: { since?: number }, params: RequestParams = {}) =>
      this.request<SwaggerTypeUsersGeneratedDataContract, void>({
        path: `/users`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a single user.
     *
     * @name UsersDetail
     * @request GET:/users/{username}
     * @response `200` `SwaggerTypeUserGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    usersDetail: (username: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeUserGeneratedDataContract, void>({
        path: `/users/${username}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description If you are authenticated as the given user, you will see your private events. Otherwise, you'll only see public events.
     *
     * @name EventsDetail
     * @request GET:/users/{username}/events
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    eventsDetail: (username: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/users/${username}/events`,
        method: "GET",
        ...params,
      }),

    /**
     * @description This is the user's organization dashboard. You must be authenticated as the user to view this.
     *
     * @name EventsOrgsDetail
     * @request GET:/users/{username}/events/orgs/{org}
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    eventsOrgsDetail: (username: string, org: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/users/${username}/events/orgs/${org}`,
        method: "GET",
        ...params,
      }),

    /**
     * @description List a user's followers
     *
     * @name FollowersDetail
     * @request GET:/users/{username}/followers
     * @response `200` `SwaggerTypeUsersGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    followersDetail: (username: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeUsersGeneratedDataContract, void>({
        path: `/users/${username}/followers`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Check if one user follows another.
     *
     * @name FollowingDetail
     * @request GET:/users/{username}/following/{targetUser}
     * @response `204` `void` Response if user follows target user.
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     * @response `404` `void` Response if user does not follow target user.
     */
    followingDetail: (username: string, targetUser: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/users/${username}/following/${targetUser}`,
        method: "GET",
        ...params,
      }),

    /**
     * @description List a users gists.
     *
     * @name GistsDetail
     * @request GET:/users/{username}/gists
     * @response `200` `SwaggerTypeGistsGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    gistsDetail: (username: string, query?: { since?: string }, params: RequestParams = {}) =>
      this.request<SwaggerTypeGistsGeneratedDataContract, void>({
        path: `/users/${username}/gists`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description List public keys for a user. Lists the verified public keys for a user. This is accessible by anyone.
     *
     * @name KeysDetail
     * @request GET:/users/{username}/keys
     * @response `200` `SwaggerTypeGitignoreGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    keysDetail: (username: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeGitignoreGeneratedDataContract, void>({
        path: `/users/${username}/keys`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description List all public organizations for a user.
     *
     * @name OrgsDetail
     * @request GET:/users/{username}/orgs
     * @response `200` `SwaggerTypeGitignoreGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    orgsDetail: (username: string, params: RequestParams = {}) =>
      this.request<SwaggerTypeGitignoreGeneratedDataContract, void>({
        path: `/users/${username}/orgs`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description These are events that you'll only see public events.
     *
     * @name ReceivedEventsDetail
     * @request GET:/users/{username}/received_events
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    receivedEventsDetail: (username: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/users/${username}/received_events`,
        method: "GET",
        ...params,
      }),

    /**
     * @description List public events that a user has received
     *
     * @name ReceivedEventsPublicDetail
     * @request GET:/users/{username}/received_events/public
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    receivedEventsPublicDetail: (username: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/users/${username}/received_events/public`,
        method: "GET",
        ...params,
      }),

    /**
     * @description List public repositories for the specified user.
     *
     * @name ReposDetail
     * @request GET:/users/{username}/repos
     * @response `200` `SwaggerTypeReposGeneratedDataContract` OK
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    reposDetail: (
      username: string,
      query?: { type?: "all" | "public" | "private" | "forks" | "sources" | "member" },
      params: RequestParams = {},
    ) =>
      this.request<SwaggerTypeReposGeneratedDataContract, void>({
        path: `/users/${username}/repos`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description List repositories being starred by a user.
     *
     * @name StarredDetail
     * @request GET:/users/{username}/starred
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    starredDetail: (username: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/users/${username}/starred`,
        method: "GET",
        ...params,
      }),

    /**
     * @description List repositories being watched by a user.
     *
     * @name SubscriptionsDetail
     * @request GET:/users/{username}/subscriptions
     * @response `403` `void` API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.
     */
    subscriptionsDetail: (username: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/users/${username}/subscriptions`,
        method: "GET",
        ...params,
      }),
  };
}
