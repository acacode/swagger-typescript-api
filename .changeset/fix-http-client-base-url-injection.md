---
"swagger-typescript-api": patch
---

Fix code injection via unescaped `servers[0].url` in generated axios and fetch HTTP clients

Malicious OpenAPI specs could embed arbitrary JavaScript in `servers[0].url`. The value was interpolated raw into string literals in generated client constructors, allowing computed-property-key injection and arbitrary code execution when consumers instantiated `HttpClient` or `Api`. `apiConfig.baseUrl` is now escaped once at the source before template rendering.
