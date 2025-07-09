import * as fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";

import { afterAll, beforeAll, describe, expect, test } from "vitest";

import { generateApi } from "../../../src/index.js";

describe("operationId starting with number", async () => {
  let tmpdir: string;

  beforeAll(async () => {
    tmpdir = await fs.mkdtemp(path.join(os.tmpdir(), "swagger-typescript-api"));
  });

  afterAll(async () => {
    await fs.rm(tmpdir, { recursive: true });
  });

  test("should handle operationIds that start with numbers", async () => {
    await generateApi({
      fileName: "schema",
      input: path.resolve(import.meta.dirname, "schema.json"),
      output: tmpdir,
      silent: true,
      generateClient: true,
      generateRouteTypes: true,
    });

    const content = await fs.readFile(path.join(tmpdir, "schema.ts"), {
      encoding: "utf8",
    });

    // Should contain quoted property names for invalid identifiers
    expect(content).toContain('"123GetUser"');
    expect(content).toContain('"456CreatePost"');
    // Should not contain unquoted invalid identifiers
    expect(content).not.toContain("123GetUser:");
    expect(content).not.toContain("456CreatePost:");
    // Should be valid TypeScript (no syntax errors)
    expect(content).toMatchSnapshot();
  });
});
