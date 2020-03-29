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

export interface Gif {
  /**
   * The unique bit.ly URL for this GIF
   */
  bitly_url?: string;

  /**
   * Currently unused
   */
  content_url?: string;

  /**
   * The date this GIF was added to the GIPHY database.
   */
  create_datetime?: string;

  /**
   * A URL used for embedding this GIF
   */
  embded_url?: string;

  /**
   * An array of featured tags for this GIF (Note: Not available when using the Public Beta Key)
   *
   */
  featured_tags?: string[];

  /**
   * This GIF's unique ID
   */
  id?: string;

  /**
   * An object containing data for various available formats and sizes of this GIF.
   */
  images?: {
    downsized?: Image & any;
    downsized_large?: Image & any;
    downsized_medium?: Image & any;
    downsized_small?: Image & any;
    downsized_still?: Image & any;
    fixed_height?: Image & any;
    fixed_height_downsampled?: Image & any;
    fixed_height_small?: Image & any;
    fixed_height_small_still?: Image & any;
    fixed_height_still?: Image & any;
    fixed_width?: Image & any;
    fixed_width_downsampled?: Image & any;
    fixed_width_small?: Image & any;
    fixed_width_small_still?: Image & any;
    fixed_width_still?: Image & any;
    looping?: Image & any;
    original?: Image & any;
    original_still?: Image & any;
    preview?: Image & any;
    preview_gif?: Image & any;
  };

  /**
   * The creation or upload date from this GIF's source.
   */
  import_datetime?: string;

  /**
   * The MPAA-style rating for this content. Examples include Y, G, PG, PG-13 and R
   */
  rating?: string;

  /**
   * The unique slug used in this GIF's URL
   */
  slug?: string;

  /**
   * The page on which this GIF was found
   */
  source?: string;

  /**
   * The URL of the webpage on which this GIF was found.
   */
  source_post_url?: string;

  /**
   * The top level domain of the source URL.
   */
  source_tld?: string;

  /**
   * An array of tags for this GIF (Note: Not available when using the Public Beta Key)
   *
   */
  tags?: string[];

  /**
   * The date on which this gif was marked trending, if applicable.
   */
  trending_datetime?: string;

  /**
   * Type of the gif. By default, this is almost always gif
   */
  type?: "gif";

  /**
   * The date on which this GIF was last updated.
   */
  update_datetime?: string;

  /**
   * The unique URL for this GIF
   */
  url?: string;
  user?: User;

  /**
   * The username this GIF is attached to, if applicable
   */
  username?: string;
}

export interface Image {
  /**
   * The number of frames in this GIF.
   */
  frames?: string;

  /**
   * The height of this GIF in pixels.
   */
  height?: string;

  /**
   * The URL for this GIF in .MP4 format.
   */
  mp4?: string;

  /**
   * The size in bytes of the .MP4 file corresponding to this GIF.
   */
  mp4_size?: string;

  /**
   * The size of this GIF in bytes.
   */
  size?: string;

  /**
   * The publicly-accessible direct URL for this GIF.
   */
  url?: string;

  /**
   * The URL for this GIF in .webp format.
   */
  webp?: string;

  /**
   * The size in bytes of the .webp file corresponding to this GIF.
   */
  webp_size?: string;

  /**
   * The width of this GIF in pixels.
   */
  width?: string;
}

/**
 * The Meta Object contains basic information regarding the request, whether it was successful, and the response given by the API.  Check `responses` to see a description of types of response codes the API might give you under different cirumstances.
 */
export interface Meta {
  /**
   * HTTP Response Message
   */
  msg?: string;

  /**
   * A unique ID paired with this response from the API.
   */
  response_id?: string;

  /**
   * HTTP Response Code
   */
  status?: number;
}

/**
 * The Pagination Object contains information relating to the number of total results available as well as the number of results fetched and their relative positions.
 */
export interface Pagination {
  /**
   * Total number of items returned.
   */
  count?: number;

  /**
   * Position in pagination.
   */
  offset?: number;

  /**
   * Total number of items available.
   */
  total_count?: number;
}

/**
 * The User Object contains information about the user associated with a GIF and URLs to assets such as that user's avatar image, profile, and more.
 */
export interface User {
  /**
   * The URL for this user's avatar image.
   */
  avatar_url?: string;

  /**
   * The URL for the banner image that appears atop this user's profile page.
   */
  banner_url?: string;

  /**
   * The display name associated with this user (contains formatting the base username might not).
   */
  display_name?: string;

  /**
   * The URL for this user's profile.
   */
  profile_url?: string;

  /**
   * The Twitter username associated with this user, if applicable.
   */
  twitter?: string;

