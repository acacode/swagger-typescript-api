import * as fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { generateApi } from "../../../src/index.js";

describe("basic", async () => {
  let tmpdir = "";
  const remoteRefTestTimeout = 120_000;

  const generateAndReadOutput = async () => {
    await generateApi({
      fileName: "schema",
      input: path.resolve(import.meta.dirname, "schema.yaml"),
      output: tmpdir,
      silent: true,
      extractRequestBody: true,
      extractRequestParams: true,
      extractResponses: true,
      extractResponseError: true,
      extractResponseBody: true,
      extractEnums: true,
      generateClient: true,
    });

    return fs.readFile(path.join(tmpdir, "schema.ts"), {
      encoding: "utf8",
    });
  };

  beforeAll(async () => {
    tmpdir = await fs.mkdtemp(path.join(os.tmpdir(), "swagger-typescript-api"));
  });

  afterAll(async () => {
    await fs.rm(tmpdir, { recursive: true });
  });

  test(
    "paths(simplest-1-path)",
    async () => {
      const content = await generateAndReadOutput();

      expect(content).toMatchSnapshot();
    },
    remoteRefTestTimeout,
  );

  test(
    "paths(cross-file-ref-variants)",
    async () => {
      const content = await generateAndReadOutput();

      expect(content).toContain("export type GetRepositoryData = Repository;");
      expect(content).toContain("export type GetExternalUserData = User;");
      expect(content).toContain(
        "export type GetExternalContainerData = CrossFileMixed;",
      );
      expect(content).toContain(
        "export type GetExternalBridgeData = CrossBridge;",
      );
      expect(content).toContain("export type CrossFileRepositoryViaRepro =");
      expect(content).toContain("export type CrossFileUserViaRepro =");
      expect(content).toContain("export type CrossFileNestedViaRepro =");
      expect(content).toContain("export type CrossFileMixedViaThird =");
      expect(content).toContain("export type CrossBridgeViaThird =");
      expect(content).toContain("export type ReproBundleViaThird =");
      expect(content).toContain("export type ExternalGraphNodeViaRepro =");
      expect(content).toContain("export type MultiFileEnvelopeViaRepro =");
      expect(content).toContain("export type ThirdBridgeViaRepro =");
      expect(content).toContain("export type ThirdBundleViaRepro =");
      expect(content).toContain("export type UnionFromThirdViaRepro =");
      expect(content).toContain("export type AllOfFromThirdViaRepro =");
      expect(content).toContain("export type AnyOfFromThirdViaRepro =");
      expect(content).toContain(
        "export type ThirdRootPathUserViaRepro = ThirdRootPathUserAlias;",
      );
      expect(content).toContain(
        "export type ThirdRootPathRepositoryViaRepro = ThirdRootPathRepositoryAlias;",
      );
      expect(content).toContain(
        "export type ThirdRootPathBridgeViaRepro = ThirdRootPathBridgeAlias;",
      );
      expect(content).not.toContain(
        "export type ThirdRootPathBridgeAlias = any;",
      );
      expect(content).toContain("export type ReproCrossComplexRoot =");
      expect(content).toContain("export type ReproCrossUnionRoot =");
      expect(content).toContain("export type ThirdUnionRoot =");
      expect(content).toContain("export type ThirdAllOfRoot =");
      expect(content).toContain("export type ThirdAnyOfRoot =");
    },
    remoteRefTestTimeout,
  );
});
