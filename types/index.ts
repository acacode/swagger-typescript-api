import type { ComponentTypeNameResolver } from "../src/component-type-name-resolver.js";
import type * as CONSTANTS from "../src/constants.js";
import type { MonoSchemaParser } from "../src/schema-parser/mono-schema-parser.js";
import type { Translator } from "../src/translators/translator.js";
import type { PartialDeep } from "type-fest";

export type HttpClientType =
  (typeof CONSTANTS.HTTP_CLIENT)[keyof typeof CONSTANTS.HTTP_CLIENT];

type CodeGenConstruct = {
  Keyword: {
    Number: string;
    String: string;
    Boolean: string;
    Any: string;
    Void: string;
    Unknown: string;
    Null: string;
    Undefined: string;
    Object: string;
    File: string;
    Date: string;
    Type: string;
    Enum: string;
    Interface: string;
    Array: string;
    Record: string;
    Intersection: string;
    Union: string;
  };
  CodeGenKeyword: {
    UtilRequiredKeys: string;
  };
  ArrayType: (content: unknown) => string;
  StringValue: (content: unknown) => string;
  BooleanValue: (content: unknown) => string;
  NumberValue: (content: unknown) => string;
  NullValue: (content: unknown) => string;
  UnionType: (content: unknown) => string;
  ExpressionGroup: (content: unknown) => string;
  IntersectionType: (content: unknown) => string;
  RecordType: (content: unknown) => string;
  TypeField: (content: unknown) => string;
  InterfaceDynamicField: (content: unknown) => string;
  EnumUsageKey: (enumStruct: unknown, key: unknown) => string;
  EnumField: (content: unknown) => string;
  EnumFieldDescription: (content: unknown) => string;
  EnumFieldsWrapper: (content: unknown) => string;
  ObjectWrapper: (content: unknown) => string;
  MultilineComment: (content: unknown) => string;
  TypeWithGeneric: (content: unknown) => string;
  Tuple: (content: unknown) => string;
};

type PrimitiveTypeStructValue =
  | string
  | ((
      schema: Record<string, unknown>,
      parser: import("../src/schema-parser/schema-parser.js").SchemaParser,
    ) => string);

type PrimitiveTypeStruct = Record<
  "integer" | "number" | "boolean" | "object" | "file" | "string" | "array",
  | string
  | ({ $default: PrimitiveTypeStructValue } & Record<
      string,
      PrimitiveTypeStructValue
    >)
>;

interface GenerateApiParamsFromPath
  extends Partial<GenerateApiConfiguration["config"]> {
  /**
   * path to swagger schema
   */
  input: string;
}

interface GenerateApiParamsFromUrl
  extends Partial<GenerateApiConfiguration["config"]> {
  /**
   * url to swagger schema
   */
  url: string;
}

interface GenerateApiParamsFromSpecLiteral
  extends Partial<GenerateApiConfiguration["config"]> {
  /**
   * swagger schema JSON
   */
  spec: import("swagger-schema-official").Spec;
}

export type GenerateApiParams =
  | GenerateApiParamsFromPath
  | GenerateApiParamsFromUrl
  | GenerateApiParamsFromSpecLiteral;

type BuildRouteParam = {
  /** {bar} */
  $match: string;
  name: string;
  required: boolean;
  type: "string";
  description: string;
  schema: {
    type: string;
  };
  in: "path" | "query";
};

type BuildRoutePath = {
  /** /foo/{bar}/baz */
  originalRoute: string;
  /** /foo/${bar}/baz */
  route: string;
  pathParams: BuildRouteParam[];
  queryParams: BuildRouteParam[];
};

