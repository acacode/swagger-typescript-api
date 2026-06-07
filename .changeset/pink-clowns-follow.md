---
"swagger-typescript-api": patch
---

Fix authorization-token exfiltration and SSRF via spec `$ref` during remote schema resolution

When generating from a remote OpenAPI spec, the generator walked every external `$ref` and fetched any `http(s)://` URL without validating the target. A malicious spec could force HTTP requests to loopback, RFC-1918, link-local (including cloud metadata at 169.254.169.254), or internal hostnames reachable from the generator process. Redirect chains were also followed without re-validation.

Remote schema fetches now enforce a defense-in-depth policy:

- Block private, link-local, and loopback addresses (IPv4 and IPv6), including `localhost`
- Allow cross-origin fetches only to public hosts; same-origin `$ref` targets remain allowed
- Allow the explicit `--url` spec source even on loopback (local development)
- Follow redirects manually (max 5) and re-validate each hop
- Forward `authorizationToken` only to same-origin remote URLs, not cross-origin `$ref` targets
