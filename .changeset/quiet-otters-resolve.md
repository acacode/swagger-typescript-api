---
"swagger-typescript-api": patch
---

Dedupe colliding TypeScript identifiers produced by the `TypeNameFormatter`.

Two OpenAPI schema keys that differ only in separator placement — e.g.
`Foo_Bar` and `FooBar` — used to collapse to the same identifier via
`startCase` + whitespace-strip and emit two `export interface FooBar`
declarations (TS2717 whenever the shapes differed).

`TypeNameFormatter` now exposes a `precommit(rawNames)` method the generator
calls once after loading schema components and before schema parsing. It
resolves every raw name in two passes — canonical names (raw === formatted
output) claim their slot first, then non-canonical names suffix-until-free —
so user-declared identifiers like `FooBar1` are preserved regardless of
source order, and collisions deterministically produce `FooBar`, `FooBar1`,
`FooBar2`, … References to each schema (including inline generics in route
handlers) stay consistent with the emitted `export interface` declarations.

`format()` is now a pure cache lookup with a fallback for names discovered
after precommit (enum keys, `extractEnums`/`extractResponses` results). All
formatting logic is concentrated in a single private `computeFormattedName`
helper, so the new behavior composes cleanly with `disableFormatTypeNames`
and `typeNameSeparator`.

Fixes #1724.
