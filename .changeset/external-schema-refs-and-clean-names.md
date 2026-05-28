---
"swagger-typescript-api": minor
---

Fix external file `$ref` resolution and add cleaner schema naming for split OpenAPI specs.

### Bug fixes

- Resolve external schema file refs (e.g. `./SidecarConfig.yaml`, `./models/sidecar-config.yaml`) without producing ghost types such as `SidecarConfigYaml` that were referenced in generated output but never exported.
- Treat path segments like `models`, `definitions`, and `.` as schema components instead of misclassifying them as OpenAPI component sections.
- Normalize type names derived from external filenames by stripping `.yaml`, `.yml`, and `.json` extensions.
- Unwrap file-only refs to external documents that contain a single entry under `components.schemas`.
- Deduplicate externally resolved components that share the same disambiguated type name, preventing repeated `export interface` declarations (e.g. multiple `NovaEntityNovaEntity`) and TypeScript merge conflicts.
- Recognize OpenAPI 3.1 `pathItems` as a valid `components` section when resolving JSON pointer segments.

### New option

- Add `preferExistingSchemaNamesForExternalRefs` (CLI: `--prefer-existing-schema-names-for-external-refs`).
  When enabled, if an external schema file name matches an existing local component name (e.g. `./Specification.yaml` → `Specification`), the generator reuses the local schema name instead of emitting redundant names like `SpecificationSpecification` or `NovaEntityNovaEntity`.
  Local `$ref`-only components are eagerly resolved before parsing.

### Tests

- Add `paths-2` regression tests for remote OpenAPI specs with relative cross-file refs (CICD Spec Manager fixture).
- Add `paths-2-prefer-existing-schema-names` tests for the new naming option, including strict TypeScript checks of generated snapshot output via `tsc`.
