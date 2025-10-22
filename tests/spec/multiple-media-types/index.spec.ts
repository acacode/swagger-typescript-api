import * as fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { generateApi } from "../../../src/index.js";

describe("multiple media types in request body", async () => {
  let tmpdir: string;

  beforeAll(async () => {
    tmpdir = await fs.mkdtemp(path.join(os.tmpdir(), "swagger-typescript-api"));
  });

  afterAll(async () => {
    await fs.rm(tmpdir, { recursive: true });
  });

  test("should generate union type for request body with multiple media types", async () => {
    const fileName = "MultipleMediaTypesApi";
    
    await generateApi({
      fileName,
      input: path.resolve(__dirname, "./schema.json"),
      output: tmpdir,
      silent: true,
      generateClient: true,
    });

    const content = await fs.readFile(path.join(tmpdir, `${fileName}.ts`), {
      encoding: "utf8",
    });

    // Save the snapshot for future comparison
    expect(content).toMatchSnapshot();
    
    // Additional specific checks
    expect(content).toContain("Cat | Dog");
    expect(content).toContain("addPet");
  });
});
