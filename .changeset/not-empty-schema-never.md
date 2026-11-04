---
"swagger-typescript-api": minor
---

Add `emptyNotAsNever` (`--empty-not-as-never`) to generate `never` instead of `any` for `not: {}` and `not: true`, which no value can satisfy. It is off by default, so generated output does not change unless you enable it.
