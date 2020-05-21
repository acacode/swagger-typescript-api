# swagger-typescript-api  

[![Greenkeeper badge](https://badges.greenkeeper.io/acacode/swagger-typescript-api.svg)](https://greenkeeper.io/)
[![NPM badge](https://img.shields.io/npm/v/swagger-typescript-api.svg)](https://www.npmjs.com/package/swagger-typescript-api)

<img src="https://raw.githubusercontent.com/acacode/swagger-typescript-api/master/assets/swagger-typescript-api-logo.png" align="left"
     title="swagger-typescript-api logo by js2me" width="93" height="180">

Generate api via swagger scheme.  
Supports OA 3.0, 2.0, JSON, yaml  
Generated api module use [**Fetch Api**](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to make requests.  

<br>
<br>

Any questions you can ask [**here**](https://github.com/acacode/swagger-typescript-api/issues) or in [**our slack**](https://join.slack.com/t/acacode/shared_invite/enQtOTQ5ODgyODQzMzYwLWYxOGI1MzQ3Yzg1ZWI5ZTI5NzNiZjExZTE5OWI1YjQ4NjBiNTk4NWVlNjM5YmU1ZWI2ZDkyMzZkZGIxNjA5NTQ)(**#swagger-typescript-api** channel)
  
<br>  

![](https://raw.githubusercontent.com/acacode/swagger-typescript-api/master/assets/components-converter-example.jpg)  

## 👀 Examples  

All examples you can find [**here**](https://github.com/acacode/swagger-typescript-api/tree/master/tests)  

## 📄 Usage  

```muse
Usage: sta [options]
Usage: swagger-typescript-api [options]

Options:
  -v, --version             output the current version
  -p, --path <path>         path/url to swagger scheme
  -o, --output <output>     output path of typescript api file (default: "./")
  -n, --name <name>         name of output typescript api file (default: "Api.ts")
  -d, --default-as-success  use "default" response status code as success response too.
                            some swagger schemas use "default" response status code
                            as success response type by default. (default: false)
  -r, --responses           generate additional information about request responses  
                            also add typings for bad responses  
  --route-types             generate type definitions for API routes (default: false)
  --no-client               do not generate an API class
  -h, --help                output usage information
```

Also you can use `npx`:  
```
 npx swagger-typescript-api -p ./swagger.json -o ./src -n myApi.ts
```

You can use this package from nodejs:
```js
const { generateApi } = require('swagger-typescript-api');

// example with url  
generateApi({
  name: "MySuperbApi.ts", // name of output typescript file
  url: 'http://api.com/swagger.json', // url where located swagger schema
})
  .then(sourceFile => fs.writeFile(path, sourceFile))
  .catch(e => console.error(e))

// example with local file  
generateApi({
  name: "ApiModule.ts", // name of output typescript file
  input: resolve(process.cwd(), './foo/swagger.json') // path to swagger schema
})
  .then(sourceFile => fs.writeFile(path, sourceFile))
  .catch(e => console.error(e))

```

## 📄 Mass media  

- https://dev.to/js2me/why-swagger-schemes-are-needed-in-frontend-development-2cb4  


## 🚀 How it looks  

![](https://raw.githubusercontent.com/acacode/swagger-typescript-api/master/assets/npx.gif)  

![](https://raw.githubusercontent.com/acacode/swagger-typescript-api/master/assets/auth-example.gif)  

![](https://raw.githubusercontent.com/acacode/swagger-typescript-api/master/assets/typings1.gif)  


## 🛠️ Contribution  

You can manually check your changes at schemas in `tests` folder before create a PR.  
To do that have scripts:  
    - `npm run generate` - generate API modules from schemas in `tests` folder  
    - `npm run validate` - validate generated API modules via TypeScript  

## 📝 License  
Licensed under the [MIT License](https://github.com/acacode/swagger-typescript-api/blob/master/LICENSE).
