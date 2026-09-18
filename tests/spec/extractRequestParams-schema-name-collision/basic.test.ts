import * as fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { generateApi } from "../../../src/index.js";

describe("extractRequestParams schema name collision", async () => {
  let tmpdir = "";

  beforeAll(async () => {
    tmpdir = await fs.mkdtemp(path.join(os.tmpdir(), "swagger-typescript-api"));
  });

  afterAll(async () => {
    await fs.rm(tmpdir, { recursive: true });
  });

  test("keeps the request body model when its name matches <operationId>Params", async () => {
    await generateApi({
      fileName: "schema",
      input: path.resolve(import.meta.dirname, "schema.json"),
      output: tmpdir,
      silent: true,
      extractRequestParams: true,
      extractRequestBody: true,
      extractResponseBody: true,
    });

    const content = await fs.readFile(path.join(tmpdir, "schema.ts"), {
      encoding: "utf8",
    });

    // The component schema `GetOrderParams` (the POST body) must survive intact...
    expect(content).toContain("export interface GetOrderParams {");
    expect(content).toContain("couponCode?: string;");
    // ...and the extracted route params must get a different name.
    expect(content).not.toContain(
      "export interface GetOrderParams {\n  storeId",
    );
    expect(content).toMatch(
      /getOrder: \(\s*\{ storeId \}: GetOrderParams\w+,\s*data: GetOrderParams,/,
    );
    // No duplicate declarations.
    expect(content.match(/^export interface GetOrderParams \{/gm)).toHaveLength(
      1,
    );

    expect(content).toMatchSnapshot();
  });
});
