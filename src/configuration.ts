import lodash from "lodash";
import type { OpenAPI } from "openapi-types";
import * as typescript from "typescript";
import type {
  ExtractingOptions,
  GenerateApiConfiguration,
  Hooks,
  SchemaComponent,
} from "../types/index.js";
import { ComponentTypeNameResolver } from "./component-type-name-resolver.js";
import * as CONSTANTS from "./constants.js";
import type { MonoSchemaParser } from "./schema-parser/mono-schema-parser.js";
import type { SchemaParser } from "./schema-parser/schema-parser.js";
import type { Translator } from "./translators/translator.js";
import { objectAssign } from "./util/object-assign.js";

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

export class CodeGenConfig {
  version = CONSTANTS.PROJECT_VERSION;
  /** CLI flag */
  templates = "";
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
  /** flag for catching conversion from swagger 2.0 */
  convertedFromSwagger2 = false;

  /** url index from paths used for merging into modules */
  moduleNameIndex = 0;

  /** use the first tag for the module name */
  moduleNameFirstTag = false;
  extractRequestParams = false;
  extractRequestBody = false;
  extractResponseBody = false;
  extractResponseError = false;
  extractResponses = false;
  extractEnums = false;
  fileNames = {
    dataContracts: "data-contracts",
    routeTypes: "route-types",
    httpClient: "http-client",
    outOfModuleApi: "Common",
  };
  routeNameDuplicatesMap = new Map();
  hooks: Hooks = {
    onPreBuildRoutePath: (_routePath: unknown) => void 0,
    onBuildRoutePath: (_routeData: unknown) => void 0,
    onInsertPathParam: (_pathParam: unknown) => void 0,
    onCreateComponent: (schema: SchemaComponent) => schema,
    onPreParseSchema: (
      _originalSchema: unknown,
      _typeName: unknown,
      _schemaType: unknown,
    ) => void 0,
    onParseSchema: (_originalSchema: unknown, parsedSchema: unknown) =>
      parsedSchema,
    onCreateRoute: (routeData: unknown) => routeData,
    onInit: (config: unknown, _codeGenProcess: unknown) => config,
    onPrepareConfig: (apiConfig: unknown) => apiConfig,
    onCreateRequestParams: (_rawType: unknown) => {},
    onCreateRouteName: () => {},
    onFormatTypeName: (
      _typeName: unknown,
      _rawTypeName: unknown,
      _schemaType: unknown,
    ) => {},
    onFormatRouteName: (_routeInfo: unknown, _templateRouteName: unknown) => {},
  };
  defaultResponseType;
  singleHttpClient = false;
  httpClientType = CONSTANTS.HTTP_CLIENT.FETCH;
  unwrapResponseData = false;
  disableThrowOnError = false;
  sortTypes = false;
  sortRoutes = false;
  sortRouteParams = false;
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
  schemaParsers: Record<string, (...args: unknown[]) => MonoSchemaParser> = {};
  toJS = false;
  silent = false;
  typePrefix = "";
  typeSuffix = "";
  enumKeyPrefix = "";
  enumKeySuffix = "";
  patch = false;
  componentTypeNameResolver: ComponentTypeNameResolver;
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
  spec: OpenAPI.Document | null = null;
  fileName = "Api.ts";
  authorizationToken: string | undefined;
  requestOptions = null;

  jsPrimitiveTypes: string[] = [];
  jsEmptyTypes: string[] = [];
  fixInvalidTypeNamePrefix = "Type";
  fixInvalidEnumKeyPrefix = "Value";

  enumKeyResolverName = "Value";
  typeNameResolverName = "ComponentType";
  specificArgNameResolverName = "arg";

  successResponseStatusRange = [200, 299];

  extractingOptions: Partial<ExtractingOptions> = {
    requestBodySuffix: ["Payload", "Body", "Input"],
    requestParamsSuffix: ["Params"],
    responseBodySuffix: ["Data", "Result", "Output"],
    responseErrorSuffix: [
      "Error",
      "Fail",
      "Fails",
      "ErrorData",
      "HttpError",
      "BadResponse",
    ],
    enumSuffix: ["Enum"],
    discriminatorMappingSuffix: ["Mapping", "Mapper", "MapType"],
    discriminatorAbstractPrefix: [
      "Base",
      "Abstract",
      "Discriminator",
      "Internal",
      "Polymorph",
    ],
  };

  compilerTsConfig = {
    module: typescript.ModuleKind.ESNext,
    noImplicitReturns: true,
    alwaysStrict: true,
    target: typescript.ScriptTarget.ESNext,
    declaration: true,
    noImplicitAny: false,
    sourceMap: false,
    removeComments: false,
    disableSizeLimit: true,
    esModuleInterop: true,
    emitDecoratorMetadata: true,
    skipLibCheck: true,
  };
  customTranslator?: new () => Translator;

