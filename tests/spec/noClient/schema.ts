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
  plan?: { collaborators?: number, name?: string, private_repos?: number, space?: number };
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

export type assets = asset[]

export type assignees = user[]

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
  _links?: { html?: string, self?: string };
  commit?: { author?: user, commit?: { author?: { date?: string, email?: string, name?: string }, committer?: { date?: string, email?: string, name?: string }, message?: string, tree?: { sha?: string, url?: string }, url?: string }, committer?: user, parents?: Array<{ sha?: string, url?: string }>, sha?: string, url?: string };
  name?: string;
}

export type branches = Array<{ commit?: { sha?: string, url?: string }, name?: string }>

export type codeFrequencyStats = number[]

export interface comment {
  body?: string;
}

export interface commentBody {
  body: string;
}

export type comments = Array<{ body?: string, created_at?: string, id?: number, url?: string, user?: user }>

export interface commit {
  author?: user;
  commit?: { author?: { date?: string, email?: string, name?: string }, committer?: { date?: string, email?: string, name?: string }, message?: string, tree?: { sha?: string, url?: string }, url?: string };
  committer?: user;
  files?: Array<{ additions?: number, blob_url?: string, changes?: number, deletions?: number, filename?: string, patch?: string, raw_url?: string, status?: string }>;
  parents?: Array<{ sha?: string, url?: string }>;
  sha?: string;
  stats?: { additions?: number, deletions?: number, total?: number };
  url?: string;
}

export type commitActivityStats = Array<{ days?: number[], total?: number, week?: number }>

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

export type commits = Array<{ author?: user, commit?: { author?: { date?: string, email?: string, name?: string }, committer?: { date?: string, email?: string, name?: string }, message?: string, tree?: { sha?: string, url?: string }, url?: string }, committer?: user, parents?: Array<{ sha?: string, url?: string }>, sha?: string, url?: string }>

export interface CompareCommits {
  ahead_by?: number;
  base_commit?: { author?: user, commit?: { author?: { date?: string, email?: string, name?: string }, committer?: { date?: string, email?: string, name?: string }, message?: string, tree?: { sha?: string, url?: string }, url?: string }, committer?: user, parents?: Array<{ sha?: string, url?: string }>, sha?: string, url?: string };
  behind_by?: number;
  commits?: Array<{ author?: user, commit?: { author?: { date?: string, email?: string, name?: string }, committer?: { date?: string, email?: string, name?: string }, message?: string, tree?: { sha?: string, url?: string }, url?: string }, committer?: user, parents?: Array<{ sha?: string, url?: string }>, sha?: string, url?: string }>;
  diff_url?: string;
  files?: Array<{ additions?: number, blob_url?: string, changes?: number, contents_url?: string, deletions?: number, filename?: string, patch?: string, raw_url?: string, sha?: string, status?: string }>;
  html_url?: string;
  patch_url?: string;
  permalink_url?: string;
  status?: string;
  total_commits?: number;
  url?: string;
}

export interface ContentsPath {
  _links?: { git?: string, html?: string, self?: string };
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

export type contributorsStats = Array<{ author?: { avatar_url?: string, gravatar_id?: string, id?: number, login?: string, url?: string }, total?: number, weeks?: Array<{ a?: number, c?: number, d?: number, w?: string }> }>

export interface createFile {
  commit?: { author?: { date?: string, email?: string, name?: string }, committer?: { date?: string, email?: string, name?: string }, html_url?: string, message?: string, parents?: Array<{ html_url?: string, sha?: string, url?: string }>, sha?: string, tree?: { sha?: string, url?: string }, url?: string };
  content?: { _links?: { git?: string, html?: string, self?: string }, git_url?: string, html_url?: string, name?: string, path?: string, sha?: string, size?: number, type?: string, url?: string };
}

export interface createFileBody {
  committer?: { email?: string, name?: string };
  content?: string;
  message?: string;
}

export interface deleteFile {
  commit?: { author?: { date?: string, email?: string, name?: string }, committer?: { date?: string, email?: string, name?: string }, html_url?: string, message?: string, parents?: { html_url?: string, sha?: string, url?: string }, sha?: string, tree?: { sha?: string, url?: string }, url?: string };
  content?: string;
}

export interface deleteFileBody {
  committer?: { email?: string, name?: string };
  message?: string;
  sha?: string;
}

export interface deployment {
  description?: string;
  payload?: { deploy_user?: string, environment?: string, room_id?: number };
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

export type DeploymentStatuses = Array<{ created_at?: string, creator?: user, description?: string, id?: number, payload?: string, state?: string, target_url?: string, updated_at?: string, url?: string }>

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

export type downloads = download[]

export interface editTeam {
  name: string;
  permission?: "pull" | "push" | "admin";
}

export type emailsPost = string[]

export type emojis = object

export interface event {
  actor?: actor;
  created_at?: object;
  id?: number;
  org?: organization;
  payload?: object;
  public?: boolean;
  repo?: { id?: number, name?: string, url?: string };
  type?: string;
}

export type events = event[]

export interface feeds {
  _links?: { current_user?: { href?: string, type?: string }, current_user_actor?: { href?: string, type?: string }, current_user_organization?: { href?: string, type?: string }, current_user_public?: { href?: string, type?: string }, timeline?: { href?: string, type?: string }, user?: { href?: string, type?: string } };
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

export type forks = repos

export interface gist {
  comments?: number;
  comments_url?: string;
  
