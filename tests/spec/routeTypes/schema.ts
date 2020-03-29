/* tslint:disable */
/* eslint-disable */

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
export interface actor {
  avatar_url?: string;
  bio?: string;

  /**
   * The website URL from the profile page
   */
  blog?: string;
  collaborators?: number;
  company?: string;

  /**
   * ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ
   */
  created_at?: string;
  disk_usage?: number;

  /**
   * Note: The returned email is the user’s publicly visible email address (or null if the user has not specified a public email address in their profile).
   */
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

  /**
   * The account username
   */
  login?: string;

  /**
   * The full account name
   */
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

  /**
   * ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ
   */
  updated_at?: string;
  url?: string;
}

export interface asset {
  content_type?: string;
  created_at?: string;
  download_count?: number;
  id?: number;
  label?: string;
  name?: string;
  size?: number;
  state?: string;
  updated_at?: string;
  uploader?: user;
  url?: string;
}

export interface assetPatch {
  label?: string;
  name: string;
}

export type assets = asset[];

export type assignees = user[];

export interface blob {
  content?: string;
  encoding?: "utf-8" | "base64";
  sha?: string;
  size?: number;
}

export interface blobs {
  sha?: string;
}

export interface branch {
  _links?: { html?: string; self?: string };
  commit?: {
    author?: user;
    commit?: {
      author?: { date?: string; email?: string; name?: string };
      committer?: { date?: string; email?: string; name?: string };
      message?: string;
      tree?: { sha?: string; url?: string };
      url?: string;
    };
    committer?: user;
    parents?: Array<{ sha?: string; url?: string }>;
    sha?: string;
    url?: string;
  };
  name?: string;
}

export type branches = Array<{ commit?: { sha?: string; url?: string }; name?: string }>;

export type codeFrequencyStats = number[];

export interface comment {
  body?: string;
}

export interface commentBody {
  body: string;
}

export type comments = Array<{ body?: string; created_at?: string; id?: number; url?: string; user?: user }>;

export interface commit {
  author?: user;
  commit?: {
    author?: { date?: string; email?: string; name?: string };
    committer?: { date?: string; email?: string; name?: string };
    message?: string;
    tree?: { sha?: string; url?: string };
    url?: string;
  };
  committer?: user;
  files?: Array<{
    additions?: number;
    blob_url?: string;
    changes?: number;
    deletions?: number;
    filename?: string;
    patch?: string;
    raw_url?: string;
    status?: string;
  }>;
  parents?: Array<{ sha?: string; url?: string }>;
  sha?: string;
  stats?: { additions?: number; deletions?: number; total?: number };
  url?: string;
}

export type commitActivityStats = Array<{ days?: number[]; total?: number; week?: number }>;

export interface commitComment {
  body?: string;
  commit_id?: string;

  /**
   * ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ
   */
  created_at?: string;
  html_url?: string;
  id?: number;
  line?: number;
  path?: string;
  position?: number;

  /**
   * ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ
   */
  updated_at?: string;
  url?: string;
  user?: user;
}

export interface commitCommentBody {
  body: string;

  /**
   * Deprecated - Use position parameter instead.
   */
  line?: string;

  /**
   * Line number in the file to comment on. Defaults to null.
   */
  number?: string;

  /**
   * Relative path of the file to comment on.
   */
  path?: string;

  /**
   * Line index in the diff to comment on.
   */
  position?: number;

  /**
   * SHA of the commit to comment on.
   */
  sha: string;
}

export type commits = Array<{
  author?: user;
  commit?: {
    author?: { date?: string; email?: string; name?: string };
    committer?: { date?: string; email?: string; name?: string };
    message?: string;
    tree?: { sha?: string; url?: string };
    url?: string;
  };
  committer?: user;
  parents?: Array<{ sha?: string; url?: string }>;
  sha?: string;
  url?: string;
}>;

export interface CompareCommits {
  ahead_by?: number;
  base_commit?: {
    author?: user;
    commit?: {
      author?: { date?: string; email?: string; name?: string };
      committer?: { date?: string; email?: string; name?: string };
      message?: string;
      tree?: { sha?: string; url?: string };
      url?: string;
    };
    committer?: user;
    parents?: Array<{ sha?: string; url?: string }>;
    sha?: string;
    url?: string;
  };
  behind_by?: number;
  commits?: Array<{
    author?: user;
    commit?: {
      author?: { date?: string; email?: string; name?: string };
      committer?: { date?: string; email?: string; name?: string };
      message?: string;
      tree?: { sha?: string; url?: string };
      url?: string;
    };
    committer?: user;
    parents?: Array<{ sha?: string; url?: string }>;
    sha?: string;
    url?: string;
  }>;
  diff_url?: string;
  files?: Array<{
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
  }>;
  html_url?: string;
  patch_url?: string;
  permalink_url?: string;
  status?: string;
  total_commits?: number;
  url?: string;
}

