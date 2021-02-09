# next release  

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
