import { spawnSync } from "node:child_process";
import * as fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";

export const extractVitestSnapshotBody = (snapshotContent: string): string => {
  const lines = snapshotContent.split("\n");
  let code = lines.slice(3, -2).join("\n");

  if (code.startsWith('"')) {
    code = code.slice(1);
  }
  if (code.endsWith('"')) {
    code = code.slice(0, -1);
  }

  return code.replace(/\\`/g, "`").replace(/\\\$/g, "$");
};

export const prepareGeneratedOutputForTypecheck = (source: string): string =>
  source.replace("@ts-nocheck", "@ts-check");

export const typecheckGeneratedOutput = async (
  source: string,
  options: { fileName?: string; tmpRoot?: string } = {},
): Promise<void> => {
  const tmpRoot =
    options.tmpRoot ??
    (await fs.mkdtemp(path.join(os.tmpdir(), "swagger-typescript-api-tsc-")));
  const fileName = options.fileName ?? "generated-output.ts";
  const filePath = path.join(tmpRoot, fileName);

  await fs.writeFile(
    filePath,
    prepareGeneratedOutputForTypecheck(source),
    "utf8",
  );

  const result = spawnSync(
    "bunx",
    [
      "tsc",
      "--ignoreConfig",
      "--noEmit",
      "--target",
      "ES2020",
      "--module",
      "ESNext",
      "--lib",
      "ES2020,DOM",
      filePath,
    ],
    { encoding: "utf8" },
  );

  if (result.status !== 0) {
    const details = [result.stdout, result.stderr].filter(Boolean).join("\n");
    throw new Error(
      details.trim() || "Generated output failed TypeScript typecheck",
    );
  }
};
