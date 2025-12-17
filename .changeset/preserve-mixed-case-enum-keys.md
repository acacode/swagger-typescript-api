---
"swagger-typescript-api": patch
---

Fix enum key formatting to preserve mixed case names with underscores (e.g., `_123ValCamelCase`, `Val_Snake_Case`, `_Val_12_CamelCase`) while still transforming pure lowercase snake_case to PascalCase (e.g., `local_only` → `LocalOnly`)
