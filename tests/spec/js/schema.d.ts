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
export interface Actor {
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
  plan?: {
    collaborators?: number;
    name?: string;
    private_repos?: number;
    space?: number;
  };
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
export interface Asset {
  content_type?: string;
  created_at?: string;
  download_count?: number;
  id?: number;
  label?: string;
  name?: string;
  size?: number;
  state?: string;
  updated_at?: string;
  uploader?: User;
  url?: string;
}
export interface AssetPatch {
  label?: string;
  name: string;
}
export declare type Assets = Asset[];
export declare type Assignees = User[];
export interface Blob {
  content?: string;
  encoding?: "utf-8" | "base64";
  sha?: string;
  size?: number;
}
export interface Blobs {
  sha?: string;
}
export interface Branch {
  _links?: {
    html?: string;
    self?: string;
  };
  commit?: {
    author?: User;
    commit?: {
      author?: {
        date?: string;
        email?: string;
        name?: string;
      };
      committer?: {
        date?: string;
        email?: string;
        name?: string;
      };
      message?: string;
      tree?: {
        sha?: string;
        url?: string;
      };
      url?: string;
    };
    committer?: User;
    parents?: {
      sha?: string;
      url?: string;
    }[];
    sha?: string;
    url?: string;
  };
  name?: string;
}
export declare type Branches = {
  commit?: {
    sha?: string;
    url?: string;
  };
  name?: string;
}[];
export declare type CodeFrequencyStats = number[];
export interface Comment {
  body?: string;
}
export interface CommentBody {
  body: string;
}
export declare type Comments = {
  body?: string;
  created_at?: string;
  id?: number;
  url?: string;
  user?: User;
}[];
export interface Commit {
  author?: User;
  commit?: {
    author?: {
      date?: string;
      email?: string;
      name?: string;
    };
    committer?: {
      date?: string;
      email?: string;
      name?: string;
    };
    message?: string;
    tree?: {
      sha?: string;
      url?: string;
    };
    url?: string;
  };
  committer?: User;
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
  parents?: {
    sha?: string;
    url?: string;
  }[];
  sha?: string;
  stats?: {
    additions?: number;
    deletions?: number;
    total?: number;
  };
  url?: string;
}
export declare type CommitActivityStats = {
  days?: number[];
  total?: number;
  week?: number;
}[];
export interface CommitComment {
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
  user?: User;
}
export interface CommitCommentBody {
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
export declare type Commits = {
  author?: User;
  commit?: {
    author?: {
      date?: string;
      email?: string;
      name?: string;
    };
    committer?: {
      date?: string;
      email?: string;
      name?: string;
    };
    message?: string;
    tree?: {
      sha?: string;
      url?: string;
    };
    url?: string;
  };
  committer?: User;
  parents?: {
    sha?: string;
    url?: string;
  }[];
  sha?: string;
  url?: string;
}[];
export interface CompareCommits {
  ahead_by?: number;
  base_commit?: {
    author?: User;
    commit?: {
      author?: {
        date?: string;
        email?: string;
        name?: string;
      };
      committer?: {
        date?: string;
        email?: string;
        name?: string;
      };
      message?: string;
      tree?: {
        sha?: string;
        url?: string;
      };
      url?: string;
    };
    committer?: User;
    parents?: {
      sha?: string;
      url?: string;
    }[];
    sha?: string;
    url?: string;
  };
  behind_by?: number;
  commits?: {
    author?: User;
    commit?: {
      author?: {
        date?: string;
        email?: string;
        name?: string;
      };
      committer?: {
        date?: string;
        email?: string;
        name?: string;
      };
      message?: string;
      tree?: {
        sha?: string;
        url?: string;
      };
      url?: string;
    };
    committer?: User;
    parents?: {
      sha?: string;
      url?: string;
    }[];
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
export interface ContentsPath {
  _links?: {
    git?: string;
    html?: string;
    self?: string;
  };
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
export declare type ContributorsStats = {
  author?: {
    avatar_url?: string;
    gravatar_id?: string;
    id?: number;
    login?: string;
    url?: string;
  };
  total?: number;
  weeks?: {
    a?: number;
    c?: number;
    d?: number;
    w?: string;
  }[];
}[];
export interface CreateFile {
  commit?: {
    author?: {
      date?: string;
      email?: string;
      name?: string;
    };
    committer?: {
      date?: string;
      email?: string;
      name?: string;
    };
    html_url?: string;
    message?: string;
    parents?: {
      html_url?: string;
      sha?: string;
      url?: string;
    }[];
    sha?: string;
    tree?: {
      sha?: string;
      url?: string;
    };
    url?: string;
  };
  content?: {
    _links?: {
      git?: string;
      html?: string;
      self?: string;
    };
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
export interface CreateFileBody {
  committer?: {
    email?: string;
    name?: string;
  };
  content?: string;
  message?: string;
}
export interface DeleteFile {
  commit?: {
    author?: {
      date?: string;
      email?: string;
      name?: string;
    };
    committer?: {
      date?: string;
      email?: string;
      name?: string;
    };
    html_url?: string;
    message?: string;
    parents?: {
      html_url?: string;
      sha?: string;
      url?: string;
    };
    sha?: string;
    tree?: {
      sha?: string;
      url?: string;
    };
    url?: string;
  };
  content?: string;
}
export interface DeleteFileBody {
  committer?: {
    email?: string;
    name?: string;
  };
  message?: string;
  sha?: string;
}
export interface Deployment {
  description?: string;
  payload?: {
    deploy_user?: string;
    environment?: string;
    room_id?: number;
  };
  ref?: string;
}
export interface DeploymentResp {
  created_at?: string;
  creator?: User;
  description?: string;
  id?: number;
  payload?: string;
  sha?: string;
  statuses_url?: string;
  updated_at?: string;
  url?: string;
}
export declare type DeploymentStatuses = {
  created_at?: string;
  creator?: User;
  description?: string;
  id?: number;
  payload?: string;
  state?: string;
  target_url?: string;
  updated_at?: string;
  url?: string;
}[];
export interface DeploymentStatusesCreate {
  description?: string;
  state?: string;
  target_url?: string;
}
export interface Download {
  content_type?: string;
  description?: string;
  download_count?: number;
  html_url?: string;
  id?: number;
  name?: string;
  size?: number;
  url?: string;
}
export declare type Downloads = Download[];
export interface EditTeam {
  name: string;
  permission?: "pull" | "push" | "admin";
}
export declare type EmailsPost = string[];
export declare type Emojis = Record<string, string>;
export interface Event {
  actor?: Actor;
  created_at?: object;
  id?: number;
  org?: Organization;
  payload?: object;
  public?: boolean;
  repo?: {
    id?: number;
    name?: string;
    url?: string;
  };
  type?: string;
}
export declare type Events = Event[];
export interface Feeds {
  _links?: {
    current_user?: {
      href?: string;
      type?: string;
    };
    current_user_actor?: {
      href?: string;
      type?: string;
    };
    current_user_organization?: {
      href?: string;
      type?: string;
    };
    current_user_public?: {
      href?: string;
      type?: string;
    };
    timeline?: {
      href?: string;
      type?: string;
    };
    user?: {
      href?: string;
      type?: string;
    };
  };
  current_user_actor_url?: string;
  current_user_organization_url?: string;
  current_user_public?: string;
  current_user_url?: string;
  timeline_url?: string;
  user_url?: string;
}
export interface ForkBody {
  organization?: string;
}
export declare type Forks = Repos;
export interface Gist {
  comments?: number;
  comments_url?: string;
  /** Timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ. */
  created_at?: string;
  description?: string;
  files?: {
    "ring.erl"?: {
      filename?: string;
      raw_url?: string;
      size?: number;
    };
  };
  forks?: {
    created_at?: string;
    url?: string;
    user?: User;
  }[];
  git_pull_url?: string;
  git_push_url?: string;
  history?: {
    change_status?: {
      additions?: number;
      deletions?: number;
      total?: number;
    };
    committed_at?: string;
    url?: string;
    user?: User;
    version?: string;
  }[];
  html_url?: string;
  id?: string;
  public?: boolean;
  url?: string;
  user?: User;
}
export declare type Gists = {
  comments?: number;
  comments_url?: string;
  created_at?: string;
  description?: string;
  files?: {
    "ring.erl"?: {
      filename?: string;
      raw_url?: string;
      size?: number;
    };
  };
  git_pull_url?: string;
  git_push_url?: string;
  html_url?: string;
  id?: string;
  public?: boolean;
  url?: string;
  user?: User;
}[];
export interface GitCommit {
  author?: {
    date?: string;
    email?: string;
    name?: string;
  };
  message?: string;
  parents?: string;
  tree?: string;
}
export interface GitRefPatch {
  force?: boolean;
  sha?: string;
}
export declare type Gitignore = any[];
export interface GitignoreLang {
  name?: string;
  source?: string;
}
export interface HeadBranch {
  object?: {
    sha?: string;
    type?: string;
    url?: string;
  };
  ref?: string;
  url?: string;
}
export declare type Hook = {
  active?: boolean;
  config?: {
    content_type?: string;
    url?: string;
  };
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
export interface HookBody {
  active?: boolean;
  add_events?: string[];
}
export interface Issue {
  assignee?: string;
  body?: string;
  labels?: string[];
  milestone?: number;
  title?: string;
}
export interface IssueEvent {
  actor?: Actor;
  commit_id?: string;
  /** ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
  created_at?: string;
  event?: string;
  issue?: {
    assignee?: User;
    body?: string;
    closed_at?: string;
    comments?: number;
    created_at?: string;
    html_url?: string;
    labels?: {
      color?: string;
      name?: string;
      url?: string;
    }[];
    milestone?: {
      closed_issues?: number;
      created_at?: string;
      creator?: User;
      description?: string;
      due_on?: string;
      number?: number;
      open_issues?: number;
      state?: "open" | "closed";
      title?: string;
      url?: string;
    };
    number?: number;
    pull_request?: {
      diff_url?: string;
      html_url?: string;
      patch_url?: string;
    };
    state?: "open" | "closed";
    title?: string;
    updated_at?: string;
    url?: string;
    user?: User;
  };
  url?: string;
}
export declare type IssueEvents = IssueEvent[];
export declare type Issues = {
  assignee?: User;
  body?: string;
  closed_at?: string;
  comments?: number;
  created_at?: string;
  html_url?: string;
  labels?: {
    color?: string;
    name?: string;
    url?: string;
  }[];
  milestone?: {
    closed_issues?: number;
    created_at?: string;
    creator?: User;
    description?: string;
    due_on?: string;
    number?: number;
    open_issues?: number;
    state?: "open" | "closed";
    title?: string;
    url?: string;
  };
  number?: number;
  pull_request?: {
    diff_url?: string;
    html_url?: string;
    patch_url?: string;
  };
  state?: "open" | "closed";
  title?: string;
  updated_at?: string;
  url?: string;
  user?: User;
}[];
export interface IssuesComment {
  body?: string;
  /** ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
  created_at?: string;
  html_url?: string;
  id?: number;
  /** ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
  updated_at?: string;
  url?: string;
  user?: User;
}
export declare type IssuesComments = {
  _links?: {
    html?: {
      href?: string;
    };
    pull_request?: {
      href?: string;
    };
    self?: {
      href?: string;
    };
  };
  body?: string;
  commit_id?: string;
  created_at?: string;
  id?: number;
  path?: string;
  position?: number;
  updated_at?: string;
  url?: string;
  user?: User;
}[];
export declare type Keys = {
  id?: number;
  key?: string;
  title?: string;
  url?: string;
}[];
export interface Label {
  color?: string;
  name?: string;
  url?: string;
}
export declare type Labels = {
  color?: string;
  name?: string;
  url?: string;
}[];
export declare type Languages = Record<string, number>;
export interface Markdown {
  context?: string;
  mode?: string;
  text?: string;
}
export interface Merge {
  merged?: boolean;
  message?: string;
  sha?: string;
}
export interface MergePullBody {
  commit_message?: string;
}
export interface MergesBody {
  base?: string;
  commit_message?: string;
  head?: string;
}
export interface MergesConflict {
  /** Error message */
  message?: string;
}
export interface MergesSuccessful {
  author?: User;
  comments_url?: string;
  commit?: {
    author?: {
      date?: string;
      email?: string;
      name?: string;
    };
    comment_count?: number;
    committer?: {
      date?: string;
      email?: string;
      name?: string;
    };
    message?: string;
    tree?: {
      sha?: string;
      url?: string;
    };
    url?: string;
  };
  committer?: User;
  merged?: boolean;
  message?: string;
  parents?: {
    sha?: string;
    url?: string;
  }[];
  sha?: string;
  url?: string;
}
export interface Meta {
  git?: string[];
  hooks?: string[];
}
export interface Milestone {
  closed_issues?: number;
  /** ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
  created_at?: string;
  creator?: User;
  description?: string;
  /** ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
  due_on?: string;
  number?: number;
  open_issues?: number;
  state?: "open" | "closed";
  title?: string;
  url?: string;
}
export interface MilestoneUpdate {
  description?: string;
  due_on?: string;
  state?: string;
  title?: string;
}
export interface NotificationMarkRead {
  last_read_at?: string;
}
export interface Notifications {
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
    owner?: Actor;
    private?: boolean;
    url?: string;
  };
  subject?: {
    latest_comment_url?: string;
    title?: string;
    type?: string;
    url?: string;
  };
  unread?: boolean;
  updated_at?: string;
  url?: string;
}
export interface OrgTeamsPost {
  name: string;
  permission?: "pull" | "push" | "admin";
  repo_names?: string[];
}
export declare type Organization = Actor & any;
export interface OrganizationAsTeamMember {
  errors?: {
    code?: string;
    field?: string;
    resource?: string;
  }[];
  message?: string;
}
export interface ParticipationStats {
  all?: number[];
  owner?: number[];
}
export interface PatchGist {
  description?: string;
  files?: {
    "delete_this_file.txt"?: string;
    "file1.txt"?: {
      content?: string;
    };
    "new_file.txt"?: {
      content?: string;
    };
    "old_name.txt"?: {
      content?: string;
      filename?: string;
    };
  };
}
export interface PatchOrg {
  /** Billing email address. This address is not publicized. */
  billing_email?: string;
  company?: string;
  /** Publicly visible email address. */
  email?: string;
  location?: string;
  name?: string;
}
export interface PostGist {
  description?: string;
  files?: {
    "file1.txt"?: {
      content?: string;
    };
  };
  public?: boolean;
}
export interface PostRepo {
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
export interface PullRequest {
  _links?: {
    comments?: {
      href?: string;
    };
    html?: {
      href?: string;
    };
    review_comments?: {
      href?: string;
    };
    self?: {
      href?: string;
    };
  };
  additions?: number;
  base?: {
    label?: string;
    ref?: string;
    repo?: Repo;
    sha?: string;
    user?: {
      avatar_url?: string;
      gravatar_id?: string;
      id?: number;
      login?: string;
      url?: string;
    };
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
    repo?: Repo;
    sha?: string;
    user?: {
      avatar_url?: string;
      gravatar_id?: string;
      id?: number;
      login?: string;
      url?: string;
    };
  };
  html_url?: string;
  issue_url?: string;
  merge_commit_sha?: string;
  mergeable?: boolean;
  merged?: boolean;
  merged_at?: string;
  merged_by?: {
    avatar_url?: string;
    gravatar_id?: string;
    id?: number;
    login?: string;
    url?: string;
  };
  number?: number;
  patch_url?: string;
  state?: string;
  title?: string;
  updated_at?: string;
  url?: string;
  user?: {
    avatar_url?: string;
    gravatar_id?: string;
    id?: number;
    login?: string;
    url?: string;
  };
}
export interface PullUpdate {
  body?: string;
  state?: string;
  title?: string;
}
export declare type Pulls = {
  _links?: {
    comments?: {
      href?: string;
    };
    html?: {
      href?: string;
    };
    review_comments?: {
      href?: string;
    };
    self?: {
      href?: string;
    };
  };
  base?: {
    label?: string;
    ref?: string;
    repo?: Repo;
    sha?: string;
    user?: {
      avatar_url?: string;
      gravatar_id?: string;
      id?: number;
      login?: string;
      url?: string;
    };
  };
  body?: string;
  closed_at?: string;
  created_at?: string;
  diff_url?: string;
  head?: {
    label?: string;
    ref?: string;
    repo?: Repo;
    sha?: string;
    user?: {
      avatar_url?: string;
      gravatar_id?: string;
      id?: number;
      login?: string;
      url?: string;
    };
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
  user?: {
    avatar_url?: string;
    gravatar_id?: string;
    id?: number;
    login?: string;
    url?: string;
  };
}[];
export interface PullsComment {
  _links?: {
    html?: {
      href?: string;
    };
    pull_request?: {
      href?: string;
    };
    self?: {
      href?: string;
    };
  };
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
  user?: {
    avatar_url?: string;
    gravatar_id?: string;
    id?: number;
    login?: string;
    url?: string;
  };
}
export interface PullsCommentPost {
  body?: string;
  commit_id?: string;
  path?: string;
  position?: number;
}
export declare type PullsComments = {
  _links?: {
    html?: {
      href?: string;
    };
    pull_request?: {
      href?: string;
    };
    self?: {
      href?: string;
    };
  };
  body?: string;
  commit_id?: string;
  created_at?: string;
  id?: number;
  path?: string;
  position?: number;
  updated_at?: string;
  url?: string;
  user?: {
    avatar_url?: string;
    gravatar_id?: string;
    id?: number;
    login?: string;
    url?: string;
  };
}[];
export interface PullsPost {
  base?: string;
  body?: string;
  head?: string;
  title?: string;
}
export interface PutSubscription {
  created_at?: string;
  ignored?: boolean;
  reason?: object;
  subscribed?: boolean;
  thread_url?: string;
  url?: string;
}
export interface RateLimit {
  rate?: {
    limit?: number;
    remaining?: number;
    reset?: number;
  };
}
export declare type Ref = {
  created_at?: string;
  creator?: {
    avatar_url?: string;
    gravatar_id?: string;
    id?: number;
    login?: string;
    url?: string;
  };
  description?: string;
  id?: number;
  state?: string;
  target_url?: string;
  updated_at?: string;
  url?: string;
}[];
export declare type RefStatus = {
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
export declare type Refs = {
  object?: {
    sha?: string;
    type?: string;
    url?: string;
  };
  ref?: string;
  url?: string;
}[];
export interface RefsBody {
  ref?: string;
  sha?: string;
}
export interface Release {
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
    uploader?: User;
    url?: string;
  }[];
  assets_url?: string;
  author?: User;
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
export declare type Releases = {
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
    uploader?: User;
    url?: string;
  }[];
  assets_url?: string;
  author?: User;
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
export interface Repo {
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
  organization?: Organization;
  owner?: Actor;
  parent?: Repo & any;
  private?: boolean;
  /** ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
  pushed_at?: string;
  size?: number;
  source?: Repo & any;
  ssh_url?: string;
  svn_url?: string;
  /** ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
  updated_at?: string;
  url?: string;
  watchers?: number;
  watchers_count?: number;
}
export declare type RepoDeployments = {
  created_at?: string;
  creator?: User;
  description?: string;
  id?: number;
  payload?: string;
  sha?: string;
  statuses_url?: string;
  updated_at?: string;
  url?: string;
}[];
export declare type RepoComments = {
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
  user?: User;
}[];
export interface RepoCommit {
  author?: {
    date?: string;
    email?: string;
    name?: string;
  };
  committer?: {
    date?: string;
    email?: string;
    name?: string;
  };
  message?: string;
  parents?: {
    sha?: string;
    url?: string;
  }[];
  sha?: string;
  tree?: {
    sha?: string;
    url?: string;
  };
  url?: string;
}
export interface RepoCommitBody {
  author?: {
    date?: string;
    email?: string;
    name?: string;
  };
  message: string;
  parents: string[];
  tree: string;
}
export interface RepoEdit {
  description?: string;
  has_downloads?: boolean;
  has_issues?: boolean;
  has_wiki?: boolean;
  homepage?: string;
  name?: string;
  private?: boolean;
}
export declare type Repos = Repo[];
export interface SearchCode {
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
      owner?: Actor;
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
export interface SearchIssues {
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
    labels?: {
      color?: string;
      name?: string;
      url?: string;
    }[];
    labels_url?: string;
    milestone?: any;
    number?: number;
    pull_request?: {
      diff_url?: any;
      html_url?: any;
      patch_url?: any;
    };
    score?: number;
    state?: string;
    title?: string;
    updated_at?: string;
    url?: string;
    user?: User;
  }[];
  total_count?: number;
}
export interface SearchIssuesByKeyword {
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
export interface SearchRepositories {
  items?: Repo[];
  total_count?: number;
}
export interface SearchRepositoriesByKeyword {
  repositories?: Repo[];
}
export interface SearchUserByEmail {
  user?: User;
}
export interface SearchUsers {
  items?: Users;
  total_count?: number;
}
export interface SearchUsersByKeyword {
  users?: Users;
}
export interface Subscription {
  /** ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
  created_at?: string;
  ignored?: boolean;
  reason?: string;
  repository_url?: string;
  subscribed?: boolean;
  thread_url?: string;
  url?: string;
}
export interface SubscriptionBody {
  ignored?: boolean;
  subscribed?: boolean;
}
export interface Tag {
  /** String of the tag message. */
  message?: string;
  object?: {
    sha?: string;
    type?: "commit" | "tree" | "blob";
    url?: string;
  };
  sha?: string;
  /** The tag's name. This is typically a version (e.g., "v0.0.1"). */
  tag?: string;
  tagger?: {
    date?: string;
    email?: string;
    name?: string;
  };
  url?: string;
}
export interface TagBody {
  /** String of the tag message. */
  message: string;
  /** String of the SHA of the git object this is tagging. */
  object: string;
  /** The tag's name. This is typically a version (e.g., "v0.0.1"). */
  tag: string;
  tagger: {
    date?: string;
    email?: string;
    name?: string;
  };
  /** String of the type of the object we’re tagging. Normally this is a commit but it can also be a tree or a blob. */
  type: "commit" | "tree" | "blob";
}
export declare type Tags = Tag[];
export interface Team {
  id?: number;
  members_count?: number;
  name?: string;
  permission?: string;
  repos_count?: number;
  url?: string;
}
export interface TeamMembership {
  state?: string;
  url?: string;
}
export declare type TeamRepos = Repos;
export declare type Teams = {
  id?: number;
  name?: string;
  url?: string;
}[];
export declare type TeamsList = {
  id?: number;
  members_count?: number;
  name?: string;
  organization?: {
    avatar_url?: string;
    id?: number;
    login?: string;
    url?: string;
  };
  permission?: string;
  repos_count?: number;
  url?: string;
}[];
export interface Tree {
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
export interface Trees {
  base_tree?: string;
  /** SHA1 checksum ID of the object in the tree. */
  sha?: string;
  tree?: Tree[];
  url?: string;
}
export declare type User = Actor & any;
export declare type UserEmails = string[];
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
export declare type Users = User[];
export declare type RequestParams = Omit<RequestInit, "body" | "method"> & {
  secure?: boolean;
};
export declare type RequestQueryParamsType = Record<string | number, any>;
interface ApiConfig<SecurityDataType> {
  baseUrl?: string;
  baseApiParams?: RequestParams;
  securityWorker?: (securityData: SecurityDataType) => RequestParams;
}
interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D | null;
  error: E | null;
}
declare enum BodyType {
  Json = 0,
  FormData = 1,
}
declare class HttpClient<SecurityDataType> {
  baseUrl: string;
  private securityData;
  private securityWorker;
  private baseApiParams;
  constructor(apiConfig?: ApiConfig<SecurityDataType>);
  setSecurityData: (data: SecurityDataType) => void;
  private addQueryParam;
  protected addQueryParams(rawQuery?: RequestQueryParamsType): string;
  private bodyFormatters;
  private mergeRequestOptions;
  private safeParseResponse;
  request: <T = any, E = any>(
    path: string,
    method: string,
    { secure, ...params }?: RequestParams,
    body?: any,
    bodyType?: BodyType,
    secureByDefault?: boolean,
  ) => Promise<HttpResponse<T, unknown>>;
}
/**
 * @title GitHub
 * @version v3
 * @baseUrl https://api.github.com/
 * Powerful collaboration, code review, and code management for open source and private projects.
 */
export declare class Api<SecurityDataType = any> extends HttpClient<SecurityDataType> {
  emojis: {
    /**
     * @description Lists all the emojis available to use on GitHub.
     *
     * @name emojisList
     * @request GET:/emojis
     */
    emojisList: (params?: RequestParams) => Promise<HttpResponse<Record<string, string>, unknown>>;
  };
  events: {
    /**
     * @description List public events.
     *
     * @name eventsList
     * @request GET:/events
     */
    eventsList: (params?: RequestParams) => Promise<HttpResponse<Events, unknown>>;
  };
  feeds: {
    /**
     * @description List Feeds. GitHub provides several timeline resources in Atom format. The Feeds API lists all the feeds available to the authenticating user.
     *
     * @name feedsList
     * @request GET:/feeds
     */
    feedsList: (params?: RequestParams) => Promise<HttpResponse<Feeds, unknown>>;
  };
  gists: {
    /**
     * @description List the authenticated user's gists or if called anonymously, this will return all public gists.
     *
     * @name gistsList
     * @request GET:/gists
     */
    gistsList: (
      query?: {
        since?: string;
      },
      params?: RequestParams,
    ) => Promise<HttpResponse<Gists, unknown>>;
    /**
     * @description Create a gist.
     *
     * @name gistsCreate
     * @request POST:/gists
     */
    gistsCreate: (body: PostGist, params?: RequestParams) => Promise<HttpResponse<Gist, unknown>>;
    /**
     * @description List all public gists.
     *
     * @name publicList
     * @request GET:/gists/public
     */
    publicList: (
      query?: {
        since?: string;
      },
      params?: RequestParams,
    ) => Promise<HttpResponse<Gists, unknown>>;
    /**
     * @description List the authenticated user's starred gists.
     *
     * @name starredList
     * @request GET:/gists/starred
     */
    starredList: (
      query?: {
        since?: string;
      },
      params?: RequestParams,
    ) => Promise<HttpResponse<Gists, unknown>>;
    /**
     * @description Delete a gist.
     *
     * @name gistsDelete
     * @request DELETE:/gists/{id}
     */
    gistsDelete: (id: number, params?: RequestParams) => Promise<HttpResponse<any, unknown>>;
    /**
     * @description Get a single gist.
     *
     * @name gistsDetail
     * @request GET:/gists/{id}
     */
    gistsDetail: (id: number, params?: RequestParams) => Promise<HttpResponse<Gist, unknown>>;
    /**
     * @description Edit a gist.
     *
     * @name gistsPartialUpdate
     * @request PATCH:/gists/{id}
     */
    gistsPartialUpdate: (id: number, body: PatchGist, params?: RequestParams) => Promise<HttpResponse<Gist, unknown>>;
    /**
     * @description List comments on a gist.
     *
     * @name commentsDetail
     * @request GET:/gists/{id}/comments
     */
    commentsDetail: (id: number, params?: RequestParams) => Promise<HttpResponse<Comments, unknown>>;
    /**
     * @description Create a commen
     *
     * @name commentsCreate
     * @request POST:/gists/{id}/comments
     */
    commentsCreate: (id: number, body: CommentBody, params?: RequestParams) => Promise<HttpResponse<Comment, unknown>>;
    /**
     * @description Delete a comment.
     *
     * @name commentsDelete
     * @request DELETE:/gists/{id}/comments/{commentId}
     */
    commentsDelete: (id: number, commentId: number, params?: RequestParams) => Promise<HttpResponse<any, unknown>>;
    /**
 * @description Get a single comment.
 *
 * @name commentsDetail
 * @request GET:/gists/{id}/comments/{commentId} * @originalName commentsDetail
 * @duplicate

 */
    commentsDetail2: (id: number, commentId: number, params?: RequestParams) => Promise<HttpResponse<Comment, unknown>>;
    /**
     * @description Edit a comment.
     *
     * @name commentsPartialUpdate
     * @request PATCH:/gists/{id}/comments/{commentId}
     */
    commentsPartialUpdate: (
      id: number,
      commentId: number,
      body: Comment,
      params?: RequestParams,
    ) => Promise<HttpResponse<Comment, unknown>>;
    /**
     * @description Fork a gist.
     *
     * @name forksCreate
     * @request POST:/gists/{id}/forks
     */
    forksCreate: (id: number, params?: RequestParams) => Promise<HttpResponse<any, unknown>>;
    /**
     * @description Unstar a gist.
     *
     * @name starDelete
     * @request DELETE:/gists/{id}/star
     */
    starDelete: (id: number, params?: RequestParams) => Promise<HttpResponse<any, unknown>>;
    /**
     * @description Check if a gist is starred.
     *
     * @name starDetail
     * @request GET:/gists/{id}/star
     */
    starDetail: (id: number, params?: RequestParams) => Promise<HttpResponse<any, unknown>>;
    /**
     * @description Star a gist.
     *
     * @name starUpdate
     * @request PUT:/gists/{id}/star
     */
    starUpdate: (id: number, params?: RequestParams) => Promise<HttpResponse<any, unknown>>;
  };
  gitignore: {
    /**
     * @description Listing available templates. List all templates available to pass as an option when creating a repository.
     *
     * @name templatesList
     * @request GET:/gitignore/templates
     */
    templatesList: (params?: RequestParams) => Promise<HttpResponse<Gitignore, unknown>>;
    /**
     * @description Get a single template.
     *
     * @name templatesDetail
     * @request GET:/gitignore/templates/{language}
     */
    templatesDetail: (language: string, params?: RequestParams) => Promise<HttpResponse<GitignoreLang, unknown>>;
  };
  issues: {
    /**
     * @description List issues. List all issues across all the authenticated user's visible repositories.
     *
     * @name issuesList
     * @request GET:/issues
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
    ) => Promise<HttpResponse<Issues, unknown>>;
  };
  legacy: {
    /**
     * @description Find issues by state and keyword.
     *
     * @name issuesSearchDetail
     * @request GET:/legacy/issues/search/{owner}/{repository}/{state}/{keyword}
     */
    issuesSearchDetail: (
      keyword: string,
      state: "open" | "closed",
      owner: string,
      repository: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<SearchIssuesByKeyword, unknown>>;
    /**
     * @description Find repositories by keyword. Note, this legacy method does not follow the v3 pagination pattern. This method returns up to 100 results per page and pages can be fetched using the start_page parameter.
     *
     * @name reposSearchDetail
     * @request GET:/legacy/repos/search/{keyword}
     */
    reposSearchDetail: (
      keyword: string,
      query?: {
        order?: "desc" | "asc";
        language?: string;
        start_page?: string;
        sort?: "updated" | "stars" | "forks";
      },
      params?: RequestParams,
    ) => Promise<HttpResponse<SearchRepositoriesByKeyword, unknown>>;
    /**
     * @description This API call is added for compatibility reasons only.
     *
     * @name userEmailDetail
     * @request GET:/legacy/user/email/{email}
     */
    userEmailDetail: (email: string, params?: RequestParams) => Promise<HttpResponse<SearchUserByEmail, unknown>>;
    /**
     * @description Find users by keyword.
     *
     * @name userSearchDetail
     * @request GET:/legacy/user/search/{keyword}
     */
    userSearchDetail: (
      keyword: string,
      query?: {
        order?: "desc" | "asc";
        start_page?: string;
        sort?: "updated" | "stars" | "forks";
      },
      params?: RequestParams,
    ) => Promise<HttpResponse<SearchUsersByKeyword, unknown>>;
  };
  markdown: {
    /**
     * @description Render an arbitrary Markdown document
     *
     * @name markdownCreate
     * @request POST:/markdown
     */
    markdownCreate: (body: Markdown, params?: RequestParams) => Promise<HttpResponse<any, unknown>>;
    /**
     * @description Render a Markdown document in raw mode
     *
     * @name postMarkdown
     * @request POST:/markdown/raw
     */
    postMarkdown: (params?: RequestParams) => Promise<HttpResponse<any, unknown>>;
  };
  meta: {
    /**
     * @description This gives some information about GitHub.com, the service.
     *
     * @name metaList
     * @request GET:/meta
     */
    metaList: (params?: RequestParams) => Promise<HttpResponse<Meta, unknown>>;
  };
  networks: {
    /**
     * @description List public events for a network of repositories.
     *
     * @name eventsDetail
     * @request GET:/networks/{owner}/{repo}/events
     */
    eventsDetail: (owner: string, repo: string, params?: RequestParams) => Promise<HttpResponse<Events, unknown>>;
  };
  notifications: {
    /**
     * @description List your notifications. List all notifications for the current user, grouped by repository.
     *
     * @name notificationsList
     * @request GET:/notifications
     */
    notificationsList: (
      query?: {
        all?: boolean;
        participating?: boolean;
        since?: string;
      },
      params?: RequestParams,
    ) => Promise<HttpResponse<Notifications, unknown>>;
    /**
     * @description Mark as read. Marking a notification as "read" removes it from the default view on GitHub.com.
     *
     * @name notificationsUpdate
     * @request PUT:/notifications
     */
    notificationsUpdate: (body: NotificationMarkRead, params?: RequestParams) => Promise<HttpResponse<any, unknown>>;
    /**
     * @description View a single thread.
     *
     * @name threadsDetail
     * @request GET:/notifications/threads/{id}
     */
    threadsDetail: (id: number, params?: RequestParams) => Promise<HttpResponse<Notifications, unknown>>;
    /**
     * @description Mark a thread as read
     *
     * @name threadsPartialUpdate
     * @request PATCH:/notifications/threads/{id}
     */
    threadsPartialUpdate: (id: number, params?: RequestParams) => Promise<HttpResponse<any, unknown>>;
    /**
     * @description Delete a Thread Subscription.
     *
     * @name threadsSubscriptionDelete
     * @request DELETE:/notifications/threads/{id}/subscription
     */
    threadsSubscriptionDelete: (id: number, params?: RequestParams) => Promise<HttpResponse<any, unknown>>;
    /**
     * @description Get a Thread Subscription.
     *
     * @name threadsSubscriptionDetail
     * @request GET:/notifications/threads/{id}/subscription
     */
    threadsSubscriptionDetail: (id: number, params?: RequestParams) => Promise<HttpResponse<Subscription, unknown>>;
    /**
     * @description Set a Thread Subscription. This lets you subscribe to a thread, or ignore it. Subscribing to a thread is unnecessary if the user is already subscribed to the repository. Ignoring a thread will mute all future notifications (until you comment or get @mentioned).
     *
     * @name threadsSubscriptionUpdate
     * @request PUT:/notifications/threads/{id}/subscription
     */
    threadsSubscriptionUpdate: (
      id: number,
      body: PutSubscription,
      params?: RequestParams,
    ) => Promise<HttpResponse<Subscription, unknown>>;
  };
  orgs: {
    /**
     * @description Get an Organization.
     *
     * @name orgsDetail
     * @request GET:/orgs/{org}
     */
    orgsDetail: (org: string, params?: RequestParams) => Promise<HttpResponse<any, unknown>>;
    /**
     * @description Edit an Organization.
     *
     * @name orgsPartialUpdate
     * @request PATCH:/orgs/{org}
     */
    orgsPartialUpdate: (org: string, body: PatchOrg, params?: RequestParams) => Promise<HttpResponse<any, unknown>>;
    /**
     * @description List public events for an organization.
     *
     * @name eventsDetail
     * @request GET:/orgs/{org}/events
     */
    eventsDetail: (org: string, params?: RequestParams) => Promise<HttpResponse<Events, unknown>>;
    /**
     * @description List issues. List all issues for a given organization for the authenticated user.
     *
     * @name issuesDetail
     * @request GET:/orgs/{org}/issues
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
    ) => Promise<HttpResponse<Issues, unknown>>;
    /**
     * @description Members list. List all users who are members of an organization. A member is a user tha belongs to at least 1 team in the organization. If the authenticated user is also an owner of this organization then both concealed and public members will be returned. If the requester is not an owner of the organization the query will be redirected to the public members list.
     *
     * @name membersDetail
     * @request GET:/orgs/{org}/members
     */
    membersDetail: (org: string, params?: RequestParams) => Promise<HttpResponse<Users, unknown>>;
    /**
     * @description Remove a member. Removing a user from this list will remove them from all teams and they will no longer have any access to the organization's repositories.
     *
     * @name membersDelete
     * @request DELETE:/orgs/{org}/members/{username}
     */
    membersDelete: (org: string, username: string, params?: RequestParams) => Promise<HttpResponse<any, unknown>>;
    /**
 * @description Check if a user is, publicly or privately, a member of the organization.
 *
 * @name membersDetail
 * @request GET:/orgs/{org}/members/{username} * @originalName membersDetail
 * @duplicate

 */
    membersDetail2: (org: string, username: string, params?: RequestParams) => Promise<HttpResponse<any, unknown>>;
    /**
     * @description Public members list. Members of an organization can choose to have their membership publicized or not.
     *
     * @name publicMembersDetail
     * @request GET:/orgs/{org}/public_members
     */
    publicMembersDetail: (org: string, params?: RequestParams) => Promise<HttpResponse<Users, unknown>>;
    /**
     * @description Conceal a user's membership.
     *
     * @name publicMembersDelete
     * @request DELETE:/orgs/{org}/public_members/{username}
     */
    publicMembersDelete: (org: string, username: string, params?: RequestParams) => Promise<HttpResponse<any, unknown>>;
    /**
 * @description Check public membership.
 *
 * @name publicMembersDetail
 * @request GET:/orgs/{org}/public_members/{username} * @originalName publicMembersDetail
 * @duplicate

 */
    publicMembersDetail2: (
      org: string,
      username: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<any, unknown>>;
    /**
     * @description Publicize a user's membership.
     *
     * @name publicMembersUpdate
     * @request PUT:/orgs/{org}/public_members/{username}
     */
    publicMembersUpdate: (org: string, username: string, params?: RequestParams) => Promise<HttpResponse<any, unknown>>;
    /**
     * @description List repositories for the specified org.
     *
     * @name reposDetail
     * @request GET:/orgs/{org}/repos
     */
    reposDetail: (
      org: string,
      query?: {
        type?: "all" | "public" | "private" | "forks" | "sources" | "member";
      },
      params?: RequestParams,
    ) => Promise<HttpResponse<Repos, unknown>>;
    /**
     * @description Create a new repository for the authenticated user. OAuth users must supply repo scope.
     *
     * @name reposCreate
     * @request POST:/orgs/{org}/repos
     */
    reposCreate: (org: string, body: PostRepo, params?: RequestParams) => Promise<HttpResponse<Repos, unknown>>;
    /**
     * @description List teams.
     *
     * @name teamsDetail
     * @request GET:/orgs/{org}/teams
     */
    teamsDetail: (org: string, params?: RequestParams) => Promise<HttpResponse<Teams, unknown>>;
    /**
     * @description Create team. In order to create a team, the authenticated user must be an owner of organization.
     *
     * @name teamsCreate
     * @request POST:/orgs/{org}/teams
     */
    teamsCreate: (org: string, body: OrgTeamsPost, params?: RequestParams) => Promise<HttpResponse<Team, unknown>>;
  };
  rateLimit: {
    /**
     * @description Get your current rate limit status Note: Accessing this endpoint does not count against your rate limit.
     *
     * @name rateLimitList
     * @request GET:/rate_limit
     */
    rateLimitList: (params?: RequestParams) => Promise<HttpResponse<RateLimit, unknown>>;
  };
  repos: {
    /**
     * @description Delete a Repository. Deleting a repository requires admin access. If OAuth is used, the delete_repo scope is required.
     *
     * @name reposDelete
     * @request DELETE:/repos/{owner}/{repo}
     */
    reposDelete: (owner: string, repo: string, params?: RequestParams) => Promise<HttpResponse<any, unknown>>;
    /**
     * @description Get repository.
     *
     * @name reposDetail
     * @request GET:/repos/{owner}/{repo}
     */
    reposDetail: (owner: string, repo: string, params?: RequestParams) => Promise<HttpResponse<Repo, unknown>>;
    /**
     * @description Edit repository.
     *
     * @name reposPartialUpdate
     * @request PATCH:/repos/{owner}/{repo}
     */
    reposPartialUpdate: (
      owner: string,
      repo: string,
      body: RepoEdit,
      params?: RequestParams,
    ) => Promise<HttpResponse<Repo, unknown>>;
    /**
     * @description List assignees. This call lists all the available assignees (owner + collaborators) to which issues may be assigned.
     *
     * @name assigneesDetail
     * @request GET:/repos/{owner}/{repo}/assignees
     */
    assigneesDetail: (owner: string, repo: string, params?: RequestParams) => Promise<HttpResponse<Assignees, unknown>>;
    /**
 * @description Check assignee. You may also check to see if a particular user is an assignee for a repository.
 *
 * @name assigneesDetail
 * @request GET:/repos/{owner}/{repo}/assignees/{assignee} * @originalName assigneesDetail
 * @duplicate

 */
    assigneesDetail2: (
      owner: string,
      repo: string,
      assignee: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<any, unknown>>;
    /**
     * @description Get list of branches
     *
     * @name branchesDetail
     * @request GET:/repos/{owner}/{repo}/branches
     */
    branchesDetail: (owner: string, repo: string, params?: RequestParams) => Promise<HttpResponse<Branches, unknown>>;
    /**
 * @description Get Branch
 *
 * @name branchesDetail
 * @request GET:/repos/{owner}/{repo}/branches/{branch} * @originalName branchesDetail
 * @duplicate

 */
    branchesDetail2: (
      owner: string,
      repo: string,
      branch: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<Branch, unknown>>;
    /**
     * @description List. When authenticating as an organization owner of an organization-owned repository, all organization owners are included in the list of collaborators. Otherwise, only users with access to the repository are returned in the collaborators list.
     *
     * @name collaboratorsDetail
     * @request GET:/repos/{owner}/{repo}/collaborators
     */
    collaboratorsDetail: (owner: string, repo: string, params?: RequestParams) => Promise<HttpResponse<Users, unknown>>;
    /**
     * @description Remove collaborator.
     *
     * @name collaboratorsDelete
     * @request DELETE:/repos/{owner}/{repo}/collaborators/{user}
     */
    collaboratorsDelete: (
      owner: string,
      repo: string,
      user: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<any, unknown>>;
    /**
 * @description Check if user is a collaborator
 *
 * @name collaboratorsDetail
 * @request GET:/repos/{owner}/{repo}/collaborators/{user} * @originalName collaboratorsDetail
 * @duplicate

 */
    collaboratorsDetail2: (
      owner: string,
      repo: string,
      user: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<any, unknown>>;
    /**
     * @description Add collaborator.
     *
     * @name collaboratorsUpdate
     * @request PUT:/repos/{owner}/{repo}/collaborators/{user}
     */
    collaboratorsUpdate: (
      owner: string,
      repo: string,
      user: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<any, unknown>>;
    /**
     * @description List commit comments for a repository. Comments are ordered by ascending ID.
     *
     * @name commentsDetail
     * @request GET:/repos/{owner}/{repo}/comments
     */
    commentsDetail: (
      owner: string,
      repo: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<RepoComments, unknown>>;
    /**
     * @description Delete a commit comment
     *
     * @name commentsDelete
     * @request DELETE:/repos/{owner}/{repo}/comments/{commentId}
     */
    commentsDelete: (
      owner: string,
      repo: string,
      commentId: number,
      params?: RequestParams,
    ) => Promise<HttpResponse<any, unknown>>;
    /**
 * @description Get a single commit comment.
 *
 * @name commentsDetail
 * @request GET:/repos/{owner}/{repo}/comments/{commentId} * @originalName commentsDetail
 * @duplicate

 */
    commentsDetail2: (
      owner: string,
      repo: string,
      commentId: number,
      params?: RequestParams,
    ) => Promise<HttpResponse<CommitComment, unknown>>;
    /**
     * @description Update a commit comment.
     *
     * @name commentsPartialUpdate
     * @request PATCH:/repos/{owner}/{repo}/comments/{commentId}
     */
    commentsPartialUpdate: (
      owner: string,
      repo: string,
      commentId: number,
      body: CommentBody,
      params?: RequestParams,
    ) => Promise<HttpResponse<CommitComment, unknown>>;
    /**
     * @description List commits on a repository.
     *
     * @name commitsDetail
     * @request GET:/repos/{owner}/{repo}/commits
     */
    commitsDetail: (
      owner: string,
      repo: string,
      query?: {
        since?: string;
        sha?: string;
        path?: string;
        author?: string;
        until?: string;
      },
      params?: RequestParams,
    ) => Promise<HttpResponse<Commits, unknown>>;
    /**
     * @description Get the combined Status for a specific Ref The Combined status endpoint is currently available for developers to preview. During the preview period, the API may change without advance notice. Please see the blog post for full details. To access this endpoint during the preview period, you must provide a custom media type in the Accept header: application/vnd.github.she-hulk-preview+json
     *
     * @name commitsStatusDetail
     * @request GET:/repos/{owner}/{repo}/commits/{ref}/status
     */
    commitsStatusDetail: (
      owner: string,
      repo: string,
      ref: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<RefStatus, unknown>>;
    /**
 * @description Get a single commit.
 *
 * @name commitsDetail
 * @request GET:/repos/{owner}/{repo}/commits/{shaCode} * @originalName commitsDetail
 * @duplicate

 */
    commitsDetail2: (
      owner: string,
      repo: string,
      shaCode: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<Commit, unknown>>;
    /**
     * @description List comments for a single commitList comments for a single commit.
     *
     * @name commitsCommentsDetail
     * @request GET:/repos/{owner}/{repo}/commits/{shaCode}/comments
     */
    commitsCommentsDetail: (
      owner: string,
      repo: string,
      shaCode: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<RepoComments, unknown>>;
    /**
     * @description Create a commit comment.
     *
     * @name commitsCommentsCreate
     * @request POST:/repos/{owner}/{repo}/commits/{shaCode}/comments
     */
    commitsCommentsCreate: (
      owner: string,
      repo: string,
      shaCode: string,
      body: CommitCommentBody,
      params?: RequestParams,
    ) => Promise<HttpResponse<CommitComment, unknown>>;
    /**
     * @description Compare two commits
     *
     * @name compareDetail
     * @request GET:/repos/{owner}/{repo}/compare/{baseId}...{headId}
     */
    compareDetail: (
      owner: string,
      repo: string,
      baseId: string,
      headId: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<CompareCommits, unknown>>;
    /**
     * @description Delete a file. This method deletes a file in a repository.
     *
     * @name contentsDelete
     * @request DELETE:/repos/{owner}/{repo}/contents/{path}
     */
    contentsDelete: (
      owner: string,
      repo: string,
      path: string,
      body: DeleteFileBody,
      params?: RequestParams,
    ) => Promise<HttpResponse<DeleteFile, unknown>>;
    /**
     * @description Get contents. This method returns the contents of a file or directory in a repository. Files and symlinks support a custom media type for getting the raw content. Directories and submodules do not support custom media types. Note: This API supports files up to 1 megabyte in size. Here can be many outcomes. For details see "http://developer.github.com/v3/repos/contents/"
     *
     * @name contentsDetail
     * @request GET:/repos/{owner}/{repo}/contents/{path}
     */
    contentsDetail: (
      owner: string,
      repo: string,
      path: string,
      query?: {
        path?: string;
        ref?: string;
      },
      params?: RequestParams,
    ) => Promise<HttpResponse<ContentsPath, unknown>>;
    /**
     * @description Create a file.
     *
     * @name contentsUpdate
     * @request PUT:/repos/{owner}/{repo}/contents/{path}
     */
    contentsUpdate: (
      owner: string,
      repo: string,
      path: string,
      body: CreateFileBody,
      params?: RequestParams,
    ) => Promise<HttpResponse<CreateFile, unknown>>;
    /**
     * @description Get list of contributors.
     *
     * @name contributorsDetail
     * @request GET:/repos/{owner}/{repo}/contributors
     */
    contributorsDetail: (
      owner: string,
      repo: string,
      query: {
        anon: string;
      },
      params?: RequestParams,
    ) => Promise<HttpResponse<Users, unknown>>;
    /**
     * @description Users with pull access can view deployments for a repository
     *
     * @name deploymentsDetail
     * @request GET:/repos/{owner}/{repo}/deployments
     */
    deploymentsDetail: (
      owner: string,
      repo: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<RepoDeployments, unknown>>;
    /**
     * @description Users with push access can create a deployment for a given ref
     *
     * @name deploymentsCreate
     * @request POST:/repos/{owner}/{repo}/deployments
     */
    deploymentsCreate: (
      owner: string,
      repo: string,
      body: Deployment,
      params?: RequestParams,
    ) => Promise<HttpResponse<DeploymentResp, unknown>>;
    /**
     * @description Users with pull access can view deployment statuses for a deployment
     *
     * @name deploymentsStatusesDetail
     * @request GET:/repos/{owner}/{repo}/deployments/{id}/statuses
     */
    deploymentsStatusesDetail: (
      owner: string,
      repo: string,
      id: number,
      params?: RequestParams,
    ) => Promise<HttpResponse<DeploymentStatuses, unknown>>;
    /**
     * @description Create a Deployment Status Users with push access can create deployment statuses for a given deployment:
     *
     * @name deploymentsStatusesCreate
     * @request POST:/repos/{owner}/{repo}/deployments/{id}/statuses
     */
    deploymentsStatusesCreate: (
      owner: string,
      repo: string,
      id: number,
      body: DeploymentStatusesCreate,
      params?: RequestParams,
    ) => Promise<HttpResponse<any, unknown>>;
    /**
     * @description Deprecated. List downloads for a repository.
     *
     * @name downloadsDetail
     * @request GET:/repos/{owner}/{repo}/downloads
     */
    downloadsDetail: (owner: string, repo: string, params?: RequestParams) => Promise<HttpResponse<Downloads, unknown>>;
    /**
     * @description Deprecated. Delete a download.
     *
     * @name downloadsDelete
     * @request DELETE:/repos/{owner}/{repo}/downloads/{downloadId}
     */
    downloadsDelete: (
      owner: string,
      repo: string,
      downloadId: number,
      params?: RequestParams,
    ) => Promise<HttpResponse<any, unknown>>;
    /**
 * @description Deprecated. Get a single download.
 *
 * @name downloadsDetail
 * @request GET:/repos/{owner}/{repo}/downloads/{downloadId} * @originalName downloadsDetail
 * @duplicate

 */
    downloadsDetail2: (
      owner: string,
      repo: string,
      downloadId: number,
      params?: RequestParams,
    ) => Promise<HttpResponse<Download, unknown>>;
    /**
     * @description Get list of repository events.
     *
     * @name eventsDetail
     * @request GET:/repos/{owner}/{repo}/events
     */
    eventsDetail: (owner: string, repo: string, params?: RequestParams) => Promise<HttpResponse<Events, unknown>>;
    /**
     * @description List forks.
     *
     * @name forksDetail
     * @request GET:/repos/{owner}/{repo}/forks
     */
    forksDetail: (
      owner: string,
      repo: string,
      query?: {
        sort?: "newes" | "oldes" | "watchers";
      },
      params?: RequestParams,
    ) => Promise<HttpResponse<Repos, unknown>>;
    /**
     * @description Create a fork. Forking a Repository happens asynchronously. Therefore, you may have to wai a short period before accessing the git objects. If this takes longer than 5 minutes, be sure to contact Support.
     *
     * @name forksCreate
     * @request POST:/repos/{owner}/{repo}/forks
     */
    forksCreate: (
      owner: string,
      repo: string,
      body: ForkBody,
      params?: RequestParams,
    ) => Promise<HttpResponse<Repo, unknown>>;
    /**
     * @description Create a Blob.
     *
     * @name gitBlobsCreate
     * @request POST:/repos/{owner}/{repo}/git/blobs
     */
    gitBlobsCreate: (
      owner: string,
      repo: string,
      body: Blob,
      params?: RequestParams,
    ) => Promise<HttpResponse<Blobs, unknown>>;
    /**
     * @description Get a Blob. Since blobs can be any arbitrary binary data, the input and responses for the blob API takes an encoding parameter that can be either utf-8 or base64. If your data cannot be losslessly sent as a UTF-8 string, you can base64 encode it.
     *
     * @name gitBlobsDetail
     * @request GET:/repos/{owner}/{repo}/git/blobs/{shaCode}
     */
    gitBlobsDetail: (
      owner: string,
      repo: string,
      shaCode: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<Blob, unknown>>;
    /**
     * @description Create a Commit.
     *
     * @name gitCommitsCreate
     * @request POST:/repos/{owner}/{repo}/git/commits
     */
    gitCommitsCreate: (
      owner: string,
      repo: string,
      body: RepoCommitBody,
      params?: RequestParams,
    ) => Promise<HttpResponse<GitCommit, unknown>>;
    /**
     * @description Get a Commit.
     *
     * @name gitCommitsDetail
     * @request GET:/repos/{owner}/{repo}/git/commits/{shaCode}
     */
    gitCommitsDetail: (
      owner: string,
      repo: string,
      shaCode: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<RepoCommit, unknown>>;
    /**
     * @description Get all References
     *
     * @name gitRefsDetail
     * @request GET:/repos/{owner}/{repo}/git/refs
     */
    gitRefsDetail: (owner: string, repo: string, params?: RequestParams) => Promise<HttpResponse<Refs, unknown>>;
    /**
     * @description Create a Reference
     *
     * @name gitRefsCreate
     * @request POST:/repos/{owner}/{repo}/git/refs
     */
    gitRefsCreate: (
      owner: string,
      repo: string,
      body: RefsBody,
      params?: RequestParams,
    ) => Promise<HttpResponse<HeadBranch, unknown>>;
    /**
     * @description Delete a Reference Example: Deleting a branch: DELETE /repos/octocat/Hello-World/git/refs/heads/feature-a Example: Deleting a tag:        DELETE /repos/octocat/Hello-World/git/refs/tags/v1.0
     *
     * @name gitRefsDelete
     * @request DELETE:/repos/{owner}/{repo}/git/refs/{ref}
     */
    gitRefsDelete: (
      owner: string,
      repo: string,
      ref: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<any, unknown>>;
    /**
 * @description Get a Reference
 *
 * @name gitRefsDetail
 * @request GET:/repos/{owner}/{repo}/git/refs/{ref} * @originalName gitRefsDetail
 * @duplicate

 */
    gitRefsDetail2: (
      owner: string,
      repo: string,
      ref: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<HeadBranch, unknown>>;
    /**
     * @description Update a Reference
     *
     * @name gitRefsPartialUpdate
     * @request PATCH:/repos/{owner}/{repo}/git/refs/{ref}
     */
    gitRefsPartialUpdate: (
      owner: string,
      repo: string,
      ref: string,
      body: GitRefPatch,
      params?: RequestParams,
    ) => Promise<HttpResponse<HeadBranch, unknown>>;
    /**
     * @description Create a Tag Object. Note that creating a tag object does not create the reference that makes a tag in Git. If you want to create an annotated tag in Git, you have to do this call to create the tag object, and then create the refs/tags/[tag] reference. If you want to create a lightweight tag, you only have to create the tag reference - this call would be unnecessary.
     *
     * @name gitTagsCreate
     * @request POST:/repos/{owner}/{repo}/git/tags
     */
    gitTagsCreate: (
      owner: string,
      repo: string,
      body: TagBody,
      params?: RequestParams,
    ) => Promise<HttpResponse<Tag, unknown>>;
    /**
     * @description Get a Tag.
     *
     * @name gitTagsDetail
     * @request GET:/repos/{owner}/{repo}/git/tags/{shaCode}
     */
    gitTagsDetail: (
      owner: string,
      repo: string,
      shaCode: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<Tag, unknown>>;
    /**
     * @description Create a Tree. The tree creation API will take nested entries as well. If both a tree and a nested path modifying that tree are specified, it will overwrite the contents of that tree with the new path contents and write a new tree out.
     *
     * @name gitTreesCreate
     * @request POST:/repos/{owner}/{repo}/git/trees
     */
    gitTreesCreate: (
      owner: string,
      repo: string,
      body: Tree,
      params?: RequestParams,
    ) => Promise<HttpResponse<Trees, unknown>>;
    /**
     * @description Get a Tree.
     *
     * @name gitTreesDetail
     * @request GET:/repos/{owner}/{repo}/git/trees/{shaCode}
     */
    gitTreesDetail: (
      owner: string,
      repo: string,
      shaCode: string,
      query?: {
        recursive?: number;
      },
      params?: RequestParams,
    ) => Promise<HttpResponse<Tree, unknown>>;
    /**
     * @description Get list of hooks.
     *
     * @name hooksDetail
     * @request GET:/repos/{owner}/{repo}/hooks
     */
    hooksDetail: (owner: string, repo: string, params?: RequestParams) => Promise<HttpResponse<Hook, unknown>>;
    /**
     * @description Create a hook.
     *
     * @name hooksCreate
     * @request POST:/repos/{owner}/{repo}/hooks
     */
    hooksCreate: (
      owner: string,
      repo: string,
      body: HookBody,
      params?: RequestParams,
    ) => Promise<HttpResponse<Hook, unknown>>;
    /**
     * @description Delete a hook.
     *
     * @name hooksDelete
     * @request DELETE:/repos/{owner}/{repo}/hooks/{hookId}
     */
    hooksDelete: (
      owner: string,
      repo: string,
      hookId: number,
      params?: RequestParams,
    ) => Promise<HttpResponse<any, unknown>>;
    /**
 * @description Get single hook.
 *
 * @name hooksDetail
 * @request GET:/repos/{owner}/{repo}/hooks/{hookId} * @originalName hooksDetail
 * @duplicate

 */
    hooksDetail2: (
      owner: string,
      repo: string,
      hookId: number,
      params?: RequestParams,
    ) => Promise<HttpResponse<Hook, unknown>>;
    /**
     * @description Edit a hook.
     *
     * @name hooksPartialUpdate
     * @request PATCH:/repos/{owner}/{repo}/hooks/{hookId}
     */
    hooksPartialUpdate: (
      owner: string,
      repo: string,
      hookId: number,
      body: HookBody,
      params?: RequestParams,
    ) => Promise<HttpResponse<Hook, unknown>>;
    /**
     * @description Test a push hook. This will trigger the hook with the latest push to the current repository if the hook is subscribed to push events. If the hook is not subscribed to push events, the server will respond with 204 but no test POST will be generated. Note: Previously /repos/:owner/:repo/hooks/:id/tes
     *
     * @name hooksTestsCreate
     * @request POST:/repos/{owner}/{repo}/hooks/{hookId}/tests
     */
    hooksTestsCreate: (
      owner: string,
      repo: string,
      hookId: number,
      params?: RequestParams,
    ) => Promise<HttpResponse<any, unknown>>;
    /**
     * @description List issues for a repository.
     *
     * @name issuesDetail
     * @request GET:/repos/{owner}/{repo}/issues
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
    ) => Promise<HttpResponse<Issues, unknown>>;
    /**
     * @description Create an issue. Any user with pull access to a repository can create an issue.
     *
     * @name issuesCreate
     * @request POST:/repos/{owner}/{repo}/issues
     */
    issuesCreate: (
      owner: string,
      repo: string,
      body: Issue,
      params?: RequestParams,
    ) => Promise<HttpResponse<Issue, unknown>>;
    /**
     * @description List comments in a repository.
     *
     * @name issuesCommentsDetail
     * @request GET:/repos/{owner}/{repo}/issues/comments
     */
    issuesCommentsDetail: (
      owner: string,
      repo: string,
      query?: {
        direction?: string;
        sort?: "created" | "updated";
        since?: string;
      },
      params?: RequestParams,
    ) => Promise<HttpResponse<IssuesComments, unknown>>;
    /**
     * @description Delete a comment.
     *
     * @name issuesCommentsDelete
     * @request DELETE:/repos/{owner}/{repo}/issues/comments/{commentId}
     */
    issuesCommentsDelete: (
      owner: string,
      repo: string,
      commentId: number,
      params?: RequestParams,
    ) => Promise<HttpResponse<any, unknown>>;
    /**
 * @description Get a single comment.
 *
 * @name issuesCommentsDetail
 * @request GET:/repos/{owner}/{repo}/issues/comments/{commentId} * @originalName issuesCommentsDetail
 * @duplicate

 */
    issuesCommentsDetail2: (
      owner: string,
      repo: string,
      commentId: number,
      params?: RequestParams,
    ) => Promise<HttpResponse<IssuesComment, unknown>>;
    /**
     * @description Edit a comment.
     *
     * @name issuesCommentsPartialUpdate
     * @request PATCH:/repos/{owner}/{repo}/issues/comments/{commentId}
     */
    issuesCommentsPartialUpdate: (
      owner: string,
      repo: string,
      commentId: number,
      body: CommentBody,
      params?: RequestParams,
    ) => Promise<HttpResponse<IssuesComment, unknown>>;
    /**
     * @description List issue events for a repository.
     *
     * @name issuesEventsDetail
     * @request GET:/repos/{owner}/{repo}/issues/events
     */
    issuesEventsDetail: (
      owner: string,
      repo: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<IssueEvents, unknown>>;
    /**
 * @description Get a single event.
 *
 * @name issuesEventsDetail
 * @request GET:/repos/{owner}/{repo}/issues/events/{eventId} * @originalName issuesEventsDetail
 * @duplicate

 */
    issuesEventsDetail2: (
      owner: string,
      repo: string,
      eventId: number,
      params?: RequestParams,
    ) => Promise<HttpResponse<IssueEvent, unknown>>;
    /**
 * @description Get a single issue
 *
 * @name issuesDetail
 * @request GET:/repos/{owner}/{repo}/issues/{number} * @originalName issuesDetail
 * @duplicate

 */
    issuesDetail2: (
      owner: string,
      repo: string,
      number: number,
      params?: RequestParams,
    ) => Promise<HttpResponse<Issue, unknown>>;
    /**
     * @description Edit an issue. Issue owners and users with push access can edit an issue.
     *
     * @name issuesPartialUpdate
     * @request PATCH:/repos/{owner}/{repo}/issues/{number}
     */
    issuesPartialUpdate: (
      owner: string,
      repo: string,
      number: number,
      body: Issue,
      params?: RequestParams,
    ) => Promise<HttpResponse<Issue, unknown>>;
    /**
 * @description List comments on an issue.
 *
 * @name issuesCommentsDetail
 * @request GET:/repos/{owner}/{repo}/issues/{number}/comments * @originalName issuesCommentsDetail
 * @duplicate

 */
    issuesCommentsDetail3: (
      owner: string,
      repo: string,
      number: number,
      params?: RequestParams,
    ) => Promise<HttpResponse<IssuesComments, unknown>>;
    /**
     * @description Create a comment.
     *
     * @name issuesCommentsCreate
     * @request POST:/repos/{owner}/{repo}/issues/{number}/comments
     */
    issuesCommentsCreate: (
      owner: string,
      repo: string,
      number: number,
      body: CommentBody,
      params?: RequestParams,
    ) => Promise<HttpResponse<IssuesComment, unknown>>;
    /**
 * @description List events for an issue.
 *
 * @name issuesEventsDetail
 * @request GET:/repos/{owner}/{repo}/issues/{number}/events * @originalName issuesEventsDetail
 * @duplicate

 */
    issuesEventsDetail3: (
      owner: string,
      repo: string,
      number: number,
      params?: RequestParams,
    ) => Promise<HttpResponse<IssueEvents, unknown>>;
    /**
     * @description Remove all labels from an issue.
     *
     * @name issuesLabelsDelete
     * @request DELETE:/repos/{owner}/{repo}/issues/{number}/labels
     */
    issuesLabelsDelete: (
      owner: string,
      repo: string,
      number: number,
      params?: RequestParams,
    ) => Promise<HttpResponse<any, unknown>>;
    /**
     * @description List labels on an issue.
     *
     * @name issuesLabelsDetail
     * @request GET:/repos/{owner}/{repo}/issues/{number}/labels
     */
    issuesLabelsDetail: (
      owner: string,
      repo: string,
      number: number,
      params?: RequestParams,
    ) => Promise<HttpResponse<Labels, unknown>>;
    /**
     * @description Add labels to an issue.
     *
     * @name issuesLabelsCreate
     * @request POST:/repos/{owner}/{repo}/issues/{number}/labels
     */
    issuesLabelsCreate: (
      owner: string,
      repo: string,
      number: number,
      body: EmailsPost,
      params?: RequestParams,
    ) => Promise<HttpResponse<Label, unknown>>;
    /**
     * @description Replace all labels for an issue. Sending an empty array ([]) will remove all Labels from the Issue.
     *
     * @name issuesLabelsUpdate
     * @request PUT:/repos/{owner}/{repo}/issues/{number}/labels
     */
    issuesLabelsUpdate: (
      owner: string,
      repo: string,
      number: number,
      body: EmailsPost,
      params?: RequestParams,
    ) => Promise<HttpResponse<Label, unknown>>;
    /**
 * @description Remove a label from an issue.
 *
 * @name issuesLabelsDelete
 * @request DELETE:/repos/{owner}/{repo}/issues/{number}/labels/{name} * @originalName issuesLabelsDelete
 * @duplicate

 */
    issuesLabelsDelete2: (
      owner: string,
      repo: string,
      number: number,
      name: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<any, unknown>>;
    /**
     * @description Get list of keys.
     *
     * @name keysDetail
     * @request GET:/repos/{owner}/{repo}/keys
     */
    keysDetail: (owner: string, repo: string, params?: RequestParams) => Promise<HttpResponse<Keys, unknown>>;
    /**
     * @description Create a key.
     *
     * @name keysCreate
     * @request POST:/repos/{owner}/{repo}/keys
     */
    keysCreate: (
      owner: string,
      repo: string,
      body: UserKeysPost,
      params?: RequestParams,
    ) => Promise<HttpResponse<UserKeysKeyId, unknown>>;
    /**
     * @description Delete a key.
     *
     * @name keysDelete
     * @request DELETE:/repos/{owner}/{repo}/keys/{keyId}
     */
    keysDelete: (
      owner: string,
      repo: string,
      keyId: number,
      params?: RequestParams,
    ) => Promise<HttpResponse<any, unknown>>;
    /**
 * @description Get a key
 *
 * @name keysDetail
 * @request GET:/repos/{owner}/{repo}/keys/{keyId} * @originalName keysDetail
 * @duplicate

 */
    keysDetail2: (
      owner: string,
      repo: string,
      keyId: number,
      params?: RequestParams,
    ) => Promise<HttpResponse<UserKeysKeyId, unknown>>;
    /**
     * @description List all labels for this repository.
     *
     * @name labelsDetail
     * @request GET:/repos/{owner}/{repo}/labels
     */
    labelsDetail: (owner: string, repo: string, params?: RequestParams) => Promise<HttpResponse<Labels, unknown>>;
    /**
     * @description Create a label.
     *
     * @name labelsCreate
     * @request POST:/repos/{owner}/{repo}/labels
     */
    labelsCreate: (
      owner: string,
      repo: string,
      body: EmailsPost,
      params?: RequestParams,
    ) => Promise<HttpResponse<Label, unknown>>;
    /**
     * @description Delete a label.
     *
     * @name labelsDelete
     * @request DELETE:/repos/{owner}/{repo}/labels/{name}
     */
    labelsDelete: (
      owner: string,
      repo: string,
      name: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<any, unknown>>;
    /**
 * @description Get a single label.
 *
 * @name labelsDetail
 * @request GET:/repos/{owner}/{repo}/labels/{name} * @originalName labelsDetail
 * @duplicate

 */
    labelsDetail2: (
      owner: string,
      repo: string,
      name: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<Label, unknown>>;
    /**
     * @description Update a label.
     *
     * @name labelsPartialUpdate
     * @request PATCH:/repos/{owner}/{repo}/labels/{name}
     */
    labelsPartialUpdate: (
      owner: string,
      repo: string,
      name: string,
      body: EmailsPost,
      params?: RequestParams,
    ) => Promise<HttpResponse<Label, unknown>>;
    /**
     * @description List languages. List languages for the specified repository. The value on the right of a language is the number of bytes of code written in that language.
     *
     * @name languagesDetail
     * @request GET:/repos/{owner}/{repo}/languages
     */
    languagesDetail: (
      owner: string,
      repo: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<Record<string, number>, unknown>>;
    /**
     * @description Perform a merge.
     *
     * @name mergesCreate
     * @request POST:/repos/{owner}/{repo}/merges
     */
    mergesCreate: (
      owner: string,
      repo: string,
      body: MergesBody,
      params?: RequestParams,
    ) => Promise<HttpResponse<MergesSuccessful, unknown>>;
    /**
     * @description List milestones for a repository.
     *
     * @name milestonesDetail
     * @request GET:/repos/{owner}/{repo}/milestones
     */
    milestonesDetail: (
      owner: string,
      repo: string,
      query?: {
        state?: "open" | "closed";
        direction?: string;
        sort?: "due_date" | "completeness";
      },
      params?: RequestParams,
    ) => Promise<HttpResponse<Milestone, unknown>>;
    /**
     * @description Create a milestone.
     *
     * @name milestonesCreate
     * @request POST:/repos/{owner}/{repo}/milestones
     */
    milestonesCreate: (
      owner: string,
      repo: string,
      body: MilestoneUpdate,
      params?: RequestParams,
    ) => Promise<HttpResponse<Milestone, unknown>>;
    /**
     * @description Delete a milestone.
     *
     * @name milestonesDelete
     * @request DELETE:/repos/{owner}/{repo}/milestones/{number}
     */
    milestonesDelete: (
      owner: string,
      repo: string,
      number: number,
      params?: RequestParams,
    ) => Promise<HttpResponse<any, unknown>>;
    /**
 * @description Get a single milestone.
 *
 * @name milestonesDetail
 * @request GET:/repos/{owner}/{repo}/milestones/{number} * @originalName milestonesDetail
 * @duplicate

 */
    milestonesDetail2: (
      owner: string,
      repo: string,
      number: number,
      params?: RequestParams,
    ) => Promise<HttpResponse<Milestone, unknown>>;
    /**
     * @description Update a milestone.
     *
     * @name milestonesPartialUpdate
     * @request PATCH:/repos/{owner}/{repo}/milestones/{number}
     */
    milestonesPartialUpdate: (
      owner: string,
      repo: string,
      number: number,
      body: MilestoneUpdate,
      params?: RequestParams,
    ) => Promise<HttpResponse<Milestone, unknown>>;
    /**
     * @description Get labels for every issue in a milestone.
     *
     * @name milestonesLabelsDetail
     * @request GET:/repos/{owner}/{repo}/milestones/{number}/labels
     */
    milestonesLabelsDetail: (
      owner: string,
      repo: string,
      number: number,
      params?: RequestParams,
    ) => Promise<HttpResponse<Labels, unknown>>;
    /**
     * @description List your notifications in a repository List all notifications for the current user.
     *
     * @name notificationsDetail
     * @request GET:/repos/{owner}/{repo}/notifications
     */
    notificationsDetail: (
      owner: string,
      repo: string,
      query?: {
        all?: boolean;
        participating?: boolean;
        since?: string;
      },
      params?: RequestParams,
    ) => Promise<HttpResponse<Notifications, unknown>>;
    /**
     * @description Mark notifications as read in a repository. Marking all notifications in a repository as "read" removes them from the default view on GitHub.com.
     *
     * @name notificationsUpdate
     * @request PUT:/repos/{owner}/{repo}/notifications
     */
    notificationsUpdate: (
      owner: string,
      repo: string,
      body: NotificationMarkRead,
      params?: RequestParams,
    ) => Promise<HttpResponse<any, unknown>>;
    /**
     * @description List pull requests.
     *
     * @name pullsDetail
     * @request GET:/repos/{owner}/{repo}/pulls
     */
    pullsDetail: (
      owner: string,
      repo: string,
      query?: {
        state?: "open" | "closed";
        head?: string;
        base?: string;
      },
      params?: RequestParams,
    ) => Promise<HttpResponse<Pulls, unknown>>;
    /**
     * @description Create a pull request.
     *
     * @name pullsCreate
     * @request POST:/repos/{owner}/{repo}/pulls
     */
    pullsCreate: (
      owner: string,
      repo: string,
      body: PullsPost,
      params?: RequestParams,
    ) => Promise<HttpResponse<Pulls, unknown>>;
    /**
     * @description List comments in a repository. By default, Review Comments are ordered by ascending ID.
     *
     * @name pullsCommentsDetail
     * @request GET:/repos/{owner}/{repo}/pulls/comments
     */
    pullsCommentsDetail: (
      owner: string,
      repo: string,
      query?: {
        direction?: string;
        sort?: "created" | "updated";
        since?: string;
      },
      params?: RequestParams,
    ) => Promise<HttpResponse<IssuesComments, unknown>>;
    /**
     * @description Delete a comment.
     *
     * @name pullsCommentsDelete
     * @request DELETE:/repos/{owner}/{repo}/pulls/comments/{commentId}
     */
    pullsCommentsDelete: (
      owner: string,
      repo: string,
      commentId: number,
      params?: RequestParams,
    ) => Promise<HttpResponse<any, unknown>>;
    /**
 * @description Get a single comment.
 *
 * @name pullsCommentsDetail
 * @request GET:/repos/{owner}/{repo}/pulls/comments/{commentId} * @originalName pullsCommentsDetail
 * @duplicate

 */
    pullsCommentsDetail2: (
      owner: string,
      repo: string,
      commentId: number,
      params?: RequestParams,
    ) => Promise<HttpResponse<PullsComment, unknown>>;
    /**
     * @description Edit a comment.
     *
     * @name pullsCommentsPartialUpdate
     * @request PATCH:/repos/{owner}/{repo}/pulls/comments/{commentId}
     */
    pullsCommentsPartialUpdate: (
      owner: string,
      repo: string,
      commentId: number,
      body: CommentBody,
      params?: RequestParams,
    ) => Promise<HttpResponse<PullsComment, unknown>>;
    /**
 * @description Get a single pull request.
 *
 * @name pullsDetail
 * @request GET:/repos/{owner}/{repo}/pulls/{number} * @originalName pullsDetail
 * @duplicate

 */
    pullsDetail2: (
      owner: string,
      repo: string,
      number: number,
      params?: RequestParams,
    ) => Promise<HttpResponse<PullRequest, unknown>>;
    /**
     * @description Update a pull request.
     *
     * @name pullsPartialUpdate
     * @request PATCH:/repos/{owner}/{repo}/pulls/{number}
     */
    pullsPartialUpdate: (
      owner: string,
      repo: string,
      number: number,
      body: PullUpdate,
      params?: RequestParams,
    ) => Promise<HttpResponse<Repo, unknown>>;
    /**
 * @description List comments on a pull request.
 *
 * @name pullsCommentsDetail
 * @request GET:/repos/{owner}/{repo}/pulls/{number}/comments * @originalName pullsCommentsDetail
 * @duplicate

 */
    pullsCommentsDetail3: (
      owner: string,
      repo: string,
      number: number,
      params?: RequestParams,
    ) => Promise<HttpResponse<PullsComment, unknown>>;
    /**
     * @description Create a comment. #TODO Alternative input ( http://developer.github.com/v3/pulls/comments/ ) description: | Alternative Input. Instead of passing commit_id, path, and position you can reply to an existing Pull Request Comment like this: body Required string in_reply_to Required number - Comment id to reply to.
     *
     * @name pullsCommentsCreate
     * @request POST:/repos/{owner}/{repo}/pulls/{number}/comments
     */
    pullsCommentsCreate: (
      owner: string,
      repo: string,
      number: number,
      body: PullsCommentPost,
      params?: RequestParams,
    ) => Promise<HttpResponse<PullsComment, unknown>>;
    /**
     * @description List commits on a pull request.
     *
     * @name pullsCommitsDetail
     * @request GET:/repos/{owner}/{repo}/pulls/{number}/commits
     */
    pullsCommitsDetail: (
      owner: string,
      repo: string,
      number: number,
      params?: RequestParams,
    ) => Promise<HttpResponse<Commits, unknown>>;
    /**
     * @description List pull requests files.
     *
     * @name pullsFilesDetail
     * @request GET:/repos/{owner}/{repo}/pulls/{number}/files
     */
    pullsFilesDetail: (
      owner: string,
      repo: string,
      number: number,
      params?: RequestParams,
    ) => Promise<HttpResponse<Pulls, unknown>>;
    /**
     * @description Get if a pull request has been merged.
     *
     * @name pullsMergeDetail
     * @request GET:/repos/{owner}/{repo}/pulls/{number}/merge
     */
    pullsMergeDetail: (
      owner: string,
      repo: string,
      number: number,
      params?: RequestParams,
    ) => Promise<HttpResponse<any, unknown>>;
    /**
     * @description Merge a pull request (Merge Button's)
     *
     * @name pullsMergeUpdate
     * @request PUT:/repos/{owner}/{repo}/pulls/{number}/merge
     */
    pullsMergeUpdate: (
      owner: string,
      repo: string,
      number: number,
      body: MergePullBody,
      params?: RequestParams,
    ) => Promise<HttpResponse<Merge, unknown>>;
    /**
     * @description Get the README. This method returns the preferred README for a repository.
     *
     * @name readmeDetail
     * @request GET:/repos/{owner}/{repo}/readme
     */
    readmeDetail: (
      owner: string,
      repo: string,
      query?: {
        ref?: string;
      },
      params?: RequestParams,
    ) => Promise<HttpResponse<ContentsPath, unknown>>;
    /**
     * @description Users with push access to the repository will receive all releases (i.e., published releases and draft releases). Users with pull access will receive published releases only
     *
     * @name releasesDetail
     * @request GET:/repos/{owner}/{repo}/releases
     */
    releasesDetail: (owner: string, repo: string, params?: RequestParams) => Promise<HttpResponse<Releases, unknown>>;
    /**
     * @description Create a release Users with push access to the repository can create a release.
     *
     * @name releasesCreate
     * @request POST:/repos/{owner}/{repo}/releases
     */
    releasesCreate: (
      owner: string,
      repo: string,
      body: ReleaseCreate,
      params?: RequestParams,
    ) => Promise<HttpResponse<Release, unknown>>;
    /**
     * @description Delete a release asset
     *
     * @name releasesAssetsDelete
     * @request DELETE:/repos/{owner}/{repo}/releases/assets/{id}
     */
    releasesAssetsDelete: (
      owner: string,
      repo: string,
      id: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<any, unknown>>;
    /**
     * @description Get a single release asset
     *
     * @name releasesAssetsDetail
     * @request GET:/repos/{owner}/{repo}/releases/assets/{id}
     */
    releasesAssetsDetail: (
      owner: string,
      repo: string,
      id: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<Asset, unknown>>;
    /**
     * @description Edit a release asset Users with push access to the repository can edit a release asset.
     *
     * @name releasesAssetsPartialUpdate
     * @request PATCH:/repos/{owner}/{repo}/releases/assets/{id}
     */
    releasesAssetsPartialUpdate: (
      owner: string,
      repo: string,
      id: string,
      body: AssetPatch,
      params?: RequestParams,
    ) => Promise<HttpResponse<Asset, unknown>>;
    /**
     * @description Users with push access to the repository can delete a release.
     *
     * @name releasesDelete
     * @request DELETE:/repos/{owner}/{repo}/releases/{id}
     */
    releasesDelete: (
      owner: string,
      repo: string,
      id: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<any, unknown>>;
    /**
 * @description Get a single release
 *
 * @name releasesDetail
 * @request GET:/repos/{owner}/{repo}/releases/{id} * @originalName releasesDetail
 * @duplicate

 */
    releasesDetail2: (
      owner: string,
      repo: string,
      id: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<Release, unknown>>;
    /**
     * @description Users with push access to the repository can edit a release
     *
     * @name releasesPartialUpdate
     * @request PATCH:/repos/{owner}/{repo}/releases/{id}
     */
    releasesPartialUpdate: (
      owner: string,
      repo: string,
      id: string,
      body: ReleaseCreate,
      params?: RequestParams,
    ) => Promise<HttpResponse<Release, unknown>>;
    /**
 * @description List assets for a release
 *
 * @name releasesAssetsDetail
 * @request GET:/repos/{owner}/{repo}/releases/{id}/assets * @originalName releasesAssetsDetail
 * @duplicate

 */
    releasesAssetsDetail2: (
      owner: string,
      repo: string,
      id: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<Assets, unknown>>;
    /**
     * @description List Stargazers.
     *
     * @name stargazersDetail
     * @request GET:/repos/{owner}/{repo}/stargazers
     */
    stargazersDetail: (owner: string, repo: string, params?: RequestParams) => Promise<HttpResponse<Users, unknown>>;
    /**
     * @description Get the number of additions and deletions per week. Returns a weekly aggregate of the number of additions and deletions pushed to a repository.
     *
     * @name statsCodeFrequencyDetail
     * @request GET:/repos/{owner}/{repo}/stats/code_frequency
     */
    statsCodeFrequencyDetail: (
      owner: string,
      repo: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<CodeFrequencyStats, unknown>>;
    /**
     * @description Get the last year of commit activity data. Returns the last year of commit activity grouped by week. The days array is a group of commits per day, starting on Sunday.
     *
     * @name statsCommitActivityDetail
     * @request GET:/repos/{owner}/{repo}/stats/commit_activity
     */
    statsCommitActivityDetail: (
      owner: string,
      repo: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<CommitActivityStats, unknown>>;
    /**
     * @description Get contributors list with additions, deletions, and commit counts.
     *
     * @name statsContributorsDetail
     * @request GET:/repos/{owner}/{repo}/stats/contributors
     */
    statsContributorsDetail: (
      owner: string,
      repo: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<ContributorsStats, unknown>>;
    /**
     * @description Get the weekly commit count for the repo owner and everyone else.
     *
     * @name statsParticipationDetail
     * @request GET:/repos/{owner}/{repo}/stats/participation
     */
    statsParticipationDetail: (
      owner: string,
      repo: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<ParticipationStats, unknown>>;
    /**
     * @description Get the number of commits per hour in each day. Each array contains the day number, hour number, and number of commits 0-6 Sunday - Saturday 0-23 Hour of day Number of commits For example, [2, 14, 25] indicates that there were 25 total commits, during the 2.00pm hour on Tuesdays. All times are based on the time zone of individual commits.
     *
     * @name statsPunchCardDetail
     * @request GET:/repos/{owner}/{repo}/stats/punch_card
     */
    statsPunchCardDetail: (
      owner: string,
      repo: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<CodeFrequencyStats, unknown>>;
    /**
     * @description List Statuses for a specific Ref.
     *
     * @name statusesDetail
     * @request GET:/repos/{owner}/{repo}/statuses/{ref}
     */
    statusesDetail: (
      owner: string,
      repo: string,
      ref: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<Ref, unknown>>;
    /**
     * @description Create a Status.
     *
     * @name statusesCreate
     * @request POST:/repos/{owner}/{repo}/statuses/{ref}
     */
    statusesCreate: (
      owner: string,
      repo: string,
      ref: string,
      body: HeadBranch,
      params?: RequestParams,
    ) => Promise<HttpResponse<Ref, unknown>>;
    /**
     * @description List watchers.
     *
     * @name subscribersDetail
     * @request GET:/repos/{owner}/{repo}/subscribers
     */
    subscribersDetail: (owner: string, repo: string, params?: RequestParams) => Promise<HttpResponse<Users, unknown>>;
    /**
     * @description Delete a Repository Subscription.
     *
     * @name subscriptionDelete
     * @request DELETE:/repos/{owner}/{repo}/subscription
     */
    subscriptionDelete: (owner: string, repo: string, params?: RequestParams) => Promise<HttpResponse<any, unknown>>;
    /**
     * @description Get a Repository Subscription.
     *
     * @name subscriptionDetail
     * @request GET:/repos/{owner}/{repo}/subscription
     */
    subscriptionDetail: (
      owner: string,
      repo: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<Subscription, unknown>>;
    /**
     * @description Set a Repository Subscription
     *
     * @name subscriptionUpdate
     * @request PUT:/repos/{owner}/{repo}/subscription
     */
    subscriptionUpdate: (
      owner: string,
      repo: string,
      body: SubscriptionBody,
      params?: RequestParams,
    ) => Promise<HttpResponse<Subscription, unknown>>;
    /**
     * @description Get list of tags.
     *
     * @name tagsDetail
     * @request GET:/repos/{owner}/{repo}/tags
     */
    tagsDetail: (owner: string, repo: string, params?: RequestParams) => Promise<HttpResponse<Tags, unknown>>;
    /**
     * @description Get list of teams
     *
     * @name teamsDetail
     * @request GET:/repos/{owner}/{repo}/teams
     */
    teamsDetail: (owner: string, repo: string, params?: RequestParams) => Promise<HttpResponse<Teams, unknown>>;
    /**
     * @description List Stargazers. New implementation.
     *
     * @name watchersDetail
     * @request GET:/repos/{owner}/{repo}/watchers
     */
    watchersDetail: (owner: string, repo: string, params?: RequestParams) => Promise<HttpResponse<Users, unknown>>;
    /**
 * @description Get archive link. This method will return a 302 to a URL to download a tarball or zipball archive for a repository. Please make sure your HTTP framework is configured to follow redirects or you will need to use the Location header to make a second GET request. Note: For private repositories, these links are temporary and expire quickly.
 *
 * @name reposDetail
 * @request GET:/repos/{owner}/{repo}/{archive_format}/{path} * @originalName reposDetail
 * @duplicate

 */
    reposDetail2: (
      owner: string,
      repo: string,
      archive_format: "tarball" | "zipball",
      path: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<any, unknown>>;
  };
  repositories: {
    /**
     * @description List all public repositories. This provides a dump of every public repository, in the order that they were created. Note: Pagination is powered exclusively by the since parameter. is the Link header to get the URL for the next page of repositories.
     *
     * @name repositoriesList
     * @request GET:/repositories
     */
    repositoriesList: (
      query?: {
        since?: string;
      },
      params?: RequestParams,
    ) => Promise<HttpResponse<Repos, unknown>>;
  };
  search: {
    /**
     * @description Search code.
     *
     * @name codeList
     * @request GET:/search/code
     */
    codeList: (
      query: {
        order?: "desc" | "asc";
        q: string;
        sort?: "indexed";
      },
      params?: RequestParams,
    ) => Promise<HttpResponse<SearchCode, unknown>>;
    /**
     * @description Find issues by state and keyword. (This method returns up to 100 results per page.)
     *
     * @name issuesList
     * @request GET:/search/issues
     */
    issuesList: (
      query: {
        order?: "desc" | "asc";
        q: string;
        sort?: "updated" | "created" | "comments";
      },
      params?: RequestParams,
    ) => Promise<HttpResponse<SearchIssues, unknown>>;
    /**
     * @description Search repositories.
     *
     * @name repositoriesList
     * @request GET:/search/repositories
     */
    repositoriesList: (
      query: {
        order?: "desc" | "asc";
        q: string;
        sort?: "stars" | "forks" | "updated";
      },
      params?: RequestParams,
    ) => Promise<HttpResponse<SearchRepositories, unknown>>;
    /**
     * @description Search users.
     *
     * @name usersList
     * @request GET:/search/users
     */
    usersList: (
      query: {
        order?: "desc" | "asc";
        q: string;
        sort?: "followers" | "repositories" | "joined";
      },
      params?: RequestParams,
    ) => Promise<HttpResponse<SearchUsers, unknown>>;
  };
  teams: {
    /**
     * @description Delete team. In order to delete a team, the authenticated user must be an owner of the org that the team is associated with.
     *
     * @name teamsDelete
     * @request DELETE:/teams/{teamId}
     */
    teamsDelete: (teamId: number, params?: RequestParams) => Promise<HttpResponse<any, unknown>>;
    /**
     * @description Get team.
     *
     * @name teamsDetail
     * @request GET:/teams/{teamId}
     */
    teamsDetail: (teamId: number, params?: RequestParams) => Promise<HttpResponse<Team, unknown>>;
    /**
     * @description Edit team. In order to edit a team, the authenticated user must be an owner of the org that the team is associated with.
     *
     * @name teamsPartialUpdate
     * @request PATCH:/teams/{teamId}
     */
    teamsPartialUpdate: (
      teamId: number,
      body: EditTeam,
      params?: RequestParams,
    ) => Promise<HttpResponse<Team, unknown>>;
    /**
     * @description List team members. In order to list members in a team, the authenticated user must be a member of the team.
     *
     * @name membersDetail
     * @request GET:/teams/{teamId}/members
     */
    membersDetail: (teamId: number, params?: RequestParams) => Promise<HttpResponse<Users, unknown>>;
    /**
     * @description The "Remove team member" API is deprecated and is scheduled for removal in the next major version of the API. We recommend using the Remove team membership API instead. It allows you to remove both active and pending memberships. Remove team member. In order to remove a user from a team, the authenticated user must have 'admin' permissions to the team or be an owner of the org that the team is associated with. NOTE This does not delete the user, it just remove them from the team.
     *
     * @name membersDelete
     * @request DELETE:/teams/{teamId}/members/{username}
     */
    membersDelete: (teamId: number, username: string, params?: RequestParams) => Promise<HttpResponse<any, unknown>>;
    /**
 * @description The "Get team member" API is deprecated and is scheduled for removal in the next major version of the API. We recommend using the Get team membership API instead. It allows you to get both active and pending memberships. Get team member. In order to get if a user is a member of a team, the authenticated user mus be a member of the team.
 *
 * @name membersDetail
 * @request GET:/teams/{teamId}/members/{username} * @originalName membersDetail
 * @duplicate

 */
    membersDetail2: (teamId: number, username: string, params?: RequestParams) => Promise<HttpResponse<any, unknown>>;
    /**
     * @description The API (described below) is deprecated and is scheduled for removal in the next major version of the API. We recommend using the Add team membership API instead. It allows you to invite new organization members to your teams. Add team member. In order to add a user to a team, the authenticated user must have 'admin' permissions to the team or be an owner of the org that the team is associated with.
     *
     * @name membersUpdate
     * @request PUT:/teams/{teamId}/members/{username}
     */
    membersUpdate: (teamId: number, username: string, params?: RequestParams) => Promise<HttpResponse<any, unknown>>;
    /**
     * @description Remove team membership. In order to remove a membership between a user and a team, the authenticated user must have 'admin' permissions to the team or be an owner of the organization that the team is associated with. NOTE: This does not delete the user, it just removes their membership from the team.
     *
     * @name membershipsDelete
     * @request DELETE:/teams/{teamId}/memberships/{username}
     */
    membershipsDelete: (
      teamId: number,
      username: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<any, unknown>>;
    /**
     * @description Get team membership. In order to get a user's membership with a team, the authenticated user must be a member of the team or an owner of the team's organization.
     *
     * @name membershipsDetail
     * @request GET:/teams/{teamId}/memberships/{username}
     */
    membershipsDetail: (
      teamId: number,
      username: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<TeamMembership, unknown>>;
    /**
     * @description Add team membership. In order to add a membership between a user and a team, the authenticated user must have 'admin' permissions to the team or be an owner of the organization that the team is associated with. If the user is already a part of the team's organization (meaning they're on at least one other team in the organization), this endpoint will add the user to the team. If the user is completely unaffiliated with the team's organization (meaning they're on none of the organization's teams), this endpoint will send an invitation to the user via email. This newly-created membership will be in the 'pending' state until the user accepts the invitation, at which point the membership will transition to the 'active' state and the user will be added as a member of the team.
     *
     * @name membershipsUpdate
     * @request PUT:/teams/{teamId}/memberships/{username}
     */
    membershipsUpdate: (
      teamId: number,
      username: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<TeamMembership, unknown>>;
    /**
     * @description List team repos
     *
     * @name reposDetail
     * @request GET:/teams/{teamId}/repos
     */
    reposDetail: (teamId: number, params?: RequestParams) => Promise<HttpResponse<Repos, unknown>>;
    /**
     * @description In order to remove a repository from a team, the authenticated user must be an owner of the org that the team is associated with. NOTE: This does not delete the repository, it just removes it from the team.
     *
     * @name reposDelete
     * @request DELETE:/teams/{teamId}/repos/{owner}/{repo}
     */
    reposDelete: (
      teamId: number,
      owner: string,
      repo: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<any, unknown>>;
    /**
 * @description Check if a team manages a repository
 *
 * @name reposDetail
 * @request GET:/teams/{teamId}/repos/{owner}/{repo} * @originalName reposDetail
 * @duplicate

 */
    reposDetail2: (
      teamId: number,
      owner: string,
      repo: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<any, unknown>>;
    /**
     * @description In order to add a repository to a team, the authenticated user must be an owner of the org that the team is associated with. Also, the repository must be owned by the organization, or a direct fork of a repository owned by the organization.
     *
     * @name reposUpdate
     * @request PUT:/teams/{teamId}/repos/{owner}/{repo}
     */
    reposUpdate: (
      teamId: number,
      owner: string,
      repo: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<any, unknown>>;
  };
  user: {
    /**
     * @description Get the authenticated user.
     *
     * @name userList
     * @request GET:/user
     */
    userList: (params?: RequestParams) => Promise<HttpResponse<any, unknown>>;
    /**
     * @description Update the authenticated user.
     *
     * @name userPartialUpdate
     * @request PATCH:/user
     */
    userPartialUpdate: (body: UserUpdate, params?: RequestParams) => Promise<HttpResponse<any, unknown>>;
    /**
     * @description Delete email address(es). You can include a single email address or an array of addresses.
     *
     * @name emailsDelete
     * @request DELETE:/user/emails
     */
    emailsDelete: (body: UserEmails, params?: RequestParams) => Promise<HttpResponse<any, unknown>>;
    /**
     * @description List email addresses for a user. In the final version of the API, this method will return an array of hashes with extended information for each email address indicating if the address has been verified and if it's primary email address for GitHub. Until API v3 is finalized, use the application/vnd.github.v3 media type to get other response format.
     *
     * @name emailsList
     * @request GET:/user/emails
     */
    emailsList: (params?: RequestParams) => Promise<HttpResponse<UserEmails, unknown>>;
    /**
     * @description Add email address(es). You can post a single email address or an array of addresses.
     *
     * @name emailsCreate
     * @request POST:/user/emails
     */
    emailsCreate: (body: EmailsPost, params?: RequestParams) => Promise<HttpResponse<any, unknown>>;
    /**
     * @description List the authenticated user's followers
     *
     * @name followersList
     * @request GET:/user/followers
     */
    followersList: (params?: RequestParams) => Promise<HttpResponse<Users, unknown>>;
    /**
     * @description List who the authenticated user is following.
     *
     * @name followingList
     * @request GET:/user/following
     */
    followingList: (params?: RequestParams) => Promise<HttpResponse<Users, unknown>>;
    /**
     * @description Unfollow a user. Unfollowing a user requires the user to be logged in and authenticated with basic auth or OAuth with the user:follow scope.
     *
     * @name followingDelete
     * @request DELETE:/user/following/{username}
     */
    followingDelete: (username: string, params?: RequestParams) => Promise<HttpResponse<any, unknown>>;
    /**
     * @description Check if you are following a user.
     *
     * @name followingDetail
     * @request GET:/user/following/{username}
     */
    followingDetail: (username: string, params?: RequestParams) => Promise<HttpResponse<any, unknown>>;
    /**
     * @description Follow a user. Following a user requires the user to be logged in and authenticated with basic auth or OAuth with the user:follow scope.
     *
     * @name followingUpdate
     * @request PUT:/user/following/{username}
     */
    followingUpdate: (username: string, params?: RequestParams) => Promise<HttpResponse<any, unknown>>;
    /**
     * @description List issues. List all issues across owned and member repositories for the authenticated user.
     *
     * @name issuesList
     * @request GET:/user/issues
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
    ) => Promise<HttpResponse<Issues, unknown>>;
    /**
     * @description List your public keys. Lists the current user's keys. Management of public keys via the API requires that you are authenticated through basic auth, or OAuth with the 'user', 'write:public_key' scopes.
     *
     * @name keysList
     * @request GET:/user/keys
     */
    keysList: (params?: RequestParams) => Promise<HttpResponse<Gitignore, unknown>>;
    /**
     * @description Create a public key.
     *
     * @name keysCreate
     * @request POST:/user/keys
     */
    keysCreate: (body: UserKeysPost, params?: RequestParams) => Promise<HttpResponse<UserKeysKeyId, unknown>>;
    /**
     * @description Delete a public key. Removes a public key. Requires that you are authenticated via Basic Auth or via OAuth with at least admin:public_key scope.
     *
     * @name keysDelete
     * @request DELETE:/user/keys/{keyId}
     */
    keysDelete: (keyId: number, params?: RequestParams) => Promise<HttpResponse<any, unknown>>;
    /**
     * @description Get a single public key.
     *
     * @name keysDetail
     * @request GET:/user/keys/{keyId}
     */
    keysDetail: (keyId: number, params?: RequestParams) => Promise<HttpResponse<UserKeysKeyId, unknown>>;
    /**
     * @description List public and private organizations for the authenticated user.
     *
     * @name orgsList
     * @request GET:/user/orgs
     */
    orgsList: (params?: RequestParams) => Promise<HttpResponse<Gitignore, unknown>>;
    /**
     * @description List repositories for the authenticated user. Note that this does not include repositories owned by organizations which the user can access. You can lis user organizations and list organization repositories separately.
     *
     * @name reposList
     * @request GET:/user/repos
     */
    reposList: (
      query?: {
        type?: "all" | "public" | "private" | "forks" | "sources" | "member";
      },
      params?: RequestParams,
    ) => Promise<HttpResponse<Repos, unknown>>;
    /**
     * @description Create a new repository for the authenticated user. OAuth users must supply repo scope.
     *
     * @name reposCreate
     * @request POST:/user/repos
     */
    reposCreate: (body: PostRepo, params?: RequestParams) => Promise<HttpResponse<Repos, unknown>>;
    /**
     * @description List repositories being starred by the authenticated user.
     *
     * @name starredList
     * @request GET:/user/starred
     */
    starredList: (
      query?: {
        direction?: string;
        sort?: "created" | "updated";
      },
      params?: RequestParams,
    ) => Promise<HttpResponse<Gitignore, unknown>>;
    /**
     * @description Unstar a repository
     *
     * @name starredDelete
     * @request DELETE:/user/starred/{owner}/{repo}
     */
    starredDelete: (owner: string, repo: string, params?: RequestParams) => Promise<HttpResponse<any, unknown>>;
    /**
     * @description Check if you are starring a repository.
     *
     * @name starredDetail
     * @request GET:/user/starred/{owner}/{repo}
     */
    starredDetail: (owner: string, repo: string, params?: RequestParams) => Promise<HttpResponse<any, unknown>>;
    /**
     * @description Star a repository.
     *
     * @name starredUpdate
     * @request PUT:/user/starred/{owner}/{repo}
     */
    starredUpdate: (owner: string, repo: string, params?: RequestParams) => Promise<HttpResponse<any, unknown>>;
    /**
     * @description List repositories being watched by the authenticated user.
     *
     * @name subscriptionsList
     * @request GET:/user/subscriptions
     */
    subscriptionsList: (params?: RequestParams) => Promise<HttpResponse<Repos, unknown>>;
    /**
     * @description Stop watching a repository
     *
     * @name subscriptionsDelete
     * @request DELETE:/user/subscriptions/{owner}/{repo}
     */
    subscriptionsDelete: (owner: string, repo: string, params?: RequestParams) => Promise<HttpResponse<any, unknown>>;
    /**
     * @description Check if you are watching a repository.
     *
     * @name subscriptionsDetail
     * @request GET:/user/subscriptions/{owner}/{repo}
     */
    subscriptionsDetail: (owner: string, repo: string, params?: RequestParams) => Promise<HttpResponse<any, unknown>>;
    /**
     * @description Watch a repository.
     *
     * @name subscriptionsUpdate
     * @request PUT:/user/subscriptions/{owner}/{repo}
     */
    subscriptionsUpdate: (owner: string, repo: string, params?: RequestParams) => Promise<HttpResponse<any, unknown>>;
    /**
     * @description List all of the teams across all of the organizations to which the authenticated user belongs. This method requires user or repo scope when authenticating via OAuth.
     *
     * @name teamsList
     * @request GET:/user/teams
     */
    teamsList: (params?: RequestParams) => Promise<HttpResponse<TeamsList, unknown>>;
  };
  users: {
    /**
     * @description Get all users. This provides a dump of every user, in the order that they signed up for GitHub. Note: Pagination is powered exclusively by the since parameter. Use the Link header to get the URL for the next page of users.
     *
     * @name usersList
     * @request GET:/users
     */
    usersList: (
      query?: {
        since?: number;
      },
      params?: RequestParams,
    ) => Promise<HttpResponse<Users, unknown>>;
    /**
     * @description Get a single user.
     *
     * @name usersDetail
     * @request GET:/users/{username}
     */
    usersDetail: (username: string, params?: RequestParams) => Promise<HttpResponse<any, unknown>>;
    /**
     * @description If you are authenticated as the given user, you will see your private events. Otherwise, you'll only see public events.
     *
     * @name eventsDetail
     * @request GET:/users/{username}/events
     */
    eventsDetail: (username: string, params?: RequestParams) => Promise<HttpResponse<any, unknown>>;
    /**
     * @description This is the user's organization dashboard. You must be authenticated as the user to view this.
     *
     * @name eventsOrgsDetail
     * @request GET:/users/{username}/events/orgs/{org}
     */
    eventsOrgsDetail: (username: string, org: string, params?: RequestParams) => Promise<HttpResponse<any, unknown>>;
    /**
     * @description List a user's followers
     *
     * @name followersDetail
     * @request GET:/users/{username}/followers
     */
    followersDetail: (username: string, params?: RequestParams) => Promise<HttpResponse<Users, unknown>>;
    /**
     * @description Check if one user follows another.
     *
     * @name followingDetail
     * @request GET:/users/{username}/following/{targetUser}
     */
    followingDetail: (
      username: string,
      targetUser: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<any, unknown>>;
    /**
     * @description List a users gists.
     *
     * @name gistsDetail
     * @request GET:/users/{username}/gists
     */
    gistsDetail: (
      username: string,
      query?: {
        since?: string;
      },
      params?: RequestParams,
    ) => Promise<HttpResponse<Gists, unknown>>;
    /**
     * @description List public keys for a user. Lists the verified public keys for a user. This is accessible by anyone.
     *
     * @name keysDetail
     * @request GET:/users/{username}/keys
     */
    keysDetail: (username: string, params?: RequestParams) => Promise<HttpResponse<Gitignore, unknown>>;
    /**
     * @description List all public organizations for a user.
     *
     * @name orgsDetail
     * @request GET:/users/{username}/orgs
     */
    orgsDetail: (username: string, params?: RequestParams) => Promise<HttpResponse<Gitignore, unknown>>;
    /**
     * @description These are events that you'll only see public events.
     *
     * @name receivedEventsDetail
     * @request GET:/users/{username}/received_events
     */
    receivedEventsDetail: (username: string, params?: RequestParams) => Promise<HttpResponse<any, unknown>>;
    /**
     * @description List public events that a user has received
     *
     * @name receivedEventsPublicDetail
     * @request GET:/users/{username}/received_events/public
     */
    receivedEventsPublicDetail: (username: string, params?: RequestParams) => Promise<HttpResponse<any, unknown>>;
    /**
     * @description List public repositories for the specified user.
     *
     * @name reposDetail
     * @request GET:/users/{username}/repos
     */
    reposDetail: (
      username: string,
      query?: {
        type?: "all" | "public" | "private" | "forks" | "sources" | "member";
      },
      params?: RequestParams,
    ) => Promise<HttpResponse<Repos, unknown>>;
    /**
     * @description List repositories being starred by a user.
     *
     * @name starredDetail
     * @request GET:/users/{username}/starred
     */
    starredDetail: (username: string, params?: RequestParams) => Promise<HttpResponse<any, unknown>>;
    /**
     * @description List repositories being watched by a user.
     *
     * @name subscriptionsDetail
     * @request GET:/users/{username}/subscriptions
     */
    subscriptionsDetail: (username: string, params?: RequestParams) => Promise<HttpResponse<any, unknown>>;
  };
}
export {};
