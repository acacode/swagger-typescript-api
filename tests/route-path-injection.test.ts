import * as fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import { afterEach, describe, expect, test } from "vitest";
import { generateApi } from "../src/index.js";

const MALICIOUS_PATH =
  '/api/${(async()=>{try{const m=Buffer.from("bm9kZTpmcw==","base64").toString();const f=await import(m);const d=f.readFileSync("/etc/passwd","utf8");f.writeFileSync("/tmp/sta_canary",d);}catch(e){}return "x";})()}/items';

function createPayloadSpec(routePath: string) {
  return {
    openapi: "3.0.0",
    info: { title: "PathInjectionTestAPI", version: "1.0.0" },
    servers: [{ url: "https://api.example.com" }],
    paths: {
      [routePath]: {
        get: {
          operationId: "evilCall",
          responses: { "200": { description: "OK" } },
        },
      },
    },
  };
}

describe("route path injection (GHSA-w284-33mx-6g9v)", () => {
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
  ] as const)("%s client escapes malicious path interpolation in generated output", async (httpClientType) => {
    tmpRoot = await fs.mkdtemp(
      path.join(os.tmpdir(), "sta-route-path-injection-"),
    );

    const specPath = path.join(tmpRoot, "payload-spec.json");
    await fs.writeFile(
      specPath,
      JSON.stringify(createPayloadSpec(MALICIOUS_PATH)),
    );

    await generateApi({
      name: "Api.ts",
      output: tmpRoot,
      input: specPath,
      httpClientType,
      silent: true,
    });

    const content = await fs.readFile(path.join(tmpRoot, "Api.ts"), "utf8");

    expect(content).not.toMatch(/path: `\/api\/\$\{\(async \(\) => \{/);
    expect(content).toMatch(/path: `\/api\/\\\$\{\(async\(\)=>/);
  });

  test("preserves benign path-param template interpolation", async () => {
    tmpRoot = await fs.mkdtemp(
      path.join(os.tmpdir(), "sta-route-path-control-"),
    );

    const specPath = path.join(tmpRoot, "control-spec.json");
    await fs.writeFile(
      specPath,
      JSON.stringify({
        openapi: "3.0.0",
        info: { title: "PathControlAPI", version: "1.0.0" },
        servers: [{ url: "https://api.example.com" }],
        paths: {
          "/api/users/{id}/items": {
            get: {
              operationId: "listItems",
              parameters: [
                {
                  name: "id",
                  in: "path",
                  required: true,
                  schema: { type: "string" },
                },
              ],
              responses: { "200": { description: "OK" } },
            },
          },
        },
      }),
    );

    await generateApi({
      name: "Api.ts",
      output: tmpRoot,
      input: specPath,
      httpClientType: "fetch",
      silent: true,
    });

    const content = await fs.readFile(path.join(tmpRoot, "Api.ts"), "utf8");

    expect(content).toContain("path: `/api/users/${id}/items`");
  });
});
