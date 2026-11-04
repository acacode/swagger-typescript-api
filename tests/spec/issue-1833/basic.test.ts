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
      spec: {
        openapi: "3.0.3",
        info: { title: "Issue 1833", version: "1.0.0" },
        paths: {
          "/v1/items:search": {
            post: {
              operationId: "searchItems",
              responses: { "200": { description: "ok" } },
            },
          },
          "/v1/items/{itemId}:archive": {
            post: {
              operationId: "archiveItem",
              parameters: [
                {
                  name: "itemId",
                  in: "path",
                  required: true,
                  schema: { type: "string" },
                },
              ],
              responses: { "200": { description: "ok" } },
            },
          },
          "/v1/items:search/:search/:itemId:archive": {
            get: {
              operationId: "getArchivedSearch",
              responses: { "200": { description: "ok" } },
            },
          },
          "/users/:userId/posts/:postId": {
            get: {
              operationId: "getPost",
              responses: { "200": { description: "ok" } },
            },
          },
        },
      },
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

    expect(content).toContain(
      "path: `/v1/items:search/${search}/${itemId}:archive`",
    );

    // Express-style `:param` at the start of a segment still works
    expect(content).toContain(
      "getPost: (userId: string, postId: string, params: RequestParams = {}) =>",
    );
    expect(content).toContain("path: `/users/${userId}/posts/${postId}`");
  });

  test("legacy trailing-colon param stays consumed before a slash or route end", async () => {
    await generateApi({
      fileName: "trailing-colon",
      spec: {
        openapi: "3.0.3",
        info: { title: "Issue 1833", version: "1.0.0" },
        paths: {
          "/users/:id:": {
            get: {
              operationId: "getUser",
              responses: { "200": { description: "ok" } },
            },
          },
          "/api/:id:/x": {
            get: {
              operationId: "getThing",
              responses: { "200": { description: "ok" } },
            },
          },
        },
      },
      output: tmpdir,
      silent: true,
      generateClient: true,
    });

    const content = await fs.readFile(path.join(tmpdir, "trailing-colon.ts"), {
      encoding: "utf8",
    });

    // `/users/:id:` substitutes `${id}` and drops the delimiter colon
    expect(content).toContain(
      "getUser: (id: string, params: RequestParams = {}) =>",
    );
    expect(content).toContain("path: `/users/${id}`");

    // `/api/:id:/x` treats a trailing colon before `/` the same way
    expect(content).toContain(
      "getThing: (id: string, params: RequestParams = {}) =>",
    );
    expect(content).toContain("path: `/api/${id}/x`");
  });

  test("colon param at the start of a route without a leading slash", async () => {
    await generateApi({
      fileName: "no-leading-slash",
      spec: {
        openapi: "3.0.3",
        info: { title: "Issue 1833", version: "1.0.0" },
        paths: {
          "/api/:itemId/:item": {
            get: {
              operationId: "getItem",
              responses: { "200": { description: "ok" } },
            },
          },
        },
      },
      hooks: {
        onPreBuildRoutePath: (route) => route.replace(/^\/api\//, ""),
      },
      output: tmpdir,
      silent: true,
      generateClient: true,
    });

    const content = await fs.readFile(
      path.join(tmpdir, "no-leading-slash.ts"),
      { encoding: "utf8" },
    );

    expect(content).toContain(
      "getItem: (itemId: string, item: string, params: RequestParams = {}) =>",
    );
    expect(content).toContain("path: `${itemId}/${item}`");
  });
});
