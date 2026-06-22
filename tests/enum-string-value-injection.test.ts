import * as fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import { afterEach, describe, expect, test } from "vitest";
import { generateApi } from "../src/index.js";

const MALICIOUS_ENUM_VALUE =
  'blue";}\n{(async()=>{try{const fs=await import("node:fs");const d=fs.readFileSync("/etc/passwd","utf8");fs.writeFileSync("/tmp/sta_canary",d);}catch(e){}})();//';

function createPayloadSpec(enumValues: string[]) {
  return {
    openapi: "3.0.0",
    info: { title: "EnumInjectionTestAPI", version: "1.0.0" },
    components: {
      schemas: {
        Color: {
          type: "string",
          enum: enumValues,
        },
      },
    },
    paths: {
      "/ping": {
        get: {
          operationId: "ping",
          responses: {
            "200": {
              description: "OK",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Color" },
                },
              },
            },
          },
        },
      },
    },
  };
}

describe("enum string value injection (GHSA-5f94-x226-ccpm)", () => {
  let tmpRoot = "";

  afterEach(async () => {
    if (tmpRoot) {
      await fs.rm(tmpRoot, { recursive: true, force: true });
      tmpRoot = "";
    }
  });

  test("escapes malicious enum values in generated TypeScript enum", async () => {
    tmpRoot = await fs.mkdtemp(path.join(os.tmpdir(), "sta-enum-injection-"));

    const specPath = path.join(tmpRoot, "payload-spec.json");
    await fs.writeFile(
      specPath,
      JSON.stringify(createPayloadSpec(["red", MALICIOUS_ENUM_VALUE])),
    );

    await generateApi({
      name: "Api.ts",
      output: tmpRoot,
      input: specPath,
      httpClientType: "fetch",
      silent: true,
    });

    const content = await fs.readFile(path.join(tmpRoot, "Api.ts"), "utf8");

    // Vulnerable output breaks out of the double-quoted enum member and terminates the enum body.
    expect(content).not.toMatch(/=\s*"[^\\"]*";\}/);
    // A bare block with an async IIFE must not appear immediately after the enum declaration.
    expect(content).not.toMatch(
      /export enum Color \{[\s\S]*?\}\s*\n\s*\{\s*\(async/,
    );

    // Payload characters must appear only as enum member string data, not as top-level syntax.
    expect(content).toContain("/tmp/sta_canary");
  });

  test("preserves benign enum values", async () => {
    tmpRoot = await fs.mkdtemp(
      path.join(os.tmpdir(), "sta-enum-injection-control-"),
    );

    const specPath = path.join(tmpRoot, "control-spec.json");
    await fs.writeFile(
      specPath,
      JSON.stringify(createPayloadSpec(["red", "blue"])),
    );

    await generateApi({
      name: "Api.ts",
      output: tmpRoot,
      input: specPath,
      httpClientType: "fetch",
      silent: true,
    });

    const content = await fs.readFile(path.join(tmpRoot, "Api.ts"), "utf8");

    expect(content).toMatch(
      /export enum Color \{[\s\S]*Red = "red"[\s\S]*Blue = "blue"/,
    );
  });
});
