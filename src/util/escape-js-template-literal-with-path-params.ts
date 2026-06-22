/**
 * Escapes `\`, backticks, and `${` for insertion into a JS template literal
 * (without surrounding backticks).
 */
export function escapeJsTemplateLiteralStatic(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$\{/g, "\\${");
}

/**
 * Escapes a route path for template-literal insertion while preserving known
 * `${paramName}` interpolations for declared path params.
 */
export function escapeJsTemplateLiteralWithPathParams(
  path: string,
  pathParamNames: readonly string[],
): string {
  if (pathParamNames.length === 0) {
    return escapeJsTemplateLiteralStatic(path);
  }

  const paramPattern = new RegExp(
    pathParamNames.map((p) => `\\$\\{${escapeRegExp(p)}\\}`).join("|"),
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
