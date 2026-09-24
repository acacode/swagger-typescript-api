/**
 * Names declared by `templates/base/jsonld-utils.ejs`. Generated entities
 * reference them, so the two have to stay in sync.
 */
export const JSONLD_UTILS_TYPES = {
  entity: "JsonLdEntity",
  context: "JsonLdContext",
} as const;

/**
 * Derives a TypeScript-friendly entity name from a JSON-LD `@type` value.
 *
 * - Schema.org and other URI-style types are reduced to their last path segment.
 * - Bare names are PascalCased on first character.
 */
export function getEntityNameFromJsonLdType(type: string): string {
  if (type.includes("/")) {
    return type.split("/").pop() || "Entity";
  }
  return type.charAt(0).toUpperCase() + type.slice(1);
}
