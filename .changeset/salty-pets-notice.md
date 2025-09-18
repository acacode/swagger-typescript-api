---
"swagger-typescript-api": patch
---

Ensure discriminator mappings use union enum literals.

Resolve discriminator mapping generation to use literal values when
`generateUnionEnums` is enabled to avoid emitting enum member references.
Add regression coverage that snapshots the discriminator output with
union enums.
