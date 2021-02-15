# swagger-typescript-api  

[![Greenkeeper badge](https://badges.greenkeeper.io/acacode/swagger-typescript-api.svg)](https://greenkeeper.io/) 
[![NPM badge](https://img.shields.io/npm/v/swagger-typescript-api.svg)](https://www.npmjs.com/package/swagger-typescript-api) 
[![Build Status](https://travis-ci.org/acacode/swagger-typescript-api.svg?branch=master)](https://travis-ci.org/acacode/swagger-typescript-api) <!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-13-orange.svg)](#contributors)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

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

## 🛑 It is new version with [ETA](https://eta.js.org/docs/syntax) templates  
Version with `mustache` templates is `>4.0.0`  

## 📄 Usage  

```muse
Usage: sta [options]
Usage: swagger-typescript-api [options]

Options:
  -v, --version                 output the current version
  -p, --path <path>             path/url to swagger scheme
  -o, --output <output>         output path of typescript api file (default: "./")
  -n, --name <name>             name of output typescript api file (default: "Api.ts")
  -t, --templates <path>        path to folder containing templates
  -d, --default-as-success      use "default" response status code as success response too.
                                some swagger schemas use "default" response status code
                                as success response type by default. (default: false)
  -r, --responses               generate additional information about request responses
                                also add typings for bad responses (default: false)
  --union-enums                 generate all "enum" types as union types (T1 | T2 | TN) (default: false)
  --route-types                 generate type definitions for API routes (default: false)
  --no-client                   do not generate an API class
  --enum-names-as-values        use values in 'x-enumNames' as enum values (not only as keys) (default: false)
  --js                          generate js api module with declaration file (default: false)
  --extract-request-params      extract request params to data contract (default: false)
                                Also combine path params and query params into one object
  --module-name-index <number>  determines which path index should be used for routes separation (default: 0)
                                (example: GET:/fruites/getFruit -> index:0 -> moduleName -> fruites)
  --modular                     generate separated files for http client, data contracts, and routes (default: false)
  --disableStrictSSL            disabled strict SSL (default: false)
  --clean-output                clean output folder before generate api. WARNING: May cause data loss (default: false)
  --default-response <type>     default type for empty response schema (default: "void")
  -h, --help                    display help for command
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
  .then(({ files, configuration }) => {
    files.forEach(({ content, name }) => {
      fs.writeFile(path, content);
    });
  })
  .catch(e => console.error(e))

// example with local file  
generateApi({
  name: "ApiModule.ts", // name of output typescript file
  input: resolve(process.cwd(), './foo/swagger.json') // path to swagger schema
})
  .then(({ files, configuration }) => {
    files.forEach(({ content, name }) => {
      fs.writeFile(path, content);
    });
  })
  .catch(e => console.error(e))

// example with parsed schema  
generateApi({
  name: "ApiModule.ts", // name of output typescript file
  spec: {
    swagger: "2.0",
    info: {
      version: "1.0.0",
      title: "Swagger Petstore",
    },
    host: "petstore.swagger.io",
    basePath: "/api",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    paths: {
      // ...
    }
    // ...
  }
})
  .then(({ files, configuration }) => {
    files.forEach(({ content, name }) => {
      fs.writeFile(path, content);
    });
  })
  .catch(e => console.error(e))

```


## 💎 options   
### **`--templates`**  
This option needed for cases when you don't want to use default `swagger-typescript-api` output structure  

Templates:  
- `api.eta` - Api class module  
- `data-contracts.eta` - all types (data contracts) from swagger schema  
- `http-client.eta` - HttpClient class module  
- `procedure-call.eta` - route in Api class  
- `route-docs.eta` - documentation for route in Api class  
- `route-name.eta` - route name for route in Api class  
- `route-type.eta` - *(`--route-types` option)*  
- `route-types.eta` - *(`--route-types` option)*  

How to use it:  
1. copy swagger-typescript-api templates into your place in project
    - from [/templates/default](https://github.com/acacode/swagger-typescript-api/tree/next/templates/default) for single api file  
    - from [/templates/modular](https://github.com/acacode/swagger-typescript-api/tree/next/templates/modular) for multiple api files (with `--modular` option)  
1. add `--templates PATH_TO_YOUR_TEMPLATES` option  
2. modify [ETA](https://eta.js.org/docs/syntax) templates as you like  

### **`--module-name-index`**  
This option should be used in cases when you have api with one global prefix like `/api`   
Example:   
`GET:/api/fruits/getFruits`  
`POST:/api/fruits/addFruits`  
`GET:/api/vegetables/addVegetable`  
with `--module-name-index 0` Api class will have one property `api`  
When we change it to `--module-name-index 1` then Api class have two properties `fruits` and `vegetables`  


## 📄 Mass media  

- [Why Swagger schemes are needed in frontend development ?](https://dev.to/js2me/why-swagger-schemes-are-needed-in-frontend-development-2cb4)  
- [Migration en douceur vers TypeScript](https://www.premieroctet.com/blog/migration-typescript/)  

## 🛠️ Contribution  

❗❗❗ Please use the `next` branch :)   

If you need to check your changes at schemas in `tests` folder before create a PR just run command `npm run test-all`  

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/js2me"><img src="https://avatars1.githubusercontent.com/u/16340911?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sergey S. Volkov</b></sub></a><br /><a href="https://github.com/acacode/swagger-typescript-api/commits?author=js2me" title="Code">💻</a> <a href="https://github.com/acacode/swagger-typescript-api/commits?author=js2me" title="Documentation">📖</a> <a href="#design-js2me" title="Design">🎨</a> <a href="#example-js2me" title="Examples">💡</a> <a href="#maintenance-js2me" title="Maintenance">🚧</a> <a href="#ideas-js2me" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/acacode/swagger-typescript-api/issues?q=author%3Ajs2me" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/andrefilimono"><img src="https://avatars0.githubusercontent.com/u/7794526?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Filimonov Andrey</b></sub></a><br /><a href="https://github.com/acacode/swagger-typescript-api/commits?author=andrefilimono" title="Code">💻</a> <a href="#ideas-andrefilimono" title="Ideas, Planning, & Feedback">🤔</a> <a href="#design-andrefilimono" title="Design">🎨</a></td>
    <td align="center"><a href="https://github.com/Fl0pZz"><img src="https://avatars2.githubusercontent.com/u/9510124?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Rafael Fakhreev</b></sub></a><br /><a href="https://github.com/acacode/swagger-typescript-api/commits?author=Fl0pZz" title="Code">💻</a> <a href="#ideas-Fl0pZz" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://azzola.dev"><img src="https://avatars3.githubusercontent.com/u/1297597?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Lucas Azzola</b></sub></a><br /><a href="https://github.com/acacode/swagger-typescript-api/commits?author=azz" title="Code">💻</a> <a href="#ideas-azz" title="Ideas, Planning, & Feedback">🤔</a> <a href="#design-azz" title="Design">🎨</a></td>
    <td align="center"><a href="https://github.com/JennieJi"><img src="https://avatars3.githubusercontent.com/u/1913045?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jennie</b></sub></a><br /><a href="https://github.com/acacode/swagger-typescript-api/commits?author=JennieJi" title="Code">💻</a> <a href="#ideas-JennieJi" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/jomarquez21"><img src="https://avatars1.githubusercontent.com/u/16705169?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jose Enrique Marquez</b></sub></a><br /><a href="https://github.com/acacode/swagger-typescript-api/commits?author=jomarquez21" title="Code">💻</a> <a href="https://github.com/acacode/swagger-typescript-api/issues?q=author%3Ajomarquez21" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://glassechidna.com.au"><img src="https://avatars1.githubusercontent.com/u/482276?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Benjamin Dobell</b></sub></a><br /><a href="https://github.com/acacode/swagger-typescript-api/commits?author=Benjamin-Dobell" title="Code">💻</a> <a href="https://github.com/acacode/swagger-typescript-api/issues?q=author%3ABenjamin-Dobell" title="Bug reports">🐛</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://fixate.it"><img src="https://avatars0.githubusercontent.com/u/1510520?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Larry Botha</b></sub></a><br /><a href="https://github.com/acacode/swagger-typescript-api/commits?author=larrybotha" title="Code">💻</a> <a href="https://github.com/acacode/swagger-typescript-api/issues?q=author%3Alarrybotha" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/nikalun"><img src="https://avatars3.githubusercontent.com/u/13102962?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Nikolay Lukinykh</b></sub></a><br /><a href="https://github.com/acacode/swagger-typescript-api/commits?author=nikalun" title="Code">💻</a> <a href="#ideas-nikalun" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/acacode/swagger-typescript-api/issues?q=author%3Anikalun" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/Mvbraathen"><img src="https://avatars0.githubusercontent.com/u/16756739?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Marius Bråthen</b></sub></a><br /><a href="#security-Mvbraathen" title="Security">🛡️</a></td>
    <td align="center"><a href="https://github.com/xesjkeee"><img src="https://avatars2.githubusercontent.com/u/17751886?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Evgeny Vlasov</b></sub></a><br /><a href="#ideas-xesjkeee" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/kel666"><img src="https://avatars1.githubusercontent.com/u/2040661?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Fabio</b></sub></a><br /><a href="https://github.com/acacode/swagger-typescript-api/issues?q=author%3Akel666" title="Bug reports">🐛</a> <a href="https://github.com/acacode/swagger-typescript-api/commits?author=kel666" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Fabiencdp"><img src="https://avatars.githubusercontent.com/u/6182473?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Fabien</b></sub></a><br /><a href="https://github.com/acacode/swagger-typescript-api/issues?q=author%3AFabiencdp" title="Bug reports">🐛</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!  

## 🚀 How it looks  

![](https://raw.githubusercontent.com/acacode/swagger-typescript-api/master/assets/npx.gif)  

![](https://raw.githubusercontent.com/acacode/swagger-typescript-api/master/assets/auth-example.gif)  

![](https://raw.githubusercontent.com/acacode/swagger-typescript-api/master/assets/typings1.gif)  


## 📝 License  
Licensed under the [MIT License](https://github.com/acacode/swagger-typescript-api/blob/master/LICENSE).
