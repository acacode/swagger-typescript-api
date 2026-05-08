import * as fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import { afterAll, beforeAll, describe, expect, test, vi } from "vitest";
import { generateApi } from "../../../src/index.js";

describe("github-url-refs", async () => {
  let tmpRoot = "";
  let outputRoot = "";
  let responsesRequestCount = 0;

  const schemaUrl =
    "https://github.com/example/platform-api/blob/refs/heads/master/src/main/resources/openapi/schema.yaml";
  const rawSchemaUrl =
    "https://raw.githubusercontent.com/example/platform-api/refs/heads/master/src/main/resources/openapi/schema.yaml";
  const rawResponsesUrl =
    "https://raw.githubusercontent.com/example/platform-api/refs/heads/master/src/main/resources/openapi/common/responses.yaml";

  const fixturesByUrl = new Map([
    [schemaUrl, path.resolve(import.meta.dirname, "schema.yaml")],
    [rawSchemaUrl, path.resolve(import.meta.dirname, "schema.yaml")],
    [
      rawResponsesUrl,
      path.resolve(import.meta.dirname, "common/responses.yaml"),
    ],
  ]);

  beforeAll(async () => {
    tmpRoot = await fs.mkdtemp(
      path.join(os.tmpdir(), "swagger-typescript-api-github-url-refs-"),
    );
    outputRoot = path.join(tmpRoot, "output");
    await fs.mkdir(outputRoot, { recursive: true });

    vi.spyOn(globalThis, "fetch").mockImplementation(async (input) => {
      const requestUrl =
        typeof input === "string"
          ? input
          : input instanceof URL
            ? input.toString()
            : input.url;
      const urlWithoutHash = new URL(requestUrl);
      urlWithoutHash.hash = "";

      const fixturePath = fixturesByUrl.get(urlWithoutHash.toString());
      if (!fixturePath) {
        return new Response("Not Found", { status: 404 });
      }

      if (urlWithoutHash.toString() === rawResponsesUrl) {
        responsesRequestCount += 1;
      }

      const file = await fs.readFile(fixturePath, { encoding: "utf8" });
      return new Response(file, {
        status: 200,
        headers: {
          "Content-Type": "application/yaml; charset=utf-8",
        },
      });
    });
  });

  afterAll(async () => {
    vi.restoreAllMocks();
    await fs.rm(tmpRoot, { recursive: true, force: true });
  });

  test("loads relative refs from GitHub repository file URLs", async () => {
    await generateApi({
      fileName: "github-url-refs",
      url: schemaUrl,
      output: outputRoot,
      silent: true,
      extractRequestParams: true,
      extractResponseBody: true,
      extractResponseError: true,
      extractResponses: true,
      generateClient: true,
    });

    const content = await fs.readFile(
      path.join(outputRoot, "github-url-refs.ts"),
      {
        encoding: "utf8",
      },
    );

    expect(responsesRequestCount).toBeGreaterThan(0);
    expect(content).toContain("export interface ProjectPathResponse");
    expect(content).toContain("export interface GithubTestError");
    expect(content).toContain("requestId?: string");
    expect(content).toContain("getProjectPath:");
    expect(content).toContain("GetProjectPathError = GithubTestError");
    expect(content).toMatchSnapshot();
  });
});
