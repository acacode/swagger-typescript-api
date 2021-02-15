/* eslint:disable */
/* tslint-disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export var ContentType;
(function (ContentType) {
  ContentType["Json"] = "application/json";
  ContentType["FormData"] = "multipart/form-data";
  ContentType["UrlEncoded"] = "application/x-www-form-urlencoded";
})(ContentType || (ContentType = {}));
export class HttpClient {
  constructor(apiConfig = {}) {
    this.baseUrl = "https://api.github.com";
    this.securityData = null;
    this.securityWorker = null;
    this.abortControllers = new Map();
    this.baseApiParams = {
      credentials: "same-origin",
      headers: {},
      redirect: "follow",
      referrerPolicy: "no-referrer",
    };
    this.setSecurityData = (data) => {
      this.securityData = data;
    };
    this.contentFormatters = {
      [ContentType.Json]: (input) => (input !== null && typeof input === "object" ? JSON.stringify(input) : input),
      [ContentType.FormData]: (input) =>
        Object.keys(input || {}).reduce((data, key) => {
          data.append(key, input[key]);
          return data;
        }, new FormData()),
      [ContentType.UrlEncoded]: (input) => this.toQueryString(input),
    };
    this.createAbortSignal = (cancelToken) => {
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
    this.abortRequest = (cancelToken) => {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        abortController.abort();
        this.abortControllers.delete(cancelToken);
      }
    };
    this.request = ({ body, secure, path, type, query, format = "json", baseUrl, cancelToken, ...params }) => {
      const secureParams = (secure && this.securityWorker && this.securityWorker(this.securityData)) || {};
      const requestParams = this.mergeRequestParams(params, secureParams);
      const queryString = query && this.toQueryString(query);
      const payloadFormatter = this.contentFormatters[type || ContentType.Json];
      return fetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
        headers: {
          ...(type ? { "Content-Type": type } : {}),
          ...(requestParams.headers || {}),
        },
        ...requestParams,
        signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
        body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
      }).then(async (response) => {
        const r = response;
        r.data = null;
        r.error = null;
        const data = await response[format]()
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
    Object.assign(this, apiConfig);
  }
  addQueryParam(query, key) {
    const value = query[key];
    return (
      encodeURIComponent(key) +
      "=" +
      encodeURIComponent(Array.isArray(value) ? value.join(",") : typeof value === "number" ? value : `${value}`)
    );
  }
  toQueryString(rawQuery) {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) =>
        typeof query[key] === "object" && !Array.isArray(query[key])
          ? this.toQueryString(query[key])
          : this.addQueryParam(query, key),
      )
      .join("&");
  }
  addQueryParams(rawQuery) {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }
  mergeRequestParams(params1, params2) {
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
}
/**
 * @title GitHub
 * @version v3
 * @baseUrl https://api.github.com
 * Powerful collaboration, code review, and code management for open source and private projects.
 */
