import * as fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { generateApi } from "../../../src/index.js";

// Regression tests for issue #1724: two OpenAPI schemas whose raw names
// normalize to the same TypeScript identifier (e.g. `Foo_Bar` and `FooBar`
// both yield `FooBar` via `startCase` + whitespace-strip) used to emit two
// `export interface FooBar` declarations.

describe("name-collision", async () => {
  let tmpdir = "";

  beforeAll(async () => {
    tmpdir = await fs.mkdtemp(path.join(os.tmpdir(), "swagger-typescript-api"));
  });

  afterAll(async () => {
    await fs.rm(tmpdir, { recursive: true });
  });

  const generate = async (
    fileName: string,
    schema: string,
    overrides: Partial<Parameters<typeof generateApi>[0]> = {},
  ) => {
    await generateApi({
      fileName,
      input: path.resolve(import.meta.dirname, schema),
      output: tmpdir,
      silent: true,
      generateClient: false,
      ...overrides,
    });
    return fs.readFile(path.join(tmpdir, `${fileName}.ts`), {
      encoding: "utf8",
    });
  };

  const countOccurrences = (haystack: string, needle: string) =>
    haystack.split(needle).length - 1;

  test("basic collision: Foo_Bar + FooBar get disambiguated", async () => {
    const content = await generate("basic", "schema-basic.json");

    // Exactly one `export interface FooBar` and one `export interface FooBar1`.
    expect(countOccurrences(content, "export interface FooBar ")).toBe(1);
    expect(countOccurrences(content, "export interface FooBar1 ")).toBe(1);

    // No other suffixed variants.
    expect(content).not.toMatch(/export interface FooBar2\b/);

    // Generated output type-checks under declaration-merging rules — the two
    // interfaces having different `kind` literal types would produce TS2717
    // if they had collapsed to the same name.
    expect(content).toMatch(/kind: "legacy"/);
    expect(content).toMatch(/kind: "modern"/);
  });

  test("pre-existing suffix: Foo_Bar + FooBar + FooBar1 all preserved (natural order)", async () => {
    // Source order `Foo_Bar`, `FooBar`, `FooBar1`. `precommitCanonicalNames`
    // pre-claims both canonical names (`FooBar`, `FooBar1`) before the parser
    // runs, so the non-canonical `Foo_Bar` suffix-loops to the first free
    // slot (`FooBar2`) on its first `format()` call. User-declared canonical
    // names are preserved and route references stay consistent.
    const content = await generate("prenumbered", "schema-prenumbered.json");

    expect(countOccurrences(content, "export interface FooBar ")).toBe(1);
    expect(countOccurrences(content, "export interface FooBar1 ")).toBe(1);
    expect(countOccurrences(content, "export interface FooBar2 ")).toBe(1);
    expect(content).not.toMatch(/export interface FooBar3\b/);
    expect(content).not.toMatch(/export interface FooBar11\b/);
  });

  test("pre-existing suffix: reversed source order produces the same result", async () => {
    // Same three schemas in reverse order. Because all canonicals are pre-
    // claimed upfront (before any parser `format()` call), the outcome is
    // source-order independent: `FooBar` and `FooBar1` are always preserved;
    // `Foo_Bar` is the one that gets suffixed to `FooBar2`.
    const content = await generate(
      "prenumbered-reversed",
      "schema-prenumbered-reversed.json",
    );

    expect(countOccurrences(content, "export interface FooBar ")).toBe(1);
    expect(countOccurrences(content, "export interface FooBar1 ")).toBe(1);
    expect(countOccurrences(content, "export interface FooBar2 ")).toBe(1);
    expect(content).not.toMatch(/export interface FooBar3\b/);
    expect(content).not.toMatch(/export interface FooBar11\b/);
  });

  test("hook interaction: onFormatTypeName collisions are also disambiguated", async () => {
    const content = await generate("hook", "schema-hook.json", {
      hooks: {
        // Force both Alpha and Beta through the same formatted name.
        onFormatTypeName: () => "Shared",
      },
    });

    // Both schemas produce the same hook-returned name, so the second one
    // is suffixed.
    expect(countOccurrences(content, "export interface Shared ")).toBe(1);
    expect(countOccurrences(content, "export interface Shared1 ")).toBe(1);
  });

  test("multiple canonicals with non-canonical sharing the base: non-canonical suffixes past all canonicals", async () => {
    // Source order `FooBar`, `Foo_Bar`, `FooBar1`, `FooBar2`. All three
    // canonical names are pre-claimed up front, so when the non-canonical
    // `Foo_Bar` is first formatted, the suffix loop skips `FooBar1` and
    // `FooBar2` and lands on `FooBar3`. All user-declared canonical names
    // are preserved; each interface's unique property confirms identity.
    const content = await generate(
      "multiple-canonicals",
      "schema-multiple-canonicals.json",
    );

    expect(content).toMatch(/export interface FooBar\s*{\s*fromFooBar:/);
    expect(content).toMatch(/export interface FooBar1\s*{\s*fromFooBar1:/);
    expect(content).toMatch(/export interface FooBar2\s*{\s*fromFooBar2:/);
    expect(content).toMatch(
      /export interface FooBar3\s*{\s*fromFooUnderscoreBar:/,
    );

    // Exactly four interfaces, no duplicate declarations.
    expect(countOccurrences(content, "export interface FooBar ")).toBe(1);
    expect(countOccurrences(content, "export interface FooBar1 ")).toBe(1);
    expect(countOccurrences(content, "export interface FooBar2 ")).toBe(1);
    expect(countOccurrences(content, "export interface FooBar3 ")).toBe(1);
    expect(content).not.toMatch(/export interface FooBar4\b/);
  });

  test("repeat reference: same raw schema used multiple times keeps one identifier", async () => {
    const content = await generate("cached", "schema-cached.json");

    // `Dog` is referenced from three endpoints (one directly, one as-is, one
    // via an array). The generator must produce exactly one `Dog` interface,
    // never suffixing because the raw name is identical across calls.
    expect(countOccurrences(content, "export interface Dog ")).toBe(1);
    expect(content).not.toMatch(/export interface Dog1\b/);
  });

  test("route references stay consistent with definitions when collisions are suffixed", async () => {
    // Generate a client so inline route-handler types exercise `format()`
    // during schema-parsing Phase 1 — before `prepareModelType` captures the
    // definition names. Without pre-committing canonical names, the earlier
    // Phase 1 calls would stash a pre-collision name and the route would
    // point to the wrong schema. Asserts that each route's generic parameter
    // matches the actual definition shape by checking the property name.
    const content = await generate("route-refs", "schema-prenumbered.json", {
      generateClient: true,
    });

    // Extract each route's response type from the source and confirm it
    // matches the schema shape with the corresponding unique property.
    const findResponseType = (pathFragment: string) => {
      const routeMatch = content.match(
        new RegExp(`path:\\s*\`[^\`]*${pathFragment}[^\`]*\`[^}]*?`, "s"),
      );
      if (!routeMatch) throw new Error(`route ${pathFragment} not found`);
      const preceding = content.slice(0, routeMatch.index);
      const genericMatch = preceding.match(/request<(\w+),[^>]*>\(\{\s*$/);
      return genericMatch?.[1];
    };

    // Foo_Bar schema (unique property `a`) is suffixed; its route must point
    // to the suffixed name — not the pre-collision bare `FooBar`.
    const typeForPathA = findResponseType("/a");
    expect(typeForPathA).toBeDefined();
    expect(content).toMatch(
      new RegExp(`export interface ${typeForPathA}\\s*{\\s*a:\\s*string`),
    );

    // FooBar and FooBar1 schemas keep their canonical names; routes match.
    const typeForPathB = findResponseType("/b");
    expect(typeForPathB).toBe("FooBar");
    expect(content).toMatch(/export interface FooBar\s*{\s*b:\s*string/);

    const typeForPathC = findResponseType("/c");
    expect(typeForPathC).toBe("FooBar1");
    expect(content).toMatch(/export interface FooBar1\s*{\s*c:\s*string/);
  });
});
