const _ = require("lodash");
const { generateApi } = require("../../../src");
const { resolve } = require("path");
const validateGeneratedModule = require("../../helpers/validateGeneratedModule");
const createSchemasInfos = require("../../helpers/createSchemaInfos");

const schemas = createSchemasInfos({ absolutePathToSchemas: resolve(__dirname, "./") });

schemas.forEach(({ absolutePath, apiFileName }) => {
  generateApi({
    silent: true,
    name: apiFileName,
    input: absolutePath,
    output: resolve(__dirname, "./"),
    typePrefix: "SwaggerType",
    typeSuffix: "GeneratedDataContract",
    generateClient: true,
    generateResponses: true,
  })
    .then((output) => {
      const content = _.split(output.files[0].content, "\n");
      const reservedTypes = [
        "QueryParamsType",
        "ResponseFormat",
        "FullRequestParams",
        "RequestParams",
        "ApiConfig",
        "HttpResponse",
      ];

      for (const line of content) {
        if (_.startsWith(line, "export interface") || _.startsWith(line, "export type")) {
          const typeName = _.split(_.split(line, " ")[2], "<")[0] || "";

          if (!_.includes(reservedTypes, typeName)) {
            if (
              !_.startsWith(typeName, "SwaggerType") ||
              !_.endsWith(typeName, "GeneratedDataContract")
            ) {
              throw "Test failed";
            }
          }
        }
      }

      const diagnostics = validateGeneratedModule({
        pathToFile: resolve(__dirname, `./${apiFileName}`),
      });
      if (diagnostics.length) throw "Failed";
    })
    .catch((e) => {
      console.error("--type-suffix --type-prefix options test failed.");
      throw e;
    });
});
