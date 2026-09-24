import * as path from "node:path";
import { describe, expect, test } from "vitest";
import { generateApi } from "../../../src/index.js";

const SCHEMA = path.resolve(import.meta.dirname, "schema.json");

const fileNames = (files: { fileName: string }[]) =>
  files.map((file) => file.fileName);

const contentOf = (
  files: { fileName: string; fileContent: string }[],
  fileName: string,
) => files.find((file) => file.fileName === fileName)?.fileContent;

describe("jsonld-basic", () => {
  test("single file output inlines entities and utility types", async () => {
    const { files } = await generateApi({
      input: SCHEMA,
      output: false,
      generateClient: false,
      jsonLdOptions: { enabled: true },
    });

    expect(files).toMatchSnapshot();
  });

  test("output is unchanged when JSON-LD is disabled (default)", async () => {
    const { files } = await generateApi({
      input: SCHEMA,
      output: false,
      generateClient: false,
    });

    expect(files.some((file) => file.fileName.startsWith("jsonld-"))).toBe(
      false,
    );
    expect(files).toMatchSnapshot();
  });

  test("modular output emits jsonld files and keeps data-contracts importable", async () => {
    const { files } = await generateApi({
      input: SCHEMA,
      output: false,
      modular: true,
      generateClient: true,
      jsonLdOptions: { enabled: true },
    });

    expect(fileNames(files)).toContain("data-contracts");
    expect(fileNames(files)).toContain("jsonld-entity");
    expect(fileNames(files)).toContain("jsonld-utils");

    // Route modules import their models from `data-contracts` only.
    expect(contentOf(files, "People")).toContain(
      'import { Person } from "./data-contracts"',
    );
    expect(contentOf(files, "data-contracts")).toContain(
      'export * from "./jsonld-entity"',
    );

    // Entities extend `JsonLdEntity`, which lives in a different module.
    expect(contentOf(files, "jsonld-entity")).toContain(
      'from "./jsonld-utils"',
    );
    expect(contentOf(files, "jsonld-entity")).toContain(
      "export interface Person extends JsonLdEntity {",
    );
  });

  test("generateUtils: false drops the utils module and the extends clause", async () => {
    const { files } = await generateApi({
      input: SCHEMA,
      output: false,
      modular: true,
      generateClient: false,
      jsonLdOptions: { enabled: true, generateUtils: false },
    });

    expect(fileNames(files)).not.toContain("jsonld-utils");

    const entities = contentOf(files, "jsonld-entity");
    expect(entities).toContain("export interface Person {");
    expect(entities).not.toContain("JsonLdEntity");
  });

  test("non-JSON-LD schemas stay in data-contracts", async () => {
    const { files } = await generateApi({
      spec: {
        openapi: "3.0.0",
        info: { title: "mixed", version: "1.0.0" },
        paths: {},
        components: {
          schemas: {
            Plain: { type: "object", properties: { a: { type: "string" } } },
            Thing: {
              type: "object",
              "x-jsonld": true,
              "x-jsonld-type": "https://schema.org/Thing",
              properties: { b: { type: "string" } },
            },
          },
        },
      } as never,
      output: false,
      generateClient: false,
      jsonLdOptions: { enabled: true },
    });

    const content = contentOf(files, "Api");
    expect(content).toContain("export interface Plain {");
    expect(content).toContain("export interface Thing extends JsonLdEntity {");
  });

  test("a property-less x-jsonld-type schema becomes a JSON-LD type alias", async () => {
    const { files } = await generateApi({
      spec: {
        openapi: "3.0.0",
        info: { title: "type-only", version: "1.0.0" },
        paths: {},
        components: {
          schemas: {
            PersonType: {
              type: "string",
              "x-jsonld-type": "https://schema.org/Person",
              enum: ["Person", "Patient"],
            },
          },
        },
      } as never,
      output: false,
      generateClient: false,
      jsonLdOptions: { enabled: true },
    });

    expect(contentOf(files, "Api")).toMatchSnapshot();
  });
});
