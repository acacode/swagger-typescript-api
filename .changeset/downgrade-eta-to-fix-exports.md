---
"swagger-typescript-api": patch
---

Downgrade eta from 4.0.1 to 3.5.0 to fix module resolution error.

After the upgrade to eta@4.0.1 in version 13.2.11, API generation started
failing with `ERR_PACKAGE_PATH_NOT_EXPORTED: No "exports" main defined in
eta/package.json`. This issue is caused by incorrect package export
configuration in eta@4.0.1, which is tracked in the upstream repository.

Downgrading to eta@3.5.0 resolves the module resolution error whilst
maintaining compatibility with the existing template system.

Fixes #1427.
