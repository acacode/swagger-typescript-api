---
"swagger-typescript-api": minor
---

Add `typeNameSeparator` config option for joining `typePrefix`, type name,
and `typeSuffix` in `TypeNameFormatter`.

This separator is primarily effective with `disableFormatTypeNames: true`,
or when custom `hooks.onFormatTypeName` preserves separators without
normalization.
