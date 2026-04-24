---
"swagger-typescript-api": minor
---

Add `disableFormatTypeNames` option to disable type name formatting
and normalization in the generator.

When enabled, generated names keep raw separators (for example,
`Foo_Bar` stays `Foo_Bar`), which prevents collisions caused by
`startCase`-based normalization (such as `Foo_Bar` and `FooBar`
both becoming `FooBar`).

The option is available in config and via CLI as
`--disable-format-type-names`, and is covered by a dedicated
spec test in `tests/spec/disableFormatTypeNames`.
