import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterAll, beforeAll, expect, it } from "vitest";
import { generateApi } from "../../../src/index.js";

let tmpdir = "";
let content = "";

beforeAll(async () => {
  tmpdir = fs.mkdtempSync(path.join(os.tmpdir(), "swagger-typescript-api-"));
  await generateApi({
    fileName: "schema",
    input: path.resolve(import.meta.dirname, "schema.json"),
    output: tmpdir,
    silent: true,
    generateClient: false,
    disableExternalSchemas: true,
  });
  content = fs.readFileSync(path.join(tmpdir, "schema.ts"), "utf-8");
});

afterAll(() => {
  fs.rmSync(tmpdir, { recursive: true, force: true });
});

it("keeps the declared string type when the external ref in allOf is not resolved", () => {
  expect(content).toMatch(/email\??: string/);
  expect(content).not.toMatch(/email\??: any/);
  expect(content).toMatch(/nickname\??: string/);
});
