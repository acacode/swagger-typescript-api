import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    lib: "src/index.js",
    cli: "index.ts",
  },
  clean: true,
  dts: {
    entry: {
      types: "types/index.d.ts",
    },
  },
  format: ["esm", "cjs"],
  minify: true,
  sourcemap: true,
  splitting: true,
  target: "node18",
  treeshake: true,
});
