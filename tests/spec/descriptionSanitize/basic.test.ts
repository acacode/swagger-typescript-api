import * as fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { generateApi } from "../../../src/index.js";

describe("descriptionSanitize", async () => {
  let tmpdir = "";

  beforeAll(async () => {
    tmpdir = await fs.mkdtemp(path.join(os.tmpdir(), "swagger-typescript-api"));
  });

  afterAll(async () => {
    await fs.rm(tmpdir, { recursive: true });
  });

  test("route description with JSDoc terminator is escaped", async () => {
    await generateApi({
      // Use defaults to generate single Api.ts with client and docs
      input: path.resolve(import.meta.dirname, "schema.yml"),
      output: tmpdir,
      silent: true,
    });

    const content = await fs.readFile(path.join(tmpdir, "Api.ts"), {
      encoding: "utf8",
    });

    // Ensure the potentially dangerous sequence is escaped inside JSDoc
    expect(content).toContain(
      "@description Get service point file of all Nordic countries (SE,FI,DK,NO) from S3 storage.",
    );
    expect(content).toContain("**\\/information** endpoint");

    // And ensure the raw terminator never appears inside the block
    expect(content).not.toMatch(/\*\*\//); // "**/" shouldn't be present
  });
});
