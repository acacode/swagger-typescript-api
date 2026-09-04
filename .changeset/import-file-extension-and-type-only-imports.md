---
"swagger-typescript-api": minor
---

Add `importFileExtension` and `typeOnlyImports` options

`importFileExtension` (`""` | `".js"` | `".ts"`) appends a file extension to
generated relative imports, for projects using `moduleResolution: node16`/`nodenext`
(`.js`) or `allowImportingTsExtensions` (`.ts`).

`typeOnlyImports` emits `import type` for type-only imports (and inline `type` on
mixed imports such as the http-client import, where `HttpClient` stays a value
import) for projects using `verbatimModuleSyntax` / `isolatedModules`. `ContentType`
is only marked `type` for `enumStyle: "union"`, where it is a pure type.
