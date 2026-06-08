---
"swagger-typescript-api": patch
---

Fix code injection via unescaped `servers[0].url` in generated axios and fetch HTTP clients

Malicious OpenAPI specs could embed arbitrary JavaScript in `servers[0].url`. The value was interpolated raw into string literals in generated client constructors, allowing computed-property-key injection and arbitrary code execution when consumers instantiated `HttpClient` or `Api` (axios) or imported the generated module (fetch). `apiConfig.baseUrl` is now escaped once at the source before template rendering.

Reported by [@thegr1ffyn](https://github.com/thegr1ffyn): [GHSA-38c3-wv3c-v3xj](https://github.com/advisories/GHSA-38c3-wv3c-v3xj) (axios), [GHSA-hqj5-cw9f-rx67](https://github.com/advisories/GHSA-hqj5-cw9f-rx67) (fetch).
