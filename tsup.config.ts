import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    lib: "src/index.ts",
    cli: "index.ts",
  },
  clean: true,
  format: ["esm", "cjs"],
  minify: true,
  shims: true,
  sourcemap: true,
  splitting: true,
  target: "node18",
  treeshake: true,
});
