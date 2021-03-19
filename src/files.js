const _ = require("lodash");
const fs = require("fs");
const { resolve } = require("path");
const { filePrefix } = require("./filePrefix");
const makeDir = require("make-dir");

const getFileContent = (path) => {
  return fs.readFileSync(path, { encoding: "UTF-8" });
};

const pathIsDir = (path) => {
  if (!path) return false;

  try {
    const stat = fs.statSync(path);
    return stat.isDirectory();
  } catch (e) {
    return false;
  }
};

const removeDir = (path) => {
  try {
    fs.rmdirSync(path, { recursive: true });
  } catch (e) {}
};

const createDir = (path) => {
  try {
    makeDir.sync(path);
  } catch (e) {}
};

const cleanDir = (path) => {
  removeDir(path);
  createDir(path);
};

const pathIsExist = (path) => path && fs.existsSync(path);

const createFile = ({ path, fileName, content, withPrefix }) =>
  fs.writeFileSync(
    resolve(__dirname, path, `./${fileName}`),
    `${withPrefix ? filePrefix : ""}${content}`,
    _.noop,
  );

module.exports = {
  createFile,
  pathIsDir,
  cleanDir,
  pathIsExist,
  createDir,
  removeDir,
  getFileContent,
};
