const { resolve } = require("path");
const createGeneratedApiInfos = require("./helpers/createGeneratedApiInfos");
const validateGeneratedModule = require("./helpers/validateGeneratedModule");

const v2ApiPaths = createGeneratedApiInfos(resolve(__dirname, "./generated/v2.0"));
const v3ApiPaths = createGeneratedApiInfos(resolve(__dirname, "./generated/v3.0"));

[...v2ApiPaths, ...v3ApiPaths].forEach((pathToFile) => {
  validateGeneratedModule(pathToFile);
});

console.log("everything is good:)");
