const fs = require("node:fs");
const { resolve } = require("node:path");

module.exports = (pathToApis) =>
  (fs.readdirSync(pathToApis) || []).map((fileName) =>
    resolve(pathToApis, fileName),
  );
