import * as fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { generateApi } from "../../../src/index.js";

describe("TypeScript syntax fix for operationIds starting with numbers", async () => {
  let tmpdir: string;

  beforeAll(async () => {
    tmpdir = await fs.mkdtemp(path.join(os.tmpdir(), "swagger-typescript-api"));
  });

  afterAll(async () => {
    await fs.rm(tmpdir, { recursive: true });
  });

  test("should use assignment syntax for direct class methods", async () => {
    const schema = {
      "openapi": "3.0.0",
      "info": {
        "title": "Test API",
        "version": "1.0.0"
      },
      "paths": {
        "/": {
          "get": {
            "operationId": "123getUser",
            "summary": "Get user with operationId starting with number",
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "id": { "type": "integer" },
                        "name": { "type": "string" }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    };

    const schemaPath = path.join(tmpdir, "direct-method-schema.json");
    await fs.writeFile(schemaPath, JSON.stringify(schema, null, 2));

    await generateApi({
      fileName: "direct-method",
      input: schemaPath,
      output: tmpdir,
      silent: true,
      generateClient: true,
    });

    const content = await fs.readFile(path.join(tmpdir, "direct-method.ts"), {
      encoding: "utf8",
    });

    // Should use assignment syntax for direct class methods
    expect(content).toContain('"123GetUser" = ');
    // Should not use colon syntax for direct class methods
    expect(content).not.toContain('"123GetUser": ');
  });

  test("should use colon syntax for object properties", async () => {
    const schema = {
      "openapi": "3.0.0",
      "info": {
        "title": "Test API",
        "version": "1.0.0"
      },
      "paths": {
        "/api/user/{id}": {
          "get": {
            "operationId": "456getUser",
            "summary": "Get user with operationId starting with number",
            "tags": ["Users"],
            "parameters": [
              {
                "name": "id",
                "in": "path",
                "required": true,
                "schema": {
                  "type": "integer"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "id": { "type": "integer" },
                        "name": { "type": "string" }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    };

    const schemaPath = path.join(tmpdir, "object-property-schema.json");
    await fs.writeFile(schemaPath, JSON.stringify(schema, null, 2));

    await generateApi({
      fileName: "object-property",
      input: schemaPath,
      output: tmpdir,
      silent: true,
      generateClient: true,
    });

    const content = await fs.readFile(path.join(tmpdir, "object-property.ts"), {
      encoding: "utf8",
    });

    // Should use colon syntax for object properties
    expect(content).toContain('"456GetUser": ');
    // Should not use assignment syntax for object properties
    expect(content).not.toContain('"456GetUser" = ');
  });

  test("should handle normal identifiers correctly", async () => {
    const schema = {
      "openapi": "3.0.0",
      "info": {
        "title": "Test API",
        "version": "1.0.0"
      },
      "paths": {
        "/": {
          "get": {
            "operationId": "normalMethod",
            "summary": "Normal method",
            "responses": {
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object"
                    }
                  }
                }
              }
            }
          }
        }
      }
    };

    const schemaPath = path.join(tmpdir, "normal-method-schema.json");
    await fs.writeFile(schemaPath, JSON.stringify(schema, null, 2));

    await generateApi({
      fileName: "normal-method",
      input: schemaPath,
      output: tmpdir,
      silent: true,
      generateClient: true,
    });

    const content = await fs.readFile(path.join(tmpdir, "normal-method.ts"), {
      encoding: "utf8",
    });

    // Should use assignment syntax for direct class methods (no quotes needed)
    expect(content).toContain('normalMethod = ');
    // Should not use colon syntax for direct class methods
    expect(content).not.toContain('normalMethod: ');
  });
});