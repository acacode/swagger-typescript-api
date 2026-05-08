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

  const generateSchema = async (
    schemaFileName: string,
    options: Partial<Parameters<typeof generateApi>[0]> = {},
  ) => {
    await generateApi({
      fileName: "schema",
      input: path.resolve(import.meta.dirname, schemaFileName),
      output: tmpdir,
      silent: true,
      addReadonly: true,
      generateClient: false,
      ...options,
    });

    return fs.readFile(path.join(tmpdir, "schema.ts"), {
      encoding: "utf8",
    });
  };

  test("local-fragment-ref", async () => {
    const content = await generateSchema("schema.yaml");

    expect(content).toMatchSnapshot();
  });

  test("local-fragment-ref swagger 2 definitions", async () => {
    const content = await generateSchema("schema-swagger2.yaml");

    expect(content).toMatchSnapshot();
  });

  test("local-fragment-ref response components", async () => {
    const content = await generateSchema("schema-responses.yaml", {
      extractResponses: true,
    });

    expect(content).toMatchSnapshot();
  });
});
