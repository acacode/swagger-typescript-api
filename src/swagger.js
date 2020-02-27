const _ = require('lodash');
const yaml = require('js-yaml');
const axios = require("axios");
const converter = require('swagger2openapi');
const { pathIsExist, getFileContent } = require("./files");

const parseSwaggerFile = (file) => {
  if (typeof file !== "string") return file;

  try {
    return JSON.parse(file);
  } catch (e) {
    return yaml.safeLoad(file)
  }
}

const getSwaggerFile = (pathToSwagger, urlToSwagger) => new Promise((resolve) => {
  if (pathIsExist(pathToSwagger)){
    console.log(`✨  try to get swagger by path "${pathToSwagger}"`)
    resolve(getFileContent(pathToSwagger))
  } else {
    console.log(`✨  try to get swagger by url "${urlToSwagger}"`)
    axios.get(urlToSwagger).then(res => resolve(res.data))
  }
})

const getSwaggerObject = (pathToSwagger, urlToSwagger) =>
  new Promise(resolve =>
    getSwaggerFile(pathToSwagger, urlToSwagger).then(file => {
      const swaggerSchema = parseSwaggerFile(file);
      if (!(swaggerSchema.openapi)) {
        converter.convertObj(swaggerSchema, {
          warnOnly: true,
          refSiblings: 'preserve',
          rbname: "requestBodyName",
        }, function(err, options){
          const swaggerSchema = _.get(err, 'options.openapi', _.get(options, 'openapi'))
          if (!swaggerSchema && err) {
            throw new Error(err)
          }
          resolve(swaggerSchema)
        });
      } else {
        resolve(swaggerSchema)
      }
    }).catch(e => {
      throw new Error(e)
    })
  )

module.exports = {
  getSwaggerObject,
}