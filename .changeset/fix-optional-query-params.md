---
"swagger-typescript-api": patch
---

Fix: combined query params object now correctly gets a default value of `{}` when all its fields are optional and no path params are present (extractRequestParams mode)
