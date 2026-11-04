import * as fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { generateApi } from "../../../src/index.js";

describe("not-empty-schema", async () => {
  let tmpdir = "";

  beforeAll(async () => {
    tmpdir = await fs.mkdtemp(path.join(os.tmpdir(), "swagger-typescript-api"));
  });

  afterAll(async () => {
    await fs.rm(tmpdir, { recursive: true });
  });

  const generate = async (emptyNotAsNever?: boolean) => {
    await generateApi({
      fileName: "schema",
      input: path.resolve(import.meta.dirname, "schema.json"),
      output: tmpdir,
      silent: true,
      generateClient: false,
      emptyNotAsNever,
    });

    return fs.readFile(path.join(tmpdir, "schema.ts"), { encoding: "utf8" });
  };

  test("generates never when emptyNotAsNever is on", async () => {
    const content = await generate(true);

    expect(content).toContain("externalId?: never;");
    expect(content).toContain("internalId?: never;");
    expect(content).toContain("removed?: never;");
    expect(content).toContain("status?: any;");
  });

  test("keeps generating any by default", async () => {
    const content = await generate();

    expect(content).toContain("externalId?: any;");
    expect(content).toContain("internalId?: any;");
    expect(content).toContain("removed?: any;");
    expect(content).toContain("status?: any;");
  });
});