  /**
   * Timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.
   */
  created_at?: string;
  description?: string;
  files?: { "ring.erl"?: { filename?: string, raw_url?: string, size?: number } };
  forks?: Array<{ created_at?: string, url?: string, user?: user }>;
  git_pull_url?: string;
  git_push_url?: string;
  history?: Array<{ change_status?: { additions?: number, deletions?: number, total?: number }, committed_at?: string, url?: string, user?: user, version?: string }>;
  html_url?: string;
  id?: string;
  public?: boolean;
  url?: string;
  user?: user;
}

export type gists = Array<{ comments?: number, comments_url?: string, created_at?: string, description?: string, files?: { "ring_erl"?: { filename?: string, raw_url?: string, size?: number } }, git_pull_url?: string, git_push_url?: string, html_url?: string, id?: string, public?: boolean, url?: string, user?: user }>

export interface gitCommit {
  author?: { date?: string, email?: string, name?: string };
  message?: string;
  parents?: string;
  tree?: string;
}

export interface gitRefPatch {
  force?: boolean;
  sha?: string;
}

export type gitignore = any[]

export interface GitignoreLang {
  name?: string;
  source?: string;
}

export interface headBranch {
  object?: { sha?: string, type?: string, url?: string };
  ref?: string;
  url?: string;
}

export type hook = Array<{ active?: boolean, config?: { content_type?: string, url?: string }, created_at?: string, events?: Array<"push" | "issues" | "issue_comment" | "commit_comment" | "pull_request" | "pull_request_review_comment" | "gollum" | "watch" | "download" | "fork" | "fork_apply" | "member" | "public" | "team_add" | "status">, id?: number, name?: string, updated_at?: string, url?: string }>

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
  issue?: { assignee?: user, body?: string, closed_at?: string, comments?: number, created_at?: string, html_url?: string, labels?: Array<{ color?: string, name?: string, url?: string }>, milestone?: { closed_issues?: number, created_at?: string, creator?: user, description?: string, due_on?: string, number?: number, open_issues?: number, state?: "open" | "closed", title?: string, url?: string }, number?: number, pull_request?: { diff_url?: string, html_url?: string, patch_url?: string }, state?: "open" | "closed", title?: string, updated_at?: string, url?: string, user?: user };
  url?: string;
}

export type issueEvents = issueEvent[]

export type issues = Array<{ assignee?: user, body?: string, closed_at?: string, comments?: number, created_at?: string, html_url?: string, labels?: Array<{ color?: string, name?: string, url?: string }>, milestone?: { closed_issues?: number, created_at?: string, creator?: user, description?: string, due_on?: string, number?: number, open_issues?: number, state?: "open" | "closed", title?: string, url?: string }, number?: number, pull_request?: { diff_url?: string, html_url?: string, patch_url?: string }, state?: "open" | "closed", title?: string, updated_at?: string, url?: string, user?: user }>

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

export type issuesComments = Array<{ _links?: { html?: { href?: string }, pull_request?: { href?: string }, self?: { href?: string } }, body?: string, commit_id?: string, created_at?: string, id?: number, path?: string, position?: number, updated_at?: string, url?: string, user?: user }>

export type keys = Array<{ id?: number, key?: string, title?: string, url?: string }>

export interface label {
  color?: string;
  name?: string;
  url?: string;
}

export type labels = Array<{ color?: string, name?: string, url?: string }>

export type languages = object

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
  commit?: { author?: { date?: string, email?: string, name?: string }, comment_count?: number, committer?: { date?: string, email?: string, name?: string }, message?: string, tree?: { sha?: string, url?: string }, url?: string };
  committer?: user;
  merged?: boolean;
  message?: string;
  parents?: Array<{ sha?: string, url?: string }>;
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
  repository?: { description?: string, fork?: boolean, full_name?: string, html_url?: string, id?: number, name?: string, owner?: actor, private?: boolean, url?: string };
  subject?: { latest_comment_url?: string, title?: string, type?: string, url?: string };
  unread?: boolean;
  updated_at?: string;
  url?: string;
}

export interface orgTeamsPost {
  name: string;
  permission?: "pull" | "push" | "admin";
  repo_names?: string[];
}

export type organization = actor & any

export interface organizationAsTeamMember {
  errors?: Array<{ code?: string, field?: string, resource?: string }>;
  message?: string;
}

export interface participationStats {
  all?: number[];
  owner?: number[];
}

export interface patchGist {
  description?: string;
  files?: { "delete_this_file.txt"?: string, "file1.txt"?: { content?: string }, "new_file.txt"?: { content?: string }, "old_name.txt"?: { content?: string, filename?: string } };
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
  _links?: { comments?: { href?: string }, html?: { href?: string }, review_comments?: { href?: string }, self?: { href?: string } };
  additions?: number;
  base?: { label?: string, ref?: string, repo?: repo, sha?: string, user?: { avatar_url?: string, gravatar_id?: string, id?: number, login?: string, url?: string } };
  body?: string;
  changed_files?: number;
  closed_at?: string;
  comments?: number;
  commits?: number;
  created_at?: string;
  deletions?: number;
  diff_url?: string;
  head?: { label?: string, ref?: string, repo?: repo, sha?: string, user?: { avatar_url?: string, gravatar_id?: string, id?: number, login?: string, url?: string } };
  html_url?: string;
  issue_url?: string;
  merge_commit_sha?: string;
  mergeable?: boolean;
  merged?: boolean;
  merged_at?: string;
  merged_by?: { avatar_url?: string, gravatar_id?: string, id?: number, login?: string, url?: string };
  number?: number;
  patch_url?: string;
  state?: string;
  title?: string;
  updated_at?: string;
  url?: string;
  user?: { avatar_url?: string, gravatar_id?: string, id?: number, login?: string, url?: string };
}

export interface pullUpdate {
  body?: string;
  state?: string;
  title?: string;
}

export type pulls = Array<{ _links?: { comments?: { href?: string }, html?: { href?: string }, review_comments?: { href?: string }, self?: { href?: string } }, base?: { label?: string, ref?: string, repo?: repo, sha?: string, user?: { avatar_url?: string, gravatar_id?: string, id?: number, login?: string, url?: string } }, body?: string, closed_at?: string, created_at?: string, diff_url?: string, head?: { label?: string, ref?: string, repo?: repo, sha?: string, user?: { avatar_url?: string, gravatar_id?: string, id?: number, login?: string, url?: string } }, html_url?: string, issue_url?: string, merged_at?: string, number?: number, patch_url?: string, state?: "open" | "closed", title?: string, updated_at?: string, url?: string, user?: { avatar_url?: string, gravatar_id?: string, id?: number, login?: string, url?: string } }>

export interface pullsComment {
  _links?: { html?: { href?: string }, pull_request?: { href?: string }, self?: { href?: string } };
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
  user?: { avatar_url?: string, gravatar_id?: string, id?: number, login?: string, url?: string };
}

export interface pullsCommentPost {
  body?: string;
  commit_id?: string;
  path?: string;
  position?: number;
}

export type pullsComments = Array<{ _links?: { html?: { href?: string }, pull_request?: { href?: string }, self?: { href?: string } }, body?: string, commit_id?: string, created_at?: string, id?: number, path?: string, position?: number, updated_at?: string, url?: string, user?: { avatar_url?: string, gravatar_id?: string, id?: number, login?: string, url?: string } }>

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
  rate?: { limit?: number, remaining?: number, reset?: number };
}

