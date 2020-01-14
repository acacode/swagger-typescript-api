# swagger-typescript-api  
Generate api via swagger scheme.  
Supports OA 3.0, 2.0, JSON, yaml  

## Usage  

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

## Examples  

`sta -p ./swagger.json`  

Input swagger scheme - [file](./swagger.json)  
Output typescript api - [file](./api.ts)  
