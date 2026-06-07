/**
 * Escapes a value for safe insertion into a generated JavaScript/TypeScript
 * double-quoted string literal (without the surrounding quotes).
 *
 * OpenAPI spec fields such as `servers[0].url` are untrusted input. Templates
 * interpolate `apiConfig.baseUrl` into string literals in generated client code;
 * without escaping, a malicious URL can break out of the literal and inject
 * executable code into the consumer's bundle.
 */
export function escapeJsStringLiteral(value: string): string {
  return JSON.stringify(value).slice(1, -1);
}
