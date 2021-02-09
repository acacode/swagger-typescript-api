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
   * @example http://gph.is/1gsWDcL
   */
  bitly_url?: string;

  /** Currently unused */
  content_url?: string;

  /**
   * The date this GIF was added to the GIPHY database.
   * @format date-time
   * @example 2013-08-01 12:41:48
   */
  create_datetime?: string;

  /**
   * A URL used for embedding this GIF
   * @example http://giphy.com/embed/YsTs5ltWtEhnq
   */
  embded_url?: string;

  /**
   * An array of featured tags for this GIF (Note: Not available when using the Public Beta Key)
   *
   */
  featured_tags?: string[];

  /**
   * This GIF's unique ID
   * @example YsTs5ltWtEhnq
   */
  id?: string;

  /** An object containing data for various available formats and sizes of this GIF. */
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
   * @format date-time
   * @example 2013-08-01 12:41:48
   */
  import_datetime?: string;

  /**
   * The MPAA-style rating for this content. Examples include Y, G, PG, PG-13 and R
   * @example g
   */
  rating?: string;

  /**
   * The unique slug used in this GIF's URL
   * @example confused-flying-YsTs5ltWtEhnq
   */
  slug?: string;

  /**
   * The page on which this GIF was found
   * @example http://www.reddit.com/r/reactiongifs/comments/1xpyaa/superman_goes_to_hollywood/
   */
  source?: string;

  /**
   * The URL of the webpage on which this GIF was found.
   * @example http://cheezburger.com/5282328320
   */
  source_post_url?: string;

  /**
   * The top level domain of the source URL.
   * @example cheezburger.com
   */
  source_tld?: string;

  /**
   * An array of tags for this GIF (Note: Not available when using the Public Beta Key)
   *
   */
  tags?: string[];

  /**
   * The date on which this gif was marked trending, if applicable.
   * @format date-time
   * @example 2013-08-01 12:41:48
   */
  trending_datetime?: string;

  /** Type of the gif. By default, this is almost always gif */
  type?: "gif";

  /**
   * The date on which this GIF was last updated.
   * @format date-time
   * @example 2013-08-01 12:41:48
   */
  update_datetime?: string;

  /**
   * The unique URL for this GIF
   * @example http://giphy.com/gifs/confused-flying-YsTs5ltWtEhnq
   */
  url?: string;

  /** The User Object contains information about the user associated with a GIF and URLs to assets such as that user's avatar image, profile, and more. */
  user?: User;

  /**
   * The username this GIF is attached to, if applicable
   * @example JoeCool4000
   */
  username?: string;
}

export interface Image {
  /**
   * The number of frames in this GIF.
   * @example 15
   */
  frames?: string;

  /**
   * The height of this GIF in pixels.
   * @example 200
   */
  height?: string;

  /**
   * The URL for this GIF in .MP4 format.
   * @example https://media1.giphy.com/media/cZ7rmKfFYOvYI/giphy.mp4
   */
  mp4?: string;

  /**
   * The size in bytes of the .MP4 file corresponding to this GIF.
   * @example 25123
   */
  mp4_size?: string;

  /**
   * The size of this GIF in bytes.
   * @example 32381
   */
  size?: string;

  /**
   * The publicly-accessible direct URL for this GIF.
   * @example https://media1.giphy.com/media/cZ7rmKfFYOvYI/200.gif
   */
  url?: string;

  /**
   * The URL for this GIF in .webp format.
   * @example https://media1.giphy.com/media/cZ7rmKfFYOvYI/giphy.webp
   */
  webp?: string;

  /**
   * The size in bytes of the .webp file corresponding to this GIF.
   * @example 12321
   */
  webp_size?: string;

  /**
   * The width of this GIF in pixels.
   * @example 320
   */
  width?: string;
}

/**
 * The Meta Object contains basic information regarding the request, whether it was successful, and the response given by the API.  Check `responses` to see a description of types of response codes the API might give you under different cirumstances.
 */
export interface Meta {
  /**
   * HTTP Response Message
   * @example OK
   */
  msg?: string;

  /**
   * A unique ID paired with this response from the API.
   * @example 57eea03c72381f86e05c35d2
   */
  response_id?: string;

  /**
   * HTTP Response Code
   * @format int32
   * @example 200
   */
  status?: number;
}

/**
 * The Pagination Object contains information relating to the number of total results available as well as the number of results fetched and their relative positions.
 */
