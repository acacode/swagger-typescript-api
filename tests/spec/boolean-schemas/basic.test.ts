import * as fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { generateApi } from "../../../src/index.js";

describe("boolean schemas", () => {
  let tmpdir = "";

  beforeAll(async () => {
    tmpdir = await fs.mkdtemp(path.join(os.tmpdir(), "swagger-typescript-api"));
  });

  afterAll(async () => {
    await fs.rm(tmpdir, { recursive: true });
  });

  test("maps boolean schemas at component and nested positions", async () => {
    const output = await generateApi({
      fileName: "schema.ts",
      input: path.resolve(import.meta.dirname, "schema.yaml"),
      output: tmpdir,
      silent: true,
    });

    const content = output.files[0]?.fileContent;

    expect(content).toContain("export type AnyValue = any;");
    expect(content).toContain("export type NoValue = never;");
    expect(content).toMatch(/anyValue\??: any/);
    expect(content).toMatch(/noValue\??: never/);
    expect(content).toContain("export type ArrayOfNoValues = never[];");
  });
});
