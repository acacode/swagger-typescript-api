import * as fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { generateApi } from "../../../src/index.js";

/**
 * Covers the case when the original Swagger 2 schema has path keys that include basePath
 * (e.g. "/base/v1/export" stored as "/base" + "/v1/export").
 * The converter may output paths without basePath; routeWithBase lookup ensures we still
 * find the operation's produces and generate Blob for binary response type.
 */
describe("binary-produces-base-path-with-extracts", async () => {
  let tmpdir = "";

  beforeAll(async () => {
    tmpdir = await fs.mkdtemp(path.join(os.tmpdir(), "swagger-typescript-api"));
  });

  afterAll(async () => {
    await fs.rm(tmpdir, { recursive: true });
  });

  test("binary export with path including basePath generates Blob response type", async () => {
    await generateApi({
      fileName: "schema",
      input: path.resolve(import.meta.dirname, "schema.json"),
      output: tmpdir,
      silent: true,
      generateClient: true,
      extractResponseBody: true,
      extractResponses: true,
      extractEnums: true,
      extractRequestParams: true,
    });

    const content = await fs.readFile(path.join(tmpdir, "schema.ts"), {
      encoding: "utf8",
    });

    expect(content).toMatchSnapshot();
    expect(content).toContain("this.request<Blob, ErrorResponse>({");
    expect(content).toMatch(/getBinaryExport[\s\S]*?this\.request<Blob,/);
  });
});
