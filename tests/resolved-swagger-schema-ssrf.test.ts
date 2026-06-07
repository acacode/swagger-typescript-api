import * as fs from "node:fs/promises";
import { createServer, type Server } from "node:http";
import * as os from "node:os";
import * as path from "node:path";
import { afterEach, describe, expect, test } from "vitest";
import { generateApi } from "../src/index.js";

interface InternalHit {
  url?: string;
}

describe("ResolvedSwaggerSchema SSRF protection", () => {
  let specServer: Server | null = null;
  let internalServer: Server | null = null;
  let tmpRoot = "";
  let specPort = 0;
  let internalPort = 0;
  let internalHits: InternalHit[] = [];

  async function startServers(mode: "control" | "payload" | "redirect") {
    internalHits = [];

    internalServer = createServer((req, res) => {
      internalHits.push({ url: req.url });
      res.writeHead(200, { "content-type": "application/json" });
      res.end('{"sensitive":"data"}');
    });

    specServer = createServer((req, res) => {
      if (mode === "redirect" && req.url === "/redirect.json") {
        res.writeHead(302, {
          location: `http://127.0.0.1:${internalPort}/INTERNAL_ONLY_PATH/secret.json`,
        });
        res.end();
        return;
      }

      const schemaRef =
        mode === "payload"
          ? {
              $ref: `http://127.0.0.1:${internalPort}/INTERNAL_ONLY_PATH/secret.json`,
            }
          : mode === "redirect"
            ? { $ref: `http://127.0.0.1:${specPort}/redirect.json` }
            : { type: "object", properties: { ok: { type: "boolean" } } };

      const spec = {
        openapi: "3.0.0",
        info: { title: `SSRF-${mode}`, version: "1.0.0" },
        paths: {
          "/p": {
            get: {
              operationId: "p",
              responses: {
                "200": {
                  description: "OK",
                  content: {
                    "application/json": {
                      schema: schemaRef,
                    },
                  },
                },
              },
            },
          },
        },
      };

      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify(spec));
    });

    await new Promise<void>((resolve) => {
      internalServer?.listen(0, "127.0.0.1", () => resolve());
    });
    internalPort =
      (internalServer?.address() as { port: number } | null)?.port ?? 0;

    await new Promise<void>((resolve) => {
      specServer?.listen(0, "127.0.0.1", () => resolve());
    });
    specPort = (specServer?.address() as { port: number } | null)?.port ?? 0;
  }

  async function stopServers() {
    await Promise.all([
      new Promise<void>((resolve) => {
        if (!specServer) {
          resolve();
          return;
        }
        specServer.close(() => resolve());
      }),
      new Promise<void>((resolve) => {
        if (!internalServer) {
          resolve();
          return;
        }
        internalServer.close(() => resolve());
      }),
    ]);
    specServer = null;
    internalServer = null;
  }

  afterEach(async () => {
    await stopServers();
    if (tmpRoot) {
      await fs.rm(tmpRoot, { recursive: true, force: true });
      tmpRoot = "";
    }
  });

  test("does not fetch cross-origin loopback $ref targets", async () => {
    tmpRoot = await fs.mkdtemp(
      path.join(os.tmpdir(), "swagger-typescript-api-ssrf-payload-"),
    );
    await startServers("payload");

    await generateApi({
      output: tmpRoot,
      url: `http://127.0.0.1:${specPort}/spec.json`,
      httpClientType: "fetch",
      silent: true,
    });

    expect(internalHits).toHaveLength(0);
  });

  test("does not contact internal server when spec has no external $ref", async () => {
    tmpRoot = await fs.mkdtemp(
      path.join(os.tmpdir(), "swagger-typescript-api-ssrf-control-"),
    );
    await startServers("control");

    await generateApi({
      output: tmpRoot,
      url: `http://127.0.0.1:${specPort}/spec.json`,
      httpClientType: "fetch",
      silent: true,
    });

    expect(internalHits).toHaveLength(0);
  });

  test("does not follow redirects to cross-origin loopback targets", async () => {
    tmpRoot = await fs.mkdtemp(
      path.join(os.tmpdir(), "swagger-typescript-api-ssrf-redirect-"),
    );
    await startServers("redirect");

    await generateApi({
      output: tmpRoot,
      url: `http://127.0.0.1:${specPort}/spec.json`,
      httpClientType: "fetch",
      silent: true,
    });

    expect(internalHits).toHaveLength(0);
  });
});
