import * as fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";

import { afterAll, beforeAll, describe, expect, test } from "vitest";

import { generateApi } from "../../../src/index.js";

describe("basic", async () => {
  let tmpdir = "";

  beforeAll(async () => {
    tmpdir = await fs.mkdtemp(path.join(os.tmpdir(), "swagger-typescript-api"));
  });

  afterAll(async () => {
    await fs.rm(tmpdir, { recursive: true });
  });

  test("requestBodyDescription", async () => {
    await generateApi({
      fileName: "schema",
      input: path.resolve(import.meta.dirname, "schema.yml"),
      output: tmpdir,
      silent: true,
      generateClient: false,
      generateRouteTypes: false,
      extractResponseBody: true,
      extractRequestParams: true,
      extractRequestBody: true,
      extractResponseError: true,
      extractResponses: true,
      extractEnums: true,
    });

    const content = await fs.readFile(path.join(tmpdir, "schema.ts"), {
      encoding: "utf8",
    });

    expect(content).toMatchSnapshot();
  });
});
