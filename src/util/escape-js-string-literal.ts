/** Escapes a value for insertion into a double-quoted JS/TS string literal (without surrounding quotes). */
export function escapeJsStringLiteral(value: string): string {
  return JSON.stringify(value).slice(1, -1);
}
