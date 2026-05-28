import * as fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { generateApi } from "../../../src/index.js";
import { createPaths2ApiServer, schemaUrlPath } from "./server.js";

describe("paths-2-prefer-existing-schema-names", async () => {
  let tmpRoot = "";
  let outputRoot = "";
  let baseUrl = "";
  let closeServer = async () => {};

  beforeAll(async () => {
    tmpRoot = await fs.mkdtemp(
      path.join(
        os.tmpdir(),
        "swagger-typescript-api-paths-2-prefer-existing-schema-names-",
      ),
    );
    outputRoot = path.join(tmpRoot, "output");
    await fs.mkdir(outputRoot, { recursive: true });

    const server = await createPaths2ApiServer();
    baseUrl = server.baseUrl;
    closeServer = server.close;
  });

  afterAll(async () => {
    await closeServer();
    await fs.rm(tmpRoot, { recursive: true, force: true });
  });

  test("generates clean schema names for external file refs", async () => {
    await generateApi({
      fileName: "paths-2",
      url: `${baseUrl}${schemaUrlPath}`,
      output: outputRoot,
      silent: true,
      preferExistingSchemaNamesForExternalRefs: true,
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
    expect(content).toContain("export interface SchUnwillingFort36");
    expect(content).toContain("export interface SchFavorableReservation40");
    expect(content).toContain("export interface SchAssuredMobility63");
    expect(content).toContain("export interface SchEmptyPants75");
    expect(content).toContain("export interface SchPowerfulCase310");
    expect(content).toContain("Record<string, SchPowerfulCase310>");
    expect(content).toContain("r = {");

    expect(content).not.toMatch(/SchUnwillingFort36SchUnwillingFort36(?![\w])/);
    expect(content).not.toMatch(/SchFavorableReservation40SchFavorableReservation40(?![\w])/);
    expect(content).not.toMatch(/SchAssuredMobility63SchAssuredMobility63(?![\w])/);
    expect(content).not.toMatch(/SchEmptyPants75SchEmptyPants75(?![\w])/);
    expect(content).not.toMatch(/SidecarConfigYaml(?![\w])/);

    const countOccurrences = (haystack: string, needle: string) =>
      haystack.split(needle).length - 1;

    expect(countOccurrences(content, "export interface SchUnwillingFort36 ")).toBe(
      1,
    );
    expect(countOccurrences(content, "export interface SchFavorableReservation40 ")).toBe(1);
    expect(countOccurrences(content, "export interface SchAssuredMobility63 ")).toBe(1);
    expect(countOccurrences(content, "export interface SchEmptyPants75 ")).toBe(1);

    expect(content).toMatchSnapshot();
  });
});
