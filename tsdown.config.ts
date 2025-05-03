import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    lib: "src/index.ts",
    cli: "index.ts",
  },
  format: ["esm", "cjs"],
  sourcemap: true,
});
