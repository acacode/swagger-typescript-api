import { describe, expect, it } from "vitest";
import { CodeFormatter } from "../src/code-formatter.js";
import { CodeGenConfig } from "../src/configuration.js";

const INPUT = `import { join } from "node:path";

export  interface Foo {
 name:string;
}
`;

describe("disableFormatting", () => {
  it("skips Biome formatting when disableFormatting is on", async () => {
    const formatter = new CodeFormatter(
      new CodeGenConfig({ disableFormatting: true }),
    );
    const output = await formatter.formatCode(INPUT);

    expect(output).toContain("export  interface");
    expect(output).toContain("name:string");
    expect(output).not.toContain("name: string;");
    expect(output).not.toContain("join");
  });

  it("formats with Biome by default", async () => {
    const formatter = new CodeFormatter(new CodeGenConfig({}));
    const output = await formatter.formatCode(INPUT);

    expect(output).not.toContain("export  interface");
    expect(output).toContain("name: string;");
    expect(output).not.toContain("name:string");
    expect(output).not.toContain("join");
  });
});
