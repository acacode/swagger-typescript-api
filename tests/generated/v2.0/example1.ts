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
 * A TDE certificate that can be uploaded into a server.
 */
export interface TdeCertificate {
  /**
   * Resource properties.
   */
  properties?: TdeCertificateProperties;
}

/**
 * Properties of a TDE certificate.
 */
export interface TdeCertificateProperties {
  /**
   * The certificate password.
   */
  certPassword?: string;

  /**
   * The base64 encoded certificate private blob.
   */
  privateBlob: string;
}

export type RequestParams = Omit<RequestInit, "body" | "method"> & {
  secure?: boolean;
};

type ApiConfig<SecurityDataType> = {
  baseUrl?: string;
  baseApiParams?: RequestParams;
  securityWorker?: (securityData: SecurityDataType) => RequestParams;
};

/** The Azure SQL Database management API provides a RESTful set of web APIs that interact with Azure SQL Database services to manage your databases. The API enables users to create, retrieve, update, and delete databases, servers, and other entities. */
export class Api<SecurityDataType> {
  public baseUrl = "https://management.azure.com";
  public title = "SqlManagementClient";
  public version = "2017-10-01-preview";

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

  private addQueryParams(query: Record<string, string | string[] | number | number[] | boolean | undefined>): string {
    const keys = Object.keys(query).filter(key => "undefined" !== typeof query[key]);
    return keys.length === 0
      ? ""
      : "?" +
          keys
            .map(
              key =>
                encodeURIComponent(key) +
                "=" +
                encodeURIComponent(Array.isArray(query[key]) ? (query[key] as any).join(",") : query[key]),
            )
            .join("&");
  }

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
      .then(data => data)
      .catch(e => response.text);

  public request = <T = any, E = any>(
    path: string,
    method: string,
    { secure, ...params }: RequestParams = {},
    body?: any,
    secureByDefault?: boolean,
  ): Promise<T> =>
    fetch(`${this.baseUrl}${path}`, {
      // @ts-ignore
      ...this.mergeRequestOptions(params, (secureByDefault || secure) && this.securityWorker(this.securityData)),
      method,
      body: body ? JSON.stringify(body) : null,
    }).then(async response => {
      const data = await this.safeParseResponse<T, E>(response);
      if (!response.ok) throw data;
      return data;
    });

  subscriptions = {
    /**
     * @tags ManagedInstanceTdeCertificates
     * @name ManagedInstanceTdeCertificates_Create
     * @request POST:/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/tdeCertificates
     * @description Creates a TDE certificate for a given server.
     */
    managedInstanceTdeCertificatesCreate: (
      resourceGroupName: string,
      managedInstanceName: string,
      subscriptionId: string,
      query: { "api-version": string },
      parameters: TdeCertificate,
      params?: RequestParams,
    ) =>
      this.request<any, any>(
        `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.Sql/managedInstances/${managedInstanceName}/tdeCertificates${this.addQueryParams(
          query,
        )}`,
        "POST",
        params,
        parameters,
      ),
  };
}
