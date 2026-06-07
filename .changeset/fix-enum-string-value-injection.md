---
"swagger-typescript-api": patch
---

Fix code injection via unescaped enum string values in generated TypeScript enums

Malicious OpenAPI specs could embed arbitrary JavaScript in `components.schemas.*.enum` string values. `Ts.StringValue` wrapped values in double quotes without escaping, allowing attackers to break out of generated enum declarations and inject code that executes at module load when consumers import the generated client. Enum string values are now properly escaped.

Reported by [@thegr1ffyn](https://github.com/thegr1ffyn): [GHSA-5f94-x226-ccpm](https://github.com/advisories/GHSA-5f94-x226-ccpm).
