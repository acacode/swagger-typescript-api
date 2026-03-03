import { describe, expect, test } from "vitest";
import { CodeGenConfig } from "../src/configuration.js";
import { SwaggerSchemaResolver } from "../src/swagger-schema-resolver.js";
import { FileSystem } from "../src/util/file-system.js";

describe("SwaggerSchemaResolver normalizeRefValue", () => {
  const resolver = new SwaggerSchemaResolver(
    new CodeGenConfig({}),
    new FileSystem(),
  );
  const normalizeRefValue = (
    resolver as unknown as { normalizeRefValue: (ref: string) => string }
  ).normalizeRefValue.bind(resolver);

  test.each([
    {
      ref: "./paths/repro.yaml/#/components/schemas/User",
      expected: "./paths/repro.yaml#/components/schemas/User",
    },
    {
      ref: "./paths/repro.yaml#components/schemas/User",
      expected: "./paths/repro.yaml#/components/schemas/User",
    },
    {
      ref: "./paths/repro.yaml#/components/schemas/User",
      expected: "./paths/repro.yaml#/components/schemas/User",
    },
    {
      ref: "https://example.com/schema.yaml#components/schemas/User",
      expected: "https://example.com/schema.yaml#/components/schemas/User",
    },
    {
      ref: "https://example.com/schema.yaml#/components/schemas/User",
      expected: "https://example.com/schema.yaml#/components/schemas/User",
    },
    {
      ref: "./paths/repro.yaml",
      expected: "./paths/repro.yaml",
    },
  ])("normalizes $ref: $ref", ({ ref, expected }) => {
    expect(normalizeRefValue(ref)).toBe(expected);
  });

  const normalizeRefsInSchema = (
    resolver as unknown as { normalizeRefsInSchema: (schema: unknown) => void }
  ).normalizeRefsInSchema.bind(resolver);

  test("normalizes nested refs recursively in objects and arrays", () => {
    const schema = {
      $ref: "./paths/root.yaml#components/schemas/Root",
      properties: {
        child: {
          $ref: "./paths/child.yaml/#/components/schemas/Child",
        },
      },
      oneOf: [
        {
          $ref: "./paths/one.yaml#components/schemas/One",
        },
        {
          items: {
            $ref: "./paths/two.yaml/#/components/schemas/Two",
          },
        },
      ],
      untouched: "value",
    };

    normalizeRefsInSchema(schema);

    expect(schema).toEqual({
      $ref: "./paths/root.yaml#/components/schemas/Root",
      properties: {
        child: {
          $ref: "./paths/child.yaml#/components/schemas/Child",
        },
      },
      oneOf: [
        {
          $ref: "./paths/one.yaml#/components/schemas/One",
        },
        {
          items: {
            $ref: "./paths/two.yaml#/components/schemas/Two",
          },
        },
      ],
      untouched: "value",
    });
  });
});
