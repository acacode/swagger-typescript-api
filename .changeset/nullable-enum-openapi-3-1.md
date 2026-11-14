---
"swagger-typescript-api": patch
---

Keep `null` in OpenAPI 3.1 nullable enums.

OpenAPI 3.1 has no `nullable`; a nullable enum is written as `type: ["string", "null"]` and/or with `null` in `enum`.
The generator dropped that `null`, so `status: { type: ["string", "null"], enum: ["active", "pending", null] }` came out
as `"active" | "pending"`. These enums are now nullable like a 3.0 `nullable: true` enum: inline they become
`"active" | "pending" | null`, and with `enumStyle: "union"` the generated type includes `| null`.

A property that references a nullable enum (3.0 or 3.1) through `$ref` is now typed `Color | null` with the `enum` and
`const` enum styles, since a TypeScript enum or const object cannot hold `null`.
