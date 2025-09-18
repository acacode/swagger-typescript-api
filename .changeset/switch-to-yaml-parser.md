---
"swagger-typescript-api": patch
---

Replace `js-yaml` with `yaml`

Switch YAML parsing from `js-yaml` to `yaml`. Update the resolver to
use `YAML.parse` when `JSON.parse` fails. Remove `js-yaml` and its types,
add `yaml` as a runtime dependency. No public API changes.
