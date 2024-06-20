import * as fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";

import { afterAll, beforeAll, describe, expect, test } from "vitest";

import { generateApi } from "../src/index.js";
import { collectAllSchemas } from "./utils.js";

describe("simple", async () => {
  let tmpdir: string;

  beforeAll(async () => {
    tmpdir = await fs.mkdtemp(path.join(os.tmpdir(), "swagger-typescript-api"));
  });

  afterAll(async () => {
    await fs.rm(tmpdir, { recursive: true });
  });

  const schemas = await collectAllSchemas();

  test.each(schemas)("$name", async (schema) => {
    await generateApi({
      name: schema.name,
      input: schema.filePath,
      output: tmpdir,
      silent: true,
      generateClient: true,
      generateRouteTypes: false,
      sortTypes: true,
    });

    const content = await fs.readFile(path.join(tmpdir, `${schema.name}.ts`), {
      encoding: "utf8",
    });

    expect(content).toMatchSnapshot();
  });
});
