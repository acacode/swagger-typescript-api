import * as fs from "node:fs/promises";
import { createServer } from "node:http";
import * as os from "node:os";
import * as path from "node:path";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { generateApi } from "../../../src/index.js";

const apiRoot = path.resolve(import.meta.dirname, "api");
const schemaUrlPath = "/api/v1/openapi/yaml";

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

describe("paths-2", async () => {
  let tmpRoot = "";
  let outputRoot = "";
  let baseUrl = "";
  let server: ReturnType<typeof createServer> | null = null;

  beforeAll(async () => {
    tmpRoot = await fs.mkdtemp(
      path.join(os.tmpdir(), "swagger-typescript-api-paths-2-"),
    );
    outputRoot = path.join(tmpRoot, "output");
    await fs.mkdir(outputRoot, { recursive: true });

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

  test("generates data contracts and http client from remote openapi url", async () => {
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

    const content = await fs.readFile(path.join(outputRoot, "paths-2.ts"), {
      encoding: "utf8",
    });

    expect(content).toContain("export class Api");
    expect(content).toContain("export interface SchUnwillingFort36SchUnwillingFort36");
    expect(content).toContain("export interface SchPowerfulCase310");
    expect(content).toContain("Record<string, SchPowerfulCase310>");
    expect(content).toContain("r = {");
    expect(content).not.toMatch(/SidecarConfigYaml(?![\w])/);

    const countOccurrences = (haystack: string, needle: string) =>
      haystack.split(needle).length - 1;

    expect(
      countOccurrences(
        content,
        "export interface SchFavorableReservation40SchFavorableReservation40 ",
      ),
    ).toBe(1);
    expect(
      countOccurrences(
        content,
        "export interface SchEvilOctave14SchEvilOctave14 ",
      ),
    ).toBe(1);
    expect(
      countOccurrences(
        content,
        "export interface SchAssuredMobility63SchAssuredMobility63 ",
      ),
    ).toBe(1);
    expect(
      countOccurrences(
        content,
        "export interface SchEmptyPants75SchEmptyPants75 ",
      ),
    ).toBe(1);

    expect(content).toMatchSnapshot();
  });
});
