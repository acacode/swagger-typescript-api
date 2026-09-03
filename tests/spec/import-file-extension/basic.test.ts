import * as fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { generateApi } from "../../../src/index.js";

describe("import-file-extension", async () => {
  let tmpdir = "";

  beforeAll(async () => {
    tmpdir = await fs.mkdtemp(path.join(os.tmpdir(), "swagger-typescript-api"));
  });

  afterAll(async () => {
    await fs.rm(tmpdir, { recursive: true });
  });

  const generate = async (
    fileName: string,
    options: Partial<Parameters<typeof generateApi>[0]>,
  ) => {
    await generateApi({
      fileName,
      input: path.resolve(import.meta.dirname, "schema.json"),
      output: tmpdir,
      silent: true,
      modular: true,
      cleanOutput: false,
      ...options,
    });
    return fs.readFile(path.join(tmpdir, "Api.ts"), { encoding: "utf8" });
  };

  test('appends ".js" to relative imports', async () => {
    const api = await generate("js-ext", { importFileExtension: ".js" });

    expect(api).toContain('from "./data-contracts.js"');
    expect(api).toContain('from "./http-client.js"');
  });

  test('appends ".ts" to relative imports', async () => {
    const api = await generate("ts-ext", { importFileExtension: ".ts" });

    expect(api).toContain('from "./data-contracts.ts"');
    expect(api).toContain('from "./http-client.ts"');
  });

  test("defaults to no extension when option is unset", async () => {
    const api = await generate("no-ext", {});

    expect(api).toContain('from "./data-contracts"');
    expect(api).toContain('from "./http-client"');
    expect(api).not.toContain("data-contracts.js");
    expect(api).not.toContain("data-contracts.ts");
  });

  test("emits whole-block type import for data-contracts when typeOnlyImports", async () => {
    const api = await generate("type-only", { typeOnlyImports: true });

    expect(api).toMatch(/import type \{[^}]*\} from "\.\/data-contracts"/);
  });

  test("marks type-only http-client specifiers inline, keeps HttpClient a value import", async () => {
    const api = await generate("type-only-http", { typeOnlyImports: true });

    const httpImport = api
      .split("\n")
      .find((line) => line.includes('from "./http-client"'));

    expect(httpImport).toBeDefined();
    expect(httpImport).toContain("type RequestParams");
    // HttpClient is a runtime class (extended/instantiated) - never type-only
    expect(httpImport).not.toContain("type HttpClient");
    expect(httpImport).not.toMatch(/import type \{/);
  });

  test("does not mark ContentType as type for runtime enum styles", async () => {
    const api = await generate("type-only-enum", {
      typeOnlyImports: true,
      enumStyle: "enum",
    });

    expect(api).not.toContain("type ContentType");
  });

  test("never imports ContentType as a runtime value for union enum style", async () => {
    const api = await generate("type-only-union", {
      typeOnlyImports: true,
      enumStyle: "union",
    });

    const httpImport = api
      .split("\n")
      .find((line) => line.includes('from "./http-client"'));

    expect(httpImport).toBeDefined();
    // In union mode ContentType is a pure type: procedure calls use string
    // literals instead, so it is either marked `type` or dropped as unused -
    // it must never appear as a bare runtime import.
    expect(httpImport).not.toMatch(/(?<!type )\bContentType\b/);
    // The mixed http-client import still marks the type-only specifiers inline.
    expect(httpImport).toContain("type RequestParams");
  });

  test("combines extension and type-only imports", async () => {
    const api = await generate("combined", {
      importFileExtension: ".js",
      typeOnlyImports: true,
    });

    expect(api).toMatch(/import type \{[^}]*\} from "\.\/data-contracts\.js"/);
    expect(api).toContain('from "./http-client.js"');
  });
});
