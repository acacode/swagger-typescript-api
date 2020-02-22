const { resolve } = require("path");
const createGeneratedApiInfos = require("./utils/createGeneratedApiInfos");
const validateGeneratedModule = require("./utils/validateGeneratedModule");

const v2ApiPaths = createGeneratedApiInfos(resolve(__dirname, "./generated/v2.0"));
const v3ApiPaths = createGeneratedApiInfos(resolve(__dirname, "./generated/v3.0"));

let hasErrors = false;

[
  ...v2ApiPaths,
  ...v3ApiPaths,
].forEach(path => {
  const diagnostics = validateGeneratedModule(path)

  if (!hasErrors) {
    hasErrors = !!diagnostics.length
  }
})

if (hasErrors) {
  process.exit(1)
} else {
  console.log('everything is good:)')
}
