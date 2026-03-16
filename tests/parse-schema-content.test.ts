import { describe, expect, test } from "vitest";
import { parseSchemaContent } from "../src/util/parse-schema-content.js";

describe("parseSchemaContent", () => {
  test("parses regular JSON schemas without changes", () => {
    const schema = parseSchemaContent(
      JSON.stringify({
        openapi: "3.0.3",
        info: {
          title: "Regular JSON schema",
          version: "1.0.0",
        },
        paths: {},
      }),
    );

    expect(schema).toEqual({
      openapi: "3.0.3",
      info: {
        title: "Regular JSON schema",
        version: "1.0.0",
      },
      paths: {},
    });
  });

  test("parses regular YAML schemas with common escapes", () => {
    const schema = parseSchemaContent(`
openapi: "3.0.3"
info:
  title: "Regular YAML schema"
  version: "1.0.0"
  description: "Path C:\\\\temp\\\\file and quote: \\"ok\\""
paths: {}
`);

    expect(schema).toMatchObject({
      openapi: "3.0.3",
      info: {
        title: "Regular YAML schema",
        version: "1.0.0",
        description: 'Path C:\\temp\\file and quote: "ok"',
      },
      paths: {},
    });
  });

  test("parses YAML double-quoted strings continued with escaped line breaks", () => {
    const schema = parseSchemaContent(`
openapi: "3.0.3"
info:
  title: "App NG"
  version: "1.0.0"
  description: "This is a multine\\
  description"
paths: {}
`);

    expect(schema).toMatchObject({
      info: {
        description: "This is a multinedescription",
      },
    });
  });

  test("parses escaped CRLF line continuations in YAML double-quoted strings", () => {
    const schema = parseSchemaContent(
      [
        'openapi: "3.0.3"',
        "info:",
        '  title: "App NG"',
        '  version: "1.0.0"',
        '  description: "First line\\',
        "    second line\"",
        "paths: {}",
        "",
      ].join("\r\n"),
    );

    expect(schema).toMatchObject({
      info: {
        description: "First linesecond line",
      },
    });
  });
});