export interface Hooks {
  /** calls before parse\process route path */
  onPreBuildRoutePath: (routePath: string) => string | undefined;
  /** calls after parse\process route path */
  onBuildRoutePath: (data: BuildRoutePath) => BuildRoutePath | undefined;
  /** calls before insert path param name into string path interpolation */
  onInsertPathParam: (
    paramName: string,
    index: number,
    arr: BuildRouteParam[],
    resultRoute: string,
  ) => string | undefined;
  /** calls after parse schema component */
  onCreateComponent: (
    component: SchemaComponent,
  ) => SchemaComponent | undefined;
  /** calls before parse any kind of schema */
  onPreParseSchema: (
    originalSchema: unknown,
    typeName: string,
    schemaType: string,
  ) => undefined;
  /** calls after parse any kind of schema */
  onParseSchema: (
    originalSchema: unknown,
    parsedSchema: unknown,
  ) => unknown | undefined;
  /** calls after parse route (return type: customized route (ParsedRoute), nothing change (void), false (ignore this route)) */
  onCreateRoute: (routeData: ParsedRoute) => ParsedRoute | false | undefined;
  /** Start point of work this tool (after fetching schema) */
  onInit?: <C extends GenerateApiConfiguration["config"]>(
    configuration: C,
    codeGenProcess: import("../src/code-gen-process.js").CodeGenProcess,
  ) => C | undefined;
  /** customize configuration object before sending it to ETA templates */
  onPrepareConfig?: <C extends GenerateApiConfiguration>(
    currentConfiguration: C,
  ) => C | undefined;
  /** customize route name as you need */
  onCreateRouteName?: (
    routeNameInfo: RouteNameInfo,
    rawRouteInfo: RawRouteInfo,
  ) => RouteNameInfo | undefined;
  /** customize request params (path params, query params) */
  onCreateRequestParams?: (
    rawType: SchemaComponent["rawTypeData"],
  ) => SchemaComponent["rawTypeData"] | undefined;
  /** customize name of model type */
  onFormatTypeName?: (
    typeName: string,
    rawTypeName?: string,
    schemaType?: "type-name" | "enum-key",
  ) => string | undefined;
  /** customize name of route (operationId), you can do it with using onCreateRouteName too */
  onFormatRouteName?: (
    routeInfo: RawRouteInfo,
    templateRouteName: string,
  ) => string | undefined;
}

export type RouteNameRouteInfo = Record<string, unknown>;

export type RouteNameInfo = {
  usage: string;
  original: string;
  duplicate: boolean;
};

export type SchemaTypePrimitiveContent = {
  $parsedSchema: boolean;
  schemaType: string;
  type: string;
  typeIdentifier: string;
  name?: unknown;
  description: string;
  content: string;
};

export type SchemaTypeObjectContent = {
  $$raw: {
    type: string;
    required: boolean;
    $parsed: SchemaTypePrimitiveContent;
  };
  isRequired: boolean;
  field: string;
}[];

export type SchemaTypeEnumContent = {
  key: string;
  type: string;
  value: string;
};

export interface ParsedSchema<C> {
  $parsedSchema: boolean;
  schemaType: string;
  type: string;
  typeIdentifier: string;
  name: string;
  description?: string;
  allFieldsAreOptional?: boolean;
  content: C;
  isExtractedRequestParams?: boolean;
  isExtractedRequestBody?: boolean;
  isExtractedResponseBody?: boolean;
  isExtractedResponseError?: boolean;
}

export interface PathArgInfo {
  name: string;
  optional: boolean;
  type: string;
  description?: string;
}

export interface SchemaComponent {
  $ref: string;
  typeName: string;
  rawTypeData?: {
    type: string;
    required?: string[];
    properties?: Record<
      string,
      {
        name?: string;
        type: string;
        required: boolean;
        $parsed?: SchemaTypePrimitiveContent;
      }
    >;
    discriminator?: {
      propertyName?: string;
    };
    $parsed: ParsedSchema<
      | SchemaTypeObjectContent
      | SchemaTypeEnumContent
      | SchemaTypePrimitiveContent
    >;
  };
  componentName: "schemas" | "paths";
  typeData: ParsedSchema<
    SchemaTypeObjectContent | SchemaTypeEnumContent | SchemaTypePrimitiveContent
  > | null;
}

export enum RequestContentKind {
  JSON = "JSON",
  URL_ENCODED = "URL_ENCODED",
  FORM_DATA = "FORM_DATA",
  IMAGE = "IMAGE",
  OTHER = "OTHER",
  TEXT = "TEXT",
}

