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
  /** @type {Logger} */
  logger;

  constructor({ logger }) {
    this.logger = logger;
  }

  getFileContent = (path) => {
    this.logger.debug("reading file content", path);
    return fs.readFileSync(path, { encoding: "UTF-8" });
  };

  readDir = (path) => {
    this.logger.debug("reading dir", path);
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
    } catch (e) {
      this.logger.debug("failed to remove dir", e);
    }
  };

  createDir = (path) => {
    try {
      makeDir.sync(path);
    } catch (e) {
      this.logger.debug("failed to create dir", e);
    }
  };

  cleanDir = (path) => {
    this.removeDir(path);
    this.createDir(path);
  };

  pathIsExist = (path) => {
    const isExist = !!path && fs.existsSync(path);
    this.logger.debug("path", path, "is exist:", isExist);
    return isExist;
  };

  createFile = ({ path, fileName, content, withPrefix }) => {
    const absolutePath = resolve(__dirname, path, `./${fileName}`);
    const fileContent = `${withPrefix ? FILE_PREFIX : ""}${content}`;

    this.logger.debug("write file sync by path", absolutePath);

    return fs.writeFileSync(absolutePath, fileContent, _.noop);
  };
}

module.exports = {
  FileSystem,
};
