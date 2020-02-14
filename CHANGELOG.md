# 1.2.5  
Features: better naming of routes without `operationId`  
![route naming](./assets/changelog_assets/1.2.5_route_naming.jpg)  

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
Fixes: NodeJS main script cannot been called on Unix* machines  
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