  Ts = {
    Keyword: structuredClone(TsKeyword),
    CodeGenKeyword: structuredClone(TsCodeGenKeyword),
    /**
     * $A[] or Array<$A>
     */
    ArrayType: (content: unknown) => {
      if (this.anotherArrayType) {
        return this.Ts.TypeWithGeneric(this.Ts.Keyword.Array, [content]);
      }

      return `${this.Ts.ExpressionGroup(content)}[]`;
    },
    /**
     * "$A"
     */
    StringValue: (content: unknown) => `"${content}"`,
    /**
     * $A
     */
    BooleanValue: (content: unknown) => `${content}`,
    /**
     * $A
     */
    NumberValue: (content: unknown) => `${content}`,
    /**
     * $A
     */
    NullValue: () => "null",
    /**
     * $A1 | $A2
     */
    UnionType: (contents: unknown[]) =>
      lodash.join(lodash.uniq(contents), ` ${this.Ts.Keyword.Union} `),
    /**
     * ($A1)
     */
    ExpressionGroup: (content: unknown) => (content ? `(${content})` : ""),
    /**
     * $A1 & $A2
     */
    IntersectionType: (contents: unknown[]) =>
      lodash.join(lodash.uniq(contents), ` ${this.Ts.Keyword.Intersection} `),
    /**
     * Record<$A1, $A2>
     */
    RecordType: (key: unknown, value: unknown) =>
      this.Ts.TypeWithGeneric(this.Ts.Keyword.Record, [key, value]),
    /**
     * readonly $key?:$value
     */
    TypeField: ({ readonly, key, optional, value }: Record<string, unknown>) =>
      lodash
        .compact([readonly && "readonly ", key, optional && "?", ": ", value])
        .join(""),
    /**
     * [key: $A1]: $A2
     */
    InterfaceDynamicField: (key: unknown, value: unknown) =>
      `[key: ${key}]: ${value}`,

    /**
     * EnumName.EnumKey
     */
    EnumUsageKey: (enumStruct: unknown, key: unknown) => `${enumStruct}.${key}`,
    /**
     * $A1 = $A2
     */
    EnumField: (key: unknown, value: unknown) => `${key} = ${value}`,
    /**
     * /\** description \*\/
     */
    EnumFieldDescription: (description: any) => {
      if (description) {
        return `  /** ${description} */`;
      } else {
        return "";
      }
    },
    /**
     * /\** $A0.description \*\/
     * $A0.key = $A0.value,
     * /\** $A1.description \*\/
     * $A1.key = $A1.value,
     * /\** $AN.description \*\/
     * $AN.key = $AN.value,
     */
    EnumFieldsWrapper: (contents: Record<string, unknown>[]) =>
      lodash
        .map(contents, ({ key, value, description }) => {
          return [
            this.Ts.EnumFieldDescription(description),
            `  ${this.Ts.EnumField(key, value)}`,
          ]
            .filter(Boolean)
            .join("\n");
        })
        .join(",\n"),
    /**
     * {\n $A \n}
     */
    ObjectWrapper: (content: unknown) => `{\n${content}\n}`,
    /**
     * /** $A *\/
     */
    MultilineComment: (
      contents: unknown[],
      formatFn: (arg: unknown) => unknown,
    ) =>
      [
        ...(contents.length === 1
          ? [`/** ${contents[0]} */`]
          : ["/**", ...contents.map((content) => ` * ${content}`), " */"]),
      ].map((part) => `${formatFn ? formatFn(part) : part}\n`),
    /**
     * $A1<...$A2.join(,)>
     */
    TypeWithGeneric: (typeName: unknown, genericArgs: unknown[]) => {
      return `${typeName}${
        genericArgs.length ? `<${genericArgs.join(",")}>` : ""
      }`;
    },
    /**
     * [$A1, $A2, ...$AN]
     */
    Tuple: (values: unknown[]) => {
      return `[${values.join(", ")}]`;
    },
  };

  /**
   * swagger schema type -> typescript type
   * https://json-schema.org/understanding-json-schema/reference/string.html#dates-and-times
   */
  primitiveTypes: Record<
    string,
    | string
    | ((schema: OpenAPI.Document, parser: SchemaParser) => string)
    | ({ $default: string } & Record<
        string,
        string | ((schema: OpenAPI.Document, parser: SchemaParser) => string)
      >)
  > = {
    integer: () => this.Ts.Keyword.Number,
    number: () => this.Ts.Keyword.Number,
    boolean: () => this.Ts.Keyword.Boolean,
    object: () => this.Ts.Keyword.Object,
    file: () => this.Ts.Keyword.File,
    string: {
      $default: this.Ts.Keyword.String,

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

  constructor({
    codeGenConstructs,
    primitiveTypeConstructs,
    constants,
    templateInfos,
    hooks,
    ...otherConfig
  }: Partial<GenerateApiConfiguration["config"]>) {
    objectAssign(this.Ts, codeGenConstructs);
    objectAssign(this.primitiveTypes, primitiveTypeConstructs);

    this.defaultResponseType = this.Ts.Keyword.Void;

    this.update({
      ...otherConfig,
      hooks: lodash.merge(this.hooks, hooks || {}),
      constants: {
        ...CONSTANTS,
        ...constants,
      },
      templateInfos: templateInfos || this.templateInfos,
    });

    this.jsPrimitiveTypes = [
      this.Ts.Keyword.Number,
      this.Ts.Keyword.String,
      this.Ts.Keyword.Boolean,
    ];
    this.jsEmptyTypes = [this.Ts.Keyword.Null, this.Ts.Keyword.Undefined];
    this.componentTypeNameResolver = new ComponentTypeNameResolver(this, []);
  }

  update = (update: Partial<GenerateApiConfiguration["config"]>) => {
    objectAssign(this, update);
    if (this.enumNamesAsValues) {
      this.extractEnums = true;
    }
  };
}
