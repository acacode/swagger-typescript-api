/* eslint-disable */
/* tslint:disable */

import { generateApi } from "../../../src";
import { describe, expect, it } from "vitest";

describe("JSON-LD basic test", () => {
  it("should generate JSON-LD types correctly", async () => {
    const { files } = await generateApi({
      input: require.resolve("./schema.json"),
      generateClient: false,
      jsonLdOptions: {
        generateContext: true,
        generateUtils: true,
        strictTyping: false,
      },
    });

    expect(files).toMatchSnapshot();
  });

  it("should generate JSON-LD types with strict typing", async () => {
    const { files } = await generateApi({
      input: require.resolve("./schema.json"),
      generateClient: false,
      jsonLdOptions: {
        generateContext: true,
        generateUtils: true,
        strictTyping: true,
      },
    });

    expect(files).toMatchSnapshot();
  });

  it("should handle JSON-LD entities with context", async () => {
    const { files } = await generateApi({
      input: require.resolve("./schema.json"),
      generateClient: false,
      jsonLdOptions: {
        generateContext: true,
        generateUtils: true,
        entityPrefix: "JsonLd",
        contextSuffix: "Context",
      },
    });

    expect(files).toMatchSnapshot();
  });
});
