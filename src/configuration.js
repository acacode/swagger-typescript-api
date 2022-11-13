const { objectAssign } = require("./util/object-assign");
const _ = require("lodash");
const CONSTANTS = require("./constants");
const { ComponentTypeNameResolver } = require("./util/name-resolver");
const { cosmiconfigSync } = require("cosmiconfig");

const TsKeyword = {
  Number: "number",
  String: "string",
  Boolean: "boolean",
  Any: "any",
  Void: "void",
  Unknown: "unknown",
  Null: "null",
  Undefined: "undefined",
  Object: "object",
  File: "File",
  Date: "Date",
  Type: "type",
  Enum: "enum",
  Interface: "interface",
  Array: "Array",
  Record: "Record",
  Intersection: "&",
  Union: "|",
};

const TsCodeGenKeyword = {
  UtilRequiredKeys: "UtilRequiredKeys",
};

/**
 * @type {GenerateApiConfiguration["config"]}}
 */
class CodeGenConfig {
  version = CONSTANTS.PROJECT_VERSION;
  /** CLI flag */
  templates = "../templates/default";
  /** CLI flag */
  generateResponses = false;
  /** CLI flag */
  defaultResponseAsSuccess = false;
  /** CLI flag */
  generateRouteTypes = false;
  /** CLI flag */
  generateClient = true;
  /** CLI flag */
  generateUnionEnums = false;
  /** CLI flag */
  addReadonly = false;
  enumNamesAsValues = false;
  /** parsed swagger schema from getSwaggerObject() */

  /** parsed swagger schema ref */
  swaggerSchema = null;
  /** original (converted to json) swagger schema ref */
  originalSchema = null;

  /** { "#/components/schemas/Foo": @TypeInfo, ... } */
  componentsMap = {};
  /** flag for catching convertion from swagger 2.0 */
  convertedFromSwagger2 = false;

  /** url index from paths used for merging into modules */
  moduleNameIndex = 0;

  /** use the first tag for the module name */
  moduleNameFirstTag = false;
  disableStrictSSL = false;
  disableProxy = false;
  extractRequestParams = false;
  extractRequestBody = false;
  extractResponseBody = false;
  extractResponseError = false;
  extractEnums = false;
  fileNames = {
    dataContracts: "data-contracts",
    routeTypes: "route-types",
    httpClient: "http-client",
    outOfModuleApi: "Common",
  };
  routeNameDuplicatesMap = new Map();
  prettierOptions = { ...CONSTANTS.PRETTIER_OPTIONS };
  hooks = {
    onPreBuildRoutePath: (routePath) => void 0,
    onBuildRoutePath: (routeData) => void 0,
    onInsertPathParam: (pathParam) => void 0,
    onCreateComponent: (schema) => schema,
    onPreParseSchema: (originalSchema, typeName, schemaType) => void 0,
    onParseSchema: (originalSchema, parsedSchema) => parsedSchema,
    onCreateRoute: (routeData) => routeData,
    onInit: (config) => config,
    onPrepareConfig: (apiConfig) => apiConfig,
    onCreateRequestParams: (rawType) => {},
    onCreateRouteName: () => {},
    onFormatTypeName: (typeName, rawTypeName, schemaType) => {},
    onFormatRouteName: (routeInfo, templateRouteName) => {},
  };
  defaultResponseType;
  singleHttpClient = false;
  httpClientType = CONSTANTS.HTTP_CLIENT.FETCH;
  unwrapResponseData = false;
  disableThrowOnError = false;
  sortTypes = false;
  templatePaths = {
    /** `templates/base` */
    base: "",
    /** `templates/default` */
    default: "",
    /** `templates/modular` */
    modular: "",
    /** usage path if `--templates` option is not set */
    original: "",
    /** custom path to templates (`--templates`) */
    custom: "",
  };
  /** Record<templateName, templateContent> */
  templatesToRender = {
    api: "",
    dataContracts: "",
    dataContractJsDoc: "",
    interfaceDataContract: "",
    typeDataContract: "",
    enumDataContract: "",
    objectFieldJsDoc: "",
    httpClient: "",
    routeTypes: "",
    routeName: "",
  };
  toJS = false;
  silent = false;
  typePrefix = "";
  typeSuffix = "";
  enumKeyPrefix = "";
  enumKeySuffix = "";
  patch = false;
  componentTypeNameResolver = new ComponentTypeNameResolver(null, []);
  /** name of the main exported class */
  apiClassName = "Api";
  debug = false;
  anotherArrayType = false;
  internalTemplateOptions = {
    addUtilRequiredKeysType: false,
  };
  extraTemplates = [];
  input = "";
  modular = false;
  output = "";
  url = "";
  cleanOutput = false;
  spec = null;
  fileName = "Api.ts";
  authorizationToken = void 0;
  requestOptions = null;

