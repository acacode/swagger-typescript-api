import * as fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { generateApi } from "../../../src/index.js";

/**
 * Reproduces https://github.com/acacode/swagger-typescript-api/issues/551
 *
 * With discriminator propertyName "@type", the generator produced invalid TS:
 * `@type: Key` instead of `"@type": Key`, causing Prettier SyntaxError
 * "Property or signature expected".
 *
 * Command from issue: swagger-typescript-api --extract-enums --no-client
 * --path <spec> --name kundenangaben-api.model.ts
 */
describe("issue-551", async () => {
  let tmpdir = "";

  beforeAll(async () => {
    tmpdir = await fs.mkdtemp(path.join(os.tmpdir(), "swagger-typescript-api"));
  });

  afterAll(async () => {
    await fs.rm(tmpdir, { recursive: true });
  });

  test("discriminator with propertyName @type generates valid TypeScript", async () => {
    await generateApi({
      fileName: "schema",
      input: path.resolve(import.meta.dirname, "schema.yaml"),
      output: tmpdir,
      silent: true,
      extractEnums: true,
      generateClient: false,
    });

    const content = await fs.readFile(path.join(tmpdir, "schema.ts"), {
      encoding: "utf8",
    });

    // Bug #551: discriminator key was emitted as @type: Key (invalid);
    // must be "@type": Key so that TS/Prettier accept it.
    expect(content).toContain('"@type":');
    expect(content).not.toMatch(/\s@type:\s/);
    expect(content).toMatchSnapshot();
  });
});
