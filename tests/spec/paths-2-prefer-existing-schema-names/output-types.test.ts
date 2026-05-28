import * as fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { generateApi } from "../../../src/index.js";
import {
  extractVitestSnapshotBody,
  typecheckGeneratedOutput,
} from "../../typecheck-generated-output.js";
import { createPaths2ApiServer, schemaUrlPath } from "./server.js";

describe("paths-2-prefer-existing-schema-names output types", async () => {
  let tmpRoot = "";
  let outputRoot = "";
  let typecheckRoot = "";
  let baseUrl = "";
  let closeServer = async () => {};

  const snapshotPath = path.resolve(
    import.meta.dirname,
    "__snapshots__/basic.test.ts.snap",
  );

  beforeAll(async () => {
    tmpRoot = await fs.mkdtemp(
      path.join(
        os.tmpdir(),
        "swagger-typescript-api-paths-2-prefer-existing-schema-names-types-",
      ),
    );
    outputRoot = path.join(tmpRoot, "output");
    typecheckRoot = path.join(tmpRoot, "typecheck");
    await fs.mkdir(outputRoot, { recursive: true });
    await fs.mkdir(typecheckRoot, { recursive: true });

    const server = await createPaths2ApiServer();
    baseUrl = server.baseUrl;
    closeServer = server.close;
  });

  afterAll(async () => {
    await closeServer();
    await fs.rm(tmpRoot, { recursive: true, force: true });
  });

  test("snapshot output passes strict TypeScript check", async () => {
    const snapshot = await fs.readFile(snapshotPath, { encoding: "utf8" });
    const source = extractVitestSnapshotBody(snapshot);

    await expect(
      typecheckGeneratedOutput(source, {
        fileName: "paths-2.snapshot.ts",
        tmpRoot: typecheckRoot,
      }),
    ).resolves.toBeUndefined();
  });

  test("generated output passes strict TypeScript check", async () => {
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

    const source = await fs.readFile(path.join(outputRoot, "paths-2.ts"), {
      encoding: "utf8",
    });

    await expect(
      typecheckGeneratedOutput(source, {
        fileName: "paths-2.generated.ts",
        tmpRoot: typecheckRoot,
      }),
    ).resolves.toBeUndefined();
  });
});
