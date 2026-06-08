/**
 * Escapes static segments for safe insertion into a generated JavaScript
 * template literal (without the surrounding backticks).
 *
 * Call this on untrusted OpenAPI path strings **before** deliberate
 * `${paramName}` interpolations are inserted by `parseRouteName`.
 */
export function escapeJsTemplateLiteralStatic(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$\{/g, "\\${");
}

/**
 * Escapes a fully-built route path for template-literal insertion while
 * preserving known `${paramName}` interpolations for declared path params.
 *
 * Uses a single-pass approach: split on known interpolations, escape only
 * the static segments between them, and reassemble. This avoids placeholder
 * tokens that could collide with user path content.
 */
export function escapeJsTemplateLiteralWithPathParams(
  path: string,
  pathParamNames: readonly string[],
): string {
  if (pathParamNames.length === 0) {
    return escapeJsTemplateLiteralStatic(path);
  }

  const paramPattern = new RegExp(
    pathParamNames
      .map((p) => `\\$\\{${escapeRegExp(p)}\\}`)
      .join("|"),
    "g",
  );

  let result = "";
  let lastIndex = 0;

  for (const match of path.matchAll(paramPattern)) {
    if (match.index === undefined) continue;
    result += escapeJsTemplateLiteralStatic(path.slice(lastIndex, match.index));
    result += match[0];
    lastIndex = match.index + match[0].length;
  }

  result += escapeJsTemplateLiteralStatic(path.slice(lastIndex));

  return result;
}

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
