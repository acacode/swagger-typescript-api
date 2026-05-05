import * as fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { generateApi } from "../../../src/index.js";

describe("responses-refs-test single-file output", async () => {
  let tmpdir = "";

  beforeAll(async () => {
    tmpdir = await fs.mkdtemp(path.join(os.tmpdir(), "swagger-typescript-api"));
  });

  afterAll(async () => {
    await fs.rm(tmpdir, { recursive: true });
  });

  test("generates data contracts and HTTP client in one file", async () => {
    await generateApi({
      fileName: "responses-refs-test",
      input: path.resolve(import.meta.dirname, "schema.yaml"),
      output: tmpdir,
      silent: true,
      extractEnums: true,
      extractRequestBody: true,
      extractRequestParams: true,
      extractResponseBody: true,
      extractResponseError: true,
      extractResponses: true,
      generateClient: true,
      generateRouteTypes: false,
      sortTypes: true,
    });

    const content = await fs.readFile(path.join(tmpdir, "responses-refs-test.ts"), {
      encoding: "utf8",
    });

    expect(content).toMatchSnapshot();
  });
});
