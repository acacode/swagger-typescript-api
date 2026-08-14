import * as fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import { pathToFileURL } from "node:url";
import { Eta } from "eta";
import * as ts from "typescript";
import { afterAll, beforeAll, describe, expect, test } from "vitest";

describe("fetch http client query serialization", () => {
  let tmpdir = "";
  let client: {
    toQueryString(rawQuery?: Record<string, unknown>): string;
  };

  beforeAll(async () => {
    tmpdir = await fs.mkdtemp(path.join(os.tmpdir(), "swagger-typescript-api"));

    const template = await fs.readFile(
      path.resolve(
        import.meta.dirname,
        "../templates/base/http-clients/fetch-http-client.ejs",
      ),
      { encoding: "utf8" },
    );

    const eta = new Eta();
    const rendered = eta.renderString(template, {
      apiConfig: { baseUrl: "" },
      config: { unwrapResponseData: false },
      generateResponses: false,
    });

    const transpiled = ts.transpileModule(rendered, {
      compilerOptions: {
        module: ts.ModuleKind.ES2022,
        target: ts.ScriptTarget.ES2022,
      },
    }).outputText;

    const modulePath = path.join(tmpdir, "fetch-http-client.mjs");
    await fs.writeFile(modulePath, transpiled, { encoding: "utf8" });

    const { HttpClient } = await import(pathToFileURL(modulePath).href);
    client = new HttpClient();
  });

  afterAll(async () => {
    await fs.rm(tmpdir, { recursive: true, force: true });
  });

  test("serializes primitives as scalar params", () => {
    expect(client.toQueryString({ page: 3 })).toBe("page=3");
  });

  test("serializes arrays with bracketed indexes", () => {
    expect(client.toQueryString({ tags: ["one", "two"] })).toBe(
      "tags%5B0%5D=one&tags%5B1%5D=two",
    );
  });

  test("serializes plain objects with bracketed keys", () => {
    expect(client.toQueryString({ filter: { status: "active" } })).toBe(
      "filter%5Bstatus%5D=active",
    );
  });

  test("keeps null values on the scalar path", () => {
    expect(client.toQueryString({ empty: null })).toBe("empty=null");
  });

  test("keeps Date values on the scalar path", () => {
    const value = new Date("2025-10-23T00:00:00.000Z");

    expect(client.toQueryString({ when: value })).toBe(
      `when=${encodeURIComponent(`${value}`)}`,
    );
  });
});
