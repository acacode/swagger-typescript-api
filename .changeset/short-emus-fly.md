---
"swagger-typescript-api": patch
---

Fix modular template to always generate class property syntax.

The modular template was incorrectly using object method syntax (`:` and
`,`) when route.namespace was present, introduced by PR #1326. This
caused TypeScript syntax errors in generated code.

The modular template should always generate class properties with arrow
functions (`=` and `;`), regardless of namespace presence.

This resolves the issue reported in #1366 where version 13.2.8 generated
invalid TypeScript code with modular templates.
