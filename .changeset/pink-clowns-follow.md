---
"swagger-typescript-api": patch
---

CVE (GHSA-h754-fxp7-88wx) - Authorization-token exfiltration via spec `$ref`; generator forwards `--authorizationToken` to cross-origin `$ref` URLs without same-origin check, allowing a malicious spec to steal the developer's bearer token
