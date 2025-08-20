import * as fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { generateApi } from "../../../src/index.js";

describe("jsdoc-escaping", async () => {
  let tmpdir = "";

  beforeAll(async () => {
    tmpdir = await fs.mkdtemp(path.join(os.tmpdir(), "swagger-typescript-api"));
  });

  afterAll(async () => {
    await fs.rm(tmpdir, { recursive: true });
  });

  test("should escape JSDoc comment characters in descriptions", async () => {
    await generateApi({
      fileName: "schema",
      input: path.resolve(import.meta.dirname, "schema.json"),
      output: tmpdir,
      silent: true,
    });

    const content = await fs.readFile(path.join(tmpdir, "schema.ts"), {
      encoding: "utf8",
    });

    // Check that the dangerous patterns are escaped and not executable
    expect(content).not.toMatch(/\*\/ alert\(/); // No unescaped code injection
    expect(content).not.toMatch(/\*\/ window\./); // No unescaped window manipulation
    expect(content).not.toMatch(/\*\/ dangerous content \*\//); // No unescaped dangerous content
    
    // Check that escaping is applied - look for backslash escapes
    expect(content).toMatch(/\*\\\//); // Should contain escaped */ 
    expect(content).toMatch(/\\\//); // Should contain escaped /*
    
    // Check that alert and window are escaped
    expect(content).toMatch(/alert\('XSS'\)/); // Should still contain the content but safely escaped
    expect(content).toMatch(/window\.location/); // Should still contain but safely escaped
    
    expect(content).toMatchSnapshot();
  });
});