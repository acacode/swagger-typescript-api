---
"swagger-typescript-api": patch
---

Fix `ContentType` in http-client not respecting `enumStyle: "union"`. It now generates a plain type alias instead of an enum, and all call sites emit string literals instead of `ContentType.Json` etc.
