const fs = require("fs");
const { resolve } = require("path");

module.exports = (pathToApis) =>
  (fs.readdirSync(pathToApis) || [])
    .map(fileName => resolve(pathToApis, fileName))