import * as fs from "node:fs/promises";
import * as path from "node:path";

interface Schema {
  name: string;
  filePath: string;
}

export async function collectAllSchemas() {
  const schemas: Schema[] = [];
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
  // Sort by filePath to ensure consistent order across different file systems
  return schemas.sort((a, b) => a.filePath.localeCompare(b.filePath));
}
