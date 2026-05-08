import * as fs from "node:fs/promises";
import { createServer } from "node:http";
import * as os from "node:os";
import * as path from "node:path";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { generateApi } from "../../../src/index.js";

describe("paths-by-url", async () => {
  let tmpRoot = "";
  let fixturesRoot = "";
  let outputRoot = "";
  let baseUrl = "";
  let server: ReturnType<typeof createServer> | null = null;

  beforeAll(async () => {
    tmpRoot = await fs.mkdtemp(
      path.join(os.tmpdir(), "swagger-typescript-api"),
    );
    fixturesRoot = path.join(tmpRoot, "fixtures");
    outputRoot = path.join(tmpRoot, "output");

    await fs.mkdir(path.join(fixturesRoot, "parts"), { recursive: true });
    await fs.mkdir(outputRoot, { recursive: true });

    await fs.copyFile(
      path.resolve(import.meta.dirname, "schema.yaml"),
      path.join(fixturesRoot, "schema.yaml"),
    );
    await fs.copyFile(
      path.resolve(import.meta.dirname, "parts/repro.yaml"),
      path.join(fixturesRoot, "parts/repro.yaml"),
    );
    await fs.copyFile(
      path.resolve(import.meta.dirname, "parts/third.yaml"),
      path.join(fixturesRoot, "parts/third.yaml"),
    );

    server = createServer(async (req, res) => {
      try {
        const host = req.headers.host || "127.0.0.1";
        const requestUrl = new URL(req.url || "/", `http://${host}`);
        const requestedPath = decodeURIComponent(requestUrl.pathname);
        const safeRoot = path.resolve(fixturesRoot);
        const filePath = path.resolve(path.join(safeRoot, `.${requestedPath}`));

        if (!filePath.startsWith(safeRoot)) {
          res.statusCode = 403;
          res.end("Forbidden");
          return;
        }

        const file = await fs.readFile(filePath, { encoding: "utf8" });
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/yaml; charset=utf-8");
        res.end(file);
      } catch {
        res.statusCode = 404;
        res.end("Not Found");
      }
    });

    await new Promise<void>((resolve) => {
      server?.listen(0, "127.0.0.1", () => resolve());
    });

    const address = server.address();
    if (address && typeof address === "object") {
      baseUrl = `http://127.0.0.1:${address.port}`;
    }
  });

  afterAll(async () => {
    await new Promise<void>((resolve) => {
      if (!server) {
        resolve();
        return;
      }
      server.close(() => resolve());
    });

    await fs.rm(tmpRoot, { recursive: true, force: true });
  });

  test("resolves relative refs from remote url root", async () => {
    await generateApi({
      fileName: "schema",
      url: `${baseUrl}/schema.yaml`,
      output: outputRoot,
      silent: true,
      extractRequestBody: true,
      extractRequestParams: true,
      extractResponses: true,
      extractResponseError: true,
      extractResponseBody: true,
      extractEnums: true,
      generateClient: true,
    });

    const content = await fs.readFile(path.join(outputRoot, "schema.ts"), {
      encoding: "utf8",
    });

    expect(content).toContain("export interface Repository");
    expect(content).toContain("export type RootRepository =");
    expect(content).not.toContain("export type RootRepository = any;");
    expect(content).toContain("export type HelloListData = Repository;");
    expect(content).toContain("helloList:");
  });
});
