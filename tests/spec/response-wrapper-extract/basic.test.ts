import * as fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { generateApi } from "../../../src/index.js";

const extractOptions = {
  extractRequestBody: true,
  extractRequestParams: true,
  extractResponses: true,
  extractResponseError: true,
  extractResponseBody: true,
  extractEnums: true,
  generateClient: true,
} as const;

async function generateToString(input: string, outDir: string) {
  await generateApi({
    fileName: "client",
    input,
    output: outDir,
    silent: true,
    ...extractOptions,
  });
  return fs.readFile(path.join(outDir, "client.ts"), { encoding: "utf8" });
}

describe("response-wrapper-extract", () => {
  let tmpdir = "";

  beforeAll(async () => {
    tmpdir = await fs.mkdtemp(path.join(os.tmpdir(), "swagger-typescript-api"));
  });

  afterAll(async () => {
    await fs.rm(tmpdir, { recursive: true });
  });

  const assertContract = (content: string, schemaLabel: string) => {
    expect(content, schemaLabel).toMatch(
      /export interface GetFluffiesToMergeData \{[^}]*id\??\s*:\s*string/s,
    );
    expect(content, schemaLabel).toMatch(
      /export interface GetFluffiesToMergeResponse \{[^}]*data\??\s*:\s*GetFluffiesToMergeData\[\]/s,
    );
    expect(content, schemaLabel).toMatch(
      /export interface MergeFluffyData \{[^}]*fluffies\??\s*:\s*string\[\]/s,
    );
    expect(content, schemaLabel).toMatch(
      /export interface MergeFluffyResponse \{[^}]*errors\??\s*:\s*string\[\]/s,
    );

    expect(content, schemaLabel).not.toMatch(
      /export type MergeFluffyData\s*=\s*MergeFluffyResponse/,
    );

    expect(content, schemaLabel).toMatch(
      /getFluffiesToMerge:[\s\S]*?this\.request<GetFluffiesToMerge(Result|Response)/,
    );
    expect(content, schemaLabel).not.toMatch(
      /getFluffiesToMerge:[\s\S]*?this\.request<GetFluffiesToMergeData[,>]/,
    );

    expect(content, schemaLabel).toMatch(
      /mergeFluffy:[\s\S]*?this\.request<MergeFluffy(Result|Response)/,
    );
    expect(content, schemaLabel).not.toMatch(
      /mergeFluffy:[\s\S]*?this\.request<MergeFluffyData[,>]/,
    );
  };

  test("Swagger 2.0: no schema overwrite; 200 types follow wrapper $ref", async () => {
    const dir = path.join(tmpdir, "v2");
    await fs.mkdir(dir, { recursive: true });
    const content = await generateToString(
      path.resolve(import.meta.dirname, "schema-v2.json"),
      dir,
    );
    assertContract(content, "v2");
  });

  test("OpenAPI 3: same contract via content.schema.$ref", async () => {
    const dir = path.join(tmpdir, "v3");
    await fs.mkdir(dir, { recursive: true });
    const content = await generateToString(
      path.resolve(import.meta.dirname, "schema-v3.json"),
      dir,
    );
    assertContract(content, "v3");
  });
});
