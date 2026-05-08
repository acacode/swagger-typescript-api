import * as fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { generateApi } from "../../../src/index.js";

describe("issue-1433", async () => {
  let tmpdir = "";

  beforeAll(async () => {
    tmpdir = await fs.mkdtemp(path.join(os.tmpdir(), "swagger-typescript-api"));
  });

  afterAll(async () => {
    await fs.rm(tmpdir, { recursive: true });
  });

  test("path-only route with extractRequestParams matches snapshot", async () => {
    await generateApi({
      fileName: "schema",
      input: path.resolve(import.meta.dirname, "schema.yaml"),
      output: tmpdir,
      silent: true,
      extractRequestParams: true,
      extractRequestBody: true,
      extractResponseBody: true,
      extractResponses: true,
    });

    const content = await fs.readFile(path.join(tmpdir, "schema.ts"), {
      encoding: "utf8",
    });

    expect(content).toMatchSnapshot();
  });

  test("contract.yaml matches codegen snapshot", async () => {
    await generateApi({
      fileName: "contract",
      input: path.resolve(import.meta.dirname, "contract.yaml"),
      output: tmpdir,
      silent: true,
      extractRequestParams: true,
      extractRequestBody: true,
      extractResponseBody: true,
      extractResponses: true,
    });

    const content = await fs.readFile(path.join(tmpdir, "contract.ts"), {
      encoding: "utf8",
    });

    expect(content).toMatchSnapshot();
  });

  test("contract-valid.yaml (derived from upstream) matches codegen snapshot", async () => {
    await generateApi({
      fileName: "contract-valid",
      input: path.resolve(import.meta.dirname, "contract-valid.yaml"),
      output: tmpdir,
      silent: true,
      extractRequestParams: true,
      extractRequestBody: true,
      extractResponseBody: true,
      extractResponses: true,
    });

    const content = await fs.readFile(path.join(tmpdir, "contract-valid.ts"), {
      encoding: "utf8",
    });

    expect(content).toMatchSnapshot();
  });

  test("contract-upstream.yaml parses with minimal extractRequestParams config", async () => {
    const output = await generateApi({
      input: path.resolve(import.meta.dirname, "contract-upstream.yaml"),
      output: tmpdir,
      extractRequestParams: true,
      silent: true,
    });

    expect(output.files[0]?.fileContent).toMatchSnapshot();
  });
});
