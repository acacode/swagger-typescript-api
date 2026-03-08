import * as fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { generateApi } from "../../../src/index.js";

/**
 * Reproduces https://github.com/acacode/swagger-typescript-api/issues/463
 *
 * When using --axios and custom --api-class-name (e.g. BFF), instantiating
 * the generated class could throw: "Cannot read property 'prototype' of undefined".
 * This happens if the Api class extends HttpClient but HttpClient is not in scope
 * (e.g. missing or defined after the Api class in the generated file).
 */
describe("issue-463", async () => {
  let tmpdir = "";

  beforeAll(async () => {
    tmpdir = await fs.mkdtemp(
      path.join(os.tmpdir(), "swagger-typescript-api-463"),
    );
  });

  afterAll(async () => {
    await fs.rm(tmpdir, { recursive: true, force: true });
  });

  test("axios + custom api class name: HttpClient is defined before Api class", async () => {
    await generateApi({
      fileName: "bff",
      input: path.resolve(import.meta.dirname, "schema.json"),
      output: tmpdir,
      silent: true,
      generateClient: true,
      httpClientType: "axios",
      apiClassName: "BFF",
    });

    const content = await fs.readFile(path.join(tmpdir, "bff.ts"), {
      encoding: "utf8",
    });

    const httpClientClassIndex = content.indexOf("export class HttpClient");
    const bffClassIndex = content.indexOf("export class BFF");

    expect(httpClientClassIndex).toBeGreaterThanOrEqual(0);
    expect(bffClassIndex).toBeGreaterThanOrEqual(0);
    expect(
      content.slice(bffClassIndex, bffClassIndex + 80),
    ).toMatch(/extends HttpClient/);

    // HttpClient must appear before BFF so that BFF extends HttpClient correctly
    expect(httpClientClassIndex).toBeLessThan(bffClassIndex);

    expect(content).toMatchSnapshot();
  });

  test("generated Axios API class can be instantiated (no prototype error)", async () => {
    const projectRoot = path.resolve(import.meta.dirname, "..", "..", "..");
    const outputDir = path.join(projectRoot, "tmp-issue-463-run");
    await fs.mkdir(outputDir, { recursive: true });

    await generateApi({
      fileName: "api",
      input: path.resolve(import.meta.dirname, "schema.json"),
      output: outputDir,
      silent: true,
      generateClient: true,
      httpClientType: "axios",
      apiClassName: "BFF",
      toJS: true,
    });

    const jsPath = path.join(outputDir, "api.js");
    const content = await fs.readFile(jsPath, { encoding: "utf8" });
    expect(content).toContain("export class HttpClient");
    expect(content).toContain("export class BFF");
    expect(content).toMatch(/class BFF\s+extends\s+HttpClient/);

    // Import from dir under project root so Node resolves "axios" from project node_modules
    const moduleUrl = `file://${jsPath}`;
    const mod = await import(moduleUrl);
    const BFF = mod.BFF;
    expect(BFF).toBeDefined();

    const instance = new BFF();
    expect(instance).toBeInstanceOf(BFF);
    expect(instance.request).toBeDefined();

    await fs.rm(outputDir, { recursive: true, force: true });
  });
});
