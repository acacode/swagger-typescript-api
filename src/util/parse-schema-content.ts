import * as YAML from "yaml";
import type { AnyObject } from "yummies/types";

function normalizeYamlEscapedLineBreaks(content: string): string {
  let normalized = "";
  let inDoubleQuotedScalar = false;
  let escaped = false;

  for (let index = 0; index < content.length; index += 1) {
    const currentChar = content[index];

    if (!inDoubleQuotedScalar) {
      if (currentChar === '"') {
        inDoubleQuotedScalar = true;
      }
      normalized += currentChar;
      continue;
    }

    if (escaped) {
      normalized += currentChar;
      escaped = false;
      continue;
    }

    if (currentChar === "\\") {
      const nextChar = content[index + 1];

      if (nextChar === "\n" || nextChar === "\r") {
        index += 1;

        if (nextChar === "\r" && content[index + 1] === "\n") {
          index += 1;
        }

        while (content[index + 1] === " " || content[index + 1] === "\t") {
          index += 1;
        }

        continue;
      }

      normalized += currentChar;
      escaped = true;
      continue;
    }

    if (currentChar === '"') {
      inDoubleQuotedScalar = false;
    }

    normalized += currentChar;
  }

  return normalized;
}

export function parseSchemaContent(content: string): AnyObject {
  try {
    return JSON.parse(content) as AnyObject;
  } catch {
    return YAML.parse(normalizeYamlEscapedLineBreaks(content)) as AnyObject;
  }
}
