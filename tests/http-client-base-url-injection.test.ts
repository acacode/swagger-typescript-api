import * as fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import { afterEach, describe, expect, test } from "vitest";
import { generateApi } from "../src/index.js";

const MALICIOUS_SERVER_URL =
  'https://api.example.com", [(async () => { try { const fs = await import("node:fs"); fs.writeFileSync("/tmp/sta_canary", "pwned"); } catch (e) {} return "pwned"; })()]: 0, dummy: "';

function createPayloadSpec(serverUrl: string) {
  return {
    openapi: "3.0.0",
    info: { title: "InjectionTestAPI", version: "1.0.0" },
    servers: [{ url: serverUrl }],
    paths: {
      "/ping": {
        get: {
          operationId: "ping",
          responses: { "200": { description: "OK" } },
        },
      },
    },
  };
}

describe("http-client baseUrl injection (GHSA-38c3-wv3c-v3xj)", () => {
  let tmpRoot = "";

  afterEach(async () => {
    if (tmpRoot) {
      await fs.rm(tmpRoot, { recursive: true, force: true });
      tmpRoot = "";
    }
  });

  test.each([
    "axios",
    "fetch",
  ] as const)("%s client escapes malicious servers[0].url in generated output", async (httpClientType) => {
    tmpRoot = await fs.mkdtemp(
      path.join(os.tmpdir(), "sta-base-url-injection-"),
    );

    const specPath = path.join(tmpRoot, "payload-spec.json");
    await fs.writeFile(
      specPath,
      JSON.stringify(createPayloadSpec(MALICIOUS_SERVER_URL)),
    );

    await generateApi({
      name: "Api.ts",
      output: tmpRoot,
      input: specPath,
      httpClientType,
      silent: true,
    });

    const content = await fs.readFile(path.join(tmpRoot, "Api.ts"), "utf8");

    // Vulnerable output breaks out of the string literal into a computed key.
    expect(content).not.toMatch(
      /baseURL: axiosConfig\.baseURL \|\| "[^\\"]*", \[\(/,
    );
    expect(content).not.toMatch(/public baseUrl: string = "[^\\"]*", \[\(/);
    expect(content).not.toMatch(
      /\|\|\s*\n?\s*"https:\/\/api\.example\.com", \[\(/,
    );

    // Payload must remain a plain string literal value, not executable syntax.
    // The URL may appear with " escaped as \" (double-quoted output) or raw
    // (single-quoted output after formatter quote conversion). Both are safe.
    expect(
      content.includes(MALICIOUS_SERVER_URL) ||
        content.includes(MALICIOUS_SERVER_URL.replace(/"/g, '\\"')),
    ).toBe(true);
  });

  test("axios client preserves benign server URLs", async () => {
    tmpRoot = await fs.mkdtemp(path.join(os.tmpdir(), "sta-base-url-control-"));

    const specPath = path.join(tmpRoot, "control-spec.json");
    await fs.writeFile(
      specPath,
      JSON.stringify(createPayloadSpec("https://api.example.com")),
    );

    await generateApi({
      name: "Api.ts",
      output: tmpRoot,
      input: specPath,
      httpClientType: "axios",
      silent: true,
    });

    const content = await fs.readFile(path.join(tmpRoot, "Api.ts"), "utf8");

    expect(content).toContain(
      'baseURL: axiosConfig.baseURL || "https://api.example.com"',
    );
  });
});
