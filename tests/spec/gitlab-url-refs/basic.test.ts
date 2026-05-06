import * as fs from "node:fs/promises";
import { createServer } from "node:http";
import * as os from "node:os";
import * as path from "node:path";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { generateApi } from "../../../src/index.js";

describe("gitlab-url-refs", async () => {
  let tmpRoot = "";
  let outputRoot = "";
  let baseUrl = "";
  let responsesRequestCount = 0;
  let server: ReturnType<typeof createServer> | null = null;

  const fixturesByGitlabPath = new Map([
    [
      "src/main/resources/openapi/schema.yaml",
      path.resolve(import.meta.dirname, "schema.yaml"),
    ],
    [
      "src/main/resources/openapi/common/responses.yaml",
      path.resolve(import.meta.dirname, "common/responses.yaml"),
    ],
  ]);

  beforeAll(async () => {
    tmpRoot = await fs.mkdtemp(
      path.join(os.tmpdir(), "swagger-typescript-api-gitlab-url-refs-"),
    );
    outputRoot = path.join(tmpRoot, "output");
    await fs.mkdir(outputRoot, { recursive: true });

    server = createServer(async (req, res) => {
      try {
        const host = req.headers.host || "127.0.0.1";
        const requestUrl = new URL(req.url || "/", `http://${host}`);
        const match = requestUrl.pathname.match(
          /^\/api\/v4\/projects\/8882828\/repository\/files\/(.+)\/raw$/,
        );

        const encodedGitlabFilePath = match?.[1];

        if (
          !encodedGitlabFilePath ||
          requestUrl.searchParams.get("ref") !== "master"
        ) {
          res.statusCode = 404;
          res.end("Not Found");
          return;
        }

        const gitlabFilePath = decodeURIComponent(encodedGitlabFilePath);
        const fixturePath = fixturesByGitlabPath.get(gitlabFilePath);

        if (!fixturePath) {
          res.statusCode = 404;
          res.end("Not Found");
          return;
        }

        if (gitlabFilePath.endsWith("/common/responses.yaml")) {
          responsesRequestCount += 1;
        }

        const file = await fs.readFile(fixturePath, { encoding: "utf8" });
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

  test("loads relative refs from GitLab repository file URLs", async () => {
    const schemaPath = encodeURIComponent(
      "src/main/resources/openapi/schema.yaml",
    );

    await generateApi({
      fileName: "gitlab-url-refs",
      url: `${baseUrl}/api/v4/projects/8882828/repository/files/${schemaPath}/raw?ref=master`,
      output: outputRoot,
      silent: true,
      extractRequestParams: true,
      extractResponseBody: true,
      extractResponseError: true,
      extractResponses: true,
      generateClient: true,
    });

    const content = await fs.readFile(
      path.join(outputRoot, "gitlab-url-refs.ts"),
      {
        encoding: "utf8",
      },
    );

    expect(responsesRequestCount).toBeGreaterThan(0);
    expect(content).toContain("export interface MemorySegmentResponse");
    expect(content).toContain("export interface TestFooError");
    expect(content).toContain("traceId?: string");
    expect(content).toContain("getMemory:");
    expect(content).toContain("GetMemoryError = TestFooError");
    expect(content).toMatchSnapshot();
  });
});
