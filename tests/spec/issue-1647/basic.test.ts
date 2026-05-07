import * as fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { generateApi } from "../../../src/index.js";

/**
 * Reproduces https://github.com/acacode/swagger-typescript-api/issues/1647
 *
 * When an OpenAPI schema uses propertyNames (arbitrary keys matching a pattern),
 * the generated TypeScript type incorrectly uses Record<K, V> even when the
 * property is optional (not in required array). Expected: config?: Partial<Record<K, V>>.
 */
describe("issue-1647", async () => {
  let tmpdir = "";

  beforeAll(async () => {
    tmpdir = await fs.mkdtemp(path.join(os.tmpdir(), "swagger-typescript-api"));
  });

  afterAll(async () => {
    await fs.rm(tmpdir, { recursive: true });
  });

  test("optional propertyNames schema in request body uses Partial<Record> and optional field", async () => {
    await generateApi({
      fileName: "schema",
      input: path.resolve(import.meta.dirname, "schema.json"),
      output: tmpdir,
      silent: true,
      generateClient: false,
      extractRequestBody: true,
    });

    const content = await fs.readFile(path.join(tmpdir, "schema.ts"), {
      encoding: "utf8",
    });

    // Bug #1647: propertyNames + additionalProperties must generate Partial<Record<..., V>>,
    // not Record<K, V>, so optional keys are allowed. Optional property must stay optional.
    expect(content).toMatch(/Partial<Record<[^>]+,\s*string>>/);
    expect(content).not.toMatch(
      /config:\s*Record<[^>]+>\s*;/,
      "optional request body property must not be required Record<>",
    );
    expect(content).toMatch(/config\?:/);
  });

  test("to match snapshot", async () => {
    await generateApi({
      fileName: "schema",
      input: path.resolve(import.meta.dirname, "schema.json"),
      output: tmpdir,
      silent: true,
      generateClient: false,
      extractRequestBody: true,
    });

    const content = await fs.readFile(path.join(tmpdir, "schema.ts"), {
      encoding: "utf8",
    });

    expect(content).toMatchSnapshot();
  });
});
