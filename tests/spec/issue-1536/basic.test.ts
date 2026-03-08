import * as fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { generateApi } from "../../../src/index.js";

/**
 * Reproduces https://github.com/acacode/swagger-typescript-api/issues/1536
 *
 * OpenAPI 3.1 schema with type: ["null", "object"] and additionalProperties
 * should generate Record<string, string> | null, but the generator outputs
 * null | object, losing key/value type information.
 */
describe("issue-1536", async () => {
  let tmpdir = "";

  beforeAll(async () => {
    tmpdir = await fs.mkdtemp(path.join(os.tmpdir(), "swagger-typescript-api"));
  });

  afterAll(async () => {
    await fs.rm(tmpdir, { recursive: true });
  });

  test("to match snapshot", async () => {
    await generateApi({
      fileName: "schema",
      input: path.resolve(import.meta.dirname, "schema.json"),
      output: tmpdir,
      silent: true,
      generateClient: false,
    });

    const content = await fs.readFile(path.join(tmpdir, "schema.ts"), {
      encoding: "utf8",
    });

    expect(content).toMatchSnapshot();
  });

  test("type [null, object] with additionalProperties generates Record<string, string> | null", async () => {
    await generateApi({
      fileName: "schema",
      input: path.resolve(import.meta.dirname, "schema.json"),
      output: tmpdir,
      silent: true,
      generateClient: false,
    });

    const content = await fs.readFile(path.join(tmpdir, "schema.ts"), {
      encoding: "utf8",
    });

    // Bug #1536: nullable object with additionalProperties should be Record<string, string> | null
    // (or null | Record<string, string>), not generic null | object.
    expect(content).toContain("Record<string, string>");
    expect(content).not.toMatch(/export type Test = null \| object;/);
  });

  test("type array variations generate correct union types", async () => {
    await generateApi({
      fileName: "schema",
      input: path.resolve(import.meta.dirname, "schema.json"),
      output: tmpdir,
      silent: true,
      generateClient: false,
    });

    const content = await fs.readFile(path.join(tmpdir, "schema.ts"), {
      encoding: "utf8",
    });

    // ["null", "string"] -> null | string
    expect(content).toMatch(/export type NullableString = null \| string;/);

    // ["null", "number"] -> null | number
    expect(content).toMatch(/export type NullableNumber = null \| number;/);

    // ["null", "integer"] -> null | number
    expect(content).toMatch(/export type NullableInteger = null \| number;/);

    // ["null", "boolean"] -> null | boolean
    expect(content).toMatch(/export type NullableBoolean = null \| boolean;/);

    // ["string", "number"] -> string | number
    expect(content).toMatch(
      /export type StringOrNumber = (string \| number|number \| string);/,
    );

    // ["null", "array"] with items -> null | string[]
    expect(content).toMatch(
      /export type NullableArray = null \| (string\[\]|any\[\]);/,
    );

    // ["null", "object"] without additionalProperties -> null | object
    expect(content).toMatch(/export type ObjectOrNull = null \| object;/);

    // ["null", "object"] with additionalProperties: number -> null | Record<string, number>
    expect(content).toContain("Record<string, number>");
    expect(content).toMatch(
      /export type ObjectWithAdditionalPropsOrNull = null \| Record<string, number>;/,
    );
  });
});