export interface ContentsPath {
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

export type contributorsStats = Array<{
  author?: { avatar_url?: string; gravatar_id?: string; id?: number; login?: string; url?: string };
  total?: number;
  weeks?: Array<{ a?: number; c?: number; d?: number; w?: string }>;
}>;

export interface createFile {
  commit?: {
    author?: { date?: string; email?: string; name?: string };
    committer?: { date?: string; email?: string; name?: string };
    html_url?: string;
    message?: string;
    parents?: Array<{ html_url?: string; sha?: string; url?: string }>;
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

export interface createFileBody {
  committer?: { email?: string; name?: string };
  content?: string;
  message?: string;
}

export interface deleteFile {
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

export interface deleteFileBody {
  committer?: { email?: string; name?: string };
  message?: string;
  sha?: string;
}

export interface deployment {
  description?: string;
  payload?: { deploy_user?: string; environment?: string; room_id?: number };
  ref?: string;
}

export interface DeploymentResp {
  created_at?: string;
  creator?: user;
  description?: string;
  id?: number;
  payload?: string;
  sha?: string;
  statuses_url?: string;
  updated_at?: string;
  url?: string;
}

export type DeploymentStatuses = Array<{
  created_at?: string;
  creator?: user;
  description?: string;
  id?: number;
  payload?: string;
  state?: string;
  target_url?: string;
  updated_at?: string;
  url?: string;
}>;

export interface DeploymentStatusesCreate {
  description?: string;
  state?: string;
  target_url?: string;
}

export interface download {
  content_type?: string;
  description?: string;
  download_count?: number;
  html_url?: string;
  id?: number;
  name?: string;
  size?: number;
  url?: string;
}

export type downloads = download[];

export interface editTeam {
  name: string;
  permission?: "pull" | "push" | "admin";
}

export type emailsPost = string[];

export type emojis = Record<string, string>;

export interface event {
  actor?: actor;
  created_at?: object;
  id?: number;
  org?: organization;
  payload?: object;
  public?: boolean;
  repo?: { id?: number; name?: string; url?: string };
  type?: string;
}

export type events = event[];

export interface feeds {
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

export interface forkBody {
  organization?: string;
}

export type forks = repos;

export interface gist {
  comments?: number;
  comments_url?: string;

  /**
   * Timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.
   */
  created_at?: string;
  description?: string;
  files?: { "ring.erl"?: { filename?: string; raw_url?: string; size?: number } };
  forks?: Array<{ created_at?: string; url?: string; user?: user }>;
  git_pull_url?: string;
  git_push_url?: string;
  history?: Array<{
    change_status?: { additions?: number; deletions?: number; total?: number };
    committed_at?: string;
    url?: string;
    user?: user;
    version?: string;
  }>;
  html_url?: string;
  id?: string;
  public?: boolean;
  url?: string;
  user?: user;
}

export type gists = Array<{
  comments?: number;
  comments_url?: string;
  created_at?: string;
  description?: string;
  files?: { ring_erl?: { filename?: string; raw_url?: string; size?: number } };
  git_pull_url?: string;
  git_push_url?: string;
  html_url?: string;
  id?: string;
  public?: boolean;
  url?: string;
  user?: user;
}>;

export interface gitCommit {
  author?: { date?: string; email?: string; name?: string };
  message?: string;
  parents?: string;
  tree?: string;
}

export interface gitRefPatch {
  force?: boolean;
  sha?: string;
}

export type gitignore = any[];

export interface GitignoreLang {
  name?: string;
  source?: string;
}

export interface headBranch {
  object?: { sha?: string; type?: string; url?: string };
  ref?: string;
  url?: string;
}

export type hook = Array<{
  active?: boolean;
  config?: { content_type?: string; url?: string };
  created_at?: string;
  events?: Array<
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
  >;
  id?: number;
  name?: string;
  updated_at?: string;
  url?: string;
}>;

export interface hookBody {
  active?: boolean;
  add_events?: string[];
}

export interface issue {
  assignee?: string;
  body?: string;
  labels?: string[];
  milestone?: number;
  title?: string;
}

export interface issueEvent {
  actor?: actor;
  commit_id?: string;

  /**
   * ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ
   */
  created_at?: string;
  event?: string;
  issue?: {
    assignee?: user;
    body?: string;
    closed_at?: string;
    comments?: number;
    created_at?: string;
    html_url?: string;
    labels?: Array<{ color?: string; name?: string; url?: string }>;
    milestone?: {
      closed_issues?: number;
      created_at?: string;
      creator?: user;
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
    user?: user;
  };
  url?: string;
}

export type issueEvents = issueEvent[];

export type issues = Array<{
  assignee?: user;
  body?: string;
  closed_at?: string;
  comments?: number;
  created_at?: string;
  html_url?: string;
  labels?: Array<{ color?: string; name?: string; url?: string }>;
  milestone?: {
    closed_issues?: number;
    created_at?: string;
    creator?: user;
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
  user?: user;
}>;

export interface issuesComment {
  body?: string;

  /**
   * ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ
   */
  created_at?: string;
  html_url?: string;
  id?: number;

  /**
   * ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ
   */
  updated_at?: string;
  url?: string;
  user?: user;
}

export type issuesComments = Array<{
  _links?: { html?: { href?: string }; pull_request?: { href?: string }; self?: { href?: string } };
  body?: string;
  commit_id?: string;
  created_at?: string;
  id?: number;
  path?: string;
  position?: number;
  updated_at?: string;
  url?: string;
  user?: user;
}>;

export type keys = Array<{ id?: number; key?: string; title?: string; url?: string }>;

export interface label {
  color?: string;
  name?: string;
  url?: string;
}

export type labels = Array<{ color?: string; name?: string; url?: string }>;

export type languages = Record<string, number>;

export interface markdown {
  context?: string;
  mode?: string;
  text?: string;
}

export interface merge {
  merged?: boolean;
  message?: string;
  sha?: string;
}

export interface mergePullBody {
  commit_message?: string;
}

export interface mergesBody {
  base?: string;
  commit_message?: string;
  head?: string;
}

export interface mergesConflict {
  /**
   * Error message
   */
  message?: string;
}

export interface mergesSuccessful {
  author?: user;
  comments_url?: string;
  commit?: {
    author?: { date?: string; email?: string; name?: string };
    comment_count?: number;
    committer?: { date?: string; email?: string; name?: string };
    message?: string;
    tree?: { sha?: string; url?: string };
    url?: string;
  };
  committer?: user;
  merged?: boolean;
  message?: string;
  parents?: Array<{ sha?: string; url?: string }>;
  sha?: string;
  url?: string;
}

export interface meta {
  git?: string[];
  hooks?: string[];
}

export interface milestone {
  closed_issues?: number;

  /**
   * ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ
   */
  created_at?: string;
  creator?: user;
  description?: string;

  /**
   * ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ
   */
  due_on?: string;
  number?: number;
  open_issues?: number;
  state?: "open" | "closed";
  title?: string;
  url?: string;
}

export interface milestoneUpdate {
  description?: string;
  due_on?: string;
  state?: string;
  title?: string;
}

export interface notificationMarkRead {
  last_read_at?: string;
}

export interface notifications {
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
    owner?: actor;
    private?: boolean;
    url?: string;
  };
  subject?: { latest_comment_url?: string; title?: string; type?: string; url?: string };
  unread?: boolean;
  updated_at?: string;
  url?: string;
}

export interface orgTeamsPost {
  name: string;
  permission?: "pull" | "push" | "admin";
  repo_names?: string[];
}

export type organization = actor & any;

export interface organizationAsTeamMember {
  errors?: Array<{ code?: string; field?: string; resource?: string }>;
  message?: string;
}

export interface participationStats {
  all?: number[];
  owner?: number[];
}

export interface patchGist {
  description?: string;
  files?: {
    "delete_this_file.txt"?: string;
    "file1.txt"?: { content?: string };
    "new_file.txt"?: { content?: string };
    "old_name.txt"?: { content?: string; filename?: string };
  };
}

export interface patchOrg {
  /**
   * Billing email address. This address is not publicized.
   */
  billing_email?: string;
  company?: string;

  /**
   * Publicly visible email address.
   */
  email?: string;
  location?: string;
  name?: string;
}

export interface postGist {
  description?: string;
  files?: { "file1.txt"?: { content?: string } };
  public?: boolean;
}

export interface postRepo {
  /**
   * True to create an initial commit with empty README. Default is false.
   */
  auto_init?: boolean;
  description?: string;

  /**
   * Desired language or platform .gitignore template to apply. Use the name of the template without the extension. For example, "Haskell" Ignored if auto_init parameter is not provided.
   */
  gitignore_template?: string;

  /**
   * True to enable downloads for this repository, false to disable them. Default is true.
   */
  has_downloads?: boolean;

  /**
   * True to enable issues for this repository, false to disable them. Default is true.
   */
  has_issues?: boolean;

  /**
   * True to enable the wiki for this repository, false to disable it. Default is true.
   */
  has_wiki?: boolean;
  homepage?: string;
  name: string;

  /**
   * True to create a private repository, false to create a public one. Creating private repositories requires a paid GitHub account.
   */
  private?: boolean;

  /**
   * The id of the team that will be granted access to this repository. This is only valid when creating a repo in an organization.
   */
  team_id?: number;
}

export interface pullRequest {
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
    repo?: repo;
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
    repo?: repo;
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

export interface pullUpdate {
  body?: string;
  state?: string;
  title?: string;
}

export type pulls = Array<{
  _links?: {
    comments?: { href?: string };
    html?: { href?: string };
    review_comments?: { href?: string };
    self?: { href?: string };
  };
  base?: {
    label?: string;
    ref?: string;
    repo?: repo;
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
    repo?: repo;
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
}>;

export interface pullsComment {
  _links?: { html?: { href?: string }; pull_request?: { href?: string }; self?: { href?: string } };
  body?: string;
  commit_id?: string;

  /**
   * ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ
   */
  created_at?: string;
  id?: number;
  path?: string;
  position?: number;

  /**
   * ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ
   */
  updated_at?: string;
  url?: string;
  user?: { avatar_url?: string; gravatar_id?: string; id?: number; login?: string; url?: string };
}

export interface pullsCommentPost {
  body?: string;
  commit_id?: string;
  path?: string;
  position?: number;
}

export type pullsComments = Array<{
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
}>;

export interface pullsPost {
  base?: string;
  body?: string;
  head?: string;
  title?: string;
}

export interface putSubscription {
  created_at?: string;
  ignored?: boolean;
  reason?: object;
  subscribed?: boolean;
  thread_url?: string;
  url?: string;
}

export interface rate_limit {
  rate?: { limit?: number; remaining?: number; reset?: number };
}

export type ref = Array<{
  created_at?: string;
  creator?: { avatar_url?: string; gravatar_id?: string; id?: number; login?: string; url?: string };
  description?: string;
  id?: number;
  state?: string;
  target_url?: string;
  updated_at?: string;
  url?: string;
}>;

export type refStatus = Array<{
  commit_url?: string;
  name?: string;
  repository_url?: string;
  sha?: string;
  state?: string;
  statuses?: Array<{
    context?: string;
    created_at?: string;
    description?: string;
    id?: number;
    state?: string;
    target_url?: string;
    updated_at?: string;
    url?: string;
  }>;
}>;

export type refs = Array<{ object?: { sha?: string; type?: string; url?: string }; ref?: string; url?: string }>;

export interface refsBody {
  ref?: string;
  sha?: string;
}

export interface release {
  assets?: Array<{
    content_type?: string;
    created_at?: string;
    download_count?: number;
    id?: number;
    label?: string;
    name?: string;
    size?: number;
    state?: string;
    updated_at?: string;
    uploader?: user;
    url?: string;
  }>;
  assets_url?: string;
  author?: user;
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

export interface ReleaseCreate {
  body?: string;
  draft?: boolean;
  name?: string;
  prerelease?: boolean;
  tag_name?: string;
  target_commitish?: string;
}

export type releases = Array<{
  assets?: Array<{
    content_type?: string;
    created_at?: string;
    download_count?: number;
    id?: number;
    label?: string;
    name?: string;
    size?: number;
    state?: string;
    updated_at?: string;
    uploader?: user;
    url?: string;
  }>;
  assets_url?: string;
  author?: user;
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
}>;

export interface repo {
  clone_url?: string;

  /**
   * ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ
   */
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
  organization?: organization;
  owner?: actor;
  parent?: repo & any;
  private?: boolean;

  /**
   * ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ
   */
  pushed_at?: string;
  size?: number;
  source?: repo & any;
  ssh_url?: string;
  svn_url?: string;

  /**
   * ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ
   */
  updated_at?: string;
  url?: string;
  watchers?: number;
  watchers_count?: number;
}

export type RepoDeployments = Array<{
  created_at?: string;
  creator?: user;
  description?: string;
  id?: number;
  payload?: string;
  sha?: string;
  statuses_url?: string;
  updated_at?: string;
  url?: string;
}>;

export type repoComments = Array<{
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
  user?: user;
}>;

export interface repoCommit {
  author?: { date?: string; email?: string; name?: string };
  committer?: { date?: string; email?: string; name?: string };
  message?: string;
  parents?: Array<{ sha?: string; url?: string }>;
  sha?: string;
  tree?: { sha?: string; url?: string };
  url?: string;
}

export interface repoCommitBody {
  author?: { date?: string; email?: string; name?: string };
  message: string;
  parents: string[];
  tree: string;
}

export interface repoEdit {
  description?: string;
  has_downloads?: boolean;
  has_issues?: boolean;
  has_wiki?: boolean;
  homepage?: string;
  name?: string;
  private?: boolean;
}

export type repos = repo[];

export interface SearchCode {
  items?: Array<{
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
      owner?: actor;
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
  }>;
  total_count?: number;
}

export interface SearchIssues {
  items?: Array<{
    assignee?: any;
    body?: string;
    closed_at?: any;
    comments?: number;
    comments_url?: string;
    created_at?: string;
    events_url?: string;
    html_url?: string;
    id?: number;
    labels?: Array<{ color?: string; name?: string; url?: string }>;
    labels_url?: string;
    milestone?: any;
    number?: number;
    pull_request?: { diff_url?: any; html_url?: any; patch_url?: any };
    score?: number;
    state?: string;
    title?: string;
    updated_at?: string;
    url?: string;
    user?: user;
  }>;
  total_count?: number;
}

export interface SearchIssuesByKeyword {
  issues?: Array<{
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
  }>;
}

export interface SearchRepositories {
  items?: repo[];
  total_count?: number;
}

export interface SearchRepositoriesByKeyword {
  repositories?: repo[];
}

export interface SearchUserByEmail {
  user?: user;
}

export interface SearchUsers {
  items?: users;
  total_count?: number;
}

export interface SearchUsersByKeyword {
  users?: users;
}

export interface subscription {
  /**
   * ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ
   */
  created_at?: string;
  ignored?: boolean;
  reason?: string;
  repository_url?: string;
  subscribed?: boolean;
  thread_url?: string;
  url?: string;
}

export interface subscriptionBody {
  ignored?: boolean;
  subscribed?: boolean;
}

export interface tag {
  /**
   * String of the tag message.
   */
  message?: string;
  object?: { sha?: string; type?: "commit" | "tree" | "blob"; url?: string };
  sha?: string;

  /**
   * The tag's name. This is typically a version (e.g., "v0.0.1").
   */
  tag?: string;
  tagger?: { date?: string; email?: string; name?: string };
  url?: string;
}

export interface tagBody {
  /**
   * String of the tag message.
   */
  message: string;

  /**
   * String of the SHA of the git object this is tagging.
   */
  object: string;

  /**
   * The tag's name. This is typically a version (e.g., "v0.0.1").
   */
  tag: string;
  tagger: { date?: string; email?: string; name?: string };

  /**
   * String of the type of the object we’re tagging. Normally this is a commit but it can also be a tree or a blob.
   */
  type: "commit" | "tree" | "blob";
}

export type tags = tag[];

export interface team {
  id?: number;
  members_count?: number;
  name?: string;
  permission?: string;
  repos_count?: number;
  url?: string;
}

export interface teamMembership {
  state?: string;
  url?: string;
}

export type teamRepos = repos;

export type teams = Array<{ id?: number; name?: string; url?: string }>;

export type TeamsList = Array<{
  id?: number;
  members_count?: number;
  name?: string;
  organization?: { avatar_url?: string; id?: number; login?: string; url?: string };
  permission?: string;
  repos_count?: number;
  url?: string;
}>;

export interface tree {
  sha?: string;
  tree?: Array<{
    mode?: "100644" | "100755" | "040000" | "160000" | "120000";
    path?: string;
    sha?: string;
    size?: number;
    type?: "blob" | "tree" | "commit";
    url?: string;
  }>;
  url?: string;
}

export interface trees {
  base_tree?: string;

  /**
   * SHA1 checksum ID of the object in the tree.
   */
  sha?: string;
  tree?: tree[];
  url?: string;
}

export type user = actor & any;

export type UserEmails = string[];

export interface UserKeysKeyId {
  id?: number;
  key?: string;
  title?: string;
  url?: string;
}

export interface UserKeysPost {
  key?: string;
  title?: string;
}

export interface UserUpdate {
  bio?: string;
  blog?: string;
  company?: string;
  email?: string;
  hireable?: boolean;
  location?: string;
  name?: string;
}

export type users = user[];

export namespace emojis {
  /**
   * @name emojisList
   * @request GET:/emojis
   * @description Lists all the emojis available to use on GitHub.
   */
  export namespace EmojisList {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = emojis;
  }
}
export namespace events {
  /**
   * @name eventsList
   * @request GET:/events
   * @description List public events.
   */
  export namespace EventsList {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = events;
  }
}
export namespace feeds {
  /**
   * @name feedsList
   * @request GET:/feeds
   * @description List Feeds. GitHub provides several timeline resources in Atom format. The Feeds API lists all the feeds available to the authenticating user.
   */
  export namespace FeedsList {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = feeds;
  }
}
export namespace gists {
  /**
   * @name gistsList
   * @request GET:/gists
   * @description List the authenticated user's gists or if called anonymously, this will return all public gists.
   */
  export namespace GistsList {
    export type RequestQuery = { since?: string };
    export type RequestBody = never;
    export type ResponseBody = gists;
  }

  /**
   * @name gistsCreate
   * @request POST:/gists
   * @description Create a gist.
   */
  export namespace GistsCreate {
    export type RequestQuery = {};
    export type RequestBody = postGist;
    export type ResponseBody = gist;
  }

  /**
   * @name publicList
   * @request GET:/gists/public
   * @description List all public gists.
   */
  export namespace PublicList {
    export type RequestQuery = { since?: string };
    export type RequestBody = never;
    export type ResponseBody = gists;
  }

  /**
   * @name starredList
   * @request GET:/gists/starred
   * @description List the authenticated user's starred gists.
   */
  export namespace StarredList {
    export type RequestQuery = { since?: string };
    export type RequestBody = never;
    export type ResponseBody = gists;
  }

  /**
   * @name gistsDelete
   * @request DELETE:/gists/{id}
   * @description Delete a gist.
   */
  export namespace GistsDelete {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name gistsDetail
   * @request GET:/gists/{id}
   * @description Get a single gist.
   */
  export namespace GistsDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = gist;
  }

  /**
   * @name gistsPartialUpdate
   * @request PATCH:/gists/{id}
   * @description Edit a gist.
   */
  export namespace GistsPartialUpdate {
    export type RequestQuery = {};
    export type RequestBody = patchGist;
    export type ResponseBody = gist;
  }

  /**
   * @name commentsDetail
   * @request GET:/gists/{id}/comments
   * @description List comments on a gist.
   */
  export namespace CommentsDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = comments;
  }

  /**
   * @name commentsCreate
   * @request POST:/gists/{id}/comments
   * @description Create a commen
   */
  export namespace CommentsCreate {
    export type RequestQuery = {};
    export type RequestBody = commentBody;
    export type ResponseBody = comment;
  }

  /**
   * @name commentsDelete
   * @request DELETE:/gists/{id}/comments/{commentId}
   * @description Delete a comment.
   */
  export namespace CommentsDelete {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name commentsDetail
   * @request GET:/gists/{id}/comments/{commentId}
   * @description Get a single comment.
   * @originalName commentsDetail
   * @duplicate
   */
  export namespace CommentsDetail2 {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = comment;
  }

  /**
   * @name commentsPartialUpdate
   * @request PATCH:/gists/{id}/comments/{commentId}
   * @description Edit a comment.
   */
  export namespace CommentsPartialUpdate {
    export type RequestQuery = {};
    export type RequestBody = comment;
    export type ResponseBody = comment;
  }

  /**
   * @name forksCreate
   * @request POST:/gists/{id}/forks
   * @description Fork a gist.
   */
  export namespace ForksCreate {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name starDelete
   * @request DELETE:/gists/{id}/star
   * @description Unstar a gist.
   */
  export namespace StarDelete {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name starDetail
   * @request GET:/gists/{id}/star
   * @description Check if a gist is starred.
   */
  export namespace StarDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name starUpdate
   * @request PUT:/gists/{id}/star
   * @description Star a gist.
   */
  export namespace StarUpdate {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }
}
export namespace gitignore {
  /**
   * @name templatesList
   * @request GET:/gitignore/templates
   * @description Listing available templates. List all templates available to pass as an option when creating a repository.
   */
  export namespace TemplatesList {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = gitignore;
  }

  /**
   * @name templatesDetail
   * @request GET:/gitignore/templates/{language}
   * @description Get a single template.
   */
  export namespace TemplatesDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = GitignoreLang;
  }
}
export namespace issues {
  /**
   * @name issuesList
   * @request GET:/issues
   * @description List issues. List all issues across all the authenticated user's visible repositories.
   */
  export namespace IssuesList {
    export type RequestQuery = {
      filter: "assigned" | "created" | "mentioned" | "subscribed" | "all";
      state: "open" | "closed";
      labels: string;
      sort: "created" | "updated" | "comments";
      direction: "asc" | "desc";
      since?: string;
    };
    export type RequestBody = never;
    export type ResponseBody = issues;
  }
}
export namespace legacy {
  /**
   * @name issuesSearchDetail
   * @request GET:/legacy/issues/search/{owner}/{repository}/{state}/{keyword}
   * @description Find issues by state and keyword.
   */
  export namespace IssuesSearchDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = SearchIssuesByKeyword;
  }

  /**
   * @name reposSearchDetail
   * @request GET:/legacy/repos/search/{keyword}
   * @description Find repositories by keyword. Note, this legacy method does not follow the v3 pagination pattern. This method returns up to 100 results per page and pages can be fetched using the start_page parameter.
   */
  export namespace ReposSearchDetail {
    export type RequestQuery = {
      order?: "desc" | "asc";
      language?: string;
      start_page?: string;
      sort?: "updated" | "stars" | "forks";
    };
    export type RequestBody = never;
    export type ResponseBody = SearchRepositoriesByKeyword;
  }

  /**
   * @name userEmailDetail
   * @request GET:/legacy/user/email/{email}
   * @description This API call is added for compatibility reasons only.
   */
  export namespace UserEmailDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = SearchUserByEmail;
  }

  /**
   * @name userSearchDetail
   * @request GET:/legacy/user/search/{keyword}
   * @description Find users by keyword.
   */
  export namespace UserSearchDetail {
    export type RequestQuery = { order?: "desc" | "asc"; start_page?: string; sort?: "updated" | "stars" | "forks" };
    export type RequestBody = never;
    export type ResponseBody = SearchUsersByKeyword;
  }
}
export namespace markdown {
  /**
   * @name markdownCreate
   * @request POST:/markdown
   * @description Render an arbitrary Markdown document
   */
  export namespace MarkdownCreate {
    export type RequestQuery = {};
    export type RequestBody = markdown;
    export type ResponseBody = any;
  }

  /**
   * @name postMarkdown
   * @request POST:/markdown/raw
   * @description Render a Markdown document in raw mode
   */
  export namespace PostMarkdown {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }
}
export namespace meta {
  /**
   * @name metaList
   * @request GET:/meta
   * @description This gives some information about GitHub.com, the service.
   */
  export namespace MetaList {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = meta;
  }
}
export namespace networks {
  /**
   * @name eventsDetail
   * @request GET:/networks/{owner}/{repo}/events
   * @description List public events for a network of repositories.
   */
  export namespace EventsDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = events;
  }
}
export namespace notifications {
  /**
   * @name notificationsList
   * @request GET:/notifications
   * @description List your notifications. List all notifications for the current user, grouped by repository.
   */
  export namespace NotificationsList {
    export type RequestQuery = { all?: boolean; participating?: boolean; since?: string };
    export type RequestBody = never;
    export type ResponseBody = notifications;
  }

  /**
   * @name notificationsUpdate
   * @request PUT:/notifications
   * @description Mark as read. Marking a notification as "read" removes it from the default view on GitHub.com.
   */
  export namespace NotificationsUpdate {
    export type RequestQuery = {};
    export type RequestBody = notificationMarkRead;
    export type ResponseBody = any;
  }

  /**
   * @name threadsDetail
   * @request GET:/notifications/threads/{id}
   * @description View a single thread.
   */
  export namespace ThreadsDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = notifications;
  }

  /**
   * @name threadsPartialUpdate
   * @request PATCH:/notifications/threads/{id}
   * @description Mark a thread as read
   */
  export namespace ThreadsPartialUpdate {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name threadsSubscriptionDelete
   * @request DELETE:/notifications/threads/{id}/subscription
   * @description Delete a Thread Subscription.
   */
  export namespace ThreadsSubscriptionDelete {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name threadsSubscriptionDetail
   * @request GET:/notifications/threads/{id}/subscription
   * @description Get a Thread Subscription.
   */
  export namespace ThreadsSubscriptionDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = subscription;
  }

  /**
   * @name threadsSubscriptionUpdate
   * @request PUT:/notifications/threads/{id}/subscription
   * @description Set a Thread Subscription. This lets you subscribe to a thread, or ignore it. Subscribing to a thread is unnecessary if the user is already subscribed to the repository. Ignoring a thread will mute all future notifications (until you comment or get @mentioned).
   */
  export namespace ThreadsSubscriptionUpdate {
    export type RequestQuery = {};
    export type RequestBody = putSubscription;
    export type ResponseBody = subscription;
  }
}
export namespace orgs {
  /**
   * @name orgsDetail
   * @request GET:/orgs/{org}
   * @description Get an Organization.
   */
  export namespace OrgsDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = organization;
  }

  /**
   * @name orgsPartialUpdate
   * @request PATCH:/orgs/{org}
   * @description Edit an Organization.
   */
  export namespace OrgsPartialUpdate {
    export type RequestQuery = {};
    export type RequestBody = patchOrg;
    export type ResponseBody = organization;
  }

  /**
   * @name eventsDetail
   * @request GET:/orgs/{org}/events
   * @description List public events for an organization.
   */
  export namespace EventsDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = events;
  }

  /**
   * @name issuesDetail
   * @request GET:/orgs/{org}/issues
   * @description List issues. List all issues for a given organization for the authenticated user.
   */
  export namespace IssuesDetail {
    export type RequestQuery = {
      filter: "assigned" | "created" | "mentioned" | "subscribed" | "all";
      state: "open" | "closed";
      labels: string;
      sort: "created" | "updated" | "comments";
      direction: "asc" | "desc";
      since?: string;
    };
    export type RequestBody = never;
    export type ResponseBody = issues;
  }

  /**
   * @name membersDetail
   * @request GET:/orgs/{org}/members
   * @description Members list. List all users who are members of an organization. A member is a user tha belongs to at least 1 team in the organization. If the authenticated user is also an owner of this organization then both concealed and public members will be returned. If the requester is not an owner of the organization the query will be redirected to the public members list.
   */
  export namespace MembersDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = users;
  }

  /**
   * @name membersDelete
   * @request DELETE:/orgs/{org}/members/{username}
   * @description Remove a member. Removing a user from this list will remove them from all teams and they will no longer have any access to the organization's repositories.
   */
  export namespace MembersDelete {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name membersDetail
   * @request GET:/orgs/{org}/members/{username}
   * @description Check if a user is, publicly or privately, a member of the organization.
   * @originalName membersDetail
   * @duplicate
   */
  export namespace MembersDetail2 {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name publicMembersDetail
   * @request GET:/orgs/{org}/public_members
   * @description Public members list. Members of an organization can choose to have their membership publicized or not.
   */
  export namespace PublicMembersDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = users;
  }

  /**
   * @name publicMembersDelete
   * @request DELETE:/orgs/{org}/public_members/{username}
   * @description Conceal a user's membership.
   */
  export namespace PublicMembersDelete {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name publicMembersDetail
   * @request GET:/orgs/{org}/public_members/{username}
   * @description Check public membership.
   * @originalName publicMembersDetail
   * @duplicate
   */
  export namespace PublicMembersDetail2 {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name publicMembersUpdate
   * @request PUT:/orgs/{org}/public_members/{username}
   * @description Publicize a user's membership.
   */
  export namespace PublicMembersUpdate {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name reposDetail
   * @request GET:/orgs/{org}/repos
   * @description List repositories for the specified org.
   */
  export namespace ReposDetail {
    export type RequestQuery = { type?: "all" | "public" | "private" | "forks" | "sources" | "member" };
    export type RequestBody = never;
    export type ResponseBody = repos;
  }

  /**
   * @name reposCreate
   * @request POST:/orgs/{org}/repos
   * @description Create a new repository for the authenticated user. OAuth users must supply repo scope.
   */
  export namespace ReposCreate {
    export type RequestQuery = {};
    export type RequestBody = postRepo;
    export type ResponseBody = repos;
  }

  /**
   * @name teamsDetail
   * @request GET:/orgs/{org}/teams
   * @description List teams.
   */
  export namespace TeamsDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = teams;
  }

  /**
   * @name teamsCreate
   * @request POST:/orgs/{org}/teams
   * @description Create team. In order to create a team, the authenticated user must be an owner of organization.
   */
  export namespace TeamsCreate {
    export type RequestQuery = {};
    export type RequestBody = orgTeamsPost;
    export type ResponseBody = team;
  }
}
export namespace rateLimit {
  /**
   * @name rateLimitList
   * @request GET:/rate_limit
   * @description Get your current rate limit status Note: Accessing this endpoint does not count against your rate limit.
   */
  export namespace RateLimitList {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = rate_limit;
  }
}
export namespace repos {
  /**
   * @name reposDelete
   * @request DELETE:/repos/{owner}/{repo}
   * @description Delete a Repository. Deleting a repository requires admin access. If OAuth is used, the delete_repo scope is required.
   */
  export namespace ReposDelete {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name reposDetail
   * @request GET:/repos/{owner}/{repo}
   * @description Get repository.
   */
  export namespace ReposDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = repo;
  }

  /**
   * @name reposPartialUpdate
   * @request PATCH:/repos/{owner}/{repo}
   * @description Edit repository.
   */
  export namespace ReposPartialUpdate {
    export type RequestQuery = {};
    export type RequestBody = repoEdit;
    export type ResponseBody = repo;
  }

  /**
   * @name assigneesDetail
   * @request GET:/repos/{owner}/{repo}/assignees
   * @description List assignees. This call lists all the available assignees (owner + collaborators) to which issues may be assigned.
   */
  export namespace AssigneesDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = assignees;
  }

  /**
   * @name assigneesDetail
   * @request GET:/repos/{owner}/{repo}/assignees/{assignee}
   * @description Check assignee. You may also check to see if a particular user is an assignee for a repository.
   * @originalName assigneesDetail
   * @duplicate
   */
  export namespace AssigneesDetail2 {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name branchesDetail
   * @request GET:/repos/{owner}/{repo}/branches
   * @description Get list of branches
   */
  export namespace BranchesDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = branches;
  }

  /**
   * @name branchesDetail
   * @request GET:/repos/{owner}/{repo}/branches/{branch}
   * @description Get Branch
   * @originalName branchesDetail
   * @duplicate
   */
  export namespace BranchesDetail2 {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = branch;
  }

  /**
   * @name collaboratorsDetail
   * @request GET:/repos/{owner}/{repo}/collaborators
   * @description List. When authenticating as an organization owner of an organization-owned repository, all organization owners are included in the list of collaborators. Otherwise, only users with access to the repository are returned in the collaborators list.
   */
  export namespace CollaboratorsDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = users;
  }

  /**
   * @name collaboratorsDelete
   * @request DELETE:/repos/{owner}/{repo}/collaborators/{user}
   * @description Remove collaborator.
   */
  export namespace CollaboratorsDelete {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name collaboratorsDetail
   * @request GET:/repos/{owner}/{repo}/collaborators/{user}
   * @description Check if user is a collaborator
   * @originalName collaboratorsDetail
   * @duplicate
   */
  export namespace CollaboratorsDetail2 {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name collaboratorsUpdate
   * @request PUT:/repos/{owner}/{repo}/collaborators/{user}
   * @description Add collaborator.
   */
  export namespace CollaboratorsUpdate {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name commentsDetail
   * @request GET:/repos/{owner}/{repo}/comments
   * @description List commit comments for a repository. Comments are ordered by ascending ID.
   */
  export namespace CommentsDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = repoComments;
  }

  /**
   * @name commentsDelete
   * @request DELETE:/repos/{owner}/{repo}/comments/{commentId}
   * @description Delete a commit comment
   */
  export namespace CommentsDelete {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name commentsDetail
   * @request GET:/repos/{owner}/{repo}/comments/{commentId}
   * @description Get a single commit comment.
   * @originalName commentsDetail
   * @duplicate
   */
  export namespace CommentsDetail2 {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = commitComment;
  }

  /**
   * @name commentsPartialUpdate
   * @request PATCH:/repos/{owner}/{repo}/comments/{commentId}
   * @description Update a commit comment.
   */
  export namespace CommentsPartialUpdate {
    export type RequestQuery = {};
    export type RequestBody = commentBody;
    export type ResponseBody = commitComment;
  }

  /**
   * @name commitsDetail
   * @request GET:/repos/{owner}/{repo}/commits
   * @description List commits on a repository.
   */
  export namespace CommitsDetail {
    export type RequestQuery = { since?: string; sha?: string; path?: string; author?: string; until?: string };
    export type RequestBody = never;
    export type ResponseBody = commits;
  }

  /**
   * @name commitsStatusDetail
   * @request GET:/repos/{owner}/{repo}/commits/{ref}/status
   * @description Get the combined Status for a specific Ref The Combined status endpoint is currently available for developers to preview. During the preview period, the API may change without advance notice. Please see the blog post for full details. To access this endpoint during the preview period, you must provide a custom media type in the Accept header: application/vnd.github.she-hulk-preview+json
   */
  export namespace CommitsStatusDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = refStatus;
  }

  /**
   * @name commitsDetail
   * @request GET:/repos/{owner}/{repo}/commits/{shaCode}
   * @description Get a single commit.
   * @originalName commitsDetail
   * @duplicate
   */
  export namespace CommitsDetail2 {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = commit;
  }

  /**
   * @name commitsCommentsDetail
   * @request GET:/repos/{owner}/{repo}/commits/{shaCode}/comments
   * @description List comments for a single commitList comments for a single commit.
   */
  export namespace CommitsCommentsDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = repoComments;
  }

  /**
   * @name commitsCommentsCreate
   * @request POST:/repos/{owner}/{repo}/commits/{shaCode}/comments
   * @description Create a commit comment.
   */
  export namespace CommitsCommentsCreate {
    export type RequestQuery = {};
    export type RequestBody = commitCommentBody;
    export type ResponseBody = commitComment;
  }

  /**
   * @name compareDetail
   * @request GET:/repos/{owner}/{repo}/compare/{baseId}...{headId}
   * @description Compare two commits
   */
  export namespace CompareDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = CompareCommits;
  }

  /**
   * @name contentsDelete
   * @request DELETE:/repos/{owner}/{repo}/contents/{path}
   * @description Delete a file. This method deletes a file in a repository.
   */
  export namespace ContentsDelete {
    export type RequestQuery = {};
    export type RequestBody = deleteFileBody;
    export type ResponseBody = deleteFile;
  }

  /**
   * @name contentsDetail
   * @request GET:/repos/{owner}/{repo}/contents/{path}
   * @description Get contents. This method returns the contents of a file or directory in a repository. Files and symlinks support a custom media type for getting the raw content. Directories and submodules do not support custom media types. Note: This API supports files up to 1 megabyte in size. Here can be many outcomes. For details see "http://developer.github.com/v3/repos/contents/"
   */
  export namespace ContentsDetail {
    export type RequestQuery = { path?: string; ref?: string };
    export type RequestBody = never;
    export type ResponseBody = ContentsPath;
  }

  /**
   * @name contentsUpdate
   * @request PUT:/repos/{owner}/{repo}/contents/{path}
   * @description Create a file.
   */
  export namespace ContentsUpdate {
    export type RequestQuery = {};
    export type RequestBody = createFileBody;
    export type ResponseBody = createFile;
  }

  /**
   * @name contributorsDetail
   * @request GET:/repos/{owner}/{repo}/contributors
   * @description Get list of contributors.
   */
  export namespace ContributorsDetail {
    export type RequestQuery = { anon: string };
    export type RequestBody = never;
    export type ResponseBody = users;
  }

  /**
   * @name deploymentsDetail
   * @request GET:/repos/{owner}/{repo}/deployments
   * @description Users with pull access can view deployments for a repository
   */
  export namespace DeploymentsDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = RepoDeployments;
  }

  /**
   * @name deploymentsCreate
   * @request POST:/repos/{owner}/{repo}/deployments
   * @description Users with push access can create a deployment for a given ref
   */
  export namespace DeploymentsCreate {
    export type RequestQuery = {};
    export type RequestBody = deployment;
    export type ResponseBody = DeploymentResp;
  }

  /**
   * @name deploymentsStatusesDetail
   * @request GET:/repos/{owner}/{repo}/deployments/{id}/statuses
   * @description Users with pull access can view deployment statuses for a deployment
   */
  export namespace DeploymentsStatusesDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = DeploymentStatuses;
  }

  /**
   * @name deploymentsStatusesCreate
   * @request POST:/repos/{owner}/{repo}/deployments/{id}/statuses
   * @description Create a Deployment Status Users with push access can create deployment statuses for a given deployment:
   */
  export namespace DeploymentsStatusesCreate {
    export type RequestQuery = {};
    export type RequestBody = DeploymentStatusesCreate;
    export type ResponseBody = any;
  }

  /**
   * @name downloadsDetail
   * @request GET:/repos/{owner}/{repo}/downloads
   * @description Deprecated. List downloads for a repository.
   */
  export namespace DownloadsDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = downloads;
  }

  /**
   * @name downloadsDelete
   * @request DELETE:/repos/{owner}/{repo}/downloads/{downloadId}
   * @description Deprecated. Delete a download.
   */
  export namespace DownloadsDelete {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name downloadsDetail
   * @request GET:/repos/{owner}/{repo}/downloads/{downloadId}
   * @description Deprecated. Get a single download.
   * @originalName downloadsDetail
   * @duplicate
   */
  export namespace DownloadsDetail2 {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = download;
  }

  /**
   * @name eventsDetail
   * @request GET:/repos/{owner}/{repo}/events
   * @description Get list of repository events.
   */
  export namespace EventsDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = events;
  }

  /**
   * @name forksDetail
   * @request GET:/repos/{owner}/{repo}/forks
   * @description List forks.
   */
  export namespace ForksDetail {
    export type RequestQuery = { sort?: "newes" | "oldes" | "watchers" };
    export type RequestBody = never;
    export type ResponseBody = forks;
  }

  /**
   * @name forksCreate
   * @request POST:/repos/{owner}/{repo}/forks
   * @description Create a fork. Forking a Repository happens asynchronously. Therefore, you may have to wai a short period before accessing the git objects. If this takes longer than 5 minutes, be sure to contact Support.
   */
  export namespace ForksCreate {
    export type RequestQuery = {};
    export type RequestBody = forkBody;
    export type ResponseBody = repo;
  }

  /**
   * @name gitBlobsCreate
   * @request POST:/repos/{owner}/{repo}/git/blobs
   * @description Create a Blob.
   */
  export namespace GitBlobsCreate {
    export type RequestQuery = {};
    export type RequestBody = blob;
    export type ResponseBody = blobs;
  }

  /**
   * @name gitBlobsDetail
   * @request GET:/repos/{owner}/{repo}/git/blobs/{shaCode}
   * @description Get a Blob. Since blobs can be any arbitrary binary data, the input and responses for the blob API takes an encoding parameter that can be either utf-8 or base64. If your data cannot be losslessly sent as a UTF-8 string, you can base64 encode it.
   */
  export namespace GitBlobsDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = blob;
  }

