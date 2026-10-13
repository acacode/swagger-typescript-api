import * as fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { generateApi } from "../../../src/index.js";

/**
 * Reproduces https://github.com/acacode/swagger-typescript-api/issues/1833
 *
 * A colon inside a path segment (AIP-136 custom methods like
 * `/v1/items:search` or `/v1/items/{itemId}:archive`) was parsed as an
 * Express-style `:param` path parameter, producing a bogus required `string`
 * argument and dropping the `:suffix` from the request URL. Colon params are
 * only recognized at the start of a path segment, so `/users/:userId` keeps
 * working.
 */
describe("issue-1833", async () => {
  let tmpdir = "";

  beforeAll(async () => {
    tmpdir = await fs.mkdtemp(path.join(os.tmpdir(), "swagger-typescript-api"));
  });

  afterAll(async () => {
    await fs.rm(tmpdir, { recursive: true });
  });

  test("colon suffix inside a path segment is not a path param", async () => {
    await generateApi({
      fileName: "schema",
      input: path.resolve(import.meta.dirname, "schema.json"),
      output: tmpdir,
      silent: true,
      generateClient: true,
    });

    const content = await fs.readFile(path.join(tmpdir, "schema.ts"), {
      encoding: "utf8",
    });

    // `/v1/items:search` keeps the literal suffix and takes no path args
    expect(content).toContain("searchItems: (params: RequestParams = {}) =>");
    expect(content).toContain("path: `/v1/items:search`");

    // `/v1/items/{itemId}:archive` keeps the declared param and the suffix
    expect(content).toContain(
      "archiveItem: (itemId: string, params: RequestParams = {}) =>",
    );
    expect(content).toContain("path: `/v1/items/${itemId}:archive`");

    // Express-style `:param` at the start of a segment still works
    expect(content).toContain(
      "getPost: (userId: string, postId: string, params: RequestParams = {}) =>",
    );
    expect(content).toContain("path: `/users/${userId}/posts/${postId}`");
  });
});