export class Api extends HttpClient {
  constructor() {
    super(...arguments);
    this.emojis = {
      /**
       * @description Lists all the emojis available to use on GitHub.
       *
       * @name EmojisList
       * @request GET:/emojis
       */
      emojisList: (params = {}) =>
        this.request({
          path: `/emojis`,
          method: "GET",
          format: "json",
          ...params,
        }),
    };
    this.events = {
      /**
       * @description List public events.
       *
       * @name EventsList
       * @request GET:/events
       */
      eventsList: (params = {}) =>
        this.request({
          path: `/events`,
          method: "GET",
          format: "json",
          ...params,
        }),
    };
    this.feeds = {
      /**
       * @description List Feeds. GitHub provides several timeline resources in Atom format. The Feeds API lists all the feeds available to the authenticating user.
       *
       * @name FeedsList
       * @request GET:/feeds
       */
      feedsList: (params = {}) =>
        this.request({
          path: `/feeds`,
          method: "GET",
          format: "json",
          ...params,
        }),
    };
    this.gists = {
      /**
       * @description List the authenticated user's gists or if called anonymously, this will return all public gists.
       *
       * @name GistsList
       * @request GET:/gists
       */
      gistsList: (query, params = {}) =>
        this.request({
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
       */
      gistsCreate: (body, params = {}) =>
        this.request({
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
       */
      publicList: (query, params = {}) =>
        this.request({
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
       */
      starredList: (query, params = {}) =>
        this.request({
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
       */
      gistsDelete: (id, params = {}) =>
        this.request({
          path: `/gists/${id}`,
          method: "DELETE",
          ...params,
        }),
      /**
       * @description Get a single gist.
       *
       * @name GistsDetail
       * @request GET:/gists/{id}
       */
      gistsDetail: (id, params = {}) =>
        this.request({
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
       */
      gistsPartialUpdate: (id, body, params = {}) =>
        this.request({
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
       */
      commentsDetail: (id, params = {}) =>
        this.request({
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
       */
      commentsCreate: (id, body, params = {}) =>
        this.request({
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
       */
      commentsDelete: (id, commentId, params = {}) =>
        this.request({
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
       */
      commentsDetail2: (id, commentId, params = {}) =>
        this.request({
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
       */
      commentsPartialUpdate: (id, commentId, body, params = {}) =>
        this.request({
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
       */
      forksCreate: (id, params = {}) =>
        this.request({
          path: `/gists/${id}/forks`,
          method: "POST",
          ...params,
        }),
      /**
       * @description Unstar a gist.
       *
       * @name StarDelete
       * @request DELETE:/gists/{id}/star
       */
      starDelete: (id, params = {}) =>
        this.request({
          path: `/gists/${id}/star`,
          method: "DELETE",
          ...params,
        }),
      /**
       * @description Check if a gist is starred.
       *
       * @name StarDetail
       * @request GET:/gists/{id}/star
       */
      starDetail: (id, params = {}) =>
        this.request({
          path: `/gists/${id}/star`,
          method: "GET",
          ...params,
        }),
      /**
       * @description Star a gist.
       *
       * @name StarUpdate
       * @request PUT:/gists/{id}/star
       */
      starUpdate: (id, params = {}) =>
        this.request({
          path: `/gists/${id}/star`,
          method: "PUT",
          ...params,
        }),
    };
    this.gitignore = {
      /**
       * @description Listing available templates. List all templates available to pass as an option when creating a repository.
       *
       * @name TemplatesList
       * @request GET:/gitignore/templates
       */
      templatesList: (params = {}) =>
        this.request({
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
       */
      templatesDetail: (language, params = {}) =>
        this.request({
          path: `/gitignore/templates/${language}`,
          method: "GET",
          format: "json",
          ...params,
        }),
    };
    this.issues = {
      /**
       * @description List issues. List all issues across all the authenticated user's visible repositories.
       *
       * @name IssuesList
       * @request GET:/issues
       */
      issuesList: (query, params = {}) =>
        this.request({
          path: `/issues`,
          method: "GET",
          query: query,
          format: "json",
          ...params,
        }),
    };
    this.legacy = {
      /**
       * @description Find issues by state and keyword.
       *
       * @name IssuesSearchDetail
       * @request GET:/legacy/issues/search/{owner}/{repository}/{state}/{keyword}
       */
      issuesSearchDetail: (keyword, state, owner, repository, params = {}) =>
        this.request({
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
       */
      reposSearchDetail: (keyword, query, params = {}) =>
        this.request({
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
       */
      userEmailDetail: (email, params = {}) =>
        this.request({
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
       */
      userSearchDetail: (keyword, query, params = {}) =>
        this.request({
          path: `/legacy/user/search/${keyword}`,
          method: "GET",
          query: query,
          format: "json",
          ...params,
        }),
    };
    this.markdown = {
      /**
       * @description Render an arbitrary Markdown document
       *
       * @name MarkdownCreate
       * @request POST:/markdown
       */
      markdownCreate: (body, params = {}) =>
        this.request({
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
       */
      postMarkdown: (params = {}) =>
        this.request({
          path: `/markdown/raw`,
          method: "POST",
          ...params,
        }),
    };
    this.meta = {
      /**
       * @description This gives some information about GitHub.com, the service.
       *
       * @name MetaList
       * @request GET:/meta
       */
      metaList: (params = {}) =>
        this.request({
          path: `/meta`,
          method: "GET",
          format: "json",
          ...params,
        }),
    };
    this.networks = {
      /**
       * @description List public events for a network of repositories.
       *
       * @name EventsDetail
       * @request GET:/networks/{owner}/{repo}/events
       */
      eventsDetail: (owner, repo, params = {}) =>
        this.request({
          path: `/networks/${owner}/${repo}/events`,
          method: "GET",
          format: "json",
          ...params,
        }),
    };
    this.notifications = {
      /**
       * @description List your notifications. List all notifications for the current user, grouped by repository.
       *
       * @name NotificationsList
       * @request GET:/notifications
       */
      notificationsList: (query, params = {}) =>
        this.request({
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
       */
      notificationsUpdate: (body, params = {}) =>
        this.request({
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
       */
      threadsDetail: (id, params = {}) =>
        this.request({
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
       */
      threadsPartialUpdate: (id, params = {}) =>
        this.request({
          path: `/notifications/threads/${id}`,
          method: "PATCH",
          ...params,
        }),
      /**
       * @description Delete a Thread Subscription.
       *
       * @name ThreadsSubscriptionDelete
       * @request DELETE:/notifications/threads/{id}/subscription
       */
      threadsSubscriptionDelete: (id, params = {}) =>
        this.request({
          path: `/notifications/threads/${id}/subscription`,
          method: "DELETE",
          ...params,
        }),
      /**
       * @description Get a Thread Subscription.
       *
       * @name ThreadsSubscriptionDetail
       * @request GET:/notifications/threads/{id}/subscription
       */
      threadsSubscriptionDetail: (id, params = {}) =>
        this.request({
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
       */
      threadsSubscriptionUpdate: (id, body, params = {}) =>
        this.request({
          path: `/notifications/threads/${id}/subscription`,
          method: "PUT",
          body: body,
          type: ContentType.Json,
          format: "json",
          ...params,
        }),
    };
    this.orgs = {
      /**
       * @description Get an Organization.
       *
       * @name OrgsDetail
       * @request GET:/orgs/{org}
       */
      orgsDetail: (org, params = {}) =>
        this.request({
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
       */
      orgsPartialUpdate: (org, body, params = {}) =>
        this.request({
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
       */
      eventsDetail: (org, params = {}) =>
        this.request({
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
       */
      issuesDetail: (org, query, params = {}) =>
        this.request({
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
       */
      membersDetail: (org, params = {}) =>
        this.request({
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
       */
      membersDelete: (org, username, params = {}) =>
        this.request({
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
       */
      membersDetail2: (org, username, params = {}) =>
        this.request({
          path: `/orgs/${org}/members/${username}`,
          method: "GET",
          ...params,
        }),
      /**
       * @description Public members list. Members of an organization can choose to have their membership publicized or not.
       *
       * @name PublicMembersDetail
       * @request GET:/orgs/{org}/public_members
       */
      publicMembersDetail: (org, params = {}) =>
        this.request({
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
       */
      publicMembersDelete: (org, username, params = {}) =>
        this.request({
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
       */
      publicMembersDetail2: (org, username, params = {}) =>
        this.request({
          path: `/orgs/${org}/public_members/${username}`,
          method: "GET",
          ...params,
        }),
      /**
       * @description Publicize a user's membership.
       *
       * @name PublicMembersUpdate
       * @request PUT:/orgs/{org}/public_members/{username}
       */
      publicMembersUpdate: (org, username, params = {}) =>
        this.request({
          path: `/orgs/${org}/public_members/${username}`,
          method: "PUT",
          ...params,
        }),
      /**
       * @description List repositories for the specified org.
       *
       * @name ReposDetail
       * @request GET:/orgs/{org}/repos
       */
      reposDetail: (org, query, params = {}) =>
        this.request({
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
       */
      reposCreate: (org, body, params = {}) =>
        this.request({
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
       */
      teamsDetail: (org, params = {}) =>
        this.request({
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
       */
      teamsCreate: (org, body, params = {}) =>
        this.request({
          path: `/orgs/${org}/teams`,
          method: "POST",
          body: body,
          type: ContentType.Json,
          format: "json",
          ...params,
        }),
    };
    this.rateLimit = {
      /**
       * @description Get your current rate limit status Note: Accessing this endpoint does not count against your rate limit.
       *
       * @name RateLimitList
       * @request GET:/rate_limit
       */
      rateLimitList: (params = {}) =>
        this.request({
          path: `/rate_limit`,
          method: "GET",
          format: "json",
          ...params,
        }),
    };
    this.repos = {
      /**
       * @description Delete a Repository. Deleting a repository requires admin access. If OAuth is used, the delete_repo scope is required.
       *
       * @name ReposDelete
       * @request DELETE:/repos/{owner}/{repo}
       */
      reposDelete: (owner, repo, params = {}) =>
        this.request({
          path: `/repos/${owner}/${repo}`,
          method: "DELETE",
          ...params,
        }),
      /**
       * @description Get repository.
       *
       * @name ReposDetail
       * @request GET:/repos/{owner}/{repo}
       */
      reposDetail: (owner, repo, params = {}) =>
        this.request({
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
       */
      reposPartialUpdate: (owner, repo, body, params = {}) =>
        this.request({
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
       */
      assigneesDetail: (owner, repo, params = {}) =>
        this.request({
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
       */
      assigneesDetail2: (owner, repo, assignee, params = {}) =>
        this.request({
          path: `/repos/${owner}/${repo}/assignees/${assignee}`,
          method: "GET",
          ...params,
        }),
      /**
       * @description Get list of branches
       *
       * @name BranchesDetail
       * @request GET:/repos/{owner}/{repo}/branches
       */
      branchesDetail: (owner, repo, params = {}) =>
        this.request({
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
       */
      branchesDetail2: (owner, repo, branch, params = {}) =>
        this.request({
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
       */
      collaboratorsDetail: (owner, repo, params = {}) =>
        this.request({
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
       */
      collaboratorsDelete: (owner, repo, user, params = {}) =>
        this.request({
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
       */
      collaboratorsDetail2: (owner, repo, user, params = {}) =>
        this.request({
          path: `/repos/${owner}/${repo}/collaborators/${user}`,
          method: "GET",
          ...params,
        }),
      /**
       * @description Add collaborator.
       *
       * @name CollaboratorsUpdate
       * @request PUT:/repos/{owner}/{repo}/collaborators/{user}
       */
      collaboratorsUpdate: (owner, repo, user, params = {}) =>
        this.request({
          path: `/repos/${owner}/${repo}/collaborators/${user}`,
          method: "PUT",
          ...params,
        }),
      /**
       * @description List commit comments for a repository. Comments are ordered by ascending ID.
       *
       * @name CommentsDetail
       * @request GET:/repos/{owner}/{repo}/comments
       */
      commentsDetail: (owner, repo, params = {}) =>
        this.request({
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
       */
      commentsDelete: (owner, repo, commentId, params = {}) =>
        this.request({
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
       */
      commentsDetail2: (owner, repo, commentId, params = {}) =>
        this.request({
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
       */
      commentsPartialUpdate: (owner, repo, commentId, body, params = {}) =>
        this.request({
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
       */
      commitsDetail: (owner, repo, query, params = {}) =>
        this.request({
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
       */
      commitsStatusDetail: (owner, repo, ref, params = {}) =>
        this.request({
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
       */
      commitsDetail2: (owner, repo, shaCode, params = {}) =>
        this.request({
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
       */
      commitsCommentsDetail: (owner, repo, shaCode, params = {}) =>
        this.request({
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
       */
      commitsCommentsCreate: (owner, repo, shaCode, body, params = {}) =>
        this.request({
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
       */
      compareDetail: (owner, repo, baseId, headId, params = {}) =>
        this.request({
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
       */
      contentsDelete: (owner, repo, path, body, params = {}) =>
        this.request({
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
       */
      contentsDetail: (owner, repo, path, query, params = {}) =>
        this.request({
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
       */
      contentsUpdate: (owner, repo, path, body, params = {}) =>
        this.request({
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
       */
      contributorsDetail: (owner, repo, query, params = {}) =>
        this.request({
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
       */
      deploymentsDetail: (owner, repo, params = {}) =>
        this.request({
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
       */
      deploymentsCreate: (owner, repo, body, params = {}) =>
        this.request({
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
       */
      deploymentsStatusesDetail: (owner, repo, id, params = {}) =>
        this.request({
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
       */
      deploymentsStatusesCreate: (owner, repo, id, body, params = {}) =>
        this.request({
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
       */
      downloadsDetail: (owner, repo, params = {}) =>
        this.request({
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
       */
      downloadsDelete: (owner, repo, downloadId, params = {}) =>
        this.request({
          path: `/repos/${owner}/${repo}/downloads/${downloadId}`,
          method: "DELETE",
          ...params,
        }),
      /**
       * @description Deprecated. Get a single download.
       *
       * @name DownloadsDetail2
       * @request GET:/repos/{owner}/{repo}/downloads/{downloadId}
       * @originalName downloadsDetail
       * @duplicate
       */
      downloadsDetail2: (owner, repo, downloadId, params = {}) =>
        this.request({
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
       */
      eventsDetail: (owner, repo, params = {}) =>
        this.request({
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
       */
      forksDetail: (owner, repo, query, params = {}) =>
        this.request({
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
       */
      forksCreate: (owner, repo, body, params = {}) =>
        this.request({
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
       */
      gitBlobsCreate: (owner, repo, body, params = {}) =>
        this.request({
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
       */
      gitBlobsDetail: (owner, repo, shaCode, params = {}) =>
        this.request({
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
       */
      gitCommitsCreate: (owner, repo, body, params = {}) =>
        this.request({
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
       */
      gitCommitsDetail: (owner, repo, shaCode, params = {}) =>
        this.request({
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
       */
      gitRefsDetail: (owner, repo, params = {}) =>
        this.request({
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
       */
      gitRefsCreate: (owner, repo, body, params = {}) =>
        this.request({
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
       */
      gitRefsDelete: (owner, repo, ref, params = {}) =>
        this.request({
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
       */
      gitRefsDetail2: (owner, repo, ref, params = {}) =>
        this.request({
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
       */
      gitRefsPartialUpdate: (owner, repo, ref, body, params = {}) =>
        this.request({
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
       */
      gitTagsCreate: (owner, repo, body, params = {}) =>
        this.request({
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
       */
      gitTagsDetail: (owner, repo, shaCode, params = {}) =>
        this.request({
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
       */
      gitTreesCreate: (owner, repo, body, params = {}) =>
        this.request({
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
       */
      gitTreesDetail: (owner, repo, shaCode, query, params = {}) =>
        this.request({
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
       */
      hooksDetail: (owner, repo, params = {}) =>
        this.request({
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
       */
      hooksCreate: (owner, repo, body, params = {}) =>
        this.request({
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
       */
      hooksDelete: (owner, repo, hookId, params = {}) =>
        this.request({
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
       */
      hooksDetail2: (owner, repo, hookId, params = {}) =>
        this.request({
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
       */
      hooksPartialUpdate: (owner, repo, hookId, body, params = {}) =>
        this.request({
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
       */
      hooksTestsCreate: (owner, repo, hookId, params = {}) =>
        this.request({
          path: `/repos/${owner}/${repo}/hooks/${hookId}/tests`,
          method: "POST",
          ...params,
        }),
      /**
       * @description List issues for a repository.
       *
       * @name IssuesDetail
       * @request GET:/repos/{owner}/{repo}/issues
       */
      issuesDetail: (owner, repo, query, params = {}) =>
        this.request({
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
       */
      issuesCreate: (owner, repo, body, params = {}) =>
        this.request({
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
       */
      issuesCommentsDetail: (owner, repo, query, params = {}) =>
        this.request({
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
       */
      issuesCommentsDelete: (owner, repo, commentId, params = {}) =>
        this.request({
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
       */
      issuesCommentsDetail2: (owner, repo, commentId, params = {}) =>
        this.request({
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
       */
      issuesCommentsPartialUpdate: (owner, repo, commentId, body, params = {}) =>
        this.request({
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
       */
      issuesEventsDetail: (owner, repo, params = {}) =>
        this.request({
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
       */
      issuesEventsDetail2: (owner, repo, eventId, params = {}) =>
        this.request({
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
       */
      issuesDetail2: (owner, repo, number, params = {}) =>
        this.request({
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
       */
      issuesPartialUpdate: (owner, repo, number, body, params = {}) =>
        this.request({
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
       */
      issuesCommentsDetail3: (owner, repo, number, params = {}) =>
        this.request({
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
       */
      issuesCommentsCreate: (owner, repo, number, body, params = {}) =>
        this.request({
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
       */
      issuesEventsDetail3: (owner, repo, number, params = {}) =>
        this.request({
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
       */
      issuesLabelsDelete: (owner, repo, number, params = {}) =>
        this.request({
          path: `/repos/${owner}/${repo}/issues/${number}/labels`,
          method: "DELETE",
          ...params,
        }),
      /**
       * @description List labels on an issue.
       *
       * @name IssuesLabelsDetail
       * @request GET:/repos/{owner}/{repo}/issues/{number}/labels
       */
      issuesLabelsDetail: (owner, repo, number, params = {}) =>
        this.request({
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
       */
      issuesLabelsCreate: (owner, repo, number, body, params = {}) =>
        this.request({
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
       */
      issuesLabelsUpdate: (owner, repo, number, body, params = {}) =>
        this.request({
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
       */
      issuesLabelsDelete2: (owner, repo, number, name, params = {}) =>
        this.request({
          path: `/repos/${owner}/${repo}/issues/${number}/labels/${name}`,
          method: "DELETE",
          ...params,
        }),
      /**
       * @description Get list of keys.
       *
       * @name KeysDetail
       * @request GET:/repos/{owner}/{repo}/keys
       */
      keysDetail: (owner, repo, params = {}) =>
        this.request({
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
       */
      keysCreate: (owner, repo, body, params = {}) =>
        this.request({
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
       */
      keysDelete: (owner, repo, keyId, params = {}) =>
        this.request({
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
       */
      keysDetail2: (owner, repo, keyId, params = {}) =>
        this.request({
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
       */
      labelsDetail: (owner, repo, params = {}) =>
        this.request({
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
       */
      labelsCreate: (owner, repo, body, params = {}) =>
        this.request({
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
       */
      labelsDelete: (owner, repo, name, params = {}) =>
        this.request({
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
       */
      labelsDetail2: (owner, repo, name, params = {}) =>
        this.request({
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
       */
      labelsPartialUpdate: (owner, repo, name, body, params = {}) =>
        this.request({
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
       */
      languagesDetail: (owner, repo, params = {}) =>
        this.request({
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
       */
      mergesCreate: (owner, repo, body, params = {}) =>
        this.request({
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
       */
      milestonesDetail: (owner, repo, query, params = {}) =>
        this.request({
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
       */
      milestonesCreate: (owner, repo, body, params = {}) =>
        this.request({
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
       */
      milestonesDelete: (owner, repo, number, params = {}) =>
        this.request({
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
       */
      milestonesDetail2: (owner, repo, number, params = {}) =>
        this.request({
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
       */
      milestonesPartialUpdate: (owner, repo, number, body, params = {}) =>
        this.request({
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
       */
      milestonesLabelsDetail: (owner, repo, number, params = {}) =>
        this.request({
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
       */
      notificationsDetail: (owner, repo, query, params = {}) =>
        this.request({
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
       */
      notificationsUpdate: (owner, repo, body, params = {}) =>
        this.request({
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
       */
      pullsDetail: (owner, repo, query, params = {}) =>
        this.request({
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
       */
      pullsCreate: (owner, repo, body, params = {}) =>
        this.request({
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
       */
      pullsCommentsDetail: (owner, repo, query, params = {}) =>
        this.request({
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
       */
      pullsCommentsDelete: (owner, repo, commentId, params = {}) =>
        this.request({
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
       */
      pullsCommentsDetail2: (owner, repo, commentId, params = {}) =>
        this.request({
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
       */
      pullsCommentsPartialUpdate: (owner, repo, commentId, body, params = {}) =>
        this.request({
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
       */
      pullsDetail2: (owner, repo, number, params = {}) =>
        this.request({
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
       */
      pullsPartialUpdate: (owner, repo, number, body, params = {}) =>
        this.request({
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
       */
      pullsCommentsDetail3: (owner, repo, number, params = {}) =>
        this.request({
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
       */
      pullsCommentsCreate: (owner, repo, number, body, params = {}) =>
        this.request({
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
       */
      pullsCommitsDetail: (owner, repo, number, params = {}) =>
        this.request({
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
       */
      pullsFilesDetail: (owner, repo, number, params = {}) =>
        this.request({
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
       */
      pullsMergeDetail: (owner, repo, number, params = {}) =>
        this.request({
          path: `/repos/${owner}/${repo}/pulls/${number}/merge`,
          method: "GET",
          ...params,
        }),
      /**
       * @description Merge a pull request (Merge Button's)
       *
       * @name PullsMergeUpdate
       * @request PUT:/repos/{owner}/{repo}/pulls/{number}/merge
       */
      pullsMergeUpdate: (owner, repo, number, body, params = {}) =>
        this.request({
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
       */
      readmeDetail: (owner, repo, query, params = {}) =>
        this.request({
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
       */
      releasesDetail: (owner, repo, params = {}) =>
        this.request({
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
       */
      releasesCreate: (owner, repo, body, params = {}) =>
        this.request({
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
       */
      releasesAssetsDelete: (owner, repo, id, params = {}) =>
        this.request({
          path: `/repos/${owner}/${repo}/releases/assets/${id}`,
          method: "DELETE",
          ...params,
        }),
      /**
       * @description Get a single release asset
       *
       * @name ReleasesAssetsDetail
       * @request GET:/repos/{owner}/{repo}/releases/assets/{id}
       */
      releasesAssetsDetail: (owner, repo, id, params = {}) =>
        this.request({
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
       */
      releasesAssetsPartialUpdate: (owner, repo, id, body, params = {}) =>
        this.request({
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
       */
      releasesDelete: (owner, repo, id, params = {}) =>
        this.request({
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
       */
      releasesDetail2: (owner, repo, id, params = {}) =>
        this.request({
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
       */
      releasesPartialUpdate: (owner, repo, id, body, params = {}) =>
        this.request({
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
       */
      releasesAssetsDetail2: (owner, repo, id, params = {}) =>
        this.request({
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
       */
      stargazersDetail: (owner, repo, params = {}) =>
        this.request({
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
       */
      statsCodeFrequencyDetail: (owner, repo, params = {}) =>
        this.request({
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
       */
      statsCommitActivityDetail: (owner, repo, params = {}) =>
        this.request({
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
       */
      statsContributorsDetail: (owner, repo, params = {}) =>
        this.request({
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
       */
      statsParticipationDetail: (owner, repo, params = {}) =>
        this.request({
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
       */
      statsPunchCardDetail: (owner, repo, params = {}) =>
        this.request({
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
       */
      statusesDetail: (owner, repo, ref, params = {}) =>
        this.request({
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
       */
      statusesCreate: (owner, repo, ref, body, params = {}) =>
        this.request({
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
       */
      subscribersDetail: (owner, repo, params = {}) =>
        this.request({
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
       */
      subscriptionDelete: (owner, repo, params = {}) =>
        this.request({
          path: `/repos/${owner}/${repo}/subscription`,
          method: "DELETE",
          ...params,
        }),
      /**
       * @description Get a Repository Subscription.
       *
       * @name SubscriptionDetail
       * @request GET:/repos/{owner}/{repo}/subscription
       */
      subscriptionDetail: (owner, repo, params = {}) =>
        this.request({
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
       */
      subscriptionUpdate: (owner, repo, body, params = {}) =>
        this.request({
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
       */
      tagsDetail: (owner, repo, params = {}) =>
        this.request({
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
       */
      teamsDetail: (owner, repo, params = {}) =>
        this.request({
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
       */
      watchersDetail: (owner, repo, params = {}) =>
        this.request({
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
       */
      reposDetail2: (owner, repo, archive_format, path, params = {}) =>
        this.request({
          path: `/repos/${owner}/${repo}/${archive_format}/${path}`,
          method: "GET",
          ...params,
        }),
    };
    this.repositories = {
      /**
       * @description List all public repositories. This provides a dump of every public repository, in the order that they were created. Note: Pagination is powered exclusively by the since parameter. is the Link header to get the URL for the next page of repositories.
       *
       * @name RepositoriesList
       * @request GET:/repositories
       */
      repositoriesList: (query, params = {}) =>
        this.request({
          path: `/repositories`,
          method: "GET",
          query: query,
          format: "json",
          ...params,
        }),
    };
    this.search = {
      /**
       * @description Search code.
       *
       * @name CodeList
       * @request GET:/search/code
       */
      codeList: (query, params = {}) =>
        this.request({
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
       */
      issuesList: (query, params = {}) =>
        this.request({
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
       */
      repositoriesList: (query, params = {}) =>
        this.request({
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
       */
      usersList: (query, params = {}) =>
        this.request({
          path: `/search/users`,
          method: "GET",
          query: query,
          format: "json",
          ...params,
        }),
    };
    this.teams = {
      /**
       * @description Delete team. In order to delete a team, the authenticated user must be an owner of the org that the team is associated with.
       *
       * @name TeamsDelete
       * @request DELETE:/teams/{teamId}
       */
      teamsDelete: (teamId, params = {}) =>
        this.request({
          path: `/teams/${teamId}`,
          method: "DELETE",
          ...params,
        }),
      /**
       * @description Get team.
       *
       * @name TeamsDetail
       * @request GET:/teams/{teamId}
       */
      teamsDetail: (teamId, params = {}) =>
        this.request({
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
       */
      teamsPartialUpdate: (teamId, body, params = {}) =>
        this.request({
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
       */
      membersDetail: (teamId, params = {}) =>
        this.request({
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
       */
      membersDelete: (teamId, username, params = {}) =>
        this.request({
          path: `/teams/${teamId}/members/${username}`,
          method: "DELETE",
          ...params,
        }),
      /**
       * @description The "Get team member" API is deprecated and is scheduled for removal in the next major version of the API. We recommend using the Get team membership API instead. It allows you to get both active and pending memberships. Get team member. In order to get if a user is a member of a team, the authenticated user mus be a member of the team.
       *
       * @name MembersDetail2
       * @request GET:/teams/{teamId}/members/{username}
       * @originalName membersDetail
       * @duplicate
       */
      membersDetail2: (teamId, username, params = {}) =>
        this.request({
          path: `/teams/${teamId}/members/${username}`,
          method: "GET",
          ...params,
        }),
      /**
       * @description The API (described below) is deprecated and is scheduled for removal in the next major version of the API. We recommend using the Add team membership API instead. It allows you to invite new organization members to your teams. Add team member. In order to add a user to a team, the authenticated user must have 'admin' permissions to the team or be an owner of the org that the team is associated with.
       *
       * @name MembersUpdate
       * @request PUT:/teams/{teamId}/members/{username}
       */
      membersUpdate: (teamId, username, params = {}) =>
        this.request({
          path: `/teams/${teamId}/members/${username}`,
          method: "PUT",
          ...params,
        }),
      /**
       * @description Remove team membership. In order to remove a membership between a user and a team, the authenticated user must have 'admin' permissions to the team or be an owner of the organization that the team is associated with. NOTE: This does not delete the user, it just removes their membership from the team.
       *
       * @name MembershipsDelete
       * @request DELETE:/teams/{teamId}/memberships/{username}
       */
      membershipsDelete: (teamId, username, params = {}) =>
        this.request({
          path: `/teams/${teamId}/memberships/${username}`,
          method: "DELETE",
          ...params,
        }),
      /**
       * @description Get team membership. In order to get a user's membership with a team, the authenticated user must be a member of the team or an owner of the team's organization.
       *
       * @name MembershipsDetail
       * @request GET:/teams/{teamId}/memberships/{username}
       */
      membershipsDetail: (teamId, username, params = {}) =>
        this.request({
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
       */
      membershipsUpdate: (teamId, username, params = {}) =>
        this.request({
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
       */
      reposDetail: (teamId, params = {}) =>
        this.request({
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
       */
      reposDelete: (teamId, owner, repo, params = {}) =>
        this.request({
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
       */
      reposDetail2: (teamId, owner, repo, params = {}) =>
        this.request({
          path: `/teams/${teamId}/repos/${owner}/${repo}`,
          method: "GET",
          ...params,
        }),
      /**
       * @description In order to add a repository to a team, the authenticated user must be an owner of the org that the team is associated with. Also, the repository must be owned by the organization, or a direct fork of a repository owned by the organization.
       *
       * @name ReposUpdate
       * @request PUT:/teams/{teamId}/repos/{owner}/{repo}
       */
      reposUpdate: (teamId, owner, repo, params = {}) =>
        this.request({
          path: `/teams/${teamId}/repos/${owner}/${repo}`,
          method: "PUT",
          ...params,
        }),
    };
    this.user = {
      /**
       * @description Get the authenticated user.
       *
       * @name UserList
       * @request GET:/user
       */
      userList: (params = {}) =>
        this.request({
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
       */
      userPartialUpdate: (body, params = {}) =>
        this.request({
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
       */
      emailsDelete: (body, params = {}) =>
        this.request({
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
       */
      emailsList: (params = {}) =>
        this.request({
          path: `/user/emails`,
          method: "GET",
          ...params,
        }),
      /**
       * @description Add email address(es). You can post a single email address or an array of addresses.
       *
       * @name EmailsCreate
       * @request POST:/user/emails
       */
      emailsCreate: (body, params = {}) =>
        this.request({
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
       */
      followersList: (params = {}) =>
        this.request({
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
       */
      followingList: (params = {}) =>
        this.request({
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
       */
      followingDelete: (username, params = {}) =>
        this.request({
          path: `/user/following/${username}`,
          method: "DELETE",
          ...params,
        }),
      /**
       * @description Check if you are following a user.
       *
       * @name FollowingDetail
       * @request GET:/user/following/{username}
       */
      followingDetail: (username, params = {}) =>
        this.request({
          path: `/user/following/${username}`,
          method: "GET",
          ...params,
        }),
      /**
       * @description Follow a user. Following a user requires the user to be logged in and authenticated with basic auth or OAuth with the user:follow scope.
       *
       * @name FollowingUpdate
       * @request PUT:/user/following/{username}
       */
      followingUpdate: (username, params = {}) =>
        this.request({
          path: `/user/following/${username}`,
          method: "PUT",
          ...params,
        }),
      /**
       * @description List issues. List all issues across owned and member repositories for the authenticated user.
       *
       * @name IssuesList
       * @request GET:/user/issues
       */
      issuesList: (query, params = {}) =>
        this.request({
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
       */
      keysList: (params = {}) =>
        this.request({
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
       */
      keysCreate: (body, params = {}) =>
        this.request({
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
       */
      keysDelete: (keyId, params = {}) =>
        this.request({
          path: `/user/keys/${keyId}`,
          method: "DELETE",
          ...params,
        }),
      /**
       * @description Get a single public key.
       *
       * @name KeysDetail
       * @request GET:/user/keys/{keyId}
       */
      keysDetail: (keyId, params = {}) =>
        this.request({
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
       */
      orgsList: (params = {}) =>
        this.request({
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
       */
      reposList: (query, params = {}) =>
        this.request({
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
       */
      reposCreate: (body, params = {}) =>
        this.request({
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
       */
      starredList: (query, params = {}) =>
        this.request({
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
       */
      starredDelete: (owner, repo, params = {}) =>
        this.request({
          path: `/user/starred/${owner}/${repo}`,
          method: "DELETE",
          ...params,
        }),
      /**
       * @description Check if you are starring a repository.
       *
       * @name StarredDetail
       * @request GET:/user/starred/{owner}/{repo}
       */
      starredDetail: (owner, repo, params = {}) =>
        this.request({
          path: `/user/starred/${owner}/${repo}`,
          method: "GET",
          ...params,
        }),
      /**
       * @description Star a repository.
       *
       * @name StarredUpdate
       * @request PUT:/user/starred/{owner}/{repo}
       */
      starredUpdate: (owner, repo, params = {}) =>
        this.request({
          path: `/user/starred/${owner}/${repo}`,
          method: "PUT",
          ...params,
        }),
      /**
       * @description List repositories being watched by the authenticated user.
       *
       * @name SubscriptionsList
       * @request GET:/user/subscriptions
       */
      subscriptionsList: (params = {}) =>
        this.request({
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
       */
      subscriptionsDelete: (owner, repo, params = {}) =>
        this.request({
          path: `/user/subscriptions/${owner}/${repo}`,
          method: "DELETE",
          ...params,
        }),
      /**
       * @description Check if you are watching a repository.
       *
       * @name SubscriptionsDetail
       * @request GET:/user/subscriptions/{owner}/{repo}
       */
      subscriptionsDetail: (owner, repo, params = {}) =>
        this.request({
          path: `/user/subscriptions/${owner}/${repo}`,
          method: "GET",
          ...params,
        }),
      /**
       * @description Watch a repository.
       *
       * @name SubscriptionsUpdate
       * @request PUT:/user/subscriptions/{owner}/{repo}
       */
      subscriptionsUpdate: (owner, repo, params = {}) =>
        this.request({
          path: `/user/subscriptions/${owner}/${repo}`,
          method: "PUT",
          ...params,
        }),
      /**
       * @description List all of the teams across all of the organizations to which the authenticated user belongs. This method requires user or repo scope when authenticating via OAuth.
       *
       * @name TeamsList
       * @request GET:/user/teams
       */
      teamsList: (params = {}) =>
        this.request({
          path: `/user/teams`,
          method: "GET",
          format: "json",
          ...params,
        }),
    };
    this.users = {
      /**
       * @description Get all users. This provides a dump of every user, in the order that they signed up for GitHub. Note: Pagination is powered exclusively by the since parameter. Use the Link header to get the URL for the next page of users.
       *
       * @name UsersList
       * @request GET:/users
       */
      usersList: (query, params = {}) =>
        this.request({
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
       */
      usersDetail: (username, params = {}) =>
        this.request({
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
       */
      eventsDetail: (username, params = {}) =>
        this.request({
          path: `/users/${username}/events`,
          method: "GET",
          ...params,
        }),
      /**
       * @description This is the user's organization dashboard. You must be authenticated as the user to view this.
       *
       * @name EventsOrgsDetail
       * @request GET:/users/{username}/events/orgs/{org}
       */
      eventsOrgsDetail: (username, org, params = {}) =>
        this.request({
          path: `/users/${username}/events/orgs/${org}`,
          method: "GET",
          ...params,
        }),
      /**
       * @description List a user's followers
       *
       * @name FollowersDetail
       * @request GET:/users/{username}/followers
       */
      followersDetail: (username, params = {}) =>
        this.request({
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
       */
      followingDetail: (username, targetUser, params = {}) =>
        this.request({
          path: `/users/${username}/following/${targetUser}`,
          method: "GET",
          ...params,
        }),
      /**
       * @description List a users gists.
       *
       * @name GistsDetail
       * @request GET:/users/{username}/gists
       */
      gistsDetail: (username, query, params = {}) =>
        this.request({
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
       */
      keysDetail: (username, params = {}) =>
        this.request({
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
       */
      orgsDetail: (username, params = {}) =>
        this.request({
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
       */
      receivedEventsDetail: (username, params = {}) =>
        this.request({
          path: `/users/${username}/received_events`,
          method: "GET",
          ...params,
        }),
      /**
       * @description List public events that a user has received
       *
       * @name ReceivedEventsPublicDetail
       * @request GET:/users/{username}/received_events/public
       */
      receivedEventsPublicDetail: (username, params = {}) =>
        this.request({
          path: `/users/${username}/received_events/public`,
          method: "GET",
          ...params,
        }),
      /**
       * @description List public repositories for the specified user.
       *
       * @name ReposDetail
       * @request GET:/users/{username}/repos
       */
      reposDetail: (username, query, params = {}) =>
        this.request({
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
       */
      starredDetail: (username, params = {}) =>
        this.request({
          path: `/users/${username}/starred`,
          method: "GET",
          ...params,
        }),
      /**
       * @description List repositories being watched by a user.
       *
       * @name SubscriptionsDetail
       * @request GET:/users/{username}/subscriptions
       */
      subscriptionsDetail: (username, params = {}) =>
        this.request({
          path: `/users/${username}/subscriptions`,
          method: "GET",
          ...params,
        }),
    };
  }
}
