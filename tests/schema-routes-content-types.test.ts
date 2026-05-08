import { describe, expect, test } from "vitest";
import { CodeGenConfig } from "../src/configuration.js";
import { SchemaRoutes } from "../src/schema-routes/schema-routes.js";

function createSchemaRoutesWithExtractMocks(overrides: {
  getSchemaFromRequestType?: (schema: unknown) => { $ref?: string } | null;
  createParsedComponentMock?: (opts: { schema: unknown; typeName: string }) => {
    $ref: string;
    contentKind?: string;
    typeData?: { isExtractedResponseBody?: boolean };
  };
  getInlineParseContent?: (ref: { $ref: string }) => string;
}) {
  const config = new CodeGenConfig({ extractResponseBody: true });
  const createParsedComponentMock =
    overrides.createParsedComponentMock ?? (() => ({}));
  const getInlineParseContent =
    overrides.getInlineParseContent ?? ((ref: { $ref: string }) => ref.$ref);

  const schemaParserFabric = {
    schemaUtils: {
      getSchemaType: () => "string",
      safeAddNullToType: (_: unknown, type: unknown) => type,
      resolveTypeName: (_usage: string, opts: { suffixes?: string[] }) =>
        `GetExport${(opts.suffixes ?? ["Data"])[0]}`,
    },
    schemaFormatters: { formatDescription: (v: string) => v },
    createParsedComponent(opts: { schema: unknown; typeName: string }) {
      const out = createParsedComponentMock(opts);
      return {
        $ref: out.$ref ?? `Components.Schemas.${opts.typeName}`,
        contentKind: out.contentKind,
        typeData: out.typeData ?? { isExtractedResponseBody: true },
      };
    },
    getInlineParseContent(ref: { $ref: string }) {
      return getInlineParseContent(ref);
    },
  } as any;

  const schemaRoutes = new SchemaRoutes(
    config,
    schemaParserFabric,
    {} as any,
    {} as any,
    {} as any,
  ) as any;

  if (overrides.getSchemaFromRequestType) {
    schemaRoutes.getSchemaFromRequestType = overrides.getSchemaFromRequestType;
  }

  return { schemaRoutes, config };
}

describe("SchemaRoutes contentTypes", () => {
  test("getRequestInfoTypes derives contentTypes from response.content keys (not operationId)", () => {
    const config = new CodeGenConfig({});

    const schemaParserFabric = {
      schemaUtils: {
        getSchemaType: () => "string",
        safeAddNullToType: (_requestInfo: unknown, type: unknown) => type,
      },
      schemaFormatters: {
        formatDescription: (value: string) => value,
      },
    } as any;

    const schemaRoutes = new SchemaRoutes(
      config,
      schemaParserFabric,
      {} as any,
      {} as any,
      {} as any,
    ) as any;

    // Avoid pulling in full typing/parsing pipeline; not relevant for contentTypes.
    schemaRoutes.getTypeFromRequestInfo = () => "T";

    const requestInfos = {
      "200": {
        description: "ok",
        content: {
          "application/json": { schema: { type: "object" } },
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
            schema: { type: "string", format: "binary" },
          },
        },
      },
    };

    const operationId = "getMemoryLeak";
    const responseTypes = schemaRoutes.getRequestInfoTypes({
      requestInfos,
      parsedSchemas: {},
      operationId,
      defaultType: "any",
      resolvedSwaggerSchema: {} as any,
    });

    expect(responseTypes).toHaveLength(1);

    const contentTypes = responseTypes[0]?.contentTypes;
    expect(contentTypes).toEqual([
      "application/json",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ]);
    expect(contentTypes).not.toContain(operationId);
    expect(contentTypes).not.toContain("g");
  });
});

describe("SchemaRoutes extractResponseBodyIfItNeeded", () => {
  test("binary response: sets success.type to Blob and creates extracted alias component", () => {
    const { schemaRoutes, config } = createSchemaRoutesWithExtractMocks({});
    const responseInfo = { contentKind: "JSON" };
    const responseBodyInfo = {
      responses: [responseInfo],
      success: {
        isBinary: true,
        schema: responseInfo,
        type: "BinaryResponse",
      },
    };
    const routeInfo = { operationId: "getExport" };
    const routeName = { usage: "getExport" };

    schemaRoutes.extractResponseBodyIfItNeeded(
      routeInfo,
      responseBodyInfo,
      routeName,
    );

    expect(responseBodyInfo.success.type).toBe(config.Ts.Keyword.Blob);
    expect(responseBodyInfo.success.schema).toBeDefined();
    expect(
      responseBodyInfo.success.schema.typeData?.isExtractedResponseBody,
    ).toBe(true);
    expect(responseBodyInfo.responses[0].type).toBe(config.Ts.Keyword.Blob);
  });

  test("non-binary response with $ref: creates type alias and sets success.type to alias ref", () => {
    const aliasTypeName = "GetPetByIdData";
    const { schemaRoutes } = createSchemaRoutesWithExtractMocks({
      getInlineParseContent: () => aliasTypeName,
    });
    const responseInfo = {
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Pet" },
        },
      },
      contentKind: "JSON",
    };
    const responseBodyInfo = {
      responses: [responseInfo],
      success: {
        isBinary: false,
        schema: responseInfo,
        type: "Pet",
      },
    };
    const routeInfo = { operationId: "getPetById" };
    const routeName = { usage: "getPetById" };

    schemaRoutes.extractResponseBodyIfItNeeded(
      routeInfo,
      responseBodyInfo,
      routeName,
    );

    expect(responseBodyInfo.success.type).toBe(aliasTypeName);
    expect(
      responseBodyInfo.success.schema.typeData?.isExtractedResponseBody,
    ).toBe(true);
    expect(responseBodyInfo.success.schema.contentKind).toBe("JSON");
    expect(responseBodyInfo.responses[0].type).toBe(aliasTypeName);
  });

  test("response with no content schema and type Any/void: creates alias (= any) and uses it in route", () => {
    const aliasTypeName = "SingleFormUrlEncodedData";
    const { schemaRoutes, config } = createSchemaRoutesWithExtractMocks({
      getSchemaFromRequestType: () => null,
      getInlineParseContent: () => aliasTypeName,
    });
    const responseInfo = {
      contentKind: "Form",
      /* no content with schema → getSchemaFromRequestType returns null */
    };
    const responseBodyInfo = {
      responses: [responseInfo],
      success: {
        isBinary: false,
        schema: responseInfo,
        type: config.Ts.Keyword.Any,
      },
    };
    const routeInfo = { operationId: "singleFormUrlEncoded" };
    const routeName = { usage: "singleFormUrlEncoded" };

    schemaRoutes.extractResponseBodyIfItNeeded(
      routeInfo,
      responseBodyInfo,
      routeName,
    );

    expect(responseBodyInfo.success.type).toBe(aliasTypeName);
    expect(
      responseBodyInfo.success.schema.typeData?.isExtractedResponseBody,
    ).toBe(true);
    expect(responseBodyInfo.responses[0].type).toBe(aliasTypeName);
  });
});