export interface RequestResponseInfo {
  contentTypes: string[];
  contentKind: RequestContentKind;
  type: string;
  description: string;
  status: string | number;
  isSuccess: boolean;
}

export type RawRouteInfo = {
  operationId: string;
  method: string;
  route: string;
  moduleName: string;
  responsesTypes: RequestResponseInfo[];
  description?: string;
  tags?: string[];
  summary?: string;
  responses?: import("swagger-schema-official").Spec["responses"];
  produces?: string[];
  requestBody?: object;
  consumes?: string[];
};

export interface ParsedRouteRequest {
  contentTypes?: string[];
  formData?: boolean;
  headers?: {
    name: string | null;
    optional: boolean | undefined;
    type: Record<string, any>;
  };
  isQueryBody?: boolean;
  method?: string;
  parameters?: Record<string, unknown>[];
  path?: string;
  pathParams?: Record<string, unknown>;
  payload?: { name: string | null; optional?: boolean; type: string };
  query?: Record<string, unknown>;
  requestParams?: Record<string, unknown> | null;
  security?: boolean;
}

export interface ParsedRouteResponse {
  contentTypes?: string[];
  errorType?: string;
  fullTypes?: string;
  type?: string;
}

export interface ParsedRoute {
  id: string;
  namespace: string;
  // biome-ignore lint/suspicious/noExplicitAny: TODO
  routeParams?: Record<string, any>;
  requestBodyInfo?: {
    // biome-ignore lint/suspicious/noExplicitAny: TODO
    paramName: any;
    // biome-ignore lint/suspicious/noExplicitAny: TODO
    contentTypes: any[];
    contentKind: string;
    // biome-ignore lint/suspicious/noExplicitAny: TODO
    schema: any;
    // biome-ignore lint/suspicious/noExplicitAny: TODO
    type: any;
    // biome-ignore lint/suspicious/noExplicitAny: TODO
    required: any;
  };
  responseBodyInfo?: {
    // biome-ignore lint/suspicious/noExplicitAny: TODO
    contentTypes: any[];
    // biome-ignore lint/suspicious/noExplicitAny: TODO
    responses: any[];
    // biome-ignore lint/suspicious/noExplicitAny: TODO
    success?: Record<string, any>;
    // biome-ignore lint/suspicious/noExplicitAny: TODO
    error?: Record<string, any>;
    // biome-ignore lint/suspicious/noExplicitAny: TODO
    full?: Record<string, any>;
  };
  // biome-ignore lint/suspicious/noExplicitAny: TODO
  specificArgs?: Record<string, any>;
  // biome-ignore lint/suspicious/noExplicitAny: TODO
  queryObjectSchema?: Record<string, any>;
  // biome-ignore lint/suspicious/noExplicitAny: TODO
  pathObjectSchema?: Record<string, any>;
  // biome-ignore lint/suspicious/noExplicitAny: TODO
  headersObjectSchema?: Record<string, any>;
  // biome-ignore lint/suspicious/noExplicitAny: TODO
  responseBodySchema?: Record<string, any>;
  requestBodySchema?: Record<string, any>;
  specificArgNameResolver?: Record<string, any>;
  request: ParsedRouteRequest;
  response: ParsedRouteResponse;
  routeName: RouteNameInfo;
  raw: RawRouteInfo;
}

export type ModelType = {
  typeIdentifier: string;
  name: string;
  rawContent: string;
  description: string;
  content: string;
};

export enum SCHEMA_TYPES {
  ARRAY = "array",
  OBJECT = "object",
  ENUM = "enum",
  REF = "$ref",
  PRIMITIVE = "primitive",
  COMPLEX = "complex",
  COMPLEX_ONE_OF = "oneOf",
  COMPLEX_ANY_OF = "anyOf",
  COMPLEX_ALL_OF = "allOf",
  COMPLEX_NOT = "not",
  COMPLEX_UNKNOWN = "__unknown",
}

