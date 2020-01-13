const path = require('path');
const fs = require("fs");
const yaml = require('yamljs');
const converter = require('swagger2openapi');

const getSwaggerFile = pathToSwagger => {
  const file = fs.readFileSync(path.resolve(__dirname, pathToSwagger), { encoding: 'UTF-8' })
  
  try {
    return JSON.parse(file);
  } catch (e){
    return yaml.parse(file)
  }
}

const getSwaggerObject = pathToSwagger => new Promise((resolve) => {
  const parsed = getSwaggerFile(pathToSwagger);

  if (!(parsed.openapi)) {
    converter.convertObj(parsed, { warnOnly: true }, function(err, options){
      if (err) throw new Error(err)
      resolve(options.openapi)
    });
  } else {
    resolve(parsed)
  }
})

module.exports = {
  getSwaggerObject,
}