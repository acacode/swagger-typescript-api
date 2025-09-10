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

  test("modular", async () => {
    await generateApi({
      fileName: "schema",
      input: path.resolve(import.meta.dirname, "schema.json"),
      output: tmpdir,
      silent: true,
      // @ts-expect-error: fixed in 13.2.8
      modular: true,
    });

    const api = await fs.readFile(path.join(tmpdir, "Api.ts"), {
      encoding: "utf8",
    });

    const dataContracts = await fs.readFile(path.join(tmpdir, "data-contracts.ts"), {
      encoding: "utf8",
    });

    expect(api).toMatchSnapshot("api");
    expect(dataContracts).toMatchSnapshot("dataContracts");
  });
});
