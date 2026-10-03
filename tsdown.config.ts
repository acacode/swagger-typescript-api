import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    cli: "index.ts",
  },
  dts: true,
  format: ["esm", "cjs"],
  sourcemap: true,
  exports: {
    bin: {
      sta: "./index.ts",
      "swagger-typescript-api": "./index.ts",
    },
  },
});
