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
var BodyType;
(function (BodyType) {
  BodyType[(BodyType["Json"] = 0)] = "Json";
})(BodyType || (BodyType = {}));
class HttpClient {
  constructor(apiConfig = {}) {
    this.baseUrl = "https://api.github.com/";
    this.securityData = null;
    this.securityWorker = null;
    this.baseApiParams = {
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    };
    this.setSecurityData = (data) => {
      this.securityData = data;
    };
    this.bodyFormatters = {
      [BodyType.Json]: JSON.stringify,
    };
    this.safeParseResponse = (response) => {
      const r = response.clone();
      r.data = null;
      r.error = null;
      return response
        .json()
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
    };
    this.request = (path, method, { secure, ...params } = {}, body, bodyType, secureByDefault) => {
      const requestUrl = `${this.baseUrl}${path}`;
      const secureOptions =
        (secureByDefault || secure) && this.securityWorker ? this.securityWorker(this.securityData) : {};
      const requestOptions = {
        ...this.mergeRequestOptions(params, secureOptions),
        method,
        body: body ? this.bodyFormatters[bodyType || BodyType.Json](body) : null,
      };
      return fetch(requestUrl, requestOptions).then(async (response) => {
        const data = await this.safeParseResponse(response);
        if (!response.ok) throw data;
        return data;
      });
    };
    Object.assign(this, apiConfig);
  }
  addQueryParam(query, key) {
    return (
      encodeURIComponent(key) + "=" + encodeURIComponent(Array.isArray(query[key]) ? query[key].join(",") : query[key])
    );
  }
  addQueryParams(rawQuery) {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys.length
      ? `?${keys
          .map((key) =>
            typeof query[key] === "object" && !Array.isArray(query[key])
              ? this.addQueryParams(query[key]).substring(1)
              : this.addQueryParam(query, key),
          )
          .join("&")}`
      : "";
  }
  mergeRequestOptions(params, securityParams) {
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
}
/**
 * @title GitHub
 * @version v3
 * @baseUrl https://api.github.com/
 * Powerful collaboration, code review, and code management for open source and private projects.
 */
export class Api extends HttpClient {
  constructor() {
    super(...arguments);
    this.emojis = {
      /**
       * @name emojisList
       * @request GET:/emojis
       * @description Lists all the emojis available to use on GitHub.
       */
      emojisList: (params) => this.request(`/emojis`, "GET", params),
    };
    this.events = {
      /**
       * @name eventsList
       * @request GET:/events
       * @description List public events.
       */
      eventsList: (params) => this.request(`/events`, "GET", params),
    };
    this.feeds = {
      /**
       * @name feedsList
       * @request GET:/feeds
       * @description List Feeds. GitHub provides several timeline resources in Atom format. The Feeds API lists all the feeds available to the authenticating user.
       */
      feedsList: (params) => this.request(`/feeds`, "GET", params),
    };
    this.gists = {
      /**
       * @name gistsList
       * @request GET:/gists
       * @description List the authenticated user's gists or if called anonymously, this will return all public gists.
       */
      gistsList: (query, params) => this.request(`/gists${this.addQueryParams(query)}`, "GET", params),
      /**
       * @name gistsCreate
       * @request POST:/gists
       * @description Create a gist.
       */
      gistsCreate: (body, params) => this.request(`/gists`, "POST", params, body),
      /**
       * @name publicList
       * @request GET:/gists/public
       * @description List all public gists.
       */
      publicList: (query, params) => this.request(`/gists/public${this.addQueryParams(query)}`, "GET", params),
      /**
       * @name starredList
       * @request GET:/gists/starred
       * @description List the authenticated user's starred gists.
       */
      starredList: (query, params) => this.request(`/gists/starred${this.addQueryParams(query)}`, "GET", params),
      /**
       * @name gistsDelete
       * @request DELETE:/gists/{id}
       * @description Delete a gist.
       */
      gistsDelete: (id, params) => this.request(`/gists/${id}`, "DELETE", params),
      /**
       * @name gistsDetail
       * @request GET:/gists/{id}
       * @description Get a single gist.
       */
      gistsDetail: (id, params) => this.request(`/gists/${id}`, "GET", params),
      /**
       * @name gistsPartialUpdate
       * @request PATCH:/gists/{id}
       * @description Edit a gist.
       */
      gistsPartialUpdate: (id, body, params) => this.request(`/gists/${id}`, "PATCH", params, body),
      /**
       * @name commentsDetail
       * @request GET:/gists/{id}/comments
       * @description List comments on a gist.
       */
      commentsDetail: (id, params) => this.request(`/gists/${id}/comments`, "GET", params),
      /**
       * @name commentsCreate
       * @request POST:/gists/{id}/comments
       * @description Create a commen
       */
      commentsCreate: (id, body, params) => this.request(`/gists/${id}/comments`, "POST", params, body),
      /**
       * @name commentsDelete
       * @request DELETE:/gists/{id}/comments/{commentId}
       * @description Delete a comment.
       */
      commentsDelete: (id, commentId, params) => this.request(`/gists/${id}/comments/${commentId}`, "DELETE", params),
      /**
       * @name commentsDetail
       * @request GET:/gists/{id}/comments/{commentId}
       * @description Get a single comment.
       * @originalName commentsDetail
       * @duplicate
       */
      commentsDetail2: (id, commentId, params) => this.request(`/gists/${id}/comments/${commentId}`, "GET", params),
      /**
       * @name commentsPartialUpdate
       * @request PATCH:/gists/{id}/comments/{commentId}
       * @description Edit a comment.
       */
      commentsPartialUpdate: (id, commentId, body, params) =>
        this.request(`/gists/${id}/comments/${commentId}`, "PATCH", params, body),
      /**
       * @name forksCreate
       * @request POST:/gists/{id}/forks
       * @description Fork a gist.
       */
      forksCreate: (id, params) => this.request(`/gists/${id}/forks`, "POST", params),
      /**
       * @name starDelete
       * @request DELETE:/gists/{id}/star
       * @description Unstar a gist.
       */
      starDelete: (id, params) => this.request(`/gists/${id}/star`, "DELETE", params),
      /**
       * @name starDetail
       * @request GET:/gists/{id}/star
       * @description Check if a gist is starred.
       */
      starDetail: (id, params) => this.request(`/gists/${id}/star`, "GET", params),
      /**
       * @name starUpdate
       * @request PUT:/gists/{id}/star
       * @description Star a gist.
       */
      starUpdate: (id, params) => this.request(`/gists/${id}/star`, "PUT", params),
    };
    this.gitignore = {
      /**
       * @name templatesList
       * @request GET:/gitignore/templates
       * @description Listing available templates. List all templates available to pass as an option when creating a repository.
       */
      templatesList: (params) => this.request(`/gitignore/templates`, "GET", params),
      /**
       * @name templatesDetail
       * @request GET:/gitignore/templates/{language}
       * @description Get a single template.
       */
      templatesDetail: (language, params) => this.request(`/gitignore/templates/${language}`, "GET", params),
    };
    this.issues = {
      /**
       * @name issuesList
       * @request GET:/issues
       * @description List issues. List all issues across all the authenticated user's visible repositories.
       */
      issuesList: (query, params) => this.request(`/issues${this.addQueryParams(query)}`, "GET", params),
    };
    this.legacy = {
      /**
       * @name issuesSearchDetail
       * @request GET:/legacy/issues/search/{owner}/{repository}/{state}/{keyword}
       * @description Find issues by state and keyword.
       */
      issuesSearchDetail: (keyword, state, owner, repository, params) =>
        this.request(`/legacy/issues/search/${owner}/${repository}/${state}/${keyword}`, "GET", params),
      /**
       * @name reposSearchDetail
       * @request GET:/legacy/repos/search/{keyword}
       * @description Find repositories by keyword. Note, this legacy method does not follow the v3 pagination pattern. This method returns up to 100 results per page and pages can be fetched using the start_page parameter.
       */
      reposSearchDetail: (keyword, query, params) =>
        this.request(`/legacy/repos/search/${keyword}${this.addQueryParams(query)}`, "GET", params),
      /**
       * @name userEmailDetail
       * @request GET:/legacy/user/email/{email}
       * @description This API call is added for compatibility reasons only.
       */
      userEmailDetail: (email, params) => this.request(`/legacy/user/email/${email}`, "GET", params),
      /**
       * @name userSearchDetail
       * @request GET:/legacy/user/search/{keyword}
       * @description Find users by keyword.
       */
      userSearchDetail: (keyword, query, params) =>
        this.request(`/legacy/user/search/${keyword}${this.addQueryParams(query)}`, "GET", params),
    };
    this.markdown = {
      /**
       * @name markdownCreate
       * @request POST:/markdown
       * @description Render an arbitrary Markdown document
       */
      markdownCreate: (body, params) => this.request(`/markdown`, "POST", params, body),
      /**
       * @name postMarkdown
       * @request POST:/markdown/raw
       * @description Render a Markdown document in raw mode
       */
      postMarkdown: (params) => this.request(`/markdown/raw`, "POST", params),
    };
    this.meta = {
      /**
       * @name metaList
       * @request GET:/meta
       * @description This gives some information about GitHub.com, the service.
       */
      metaList: (params) => this.request(`/meta`, "GET", params),
    };
    this.networks = {
      /**
       * @name eventsDetail
       * @request GET:/networks/{owner}/{repo}/events
       * @description List public events for a network of repositories.
       */
      eventsDetail: (owner, repo, params) => this.request(`/networks/${owner}/${repo}/events`, "GET", params),
    };
    this.notifications = {
      /**
       * @name notificationsList
       * @request GET:/notifications
       * @description List your notifications. List all notifications for the current user, grouped by repository.
       */
      notificationsList: (query, params) => this.request(`/notifications${this.addQueryParams(query)}`, "GET", params),
      /**
       * @name notificationsUpdate
       * @request PUT:/notifications
       * @description Mark as read. Marking a notification as "read" removes it from the default view on GitHub.com.
       */
      notificationsUpdate: (body, params) => this.request(`/notifications`, "PUT", params, body),
      /**
       * @name threadsDetail
       * @request GET:/notifications/threads/{id}
       * @description View a single thread.
       */
      threadsDetail: (id, params) => this.request(`/notifications/threads/${id}`, "GET", params),
      /**
       * @name threadsPartialUpdate
       * @request PATCH:/notifications/threads/{id}
       * @description Mark a thread as read
       */
      threadsPartialUpdate: (id, params) => this.request(`/notifications/threads/${id}`, "PATCH", params),
      /**
       * @name threadsSubscriptionDelete
       * @request DELETE:/notifications/threads/{id}/subscription
       * @description Delete a Thread Subscription.
       */
      threadsSubscriptionDelete: (id, params) =>
        this.request(`/notifications/threads/${id}/subscription`, "DELETE", params),
      /**
       * @name threadsSubscriptionDetail
       * @request GET:/notifications/threads/{id}/subscription
       * @description Get a Thread Subscription.
       */
      threadsSubscriptionDetail: (id, params) =>
        this.request(`/notifications/threads/${id}/subscription`, "GET", params),
      /**
       * @name threadsSubscriptionUpdate
       * @request PUT:/notifications/threads/{id}/subscription
       * @description Set a Thread Subscription. This lets you subscribe to a thread, or ignore it. Subscribing to a thread is unnecessary if the user is already subscribed to the repository. Ignoring a thread will mute all future notifications (until you comment or get @mentioned).
       */
      threadsSubscriptionUpdate: (id, body, params) =>
        this.request(`/notifications/threads/${id}/subscription`, "PUT", params, body),
    };
    this.orgs = {
      /**
       * @name orgsDetail
       * @request GET:/orgs/{org}
       * @description Get an Organization.
       */
      orgsDetail: (org, params) => this.request(`/orgs/${org}`, "GET", params),
      /**
       * @name orgsPartialUpdate
       * @request PATCH:/orgs/{org}
       * @description Edit an Organization.
       */
      orgsPartialUpdate: (org, body, params) => this.request(`/orgs/${org}`, "PATCH", params, body),
      /**
       * @name eventsDetail
       * @request GET:/orgs/{org}/events
       * @description List public events for an organization.
       */
      eventsDetail: (org, params) => this.request(`/orgs/${org}/events`, "GET", params),
      /**
       * @name issuesDetail
       * @request GET:/orgs/{org}/issues
       * @description List issues. List all issues for a given organization for the authenticated user.
       */
      issuesDetail: (org, query, params) =>
        this.request(`/orgs/${org}/issues${this.addQueryParams(query)}`, "GET", params),
      /**
       * @name membersDetail
       * @request GET:/orgs/{org}/members
       * @description Members list. List all users who are members of an organization. A member is a user tha belongs to at least 1 team in the organization. If the authenticated user is also an owner of this organization then both concealed and public members will be returned. If the requester is not an owner of the organization the query will be redirected to the public members list.
       */
      membersDetail: (org, params) => this.request(`/orgs/${org}/members`, "GET", params),
      /**
       * @name membersDelete
       * @request DELETE:/orgs/{org}/members/{username}
       * @description Remove a member. Removing a user from this list will remove them from all teams and they will no longer have any access to the organization's repositories.
       */
      membersDelete: (org, username, params) => this.request(`/orgs/${org}/members/${username}`, "DELETE", params),
      /**
       * @name membersDetail
       * @request GET:/orgs/{org}/members/{username}
       * @description Check if a user is, publicly or privately, a member of the organization.
       * @originalName membersDetail
       * @duplicate
       */
      membersDetail2: (org, username, params) => this.request(`/orgs/${org}/members/${username}`, "GET", params),
      /**
       * @name publicMembersDetail
       * @request GET:/orgs/{org}/public_members
       * @description Public members list. Members of an organization can choose to have their membership publicized or not.
       */
      publicMembersDetail: (org, params) => this.request(`/orgs/${org}/public_members`, "GET", params),
      /**
       * @name publicMembersDelete
       * @request DELETE:/orgs/{org}/public_members/{username}
       * @description Conceal a user's membership.
       */
      publicMembersDelete: (org, username, params) =>
        this.request(`/orgs/${org}/public_members/${username}`, "DELETE", params),
      /**
       * @name publicMembersDetail
       * @request GET:/orgs/{org}/public_members/{username}
       * @description Check public membership.
       * @originalName publicMembersDetail
       * @duplicate
       */
      publicMembersDetail2: (org, username, params) =>
        this.request(`/orgs/${org}/public_members/${username}`, "GET", params),
      /**
       * @name publicMembersUpdate
       * @request PUT:/orgs/{org}/public_members/{username}
       * @description Publicize a user's membership.
       */
      publicMembersUpdate: (org, username, params) =>
        this.request(`/orgs/${org}/public_members/${username}`, "PUT", params),
      /**
       * @name reposDetail
       * @request GET:/orgs/{org}/repos
       * @description List repositories for the specified org.
       */
      reposDetail: (org, query, params) =>
        this.request(`/orgs/${org}/repos${this.addQueryParams(query)}`, "GET", params),
      /**
       * @name reposCreate
       * @request POST:/orgs/{org}/repos
       * @description Create a new repository for the authenticated user. OAuth users must supply repo scope.
       */
      reposCreate: (org, body, params) => this.request(`/orgs/${org}/repos`, "POST", params, body),
      /**
       * @name teamsDetail
       * @request GET:/orgs/{org}/teams
       * @description List teams.
       */
      teamsDetail: (org, params) => this.request(`/orgs/${org}/teams`, "GET", params),
      /**
       * @name teamsCreate
       * @request POST:/orgs/{org}/teams
       * @description Create team. In order to create a team, the authenticated user must be an owner of organization.
       */
      teamsCreate: (org, body, params) => this.request(`/orgs/${org}/teams`, "POST", params, body),
    };
    this.rateLimit = {
      /**
       * @name rateLimitList
       * @request GET:/rate_limit
       * @description Get your current rate limit status Note: Accessing this endpoint does not count against your rate limit.
       */
      rateLimitList: (params) => this.request(`/rate_limit`, "GET", params),
    };
    this.repos = {
      /**
       * @name reposDelete
       * @request DELETE:/repos/{owner}/{repo}
       * @description Delete a Repository. Deleting a repository requires admin access. If OAuth is used, the delete_repo scope is required.
       */
      reposDelete: (owner, repo, params) => this.request(`/repos/${owner}/${repo}`, "DELETE", params),
      /**
       * @name reposDetail
       * @request GET:/repos/{owner}/{repo}
       * @description Get repository.
       */
      reposDetail: (owner, repo, params) => this.request(`/repos/${owner}/${repo}`, "GET", params),
      /**
       * @name reposPartialUpdate
       * @request PATCH:/repos/{owner}/{repo}
       * @description Edit repository.
       */
      reposPartialUpdate: (owner, repo, body, params) => this.request(`/repos/${owner}/${repo}`, "PATCH", params, body),
      /**
       * @name assigneesDetail
       * @request GET:/repos/{owner}/{repo}/assignees
       * @description List assignees. This call lists all the available assignees (owner + collaborators) to which issues may be assigned.
       */
      assigneesDetail: (owner, repo, params) => this.request(`/repos/${owner}/${repo}/assignees`, "GET", params),
      /**
       * @name assigneesDetail
       * @request GET:/repos/{owner}/{repo}/assignees/{assignee}
       * @description Check assignee. You may also check to see if a particular user is an assignee for a repository.
       * @originalName assigneesDetail
       * @duplicate
       */
      assigneesDetail2: (owner, repo, assignee, params) =>
        this.request(`/repos/${owner}/${repo}/assignees/${assignee}`, "GET", params),
      /**
       * @name branchesDetail
       * @request GET:/repos/{owner}/{repo}/branches
       * @description Get list of branches
       */
      branchesDetail: (owner, repo, params) => this.request(`/repos/${owner}/${repo}/branches`, "GET", params),
      /**
       * @name branchesDetail
       * @request GET:/repos/{owner}/{repo}/branches/{branch}
       * @description Get Branch
       * @originalName branchesDetail
       * @duplicate
       */
      branchesDetail2: (owner, repo, branch, params) =>
        this.request(`/repos/${owner}/${repo}/branches/${branch}`, "GET", params),
      /**
       * @name collaboratorsDetail
       * @request GET:/repos/{owner}/{repo}/collaborators
       * @description List. When authenticating as an organization owner of an organization-owned repository, all organization owners are included in the list of collaborators. Otherwise, only users with access to the repository are returned in the collaborators list.
       */
      collaboratorsDetail: (owner, repo, params) =>
        this.request(`/repos/${owner}/${repo}/collaborators`, "GET", params),
      /**
       * @name collaboratorsDelete
       * @request DELETE:/repos/{owner}/{repo}/collaborators/{user}
       * @description Remove collaborator.
       */
      collaboratorsDelete: (owner, repo, user, params) =>
        this.request(`/repos/${owner}/${repo}/collaborators/${user}`, "DELETE", params),
      /**
       * @name collaboratorsDetail
       * @request GET:/repos/{owner}/{repo}/collaborators/{user}
       * @description Check if user is a collaborator
       * @originalName collaboratorsDetail
       * @duplicate
       */
      collaboratorsDetail2: (owner, repo, user, params) =>
        this.request(`/repos/${owner}/${repo}/collaborators/${user}`, "GET", params),
      /**
       * @name collaboratorsUpdate
       * @request PUT:/repos/{owner}/{repo}/collaborators/{user}
       * @description Add collaborator.
       */
      collaboratorsUpdate: (owner, repo, user, params) =>
        this.request(`/repos/${owner}/${repo}/collaborators/${user}`, "PUT", params),
      /**
       * @name commentsDetail
       * @request GET:/repos/{owner}/{repo}/comments
       * @description List commit comments for a repository. Comments are ordered by ascending ID.
       */
      commentsDetail: (owner, repo, params) => this.request(`/repos/${owner}/${repo}/comments`, "GET", params),
      /**
       * @name commentsDelete
       * @request DELETE:/repos/{owner}/{repo}/comments/{commentId}
       * @description Delete a commit comment
       */
      commentsDelete: (owner, repo, commentId, params) =>
        this.request(`/repos/${owner}/${repo}/comments/${commentId}`, "DELETE", params),
      /**
       * @name commentsDetail
       * @request GET:/repos/{owner}/{repo}/comments/{commentId}
       * @description Get a single commit comment.
       * @originalName commentsDetail
       * @duplicate
       */
      commentsDetail2: (owner, repo, commentId, params) =>
        this.request(`/repos/${owner}/${repo}/comments/${commentId}`, "GET", params),
      /**
       * @name commentsPartialUpdate
       * @request PATCH:/repos/{owner}/{repo}/comments/{commentId}
       * @description Update a commit comment.
       */
      commentsPartialUpdate: (owner, repo, commentId, body, params) =>
        this.request(`/repos/${owner}/${repo}/comments/${commentId}`, "PATCH", params, body),
      /**
       * @name commitsDetail
       * @request GET:/repos/{owner}/{repo}/commits
       * @description List commits on a repository.
       */
      commitsDetail: (owner, repo, query, params) =>
        this.request(`/repos/${owner}/${repo}/commits${this.addQueryParams(query)}`, "GET", params),
      /**
       * @name commitsStatusDetail
       * @request GET:/repos/{owner}/{repo}/commits/{ref}/status
       * @description Get the combined Status for a specific Ref The Combined status endpoint is currently available for developers to preview. During the preview period, the API may change without advance notice. Please see the blog post for full details. To access this endpoint during the preview period, you must provide a custom media type in the Accept header: application/vnd.github.she-hulk-preview+json
       */
      commitsStatusDetail: (owner, repo, ref, params) =>
        this.request(`/repos/${owner}/${repo}/commits/${ref}/status`, "GET", params),
      /**
       * @name commitsDetail
       * @request GET:/repos/{owner}/{repo}/commits/{shaCode}
       * @description Get a single commit.
       * @originalName commitsDetail
       * @duplicate
       */
      commitsDetail2: (owner, repo, shaCode, params) =>
        this.request(`/repos/${owner}/${repo}/commits/${shaCode}`, "GET", params),
      /**
       * @name commitsCommentsDetail
       * @request GET:/repos/{owner}/{repo}/commits/{shaCode}/comments
       * @description List comments for a single commitList comments for a single commit.
       */
      commitsCommentsDetail: (owner, repo, shaCode, params) =>
        this.request(`/repos/${owner}/${repo}/commits/${shaCode}/comments`, "GET", params),
      /**
       * @name commitsCommentsCreate
       * @request POST:/repos/{owner}/{repo}/commits/{shaCode}/comments
       * @description Create a commit comment.
       */
      commitsCommentsCreate: (owner, repo, shaCode, body, params) =>
        this.request(`/repos/${owner}/${repo}/commits/${shaCode}/comments`, "POST", params, body),
      /**
       * @name compareDetail
       * @request GET:/repos/{owner}/{repo}/compare/{baseId}...{headId}
       * @description Compare two commits
       */
      compareDetail: (owner, repo, baseId, headId, params) =>
        this.request(`/repos/${owner}/${repo}/compare/${baseId}...${headId}`, "GET", params),
      /**
       * @name contentsDelete
       * @request DELETE:/repos/{owner}/{repo}/contents/{path}
       * @description Delete a file. This method deletes a file in a repository.
       */
      contentsDelete: (owner, repo, path, body, params) =>
        this.request(`/repos/${owner}/${repo}/contents/${path}`, "DELETE", params, body),
      /**
       * @name contentsDetail
       * @request GET:/repos/{owner}/{repo}/contents/{path}
       * @description Get contents. This method returns the contents of a file or directory in a repository. Files and symlinks support a custom media type for getting the raw content. Directories and submodules do not support custom media types. Note: This API supports files up to 1 megabyte in size. Here can be many outcomes. For details see "http://developer.github.com/v3/repos/contents/"
       */
      contentsDetail: (owner, repo, path, query, params) =>
        this.request(`/repos/${owner}/${repo}/contents/${path}${this.addQueryParams(query)}`, "GET", params),
      /**
       * @name contentsUpdate
       * @request PUT:/repos/{owner}/{repo}/contents/{path}
       * @description Create a file.
       */
      contentsUpdate: (owner, repo, path, body, params) =>
        this.request(`/repos/${owner}/${repo}/contents/${path}`, "PUT", params, body),
      /**
       * @name contributorsDetail
       * @request GET:/repos/{owner}/{repo}/contributors
       * @description Get list of contributors.
       */
      contributorsDetail: (owner, repo, query, params) =>
        this.request(`/repos/${owner}/${repo}/contributors${this.addQueryParams(query)}`, "GET", params),
      /**
       * @name deploymentsDetail
       * @request GET:/repos/{owner}/{repo}/deployments
       * @description Users with pull access can view deployments for a repository
       */
      deploymentsDetail: (owner, repo, params) => this.request(`/repos/${owner}/${repo}/deployments`, "GET", params),
      /**
       * @name deploymentsCreate
       * @request POST:/repos/{owner}/{repo}/deployments
       * @description Users with push access can create a deployment for a given ref
       */
      deploymentsCreate: (owner, repo, body, params) =>
        this.request(`/repos/${owner}/${repo}/deployments`, "POST", params, body),
      /**
       * @name deploymentsStatusesDetail
       * @request GET:/repos/{owner}/{repo}/deployments/{id}/statuses
       * @description Users with pull access can view deployment statuses for a deployment
       */
      deploymentsStatusesDetail: (owner, repo, id, params) =>
        this.request(`/repos/${owner}/${repo}/deployments/${id}/statuses`, "GET", params),
      /**
       * @name deploymentsStatusesCreate
       * @request POST:/repos/{owner}/{repo}/deployments/{id}/statuses
       * @description Create a Deployment Status Users with push access can create deployment statuses for a given deployment:
       */
      deploymentsStatusesCreate: (owner, repo, id, body, params) =>
        this.request(`/repos/${owner}/${repo}/deployments/${id}/statuses`, "POST", params, body),
      /**
       * @name downloadsDetail
       * @request GET:/repos/{owner}/{repo}/downloads
       * @description Deprecated. List downloads for a repository.
       */
      downloadsDetail: (owner, repo, params) => this.request(`/repos/${owner}/${repo}/downloads`, "GET", params),
      /**
       * @name downloadsDelete
       * @request DELETE:/repos/{owner}/{repo}/downloads/{downloadId}
       * @description Deprecated. Delete a download.
       */
      downloadsDelete: (owner, repo, downloadId, params) =>
        this.request(`/repos/${owner}/${repo}/downloads/${downloadId}`, "DELETE", params),
      /**
       * @name downloadsDetail
       * @request GET:/repos/{owner}/{repo}/downloads/{downloadId}
       * @description Deprecated. Get a single download.
       * @originalName downloadsDetail
       * @duplicate
       */
      downloadsDetail2: (owner, repo, downloadId, params) =>
        this.request(`/repos/${owner}/${repo}/downloads/${downloadId}`, "GET", params),
      /**
       * @name eventsDetail
       * @request GET:/repos/{owner}/{repo}/events
       * @description Get list of repository events.
       */
      eventsDetail: (owner, repo, params) => this.request(`/repos/${owner}/${repo}/events`, "GET", params),
      /**
       * @name forksDetail
       * @request GET:/repos/{owner}/{repo}/forks
       * @description List forks.
       */
      forksDetail: (owner, repo, query, params) =>
        this.request(`/repos/${owner}/${repo}/forks${this.addQueryParams(query)}`, "GET", params),
      /**
       * @name forksCreate
       * @request POST:/repos/{owner}/{repo}/forks
       * @description Create a fork. Forking a Repository happens asynchronously. Therefore, you may have to wai a short period before accessing the git objects. If this takes longer than 5 minutes, be sure to contact Support.
       */
      forksCreate: (owner, repo, body, params) => this.request(`/repos/${owner}/${repo}/forks`, "POST", params, body),
      /**
       * @name gitBlobsCreate
       * @request POST:/repos/{owner}/{repo}/git/blobs
       * @description Create a Blob.
       */
      gitBlobsCreate: (owner, repo, body, params) =>
        this.request(`/repos/${owner}/${repo}/git/blobs`, "POST", params, body),
      /**
       * @name gitBlobsDetail
       * @request GET:/repos/{owner}/{repo}/git/blobs/{shaCode}
       * @description Get a Blob. Since blobs can be any arbitrary binary data, the input and responses for the blob API takes an encoding parameter that can be either utf-8 or base64. If your data cannot be losslessly sent as a UTF-8 string, you can base64 encode it.
       */
      gitBlobsDetail: (owner, repo, shaCode, params) =>
        this.request(`/repos/${owner}/${repo}/git/blobs/${shaCode}`, "GET", params),
      /**
       * @name gitCommitsCreate
       * @request POST:/repos/{owner}/{repo}/git/commits
       * @description Create a Commit.
       */
      gitCommitsCreate: (owner, repo, body, params) =>
        this.request(`/repos/${owner}/${repo}/git/commits`, "POST", params, body),
      /**
       * @name gitCommitsDetail
       * @request GET:/repos/{owner}/{repo}/git/commits/{shaCode}
       * @description Get a Commit.
       */
      gitCommitsDetail: (owner, repo, shaCode, params) =>
        this.request(`/repos/${owner}/${repo}/git/commits/${shaCode}`, "GET", params),
      /**
       * @name gitRefsDetail
       * @request GET:/repos/{owner}/{repo}/git/refs
       * @description Get all References
       */
      gitRefsDetail: (owner, repo, params) => this.request(`/repos/${owner}/${repo}/git/refs`, "GET", params),
      /**
       * @name gitRefsCreate
       * @request POST:/repos/{owner}/{repo}/git/refs
       * @description Create a Reference
       */
      gitRefsCreate: (owner, repo, body, params) =>
        this.request(`/repos/${owner}/${repo}/git/refs`, "POST", params, body),
      /**
       * @name gitRefsDelete
       * @request DELETE:/repos/{owner}/{repo}/git/refs/{ref}
       * @description Delete a Reference Example: Deleting a branch: DELETE /repos/octocat/Hello-World/git/refs/heads/feature-a Example: Deleting a tag:        DELETE /repos/octocat/Hello-World/git/refs/tags/v1.0
       */
      gitRefsDelete: (owner, repo, ref, params) =>
        this.request(`/repos/${owner}/${repo}/git/refs/${ref}`, "DELETE", params),
      /**
       * @name gitRefsDetail
       * @request GET:/repos/{owner}/{repo}/git/refs/{ref}
       * @description Get a Reference
       * @originalName gitRefsDetail
       * @duplicate
       */
      gitRefsDetail2: (owner, repo, ref, params) =>
        this.request(`/repos/${owner}/${repo}/git/refs/${ref}`, "GET", params),
      /**
       * @name gitRefsPartialUpdate
       * @request PATCH:/repos/{owner}/{repo}/git/refs/{ref}
       * @description Update a Reference
       */
      gitRefsPartialUpdate: (owner, repo, ref, body, params) =>
        this.request(`/repos/${owner}/${repo}/git/refs/${ref}`, "PATCH", params, body),
      /**
       * @name gitTagsCreate
       * @request POST:/repos/{owner}/{repo}/git/tags
       * @description Create a Tag Object. Note that creating a tag object does not create the reference that makes a tag in Git. If you want to create an annotated tag in Git, you have to do this call to create the tag object, and then create the refs/tags/[tag] reference. If you want to create a lightweight tag, you only have to create the tag reference - this call would be unnecessary.
       */
      gitTagsCreate: (owner, repo, body, params) =>
        this.request(`/repos/${owner}/${repo}/git/tags`, "POST", params, body),
      /**
       * @name gitTagsDetail
       * @request GET:/repos/{owner}/{repo}/git/tags/{shaCode}
       * @description Get a Tag.
       */
      gitTagsDetail: (owner, repo, shaCode, params) =>
        this.request(`/repos/${owner}/${repo}/git/tags/${shaCode}`, "GET", params),
      /**
       * @name gitTreesCreate
       * @request POST:/repos/{owner}/{repo}/git/trees
       * @description Create a Tree. The tree creation API will take nested entries as well. If both a tree and a nested path modifying that tree are specified, it will overwrite the contents of that tree with the new path contents and write a new tree out.
       */
      gitTreesCreate: (owner, repo, body, params) =>
        this.request(`/repos/${owner}/${repo}/git/trees`, "POST", params, body),
      /**
       * @name gitTreesDetail
       * @request GET:/repos/{owner}/{repo}/git/trees/{shaCode}
       * @description Get a Tree.
       */
      gitTreesDetail: (owner, repo, shaCode, query, params) =>
        this.request(`/repos/${owner}/${repo}/git/trees/${shaCode}${this.addQueryParams(query)}`, "GET", params),
      /**
       * @name hooksDetail
       * @request GET:/repos/{owner}/{repo}/hooks
       * @description Get list of hooks.
       */
      hooksDetail: (owner, repo, params) => this.request(`/repos/${owner}/${repo}/hooks`, "GET", params),
      /**
       * @name hooksCreate
       * @request POST:/repos/{owner}/{repo}/hooks
       * @description Create a hook.
       */
      hooksCreate: (owner, repo, body, params) => this.request(`/repos/${owner}/${repo}/hooks`, "POST", params, body),
      /**
       * @name hooksDelete
       * @request DELETE:/repos/{owner}/{repo}/hooks/{hookId}
       * @description Delete a hook.
       */
      hooksDelete: (owner, repo, hookId, params) =>
        this.request(`/repos/${owner}/${repo}/hooks/${hookId}`, "DELETE", params),
      /**
       * @name hooksDetail
       * @request GET:/repos/{owner}/{repo}/hooks/{hookId}
       * @description Get single hook.
       * @originalName hooksDetail
       * @duplicate
       */
      hooksDetail2: (owner, repo, hookId, params) =>
        this.request(`/repos/${owner}/${repo}/hooks/${hookId}`, "GET", params),
      /**
       * @name hooksPartialUpdate
       * @request PATCH:/repos/{owner}/{repo}/hooks/{hookId}
       * @description Edit a hook.
       */
      hooksPartialUpdate: (owner, repo, hookId, body, params) =>
        this.request(`/repos/${owner}/${repo}/hooks/${hookId}`, "PATCH", params, body),
      /**
       * @name hooksTestsCreate
       * @request POST:/repos/{owner}/{repo}/hooks/{hookId}/tests
       * @description Test a push hook. This will trigger the hook with the latest push to the current repository if the hook is subscribed to push events. If the hook is not subscribed to push events, the server will respond with 204 but no test POST will be generated. Note: Previously /repos/:owner/:repo/hooks/:id/tes
       */
      hooksTestsCreate: (owner, repo, hookId, params) =>
        this.request(`/repos/${owner}/${repo}/hooks/${hookId}/tests`, "POST", params),
      /**
       * @name issuesDetail
       * @request GET:/repos/{owner}/{repo}/issues
       * @description List issues for a repository.
       */
      issuesDetail: (owner, repo, query, params) =>
        this.request(`/repos/${owner}/${repo}/issues${this.addQueryParams(query)}`, "GET", params),
      /**
       * @name issuesCreate
       * @request POST:/repos/{owner}/{repo}/issues
       * @description Create an issue. Any user with pull access to a repository can create an issue.
       */
      issuesCreate: (owner, repo, body, params) => this.request(`/repos/${owner}/${repo}/issues`, "POST", params, body),
      /**
       * @name issuesCommentsDetail
       * @request GET:/repos/{owner}/{repo}/issues/comments
       * @description List comments in a repository.
       */
      issuesCommentsDetail: (owner, repo, query, params) =>
        this.request(`/repos/${owner}/${repo}/issues/comments${this.addQueryParams(query)}`, "GET", params),
      /**
       * @name issuesCommentsDelete
       * @request DELETE:/repos/{owner}/{repo}/issues/comments/{commentId}
       * @description Delete a comment.
       */
      issuesCommentsDelete: (owner, repo, commentId, params) =>
        this.request(`/repos/${owner}/${repo}/issues/comments/${commentId}`, "DELETE", params),
      /**
       * @name issuesCommentsDetail
       * @request GET:/repos/{owner}/{repo}/issues/comments/{commentId}
       * @description Get a single comment.
       * @originalName issuesCommentsDetail
       * @duplicate
       */
      issuesCommentsDetail2: (owner, repo, commentId, params) =>
        this.request(`/repos/${owner}/${repo}/issues/comments/${commentId}`, "GET", params),
      /**
       * @name issuesCommentsPartialUpdate
       * @request PATCH:/repos/{owner}/{repo}/issues/comments/{commentId}
       * @description Edit a comment.
       */
      issuesCommentsPartialUpdate: (owner, repo, commentId, body, params) =>
        this.request(`/repos/${owner}/${repo}/issues/comments/${commentId}`, "PATCH", params, body),
      /**
       * @name issuesEventsDetail
       * @request GET:/repos/{owner}/{repo}/issues/events
       * @description List issue events for a repository.
       */
      issuesEventsDetail: (owner, repo, params) => this.request(`/repos/${owner}/${repo}/issues/events`, "GET", params),
      /**
       * @name issuesEventsDetail
       * @request GET:/repos/{owner}/{repo}/issues/events/{eventId}
       * @description Get a single event.
       * @originalName issuesEventsDetail
       * @duplicate
       */
      issuesEventsDetail2: (owner, repo, eventId, params) =>
        this.request(`/repos/${owner}/${repo}/issues/events/${eventId}`, "GET", params),
      /**
       * @name issuesDetail
       * @request GET:/repos/{owner}/{repo}/issues/{number}
       * @description Get a single issue
       * @originalName issuesDetail
       * @duplicate
       */
      issuesDetail2: (owner, repo, number, params) =>
        this.request(`/repos/${owner}/${repo}/issues/${number}`, "GET", params),
      /**
       * @name issuesPartialUpdate
       * @request PATCH:/repos/{owner}/{repo}/issues/{number}
       * @description Edit an issue. Issue owners and users with push access can edit an issue.
       */
      issuesPartialUpdate: (owner, repo, number, body, params) =>
        this.request(`/repos/${owner}/${repo}/issues/${number}`, "PATCH", params, body),
      /**
       * @name issuesCommentsDetail
       * @request GET:/repos/{owner}/{repo}/issues/{number}/comments
       * @description List comments on an issue.
       * @originalName issuesCommentsDetail
       * @duplicate
       */
      issuesCommentsDetail3: (owner, repo, number, params) =>
        this.request(`/repos/${owner}/${repo}/issues/${number}/comments`, "GET", params),
      /**
       * @name issuesCommentsCreate
       * @request POST:/repos/{owner}/{repo}/issues/{number}/comments
       * @description Create a comment.
       */
      issuesCommentsCreate: (owner, repo, number, body, params) =>
        this.request(`/repos/${owner}/${repo}/issues/${number}/comments`, "POST", params, body),
      /**
       * @name issuesEventsDetail
       * @request GET:/repos/{owner}/{repo}/issues/{number}/events
       * @description List events for an issue.
       * @originalName issuesEventsDetail
       * @duplicate
       */
      issuesEventsDetail3: (owner, repo, number, params) =>
        this.request(`/repos/${owner}/${repo}/issues/${number}/events`, "GET", params),
      /**
       * @name issuesLabelsDelete
       * @request DELETE:/repos/{owner}/{repo}/issues/{number}/labels
       * @description Remove all labels from an issue.
       */
      issuesLabelsDelete: (owner, repo, number, params) =>
        this.request(`/repos/${owner}/${repo}/issues/${number}/labels`, "DELETE", params),
      /**
       * @name issuesLabelsDetail
       * @request GET:/repos/{owner}/{repo}/issues/{number}/labels
       * @description List labels on an issue.
       */
      issuesLabelsDetail: (owner, repo, number, params) =>
        this.request(`/repos/${owner}/${repo}/issues/${number}/labels`, "GET", params),
      /**
       * @name issuesLabelsCreate
       * @request POST:/repos/{owner}/{repo}/issues/{number}/labels
       * @description Add labels to an issue.
       */
      issuesLabelsCreate: (owner, repo, number, body, params) =>
        this.request(`/repos/${owner}/${repo}/issues/${number}/labels`, "POST", params, body),
      /**
       * @name issuesLabelsUpdate
       * @request PUT:/repos/{owner}/{repo}/issues/{number}/labels
       * @description Replace all labels for an issue. Sending an empty array ([]) will remove all Labels from the Issue.
       */
      issuesLabelsUpdate: (owner, repo, number, body, params) =>
        this.request(`/repos/${owner}/${repo}/issues/${number}/labels`, "PUT", params, body),
      /**
       * @name issuesLabelsDelete
       * @request DELETE:/repos/{owner}/{repo}/issues/{number}/labels/{name}
       * @description Remove a label from an issue.
       * @originalName issuesLabelsDelete
       * @duplicate
       */
      issuesLabelsDelete2: (owner, repo, number, name, params) =>
        this.request(`/repos/${owner}/${repo}/issues/${number}/labels/${name}`, "DELETE", params),
      /**
       * @name keysDetail
       * @request GET:/repos/{owner}/{repo}/keys
       * @description Get list of keys.
       */
      keysDetail: (owner, repo, params) => this.request(`/repos/${owner}/${repo}/keys`, "GET", params),
      /**
       * @name keysCreate
       * @request POST:/repos/{owner}/{repo}/keys
       * @description Create a key.
       */
      keysCreate: (owner, repo, body, params) => this.request(`/repos/${owner}/${repo}/keys`, "POST", params, body),
      /**
       * @name keysDelete
       * @request DELETE:/repos/{owner}/{repo}/keys/{keyId}
       * @description Delete a key.
       */
      keysDelete: (owner, repo, keyId, params) =>
        this.request(`/repos/${owner}/${repo}/keys/${keyId}`, "DELETE", params),
      /**
       * @name keysDetail
       * @request GET:/repos/{owner}/{repo}/keys/{keyId}
       * @description Get a key
       * @originalName keysDetail
       * @duplicate
       */
      keysDetail2: (owner, repo, keyId, params) => this.request(`/repos/${owner}/${repo}/keys/${keyId}`, "GET", params),
      /**
       * @name labelsDetail
       * @request GET:/repos/{owner}/{repo}/labels
       * @description List all labels for this repository.
       */
      labelsDetail: (owner, repo, params) => this.request(`/repos/${owner}/${repo}/labels`, "GET", params),
      /**
       * @name labelsCreate
       * @request POST:/repos/{owner}/{repo}/labels
       * @description Create a label.
       */
      labelsCreate: (owner, repo, body, params) => this.request(`/repos/${owner}/${repo}/labels`, "POST", params, body),
      /**
       * @name labelsDelete
       * @request DELETE:/repos/{owner}/{repo}/labels/{name}
       * @description Delete a label.
       */
      labelsDelete: (owner, repo, name, params) =>
        this.request(`/repos/${owner}/${repo}/labels/${name}`, "DELETE", params),
      /**
       * @name labelsDetail
       * @request GET:/repos/{owner}/{repo}/labels/{name}
       * @description Get a single label.
       * @originalName labelsDetail
       * @duplicate
       */
      labelsDetail2: (owner, repo, name, params) =>
        this.request(`/repos/${owner}/${repo}/labels/${name}`, "GET", params),
      /**
       * @name labelsPartialUpdate
       * @request PATCH:/repos/{owner}/{repo}/labels/{name}
       * @description Update a label.
       */
      labelsPartialUpdate: (owner, repo, name, body, params) =>
        this.request(`/repos/${owner}/${repo}/labels/${name}`, "PATCH", params, body),
      /**
       * @name languagesDetail
       * @request GET:/repos/{owner}/{repo}/languages
       * @description List languages. List languages for the specified repository. The value on the right of a language is the number of bytes of code written in that language.
       */
      languagesDetail: (owner, repo, params) => this.request(`/repos/${owner}/${repo}/languages`, "GET", params),
      /**
       * @name mergesCreate
       * @request POST:/repos/{owner}/{repo}/merges
       * @description Perform a merge.
       */
      mergesCreate: (owner, repo, body, params) => this.request(`/repos/${owner}/${repo}/merges`, "POST", params, body),
      /**
       * @name milestonesDetail
       * @request GET:/repos/{owner}/{repo}/milestones
       * @description List milestones for a repository.
       */
      milestonesDetail: (owner, repo, query, params) =>
        this.request(`/repos/${owner}/${repo}/milestones${this.addQueryParams(query)}`, "GET", params),
      /**
       * @name milestonesCreate
       * @request POST:/repos/{owner}/{repo}/milestones
       * @description Create a milestone.
       */
      milestonesCreate: (owner, repo, body, params) =>
        this.request(`/repos/${owner}/${repo}/milestones`, "POST", params, body),
      /**
       * @name milestonesDelete
       * @request DELETE:/repos/{owner}/{repo}/milestones/{number}
       * @description Delete a milestone.
       */
      milestonesDelete: (owner, repo, number, params) =>
        this.request(`/repos/${owner}/${repo}/milestones/${number}`, "DELETE", params),
      /**
       * @name milestonesDetail
       * @request GET:/repos/{owner}/{repo}/milestones/{number}
       * @description Get a single milestone.
       * @originalName milestonesDetail
       * @duplicate
       */
      milestonesDetail2: (owner, repo, number, params) =>
        this.request(`/repos/${owner}/${repo}/milestones/${number}`, "GET", params),
      /**
       * @name milestonesPartialUpdate
       * @request PATCH:/repos/{owner}/{repo}/milestones/{number}
       * @description Update a milestone.
       */
      milestonesPartialUpdate: (owner, repo, number, body, params) =>
        this.request(`/repos/${owner}/${repo}/milestones/${number}`, "PATCH", params, body),
      /**
       * @name milestonesLabelsDetail
       * @request GET:/repos/{owner}/{repo}/milestones/{number}/labels
       * @description Get labels for every issue in a milestone.
       */
      milestonesLabelsDetail: (owner, repo, number, params) =>
        this.request(`/repos/${owner}/${repo}/milestones/${number}/labels`, "GET", params),
      /**
       * @name notificationsDetail
       * @request GET:/repos/{owner}/{repo}/notifications
       * @description List your notifications in a repository List all notifications for the current user.
       */
      notificationsDetail: (owner, repo, query, params) =>
        this.request(`/repos/${owner}/${repo}/notifications${this.addQueryParams(query)}`, "GET", params),
      /**
       * @name notificationsUpdate
       * @request PUT:/repos/{owner}/{repo}/notifications
       * @description Mark notifications as read in a repository. Marking all notifications in a repository as "read" removes them from the default view on GitHub.com.
       */
      notificationsUpdate: (owner, repo, body, params) =>
        this.request(`/repos/${owner}/${repo}/notifications`, "PUT", params, body),
      /**
       * @name pullsDetail
       * @request GET:/repos/{owner}/{repo}/pulls
       * @description List pull requests.
       */
      pullsDetail: (owner, repo, query, params) =>
        this.request(`/repos/${owner}/${repo}/pulls${this.addQueryParams(query)}`, "GET", params),
      /**
       * @name pullsCreate
       * @request POST:/repos/{owner}/{repo}/pulls
       * @description Create a pull request.
       */
      pullsCreate: (owner, repo, body, params) => this.request(`/repos/${owner}/${repo}/pulls`, "POST", params, body),
      /**
       * @name pullsCommentsDetail
       * @request GET:/repos/{owner}/{repo}/pulls/comments
       * @description List comments in a repository. By default, Review Comments are ordered by ascending ID.
       */
      pullsCommentsDetail: (owner, repo, query, params) =>
        this.request(`/repos/${owner}/${repo}/pulls/comments${this.addQueryParams(query)}`, "GET", params),
      /**
       * @name pullsCommentsDelete
       * @request DELETE:/repos/{owner}/{repo}/pulls/comments/{commentId}
       * @description Delete a comment.
       */
      pullsCommentsDelete: (owner, repo, commentId, params) =>
        this.request(`/repos/${owner}/${repo}/pulls/comments/${commentId}`, "DELETE", params),
      /**
       * @name pullsCommentsDetail
       * @request GET:/repos/{owner}/{repo}/pulls/comments/{commentId}
       * @description Get a single comment.
       * @originalName pullsCommentsDetail
       * @duplicate
       */
      pullsCommentsDetail2: (owner, repo, commentId, params) =>
        this.request(`/repos/${owner}/${repo}/pulls/comments/${commentId}`, "GET", params),
      /**
       * @name pullsCommentsPartialUpdate
       * @request PATCH:/repos/{owner}/{repo}/pulls/comments/{commentId}
       * @description Edit a comment.
       */
      pullsCommentsPartialUpdate: (owner, repo, commentId, body, params) =>
        this.request(`/repos/${owner}/${repo}/pulls/comments/${commentId}`, "PATCH", params, body),
      /**
       * @name pullsDetail
       * @request GET:/repos/{owner}/{repo}/pulls/{number}
       * @description Get a single pull request.
       * @originalName pullsDetail
       * @duplicate
       */
      pullsDetail2: (owner, repo, number, params) =>
        this.request(`/repos/${owner}/${repo}/pulls/${number}`, "GET", params),
      /**
       * @name pullsPartialUpdate
       * @request PATCH:/repos/{owner}/{repo}/pulls/{number}
       * @description Update a pull request.
       */
      pullsPartialUpdate: (owner, repo, number, body, params) =>
        this.request(`/repos/${owner}/${repo}/pulls/${number}`, "PATCH", params, body),
      /**
       * @name pullsCommentsDetail
       * @request GET:/repos/{owner}/{repo}/pulls/{number}/comments
       * @description List comments on a pull request.
       * @originalName pullsCommentsDetail
       * @duplicate
       */
      pullsCommentsDetail3: (owner, repo, number, params) =>
        this.request(`/repos/${owner}/${repo}/pulls/${number}/comments`, "GET", params),
      /**
       * @name pullsCommentsCreate
       * @request POST:/repos/{owner}/{repo}/pulls/{number}/comments
       * @description Create a comment. #TODO Alternative input ( http://developer.github.com/v3/pulls/comments/ ) description: | Alternative Input. Instead of passing commit_id, path, and position you can reply to an existing Pull Request Comment like this: body Required string in_reply_to Required number - Comment id to reply to.
       */
      pullsCommentsCreate: (owner, repo, number, body, params) =>
        this.request(`/repos/${owner}/${repo}/pulls/${number}/comments`, "POST", params, body),
      /**
       * @name pullsCommitsDetail
       * @request GET:/repos/{owner}/{repo}/pulls/{number}/commits
       * @description List commits on a pull request.
       */
      pullsCommitsDetail: (owner, repo, number, params) =>
        this.request(`/repos/${owner}/${repo}/pulls/${number}/commits`, "GET", params),
      /**
       * @name pullsFilesDetail
       * @request GET:/repos/{owner}/{repo}/pulls/{number}/files
       * @description List pull requests files.
       */
      pullsFilesDetail: (owner, repo, number, params) =>
        this.request(`/repos/${owner}/${repo}/pulls/${number}/files`, "GET", params),
      /**
       * @name pullsMergeDetail
       * @request GET:/repos/{owner}/{repo}/pulls/{number}/merge
       * @description Get if a pull request has been merged.
       */
      pullsMergeDetail: (owner, repo, number, params) =>
        this.request(`/repos/${owner}/${repo}/pulls/${number}/merge`, "GET", params),
      /**
       * @name pullsMergeUpdate
       * @request PUT:/repos/{owner}/{repo}/pulls/{number}/merge
       * @description Merge a pull request (Merge Button's)
       */
      pullsMergeUpdate: (owner, repo, number, body, params) =>
        this.request(`/repos/${owner}/${repo}/pulls/${number}/merge`, "PUT", params, body),
      /**
       * @name readmeDetail
       * @request GET:/repos/{owner}/{repo}/readme
       * @description Get the README. This method returns the preferred README for a repository.
       */
      readmeDetail: (owner, repo, query, params) =>
        this.request(`/repos/${owner}/${repo}/readme${this.addQueryParams(query)}`, "GET", params),
      /**
       * @name releasesDetail
       * @request GET:/repos/{owner}/{repo}/releases
       * @description Users with push access to the repository will receive all releases (i.e., published releases and draft releases). Users with pull access will receive published releases only
       */
      releasesDetail: (owner, repo, params) => this.request(`/repos/${owner}/${repo}/releases`, "GET", params),
      /**
       * @name releasesCreate
       * @request POST:/repos/{owner}/{repo}/releases
       * @description Create a release Users with push access to the repository can create a release.
       */
      releasesCreate: (owner, repo, body, params) =>
        this.request(`/repos/${owner}/${repo}/releases`, "POST", params, body),
      /**
       * @name releasesAssetsDelete
       * @request DELETE:/repos/{owner}/{repo}/releases/assets/{id}
       * @description Delete a release asset
       */
      releasesAssetsDelete: (owner, repo, id, params) =>
        this.request(`/repos/${owner}/${repo}/releases/assets/${id}`, "DELETE", params),
      /**
       * @name releasesAssetsDetail
       * @request GET:/repos/{owner}/{repo}/releases/assets/{id}
       * @description Get a single release asset
       */
      releasesAssetsDetail: (owner, repo, id, params) =>
        this.request(`/repos/${owner}/${repo}/releases/assets/${id}`, "GET", params),
      /**
       * @name releasesAssetsPartialUpdate
       * @request PATCH:/repos/{owner}/{repo}/releases/assets/{id}
       * @description Edit a release asset Users with push access to the repository can edit a release asset.
       */
      releasesAssetsPartialUpdate: (owner, repo, id, body, params) =>
        this.request(`/repos/${owner}/${repo}/releases/assets/${id}`, "PATCH", params, body),
      /**
       * @name releasesDelete
       * @request DELETE:/repos/{owner}/{repo}/releases/{id}
       * @description Users with push access to the repository can delete a release.
       */
      releasesDelete: (owner, repo, id, params) =>
        this.request(`/repos/${owner}/${repo}/releases/${id}`, "DELETE", params),
      /**
       * @name releasesDetail
       * @request GET:/repos/{owner}/{repo}/releases/{id}
       * @description Get a single release
       * @originalName releasesDetail
       * @duplicate
       */
      releasesDetail2: (owner, repo, id, params) =>
        this.request(`/repos/${owner}/${repo}/releases/${id}`, "GET", params),
      /**
       * @name releasesPartialUpdate
       * @request PATCH:/repos/{owner}/{repo}/releases/{id}
       * @description Users with push access to the repository can edit a release
       */
      releasesPartialUpdate: (owner, repo, id, body, params) =>
        this.request(`/repos/${owner}/${repo}/releases/${id}`, "PATCH", params, body),
      /**
       * @name releasesAssetsDetail
       * @request GET:/repos/{owner}/{repo}/releases/{id}/assets
       * @description List assets for a release
       * @originalName releasesAssetsDetail
       * @duplicate
       */
      releasesAssetsDetail2: (owner, repo, id, params) =>
        this.request(`/repos/${owner}/${repo}/releases/${id}/assets`, "GET", params),
      /**
       * @name stargazersDetail
       * @request GET:/repos/{owner}/{repo}/stargazers
       * @description List Stargazers.
       */
      stargazersDetail: (owner, repo, params) => this.request(`/repos/${owner}/${repo}/stargazers`, "GET", params),
      /**
       * @name statsCodeFrequencyDetail
       * @request GET:/repos/{owner}/{repo}/stats/code_frequency
       * @description Get the number of additions and deletions per week. Returns a weekly aggregate of the number of additions and deletions pushed to a repository.
       */
      statsCodeFrequencyDetail: (owner, repo, params) =>
        this.request(`/repos/${owner}/${repo}/stats/code_frequency`, "GET", params),
      /**
       * @name statsCommitActivityDetail
       * @request GET:/repos/{owner}/{repo}/stats/commit_activity
       * @description Get the last year of commit activity data. Returns the last year of commit activity grouped by week. The days array is a group of commits per day, starting on Sunday.
       */
      statsCommitActivityDetail: (owner, repo, params) =>
        this.request(`/repos/${owner}/${repo}/stats/commit_activity`, "GET", params),
      /**
       * @name statsContributorsDetail
       * @request GET:/repos/{owner}/{repo}/stats/contributors
       * @description Get contributors list with additions, deletions, and commit counts.
       */
      statsContributorsDetail: (owner, repo, params) =>
        this.request(`/repos/${owner}/${repo}/stats/contributors`, "GET", params),
      /**
       * @name statsParticipationDetail
       * @request GET:/repos/{owner}/{repo}/stats/participation
       * @description Get the weekly commit count for the repo owner and everyone else.
       */
      statsParticipationDetail: (owner, repo, params) =>
        this.request(`/repos/${owner}/${repo}/stats/participation`, "GET", params),
      /**
       * @name statsPunchCardDetail
       * @request GET:/repos/{owner}/{repo}/stats/punch_card
       * @description Get the number of commits per hour in each day. Each array contains the day number, hour number, and number of commits 0-6 Sunday - Saturday 0-23 Hour of day Number of commits For example, [2, 14, 25] indicates that there were 25 total commits, during the 2.00pm hour on Tuesdays. All times are based on the time zone of individual commits.
       */
      statsPunchCardDetail: (owner, repo, params) =>
        this.request(`/repos/${owner}/${repo}/stats/punch_card`, "GET", params),
      /**
       * @name statusesDetail
       * @request GET:/repos/{owner}/{repo}/statuses/{ref}
       * @description List Statuses for a specific Ref.
       */
      statusesDetail: (owner, repo, ref, params) =>
        this.request(`/repos/${owner}/${repo}/statuses/${ref}`, "GET", params),
      /**
       * @name statusesCreate
       * @request POST:/repos/{owner}/{repo}/statuses/{ref}
       * @description Create a Status.
       */
      statusesCreate: (owner, repo, ref, body, params) =>
        this.request(`/repos/${owner}/${repo}/statuses/${ref}`, "POST", params, body),
      /**
       * @name subscribersDetail
       * @request GET:/repos/{owner}/{repo}/subscribers
       * @description List watchers.
       */
      subscribersDetail: (owner, repo, params) => this.request(`/repos/${owner}/${repo}/subscribers`, "GET", params),
      /**
       * @name subscriptionDelete
       * @request DELETE:/repos/{owner}/{repo}/subscription
       * @description Delete a Repository Subscription.
       */
      subscriptionDelete: (owner, repo, params) =>
        this.request(`/repos/${owner}/${repo}/subscription`, "DELETE", params),
      /**
       * @name subscriptionDetail
       * @request GET:/repos/{owner}/{repo}/subscription
       * @description Get a Repository Subscription.
       */
      subscriptionDetail: (owner, repo, params) => this.request(`/repos/${owner}/${repo}/subscription`, "GET", params),
      /**
       * @name subscriptionUpdate
       * @request PUT:/repos/{owner}/{repo}/subscription
       * @description Set a Repository Subscription
       */
      subscriptionUpdate: (owner, repo, body, params) =>
        this.request(`/repos/${owner}/${repo}/subscription`, "PUT", params, body),
      /**
       * @name tagsDetail
       * @request GET:/repos/{owner}/{repo}/tags
       * @description Get list of tags.
       */
      tagsDetail: (owner, repo, params) => this.request(`/repos/${owner}/${repo}/tags`, "GET", params),
      /**
       * @name teamsDetail
       * @request GET:/repos/{owner}/{repo}/teams
       * @description Get list of teams
       */
      teamsDetail: (owner, repo, params) => this.request(`/repos/${owner}/${repo}/teams`, "GET", params),
      /**
       * @name watchersDetail
       * @request GET:/repos/{owner}/{repo}/watchers
       * @description List Stargazers. New implementation.
       */
      watchersDetail: (owner, repo, params) => this.request(`/repos/${owner}/${repo}/watchers`, "GET", params),
      /**
       * @name reposDetail
       * @request GET:/repos/{owner}/{repo}/{archive_format}/{path}
       * @description Get archive link. This method will return a 302 to a URL to download a tarball or zipball archive for a repository. Please make sure your HTTP framework is configured to follow redirects or you will need to use the Location header to make a second GET request. Note: For private repositories, these links are temporary and expire quickly.
       * @originalName reposDetail
       * @duplicate
       */
      reposDetail2: (owner, repo, archive_format, path, params) =>
        this.request(`/repos/${owner}/${repo}/${archive_format}/${path}`, "GET", params),
    };
    this.repositories = {
      /**
       * @name repositoriesList
       * @request GET:/repositories
       * @description List all public repositories. This provides a dump of every public repository, in the order that they were created. Note: Pagination is powered exclusively by the since parameter. is the Link header to get the URL for the next page of repositories.
       */
      repositoriesList: (query, params) => this.request(`/repositories${this.addQueryParams(query)}`, "GET", params),
    };
    this.search = {
      /**
       * @name codeList
       * @request GET:/search/code
       * @description Search code.
       */
      codeList: (query, params) => this.request(`/search/code${this.addQueryParams(query)}`, "GET", params),
      /**
       * @name issuesList
       * @request GET:/search/issues
       * @description Find issues by state and keyword. (This method returns up to 100 results per page.)
       */
      issuesList: (query, params) => this.request(`/search/issues${this.addQueryParams(query)}`, "GET", params),
      /**
       * @name repositoriesList
       * @request GET:/search/repositories
       * @description Search repositories.
       */
      repositoriesList: (query, params) =>
        this.request(`/search/repositories${this.addQueryParams(query)}`, "GET", params),
      /**
       * @name usersList
       * @request GET:/search/users
       * @description Search users.
       */
      usersList: (query, params) => this.request(`/search/users${this.addQueryParams(query)}`, "GET", params),
    };
    this.teams = {
      /**
       * @name teamsDelete
       * @request DELETE:/teams/{teamId}
       * @description Delete team. In order to delete a team, the authenticated user must be an owner of the org that the team is associated with.
       */
      teamsDelete: (teamId, params) => this.request(`/teams/${teamId}`, "DELETE", params),
      /**
       * @name teamsDetail
       * @request GET:/teams/{teamId}
       * @description Get team.
       */
      teamsDetail: (teamId, params) => this.request(`/teams/${teamId}`, "GET", params),
      /**
       * @name teamsPartialUpdate
       * @request PATCH:/teams/{teamId}
       * @description Edit team. In order to edit a team, the authenticated user must be an owner of the org that the team is associated with.
       */
      teamsPartialUpdate: (teamId, body, params) => this.request(`/teams/${teamId}`, "PATCH", params, body),
      /**
       * @name membersDetail
       * @request GET:/teams/{teamId}/members
       * @description List team members. In order to list members in a team, the authenticated user must be a member of the team.
       */
      membersDetail: (teamId, params) => this.request(`/teams/${teamId}/members`, "GET", params),
      /**
       * @name membersDelete
       * @request DELETE:/teams/{teamId}/members/{username}
       * @description The "Remove team member" API is deprecated and is scheduled for removal in the next major version of the API. We recommend using the Remove team membership API instead. It allows you to remove both active and pending memberships. Remove team member. In order to remove a user from a team, the authenticated user must have 'admin' permissions to the team or be an owner of the org that the team is associated with. NOTE This does not delete the user, it just remove them from the team.
       */
      membersDelete: (teamId, username, params) =>
        this.request(`/teams/${teamId}/members/${username}`, "DELETE", params),
      /**
       * @name membersDetail
       * @request GET:/teams/{teamId}/members/{username}
       * @description The "Get team member" API is deprecated and is scheduled for removal in the next major version of the API. We recommend using the Get team membership API instead. It allows you to get both active and pending memberships. Get team member. In order to get if a user is a member of a team, the authenticated user mus be a member of the team.
       * @originalName membersDetail
       * @duplicate
       */
      membersDetail2: (teamId, username, params) => this.request(`/teams/${teamId}/members/${username}`, "GET", params),
      /**
       * @name membersUpdate
       * @request PUT:/teams/{teamId}/members/{username}
       * @description The API (described below) is deprecated and is scheduled for removal in the next major version of the API. We recommend using the Add team membership API instead. It allows you to invite new organization members to your teams. Add team member. In order to add a user to a team, the authenticated user must have 'admin' permissions to the team or be an owner of the org that the team is associated with.
       */
      membersUpdate: (teamId, username, params) => this.request(`/teams/${teamId}/members/${username}`, "PUT", params),
      /**
       * @name membershipsDelete
       * @request DELETE:/teams/{teamId}/memberships/{username}
       * @description Remove team membership. In order to remove a membership between a user and a team, the authenticated user must have 'admin' permissions to the team or be an owner of the organization that the team is associated with. NOTE: This does not delete the user, it just removes their membership from the team.
       */
      membershipsDelete: (teamId, username, params) =>
        this.request(`/teams/${teamId}/memberships/${username}`, "DELETE", params),
      /**
       * @name membershipsDetail
       * @request GET:/teams/{teamId}/memberships/{username}
       * @description Get team membership. In order to get a user's membership with a team, the authenticated user must be a member of the team or an owner of the team's organization.
       */
      membershipsDetail: (teamId, username, params) =>
        this.request(`/teams/${teamId}/memberships/${username}`, "GET", params),
      /**
       * @name membershipsUpdate
       * @request PUT:/teams/{teamId}/memberships/{username}
       * @description Add team membership. In order to add a membership between a user and a team, the authenticated user must have 'admin' permissions to the team or be an owner of the organization that the team is associated with. If the user is already a part of the team's organization (meaning they're on at least one other team in the organization), this endpoint will add the user to the team. If the user is completely unaffiliated with the team's organization (meaning they're on none of the organization's teams), this endpoint will send an invitation to the user via email. This newly-created membership will be in the 'pending' state until the user accepts the invitation, at which point the membership will transition to the 'active' state and the user will be added as a member of the team.
       */
      membershipsUpdate: (teamId, username, params) =>
        this.request(`/teams/${teamId}/memberships/${username}`, "PUT", params),
      /**
       * @name reposDetail
       * @request GET:/teams/{teamId}/repos
       * @description List team repos
       */
      reposDetail: (teamId, params) => this.request(`/teams/${teamId}/repos`, "GET", params),
      /**
       * @name reposDelete
       * @request DELETE:/teams/{teamId}/repos/{owner}/{repo}
       * @description In order to remove a repository from a team, the authenticated user must be an owner of the org that the team is associated with. NOTE: This does not delete the repository, it just removes it from the team.
       */
      reposDelete: (teamId, owner, repo, params) =>
        this.request(`/teams/${teamId}/repos/${owner}/${repo}`, "DELETE", params),
      /**
       * @name reposDetail
       * @request GET:/teams/{teamId}/repos/{owner}/{repo}
       * @description Check if a team manages a repository
       * @originalName reposDetail
       * @duplicate
       */
      reposDetail2: (teamId, owner, repo, params) =>
        this.request(`/teams/${teamId}/repos/${owner}/${repo}`, "GET", params),
      /**
       * @name reposUpdate
       * @request PUT:/teams/{teamId}/repos/{owner}/{repo}
       * @description In order to add a repository to a team, the authenticated user must be an owner of the org that the team is associated with. Also, the repository must be owned by the organization, or a direct fork of a repository owned by the organization.
       */
      reposUpdate: (teamId, owner, repo, params) =>
        this.request(`/teams/${teamId}/repos/${owner}/${repo}`, "PUT", params),
    };
    this.user = {
      /**
       * @name userList
       * @request GET:/user
       * @description Get the authenticated user.
       */
      userList: (params) => this.request(`/user`, "GET", params),
      /**
       * @name userPartialUpdate
       * @request PATCH:/user
       * @description Update the authenticated user.
       */
      userPartialUpdate: (body, params) => this.request(`/user`, "PATCH", params, body),
      /**
       * @name emailsDelete
       * @request DELETE:/user/emails
       * @description Delete email address(es). You can include a single email address or an array of addresses.
       */
      emailsDelete: (body, params) => this.request(`/user/emails`, "DELETE", params, body),
      /**
       * @name emailsList
       * @request GET:/user/emails
       * @description List email addresses for a user. In the final version of the API, this method will return an array of hashes with extended information for each email address indicating if the address has been verified and if it's primary email address for GitHub. Until API v3 is finalized, use the application/vnd.github.v3 media type to get other response format.
       */
      emailsList: (params) => this.request(`/user/emails`, "GET", params),
      /**
       * @name emailsCreate
       * @request POST:/user/emails
       * @description Add email address(es). You can post a single email address or an array of addresses.
       */
      emailsCreate: (body, params) => this.request(`/user/emails`, "POST", params, body),
      /**
       * @name followersList
       * @request GET:/user/followers
       * @description List the authenticated user's followers
       */
      followersList: (params) => this.request(`/user/followers`, "GET", params),
      /**
       * @name followingList
       * @request GET:/user/following
       * @description List who the authenticated user is following.
       */
      followingList: (params) => this.request(`/user/following`, "GET", params),
      /**
       * @name followingDelete
       * @request DELETE:/user/following/{username}
       * @description Unfollow a user. Unfollowing a user requires the user to be logged in and authenticated with basic auth or OAuth with the user:follow scope.
       */
      followingDelete: (username, params) => this.request(`/user/following/${username}`, "DELETE", params),
      /**
       * @name followingDetail
       * @request GET:/user/following/{username}
       * @description Check if you are following a user.
       */
      followingDetail: (username, params) => this.request(`/user/following/${username}`, "GET", params),
      /**
       * @name followingUpdate
       * @request PUT:/user/following/{username}
       * @description Follow a user. Following a user requires the user to be logged in and authenticated with basic auth or OAuth with the user:follow scope.
       */
      followingUpdate: (username, params) => this.request(`/user/following/${username}`, "PUT", params),
      /**
       * @name issuesList
       * @request GET:/user/issues
       * @description List issues. List all issues across owned and member repositories for the authenticated user.
       */
      issuesList: (query, params) => this.request(`/user/issues${this.addQueryParams(query)}`, "GET", params),
      /**
       * @name keysList
       * @request GET:/user/keys
       * @description List your public keys. Lists the current user's keys. Management of public keys via the API requires that you are authenticated through basic auth, or OAuth with the 'user', 'write:public_key' scopes.
       */
      keysList: (params) => this.request(`/user/keys`, "GET", params),
      /**
       * @name keysCreate
       * @request POST:/user/keys
       * @description Create a public key.
       */
      keysCreate: (body, params) => this.request(`/user/keys`, "POST", params, body),
      /**
       * @name keysDelete
       * @request DELETE:/user/keys/{keyId}
       * @description Delete a public key. Removes a public key. Requires that you are authenticated via Basic Auth or via OAuth with at least admin:public_key scope.
       */
      keysDelete: (keyId, params) => this.request(`/user/keys/${keyId}`, "DELETE", params),
      /**
       * @name keysDetail
       * @request GET:/user/keys/{keyId}
       * @description Get a single public key.
       */
      keysDetail: (keyId, params) => this.request(`/user/keys/${keyId}`, "GET", params),
      /**
       * @name orgsList
       * @request GET:/user/orgs
       * @description List public and private organizations for the authenticated user.
       */
      orgsList: (params) => this.request(`/user/orgs`, "GET", params),
      /**
       * @name reposList
       * @request GET:/user/repos
       * @description List repositories for the authenticated user. Note that this does not include repositories owned by organizations which the user can access. You can lis user organizations and list organization repositories separately.
       */
      reposList: (query, params) => this.request(`/user/repos${this.addQueryParams(query)}`, "GET", params),
      /**
       * @name reposCreate
       * @request POST:/user/repos
       * @description Create a new repository for the authenticated user. OAuth users must supply repo scope.
       */
      reposCreate: (body, params) => this.request(`/user/repos`, "POST", params, body),
      /**
       * @name starredList
       * @request GET:/user/starred
       * @description List repositories being starred by the authenticated user.
       */
      starredList: (query, params) => this.request(`/user/starred${this.addQueryParams(query)}`, "GET", params),
      /**
       * @name starredDelete
       * @request DELETE:/user/starred/{owner}/{repo}
       * @description Unstar a repository
       */
      starredDelete: (owner, repo, params) => this.request(`/user/starred/${owner}/${repo}`, "DELETE", params),
      /**
       * @name starredDetail
       * @request GET:/user/starred/{owner}/{repo}
       * @description Check if you are starring a repository.
       */
      starredDetail: (owner, repo, params) => this.request(`/user/starred/${owner}/${repo}`, "GET", params),
      /**
       * @name starredUpdate
       * @request PUT:/user/starred/{owner}/{repo}
       * @description Star a repository.
       */
      starredUpdate: (owner, repo, params) => this.request(`/user/starred/${owner}/${repo}`, "PUT", params),
      /**
       * @name subscriptionsList
       * @request GET:/user/subscriptions
       * @description List repositories being watched by the authenticated user.
       */
      subscriptionsList: (params) => this.request(`/user/subscriptions`, "GET", params),
      /**
       * @name subscriptionsDelete
       * @request DELETE:/user/subscriptions/{owner}/{repo}
       * @description Stop watching a repository
       */
      subscriptionsDelete: (owner, repo, params) =>
        this.request(`/user/subscriptions/${owner}/${repo}`, "DELETE", params),
      /**
       * @name subscriptionsDetail
       * @request GET:/user/subscriptions/{owner}/{repo}
       * @description Check if you are watching a repository.
       */
      subscriptionsDetail: (owner, repo, params) => this.request(`/user/subscriptions/${owner}/${repo}`, "GET", params),
      /**
       * @name subscriptionsUpdate
       * @request PUT:/user/subscriptions/{owner}/{repo}
       * @description Watch a repository.
       */
      subscriptionsUpdate: (owner, repo, params) => this.request(`/user/subscriptions/${owner}/${repo}`, "PUT", params),
      /**
       * @name teamsList
       * @request GET:/user/teams
       * @description List all of the teams across all of the organizations to which the authenticated user belongs. This method requires user or repo scope when authenticating via OAuth.
       */
      teamsList: (params) => this.request(`/user/teams`, "GET", params),
    };
    this.users = {
      /**
       * @name usersList
       * @request GET:/users
       * @description Get all users. This provides a dump of every user, in the order that they signed up for GitHub. Note: Pagination is powered exclusively by the since parameter. Use the Link header to get the URL for the next page of users.
       */
      usersList: (query, params) => this.request(`/users${this.addQueryParams(query)}`, "GET", params),
      /**
       * @name usersDetail
       * @request GET:/users/{username}
       * @description Get a single user.
       */
      usersDetail: (username, params) => this.request(`/users/${username}`, "GET", params),
      /**
       * @name eventsDetail
       * @request GET:/users/{username}/events
       * @description If you are authenticated as the given user, you will see your private events. Otherwise, you'll only see public events.
       */
      eventsDetail: (username, params) => this.request(`/users/${username}/events`, "GET", params),
      /**
       * @name eventsOrgsDetail
       * @request GET:/users/{username}/events/orgs/{org}
       * @description This is the user's organization dashboard. You must be authenticated as the user to view this.
       */
      eventsOrgsDetail: (username, org, params) => this.request(`/users/${username}/events/orgs/${org}`, "GET", params),
      /**
       * @name followersDetail
       * @request GET:/users/{username}/followers
       * @description List a user's followers
       */
      followersDetail: (username, params) => this.request(`/users/${username}/followers`, "GET", params),
      /**
       * @name followingDetail
       * @request GET:/users/{username}/following/{targetUser}
       * @description Check if one user follows another.
       */
      followingDetail: (username, targetUser, params) =>
        this.request(`/users/${username}/following/${targetUser}`, "GET", params),
      /**
       * @name gistsDetail
       * @request GET:/users/{username}/gists
       * @description List a users gists.
       */
      gistsDetail: (username, query, params) =>
        this.request(`/users/${username}/gists${this.addQueryParams(query)}`, "GET", params),
      /**
       * @name keysDetail
       * @request GET:/users/{username}/keys
       * @description List public keys for a user. Lists the verified public keys for a user. This is accessible by anyone.
       */
      keysDetail: (username, params) => this.request(`/users/${username}/keys`, "GET", params),
      /**
       * @name orgsDetail
       * @request GET:/users/{username}/orgs
       * @description List all public organizations for a user.
       */
      orgsDetail: (username, params) => this.request(`/users/${username}/orgs`, "GET", params),
      /**
       * @name receivedEventsDetail
       * @request GET:/users/{username}/received_events
       * @description These are events that you'll only see public events.
       */
      receivedEventsDetail: (username, params) => this.request(`/users/${username}/received_events`, "GET", params),
      /**
       * @name receivedEventsPublicDetail
       * @request GET:/users/{username}/received_events/public
       * @description List public events that a user has received
       */
      receivedEventsPublicDetail: (username, params) =>
        this.request(`/users/${username}/received_events/public`, "GET", params),
      /**
       * @name reposDetail
       * @request GET:/users/{username}/repos
       * @description List public repositories for the specified user.
       */
      reposDetail: (username, query, params) =>
        this.request(`/users/${username}/repos${this.addQueryParams(query)}`, "GET", params),
      /**
       * @name starredDetail
       * @request GET:/users/{username}/starred
       * @description List repositories being starred by a user.
       */
      starredDetail: (username, params) => this.request(`/users/${username}/starred`, "GET", params),
      /**
       * @name subscriptionsDetail
       * @request GET:/users/{username}/subscriptions
       * @description List repositories being watched by a user.
       */
      subscriptionsDetail: (username, params) => this.request(`/users/${username}/subscriptions`, "GET", params),
    };
  }
}
