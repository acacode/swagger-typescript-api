---
"swagger-typescript-api": patch
---

Fix schema type name resolution when preferExistingSchemaNamesForExternalRefs is false

When `preferExistingSchemaNamesForExternalRefs` is disabled, schema components with external refs were not re-parsed with the correct type name formatter, leading to incorrect type names in generated output. Now the formatter is precommitted with existing component names and affected schemas are re-parsed.
