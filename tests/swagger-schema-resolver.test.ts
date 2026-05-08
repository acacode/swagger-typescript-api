import * as fs from "node:fs/promises";
import { createServer } from "node:http";
import * as os from "node:os";
import * as path from "node:path";
import { describe, expect, test } from "vitest";
import { CodeGenConfig } from "../src/configuration.js";
import { SwaggerSchemaResolver } from "../src/swagger-schema-resolver.js";
import { FileSystem } from "../src/util/file-system.js";

describe("SwaggerSchemaResolver normalizeRefValue", () => {
  const resolver = new SwaggerSchemaResolver(
    new CodeGenConfig({}),
    new FileSystem(),
  );
  const normalizeRefValue = (
    resolver as unknown as { normalizeRefValue: (ref: string) => string }
  ).normalizeRefValue.bind(resolver);

  test.each([
    {
      ref: "./paths/repro.yaml/#/components/schemas/User",
      expected: "./paths/repro.yaml#/components/schemas/User",
    },
    {
      ref: "./paths/repro.yaml#components/schemas/User",
      expected: "./paths/repro.yaml#/components/schemas/User",
    },
    {
      ref: "./paths/repro.yaml#/components/schemas/User",
      expected: "./paths/repro.yaml#/components/schemas/User",
    },
    {
      ref: "https://example.com/schema.yaml#components/schemas/User",
      expected: "https://example.com/schema.yaml#/components/schemas/User",
    },
    {
      ref: "https://example.com/schema.yaml#/components/schemas/User",
      expected: "https://example.com/schema.yaml#/components/schemas/User",
    },
    {
      ref: "./paths/repro.yaml",
      expected: "./paths/repro.yaml",
    },
  ])("normalizes $ref: $ref", ({ ref, expected }) => {
    expect(normalizeRefValue(ref)).toBe(expected);
  });

  const normalizeRefsInSchema = (
    resolver as unknown as { normalizeRefsInSchema: (schema: unknown) => void }
  ).normalizeRefsInSchema.bind(resolver);

  test("normalizes nested refs recursively in objects and arrays", () => {
    const schema = {
      $ref: "./paths/root.yaml#components/schemas/Root",
      properties: {
        child: {
          $ref: "./paths/child.yaml/#/components/schemas/Child",
        },
      },
      oneOf: [
        {
          $ref: "./paths/one.yaml#components/schemas/One",
        },
        {
          items: {
            $ref: "./paths/two.yaml/#/components/schemas/Two",
          },
        },
      ],
      untouched: "value",
    };

    normalizeRefsInSchema(schema);

    expect(schema).toEqual({
      $ref: "./paths/root.yaml#/components/schemas/Root",
      properties: {
        child: {
          $ref: "./paths/child.yaml#/components/schemas/Child",
        },
      },
      oneOf: [
        {
          $ref: "./paths/one.yaml#/components/schemas/One",
        },
        {
          items: {
            $ref: "./paths/two.yaml#/components/schemas/Two",
          },
        },
      ],
      untouched: "value",
    });
  });
});

describe("SwaggerSchemaResolver URL loading", () => {
  test("loads root schema by url and resolves relative external refs", async () => {
    const tmpRoot = await fs.mkdtemp(
      path.join(os.tmpdir(), "swagger-typescript-api-url-loading-"),
    );
    const fixturesRoot = path.join(tmpRoot, "fixtures");
    await fs.mkdir(path.join(fixturesRoot, "parts"), { recursive: true });

    await fs.copyFile(
      path.resolve(import.meta.dirname, "spec/paths-by-url/schema.yaml"),
      path.join(fixturesRoot, "schema.yaml"),
    );
    await fs.copyFile(
      path.resolve(import.meta.dirname, "spec/paths-by-url/parts/repro.yaml"),
      path.join(fixturesRoot, "parts/repro.yaml"),
    );
    await fs.copyFile(
      path.resolve(import.meta.dirname, "spec/paths-by-url/parts/third.yaml"),
      path.join(fixturesRoot, "parts/third.yaml"),
    );

    const server = createServer(async (req, res) => {
      try {
        const host = req.headers.host || "127.0.0.1";
        const requestUrl = new URL(req.url || "/", `http://${host}`);
        const requestedPath = decodeURIComponent(requestUrl.pathname);
        const filePath = path.resolve(
          path.join(fixturesRoot, `.${requestedPath}`),
        );
        const file = await fs.readFile(filePath, { encoding: "utf8" });
        res.statusCode = 200;
        res.end(file);
      } catch {
        res.statusCode = 404;
        res.end("Not Found");
      }
    });

    await new Promise<void>((resolve) => {
      server.listen(0, "127.0.0.1", () => resolve());
    });

    try {
      const address = server.address();
      const port = typeof address === "object" && address ? address.port : 0;
      const url = `http://127.0.0.1:${port}/schema.yaml`;

      const resolver = new SwaggerSchemaResolver(
        new CodeGenConfig({ url, silent: true }),
        new FileSystem(),
      );
      const resolved = await resolver.create();

      const schemaByRelativeRef = resolved.getRef("./parts/repro.yaml#/hello");
      const repositorySchema = resolved.getRef(
        "./parts/third.yaml#/components/schemas/repository",
      );

      expect(resolved.usageSchema.info?.title).toBe("paths-by-url");
      expect(schemaByRelativeRef).toBeTruthy();
      expect(repositorySchema).toBeTruthy();
      expect(repositorySchema).toMatchObject({
        type: "object",
        properties: {
          slug: { type: "string" },
        },
      });
    } finally {
      await new Promise<void>((resolve) => {
        server.close(() => resolve());
      });
      await fs.rm(tmpRoot, { recursive: true, force: true });
    }
  });
});
