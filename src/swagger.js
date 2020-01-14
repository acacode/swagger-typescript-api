const path = require('path');
const _ = require('lodash');
const fs = require("fs");
const yaml = require('yamljs');
const converter = require('swagger2openapi');

const getSwaggerFile = pathToSwagger => {
  const file = fs.readFileSync(pathToSwagger, { encoding: 'UTF-8' })
  
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
      const swaggerSchema = _.get(err, 'options.openapi', _.get(options, 'openapi'))

      if (!swaggerSchema && err) throw new Error(err)
      // console.log('err',options)
      resolve(swaggerSchema)
    });
  } else {
    resolve(parsed)
  }
})

module.exports = {
  getSwaggerObject,
}