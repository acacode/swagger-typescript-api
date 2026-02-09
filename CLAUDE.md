# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

swagger-typescript-api generates TypeScript API clients (Fetch or Axios) from OpenAPI 2.0/3.0 specifications. It works as both a CLI tool (`sta generate` / `swagger-typescript-api generate`) and a library (`generateApi()`). The package outputs dual ESM/CJS formats.

## Common Commands

```bash
bun install --frozen-lockfile                   # Install dependencies
bun run build                                   # Build with tsdown (dist/index.mjs, dist/index.cjs, dist/cli.mjs, dist/cli.cjs)
bun run test                                    # Run all tests (vitest, 30s timeout)
bun run test -- tests/simple.test.ts            # Run a specific test file
bun run test -- tests/spec/axios/basic.test.ts  # Run a single spec test
bun run test -- -t "axios"                      # Run tests matching a name pattern
bun run test -- --update                        # Update snapshots
bun run lint                                    # Lint with biome check
bun run format                                  # Format with biome format --write
bun run format:check                            # Check formatting
```

## Architecture

### Code Generation Pipeline (CodeGenProcess.start)

1. **Template resolution** — `TemplatesWorker` loads templates from `templates/base/`, `templates/default/` (or `templates/modular/`), and optional custom templates. Priority: custom > base > original.
2. **Schema fetching** — `SwaggerSchemaResolver` loads specs from file/URL/inline, supports JSON and YAML.
3. **Swagger 2→3 conversion** — Swagger 2.0 specs are converted to OpenAPI 3.0 via `swagger2openapi`.
4. **Component registration** — `SchemaComponentsMap` registers all `#/components/schemas/*` entries with discriminators and enums sorted first.
5. **Schema parsing** — `SchemaParserFabric` creates type-specific parsers (`MonoSchemaParser` subclasses in `src/schema-parser/base-schema-parsers/` and `complex-schema-parsers/`). Each parser handles one type: enum, object, array, primitive, discriminator, oneOf, anyOf, allOf, not.
6. **Route parsing** — `SchemaRoutes` (`src/schema-routes/schema-routes.ts`) walks all paths/methods to create `ParsedRoute` objects with request/response types, parameters, and module grouping.
7. **Template rendering** — Eta engine renders `.ejs` templates. Templates use `includeFile()` with path prefixes (`@base/`, `@default/`, `@modular/`, `@custom/`).
8. **Formatting** — `CodeFormatter` removes unused imports via TypeScript LanguageService, then formats with Biome.
9. **Optional JS translation** — `JavascriptTranslator` compiles TS output to JS + `.d.ts` using the TypeScript compiler API.

### Key Entry Points

- `index.ts` (root) — CLI entry point using citty
- `src/index.ts` — Library entry, exports `generateApi()`, `generateTemplates()`, constants
- `src/code-gen-process.ts` — Main orchestrator class
- `src/configuration.ts` — `CodeGenConfig` with all options and `Ts` code generation constructs
- `types/index.ts` — All public TypeScript type definitions

### Extension Points

- **13 lifecycle hooks** — `onInit`, `onCreateComponent`, `onPreParseSchema`, `onParseSchema`, `onCreateRoute`, `onPrepareConfig`, `onFormatTypeName`, `onFormatRouteName`, `onCreateRouteName`, `onCreateRequestParams`, `onPreBuildRoutePath`, `onBuildRoutePath`, `onInsertPathParam`
- **Custom schema parsers** — Override via `config.schemaParsers` with `MonoSchemaParser` subclasses
- **Custom templates** — User-provided templates override by matching filename
- **Code generation constructs** — `codeGenConstructs` option overrides TS primitives (`ArrayType`, `UnionType`, `IntersectionType`, `RecordType`, etc.)
- **Patchable instances** — `PATCHABLE_INSTANCES` in `CodeGenProcess` allows cross-instance injection

### Template System

Templates live in `templates/` with three tiers:

- `base/` — Shared templates (data-contracts, http-client, route-docs, jsdoc)
- `default/` — Single-file output mode (api.ejs, procedure-call.ejs, route-types.ejs)
- `modular/` — Multi-file output mode (`--modular` flag, generates separate files per route module)

