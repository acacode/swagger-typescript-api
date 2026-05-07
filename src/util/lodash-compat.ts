import * as esToolkit from "es-toolkit";
import * as esToolkitCompat from "es-toolkit/compat";

// Create a lodash-compatible object for templates
// This is exported as `_` to templates for backwards compatibility
export function createLodashCompat(): Record<string, unknown> {
  return {
    ...esToolkit,
    ...esToolkitCompat,
  };
}