  /**
   * The username associated with this user.
   */
  username?: string;
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
  public baseUrl: string = "https://api.giphy.com/v1";
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
 * @title Giphy
 * @version 1.0
 * @baseUrl https://api.giphy.com/v1
 * Giphy API
 */
export class Api<SecurityDataType = any> extends HttpClient<SecurityDataType> {
  gifs = {
    /**
     * @tags gifs
     * @name getGifsById
     * @summary Get GIFs by ID
     * @request GET:/gifs
     * @description A multiget version of the get GIF by ID endpoint.
     */
    getGifsById: (query?: { ids?: string }, params?: RequestParams) =>
      this.request<{ data?: Gif[]; meta?: Meta; pagination?: Pagination }, any>(
        `/gifs${this.addQueryParams(query)}`,
        "GET",
        params,
      ),

    /**
     * @tags gifs
     * @name randomGif
     * @summary Random GIF
     * @request GET:/gifs/random
     * @description Returns a random GIF, limited by tag. Excluding the tag parameter will return a random GIF from the GIPHY catalog.
     */
    randomGif: (query?: { tag?: string; rating?: string }, params?: RequestParams) =>
      this.request<{ data?: Gif; meta?: Meta }, any>(`/gifs/random${this.addQueryParams(query)}`, "GET", params),

    /**
     * @tags gifs
     * @name searchGifs
     * @summary Search GIFs
     * @request GET:/gifs/search
     * @description Search all GIPHY GIFs for a word or phrase. Punctuation will be stripped and ignored.  Use a plus or url encode for phrases. Example paul+rudd, ryan+gosling or american+psycho.
     */
    searchGifs: (
      query: { q: string; limit?: number; offset?: number; rating?: string; lang?: string },
      params?: RequestParams,
    ) =>
      this.request<{ data?: Gif[]; meta?: Meta; pagination?: Pagination }, any>(
        `/gifs/search${this.addQueryParams(query)}`,
        "GET",
        params,
      ),

    /**
     * @tags gifs
     * @name translateGif
     * @summary Translate phrase to GIF
     * @request GET:/gifs/translate
     * @description The translate API draws on search, but uses the GIPHY `special sauce` to handle translating from one vocabulary to another. In this case, words and phrases to GIF
     */
    translateGif: (query: { s: string }, params?: RequestParams) =>
      this.request<{ data?: Gif; meta?: Meta }, any>(`/gifs/translate${this.addQueryParams(query)}`, "GET", params),

    /**
     * @tags gifs
     * @name trendingGifs
     * @summary Trending GIFs
     * @request GET:/gifs/trending
     * @description Fetch GIFs currently trending online. Hand curated by the GIPHY editorial team.  The data returned mirrors the GIFs showcased on the GIPHY homepage. Returns 25 results by default.
     */
    trendingGifs: (query?: { limit?: number; offset?: number; rating?: string }, params?: RequestParams) =>
      this.request<{ data?: Gif[]; meta?: Meta; pagination?: Pagination }, any>(
        `/gifs/trending${this.addQueryParams(query)}`,
        "GET",
        params,
      ),

    /**
     * @tags gifs
     * @name getGifById
     * @summary Get GIF by Id
     * @request GET:/gifs/{gifId}
     * @description Returns a GIF given that GIF's unique ID
     */
    getGifById: (gifId: number, params?: RequestParams) =>
      this.request<{ data?: Gif; meta?: Meta }, any>(`/gifs/${gifId}`, "GET", params),
  };
  stickers = {
    /**
     * @tags stickers
     * @name randomSticker
     * @summary Random Sticker
     * @request GET:/stickers/random
     * @description Returns a random GIF, limited by tag. Excluding the tag parameter will return a random GIF from the GIPHY catalog.
     */
    randomSticker: (query?: { tag?: string; rating?: string }, params?: RequestParams) =>
      this.request<{ data?: Gif; meta?: Meta }, any>(`/stickers/random${this.addQueryParams(query)}`, "GET", params),

    /**
     * @tags stickers
     * @name searchStickers
     * @summary Search Stickers
     * @request GET:/stickers/search
     * @description Replicates the functionality and requirements of the classic GIPHY search, but returns animated stickers rather than GIFs.
     */
    searchStickers: (
      query: { q: string; limit?: number; offset?: number; rating?: string; lang?: string },
      params?: RequestParams,
    ) =>
      this.request<{ data?: Gif[]; meta?: Meta; pagination?: Pagination }, any>(
        `/stickers/search${this.addQueryParams(query)}`,
        "GET",
        params,
      ),

    /**
     * @tags stickers
     * @name translateSticker
     * @summary Translate phrase to Sticker
     * @request GET:/stickers/translate
     * @description The translate API draws on search, but uses the GIPHY `special sauce` to handle translating from one vocabulary to another. In this case, words and phrases to GIFs.
     */
    translateSticker: (query: { s: string }, params?: RequestParams) =>
      this.request<{ data?: Gif; meta?: Meta }, any>(`/stickers/translate${this.addQueryParams(query)}`, "GET", params),

    /**
     * @tags stickers
     * @name trendingStickers
     * @summary Trending Stickers
     * @request GET:/stickers/trending
     * @description Fetch Stickers currently trending online. Hand curated by the GIPHY editorial team. Returns 25 results by default.
     */
    trendingStickers: (query?: { limit?: number; offset?: number; rating?: string }, params?: RequestParams) =>
      this.request<{ data?: Gif[]; meta?: Meta; pagination?: Pagination }, any>(
        `/stickers/trending${this.addQueryParams(query)}`,
        "GET",
        params,
      ),
  };
}
