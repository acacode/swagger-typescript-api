import * as fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { generateApi } from "../../../src/index.js";

/**
 * Regression test for https://github.com/acacode/swagger-typescript-api/issues/394
 *
 * With required properties in a schema that uses allOf (e.g. BaseEntity with
 * required: ["id"] and allOf: [BaseEntityWithoutId]), the generator used to
 * produce duplicate interfaces: `{ id: number } & { id: number }` instead of
 * `BaseEntityWithoutId & { id: number }`. This test ensures the fix is not reverted.
 */
describe("issue-394", async () => {
  let tmpdir = "";

  beforeAll(async () => {
    tmpdir = await fs.mkdtemp(path.join(os.tmpdir(), "swagger-typescript-api"));
  });

  afterAll(async () => {
    await fs.rm(tmpdir, { recursive: true });
  });

  test("allOf with required properties does not produce duplicate type intersection", async () => {
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

    // Bug #394: BaseEntity was generated as { id: number } & { id: number }
    expect(content).toContain("BaseEntityWithoutId");
    expect(content).not.toMatch(
      /\{\s*id:\s*number\s*\}\s*&\s*\{\s*id:\s*number\s*\}/,
    );
    expect(content).toMatchSnapshot();
  });
});
