---
"swagger-typescript-api": patch
---

Move `@types/lodash` and `openapi-types` to dependencies

These type packages are referenced by the published declarations, so consumers
require them at install time for correct type resolution. Moving them from
`devDependencies` prevents downstream TypeScript errors whilst having no
runtime impact.