  /**
   * @name gitCommitsCreate
   * @request POST:/repos/{owner}/{repo}/git/commits
   * @description Create a Commit.
   */
  export namespace GitCommitsCreate {
    export type RequestQuery = {};
    export type RequestBody = repoCommitBody;
    export type ResponseBody = gitCommit;
  }

  /**
   * @name gitCommitsDetail
   * @request GET:/repos/{owner}/{repo}/git/commits/{shaCode}
   * @description Get a Commit.
   */
  export namespace GitCommitsDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = repoCommit;
  }

  /**
   * @name gitRefsDetail
   * @request GET:/repos/{owner}/{repo}/git/refs
   * @description Get all References
   */
  export namespace GitRefsDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = refs;
  }

  /**
   * @name gitRefsCreate
   * @request POST:/repos/{owner}/{repo}/git/refs
   * @description Create a Reference
   */
  export namespace GitRefsCreate {
    export type RequestQuery = {};
    export type RequestBody = refsBody;
    export type ResponseBody = headBranch;
  }

  /**
   * @name gitRefsDelete
   * @request DELETE:/repos/{owner}/{repo}/git/refs/{ref}
   * @description Delete a Reference Example: Deleting a branch: DELETE /repos/octocat/Hello-World/git/refs/heads/feature-a Example: Deleting a tag:        DELETE /repos/octocat/Hello-World/git/refs/tags/v1.0
   */
  export namespace GitRefsDelete {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name gitRefsDetail
   * @request GET:/repos/{owner}/{repo}/git/refs/{ref}
   * @description Get a Reference
   * @originalName gitRefsDetail
   * @duplicate
   */
  export namespace GitRefsDetail2 {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = headBranch;
  }

  /**
   * @name gitRefsPartialUpdate
   * @request PATCH:/repos/{owner}/{repo}/git/refs/{ref}
   * @description Update a Reference
   */
  export namespace GitRefsPartialUpdate {
    export type RequestQuery = {};
    export type RequestBody = gitRefPatch;
    export type ResponseBody = headBranch;
  }

  /**
   * @name gitTagsCreate
   * @request POST:/repos/{owner}/{repo}/git/tags
   * @description Create a Tag Object. Note that creating a tag object does not create the reference that makes a tag in Git. If you want to create an annotated tag in Git, you have to do this call to create the tag object, and then create the refs/tags/[tag] reference. If you want to create a lightweight tag, you only have to create the tag reference - this call would be unnecessary.
   */
  export namespace GitTagsCreate {
    export type RequestQuery = {};
    export type RequestBody = tagBody;
    export type ResponseBody = tag;
  }

  /**
   * @name gitTagsDetail
   * @request GET:/repos/{owner}/{repo}/git/tags/{shaCode}
   * @description Get a Tag.
   */
  export namespace GitTagsDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = tag;
  }

  /**
   * @name gitTreesCreate
   * @request POST:/repos/{owner}/{repo}/git/trees
   * @description Create a Tree. The tree creation API will take nested entries as well. If both a tree and a nested path modifying that tree are specified, it will overwrite the contents of that tree with the new path contents and write a new tree out.
   */
  export namespace GitTreesCreate {
    export type RequestQuery = {};
    export type RequestBody = tree;
    export type ResponseBody = trees;
  }

  /**
   * @name gitTreesDetail
   * @request GET:/repos/{owner}/{repo}/git/trees/{shaCode}
   * @description Get a Tree.
   */
  export namespace GitTreesDetail {
    export type RequestQuery = { recursive?: number };
    export type RequestBody = never;
    export type ResponseBody = tree;
  }

  /**
   * @name hooksDetail
   * @request GET:/repos/{owner}/{repo}/hooks
   * @description Get list of hooks.
   */
  export namespace HooksDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = hook;
  }

  /**
   * @name hooksCreate
   * @request POST:/repos/{owner}/{repo}/hooks
   * @description Create a hook.
   */
  export namespace HooksCreate {
    export type RequestQuery = {};
    export type RequestBody = hookBody;
    export type ResponseBody = hook;
  }

  /**
   * @name hooksDelete
   * @request DELETE:/repos/{owner}/{repo}/hooks/{hookId}
   * @description Delete a hook.
   */
  export namespace HooksDelete {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name hooksDetail
   * @request GET:/repos/{owner}/{repo}/hooks/{hookId}
   * @description Get single hook.
   * @originalName hooksDetail
   * @duplicate
   */
  export namespace HooksDetail2 {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = hook;
  }

  /**
   * @name hooksPartialUpdate
   * @request PATCH:/repos/{owner}/{repo}/hooks/{hookId}
   * @description Edit a hook.
   */
  export namespace HooksPartialUpdate {
    export type RequestQuery = {};
    export type RequestBody = hookBody;
    export type ResponseBody = hook;
  }

  /**
   * @name hooksTestsCreate
   * @request POST:/repos/{owner}/{repo}/hooks/{hookId}/tests
   * @description Test a push hook. This will trigger the hook with the latest push to the current repository if the hook is subscribed to push events. If the hook is not subscribed to push events, the server will respond with 204 but no test POST will be generated. Note: Previously /repos/:owner/:repo/hooks/:id/tes
   */
  export namespace HooksTestsCreate {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name issuesDetail
   * @request GET:/repos/{owner}/{repo}/issues
   * @description List issues for a repository.
   */
  export namespace IssuesDetail {
    export type RequestQuery = {
      filter: "assigned" | "created" | "mentioned" | "subscribed" | "all";
      state: "open" | "closed";
      labels: string;
      sort: "created" | "updated" | "comments";
      direction: "asc" | "desc";
      since?: string;
    };
    export type RequestBody = never;
    export type ResponseBody = issues;
  }

  /**
   * @name issuesCreate
   * @request POST:/repos/{owner}/{repo}/issues
   * @description Create an issue. Any user with pull access to a repository can create an issue.
   */
  export namespace IssuesCreate {
    export type RequestQuery = {};
    export type RequestBody = issue;
    export type ResponseBody = issue;
  }

  /**
   * @name issuesCommentsDetail
   * @request GET:/repos/{owner}/{repo}/issues/comments
   * @description List comments in a repository.
   */
  export namespace IssuesCommentsDetail {
    export type RequestQuery = { direction?: string; sort?: "created" | "updated"; since?: string };
    export type RequestBody = never;
    export type ResponseBody = issuesComments;
  }

  /**
   * @name issuesCommentsDelete
   * @request DELETE:/repos/{owner}/{repo}/issues/comments/{commentId}
   * @description Delete a comment.
   */
  export namespace IssuesCommentsDelete {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name issuesCommentsDetail
   * @request GET:/repos/{owner}/{repo}/issues/comments/{commentId}
   * @description Get a single comment.
   * @originalName issuesCommentsDetail
   * @duplicate
   */
  export namespace IssuesCommentsDetail2 {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = issuesComment;
  }

  /**
   * @name issuesCommentsPartialUpdate
   * @request PATCH:/repos/{owner}/{repo}/issues/comments/{commentId}
   * @description Edit a comment.
   */
  export namespace IssuesCommentsPartialUpdate {
    export type RequestQuery = {};
    export type RequestBody = commentBody;
    export type ResponseBody = issuesComment;
  }

  /**
   * @name issuesEventsDetail
   * @request GET:/repos/{owner}/{repo}/issues/events
   * @description List issue events for a repository.
   */
  export namespace IssuesEventsDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = issueEvents;
  }

  /**
   * @name issuesEventsDetail
   * @request GET:/repos/{owner}/{repo}/issues/events/{eventId}
   * @description Get a single event.
   * @originalName issuesEventsDetail
   * @duplicate
   */
  export namespace IssuesEventsDetail2 {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = issueEvent;
  }

  /**
   * @name issuesDetail
   * @request GET:/repos/{owner}/{repo}/issues/{number}
   * @description Get a single issue
   * @originalName issuesDetail
   * @duplicate
   */
  export namespace IssuesDetail2 {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = issue;
  }

  /**
   * @name issuesPartialUpdate
   * @request PATCH:/repos/{owner}/{repo}/issues/{number}
   * @description Edit an issue. Issue owners and users with push access can edit an issue.
   */
  export namespace IssuesPartialUpdate {
    export type RequestQuery = {};
    export type RequestBody = issue;
    export type ResponseBody = issue;
  }

  /**
   * @name issuesCommentsDetail
   * @request GET:/repos/{owner}/{repo}/issues/{number}/comments
   * @description List comments on an issue.
   * @originalName issuesCommentsDetail
   * @duplicate
   */
  export namespace IssuesCommentsDetail3 {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = issuesComments;
  }

  /**
   * @name issuesCommentsCreate
   * @request POST:/repos/{owner}/{repo}/issues/{number}/comments
   * @description Create a comment.
   */
  export namespace IssuesCommentsCreate {
    export type RequestQuery = {};
    export type RequestBody = commentBody;
    export type ResponseBody = issuesComment;
  }

  /**
   * @name issuesEventsDetail
   * @request GET:/repos/{owner}/{repo}/issues/{number}/events
   * @description List events for an issue.
   * @originalName issuesEventsDetail
   * @duplicate
   */
  export namespace IssuesEventsDetail3 {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = issueEvents;
  }

  /**
   * @name issuesLabelsDelete
   * @request DELETE:/repos/{owner}/{repo}/issues/{number}/labels
   * @description Remove all labels from an issue.
   */
  export namespace IssuesLabelsDelete {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name issuesLabelsDetail
   * @request GET:/repos/{owner}/{repo}/issues/{number}/labels
   * @description List labels on an issue.
   */
  export namespace IssuesLabelsDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = labels;
  }

  /**
   * @name issuesLabelsCreate
   * @request POST:/repos/{owner}/{repo}/issues/{number}/labels
   * @description Add labels to an issue.
   */
  export namespace IssuesLabelsCreate {
    export type RequestQuery = {};
    export type RequestBody = emailsPost;
    export type ResponseBody = label;
  }

  /**
   * @name issuesLabelsUpdate
   * @request PUT:/repos/{owner}/{repo}/issues/{number}/labels
   * @description Replace all labels for an issue. Sending an empty array ([]) will remove all Labels from the Issue.
   */
  export namespace IssuesLabelsUpdate {
    export type RequestQuery = {};
    export type RequestBody = emailsPost;
    export type ResponseBody = label;
  }

  /**
   * @name issuesLabelsDelete
   * @request DELETE:/repos/{owner}/{repo}/issues/{number}/labels/{name}
   * @description Remove a label from an issue.
   * @originalName issuesLabelsDelete
   * @duplicate
   */
  export namespace IssuesLabelsDelete2 {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name keysDetail
   * @request GET:/repos/{owner}/{repo}/keys
   * @description Get list of keys.
   */
  export namespace KeysDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = keys;
  }

  /**
   * @name keysCreate
   * @request POST:/repos/{owner}/{repo}/keys
   * @description Create a key.
   */
  export namespace KeysCreate {
    export type RequestQuery = {};
    export type RequestBody = UserKeysPost;
    export type ResponseBody = UserKeysKeyId;
  }

  /**
   * @name keysDelete
   * @request DELETE:/repos/{owner}/{repo}/keys/{keyId}
   * @description Delete a key.
   */
  export namespace KeysDelete {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name keysDetail
   * @request GET:/repos/{owner}/{repo}/keys/{keyId}
   * @description Get a key
   * @originalName keysDetail
   * @duplicate
   */
  export namespace KeysDetail2 {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = UserKeysKeyId;
  }

  /**
   * @name labelsDetail
   * @request GET:/repos/{owner}/{repo}/labels
   * @description List all labels for this repository.
   */
  export namespace LabelsDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = labels;
  }

  /**
   * @name labelsCreate
   * @request POST:/repos/{owner}/{repo}/labels
   * @description Create a label.
   */
  export namespace LabelsCreate {
    export type RequestQuery = {};
    export type RequestBody = emailsPost;
    export type ResponseBody = label;
  }

  /**
   * @name labelsDelete
   * @request DELETE:/repos/{owner}/{repo}/labels/{name}
   * @description Delete a label.
   */
  export namespace LabelsDelete {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name labelsDetail
   * @request GET:/repos/{owner}/{repo}/labels/{name}
   * @description Get a single label.
   * @originalName labelsDetail
   * @duplicate
   */
  export namespace LabelsDetail2 {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = label;
  }

  /**
   * @name labelsPartialUpdate
   * @request PATCH:/repos/{owner}/{repo}/labels/{name}
   * @description Update a label.
   */
  export namespace LabelsPartialUpdate {
    export type RequestQuery = {};
    export type RequestBody = emailsPost;
    export type ResponseBody = label;
  }

  /**
   * @name languagesDetail
   * @request GET:/repos/{owner}/{repo}/languages
   * @description List languages. List languages for the specified repository. The value on the right of a language is the number of bytes of code written in that language.
   */
  export namespace LanguagesDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = languages;
  }

  /**
   * @name mergesCreate
   * @request POST:/repos/{owner}/{repo}/merges
   * @description Perform a merge.
   */
  export namespace MergesCreate {
    export type RequestQuery = {};
    export type RequestBody = mergesBody;
    export type ResponseBody = mergesSuccessful;
  }

  /**
   * @name milestonesDetail
   * @request GET:/repos/{owner}/{repo}/milestones
   * @description List milestones for a repository.
   */
  export namespace MilestonesDetail {
    export type RequestQuery = { state?: "open" | "closed"; direction?: string; sort?: "due_date" | "completeness" };
    export type RequestBody = never;
    export type ResponseBody = milestone;
  }

  /**
   * @name milestonesCreate
   * @request POST:/repos/{owner}/{repo}/milestones
   * @description Create a milestone.
   */
  export namespace MilestonesCreate {
    export type RequestQuery = {};
    export type RequestBody = milestoneUpdate;
    export type ResponseBody = milestone;
  }

  /**
   * @name milestonesDelete
   * @request DELETE:/repos/{owner}/{repo}/milestones/{number}
   * @description Delete a milestone.
   */
  export namespace MilestonesDelete {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name milestonesDetail
   * @request GET:/repos/{owner}/{repo}/milestones/{number}
   * @description Get a single milestone.
   * @originalName milestonesDetail
   * @duplicate
   */
  export namespace MilestonesDetail2 {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = milestone;
  }

  /**
   * @name milestonesPartialUpdate
   * @request PATCH:/repos/{owner}/{repo}/milestones/{number}
   * @description Update a milestone.
   */
  export namespace MilestonesPartialUpdate {
    export type RequestQuery = {};
    export type RequestBody = milestoneUpdate;
    export type ResponseBody = milestone;
  }

  /**
   * @name milestonesLabelsDetail
   * @request GET:/repos/{owner}/{repo}/milestones/{number}/labels
   * @description Get labels for every issue in a milestone.
   */
  export namespace MilestonesLabelsDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = labels;
  }

  /**
   * @name notificationsDetail
   * @request GET:/repos/{owner}/{repo}/notifications
   * @description List your notifications in a repository List all notifications for the current user.
   */
  export namespace NotificationsDetail {
    export type RequestQuery = { all?: boolean; participating?: boolean; since?: string };
    export type RequestBody = never;
    export type ResponseBody = notifications;
  }

  /**
   * @name notificationsUpdate
   * @request PUT:/repos/{owner}/{repo}/notifications
   * @description Mark notifications as read in a repository. Marking all notifications in a repository as "read" removes them from the default view on GitHub.com.
   */
  export namespace NotificationsUpdate {
    export type RequestQuery = {};
    export type RequestBody = notificationMarkRead;
    export type ResponseBody = any;
  }

  /**
   * @name pullsDetail
   * @request GET:/repos/{owner}/{repo}/pulls
   * @description List pull requests.
   */
  export namespace PullsDetail {
    export type RequestQuery = { state?: "open" | "closed"; head?: string; base?: string };
    export type RequestBody = never;
    export type ResponseBody = pulls;
  }

  /**
   * @name pullsCreate
   * @request POST:/repos/{owner}/{repo}/pulls
   * @description Create a pull request.
   */
  export namespace PullsCreate {
    export type RequestQuery = {};
    export type RequestBody = pullsPost;
    export type ResponseBody = pulls;
  }

  /**
   * @name pullsCommentsDetail
   * @request GET:/repos/{owner}/{repo}/pulls/comments
   * @description List comments in a repository. By default, Review Comments are ordered by ascending ID.
   */
  export namespace PullsCommentsDetail {
    export type RequestQuery = { direction?: string; sort?: "created" | "updated"; since?: string };
    export type RequestBody = never;
    export type ResponseBody = issuesComments;
  }

  /**
   * @name pullsCommentsDelete
   * @request DELETE:/repos/{owner}/{repo}/pulls/comments/{commentId}
   * @description Delete a comment.
   */
  export namespace PullsCommentsDelete {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name pullsCommentsDetail
   * @request GET:/repos/{owner}/{repo}/pulls/comments/{commentId}
   * @description Get a single comment.
   * @originalName pullsCommentsDetail
   * @duplicate
   */
  export namespace PullsCommentsDetail2 {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = pullsComment;
  }

  /**
   * @name pullsCommentsPartialUpdate
   * @request PATCH:/repos/{owner}/{repo}/pulls/comments/{commentId}
   * @description Edit a comment.
   */
  export namespace PullsCommentsPartialUpdate {
    export type RequestQuery = {};
    export type RequestBody = commentBody;
    export type ResponseBody = pullsComment;
  }

  /**
   * @name pullsDetail
   * @request GET:/repos/{owner}/{repo}/pulls/{number}
   * @description Get a single pull request.
   * @originalName pullsDetail
   * @duplicate
   */
  export namespace PullsDetail2 {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = pullRequest;
  }

  /**
   * @name pullsPartialUpdate
   * @request PATCH:/repos/{owner}/{repo}/pulls/{number}
   * @description Update a pull request.
   */
  export namespace PullsPartialUpdate {
    export type RequestQuery = {};
    export type RequestBody = pullUpdate;
    export type ResponseBody = repo;
  }

  /**
   * @name pullsCommentsDetail
   * @request GET:/repos/{owner}/{repo}/pulls/{number}/comments
   * @description List comments on a pull request.
   * @originalName pullsCommentsDetail
   * @duplicate
   */
  export namespace PullsCommentsDetail3 {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = pullsComment;
  }

  /**
   * @name pullsCommentsCreate
   * @request POST:/repos/{owner}/{repo}/pulls/{number}/comments
   * @description Create a comment. #TODO Alternative input ( http://developer.github.com/v3/pulls/comments/ ) description: | Alternative Input. Instead of passing commit_id, path, and position you can reply to an existing Pull Request Comment like this: body Required string in_reply_to Required number - Comment id to reply to.
   */
  export namespace PullsCommentsCreate {
    export type RequestQuery = {};
    export type RequestBody = pullsCommentPost;
    export type ResponseBody = pullsComment;
  }

  /**
   * @name pullsCommitsDetail
   * @request GET:/repos/{owner}/{repo}/pulls/{number}/commits
   * @description List commits on a pull request.
   */
  export namespace PullsCommitsDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = commits;
  }

  /**
   * @name pullsFilesDetail
   * @request GET:/repos/{owner}/{repo}/pulls/{number}/files
   * @description List pull requests files.
   */
  export namespace PullsFilesDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = pulls;
  }

  /**
   * @name pullsMergeDetail
   * @request GET:/repos/{owner}/{repo}/pulls/{number}/merge
   * @description Get if a pull request has been merged.
   */
  export namespace PullsMergeDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name pullsMergeUpdate
   * @request PUT:/repos/{owner}/{repo}/pulls/{number}/merge
   * @description Merge a pull request (Merge Button's)
   */
  export namespace PullsMergeUpdate {
    export type RequestQuery = {};
    export type RequestBody = mergePullBody;
    export type ResponseBody = merge;
  }

  /**
   * @name readmeDetail
   * @request GET:/repos/{owner}/{repo}/readme
   * @description Get the README. This method returns the preferred README for a repository.
   */
  export namespace ReadmeDetail {
    export type RequestQuery = { ref?: string };
    export type RequestBody = never;
    export type ResponseBody = ContentsPath;
  }

  /**
   * @name releasesDetail
   * @request GET:/repos/{owner}/{repo}/releases
   * @description Users with push access to the repository will receive all releases (i.e., published releases and draft releases). Users with pull access will receive published releases only
   */
  export namespace ReleasesDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = releases;
  }

  /**
   * @name releasesCreate
   * @request POST:/repos/{owner}/{repo}/releases
   * @description Create a release Users with push access to the repository can create a release.
   */
  export namespace ReleasesCreate {
    export type RequestQuery = {};
    export type RequestBody = ReleaseCreate;
    export type ResponseBody = release;
  }

  /**
   * @name releasesAssetsDelete
   * @request DELETE:/repos/{owner}/{repo}/releases/assets/{id}
   * @description Delete a release asset
   */
  export namespace ReleasesAssetsDelete {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name releasesAssetsDetail
   * @request GET:/repos/{owner}/{repo}/releases/assets/{id}
   * @description Get a single release asset
   */
  export namespace ReleasesAssetsDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = asset;
  }

  /**
   * @name releasesAssetsPartialUpdate
   * @request PATCH:/repos/{owner}/{repo}/releases/assets/{id}
   * @description Edit a release asset Users with push access to the repository can edit a release asset.
   */
  export namespace ReleasesAssetsPartialUpdate {
    export type RequestQuery = {};
    export type RequestBody = assetPatch;
    export type ResponseBody = asset;
  }

  /**
   * @name releasesDelete
   * @request DELETE:/repos/{owner}/{repo}/releases/{id}
   * @description Users with push access to the repository can delete a release.
   */
  export namespace ReleasesDelete {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name releasesDetail
   * @request GET:/repos/{owner}/{repo}/releases/{id}
   * @description Get a single release
   * @originalName releasesDetail
   * @duplicate
   */
  export namespace ReleasesDetail2 {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = release;
  }

  /**
   * @name releasesPartialUpdate
   * @request PATCH:/repos/{owner}/{repo}/releases/{id}
   * @description Users with push access to the repository can edit a release
   */
  export namespace ReleasesPartialUpdate {
    export type RequestQuery = {};
    export type RequestBody = ReleaseCreate;
    export type ResponseBody = release;
  }

  /**
   * @name releasesAssetsDetail
   * @request GET:/repos/{owner}/{repo}/releases/{id}/assets
   * @description List assets for a release
   * @originalName releasesAssetsDetail
   * @duplicate
   */
  export namespace ReleasesAssetsDetail2 {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = assets;
  }

  /**
   * @name stargazersDetail
   * @request GET:/repos/{owner}/{repo}/stargazers
   * @description List Stargazers.
   */
  export namespace StargazersDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = users;
  }

  /**
   * @name statsCodeFrequencyDetail
   * @request GET:/repos/{owner}/{repo}/stats/code_frequency
   * @description Get the number of additions and deletions per week. Returns a weekly aggregate of the number of additions and deletions pushed to a repository.
   */
  export namespace StatsCodeFrequencyDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = codeFrequencyStats;
  }

  /**
   * @name statsCommitActivityDetail
   * @request GET:/repos/{owner}/{repo}/stats/commit_activity
   * @description Get the last year of commit activity data. Returns the last year of commit activity grouped by week. The days array is a group of commits per day, starting on Sunday.
   */
  export namespace StatsCommitActivityDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = commitActivityStats;
  }

  /**
   * @name statsContributorsDetail
   * @request GET:/repos/{owner}/{repo}/stats/contributors
   * @description Get contributors list with additions, deletions, and commit counts.
   */
  export namespace StatsContributorsDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = contributorsStats;
  }

  /**
   * @name statsParticipationDetail
   * @request GET:/repos/{owner}/{repo}/stats/participation
   * @description Get the weekly commit count for the repo owner and everyone else.
   */
  export namespace StatsParticipationDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = participationStats;
  }

  /**
   * @name statsPunchCardDetail
   * @request GET:/repos/{owner}/{repo}/stats/punch_card
   * @description Get the number of commits per hour in each day. Each array contains the day number, hour number, and number of commits 0-6 Sunday - Saturday 0-23 Hour of day Number of commits For example, [2, 14, 25] indicates that there were 25 total commits, during the 2.00pm hour on Tuesdays. All times are based on the time zone of individual commits.
   */
  export namespace StatsPunchCardDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = codeFrequencyStats;
  }

  /**
   * @name statusesDetail
   * @request GET:/repos/{owner}/{repo}/statuses/{ref}
   * @description List Statuses for a specific Ref.
   */
  export namespace StatusesDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = ref;
  }

  /**
   * @name statusesCreate
   * @request POST:/repos/{owner}/{repo}/statuses/{ref}
   * @description Create a Status.
   */
  export namespace StatusesCreate {
    export type RequestQuery = {};
    export type RequestBody = headBranch;
    export type ResponseBody = ref;
  }

  /**
   * @name subscribersDetail
   * @request GET:/repos/{owner}/{repo}/subscribers
   * @description List watchers.
   */
  export namespace SubscribersDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = users;
  }

  /**
   * @name subscriptionDelete
   * @request DELETE:/repos/{owner}/{repo}/subscription
   * @description Delete a Repository Subscription.
   */
  export namespace SubscriptionDelete {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name subscriptionDetail
   * @request GET:/repos/{owner}/{repo}/subscription
   * @description Get a Repository Subscription.
   */
  export namespace SubscriptionDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = subscription;
  }

  /**
   * @name subscriptionUpdate
   * @request PUT:/repos/{owner}/{repo}/subscription
   * @description Set a Repository Subscription
   */
  export namespace SubscriptionUpdate {
    export type RequestQuery = {};
    export type RequestBody = subscriptionBody;
    export type ResponseBody = subscription;
  }

  /**
   * @name tagsDetail
   * @request GET:/repos/{owner}/{repo}/tags
   * @description Get list of tags.
   */
  export namespace TagsDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = tags;
  }

  /**
   * @name teamsDetail
   * @request GET:/repos/{owner}/{repo}/teams
   * @description Get list of teams
   */
  export namespace TeamsDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = teams;
  }

  /**
   * @name watchersDetail
   * @request GET:/repos/{owner}/{repo}/watchers
   * @description List Stargazers. New implementation.
   */
  export namespace WatchersDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = users;
  }

  /**
   * @name reposDetail
   * @request GET:/repos/{owner}/{repo}/{archive_format}/{path}
   * @description Get archive link. This method will return a 302 to a URL to download a tarball or zipball archive for a repository. Please make sure your HTTP framework is configured to follow redirects or you will need to use the Location header to make a second GET request. Note: For private repositories, these links are temporary and expire quickly.
   * @originalName reposDetail
   * @duplicate
   */
  export namespace ReposDetail2 {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }
}
export namespace repositories {
  /**
   * @name repositoriesList
   * @request GET:/repositories
   * @description List all public repositories. This provides a dump of every public repository, in the order that they were created. Note: Pagination is powered exclusively by the since parameter. is the Link header to get the URL for the next page of repositories.
   */
  export namespace RepositoriesList {
    export type RequestQuery = { since?: string };
    export type RequestBody = never;
    export type ResponseBody = repos;
  }
}
export namespace search {
  /**
   * @name codeList
   * @request GET:/search/code
   * @description Search code.
   */
  export namespace CodeList {
    export type RequestQuery = { order?: "desc" | "asc"; q: string; sort?: "indexed" };
    export type RequestBody = never;
    export type ResponseBody = SearchCode;
  }

