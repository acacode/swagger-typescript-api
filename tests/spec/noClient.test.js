const { generateApi } = require("../../src");
const validateGeneratedModule = require("../helpers/validateGeneratedModule")
const specGeneratedOptions = require("../helpers/specGenerateOptions")

generateApi({
  ...specGeneratedOptions,
  generateClient: false,
})
  .then(sourceFile => {
    const diagnostics = validateGeneratedModule({ sourceFile })
    if (diagnostics.length) throw "Failed"
  })
  .catch(e => {
    console.error("types only test failed.")
    throw e
  })