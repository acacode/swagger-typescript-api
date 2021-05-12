const _ = require("lodash");
const { generateApiForTest } = require("../../helpers/generateApiForTest");
const { resolve } = require("path");
const validateGeneratedModule = require("../../helpers/validateGeneratedModule");
const createSchemaInfos = require("../../helpers/createSchemaInfos");

const schemas = createSchemaInfos({
  absolutePathToSchemas: resolve(__dirname, "./"),
  absoluteOutputPath: resolve(__dirname, "./"),
});

schemas.forEach(({ absolutePath, apiFileName, Exception }) => {
  generateApiForTest({
    testName: "--type-suffix --type-prefix options test",
    silent: true,
    name: apiFileName,
    input: absolutePath,
    output: resolve(__dirname, "./"),
    typePrefix: "SwaggerType",
    typeSuffix: "GeneratedDataContract",
    generateClient: true,
    generateResponses: true,
  }).then((output) => {
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
            throw new Exception(
              `Not at all data contracts have type prefix and type suffix`,
              `\n${content.indexOf(line) + 1}: ${line} ->`,
              `\n    ${typeName} <-`,
            );
          }
        }
      }
    }

    validateGeneratedModule(resolve(__dirname, `./${apiFileName}`));
  });
});