export interface Pagination {
  /**
   * Total number of items returned.
   * @format int32
   * @example 25
   */
  count?: number;

  /**
   * Position in pagination.
   * @format int32
   * @example 75
   */
  offset?: number;

  /**
   * Total number of items available.
   * @format int32
   * @example 250
   */
  total_count?: number;
}

/**
 * The User Object contains information about the user associated with a GIF and URLs to assets such as that user's avatar image, profile, and more.
 */
export interface User {
  /**
   * The URL for this user's avatar image.
   * @example https://media1.giphy.com/avatars/election2016/XwYrZi5H87o6.gif
   */
  avatar_url?: string;

  /**
   * The URL for the banner image that appears atop this user's profile page.
   * @example https://media4.giphy.com/avatars/cheezburger/XkuejOhoGLE6.jpg
   */
  banner_url?: string;

  /**
   * The display name associated with this user (contains formatting the base username might not).
   * @example JoeCool4000
   */
  display_name?: string;

  /**
   * The URL for this user's profile.
   * @example https://giphy.com/cheezburger/
   */
  profile_url?: string;

  /**
   * The Twitter username associated with this user, if applicable.
   * @example @joecool4000
   */
  twitter?: string;

  /**
   * The username associated with this user.
   * @example joecool4000
   */
  username?: string;
}

export type RequestParams = Omit<RequestInit, "body" | "method"> & {
  secure?: boolean;
};

export type RequestQueryParamsType = Record<string | number, any>;

interface ApiConfig<SecurityDataType> {
  baseUrl?: string;
  baseApiParams?: RequestParams;
  securityWorker?: (securityData: SecurityDataType) => RequestParams;
}

interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