export type ref = Array<{ created_at?: string, creator?: { avatar_url?: string, gravatar_id?: string, id?: number, login?: string, url?: string }, description?: string, id?: number, state?: string, target_url?: string, updated_at?: string, url?: string }>

export type refStatus = Array<{ commit_url?: string, name?: string, repository_url?: string, sha?: string, state?: string, statuses?: Array<{ context?: string, created_at?: string, description?: string, id?: number, state?: string, target_url?: string, updated_at?: string, url?: string }> }>

export type refs = Array<{ object?: { sha?: string, type?: string, url?: string }, ref?: string, url?: string }>

export interface refsBody {
  ref?: string;
  sha?: string;
}

export interface release {
  assets?: Array<{ content_type?: string, created_at?: string, download_count?: number, id?: number, label?: string, name?: string, size?: number, state?: string, updated_at?: string, uploader?: user, url?: string }>;
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

export type releases = Array<{ assets?: Array<{ content_type?: string, created_at?: string, download_count?: number, id?: number, label?: string, name?: string, size?: number, state?: string, updated_at?: string, uploader?: user, url?: string }>, assets_url?: string, author?: user, body?: string, created_at?: string, draft?: boolean, html_url?: string, id?: number, name?: string, prerelease?: boolean, published_at?: string, tag_name?: string, tarball_url?: string, target_commitish?: string, upload_url?: string, url?: string, zipball_url?: string }>

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

export type RepoDeployments = Array<{ created_at?: string, creator?: user, description?: string, id?: number, payload?: string, sha?: string, statuses_url?: string, updated_at?: string, url?: string }>

export type repoComments = Array<{ body?: string, commit_id?: string, created_at?: string, html_url?: string, id?: number, line?: number, path?: string, position?: number, updated_at?: string, url?: string, user?: user }>

export interface repoCommit {
  author?: { date?: string, email?: string, name?: string };
  committer?: { date?: string, email?: string, name?: string };
  message?: string;
  parents?: Array<{ sha?: string, url?: string }>;
  sha?: string;
  tree?: { sha?: string, url?: string };
  url?: string;
}

export interface repoCommitBody {
  author?: { date?: string, email?: string, name?: string };
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

export type repos = repo[]

export interface SearchCode {
  items?: Array<{ git_url?: string, html_url?: string, name?: string, path?: string, repository?: { archive_url?: string, assignees_url?: string, blobs_url?: string, branches_url?: string, collaborators_url?: string, comments_url?: string, commits_url?: string, compare_url?: string, contents_url?: string, contributors_url?: string, description?: string, downloads_url?: string, events_url?: string, fork?: boolean, forks_url?: string, full_name?: string, git_commits_url?: string, git_refs_url?: string, git_tags_url?: string, hooks_url?: string, html_url?: string, id?: number, issue_comment_url?: string, issue_events_url?: string, issues_url?: string, keys_url?: string, labels_url?: string, languages_url?: string, merges_url?: string, milestones_url?: string, name?: string, notifications_url?: string, owner?: actor, private?: boolean, pulls_url?: string, stargazers_url?: string, statuses_url?: string, subscribers_url?: string, subscription_url?: string, tags_url?: string, teams_url?: string, trees_url?: string, url?: string }, score?: number, sha?: string, url?: string }>;
  total_count?: number;
}

export interface SearchIssues {
  items?: Array<{ assignee?: any, body?: string, closed_at?: any, comments?: number, comments_url?: string, created_at?: string, events_url?: string, html_url?: string, id?: number, labels?: Array<{ color?: string, name?: string, url?: string }>, labels_url?: string, milestone?: any, number?: number, pull_request?: { diff_url?: any, html_url?: any, patch_url?: any }, score?: number, state?: string, title?: string, updated_at?: string, url?: string, user?: user }>;
  total_count?: number;
}

export interface SearchIssuesByKeyword {
  issues?: Array<{ body?: string, comments?: number, created_at?: string, gravatar_id?: string, html_url?: string, labels?: string[], number?: number, position?: number, state?: string, title?: string, updated_at?: string, user?: string, votes?: number }>;
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
  object?: { sha?: string, type?: "commit" | "tree" | "blob", url?: string };
  sha?: string;
  
  /**
   * The tag's name. This is typically a version (e.g., "v0.0.1").
   */
  tag?: string;
  tagger?: { date?: string, email?: string, name?: string };
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
  tagger: { date?: string, email?: string, name?: string };
  
  /**
   * String of the type of the object we’re tagging. Normally this is a commit but it can also be a tree or a blob.
   */
  type: "commit" | "tree" | "blob";
}

export type tags = tag[]

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

export type teamRepos = repos

export type teams = Array<{ id?: number, name?: string, url?: string }>

export type TeamsList = Array<{ id?: number, members_count?: number, name?: string, organization?: { avatar_url?: string, id?: number, login?: string, url?: string }, permission?: string, repos_count?: number, url?: string }>

export interface tree {
  sha?: string;
  tree?: Array<{ mode?: "100644" | "100755" | "040000" | "160000" | "120000", path?: string, sha?: string, size?: number, type?: "blob" | "tree" | "commit", url?: string }>;
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

export type user = actor & any

export type UserEmails = string[]

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

export type users = user[]
