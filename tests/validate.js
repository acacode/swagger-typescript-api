const { resolve } = require("path");
const createGeneratedApiInfos = require("./helpers/createGeneratedApiInfos");
const validateGeneratedModule = require("./helpers/validateGeneratedModule");

const v2ApiPaths = createGeneratedApiInfos(resolve(__dirname, "./generated/v2.0"));
const v3ApiPaths = createGeneratedApiInfos(resolve(__dirname, "./generated/v3.0"));

let hasErrors = false;

[
  ...v2ApiPaths,
  ...v3ApiPaths,
].forEach(pathToFile => {
  const diagnostics = validateGeneratedModule({ pathToFile })

  if (!hasErrors) {
    hasErrors = !!diagnostics.length
  }
})

if (hasErrors) {
  process.exit(1)
} else {
  console.log('everything is good:)')
}
