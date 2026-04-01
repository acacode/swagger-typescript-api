import * as YAML from "yaml";
import type { AnyObject } from "yummies/types";

/**
 * Some OpenAPI YAML files use a double-quoted value that spans a newline without
 * a trailing `\` (invalid YAML 1.2; see acacode/swagger-typescript-api#1433):
 *
 *   description: "first line
 *   tail"
 *
 * `yaml` rejects that with "Missing closing quote". We fold it into one line using
 * an escaped newline inside the scalar: `"first line\ntail"`.
 *
 * If the first line ends with `\`, it is a normal YAML line continuation and is
 * left for {@link normalizeYamlEscapedLineBreaks}.
 */
function mergeBrokenDoubleQuotedMapLines(content: string): string {
  const lines = content.split(/\r?\n|\r/);
  const result: string[] = [];

  for (let i = 0; i < lines.length; i += 1) {
    const current = lines[i];
    if (current === undefined) {
      break;
    }
    const following = lines[i + 1];

    const repaired =
      following === undefined
        ? null
        : tryRepairSplitDoubleQuotedMapValue(current, following);
    if (repaired) {
      result.push(repaired);
      i += 1;
      continue;
    }

    result.push(current);
  }

  return result.join("\n");
}

function tryRepairSplitDoubleQuotedMapValue(
  line: string,
  nextLine: string,
): string | null {
  const unterminated = matchMapKeyOpeningDoubleQuotedScalar(line);
  if (!unterminated) {
    return null;
  }

  const closing = matchSingleWordThenClosingQuote(nextLine);
  if (!closing) {
    return null;
  }

  const { keyPrefixAndQuote, valueBeforeBreak } = unterminated;
  const { closingWord } = closing;

  if (valueBeforeBreak.endsWith("\\")) {
    return null;
  }

  return `${keyPrefixAndQuote}${valueBeforeBreak}\\n${closingWord}"`;
}

/** `  foo: "text` with no `"` before end of line (value may be empty). */
function matchMapKeyOpeningDoubleQuotedScalar(line: string): {
  keyPrefixAndQuote: string;
  valueBeforeBreak: string;
} | null {
  const match = /^(\s+[A-Za-z_][\w-]*:\s*")([^"]*)$/.exec(line);
  if (!match?.[1] || match[2] === undefined) {
    return null;
  }
  return {
    keyPrefixAndQuote: match[1],
    valueBeforeBreak: match[2],
  };
}

/** `      word"` — only indentation, one identifier, closing quote. */
function matchSingleWordThenClosingQuote(line: string): {
  closingWord: string;
} | null {
  const match = /^(\s*)([A-Za-z_][\w-]*)"\s*$/.exec(line);
  if (!match?.[2]) {
    return null;
  }
  return { closingWord: match[2] };
}

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
    const merged = mergeBrokenDoubleQuotedMapLines(content);
    return YAML.parse(normalizeYamlEscapedLineBreaks(merged)) as AnyObject;
  }
}