type MAIN_SCHEMA_TYPES =
  | SCHEMA_TYPES.PRIMITIVE
  | SCHEMA_TYPES.OBJECT
  | SCHEMA_TYPES.ENUM;

export type ExtractingOptions = {
  requestBodySuffix: string[];
  responseBodySuffix: string[];
  responseErrorSuffix: string[];
  requestParamsSuffix: string[];
  enumSuffix: string[];
  discriminatorMappingSuffix: string[];
  discriminatorAbstractPrefix: string[];
  requestBodyNameResolver: (
    name: string,
    reservedNames: string,
  ) => string | undefined;
  responseBodyNameResolver: (
    name: string,
    reservedNames: string,
  ) => string | undefined;
  responseErrorNameResolver: (
    name: string,
    reservedNames: string,
  ) => string | undefined;
  requestParamsNameResolver: (
    name: string,
    reservedNames: string,
  ) => string | undefined;
  enumNameResolver: (name: string, reservedNames: string) => string | undefined;
  discriminatorMappingNameResolver: (
    name: string,
    reservedNames: string,
  ) => string | undefined;
  discriminatorAbstractResolver: (
    name: string,
    reservedNames: string,
  ) => string | undefined;
};

export interface GenerateApiConfiguration {
  apiConfig: {
    /** base url from schema */
    baseUrl: string;
    /** document title */
    title: string;
    /** document version */
    version: string;
    /** description split into lines */
    description: string[];
    /** flag that description is present */
    hasDescription: boolean;
  };
  config: {
    /** path to swagger schema */
    input: string;
    /**
     * generate separated files for http client, data contracts, and routes
     * @default false
     */
    modular: boolean;
    /**
     * path to folder where the created api module will be placed.
     * may be set to `false` to skip writing content to disk; in this case
     * the `files` array on the return value will contain the generated contents.
     */
    output: string | false;
    /** url to swagger schema */
    url: string;
    /** swagger schema JSON */
    spec: unknown;
    /**
     * file name for the generated API module
     * @default 'Api.ts'
     */
    fileName: string;
    /**
     * path to folder containing custom templates
     * @default ""
     */
    templates: string;
    templatePaths: {
      /** `templates/base` */
      base: string;
      /** `templates/default` */
      default: string;
      /** `templates/modular` */
      modular: string;
      /** usage path if `--templates` option is not set */
      original: string;
      /** custom path to templates (`--templates`) */
      custom: string | null;
    };
    /** authorisation token for private swagger schema access */
    authorizationToken?: string;
    /** generate additional information about request responses and error typings */
    generateResponses: boolean;
    /**
     * use "default" response status code as success response.
     * some swagger schemas treat "default" as a successful response.
     */
    defaultResponseAsSuccess: boolean;
    /** generate type definitions for API routes */
    generateRouteTypes: boolean;
    /** generate an API client */
    generateClient: boolean;
    /** generate all "enum" types as union types (T1 | T2 | TN) */
    generateUnionEnums: boolean;
    /** parsed swagger schema */
    swaggerSchema: object;
    /** original swagger schema */
    originalSchema: object;
    /** map of schema component references */
    componentsMap: Record<string, SchemaComponent>;
    /** flag indicating the schema was converted from Swagger 2.0 */
    convertedFromSwagger2: boolean;
    /** determines which path index should be used for routes separation */
    moduleNameIndex: number;
    /** use the first tag for the module name */
    moduleNameFirstTag: boolean;
    /** extra templates */
    extraTemplates: { name: string; path: string }[];
    /** extract request params to data contract */
    extractRequestParams: boolean;
    /** unwrap the data item from the response */
    unwrapResponseData: boolean;
    /** sort data contracts in alphabetical order */
    sortTypes: boolean;
    /** sort routes in alphabetical order */
    sortRoutes: boolean;
    /** ability to send HttpClient instance to Api constructor */
    singleHttpClient: boolean;
    /** prefix string value for type names */
    typePrefix: string;
    /** suffix string value for type names */
    typeSuffix: string;
    /** prefix string value for enum keys */
    enumKeyPrefix: string;
    /** suffix string value for enum keys */
    enumKeySuffix: string;
    /** fix up small errors in the swagger source definition */
    patch: boolean;
    /** remove output directory before generating */
    cleanOutput: boolean;
    /** output debug messages */
    debug: boolean;
    /**
     * generate array types as Array<Type>
     * @default false
     */
    anotherArrayType: boolean;
    /** extract request body type to data contract */
    extractRequestBody: boolean;
    /** generated http client type */
    httpClientType: "axios" | "fetch";
    /** generate readonly properties */
    addReadonly: boolean;
    /** customise primitive type mappings */
    primitiveTypeConstructs?:
      | ((struct: PrimitiveTypeStruct) => PartialDeep<PrimitiveTypeStruct>)
      | PartialDeep<PrimitiveTypeStruct>;
    /** customise code generation constructs */
    codeGenConstructs?:
      | ((struct: CodeGenConstruct) => PartialDeep<CodeGenConstruct>)
      | PartialDeep<CodeGenConstruct>;
    /** extract response body type to data contract */
    extractResponseBody: boolean;
    /** extract response error type to data contract */
    extractResponseError: boolean;
    /** extract all enums from nested types/interfaces to `enum` construction */
    extractEnums: boolean;
    /** extract all enums from inline interface/type content to typescript enum construction */
    extractResponses: boolean;
    /**
     * prefix string value needed to fix invalid type names
     * @default "Type"
     */
    fixInvalidTypeNamePrefix: string;
    /**
     * prefix string value needed to fix invalid enum keys
     * @default "Value"
     */
    fixInvalidEnumKeyPrefix: string;
    /**
     * default type for empty response schema
     * @default "void"
     */
    defaultResponseType: string;
    /**
     * generate js api module with declaration file
     * @default false
     */
    toJS: boolean;
    /** disable throwing on a non-successful response */
    disableThrowOnError: boolean;
    /**
     * output only errors to console
     * @default false
     */
    silent: boolean;
    /** hooks for customising the generation process */
    hooks: Partial<Hooks>;
    /** use enum names as values */
    enumNamesAsValues: boolean;
    /** package version */
    version: string;
    /** ts compiler configuration object (for --to-js option) */
    compilerTsConfig: Record<string, unknown>;
    /** enum key resolver name */
    enumKeyResolverName: string;
    /** type name resolver name */
    typeNameResolverName: string;
    /** specific argument name resolver name */
    specificArgNameResolverName: string;
    /**
     * custom ts->* translator
     * do not use constructor args, just send class reference
     */
    customTranslator?: new () => Translator;
    /** internal constants */
    constants: typeof CONSTANTS;
    /** code generation constructs for TypeScript */
    Ts: CodeGenConstruct;
    /**
     * swagger schema type -> typescript type
     * https://json-schema.org/understanding-json-schema/reference/string.html#dates-and-times
     */
    primitiveTypes: PrimitiveTypeStruct;
    /** built-in template info */
    templateInfos: { name: string; fileName: string }[];
    /** supported template file extensions */
    templateExtensions: string[];
    /** range of HTTP status codes treated as success */
    successResponseStatusRange: [number, number];
    /** custom schema parsers */
    schemaParsers?: {
      complexOneOf?: MonoSchemaParser;
      complexAllOf?: MonoSchemaParser;
      complexAnyOf?: MonoSchemaParser;
      complexNot?: MonoSchemaParser;
      enum?: MonoSchemaParser;
      object?: MonoSchemaParser;
      complex?: MonoSchemaParser;
      primitive?: MonoSchemaParser;
      discriminator?: MonoSchemaParser;
      array?: MonoSchemaParser;
    };
    /** internal options for templates */
    internalTemplateOptions: {
      addUtilRequiredKeysType: boolean;
    };
    /** resolver for component type names */
    componentTypeNameResolver: ComponentTypeNameResolver;
    /** generated file names */
    fileNames: {
      dataContracts: string;
      routeTypes: string;
      httpClient: string;
      outOfModuleApi: string;
    };
    /** Record<templateName, templateContent> */
    templatesToRender: {
      api: string;
      dataContracts: string;
      httpClient: string;
      routeTypes: string;
      routeName: string;
      dataContractJsDoc: string;
      interfaceDataContract: string;
      typeDataContract: string;
      enumDataContract: string;
      objectFieldJsDoc: string;
    };
    /** map of duplicate route names */
    routeNameDuplicatesMap: Map<string, string>;
    /** name of the main exported class */
    apiClassName: string;
    /** configuration for fetching swagger schema requests */
    requestOptions?: Partial<RequestInit>;
    /** extra configuration for extracting type names operations */
    extractingOptions: Partial<ExtractingOptions>;
    /** update configuration object during generation */
    update: (update: Partial<GenerateApiConfiguration["config"]>) => void;
    /** name for the generated ContentType enum
     * @default ContentType
     */
    contentTypeEnumName: string;
  };
  modelTypes: ModelType[];
  hasFormDataRoutes: boolean;
  hasSecurityRoutes: boolean;
  hasQueryRoutes: boolean;
  generateResponses: boolean;
  routes: {
    outOfModule: ParsedRoute[];
    combined?: {
      moduleName: string;
      routes: ParsedRoute[];
    }[];
  };
  requestOptions?: Partial<RequestInit>;
  utils: {
    formatDescription: (description: string, inline?: boolean) => string;
    internalCase: (value: string) => string;
    /** @deprecated */
    classNameCase: (value: string) => string;
    pascalCase: (value: string) => string;
    getInlineParseContent: (
      rawTypeData: SchemaComponent["rawTypeData"],
      typeName?: string,
    ) => string;
    getParseContent: (
      rawTypeData: SchemaComponent["rawTypeData"],
      typeName?: string,
    ) => ModelType;
    getComponentByRef: (ref: string) => SchemaComponent;
    parseSchema: (
      rawSchema: string | SchemaComponent["rawTypeData"],
      typeName?: string,
      formattersMap?: Record<MAIN_SCHEMA_TYPES, (content: ModelType) => string>,
    ) => ModelType;
    formatters: Record<
      MAIN_SCHEMA_TYPES,
      (content: string | object | string[] | object[]) => string
    >;
    inlineExtraFormatters: Record<
      Exclude<MAIN_SCHEMA_TYPES, SCHEMA_TYPES.PRIMITIVE>,
      (schema: ModelType) => string
    >;
    formatModelName: (name: string) => string;
    fmtToJSDocLine: (line: string, params?: { eol?: boolean }) => string;
    _: typeof import("es-toolkit") & typeof import("es-toolkit/compat");
    require: (path: string) => unknown;
  };
}

