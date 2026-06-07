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
 */
export function escapeJsTemplateLiteralWithPathParams(
  path: string,
  pathParamNames: readonly string[],
): string {
  const PATH_PARAM_PLACEHOLDER_PREFIX = "__STA_PATH_PARAM_";
  let sanitized = path;

  pathParamNames.forEach((paramName, index) => {
    sanitized = sanitized.replaceAll(
      `\${${paramName}}`,
      `${PATH_PARAM_PLACEHOLDER_PREFIX}${index}__`,
    );
  });

  sanitized = escapeJsTemplateLiteralStatic(sanitized);

  pathParamNames.forEach((paramName, index) => {
    sanitized = sanitized.replaceAll(
      `${PATH_PARAM_PLACEHOLDER_PREFIX}${index}__`,
      `\${${paramName}}`,
    );
  });

  return sanitized;
}
