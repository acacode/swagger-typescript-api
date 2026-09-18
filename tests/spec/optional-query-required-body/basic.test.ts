import * as fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { generateApi } from "../../../src/index.js";

describe("optional-query-required-body", async () => {
  let tmpdir = "";

  beforeAll(async () => {
    tmpdir = await fs.mkdtemp(path.join(os.tmpdir(), "swagger-typescript-api"));
  });

  afterAll(async () => {
    await fs.rm(tmpdir, { recursive: true });
  });

  test("with --extract-request-params, query stays before body in generated signature", async () => {
    await generateApi({
      fileName: "schema",
      input: path.resolve(import.meta.dirname, "schema.json"),
      output: tmpdir,
      silent: true,
      extractRequestParams: true,
      extractRequestBody: true,
    });

    const content = await fs.readFile(path.join(tmpdir, "schema.ts"), {
      encoding: "utf8",
    });

    // The signature must read (query, body, params) — NOT (body, query, params).
    // The optional query arg has a defaultValue ({}) and must keep its
    // declaration position even though it is sorted after required args.
    // Default template nests operation under a namespace object, so the call
    // arrow appears as `<operation>: (args) =>` rather than `= (args) =>`.
    const sigMatch = content.match(
      /checkImpact:\s*\(\s*([\s\S]*?)\s*\)\s*=>\s*this\.request/,
    );
    expect(sigMatch, "checkImpact arrow not found in schema.ts").not.toBeNull();
    const signature = sigMatch![1];

    const queryPos = signature.indexOf("query");
    const dataPos = signature.search(/\bdata\b/);
    expect(queryPos).toBeGreaterThanOrEqual(0);
    expect(dataPos).toBeGreaterThan(0);
    expect(queryPos).toBeLessThan(dataPos);

    // The optional query arg must keep a defaultValue (`= {}`) so callers can
    // omit it while it stays in its declared position before the required body.
    expect(signature).toMatch(/query:\s*CheckImpactParams\s*=\s*\{\}/);

    // Lock the entire generated file so future template changes can't silently
    // regress argument ordering.
    expect(content).toMatchSnapshot();
  });
});
