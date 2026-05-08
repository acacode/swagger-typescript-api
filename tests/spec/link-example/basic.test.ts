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

  test("link-example", async () => {
    await generateApi({
      fileName: "schema",
      input: path.resolve(import.meta.dirname, "schema.json"),
      output: tmpdir,
      silent: true,
      modular: true,
    });

    const generatedFiles = await fs.readdir(tmpdir);
    const routeModuleFiles = generatedFiles.filter(
      (fileName) =>
        fileName.endsWith(".ts") &&
        !["data-contracts.ts", "http-client.ts"].includes(fileName),
    );

    expect(routeModuleFiles).toHaveLength(1);

    const api = await fs.readFile(path.join(tmpdir, routeModuleFiles[0]!), {
      encoding: "utf8",
    });

    const dataContracts = await fs.readFile(
      path.join(tmpdir, "data-contracts.ts"),
      {
        encoding: "utf8",
      },
    );

    expect(api).toMatchSnapshot("api");
    expect(dataContracts).toMatchSnapshot("dataContracts");
  });
});
