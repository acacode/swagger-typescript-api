import * as mustache from "mustache";
import { FileSystem } from "../utils/FileSystem";

// @ts-ignore ignore all character escaping
mustache.escape = (value) => value;

export class Template {
  static render(template: string, configuration: object) {
    return mustache.render(FileSystem.getFileContent(template), configuration);
  }
}