  /**
   * @name issuesList
   * @request GET:/search/issues
   * @description Find issues by state and keyword. (This method returns up to 100 results per page.)
   */
  export namespace IssuesList {
    export type RequestQuery = { order?: "desc" | "asc"; q: string; sort?: "updated" | "created" | "comments" };
    export type RequestBody = never;
    export type ResponseBody = SearchIssues;
  }

  /**
   * @name repositoriesList
   * @request GET:/search/repositories
   * @description Search repositories.
   */
  export namespace RepositoriesList {
    export type RequestQuery = { order?: "desc" | "asc"; q: string; sort?: "stars" | "forks" | "updated" };
    export type RequestBody = never;
    export type ResponseBody = SearchRepositories;
  }

  /**
   * @name usersList
   * @request GET:/search/users
   * @description Search users.
   */
  export namespace UsersList {
    export type RequestQuery = { order?: "desc" | "asc"; q: string; sort?: "followers" | "repositories" | "joined" };
    export type RequestBody = never;
    export type ResponseBody = SearchUsers;
  }
}
export namespace teams {
  /**
   * @name teamsDelete
   * @request DELETE:/teams/{teamId}
   * @description Delete team. In order to delete a team, the authenticated user must be an owner of the org that the team is associated with.
   */
  export namespace TeamsDelete {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name teamsDetail
   * @request GET:/teams/{teamId}
   * @description Get team.
   */
  export namespace TeamsDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = team;
  }

  /**
   * @name teamsPartialUpdate
   * @request PATCH:/teams/{teamId}
   * @description Edit team. In order to edit a team, the authenticated user must be an owner of the org that the team is associated with.
   */
  export namespace TeamsPartialUpdate {
    export type RequestQuery = {};
    export type RequestBody = editTeam;
    export type ResponseBody = team;
  }

