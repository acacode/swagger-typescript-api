# swagger-typescript-api

# templates

Templates:

- `api.ejs` - _(generates file)_ Api class module (locations: [default](https://github.com/acacode/swagger-typescript-api/tree/main/templates/default/api.ejs), [modular](https://github.com/acacode/swagger-typescript-api/tree/main/templates/modular/api.ejs))
- `data-contracts.ejs` - _(generates file)_ all types (data contracts) from swagger schema (locations: [base](https://github.com/acacode/swagger-typescript-api/tree/main/templates/base/data-contracts.ejs))
- `http-client.ejs` - _(generates file)_ HttpClient class module (locations: [base](https://github.com/acacode/swagger-typescript-api/tree/main/templates/base/http-client.ejs))
- `procedure-call.ejs` - _(subtemplate)_ route in Api class (locations: [default](https://github.com/acacode/swagger-typescript-api/tree/main/templates/default/procedure-call.ejs), [modular](https://github.com/acacode/swagger-typescript-api/tree/main/templates/modular/procedure-call.ejs))
- `route-docs.ejs` - _(generates file)_ documentation for route in Api class (locations: [base](https://github.com/acacode/swagger-typescript-api/tree/main/templates/base/route-docs.ejs))
- `route-name.ejs` - _(subtemplate)_ route name for route in Api class (locations: [base](https://github.com/acacode/swagger-typescript-api/tree/main/templates/base/route-name.ejs))
- `route-type.ejs` - _(`--route-types` option)_ _(subtemplate)_ (locations: [base](https://github.com/acacode/swagger-typescript-api/tree/main/templates/base/route-type.ejs))
- `route-types.ejs` - _(`--route-types` option)_ _(subtemplate)_ (locations: [base](https://github.com/acacode/swagger-typescript-api/tree/main/templates/base/route-types.ejs)) - `data-contract-jsdoc.ejs` - _(subtemplate)_ generates JSDOC for data contract (locations: [base](https://github.com/acacode/swagger-typescript-api/tree/main/templates/base/data-contract-jsdoc.ejs))

[//]: # "- `enum-data-contract.ejs` - *(subtemplate)* generates `enum` data contract (locations: [base](https://github.com/acacode/swagger-typescript-api/tree/main/templates/base/enum-data-contract.ejs))"
[//]: # "- `interface-data-contract.ejs` - *(subtemplate)* generates `interface` data contract (locations: [base](https://github.com/acacode/swagger-typescript-api/tree/main/templates/base/interface-data-contract.ejs))"
[//]: # "- `type-data-contract.ejs` - *(subtemplate)* generates `type` data contract (locations: [base](https://github.com/acacode/swagger-typescript-api/tree/main/templates/base/type-data-contract.ejs))"
