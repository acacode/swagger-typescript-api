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

  test("--extra-templates", async () => {
    await generateApi({
      name: "schema",
      input: path.resolve(import.meta.dirname, "schema.json"),
      output: tmpdir,
      silent: true,
      extraTemplates: [
        {
          name: "external-template-name",
          path: path.resolve(import.meta.dirname, "./templates/test.ejs")
        },
      ],
    });

    const content = await fs.readFile(path.join(tmpdir, "external-template-name.ts"), {
      encoding: "utf8",
    });

    expect(content).toMatchSnapshot();
  });

  test("--extra-templates-route", async () => {
    await generateApi({
      name: "schema",
      input: path.resolve(import.meta.dirname, "schema.json"),
      output: tmpdir,
      silent: true,
      extraTemplates: [
        {
          name: (config)=>{
            console.log(config.route.moduleName)
            return `contexts/${config.route.moduleName}Context`
          },
          path: path.resolve(import.meta.dirname, "./templates/test-route.ejs"),
          modular: true
        },
      ],
    });

    const content = await fs.readFile(path.join(tmpdir, "contexts/wrongPathParams1Context.ts"), {
      encoding: "utf8",
    });

    expect(content).toMatchSnapshot();
  });
});
