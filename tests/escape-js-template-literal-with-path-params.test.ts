import { describe, expect, test } from "vitest";
import {
  escapeJsTemplateLiteralStatic,
  escapeJsTemplateLiteralWithPathParams,
} from "../src/util/escape-js-template-literal-with-path-params.js";

describe("escapeJsTemplateLiteralStatic", () => {
  test("leaves benign paths unchanged", () => {
    expect(escapeJsTemplateLiteralStatic("/api/users/{id}/items")).toBe(
      "/api/users/{id}/items",
    );
  });

  test("escapes attacker-controlled template interpolation", () => {
    const payload = '/api/${(async()=>{return "pwned"})()}/items';

    expect(escapeJsTemplateLiteralStatic(payload)).toBe(
      '/api/\\${(async()=>{return "pwned"})()}/items',
    );
  });

  test("escapes backticks and backslashes", () => {
    expect(escapeJsTemplateLiteralStatic("/api/weird`path\\segment")).toBe(
      "/api/weird\\`path\\\\segment",
    );
  });
});

describe("escapeJsTemplateLiteralWithPathParams", () => {
  test("leaves deliberate path-param interpolations unchanged", () => {
    expect(
      escapeJsTemplateLiteralWithPathParams("/api/users/${id}/items", ["id"]),
    ).toBe("/api/users/${id}/items");
  });

  test("escapes attacker-controlled template interpolation", () => {
    const payload = '/api/${(async()=>{return "pwned"})()}/items';

    expect(escapeJsTemplateLiteralWithPathParams(payload, [])).toBe(
      '/api/\\${(async()=>{return "pwned"})()}/items',
    );
  });

  test("escapes malicious interpolation while preserving path params", () => {
    expect(
      escapeJsTemplateLiteralWithPathParams("/api/${evil}/${id}/items", ["id"]),
    ).toBe("/api/\\${evil}/${id}/items");
  });

  test("escapes backticks and backslashes in static segments", () => {
    expect(
      escapeJsTemplateLiteralWithPathParams("/api/weird`path\\segment", []),
    ).toBe("/api/weird\\`path\\\\segment");
  });

  test("does not corrupt path content that resembles placeholder tokens", () => {
    expect(
      escapeJsTemplateLiteralWithPathParams(
        "/api/__STA_PATH_PARAM_0__/items",
        [],
      ),
    ).toBe("/api/__STA_PATH_PARAM_0__/items");
  });

  test("preserves params alongside content resembling placeholder tokens", () => {
    expect(
      escapeJsTemplateLiteralWithPathParams(
        "/api/__STA_PATH_PARAM_0__/${id}/items",
        ["id"],
      ),
    ).toBe("/api/__STA_PATH_PARAM_0__/${id}/items");
  });
});
