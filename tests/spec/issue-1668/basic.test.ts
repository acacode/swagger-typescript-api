import * as fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { generateApi } from "../../../src/index.js";

/**
 * Reproduces https://github.com/acacode/swagger-typescript-api/issues/1668
 *
 * When several paths share the same generated operation name suffix, output order
 * must not depend on `paths` key insertion order (YAML parse / $ref resolve).
 */
describe("issue-1668", async () => {
  let tmpdir = "";

  beforeAll(async () => {
    tmpdir = await fs.mkdtemp(path.join(os.tmpdir(), "swagger-typescript-api"));
  });

  afterAll(async () => {
    await fs.rm(tmpdir, { recursive: true });
  });

  test("repeated generation yields identical output", async () => {
    const runDir = path.join(tmpdir, "1668-run");
    await fs.mkdir(runDir, { recursive: true });

    const options = {
      fileName: "client",
      input: path.resolve(import.meta.dirname, "schema.yaml"),
      output: runDir,
      silent: true,
      singleHttpClient: true,
      extractRequestParams: true,
      extractRequestBody: true,
      extractResponseBody: true,
      extractResponseError: true,
      extractEnums: true,
      sortTypes: true,
      sortRoutes: true,
      cleanOutput: true,
    } as const;

    const contents: string[] = [];
    for (let i = 0; i < 5; i++) {
      await generateApi({ ...options });
      const content = await fs.readFile(path.join(runDir, "client.ts"), {
        encoding: "utf8",
      });
      contents.push(content);
    }

    const first = contents[0];
    for (let i = 1; i < contents.length; i++) {
      expect(contents[i]).toBe(first);
    }
  });

  test("to match snapshot", async () => {
    const snapDir = path.join(tmpdir, "1668-snap");
    await fs.mkdir(snapDir, { recursive: true });

    await generateApi({
      fileName: "client",
      input: path.resolve(import.meta.dirname, "schema.yaml"),
      output: snapDir,
      silent: true,
      singleHttpClient: true,
      extractRequestParams: true,
      extractRequestBody: true,
      extractResponseBody: true,
      extractResponseError: true,
      extractEnums: true,
      sortTypes: true,
      sortRoutes: true,
      cleanOutput: true,
    });

    const content = await fs.readFile(path.join(snapDir, "client.ts"), {
      encoding: "utf8",
    });

    expect(content).toMatchSnapshot();
  });
});
