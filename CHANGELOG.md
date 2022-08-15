# next release

# 10.0.1  

- fix problem linked with [this.name is not a function](https://github.com/acacode/swagger-typescript-api/issues/381)  
- [internal] add cli tests  
- fix problem with not correct working the `--no-client` option

# 10.0.0  

- `--extract-response-body` option - extract response body type to data contract  
- `--extract-response-error` option - extract response error type to data contract   
- `--add-readonly` option - generate readonly properties  
- `authorizationToken` for axios fetch swagger schema request  
- fix: change COMPLEX_NOT_OF to COMPLEX_NOT (internal)
- feat: improve `@deprecated` jsdoc info
- feat: improve `required` field in complex data schemas (anyOf, oneOf, allOf etc)  
- feat: abortSignal for fetch http client
- chore: improve typings in index.d.ts
- fixed [Request falls if FormData attachment is File instance](https://github.com/acacode/swagger-typescript-api/issues/293)
- fixed [Response format - global default or override ?](https://github.com/acacode/swagger-typescript-api/issues/251)

> Co-authored-by: Sergey S. Volkov <js2me@outlook.com>  
> Co-authored-by: Xavier Cassel <57092100+xcassel@users.noreply.github.com>  
> Co-authored-by: cassel <xavier.cassel35@gmail.com>  
> Co-authored-by: Adrian Wieprzkowicz <Argeento@users.noreply.github.com>  
> Co-authored-by: EvgenBabenko <evgen.babenko@gmail.com>  
> Co-authored-by: RoCat <catoio.romain@gmail.com>  
> Co-authored-by: rcatoio <rcatoio@doubletrade.com>  
> Co-authored-by: 卡色 <cipchk@qq.com>  
> Co-authored-by: 江麻妞 <50100681+jiangmaniu@users.noreply.github.com>  
> Co-authored-by: Kasper Moskwiak <kasper.moskwiak@gmail.com>  
> Co-authored-by: Ben Watkins <ben@outdatedversion.com>  
> Co-authored-by: bonukai <bonukai@protonmail.com>  
> Co-authored-by: baggoedw <92381702+baggoedw@users.noreply.github.com>  
> Co-authored-by: Marcus Dunn <51931484+MarcusDunn@users.noreply.github.com>  
> Co-authored-by: Daniele De Matteo <daniele@kuama.net>  
> Co-authored-by: Daniel Playfair Cal <daniel.playfair.cal@gmail.com>  
> Co-authored-by: Anders Cassidy <anders.cassidy@dailypay.com>  
> Co-authored-by: Daniel Playfair Cal <dcal@atlassian.com>  

# 9.2.0  

Features:  
- full response typing for status code, data and headers. (#272, thanks @rustyconover)  
- --unwrap-response-data to unwrap the data item from the response (#268, thanks @laktak)  

Fixes:  
- fix: formdata in axios template (#277, thanks @tiagoskaneta)  

# 9.1.2

Fixes:  
- Bug with --single-http-client and private `http` property  

# 9.1.1  

Fixes:  
- Bug with nested objects in FormData (issue #262, thanks @avlnche64)  

# 9.1.0  

Fixes:  
- Critical bug linked with `templateRequire` in ETA templates  
- Critical bugs linked with `--type-prefix`, `--type-suffix`  

Internal:  
- Improve manual testing scripts  

# 9.0.2  

Fixes:  
- 9.0.1 won't build with tsc when imported (thanks @mastermatt)  

# 9.0.1  

Fixes:  
- Can't compile 9.0.0 version (thanks @Nihisil )  

# 9.0.0  

NOTE: This version is not compatible with previous templates (removed `route.request.params`, `apiConfig.props`, `apiConfig.generic`, `apiConfig.description`, `apiConfig.hasDescription`)  

Fixes:  
- Consider 2xx a successful status (thanks @wyozi)  
- GET method query option bug (thanks @rhkdgns95, @SaschaGalley)  
- `silent` property missed in `.d.ts` file (thanks @mastermatt)  
- axios file upload `formData` type (thanks @guhyeon)  
- make property `instance` to public in axios http client (It can be helpful in #226)  
- variable name "params" doesn't uniq (thanks @mixalbl4-127 )  

Features:  
- `--disableProxy` option (thanks @kel666)  
- `--extract-request-body` option. Allows to extract request body type to data contract  
- Add TSDoc tag for deprecated route (thanks @wyozi)  


# 8.0.3  

- Fixes encoding array query params in `fetch` http templates (thanks @prog13)  

# 8.0.2  

Fixes:  
- Wrong working the `format` option in `fetch` http client  

# 8.0.1  

Fixes:  
- Not working `customFetch` 
  Error: `Failed to execute 'fetch' on 'Window': Illegal invocation`   

# 8.0.0  

BREAKING_CHANGES:  
- remove default `json` format of the response type (both for `axios` and `fetch` http clients) (issue #213, thanks @po5i)  

Features:  
- Allow passing custom fetch function (`fetch` http client only)  
- Allow to set global response type format through `HttpClient` constructor  
  Example:  
```ts
    const httpClient = new HttpClient({ format: 'json' });
    // all request responses will been formatted as json  
```
Fixes:  
- Missing `schema.$ref` in inline enum schemas  
- Array query param values are serialized with the (non-default) comma separated style (issue #222, thanks @Styn, PR #223)  
- TypeScript error "TS6133: 'E' is declared but its value is never read." (`axios` http client) (issue #220, thanks @pmbednarczyk )  

# 7.0.1  

Fixes:  
- "securityWorker" is only used if "secure" option is specified on each request (issue #212, thanks @dkamyshov)  
  NOTE: added global `secure` option for `axios` http client  
- `index.d.ts` file (add `rawModelTypes`)  

# 7.0.0  

BREAKING_CHANGES:  
- format `namespace` name in `--route-types` as camelCase with upper first capitalized letter  
  `foo_bar` -> `FooBar`  

Fixes:  
- Incorrect working the `--route-types` option with `--modular` option (route types should be splitted on files)  
- Fix critical bug linked with enums with boolean type (thanks @haedaal)  

Features:  
- Ability to return `false` in `onCreateRoute` hook, it allow to ignore route  
- Add output util functions  
```ts
  createFile: (params: {
    path: string;
    fileName: string;
    content: string;
    withPrefix?: boolean;
  }) => void;
  renderTemplate: (
    templateContent: string,
    data: Record<string, unknown>,
    etaOptions?: import("eta/dist/types/config").PartialConfig
  ) => string;
  getTemplate: (params: {
    fileName?: string;
    name?: string;
    path?: string;
  }) => string
  formatTSContent: (content: string) => string;


  // ...

  generateApi({ /* ... */ }).then(({ createFile, renderTemplate, getTemplate }) => {
    // do something
  })
```

# 6.4.2  

Fixes:  
- Bug with missing `name` property in in-path requests parameters  
- Problem with usage `--route-types` with `--modular` option (mising import data contracts)  

# 6.4.1  

Fixes:  
- Bug with axios headers (thanks @mutoe)  

# 6.4.0  

Features:  
- `onFormatRouteName(routeInfo: RawRouteInfo, templateRouteName: string)` hook. Allows to format route name, as you like :)  

Fixes:
- Bug with wrong complex types (anyOf, oneOf, allOf) when some child schema contains only description  
  ![example](./assets/changelog_assets/fixComplexTypeAny.jpg)  
- Bug with number enums which have `x-enumNames`  
- Problem with not existing `title` property in `info`  

Minor:  
- Improve description for complex types  
- Improve description in single api file  

# 6.3.0  

Features:  
- `--type-suffix` option. Allows to set suffix for data contract name. (issue #191, thanks @the-ult)  
- `--type-prefix` option. Allows to set prefix for data contract name. (issue #191, thanks @the-ult)  
  Examples [here](./spec/typeSuffixPrefix/schema.ts)  
- `onFormatTypeName(usageTypeName, rawTypeName)` hook. Allow to format data contract names as you want.  

Internal:  
- rename and split `checkAndRenameModelName` -> `formatModelName`, `fixModelName`  

# 6.2.1  

Fixes:  
- missing `generateUnionEnums?: boolean;` in `index.d.ts` file (thanks @artsaban)  
- missing default params to axios http client (`--axios`) (issue #192, thanks @Nihisil)  

# 6.2.0  

Features:  
- `--module-name-first-tag` option. Splits routes based on the first tag (thanks @jnpoyser)  

# 6.1.2  

Fixes:  
- Problems with using both `--axios` and `--modular` options together (TS, `organizeImports` crashed the codegeneration)  

# 6.1.1  

Fixes:  
- Problems with `--axios` option  
  - ignoring `path`, `format`, `type` payload properties in `request()` method of `HttpClient`  
- Missing `format` property for requests in `--modular` option  

# 6.1.0  

Features:  
- `--silent` option. Output only errors to console (default: false)  

Fixes:  
- Bug with `kebab-case` path params (issue #184, thanks @Mr-sgreen)  
- Typings for `--js` option  

# 6.0.0  

BREAKING_CHANGES:  
- Ability to override only one template (issue #166, thanks @Nihisil)  
- removed `TPromise` type for `--responses` options (perf. problem, issue #182, thanks @mixalbl4-127)  
- breaking changes in `http-client.eta`  
- `securityWorker` now can return `Promise<RequestParams | void> | RequestParams | void`  

Features:  
- template path prefixes `@base`, `@default`, `@modular` (using in Eta templates, `includeFile()`, see README.md)  
- `--axios` option for axios http client (issue #142, thanks @msklvsk, @mixalbl4-127 )  

# 5.1.7  

Fixes:  
- Do not fail if template file does not exist (issue #166, thanks @armsnyder )  
  Caveat: With this fix it will still error if the overridden template uses `includeFile` on a template file that is not overridden  

# 5.1.6  

Fixes:  
- The contentFormatter for ContentType:Json does not correctly format strings (issue #176, thanks @Styn)  

# 5.1.5  

Fixes:  
- ContentType.FormData no longer sets the correct boundary (issue #172, thanks @Styn)  

# 5.1.4  

Fixes:  
- header overwrite in `default` and `modular` API templates (issue #171 by @Styn, thanks @emilecantin for PR with fix)  

# 5.1.3  

Fixes:  
- Ignored `x-nullable` field  
- Schema type names which starts with number or special characters  

# 5.1.2  

Fixes:  
- Linter disable rules is not working (issue #164, thanks @Haritaso)  

# 5.1.1  

Fixes:  
- The HttpResponse type is no longer exported from http-client (issue #161, thanks @Styn)  

# 5.1.0  

Fixes:  
- Bug with optional nested properties of object schema type (issue #156, thanks @Fabiencdp)  

Features:   
- `onCreateRouteName(routeNameInfo: RouteNameInfo, rawRouteInfo: RawRouteInfo): RouteNameInfo | void` hook  
  Which allows to customize route name without customizing `route-name.eta` template  
- Improved content kinds for request infos  
- `--single-http-client` option which allows to send HttpClient instance to Api constructor and not to create many count of HttpClient instances with `--modular` api (issue #155)   

Minor:  
- A bit improve type declaration file (index.d.ts) for this tool  
- make exportable `ApiConfig` interface  

Internal:  
- clearing `routeNameDuplicatesMap` before each `parseRoutes()` function call  
- Changed templates:  
  - `http-client.eta`  
  - `procedure-call.eta`  
  - `api.eta`  

# 5.0.0  

Fixes:  
- Request content types auto substitution  
  i.e. if request body is form data, then request body content type will be `multipart/form-data`  
- Strange method name (issue #152, thanks @RoXuS)  
- Hardcoded Content-Type causes issues with some endpoints (issue #153, thanks @po5i)  
- Critical bug with `:paramName` path params (issue #154)  

Features:  
- Ability to provide custom formatting `fetch` response  
- `"IMAGE"` content kind for response\request data objects  
- `RequestParams` `RequestHeaders` types for `--route-types` (`routeTypes: true`) option (issue #150, thanks @Fabiencdp )  
- `--default-response` option. Allows to set default type for empty response schema (default: `void`) (based on issue #14)  
- Request cancellation support (issue #96, thanks @ApacheEx)  
  `RequestParams` type now have the `cancelToken` field  
  `HttpClient` instance now have the `abortRequest(cancelToken)` method  

BREAKING_CHANGES:  
- Fully refactored `http-client.eta` template, make it more flexible and simpler.  
  `HttpClient["request"]` takes one argument with type `FullRequestParams`  
  (previously it takes many count of arguments which was not flexible)  
- Changed the default response body type from `any` to `void` (issue #14)   

Internal:  
- Changed templates:  
  - `http-client.eta`  
  - `procedure-call.eta`  
  - `api.eta`  

This version works with previous templates.  

# 4.4.0  

Fixes:  
- Client generation for `Content-Type: application/x-www-form-urlencoded` (issue #146, thanks @Larox)  

Internal:  
- Changed templates:  
  - `http-client.eta`  
  - `procedure-call.eta`  

# 4.3.0  

Fixes:  
- enum + nullable: true doesn't compute the good type (issue #145, thanks @RoXuS)  
- Underscores are omitted from enum keys (issue #108, thanks @eolant)  
- CLI silently fails if the directory to put new files in doesn't exist yet (issue #141, thanks @Styn)  

Features:  
- Improved type description   

Internal:   
- dependencies update:  
  - `"js-yaml": "^4.0.0"` (`"^3.14.1"`)  
  - `"make-dir": "^3.1.0"`
  - `"swagger2openapi": "^7.0.5"` (`"^7.0.4"`)  
- Difference in templates:  
  - `data-contracts.eta`  
  ![dataContracts430](./assets/changelog_assets/http-client-template-diff-4.3.0.jpg)  

# 4.2.0  
Features:  
- new hook `onCreateRequestParams` which allows modify request params (`--extract-request-params` option) before sending it to route info   
  ![onCreateRequestParams](./assets/changelog_assets/onCreateRequestParamsHook.jpg)  
  How to use:  
  ```ts
    generateApi({
      // ... your config,
      hooks: {
        onCreateRequestParams: (rawType) => {
          if (Object.keys(rawType.properties).length > 1) return rawType;

          return rawType;
        }
      }
    })
  ```   
- response content types (array of string like `application/json`, `image/png`) which allows to customize declaration of request response  
  Exist in `procedure-call.eta` template `it.route.response.contentTypes`  

Internal:  
- Difference in templates:  
  - `procedure-call.eta`  
  ![procedureCallEta1](./assets/changelog_assets/changes_procedure_call_1.jpg)  


# 4.1.0  

Features:  
- Improve `require()` function used in ETA templates (using relative path imports)  
- `--clean-output` option.  
  clean output folder before generate api  

Fixes:  
- Error: `Unexpected token =` (Issue #136, Thanks @jlow-mudbath)  
- Output folder creation (Issue #137, Thanks @Rinta01)  
  Create output folder if it is not exist  

# 4.0.5  

BREAKING_CHANGE:  
- remove `'prettier-plugin-organize-imports'` dependency from package  

Fixes:  
- issue #134 (Thanks @mrfratello)  

# 4.0.4  

Features:  
- add `require()` to template `utils` object  

Docs:  
- add information about contributors  

# 4.0.3  

Features:  
- `--disableStrictSSL` option for disable strict SSL statement with fetching swagger schema. (Thanks @kel666 for PR with feature request)  
  This option fix problem #114  

# 4.0.2  

Fixes:  
 - `Unexpected token '.'` on v4 (Thanks @savingprivatebryan for issue #111)  
    Replaced all new syntax sugar like `?.` or `??` to prev. alternatives for support nodejs 12  

# 4.0.1  

Fixes:  
- `Cannot find module 'prettier-plugin-organize-imports'` #109  

# 4.0.0  

BREAKING_CHANGES:  
- Migrate from [mustache](https://mustache.github.io/) template engine to [ETA](https://eta.js.org/) template engine. (Thanks @Fl0pZz)  
- Critical change in `HttpResponse` type (Remove `D | null`, `E | null` unions)  
```diff
interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
-  data: D | null;
+  data: D;
-  error: E | null;
+  error: E;
}
```

Features:  
- `--modular` option. Allows to generate api class per module name.   
  Example: [here](./tests/spec/modular)   
- new templates on [ETA](https://eta.js.org/) (enhanced EJS) which can improve your templates! (Thanks @Fl0pZz)   
  [ETA extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=shadowtime2000.eta-vscode) (thanks @shadowtime2000)  
  Also moved out to templates:
    - `procedure-call.eta` (request api method template)  
    - `route-name.eta` (api method name template)  
    - `route-docs.eta` (api method docs template)  

  No worry about strange syntax it is very simple in usage :)  
- Optional templates feature (Except templates using in `includeFile` `ETA` directive)  
  Now you can store only the `ETA` templates which you need to change for yourself.  
- `--extract-request-params` option. Generate path and query request params data contract and modify request payload args   
  Example:  
  ![extract-request-params](./assets/changelog_assets/extractRequestParams.jpg)  
- Improve `data-contracts.eta` template. Added more power :)  
- Add `extraTemplates` property for `generateApi()`. Allows to generate extra files via this tool.  
- Add `hooks` property for `generateApi()`  
  ```ts
  hooks?: Partial<{
    onCreateComponent: (component: SchemaComponent) => SchemaComponent | void;
    onParseSchema: (originalSchema: any, parsedSchema: any) => any | void;
    onCreateRoute: (routeData: ParsedRoute) => ParsedRoute | void;
    /** Start point of work this tool (after fetching schema) */
    onInit?: <C extends GenerateApiConfiguration["config"]>(configuration: C) => C | void;
    /** Allows to customize configuration object before sending it to templates. */
    onPrepareConfig?: <C extends GenerateApiConfiguration>(currentConfiguration: C) => C | void;
  }>;
  ```
  ```ts
    generateApi({
      input: "./schema.json",
      output: "./__generated__",
      hooks: {
        onCreateComponent(component) {
          // do something
          return component;
        },
        // ...
      }
    })
  ```

Internal:  
- Update all dependencies to latest  

Fixes:  
- `x-enumNames` support for enums  
- Problem of complex types (`oneOf`, `allOf`) with `properties` field  
- `additionalProperties: true` should make `[key: string]: any` for object types (Thanks @brookjordan for issue #103)  

Common:  
- `HttpClient` is exportable by default  
- Improve typings when use `swagger-typescript-api` with NodeJS (`index.d.ts`)  

# 3.1.2  
Fixes:  
- axios vulnerability (#101 issue, thanks @Mvbraathen)  

# 3.1.1  

Fixes:  
- `name.includes is not a function` (issue #98)  

# 3.1.0  

Features:  
- `--moduleNameIndex` option. determines which path index should be used for routes separation (Thanks @nikalun)  
  Examples:  
    GET:api/v1/fruites/getFruit -> index:2 -> moduleName -> fruites
    GET:api/v1/fruites/getFruit -> index:0 -> moduleName -> api

# 3.0.1  

Fixes:  
- invalid default templates path (#92, thanks @larrybotha for quick fix)  

# 3.0.0  

BREAKING_CHANGES:  
- Renamed mustache templates:  
  - `api.mustache` -> `data-contracts.mustache`   
  - `client.mustache` -> `http.client.mustache` + `api.mustache`  
- Split the `client.mustache` template into two parts: `http-client.mustache` and `api.mustache`  

Fixes:  
- Fixed unsafe clone() of Response causing json() hang. (Thanks @Benjamin-Dobell)  

# 2.0.0  

Features:
- `--js` CLI option. [[feature request]](https://github.com/acacode/swagger-typescript-api/issues/79)  

BREAKING_CHANGES:  
- Requests returns `Promise<HttpResponse<Data, Error>>` type.  
  `HttpResponse` it is [Fetch.Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) wrapper with fields `data` and `error`
  Example:  
  ```ts
    const api = new Api()
    
    //
    const response: HttpResponse<Data, Error> = await api.fruits.getAll()

    response.data // Data (can be null if response.ok is false)
    response.error // Error (can be null if response.ok is true)
  ```  
- Breaking changes in the `client.mustache` template. Needs to update local custom templates.  

Fixes:  
- Security configuration in methods. When the security definition is in the main configuration of the swagger definition  


# 1.12.0   

Features:  
- Can provide ability to generate from swagger JSON directly not from a file? #69 (Thanks @JennieJi)  

Fixes:  
- handling `x-omitempty` property for definition properties #68  
- Additional properties map to empty interfaces (OpenAPI v3) #76  
- Pattern fields in Path Item Object are treated as operations #75  
- Remove const enum from default template #73  
- enums with spaces throw an error #71  


# 1.11.0  

Features:  
- Improve the naming of model types ([#65 issue](https://github.com/acacode/swagger-typescript-api/issues/65))  

# 1.10.0  

Features:  
- `--templates` CLI option. [[feature request]](https://github.com/acacode/swagger-typescript-api/issues/54)  
  Provide custom `mustache` templates folder which allows to generate custom code (models, Api class, routes)  
- `--union-enums` CLI option. [[feature request]](https://github.com/acacode/swagger-typescript-api/issues/58)  
  Allows to generate all enums as union types.  
  For example, schema part:  
  ```
  "StringEnum": {
    "enum": ["String1", "String2", "String3", "String4"],
    "type": "string"
  }
  ```  
  will be converted into:
      ```
export type StringEnum = "String1" | "String2" | "String3" | "String4";
      ```  
  

# 1.8.4  

Fixes:  
- Multiple types for a property in Swagger 2 are not handled correctly ([#55 issue](https://github.com/acacode/swagger-typescript-api/issues/55)) 

# 1.8.3  

Fixes:  
- Generating invalid code in composed schema contexts ([#51 issue](https://github.com/acacode/swagger-typescript-api/issues/51)) 
  ```yaml
  components:
  schemas:
    Test:
      type: object
      allOf:
        - type: object
          properties:
            x:
              type: array
              items:
                type: string
                enum:
                  - A-B
        - type: object
          properties:
            y:
              type: string
  ```
  ```ts
  export type Test = XAB & { y?: string };
  ```

# 1.8.2  

Fixes:  
- Broken types for arrays of union types ([issue](https://github.com/acacode/swagger-typescript-api/issues/49))  

# 1.8.1  

Fixes:  
- form data request body (request body content `multipart/form-data`)  

Minor:  
- inline comments of the data contract type properties  
  ![one line comments](./assets/changelog_assets/one-line-comments.jpg)  
- remove `Array<T>` type usage (now the more simple type `T[]`)

# 1.8.0    

Features:  

- **Partially** support FormData body types  
- Support to generate query params of nested query objects (Partial fix of [this issue](https://github.com/acacode/swagger-typescript-api/issues/45))  


# 1.7.2  

Fixes:  

- Critical bug with converting inline object into name of type for request body.  
- Fix bug when path parameters is not set but contains in endpoint url.  
  ![path params bug 1](./assets/changelog_assets/bug-with-no-path-args.jpg)  
  ![path params bug 2](./assets/changelog_assets/bug-with-no-path-args2.jpg)  


# 1.7.0  

Breaking Changes:  

- Remove `title` and `version` public Api class properties (moved it to Api class JSDOC)([fixes this issue](https://github.com/acacode/swagger-typescript-api/issues/41))  
  ![removed title and version properties](./assets/changelog_assets/removed-title-version-props.jpg)  
- Move out all http client handlers/properties into `HttpClient` local class in module  
  ![http-client-class1](./assets/changelog_assets/http-client-class1.jpg)  
  ![http-client-class2](./assets/changelog_assets/http-client-class2.jpg)  

Chore:  

- default value for `SecurityDataType` Api class generic type  
  

# 1.6.3  

Fixes:  

- Handling of nullable for $ref in OpenAPI 3.0 ([issue](https://github.com/acacode/swagger-typescript-api/issues/39))  
  Plus based on this issue was fixed most other problems with using `required` and `nullable` properties  


# 1.6.2  

Fixes:  

- Nullable not included in type definition ([issue](https://github.com/acacode/swagger-typescript-api/issues/36))  

Internal:

- Update `swagger2openapi`(`6.0.0`) dependency    

# 1.6.1  

Internal:

- Update `prettier`(`2.0.2`), `swagger2openapi`(`5.4.0`) dependencies  

# 1.6.0

Features:

- Improvenment in optional request params (request body, query params, path params)

Fixes:

- Fix bug when `path` request param have the same name as `query`
- Fix bug when `path` request param have the same name as `params`

Minor/Internal:

- changed `addQueryParams()` method
- up `swagger2openapi` dependency version to `5.3.4`

# 1.5.0

Features:

- Add `prettier` for beautify output typescript api module
- Support `additionalProperties` type data  
  ![additional properties](./assets/changelog_assets/additional-properties-types.jpg)

Fixes:

- Fix problem with array `type` definitions without `type` property([#26](https://github.com/acacode/swagger-typescript-api/issues/26))

# 1.4.1

Fixes:

- Fix TS problem with `addQueryParams` Api class method (issue [#22](https://github.com/acacode/swagger-typescript-api/issues/22), thanks [genaby](https://github.com/genaby))

# 1.4.0

Breaking Changes:

- Rename default typescript output api file name (prev `api.ts`, now `Api.ts`)  
  Features:
- `-d, --default-as-success` option. Allows to use "default" status codes as success response type
- `-r, --responses` option. Response declarations in request rescription  
  This option adds comments of the possible responses from request   
  ![responses comments](./assets/changelog_assets/responses-comments.jpg)  
  Also typings for `.catch()` callback  
  ![responses catch types](./assets/changelog_assets/responses-catch-types.jpg)
- Improve response body type definitions
- Types for bad responses  
  Changes:
- \[minor\] fix jsdoc comments space  
  ![right comments space](./assets/changelog_assets/right-comments-space.jpg)

# 1.3.0

Features:

- Api module description from schema info  
  ![api description](./assets/changelog_assets/api-module-description.jpg)
- Generate API type declarations (CLI flag `--route-types`, thanks [azz](https://github.com/azz))  
  ![route types](./assets/changelog_assets/route-types.jpg)
- Ability to not generate clint API class (CLI flag `--no-client`, thanks [azz](https://github.com/azz))

Fixes:

- Improve response body type definition

Internal:

- refactored `generate` and `validate` test scripts

# 1.2.6

Fixes: create api without `-o` option (use default `./` output)

# 1.2.5

Features: better naming of routes without `operationId`  
![route naming](./assets/changelog_assets/1.2.5_route_naming.jpg)  
Changes: rename `@security true` -> `@secure`, `@duplicate true` -> `@duplicate`  
Fixes: Support generated swagger schemes from tsoa 3.x with complex types (Omit, Pick, etc)

# 1.2.4

Features: add .d.ts file into npm package  
Changes: update help block in CLI  
Internal: add greenkeeper, update npm keywords

# 1.2.3

Features: @summary, @description comments at each route  
Fixes: parsing schema without routes  
Changes: update documentation  
Internal: add anyOf, allOf test schemas, slack notifications in CI

# 1.2.2

Fixes: fix complex types (oneOf, anyOf), required fields of object type was not required

# 1.2.0

Changes: rename `ApiParams` to `RequestParams`, secure module always exist in generated API module, update documentation  
Fixes: Query params was all required, parse yaml files, typescript minor warnings (;)  
Internal: test schemas + manual testing, add travis CI/CD

# 1.1.0

Fixes: catching http errors with use API module

# 1.0.9

Features: add description to interfaces and their fields  
Changes: update documentation

# 1.0.8

Changes: update documentation

# 1.0.7

Changes: update documentation (+ add logo), add comment about author in generated module

# 1.0.6

Fixes: route naming, http(s) requests for getting swagger schema, integer enums  
Changes: include only required files into npm pacakge

# 1.0.5

Changes: update documentation

# 1.0.4

Changes: disable linters rules for generated API module  
Fixes: TS issues in template

# 1.0.3

Fixes: NodeJS main script cannot been called on Unix\* machines  
Changes: add LICENSE, update README

# 1.0.2

Changes(Internal): change dependencies

# 1.0.1

New features: query params, separating routes on submodules, common params in constructor, swagger v2 + yaml parsers  
Enhancements: better type extracting.  
Fixes: mustache escaping chars  
Changes: order of request params, emojis messages in console

# 1.0.0

Initial project.
