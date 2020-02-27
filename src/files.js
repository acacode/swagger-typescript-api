const _ = require("lodash");
const fs = require("fs");
const { resolve } = require("path");

const getFileContent = path =>
  fs.readFileSync(path, { encoding: 'UTF-8' })

const pathIsExist = path =>
  path && fs.existsSync(path)

const createFile = (pathTo, fileName, content) =>
  fs.writeFileSync(resolve(__dirname, pathTo, `./${fileName}`), content, _.noop)

const getTemplate = templateName =>
  getFileContent(resolve(__dirname, `./templates/${templateName}.mustache`))

module.exports = {
  getTemplate,
  createFile,
  pathIsExist,
  getFileContent,
}