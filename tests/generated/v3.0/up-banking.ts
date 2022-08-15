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
 * Bla bla bla foo bar baz
 */
export enum SomeEnumName {
  Foo = "Foo",
  Bar = "Bar",
  Baz = "Baz",
  Bad = "Bad",
}

/**
* Specifies the type of bank account. Currently returned values are `SAVER`
and `TRANSACTIONAL`.
*/
export enum AccountTypeEnum {
  SAVER = "SAVER",
  TRANSACTIONAL = "TRANSACTIONAL",
}

/**
 * Provides information about a value of money.
 */
export interface MoneyObject {
  /**
   * The ISO 4217 currency code.
   *
   */
  currencyCode: string;

  /**
   * The amount of money, formatted as a string in the relevant currency.
   * For example, for an Australian dollar value of $10.56, this field will
   * be `"10.56"`. The currency symbol is not included in the string.
   *
   */
  value: string;

  /**
   * The amount of money in the smallest denomination for the currency, as a
   * 64-bit integer.  For example, for an Australian dollar value of $10.56,
   * this field will be `1056`.
   *
   */
  valueInBaseUnits: number;
}

/**
 * Provides information about an Up bank account.
 */
export interface AccountResource {
  /** The type of this resource: `accounts` */
  type: string;

  /**
   * The unique identifier for this account.
   *
   */
  id: string;
  attributes: { displayName: string; accountType: AccountTypeEnum; balance: MoneyObject; createdAt: string };
  relationships: { transactions: { links?: { related: string } } };
  links?: { self: string };
}

/**
* Successful response to get all accounts. This returns a paginated list of
accounts, which can be scrolled by following the `prev` and `next` links
if present.
*/
export interface ListAccountsResponse {
  /**
   * The list of accounts returned in this response.
   *
   */
  data: AccountResource[];
  links: { prev: string | null; next: string | null };
}

/**
 * Successful response to get a single account.
 */
export interface GetAccountResponse {
  /**
   * The account returned in this response.
   *
   */
  data: AccountResource;
}

/**
 * Provides information about a category and its ancestry.
 */
export interface CategoryResource {
  /** The type of this resource: `categories` */
  type: string;

  /**
   * The unique identifier for this category. This is a human-readable but
   * URL-safe value.
   *
   */
  id: string;
  attributes: { name: string };
  relationships: {
    parent: { data: { type: string; id: string }; links?: { related: string } };
    children: { data: { type: string; id: string }[]; links?: { related: string } };
  };
  links?: { self: string };
}

/**
* Successful response to get all categories and their ancestry. The
returned list is not paginated.
*/
export interface ListCategoriesResponse {
  /**
   * The list of categories returned in this response.
   *
   */
  data: CategoryResource[];
}

/**
 * Successful response to get a single category and its ancestry.
 */
export interface GetCategoryResponse {
  /**
   * The category returned in this response.
   *
   */
  data: CategoryResource;
}

/**
 * Basic ping response to verify authentication.
 */
export interface PingResponse {
  meta: { id: string; statusEmoji: string };
}

/**
 * Provides information about an error processing a request.
 */
export interface ErrorObject {
  /**
   * The HTTP status code associated with this error. This can also be
   * obtained from the response headers. The status indicates the broad type
   * of error according to HTTP semantics.
   *
   */
  status: string;

  /**
   * A short description of this error. This should be stable across
   * multiple occurrences of this type of error and typically expands on the
   * reason for the status code.
   *
   */
  title: string;

  /**
   * A detailed description of this error. This should be considered unique
   * to individual occurrences of an error and subject to change. It is
   * useful for debugging purposes.
   *
   */
  detail: string;

  /**
   * If applicable, location in the request that this error relates to. This
   * may be a parameter in the query string, or a an attribute in the
   * request body.
   *
   */
  source?: { parameter?: string; pointer?: string };
}

/**
 * Generic error response that returns one or more errors.
 */
export interface ErrorResponse {
  /**
   * The list of errors returned in this response.
   *
   */
  errors: ErrorObject[];
}

/**
 * Provides information about a tag.
 */
export interface TagResource {
  /** The type of this resource: `tags` */
  type: string;

  /**
   * The label of the tag, which also acts as the tag’s unique identifier.
   *
   */
  id: string;
  relationships: { transactions: { links?: { related: string } } };
}

