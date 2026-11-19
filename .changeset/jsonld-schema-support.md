---
"swagger-typescript-api": minor
---

Add opt-in JSON-LD schema support.

With `jsonLdOptions.enabled` (CLI: `--jsonld`), schemas that declare the
`x-jsonld` extension — or one of `x-jsonld-context`, `x-jsonld-type`,
`x-jsonld-id` — are parsed as JSON-LD entities. Entities gain typed
`@context`, `@type` and `@id` members and extend a shared `JsonLdEntity`
interface; a property-less `x-jsonld-type` schema becomes a string-literal
type alias. In modular output the entities are emitted as `jsonld-entity`
and the shared interfaces as `jsonld-utils`, both re-exported from
`data-contracts`. Set `jsonLdOptions.generateUtils` to `false` to emit
standalone entity interfaces without the shared module.

The feature is fully opt-in — schemas without the extension and runs
without `--jsonld` produce byte-identical output to previous versions.
