const fs = require("fs");
const makeDir = require("make-dir");
const { resolve } = require("path");
const _ = require("lodash");

const FILE_PREFIX = `/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

`;

class FileSystem {
  constructor() {}

  getFileContent = (path) => {
    return fs.readFileSync(path, { encoding: "UTF-8" });
  };

  readDir = (path) => {
    return fs.readdirSync(path);
  };

  pathIsDir = (path) => {
    if (!path) return false;

    try {
      const stat = fs.statSync(path);
      return stat.isDirectory();
    } catch (e) {
      return false;
    }
  };

  cropExtension = (fileName) => {
    const fileNameParts = _.split(fileName, ".");

    if (fileNameParts.length > 1) {
      fileNameParts.pop();
    }

    return fileNameParts.join(".");
  };

  removeDir = (path) => {
    try {
      if (typeof fs.rmSync === "function") {
        fs.rmSync(path, { recursive: true });
      } else {
        fs.rmdirSync(path, { recursive: true });
      }
    } catch (e) {}
  };

  createDir = (path) => {
    try {
      makeDir.sync(path);
    } catch (e) {}
  };

  cleanDir = (path) => {
    this.removeDir(path);
    this.createDir(path);
  };

  pathIsExist = (path) => path && fs.existsSync(path);

  createFile = ({ path, fileName, content, withPrefix }) =>
    fs.writeFileSync(resolve(__dirname, path, `./${fileName}`), `${withPrefix ? FILE_PREFIX : ""}${content}`, _.noop);
}

module.exports = {
  FileSystem,
};
