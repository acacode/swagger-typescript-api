---
"swagger-typescript-api": patch
---

Fix `extractRequestParams` overwriting a component schema whose name matches `<operationId>Params`.

Since path-only routes started producing an extracted params type (13.2.9), a spec with an operation
`getOrder` and a component schema `GetOrderParams` (for example the operation's request body) would have
the model silently replaced by the route's path/query params, so the generated method typed its `data`
argument as the path params instead of the body.

`createRequestParamsSchema` now goes through the same schema-key collision guard already used by
`extractResponseBody` and `extractResponseError`, so the existing model keeps its name and the route
params fall back to the next free name (`GetOrderParams1`).
