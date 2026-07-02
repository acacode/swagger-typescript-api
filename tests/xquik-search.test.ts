import * as fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import { afterEach, describe, expect, test } from "vitest";
import { generateApi } from "../src/index.js";

describe("Xquik search OpenAPI generation", () => {
  let tmpRoot = "";

  afterEach(async () => {
    if (tmpRoot) {
      await fs.rm(tmpRoot, { recursive: true, force: true });
      tmpRoot = "";
    }
  });

  test("generates query parameters and response schemas", async () => {
    tmpRoot = await fs.mkdtemp(
      path.join(os.tmpdir(), "swagger-typescript-api-xquik-search-"),
    );

    const schema = {
      openapi: "3.1.0",
      info: { title: "Xquik API", version: "1.0" },
      components: {
        securitySchemes: {
          apiKey: {
            type: "apiKey",
            in: "header",
            name: "x-api-key",
          },
        },
        schemas: {
          PaginatedTweets: {
            type: "object",
            properties: {
              tweets: {
                type: "array",
                items: { $ref: "#/components/schemas/SearchTweet" },
              },
              has_next_page: { type: "boolean" },
              next_cursor: { type: "string" },
            },
          },
          SearchTweet: {
            type: "object",
            properties: {
              id: { type: "string" },
              text: { type: "string" },
              likeCount: { type: "integer" },
            },
          },
        },
      },
      paths: {
        "/api/v1/x/tweets/search": {
          get: {
            tags: ["Tweets"],
            operationId: "searchTweets",
            security: [{ apiKey: [] }],
            parameters: [
              {
                name: "q",
                in: "query",
                required: true,
                schema: { type: "string" },
              },
              {
                name: "cursor",
                in: "query",
                schema: { type: "string" },
              },
              {
                name: "limit",
                in: "query",
                schema: { type: "integer", maximum: 200 },
              },
            ],
            responses: {
              "200": {
                description: "Search results",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/PaginatedTweets",
                    },
                  },
                },
              },
            },
          },
        },
      },
    };

    const schemaPath = path.join(tmpRoot, "xquik-search-openapi.json");
    await fs.writeFile(schemaPath, JSON.stringify(schema), "utf8");

    await generateApi({
      output: tmpRoot,
      input: schemaPath,
      fileName: "xquik-search",
      httpClientType: "fetch",
      generateClient: true,
      silent: true,
    });

    const content = await fs.readFile(
      path.join(tmpRoot, "xquik-search.ts"),
      "utf8",
    );

    expect(content).toContain("export interface PaginatedTweets");
    expect(content).toContain("tweets?: SearchTweet[]");
    expect(content).toContain("likeCount?: number");
    expect(content).toContain("searchTweets");
    expect(content).toContain("q: string");
    expect(content).toContain("cursor?: string");
    expect(content).toContain("limit?: number");
  });
});
