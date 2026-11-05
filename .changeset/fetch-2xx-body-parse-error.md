---
"swagger-typescript-api": minor
---

Reject Fetch client requests when a 2xx response body cannot be read in the declared format.

Previously a 2xx response with an HTML, truncated, or aborted body resolved with `ok: true`,
`data: null`, and the `SyntaxError` or `AbortError` stored in `error`, so callers that branch on
`ok` silently received `null` as their DTO. With `unwrapResponseData` the call resolved to `null`
and the error was lost.

Such responses now reject with the `HttpResponse` (the same shape as non-2xx rejections), with the
parse error in `error`. With `disableThrowOnError` they resolve as before.

`204 No Content`, `205 Reset Content`, and empty or whitespace-only JSON bodies now resolve with
`data: null` and `error: null` instead of a `SyntaxError`, for both success and error statuses.
