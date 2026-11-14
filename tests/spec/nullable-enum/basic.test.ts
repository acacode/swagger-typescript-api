import * as fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { generateApi } from "../../../src/index.js";

/**
 * OpenAPI 3.1 has no `nullable`: a nullable enum lists "null" in `type`
 * and/or null in `enum`. These enums lost their null, while 3.0
 * `nullable: true` enums kept it inline but lost it through a $ref.
 */
describe("nullable-enum", async () => {
  let tmpdir = "";

  beforeAll(async () => {
    tmpdir = await fs.mkdtemp(path.join(os.tmpdir(), "swagger-typescript-api"));
  });

  afterAll(async () => {
    await fs.rm(tmpdir, { recursive: true });
  });

  const generate = async (enumStyle: "enum" | "union" | "const") => {
    await generateApi({
      fileName: `schema-${enumStyle}`,
      input: path.resolve(import.meta.dirname, "schema.json"),
      output: tmpdir,
      silent: true,
      generateClient: false,
      enumStyle,
    });

    return fs.readFile(path.join(tmpdir, `schema-${enumStyle}.ts`), {
      encoding: "utf8",
    });
  };

  test.each([
    "enum",
    "union",
    "const",
  ] as const)("to match snapshot (enumStyle: %s)", async (enumStyle) => {
    expect(await generate(enumStyle)).toMatchSnapshot();
  });

  test.each([
    "enum",
    "union",
    "const",
  ] as const)("inline nullable enums keep null (enumStyle: %s)", async (enumStyle) => {
    const content = await generate(enumStyle);

    expect(content).toContain('status?: "active" | "pending" | null;');
    expect(content).toContain("level?: 1 | 2 | null;");
    expect(content).toContain('status30?: "active" | "pending" | null;');
    expect(content).toContain('kind?: "a" | "b";');
  });

  test.each([
    "enum",
    "const",
  ] as const)("a $ref to a nullable enum adds null at the property (enumStyle: %s)", async (enumStyle) => {
    const content = await generate(enumStyle);

    expect(content).toContain("color?: Color | null;");
    expect(content).toContain("color30?: Color30 | null;");
    expect(content).toContain("shape?: Shape;");
  });

  test("union-style nullable enums include null in the type", async () => {
    const content = await generate("union");

    expect(content).toContain('export type Color = "red" | "green" | null;');
    expect(content).toContain('export type Size = "small" | "large" | null;');
    expect(content).toContain('export type Mode = "on" | "off" | null;');
    expect(content).toContain('export type Color30 = "red" | "green" | null;');
    expect(content).toContain('export type Shape = "circle" | "square";');
    expect(content).toContain("color?: Color;");
  });
});
