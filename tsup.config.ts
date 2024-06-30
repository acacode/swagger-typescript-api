import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    lib: "src/index.js",
    cli: "index.js",
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
  target: "node22",
  treeshake: true,
});
