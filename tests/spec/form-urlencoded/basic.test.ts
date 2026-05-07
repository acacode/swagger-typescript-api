import * as fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { generateApi } from "../../../src/index.js";

describe("form-urlencoded", async () => {
  let tmpdir = "";

  beforeAll(async () => {
    tmpdir = await fs.mkdtemp(path.join(os.tmpdir(), "swagger-typescript-api"));
  });

  afterAll(async () => {
    await fs.rm(tmpdir, { recursive: true });
  });

  test("form-urlencoded", async () => {
    await generateApi({
      fileName: "form-urlencoded.ts",
      input: path.resolve(import.meta.dirname, "schema.json"),
      output: tmpdir,
      silent: true,
      generateClient: true,
      httpClientType: "axios",
    });

    const content = await fs.readFile(path.join(tmpdir, "form-urlencoded.ts"), {
      encoding: "utf8",
    });

    expect(content).toMatchSnapshot();
  });
});
