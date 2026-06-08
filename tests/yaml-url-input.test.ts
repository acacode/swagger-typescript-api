import * as fs from "node:fs/promises";
import { createServer } from "node:http";
import * as os from "node:os";
import * as path from "node:path";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { generateApi } from "../src/index.js";

const petstoreYaml = `
openapi: "3.0.0"
info:
  version: 1.0.0
  title: Swagger Petstore
  license:
    name: MIT
servers:
  - url: http://petstore.swagger.io/v1
paths:
  /pets:
    get:
      summary: List all pets
      operationId: listPets
      tags:
        - pets
      parameters:
        - name: limit
          in: query
          required: false
          schema:
            type: integer
            format: int32
      responses:
        "200":
          description: A paged array of pets
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Pets"
        default:
          description: unexpected error
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
    post:
      summary: Create a pet
      operationId: createPets
      tags:
        - pets
      responses:
        "201":
          description: Null response
        default:
          description: unexpected error
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
  /pets/{petId}:
    get:
      summary: Info for a specific pet
      operationId: showPetById
      tags:
        - pets
      parameters:
        - name: petId
          in: path
          required: true
          description: The id of the pet to retrieve
          schema:
            type: string
      responses:
        "200":
          description: Expected response to a valid request
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Pet"
        default:
          description: unexpected error
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
components:
  schemas:
    Pet:
      type: object
      required:
        - id
        - name
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string
        tag:
          type: string
    Pets:
      type: array
      items:
        $ref: "#/components/schemas/Pet"
    Error:
      type: object
      required:
        - code
        - message
      properties:
        code:
          type: integer
          format: int32
        message:
          type: string
`;

describe("generateApi with YAML served over HTTP", () => {
  let tmpdir: string;
  let server: ReturnType<typeof createServer>;
  let baseUrl: string;

  beforeAll(async () => {
    tmpdir = await fs.mkdtemp(
      path.join(os.tmpdir(), "swagger-typescript-api-yaml-url-"),
    );

    server = createServer((req, res) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/yaml");
      res.end(petstoreYaml);
    });

    await new Promise<void>((resolve) => {
      server.listen(0, "127.0.0.1", () => resolve());
    });

    const address = server.address();
    const port = typeof address === "object" && address ? address.port : 0;
    baseUrl = `http://127.0.0.1:${port}/openapi.yaml`;
  });

  afterAll(async () => {
    await new Promise<void>((resolve) => {
      server.close(() => resolve());
    });
    await fs.rm(tmpdir, { recursive: true, force: true });
  });

  test("generates API from YAML URL via 'url' parameter", async () => {
    await generateApi({
      fileName: "YamlFromUrl",
      url: baseUrl,
      output: tmpdir,
      silent: true,
      generateClient: true,
      sortTypes: true,
    });

    const content = await fs.readFile(path.join(tmpdir, "YamlFromUrl.ts"), {
      encoding: "utf8",
    });

    expect(content).toContain("Pets");
    expect(content).toContain("Pet");
    expect(content).toContain("Error");
    expect(content).toContain("listPets");
    expect(content).toContain("showPetById");
    expect(content).toContain("createPets");
  });

  test("generates API from YAML URL via 'input' parameter (falls back to url)", async () => {
    await generateApi({
      fileName: "YamlFromInput",
      input: baseUrl,
      url: baseUrl,
      output: tmpdir,
      silent: true,
      generateClient: true,
      sortTypes: true,
    });

    const content = await fs.readFile(path.join(tmpdir, "YamlFromInput.ts"), {
      encoding: "utf8",
    });

    expect(content).toContain("Pets");
    expect(content).toContain("listPets");
  });
});
