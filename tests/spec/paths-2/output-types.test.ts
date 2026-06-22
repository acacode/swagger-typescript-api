import * as fs from "node:fs/promises";
import { createServer } from "node:http";
import * as os from "node:os";
import * as path from "node:path";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { generateApi } from "../../../src/index.js";
import {
  extractVitestSnapshotBody,
  typecheckGeneratedOutput,
} from "../../typecheck-generated-output.js";

const apiRoot = path.resolve(import.meta.dirname, "api");
const schemaUrlPath = "/api/v1/openapi/yaml";
const snapshotPath = path.resolve(
  import.meta.dirname,
  "__snapshots__/basic.test.ts.snap",
);

const resolveApiFilePath = (pathname: string): string | null => {
  const safeRoot = path.resolve(apiRoot);

  if (pathname === schemaUrlPath) {
    return path.join(safeRoot, "v1/openapi.yaml");
  }

  if (pathname.startsWith("/api/v1/openapi/")) {
    return path.join(safeRoot, "v1", pathname.slice("/api/v1/openapi/".length));
  }

  if (pathname.startsWith("/api/v1/")) {
    return path.join(safeRoot, "v1", pathname.slice("/api/v1/".length));
  }

  return null;
};

describe("paths-2 output types", async () => {
  let tmpRoot = "";
  let outputRoot = "";
  let typecheckRoot = "";
  let baseUrl = "";
  let server: ReturnType<typeof createServer> | null = null;

  beforeAll(async () => {
    tmpRoot = await fs.mkdtemp(
      path.join(os.tmpdir(), "swagger-typescript-api-paths-2-types-"),
    );
    outputRoot = path.join(tmpRoot, "output");
    typecheckRoot = path.join(tmpRoot, "typecheck");
    await fs.mkdir(outputRoot, { recursive: true });
    await fs.mkdir(typecheckRoot, { recursive: true });

    server = createServer(async (req, res) => {
      try {
        const host = req.headers.host || "127.0.0.1";
        const requestUrl = new URL(req.url || "/", `http://${host}`);
        const requestedPath = decodeURIComponent(requestUrl.pathname);
        const filePath = resolveApiFilePath(requestedPath);

        if (!filePath) {
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

  test("snapshot output passes strict TypeScript check", async () => {
    const snapshot = await fs.readFile(snapshotPath, { encoding: "utf8" });
    const source = extractVitestSnapshotBody(snapshot);

    await expect(
      typecheckGeneratedOutput(source, {
        fileName: "paths-2.snapshot.ts",
        tmpRoot: typecheckRoot,
      }),
    ).resolves.toBeUndefined();
  });

  test("generated output passes strict TypeScript check", async () => {
    await generateApi({
      fileName: "paths-2",
      url: `${baseUrl}${schemaUrlPath}`,
      output: outputRoot,
      silent: true,
      extractRequestBody: true,
      extractRequestParams: true,
      extractResponses: true,
      extractResponseError: true,
      extractResponseBody: true,
      extractEnums: true,
      generateClient: true,
      generateRouteTypes: false,
    });

    const source = await fs.readFile(path.join(outputRoot, "paths-2.ts"), {
      encoding: "utf8",
    });

    await expect(
      typecheckGeneratedOutput(source, {
        fileName: "paths-2.generated.ts",
        tmpRoot: typecheckRoot,
      }),
    ).resolves.toBeUndefined();
  });
});
