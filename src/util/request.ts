import { consola } from "consola";
import { merge } from "es-toolkit";
import type { CodeGenConfig } from "../configuration.js";

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

    if (authToken) {
      requestOptions.headers = {
        Authorization: authToken,
      };
    }

    merge(merge(requestOptions, options), this.config.requestOptions || {});

    try {
      const response = await fetch(url, requestOptions);
      return await response.text();
    } catch (error) {
      const message = `error while fetching data from URL "${url}"`;
      consola.error(message, error);
      return message;
    }
  }
}
