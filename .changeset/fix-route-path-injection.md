---
"swagger-typescript-api": patch
---

Fix code injection via unescaped OpenAPI path strings in generated method bodies

Malicious OpenAPI specs could embed arbitrary JavaScript in path keys. Values were interpolated raw into template literals in generated API methods, so `${…}` expressions ran with full process privileges on every call to the affected method. Route paths are now escaped for template-literal insertion while preserving deliberate `${paramName}` interpolations for declared path parameters.

Reported by [@thegr1ffyn](https://github.com/thegr1ffyn): [GHSA-w284-33mx-6g9v](https://github.com/advisories/GHSA-w284-33mx-6g9v).
