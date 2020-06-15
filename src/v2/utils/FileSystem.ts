import fs from "fs";
import path from "path";

export class FileSystem {
  static getFileContent(pathFromSrc) {
    const pathToFile = path.resolve(__dirname, pathFromSrc);
    const file = fs.readFileSync(pathToFile, { encoding: "utf8" });

    return file.toString();
  }

  static pathIsExist(path: string) {
    return !!path && fs.existsSync(path);
  }
}
