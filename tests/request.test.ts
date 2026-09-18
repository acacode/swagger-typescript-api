import { afterEach, describe, expect, test, vi } from "vitest";
import { CodeGenConfig } from "../src/configuration.js";
import * as remoteSchemaFetch from "../src/util/remote-schema-fetch.js";
import { Request } from "../src/util/request.js";

describe("Request.download", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("returns response text on success", async () => {
    const config = new CodeGenConfig({ url: "http://example.com/spec.json" });
    const request = new Request(config);

    vi.spyOn(remoteSchemaFetch, "isSameHttpOrigin").mockReturnValue(true);
    vi.spyOn(remoteSchemaFetch, "fetchRemoteSchemaResponse").mockResolvedValue(
      new Response('{"openapi":"3.0.0"}', { status: 200 }),
    );

    const result = await request.download({
      url: "http://example.com/spec.json",
      authToken: "Bearer token",
    });

    expect(result).toBe('{"openapi":"3.0.0"}');
  });

  test("includes auth header when URL is same-origin as config.url", async () => {
    const config = new CodeGenConfig({ url: "http://example.com/spec.json" });
    const request = new Request(config);

    vi.spyOn(remoteSchemaFetch, "isSameHttpOrigin").mockReturnValue(true);
    const fetchRemoteSchemaResponse = vi
      .spyOn(remoteSchemaFetch, "fetchRemoteSchemaResponse")
      .mockResolvedValue(new Response("ok", { status: 200 }));

    await request.download({
      url: "http://example.com/spec.json",
      authToken: "Bearer token",
    });

    expect(fetchRemoteSchemaResponse).toHaveBeenCalledWith(
      "http://example.com/spec.json",
      expect.objectContaining({ headers: { Authorization: "Bearer token" } }),
      expect.objectContaining({
        specSourceUrl: "http://example.com/spec.json",
        allowExplicitSpecUrl: true,
      }),
    );
  });

  test("omits auth header when URL is cross-origin to config.url", async () => {
    const config = new CodeGenConfig({ url: "http://example.com/spec.json" });
    const request = new Request(config);

    vi.spyOn(remoteSchemaFetch, "isSameHttpOrigin").mockReturnValue(false);
    const fetchRemoteSchemaResponse = vi
      .spyOn(remoteSchemaFetch, "fetchRemoteSchemaResponse")
      .mockResolvedValue(new Response("ok", { status: 200 }));

    await request.download({
      url: "http://other.com/spec.json",
      authToken: "Bearer token",
    });

    expect(fetchRemoteSchemaResponse).toHaveBeenCalledWith(
      "http://other.com/spec.json",
      expect.not.objectContaining({ headers: expect.anything() }),
      expect.anything(),
    );
  });

  test("omits auth header when no authToken provided", async () => {
    const config = new CodeGenConfig({ url: "http://example.com/spec.json" });
    const request = new Request(config);

    const fetchRemoteSchemaResponse = vi
      .spyOn(remoteSchemaFetch, "fetchRemoteSchemaResponse")
      .mockResolvedValue(new Response("ok", { status: 200 }));

    await request.download({ url: "http://example.com/spec.json" });

    expect(fetchRemoteSchemaResponse).toHaveBeenCalledWith(
      "http://example.com/spec.json",
      expect.not.objectContaining({ headers: expect.anything() }),
      expect.anything(),
    );
  });

  test("passes allowExplicitSpecUrl: true in policy", async () => {
    const config = new CodeGenConfig({ url: "http://example.com/spec.json" });
    const request = new Request(config);

    const fetchRemoteSchemaResponse = vi
      .spyOn(remoteSchemaFetch, "fetchRemoteSchemaResponse")
      .mockResolvedValue(new Response("ok", { status: 200 }));

    await request.download({ url: "http://example.com/spec.json" });

    expect(fetchRemoteSchemaResponse).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(Object),
      expect.objectContaining({ allowExplicitSpecUrl: true }),
    );
  });

  test("passes specSourceUrl from config.url", async () => {
    const config = new CodeGenConfig({ url: "http://example.com/spec.json" });
    const request = new Request(config);

    const fetchRemoteSchemaResponse = vi
      .spyOn(remoteSchemaFetch, "fetchRemoteSchemaResponse")
      .mockResolvedValue(new Response("ok", { status: 200 }));

    await request.download({ url: "http://example.com/spec.json" });

    expect(fetchRemoteSchemaResponse).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(Object),
      expect.objectContaining({
        specSourceUrl: "http://example.com/spec.json",
      }),
    );
  });

  test("throws when fetchRemoteSchemaResponse returns null (SSRF blocked)", async () => {
    const config = new CodeGenConfig({ url: "http://example.com/spec.json" });
    const request = new Request(config);

    vi.spyOn(remoteSchemaFetch, "isSameHttpOrigin").mockReturnValue(false);
    vi.spyOn(remoteSchemaFetch, "fetchRemoteSchemaResponse").mockResolvedValue(
      null,
    );

    await expect(
      request.download({ url: "http://evil.internal/spec.json" }),
    ).rejects.toThrow(
      'URL "http://evil.internal/spec.json" is not allowed for fetching',
    );
  });

  test("throws when response.text() fails", async () => {
    const config = new CodeGenConfig({ url: "http://example.com/spec.json" });
    const request = new Request(config);

    const response = new Response("ok", { status: 200 });
    vi.spyOn(response, "text").mockRejectedValue(new Error("stream error"));

    vi.spyOn(remoteSchemaFetch, "isSameHttpOrigin").mockReturnValue(true);
    vi.spyOn(remoteSchemaFetch, "fetchRemoteSchemaResponse").mockResolvedValue(
      response,
    );

    await expect(
      request.download({
        url: "http://example.com/spec.json",
        authToken: "Bearer token",
      }),
    ).rejects.toThrow(
      'error while fetching data from URL "http://example.com/spec.json"',
    );
  });

  test("merges config.requestOptions into fetch options", async () => {
    const config = new CodeGenConfig({
      url: "http://example.com/spec.json",
      requestOptions: { headers: { "X-Custom": "value" } },
    });
    const request = new Request(config);

    vi.spyOn(remoteSchemaFetch, "isSameHttpOrigin").mockReturnValue(true);
    const fetchRemoteSchemaResponse = vi
      .spyOn(remoteSchemaFetch, "fetchRemoteSchemaResponse")
      .mockResolvedValue(new Response("ok", { status: 200 }));

    await request.download({
      url: "http://example.com/spec.json",
      authToken: "Bearer token",
    });

    const callArgs = fetchRemoteSchemaResponse.mock.calls[0];
    const initArg = callArgs[1] as Record<string, unknown>;
    const headers = initArg.headers as Record<string, string>;
    expect(headers["Authorization"]).toBe("Bearer token");
    expect(headers["X-Custom"]).toBe("value");
  });
});