/**
* Successful response to get all tags. This returns a paginated list of
tags, which can be scrolled by following the `prev` and `next` links if
present.
*/
export interface ListTagsResponse {
  /**
   * The list of tags returned in this response.
   *
   */
  data: TagResource[];
  links: { prev: string | null; next: string | null };
}

/**
 * Uniquely identifies a single tag in the API.
 */
export interface TagInputResourceIdentifier {
  /** The type of this resource: `tags` */
  type: string;

  /**
   * The label of the tag, which also acts as the tag’s unique identifier.
   *
   */
  id: string;
}

/**
 * Request to add or remove tags associated with a transaction.
 */
export interface UpdateTransactionTagsRequest {
  /**
   * The tags to add to or remove from the transaction.
   *
   */
  data: TagInputResourceIdentifier[];
}

/**
* Specifies which stage of processing a transaction is currently at.
Currently returned values are `HELD` and `SETTLED`. When a transaction is
held, its account’s `availableBalance` is affected. When a transaction is
settled, its account’s `currentBalance` is affected.
*/
export enum TransactionStatusEnum {
  HELD = "HELD",
  SETTLED = "SETTLED",
}

/**
* Provides information about the amount at which a transaction was in the
`HELD` status.
*/
export interface HoldInfoObject {
  /**
   * The amount of this transaction while in the `HELD` status, in
   * Australian dollars.
   *
   */
  amount: MoneyObject;

  /**
   * The foreign currency amount of this transaction while in the `HELD`
   * status. This field will be `null` for domestic transactions. The amount
   * was converted to the AUD amount reflected in the `amount` field.
   *
   */
  foreignAmount: MoneyObject | null;
}

/**
* Provides information about how a Round Up was applied, such as whether or
not a boost was included in the Round Up.
*/
export interface RoundUpObject {
  /**
   * The total amount of this Round Up, including any boosts, represented as
   * a negative value.
   *
   */
  amount: MoneyObject;

  /**
   * The portion of the Round Up `amount` owing to boosted Round Ups,
   * represented as a negative value. If no boost was added to the Round Up
   * this field will be `null`.
   *
   */
  boostPortion: MoneyObject | null;
}

/**
* Provides information about an instant reimbursement in the form of
cashback.
*/
export interface CashbackObject {
  /**
   * A brief description of why this cashback was paid.
   *
   */
  description: string;

  /**
   * The total amount of cashback paid, represented as a positive value.
   *
   */
  amount: MoneyObject;
}

export interface TransactionResource {
  /** The type of this resource: `transactions` */
  type: string;

  /**
   * The unique identifier for this transaction.
   *
   */
  id: string;
  attributes: {
    status: TransactionStatusEnum;
    rawText: string | null;
    description: string;
    message: string | null;
    holdInfo: HoldInfoObject | null;
    roundUp: RoundUpObject | null;
    cashback: CashbackObject | null;
    amount: MoneyObject;
    foreignAmount: MoneyObject | null;
    settledAt: string | null;
    createdAt: string;
  };
  relationships: {
    account: { data: { type: string; id: string }; links?: { related: string } };
    category: { data: { type: string; id: string }; links?: { related: string } };
    parentCategory: { data: { type: string; id: string }; links?: { related: string } };
    tags: { data: { type: string; id: string }[]; links?: { self: string } };
  };
  links?: { self: string };
}

/**
* Successful response to get all transactions. This returns a paginated
list of transactions, which can be scrolled by following the `prev` and
`next` links if present.
*/
export interface ListTransactionsResponse {
  /**
   * The list of transactions returned in this response.
   *
   */
  data: TransactionResource[];
  links: { prev: string | null; next: string | null };
}

/**
 * Successful response to get a single transaction.
 */
export interface GetTransactionResponse {
  /**
   * The transaction returned in this response.
   *
   */
  data: TransactionResource;
}

/**
 * Provides information about a webhook.
 */
export interface WebhookResource {
  /** The type of this resource: `webhooks` */
  type: string;

  /**
   * The unique identifier for this webhook.
   *
   */
  id: string;
  attributes: { url: string; description: string | null; secretKey?: string; createdAt: string };
  relationships: { logs: { links?: { related: string } } };
  links?: { self: string };
}

/**
* Successful response to get all webhooks. This returns a paginated list of
webhooks, which can be scrolled by following the `prev` and `next` links
if present.
*/
export interface ListWebhooksResponse {
  /**
   * The list of webhooks returned in this response.
   *
   */
  data: WebhookResource[];
  links: { prev: string | null; next: string | null };
}

/**
 * Represents a webhook specified as request input.
 */
