import * as crypto from "node:crypto";

export const generateId = () => crypto.randomUUID();