  jsPrimitiveTypes = [];
  jsEmptyTypes = [];
  fixInvalidTypeNamePrefix = "Type";
  fixInvalidEnumKeyPrefix = "Value";

  successResponseStatusRange = [200, 299];

  /** @type {ExtractingOptions} */
  extractingOptions = {
    requestBodySuffix: ["Payload", "Body", "Input"],
    requestParamsSuffix: ["Params"],
    responseBodySuffix: ["Data", "Result", "Output"],
    responseErrorSuffix: ["Error", "Fail", "Fails", "ErrorData", "HttpError", "BadResponse"],
  };

  Ts = {
    Keyword: _.cloneDeep(TsKeyword),
    CodeGenKeyword: _.cloneDeep(TsCodeGenKeyword),
    /**
     * $A[] or Array<$A>
     */
    ArrayType: (content) => {
      if (this.anotherArrayType) {
        return this.Ts.TypeWithGeneric(this.Ts.Keyword.Array, [content]);
      }

      return `${this.Ts.ExpressionGroup(content)}[]`;
    },
    /**
     * "$A"
     */
    StringValue: (content) => `"${content}"`,
    /**
     * $A
     */
    BooleanValue: (content) => `${content}`,
    /**
     * $A
     */
    NumberValue: (content) => `${content}`,
    /**
     * $A
     */
    NullValue: (content) => content,
    /**
     * $A1 | $A2
     */
    UnionType: (contents) => _.join(_.uniq(contents), ` ${this.Ts.Keyword.Union} `),
    /**
     * ($A1)
     */
    ExpressionGroup: (content) => (content ? `(${content})` : ""),
    /**
     * $A1 & $A2
     */
    IntersectionType: (contents) => _.join(_.uniq(contents), ` ${this.Ts.Keyword.Intersection} `),
    /**
     * Record<$A1, $A2>
     */
    RecordType: (key, value) => this.Ts.TypeWithGeneric(this.Ts.Keyword.Record, [key, value]),
    /**
     * readonly $key?:$value
     */
    TypeField: ({ readonly, key, optional, value }) =>
      _.compact([readonly && "readonly ", key, optional && "?", ": ", value]).join(""),
    /**
     * [key: $A1]: $A2
     */
    InterfaceDynamicField: (key, value) => `[key: ${key}]: ${value}`,
    /**
     * $A1 = $A2
     */
    EnumField: (key, value) => `${key} = ${value}`,
    /**
     * $A0.key = $A0.value,
     * $A1.key = $A1.value,
     * $AN.key = $AN.value,
     */
    EnumFieldsWrapper: (contents) =>
      _.map(contents, ({ key, value }) => `  ${this.Ts.EnumField(key, value)}`).join(",\n"),
    /**
     * {\n $A \n}
     */
    ObjectWrapper: (content) => `{\n${content}\n}`,
    /**
     * /** $A *\/
     */
    MultilineComment: (contents, formatFn) =>
      [
        ...(contents.length === 1
          ? [`/** ${contents[0]} */`]
          : ["/**", ...contents.map((content) => ` * ${content}`), " */"]),
      ].map((part) => `${formatFn ? formatFn(part) : part}\n`),
    /**
     * $A1<...$A2.join(,)>
     */
    TypeWithGeneric: (typeName, genericArgs) => {
      return `${typeName}${genericArgs.length ? `<${genericArgs.join(",")}>` : ""}`;
    },
    /**
     * [$A1, $A2, ...$AN]
     */
    Tuple: (values) => {
      return `[${values.join(", ")}]`;
    },
  };

