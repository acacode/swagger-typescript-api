import * as fs from "node:fs/promises";
import * as path from "node:path";

export async function collectAllSchemas() {
  const schemas = [];
  const schemaPath = path.join(import.meta.dirname, "fixtures", "schemas");
  const schemaFiles = await fs.readdir(schemaPath, { recursive: true });
  for (const schemaFile of schemaFiles) {
    if (
      schemaFile.endsWith(".json") ||
      schemaFile.endsWith(".yaml") ||
      schemaFile.endsWith(".yml")
    ) {
      const name = path.basename(schemaFile).replace(/\.(json|yaml|yml)$/, "");
      const filePath = path.join(schemaPath, schemaFile);
      schemas.push({ name, filePath });
    }
  }
  return schemas;
}
