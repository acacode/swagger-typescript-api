---
"swagger-typescript-api": patch
---

Fix: PUT requests with application/x-www-form-urlencoded content type

This fixes an issue where PUT requests with `application/x-www-form-urlencoded` content type were incorrectly sent as `multipart/form-data`.
A new `createUrlEncoded` method has been added to the `HttpClient` to handle this content type correctly.
