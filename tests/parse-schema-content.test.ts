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
        '    second line"',
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

  test("repairs YAML double-quoted strings broken by raw newlines (issue #1433)", () => {
    const schema = parseSchemaContent(`
openapi: "3.0.3"
info:
  title: "App NG"
paths:
  /x:
    get:
      description: "This is a multine
      description"
`);

    expect(schema).toMatchObject({
      paths: {
        "/x": {
          get: {
            description: "This is a multine\ndescription",
          },
        },
      },
    });
  });

  test("repairs broken multiline values with unicode symbols", () => {
    const schema = parseSchemaContent(`
openapi: "3.0.3"
info:
  title: "Unicode app"
paths:
  /unicode:
    get:
      description: "Первая строка с ünicode
      Вторая строка с emoji 🚀"
`);

    expect(schema).toMatchObject({
      paths: {
        "/unicode": {
          get: {
            description: "Первая строка с ünicode\nВторая строка с emoji 🚀",
          },
        },
      },
    });
  });

  test("repairs long broken multiline values", () => {
    const longFirstLine = "A".repeat(300);
    const longSecondLine = "B".repeat(300);
    const schema = parseSchemaContent(`
openapi: "3.0.3"
info:
  title: "Long text app"
paths:
  /long:
    get:
      description: "${longFirstLine}
      ${longSecondLine}"
`);

    expect(schema).toMatchObject({
      paths: {
        "/long": {
          get: {
            description: `${longFirstLine}\n${longSecondLine}`,
          },
        },
      },
    });
  });

  test("repairs broken multiline values with tab indentation on continuation", () => {
    const schema = parseSchemaContent(
      [
        'openapi: "3.0.3"',
        "info:",
        '  title: "Tab app"',
        "paths:",
        "  /tab:",
        "    get:",
        '      description: "first part',
        '\tcontinued part"',
        "",
      ].join("\n"),
    );

    expect(schema).toMatchObject({
      paths: {
        "/tab": {
          get: {
            description: "first part\ncontinued part",
          },
        },
      },
    });
  });

  test("repairs multiple broken multiline fields in one document", () => {
    const schema = parseSchemaContent(`
openapi: "3.0.3"
info:
  title: "Multi app"
  description: "Info first line
  info second line"
paths:
  /x:
    get:
      description: "Route first line
      route second line"
      responses:
        200:
          description: "Response first line
          response second line"
`);

    expect(schema).toMatchObject({
      info: {
        description: "Info first line\ninfo second line",
      },
      paths: {
        "/x": {
          get: {
            description: "Route first line\nroute second line",
            responses: {
              200: {
                description: "Response first line\nresponse second line",
              },
            },
          },
        },
      },
    });
  });

  test("preserves valid YAML escape sequences near repaired values", () => {
    const schema = parseSchemaContent(String.raw`
openapi: "3.0.3"
info:
  title: "Escapes app"
paths:
  /escapes:
    get:
      description: "Broken first line
      broken second line"
      summary: "line1\nline2 and quote: \"ok\" and slash: \\"
`);

    expect(schema).toMatchObject({
      paths: {
        "/escapes": {
          get: {
            description: "Broken first line\nbroken second line",
            summary: 'line1\nline2 and quote: "ok" and slash: \\',
          },
        },
      },
    });
  });
});
