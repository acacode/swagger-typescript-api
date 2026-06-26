---
"swagger-typescript-api": minor
---

Add ky HTTP client support

The `--http-client ky` CLI flag and `httpClientType: "ky"` library option now generate an API client backed by [ky](https://github.com/sindresorhus/ky), a tiny fetch-based HTTP client with retries and a cleaner API.

The generated ky client is a drop-in match for the Fetch client: it uses the same `HttpResponse<D, E>` response wrapper, `ResponseFormat`, query serialization, `secure`/`securityWorker`, `cancelToken`, `unwrapResponseData`, and `disableThrowOnError` semantics. Users only need to install `ky` as a dependency in their project.

Also fixes a CLI bug where any truthy `--http-client` value was silently coerced to `axios` instead of being honored.
