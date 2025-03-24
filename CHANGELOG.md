# swagger-typescript-api

## 13.0.27

### Patch Changes

- [#1113](https://github.com/acacode/swagger-typescript-api/pull/1113) [`bdb3277`](https://github.com/acacode/swagger-typescript-api/commit/bdb3277302e566bbe182bd13c3ff22f07bd14aa6) Thanks [@smorimoto](https://github.com/smorimoto)! - Add `shims` option in tsup configuration and update `rootDir` path in templates generation process.

- [#1051](https://github.com/acacode/swagger-typescript-api/pull/1051) [`1fe8e24`](https://github.com/acacode/swagger-typescript-api/commit/1fe8e249993642a3fe5cc8da47ef4288421f9774) Thanks [@yepninja](https://github.com/yepninja)! - Resolve internal references in Swagger v2 to OpenAPI v3 conversion by adding `resolveInternal` option and enhancing type definitions for request payloads.

- [#1118](https://github.com/acacode/swagger-typescript-api/pull/1118) [`00f8995`](https://github.com/acacode/swagger-typescript-api/commit/00f8995f621521e2c0b66ca1660cb3d839f81bc8) Thanks [@smorimoto](https://github.com/smorimoto)! - Fix default value for `no-client` option in `generateCommand` to `false`.

- [#1113](https://github.com/acacode/swagger-typescript-api/pull/1113) [`28d43b4`](https://github.com/acacode/swagger-typescript-api/commit/28d43b49604f6fa00155a4e4ac95322d5ca86713) Thanks [@smorimoto](https://github.com/smorimoto)! - Add `required` property to output path in `generateTemplatesCommand`.

- [#1069](https://github.com/acacode/swagger-typescript-api/pull/1069) [`c06af2e`](https://github.com/acacode/swagger-typescript-api/commit/c06af2e3cf9b03aa37e3652d5312975bb1292d28) Thanks [@yangdan8](https://github.com/yangdan8)! - Fix documentation and type definition to align with actual implementation by renaming `name` to `fileName`.

## 13.0.26

### Patch Changes

- [#1106](https://github.com/acacode/swagger-typescript-api/pull/1106) [`9208816`](https://github.com/acacode/swagger-typescript-api/commit/920881663b9601e026b1798896f41eeb6112cd91) Thanks [@smorimoto](https://github.com/smorimoto)! - Add boolean type for `extract-request-params` in command configuration.

- [#1106](https://github.com/acacode/swagger-typescript-api/pull/1106) [`c124f88`](https://github.com/acacode/swagger-typescript-api/commit/c124f888e93547f408ed15cb2ca41b9ed145c1d2) Thanks [@smorimoto](https://github.com/smorimoto)! - Fix generateClient logic to exclude only `no-client` argument.

- [#1108](https://github.com/acacode/swagger-typescript-api/pull/1108) [`1e3b70e`](https://github.com/acacode/swagger-typescript-api/commit/1e3b70ea476ef4b5a6cdb407ce250a58ff64368b) Thanks [@smorimoto](https://github.com/smorimoto)! - Fix default value for `no-client` argument in command configuration.

- [#1106](https://github.com/acacode/swagger-typescript-api/pull/1106) [`4809884`](https://github.com/acacode/swagger-typescript-api/commit/480988407de42d5be5a2be58bd700e2e3dc89e37) Thanks [@smorimoto](https://github.com/smorimoto)! - Initialise `customConfig` to `undefined` in command run function.

## 13.0.25

### Patch Changes

- [#1102](https://github.com/acacode/swagger-typescript-api/pull/1102) [`13da52a`](https://github.com/acacode/swagger-typescript-api/commit/13da52aa9eab24f90f06316943e810b34767324b) Thanks [@smorimoto](https://github.com/smorimoto)! - Fix CLI executable by adding the required shebang to the entry file.

- [#1102](https://github.com/acacode/swagger-typescript-api/pull/1102) [`13da52a`](https://github.com/acacode/swagger-typescript-api/commit/13da52aa9eab24f90f06316943e810b34767324b) Thanks [@smorimoto](https://github.com/smorimoto)! - Fix query params detection on route name parsing

- [#1102](https://github.com/acacode/swagger-typescript-api/pull/1102) [`13da52a`](https://github.com/acacode/swagger-typescript-api/commit/13da52aa9eab24f90f06316943e810b34767324b) Thanks [@smorimoto](https://github.com/smorimoto)! - Improve type safety by adding proper types to SchemaComponent and introducing flags for extracted elements such as request parameters, request body, response body, and response errors.

## 13.0.24

### Patch Changes

- [#1046](https://github.com/acacode/swagger-typescript-api/pull/1046) [`40dd9d8`](https://github.com/acacode/swagger-typescript-api/commit/40dd9d864d69a897f53880c991bed7257d290b97) Thanks [@AugusDogus](https://github.com/AugusDogus)! - Respect debug and silent logging configuration for both cli and lib modes

- [#1048](https://github.com/acacode/swagger-typescript-api/pull/1048) [`bd49e34`](https://github.com/acacode/swagger-typescript-api/commit/bd49e34dee067101d997aab44224cf01ffd10e82) Thanks [@smorimoto](https://github.com/smorimoto)! - Remove types fields from package.json as there are no types yet

- [#929](https://github.com/acacode/swagger-typescript-api/pull/929) [`1e2e00e`](https://github.com/acacode/swagger-typescript-api/commit/1e2e00e373b0aa405adb7bf27f5b4d4d1d457875) Thanks [@BoltDoggy](https://github.com/BoltDoggy)! - Fix route regex pattern in route name generation

- [#701](https://github.com/acacode/swagger-typescript-api/pull/701) [`0a71f2b`](https://github.com/acacode/swagger-typescript-api/commit/0a71f2b381c40433bc86e39c174e448cb9a14572) Thanks [@nicky1038](https://github.com/nicky1038)! - Remove unnecessary camel case conversion for query params

- [#1041](https://github.com/acacode/swagger-typescript-api/pull/1041) [`47381de`](https://github.com/acacode/swagger-typescript-api/commit/47381dec5fde08e96d49164997db9592755dc08a) Thanks [@Jerome1337](https://github.com/Jerome1337)! - Add ts-nocheck comment to auto-generated file
