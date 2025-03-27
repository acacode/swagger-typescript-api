# Swagger TypeScript API

- Support for OpenAPI 3.0, 2.0, JSON and YAML
- Generate the API Client for Fetch or Axios from an OpenAPI Specification

Any questions you can ask [**here**](https://github.com/acacode/swagger-typescript-api/discussions)

## Examples

All examples you can find [**here**](https://github.com/acacode/swagger-typescript-api/tree/main/tests)

## Usage

You can use this package in two ways:

### CLI

```bash
npx swagger-typescript-api generate --path ./swagger.json
```

Or install locally in your project:

```bash
npm install --save-dev swagger-typescript-api
npx swagger-typescript-api generate --path ./swagger.json
```

### Library

```bash
npm install --save-dev swagger-typescript-api
```

```typescript
import * as path from "node:path";
import * as process from "node:process";
import { generateApi } from "swagger-typescript-api";

await generateApi({ input: path.resolve(process.cwd(), "./swagger.json") });
```

For more detailed configuration options, please consult the documentation.

## Mass media

- [5 Lessons learned about swagger-typescript-api](https://christo8989.medium.com/5-lessons-learned-about-swagger-typescript-api-511240b34c1)
- [Why Swagger schemes are needed in frontend development ?](https://dev.to/js2me/why-swagger-schemes-are-needed-in-frontend-development-2cb4)
- [Migration en douceur vers TypeScript (French)](https://www.premieroctet.com/blog/migration-typescript/)
- [swagger-typescript-api usage (Japanese)](https://zenn.dev/watahaya/articles/2f4a716c47903b)

## License

Licensed under the [MIT License](https://github.com/acacode/swagger-typescript-api/blob/main/LICENSE).
