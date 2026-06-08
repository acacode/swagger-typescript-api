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

  test("escapes enum breakout injection payload", () => {
    const payload =
      'blue";}\n{(async()=>{try{const fs=await import("node:fs");fs.writeFileSync("/tmp/sta_canary","pwned");}catch(e){}})();//';
    expect(escapeJsStringLiteral(payload)).toBe(
      'blue\\";}\\n{(async()=>{try{const fs=await import(\\"node:fs\\");fs.writeFileSync(\\"/tmp/sta_canary\\",\\"pwned\\");}catch(e){}})();//',
    );
  });
});
