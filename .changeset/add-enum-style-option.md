---
"swagger-typescript-api": minor
---

Add `enumStyle` option ("enum" | "union" | "const") to control enum output format. `"const"` generates `as const` objects with a companion type alias, including the built-in `ContentType` in the http-client. `generateUnionEnums` is deprecated in favor of `enumStyle: "union"`.
