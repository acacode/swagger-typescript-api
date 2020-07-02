import * as _ from "lodash";
import { formatDescription } from "../transformers/utils/formatDescription";

interface CodeGenType {
  name: string;
  keyword: string;
  content: string;
}

export class TSCodeGen {
  static createComment(comment: string) {
    return `/** ${formatDescription(comment, true)} */`;
  }
  static createInterface(
    name: string,
    content: Record<string, { optional?: boolean; type?: string; comment?: string }>,
    inline?: boolean,
  ): CodeGenType {
    const validContentParts = _.filter(content, (part) => !!part.type);
    const interfaceFields = _.map(validContentParts, (part, key) => {
      const fieldParts = _.compact([
        !inline && part.comment && `  ${TSCodeGen.createComment(part.comment)}\r\n`,
        `${inline ? "" : "  "}${key}${part.optional ? "?" : ""}: ${part.type}${
          inline ? "" : "\r\n"
        }`,
      ]);
      return fieldParts.join("");
    }).join("");

    return {
      name,
      keyword: "interface",
      content: `{\r\n${interfaceFields}\r\n}`,
    };
  }

  static createEnum(
    name: string,
    type: "string" | "number",
    keys: string[],
    inline?: boolean,
  ): CodeGenType {
    const enumFields = _.map(keys, (key) => {
      return `${key} = ${type === "string" ? `"${key}"` : key}`;
    }).join("");

    return {
      name,
      keyword: "enum",
      content: `{\r\n${enumFields}\r\n}`,
    };
  }
}
