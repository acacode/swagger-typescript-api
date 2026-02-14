---
"swagger-typescript-api": patch
---

Restore `objectAssign` utility with es-toolkit to fix `codeGenConstructs` and `primitiveTypeConstructs` options. The lodash-to-es-toolkit migration (#1562) replaced `objectAssign` with `Object.assign`, which broke function-form arguments and deep merging. This restores both behaviors: functions are called with the current struct before merging, and nested properties are preserved via deep merge.
