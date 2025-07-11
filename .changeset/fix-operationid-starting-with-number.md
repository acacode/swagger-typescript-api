---
"swagger-typescript-api": patch
---

Fix TypeScript generation failure for operationIds starting with numbers

**What:** Fixed an issue where operationIds starting with numbers (e.g., "123getUser") would cause TypeScript generation to fail due to invalid identifier names.

**Why:** OperationIds that start with numbers are not valid JavaScript identifiers, causing syntax errors in the generated TypeScript code.

**How:** Modified the template logic to quote property names for invalid identifiers. OperationIds starting with numbers are now generated as quoted properties (e.g., `"123GetUser": ...`) instead of unquoted invalid identifiers.

This resolves GitHub issue #952.