export interface WebhookInputResource {
  attributes: { url: string; description?: string | null };
}

/**
* Request to create a new webhook. This currently only requires a `url`
attribute.
*/
export interface CreateWebhookRequest {
  /**
   * The webhook resource to create.
   *
   */
  data: WebhookInputResource;
}

/**
 * Successful response after creating a webhook.
 */
export interface CreateWebhookResponse {
  /**
   * The webhook that was created.
   *
   */
  data: WebhookResource;
}

/**
* Specifies the type of a webhook event. This can be used to determine what
action to take in response to the event, such as which relationships to
expect.
*/
export enum WebhookEventTypeEnum {
  TRANSACTION_CREATED = "TRANSACTION_CREATED",
  TRANSACTION_SETTLED = "TRANSACTION_SETTLED",
  TRANSACTION_DELETED = "TRANSACTION_DELETED",
  PING = "PING",
}

/**
* Provides the event data used in asynchronous webhook event callbacks to
subscribed endpoints. Webhooks events have defined `eventType`s and may
optionally relate to other resources within the Up API.
*/
export interface WebhookEventResource {
  /** The type of this resource: `webhook-events` */
  type: string;

  /**
   * The unique identifier for this event. This will remain constant across
   * delivery retries.
   *
   */
  id: string;
  attributes: { eventType: WebhookEventTypeEnum; createdAt: string };
  relationships: {
    webhook: { data: { type: string; id: string }; links?: { related: string } };
    transaction?: { data: { type: string; id: string }; links?: { related: string } };
  };
}

/**
 * Asynchronous callback request used for webhook event delivery.
 */
export interface WebhookEventCallback {
  /**
   * The webhook event data sent to the subscribed webhook.
   *
   */
  data: WebhookEventResource;
}

/**
 * Successful response to get a single webhook.
 */
export interface GetWebhookResponse {
  /**
   * The webhook returned in this response.
   *
   */
  data: WebhookResource;
}

/**
* Specifies the nature of the success or failure of a webhook delivery
attempt to the subscribed webhook URL. The currently returned values are
described below:

- **`DELIVERED`**: The event was delivered to the webhook URL
  successfully and a `200` response was received.
- **`UNDELIVERABLE`**: The webhook URL was not reachable, or timed out.
- **`BAD_RESPONSE_CODE`**: The event was delivered to the webhook URL
  but a non-`200` response was received.
*/
export enum WebhookDeliveryStatusEnum {
  DELIVERED = "DELIVERED",
  UNDELIVERABLE = "UNDELIVERABLE",
  BAD_RESPONSE_CODE = "BAD_RESPONSE_CODE",
}

/**
* Provides historical webhook event delivery information for analysis and
debugging purposes.
*/
export interface WebhookDeliveryLogResource {
  /** The type of this resource: `webhook-delivery-logs` */
  type: string;

  /**
   * The unique identifier for this log entry.
   *
   */
  id: string;
  attributes: {
    request: { body: string };
    response: { statusCode: number; body: string };
    deliveryStatus: WebhookDeliveryStatusEnum;
    createdAt: string;
  };
  relationships: { webhookEvent: { data: { type: string; id: string } } };
}

