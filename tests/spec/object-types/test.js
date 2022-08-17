const { generateApiForTest } = require("../../helpers/generateApiForTest");
const { resolve } = require("path");
const validateGeneratedModule = require("../../helpers/validateGeneratedModule");
const createSchemaInfos = require("../../helpers/createSchemaInfos");

const schemas = createSchemaInfos({ absolutePathToSchemas: resolve(__dirname, "./") });

const expectedCode = `/**
 * It is a Pet description
 */
export type Test1 = {
  /**
   * It is an id title
   * It is an id description
   */
  id: number;
  /**
   * It is a name title
   * It is a name description
   */
  name: string;
  /**
   * It is a tag title
   * It is a tag description
   * @deprecated
   */
  tag: string;
  /**
   * It is a multiple title
   * It is a multiple description
   */
  multiple: string | number;
} | null;

export interface AdditionalObjectProperties {
  id?: string;
}

export interface AdditionalIntProperties {
  id?: string;
}
`;

schemas.forEach(({ absolutePath, apiFileName }) => {
  generateApiForTest({
    testName: "object-types test",
    silent: true,
    name: apiFileName,
    input: absolutePath,
    output: resolve(__dirname, "./"),
    addReadonly: true,
    generateClient: false,
  }).then(({ files }) => {
    validateGeneratedModule(resolve(__dirname, `./${apiFileName}`));
    if (files[0].content !== expectedCode) {
      console.error(`received <<< \n${files[0].content}`);
      console.error(`expected >>> \n${expectedCode}`);
      throw new Error("expected another result");
    }
  });
});
