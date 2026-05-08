import * as fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { generateApi } from "../../../src/index.js";

/**
 * Reproduces https://github.com/acacode/swagger-typescript-api/issues/893
 *
 * When type is specified as array (e.g. type: ["array"] or type: ["null", "array"]),
 * the generator produced any[] instead of the typed array from items.
 * With type: "array" (single value) it works. OpenAPI 3.1 uses type arrays for
 * nullable: type: ["array", "null"] since nullable was removed.
 */
describe("issue-893", async () => {
  let tmpdir = "";

  beforeAll(async () => {
    tmpdir = await fs.mkdtemp(path.join(os.tmpdir(), "swagger-typescript-api"));
  });

  afterAll(async () => {
    await fs.rm(tmpdir, { recursive: true });
  });

  test("type [array] with items enum generates typed array not any[]", async () => {
    await generateApi({
      fileName: "schema",
      input: path.resolve(import.meta.dirname, "schema.json"),
      output: tmpdir,
      silent: true,
      generateClient: false,
    });

    const content = await fs.readFile(path.join(tmpdir, "schema.ts"), {
      encoding: "utf8",
    });

    // Bug #893: type: ["array"] with items enum should be ("DEBUG" | "EDIT")[], not any[]
    expect(content).toContain('"DEBUG"');
    expect(content).toContain('"EDIT"');
    expect(content).not.toMatch(/export type WithTypeArrayOnly = any\[\];/);
    expect(content).toMatchSnapshot();
  });

  test("type [array, null] with items generates typed array | null not any[]", async () => {
    await generateApi({
      fileName: "schema",
      input: path.resolve(import.meta.dirname, "schema.json"),
      output: tmpdir,
      silent: true,
      generateClient: false,
    });

    const content = await fs.readFile(path.join(tmpdir, "schema.ts"), {
      encoding: "utf8",
    });

    // type: ["array", "null"] with items should preserve item types
    expect(content).toMatch(
      /export type WithTypeArrayAndNull = .*null.*DEBUG.*EDIT.*\[\]|.*\[\].*null/,
    );
    expect(content).not.toMatch(
      /export type WithTypeArrayAndNull = null \| any\[\];/,
    );
  });

  test("type [array] with object items generates typed array not any[]", async () => {
    await generateApi({
      fileName: "schema",
      input: path.resolve(import.meta.dirname, "schema.json"),
      output: tmpdir,
      silent: true,
      generateClient: false,
    });

    const content = await fs.readFile(path.join(tmpdir, "schema.ts"), {
      encoding: "utf8",
    });

    // type: ["array"] with items: object should generate array of that object type, not any[]
    expect(content).not.toMatch(
      /export type WithTypeArrayObjectItems = any\[\];/,
    );
    expect(content).toContain("WithTypeArrayObjectItems");
  });
});
