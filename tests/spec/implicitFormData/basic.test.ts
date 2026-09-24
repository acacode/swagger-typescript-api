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

  test("implicit FormData detection workaround", async () => {
    await generateApi({
      fileName: "schema",
      input: path.resolve(import.meta.dirname, "schema.json"),
      output: tmpdir,
      silent: true,
      generateClient: true,
      extractRequestBody: true,
      // map custom formats to test the workaround
      primitiveTypeConstructs: (struct) => ({
        ...struct,
        string: {
          "file-type-enum": "FileType", // Maps to FileType (should NOT trigger workaround)
          "custom-file": "File", // Maps to File (SHOULD trigger workaround)
          $default: "string",
        },
      }),
    });

    const content = await fs.readFile(path.join(tmpdir, "schema.ts"), {
      encoding: "utf8",
    });

    // This test verifies:
    // 1. Endpoints with file/binary types but without explicit multipart/form-data
    //    should correctly be detected as FormData (workaround applies)
    // 2. Endpoints with custom formats like "FileType" or component schemas
    //    with "File" in the name should NOT trigger the workaround
    //    (should remain JSON, not FormData)
    // 3. Endpoints with custom formats mapped to 'FileType' should NOT trigger
    //    the workaround (fixed: uses whole-word matching to avoid false positives)
    // 4. Endpoints with custom formats mapped to 'File' SHOULD trigger
    //    the workaround (correctly detects actual File types)
    expect(content).toMatchSnapshot();
  });
});
