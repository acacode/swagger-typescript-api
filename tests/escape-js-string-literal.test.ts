import { describe, expect, test } from "vitest";
import { escapeJsStringLiteral } from "../src/util/escape-js-string-literal.js";

describe("escapeJsStringLiteral", () => {
  test("leaves safe URLs unchanged", () => {
    expect(escapeJsStringLiteral("https://api.example.com")).toBe(
      "https://api.example.com",
    );
  });

  test("escapes double quotes", () => {
    expect(escapeJsStringLiteral('hello"world')).toBe('hello\\"world');
  });

  test("escapes backslashes", () => {
    expect(escapeJsStringLiteral("path\\to\\file")).toBe("path\\\\to\\\\file");
  });

  test("escapes control characters", () => {
    expect(escapeJsStringLiteral("line\nbreak")).toBe("line\\nbreak");
  });

  test("escapes computed-property injection payload", () => {
    const payload =
      'https://api.example.com", [(async () => { return "pwned"; })()]: 0, dummy: "';
    expect(escapeJsStringLiteral(payload)).toBe(
      'https://api.example.com\\", [(async () => { return \\"pwned\\"; })()]: 0, dummy: \\"',
    );
  });
});