Templates receive `it.config`, `it.modelTypes`, `it.routes`, `it.utils` as context variables.

### Test Structure

- `tests/simple.test.ts` — Snapshot tests running all fixture schemas (v2.0 + v3.0) with basic options
- `tests/extended.test.ts` — Same schemas with all extraction options enabled
- `tests/spec/{feature}/basic.test.ts` — 44 feature-specific tests, each with its own schema.json and snapshot
- Tests call `generateApi()`, read output files, and compare against vitest snapshots

## Technical Details

- **Package manager:** Bun
- **Module system:** ESM (`"type": "module"`)
- **Build:** tsdown (esbuild-based, outputs ESM + CJS with `.d.ts`)
- **Node requirement:** >=20
- **Linting/Formatting:** Biome (not ESLint/Prettier)
- **Config file support:** `swagger-typescript-api.config.{ts,js,json}` via c12
- **CI:** Tests across Node 20, 22, 24, 25; format check → build → test

## Style Guide

### Formatting

Biome handles all formatting. Do not manually adjust formatting — run `bun run format` and accept the result. Key settings (via `.editorconfig`): 2-space indentation, LF line endings, UTF-8 encoding.

### Imports

- Use `import type` for type-only imports. Keep type imports separate from value imports.
- Use namespace imports (`import * as`) for Node.js built-in modules.
- Use named imports for specific utilities from libraries.
- All relative imports must include the `.js` extension (ESM requirement, even for `.ts` source files).
- Order: Node builtins first, then external packages, then internal modules. Biome enforces this.

```typescript
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { compact, merge } from "es-toolkit";
import type { GenerateApiConfiguration } from "../types/index.js";
import { CodeFormatter } from "./code-formatter.js";
```

### Utilities

- Use `es-toolkit` (and `es-toolkit/compat`) instead of lodash. The `createLodashCompat()` function exists only for backwards compatibility in templates — do not use it in source code.
- Use `consola` for all logging (`consola.info`, `consola.debug`, `consola.warn`, `consola.success`). Do not use `console.log`.

### Comments

- Avoid comments that restate the type signature or function name. A comment like `/** Returns the schema */` on `getSchema()` adds no value.
- Use comments to explain _why_, not _what_. If the code is doing something non-obvious or working around a known issue, explain the reasoning.
- When documentation seems redundant with the type signature, it is still acceptable in broadly-used public API surfaces.

### Defensive Practices

- Prefer `unknown` over `any`. Use `any` only when interfacing with untyped external APIs where `unknown` would require excessive casting.
- Avoid `@ts-ignore` — use `@ts-expect-error` with the specific error code instead, so the suppression breaks when the underlying issue is fixed.
- Avoid catch-all pattern matches. Prefer exhaustive handling to enable compiler warnings when new variants are added.
- Use labeled arguments (object parameters) for functions with multiple parameters of the same type to prevent argument transposition.
- Annotate the types of ignored return values to catch signature changes at compile time.

## Commit Messages

Do **not** use Conventional Commits format (e.g., `feat:`, `fix:`, `chore:`).

- Use imperative mood: "Add feature" not "Added feature" or "Adds feature"
- Focus on **what** changed, not implementation details
- Keep the subject line under 72 characters
- Do not start with "This commit..." or "I changed..."

Good: `Add retry logic for failed API calls`
Bad: `feat: add retry logic`

## Pull Requests

PR titles follow the same rules as commit messages (no Conventional Commits, imperative mood).

PR descriptions should be detailed enough that a reader can understand the change without external context. Include:

- **Problem**: Define the issue clearly. Describe symptoms (errors, crashes, performance degradation) that justify the change.
- **Solution**: Explain the approach taken and why it was chosen over alternatives.
- **Verification**: How to test the change. Include specific steps or evidence (screenshots, metrics).
- **Performance claims**: Back up with concrete numbers (before/after benchmarks).

Keep descriptions self-contained. When linking to issues or discussions, summarize the relevant points rather than relying on the reader to follow links.

### Reduce reviewer cognitive load

- Break large changes into smaller, focused PRs that each address a single concern.
- Structure commits to tell a story: each commit should be a logical, reviewable unit.
- If a PR requires significant context, add inline comments on your own diff to guide the reviewer through complex sections.
