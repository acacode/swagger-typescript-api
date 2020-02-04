# swagger-typescript-api  

<img src="https://raw.githubusercontent.com/acacode/swagger-typescript-api/master/assets/swagger-typescript-api-logo1.png" align="right"
     title="swagger-typescript-api logo by js2me" width="140" height="270 ">

Generate api via swagger scheme.  
Supports OA 3.0, 2.0, JSON, yaml  
Generated api module use [Fetch Api](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to make requests.

Any questions you can ask [here](https://github.com/acacode/swagger-typescript-api/issues)

## 📄 Usage  

```sh
Usage: sta [options]
Usage: swagger-typescript-api [options]

Options:
  -v, --version          output the current version
  -p, --path <path>      path to swagger scheme
  -o, --output <output>  output path of typescript api file (default: ".")
  -n, --name <name>      name of output typescript api file (default: "api.ts")
  -h, --help             output usage information
```

Also you can use `npx`:  
```
 npx swagger-typescript-api -p ./swagger.json -o ./src -n myApi.ts
```

You can use this package from nodejs:
```js
const { generateApi } = require('swagger-typescript-api');

generateApi({
  name,
  url: 'http://api.com/swagger.json',
  input: resolve(process.cwd(), './foo/swagger.json')
})
  .then(sourceFile => {
    fs.writeFile(path, sourceFile)
  })
  .catch(e => {
    console.error(e)
  })

```

## 🚀 Examples  

`sta -p ./swagger.json`  

Input swagger scheme - [file](https://github.com/acacode/swagger-typescript-api/blob/master/swagger.json)  
Output typescript api - [file](https://github.com/acacode/swagger-typescript-api/blob/master/api.ts)  


## 🚀 How it looks
![](https://raw.githubusercontent.com/acacode/swagger-typescript-api/master/assets/npx.gif)  
![](https://raw.githubusercontent.com/acacode/swagger-typescript-api/master/assets/auth-example.gif)  
![](https://raw.githubusercontent.com/acacode/swagger-typescript-api/master/assets/typings1.gif)  


## 📝 License  
Licensed under the [MIT License](https://github.com/acacode/swagger-typescript-api/blob/master/LICENSE).
