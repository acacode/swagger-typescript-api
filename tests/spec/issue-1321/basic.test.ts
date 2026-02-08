import * as fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { generateApi } from "../../../src/index.js";
import { SchemaFormatters } from "../../../src/schema-parser/schema-formatters.js";

describe("escapeJSDocContent", () => {
  const formatters = new SchemaFormatters(
    {} as ConstructorParameters<typeof SchemaFormatters>[0],
  );
  const escapeJSDoc = formatters.escapeJSDocContent;

  test("returns empty string for undefined", () => {
    expect(escapeJSDoc(undefined)).toBe("");
  });

  test("returns string unchanged when no */ present", () => {
    expect(escapeJSDoc("clean string")).toBe("clean string");
  });

  test("escapes a single */ sequence", () => {
    expect(escapeJSDoc("has */ inside")).toBe("has *\\/ inside");
  });

  test("escapes multiple */ sequences", () => {
    expect(escapeJSDoc("a */ b */ c")).toBe("a *\\/ b *\\/ c");
  });

  test("coerces number to string", () => {
    expect(escapeJSDoc(42)).toBe("42");
  });

  test("coerces boolean to string", () => {
    expect(escapeJSDoc(true)).toBe("true");
  });

  test("coerces null to string", () => {
    expect(escapeJSDoc(null)).toBe("null");
  });

  test("returns empty string for empty string input", () => {
    expect(escapeJSDoc("")).toBe("");
  });

  test("does not escape /* (opening comment)", () => {
    expect(escapeJSDoc("/* open")).toBe("/* open");
  });
});

describe("issue-1321", async () => {
  let tmpdir = "";

  beforeAll(async () => {
    tmpdir = await fs.mkdtemp(path.join(os.tmpdir(), "swagger-typescript-api"));
  });

  afterAll(async () => {
    await fs.rm(tmpdir, { recursive: true });
  });

  test("escapes jsdoc closing markers", async () => {
    await generateApi({
      fileName: "schema",
      input: path.resolve(import.meta.dirname, "schema.json"),
      output: tmpdir,
      silent: true,
    });

    const content = await fs.readFile(path.join(tmpdir, "schema.ts"), {
      encoding: "utf8",
    });

    expect(content).toMatchSnapshot();
  });

  test("escapes jsdoc closing markers with generateResponses", async () => {
    await generateApi({
      fileName: "schema-responses",
      input: path.resolve(import.meta.dirname, "schema.json"),
      output: tmpdir,
      silent: true,
      generateResponses: true,
    });

    const content = await fs.readFile(
      path.join(tmpdir, "schema-responses.ts"),
      {
        encoding: "utf8",
      },
    );

    expect(content).toMatchSnapshot();
  });
});
