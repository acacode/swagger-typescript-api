const { resolve } = require("path");
const allSchemas = require("./allSchemas");
const validateGeneratedModule = require("./helpers/validateGeneratedModule");

allSchemas.forEach((schema) => {
  validateGeneratedModule(resolve(schema.outputPath, schema.apiFileName));
});

console.log("everything is good:)");
