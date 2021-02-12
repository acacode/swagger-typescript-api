interface GenerateApiParams {
  /**
   * path to swagger schema
   */
  input: string;

  /**
   * url to swagger schema
   */
  url: string;

  /**
   * swagger schema JSON
   */
  spec: import("swagger-schema-official").Spec;

  /**
   * default 'api.ts'
   */
  name?: string;

  /**
   * path to folder where will been located the created api module
   */
  output?: string;

  /**
   * path to folder containing templates (default: ./scr/templates)
   */
  templates?: string;

  /**
   * generate type definitions for API routes (default: false)
   */
  generateRouteTypes?: boolean;

  /**
   * do not generate an API class
   */
  generateClient?: boolean;

  /**
   * use "default" response status code as success response too.
   * some swagger schemas use "default" response status code as success response type by default.
   */
  defaultResponseAsSuccess?: boolean;

  /**
   * generate additional information about request responses
   * also add typings for bad responses
   */
  generateResponses?: boolean;

  /**
   * generate js api module with declaration file (default: false)
   */
  toJS?: boolean;

  /**
   * determines which path index should be used for routes separation
   */
  moduleNameIndex?: number;
  /**
   * disabled SSL check
   */
  disableStrictSSL?: boolean;
  /**
   * generate separated files for http client, data contracts, and routes (default: false)
   */
  modular?: boolean;
  /**
   * extract request params to data contract (Also combine path params and query params into one object)
   */
  extractRequestParams?: boolean;
  prepareConfig?: <C extends GenerateApiConfiguration>(currentConfiguration: C) => C;
  /**
   * prettier configuration
   */
  prettier?: object;
  /**
   * default type for empty response schema (default: "void")
   */
  defaultResponseType?: boolean;
  cleanOutput?: boolean;
  enumNamesAsValues?: boolean;

  hooks?: Partial<{
    onCreateComponent: (component: SchemaComponent) => SchemaComponent | void;
    onParseSchema: (originalSchema: any, parsedSchema: any) => any | void;
    onCreateRoute: (routeData: ParsedRoute) => ParsedRoute | void;
    /** Start point of work this tool (after fetching schema) */
    onInit?: <C extends GenerateApiConfiguration["config"]>(configuration: C) => C | void;
    /** customize configuration object before sending it to ETA templates */
    onPrepareConfig?: <C extends GenerateApiConfiguration>(currentConfiguration: C) => C | void;
    onCreateRequestParams?: (
      rawType: SchemaComponent["rawTypeData"],
    ) => SchemaComponent["rawTypeData"] | void;
  }>;
  /**
   *  extra templates
   */
  extraTemplates?: { name: string; path: string }[];
}

export type SchemaTypePrimitiveContent = {
  $parsedSchema: boolean;
  schemaType: string;
  type: string;
  typeIdentifier: string;
  name?: any;
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
      SchemaTypeObjectContent | SchemaTypeEnumContent | SchemaTypePrimitiveContent
    >;
  };
  componentName: string;
  typeData: ParsedSchema<
    SchemaTypeObjectContent | SchemaTypeEnumContent | SchemaTypePrimitiveContent
  > | null;
}

export interface ParsedRoute {
  id: string;
  jsDocLines: string;
  namespace: string;
  request: Request;
  response: Response;
  routeName: {
    usage: string;
    original: string;
    duplicate: boolean;
  };
  raw: {
    method: string;
    route: string;
    moduleName: string;
    responsesTypes: {
      type: string;
      description: string;
      status: number;
      isSuccess: boolean;
    }[];
  };
}

export interface GenerateApiConfiguration {
  apiConfig: {
    props: {
      name: string;
      optional: boolean;
      type: string;
    }[];
    generic: {
      name: string;
      defaultValue: string;
    }[];
    baseUrl: string;
    title: string;
    version: string;
    description: string[];
    hasDescription: boolean;
  };
  config: {
    generateResponses: boolean;
    defaultResponseAsSuccess: boolean;
    generateRouteTypes: boolean;
    generateClient: boolean;
    generateUnionEnums: boolean;
    swaggerSchema: object;
    originalSchema: object;
    componentsMap: Record<string, SchemaComponent>;
    convertedFromSwagger2: boolean;
    moduleNameIndex: number;
    disableStrictSSL: boolean;
    extractRequestParams: boolean;
    fileNames: {
      dataContracts: string;
      routeTypes: string;
      httpClient: string;
      outOfModuleApi: string;
    };
    templatesToRender: {
      api: string;
      dataContracts: string;
      httpClient: string;
      routeTypes: string;
      routeName: string;
    };
    routeNameDuplicatesMap: Map<string, string>;
  };
  modelTypes: {
    typeIdentifier: string;
    name: string;
    rawContent: string;
    description: string;
    content: string;
  }[];
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
  utils: typeof import("./src/render/utils");
}

export interface GenerateApiOutput {
  configuration: GenerateApiConfiguration;
  files: { name: string; content: string; declaration: { name: string; content: string } | null }[];
}

export declare function generateApi(
  params: Omit<GenerateApiParams, "url" | "spec">,
): Promise<GenerateApiOutput>;
export declare function generateApi(
  params: Omit<GenerateApiParams, "input" | "spec">,
): Promise<GenerateApiOutput>;
export declare function generateApi(
  params: Omit<GenerateApiParams, "input" | "url">,
): Promise<GenerateApiOutput>;
