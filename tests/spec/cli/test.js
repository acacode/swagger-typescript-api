const validateGeneratedModule = require("../../helpers/validateGeneratedModule");
const { resolve } = require("node:path");
const assertGeneratedModule = require("../../helpers/assertGeneratedModule");

validateGeneratedModule(resolve(__dirname, "./schema.ts"));
assertGeneratedModule(
  resolve(__dirname, "./schema.ts"),
  resolve(__dirname, "./expected.ts"),
);