  /**
   * @name membersDetail
   * @request GET:/teams/{teamId}/members
   * @description List team members. In order to list members in a team, the authenticated user must be a member of the team.
   */
  export namespace MembersDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = users;
  }

  /**
   * @name membersDelete
   * @request DELETE:/teams/{teamId}/members/{username}
   * @description The "Remove team member" API is deprecated and is scheduled for removal in the next major version of the API. We recommend using the Remove team membership API instead. It allows you to remove both active and pending memberships. Remove team member. In order to remove a user from a team, the authenticated user must have 'admin' permissions to the team or be an owner of the org that the team is associated with. NOTE This does not delete the user, it just remove them from the team.
   */
  export namespace MembersDelete {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name membersDetail
   * @request GET:/teams/{teamId}/members/{username}
   * @description The "Get team member" API is deprecated and is scheduled for removal in the next major version of the API. We recommend using the Get team membership API instead. It allows you to get both active and pending memberships. Get team member. In order to get if a user is a member of a team, the authenticated user mus be a member of the team.
   * @originalName membersDetail
   * @duplicate
   */
  export namespace MembersDetail2 {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name membersUpdate
   * @request PUT:/teams/{teamId}/members/{username}
   * @description The API (described below) is deprecated and is scheduled for removal in the next major version of the API. We recommend using the Add team membership API instead. It allows you to invite new organization members to your teams. Add team member. In order to add a user to a team, the authenticated user must have 'admin' permissions to the team or be an owner of the org that the team is associated with.
   */
  export namespace MembersUpdate {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name membershipsDelete
   * @request DELETE:/teams/{teamId}/memberships/{username}
   * @description Remove team membership. In order to remove a membership between a user and a team, the authenticated user must have 'admin' permissions to the team or be an owner of the organization that the team is associated with. NOTE: This does not delete the user, it just removes their membership from the team.
   */
  export namespace MembershipsDelete {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name membershipsDetail
   * @request GET:/teams/{teamId}/memberships/{username}
   * @description Get team membership. In order to get a user's membership with a team, the authenticated user must be a member of the team or an owner of the team's organization.
   */
  export namespace MembershipsDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = teamMembership;
  }

  /**
   * @name membershipsUpdate
   * @request PUT:/teams/{teamId}/memberships/{username}
   * @description Add team membership. In order to add a membership between a user and a team, the authenticated user must have 'admin' permissions to the team or be an owner of the organization that the team is associated with. If the user is already a part of the team's organization (meaning they're on at least one other team in the organization), this endpoint will add the user to the team. If the user is completely unaffiliated with the team's organization (meaning they're on none of the organization's teams), this endpoint will send an invitation to the user via email. This newly-created membership will be in the 'pending' state until the user accepts the invitation, at which point the membership will transition to the 'active' state and the user will be added as a member of the team.
   */
  export namespace MembershipsUpdate {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = teamMembership;
  }

  /**
   * @name reposDetail
   * @request GET:/teams/{teamId}/repos
   * @description List team repos
   */
  export namespace ReposDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = teamRepos;
  }

  /**
   * @name reposDelete
   * @request DELETE:/teams/{teamId}/repos/{owner}/{repo}
   * @description In order to remove a repository from a team, the authenticated user must be an owner of the org that the team is associated with. NOTE: This does not delete the repository, it just removes it from the team.
   */
  export namespace ReposDelete {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name reposDetail
   * @request GET:/teams/{teamId}/repos/{owner}/{repo}
   * @description Check if a team manages a repository
   * @originalName reposDetail
   * @duplicate
   */
  export namespace ReposDetail2 {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name reposUpdate
   * @request PUT:/teams/{teamId}/repos/{owner}/{repo}
   * @description In order to add a repository to a team, the authenticated user must be an owner of the org that the team is associated with. Also, the repository must be owned by the organization, or a direct fork of a repository owned by the organization.
   */
  export namespace ReposUpdate {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }
}
export namespace user {
  /**
   * @name userList
   * @request GET:/user
   * @description Get the authenticated user.
   */
  export namespace UserList {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = user;
  }

  /**
   * @name userPartialUpdate
   * @request PATCH:/user
   * @description Update the authenticated user.
   */
  export namespace UserPartialUpdate {
    export type RequestQuery = {};
    export type RequestBody = UserUpdate;
    export type ResponseBody = user;
  }

  /**
   * @name emailsDelete
   * @request DELETE:/user/emails
   * @description Delete email address(es). You can include a single email address or an array of addresses.
   */
  export namespace EmailsDelete {
    export type RequestQuery = {};
    export type RequestBody = UserEmails;
    export type ResponseBody = any;
  }

  /**
   * @name emailsList
   * @request GET:/user/emails
   * @description List email addresses for a user. In the final version of the API, this method will return an array of hashes with extended information for each email address indicating if the address has been verified and if it's primary email address for GitHub. Until API v3 is finalized, use the application/vnd.github.v3 media type to get other response format.
   */
  export namespace EmailsList {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = UserEmails;
  }

  /**
   * @name emailsCreate
   * @request POST:/user/emails
   * @description Add email address(es). You can post a single email address or an array of addresses.
   */
  export namespace EmailsCreate {
    export type RequestQuery = {};
    export type RequestBody = emailsPost;
    export type ResponseBody = any;
  }

  /**
   * @name followersList
   * @request GET:/user/followers
   * @description List the authenticated user's followers
   */
  export namespace FollowersList {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = users;
  }

  /**
   * @name followingList
   * @request GET:/user/following
   * @description List who the authenticated user is following.
   */
  export namespace FollowingList {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = users;
  }

  /**
   * @name followingDelete
   * @request DELETE:/user/following/{username}
   * @description Unfollow a user. Unfollowing a user requires the user to be logged in and authenticated with basic auth or OAuth with the user:follow scope.
   */
  export namespace FollowingDelete {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name followingDetail
   * @request GET:/user/following/{username}
   * @description Check if you are following a user.
   */
  export namespace FollowingDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name followingUpdate
   * @request PUT:/user/following/{username}
   * @description Follow a user. Following a user requires the user to be logged in and authenticated with basic auth or OAuth with the user:follow scope.
   */
  export namespace FollowingUpdate {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name issuesList
   * @request GET:/user/issues
   * @description List issues. List all issues across owned and member repositories for the authenticated user.
   */
  export namespace IssuesList {
    export type RequestQuery = {
      filter: "assigned" | "created" | "mentioned" | "subscribed" | "all";
      state: "open" | "closed";
      labels: string;
      sort: "created" | "updated" | "comments";
      direction: "asc" | "desc";
      since?: string;
    };
    export type RequestBody = never;
    export type ResponseBody = issues;
  }

  /**
   * @name keysList
   * @request GET:/user/keys
   * @description List your public keys. Lists the current user's keys. Management of public keys via the API requires that you are authenticated through basic auth, or OAuth with the 'user', 'write:public_key' scopes.
   */
  export namespace KeysList {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = gitignore;
  }

  /**
   * @name keysCreate
   * @request POST:/user/keys
   * @description Create a public key.
   */
  export namespace KeysCreate {
    export type RequestQuery = {};
    export type RequestBody = UserKeysPost;
    export type ResponseBody = UserKeysKeyId;
  }

  /**
   * @name keysDelete
   * @request DELETE:/user/keys/{keyId}
   * @description Delete a public key. Removes a public key. Requires that you are authenticated via Basic Auth or via OAuth with at least admin:public_key scope.
   */
  export namespace KeysDelete {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name keysDetail
   * @request GET:/user/keys/{keyId}
   * @description Get a single public key.
   */
  export namespace KeysDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = UserKeysKeyId;
  }

  /**
   * @name orgsList
   * @request GET:/user/orgs
   * @description List public and private organizations for the authenticated user.
   */
  export namespace OrgsList {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = gitignore;
  }

  /**
   * @name reposList
   * @request GET:/user/repos
   * @description List repositories for the authenticated user. Note that this does not include repositories owned by organizations which the user can access. You can lis user organizations and list organization repositories separately.
   */
  export namespace ReposList {
    export type RequestQuery = { type?: "all" | "public" | "private" | "forks" | "sources" | "member" };
    export type RequestBody = never;
    export type ResponseBody = repos;
  }

  /**
   * @name reposCreate
   * @request POST:/user/repos
   * @description Create a new repository for the authenticated user. OAuth users must supply repo scope.
   */
  export namespace ReposCreate {
    export type RequestQuery = {};
    export type RequestBody = postRepo;
    export type ResponseBody = repos;
  }

  /**
   * @name starredList
   * @request GET:/user/starred
   * @description List repositories being starred by the authenticated user.
   */
  export namespace StarredList {
    export type RequestQuery = { direction?: string; sort?: "created" | "updated" };
    export type RequestBody = never;
    export type ResponseBody = gitignore;
  }

  /**
   * @name starredDelete
   * @request DELETE:/user/starred/{owner}/{repo}
   * @description Unstar a repository
   */
  export namespace StarredDelete {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name starredDetail
   * @request GET:/user/starred/{owner}/{repo}
   * @description Check if you are starring a repository.
   */
  export namespace StarredDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name starredUpdate
   * @request PUT:/user/starred/{owner}/{repo}
   * @description Star a repository.
   */
  export namespace StarredUpdate {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name subscriptionsList
   * @request GET:/user/subscriptions
   * @description List repositories being watched by the authenticated user.
   */
  export namespace SubscriptionsList {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = repos;
  }

  /**
   * @name subscriptionsDelete
   * @request DELETE:/user/subscriptions/{owner}/{repo}
   * @description Stop watching a repository
   */
  export namespace SubscriptionsDelete {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name subscriptionsDetail
   * @request GET:/user/subscriptions/{owner}/{repo}
   * @description Check if you are watching a repository.
   */
  export namespace SubscriptionsDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name subscriptionsUpdate
   * @request PUT:/user/subscriptions/{owner}/{repo}
   * @description Watch a repository.
   */
  export namespace SubscriptionsUpdate {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name teamsList
   * @request GET:/user/teams
   * @description List all of the teams across all of the organizations to which the authenticated user belongs. This method requires user or repo scope when authenticating via OAuth.
   */
  export namespace TeamsList {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = TeamsList;
  }
}
export namespace users {
  /**
   * @name usersList
   * @request GET:/users
   * @description Get all users. This provides a dump of every user, in the order that they signed up for GitHub. Note: Pagination is powered exclusively by the since parameter. Use the Link header to get the URL for the next page of users.
   */
  export namespace UsersList {
    export type RequestQuery = { since?: number };
    export type RequestBody = never;
    export type ResponseBody = users;
  }

  /**
   * @name usersDetail
   * @request GET:/users/{username}
   * @description Get a single user.
   */
  export namespace UsersDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = user;
  }

  /**
   * @name eventsDetail
   * @request GET:/users/{username}/events
   * @description If you are authenticated as the given user, you will see your private events. Otherwise, you'll only see public events.
   */
  export namespace EventsDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name eventsOrgsDetail
   * @request GET:/users/{username}/events/orgs/{org}
   * @description This is the user's organization dashboard. You must be authenticated as the user to view this.
   */
  export namespace EventsOrgsDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name followersDetail
   * @request GET:/users/{username}/followers
   * @description List a user's followers
   */
  export namespace FollowersDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = users;
  }

  /**
   * @name followingDetail
   * @request GET:/users/{username}/following/{targetUser}
   * @description Check if one user follows another.
   */
  export namespace FollowingDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name gistsDetail
   * @request GET:/users/{username}/gists
   * @description List a users gists.
   */
  export namespace GistsDetail {
    export type RequestQuery = { since?: string };
    export type RequestBody = never;
    export type ResponseBody = gists;
  }

  /**
   * @name keysDetail
   * @request GET:/users/{username}/keys
   * @description List public keys for a user. Lists the verified public keys for a user. This is accessible by anyone.
   */
  export namespace KeysDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = gitignore;
  }

  /**
   * @name orgsDetail
   * @request GET:/users/{username}/orgs
   * @description List all public organizations for a user.
   */
  export namespace OrgsDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = gitignore;
  }

  /**
   * @name receivedEventsDetail
   * @request GET:/users/{username}/received_events
   * @description These are events that you'll only see public events.
   */
  export namespace ReceivedEventsDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name receivedEventsPublicDetail
   * @request GET:/users/{username}/received_events/public
   * @description List public events that a user has received
   */
  export namespace ReceivedEventsPublicDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name reposDetail
   * @request GET:/users/{username}/repos
   * @description List public repositories for the specified user.
   */
  export namespace ReposDetail {
    export type RequestQuery = { type?: "all" | "public" | "private" | "forks" | "sources" | "member" };
    export type RequestBody = never;
    export type ResponseBody = repos;
  }

  /**
   * @name starredDetail
   * @request GET:/users/{username}/starred
   * @description List repositories being starred by a user.
   */
  export namespace StarredDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }

  /**
   * @name subscriptionsDetail
   * @request GET:/users/{username}/subscriptions
   * @description List repositories being watched by a user.
   */
  export namespace SubscriptionsDetail {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }
}

export type RequestParams = Omit<RequestInit, "body" | "method"> & {
  secure?: boolean;
};

export type RequestQueryParamsType = Record<string, string | string[] | number | number[] | boolean | undefined>;

type ApiConfig<SecurityDataType> = {
  baseUrl?: string;
  baseApiParams?: RequestParams;
  securityWorker?: (securityData: SecurityDataType) => RequestParams;
};

const enum BodyType {
  Json,
}

class HttpClient<SecurityDataType> {
  public baseUrl: string = "https://api.github.com/";
  private securityData: SecurityDataType = null as any;
  private securityWorker: ApiConfig<SecurityDataType>["securityWorker"] = (() => {}) as any;

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor({ baseUrl, baseApiParams, securityWorker }: ApiConfig<SecurityDataType> = {}) {
    this.baseUrl = baseUrl || this.baseUrl;
    this.baseApiParams = baseApiParams || this.baseApiParams;
    this.securityWorker = securityWorker || this.securityWorker;
  }

  public setSecurityData = (data: SecurityDataType) => {
    this.securityData = data;
  };

  private addQueryParam(query: RequestQueryParamsType, key: string) {
    return (
      encodeURIComponent(key) +
      "=" +
      encodeURIComponent(Array.isArray(query[key]) ? (query[key] as any).join(",") : query[key])
    );
  }

  protected addQueryParams(query?: RequestQueryParamsType): string {
    const fixedQuery = query || {};
    const keys = Object.keys(fixedQuery).filter((key) => "undefined" !== typeof fixedQuery[key]);
    return keys.length === 0 ? "" : `?${keys.map((key) => this.addQueryParam(fixedQuery, key)).join("&")}`;
  }

  private bodyFormatters: Record<BodyType, (input: object) => any> = {
    [BodyType.Json]: JSON.stringify,
  };

  private mergeRequestOptions(params: RequestParams, securityParams?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params,
      ...(securityParams || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params.headers || {}),
        ...((securityParams && securityParams.headers) || {}),
      },
    };
  }

  private safeParseResponse = <T = any, E = any>(response: Response): Promise<T> =>
    response
      .json()
      .then((data) => data)
      .catch((e) => response.text);

  public request = <T = any, E = any>(
    path: string,
    method: string,
    { secure, ...params }: RequestParams = {},
    body?: any,
    bodyType?: BodyType,
    secureByDefault?: boolean,
  ): Promise<T> =>
    fetch(`${this.baseUrl}${path}`, {
      // @ts-ignore
      ...this.mergeRequestOptions(params, (secureByDefault || secure) && this.securityWorker(this.securityData)),
      method,
      body: body ? this.bodyFormatters[bodyType || BodyType.Json](body) : null,
    }).then(async (response) => {
      const data = await this.safeParseResponse<T, E>(response);
      if (!response.ok) throw data;
      return data;
    });
}

/**
 * @title GitHub
 * @version v3
 * @baseUrl https://api.github.com/
 * Powerful collaboration, code review, and code management for open source and private projects.
 */
export class Api<SecurityDataType = any> extends HttpClient<SecurityDataType> {
  emojis = {
    /**
     * @name emojisList
     * @request GET:/emojis
     * @description Lists all the emojis available to use on GitHub.
     */
    emojisList: (params?: RequestParams) => this.request<emojis, any>(`/emojis`, "GET", params),
  };
  events = {
    /**
     * @name eventsList
     * @request GET:/events
     * @description List public events.
     */
    eventsList: (params?: RequestParams) => this.request<events, any>(`/events`, "GET", params),
  };
  feeds = {
    /**
     * @name feedsList
     * @request GET:/feeds
     * @description List Feeds. GitHub provides several timeline resources in Atom format. The Feeds API lists all the feeds available to the authenticating user.
     */
    feedsList: (params?: RequestParams) => this.request<feeds, any>(`/feeds`, "GET", params),
  };
  gists = {
    /**
     * @name gistsList
     * @request GET:/gists
     * @description List the authenticated user's gists or if called anonymously, this will return all public gists.
     */
    gistsList: (query?: { since?: string }, params?: RequestParams) =>
      this.request<gists, any>(`/gists${this.addQueryParams(query)}`, "GET", params),

    /**
     * @name gistsCreate
     * @request POST:/gists
     * @description Create a gist.
     */
    gistsCreate: (body: postGist, params?: RequestParams) => this.request<gist, any>(`/gists`, "POST", params, body),

    /**
     * @name publicList
     * @request GET:/gists/public
     * @description List all public gists.
     */
    publicList: (query?: { since?: string }, params?: RequestParams) =>
      this.request<gists, any>(`/gists/public${this.addQueryParams(query)}`, "GET", params),

    /**
     * @name starredList
     * @request GET:/gists/starred
     * @description List the authenticated user's starred gists.
     */
    starredList: (query?: { since?: string }, params?: RequestParams) =>
      this.request<gists, any>(`/gists/starred${this.addQueryParams(query)}`, "GET", params),

    /**
     * @name gistsDelete
     * @request DELETE:/gists/{id}
     * @description Delete a gist.
     */
    gistsDelete: (id: number, params?: RequestParams) => this.request<any, any>(`/gists/${id}`, "DELETE", params),

    /**
     * @name gistsDetail
     * @request GET:/gists/{id}
     * @description Get a single gist.
     */
    gistsDetail: (id: number, params?: RequestParams) => this.request<gist, any>(`/gists/${id}`, "GET", params),

    /**
     * @name gistsPartialUpdate
     * @request PATCH:/gists/{id}
     * @description Edit a gist.
     */
    gistsPartialUpdate: (id: number, body: patchGist, params?: RequestParams) =>
      this.request<gist, any>(`/gists/${id}`, "PATCH", params, body),

    /**
     * @name commentsDetail
     * @request GET:/gists/{id}/comments
     * @description List comments on a gist.
     */
    commentsDetail: (id: number, params?: RequestParams) =>
      this.request<comments, any>(`/gists/${id}/comments`, "GET", params),

    /**
     * @name commentsCreate
     * @request POST:/gists/{id}/comments
     * @description Create a commen
     */
    commentsCreate: (id: number, body: commentBody, params?: RequestParams) =>
      this.request<comment, any>(`/gists/${id}/comments`, "POST", params, body),

    /**
     * @name commentsDelete
     * @request DELETE:/gists/{id}/comments/{commentId}
     * @description Delete a comment.
     */
    commentsDelete: (id: number, commentId: number, params?: RequestParams) =>
      this.request<any, any>(`/gists/${id}/comments/${commentId}`, "DELETE", params),

    /**
     * @name commentsDetail
     * @request GET:/gists/{id}/comments/{commentId}
     * @description Get a single comment.
     * @originalName commentsDetail
     * @duplicate
     */
    commentsDetail2: (id: number, commentId: number, params?: RequestParams) =>
      this.request<comment, any>(`/gists/${id}/comments/${commentId}`, "GET", params),

    /**
     * @name commentsPartialUpdate
     * @request PATCH:/gists/{id}/comments/{commentId}
     * @description Edit a comment.
     */
    commentsPartialUpdate: (id: number, commentId: number, body: comment, params?: RequestParams) =>
      this.request<comment, any>(`/gists/${id}/comments/${commentId}`, "PATCH", params, body),

    /**
     * @name forksCreate
     * @request POST:/gists/{id}/forks
     * @description Fork a gist.
     */
    forksCreate: (id: number, params?: RequestParams) => this.request<any, any>(`/gists/${id}/forks`, "POST", params),

    /**
     * @name starDelete
     * @request DELETE:/gists/{id}/star
     * @description Unstar a gist.
     */
    starDelete: (id: number, params?: RequestParams) => this.request<any, any>(`/gists/${id}/star`, "DELETE", params),

    /**
     * @name starDetail
     * @request GET:/gists/{id}/star
     * @description Check if a gist is starred.
     */
    starDetail: (id: number, params?: RequestParams) => this.request<any, any>(`/gists/${id}/star`, "GET", params),

    /**
     * @name starUpdate
     * @request PUT:/gists/{id}/star
     * @description Star a gist.
     */
    starUpdate: (id: number, params?: RequestParams) => this.request<any, any>(`/gists/${id}/star`, "PUT", params),
  };
  gitignore = {
    /**
     * @name templatesList
     * @request GET:/gitignore/templates
     * @description Listing available templates. List all templates available to pass as an option when creating a repository.
     */
    templatesList: (params?: RequestParams) => this.request<gitignore, any>(`/gitignore/templates`, "GET", params),

    /**
     * @name templatesDetail
     * @request GET:/gitignore/templates/{language}
     * @description Get a single template.
     */
    templatesDetail: (language: string, params?: RequestParams) =>
      this.request<GitignoreLang, any>(`/gitignore/templates/${language}`, "GET", params),
  };
  issues = {
    /**
     * @name issuesList
     * @request GET:/issues
     * @description List issues. List all issues across all the authenticated user's visible repositories.
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
      params?: RequestParams,
    ) => this.request<issues, any>(`/issues${this.addQueryParams(query)}`, "GET", params),
  };
  legacy = {
    /**
     * @name issuesSearchDetail
     * @request GET:/legacy/issues/search/{owner}/{repository}/{state}/{keyword}
     * @description Find issues by state and keyword.
     */
    issuesSearchDetail: (
      keyword: string,
      state: "open" | "closed",
      owner: string,
      repository: string,
      params?: RequestParams,
    ) =>
      this.request<SearchIssuesByKeyword, any>(
        `/legacy/issues/search/${owner}/${repository}/${state}/${keyword}`,
        "GET",
        params,
      ),

    /**
     * @name reposSearchDetail
     * @request GET:/legacy/repos/search/{keyword}
     * @description Find repositories by keyword. Note, this legacy method does not follow the v3 pagination pattern. This method returns up to 100 results per page and pages can be fetched using the start_page parameter.
     */
    reposSearchDetail: (
      keyword: string,
      query?: { order?: "desc" | "asc"; language?: string; start_page?: string; sort?: "updated" | "stars" | "forks" },
      params?: RequestParams,
    ) =>
      this.request<SearchRepositoriesByKeyword, any>(
        `/legacy/repos/search/${keyword}${this.addQueryParams(query)}`,
        "GET",
        params,
      ),

    /**
     * @name userEmailDetail
     * @request GET:/legacy/user/email/{email}
     * @description This API call is added for compatibility reasons only.
     */
    userEmailDetail: (email: string, params?: RequestParams) =>
      this.request<SearchUserByEmail, any>(`/legacy/user/email/${email}`, "GET", params),

    /**
     * @name userSearchDetail
     * @request GET:/legacy/user/search/{keyword}
     * @description Find users by keyword.
     */
    userSearchDetail: (
      keyword: string,
      query?: { order?: "desc" | "asc"; start_page?: string; sort?: "updated" | "stars" | "forks" },
      params?: RequestParams,
    ) =>
      this.request<SearchUsersByKeyword, any>(
        `/legacy/user/search/${keyword}${this.addQueryParams(query)}`,
        "GET",
        params,
      ),
  };
  markdown = {
    /**
     * @name markdownCreate
     * @request POST:/markdown
     * @description Render an arbitrary Markdown document
     */
    markdownCreate: (body: markdown, params?: RequestParams) =>
      this.request<any, any>(`/markdown`, "POST", params, body),

    /**
     * @name postMarkdown
     * @request POST:/markdown/raw
     * @description Render a Markdown document in raw mode
     */
    postMarkdown: (params?: RequestParams) => this.request<any, any>(`/markdown/raw`, "POST", params),
  };
  meta = {
    /**
     * @name metaList
     * @request GET:/meta
     * @description This gives some information about GitHub.com, the service.
     */
    metaList: (params?: RequestParams) => this.request<meta, any>(`/meta`, "GET", params),
  };
  networks = {
    /**
     * @name eventsDetail
     * @request GET:/networks/{owner}/{repo}/events
     * @description List public events for a network of repositories.
     */
    eventsDetail: (owner: string, repo: string, params?: RequestParams) =>
      this.request<events, any>(`/networks/${owner}/${repo}/events`, "GET", params),
  };
  notifications = {
    /**
     * @name notificationsList
     * @request GET:/notifications
     * @description List your notifications. List all notifications for the current user, grouped by repository.
     */
    notificationsList: (query?: { all?: boolean; participating?: boolean; since?: string }, params?: RequestParams) =>
      this.request<notifications, any>(`/notifications${this.addQueryParams(query)}`, "GET", params),

    /**
     * @name notificationsUpdate
     * @request PUT:/notifications
     * @description Mark as read. Marking a notification as "read" removes it from the default view on GitHub.com.
     */
    notificationsUpdate: (body: notificationMarkRead, params?: RequestParams) =>
      this.request<any, any>(`/notifications`, "PUT", params, body),

    /**
     * @name threadsDetail
     * @request GET:/notifications/threads/{id}
     * @description View a single thread.
     */
    threadsDetail: (id: number, params?: RequestParams) =>
      this.request<notifications, any>(`/notifications/threads/${id}`, "GET", params),

    /**
     * @name threadsPartialUpdate
     * @request PATCH:/notifications/threads/{id}
     * @description Mark a thread as read
     */
    threadsPartialUpdate: (id: number, params?: RequestParams) =>
      this.request<any, any>(`/notifications/threads/${id}`, "PATCH", params),

    /**
     * @name threadsSubscriptionDelete
     * @request DELETE:/notifications/threads/{id}/subscription
     * @description Delete a Thread Subscription.
     */
    threadsSubscriptionDelete: (id: number, params?: RequestParams) =>
      this.request<any, any>(`/notifications/threads/${id}/subscription`, "DELETE", params),

    /**
     * @name threadsSubscriptionDetail
     * @request GET:/notifications/threads/{id}/subscription
     * @description Get a Thread Subscription.
     */
    threadsSubscriptionDetail: (id: number, params?: RequestParams) =>
      this.request<subscription, any>(`/notifications/threads/${id}/subscription`, "GET", params),

    /**
     * @name threadsSubscriptionUpdate
     * @request PUT:/notifications/threads/{id}/subscription
     * @description Set a Thread Subscription. This lets you subscribe to a thread, or ignore it. Subscribing to a thread is unnecessary if the user is already subscribed to the repository. Ignoring a thread will mute all future notifications (until you comment or get @mentioned).
     */
    threadsSubscriptionUpdate: (id: number, body: putSubscription, params?: RequestParams) =>
      this.request<subscription, any>(`/notifications/threads/${id}/subscription`, "PUT", params, body),
  };
  orgs = {
    /**
     * @name orgsDetail
     * @request GET:/orgs/{org}
     * @description Get an Organization.
     */
    orgsDetail: (org: string, params?: RequestParams) => this.request<organization, any>(`/orgs/${org}`, "GET", params),

    /**
     * @name orgsPartialUpdate
     * @request PATCH:/orgs/{org}
     * @description Edit an Organization.
     */
    orgsPartialUpdate: (org: string, body: patchOrg, params?: RequestParams) =>
      this.request<organization, any>(`/orgs/${org}`, "PATCH", params, body),

    /**
     * @name eventsDetail
     * @request GET:/orgs/{org}/events
     * @description List public events for an organization.
     */
    eventsDetail: (org: string, params?: RequestParams) =>
      this.request<events, any>(`/orgs/${org}/events`, "GET", params),

    /**
     * @name issuesDetail
     * @request GET:/orgs/{org}/issues
     * @description List issues. List all issues for a given organization for the authenticated user.
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
      params?: RequestParams,
    ) => this.request<issues, any>(`/orgs/${org}/issues${this.addQueryParams(query)}`, "GET", params),

    /**
     * @name membersDetail
     * @request GET:/orgs/{org}/members
     * @description Members list. List all users who are members of an organization. A member is a user tha belongs to at least 1 team in the organization. If the authenticated user is also an owner of this organization then both concealed and public members will be returned. If the requester is not an owner of the organization the query will be redirected to the public members list.
     */
    membersDetail: (org: string, params?: RequestParams) =>
      this.request<users, any>(`/orgs/${org}/members`, "GET", params),

    /**
     * @name membersDelete
     * @request DELETE:/orgs/{org}/members/{username}
     * @description Remove a member. Removing a user from this list will remove them from all teams and they will no longer have any access to the organization's repositories.
     */
    membersDelete: (org: string, username: string, params?: RequestParams) =>
      this.request<any, any>(`/orgs/${org}/members/${username}`, "DELETE", params),

    /**
     * @name membersDetail
     * @request GET:/orgs/{org}/members/{username}
     * @description Check if a user is, publicly or privately, a member of the organization.
     * @originalName membersDetail
     * @duplicate
     */
    membersDetail2: (org: string, username: string, params?: RequestParams) =>
      this.request<any, any>(`/orgs/${org}/members/${username}`, "GET", params),

    /**
     * @name publicMembersDetail
     * @request GET:/orgs/{org}/public_members
     * @description Public members list. Members of an organization can choose to have their membership publicized or not.
     */
    publicMembersDetail: (org: string, params?: RequestParams) =>
      this.request<users, any>(`/orgs/${org}/public_members`, "GET", params),

    /**
     * @name publicMembersDelete
     * @request DELETE:/orgs/{org}/public_members/{username}
     * @description Conceal a user's membership.
     */
    publicMembersDelete: (org: string, username: string, params?: RequestParams) =>
      this.request<any, any>(`/orgs/${org}/public_members/${username}`, "DELETE", params),

    /**
     * @name publicMembersDetail
     * @request GET:/orgs/{org}/public_members/{username}
     * @description Check public membership.
     * @originalName publicMembersDetail
     * @duplicate
     */
    publicMembersDetail2: (org: string, username: string, params?: RequestParams) =>
      this.request<any, any>(`/orgs/${org}/public_members/${username}`, "GET", params),

    /**
     * @name publicMembersUpdate
     * @request PUT:/orgs/{org}/public_members/{username}
     * @description Publicize a user's membership.
     */
    publicMembersUpdate: (org: string, username: string, params?: RequestParams) =>
      this.request<any, any>(`/orgs/${org}/public_members/${username}`, "PUT", params),

    /**
     * @name reposDetail
     * @request GET:/orgs/{org}/repos
     * @description List repositories for the specified org.
     */
    reposDetail: (
      org: string,
      query?: { type?: "all" | "public" | "private" | "forks" | "sources" | "member" },
      params?: RequestParams,
    ) => this.request<repos, any>(`/orgs/${org}/repos${this.addQueryParams(query)}`, "GET", params),

    /**
     * @name reposCreate
     * @request POST:/orgs/{org}/repos
     * @description Create a new repository for the authenticated user. OAuth users must supply repo scope.
     */
    reposCreate: (org: string, body: postRepo, params?: RequestParams) =>
      this.request<repos, any>(`/orgs/${org}/repos`, "POST", params, body),

    /**
     * @name teamsDetail
     * @request GET:/orgs/{org}/teams
     * @description List teams.
     */
    teamsDetail: (org: string, params?: RequestParams) => this.request<teams, any>(`/orgs/${org}/teams`, "GET", params),

    /**
     * @name teamsCreate
     * @request POST:/orgs/{org}/teams
     * @description Create team. In order to create a team, the authenticated user must be an owner of organization.
     */
    teamsCreate: (org: string, body: orgTeamsPost, params?: RequestParams) =>
      this.request<team, any>(`/orgs/${org}/teams`, "POST", params, body),
  };
  rateLimit = {
    /**
     * @name rateLimitList
     * @request GET:/rate_limit
     * @description Get your current rate limit status Note: Accessing this endpoint does not count against your rate limit.
     */
    rateLimitList: (params?: RequestParams) => this.request<rate_limit, any>(`/rate_limit`, "GET", params),
  };
  repos = {
    /**
     * @name reposDelete
     * @request DELETE:/repos/{owner}/{repo}
     * @description Delete a Repository. Deleting a repository requires admin access. If OAuth is used, the delete_repo scope is required.
     */
    reposDelete: (owner: string, repo: string, params?: RequestParams) =>
      this.request<any, any>(`/repos/${owner}/${repo}`, "DELETE", params),

    /**
     * @name reposDetail
     * @request GET:/repos/{owner}/{repo}
     * @description Get repository.
     */
    reposDetail: (owner: string, repo: string, params?: RequestParams) =>
      this.request<repo, any>(`/repos/${owner}/${repo}`, "GET", params),

    /**
     * @name reposPartialUpdate
     * @request PATCH:/repos/{owner}/{repo}
     * @description Edit repository.
     */
    reposPartialUpdate: (owner: string, repo: string, body: repoEdit, params?: RequestParams) =>
      this.request<repo, any>(`/repos/${owner}/${repo}`, "PATCH", params, body),

    /**
     * @name assigneesDetail
     * @request GET:/repos/{owner}/{repo}/assignees
     * @description List assignees. This call lists all the available assignees (owner + collaborators) to which issues may be assigned.
     */
    assigneesDetail: (owner: string, repo: string, params?: RequestParams) =>
      this.request<assignees, any>(`/repos/${owner}/${repo}/assignees`, "GET", params),

    /**
     * @name assigneesDetail
     * @request GET:/repos/{owner}/{repo}/assignees/{assignee}
     * @description Check assignee. You may also check to see if a particular user is an assignee for a repository.
     * @originalName assigneesDetail
     * @duplicate
     */
    assigneesDetail2: (owner: string, repo: string, assignee: string, params?: RequestParams) =>
      this.request<any, any>(`/repos/${owner}/${repo}/assignees/${assignee}`, "GET", params),

    /**
     * @name branchesDetail
     * @request GET:/repos/{owner}/{repo}/branches
     * @description Get list of branches
     */
    branchesDetail: (owner: string, repo: string, params?: RequestParams) =>
      this.request<branches, any>(`/repos/${owner}/${repo}/branches`, "GET", params),

    /**
     * @name branchesDetail
     * @request GET:/repos/{owner}/{repo}/branches/{branch}
     * @description Get Branch
     * @originalName branchesDetail
     * @duplicate
     */
    branchesDetail2: (owner: string, repo: string, branch: string, params?: RequestParams) =>
      this.request<branch, any>(`/repos/${owner}/${repo}/branches/${branch}`, "GET", params),

    /**
     * @name collaboratorsDetail
     * @request GET:/repos/{owner}/{repo}/collaborators
     * @description List. When authenticating as an organization owner of an organization-owned repository, all organization owners are included in the list of collaborators. Otherwise, only users with access to the repository are returned in the collaborators list.
     */
    collaboratorsDetail: (owner: string, repo: string, params?: RequestParams) =>
      this.request<users, any>(`/repos/${owner}/${repo}/collaborators`, "GET", params),

    /**
     * @name collaboratorsDelete
     * @request DELETE:/repos/{owner}/{repo}/collaborators/{user}
     * @description Remove collaborator.
     */
    collaboratorsDelete: (owner: string, repo: string, user: string, params?: RequestParams) =>
      this.request<any, any>(`/repos/${owner}/${repo}/collaborators/${user}`, "DELETE", params),

    /**
     * @name collaboratorsDetail
     * @request GET:/repos/{owner}/{repo}/collaborators/{user}
     * @description Check if user is a collaborator
     * @originalName collaboratorsDetail
     * @duplicate
     */
    collaboratorsDetail2: (owner: string, repo: string, user: string, params?: RequestParams) =>
      this.request<any, any>(`/repos/${owner}/${repo}/collaborators/${user}`, "GET", params),

    /**
     * @name collaboratorsUpdate
     * @request PUT:/repos/{owner}/{repo}/collaborators/{user}
     * @description Add collaborator.
     */
    collaboratorsUpdate: (owner: string, repo: string, user: string, params?: RequestParams) =>
      this.request<any, any>(`/repos/${owner}/${repo}/collaborators/${user}`, "PUT", params),

    /**
     * @name commentsDetail
     * @request GET:/repos/{owner}/{repo}/comments
     * @description List commit comments for a repository. Comments are ordered by ascending ID.
     */
    commentsDetail: (owner: string, repo: string, params?: RequestParams) =>
      this.request<repoComments, any>(`/repos/${owner}/${repo}/comments`, "GET", params),

    /**
     * @name commentsDelete
     * @request DELETE:/repos/{owner}/{repo}/comments/{commentId}
     * @description Delete a commit comment
     */
    commentsDelete: (owner: string, repo: string, commentId: number, params?: RequestParams) =>
      this.request<any, any>(`/repos/${owner}/${repo}/comments/${commentId}`, "DELETE", params),

    /**
     * @name commentsDetail
     * @request GET:/repos/{owner}/{repo}/comments/{commentId}
     * @description Get a single commit comment.
     * @originalName commentsDetail
     * @duplicate
     */
    commentsDetail2: (owner: string, repo: string, commentId: number, params?: RequestParams) =>
      this.request<commitComment, any>(`/repos/${owner}/${repo}/comments/${commentId}`, "GET", params),

    /**
     * @name commentsPartialUpdate
     * @request PATCH:/repos/{owner}/{repo}/comments/{commentId}
     * @description Update a commit comment.
     */
    commentsPartialUpdate: (
      owner: string,
      repo: string,
      commentId: number,
      body: commentBody,
      params?: RequestParams,
    ) => this.request<commitComment, any>(`/repos/${owner}/${repo}/comments/${commentId}`, "PATCH", params, body),

    /**
     * @name commitsDetail
     * @request GET:/repos/{owner}/{repo}/commits
     * @description List commits on a repository.
     */
    commitsDetail: (
      owner: string,
      repo: string,
      query?: { since?: string; sha?: string; path?: string; author?: string; until?: string },
      params?: RequestParams,
    ) => this.request<commits, any>(`/repos/${owner}/${repo}/commits${this.addQueryParams(query)}`, "GET", params),

    /**
     * @name commitsStatusDetail
     * @request GET:/repos/{owner}/{repo}/commits/{ref}/status
     * @description Get the combined Status for a specific Ref The Combined status endpoint is currently available for developers to preview. During the preview period, the API may change without advance notice. Please see the blog post for full details. To access this endpoint during the preview period, you must provide a custom media type in the Accept header: application/vnd.github.she-hulk-preview+json
     */
    commitsStatusDetail: (owner: string, repo: string, ref: string, params?: RequestParams) =>
      this.request<refStatus, any>(`/repos/${owner}/${repo}/commits/${ref}/status`, "GET", params),

    /**
     * @name commitsDetail
     * @request GET:/repos/{owner}/{repo}/commits/{shaCode}
     * @description Get a single commit.
     * @originalName commitsDetail
     * @duplicate
     */
    commitsDetail2: (owner: string, repo: string, shaCode: string, params?: RequestParams) =>
      this.request<commit, any>(`/repos/${owner}/${repo}/commits/${shaCode}`, "GET", params),

    /**
     * @name commitsCommentsDetail
     * @request GET:/repos/{owner}/{repo}/commits/{shaCode}/comments
     * @description List comments for a single commitList comments for a single commit.
     */
    commitsCommentsDetail: (owner: string, repo: string, shaCode: string, params?: RequestParams) =>
      this.request<repoComments, any>(`/repos/${owner}/${repo}/commits/${shaCode}/comments`, "GET", params),

    /**
     * @name commitsCommentsCreate
     * @request POST:/repos/{owner}/{repo}/commits/{shaCode}/comments
     * @description Create a commit comment.
     */
    commitsCommentsCreate: (
      owner: string,
      repo: string,
      shaCode: string,
      body: commitCommentBody,
      params?: RequestParams,
    ) => this.request<commitComment, any>(`/repos/${owner}/${repo}/commits/${shaCode}/comments`, "POST", params, body),

    /**
     * @name compareDetail
     * @request GET:/repos/{owner}/{repo}/compare/{baseId}...{headId}
     * @description Compare two commits
     */
    compareDetail: (owner: string, repo: string, baseId: string, headId: string, params?: RequestParams) =>
      this.request<CompareCommits, any>(`/repos/${owner}/${repo}/compare/${baseId}...${headId}`, "GET", params),

    /**
     * @name contentsDelete
     * @request DELETE:/repos/{owner}/{repo}/contents/{path}
     * @description Delete a file. This method deletes a file in a repository.
     */
    contentsDelete: (owner: string, repo: string, path: string, body: deleteFileBody, params?: RequestParams) =>
      this.request<deleteFile, any>(`/repos/${owner}/${repo}/contents/${path}`, "DELETE", params, body),

    /**
     * @name contentsDetail
     * @request GET:/repos/{owner}/{repo}/contents/{path}
     * @description Get contents. This method returns the contents of a file or directory in a repository. Files and symlinks support a custom media type for getting the raw content. Directories and submodules do not support custom media types. Note: This API supports files up to 1 megabyte in size. Here can be many outcomes. For details see "http://developer.github.com/v3/repos/contents/"
     */
    contentsDetail: (
      owner: string,
      repo: string,
      path: string,
      query?: { path?: string; ref?: string },
      params?: RequestParams,
    ) =>
      this.request<ContentsPath, any>(
        `/repos/${owner}/${repo}/contents/${path}${this.addQueryParams(query)}`,
        "GET",
        params,
      ),

    /**
     * @name contentsUpdate
     * @request PUT:/repos/{owner}/{repo}/contents/{path}
     * @description Create a file.
     */
    contentsUpdate: (owner: string, repo: string, path: string, body: createFileBody, params?: RequestParams) =>
      this.request<createFile, any>(`/repos/${owner}/${repo}/contents/${path}`, "PUT", params, body),

    /**
     * @name contributorsDetail
     * @request GET:/repos/{owner}/{repo}/contributors
     * @description Get list of contributors.
     */
    contributorsDetail: (owner: string, repo: string, query: { anon: string }, params?: RequestParams) =>
      this.request<users, any>(`/repos/${owner}/${repo}/contributors${this.addQueryParams(query)}`, "GET", params),

    /**
     * @name deploymentsDetail
     * @request GET:/repos/{owner}/{repo}/deployments
     * @description Users with pull access can view deployments for a repository
     */
    deploymentsDetail: (owner: string, repo: string, params?: RequestParams) =>
      this.request<RepoDeployments, any>(`/repos/${owner}/${repo}/deployments`, "GET", params),

    /**
     * @name deploymentsCreate
     * @request POST:/repos/{owner}/{repo}/deployments
     * @description Users with push access can create a deployment for a given ref
     */
    deploymentsCreate: (owner: string, repo: string, body: deployment, params?: RequestParams) =>
      this.request<DeploymentResp, any>(`/repos/${owner}/${repo}/deployments`, "POST", params, body),

    /**
     * @name deploymentsStatusesDetail
     * @request GET:/repos/{owner}/{repo}/deployments/{id}/statuses
     * @description Users with pull access can view deployment statuses for a deployment
     */
    deploymentsStatusesDetail: (owner: string, repo: string, id: number, params?: RequestParams) =>
      this.request<DeploymentStatuses, any>(`/repos/${owner}/${repo}/deployments/${id}/statuses`, "GET", params),

    /**
     * @name deploymentsStatusesCreate
     * @request POST:/repos/{owner}/{repo}/deployments/{id}/statuses
     * @description Create a Deployment Status Users with push access can create deployment statuses for a given deployment:
     */
    deploymentsStatusesCreate: (
      owner: string,
      repo: string,
      id: number,
      body: DeploymentStatusesCreate,
      params?: RequestParams,
    ) => this.request<any, any>(`/repos/${owner}/${repo}/deployments/${id}/statuses`, "POST", params, body),

    /**
     * @name downloadsDetail
     * @request GET:/repos/{owner}/{repo}/downloads
     * @description Deprecated. List downloads for a repository.
     */
    downloadsDetail: (owner: string, repo: string, params?: RequestParams) =>
      this.request<downloads, any>(`/repos/${owner}/${repo}/downloads`, "GET", params),

    /**
     * @name downloadsDelete
     * @request DELETE:/repos/{owner}/{repo}/downloads/{downloadId}
     * @description Deprecated. Delete a download.
     */
    downloadsDelete: (owner: string, repo: string, downloadId: number, params?: RequestParams) =>
      this.request<any, any>(`/repos/${owner}/${repo}/downloads/${downloadId}`, "DELETE", params),

    /**
     * @name downloadsDetail
     * @request GET:/repos/{owner}/{repo}/downloads/{downloadId}
     * @description Deprecated. Get a single download.
     * @originalName downloadsDetail
     * @duplicate
     */
    downloadsDetail2: (owner: string, repo: string, downloadId: number, params?: RequestParams) =>
      this.request<download, any>(`/repos/${owner}/${repo}/downloads/${downloadId}`, "GET", params),

    /**
     * @name eventsDetail
     * @request GET:/repos/{owner}/{repo}/events
     * @description Get list of repository events.
     */
    eventsDetail: (owner: string, repo: string, params?: RequestParams) =>
      this.request<events, any>(`/repos/${owner}/${repo}/events`, "GET", params),

    /**
     * @name forksDetail
     * @request GET:/repos/{owner}/{repo}/forks
     * @description List forks.
     */
    forksDetail: (
      owner: string,
      repo: string,
      query?: { sort?: "newes" | "oldes" | "watchers" },
      params?: RequestParams,
    ) => this.request<forks, any>(`/repos/${owner}/${repo}/forks${this.addQueryParams(query)}`, "GET", params),

    /**
     * @name forksCreate
     * @request POST:/repos/{owner}/{repo}/forks
     * @description Create a fork. Forking a Repository happens asynchronously. Therefore, you may have to wai a short period before accessing the git objects. If this takes longer than 5 minutes, be sure to contact Support.
     */
    forksCreate: (owner: string, repo: string, body: forkBody, params?: RequestParams) =>
      this.request<repo, any>(`/repos/${owner}/${repo}/forks`, "POST", params, body),

    /**
     * @name gitBlobsCreate
     * @request POST:/repos/{owner}/{repo}/git/blobs
     * @description Create a Blob.
     */
    gitBlobsCreate: (owner: string, repo: string, body: blob, params?: RequestParams) =>
      this.request<blobs, any>(`/repos/${owner}/${repo}/git/blobs`, "POST", params, body),

    /**
     * @name gitBlobsDetail
     * @request GET:/repos/{owner}/{repo}/git/blobs/{shaCode}
     * @description Get a Blob. Since blobs can be any arbitrary binary data, the input and responses for the blob API takes an encoding parameter that can be either utf-8 or base64. If your data cannot be losslessly sent as a UTF-8 string, you can base64 encode it.
     */
    gitBlobsDetail: (owner: string, repo: string, shaCode: string, params?: RequestParams) =>
      this.request<blob, any>(`/repos/${owner}/${repo}/git/blobs/${shaCode}`, "GET", params),

    /**
     * @name gitCommitsCreate
     * @request POST:/repos/{owner}/{repo}/git/commits
     * @description Create a Commit.
     */
    gitCommitsCreate: (owner: string, repo: string, body: repoCommitBody, params?: RequestParams) =>
      this.request<gitCommit, any>(`/repos/${owner}/${repo}/git/commits`, "POST", params, body),

    /**
     * @name gitCommitsDetail
     * @request GET:/repos/{owner}/{repo}/git/commits/{shaCode}
     * @description Get a Commit.
     */
    gitCommitsDetail: (owner: string, repo: string, shaCode: string, params?: RequestParams) =>
      this.request<repoCommit, any>(`/repos/${owner}/${repo}/git/commits/${shaCode}`, "GET", params),

    /**
     * @name gitRefsDetail
     * @request GET:/repos/{owner}/{repo}/git/refs
     * @description Get all References
     */
    gitRefsDetail: (owner: string, repo: string, params?: RequestParams) =>
      this.request<refs, any>(`/repos/${owner}/${repo}/git/refs`, "GET", params),

    /**
     * @name gitRefsCreate
     * @request POST:/repos/{owner}/{repo}/git/refs
     * @description Create a Reference
     */
    gitRefsCreate: (owner: string, repo: string, body: refsBody, params?: RequestParams) =>
      this.request<headBranch, any>(`/repos/${owner}/${repo}/git/refs`, "POST", params, body),

    /**
     * @name gitRefsDelete
     * @request DELETE:/repos/{owner}/{repo}/git/refs/{ref}
     * @description Delete a Reference Example: Deleting a branch: DELETE /repos/octocat/Hello-World/git/refs/heads/feature-a Example: Deleting a tag:        DELETE /repos/octocat/Hello-World/git/refs/tags/v1.0
     */
    gitRefsDelete: (owner: string, repo: string, ref: string, params?: RequestParams) =>
      this.request<any, any>(`/repos/${owner}/${repo}/git/refs/${ref}`, "DELETE", params),

    /**
     * @name gitRefsDetail
     * @request GET:/repos/{owner}/{repo}/git/refs/{ref}
     * @description Get a Reference
     * @originalName gitRefsDetail
     * @duplicate
     */
    gitRefsDetail2: (owner: string, repo: string, ref: string, params?: RequestParams) =>
      this.request<headBranch, any>(`/repos/${owner}/${repo}/git/refs/${ref}`, "GET", params),

    /**
     * @name gitRefsPartialUpdate
     * @request PATCH:/repos/{owner}/{repo}/git/refs/{ref}
     * @description Update a Reference
     */
    gitRefsPartialUpdate: (owner: string, repo: string, ref: string, body: gitRefPatch, params?: RequestParams) =>
      this.request<headBranch, any>(`/repos/${owner}/${repo}/git/refs/${ref}`, "PATCH", params, body),

    /**
     * @name gitTagsCreate
     * @request POST:/repos/{owner}/{repo}/git/tags
     * @description Create a Tag Object. Note that creating a tag object does not create the reference that makes a tag in Git. If you want to create an annotated tag in Git, you have to do this call to create the tag object, and then create the refs/tags/[tag] reference. If you want to create a lightweight tag, you only have to create the tag reference - this call would be unnecessary.
     */
    gitTagsCreate: (owner: string, repo: string, body: tagBody, params?: RequestParams) =>
      this.request<tag, any>(`/repos/${owner}/${repo}/git/tags`, "POST", params, body),

    /**
     * @name gitTagsDetail
     * @request GET:/repos/{owner}/{repo}/git/tags/{shaCode}
     * @description Get a Tag.
     */
    gitTagsDetail: (owner: string, repo: string, shaCode: string, params?: RequestParams) =>
      this.request<tag, any>(`/repos/${owner}/${repo}/git/tags/${shaCode}`, "GET", params),

    /**
     * @name gitTreesCreate
     * @request POST:/repos/{owner}/{repo}/git/trees
     * @description Create a Tree. The tree creation API will take nested entries as well. If both a tree and a nested path modifying that tree are specified, it will overwrite the contents of that tree with the new path contents and write a new tree out.
     */
    gitTreesCreate: (owner: string, repo: string, body: tree, params?: RequestParams) =>
      this.request<trees, any>(`/repos/${owner}/${repo}/git/trees`, "POST", params, body),

    /**
     * @name gitTreesDetail
     * @request GET:/repos/{owner}/{repo}/git/trees/{shaCode}
     * @description Get a Tree.
     */
    gitTreesDetail: (
      owner: string,
      repo: string,
      shaCode: string,
      query?: { recursive?: number },
      params?: RequestParams,
    ) =>
      this.request<tree, any>(
        `/repos/${owner}/${repo}/git/trees/${shaCode}${this.addQueryParams(query)}`,
        "GET",
        params,
      ),

    /**
     * @name hooksDetail
     * @request GET:/repos/{owner}/{repo}/hooks
     * @description Get list of hooks.
     */
    hooksDetail: (owner: string, repo: string, params?: RequestParams) =>
      this.request<hook, any>(`/repos/${owner}/${repo}/hooks`, "GET", params),

    /**
     * @name hooksCreate
     * @request POST:/repos/{owner}/{repo}/hooks
     * @description Create a hook.
     */
    hooksCreate: (owner: string, repo: string, body: hookBody, params?: RequestParams) =>
      this.request<hook, any>(`/repos/${owner}/${repo}/hooks`, "POST", params, body),

    /**
     * @name hooksDelete
     * @request DELETE:/repos/{owner}/{repo}/hooks/{hookId}
     * @description Delete a hook.
     */
    hooksDelete: (owner: string, repo: string, hookId: number, params?: RequestParams) =>
      this.request<any, any>(`/repos/${owner}/${repo}/hooks/${hookId}`, "DELETE", params),

    /**
     * @name hooksDetail
     * @request GET:/repos/{owner}/{repo}/hooks/{hookId}
     * @description Get single hook.
     * @originalName hooksDetail
     * @duplicate
     */
    hooksDetail2: (owner: string, repo: string, hookId: number, params?: RequestParams) =>
      this.request<hook, any>(`/repos/${owner}/${repo}/hooks/${hookId}`, "GET", params),

    /**
     * @name hooksPartialUpdate
     * @request PATCH:/repos/{owner}/{repo}/hooks/{hookId}
     * @description Edit a hook.
     */
    hooksPartialUpdate: (owner: string, repo: string, hookId: number, body: hookBody, params?: RequestParams) =>
      this.request<hook, any>(`/repos/${owner}/${repo}/hooks/${hookId}`, "PATCH", params, body),

    /**
     * @name hooksTestsCreate
     * @request POST:/repos/{owner}/{repo}/hooks/{hookId}/tests
     * @description Test a push hook. This will trigger the hook with the latest push to the current repository if the hook is subscribed to push events. If the hook is not subscribed to push events, the server will respond with 204 but no test POST will be generated. Note: Previously /repos/:owner/:repo/hooks/:id/tes
     */
    hooksTestsCreate: (owner: string, repo: string, hookId: number, params?: RequestParams) =>
      this.request<any, any>(`/repos/${owner}/${repo}/hooks/${hookId}/tests`, "POST", params),

    /**
     * @name issuesDetail
     * @request GET:/repos/{owner}/{repo}/issues
     * @description List issues for a repository.
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
      params?: RequestParams,
    ) => this.request<issues, any>(`/repos/${owner}/${repo}/issues${this.addQueryParams(query)}`, "GET", params),

    /**
     * @name issuesCreate
     * @request POST:/repos/{owner}/{repo}/issues
     * @description Create an issue. Any user with pull access to a repository can create an issue.
     */
    issuesCreate: (owner: string, repo: string, body: issue, params?: RequestParams) =>
      this.request<issue, any>(`/repos/${owner}/${repo}/issues`, "POST", params, body),

    /**
     * @name issuesCommentsDetail
     * @request GET:/repos/{owner}/{repo}/issues/comments
     * @description List comments in a repository.
     */
    issuesCommentsDetail: (
      owner: string,
      repo: string,
      query?: { direction?: string; sort?: "created" | "updated"; since?: string },
      params?: RequestParams,
    ) =>
      this.request<issuesComments, any>(
        `/repos/${owner}/${repo}/issues/comments${this.addQueryParams(query)}`,
        "GET",
        params,
      ),

    /**
     * @name issuesCommentsDelete
     * @request DELETE:/repos/{owner}/{repo}/issues/comments/{commentId}
     * @description Delete a comment.
     */
    issuesCommentsDelete: (owner: string, repo: string, commentId: number, params?: RequestParams) =>
      this.request<any, any>(`/repos/${owner}/${repo}/issues/comments/${commentId}`, "DELETE", params),

    /**
     * @name issuesCommentsDetail
     * @request GET:/repos/{owner}/{repo}/issues/comments/{commentId}
     * @description Get a single comment.
     * @originalName issuesCommentsDetail
     * @duplicate
     */
    issuesCommentsDetail2: (owner: string, repo: string, commentId: number, params?: RequestParams) =>
      this.request<issuesComment, any>(`/repos/${owner}/${repo}/issues/comments/${commentId}`, "GET", params),

    /**
     * @name issuesCommentsPartialUpdate
     * @request PATCH:/repos/{owner}/{repo}/issues/comments/{commentId}
     * @description Edit a comment.
     */
    issuesCommentsPartialUpdate: (
      owner: string,
      repo: string,
      commentId: number,
      body: commentBody,
      params?: RequestParams,
    ) =>
      this.request<issuesComment, any>(`/repos/${owner}/${repo}/issues/comments/${commentId}`, "PATCH", params, body),

    /**
     * @name issuesEventsDetail
     * @request GET:/repos/{owner}/{repo}/issues/events
     * @description List issue events for a repository.
     */
    issuesEventsDetail: (owner: string, repo: string, params?: RequestParams) =>
      this.request<issueEvents, any>(`/repos/${owner}/${repo}/issues/events`, "GET", params),

    /**
     * @name issuesEventsDetail
     * @request GET:/repos/{owner}/{repo}/issues/events/{eventId}
     * @description Get a single event.
     * @originalName issuesEventsDetail
     * @duplicate
     */
    issuesEventsDetail2: (owner: string, repo: string, eventId: number, params?: RequestParams) =>
      this.request<issueEvent, any>(`/repos/${owner}/${repo}/issues/events/${eventId}`, "GET", params),

    /**
     * @name issuesDetail
     * @request GET:/repos/{owner}/{repo}/issues/{number}
     * @description Get a single issue
     * @originalName issuesDetail
     * @duplicate
     */
    issuesDetail2: (owner: string, repo: string, number: number, params?: RequestParams) =>
      this.request<issue, any>(`/repos/${owner}/${repo}/issues/${number}`, "GET", params),

    /**
     * @name issuesPartialUpdate
     * @request PATCH:/repos/{owner}/{repo}/issues/{number}
     * @description Edit an issue. Issue owners and users with push access can edit an issue.
     */
    issuesPartialUpdate: (owner: string, repo: string, number: number, body: issue, params?: RequestParams) =>
      this.request<issue, any>(`/repos/${owner}/${repo}/issues/${number}`, "PATCH", params, body),

    /**
     * @name issuesCommentsDetail
     * @request GET:/repos/{owner}/{repo}/issues/{number}/comments
     * @description List comments on an issue.
     * @originalName issuesCommentsDetail
     * @duplicate
     */
    issuesCommentsDetail3: (owner: string, repo: string, number: number, params?: RequestParams) =>
      this.request<issuesComments, any>(`/repos/${owner}/${repo}/issues/${number}/comments`, "GET", params),

    /**
     * @name issuesCommentsCreate
     * @request POST:/repos/{owner}/{repo}/issues/{number}/comments
     * @description Create a comment.
     */
    issuesCommentsCreate: (owner: string, repo: string, number: number, body: commentBody, params?: RequestParams) =>
      this.request<issuesComment, any>(`/repos/${owner}/${repo}/issues/${number}/comments`, "POST", params, body),

    /**
     * @name issuesEventsDetail
     * @request GET:/repos/{owner}/{repo}/issues/{number}/events
     * @description List events for an issue.
     * @originalName issuesEventsDetail
     * @duplicate
     */
    issuesEventsDetail3: (owner: string, repo: string, number: number, params?: RequestParams) =>
      this.request<issueEvents, any>(`/repos/${owner}/${repo}/issues/${number}/events`, "GET", params),

    /**
     * @name issuesLabelsDelete
     * @request DELETE:/repos/{owner}/{repo}/issues/{number}/labels
     * @description Remove all labels from an issue.
     */
    issuesLabelsDelete: (owner: string, repo: string, number: number, params?: RequestParams) =>
      this.request<any, any>(`/repos/${owner}/${repo}/issues/${number}/labels`, "DELETE", params),

    /**
     * @name issuesLabelsDetail
     * @request GET:/repos/{owner}/{repo}/issues/{number}/labels
     * @description List labels on an issue.
     */
    issuesLabelsDetail: (owner: string, repo: string, number: number, params?: RequestParams) =>
      this.request<labels, any>(`/repos/${owner}/${repo}/issues/${number}/labels`, "GET", params),

    /**
     * @name issuesLabelsCreate
     * @request POST:/repos/{owner}/{repo}/issues/{number}/labels
     * @description Add labels to an issue.
     */
    issuesLabelsCreate: (owner: string, repo: string, number: number, body: emailsPost, params?: RequestParams) =>
      this.request<label, any>(`/repos/${owner}/${repo}/issues/${number}/labels`, "POST", params, body),

    /**
     * @name issuesLabelsUpdate
     * @request PUT:/repos/{owner}/{repo}/issues/{number}/labels
     * @description Replace all labels for an issue. Sending an empty array ([]) will remove all Labels from the Issue.
     */
    issuesLabelsUpdate: (owner: string, repo: string, number: number, body: emailsPost, params?: RequestParams) =>
      this.request<label, any>(`/repos/${owner}/${repo}/issues/${number}/labels`, "PUT", params, body),

    /**
     * @name issuesLabelsDelete
     * @request DELETE:/repos/{owner}/{repo}/issues/{number}/labels/{name}
     * @description Remove a label from an issue.
     * @originalName issuesLabelsDelete
     * @duplicate
     */
    issuesLabelsDelete2: (owner: string, repo: string, number: number, name: string, params?: RequestParams) =>
      this.request<any, any>(`/repos/${owner}/${repo}/issues/${number}/labels/${name}`, "DELETE", params),

    /**
     * @name keysDetail
     * @request GET:/repos/{owner}/{repo}/keys
     * @description Get list of keys.
     */
    keysDetail: (owner: string, repo: string, params?: RequestParams) =>
      this.request<keys, any>(`/repos/${owner}/${repo}/keys`, "GET", params),

    /**
     * @name keysCreate
     * @request POST:/repos/{owner}/{repo}/keys
     * @description Create a key.
     */
    keysCreate: (owner: string, repo: string, body: UserKeysPost, params?: RequestParams) =>
      this.request<UserKeysKeyId, any>(`/repos/${owner}/${repo}/keys`, "POST", params, body),

    /**
     * @name keysDelete
     * @request DELETE:/repos/{owner}/{repo}/keys/{keyId}
     * @description Delete a key.
     */
    keysDelete: (owner: string, repo: string, keyId: number, params?: RequestParams) =>
      this.request<any, any>(`/repos/${owner}/${repo}/keys/${keyId}`, "DELETE", params),

    /**
     * @name keysDetail
     * @request GET:/repos/{owner}/{repo}/keys/{keyId}
     * @description Get a key
     * @originalName keysDetail
     * @duplicate
     */
    keysDetail2: (owner: string, repo: string, keyId: number, params?: RequestParams) =>
      this.request<UserKeysKeyId, any>(`/repos/${owner}/${repo}/keys/${keyId}`, "GET", params),

    /**
     * @name labelsDetail
     * @request GET:/repos/{owner}/{repo}/labels
     * @description List all labels for this repository.
     */
    labelsDetail: (owner: string, repo: string, params?: RequestParams) =>
      this.request<labels, any>(`/repos/${owner}/${repo}/labels`, "GET", params),

    /**
     * @name labelsCreate
     * @request POST:/repos/{owner}/{repo}/labels
     * @description Create a label.
     */
    labelsCreate: (owner: string, repo: string, body: emailsPost, params?: RequestParams) =>
      this.request<label, any>(`/repos/${owner}/${repo}/labels`, "POST", params, body),

    /**
     * @name labelsDelete
     * @request DELETE:/repos/{owner}/{repo}/labels/{name}
     * @description Delete a label.
     */
    labelsDelete: (owner: string, repo: string, name: string, params?: RequestParams) =>
      this.request<any, any>(`/repos/${owner}/${repo}/labels/${name}`, "DELETE", params),

    /**
     * @name labelsDetail
     * @request GET:/repos/{owner}/{repo}/labels/{name}
     * @description Get a single label.
     * @originalName labelsDetail
     * @duplicate
     */
    labelsDetail2: (owner: string, repo: string, name: string, params?: RequestParams) =>
      this.request<label, any>(`/repos/${owner}/${repo}/labels/${name}`, "GET", params),

    /**
     * @name labelsPartialUpdate
     * @request PATCH:/repos/{owner}/{repo}/labels/{name}
     * @description Update a label.
     */
    labelsPartialUpdate: (owner: string, repo: string, name: string, body: emailsPost, params?: RequestParams) =>
      this.request<label, any>(`/repos/${owner}/${repo}/labels/${name}`, "PATCH", params, body),

    /**
     * @name languagesDetail
     * @request GET:/repos/{owner}/{repo}/languages
     * @description List languages. List languages for the specified repository. The value on the right of a language is the number of bytes of code written in that language.
     */
    languagesDetail: (owner: string, repo: string, params?: RequestParams) =>
      this.request<languages, any>(`/repos/${owner}/${repo}/languages`, "GET", params),

    /**
     * @name mergesCreate
     * @request POST:/repos/{owner}/{repo}/merges
     * @description Perform a merge.
     */
    mergesCreate: (owner: string, repo: string, body: mergesBody, params?: RequestParams) =>
      this.request<mergesSuccessful, mergesConflict>(`/repos/${owner}/${repo}/merges`, "POST", params, body),

    /**
     * @name milestonesDetail
     * @request GET:/repos/{owner}/{repo}/milestones
     * @description List milestones for a repository.
     */
    milestonesDetail: (
      owner: string,
      repo: string,
      query?: { state?: "open" | "closed"; direction?: string; sort?: "due_date" | "completeness" },
      params?: RequestParams,
    ) => this.request<milestone, any>(`/repos/${owner}/${repo}/milestones${this.addQueryParams(query)}`, "GET", params),

    /**
     * @name milestonesCreate
     * @request POST:/repos/{owner}/{repo}/milestones
     * @description Create a milestone.
     */
    milestonesCreate: (owner: string, repo: string, body: milestoneUpdate, params?: RequestParams) =>
      this.request<milestone, any>(`/repos/${owner}/${repo}/milestones`, "POST", params, body),

    /**
     * @name milestonesDelete
     * @request DELETE:/repos/{owner}/{repo}/milestones/{number}
     * @description Delete a milestone.
     */
    milestonesDelete: (owner: string, repo: string, number: number, params?: RequestParams) =>
      this.request<any, any>(`/repos/${owner}/${repo}/milestones/${number}`, "DELETE", params),

    /**
     * @name milestonesDetail
     * @request GET:/repos/{owner}/{repo}/milestones/{number}
     * @description Get a single milestone.
     * @originalName milestonesDetail
     * @duplicate
     */
    milestonesDetail2: (owner: string, repo: string, number: number, params?: RequestParams) =>
      this.request<milestone, any>(`/repos/${owner}/${repo}/milestones/${number}`, "GET", params),

    /**
     * @name milestonesPartialUpdate
     * @request PATCH:/repos/{owner}/{repo}/milestones/{number}
     * @description Update a milestone.
     */
    milestonesPartialUpdate: (
      owner: string,
      repo: string,
      number: number,
      body: milestoneUpdate,
      params?: RequestParams,
    ) => this.request<milestone, any>(`/repos/${owner}/${repo}/milestones/${number}`, "PATCH", params, body),

    /**
     * @name milestonesLabelsDetail
     * @request GET:/repos/{owner}/{repo}/milestones/{number}/labels
     * @description Get labels for every issue in a milestone.
     */
    milestonesLabelsDetail: (owner: string, repo: string, number: number, params?: RequestParams) =>
      this.request<labels, any>(`/repos/${owner}/${repo}/milestones/${number}/labels`, "GET", params),

    /**
     * @name notificationsDetail
     * @request GET:/repos/{owner}/{repo}/notifications
     * @description List your notifications in a repository List all notifications for the current user.
     */
    notificationsDetail: (
      owner: string,
      repo: string,
      query?: { all?: boolean; participating?: boolean; since?: string },
      params?: RequestParams,
    ) =>
      this.request<notifications, any>(
        `/repos/${owner}/${repo}/notifications${this.addQueryParams(query)}`,
        "GET",
        params,
      ),

    /**
     * @name notificationsUpdate
     * @request PUT:/repos/{owner}/{repo}/notifications
     * @description Mark notifications as read in a repository. Marking all notifications in a repository as "read" removes them from the default view on GitHub.com.
     */
    notificationsUpdate: (owner: string, repo: string, body: notificationMarkRead, params?: RequestParams) =>
      this.request<any, any>(`/repos/${owner}/${repo}/notifications`, "PUT", params, body),

    /**
     * @name pullsDetail
     * @request GET:/repos/{owner}/{repo}/pulls
     * @description List pull requests.
     */
    pullsDetail: (
      owner: string,
      repo: string,
      query?: { state?: "open" | "closed"; head?: string; base?: string },
      params?: RequestParams,
    ) => this.request<pulls, any>(`/repos/${owner}/${repo}/pulls${this.addQueryParams(query)}`, "GET", params),

    /**
     * @name pullsCreate
     * @request POST:/repos/{owner}/{repo}/pulls
     * @description Create a pull request.
     */
    pullsCreate: (owner: string, repo: string, body: pullsPost, params?: RequestParams) =>
      this.request<pulls, any>(`/repos/${owner}/${repo}/pulls`, "POST", params, body),

    /**
     * @name pullsCommentsDetail
     * @request GET:/repos/{owner}/{repo}/pulls/comments
     * @description List comments in a repository. By default, Review Comments are ordered by ascending ID.
     */
    pullsCommentsDetail: (
      owner: string,
      repo: string,
      query?: { direction?: string; sort?: "created" | "updated"; since?: string },
      params?: RequestParams,
    ) =>
      this.request<issuesComments, any>(
        `/repos/${owner}/${repo}/pulls/comments${this.addQueryParams(query)}`,
        "GET",
        params,
      ),

    /**
     * @name pullsCommentsDelete
     * @request DELETE:/repos/{owner}/{repo}/pulls/comments/{commentId}
     * @description Delete a comment.
     */
    pullsCommentsDelete: (owner: string, repo: string, commentId: number, params?: RequestParams) =>
      this.request<any, any>(`/repos/${owner}/${repo}/pulls/comments/${commentId}`, "DELETE", params),

    /**
     * @name pullsCommentsDetail
     * @request GET:/repos/{owner}/{repo}/pulls/comments/{commentId}
     * @description Get a single comment.
     * @originalName pullsCommentsDetail
     * @duplicate
     */
    pullsCommentsDetail2: (owner: string, repo: string, commentId: number, params?: RequestParams) =>
      this.request<pullsComment, any>(`/repos/${owner}/${repo}/pulls/comments/${commentId}`, "GET", params),

    /**
     * @name pullsCommentsPartialUpdate
     * @request PATCH:/repos/{owner}/{repo}/pulls/comments/{commentId}
     * @description Edit a comment.
     */
    pullsCommentsPartialUpdate: (
      owner: string,
      repo: string,
      commentId: number,
      body: commentBody,
      params?: RequestParams,
    ) => this.request<pullsComment, any>(`/repos/${owner}/${repo}/pulls/comments/${commentId}`, "PATCH", params, body),

    /**
     * @name pullsDetail
     * @request GET:/repos/{owner}/{repo}/pulls/{number}
     * @description Get a single pull request.
     * @originalName pullsDetail
     * @duplicate
     */
    pullsDetail2: (owner: string, repo: string, number: number, params?: RequestParams) =>
      this.request<pullRequest, any>(`/repos/${owner}/${repo}/pulls/${number}`, "GET", params),

    /**
     * @name pullsPartialUpdate
     * @request PATCH:/repos/{owner}/{repo}/pulls/{number}
     * @description Update a pull request.
     */
    pullsPartialUpdate: (owner: string, repo: string, number: number, body: pullUpdate, params?: RequestParams) =>
      this.request<repo, any>(`/repos/${owner}/${repo}/pulls/${number}`, "PATCH", params, body),

    /**
     * @name pullsCommentsDetail
     * @request GET:/repos/{owner}/{repo}/pulls/{number}/comments
     * @description List comments on a pull request.
     * @originalName pullsCommentsDetail
     * @duplicate
     */
    pullsCommentsDetail3: (owner: string, repo: string, number: number, params?: RequestParams) =>
      this.request<pullsComment, any>(`/repos/${owner}/${repo}/pulls/${number}/comments`, "GET", params),

    /**
     * @name pullsCommentsCreate
     * @request POST:/repos/{owner}/{repo}/pulls/{number}/comments
     * @description Create a comment. #TODO Alternative input ( http://developer.github.com/v3/pulls/comments/ ) description: | Alternative Input. Instead of passing commit_id, path, and position you can reply to an existing Pull Request Comment like this: body Required string in_reply_to Required number - Comment id to reply to.
     */
    pullsCommentsCreate: (
      owner: string,
      repo: string,
      number: number,
      body: pullsCommentPost,
      params?: RequestParams,
    ) => this.request<pullsComment, any>(`/repos/${owner}/${repo}/pulls/${number}/comments`, "POST", params, body),

    /**
     * @name pullsCommitsDetail
     * @request GET:/repos/{owner}/{repo}/pulls/{number}/commits
     * @description List commits on a pull request.
     */
    pullsCommitsDetail: (owner: string, repo: string, number: number, params?: RequestParams) =>
      this.request<commits, any>(`/repos/${owner}/${repo}/pulls/${number}/commits`, "GET", params),

    /**
     * @name pullsFilesDetail
     * @request GET:/repos/{owner}/{repo}/pulls/{number}/files
     * @description List pull requests files.
     */
    pullsFilesDetail: (owner: string, repo: string, number: number, params?: RequestParams) =>
      this.request<pulls, any>(`/repos/${owner}/${repo}/pulls/${number}/files`, "GET", params),

    /**
     * @name pullsMergeDetail
     * @request GET:/repos/{owner}/{repo}/pulls/{number}/merge
     * @description Get if a pull request has been merged.
     */
    pullsMergeDetail: (owner: string, repo: string, number: number, params?: RequestParams) =>
      this.request<any, any>(`/repos/${owner}/${repo}/pulls/${number}/merge`, "GET", params),

    /**
     * @name pullsMergeUpdate
     * @request PUT:/repos/{owner}/{repo}/pulls/{number}/merge
     * @description Merge a pull request (Merge Button's)
     */
    pullsMergeUpdate: (owner: string, repo: string, number: number, body: mergePullBody, params?: RequestParams) =>
      this.request<merge, merge>(`/repos/${owner}/${repo}/pulls/${number}/merge`, "PUT", params, body),

    /**
     * @name readmeDetail
     * @request GET:/repos/{owner}/{repo}/readme
     * @description Get the README. This method returns the preferred README for a repository.
     */
    readmeDetail: (owner: string, repo: string, query?: { ref?: string }, params?: RequestParams) =>
      this.request<ContentsPath, any>(`/repos/${owner}/${repo}/readme${this.addQueryParams(query)}`, "GET", params),

    /**
     * @name releasesDetail
     * @request GET:/repos/{owner}/{repo}/releases
     * @description Users with push access to the repository will receive all releases (i.e., published releases and draft releases). Users with pull access will receive published releases only
     */
    releasesDetail: (owner: string, repo: string, params?: RequestParams) =>
      this.request<releases, any>(`/repos/${owner}/${repo}/releases`, "GET", params),

    /**
     * @name releasesCreate
     * @request POST:/repos/{owner}/{repo}/releases
     * @description Create a release Users with push access to the repository can create a release.
     */
    releasesCreate: (owner: string, repo: string, body: ReleaseCreate, params?: RequestParams) =>
      this.request<release, any>(`/repos/${owner}/${repo}/releases`, "POST", params, body),

    /**
     * @name releasesAssetsDelete
     * @request DELETE:/repos/{owner}/{repo}/releases/assets/{id}
     * @description Delete a release asset
     */
    releasesAssetsDelete: (owner: string, repo: string, id: string, params?: RequestParams) =>
      this.request<any, any>(`/repos/${owner}/${repo}/releases/assets/${id}`, "DELETE", params),

    /**
     * @name releasesAssetsDetail
     * @request GET:/repos/{owner}/{repo}/releases/assets/{id}
     * @description Get a single release asset
     */
    releasesAssetsDetail: (owner: string, repo: string, id: string, params?: RequestParams) =>
      this.request<asset, any>(`/repos/${owner}/${repo}/releases/assets/${id}`, "GET", params),

    /**
     * @name releasesAssetsPartialUpdate
     * @request PATCH:/repos/{owner}/{repo}/releases/assets/{id}
     * @description Edit a release asset Users with push access to the repository can edit a release asset.
     */
    releasesAssetsPartialUpdate: (owner: string, repo: string, id: string, body: assetPatch, params?: RequestParams) =>
      this.request<asset, any>(`/repos/${owner}/${repo}/releases/assets/${id}`, "PATCH", params, body),

    /**
     * @name releasesDelete
     * @request DELETE:/repos/{owner}/{repo}/releases/{id}
     * @description Users with push access to the repository can delete a release.
     */
    releasesDelete: (owner: string, repo: string, id: string, params?: RequestParams) =>
      this.request<any, any>(`/repos/${owner}/${repo}/releases/${id}`, "DELETE", params),

    /**
     * @name releasesDetail
     * @request GET:/repos/{owner}/{repo}/releases/{id}
     * @description Get a single release
     * @originalName releasesDetail
     * @duplicate
     */
    releasesDetail2: (owner: string, repo: string, id: string, params?: RequestParams) =>
      this.request<release, any>(`/repos/${owner}/${repo}/releases/${id}`, "GET", params),

    /**
     * @name releasesPartialUpdate
     * @request PATCH:/repos/{owner}/{repo}/releases/{id}
     * @description Users with push access to the repository can edit a release
     */
    releasesPartialUpdate: (owner: string, repo: string, id: string, body: ReleaseCreate, params?: RequestParams) =>
      this.request<release, any>(`/repos/${owner}/${repo}/releases/${id}`, "PATCH", params, body),

    /**
     * @name releasesAssetsDetail
     * @request GET:/repos/{owner}/{repo}/releases/{id}/assets
     * @description List assets for a release
     * @originalName releasesAssetsDetail
     * @duplicate
     */
    releasesAssetsDetail2: (owner: string, repo: string, id: string, params?: RequestParams) =>
      this.request<assets, any>(`/repos/${owner}/${repo}/releases/${id}/assets`, "GET", params),

    /**
     * @name stargazersDetail
     * @request GET:/repos/{owner}/{repo}/stargazers
     * @description List Stargazers.
     */
    stargazersDetail: (owner: string, repo: string, params?: RequestParams) =>
      this.request<users, any>(`/repos/${owner}/${repo}/stargazers`, "GET", params),

    /**
     * @name statsCodeFrequencyDetail
     * @request GET:/repos/{owner}/{repo}/stats/code_frequency
     * @description Get the number of additions and deletions per week. Returns a weekly aggregate of the number of additions and deletions pushed to a repository.
     */
    statsCodeFrequencyDetail: (owner: string, repo: string, params?: RequestParams) =>
      this.request<codeFrequencyStats, any>(`/repos/${owner}/${repo}/stats/code_frequency`, "GET", params),

    /**
     * @name statsCommitActivityDetail
     * @request GET:/repos/{owner}/{repo}/stats/commit_activity
     * @description Get the last year of commit activity data. Returns the last year of commit activity grouped by week. The days array is a group of commits per day, starting on Sunday.
     */
    statsCommitActivityDetail: (owner: string, repo: string, params?: RequestParams) =>
      this.request<commitActivityStats, any>(`/repos/${owner}/${repo}/stats/commit_activity`, "GET", params),

    /**
     * @name statsContributorsDetail
     * @request GET:/repos/{owner}/{repo}/stats/contributors
     * @description Get contributors list with additions, deletions, and commit counts.
     */
    statsContributorsDetail: (owner: string, repo: string, params?: RequestParams) =>
      this.request<contributorsStats, any>(`/repos/${owner}/${repo}/stats/contributors`, "GET", params),

    /**
     * @name statsParticipationDetail
     * @request GET:/repos/{owner}/{repo}/stats/participation
     * @description Get the weekly commit count for the repo owner and everyone else.
     */
    statsParticipationDetail: (owner: string, repo: string, params?: RequestParams) =>
      this.request<participationStats, any>(`/repos/${owner}/${repo}/stats/participation`, "GET", params),

    /**
     * @name statsPunchCardDetail
     * @request GET:/repos/{owner}/{repo}/stats/punch_card
     * @description Get the number of commits per hour in each day. Each array contains the day number, hour number, and number of commits 0-6 Sunday - Saturday 0-23 Hour of day Number of commits For example, [2, 14, 25] indicates that there were 25 total commits, during the 2.00pm hour on Tuesdays. All times are based on the time zone of individual commits.
     */
    statsPunchCardDetail: (owner: string, repo: string, params?: RequestParams) =>
      this.request<codeFrequencyStats, any>(`/repos/${owner}/${repo}/stats/punch_card`, "GET", params),

    /**
     * @name statusesDetail
     * @request GET:/repos/{owner}/{repo}/statuses/{ref}
     * @description List Statuses for a specific Ref.
     */
    statusesDetail: (owner: string, repo: string, ref: string, params?: RequestParams) =>
      this.request<ref, any>(`/repos/${owner}/${repo}/statuses/${ref}`, "GET", params),

    /**
     * @name statusesCreate
     * @request POST:/repos/{owner}/{repo}/statuses/{ref}
     * @description Create a Status.
     */
    statusesCreate: (owner: string, repo: string, ref: string, body: headBranch, params?: RequestParams) =>
      this.request<ref, any>(`/repos/${owner}/${repo}/statuses/${ref}`, "POST", params, body),

    /**
     * @name subscribersDetail
     * @request GET:/repos/{owner}/{repo}/subscribers
     * @description List watchers.
     */
    subscribersDetail: (owner: string, repo: string, params?: RequestParams) =>
      this.request<users, any>(`/repos/${owner}/${repo}/subscribers`, "GET", params),

    /**
     * @name subscriptionDelete
     * @request DELETE:/repos/{owner}/{repo}/subscription
     * @description Delete a Repository Subscription.
     */
    subscriptionDelete: (owner: string, repo: string, params?: RequestParams) =>
      this.request<any, any>(`/repos/${owner}/${repo}/subscription`, "DELETE", params),

    /**
     * @name subscriptionDetail
     * @request GET:/repos/{owner}/{repo}/subscription
     * @description Get a Repository Subscription.
     */
    subscriptionDetail: (owner: string, repo: string, params?: RequestParams) =>
      this.request<subscription, any>(`/repos/${owner}/${repo}/subscription`, "GET", params),

    /**
     * @name subscriptionUpdate
     * @request PUT:/repos/{owner}/{repo}/subscription
     * @description Set a Repository Subscription
     */
    subscriptionUpdate: (owner: string, repo: string, body: subscriptionBody, params?: RequestParams) =>
      this.request<subscription, any>(`/repos/${owner}/${repo}/subscription`, "PUT", params, body),

    /**
     * @name tagsDetail
     * @request GET:/repos/{owner}/{repo}/tags
     * @description Get list of tags.
     */
    tagsDetail: (owner: string, repo: string, params?: RequestParams) =>
      this.request<tags, any>(`/repos/${owner}/${repo}/tags`, "GET", params),

    /**
     * @name teamsDetail
     * @request GET:/repos/{owner}/{repo}/teams
     * @description Get list of teams
     */
    teamsDetail: (owner: string, repo: string, params?: RequestParams) =>
      this.request<teams, any>(`/repos/${owner}/${repo}/teams`, "GET", params),

    /**
     * @name watchersDetail
     * @request GET:/repos/{owner}/{repo}/watchers
     * @description List Stargazers. New implementation.
     */
    watchersDetail: (owner: string, repo: string, params?: RequestParams) =>
      this.request<users, any>(`/repos/${owner}/${repo}/watchers`, "GET", params),

    /**
     * @name reposDetail
     * @request GET:/repos/{owner}/{repo}/{archive_format}/{path}
     * @description Get archive link. This method will return a 302 to a URL to download a tarball or zipball archive for a repository. Please make sure your HTTP framework is configured to follow redirects or you will need to use the Location header to make a second GET request. Note: For private repositories, these links are temporary and expire quickly.
     * @originalName reposDetail
     * @duplicate
     */
    reposDetail2: (
      owner: string,
      repo: string,
      archive_format: "tarball" | "zipball",
      path: string,
      params?: RequestParams,
    ) => this.request<any, any>(`/repos/${owner}/${repo}/${archive_format}/${path}`, "GET", params),
  };
  repositories = {
    /**
     * @name repositoriesList
     * @request GET:/repositories
     * @description List all public repositories. This provides a dump of every public repository, in the order that they were created. Note: Pagination is powered exclusively by the since parameter. is the Link header to get the URL for the next page of repositories.
     */
    repositoriesList: (query?: { since?: string }, params?: RequestParams) =>
      this.request<repos, any>(`/repositories${this.addQueryParams(query)}`, "GET", params),
  };
  search = {
    /**
     * @name codeList
     * @request GET:/search/code
     * @description Search code.
     */
    codeList: (query: { order?: "desc" | "asc"; q: string; sort?: "indexed" }, params?: RequestParams) =>
      this.request<SearchCode, any>(`/search/code${this.addQueryParams(query)}`, "GET", params),

    /**
     * @name issuesList
     * @request GET:/search/issues
     * @description Find issues by state and keyword. (This method returns up to 100 results per page.)
     */
    issuesList: (
      query: { order?: "desc" | "asc"; q: string; sort?: "updated" | "created" | "comments" },
      params?: RequestParams,
    ) => this.request<SearchIssues, any>(`/search/issues${this.addQueryParams(query)}`, "GET", params),

    /**
     * @name repositoriesList
     * @request GET:/search/repositories
     * @description Search repositories.
     */
    repositoriesList: (
      query: { order?: "desc" | "asc"; q: string; sort?: "stars" | "forks" | "updated" },
      params?: RequestParams,
    ) => this.request<SearchRepositories, any>(`/search/repositories${this.addQueryParams(query)}`, "GET", params),

    /**
     * @name usersList
     * @request GET:/search/users
     * @description Search users.
     */
    usersList: (
      query: { order?: "desc" | "asc"; q: string; sort?: "followers" | "repositories" | "joined" },
      params?: RequestParams,
    ) => this.request<SearchUsers, any>(`/search/users${this.addQueryParams(query)}`, "GET", params),
  };
  teams = {
    /**
     * @name teamsDelete
     * @request DELETE:/teams/{teamId}
     * @description Delete team. In order to delete a team, the authenticated user must be an owner of the org that the team is associated with.
     */
    teamsDelete: (teamId: number, params?: RequestParams) =>
      this.request<any, any>(`/teams/${teamId}`, "DELETE", params),

    /**
     * @name teamsDetail
     * @request GET:/teams/{teamId}
     * @description Get team.
     */
    teamsDetail: (teamId: number, params?: RequestParams) => this.request<team, any>(`/teams/${teamId}`, "GET", params),

    /**
     * @name teamsPartialUpdate
     * @request PATCH:/teams/{teamId}
     * @description Edit team. In order to edit a team, the authenticated user must be an owner of the org that the team is associated with.
     */
    teamsPartialUpdate: (teamId: number, body: editTeam, params?: RequestParams) =>
      this.request<team, any>(`/teams/${teamId}`, "PATCH", params, body),

    /**
     * @name membersDetail
     * @request GET:/teams/{teamId}/members
     * @description List team members. In order to list members in a team, the authenticated user must be a member of the team.
     */
    membersDetail: (teamId: number, params?: RequestParams) =>
      this.request<users, any>(`/teams/${teamId}/members`, "GET", params),

    /**
     * @name membersDelete
     * @request DELETE:/teams/{teamId}/members/{username}
     * @description The "Remove team member" API is deprecated and is scheduled for removal in the next major version of the API. We recommend using the Remove team membership API instead. It allows you to remove both active and pending memberships. Remove team member. In order to remove a user from a team, the authenticated user must have 'admin' permissions to the team or be an owner of the org that the team is associated with. NOTE This does not delete the user, it just remove them from the team.
     */
    membersDelete: (teamId: number, username: string, params?: RequestParams) =>
      this.request<any, any>(`/teams/${teamId}/members/${username}`, "DELETE", params),

    /**
     * @name membersDetail
     * @request GET:/teams/{teamId}/members/{username}
     * @description The "Get team member" API is deprecated and is scheduled for removal in the next major version of the API. We recommend using the Get team membership API instead. It allows you to get both active and pending memberships. Get team member. In order to get if a user is a member of a team, the authenticated user mus be a member of the team.
     * @originalName membersDetail
     * @duplicate
     */
    membersDetail2: (teamId: number, username: string, params?: RequestParams) =>
      this.request<any, any>(`/teams/${teamId}/members/${username}`, "GET", params),

    /**
     * @name membersUpdate
     * @request PUT:/teams/{teamId}/members/{username}
     * @description The API (described below) is deprecated and is scheduled for removal in the next major version of the API. We recommend using the Add team membership API instead. It allows you to invite new organization members to your teams. Add team member. In order to add a user to a team, the authenticated user must have 'admin' permissions to the team or be an owner of the org that the team is associated with.
     */
    membersUpdate: (teamId: number, username: string, params?: RequestParams) =>
      this.request<any, organizationAsTeamMember>(`/teams/${teamId}/members/${username}`, "PUT", params),

    /**
     * @name membershipsDelete
     * @request DELETE:/teams/{teamId}/memberships/{username}
     * @description Remove team membership. In order to remove a membership between a user and a team, the authenticated user must have 'admin' permissions to the team or be an owner of the organization that the team is associated with. NOTE: This does not delete the user, it just removes their membership from the team.
     */
    membershipsDelete: (teamId: number, username: string, params?: RequestParams) =>
      this.request<any, any>(`/teams/${teamId}/memberships/${username}`, "DELETE", params),

    /**
     * @name membershipsDetail
     * @request GET:/teams/{teamId}/memberships/{username}
     * @description Get team membership. In order to get a user's membership with a team, the authenticated user must be a member of the team or an owner of the team's organization.
     */
    membershipsDetail: (teamId: number, username: string, params?: RequestParams) =>
      this.request<teamMembership, any>(`/teams/${teamId}/memberships/${username}`, "GET", params),

    /**
     * @name membershipsUpdate
     * @request PUT:/teams/{teamId}/memberships/{username}
     * @description Add team membership. In order to add a membership between a user and a team, the authenticated user must have 'admin' permissions to the team or be an owner of the organization that the team is associated with. If the user is already a part of the team's organization (meaning they're on at least one other team in the organization), this endpoint will add the user to the team. If the user is completely unaffiliated with the team's organization (meaning they're on none of the organization's teams), this endpoint will send an invitation to the user via email. This newly-created membership will be in the 'pending' state until the user accepts the invitation, at which point the membership will transition to the 'active' state and the user will be added as a member of the team.
     */
    membershipsUpdate: (teamId: number, username: string, params?: RequestParams) =>
      this.request<teamMembership, organizationAsTeamMember>(`/teams/${teamId}/memberships/${username}`, "PUT", params),

    /**
     * @name reposDetail
     * @request GET:/teams/{teamId}/repos
     * @description List team repos
     */
    reposDetail: (teamId: number, params?: RequestParams) =>
      this.request<teamRepos, any>(`/teams/${teamId}/repos`, "GET", params),

    /**
     * @name reposDelete
     * @request DELETE:/teams/{teamId}/repos/{owner}/{repo}
     * @description In order to remove a repository from a team, the authenticated user must be an owner of the org that the team is associated with. NOTE: This does not delete the repository, it just removes it from the team.
     */
    reposDelete: (teamId: number, owner: string, repo: string, params?: RequestParams) =>
      this.request<any, any>(`/teams/${teamId}/repos/${owner}/${repo}`, "DELETE", params),

    /**
     * @name reposDetail
     * @request GET:/teams/{teamId}/repos/{owner}/{repo}
     * @description Check if a team manages a repository
     * @originalName reposDetail
     * @duplicate
     */
    reposDetail2: (teamId: number, owner: string, repo: string, params?: RequestParams) =>
      this.request<any, any>(`/teams/${teamId}/repos/${owner}/${repo}`, "GET", params),

    /**
     * @name reposUpdate
     * @request PUT:/teams/{teamId}/repos/{owner}/{repo}
     * @description In order to add a repository to a team, the authenticated user must be an owner of the org that the team is associated with. Also, the repository must be owned by the organization, or a direct fork of a repository owned by the organization.
     */
    reposUpdate: (teamId: number, owner: string, repo: string, params?: RequestParams) =>
      this.request<any, any>(`/teams/${teamId}/repos/${owner}/${repo}`, "PUT", params),
  };
  user = {
    /**
     * @name userList
     * @request GET:/user
     * @description Get the authenticated user.
     */
    userList: (params?: RequestParams) => this.request<user, any>(`/user`, "GET", params),

    /**
     * @name userPartialUpdate
     * @request PATCH:/user
     * @description Update the authenticated user.
     */
    userPartialUpdate: (body: UserUpdate, params?: RequestParams) =>
      this.request<user, any>(`/user`, "PATCH", params, body),

    /**
     * @name emailsDelete
     * @request DELETE:/user/emails
     * @description Delete email address(es). You can include a single email address or an array of addresses.
     */
    emailsDelete: (body: UserEmails, params?: RequestParams) =>
      this.request<any, any>(`/user/emails`, "DELETE", params, body),

    /**
     * @name emailsList
     * @request GET:/user/emails
     * @description List email addresses for a user. In the final version of the API, this method will return an array of hashes with extended information for each email address indicating if the address has been verified and if it's primary email address for GitHub. Until API v3 is finalized, use the application/vnd.github.v3 media type to get other response format.
     */
    emailsList: (params?: RequestParams) => this.request<UserEmails, any>(`/user/emails`, "GET", params),

    /**
     * @name emailsCreate
     * @request POST:/user/emails
     * @description Add email address(es). You can post a single email address or an array of addresses.
     */
    emailsCreate: (body: emailsPost, params?: RequestParams) =>
      this.request<any, any>(`/user/emails`, "POST", params, body),

    /**
     * @name followersList
     * @request GET:/user/followers
     * @description List the authenticated user's followers
     */
    followersList: (params?: RequestParams) => this.request<users, any>(`/user/followers`, "GET", params),

    /**
     * @name followingList
     * @request GET:/user/following
     * @description List who the authenticated user is following.
     */
    followingList: (params?: RequestParams) => this.request<users, any>(`/user/following`, "GET", params),

    /**
     * @name followingDelete
     * @request DELETE:/user/following/{username}
     * @description Unfollow a user. Unfollowing a user requires the user to be logged in and authenticated with basic auth or OAuth with the user:follow scope.
     */
    followingDelete: (username: string, params?: RequestParams) =>
      this.request<any, any>(`/user/following/${username}`, "DELETE", params),

    /**
     * @name followingDetail
     * @request GET:/user/following/{username}
     * @description Check if you are following a user.
     */
    followingDetail: (username: string, params?: RequestParams) =>
      this.request<any, any>(`/user/following/${username}`, "GET", params),

    /**
     * @name followingUpdate
     * @request PUT:/user/following/{username}
     * @description Follow a user. Following a user requires the user to be logged in and authenticated with basic auth or OAuth with the user:follow scope.
     */
    followingUpdate: (username: string, params?: RequestParams) =>
      this.request<any, any>(`/user/following/${username}`, "PUT", params),

    /**
     * @name issuesList
     * @request GET:/user/issues
     * @description List issues. List all issues across owned and member repositories for the authenticated user.
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
      params?: RequestParams,
    ) => this.request<issues, any>(`/user/issues${this.addQueryParams(query)}`, "GET", params),

    /**
     * @name keysList
     * @request GET:/user/keys
     * @description List your public keys. Lists the current user's keys. Management of public keys via the API requires that you are authenticated through basic auth, or OAuth with the 'user', 'write:public_key' scopes.
     */
    keysList: (params?: RequestParams) => this.request<gitignore, any>(`/user/keys`, "GET", params),

    /**
     * @name keysCreate
     * @request POST:/user/keys
     * @description Create a public key.
     */
    keysCreate: (body: UserKeysPost, params?: RequestParams) =>
      this.request<UserKeysKeyId, any>(`/user/keys`, "POST", params, body),

    /**
     * @name keysDelete
     * @request DELETE:/user/keys/{keyId}
     * @description Delete a public key. Removes a public key. Requires that you are authenticated via Basic Auth or via OAuth with at least admin:public_key scope.
     */
    keysDelete: (keyId: number, params?: RequestParams) =>
      this.request<any, any>(`/user/keys/${keyId}`, "DELETE", params),

    /**
     * @name keysDetail
     * @request GET:/user/keys/{keyId}
     * @description Get a single public key.
     */
    keysDetail: (keyId: number, params?: RequestParams) =>
      this.request<UserKeysKeyId, any>(`/user/keys/${keyId}`, "GET", params),

    /**
     * @name orgsList
     * @request GET:/user/orgs
     * @description List public and private organizations for the authenticated user.
     */
    orgsList: (params?: RequestParams) => this.request<gitignore, any>(`/user/orgs`, "GET", params),

    /**
     * @name reposList
     * @request GET:/user/repos
     * @description List repositories for the authenticated user. Note that this does not include repositories owned by organizations which the user can access. You can lis user organizations and list organization repositories separately.
     */
    reposList: (
      query?: { type?: "all" | "public" | "private" | "forks" | "sources" | "member" },
      params?: RequestParams,
    ) => this.request<repos, any>(`/user/repos${this.addQueryParams(query)}`, "GET", params),

    /**
     * @name reposCreate
     * @request POST:/user/repos
     * @description Create a new repository for the authenticated user. OAuth users must supply repo scope.
     */
    reposCreate: (body: postRepo, params?: RequestParams) =>
      this.request<repos, any>(`/user/repos`, "POST", params, body),

    /**
     * @name starredList
     * @request GET:/user/starred
     * @description List repositories being starred by the authenticated user.
     */
    starredList: (query?: { direction?: string; sort?: "created" | "updated" }, params?: RequestParams) =>
      this.request<gitignore, any>(`/user/starred${this.addQueryParams(query)}`, "GET", params),

    /**
     * @name starredDelete
     * @request DELETE:/user/starred/{owner}/{repo}
     * @description Unstar a repository
     */
    starredDelete: (owner: string, repo: string, params?: RequestParams) =>
      this.request<any, any>(`/user/starred/${owner}/${repo}`, "DELETE", params),

    /**
     * @name starredDetail
     * @request GET:/user/starred/{owner}/{repo}
     * @description Check if you are starring a repository.
     */
    starredDetail: (owner: string, repo: string, params?: RequestParams) =>
      this.request<any, any>(`/user/starred/${owner}/${repo}`, "GET", params),

    /**
     * @name starredUpdate
     * @request PUT:/user/starred/{owner}/{repo}
     * @description Star a repository.
     */
    starredUpdate: (owner: string, repo: string, params?: RequestParams) =>
      this.request<any, any>(`/user/starred/${owner}/${repo}`, "PUT", params),

    /**
     * @name subscriptionsList
     * @request GET:/user/subscriptions
     * @description List repositories being watched by the authenticated user.
     */
    subscriptionsList: (params?: RequestParams) => this.request<repos, any>(`/user/subscriptions`, "GET", params),

    /**
     * @name subscriptionsDelete
     * @request DELETE:/user/subscriptions/{owner}/{repo}
     * @description Stop watching a repository
     */
    subscriptionsDelete: (owner: string, repo: string, params?: RequestParams) =>
      this.request<any, any>(`/user/subscriptions/${owner}/${repo}`, "DELETE", params),

    /**
     * @name subscriptionsDetail
     * @request GET:/user/subscriptions/{owner}/{repo}
     * @description Check if you are watching a repository.
     */
    subscriptionsDetail: (owner: string, repo: string, params?: RequestParams) =>
      this.request<any, any>(`/user/subscriptions/${owner}/${repo}`, "GET", params),

    /**
     * @name subscriptionsUpdate
     * @request PUT:/user/subscriptions/{owner}/{repo}
     * @description Watch a repository.
     */
    subscriptionsUpdate: (owner: string, repo: string, params?: RequestParams) =>
      this.request<any, any>(`/user/subscriptions/${owner}/${repo}`, "PUT", params),

    /**
     * @name teamsList
     * @request GET:/user/teams
     * @description List all of the teams across all of the organizations to which the authenticated user belongs. This method requires user or repo scope when authenticating via OAuth.
     */
    teamsList: (params?: RequestParams) => this.request<TeamsList, any>(`/user/teams`, "GET", params),
  };
  users = {
    /**
     * @name usersList
     * @request GET:/users
     * @description Get all users. This provides a dump of every user, in the order that they signed up for GitHub. Note: Pagination is powered exclusively by the since parameter. Use the Link header to get the URL for the next page of users.
     */
    usersList: (query?: { since?: number }, params?: RequestParams) =>
      this.request<users, any>(`/users${this.addQueryParams(query)}`, "GET", params),

    /**
     * @name usersDetail
     * @request GET:/users/{username}
     * @description Get a single user.
     */
    usersDetail: (username: string, params?: RequestParams) =>
      this.request<user, any>(`/users/${username}`, "GET", params),

    /**
     * @name eventsDetail
     * @request GET:/users/{username}/events
     * @description If you are authenticated as the given user, you will see your private events. Otherwise, you'll only see public events.
     */
    eventsDetail: (username: string, params?: RequestParams) =>
      this.request<any, any>(`/users/${username}/events`, "GET", params),

    /**
     * @name eventsOrgsDetail
     * @request GET:/users/{username}/events/orgs/{org}
     * @description This is the user's organization dashboard. You must be authenticated as the user to view this.
     */
    eventsOrgsDetail: (username: string, org: string, params?: RequestParams) =>
      this.request<any, any>(`/users/${username}/events/orgs/${org}`, "GET", params),

    /**
     * @name followersDetail
     * @request GET:/users/{username}/followers
     * @description List a user's followers
     */
    followersDetail: (username: string, params?: RequestParams) =>
      this.request<users, any>(`/users/${username}/followers`, "GET", params),

    /**
     * @name followingDetail
     * @request GET:/users/{username}/following/{targetUser}
     * @description Check if one user follows another.
     */
    followingDetail: (username: string, targetUser: string, params?: RequestParams) =>
      this.request<any, any>(`/users/${username}/following/${targetUser}`, "GET", params),

    /**
     * @name gistsDetail
     * @request GET:/users/{username}/gists
     * @description List a users gists.
     */
    gistsDetail: (username: string, query?: { since?: string }, params?: RequestParams) =>
      this.request<gists, any>(`/users/${username}/gists${this.addQueryParams(query)}`, "GET", params),

    /**
     * @name keysDetail
     * @request GET:/users/{username}/keys
     * @description List public keys for a user. Lists the verified public keys for a user. This is accessible by anyone.
     */
    keysDetail: (username: string, params?: RequestParams) =>
      this.request<gitignore, any>(`/users/${username}/keys`, "GET", params),

    /**
     * @name orgsDetail
     * @request GET:/users/{username}/orgs
     * @description List all public organizations for a user.
     */
    orgsDetail: (username: string, params?: RequestParams) =>
      this.request<gitignore, any>(`/users/${username}/orgs`, "GET", params),

    /**
     * @name receivedEventsDetail
     * @request GET:/users/{username}/received_events
     * @description These are events that you'll only see public events.
     */
    receivedEventsDetail: (username: string, params?: RequestParams) =>
      this.request<any, any>(`/users/${username}/received_events`, "GET", params),

    /**
     * @name receivedEventsPublicDetail
     * @request GET:/users/{username}/received_events/public
     * @description List public events that a user has received
     */
    receivedEventsPublicDetail: (username: string, params?: RequestParams) =>
      this.request<any, any>(`/users/${username}/received_events/public`, "GET", params),

    /**
     * @name reposDetail
     * @request GET:/users/{username}/repos
     * @description List public repositories for the specified user.
     */
    reposDetail: (
      username: string,
      query?: { type?: "all" | "public" | "private" | "forks" | "sources" | "member" },
      params?: RequestParams,
    ) => this.request<repos, any>(`/users/${username}/repos${this.addQueryParams(query)}`, "GET", params),

    /**
     * @name starredDetail
     * @request GET:/users/{username}/starred
     * @description List repositories being starred by a user.
     */
    starredDetail: (username: string, params?: RequestParams) =>
      this.request<any, any>(`/users/${username}/starred`, "GET", params),

    /**
     * @name subscriptionsDetail
     * @request GET:/users/{username}/subscriptions
     * @description List repositories being watched by a user.
     */
    subscriptionsDetail: (username: string, params?: RequestParams) =>
      this.request<any, any>(`/users/${username}/subscriptions`, "GET", params),
  };
}
