---
"swagger-typescript-api": patch
---

Stop treating a colon inside a path segment as an Express-style path parameter.

Routes using AIP-136 custom methods, such as `/v1/items:search` or `/v1/items/{itemId}:archive`,
generated a bogus required `string` argument for the `:suffix` and dropped it from the request URL.
The generated method could only produce the correct path if the caller passed the literal `":search"`.

`:paramName` is now recognized only at the start of a path segment, so `/users/:userId` keeps working
while mid-segment colons stay part of the literal path.
