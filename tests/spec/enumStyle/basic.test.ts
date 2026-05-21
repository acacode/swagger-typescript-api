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

  test("const-object-enums", async () => {
    await generateApi({
      fileName: "schema",
      input: path.resolve(import.meta.dirname, "schema.json"),
      output: tmpdir,
      silent: true,
      enumStyle: "const",
      cleanOutput: false,
      modular: false,
      patch: true,
      typeSuffix: "_TYPE_SUFFIX",
      singleHttpClient: true,
      extractRequestBody: true,
      extractRequestParams: false,
      extractResponseBody: true,
      extractResponseError: true,
      extractResponses: true,
      generateResponses: true,
      generateClient: false,
      addReadonly: true,
      moduleNameFirstTag: true,
      sortTypes: true,
    });

    const content = await fs.readFile(path.join(tmpdir, "schema.ts"), {
      encoding: "utf8",
    });

    expect(content).toMatchSnapshot();
  });

  test("union-enums-http-client", async () => {
    await generateApi({
      fileName: "schema-union",
      input: path.resolve(import.meta.dirname, "schema.json"),
      output: tmpdir,
      silent: true,
      enumStyle: "union",
      cleanOutput: false,
      modular: false,
    });

    const content = await fs.readFile(path.join(tmpdir, "schema-union.ts"), {
      encoding: "utf8",
    });

    expect(content).toMatchSnapshot();
  });
});
