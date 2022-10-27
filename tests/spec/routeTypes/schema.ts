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

/** A user or organization */
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
  /** A GitHub user */
  uploader?: User;
  url?: string;
}

export interface AssetPatch {
  label?: string;
  name: string;
}

export type Assets = Asset[];

export type Assignees = User[];

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
    /** A GitHub user */
    author?: User;
    commit?: {
      author?: {
        /** ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
        date?: string;
        email?: string;
        name?: string;
      };
      committer?: {
        /** ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
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
    /** A GitHub user */
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

export type Branches = {
  commit?: {
    sha?: string;
    url?: string;
  };
  name?: string;
}[];

export type CodeFrequencyStats = number[];

export interface Comment {
  body?: string;
}

export interface CommentBody {
  body: string;
}

export type Comments = {
  body?: string;
  /** ISO 8601. */
  created_at?: string;
  id?: number;
  url?: string;
  /** A GitHub user */
  user?: User;
}[];

export interface Commit {
  /** A GitHub user */
  author?: User;
  commit?: {
    author?: {
      /** ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
      date?: string;
      email?: string;
      name?: string;
    };
    committer?: {
      /** ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
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
  /** A GitHub user */
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

export type CommitActivityStats = {
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
  /** A GitHub user */
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

export type Commits = {
  /** A GitHub user */
  author?: User;
  commit?: {
    author?: {
      /** ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
      date?: string;
      email?: string;
      name?: string;
    };
    committer?: {
      /** ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
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
  /** A GitHub user */
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
    /** A GitHub user */
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
    /** A GitHub user */
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
    /** A GitHub user */
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
    /** A GitHub user */
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

export type ContributorsStats = {
  author?: {
    avatar_url?: string;
    gravatar_id?: string;
    id?: number;
    login?: string;
    url?: string;
  };
  /** The Total number of commits authored by the contributor. */
  total?: number;
  weeks?: {
    /** Number of additions. */
    a?: number;
    /** Number of commits. */
    c?: number;
    /** Number of deletions. */
    d?: number;
    /** Start of the week. */
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
  /** A GitHub user */
  creator?: User;
  description?: string;
  id?: number;
  payload?: string;
  sha?: string;
  statuses_url?: string;
  updated_at?: string;
  url?: string;
}

export type DeploymentStatuses = {
  created_at?: string;
  /** A GitHub user */
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

export type Downloads = Download[];

export interface EditTeam {
  name: string;
  permission?: "pull" | "push" | "admin";
}

export type EmailsPost = string[];

export type Emojis = Record<string, string>;

export interface Event {
  /** A user or organization */
  actor?: Actor;
  created_at?: object;
  id?: number;
  /** A GitHub organization */
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

export type Events = Event[];

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

export type Forks = Repos;

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
    /** Timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ. */
    created_at?: string;
    url?: string;
    /** A GitHub user */
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
    /** Timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ. */
    committed_at?: string;
    url?: string;
    /** A GitHub user */
    user?: User;
    version?: string;
  }[];
  html_url?: string;
  id?: string;
  public?: boolean;
  url?: string;
  /** A GitHub user */
  user?: User;
}

export type Gists = {
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
  /** A GitHub user */
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

export type Gitignore = any[];

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

export type Hook = {
  active?: boolean;
  config?: {
    content_type?: string;
    url?: string;
  };
  /** ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
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
  /** ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
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
  /** A user or organization */
  actor?: Actor;
  commit_id?: string;
  /** ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
  created_at?: string;
  event?: string;
  issue?: {
    /** A GitHub user */
    assignee?: User;
    body?: string;
    /** ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
    closed_at?: string;
    comments?: number;
    /** ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
    created_at?: string;
    html_url?: string;
    labels?: {
      color?: string;
      name?: string;
      url?: string;
    }[];
    milestone?: {
      closed_issues?: number;
      /** ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
      created_at?: string;
      /** A GitHub user */
      creator?: User;
      description?: string;
      /** ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
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
    /** ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
    updated_at?: string;
    url?: string;
    /** A GitHub user */
    user?: User;
  };
  url?: string;
}

export type IssueEvents = IssueEvent[];

export type Issues = {
  /** A GitHub user */
  assignee?: User;
  body?: string;
  /** ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
  closed_at?: string;
  comments?: number;
  /** ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
  created_at?: string;
  html_url?: string;
  labels?: {
    color?: string;
    name?: string;
    url?: string;
  }[];
  milestone?: {
    closed_issues?: number;
    /** ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
    created_at?: string;
    /** A GitHub user */
    creator?: User;
    description?: string;
    /** ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
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
  /** ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
  updated_at?: string;
  url?: string;
  /** A GitHub user */
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
  /** A GitHub user */
  user?: User;
}

export type IssuesComments = {
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
  /** A GitHub user */
  user?: User;
}[];

export type Keys = {
  id?: number;
  key?: string;
  title?: string;
  url?: string;
}[];

export interface Label {
  /**
   * @minLength 6
   * @maxLength 6
   */
  color?: string;
  name?: string;
  url?: string;
}

export type Labels = {
  /**
   * @minLength 6
   * @maxLength 6
   */
  color?: string;
  name?: string;
  url?: string;
}[];

export type Languages = Record<string, number>;

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
  /** A GitHub user */
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
  /** A GitHub user */
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
  /** A GitHub user */
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
    /** A user or organization */
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

/** A GitHub organization */
export type Organization = Actor;

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

export type Pulls = {
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
  /** ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
  closed_at?: string;
  /** ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
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
  /** ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
  merged_at?: string;
  number?: number;
  patch_url?: string;
  state?: "open" | "closed";
  title?: string;
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

export type PullsComments = {
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

export type Ref = {
  /** ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
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
  /** ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
  updated_at?: string;
  url?: string;
}[];

export type RefStatus = {
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

export type Refs = {
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
    /** A GitHub user */
    uploader?: User;
    url?: string;
  }[];
  assets_url?: string;
  /** A GitHub user */
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

export type Releases = {
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
    /** A GitHub user */
    uploader?: User;
    url?: string;
  }[];
  assets_url?: string;
  /** A GitHub user */
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
  /** A GitHub organization */
  organization?: Organization;
  /** A user or organization */
  owner?: Actor;
  /** Is present when the repo is a fork. Parent is the repo this repo was forked from. */
  parent?: Repo;
  private?: boolean;
  /** ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
  pushed_at?: string;
  size?: number;
  /** Is present when the repo is a fork. Source is the ultimate source for the network. */
  source?: Repo;
  ssh_url?: string;
  svn_url?: string;
  /** ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
  updated_at?: string;
  url?: string;
  watchers?: number;
  watchers_count?: number;
}

export type RepoDeployments = {
  created_at?: string;
  /** A GitHub user */
  creator?: User;
  description?: string;
  id?: number;
  payload?: string;
  sha?: string;
  statuses_url?: string;
  updated_at?: string;
  url?: string;
}[];

export type RepoComments = {
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
  user?: User;
}[];

export interface RepoCommit {
  author?: {
    /** ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
    date?: string;
    email?: string;
    name?: string;
  };
  committer?: {
    /** ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
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

export type Repos = Repo[];

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
      /** A user or organization */
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
    /** A GitHub user */
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
  /** A GitHub user */
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
    /** String of the type of the tagged object. Normally this is a commit but it can also be a tree or a blob. */
    type?: "commit" | "tree" | "blob";
    url?: string;
  };
  sha?: string;
  /** The tag's name. This is typically a version (e.g., "v0.0.1"). */
  tag?: string;
  tagger?: {
    /** Timestamp of when this object was tagged, in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
    date?: string;
    /** String of the email of the author of the tag. */
    email?: string;
    /** String of the name of the author of the tag. */
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
    /** Timestamp of when this object was tagged, in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
    date?: string;
    /** String of the email of the author of the tag. */
    email?: string;
    /** String of the name of the author of the tag. */
    name?: string;
  };
  /** String of the type of the object we’re tagging. Normally this is a commit but it can also be a tree or a blob. */
  type: "commit" | "tree" | "blob";
}

export type Tags = Tag[];

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

export type TeamRepos = Repos;

export type Teams = {
  id?: number;
  name?: string;
  url?: string;
}[];

export type TeamsList = {
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
    /** One of 100644 for file (blob), 100755 for executable (blob), 040000 for subdirectory (tree), 160000 for submodule (commit) or 120000 for a blob that specifies the path of a symlink. */
    mode?: "100644" | "100755" | "040000" | "160000" | "120000";
    path?: string;
    /** SHA1 checksum ID of the object in the tree. */
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

/** A GitHub user */
export type User = Actor;

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

export type Users = User[];

export namespace SomeTest {
  /**
   * @description This type should test bug https://github.com/acacode/swagger-typescript-api/issues/156 NOTE: all properties should be required
   * @name SomeTestList
   * @request GET:/some-test
   */
  export namespace SomeTestList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = {
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
                extra: {
                  foo: string;
                  bar: number;
                  baz: string;
                  bad: number;
                };
              };
            };
          };
        };
      };
    };
  }
}

export namespace PathParams {
  /**
   * @description Lists all the emojis available to use on GitHub.
   * @name PathParamsList
   * @request GET:/path-params
   */
  export namespace PathParamsList {
    export type RequestParams = {
      /**
       * ID of pet to return
       * @format int64
       */
      petId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
      /** Tik Token */
      "X-Auth": string;
    };
    export type ResponseBody = Emojis;
  }
}

export namespace Events {
  /**
   * @description List public events.
   * @name EventsList
   * @request GET:/events
   */
  export namespace EventsList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Events;
  }
}

export namespace Feeds {
  /**
   * @description List Feeds. GitHub provides several timeline resources in Atom format. The Feeds API lists all the feeds available to the authenticating user.
   * @name FeedsList
   * @request GET:/feeds
   */
  export namespace FeedsList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Feeds;
  }
}

export namespace Gists {
  /**
   * @description List the authenticated user's gists or if called anonymously, this will return all public gists.
   * @name GistsList
   * @request GET:/gists
   */
  export namespace GistsList {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * Timestamp in ISO 8601 format YYYY-MM-DDTHH:MM:SSZ.
       * Only gists updated at or after this time are returned.
       */
      since?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Gists;
  }
  /**
   * @description Create a gist.
   * @name GistsCreate
   * @request POST:/gists
   */
  export namespace GistsCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PostGist;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Gist;
  }
  /**
   * @description List all public gists.
   * @name PublicList
   * @request GET:/gists/public
   */
  export namespace PublicList {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * Timestamp in ISO 8601 format YYYY-MM-DDTHH:MM:SSZ.
       * Only gists updated at or after this time are returned.
       */
      since?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Gists;
  }
  /**
   * @description List the authenticated user's starred gists.
   * @name StarredList
   * @request GET:/gists/starred
   */
  export namespace StarredList {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * Timestamp in ISO 8601 format YYYY-MM-DDTHH:MM:SSZ.
       * Only gists updated at or after this time are returned.
       */
      since?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Gists;
  }
  /**
   * @description Delete a gist.
   * @name GistsDelete
   * @request DELETE:/gists/{id}
   */
  export namespace GistsDelete {
    export type RequestParams = {
      /** Id of gist. */
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description Get a single gist.
   * @name GistsDetail
   * @request GET:/gists/{id}
   */
  export namespace GistsDetail {
    export type RequestParams = {
      /** Id of gist. */
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Gist;
  }
  /**
   * @description Edit a gist.
   * @name GistsPartialUpdate
   * @request PATCH:/gists/{id}
   */
  export namespace GistsPartialUpdate {
    export type RequestParams = {
      /** Id of gist. */
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = PatchGist;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Gist;
  }
  /**
   * @description List comments on a gist.
   * @name CommentsDetail
   * @request GET:/gists/{id}/comments
   */
  export namespace CommentsDetail {
    export type RequestParams = {
      /** Id of gist. */
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Comments;
  }
  /**
   * @description Create a commen
   * @name CommentsCreate
   * @request POST:/gists/{id}/comments
   */
  export namespace CommentsCreate {
    export type RequestParams = {
      /** Id of gist. */
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = CommentBody;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Comment;
  }
  /**
   * @description Delete a comment.
   * @name CommentsDelete
   * @request DELETE:/gists/{id}/comments/{commentId}
   */
  export namespace CommentsDelete {
    export type RequestParams = {
      /** Id of gist. */
      id: number;
      /** Id of comment. */
      commentId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description Get a single comment.
   * @name CommentsDetail2
   * @request GET:/gists/{id}/comments/{commentId}
   * @originalName commentsDetail
   * @duplicate
   */
  export namespace CommentsDetail2 {
    export type RequestParams = {
      /** Id of gist. */
      id: number;
      /** Id of comment. */
      commentId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Comment;
  }
  /**
   * @description Edit a comment.
   * @name CommentsPartialUpdate
   * @request PATCH:/gists/{id}/comments/{commentId}
   */
  export namespace CommentsPartialUpdate {
    export type RequestParams = {
      /** Id of gist. */
      id: number;
      /** Id of comment. */
      commentId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = Comment;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Comment;
  }
  /**
   * @description Fork a gist.
   * @name ForksCreate
   * @request POST:/gists/{id}/forks
   */
  export namespace ForksCreate {
    export type RequestParams = {
      /** Id of gist. */
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description Unstar a gist.
   * @name StarDelete
   * @request DELETE:/gists/{id}/star
   */
  export namespace StarDelete {
    export type RequestParams = {
      /** Id of gist. */
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description Check if a gist is starred.
   * @name StarDetail
   * @request GET:/gists/{id}/star
   */
  export namespace StarDetail {
    export type RequestParams = {
      /** Id of gist. */
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description Star a gist.
   * @name StarUpdate
   * @request PUT:/gists/{id}/star
   */
  export namespace StarUpdate {
    export type RequestParams = {
      /** Id of gist. */
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
}

export namespace Gitignore {
  /**
   * @description Listing available templates. List all templates available to pass as an option when creating a repository.
   * @name TemplatesList
   * @request GET:/gitignore/templates
   */
  export namespace TemplatesList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Gitignore;
  }
  /**
   * @description Get a single template.
   * @name TemplatesDetail
   * @request GET:/gitignore/templates/{language}
   */
  export namespace TemplatesDetail {
    export type RequestParams = {
      language: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = GitignoreLang;
  }
}

export namespace Issues {
  /**
   * @description List issues. List all issues across all the authenticated user's visible repositories.
   * @name IssuesList
   * @request GET:/issues
   */
  export namespace IssuesList {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * Issues assigned to you / created by you / mentioning you / you're
       * subscribed to updates for / All issues the authenticated user can see
       * @default "all"
       */
      filter: "assigned" | "created" | "mentioned" | "subscribed" | "all";
      /** @default "open" */
      state: "open" | "closed";
      /** String list of comma separated Label names. Example - bug,ui,@high. */
      labels: string;
      /** @default "created" */
      sort: "created" | "updated" | "comments";
      /** @default "desc" */
      direction: "asc" | "desc";
      /**
       * Optional string of a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.
       * Only issues updated at or after this time are returned.
       */
      since?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Issues;
  }
}

export namespace Legacy {
  /**
   * @description Find issues by state and keyword.
   * @name IssuesSearchDetail
   * @request GET:/legacy/issues/search/{owner}/{repository}/{state}/{keyword}
   * @deprecated
   */
  export namespace IssuesSearchDetail {
    export type RequestParams = {
      /** The search term. */
      keyword: string;
      /** Indicates the state of the issues to return. Can be either open or closed. */
      state: "open" | "closed";
      owner: string;
      repository: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = SearchIssuesByKeyword;
  }
  /**
   * @description Find repositories by keyword. Note, this legacy method does not follow the v3 pagination pattern. This method returns up to 100 results per page and pages can be fetched using the start_page parameter.
   * @name ReposSearchDetail
   * @request GET:/legacy/repos/search/{keyword}
   * @deprecated
   */
  export namespace ReposSearchDetail {
    export type RequestParams = {
      /** The search term */
      keyword: string;
    };
    export type RequestQuery = {
      /**
       * The sort field. if sort param is provided. Can be either asc or desc.
       * @default "desc"
       */
      order?: "desc" | "asc";
      /** Filter results by language */
      language?: string;
      /** The page number to fetch */
      start_page?: string;
      /** The sort field. One of stars, forks, or updated. Default: results are sorted by best match. */
      sort?: "updated" | "stars" | "forks";
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = SearchRepositoriesByKeyword;
  }
  /**
   * @description This API call is added for compatibility reasons only.
   * @name UserEmailDetail
   * @request GET:/legacy/user/email/{email}
   * @deprecated
   */
  export namespace UserEmailDetail {
    export type RequestParams = {
      /** The email address */
      email: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = SearchUserByEmail;
  }
  /**
   * @description Find users by keyword.
   * @name UserSearchDetail
   * @request GET:/legacy/user/search/{keyword}
   * @deprecated
   */
  export namespace UserSearchDetail {
    export type RequestParams = {
      /** The search term */
      keyword: string;
    };
    export type RequestQuery = {
      /**
       * The sort field. if sort param is provided. Can be either asc or desc.
       * @default "desc"
       */
      order?: "desc" | "asc";
      /** The page number to fetch */
      start_page?: string;
      /** The sort field. One of stars, forks, or updated. Default: results are sorted by best match. */
      sort?: "updated" | "stars" | "forks";
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = SearchUsersByKeyword;
  }
}

export namespace Markdown {
  /**
   * @description Render an arbitrary Markdown document
   * @name MarkdownCreate
   * @request POST:/markdown
   */
  export namespace MarkdownCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = Markdown;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description Render a Markdown document in raw mode
   * @name PostMarkdown
   * @request POST:/markdown/raw
   */
  export namespace PostMarkdown {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
}

export namespace Meta {
  /**
   * @description This gives some information about GitHub.com, the service.
   * @name MetaList
   * @request GET:/meta
   */
  export namespace MetaList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Meta;
  }
}

export namespace Networks {
  /**
   * @description List public events for a network of repositories.
   * @name EventsDetail
   * @request GET:/networks/{owner}/{repo}/events
   */
  export namespace EventsDetail {
    export type RequestParams = {
      /** Name of the owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Events;
  }
}

export namespace Notifications {
  /**
   * @description List your notifications. List all notifications for the current user, grouped by repository.
   * @name NotificationsList
   * @request GET:/notifications
   */
  export namespace NotificationsList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** True to show notifications marked as read. */
      all?: boolean;
      /**
       * True to show only notifications in which the user is directly participating
       * or mentioned.
       */
      participating?: boolean;
      /**
       * The time should be passed in as UTC in the ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.
       * Example: "2012-10-09T23:39:01Z".
       */
      since?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Notifications;
  }
  /**
   * @description Mark as read. Marking a notification as "read" removes it from the default view on GitHub.com.
   * @name NotificationsUpdate
   * @request PUT:/notifications
   */
  export namespace NotificationsUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = NotificationMarkRead;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description View a single thread.
   * @name ThreadsDetail
   * @request GET:/notifications/threads/{id}
   */
  export namespace ThreadsDetail {
    export type RequestParams = {
      /** Id of thread. */
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Notifications;
  }
  /**
   * @description Mark a thread as read
   * @name ThreadsPartialUpdate
   * @request PATCH:/notifications/threads/{id}
   */
  export namespace ThreadsPartialUpdate {
    export type RequestParams = {
      /** Id of thread. */
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description Delete a Thread Subscription.
   * @name ThreadsSubscriptionDelete
   * @request DELETE:/notifications/threads/{id}/subscription
   */
  export namespace ThreadsSubscriptionDelete {
    export type RequestParams = {
      /** Id of thread. */
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description Get a Thread Subscription.
   * @name ThreadsSubscriptionDetail
   * @request GET:/notifications/threads/{id}/subscription
   */
  export namespace ThreadsSubscriptionDetail {
    export type RequestParams = {
      /** Id of thread. */
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Subscription;
  }
  /**
   * @description Set a Thread Subscription. This lets you subscribe to a thread, or ignore it. Subscribing to a thread is unnecessary if the user is already subscribed to the repository. Ignoring a thread will mute all future notifications (until you comment or get @mentioned).
   * @name ThreadsSubscriptionUpdate
   * @request PUT:/notifications/threads/{id}/subscription
   */
  export namespace ThreadsSubscriptionUpdate {
    export type RequestParams = {
      /** Id of thread. */
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = PutSubscription;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Subscription;
  }
}

export namespace Orgs {
  /**
   * @description Get an Organization.
   * @name OrgsDetail
   * @request GET:/orgs/{org}
   */
  export namespace OrgsDetail {
    export type RequestParams = {
      /** Name of organisation. */
      org: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Organization;
  }
  /**
   * @description Edit an Organization.
   * @name OrgsPartialUpdate
   * @request PATCH:/orgs/{org}
   */
  export namespace OrgsPartialUpdate {
    export type RequestParams = {
      /** Name of organisation. */
      org: string;
    };
    export type RequestQuery = {};
    export type RequestBody = PatchOrg;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Organization;
  }
  /**
   * @description List public events for an organization.
   * @name EventsDetail
   * @request GET:/orgs/{org}/events
   */
  export namespace EventsDetail {
    export type RequestParams = {
      /** Name of organisation. */
      org: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Events;
  }
  /**
   * @description List issues. List all issues for a given organization for the authenticated user.
   * @name IssuesDetail
   * @request GET:/orgs/{org}/issues
   */
  export namespace IssuesDetail {
    export type RequestParams = {
      /** Name of organisation. */
      org: string;
    };
    export type RequestQuery = {
      /**
       * Issues assigned to you / created by you / mentioning you / you're
       * subscribed to updates for / All issues the authenticated user can see
       * @default "all"
       */
      filter: "assigned" | "created" | "mentioned" | "subscribed" | "all";
      /** @default "open" */
      state: "open" | "closed";
      /** String list of comma separated Label names. Example - bug,ui,@high. */
      labels: string;
      /** @default "created" */
      sort: "created" | "updated" | "comments";
      /** @default "desc" */
      direction: "asc" | "desc";
      /**
       * Optional string of a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.
       * Only issues updated at or after this time are returned.
       */
      since?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Issues;
  }
  /**
   * @description Members list. List all users who are members of an organization. A member is a user tha belongs to at least 1 team in the organization. If the authenticated user is also an owner of this organization then both concealed and public members will be returned. If the requester is not an owner of the organization the query will be redirected to the public members list.
   * @name MembersDetail
   * @request GET:/orgs/{org}/members
   */
  export namespace MembersDetail {
    export type RequestParams = {
      /** Name of organisation. */
      org: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Users;
  }
  /**
   * @description Remove a member. Removing a user from this list will remove them from all teams and they will no longer have any access to the organization's repositories.
   * @name MembersDelete
   * @request DELETE:/orgs/{org}/members/{username}
   */
  export namespace MembersDelete {
    export type RequestParams = {
      /** Name of organisation. */
      org: string;
      /** Name of the user. */
      username: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description Check if a user is, publicly or privately, a member of the organization.
   * @name MembersDetail2
   * @request GET:/orgs/{org}/members/{username}
   * @originalName membersDetail
   * @duplicate
   */
  export namespace MembersDetail2 {
    export type RequestParams = {
      /** Name of organisation. */
      org: string;
      /** Name of the user. */
      username: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description Public members list. Members of an organization can choose to have their membership publicized or not.
   * @name PublicMembersDetail
   * @request GET:/orgs/{org}/public_members
   */
  export namespace PublicMembersDetail {
    export type RequestParams = {
      /** Name of organisation. */
      org: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Users;
  }
  /**
   * @description Conceal a user's membership.
   * @name PublicMembersDelete
   * @request DELETE:/orgs/{org}/public_members/{username}
   */
  export namespace PublicMembersDelete {
    export type RequestParams = {
      /** Name of organisation. */
      org: string;
      /** Name of the user. */
      username: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description Check public membership.
   * @name PublicMembersDetail2
   * @request GET:/orgs/{org}/public_members/{username}
   * @originalName publicMembersDetail
   * @duplicate
   */
  export namespace PublicMembersDetail2 {
    export type RequestParams = {
      /** Name of organisation. */
      org: string;
      /** Name of the user. */
      username: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description Publicize a user's membership.
   * @name PublicMembersUpdate
   * @request PUT:/orgs/{org}/public_members/{username}
   */
  export namespace PublicMembersUpdate {
    export type RequestParams = {
      /** Name of organisation. */
      org: string;
      /** Name of the user. */
      username: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description List repositories for the specified org.
   * @name ReposDetail
   * @request GET:/orgs/{org}/repos
   */
  export namespace ReposDetail {
    export type RequestParams = {
      /** Name of organisation. */
      org: string;
    };
    export type RequestQuery = {
      /** @default "all" */
      type?: "all" | "public" | "private" | "forks" | "sources" | "member";
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Repos;
  }
  /**
   * @description Create a new repository for the authenticated user. OAuth users must supply repo scope.
   * @name ReposCreate
   * @request POST:/orgs/{org}/repos
   */
  export namespace ReposCreate {
    export type RequestParams = {
      /** Name of organisation. */
      org: string;
    };
    export type RequestQuery = {};
    export type RequestBody = PostRepo;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Repos;
  }
  /**
   * @description List teams.
   * @name TeamsDetail
   * @request GET:/orgs/{org}/teams
   */
  export namespace TeamsDetail {
    export type RequestParams = {
      /** Name of organisation. */
      org: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Teams;
  }
  /**
   * @description Create team. In order to create a team, the authenticated user must be an owner of organization.
   * @name TeamsCreate
   * @request POST:/orgs/{org}/teams
   */
  export namespace TeamsCreate {
    export type RequestParams = {
      /** Name of organisation. */
      org: string;
    };
    export type RequestQuery = {};
    export type RequestBody = OrgTeamsPost;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Team;
  }
}

export namespace RateLimit {
  /**
   * @description Get your current rate limit status Note: Accessing this endpoint does not count against your rate limit.
   * @name RateLimitList
   * @request GET:/rate_limit
   */
  export namespace RateLimitList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = RateLimit;
  }
}

export namespace Repos {
  /**
   * @description Delete a Repository. Deleting a repository requires admin access. If OAuth is used, the delete_repo scope is required.
   * @name ReposDelete
   * @request DELETE:/repos/{owner}/{repo}
   */
  export namespace ReposDelete {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description Get repository.
   * @name ReposDetail
   * @request GET:/repos/{owner}/{repo}
   */
  export namespace ReposDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Repo;
  }
  /**
   * @description Edit repository.
   * @name ReposPartialUpdate
   * @request PATCH:/repos/{owner}/{repo}
   */
  export namespace ReposPartialUpdate {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = RepoEdit;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Repo;
  }
  /**
   * @description List assignees. This call lists all the available assignees (owner + collaborators) to which issues may be assigned.
   * @name AssigneesDetail
   * @request GET:/repos/{owner}/{repo}/assignees
   */
  export namespace AssigneesDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Assignees;
  }
  /**
   * @description Check assignee. You may also check to see if a particular user is an assignee for a repository.
   * @name AssigneesDetail2
   * @request GET:/repos/{owner}/{repo}/assignees/{assignee}
   * @originalName assigneesDetail
   * @duplicate
   */
  export namespace AssigneesDetail2 {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** Login of the assignee. */
      assignee: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description Get list of branches
   * @name BranchesDetail
   * @request GET:/repos/{owner}/{repo}/branches
   */
  export namespace BranchesDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Branches;
  }
  /**
   * @description Get Branch
   * @name BranchesDetail2
   * @request GET:/repos/{owner}/{repo}/branches/{branch}
   * @originalName branchesDetail
   * @duplicate
   */
  export namespace BranchesDetail2 {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** Name of the branch. */
      branch: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Branch;
  }
  /**
   * @description List. When authenticating as an organization owner of an organization-owned repository, all organization owners are included in the list of collaborators. Otherwise, only users with access to the repository are returned in the collaborators list.
   * @name CollaboratorsDetail
   * @request GET:/repos/{owner}/{repo}/collaborators
   */
  export namespace CollaboratorsDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Users;
  }
  /**
   * @description Remove collaborator.
   * @name CollaboratorsDelete
   * @request DELETE:/repos/{owner}/{repo}/collaborators/{user}
   */
  export namespace CollaboratorsDelete {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** Login of the user. */
      user: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description Check if user is a collaborator
   * @name CollaboratorsDetail2
   * @request GET:/repos/{owner}/{repo}/collaborators/{user}
   * @originalName collaboratorsDetail
   * @duplicate
   */
  export namespace CollaboratorsDetail2 {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** Login of the user. */
      user: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description Add collaborator.
   * @name CollaboratorsUpdate
   * @request PUT:/repos/{owner}/{repo}/collaborators/{user}
   */
  export namespace CollaboratorsUpdate {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** Login of the user. */
      user: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description List commit comments for a repository. Comments are ordered by ascending ID.
   * @name CommentsDetail
   * @request GET:/repos/{owner}/{repo}/comments
   */
  export namespace CommentsDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = RepoComments;
  }
  /**
   * @description Delete a commit comment
   * @name CommentsDelete
   * @request DELETE:/repos/{owner}/{repo}/comments/{commentId}
   */
  export namespace CommentsDelete {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** Id of comment. */
      commentId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description Get a single commit comment.
   * @name CommentsDetail2
   * @request GET:/repos/{owner}/{repo}/comments/{commentId}
   * @originalName commentsDetail
   * @duplicate
   */
  export namespace CommentsDetail2 {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** Id of comment. */
      commentId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = CommitComment;
  }
  /**
   * @description Update a commit comment.
   * @name CommentsPartialUpdate
   * @request PATCH:/repos/{owner}/{repo}/comments/{commentId}
   */
  export namespace CommentsPartialUpdate {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** Id of comment. */
      commentId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = CommentBody;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = CommitComment;
  }
  /**
   * @description List commits on a repository.
   * @name CommitsDetail
   * @request GET:/repos/{owner}/{repo}/commits
   */
  export namespace CommitsDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {
      /**
       * The time should be passed in as UTC in the ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.
       * Example: "2012-10-09T23:39:01Z".
       */
      since?: string;
      /** Sha or branch to start listing commits from. */
      sha?: string;
      /** Only commits containing this file path will be returned. */
      path?: string;
      /** GitHub login, name, or email by which to filter by commit author. */
      author?: string;
      /** ISO 8601 Date - Only commits before this date will be returned. */
      until?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Commits;
  }
  /**
   * @description Get the combined Status for a specific Ref The Combined status endpoint is currently available for developers to preview. During the preview period, the API may change without advance notice. Please see the blog post for full details. To access this endpoint during the preview period, you must provide a custom media type in the Accept header: application/vnd.github.she-hulk-preview+json
   * @name CommitsStatusDetail
   * @request GET:/repos/{owner}/{repo}/commits/{ref}/status
   */
  export namespace CommitsStatusDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      ref: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = RefStatus;
  }
  /**
   * @description Get a single commit.
   * @name CommitsDetail2
   * @request GET:/repos/{owner}/{repo}/commits/{shaCode}
   * @originalName commitsDetail
   * @duplicate
   */
  export namespace CommitsDetail2 {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** SHA-1 code of the commit. */
      shaCode: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Commit;
  }
  /**
   * @description List comments for a single commitList comments for a single commit.
   * @name CommitsCommentsDetail
   * @request GET:/repos/{owner}/{repo}/commits/{shaCode}/comments
   */
  export namespace CommitsCommentsDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** SHA-1 code of the commit. */
      shaCode: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = RepoComments;
  }
  /**
   * @description Create a commit comment.
   * @name CommitsCommentsCreate
   * @request POST:/repos/{owner}/{repo}/commits/{shaCode}/comments
   */
  export namespace CommitsCommentsCreate {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** SHA-1 code of the commit. */
      shaCode: string;
    };
    export type RequestQuery = {};
    export type RequestBody = CommitCommentBody;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = CommitComment;
  }
  /**
   * @description Compare two commits
   * @name CompareDetail
   * @request GET:/repos/{owner}/{repo}/compare/{baseId}...{headId}
   */
  export namespace CompareDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      baseId: string;
      headId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = CompareCommits;
  }
  /**
   * @description Delete a file. This method deletes a file in a repository.
   * @name ContentsDelete
   * @request DELETE:/repos/{owner}/{repo}/contents/{path}
   */
  export namespace ContentsDelete {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      path: string;
    };
    export type RequestQuery = {};
    export type RequestBody = DeleteFileBody;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = DeleteFile;
  }
  /**
   * @description Get contents. This method returns the contents of a file or directory in a repository. Files and symlinks support a custom media type for getting the raw content. Directories and submodules do not support custom media types. Note: This API supports files up to 1 megabyte in size. Here can be many outcomes. For details see "http://developer.github.com/v3/repos/contents/"
   * @name ContentsDetail
   * @request GET:/repos/{owner}/{repo}/contents/{path}
   */
  export namespace ContentsDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      path: string;
    };
    export type RequestQuery = {
      /** The content path. */
      path?: string;
      /** The String name of the Commit/Branch/Tag. Defaults to 'master'. */
      ref?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = ContentsPath;
  }
  /**
   * @description Create a file.
   * @name ContentsUpdate
   * @request PUT:/repos/{owner}/{repo}/contents/{path}
   */
  export namespace ContentsUpdate {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      path: string;
    };
    export type RequestQuery = {};
    export type RequestBody = CreateFileBody;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = CreateFile;
  }
  /**
   * @description Get list of contributors.
   * @name ContributorsDetail
   * @request GET:/repos/{owner}/{repo}/contributors
   */
  export namespace ContributorsDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {
      /** Set to 1 or true to include anonymous contributors in results. */
      anon: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Users;
  }
  /**
   * @description Users with pull access can view deployments for a repository
   * @name DeploymentsDetail
   * @request GET:/repos/{owner}/{repo}/deployments
   */
  export namespace DeploymentsDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = RepoDeployments;
  }
  /**
   * @description Users with push access can create a deployment for a given ref
   * @name DeploymentsCreate
   * @request POST:/repos/{owner}/{repo}/deployments
   */
  export namespace DeploymentsCreate {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = Deployment;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = DeploymentResp;
  }
  /**
   * @description Users with pull access can view deployment statuses for a deployment
   * @name DeploymentsStatusesDetail
   * @request GET:/repos/{owner}/{repo}/deployments/{id}/statuses
   */
  export namespace DeploymentsStatusesDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** The Deployment ID to list the statuses from. */
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = DeploymentStatuses;
  }
  /**
   * @description Create a Deployment Status Users with push access can create deployment statuses for a given deployment:
   * @name DeploymentsStatusesCreate
   * @request POST:/repos/{owner}/{repo}/deployments/{id}/statuses
   */
  export namespace DeploymentsStatusesCreate {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** The Deployment ID to list the statuses from. */
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = DeploymentStatusesCreate;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description Deprecated. List downloads for a repository.
   * @name DownloadsDetail
   * @request GET:/repos/{owner}/{repo}/downloads
   * @deprecated
   */
  export namespace DownloadsDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Downloads;
  }
  /**
   * @description Deprecated. Delete a download.
   * @name DownloadsDelete
   * @request DELETE:/repos/{owner}/{repo}/downloads/{downloadId}
   * @deprecated
   */
  export namespace DownloadsDelete {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** Id of download. */
      downloadId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description Deprecated. Get a single download.
   * @name DownloadsDetail2
   * @request GET:/repos/{owner}/{repo}/downloads/{downloadId}
   * @deprecated
   * @originalName downloadsDetail
   * @duplicate
   */
  export namespace DownloadsDetail2 {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** Id of download. */
      downloadId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Download;
  }
  /**
   * @description Get list of repository events.
   * @name EventsDetail
   * @request GET:/repos/{owner}/{repo}/events
   */
  export namespace EventsDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Events;
  }
  /**
   * @description List forks.
   * @name ForksDetail
   * @request GET:/repos/{owner}/{repo}/forks
   */
  export namespace ForksDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {
      /** @default "newes" */
      sort?: "newes" | "oldes" | "watchers";
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Forks;
  }
  /**
   * @description Create a fork. Forking a Repository happens asynchronously. Therefore, you may have to wai a short period before accessing the git objects. If this takes longer than 5 minutes, be sure to contact Support.
   * @name ForksCreate
   * @request POST:/repos/{owner}/{repo}/forks
   */
  export namespace ForksCreate {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = ForkBody;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Repo;
  }
  /**
   * @description Create a Blob.
   * @name GitBlobsCreate
   * @request POST:/repos/{owner}/{repo}/git/blobs
   */
  export namespace GitBlobsCreate {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = Blob;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Blobs;
  }
  /**
   * @description Get a Blob. Since blobs can be any arbitrary binary data, the input and responses for the blob API takes an encoding parameter that can be either utf-8 or base64. If your data cannot be losslessly sent as a UTF-8 string, you can base64 encode it.
   * @name GitBlobsDetail
   * @request GET:/repos/{owner}/{repo}/git/blobs/{shaCode}
   */
  export namespace GitBlobsDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** SHA-1 code. */
      shaCode: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Blob;
  }
  /**
   * @description Create a Commit.
   * @name GitCommitsCreate
   * @request POST:/repos/{owner}/{repo}/git/commits
   */
  export namespace GitCommitsCreate {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = RepoCommitBody;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = GitCommit;
  }
  /**
   * @description Get a Commit.
   * @name GitCommitsDetail
   * @request GET:/repos/{owner}/{repo}/git/commits/{shaCode}
   */
  export namespace GitCommitsDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** SHA-1 code. */
      shaCode: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = RepoCommit;
  }
  /**
   * @description Get all References
   * @name GitRefsDetail
   * @request GET:/repos/{owner}/{repo}/git/refs
   */
  export namespace GitRefsDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Refs;
  }
  /**
   * @description Create a Reference
   * @name GitRefsCreate
   * @request POST:/repos/{owner}/{repo}/git/refs
   */
  export namespace GitRefsCreate {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = RefsBody;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = HeadBranch;
  }
  /**
   * @description Delete a Reference Example: Deleting a branch: DELETE /repos/octocat/Hello-World/git/refs/heads/feature-a Example: Deleting a tag:        DELETE /repos/octocat/Hello-World/git/refs/tags/v1.0
   * @name GitRefsDelete
   * @request DELETE:/repos/{owner}/{repo}/git/refs/{ref}
   */
  export namespace GitRefsDelete {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      ref: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description Get a Reference
   * @name GitRefsDetail2
   * @request GET:/repos/{owner}/{repo}/git/refs/{ref}
   * @originalName gitRefsDetail
   * @duplicate
   */
  export namespace GitRefsDetail2 {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      ref: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = HeadBranch;
  }
  /**
   * @description Update a Reference
   * @name GitRefsPartialUpdate
   * @request PATCH:/repos/{owner}/{repo}/git/refs/{ref}
   */
  export namespace GitRefsPartialUpdate {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      ref: string;
    };
    export type RequestQuery = {};
    export type RequestBody = GitRefPatch;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = HeadBranch;
  }
  /**
   * @description Create a Tag Object. Note that creating a tag object does not create the reference that makes a tag in Git. If you want to create an annotated tag in Git, you have to do this call to create the tag object, and then create the refs/tags/[tag] reference. If you want to create a lightweight tag, you only have to create the tag reference - this call would be unnecessary.
   * @name GitTagsCreate
   * @request POST:/repos/{owner}/{repo}/git/tags
   */
  export namespace GitTagsCreate {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = TagBody;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Tag;
  }
  /**
   * @description Get a Tag.
   * @name GitTagsDetail
   * @request GET:/repos/{owner}/{repo}/git/tags/{shaCode}
   */
  export namespace GitTagsDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      shaCode: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Tag;
  }
  /**
   * @description Create a Tree. The tree creation API will take nested entries as well. If both a tree and a nested path modifying that tree are specified, it will overwrite the contents of that tree with the new path contents and write a new tree out.
   * @name GitTreesCreate
   * @request POST:/repos/{owner}/{repo}/git/trees
   */
  export namespace GitTreesCreate {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = Tree;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Trees;
  }
  /**
   * @description Get a Tree.
   * @name GitTreesDetail
   * @request GET:/repos/{owner}/{repo}/git/trees/{shaCode}
   */
  export namespace GitTreesDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** Tree SHA. */
      shaCode: string;
    };
    export type RequestQuery = {
      /** Get a Tree Recursively. (0 or 1) */
      recursive?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Tree;
  }
  /**
   * @description Get list of hooks.
   * @name HooksDetail
   * @request GET:/repos/{owner}/{repo}/hooks
   */
  export namespace HooksDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Hook;
  }
  /**
   * @description Create a hook.
   * @name HooksCreate
   * @request POST:/repos/{owner}/{repo}/hooks
   */
  export namespace HooksCreate {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = HookBody;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Hook;
  }
  /**
   * @description Delete a hook.
   * @name HooksDelete
   * @request DELETE:/repos/{owner}/{repo}/hooks/{hookId}
   */
  export namespace HooksDelete {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** Id of hook. */
      hookId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description Get single hook.
   * @name HooksDetail2
   * @request GET:/repos/{owner}/{repo}/hooks/{hookId}
   * @originalName hooksDetail
   * @duplicate
   */
  export namespace HooksDetail2 {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** Id of hook. */
      hookId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Hook;
  }
  /**
   * @description Edit a hook.
   * @name HooksPartialUpdate
   * @request PATCH:/repos/{owner}/{repo}/hooks/{hookId}
   */
  export namespace HooksPartialUpdate {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** Id of hook. */
      hookId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = HookBody;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Hook;
  }
  /**
   * @description Test a push hook. This will trigger the hook with the latest push to the current repository if the hook is subscribed to push events. If the hook is not subscribed to push events, the server will respond with 204 but no test POST will be generated. Note: Previously /repos/:owner/:repo/hooks/:id/tes
   * @name HooksTestsCreate
   * @request POST:/repos/{owner}/{repo}/hooks/{hookId}/tests
   */
  export namespace HooksTestsCreate {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** Id of hook. */
      hookId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description List issues for a repository.
   * @name IssuesDetail
   * @request GET:/repos/{owner}/{repo}/issues
   */
  export namespace IssuesDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {
      /**
       * Issues assigned to you / created by you / mentioning you / you're
       * subscribed to updates for / All issues the authenticated user can see
       * @default "all"
       */
      filter: "assigned" | "created" | "mentioned" | "subscribed" | "all";
      /** @default "open" */
      state: "open" | "closed";
      /** String list of comma separated Label names. Example - bug,ui,@high. */
      labels: string;
      /** @default "created" */
      sort: "created" | "updated" | "comments";
      /** @default "desc" */
      direction: "asc" | "desc";
      /**
       * Optional string of a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.
       * Only issues updated at or after this time are returned.
       */
      since?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Issues;
  }
  /**
   * @description Create an issue. Any user with pull access to a repository can create an issue.
   * @name IssuesCreate
   * @request POST:/repos/{owner}/{repo}/issues
   */
  export namespace IssuesCreate {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = Issue;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Issue;
  }
  /**
   * @description List comments in a repository.
   * @name IssuesCommentsDetail
   * @request GET:/repos/{owner}/{repo}/issues/comments
   */
  export namespace IssuesCommentsDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {
      /** Ignored without 'sort' parameter. */
      direction?: string;
      sort?: "created" | "updated";
      /**
       * The time should be passed in as UTC in the ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.
       * Example: "2012-10-09T23:39:01Z".
       */
      since?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = IssuesComments;
  }
  /**
   * @description Delete a comment.
   * @name IssuesCommentsDelete
   * @request DELETE:/repos/{owner}/{repo}/issues/comments/{commentId}
   */
  export namespace IssuesCommentsDelete {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** ID of comment. */
      commentId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description Get a single comment.
   * @name IssuesCommentsDetail2
   * @request GET:/repos/{owner}/{repo}/issues/comments/{commentId}
   * @originalName issuesCommentsDetail
   * @duplicate
   */
  export namespace IssuesCommentsDetail2 {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** ID of comment. */
      commentId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = IssuesComment;
  }
  /**
   * @description Edit a comment.
   * @name IssuesCommentsPartialUpdate
   * @request PATCH:/repos/{owner}/{repo}/issues/comments/{commentId}
   */
  export namespace IssuesCommentsPartialUpdate {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** ID of comment. */
      commentId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = CommentBody;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = IssuesComment;
  }
  /**
   * @description List issue events for a repository.
   * @name IssuesEventsDetail
   * @request GET:/repos/{owner}/{repo}/issues/events
   */
  export namespace IssuesEventsDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = IssueEvents;
  }
  /**
   * @description Get a single event.
   * @name IssuesEventsDetail2
   * @request GET:/repos/{owner}/{repo}/issues/events/{eventId}
   * @originalName issuesEventsDetail
   * @duplicate
   */
  export namespace IssuesEventsDetail2 {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** Id of the event. */
      eventId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = IssueEvent;
  }
  /**
   * @description Get a single issue
   * @name IssuesDetail2
   * @request GET:/repos/{owner}/{repo}/issues/{number}
   * @originalName issuesDetail
   * @duplicate
   */
  export namespace IssuesDetail2 {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** Number of issue. */
      number: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Issue;
  }
  /**
   * @description Edit an issue. Issue owners and users with push access can edit an issue.
   * @name IssuesPartialUpdate
   * @request PATCH:/repos/{owner}/{repo}/issues/{number}
   */
  export namespace IssuesPartialUpdate {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** Number of issue. */
      number: number;
    };
    export type RequestQuery = {};
    export type RequestBody = Issue;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Issue;
  }
  /**
   * @description List comments on an issue.
   * @name IssuesCommentsDetail3
   * @request GET:/repos/{owner}/{repo}/issues/{number}/comments
   * @originalName issuesCommentsDetail
   * @duplicate
   */
  export namespace IssuesCommentsDetail3 {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** Number of issue. */
      number: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = IssuesComments;
  }
  /**
   * @description Create a comment.
   * @name IssuesCommentsCreate
   * @request POST:/repos/{owner}/{repo}/issues/{number}/comments
   */
  export namespace IssuesCommentsCreate {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** Number of issue. */
      number: number;
    };
    export type RequestQuery = {};
    export type RequestBody = CommentBody;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = IssuesComment;
  }
  /**
   * @description List events for an issue.
   * @name IssuesEventsDetail3
   * @request GET:/repos/{owner}/{repo}/issues/{number}/events
   * @originalName issuesEventsDetail
   * @duplicate
   */
  export namespace IssuesEventsDetail3 {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** Number of issue. */
      number: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = IssueEvents;
  }
  /**
   * @description Remove all labels from an issue.
   * @name IssuesLabelsDelete
   * @request DELETE:/repos/{owner}/{repo}/issues/{number}/labels
   */
  export namespace IssuesLabelsDelete {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** Number of issue. */
      number: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description List labels on an issue.
   * @name IssuesLabelsDetail
   * @request GET:/repos/{owner}/{repo}/issues/{number}/labels
   */
  export namespace IssuesLabelsDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** Number of issue. */
      number: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Labels;
  }
  /**
   * @description Add labels to an issue.
   * @name IssuesLabelsCreate
   * @request POST:/repos/{owner}/{repo}/issues/{number}/labels
   */
  export namespace IssuesLabelsCreate {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** Number of issue. */
      number: number;
    };
    export type RequestQuery = {};
    export type RequestBody = EmailsPost;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Label;
  }
  /**
   * @description Replace all labels for an issue. Sending an empty array ([]) will remove all Labels from the Issue.
   * @name IssuesLabelsUpdate
   * @request PUT:/repos/{owner}/{repo}/issues/{number}/labels
   */
  export namespace IssuesLabelsUpdate {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** Number of issue. */
      number: number;
    };
    export type RequestQuery = {};
    export type RequestBody = EmailsPost;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Label;
  }
  /**
   * @description Remove a label from an issue.
   * @name IssuesLabelsDelete2
   * @request DELETE:/repos/{owner}/{repo}/issues/{number}/labels/{name}
   * @originalName issuesLabelsDelete
   * @duplicate
   */
  export namespace IssuesLabelsDelete2 {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** Number of issue. */
      number: number;
      /** Name of the label. */
      name: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description Get list of keys.
   * @name KeysDetail
   * @request GET:/repos/{owner}/{repo}/keys
   */
  export namespace KeysDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Keys;
  }
  /**
   * @description Create a key.
   * @name KeysCreate
   * @request POST:/repos/{owner}/{repo}/keys
   */
  export namespace KeysCreate {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UserKeysPost;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = UserKeysKeyId;
  }
  /**
   * @description Delete a key.
   * @name KeysDelete
   * @request DELETE:/repos/{owner}/{repo}/keys/{keyId}
   */
  export namespace KeysDelete {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** Id of key. */
      keyId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description Get a key
   * @name KeysDetail2
   * @request GET:/repos/{owner}/{repo}/keys/{keyId}
   * @originalName keysDetail
   * @duplicate
   */
  export namespace KeysDetail2 {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** Id of key. */
      keyId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = UserKeysKeyId;
  }
  /**
   * @description List all labels for this repository.
   * @name LabelsDetail
   * @request GET:/repos/{owner}/{repo}/labels
   */
  export namespace LabelsDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Labels;
  }
  /**
   * @description Create a label.
   * @name LabelsCreate
   * @request POST:/repos/{owner}/{repo}/labels
   */
  export namespace LabelsCreate {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = EmailsPost;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Label;
  }
  /**
   * @description Delete a label.
   * @name LabelsDelete
   * @request DELETE:/repos/{owner}/{repo}/labels/{name}
   */
  export namespace LabelsDelete {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** Name of the label. */
      name: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description Get a single label.
   * @name LabelsDetail2
   * @request GET:/repos/{owner}/{repo}/labels/{name}
   * @originalName labelsDetail
   * @duplicate
   */
  export namespace LabelsDetail2 {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** Name of the label. */
      name: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Label;
  }
  /**
   * @description Update a label.
   * @name LabelsPartialUpdate
   * @request PATCH:/repos/{owner}/{repo}/labels/{name}
   */
  export namespace LabelsPartialUpdate {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** Name of the label. */
      name: string;
    };
    export type RequestQuery = {};
    export type RequestBody = EmailsPost;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Label;
  }
  /**
   * @description List languages. List languages for the specified repository. The value on the right of a language is the number of bytes of code written in that language.
   * @name LanguagesDetail
   * @request GET:/repos/{owner}/{repo}/languages
   */
  export namespace LanguagesDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Languages;
  }
  /**
   * @description Perform a merge.
   * @name MergesCreate
   * @request POST:/repos/{owner}/{repo}/merges
   */
  export namespace MergesCreate {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = MergesBody;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = MergesSuccessful;
  }
  /**
   * @description List milestones for a repository.
   * @name MilestonesDetail
   * @request GET:/repos/{owner}/{repo}/milestones
   */
  export namespace MilestonesDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {
      /**
       * String to filter by state.
       * @default "open"
       */
      state?: "open" | "closed";
      /** Ignored without 'sort' parameter. */
      direction?: string;
      /** @default "due_date" */
      sort?: "due_date" | "completeness";
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Milestone;
  }
  /**
   * @description Create a milestone.
   * @name MilestonesCreate
   * @request POST:/repos/{owner}/{repo}/milestones
   */
  export namespace MilestonesCreate {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = MilestoneUpdate;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Milestone;
  }
  /**
   * @description Delete a milestone.
   * @name MilestonesDelete
   * @request DELETE:/repos/{owner}/{repo}/milestones/{number}
   */
  export namespace MilestonesDelete {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** Number of milestone. */
      number: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description Get a single milestone.
   * @name MilestonesDetail2
   * @request GET:/repos/{owner}/{repo}/milestones/{number}
   * @originalName milestonesDetail
   * @duplicate
   */
  export namespace MilestonesDetail2 {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** Number of milestone. */
      number: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Milestone;
  }
  /**
   * @description Update a milestone.
   * @name MilestonesPartialUpdate
   * @request PATCH:/repos/{owner}/{repo}/milestones/{number}
   */
  export namespace MilestonesPartialUpdate {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** Number of milestone. */
      number: number;
    };
    export type RequestQuery = {};
    export type RequestBody = MilestoneUpdate;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Milestone;
  }
  /**
   * @description Get labels for every issue in a milestone.
   * @name MilestonesLabelsDetail
   * @request GET:/repos/{owner}/{repo}/milestones/{number}/labels
   */
  export namespace MilestonesLabelsDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** Number of milestone. */
      number: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Labels;
  }
  /**
   * @description List your notifications in a repository List all notifications for the current user.
   * @name NotificationsDetail
   * @request GET:/repos/{owner}/{repo}/notifications
   */
  export namespace NotificationsDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {
      /** True to show notifications marked as read. */
      all?: boolean;
      /**
       * True to show only notifications in which the user is directly participating
       * or mentioned.
       */
      participating?: boolean;
      /**
       * The time should be passed in as UTC in the ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.
       * Example: "2012-10-09T23:39:01Z".
       */
      since?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Notifications;
  }
  /**
   * @description Mark notifications as read in a repository. Marking all notifications in a repository as "read" removes them from the default view on GitHub.com.
   * @name NotificationsUpdate
   * @request PUT:/repos/{owner}/{repo}/notifications
   */
  export namespace NotificationsUpdate {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = NotificationMarkRead;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description List pull requests.
   * @name PullsDetail
   * @request GET:/repos/{owner}/{repo}/pulls
   */
  export namespace PullsDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {
      /**
       * String to filter by state.
       * @default "open"
       */
      state?: "open" | "closed";
      /**
       * Filter pulls by head user and branch name in the format of 'user:ref-name'.
       * Example: github:new-script-format.
       */
      head?: string;
      /** Filter pulls by base branch name. Example - gh-pages. */
      base?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Pulls;
  }
  /**
   * @description Create a pull request.
   * @name PullsCreate
   * @request POST:/repos/{owner}/{repo}/pulls
   */
  export namespace PullsCreate {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = PullsPost;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Pulls;
  }
  /**
   * @description List comments in a repository. By default, Review Comments are ordered by ascending ID.
   * @name PullsCommentsDetail
   * @request GET:/repos/{owner}/{repo}/pulls/comments
   */
  export namespace PullsCommentsDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {
      /** Ignored without 'sort' parameter. */
      direction?: string;
      sort?: "created" | "updated";
      /**
       * The time should be passed in as UTC in the ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.
       * Example: "2012-10-09T23:39:01Z".
       */
      since?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = IssuesComments;
  }
  /**
   * @description Delete a comment.
   * @name PullsCommentsDelete
   * @request DELETE:/repos/{owner}/{repo}/pulls/comments/{commentId}
   */
  export namespace PullsCommentsDelete {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** Id of comment. */
      commentId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description Get a single comment.
   * @name PullsCommentsDetail2
   * @request GET:/repos/{owner}/{repo}/pulls/comments/{commentId}
   * @originalName pullsCommentsDetail
   * @duplicate
   */
  export namespace PullsCommentsDetail2 {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** Id of comment. */
      commentId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = PullsComment;
  }
  /**
   * @description Edit a comment.
   * @name PullsCommentsPartialUpdate
   * @request PATCH:/repos/{owner}/{repo}/pulls/comments/{commentId}
   */
  export namespace PullsCommentsPartialUpdate {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** Id of comment. */
      commentId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = CommentBody;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = PullsComment;
  }
  /**
   * @description Get a single pull request.
   * @name PullsDetail2
   * @request GET:/repos/{owner}/{repo}/pulls/{number}
   * @originalName pullsDetail
   * @duplicate
   */
  export namespace PullsDetail2 {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** Id of pull. */
      number: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = PullRequest;
  }
  /**
   * @description Update a pull request.
   * @name PullsPartialUpdate
   * @request PATCH:/repos/{owner}/{repo}/pulls/{number}
   */
  export namespace PullsPartialUpdate {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** Id of pull. */
      number: number;
    };
    export type RequestQuery = {};
    export type RequestBody = PullUpdate;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Repo;
  }
  /**
   * @description List comments on a pull request.
   * @name PullsCommentsDetail3
   * @request GET:/repos/{owner}/{repo}/pulls/{number}/comments
   * @originalName pullsCommentsDetail
   * @duplicate
   */
  export namespace PullsCommentsDetail3 {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** Id of pull. */
      number: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = PullsComment;
  }
  /**
   * @description Create a comment. #TODO Alternative input ( http://developer.github.com/v3/pulls/comments/ ) description: | Alternative Input. Instead of passing commit_id, path, and position you can reply to an existing Pull Request Comment like this: body Required string in_reply_to Required number - Comment id to reply to.
   * @name PullsCommentsCreate
   * @request POST:/repos/{owner}/{repo}/pulls/{number}/comments
   */
  export namespace PullsCommentsCreate {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** Id of pull. */
      number: number;
    };
    export type RequestQuery = {};
    export type RequestBody = PullsCommentPost;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = PullsComment;
  }
  /**
   * @description List commits on a pull request.
   * @name PullsCommitsDetail
   * @request GET:/repos/{owner}/{repo}/pulls/{number}/commits
   */
  export namespace PullsCommitsDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** Id of pull. */
      number: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Commits;
  }
  /**
   * @description List pull requests files.
   * @name PullsFilesDetail
   * @request GET:/repos/{owner}/{repo}/pulls/{number}/files
   */
  export namespace PullsFilesDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** Id of pull. */
      number: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Pulls;
  }
  /**
   * @description Get if a pull request has been merged.
   * @name PullsMergeDetail
   * @request GET:/repos/{owner}/{repo}/pulls/{number}/merge
   */
  export namespace PullsMergeDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** Id of pull. */
      number: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description Merge a pull request (Merge Button's)
   * @name PullsMergeUpdate
   * @request PUT:/repos/{owner}/{repo}/pulls/{number}/merge
   */
  export namespace PullsMergeUpdate {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** Id of pull. */
      number: number;
    };
    export type RequestQuery = {};
    export type RequestBody = MergePullBody;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Merge;
  }
  /**
   * @description Get the README. This method returns the preferred README for a repository.
   * @name ReadmeDetail
   * @request GET:/repos/{owner}/{repo}/readme
   */
  export namespace ReadmeDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {
      /** The String name of the Commit/Branch/Tag. Defaults to master. */
      ref?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = ContentsPath;
  }
  /**
   * @description Users with push access to the repository will receive all releases (i.e., published releases and draft releases). Users with pull access will receive published releases only
   * @name ReleasesDetail
   * @request GET:/repos/{owner}/{repo}/releases
   */
  export namespace ReleasesDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Releases;
  }
  /**
   * @description Create a release Users with push access to the repository can create a release.
   * @name ReleasesCreate
   * @request POST:/repos/{owner}/{repo}/releases
   */
  export namespace ReleasesCreate {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = ReleaseCreate;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Release;
  }
  /**
   * @description Delete a release asset
   * @name ReleasesAssetsDelete
   * @request DELETE:/repos/{owner}/{repo}/releases/assets/{id}
   */
  export namespace ReleasesAssetsDelete {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description Get a single release asset
   * @name ReleasesAssetsDetail
   * @request GET:/repos/{owner}/{repo}/releases/assets/{id}
   */
  export namespace ReleasesAssetsDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Asset;
  }
  /**
   * @description Edit a release asset Users with push access to the repository can edit a release asset.
   * @name ReleasesAssetsPartialUpdate
   * @request PATCH:/repos/{owner}/{repo}/releases/assets/{id}
   */
  export namespace ReleasesAssetsPartialUpdate {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = AssetPatch;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Asset;
  }
  /**
   * @description Users with push access to the repository can delete a release.
   * @name ReleasesDelete
   * @request DELETE:/repos/{owner}/{repo}/releases/{id}
   */
  export namespace ReleasesDelete {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description Get a single release
   * @name ReleasesDetail2
   * @request GET:/repos/{owner}/{repo}/releases/{id}
   * @originalName releasesDetail
   * @duplicate
   */
  export namespace ReleasesDetail2 {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Release;
  }
  /**
   * @description Users with push access to the repository can edit a release
   * @name ReleasesPartialUpdate
   * @request PATCH:/repos/{owner}/{repo}/releases/{id}
   */
  export namespace ReleasesPartialUpdate {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = ReleaseCreate;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Release;
  }
  /**
   * @description List assets for a release
   * @name ReleasesAssetsDetail2
   * @request GET:/repos/{owner}/{repo}/releases/{id}/assets
   * @originalName releasesAssetsDetail
   * @duplicate
   */
  export namespace ReleasesAssetsDetail2 {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Assets;
  }
  /**
   * @description List Stargazers.
   * @name StargazersDetail
   * @request GET:/repos/{owner}/{repo}/stargazers
   */
  export namespace StargazersDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Users;
  }
  /**
   * @description Get the number of additions and deletions per week. Returns a weekly aggregate of the number of additions and deletions pushed to a repository.
   * @name StatsCodeFrequencyDetail
   * @request GET:/repos/{owner}/{repo}/stats/code_frequency
   */
  export namespace StatsCodeFrequencyDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = CodeFrequencyStats;
  }
  /**
   * @description Get the last year of commit activity data. Returns the last year of commit activity grouped by week. The days array is a group of commits per day, starting on Sunday.
   * @name StatsCommitActivityDetail
   * @request GET:/repos/{owner}/{repo}/stats/commit_activity
   */
  export namespace StatsCommitActivityDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = CommitActivityStats;
  }
  /**
   * @description Get contributors list with additions, deletions, and commit counts.
   * @name StatsContributorsDetail
   * @request GET:/repos/{owner}/{repo}/stats/contributors
   */
  export namespace StatsContributorsDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = ContributorsStats;
  }
  /**
   * @description Get the weekly commit count for the repo owner and everyone else.
   * @name StatsParticipationDetail
   * @request GET:/repos/{owner}/{repo}/stats/participation
   */
  export namespace StatsParticipationDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = ParticipationStats;
  }
  /**
   * @description Get the number of commits per hour in each day. Each array contains the day number, hour number, and number of commits 0-6 Sunday - Saturday 0-23 Hour of day Number of commits For example, [2, 14, 25] indicates that there were 25 total commits, during the 2.00pm hour on Tuesdays. All times are based on the time zone of individual commits.
   * @name StatsPunchCardDetail
   * @request GET:/repos/{owner}/{repo}/stats/punch_card
   */
  export namespace StatsPunchCardDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = CodeFrequencyStats;
  }
  /**
   * @description List Statuses for a specific Ref.
   * @name StatusesDetail
   * @request GET:/repos/{owner}/{repo}/statuses/{ref}
   */
  export namespace StatusesDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** Ref to list the statuses from. It can be a SHA, a branch name, or a tag name. */
      ref: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Ref;
  }
  /**
   * @description Create a Status.
   * @name StatusesCreate
   * @request POST:/repos/{owner}/{repo}/statuses/{ref}
   */
  export namespace StatusesCreate {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      /** Ref to list the statuses from. It can be a SHA, a branch name, or a tag name. */
      ref: string;
    };
    export type RequestQuery = {};
    export type RequestBody = HeadBranch;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Ref;
  }
  /**
   * @description List watchers.
   * @name SubscribersDetail
   * @request GET:/repos/{owner}/{repo}/subscribers
   */
  export namespace SubscribersDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Users;
  }
  /**
   * @description Delete a Repository Subscription.
   * @name SubscriptionDelete
   * @request DELETE:/repos/{owner}/{repo}/subscription
   */
  export namespace SubscriptionDelete {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description Get a Repository Subscription.
   * @name SubscriptionDetail
   * @request GET:/repos/{owner}/{repo}/subscription
   */
  export namespace SubscriptionDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Subscription;
  }
  /**
   * @description Set a Repository Subscription
   * @name SubscriptionUpdate
   * @request PUT:/repos/{owner}/{repo}/subscription
   */
  export namespace SubscriptionUpdate {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = SubscriptionBody;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Subscription;
  }
  /**
   * @description Get list of tags.
   * @name TagsDetail
   * @request GET:/repos/{owner}/{repo}/tags
   */
  export namespace TagsDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Tags;
  }
  /**
   * @description Get list of teams
   * @name TeamsDetail
   * @request GET:/repos/{owner}/{repo}/teams
   */
  export namespace TeamsDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Teams;
  }
  /**
   * @description List Stargazers. New implementation.
   * @name WatchersDetail
   * @request GET:/repos/{owner}/{repo}/watchers
   */
  export namespace WatchersDetail {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Users;
  }
  /**
   * @description Get archive link. This method will return a 302 to a URL to download a tarball or zipball archive for a repository. Please make sure your HTTP framework is configured to follow redirects or you will need to use the Location header to make a second GET request. Note: For private repositories, these links are temporary and expire quickly.
   * @name ReposDetail2
   * @request GET:/repos/{owner}/{repo}/{archive_format}/{path}
   * @originalName reposDetail
   * @duplicate
   */
  export namespace ReposDetail2 {
    export type RequestParams = {
      /** Name of repository owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
      archiveFormat: "tarball" | "zipball";
      /** Valid Git reference, defaults to 'master'. */
      path: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = any;
  }
}

export namespace Repositories {
  /**
   * @description List all public repositories. This provides a dump of every public repository, in the order that they were created. Note: Pagination is powered exclusively by the since parameter. is the Link header to get the URL for the next page of repositories.
   * @name RepositoriesList
   * @request GET:/repositories
   */
  export namespace RepositoriesList {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * The time should be passed in as UTC in the ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.
       * Example: "2012-10-09T23:39:01Z".
       */
      since?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Repos;
  }
}

export namespace Search {
  /**
   * @description Search code.
   * @name CodeList
   * @request GET:/search/code
   */
  export namespace CodeList {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * The sort field. if sort param is provided. Can be either asc or desc.
       * @default "desc"
       */
      order?: "desc" | "asc";
      /**
       * The search terms. This can be any combination of the supported code
       * search parameters:
       * 'Search In' Qualifies which fields are searched. With this qualifier
       * you can restrict the search to just the file contents, the file path,
       * or both.
       * 'Languages' Searches code based on the language it's written in.
       * 'Forks' Filters repositories based on the number of forks, and/or
       * whether code from forked repositories should be included in the results
       * at all.
       * 'Size' Finds files that match a certain size (in bytes).
       * 'Path' Specifies the path that the resulting file must be at.
       * 'Extension' Matches files with a certain extension.
       * 'Users' or 'Repositories' Limits searches to a specific user or repository.
       */
      q: string;
      /**
       * Can only be 'indexed', which indicates how recently a file has been indexed
       * by the GitHub search infrastructure. If not provided, results are sorted
       * by best match.
       */
      sort?: "indexed";
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = SearchCode;
  }
  /**
   * @description Find issues by state and keyword. (This method returns up to 100 results per page.)
   * @name IssuesList
   * @request GET:/search/issues
   */
  export namespace IssuesList {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * The sort field. if sort param is provided. Can be either asc or desc.
       * @default "desc"
       */
      order?: "desc" | "asc";
      /** The q search term can also contain any combination of the supported issue search qualifiers: */
      q: string;
      /** The sort field. Can be comments, created, or updated. Default: results are sorted by best match. */
      sort?: "updated" | "created" | "comments";
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = SearchIssues;
  }
  /**
   * @description Search repositories.
   * @name RepositoriesList
   * @request GET:/search/repositories
   */
  export namespace RepositoriesList {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * The sort field. if sort param is provided. Can be either asc or desc.
       * @default "desc"
       */
      order?: "desc" | "asc";
      /**
       * The search terms. This can be any combination of the supported repository
       * search parameters:
       * 'Search In' Qualifies which fields are searched. With this qualifier you
       * can restrict the search to just the repository name, description, readme,
       * or any combination of these.
       * 'Size' Finds repositories that match a certain size (in kilobytes).
       * 'Forks' Filters repositories based on the number of forks, and/or whether
       * forked repositories should be included in the results at all.
       * 'Created' and 'Last Updated' Filters repositories based on times of
       * creation, or when they were last updated.
       * 'Users or Repositories' Limits searches to a specific user or repository.
       * 'Languages' Searches repositories based on the language they are written in.
       * 'Stars' Searches repositories based on the number of stars.
       */
      q: string;
      /** If not provided, results are sorted by best match. */
      sort?: "stars" | "forks" | "updated";
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = SearchRepositories;
  }
  /**
   * @description Search users.
   * @name UsersList
   * @request GET:/search/users
   */
  export namespace UsersList {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * The sort field. if sort param is provided. Can be either asc or desc.
       * @default "desc"
       */
      order?: "desc" | "asc";
      /**
       * The search terms. This can be any combination of the supported user
       * search parameters:
       * 'Search In' Qualifies which fields are searched. With this qualifier you
       * can restrict the search to just the username, public email, full name,
       * location, or any combination of these.
       * 'Repository count' Filters users based on the number of repositories they
       * have.
       * 'Location' Filter users by the location indicated in their profile.
       * 'Language' Search for users that have repositories that match a certain
       * language.
       * 'Created' Filter users based on when they joined.
       * 'Followers' Filter users based on the number of followers they have.
       */
      q: string;
      /** If not provided, results are sorted by best match. */
      sort?: "followers" | "repositories" | "joined";
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = SearchUsers;
  }
}

export namespace Teams {
  /**
   * @description Delete team. In order to delete a team, the authenticated user must be an owner of the org that the team is associated with.
   * @name TeamsDelete
   * @request DELETE:/teams/{teamId}
   */
  export namespace TeamsDelete {
    export type RequestParams = {
      /** Id of team. */
      teamId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description Get team.
   * @name TeamsDetail
   * @request GET:/teams/{teamId}
   */
  export namespace TeamsDetail {
    export type RequestParams = {
      /** Id of team. */
      teamId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Team;
  }
  /**
   * @description Edit team. In order to edit a team, the authenticated user must be an owner of the org that the team is associated with.
   * @name TeamsPartialUpdate
   * @request PATCH:/teams/{teamId}
   */
  export namespace TeamsPartialUpdate {
    export type RequestParams = {
      /** Id of team. */
      teamId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = EditTeam;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Team;
  }
  /**
   * @description List team members. In order to list members in a team, the authenticated user must be a member of the team.
   * @name MembersDetail
   * @request GET:/teams/{teamId}/members
   */
  export namespace MembersDetail {
    export type RequestParams = {
      /** Id of team. */
      teamId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Users;
  }
  /**
   * @description The "Remove team member" API is deprecated and is scheduled for removal in the next major version of the API. We recommend using the Remove team membership API instead. It allows you to remove both active and pending memberships. Remove team member. In order to remove a user from a team, the authenticated user must have 'admin' permissions to the team or be an owner of the org that the team is associated with. NOTE This does not delete the user, it just remove them from the team.
   * @name MembersDelete
   * @request DELETE:/teams/{teamId}/members/{username}
   * @deprecated
   */
  export namespace MembersDelete {
    export type RequestParams = {
      /** Id of team. */
      teamId: number;
      /** Name of a member. */
      username: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description The "Get team member" API is deprecated and is scheduled for removal in the next major version of the API. We recommend using the Get team membership API instead. It allows you to get both active and pending memberships. Get team member. In order to get if a user is a member of a team, the authenticated user mus be a member of the team.
   * @name MembersDetail2
   * @request GET:/teams/{teamId}/members/{username}
   * @deprecated
   * @originalName membersDetail
   * @duplicate
   */
  export namespace MembersDetail2 {
    export type RequestParams = {
      /** Id of team. */
      teamId: number;
      /** Name of a member. */
      username: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description The API (described below) is deprecated and is scheduled for removal in the next major version of the API. We recommend using the Add team membership API instead. It allows you to invite new organization members to your teams. Add team member. In order to add a user to a team, the authenticated user must have 'admin' permissions to the team or be an owner of the org that the team is associated with.
   * @name MembersUpdate
   * @request PUT:/teams/{teamId}/members/{username}
   * @deprecated
   */
  export namespace MembersUpdate {
    export type RequestParams = {
      /** Id of team. */
      teamId: number;
      /** Name of a member. */
      username: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description Remove team membership. In order to remove a membership between a user and a team, the authenticated user must have 'admin' permissions to the team or be an owner of the organization that the team is associated with. NOTE: This does not delete the user, it just removes their membership from the team.
   * @name MembershipsDelete
   * @request DELETE:/teams/{teamId}/memberships/{username}
   */
  export namespace MembershipsDelete {
    export type RequestParams = {
      /** Id of team. */
      teamId: number;
      /** Name of a member. */
      username: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description Get team membership. In order to get a user's membership with a team, the authenticated user must be a member of the team or an owner of the team's organization.
   * @name MembershipsDetail
   * @request GET:/teams/{teamId}/memberships/{username}
   */
  export namespace MembershipsDetail {
    export type RequestParams = {
      /** Id of team. */
      teamId: number;
      /** Name of a member. */
      username: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = TeamMembership;
  }
  /**
   * @description Add team membership. In order to add a membership between a user and a team, the authenticated user must have 'admin' permissions to the team or be an owner of the organization that the team is associated with. If the user is already a part of the team's organization (meaning they're on at least one other team in the organization), this endpoint will add the user to the team. If the user is completely unaffiliated with the team's organization (meaning they're on none of the organization's teams), this endpoint will send an invitation to the user via email. This newly-created membership will be in the 'pending' state until the user accepts the invitation, at which point the membership will transition to the 'active' state and the user will be added as a member of the team.
   * @name MembershipsUpdate
   * @request PUT:/teams/{teamId}/memberships/{username}
   */
  export namespace MembershipsUpdate {
    export type RequestParams = {
      /** Id of team. */
      teamId: number;
      /** Name of a member. */
      username: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = TeamMembership;
  }
  /**
   * @description List team repos
   * @name ReposDetail
   * @request GET:/teams/{teamId}/repos
   */
  export namespace ReposDetail {
    export type RequestParams = {
      /** Id of team. */
      teamId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = TeamRepos;
  }
  /**
   * @description In order to remove a repository from a team, the authenticated user must be an owner of the org that the team is associated with. NOTE: This does not delete the repository, it just removes it from the team.
   * @name ReposDelete
   * @request DELETE:/teams/{teamId}/repos/{owner}/{repo}
   */
  export namespace ReposDelete {
    export type RequestParams = {
      /** Id of team. */
      teamId: number;
      /** Name of a repository owner. */
      owner: string;
      /** Name of a repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description Check if a team manages a repository
   * @name ReposDetail2
   * @request GET:/teams/{teamId}/repos/{owner}/{repo}
   * @originalName reposDetail
   * @duplicate
   */
  export namespace ReposDetail2 {
    export type RequestParams = {
      /** Id of team. */
      teamId: number;
      /** Name of a repository owner. */
      owner: string;
      /** Name of a repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = any;
  }
  /**
   * @description In order to add a repository to a team, the authenticated user must be an owner of the org that the team is associated with. Also, the repository must be owned by the organization, or a direct fork of a repository owned by the organization.
   * @name ReposUpdate
   * @request PUT:/teams/{teamId}/repos/{owner}/{repo}
   */
  export namespace ReposUpdate {
    export type RequestParams = {
      /** Id of team. */
      teamId: number;
      /** Name of a organization. */
      owner: string;
      /** Name of a repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = any;
  }
}

export namespace User {
  /**
   * @description Get the authenticated user.
   * @name UserList
   * @request GET:/user
   */
  export namespace UserList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = User;
  }
  /**
   * @description Update the authenticated user.
   * @name UserPartialUpdate
   * @request PATCH:/user
   */
  export namespace UserPartialUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UserUpdate;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = User;
  }
  /**
   * @description Delete email address(es). You can include a single email address or an array of addresses.
   * @name EmailsDelete
   * @request DELETE:/user/emails
   */
  export namespace EmailsDelete {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UserEmails;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description List email addresses for a user. In the final version of the API, this method will return an array of hashes with extended information for each email address indicating if the address has been verified and if it's primary email address for GitHub. Until API v3 is finalized, use the application/vnd.github.v3 media type to get other response format.
   * @name EmailsList
   * @request GET:/user/emails
   */
  export namespace EmailsList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = UserEmails;
  }
  /**
   * @description Add email address(es). You can post a single email address or an array of addresses.
   * @name EmailsCreate
   * @request POST:/user/emails
   */
  export namespace EmailsCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = EmailsPost;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = any;
  }
  /**
   * @description List the authenticated user's followers
   * @name FollowersList
   * @request GET:/user/followers
   */
  export namespace FollowersList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Users;
  }
  /**
   * @description List who the authenticated user is following.
   * @name FollowingList
   * @request GET:/user/following
   */
  export namespace FollowingList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Users;
  }
  /**
   * @description Unfollow a user. Unfollowing a user requires the user to be logged in and authenticated with basic auth or OAuth with the user:follow scope.
   * @name FollowingDelete
   * @request DELETE:/user/following/{username}
   */
  export namespace FollowingDelete {
    export type RequestParams = {
      /** Name of user. */
      username: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description Check if you are following a user.
   * @name FollowingDetail
   * @request GET:/user/following/{username}
   */
  export namespace FollowingDetail {
    export type RequestParams = {
      /** Name of user. */
      username: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description Follow a user. Following a user requires the user to be logged in and authenticated with basic auth or OAuth with the user:follow scope.
   * @name FollowingUpdate
   * @request PUT:/user/following/{username}
   */
  export namespace FollowingUpdate {
    export type RequestParams = {
      /** Name of user. */
      username: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description List issues. List all issues across owned and member repositories for the authenticated user.
   * @name IssuesList
   * @request GET:/user/issues
   */
  export namespace IssuesList {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * Issues assigned to you / created by you / mentioning you / you're
       * subscribed to updates for / All issues the authenticated user can see
       * @default "all"
       */
      filter: "assigned" | "created" | "mentioned" | "subscribed" | "all";
      /** @default "open" */
      state: "open" | "closed";
      /** String list of comma separated Label names. Example - bug,ui,@high. */
      labels: string;
      /** @default "created" */
      sort: "created" | "updated" | "comments";
      /** @default "desc" */
      direction: "asc" | "desc";
      /**
       * Optional string of a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.
       * Only issues updated at or after this time are returned.
       */
      since?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Issues;
  }
  /**
   * @description List your public keys. Lists the current user's keys. Management of public keys via the API requires that you are authenticated through basic auth, or OAuth with the 'user', 'write:public_key' scopes.
   * @name KeysList
   * @request GET:/user/keys
   */
  export namespace KeysList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Gitignore;
  }
  /**
   * @description Create a public key.
   * @name KeysCreate
   * @request POST:/user/keys
   */
  export namespace KeysCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UserKeysPost;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = UserKeysKeyId;
  }
  /**
   * @description Delete a public key. Removes a public key. Requires that you are authenticated via Basic Auth or via OAuth with at least admin:public_key scope.
   * @name KeysDelete
   * @request DELETE:/user/keys/{keyId}
   */
  export namespace KeysDelete {
    export type RequestParams = {
      /** ID of key. */
      keyId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description Get a single public key.
   * @name KeysDetail
   * @request GET:/user/keys/{keyId}
   */
  export namespace KeysDetail {
    export type RequestParams = {
      /** ID of key. */
      keyId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = UserKeysKeyId;
  }
  /**
   * @description List public and private organizations for the authenticated user.
   * @name OrgsList
   * @request GET:/user/orgs
   */
  export namespace OrgsList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Gitignore;
  }
  /**
   * @description List repositories for the authenticated user. Note that this does not include repositories owned by organizations which the user can access. You can lis user organizations and list organization repositories separately.
   * @name ReposList
   * @request GET:/user/repos
   */
  export namespace ReposList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** @default "all" */
      type?: "all" | "public" | "private" | "forks" | "sources" | "member";
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Repos;
  }
  /**
   * @description Create a new repository for the authenticated user. OAuth users must supply repo scope.
   * @name ReposCreate
   * @request POST:/user/repos
   */
  export namespace ReposCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PostRepo;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Repos;
  }
  /**
   * @description List repositories being starred by the authenticated user.
   * @name StarredList
   * @request GET:/user/starred
   */
  export namespace StarredList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Ignored without 'sort' parameter. */
      direction?: string;
      /** @default "created" */
      sort?: "created" | "updated";
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Gitignore;
  }
  /**
   * @description Unstar a repository
   * @name StarredDelete
   * @request DELETE:/user/starred/{owner}/{repo}
   */
  export namespace StarredDelete {
    export type RequestParams = {
      /** Name of a repository owner. */
      owner: string;
      /** Name of a repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description Check if you are starring a repository.
   * @name StarredDetail
   * @request GET:/user/starred/{owner}/{repo}
   */
  export namespace StarredDetail {
    export type RequestParams = {
      /** Name of a repository owner. */
      owner: string;
      /** Name of a repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description Star a repository.
   * @name StarredUpdate
   * @request PUT:/user/starred/{owner}/{repo}
   */
  export namespace StarredUpdate {
    export type RequestParams = {
      /** Name of a repository owner. */
      owner: string;
      /** Name of a repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description List repositories being watched by the authenticated user.
   * @name SubscriptionsList
   * @request GET:/user/subscriptions
   */
  export namespace SubscriptionsList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Repos;
  }
  /**
   * @description Stop watching a repository
   * @name SubscriptionsDelete
   * @request DELETE:/user/subscriptions/{owner}/{repo}
   * @deprecated
   */
  export namespace SubscriptionsDelete {
    export type RequestParams = {
      /** Name of the owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description Check if you are watching a repository.
   * @name SubscriptionsDetail
   * @request GET:/user/subscriptions/{owner}/{repo}
   * @deprecated
   */
  export namespace SubscriptionsDetail {
    export type RequestParams = {
      /** Name of the owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description Watch a repository.
   * @name SubscriptionsUpdate
   * @request PUT:/user/subscriptions/{owner}/{repo}
   * @deprecated
   */
  export namespace SubscriptionsUpdate {
    export type RequestParams = {
      /** Name of the owner. */
      owner: string;
      /** Name of repository. */
      repo: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description List all of the teams across all of the organizations to which the authenticated user belongs. This method requires user or repo scope when authenticating via OAuth.
   * @name TeamsList
   * @request GET:/user/teams
   */
  export namespace TeamsList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = TeamsList;
  }
}

export namespace Users {
  /**
   * @description Get all users. This provides a dump of every user, in the order that they signed up for GitHub. Note: Pagination is powered exclusively by the since parameter. Use the Link header to get the URL for the next page of users.
   * @name UsersList
   * @request GET:/users
   */
  export namespace UsersList {
    export type RequestParams = {};
    export type RequestQuery = {
      /** The integer ID of the last user that you've seen. */
      since?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Users;
  }
  /**
   * @description Get a single user.
   * @name UsersDetail
   * @request GET:/users/{username}
   */
  export namespace UsersDetail {
    export type RequestParams = {
      /** Name of user. */
      username: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = User;
  }
  /**
   * @description If you are authenticated as the given user, you will see your private events. Otherwise, you'll only see public events.
   * @name EventsDetail
   * @request GET:/users/{username}/events
   */
  export namespace EventsDetail {
    export type RequestParams = {
      /** Name of user. */
      username: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = any;
  }
  /**
   * @description This is the user's organization dashboard. You must be authenticated as the user to view this.
   * @name EventsOrgsDetail
   * @request GET:/users/{username}/events/orgs/{org}
   */
  export namespace EventsOrgsDetail {
    export type RequestParams = {
      /** Name of user. */
      username: string;
      org: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = any;
  }
  /**
   * @description List a user's followers
   * @name FollowersDetail
   * @request GET:/users/{username}/followers
   */
  export namespace FollowersDetail {
    export type RequestParams = {
      /** Name of user. */
      username: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Users;
  }
  /**
   * @description Check if one user follows another.
   * @name FollowingDetail
   * @request GET:/users/{username}/following/{targetUser}
   */
  export namespace FollowingDetail {
    export type RequestParams = {
      /** Name of user. */
      username: string;
      /** Name of user. */
      targetUser: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = void;
  }
  /**
   * @description List a users gists.
   * @name GistsDetail
   * @request GET:/users/{username}/gists
   */
  export namespace GistsDetail {
    export type RequestParams = {
      /** Name of user. */
      username: string;
    };
    export type RequestQuery = {
      /**
       * The time should be passed in as UTC in the ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.
       * Example: "2012-10-09T23:39:01Z".
       */
      since?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Gists;
  }
  /**
   * @description List public keys for a user. Lists the verified public keys for a user. This is accessible by anyone.
   * @name KeysDetail
   * @request GET:/users/{username}/keys
   */
  export namespace KeysDetail {
    export type RequestParams = {
      /** Name of user. */
      username: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Gitignore;
  }
  /**
   * @description List all public organizations for a user.
   * @name OrgsDetail
   * @request GET:/users/{username}/orgs
   */
  export namespace OrgsDetail {
    export type RequestParams = {
      /** Name of user. */
      username: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Gitignore;
  }
  /**
   * @description These are events that you'll only see public events.
   * @name ReceivedEventsDetail
   * @request GET:/users/{username}/received_events
   */
  export namespace ReceivedEventsDetail {
    export type RequestParams = {
      /** Name of user. */
      username: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = any;
  }
  /**
   * @description List public events that a user has received
   * @name ReceivedEventsPublicDetail
   * @request GET:/users/{username}/received_events/public
   */
  export namespace ReceivedEventsPublicDetail {
    export type RequestParams = {
      /** Name of user. */
      username: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = any;
  }
  /**
   * @description List public repositories for the specified user.
   * @name ReposDetail
   * @request GET:/users/{username}/repos
   */
  export namespace ReposDetail {
    export type RequestParams = {
      /** Name of user. */
      username: string;
    };
    export type RequestQuery = {
      /** @default "all" */
      type?: "all" | "public" | "private" | "forks" | "sources" | "member";
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = Repos;
  }
  /**
   * @description List repositories being starred by a user.
   * @name StarredDetail
   * @request GET:/users/{username}/starred
   */
  export namespace StarredDetail {
    export type RequestParams = {
      /** Name of user. */
      username: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = any;
  }
  /**
   * @description List repositories being watched by a user.
   * @name SubscriptionsDetail
   * @request GET:/users/{username}/subscriptions
   */
  export namespace SubscriptionsDetail {
    export type RequestParams = {
      /** Name of user. */
      username: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** Is used to set specified media type. */
      Accept?: string;
    };
    export type ResponseBody = any;
  }
}
