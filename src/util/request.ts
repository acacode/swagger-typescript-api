import { consola } from "consola";
import { merge } from "es-toolkit";
import type { CodeGenConfig } from "../configuration.js";
import {
  fetchRemoteSchemaResponse,
  isSameHttpOrigin,
} from "./remote-schema-fetch.js";

export class Request {
  config: CodeGenConfig;

  constructor(config: CodeGenConfig) {
    this.config = config;
  }

  async download({
    url,
    authToken,
    ...options
  }: {
    url: string;
    authToken?: string;
    options?: Partial<RequestInit>;
  }) {
    const requestOptions: Partial<RequestInit> = {};

    if (authToken && isSameHttpOrigin(url, this.config.url)) {
      requestOptions.headers = {
        Authorization: authToken,
      };
    }

    merge(merge(requestOptions, options), this.config.requestOptions || {});

    const response = await fetchRemoteSchemaResponse(
      url,
      requestOptions as RequestInit,
      {
        specSourceUrl: this.config.url || undefined,
        allowExplicitSpecUrl: true,
      },
    );

    if (!response) {
      const message = `URL "${url}" is not allowed for fetching`;
      consola.error(message);
      throw new Error(message);
    }

    try {
      return await response.text();
    } catch (error) {
      const message = `error while fetching data from URL "${url}"`;
      consola.error(message, error);
      throw new Error(message);
    }
  }
}
