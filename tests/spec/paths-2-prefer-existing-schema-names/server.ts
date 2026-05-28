import * as fs from "node:fs/promises";
import { createServer, type Server } from "node:http";
import * as path from "node:path";

export const apiRoot = path.resolve(import.meta.dirname, "../paths-2/api");
export const schemaUrlPath = "/api/v1/openapi/yaml";

export const resolveApiFilePath = (pathname: string): string | null => {
  const safeRoot = path.resolve(apiRoot);

  if (pathname === schemaUrlPath) {
    return path.join(safeRoot, "v1/openapi.yaml");
  }

  if (pathname.startsWith("/api/v1/openapi/")) {
    return path.join(safeRoot, "v1", pathname.slice("/api/v1/openapi/".length));
  }

  if (pathname.startsWith("/api/v1/")) {
    return path.join(safeRoot, "v1", pathname.slice("/api/v1/".length));
  }

  return null;
};

export const createPaths2ApiServer = async (): Promise<{
  server: Server;
  baseUrl: string;
  close: () => Promise<void>;
}> => {
  const server = createServer(async (req, res) => {
    try {
      const host = req.headers.host || "127.0.0.1";
      const requestUrl = new URL(req.url || "/", `http://${host}`);
      const requestedPath = decodeURIComponent(requestUrl.pathname);
      const filePath = resolveApiFilePath(requestedPath);

      if (!filePath) {
        res.statusCode = 403;
        res.end("Forbidden");
        return;
      }

      const file = await fs.readFile(filePath, { encoding: "utf8" });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/yaml; charset=utf-8");
      res.end(file);
    } catch {
      res.statusCode = 404;
      res.end("Not Found");
    }
  });

  await new Promise<void>((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve());
  });

  const address = server.address();
  const baseUrl =
    address && typeof address === "object"
      ? `http://127.0.0.1:${address.port}`
      : "";

  return {
    server,
    baseUrl,
    close: async () => {
      await new Promise<void>((resolve, reject) => {
        server.close((error) => {
          if (error) {
            reject(error);
            return;
          }
          resolve();
        });
      });
    },
  };
};
