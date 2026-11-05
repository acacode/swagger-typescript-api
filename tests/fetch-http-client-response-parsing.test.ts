import * as fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { generateApi } from "../src/index.js";

/**
 * Runtime behavior of the generated Fetch client when a response body cannot
 * be parsed in the declared format.
 * https://github.com/acacode/swagger-typescript-api/issues/1838
 */

const spec = {
  openapi: "3.0.3",
  info: { title: "Response parsing", version: "1.0.0" },
  paths: {
    "/item": {
      get: {
        operationId: "getItem",
        responses: {
          "200": {
            description: "ok",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { id: { type: "string" } },
                },
              },
            },
          },
        },
      },
    },
  },
};

type GeneratedClient = {
  request: (params: Record<string, unknown>) => Promise<{
    ok: boolean;
    status: number;
    data: unknown;
    error: unknown;
  }>;
};

type GeneratedModule = {
  HttpClient: new (config: { customFetch: typeof fetch }) => GeneratedClient;
};

let tmpdir = "";

async function loadClient(options: {
  fileName: string;
  disableThrowOnError?: boolean;
  unwrapResponseData?: boolean;
}): Promise<GeneratedModule> {
  await generateApi({
    fileName: options.fileName,
    spec,
    output: tmpdir,
    silent: true,
    disableThrowOnError: options.disableThrowOnError,
    unwrapResponseData: options.unwrapResponseData,
  });
  return import(path.join(tmpdir, `${options.fileName}.ts`));
}

function clientFor(module: GeneratedModule, response: () => Response) {
  return new module.HttpClient({ customFetch: async () => response() });
}

function abortedBodyStream() {
  return new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode('{"id":'));
      controller.error(new DOMException("aborted", "AbortError"));
    },
  });
}

const getJson = { path: "/item", method: "GET", format: "json" };

describe("fetch http client response parsing (issue 1838)", () => {
  let defaults: GeneratedModule;
  let noThrow: GeneratedModule;
  let unwrapped: GeneratedModule;

  beforeAll(async () => {
    tmpdir = await fs.mkdtemp(
      path.join(os.tmpdir(), "sta-fetch-response-parsing-"),
    );
    defaults = await loadClient({ fileName: "defaults" });
    noThrow = await loadClient({
      fileName: "no-throw",
      disableThrowOnError: true,
    });
    unwrapped = await loadClient({
      fileName: "unwrapped",
      unwrapResponseData: true,
    });
  });

  afterAll(async () => {
    await fs.rm(tmpdir, { recursive: true, force: true });
  });

  test("parses a valid JSON body", async () => {
    const client = clientFor(defaults, () =>
      Response.json({ id: "1" }, { status: 200 }),
    );

    const res = await client.request(getJson);

    expect(res.ok).toBe(true);
    expect(res.data).toEqual({ id: "1" });
    expect(res.error).toBeNull();
  });

  test("treats an empty 200 body as no data, not an error", async () => {
    const client = clientFor(defaults, () => new Response("", { status: 200 }));

    const res = await client.request(getJson);

    expect(res.data).toBeNull();
    expect(res.error).toBeNull();
  });

  test("treats a whitespace-only 200 body as no data", async () => {
    const client = clientFor(
      defaults,
      () => new Response("\n", { status: 200 }),
    );

    const res = await client.request(getJson);

    expect(res.data).toBeNull();
    expect(res.error).toBeNull();
  });

  test("treats 204 No Content as no data, not an error", async () => {
    const client = clientFor(
      defaults,
      () => new Response(null, { status: 204 }),
    );

    const res = await client.request(getJson);

    expect(res.status).toBe(204);
    expect(res.data).toBeNull();
    expect(res.error).toBeNull();
  });

  test("rejects a 200 response whose body is not valid JSON", async () => {
    const client = clientFor(
      defaults,
      () =>
        new Response("<html>login</html>", {
          status: 200,
          headers: { "Content-Type": "text/html" },
        }),
    );

    const rejection = await client.request(getJson).then(
      () => undefined,
      (e) => e,
    );

    expect(rejection).toMatchObject({ status: 200, data: null });
    expect(rejection.error).toBeInstanceOf(SyntaxError);
  });

  test("rejects a 200 response whose body stream is aborted", async () => {
    const client = clientFor(
      defaults,
      () => new Response(abortedBodyStream(), { status: 200 }),
    );

    const rejection = await client.request(getJson).then(
      () => undefined,
      (e) => e,
    );

    expect(rejection).toMatchObject({ status: 200, data: null });
    expect(rejection.error).toMatchObject({ name: "AbortError" });
  });

  test("keeps an empty non-2xx body from becoming a SyntaxError", async () => {
    const client = clientFor(defaults, () => new Response("", { status: 404 }));

    const rejection = await client.request(getJson).then(
      () => undefined,
      (e) => e,
    );

    expect(rejection).toMatchObject({ status: 404, data: null, error: null });
  });

  test("rejects with unwrapResponseData instead of resolving to null", async () => {
    const client = clientFor(
      unwrapped,
      () => new Response("not json", { status: 200 }),
    );

    await expect(client.request(getJson)).rejects.toMatchObject({
      status: 200,
    });
  });

  test("does not throw with disableThrowOnError", async () => {
    const client = clientFor(
      noThrow,
      () => new Response("not json", { status: 200 }),
    );

    const res = await client.request(getJson);

    expect(res.data).toBeNull();
    expect(res.error).toBeInstanceOf(SyntaxError);
  });
});
