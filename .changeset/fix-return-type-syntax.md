---
"swagger-typescript-api": patch
---

Fix missing closing angle bracket in `describeReturnType` function's default case, which produced malformed return type syntax `Promise<HttpResponse<T, E>` instead of `Promise<HttpResponse<T, E>>`.