type FileInfo = {
  /** @example myFilename */
  fileName: string;
  /** @example .d.ts */
  fileExtension: string;
  /** content of the file */
  fileContent: string;
};

export interface GenerateApiOutput {
  configuration: GenerateApiConfiguration;
  files: FileInfo[];
  createFile: (params: {
    path: string;
    fileName: string;
    content: string;
    withPrefix: boolean;
  }) => void;
  renderTemplate: (
    templateContent: string,
    data: Record<string, unknown>,
    etaOptions?: Partial<import("eta").EtaConfig>,
  ) => Promise<string> | string;
  getTemplate: (params: {
    fileName?: string;
    name?: string;
    path?: string;
  }) => string;
  formatTSContent: (content: string) => Promise<string>;
}

export declare function generateApi(
  params: GenerateApiParams,
): Promise<GenerateApiOutput>;

export interface GenerateTemplatesParams {
  cleanOutput?: boolean;
  output?: string;
  httpClientType?: HttpClientType;
  modular?: boolean;
  rewrite?: boolean;
  silent?: boolean;
  debug?: boolean;
}

export interface GenerateTemplatesOutput
  extends Pick<GenerateApiOutput, "files" | "createFile"> {}

export declare function generateTemplates(
  params: GenerateTemplatesParams,
): Promise<GenerateTemplatesOutput>;