/**
* Successful response to get all delivery logs for a webhook. This returns
a paginated list of delivery logs, which can be scrolled by following the
`next` and `prev` links if present.
*/
export interface ListWebhookDeliveryLogsResponse {
  /**
   * The list of delivery logs returned in this response.
   *
   */
  data: WebhookDeliveryLogResource[];
  links: { prev: string | null; next: string | null };
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
  public baseUrl: string = "https://api.up.com.au/api/v1";
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
 * @title Up API
 * @version v1
 * @baseUrl https://api.up.com.au/api/v1
 * @contact API Specification and Support (https://github.com/up-banking/api)
 *
 * The Up API gives you programmatic access to your balances and
 * transaction data. You can request past transactions or set up
 * webhooks to receive real-time events when new transactions hit your
 * account. It’s new, it’s exciting and it’s just the beginning.
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  accounts = {
    /**
     * @description Retrieve a paginated list of all accounts for the currently authenticated user. The returned list is paginated and can be scrolled by following the `prev` and `next` links where present.
     *
     * @tags Accounts
     * @name AccountsList
     * @summary List accounts
     * @request GET:/accounts
     * @secure
     */
    accountsList: (query?: { "page[size]"?: number }, params: RequestParams = {}) =>
      this.request<ListAccountsResponse, any>({
        path: `/accounts`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieve a specific account by providing its unique identifier.
     *
     * @tags Accounts
     * @name AccountsDetail
     * @summary Retrieve account
     * @request GET:/accounts/{id}
     * @secure
     */
    accountsDetail: (id: string, params: RequestParams = {}) =>
      this.request<GetAccountResponse, any>({
        path: `/accounts/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieve a list of all transactions for a specific account. The returned list is [paginated](#pagination) and can be scrolled by following the `next` and `prev` links where present. To narrow the results to a specific date range pass one or both of `filter[since]` and `filter[until]` in the query string. These filter parameters **should not** be used for pagination. Results are ordered newest first to oldest last.
     *
     * @tags Transactions
     * @name TransactionsDetail
     * @summary List transactions by account
     * @request GET:/accounts/{accountId}/transactions
     * @secure
     */
    transactionsDetail: (
      accountId: string,
      query?: {
        "page[size]"?: number;
        "filter[status]"?: TransactionStatusEnum;
        "filter[since]"?: string;
        "filter[until]"?: string;
        "filter[category]"?: string;
        "filter[tag]"?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListTransactionsResponse, any>({
        path: `/accounts/${accountId}/transactions`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  categories = {
    /**
     * @description Retrieve a list of all categories and their ancestry. The returned list is not paginated.
     *
     * @tags Categories
     * @name CategoriesList
     * @summary List categories
     * @request GET:/categories
     * @secure
     */
    categoriesList: (query?: { "filter[parent]"?: string }, params: RequestParams = {}) =>
      this.request<ListCategoriesResponse, any>({
        path: `/categories`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieve a specific category by providing its unique identifier.
     *
     * @tags Categories
     * @name CategoriesDetail
     * @summary Retrieve category
     * @request GET:/categories/{id}
     * @secure
     */
    categoriesDetail: (id: string, params: RequestParams = {}) =>
      this.request<GetCategoryResponse, any>({
        path: `/categories/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  util = {
    /**
     * @description Make a basic ping request to the API. This is useful to verify that authentication is functioning correctly. On authentication success an HTTP `200` status is returned. On failure an HTTP `401` error response is returned.
     *
     * @tags Utility endpoints
     * @name PingList
     * @summary Ping
     * @request GET:/util/ping
     * @secure
     */
    pingList: (params: RequestParams = {}) =>
      this.request<PingResponse, ErrorResponse>({
        path: `/util/ping`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  tags = {
    /**
     * @description Retrieve a list of all tags currently in use. The returned list is [paginated](#pagination) and can be scrolled by following the `next` and `prev` links where present. Results are ordered lexicographically. The `transactions` relationship for each tag exposes a link to get the transactions with the given tag.
     *
     * @tags Tags
     * @name TagsList
     * @summary List tags
     * @request GET:/tags
     * @secure
     */
    tagsList: (query?: { "page[size]"?: number }, params: RequestParams = {}) =>
      this.request<ListTagsResponse, any>({
        path: `/tags`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  transactions = {
    /**
     * @description Associates one or more tags with a specific transaction. No more than 6 tags may be present on any single transaction. Duplicate tags are silently ignored. An HTTP `204` is returned on success. The associated tags, along with this request URL, are also exposed via the `tags` relationship on the transaction resource returned from `/transactions/{id}`.
     *
     * @tags Tags
     * @name RelationshipsTagsCreate
     * @summary Add tags to transaction
     * @request POST:/transactions/{transactionId}/relationships/tags
     * @secure
     */
    relationshipsTagsCreate: (transactionId: string, data: UpdateTransactionTagsRequest, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/transactions/${transactionId}/relationships/tags`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Disassociates one or more tags from a specific transaction. Tags that are not associated are silently ignored. An HTTP `204` is returned on success. The associated tags, along with this request URL, are also exposed via the `tags` relationship on the transaction resource returned from `/transactions/{id}`.
     *
     * @tags Tags
     * @name RelationshipsTagsDelete
     * @summary Remove tags from transaction
     * @request DELETE:/transactions/{transactionId}/relationships/tags
     * @secure
     */
    relationshipsTagsDelete: (transactionId: string, data: UpdateTransactionTagsRequest, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/transactions/${transactionId}/relationships/tags`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Retrieve a list of all transactions across all accounts for the currently authenticated user. The returned list is [paginated](#pagination) and can be scrolled by following the `next` and `prev` links where present. To narrow the results to a specific date range pass one or both of `filter[since]` and `filter[until]` in the query string. These filter parameters **should not** be used for pagination. Results are ordered newest first to oldest last.
     *
     * @tags Transactions
     * @name TransactionsList
     * @summary List transactions
     * @request GET:/transactions
     * @secure
     */
    transactionsList: (
      query?: {
        "page[size]"?: number;
        "filter[status]"?: TransactionStatusEnum;
        "filter[since]"?: string;
        "filter[until]"?: string;
        "filter[category]"?: string;
        someEnumName?: SomeEnumName;
        "filter[tag]"?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListTransactionsResponse, any>({
        path: `/transactions`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieve a specific transaction by providing its unique identifier.
     *
     * @tags Transactions
     * @name TransactionsDetail
     * @summary Retrieve transaction
     * @request GET:/transactions/{id}
     * @secure
     */
    transactionsDetail: (id: string, params: RequestParams = {}) =>
      this.request<GetTransactionResponse, any>({
        path: `/transactions/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  webhooks = {
    /**
     * @description Retrieve a list of configured webhooks. The returned list is [paginated](#pagination) and can be scrolled by following the `next` and `prev` links where present. Results are ordered oldest first to newest last.
     *
     * @tags Webhooks
     * @name WebhooksList
     * @summary List webhooks
     * @request GET:/webhooks
     * @secure
     */
    webhooksList: (query?: { "page[size]"?: number }, params: RequestParams = {}) =>
      this.request<ListWebhooksResponse, any>({
        path: `/webhooks`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new webhook with a given URL. The URL will receive webhook events as JSON-encoded `POST` requests. The URL must respond with a HTTP `200` status on success. There is currently a limit of 10 webhooks at any given time. Once this limit is reached, existing webhooks will need to be deleted before new webhooks can be created. Event delivery is retried with exponential backoff if the URL is unreachable or it does not respond with a `200` status. The response includes a `secretKey` attribute, which is used to sign requests sent to the webhook URL. It will not be returned from any other endpoints within the Up API. If the `secretKey` is lost, simply create a new webhook with the same URL, capture its `secretKey` and then delete the original webhook. See [Handling webhook events](#callback_post_webhookURL) for details on how to process webhook events. It is probably a good idea to test the webhook by [sending it a `PING` event](#post_webhooks_webhookId_ping) after creating it.
     *
     * @tags Webhooks
     * @name WebhooksCreate
     * @summary Create webhook
     * @request POST:/webhooks
     * @secure
     */
    webhooksCreate: (data: CreateWebhookRequest, params: RequestParams = {}) =>
      this.request<CreateWebhookResponse, any>({
        path: `/webhooks`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieve a specific webhook by providing its unique identifier.
     *
     * @tags Webhooks
     * @name WebhooksDetail
     * @summary Retrieve webhook
     * @request GET:/webhooks/{id}
     * @secure
     */
    webhooksDetail: (id: string, params: RequestParams = {}) =>
      this.request<GetWebhookResponse, any>({
        path: `/webhooks/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a specific webhook by providing its unique identifier. Once deleted, webhook events will no longer be sent to the configured URL.
     *
     * @tags Webhooks
     * @name WebhooksDelete
     * @summary Delete webhook
     * @request DELETE:/webhooks/{id}
     * @secure
     */
    webhooksDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/webhooks/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Send a `PING` event to a webhook by providing its unique identifier. This is useful for testing and debugging purposes. The event is delivered asynchronously and its data is returned in the response to this request.
     *
     * @tags Webhooks
     * @name PingCreate
     * @summary Ping webhook
     * @request POST:/webhooks/{webhookId}/ping
     * @secure
     */
    pingCreate: (webhookId: string, params: RequestParams = {}) =>
      this.request<WebhookEventCallback, any>({
        path: `/webhooks/${webhookId}/ping`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieve a list of delivery logs for a webhook by providing its unique identifier. This is useful for analysis and debugging purposes. The returned list is [paginated](#pagination) and can be scrolled by following the `next` and `prev` links where present. Results are ordered newest first to oldest last. Logs may be automatically purged after a period of time.
     *
     * @tags Webhooks
     * @name LogsDetail
     * @summary List webhook logs
     * @request GET:/webhooks/{webhookId}/logs
     * @secure
     */
    logsDetail: (webhookId: string, query?: { "page[size]"?: number }, params: RequestParams = {}) =>
      this.request<ListWebhookDeliveryLogsResponse, any>({
        path: `/webhooks/${webhookId}/logs`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