  /**
   * swagger schema type -> typescript type
   * https://json-schema.org/understanding-json-schema/reference/string.html#dates-and-times
   * @type {Record<string, string | ((schema: any, parser: SchemaParser) => string) | ({ $default: string } & Record<string, string | ((schema: any, parser: SchemaParser) => string)>)>}
   */
  primitiveTypes = {
    integer: () => this.Ts.Keyword.Number,
    number: () => this.Ts.Keyword.Number,
    boolean: () => this.Ts.Keyword.Boolean,
    object: () => this.Ts.Keyword.Object,
    file: () => this.Ts.Keyword.File,
    string: {
      $default: () => this.Ts.Keyword.String,

      /** formats */
      binary: () => this.Ts.Keyword.File,
      file: () => this.Ts.Keyword.File,
      "date-time": () => this.Ts.Keyword.String,
      time: () => this.Ts.Keyword.String,
      date: () => this.Ts.Keyword.String,
      duration: () => this.Ts.Keyword.String,
      email: () => this.Ts.Keyword.String,
      "idn-email": () => this.Ts.Keyword.String,
      "idn-hostname": () => this.Ts.Keyword.String,
      ipv4: () => this.Ts.Keyword.String,
      ipv6: () => this.Ts.Keyword.String,
      uuid: () => this.Ts.Keyword.String,
      uri: () => this.Ts.Keyword.String,
      "uri-reference": () => this.Ts.Keyword.String,
      "uri-template": () => this.Ts.Keyword.String,
      "json-pointer": () => this.Ts.Keyword.String,
      "relative-json-pointer": () => this.Ts.Keyword.String,
      regex: () => this.Ts.Keyword.String,
    },
    array: ({ items, ...schemaPart }, parser) => {
      const content = parser.getInlineParseContent(items);
      return parser.schemaUtils.safeAddNullToType(schemaPart, this.Ts.ArrayType(content));
    },
  };

  templateInfos = [
    { name: "api", fileName: "api" },
    { name: "dataContracts", fileName: "data-contracts" },
    { name: "dataContractJsDoc", fileName: "data-contract-jsdoc" },
    { name: "interfaceDataContract", fileName: "interface-data-contract" },
    { name: "typeDataContract", fileName: "type-data-contract" },
    { name: "enumDataContract", fileName: "enum-data-contract" },
    { name: "objectFieldJsDoc", fileName: "object-field-jsdoc" },
    { name: "httpClient", fileName: "http-client" },
    { name: "routeTypes", fileName: "route-types" },
    { name: "routeName", fileName: "route-name" },
  ];

  templateExtensions = [".eta", ".ejs"];

  /**
   * @param config {Partial<GenerateApiConfiguration['config']>}
   */
  constructor({
    prettierOptions = getDefaultPrettierOptions(),
    codeGenConstructs,
    primitiveTypeConstructs,
    constants,
    templateInfos,
    hooks,
    ...params
  }) {
    objectAssign(this.Ts, codeGenConstructs);
    objectAssign(this.primitiveTypes, primitiveTypeConstructs);

    this.defaultResponseType = this.Ts.Keyword.Void;

    this.update({
      ...params,
      prettierOptions: prettierOptions === undefined ? getDefaultPrettierOptions() : prettierOptions,
      hooks: _.merge(this.hooks, hooks || {}),
      constants: {
        ...CONSTANTS,
        ...constants,
      },
      templateInfos: templateInfos || this.templateInfos,
    });

    this.jsPrimitiveTypes = [this.Ts.Keyword.Number, this.Ts.Keyword.String, this.Ts.Keyword.Boolean];
    this.jsEmptyTypes = [this.Ts.Keyword.Null, this.Ts.Keyword.Undefined];
  }

  /**
   *
   * @param update {Partial<GenerateApiConfiguration["config"]>}
   */
  update = (update) => {
    objectAssign(this, update);
  };
}

const getDefaultPrettierOptions = () => {
  const prettier = cosmiconfigSync("prettier").search();

  if (prettier) {
    return {
      ...prettier.config,
      parser: "typescript",
    };
  }

  return { ...CONSTANTS.PRETTIER_OPTIONS };
};

module.exports = {
  CodeGenConfig,
};