enum BodyType {
  Json,
  FormData,
  UrlEncoded,
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "https://api.giphy.com/v1";
  private securityData: SecurityDataType = null as any;
  private securityWorker: null | ApiConfig<SecurityDataType>["securityWorker"] = null;

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType) => {
    this.securityData = data;
  };

  private addQueryParam(query: RequestQueryParamsType, key: string) {
    return (
      encodeURIComponent(key) + "=" + encodeURIComponent(Array.isArray(query[key]) ? query[key].join(",") : query[key])
    );
  }

  protected toQueryString(rawQuery?: RequestQueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) =>
        typeof query[key] === "object" && !Array.isArray(query[key])
          ? this.toQueryString(query[key] as object)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: RequestQueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private bodyFormatters: Record<BodyType, (input: any) => any> = {
    [BodyType.Json]: JSON.stringify,
    [BodyType.FormData]: (input: any) =>
      Object.keys(input).reduce((data, key) => {
        data.append(key, input[key]);
        return data;
      }, new FormData()),
    [BodyType.UrlEncoded]: (input: any) => this.toQueryString(input),
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

  private safeParseResponse = <T = any, E = any>(response: Response): Promise<HttpResponse<T, E>> => {
    const r = response as HttpResponse<T, E>;
    r.data = (null as unknown) as T;
    r.error = (null as unknown) as E;

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

  public request = <T = any, E = any>(
    path: string,
    method: string,
    { secure, ...params }: RequestParams = {},
    body?: any,
    bodyType?: BodyType,
    secureByDefault?: boolean,
  ): Promise<HttpResponse<T>> => {
    const requestUrl = `${this.baseUrl}${path}`;
    const secureOptions =
      (secureByDefault || secure) && this.securityWorker ? this.securityWorker(this.securityData) : {};
    const requestOptions = {
      ...this.mergeRequestOptions(params, secureOptions),
      method,
      body: body ? this.bodyFormatters[bodyType || BodyType.Json](body) : null,
    };

    return fetch(requestUrl, requestOptions).then(async (response) => {
      const data = await this.safeParseResponse<T, E>(response);
      if (!response.ok) throw data;
      return data;
    });
  };
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
     * @description A multiget version of the get GIF by ID endpoint.
     *
     * @tags gifs
     * @name GetGifsById
     * @summary Get GIFs by ID
     * @request GET:/gifs
     * @secure
     */
    getGifsById: (query?: { ids?: string }, params?: RequestParams) =>
      this.request<{ data?: Gif[]; meta?: Meta; pagination?: Pagination }, any>(
        `/gifs${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @description Returns a random GIF, limited by tag. Excluding the tag parameter will return a random GIF from the GIPHY catalog.
     *
     * @tags gifs
     * @name RandomGif
     * @summary Random GIF
     * @request GET:/gifs/random
     * @secure
     */
    randomGif: (query?: { tag?: string; rating?: string }, params?: RequestParams) =>
      this.request<{ data?: Gif; meta?: Meta }, any>(
        `/gifs/random${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @description Search all GIPHY GIFs for a word or phrase. Punctuation will be stripped and ignored.  Use a plus or url encode for phrases. Example paul+rudd, ryan+gosling or american+psycho.
     *
     * @tags gifs
     * @name SearchGifs
     * @summary Search GIFs
     * @request GET:/gifs/search
     * @secure
     */
    searchGifs: (
      query: { q: string; limit?: number; offset?: number; rating?: string; lang?: string },
      params?: RequestParams,
    ) =>
      this.request<{ data?: Gif[]; meta?: Meta; pagination?: Pagination }, any>(
        `/gifs/search${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @description The translate API draws on search, but uses the GIPHY `special sauce` to handle translating from one vocabulary to another. In this case, words and phrases to GIF
     *
     * @tags gifs
     * @name TranslateGif
     * @summary Translate phrase to GIF
     * @request GET:/gifs/translate
     * @secure
     */
    translateGif: (query: { s: string }, params?: RequestParams) =>
      this.request<{ data?: Gif; meta?: Meta }, any>(
        `/gifs/translate${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @description Fetch GIFs currently trending online. Hand curated by the GIPHY editorial team.  The data returned mirrors the GIFs showcased on the GIPHY homepage. Returns 25 results by default.
     *
     * @tags gifs
     * @name TrendingGifs
     * @summary Trending GIFs
     * @request GET:/gifs/trending
     * @secure
     */
    trendingGifs: (query?: { limit?: number; offset?: number; rating?: string }, params?: RequestParams) =>
      this.request<{ data?: Gif[]; meta?: Meta; pagination?: Pagination }, any>(
        `/gifs/trending${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @description Returns a GIF given that GIF's unique ID
     *
     * @tags gifs
     * @name GetGifById
     * @summary Get GIF by Id
     * @request GET:/gifs/{gifId}
     * @secure
     */
    getGifById: (gifId: number, params?: RequestParams) =>
      this.request<{ data?: Gif; meta?: Meta }, any>(`/gifs/${gifId}`, "GET", params, null, BodyType.Json, true),
  };
  stickers = {
    /**
     * @description Returns a random GIF, limited by tag. Excluding the tag parameter will return a random GIF from the GIPHY catalog.
     *
     * @tags stickers
     * @name RandomSticker
     * @summary Random Sticker
     * @request GET:/stickers/random
     * @secure
     */
    randomSticker: (query?: { tag?: string; rating?: string }, params?: RequestParams) =>
      this.request<{ data?: Gif; meta?: Meta }, any>(
        `/stickers/random${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @description Replicates the functionality and requirements of the classic GIPHY search, but returns animated stickers rather than GIFs.
     *
     * @tags stickers
     * @name SearchStickers
     * @summary Search Stickers
     * @request GET:/stickers/search
     * @secure
     */
    searchStickers: (
      query: { q: string; limit?: number; offset?: number; rating?: string; lang?: string },
      params?: RequestParams,
    ) =>
      this.request<{ data?: Gif[]; meta?: Meta; pagination?: Pagination }, any>(
        `/stickers/search${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @description The translate API draws on search, but uses the GIPHY `special sauce` to handle translating from one vocabulary to another. In this case, words and phrases to GIFs.
     *
     * @tags stickers
     * @name TranslateSticker
     * @summary Translate phrase to Sticker
     * @request GET:/stickers/translate
     * @secure
     */
    translateSticker: (query: { s: string }, params?: RequestParams) =>
      this.request<{ data?: Gif; meta?: Meta }, any>(
        `/stickers/translate${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @description Fetch Stickers currently trending online. Hand curated by the GIPHY editorial team. Returns 25 results by default.
     *
     * @tags stickers
     * @name TrendingStickers
     * @summary Trending Stickers
     * @request GET:/stickers/trending
     * @secure
     */
    trendingStickers: (query?: { limit?: number; offset?: number; rating?: string }, params?: RequestParams) =>
      this.request<{ data?: Gif[]; meta?: Meta; pagination?: Pagination }, any>(
        `/stickers/trending${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),
  };
}
