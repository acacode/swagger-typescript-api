import * as _ from "lodash";
import * as fs from "fs";
import * as path from "path";

export class FileSystem {
  static getFileContent(pathToFile) {
    const file = fs.readFileSync(pathToFile, { encoding: "utf8" });

    return file.toString();
  }

  static pathIsExist(path: string) {
    return !!path && fs.existsSync(path);
  }

  /** returns path where swagger-typescript-api script was called */
  static resolveUserPath(...paths: string[]) {
    return path.resolve(process.cwd(), ...paths);
  }

  /** returns "src" path */
  static resolveProjectPath(...paths: string[]) {
    return path.resolve(__dirname, "../", ...paths);
  }

  static createFile(pathTo: string, fileName: string, content: string) {
    return fs.writeFileSync(FileSystem.resolveUserPath(pathTo, `./${fileName}`), content);
  }
}
